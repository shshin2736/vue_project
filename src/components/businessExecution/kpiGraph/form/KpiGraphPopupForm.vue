<template>
  <div>
    <chart-create-popup v-model="create"></chart-create-popup>
    <chart-detail-popup v-model="detail"></chart-detail-popup>
    <kpi-pool-popup v-model="kpi"></kpi-pool-popup>
    <multi-user-popup v-model="user"></multi-user-popup>
    <com-kpi-chart-group-single-popup
      v-model="com"
    ></com-kpi-chart-group-single-popup>
    <com-kpi-chart-group-draw-chart
      v-model="draw"
    ></com-kpi-chart-group-draw-chart>
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
  </div>
</template>

<script>
import { kpiGraphStore, commonStore } from '@/mixins';
import * as kpiGraphTypes from '@/store/modules/businessExecution/kpiGraph/types';
import * as commonTypes from '@/store/modules/common/types';
import ChartCreatePopup from '@/components/businessExecution/kpiGraph/business/ChartCreatePopup';
import ChartDetailPopup from '@/components/businessExecution/kpiGraph/business/ChartDetailPopup';
import kpiPoolPopup from '@/components/common/business/KpiPoolListPopup';
import multiUserPopup from '@/components/common/business/DepartmentMultiPopup';
import ComKpiChartGroupSinglePopup from '@/components/common/business/ComKpiChartGroupSinglePopup';
import ComKpiChartGroupDrawChart from '@/components/common/business/ComKpiChartGroupDrawChart';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
export default {
  name: 'KpiGraphPopupForm',
  mixins: [kpiGraphStore, commonStore],
  components: {
    ChartCreatePopup,
    ChartDetailPopup,
    kpiPoolPopup,
    multiUserPopup,
    ComKpiChartGroupSinglePopup,
    ComKpiChartGroupDrawChart,
    ComSrchDeptPopup,
  },
  computed: {
    create: {
      set(value) {
        this[kpiGraphTypes.actions.INIT_VIEWS_CREATE_CHART_POPUP](value);
      },
      get() {
        return this[kpiGraphTypes.getters.GET_VIEWS_CREATE_CHART_POPUP];
      },
    },
    detail: {
      set(value) {
        this[kpiGraphTypes.actions.INIT_VIEWS_CHART_DETAIL_POPUP](value);
      },
      get() {
        return this[kpiGraphTypes.getters.GET_VIEWS_CHART_DETAIL_POPUP];
      },
    },
    kpi: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_POOL_POP];
      },
    },
    user: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_MULTI_POP];
      },
    },
    com: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_CHART_GRP_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_CHART_GRP_SINGLE_POP];
      },
    },
    draw: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DRAW_CHART_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DRAW_CHART_POP];
      },
    },
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
  },
};
</script>
