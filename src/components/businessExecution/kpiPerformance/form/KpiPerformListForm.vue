<template>
  <div class="tab-main-box current" v-show="value">
    <div class="page__btn-tbox">
      <div class="btn-box-title f_none" v-if="showHideWeekStatus">주차</div>
      <com-dropdowns
        v-if="showHideWeekStatus"
        :data="weekList"
        rules="required"
        textfield="text"
        valuefield="value"
        class="hms-dropdown type1"
        v-model="wwSeq"
        @input="weekSelected"
      ></com-dropdowns>
      <button type="button" class="white-btn" @click="goToPerformReport">
        <span>{{ $t('NLS0001468') }}</span>
      </button>
      <button type="button" class="white-btn" @click="srchWeekData">
        <span>{{ $t(`${showHideWeekData}`) }}</span>
      </button>
      <button type="button" class="white-btn" @click="resizeKpiColumnFn">
        <span>{{ $t(`${resizeKpiColumn}`) }}</span>
      </button>
      <button type="button" class="white-btn" @click="showHideKpi">
        <span>{{ showHideAllKpiBtnNm }}</span>
      </button>
      <button type="button" class="white-btn" @click="showChartPopFunc">
        <span> {{ $t('NLS0000447') }} </span
        ><!--차트 그룹 선택-->
      </button>
    </div>
    <div class="hms-grid">
      <com-native-grid
        :data="performList"
        :columns="columns"
        height="402"
        class="locked"
        :tree="true"
        @btnclick="openPopupFunc"
        @onCheck="clickCheckBox"
        @popup="openChildKpi"
        :selectedHover="false"
      ></com-native-grid>
    </div>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { common, timezone, debounce } from '@/utils';
