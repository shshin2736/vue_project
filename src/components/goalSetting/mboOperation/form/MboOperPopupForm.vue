<template>
  <div>
    <!-- 승인자(사용자) 추가 팝업 -->
    <!-- <department-single-popup
      v-model="openUserSearchPop"
    ></department-single-popup> -->
    <!-- kpi목록 추가 팝업 -->
    <!-- 담당자 부서 팝업 -->
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
    <!-- MBO 항목(KPI) 조회 팝업 -->
    <mbo-kpi-popup v-model="openMboKpiPopup"></mbo-kpi-popup>
    <!-- 전년실적 팝업 -->
    <kpi-analysis-popup v-model="openKpiAnalysisPopup"></kpi-analysis-popup>
    <!-- 수정목표 팝업 -->
    <mbo-modify-target-popup
      v-model="openModifyTargetPop"
    ></mbo-modify-target-popup>
    <!-- KPI 실적보고 팝업 -->
    <!-- <com-overlay v-model="kpiPerformance">
      <kpi-perform-report-page
        v-model="kpiPerformance"
      ></kpi-perform-report-page>
    </com-overlay> -->
  </div>
</template>
<script>
import { commonStore, mboOperationStore, kpiPerformanceStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as mboOperTypes from '@/store/modules/goalSetting/mboOperation/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
// import DepartmentSinglePopup from '@/components/common/business/DepartmentSinglePopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import MboKpiPopup from '@/components/goalSetting/mboOperation/business/MboKpiPopup';
import MboModifyTargetPopup from '@/components/goalSetting/mboOperation/business/MboModifyTargetPopup';
import KpiAnalysisPopup from '@/components/businessExecution/kpiPerformance/business/KpiAnalysisPopup.vue';
//import KpiPerformReportPage from '@/views/businessExecution/kpiPerformance/KpiPerformReportPage';

export default {
  name: 'MboOperPopupForm',
  mixins: [commonStore, mboOperationStore, kpiPerformanceStore],
  components: {
    // DepartmentSinglePopup,
    ComSrchDeptPopup,
    MboKpiPopup,
    KpiAnalysisPopup,
    MboModifyTargetPopup,
    //KpiPerformReportPage,
  },
  computed: {
    //* 승인자(사용자) 추가 팝업
    openUserSearchPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
    //* 사용자 부서설정 팝업 ON/OFF
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
    //* MBO 항목(KPI 팝업)
    openMboKpiPopup: {
      set(value) {
        this[mboOperTypes.actions.INIT_VIEWS_MBO_KPI_POPUP](value);
      },
      get() {
        return this[mboOperTypes.getters.GET_VIEWS_MBO_KPI_POPUP];
      },
    },
    //* 전년 실적 팝업 ON/OFF
    openKpiAnalysisPopup: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_ANALYSIS_POP](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_ANALYSIS_POP];
      },
    },
    //* MBO수정목표 팝업
    openModifyTargetPop: {
      set(value) {
        this[mboOperTypes.actions.INIT_VIEWS_MBO_MODIFY_TARGET_POP](value);
      },
      get() {
        return this[mboOperTypes.getters.GET_VIEWS_MBO_MODIFY_TARGET_POP];
      },
    },
    //* KPI 실적보고 팝업
    // kpiPerformance: {
    //   set(value) {
    //     this[commonTypes.actions.INIT_VIEWS_KPI_PERFORMANCE](value);
    //   },
    //   get() {
    //     return this[commonTypes.getters.GET_VIEWS_KPI_PERFORMANCE];
    //   },
    // },
  },
};
</script>
