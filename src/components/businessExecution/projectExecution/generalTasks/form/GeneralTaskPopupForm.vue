<template>
  <div>
    <!--Task 상세 조회 -->
    <task-detail-popup v-model="openTaskDetailPopup"></task-detail-popup>
    <!--전략과제 검색 팝업-->
    <strategy-search-popup
      v-model="openStrategySearchPopup"
    ></strategy-search-popup>
    <!-- 부서 검색 팝업 -->
    <com-srch-dept-popup v-model="openComDeptSrchPopup"></com-srch-dept-popup>
    <!-- 도움말 팝업 -->
    <com-project-help-popup
      v-model="openProjectHelpPop"
    ></com-project-help-popup>
    <!-- KPI 연결 목록 팝업 -->
    <project-kpi-popup v-model="openProjectKpiPop"></project-kpi-popup>
  </div>
</template>

<script>
import TaskDetailPopup from '@/components/businessExecution/projectExecution/generalTasks/business/TaskDetailPopup';
import StrategySearchPopup from '@/components/common/business/StrategySearchPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import ComProjectHelpPopup from '@/components/common/business/ProjectHelpPopup';
import ProjectKpiPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectKpiPopup';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import {
  commonStore,
  generalTasksStore,
  specializedTasksStore,
} from '@/mixins';

export default {
  name: 'GeneralTaskPopForm.vue',
  mixins: [commonStore, generalTasksStore, specializedTasksStore],
  components: {
    TaskDetailPopup,
    StrategySearchPopup,
    ComSrchDeptPopup,
    ComProjectHelpPopup,
    ProjectKpiPopup,
  },
  computed: {
    //* 공동사용자 추가 팝업(싱글)
    openDepartSinglePop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
    //* Task 상세화면 팝업
    openTaskDetailPopup: {
      set(value) {
        this[generalTasksType.actions.INIT_TASK_DETAIL_POPUP](value);
      },
      get() {
        return this[generalTasksType.getters.GET_TASK_DETAIL_POPUP];
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
    //* 부서 검색 팝업
    openComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
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
