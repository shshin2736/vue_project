<template>
  <!-- 단순 하위 kPI 보기 팝업-->
  <com-overlay :index="9" v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000936') }} ({{ selKpiNm }})</p>
              <!--하위 KPI 보기-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer-pop__subtitle layer-exist-btn">
              <p>
                {{ $t('NLS0000396') }} : {{ getSelectedYear
                }}{{ $t('NLS0000812') }} {{ getSelectedMonth
                }}{{ $t('NLS0000684') }}
              </p>
              <!--실적년월 , 년, 월 -->
              <div class="search__btn__box" v-if="thisYearCheck">
                <button
                  type="button"
                  class="darkgray-btn"
                  @click="deleteKpiSimpleChild"
                >
                  <span>{{ $t('NLS0000075') }}</span
                  ><!--삭제-->
                </button>
                <button type="button" class="blue-btn" @click="openKpiPop">
                  <span>{{ $t('NLS0000067') }}</span
                  ><!--추가-->
                </button>
              </div>
            </div>
            <div class="hms-grid">
              <com-native-grid
                :data="childKpiData"
                :columns="columns"
                height="340"
                @btnclick="openPopupFunc"
                selectedfield="selected"
                selectedtype="checked"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
                @cellClick="openPopupFunc"
              ></com-native-grid>
            </div>
          </div>
        </div>
      </div>
      <a ref="links"></a>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone, common } from '@/utils';
