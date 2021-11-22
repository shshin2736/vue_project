<template>
  <div>
    <!-- 승인자(사용자) 추가 팝업 -->
    <!-- <department-single-popup
      v-model="openUserSearchPop"
    ></department-single-popup> -->
    <!-- 담당자 부서 팝업 -->
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
    <!-- 과제 추가 팝업 -->
    <project-regist-popup v-model="openProjectRegistPop"></project-regist-popup>
    <!--전략과제 검색 팝업-->
    <strategy-search-popup
      v-model="openStrategySearchPopup"
    ></strategy-search-popup>
    <!-- 연결 과제 팝업 -->
    <assignment-search-popup
      v-model="openassignmentSearchPop"
    ></assignment-search-popup>
    <!-- 과제 기간 설정 팝업 -->
    <project-date-setting-popup
      v-if="getClickEventHandler"
      :clickEventHandler="getClickEventHandler"
      v-model="openProjectDateSettingPop"
    ></project-date-setting-popup>
    <project-date-setting-popup
      v-if="!getClickEventHandler"
      :clickEventHandler="getClickEventHandler"
      v-model="openProjectDateSettingPop"
    ></project-date-setting-popup>
    <!-- 대책수립 기간 설정 팝업 -->
    <!-- <measure-date-setting-popup
      v-model="openMeasureDateSettingPop"
    ></measure-date-setting-popup> -->
    <!-- 잠재원인 추가 팝업 -->
    <potential-cause-popup
      v-model="openPotentialCausePop"
    ></potential-cause-popup>
    <!-- 보고서 스킨설정 팝업 -->
    <project-report-skin-popup
      v-model="openProjectReportSkinPop"
    ></project-report-skin-popup>
    <!-- 보고서 상세내용 팝업 -->
    <project-report-detail-popup
      v-model="openProjectReportDetailPop"
    ></project-report-detail-popup>
    <!-- 보고서 첨부파일 팝업 -->
    <project-attach-file-popup
      v-model="openProjectAttachFilePop"
    ></project-attach-file-popup>
    <!-- 메신저 팝업 -->
    <project-messenger-popup
      v-model="openProjectMessengerPop"
    ></project-messenger-popup>
    <!-- 개선스킬양식 팝업 -->
    <project-skill-conf-popup
      v-model="openProjectSkillConfPop"
    ></project-skill-conf-popup>
    <!-- 도움말 팝업 -->
    <com-project-help-popup
      v-model="openProjectHelpPop"
    ></com-project-help-popup>
    <!-- KPI 연결 목록 팝업 -->
    <project-kpi-popup v-model="openProjectKpiPop"></project-kpi-popup>
  </div>
</template>
<script>
import { commonStore, specializedTasksStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import ProjectRegistPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectRegistPopup';
import StrategySearchPopup from '@/components/common/business/StrategySearchPopup';
import ProjectDateSettingPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectDateSettingPopup';
// import MeasureDateSettingPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/MeasureDateSettingPopup';
import PotentialCausePopup from '@/components/businessExecution/projectExecution/specializedTasks/business/PotentialCausePopup';
import ProjectReportSkinPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectReportSkinPopup';
import ProjectReportDetailPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectReportDetailPopup';
import ProjectAttachFilePopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectAttachFilePopup';
import ProjectMessengerPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectMessengerPopup';
import ProjectSkillConfPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectSkillConfPopup';
import ProjectKpiPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectKpiPopup';
// import DepartmentSinglePopup from '@/components/common/business/DepartmentSinglePopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import ComProjectHelpPopup from '@/components/common/business/ProjectHelpPopup';
import AssignmentSearchPopup from '@/components/common/business/AssignmentSearchPopup';
export default {
  name: 'ProjectxecutionPopupForm',
  mixins: [commonStore, specializedTasksStore],
  components: {
    // DepartmentSinglePopup,
    ProjectRegistPopup,
    StrategySearchPopup,
    ProjectDateSettingPopup,
    // MeasureDateSettingPopup,
    PotentialCausePopup,
    ProjectReportSkinPopup,
    ProjectReportDetailPopup,
    ProjectAttachFilePopup,
    ProjectMessengerPopup,
    ProjectSkillConfPopup,
    ProjectKpiPopup,
    ComSrchDeptPopup,
    ComProjectHelpPopup,
    AssignmentSearchPopup,
  },
  data() {
    return {
      eventHandler: true,
    };
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
    //* 프로젝트 등록 팝업
    openProjectRegistPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_PROJECT_REGIST_POP](
          value,
        );
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_PROJECT_REGIST_POP];
      },
    },
    //* 전략과제 검색 팝업
    openStrategySearchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_STRATEGY_SEARCH_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_STRATEGY_SEARCH_POPUP];
      },
    },
    //* 과제 도움말 팝업
    openProjectHelpPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_PRJ_HELP_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_PRJ_HELP_POP];
      },
    },
    //* 연결 과제 팝업
    openassignmentSearchPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_ASSIGNMENT_SEARCH_POPUP];
      },
    },
    //* 과제 기간 설정 팝업
    openProjectDateSettingPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_PROJECT_DATE_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_PROJECT_DATE_POP];
      },
    },
    //* 과제 기간 설정 팝업 클릭 이벤트 설정
    getClickEventHandler() {
      return this[commonTypes.getters.GET_OVERLAY_CLICK_EVENT_HANDLER];
    },
    //* 대책수립 기간 설정 팝업
    // openMeasureDateSettingPop: {
    //   set(value) {
    //     this[projectExecutionTypes.actions.INIT_VIEWS_MEASURE_DATE_POP](value);
    //   },
    //   get() {
    //     return this[projectExecutionTypes.getters.GET_VIEWS_MEASURE_DATE_POP];
    //   },
    // },
    //* 잠재 원인 팝업
    openPotentialCausePop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_POTENTIAL_CAUSE_POP](
          value,
        );
      },
      get() {
        return this[
          projectExecutionTypes.getters.GET_VIEWS_POTENTIAL_CAUSE_POP
        ];
      },
    },
    //* 보고서 스킨설정 팝업
    openProjectReportSkinPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_REPORT_SKIN_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_REPORT_SKIN_POP];
      },
    },

    // //* 보고서 상세 팝업
    openProjectReportDetailPop: {
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
    //* 과제 메신저 팝업
    openProjectMessengerPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_MESSENGER_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_MESSENGER_POP];
      },
    },
    openProjectSkillConfPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_SKILL_CONF_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_SKILL_CONF_POP];
      },
    },
    openProjectKpiPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_KPI_LIST_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_KPI_LIST_POP];
      },
    },
  },
};
</script>
