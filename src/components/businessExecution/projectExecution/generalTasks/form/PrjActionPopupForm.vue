<template>
  <div>
    <!-- 도움말 팝업 -->
    <com-project-help-popup
      v-model="openProjectHelpPop"
    ></com-project-help-popup>
    <!-- KPI 연결 목록 팝업 -->
    <project-kpi-popup v-model="openProjectKpiPop"></project-kpi-popup>
  </div>
</template>

<script>
import ComProjectHelpPopup from '@/components/common/business/ProjectHelpPopup';
import ProjectKpiPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectKpiPopup';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { commonStore, specializedTasksStore } from '@/mixins';

export default {
  name: 'PrjActionPopupForm.vue',
  mixins: [commonStore, specializedTasksStore],
  components: {
    ComProjectHelpPopup,
    ProjectKpiPopup,
  },
  computed: {
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