import {
  kpiTargetEstablishmentStore,
  commonStore,
  kpiPerformanceStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderHtmlCell from '@/components/common/business/HeaderHtmlCell';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
export default {
  name: 'KpiSimpleChildPopup',
  components: {
    ComNativeGrid,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore, commonStore, kpiPerformanceStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selKpiId: '',
      selKpiNm: '',
      columns: [],
      selectedRow: [],
      childKpiData: [],
      thisYearCheck: true,
    };
  },
  computed: {
    getChildKpiData() {
      return this[
        kpiTargetEstablishmentTypes.getters.GET_KPI_SIMPLE_CHILD_LIST
      ];
    },
    getSumMonth() {
      return '';
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getKpiDefForm() {
      //*속성그룹폼데이터
      let data = this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA];
      return data.kpiDefData;
    },
    getSelectedKpi() {
      return this[commonTypes.getters.GET_SELECTED_COM_KPI_POOL_LIST];
    },
    getKpiDataSet() {
      return this[kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA];
    },
  },
  watch: {
    getChildKpiData(data) {
      let msArr = [];
      let tsArr = [];
      this.childKpiData = [];
      if (common.isEmpty(data)) return;
      data.map(obj => {
        msArr.push(
          !common.isEmpty(obj.resultMs)
            ? parseFloat(common.getDemicalPoint(obj.resultMs, 1))
            : null,
        );
        tsArr.push(
          !common.isEmpty(obj.resultTs)
            ? parseFloat(common.getDemicalPoint(obj.resultTs, 1))
            : null,
        );
        if (!common.isEmpty(obj.resultMs)) {
          obj.archRateMm = common.getDemicalPoint(
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
            const achRateVal = obj.archRateMm;
            obj.archRateMm = [
              achRateVal,
              common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
            ];
          }
        }
        if (!common.isEmpty(obj.resultTs)) {
          obj.archComuRate = common.getDemicalPoint(
            common.getAchRate(
              obj.targetOTs,
              obj.targetMTs,
              obj.resultTs,
              obj.kpiAchType,
            ),
            0,
          );
          if (obj.achMeasure === 'R') {
            //*RANGE일때 (달성률-min)/(max-min)*100 계산식
            const achRateVal = obj.archComuRate;
            obj.archComuRate = [
              achRateVal,
              common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
            ];
          }
        }
        obj.resultMs = common.getDemicalComma(obj.resultMs, obj.pointCnt || 0);
        obj.resultTs = common.getDemicalComma(obj.resultTs, obj.pointCnt || 0);
        obj.targetMs = common.getDemicalComma(
          !common.isEmpty(obj.targetMMs) ? obj.targetMMs : obj.targetOMs,
          obj.pointCnt || 0,
        );
        obj.targetTs = common.getDemicalComma(
          !common.isEmpty(obj.targetMTs) ? obj.targetMTs : obj.targetOTs,
          obj.pointCnt || 0,
        );
        obj.reasonGoal = obj.reasonCnt > 0 ? 'bg_on' : '';

        return obj;
      });
      this.childKpiData = [...data];
    },
    getKpiDefForm: function(value) {
      this.selKpiId = value.kpiId;
      this.selKpiNm = value.kpiNm;
    },
    getSelectedKpi: function(value) {
      if (value.length > 0) {
        this.saveKpiSimpleChild(value);
        this.getCheckPage();
        this[commonTypes.actions.INIT_SELECTED_COM_KPI_POOL_LIST]([]);
      }
    },
    getSelectedYear: function(year) {
      const future = Number(timezone.getClientDate('YYYY')) < Number(year);
      this.thisYearCheck =
        timezone.getClientDate('YYYY') === year || future ? true : false;
      // this.thisYearCheck =
      //   timezone.getClientDate('YYYY') === data ? true : false;
    },
    getKpiDataSet: function(value) {
      if (value !== undefined) {
        const param = {
          baseYyyy: this.getSelectedYear,
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
          kpiId: this.selKpiId,
        };
        this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_SIMPLE_CHILD_LIST](
          param,
        );
      }
    },
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          title: 'KPI',
          locked: true,
          children: [
            {
              field: 'kpiNm',
              title: 'KPI명', //*KPI명
              width: '255px',
              className: 'left td-ellipsis',
            },
            {
              field: 'deptNm',
              title: '담당부서', //*담당부서
              width: '117px',
              className: 'left td-ellipsis',
            },
            {
              field: 'userNm',
              title: '담당자', //*담당자
              width: '95px',
              className: 'left td-ellipsis',
            },
            {
              field: 'kpiUnitNm',
              title: '단위', //*단위
              width: '73px',
              className: 'center td-ellipsis',
            },
          ],
        },
        {
          title: '당월', //*당월
          locked: true,
          children: [
            {
              field: 'targetMs',
              title: '목표', //*목표
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'resultMs',
              title: '실적', //*실적
              width: '95px',
              // format: '{0:n}',
              className:
                this.$route.path === '/KpiPerformanceListPage'
                  ? 'right input-cell inCell'
                  : 'right',
            },
            {
              field: 'archRateMm',
              title: '달성률', //*달성률
              width: '82px',
              className: 'right hms-grid-per size',
              format: 'progress',
              cell: FunctionCell,
            },
            {
              field: 'reasonGoal',
              width: '77px',
              title: this.$t('NLS0000819'), //* 성공/부진사유분석 및 대책->활동 및 계획
              className: 'counterplan-btn',
              format: 'button',
              cell: FunctionCell,
              headerCell: HeaderHtmlCell,
            },
          ],
        },
        {
          title: '누계', //*누계
          locked: true,
          children: [
            {
              field: 'targetTs',
              title: '목표', //*목표
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'resultTs',
              title: '실적', //*실적
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'archComuRate',
              title: '달성률', //*달성률
              width: '82px',
              className: 'right hms-grid-per size',
              format: 'progress',
              cell: FunctionCell,
            },
          ],
        },
      ];
    },
    clickCheckBox(item, checked) {
      if (checked) {
        this.selectedRow.push(item);
      } else {
        const index = this.selectedRow.findIndex(el => el.kpiId === item.kpiId);
        this.selectedRow.splice(index, 1);
      }
    },
    clickAllCheckBox(row) {
      this.selectedRow = [];
      this.selectedRow = row;
    },
    openPopupFunc(dataItem, value, field) {
      if (field == 'reasonGoal') {
        //성공부진사유및대책
        if (common.isEmpty(dataItem.subKpiId)) return;
        const links = this.$refs.links;
        links.setAttribute(
          'href',
          `/redirectForm?auth=${
            this.$route.params.auth
          }&path=KpiPerformanceListPage&baseYyyyMm=${this.getSelectedYear +
            this.getSelectedMonth}&kpiId=${dataItem.subKpiId}`,
        );
        links.setAttribute('target', '_blank');
        links.click();
      } else if (field === 'resultMs') {
        if (this.$route.path === '/kpiTargetEstablishment') return;
        //* 월/주간실적 등록팝업
        let param = {
          field: field,
          mboAppYn: 'N',
          kpiId: dataItem.subKpiId,
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
    openKpiPop() {
      //*추가
      this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP]({
        value: true,
        flag: 'other',
      });
    },
    async saveKpiSimpleChild(value) {
      //*추가
      let list = value.map(el => {
        let obj = {};
        obj.subKpiId = el.kpiId;
        return obj;
      });
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        kpiId: this.selKpiId,
        subKpiList: list,
      };
      await this[
        kpiTargetEstablishmentTypes.actions.UPDATE_KPI_SIMPLE_CHILD_LIST
      ](param);
      this.getCheckPage();
    },
    async deleteKpiSimpleChild() {
      //*삭제
      common.confirm('NLS0000004', async () => {
        let param = {
          baseYyyy: this.getSelectedYear,
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
          kpiId: this.selKpiId,
          subKpiList: this.selectedRow,
        };
        await this[
          kpiTargetEstablishmentTypes.actions.DELETE_KPI_SIMPLE_CHILD_LIST
        ](param);
        this.getCheckPage();
      });
    },
    getCheckPage() {
      //* 리스트 재호출
      if (this.$router.history.current.name === 'KpiPerformanceListPage') {
        this.getKpiPerformList();
      } else if (
        this.$router.history.current.name === 'kpiTargetEstablishment'
      ) {
        this.getKpiTreeList();
      }
    },
    getKpiPerformList() {
      const searchUserId = this[
        kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID
      ];
      //* KPI실적 리스트 조회
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        searchUserId: searchUserId || '',
      };
      this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.getSelectedYear);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.getSelectedMonth);
    },
    getKpiTreeList() {
      //* KPI목표수립 리스트 조회
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
      };
      this[
        kpiTargetEstablishmentTypes.actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST
      ](param);
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.getSelectedYear);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.getSelectedMonth);
    },
    closePopup() {
      this.selKpiId = '';
      this.selKpiNm = '';
      this.selectedRow = [];
      this.$emit('input', false);
    },
  },
};
</script>
