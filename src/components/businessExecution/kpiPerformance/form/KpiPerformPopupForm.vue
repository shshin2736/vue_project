<template>
  <div>
    <!-- 월/주간 실적입력 팝업 -->
    <kpi-perform-popup v-model="openKpiPerformPop"></kpi-perform-popup>
    <!-- 연결과제 팝업 -->
    <kpi-prj-popup v-model="openKpiPrjPop"></kpi-prj-popup>
    <!-- 차트그룹 팝업 -->
    <com-kpi-chart-group-single-popup
      v-model="openChartGroupPop"
    ></com-kpi-chart-group-single-popup>
    <com-kpi-chart-group-draw-chart
      v-model="openChartDrawChartPop"
    ></com-kpi-chart-group-draw-chart>
    <kpi-analysis-popup v-model="openKpiAnalysisPopup"></kpi-analysis-popup>
    <!-- 과제검색 팝업 -->
    <assignment-search-popup
      v-model="openAssignmentPopup"
    ></assignment-search-popup>
    <!-- KPI 수정 팝업-->
    <kpi-update-popup v-model="openKpiUpdatePop"> </kpi-update-popup>
    <!-- 공동사용자 추가 팝업 -->
    <department-multi-popup
      v-model="openDepartMultiPop"
    ></department-multi-popup>
    <!-- 하위 KPI연결 전체 KPI 목록 팝업 영역 -->
    <child-kpi-pool-list-popup
      v-model="openChildKpiPoolListPop"
    ></child-kpi-pool-list-popup>
    <!-- 하위 KPI 팝업 영역 -->
    <kpi-child-popup v-model="openChildPop"></kpi-child-popup>
    <!-- 단순하위 KPI 팝업 영역 -->
    <kpi-simple-child-popup
      v-model="openSimpleChildPop"
    ></kpi-simple-child-popup>
    <!-- 부서트리 팝업 -->
    <com-srch-dept-popup v-model="openComDeptSrchPopup"></com-srch-dept-popup>
    <!--공통KPI 리스트 팝업-->
    <kpi-pool-popup v-model="openCmmKpiPoolPop"></kpi-pool-popup>
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
import {
  kpiPerformanceStore,
  commonStore,
  kpiTargetEstablishmentStore,
  specializedTasksStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import KpiPerformPopup from '@/components/businessExecution/kpiPerformance/business/KpiPerformPopup.vue';
import KpiPrjPopup from '@/components/businessExecution/kpiPerformance/business/KpiPrjPopup.vue';
import ComKpiChartGroupSinglePopup from '@/components/common/business/ComKpiChartGroupSinglePopup';
import ComKpiChartGroupDrawChart from '@/components/common/business/ComKpiChartGroupDrawChart';
import KpiAnalysisPopup from '@/components/businessExecution/kpiPerformance/business/KpiAnalysisPopup.vue';
import AssignmentSearchPopup from '@/components/common/business/AssignmentSearchPopup.vue';
import KpiUpdatePopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiUpdatePopup';
import DepartmentMultiPopup from '@/components/common/business/DepartmentMultiPopup';
import ChildKpiPoolListPopup from '@/components/goalSetting/kpiTargetEstablishment/business/ChildKpiPoolListPopup';
import KpiChildPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiChildPopup';
import KpiSimpleChildPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiSimpleChildPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import kpiPoolPopup from '@/components/common/business/KpiPoolListPopup';
import ProjectReportDetailPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectReportDetailPopup';
import ProjectAttachFilePopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectAttachFilePopup';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';

export default {
  name: 'KpiPerformPopupForm',
  mixins: [
    kpiPerformanceStore,
    commonStore,
    kpiTargetEstablishmentStore,
    specializedTasksStore,
  ],
  components: {
    KpiPerformPopup,
    KpiPrjPopup,
    ComKpiChartGroupSinglePopup,
    ComKpiChartGroupDrawChart,
    KpiAnalysisPopup,
    AssignmentSearchPopup,
    KpiUpdatePopup,
    DepartmentMultiPopup,
    ChildKpiPoolListPopup,
    KpiChildPopup,
    KpiSimpleChildPopup,
    ComSrchDeptPopup,
    kpiPoolPopup,
    ProjectReportDetailPopup,
    ProjectAttachFilePopup,
  },
  computed: {
    //* 실적등록팝업 ON/OFF
    openKpiPerformPop: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REG_PERFORM_POP](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_KPI_REG_PERFORM_POP];
      },
    },
    //* 연결과제팝업 ON/OFF
    openKpiPrjPop: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PRJ_POP](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_KPI_PRJ_POP];
      },
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
    //* 분석 팝업 ON/OFF
    openKpiAnalysisPopup: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_ANALYSIS_POP](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_ANALYSIS_POP];
      },
    },
    //* 과제검색 팝업
    openAssignmentPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_ASSIGNMENT_SEARCH_POPUP];
      },
    },
    //* KPI 수정 팝업 ON/OFF
    openKpiUpdatePop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_UPDATE_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_UPDATE_POP
        ];
      },
    },
    //* 공동사용자 추가 팝업
    openDepartMultiPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_MULTI_POP];
      },
    },
    //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF
    openChildKpiPoolListPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CHILD_KPI_POOL_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_CHILD_KPI_POOL_POP
        ];
      },
    },
    //* 하위 KPI 팝업 ON/OFF
    openChildPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_CHILD_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_CHILD_POP
        ];
      },
    },
    //* 단순하위 KPI 팝업 ON/OFF
    openSimpleChildPop: {
      set(value) {
        this[
          kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_SIMPLE_CHILD_POP
        ](value);
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_SIMPLE_CHILD_POP
        ];
      },
    },
    //* 부서트리 검색 팝업
    openComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
    //*공통 KPI리스트 팝업
    openCmmKpiPoolPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_POOL_POP];
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
