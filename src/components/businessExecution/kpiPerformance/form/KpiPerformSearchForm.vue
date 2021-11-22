<template>
  <div class="search-box">
    <div class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0001264') }}
      </p>
      <!-- 조회년월 -->
      <com-dropdowns
        :data="getYearList"
        rules="required"
        textfield="text"
        valuefield="value"
        class="hms-dropdown type1"
        v-model="baseYear"
      ></com-dropdowns>
      <com-dropdowns
        :data="baseMonthOptions"
        rules="required"
        textfield="text"
        valuefield="value"
        class="hms-dropdown type1"
        v-model="baseMonth"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0000176') }}
      </p>
      <!--담당자->성명-->
      <span class="input__box">
        <com-input-text
          v-model="searchUserNm"
          @enter="searchEnterManager"
          @keyup="chageManagerForm"
        ></com-input-text>
        <!-- <button
          type="button"
          class="magnifier-btn-black"
          @click="searchManager"
        ></button> -->
        <button
          type="button"
          class="magnifier-btn-black"
          @click="searchEnterManager"
        ></button>
      </span>
    </div>
    <div class="search__btn__box">
      <com-button
        type="button"
        class="search__btn perm_read"
        :auth="$route.params.auth"
        @click="getKpiPerformList"
      >
        <span>{{ $t('NLS0000066') }}</span
        ><!--조회-->
      </com-button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import { common, timezone } from '@/utils';
import { kpiPerformanceStore, commonStore } from '@/mixins';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'KpiPerformSearchForm',
  mixins: [kpiPerformanceStore, commonStore],
  components: {
    ComButton,
    ComDropdowns,
    ComInputText,
  },
  data: function() {
    return {
      searchUserNm: '',
      searchUserId: '',
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
    };
  },
  computed: {
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
  },
  watch: {
    getSelectedManager(data) {
      this.searchUserNm = data.userName;
      this.searchUserId = data.userId;
      if (!common.isEmpty(data.userId)) {
        this.getKpiPerformList();
      }
    },
  },
  mounted() {
    this[commonTypes.actions.FETCH_YEAR_LIST]({});
    if (!common.isEmpty(this.$route.params.baseYyyyMm)) {
      this.access = true;
      let baseYyyyMm = this.$route.params.baseYyyyMm;
      let selYyyy = timezone.convertToDateFormat(baseYyyyMm, 'YYYY');
      let selMm = timezone.convertToDateFormat(baseYyyyMm, 'MM');
      this.baseYear = { text: selYyyy, value: selYyyy };
      this.baseMonth = { text: selMm, value: selMm };
    }

    // let param = {
    //   baseYyyy: this.baseYear.value,
    //   baseYyyyMm: this.baseYear.value + this.baseMonth.value,
    // };
    // this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
    // this[kpiPerformanceTypes.actions.INIT_PERFORM_SEARCH_USER_ID]('');
    // this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
    // this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.value);
    this.getKpiPerformList();
    this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](true);
  },
  destroyed() {
    this[kpiPerformanceTypes.actions.INIT_PERFORM_SEARCH_USER_ID]('');
  },
  methods: {
    getKpiPerformList() {
      //* KPI실적 리스트 조회
      // let param = {
      //   baseYyyy: this.baseYear.value,
      //   baseYyyyMm: this.baseYear.value + this.baseMonth.value,
      //   searchUserId: this.searchUserId,
      // };
      // this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
      //*검색유저세팅
      this[kpiPerformanceTypes.actions.INIT_PERFORM_SEARCH_USER_ID](
        this.searchUserId,
      );
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.value);
      //* 년도별 총 주 목록 조회
      this[kpiPerformanceTypes.actions.FETCH_ENTIRE_WEEK]({
        baseYyyy: this.baseYear.value,
      });
    },
    searchManager() {
      this[kpiPerformanceTypes.actions.INIT_PERFORM_SEARCH_USER_ID]('');
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.searchUserNm,
        srchInnerGrps: true,
      });
    },
    async searchEnterManager() {
      this.searchUserId = '';
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.searchUserNm,
        srchInnerGrps: true,
      });
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({
        srchInnerGrps: true,
      });
      const managerList =
        this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST] || [];
      const managerListCnt = managerList.length || 0;
      if (managerListCnt === 1) {
        this.searchUserNm = managerList[0].userName;
        this.searchUserId = managerList[0].userId;
        this.getKpiPerformList();
      } else {
        this.searchManager();
      }
    },
    chageManagerForm() {
      this.searchUserId = '';
    },
  },
};
</script>