import {
  kpiPerformanceStore,
  commonStore,
  kpiTargetEstablishmentStore,
  screenStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as screenTypes from '@/store/modules/screen/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderHtmlCell from '@/components/common/business/HeaderHtmlCell';

export default {
  name: 'KpiPerformListForm',
  mixins: [
    screenStore,
    kpiPerformanceStore,
    commonStore,
    kpiTargetEstablishmentStore,
  ],
  components: {
    ComNativeGrid,
    ComDropdowns,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      isLock:
        this[screenTypes.getters.GET_VIEWTYPE] === 'mobile' ||
        this[screenTypes.getters.GET_VIEWTYPE] === 'tablet',
      columns: [],
      performList: [],
      headerYear: timezone.getClientDate('YYYY'),
      showHideAllKpiBtnNm: this.$t('NLS0000815'), //*숨김항목 보기
      showHideAllKpiBtn: false, //*접기(default)
      title: this.$t('NLS0001266'),
      baseMonth: {
        text: timezone.getClientDate('MM'),
        value: timezone.getClientDate('MM'),
      },
      weekList: [],
      weekData: {},
      thisFrom: '',
      thisTo: '',
      lastFrom: '',
      lastTo: '',
      wwSeq: {},
      entireWeek: [],
      showHideWeekData: 'NLS0001409',
      showHideWeekStatus: false,
      resizeKpiColumn: this.$t('NLS0001472'),
      resizeKpiColumnBtn: true, //*확대(default-true)
      originSize: '480', //*bsc관점/kpi 넓이
      hOriginSize: '829', //*지표정보 넓이
    };
  },
  computed: {
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getKpiPerformList() {
      return this[kpiPerformanceTypes.getters.GET_KPI_PERFORM_LIST];
    },
    getSrchUser() {
      return this[kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID];
    },
    getEntireWeek() {
      return this[kpiPerformanceTypes.getters.GET_ENTIRE_WEEK];
    },
    getTabList: {
      set(value) {
        this[kpiPerformanceTypes.actions.UPDATE_TAB_LIST](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_TAB_LIST];
      },
    },
  },
  watch: {
    getSelectedYear(value) {
      let title = this.$t('NLS0001266');
      title = title.replace('_', value);
      title = title.replace('%', this.getSelectedMonth);
      if (this.columns[2] !== undefined) this.columns[2].title = title; //*년도 목표
      if (this.columns[6] !== undefined)
        this.columns[6].title = `${this.getSelectedYear}${this.$t(
          'NLS0000812',
        )} ${this.$t('NLS0000452')}`; //*년도 목표
      // this.initColumns();
    },
    getSelectedMonth(value) {
      let title = this.$t('NLS0001266');
      title = title.replace('_', this.getSelectedYear);
      title = title.replace('%', value);
      if (this.columns[2] !== undefined) this.columns[2].title = title;
    },
    getKpiPerformList: function(value) {
      let list = value.map(el => {
        let obj = { ...el };
        obj.dept = obj.kpiLevel - 1;
        obj.id = obj.tid;
        obj.parentId = common.isEmpty(obj.parentTid) ? '' : obj.parentTid;
        if (obj.bscKpi === 'B') {
          obj.bscKpiNm = this.$t('NLS0000841'); //*관점
          obj.kpiNm = obj.cdNm;
          obj.msPer = 'disabled';
          obj.tsPer = 'disabled';
          delete obj.prjCnt;
          delete obj.reportYn;
        } else {
          //*단순하위KPI
          obj.popup = obj.subYn === 'Y' ? true : false;

          if (obj.mboYn === 'Y') obj.kpiNm = [obj.kpiNm, 'bold'];
          obj.bscKpiNm = this.$t('NLS0000842'); //*지표
          obj.reasonGoal = obj.reasonCnt > 0 ? 'bg_on' : '';
          obj.totalAnaly = '';

          if (!common.isEmpty(obj.resultMs)) {
            //*당월
            obj.msPer = common.getDemicalPoint(
              common.getAchRate(
                obj.targetOMs,
                obj.targetMMs,
                obj.resultMs,
                obj.kpiAchType,
              ),
              0,
            );
            if (obj.achMeasure === 'R') {
              //*RANGE일때 (달성률-min)/(max-min)*100 계산식
              const achRateVal = obj.msPer;
              obj.msPer = [
                achRateVal,
                common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
              ];
            }
          }
          if (!common.isEmpty(obj.resultTs)) {
            //*누계
            obj.tsPer = common.getDemicalPoint(
              common.getAchRate(
                obj.targetTs,
                null,
                obj.resultTs,
                obj.kpiAchType,
              ),
              0,
            );
            if (obj.achMeasure === 'R') {
              //*RANGE일때 (달성률-min)/(max-min)*100 계산식
              const achRateVal = obj.tsPer;
              obj.tsPer = [
                achRateVal,
                common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
              ];
            }
          }
          if (!common.isEmpty(obj.resultWs)) {
            //*누계
            obj.wsPer = common.getDemicalPoint(
              common.getAchRate(
                obj.targetWs,
                null,
                obj.resultWs,
                obj.kpiAchType,
              ),
              0,
            );
            if (obj.achMeasure === 'R') {
              //*RANGE일때 (달성률-min)/(max-min)*100 계산식
              const achRateVal = obj.wsPer;
              obj.wsPer = [
                achRateVal,
                common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
              ];
            }
          }
          if (!common.isEmpty(obj.beforeResultWs)) {
            //*누계
            obj.bwsPer = common.getDemicalPoint(
              common.getAchRate(
                obj.beforeTargetWs,
                null,
                obj.beforeResultWs,
                obj.kpiAchType,
              ),
              0,
            );
            if (obj.achMeasure === 'R') {
              //*RANGE일때 (달성률-min)/(max-min)*100 계산식
              const achRateVal = obj.bwsPer;
              obj.bwsPer = [
                achRateVal,
                common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
              ];
            }
          }
          obj.targetOYy = common.getDemicalComma(
            obj.targetOYy,
            obj.pointCnt || 0,
          );
          obj.targetMYy = common.getDemicalComma(
            obj.targetMYy,
            obj.pointCnt || 0,
          );
          obj.targetMs = common.getDemicalComma(
            obj.targetMs,
            obj.pointCnt || 0,
          );
          //* FunctionCell에서 button format undefined 일때 null처리
          obj.resultMs =
            common.getDemicalComma(obj.resultMs, obj.pointCnt || 0) || null;
          obj.targetTs = common.getDemicalComma(
            obj.targetTs,
            obj.pointCnt || 0,
          );
          obj.resultTs = common.getDemicalComma(
            obj.resultTs,
            obj.pointCnt || 0,
          );
          obj.targetWs = common.getDemicalComma(
            obj.targetWs,
            obj.pointCnt || 0,
          );
          obj.resultWs =
            common.getDemicalComma(obj.resultWs, obj.pointCnt || 0) || null;
          obj.beforeTargetWs =
            common.getDemicalComma(obj.beforeTargetWs, obj.pointCnt || 0) ||
            null;
          obj.beforeResultWs =
            common.getDemicalComma(obj.beforeResultWs, obj.pointCnt || 0) ||
            null;
        }
        return obj;
      });
      //*트리데이터 만들기
      let returnList = [];
      list.some(obj => {
        let data = { ...obj };
        if (obj.dept === 0) {
          returnList.push(data);
        }
        this.makeTreeChildrenData(returnList, obj);
      });
      this.performList = returnList;
    },
    getEntireWeek: function(value) {
      this.entireWeek = [...value];
      this.weekList = value.map(i => {
        return { text: i.wwSeq, value: i.wwSeq };
      });
      const nowDate = `${timezone.getClientDate(
        'YYYY',
      )}${timezone.getClientDate('MM')}`;
      const yyyyMm = `${this.getSelectedYear}${this.getSelectedMonth}`;
      const temp = value.filter(i => nowDate === yyyyMm && i.nowYn === 'Y');
      this.weekData =
        temp.length === 1
          ? temp[0]
          : value.filter(i => i.baseYyyymm === yyyyMm && i.lastWeek === 'Y')[0];
      this.setWeek();
    },
  },
  created() {
    this.initColumns();
    this.isLockHandler();
    window.addEventListener('resize', this.isLockHandler);
  },
  async mounted() {
    //* 알림 선택으로 페이지 이동의 경우
    if (this.$route.params.openPopup) {
      this.openPopupFunc(
        { kpiId: this.$route.params.key, bscKpi: 'K' },
        '',
        'kpiNm',
      );
    }
    if (this.$route.params.kpiId) {
      await this[kpiTargetEstablishmentTypes.actions.FETCH_EXIST_DEF_LIST]({
        kpiId: this.$route.params.kpiId,
        exceptUseYn: true,
      });
      let kpiData = this[
        kpiTargetEstablishmentTypes.getters.GET_EXIST_DEF_LIST
      ];
      if (kpiData.length > 0) {
        this.$route.params.kpiNm = kpiData[0].kpiNm;
        this.$route.params.kpiUserId = kpiData[0].userId;
        this.$route.params.kpiDeptId = kpiData[0].deptId;
      }
      let baseYyyyMm = this.$route.params.baseYyyyMm;
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](
        baseYyyyMm.substr(0, 4),
      );
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](
        baseYyyyMm.substr(4, 2),
      );
      this.openPopupFunc(this.$route.params, '', 'reasonGoal');
    }
    if (!this.$route.params.kpiId) {
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](true);
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](false);
    } else {
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](false);
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](true);
    }
    let title = this.$t('NLS0001266');
    title = title.replace('_', this.getSelectedYear);
    title = title.replace('%', this.getSelectedMonth);
    this.columns[2].title = title || '';

    //* 탭 포커스초기화
    if (!this.$route.params.kpiId) {
      this.getTabList.current = true;
      this.getTabList.children.map(obj => {
        obj.current = false;
        return obj;
      });
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.isLockHandler);
  },
  methods: {
    isLockHandler() {
      const self = this;
      const resizeDebounce = debounce(() => {
        self.isLock = self[screenTypes.getters.GET_VIEWTYPE] === 'web';
        self.columns = self.columns.map(el => {
          if (el.hasOwnProperty('children')) {
            for (let i = 0, len = el.children.length; i < len; i++) {
              if (el.children[i].hasOwnProperty('locked')) {
                el.children[i].locked = self.isLock;
              }
            }
          }
          if (el.hasOwnProperty('locked')) {
            el.locked = self.isLock;
          }
          return el;
        });
      }, 100);
      resizeDebounce();
    },
    scrollEventHandler(e) {
      this.scrollTop = e.target.scrollTop;
    },
    initColumns() {
      this.columns = [
        {
          field: '',
          title: this.$t('NLS0000816'), //*핵심지표->지표정보
          width: this.hOriginSize + 'px',
          locked: this.isLock,
          children: [
            {
              field: 'kpiNm',
              width: this.originSize + 'px',
              title: this.$t('NLS0000161'), //*BSC관점/KPI
              locked: this.isLock,
              cell: FunctionCell,
              format: 'button',
              className: 'left',
              editor: 'tree',
            },
          ],
        },
        {
          field: 'reportYn',
          width: '58px',
          title: this.$t('NLS0000443'), //*보고용->회의항목
          //locked: this.isLock,
          format: 'check',
          className: 'center',
          cell: FunctionCell,
          headerCell: HeaderHtmlCell,
        },
        {
          title: this.$t('NLS0000397'), //*당월
          width: '250px',
          children: [
            {
              field: 'targetMs',
              width: '110px',
              title: this.$t('NLS0000310'), //*목표
              className: 'right',
              format: '{0:n}',
            },
            {
              field: 'resultMs',
              width: '110px',
              title: this.$t('NLS0000313'), //*실적
              className: 'right under-line-btn ellipsis',
              format: 'button',
              cell: FunctionCell,
            },
            {
              field: 'msPer',
              width: '70px',
              title: this.$t('NLS0000244'), //*달성률
              className: 'right hms-grid-per size',
              format: 'progress',
              cell: FunctionCell,
            },
          ],
        },
        {
          field: 'reasonGoal',
          width: '75px',
          title: this.$t('NLS0000819'), //* 성공/부진사유분석 및 대책->활동 및 계획
          className: 'counterplan-btn',
          format: 'button',
          cell: FunctionCell,
          headerCell: HeaderHtmlCell,
        },
        {
          field: 'prjCnt',
          format: 'button',
          title: this.$t('NLS0000820'), //*연결과제 수
          className: 'center under-line-btn',
          width: '67px',
          cell: FunctionCell,
          headerCell: HeaderHtmlCell,
        },
        {
          field: 'totalAnaly',
          width: '67px',
          title: this.$t('NLS0000446'), //*분석->월간 그래프
          className: 'analysis-btn',
          format: 'button',
          cell: FunctionCell,
          headerCell: HeaderHtmlCell,
        },
        {
          title: `${this.getSelectedYear}${this.$t('NLS0000812')} ${this.$t(
            'NLS0000452',
          )}`, //*YYYY 누적 실적
          children: [
            {
              field: 'targetOYy',
              width: '110px',
              title: this.$t('NLS0000310'), //*목표 (년간)
              format: '{0:n}',
            },
            {
              field: 'targetMYy',
              width: '110px',
              title: this.$t('NLS0001358'), //*수정 목표->수정 계획
              format: '{0:n}',
            },
            {
              field: 'resultTs',
              width: '110px',
              title: this.$t('NLS0000313'), //*실적
              className: 'right',
            },
            {
              field: 'tsPer',
              width: '70px',
              title: this.$t('NLS0000244'), //*달성률
              className: 'right hms-grid-per size',
              format: 'progress',
              cell: FunctionCell,
            },
          ],
        },
      ];
    },
    async openChildKpi(item) {
      //* 단순하위 KPI 팝업 오픈
      //* KPI 상세정보 조회
      await this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
        kpiId: item.kpiId,
      });
      //* 단순하위 KPI 조회
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_SIMPLE_CHILD_LIST]({
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        kpiId: item.kpiId,
        userId: item.userId,
      });
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_SIMPLE_CHILD_POP](
        true,
      );
    },
    makeTreeChildrenData(rootObj, item) {
      //* tree구조에 맞게 데이터 구조 변경
      if (rootObj instanceof Array) {
        rootObj.some(obj => {
          if (obj.id === item.parentId) {
            obj.children = obj.children || [];
            obj.expanded = true;
            obj.children.push(item);
          }
          return this.makeTreeChildrenData(obj.children, item);
        });
      }
    },
    async openPopupFunc(dataItem, value, field) {
      if (field == 'kpiNm' && dataItem.bscKpi === 'K') {
        // 실적리스트에서 수정팝업 삭제 현업요청 (20.09.10_khm)
        // this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
        //   kpiId: dataItem.kpiId,
        //   baseYyyy: this.getSelectedYear,
        // });
        // this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_UPDATE_POP](
        //   true,
        // );
      } else if (field == 'totalAnaly') {
        //*분석차트 데이터 가져오기
        let param = {
          kpiId: dataItem.kpiId,
          searchFromYyyymm: this.getSelectedYear + '01',
          searchToYyyymm: this.getSelectedYear + '12',
        };
        //*선택한 kpi정보 세팅
        this[kpiPerformanceTypes.actions.INIT_SELECTED_ANALY_KPI_INFO_DATA]({
          kpiId: dataItem.kpiId,
          kpiNm: Array.isArray(dataItem.kpiNm)
            ? dataItem.kpiNm[0]
            : dataItem.kpiNm,
        });
        await this[kpiPerformanceTypes.actions.FETCH_KPI_LATEST_RESULT](param);
        await this[kpiPerformanceTypes.actions.FETCH_KPI_TARGET_MONTH_LIST](
          param,
        );
        this[kpiPerformanceTypes.actions.INIT_VIEWS_ANALYSIS_POP](true);
        this[kpiPerformanceTypes.actions.INIT_KPI_TARGET_MONTH_LIST]([]);
      } else if (field == 'reasonGoal') {
        //성공부진사유및대책
        this.showReasonContentFunc(dataItem);
      } else if (field == 'prjCnt') {
        //*연결과제 팦업
        this[kpiPerformanceTypes.actions.FETCH_KPI_PRJ_LIST]({
          kpiId: dataItem.kpiId,
          kpiNm: Array.isArray(dataItem.kpiNm)
            ? dataItem.kpiNm[0]
            : dataItem.kpiNm,
        });
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PRJ_POP](true);
      } else if (
        (field == 'resultMs' ||
          field === 'resultWs' ||
          field === 'beforeResultWs') &&
        dataItem.bscKpi === 'K'
      ) {
        //* 월/주간실적 등록팦업
        let param = {
          field: field,
          mboAppYn: dataItem.mboAppYn, //*넣을수있는지..
          kpiId: dataItem.kpiId,
          baseYyyy: this.getSelectedYear,
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
          baseMm: this.getSelectedMonth,
        };
        //*선택한날짜 세팅
        this[
          kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_YEAR_DATA
        ](this.getSelectedYear);
        this[
          kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_MONTH_DATA
        ](this.getSelectedMonth);

        //*목표데이터 리스트 조회(년,월,주)
        this[kpiTargetEstablishmentTypes.actions.FETCH_REG_GOAL_KPI_DATA_SET](
          param,
        );
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REG_PERFORM_POP](true);
      }
    },
    showChartPopFunc() {
      //* 차트 팝업 오픈
      this[commonTypes.actions.FETCH_COM_KPI_CHART_GRP_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_KPI_CHART_GRP_SINGLE_POP](true);
    },
    async showReasonContentFunc(dataItem) {
      //*성공사유리스트 데이터 호출
      const param = {
        baseYyyymm: this.getSelectedYear + this.getSelectedMonth,
        kpiId: dataItem.kpiId,
      };
      this[kpiPerformanceTypes.actions.INIT_SELECTED_KPI_DATA]({
        kpiId: dataItem.kpiId || '',
        kpiNm: Array.isArray(dataItem.kpiNm)
          ? dataItem.kpiNm[0]
          : dataItem.kpiNm || '',
        kpiDeptId: dataItem.kpiDeptId || '',
        kpiUserId: dataItem.kpiUserId || '',
        selectedYyyy: this.getSelectedYear,
        selectedMm: this.getSelectedMonth,
      });
      this[kpiPerformanceTypes.actions.INIT_KPI_REASON_MEASURE_LIST]({});
      //*성공부진사유리스트
      await this[kpiPerformanceTypes.actions.FETCH_KPI_REASON_MEASURE_LIST](
        param,
      );
      //* 성공사유리스트 오픈
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](false);
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](true);
      //* 해당성공사유리스트 탭 추가
      let tabList = { ...this.getTabList };
      tabList.current = false;
      let checkExistTab = false;
      tabList.children.map(obj => {
        if (obj.id === dataItem.kpiId) {
          obj.current = true;
          obj.selectedYear = this.getSelectedYear;
          obj.selectedMonth = this.getSelectedMonth;
          checkExistTab = true;
        } else {
          obj.current = false;
        }
        return obj;
      });
      if (!checkExistTab) {
        //*기존에 탭에없는 성공부진사유이면
        tabList.children.push({
          id: dataItem.kpiId,
          title: Array.isArray(dataItem.kpiNm)
            ? dataItem.kpiNm[0]
            : dataItem.kpiNm,
          kpiDeptId: dataItem.kpiDeptId,
          kpiUserId: dataItem.kpiUserId,
          current: true,
          data: this[kpiPerformanceTypes.getters.GET_KPI_REASON_MEASURE_LIST],
        });
      }
      this[kpiPerformanceTypes.actions.UPDATE_TAB_LIST]({});
      this[kpiPerformanceTypes.actions.UPDATE_TAB_LIST]({ ...tabList });
    },
    clickCheckBox(item, chk) {
      const param = {
        kpiId: item.kpiId,
        tId: item.tid,
        reportYn: chk ? 'Y' : 'N',
        sortNo: item.sortNo,
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        searchUserId: this[
          kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID
        ],
      };
      //*보고용 체크
      this[kpiPerformanceTypes.actions.UPDATE_KPI_PERFORM_SINGLE](param);
    },
    showHideKpi() {
      //*KPI 전체리스트 펼치기 접기
      this.showHideAllKpiBtnNm = this.showHideAllKpiBtn
        ? this.$t('NLS0000815')
        : this.$t('NLS0001317'); //*	숨김항목 보기 /항목 숨김

      this.showHideAllKpiBtn = !this.showHideAllKpiBtn;

      if (this.showHideAllKpiBtn) {
        //*펼치기
        this.columns[0].children.splice(
          1,
          0,
          {
            field: 'kpiUnitNm',
            width: '72px',
            title: this.$t('NLS0000063'), //*단위
            locked: this.isLock,
            className: 'center',
            cell: FunctionCell,
          },
          {
            field: 'deptNm',
            width: '125px',
            title: this.$t('NLS0000064'), //*담당부서
            locked: this.isLock,
            cell: FunctionCell,
            className: 'left',
          },
          {
            field: 'userName',
            width: '115px',
            title: this.$t('NLS0000065'), //*담당자
            locked: this.isLock,
            cell: FunctionCell,
            className: 'left',
          },
          {
            field: 'bscKpiNm',
            width: '69px',
            title: this.$t('NLS0000138'), //*구분
            locked: this.isLock,
            cell: FunctionCell,
            className: 'center',
          },
        );
      } else {
        this.columns[0].children.splice(1, 4);
      }
    },
    weekSelected(data) {
      this.weekData = this.entireWeek.filter(i => i.wwSeq === data.value)[0];
      this.setWeek();
    },
    srchWeekData() {
      this.showHideWeekStatus = !this.showHideWeekStatus;
      this.showHideWeekData = this.showHideWeekStatus
        ? 'NLS0001410'
        : 'NLS0001409';
      if (!this.showHideWeekStatus) {
        this.columns.splice(5, 2);
      } else {
        this.columns.splice(
          5,
          0,
          {
            //* 금주 실적(mm.dd ~ mm.dd)
            title: `${this.$t('NLS0001407')} (${this.thisFrom} ~ ${
              this.thisTo
            })`,
            children: [
              {
                field: 'targetWs',
                width: '97px',
                title: this.$t('NLS0000310'), //*목표
                format: '{0:n}',
              },
              {
                field: 'resultWs',
                width: '100px',
                title: this.$t('NLS0000313'), //*실적
                className: 'right',
                format: 'button',
                cell: FunctionCell,
              },
              {
                field: 'wsPer',
                width: '70px',
                title: this.$t('NLS0000244'), //*달성률
                className: 'right hms-grid-per size',
                format: 'progress',
                cell: FunctionCell,
              },
            ],
          },
          {
            title: `${this.$t('NLS0001408')} (${this.lastFrom} ~ ${
              this.lastTo
            })`, //*전주 실적(mm.dd ~ mm.dd)
            children: [
              {
                field: 'beforeTargetWs',
                width: '97px',
                title: this.$t('NLS0000310'), //*목표
                format: '{0:n}',
              },
              {
                field: 'beforeResultWs',
                width: '100px',
                title: this.$t('NLS0000313'), //*실적
                className: 'right',
                format: 'button',
                cell: FunctionCell,
              },
              {
                field: 'bwsPer',
                width: '70px',
                title: this.$t('NLS0000244'), //*달성률
                className: 'hms-grid-per size',
                format: 'progress',
                cell: FunctionCell,
              },
            ],
          },
        );
      }
    },
    setWeek() {
      this.wwSeq = { text: this.weekData.wwSeq, value: this.weekData.wwSeq };
      this.thisFrom = timezone.convertToDateFormat(
        timezone.convertToISO8601String(this.weekData.weekFromDate),
        'MM.DD',
      );
      this.thisTo = timezone.convertToDateFormat(
        timezone.convertToISO8601String(this.weekData.weekToDate),
        'MM.DD',
      );
      this.lastFrom = timezone.convertToDateFormat(
        timezone.convertToISO8601String(this.weekData.beforeFromDate),
        'MM.DD',
      );
      this.lastTo = timezone.convertToDateFormat(
        timezone.convertToISO8601String(this.weekData.beforeToDate),
        'MM.DD',
      );
      this[kpiPerformanceTypes.actions.INIT_WWSEQ_PARAM](this.weekData.wwSeq);
      if (this.showHideWeekStatus) {
        this.columns[5].title = `${this.$t('NLS0001407')} (${this.thisFrom} ~ ${
          this.thisTo
        })`;
        this.columns[6].title = `${this.$t('NLS0001408')} (${this.lastFrom} ~ ${
          this.lastTo
        })`;
      }
      const param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: `${this.getSelectedYear}${this.getSelectedMonth}`,
        searchUserId: this.getSrchUser,
        wwSeq: this.wwSeq.value,
      };
      this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
    },
    goToPerformReport() {
      // this[kpiPerformanceTypes.actions.INIT_DATA_SEARCH_KPI_DATA]({
      //   deptId: items.deptId,
      //   deptNm: items.deptNm,
      //   userNm: items.userNm,
      //   srcId: items.srcId,
      //   userId: items.userId,
      // });
      this.$router.push({
        name: 'kpiPerformReport',
      });
    },
    resizeKpiColumnFn() {
      this.resizeKpiColumnBtn = !this.resizeKpiColumnBtn;
      let smallSize = this.originSize * 0.7;
      let minusSize = this.originSize - smallSize;
      let smallHSize = parseInt(this.hOriginSize) - parseInt(minusSize);

      if (this.resizeKpiColumnBtn) {
        //확대
        this.resizeKpiColumn = '영역 축소';
        this.columns[0].width = this.hOriginSize + 'px'; //지표정보
        this.columns[0].children[0].width = this.originSize + 'px'; //bsc관점/kpi
      } else {
        //축소
        this.resizeKpiColumn = '영역 확대';
        this.columns[0].width = smallHSize + 'px'; //지표정보
        this.columns[0].children[0].width = smallSize + 'px'; //bsc관점/kpi
      }
    },
  },
};
</script>
