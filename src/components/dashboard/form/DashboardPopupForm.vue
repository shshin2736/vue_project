<template>
  <div>
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
    <com-kpi-chart-group-multi-popup
      v-model="openChartGroupPop"
    ></com-kpi-chart-group-multi-popup>
    <dashboard-kpi-list-popup
      from="dashboard"
      v-model="isKpiSearchPopup"
    ></dashboard-kpi-list-popup>
    <dashboard-notice-popup v-model="noticePopup"></dashboard-notice-popup>
    <dashboard-reason-popup v-model="reasonPopup"></dashboard-reason-popup>
    <!-- 보고서 상세내용 팝업 -->
    <project-report-detail-popup
      v-model="openProjectReportDetailPop"
    ></project-report-detail-popup>
    <!-- 보고서 첨부파일 팝업 -->
    <project-attach-file-popup
      v-model="openProjectAttachFilePop"
    ></project-attach-file-popup>
  </div>
</template>

<script>
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import ComKpiChartGroupMultiPopup from '@/components/common/business/ComKpiChartGroupMultiPopup';
import DashboardKpiListPopup from '@/components/dashboard/business/DashboardKpiListPopup';
import DashboardNoticePopup from '@/components/dashboard/business/DashboardNoticePopup';
import DashboardReasonPopup from '@/components/dashboard/business/DashboardReasonPopup';
import ProjectReportDetailPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectReportDetailPopup';
import ProjectAttachFilePopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectAttachFilePopup';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import { commonStore, dashboardStore, specializedTasksStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as dashboardTypes from '@/store/modules/dashboard/types';

export default {
  name: 'DashboardPopupForm',
  components: {
    ComSrchDeptPopup,
    ComKpiChartGroupMultiPopup,
    DashboardKpiListPopup,
    DashboardNoticePopup,
    DashboardReasonPopup,
    ProjectReportDetailPopup,
    ProjectAttachFilePopup,
  },
  mixins: [commonStore, dashboardStore, specializedTasksStore],
  computed: {
    //* 사용자 부서설정 팝업 ON/OFF
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
    //* 차트그룹팝업 ON/OFF
    openChartGroupPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_CHART_GRP_MULTI_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_CHART_GRP_MULTI_POP];
      },
    }, //* KPI 검색 팝업 ON/OFF
    isKpiSearchPopup: {
      set(value) {
        this[dashboardTypes.actions.INIT_VIEWS_DASHBOARD_KPI_POPUP](value);
      },
      get() {
        return this[dashboardTypes.getters.GET_VIEWS_DASHBOARD_KPI_POPUP];
      },
    },
    noticePopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_NOTICE_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_NOTICE_POPUP];
      },
    },
    reasonPopup: {
      set(value) {
        this[dashboardTypes.actions.INIT_VIEWS_DSBD_KPI_REASON_POPOUP](value);
      },
      get() {
        return this[dashboardTypes.getters.GET_VIEWS_DSBD_KPI_REASON_POPOUP];
      },
    },
    openProjectReportDetailPop: {
      //* 보고서 상세 팝업
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_REPORT_DETAIL_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_REPORT_DETAIL_POP];
      },
    },
    //* 보고서 첨부파일 팝업
    openProjectAttachFilePop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_ATTACH_FILE_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_ATTACH_FILE_POP];
      },
    },
  },
};
</script>
