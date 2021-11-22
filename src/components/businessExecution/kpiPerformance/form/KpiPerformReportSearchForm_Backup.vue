<template>
  <div class="search-box">
    <div class="search__form__box">
      <p class="search__form__title">
        사업계획시기(Y/M)
      </p>
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
    <div class="search__btn__box">
      <button
        type="button"
        class="search__btn"
        @click="getKpiPerformReportList"
      >
        <span>조회</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { timezone } from '@/utils';
import { kpiPerformanceStore, commonStore } from '@/mixins';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  mixins: [kpiPerformanceStore, commonStore],
  components: { ComDropdowns },
  data: function() {
    return {
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
  created() {
    this[commonTypes.actions.FETCH_YEAR_LIST]({});
    this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
    this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.value);
    this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](true);
  },
  computed: {
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
  },
  watch: {
    getYearList: function(data) {
      if (data.length > 0) {
        this.baseYear = {
          text: timezone.getClientDate('YYYY'),
          value: timezone.getClientDate('YYYY'),
        };
        this.baseMonth = {
          text: timezone.getClientDate('MM'),
          value: timezone.getClientDate('MM'),
        };
      }
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.value);
    },
  },
  methods: {
    getKpiPerformReportList() {
      //* KPI실적보고 리스트 조회
      let param = {
        baseYyyy: this.baseYear.value,
        baseYyyyMm: this.baseYear.value + this.baseMonth.value,
        viewReport: 'Y',
      };
      this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.value);
    },
  },
};
</script>
