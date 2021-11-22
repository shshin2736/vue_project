<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <com-page-title
        :data="pageTitleList"
        title="KPI 실적보고"
        tooltip="NLS0000728"
      ></com-page-title>
      <!-- 검색 영역 -->
      <kpi-perform-report-search-form></kpi-perform-report-search-form>
      <!-- 페이지 컨텐츠 영역 -->
      <kpi-perform-report-form></kpi-perform-report-form>
      <!-- 차트그룹 팝업 -->
      <com-kpi-chart-group-single-popup
        v-model="openChartGroupPop"
      ></com-kpi-chart-group-single-popup>
      <com-kpi-chart-group-draw-chart
        v-model="openChartDrawChartPop"
      ></com-kpi-chart-group-draw-chart>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import KpiPerformReportForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformReportForm.vue';
import KpiPerformReportSearchForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformReportSearchForm.vue';
import ComKpiChartGroupSinglePopup from '@/components/common/business/ComKpiChartGroupSinglePopup';
import ComKpiChartGroupDrawChart from '@/components/common/business/ComKpiChartGroupDrawChart';

export default {
  mixins: [commonStore],
  components: {
    KpiPerformReportForm,
    KpiPerformReportSearchForm,
    ComKpiChartGroupSinglePopup,
    ComKpiChartGroupDrawChart,
    ComPageTitle,
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
  methods: {},
};
</script>
