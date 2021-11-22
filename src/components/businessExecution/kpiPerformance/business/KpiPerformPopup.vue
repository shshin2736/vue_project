<template>
  <!-- 월실적 입력 팦업 -->
  <com-overlay :index="100" v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal">
            <div class="layer-pop__title">
              <p>{{ baseYear.value }}.{{ baseMonth.value }} {{ kpiTitle }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer_scroll">
              <div class="search-box">
                <div class="search__form__box__block">
                  <template v-if="picked === 'weekPerform'">
                    <div class="search__form__box type-table line2">
                      <p class="search__form__title">
                        {{ $t('NLS0000212') }}
                      </p>
                      <com-dropdowns
                        :data="getYearList"
                        rules="required"
                        textfield="text"
                        valuefield="value"
                        class="hms-dropdown type1"
                        v-model="baseYear"
                        @change="changeKpiGoalYearData"
                      ></com-dropdowns>
                      <com-dropdowns
                        v-if="kpiCycle === TYPE_WEEK"
                        :data="baseMonthOptions"
                        rules="required"
                        textfield="text"
                        valuefield="value"
                        class="hms-dropdown type1"
                        v-model="baseMonth"
                        @change="changeKpiGoalMonthData"
                      ></com-dropdowns>
                    </div>
                  </template>
                  <div
                    class="search__form__box type-table line2"
                    v-if="
                      !(kpiCycle === TYPE_MONTH && picked === 'weekPerform')
                    "
                  >
                    <p class="search__form__title">
                      {{ $t('NLS0000809') }}<span class="required-text">*</span>
                    </p>
                    <span class="input__box type-wide type-nobtn">
                      <com-input-text
                        type="text"
                        :isReadOnly="true"
                        v-model="resultYyForm"
                      />
                    </span>
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title divide">
                    {{ $t('NLS0000138') }}
                  </p>
                  <div class="radio-box">
                    <span class="radio-form"
                      ><input
                        type="radio"
                        id="perf-opt1"
                        value="monthPerform"
                        name="testradio"
                        v-model="picked"
                        checked="checked"
                      />
                      <label for="perf-opt1">
                        {{ $t('NLS0000810') }}</label
                      ></span
                    >
                    <!-- v-if="kpiCycle === TYPE_WEEK" -->
                    <span class="radio-form">
                      <input
                        type="radio"
                        id="perf-opt2"
                        name="testradio"
                        value="weekPerform"
                        v-model="picked"
                      /><label for="perf-opt2">
                        {{ $t('NLS0000811') }}</label
                      ></span
                    >
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000402') }} : {{ kpiAccTypeNm }}
                  </p>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000061') }} : {{ kpiAchTypeNm }}
                  </p>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000063') }} : {{ kpiUnitNm }}
                  </p>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000057') }} : {{ kpiCycleNm }}
                  </p>
                  <!--측정주기 -->
                </div>
              </div>
              <template v-if="picked === 'monthPerform'">
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalMonthData"
                    :columns="columns"
                    :addBtnHide="true"
                    height="625"
                    editfield="inEdit"
                    @save="saveMonthGoal"
                    :isCellEnterNext="true"
                  ></com-native-grid>
                </div>
              </template>
              <template
                v-if="picked === 'weekPerform' && kpiCycle === TYPE_WEEK"
              >
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalWeekData"
                    :columns="columns2"
                    :addBtnHide="true"
                    height="400"
                    editfield="inEdit"
                    @save="saveWeekGoal"
                    :isCellEnterNext="true"
                  ></com-native-grid>
                </div>
              </template>
              <template
                v-if="picked === 'weekPerform' && kpiCycle === TYPE_MONTH"
              >
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalMw"
                    :columns="columns3"
                    :addBtnHide="true"
                    height="400"
                    editfield="inEdit"
                    @save="saveWeekGoal"
                    :isCellEnterNext="true"
                  ></com-native-grid>
                </div>
              </template>
            </div>
            <div
              class="layer__btn-box"
              v-if="
                (picked === 'monthPerform' &&
                  kpiCycle === TYPE_MONTH &&
                  showBtn &&
                  kpiPerType !== TYPE_AUTO_SUM) ||
                  (picked === 'monthPerform' &&
                    kpiAccType === TYPE_TAVG &&
                    showBtn &&
                    kpiPerType !== TYPE_AUTO_SUM)
              "
            >
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="savePerformBtn('m')"
              >
                <span> {{ $t('NLS0000074') }}</span>
              </com-button>
            </div>
            <div
              class="layer__btn-box"
              v-if="
                picked === 'weekPerform' &&
                  kpiCycle === TYPE_WEEK &&
                  showBtn &&
                  kpiPerType !== TYPE_AUTO_SUM
              "
            >
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="savePerformBtn('w')"
              >
                <span> {{ $t('NLS0000074') }}</span>
              </com-button>
            </div>
            <!-- Type Month week data save -->
            <div
              class="layer__btn-box"
              v-if="
                picked === 'weekPerform' &&
                  kpiCycle === TYPE_MONTH &&
                  showBtn &&
                  kpiPerType !== TYPE_AUTO_SUM
              "
            >
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="saveMonthWeekBtn"
              >
                <span> {{ $t('NLS0000074') }}</span>
              </com-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 월실적 입력 팦업 -->
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone, common } from '@/utils';
import {
  kpiTargetEstablishmentStore,
  commonStore,
  kpiPerformanceStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';

export default {
  name: 'KpiPerformPopup',
  mixins: [kpiTargetEstablishmentStore, commonStore, kpiPerformanceStore],
  components: {
    ComNativeGrid,
    ComButton,
    ComDropdowns,
    ComInputText,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      columns: [],
      columns2: [],
      baseYear: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      baseMonth: {
        text: timezone.getClientDate('MM'),
        value: timezone.getClientDate('MM'),
      },
      baseMonthOptions: [
        { text: '01', value: '01' },
        { text: '02', value: '02' },
        { text: '03', value: '03' },
        { text: '04', value: '04' },
        { text: '05', value: '05' },
        { text: '06', value: '06' },
        { text: '07', value: '07' },
        { text: '08', value: '08' },
        { text: '09', value: '09' },
        { text: '10', value: '10' },
        { text: '11', value: '11' },
        { text: '12', value: '12' },
      ],
      kpiUnitNm: '',
      kpiPerType: '',
      kpiAccTypeNm: '',
      kpiAchTypeNm: '',
      kpiAccType: '',
      kpiCycle: '',
      kpiCycleNm: '',
      kpiTitle: '',
      picked: '',
      resultYyForm: '',
      goalMonthData: [],
      goalWeekData: [],
      goalMw: [],
      TYPE_SUM: '31', //*합계 (공통코드)
      TYPE_AVG: '32', //*단순평균
      TYPE_LQ: '117', //*기말
      TYPE_TAVG: '33', //*총평균
      TYPE_MONTH: '34', //*월별
      TYPE_WEEK: '118', //*주별
      TYPE_AUTO_SUM: '91', //*자동합산
      showBtn: false, //*버튼권한
      kpiUserId: '',
      kpiUseYn: 'Y',
    };
  },
  computed: {
    coUserList() {
      return this[kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA]
        .coUserList;
    },
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getSelectedYear() {
      return this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_YEAR_DATA
      ];
    },
    getSelectedMonth() {
      return this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_MONTH_DATA
      ];
    },
    getKpiAddUserList() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.kpiAddUser;
    },
    getKpiGoalYearData() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetYearData;
    },
    getGoalMonthData() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetMonthData;
    },
    getGoalWeekData() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetWeekData;
    },
    getGoalMw() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetMwData;
    },
    getField() {
      return this[kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA];
    },
  },
  watch: {
    getSelectedYear: function(data) {
      this.baseYear = { text: data, value: data };
      this.columns[0].title = data + this.$t('NLS0000812');
    },
    getSelectedMonth: function(data) {
      this.baseMonth = { text: data, value: data };
    },
    //*년간목표실적데이터 및 KPI 관련 데이터 처리
    getKpiGoalYearData: function(data) {
      if (common.isEmpty(data)) return;

      this.kpiTitle = data.kpiNm;
      this.kpiUserId = data.kpiUserId;
      this.kpiAccTypeNm = data.kpiAccTypeNm;
      this.kpiAchTypeNm = data.kpiAchTypeNm;
      this.kpiAccType = data.kpiAccType;
      this.kpiPerType = data.kpiPerType;
      this.kpiCycle = data.kpiCycle;
      this.kpiCycleNm = data.kpiCycleNm;
      this.kpiUnitNm = data.kpiUnitNm;
      this.pointCnt = data.pointCnt;
      this.kpiUseYn = data.useYn;
      //*년간실적 데이터 세팅
      this.resultYyForm = common.getDemicalComma(
        data.resultYy,
        this.pointCnt || 0,
      );
      //*권한체크
      this.getCheckUser();
      //*총평균 에디터수정가능처리
      this.getCheckTavg();
    },
    //*월간목표실적데이터처리
    getGoalMonthData: function(data) {
      const items = data.map(item => {
        const obj = { ...item };
        //*년월표시
        obj.sumTypeNm =
          obj.sumType === '0'
            ? timezone.convertToDateFormat(
                timezone.convertToISO8601String(obj.baseYyyymm),
                'YYYY-MM',
              )
            : this.getSumTypeNm(obj.sumType);

        //*목표등록/수정목표
        obj.targetMs = common.isEmpty(obj.targetMMs)
          ? obj.targetOMs
          : obj.targetMMs;
        obj.targetMs = common.numberWithCommas(
          common.getDemicalPoint(obj.targetMs, this.pointCnt || 0),
        );
        //*실적
        obj.resultMs = common.numberWithCommas(
          common.getDemicalPoint(obj.resultMs, this.pointCnt || 0),
        );
        //*실적누계
        obj.resultTs = common.numberWithCommas(
          common.getDemicalPoint(obj.resultTs, this.pointCnt || 0),
        );
        //* mbo승인이나거나, 주별이면서 총평균이아니거나, 총평균이아니면서 년월표시가 아니고,자동합산인 데이터들은 데이터수정불가
        obj.inCell =
          this.getMboAppYn === 'Y' ||
          (this.kpiCycle === this.TYPE_WEEK &&
            this.kpiAccType !== this.TYPE_TAVG) ||
          (this.kpiAccType !== this.TYPE_TAVG && obj.sumType !== '0') ||
          this.kpiPerType === this.TYPE_AUTO_SUM
            ? false
            : true;
        return obj;
      });

      this.goalMonthData = items;
    },
    //*주간목표실적데이터처리
    getGoalWeekData: function(data) {
      const items = data.map(item => {
        const obj = { ...item };
        //*주목표
        obj.targetWs = common.isEmpty(obj.targetMWs)
          ? obj.targetOWs
          : obj.targetMWs;
        obj.targetMs = common.numberWithCommas(
          common.getDemicalPoint(obj.targetMs, this.pointCnt || 0),
        );
        //*주실적
        obj.resultWs = common.getDemicalPoint(obj.resultWs, this.pointCnt || 0);
        //*주실적누계
        obj.resultTs = common.getDemicalPoint(obj.resultTs, this.pointCnt || 0);
        //*주별일때 목표수정가능
        obj.inCell =
          this.kpiCycle === this.TYPE_WEEK &&
          this.kpiPerType !== this.TYPE_AUTO_SUM
            ? true
            : false;
        return obj;
      });
      this.goalWeekData = items;
    },
    getGoalMw: function(data) {
      const items = data.map(item => {
        const obj = { ...item };
        //*주목표
        obj.targetWs = common.isEmpty(obj.targetMWs)
          ? obj.targetOWs
          : obj.targetMWs;
        obj.targetWs = common.numberWithCommas(
          common.getDemicalPoint(obj.targetWs, this.pointCnt || 0),
        );
        //*주실적
        obj.resultWs = common.numberWithCommas(
          common.getDemicalPoint(obj.resultWs, this.pointCnt || 0),
        );
        //*주실적누계
        obj.resultTs = common.numberWithCommas(
          common.getDemicalPoint(obj.resultTs, this.pointCnt || 0),
        );
        obj.inCell =
          this.kpiCycle === this.TYPE_MONTH &&
          this.kpiPerType !== this.TYPE_AUTO_SUM
            ? true
            : false;
        return obj;
      });
      this.goalMw = items;
    },
    getField: function(value) {
      if (value.field === undefined) return;
      this.picked =
        value.field === 'resultMs' && this.kpiCycle === this.TYPE_MONTH
          ? 'monthPerform'
          : 'weekPerform';
    },
  },
  mounted() {
    this.initColumns();
    let year = this[
      kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_YEAR_DATA
    ];
    year = year ? year : this.baseYear.value;
    this.baseYear = { text: year, value: year };
    this.columns[0].title = year + this.$t('NLS0000812');
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'sumTypeNm',
          title: this.$t('NLS0000812'), //*년
          className: 'center',
        },
        {
          field: 'targetMs',
          title: this.$t('NLS0000392'), //*당월 목표
          className: 'comma',
        },
        {
          field: 'resultMs',
          title: this.$t('NLS0000451'), //*당월 실적
          className: 'comma input-cell inCell', //inCell
          inCell: true,
        },
        {
          field: 'resultTs',
          title: this.$t('NLS0000452'), //*누적 실적
          className: 'comma',
          inCell: false,
        },
      ];
      this.columns2 = [
        {
          field: 'wwSeq',
          title: this.$t('NLS0000813'), //*주차
          className: 'center',
        },
        {
          field: 'startDateForm',
          title: this.$t('NLS0000158'), //*시작일
          className: 'center',
        },
        {
          field: 'endDateForm',
          title: this.$t('NLS0000159'), //*종료일
          className: 'center',
        },
        {
          field: 'targetWs',
          title: this.$t('NLS0001404'), //*목표
          className: 'comma',
        },
        {
          field: 'resultWs',
          title: this.$t('NLS0001405'), //*실적
          inCell: true,
          className: 'comma inCell input-cell',
        },
        {
          field: 'resultTs',
          title: this.$t('NLS0000452'), //*누적 실적
          inCell: false,
          className: 'comma',
        },
      ];
      this.columns3 = [
        {
          field: 'wwSeq',
          title: this.$t('NLS0000813'), //*주차
          className: 'center',
        },
        {
          field: 'weekFromDateForm',
          title: this.$t('NLS0000158'), //*시작일
          className: 'center',
        },
        {
          field: 'weekToDateForm',
          title: this.$t('NLS0000159'), //*종료일
          className: 'center',
        },
        {
          field: 'targetWs',
          title: this.$t('NLS0000310'), //*목표
          className: 'comma',
        },
        {
          field: 'resultWs',
          title: this.$t('NLS0000313'), //*실적
          inCell: true,
          className: 'comma inCell input-cell',
        },
        {
          field: 'resultTs',
          title: this.$t('NLS0000452'), //*누적 실적
          inCell: false,
          className: 'comma',
        },
      ];
    },
    getSumTypeNm(sumType) {
      if (sumType === '1') return this.$t('NLS0000832');
      //*1분기 계
      else if (sumType === '2') return this.$t('NLS0000833');
      //*2분기 계
      else if (sumType === '3') return this.$t('NLS0000834');
      //*상반기 계
      else if (sumType === '4') return this.$t('NLS0000835');
      //*3분기 계
      else if (sumType === '5') return this.$t('NLS0000836');
      //*4분기 계
      else if (sumType === '6') return this.$t('NLS0000837');
      //*하반기 계
      else if (sumType === '7') return this.$t('NLS0000839');
      //*년간 합계
    },
    getCheckUser() {
      //*해당kpi수정가능한 user인지
      this.showBtn = false;
      const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      const loginUserId = loginUserInfo.userId;
      const userType = loginUserInfo.userType;
      // let addUser = -1;
      // if (!common.isEmpty(this.getKpiAddUserList)) {
      //   addUser = this.getKpiAddUserList.findIndex(
      //     x => x.kpiAddUserId === loginUserId,
      //   );
      // }
      //*ADMIN, 당담자, 공동 목표/실적 담당자 일 때
      if (
        (loginUserId === this.kpiUserId ||
          this.coUserList.some(item => item.userId === loginUserId) ||
          userType === 'ADMIN' ||
          userType === 'SUPER') &&
        this.kpiUseYn === 'Y'
      ) {
        this.showBtn = true;
      }
    },
    getCheckTavg() {
      //*총평균체크 에디터 수정여부처리
      this.columns[3].inCell = false;
      this.columns2[5].inCell = false;
      this.columns2[5].inCell = false;
      this.columns[3].className = '';
      this.columns2[5].className = '';
      this.columns3[5].className = '';
      if (
        this.kpiAccType === this.TYPE_TAVG &&
        !common.isEmpty(this.columns[2]) &&
        !common.isEmpty(this.columns2[4])
      ) {
        this.columns[3].inCell = true;
        this.columns2[5].inCell = true;
        this.columns3[5].inCell = true;
        this.columns[3].className = 'inCell input-cell';
        this.columns2[5].className = 'inCell input-cell';
        this.columns3[5].className = 'inCell input-cell';
      }
    },
    changeKpiGoalYearData(e) {
      //* 목표등록데이터 조회
      this.baseYear = e.target.value.value;
      this.columns[0].title = this.baseYear + '년';
      this[
        kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_YEAR_DATA
      ](this.baseYear);
      this.getRegGoalDataSet();
    },
    changeKpiGoalMonthData(e) {
      //* 목표등록데이터 조회
      this.baseMonth = e.target.value.value;
      this[
        kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_MONTH_DATA
      ](this.baseMonth);
      this.getRegGoalDataSet();
    },
    getRegGoalDataSet() {
      //*목표데이터 다시가져오기
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        baseMm: this.getSelectedMonth,
        kpiId: this.getKpiGoalYearData.kpiId,
      };
      this[kpiTargetEstablishmentTypes.actions.FETCH_REG_GOAL_KPI_DATA_SET](
        param,
      );
    },
    getTargetPerformListData() {
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
    },
    saveMonthGoal(row, items) {
      this.goalMonthData = this.getCalMonth(items);
    },
    saveWeekGoal(row, items) {
      this.getCalWeek(items);
    },
    getCalMonth(items) {
      //*입력한 월목표데이터 계산
      //*1월-12월데이터세팅
      const yearList = items.reduce((acc, cur) => {
        const obj = Object.assign(cur, {});
        if (obj.sumType === '0') acc.push(obj['resultMs']);
        return acc;
      }, []);
      //*계산
      let list = [...items];
      let dataList = list.map(item => {
        const obj = Object.assign(item, {});
        //*년도(ex_2020.01)
        if (obj.sumType === '0') {
          let month = parseInt(common.getMonth(obj.baseYyyymm), 10);
          //*합계
          if (this.kpiAccType === this.TYPE_SUM) {
            obj.resultTs = common.isEmpty(obj.resultMs)
              ? ''
              : common.getSum(yearList.slice(0, month));
          }
          //*평균
          else if (this.kpiAccType === this.TYPE_AVG) {
            obj.resultTs = common.isEmpty(obj.resultMs)
              ? ''
              : common.getAverage(yearList.slice(0, month));
          }
          //*기말
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultTs = yearList[month - 1];
          }
        }
        //*1분기
        else if (obj.sumType === '1') {
          let yearData = yearList.slice(0, 3);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (1분기 = 1월 + 2월 + 3월)
            obj.resultMs = common.getSum(yearData);
            //*합계누계 (1분기 = 1월 + 2월 + 3월)
            obj.resultTs = common.getSum(yearData);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (1분기 = (1월 + 2월 + 3월) / 3)
            obj.resultMs = common.getAverage(yearData);
            //*단순평균누계 (1분기 = (1월 + 2월 + 3월) / 3)
            obj.resultTs = common.getAverage(yearData);
          }
          //*기말(3월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[2];
            obj.resultTs = yearList[2];
          }
        }
        //*2분기
        else if (obj.sumType === '2') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (2분기 = 4월 + 5월 + 6월)
            obj.resultMs = common.getSum(yearList.slice(3, 6));
            //*합계누계 (1분기+2분기)
            obj.resultTs = common.getSum(yearList.slice(0, 6));
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (2분기 = (4월 + 5월 + 6월) / 3)
            obj.resultMs = common.getAverage(yearList.slice(3, 6));
            //*단순평균누계 (2분기 = (1분기+2분기) / 2)
            obj.resultTs = common.getAverage(yearList.slice(0, 6));
          }
          //*기말(6월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[5];
            obj.resultTs = yearList[5];
          }
        }
        //*상반기
        else if (obj.sumType === '3') {
          let yearData = yearList.slice(0, 6);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (상반기 = 1분기 + 2분기)
            obj.resultMs = common.getSum(yearData);
            //*합계누계 (상반기 = 1분기 + 2분기)
            obj.resultTs = common.getSum(yearData);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (상반기 = (1월 + 2월 + 3월 + 4월 + 5월 + 6월) / 6)
            obj.resultMs = common.getAverage(yearData);
            //*단순평균누계 (상반기 = (1월 + 2월 + 3월 + 4월 + 5월 + 6월) / 6)
            obj.resultTs = common.getAverage(yearData);
          }
          //*기말(6월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[5];
            obj.resultTs = yearList[5];
          }
        }
        //*3분기
        else if (obj.sumType === '4') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (3분기 = 7월 + 8월 + 9월)
            obj.resultMs = common.getSum(yearList.slice(6, 9));
            //*합계누계 (3분기 = 1분기+2분기+3분기)
            obj.resultTs = common.getSum(yearList.slice(0, 9));
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (3분기 = (7월 + 8월 + 9월) / 3)
            obj.resultMs = common.getAverage(yearList.slice(6, 9));
            //*단순평균누계 (3분기 = 1분기+2분기+3분기) / 3)
            obj.resultTs = common.getAverage(yearList.slice(0, 9));
          }
          //*기말(9월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[8];
            obj.resultTs = yearList[8];
          }
        }
        //*4분기
        else if (obj.sumType === '5') {
          let yearData = yearList.slice(9, 12);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (4분기 = 10월 + 11월 + 12월)
            obj.resultMs = common.getSum(yearData);
            //*합계누계 (4분기 = 1분기+2분기+3분기+4분기)
            obj.resultTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (4분기 = (10월 + 11월 + 12월) / 3)
            obj.resultMs = common.getAverage(yearData);
            //*단순평균누계 (4분기 = (1분기+2분기+3분기+4분기) / 4)
            obj.resultTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[11];
            obj.resultTs = yearList[11];
          }
        }
        //*하반기
        else if (obj.sumType === '6') {
          let yearData = yearList.slice(6, 12);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (3분기 + 4분기)
            obj.resultMs = common.getSum(yearData);
            //*합계누계 (하반기 = 1분기+2분기+3분기+4분기)
            obj.resultTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (하반기 = (7월 + 8월 + 9월 + 10월 + 11월 + 12월) / 6)
            obj.resultMs = common.getAverage(yearData);
            //*단순평균누계 (하반기 = (1월 + ... +7월 + 8월 + 9월 + 10월 + 11월 + 12월) / 12)
            obj.resultTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[11];
            obj.resultTs = yearList[11];
          }
        }
        //*총 계
        else if (obj.sumType === '7') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (년간실적 = 상반기 + 하반기)
            obj.resultMs = common.getSum(yearList);
            //*합계누계 (년간실적 = 상반기 + 하반기)
            obj.resultTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (년간실적 = (상반기 + 하반기) / 12)
            obj.resultMs = common.getAverage(yearList);
            //*단순평균누계 (년간실적 = (상반기 + 하반기) / 12)
            obj.resultTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.resultMs = yearList[11];
            obj.resultTs = yearList[11];
          }

          //*총계 년실적에 표시
          this.resultYyForm = common.numberWithCommas(obj.resultMs);
        }

        //*총평균일때 처리-->(총평균 월데이터 누적데이터로 세팅제거 20.09.09_khm)
        // if (this.kpiAccType === this.TYPE_TAVG) {
        //   obj.resultTs = obj.resultMs;
        // }
        return obj;
      });
      return dataList;
    },
    getCalWeek(items) {
      //*입력한 주목표데이터 계산
      const goalList = items.reduce((acc, cur) => {
        const obj = Object.assign(cur, {});
        acc.push(obj.resultWs);
        return acc;
      }, []);

      //*계산
      let weekDataList = items.map((item, index) => {
        const obj = Object.assign(item, {});
        if (this.kpiAccType === this.TYPE_SUM) {
          //*합계
          obj.resultTs = common.isEmpty(obj.resultWs)
            ? ''
            : common.getSum(goalList.slice(0, index + 1));
        } else if (this.kpiAccType === this.TYPE_AVG) {
          //*단순평균
          obj.resultTs = common.isEmpty(obj.resultWs)
            ? ''
            : common.getAverage(goalList.slice(0, index + 1));
        } else if (this.kpiAccType === this.TYPE_LQ) {
          //*기말
          // obj.resultTs = obj.resultWs;
          obj.resultTs = obj.resultWs ? 0 : '';
        }
        //else if (this.kpiAccType === this.TYPE_TAVG) {
        //* 총평균-->(총평균 월데이터 누적데이터로 세팅제거 20.09.09_khm)
        //   obj.resultTs = obj.resultWs;
        // }
        return obj;
      });
      //*주간목표  데이터 세팅
      this.goalWeekData = weekDataList;
    },
    savePerformBtn(type) {
      common.confirm(
        'NLS0000005',
        type === 'm' ? this.savePerformMonthData : this.savePerformWeekData,
      );
    },
    async savePerformMonthData() {
      //*월간실적 저장
      let monthData = [...this.goalMonthData];
      let newMonthData = [];
      monthData.map(obj => {
        let newObj = {};
        //*월실적
        newObj.resultMs = this.changeTargetFormat(obj.resultMs);
        newObj.resultTs = this.changeTargetFormat(obj.resultTs);
        newObj.sumType = obj.sumType;
        newObj.baseYyyymm = obj.baseYyyymm;
        newMonthData.push(newObj);
      });
      let saveParam = {
        baseYyyy: this.getSelectedYear,
        performMonthList: newMonthData,
        kpiAccType: this.kpiAccType,
        kpiPerType: this.kpiPerType,
        resultYy: this.changeTargetFormat(this.resultYyForm),
        kpiId: this.getKpiGoalYearData.kpiId,
      };
      await this[kpiPerformanceTypes.actions.UPDATE_KPI_PERFORM_MONTH_DATA](
        saveParam,
      );
      this.getRegGoalDataSet();
      this.getTargetPerformListData();
    },
    savePerformWeekData() {
      //*주간실적 저장
      let weekData = [...this.goalWeekData];
      let newWeekData = [];
      weekData.map(obj => {
        let newObj = {};
        newObj.baseYyyy = this.getSelectedYear;
        newObj.baseYyyymm = obj.baseYyyymm;
        newObj.resultWs = this.changeTargetFormat(obj.resultWs);
        newObj.resultTs = this.changeTargetFormat(obj.resultTs);
        newObj.startDate = obj.startDate;
        newObj.endDate = obj.endDate;
        newObj.wwSeq = obj.wwSeq;
        newWeekData.push(newObj);
      });

      let saveParam = {
        baseYyyy: this.getSelectedYear,
        kpiAccType: this.kpiAccType,
        kpiPerType: this.kpiPerType,
        performWeekList: newWeekData,
        kpiId: this.getKpiGoalYearData.kpiId,
        kpiTargetBase: this.editor,
      };
      this[kpiPerformanceTypes.actions.UPDATE_KPI_PERFORM_WEEK_DATA](saveParam);
      this.getRegGoalDataSet();
      this.getTargetPerformListData();
    },
    saveMonthWeekBtn() {
      common.confirm('NLS0000005', async () => {
        //* 월간 KPI의 주간실적 저장
        const weekData = [...this.goalMw];
        const newWeekData = weekData.map(obj => {
          obj.baseYyyy = this.getSelectedYear;
          obj.resultWs = this.changeTargetFormat(obj.resultWs);
          obj.resultTs = this.changeTargetFormat(obj.resultTs);
          return obj;
        });
        let param = {
          baseYyyy: this.getSelectedYear,
          kpiAccType: this.kpiAccType,
          kpiPerType: this.kpiPerType,
          performWeekList: newWeekData,
          kpiId: this.getKpiGoalYearData.kpiId,
        };
        await this[kpiPerformanceTypes.actions.UPDATE_KPI_PERFORM_MW](param);
        this.getRegGoalDataSet();
        this.getTargetPerformListData();
      });
    },
    changeTargetFormat(data) {
      if (typeof data === 'string') {
        data = data.replace(/,/g, '');
      }
      return common.isEmpty(data) ? null : parseFloat(data);
    },
    closePopup() {
      this.picked = '';
      this.kpiUseYn = 'Y';
      this.goalMonthData = [];
      this.goalWeekData = [];
      this.kpiUserId = '';
      this.$emit('input', false);
    },
  },
};
</script>
