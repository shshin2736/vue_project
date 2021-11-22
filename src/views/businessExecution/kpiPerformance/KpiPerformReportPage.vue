<template>
  <div class="page-report">
    <!-- 페이지 타이틀 영역 -->
    <!-- <com-page-title
        :data="pageTitleList"
        title="KPI 실적보고"
      ></com-page-title> -->
    <!-- 검색 영역 -->
    <kpi-perform-report-search-form></kpi-perform-report-search-form>
    <!-- 페이지 컨텐츠 영역 -->
    <kpi-perform-report-form></kpi-perform-report-form>
    <!-- 차트그룹 팝업 -->
    <com-kpi-chart-group-single-popup
      v-model="openChartGroupPop"
      :baseYyyy="baseYyyy"
    ></com-kpi-chart-group-single-popup>
    <com-kpi-chart-group-draw-chart
      v-model="openChartDrawChartPop"
    ></com-kpi-chart-group-draw-chart>
  </div>
</template>

<script>
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import KpiPerformReportForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformReportForm.vue';
import KpiPerformReportSearchForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformReportSearchForm.vue';
import ComKpiChartGroupSinglePopup from '@/components/common/business/ComKpiChartGroupSinglePopup';
import ComKpiChartGroupDrawChart from '@/components/common/business/ComKpiChartGroupDrawChart';
export default {
  name: 'KpiPerformReportPage',
  mixins: [commonStore],
  components: {
    KpiPerformReportForm,
    KpiPerformReportSearchForm,
    ComKpiChartGroupSinglePopup,
    ComKpiChartGroupDrawChart,
  },
  data() {
    return {
      pageTitleList: [
        { title: '업무 실행', link: '' },
        {
          title: 'KPI 실적보고',
          link: 'kpiPerformReport',
          params: this.$route.params,
        },
      ],
    };
  },
  computed: {
    baseYyyy() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    //* 차트그룹팝업 ON/OFF
    openChartGroupPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_CHART_GRP_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_CHART_GRP_SINGLE_POP];
      },
    },
    openChartDrawChartPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DRAW_CHART_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DRAW_CHART_POP];
      },
    },
  },
};
</script>
<style scoped>
.page-report {
  width: 100vw;
  height: 100vh;
}
@media screen and (max-width: 1023px) {
  .page-report {
    width: 100%;
    height: 100%;
    min-width: 1440px;
  }
}
</style>
