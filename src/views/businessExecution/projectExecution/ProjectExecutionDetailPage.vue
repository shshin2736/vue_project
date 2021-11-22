<template>
  <div class="page-wrap">
    <div class="page-wrap-block"></div>
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 과제 관리 -->
      <com-page-title :data="pageTitleList" tooltip="NLS0000726">
      </com-page-title>
      <project-execution-top-nav-form></project-execution-top-nav-form>
      <div class="task-wrap">
        <div class="task-box">
          <project-execution-detail-step1-form></project-execution-detail-step1-form>

          <project-execution-detail-dc-step2-form
            v-if="this.prjInfo.prjType == 'DC'"
          ></project-execution-detail-dc-step2-form>
          <project-execution-detail-dc-step3-form
            v-if="this.prjInfo.prjType == 'DC'"
          ></project-execution-detail-dc-step3-form>

          <project-execution-detail-rd-step2-form
            v-if="this.prjInfo.prjType == 'RD'"
          ></project-execution-detail-rd-step2-form>
          <project-execution-detail-rd-step3-form
            v-if="this.prjInfo.prjType == 'RD'"
          ></project-execution-detail-rd-step3-form>

          <project-execution-detail-ds-step2-form
            v-if="this.prjInfo.prjType == 'DS'"
          ></project-execution-detail-ds-step2-form>
          <project-execution-detail-ds-step3-form
            v-if="this.prjInfo.prjType == 'DS'"
          ></project-execution-detail-ds-step3-form>

          <project-execution-detail-sa-step2-form
            v-if="this.prjInfo.prjType == 'SA'"
          ></project-execution-detail-sa-step2-form>
          <project-execution-detail-sa-step3-form
            v-if="this.prjInfo.prjType == 'SA'"
          ></project-execution-detail-sa-step3-form>
        </div>
        <project-execution-map-form></project-execution-map-form>
      </div>
      <project-execution-popup-form></project-execution-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import { specializedTasksStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import ProjectExecutionTopNavForm from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionTopNavForm';
import ProjectExecutionDetailStep1Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailStep1Form';
import ProjectExecutionDetailDcStep2Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailDCStep2Form';
import ProjectExecutionDetailDcStep3Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailDCStep3Form';
import ProjectExecutionDetailRdStep2Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailRDStep2Form';
import ProjectExecutionDetailRdStep3Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailRDStep3Form';
import ProjectExecutionDetailDsStep2Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailDSStep2Form';
import ProjectExecutionDetailDsStep3Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailDSStep3Form';
import ProjectExecutionDetailSaStep2Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailSAStep2Form';
import ProjectExecutionDetailSaStep3Form from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionDetailSAStep3Form';
import ProjectExecutionMapForm from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionMapForm';
import ProjectExecutionPopupForm from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionPopupForm';

import { common } from '@/utils';
export default {
  name: 'ProjectExecutionDetailPage',
  mixins: [specializedTasksStore, commonStore],
  components: {
    ProjectExecutionTopNavForm,
    ProjectExecutionDetailStep1Form,
    ProjectExecutionDetailDcStep2Form,
    ProjectExecutionDetailDcStep3Form,
    ProjectExecutionDetailRdStep2Form,
    ProjectExecutionDetailRdStep3Form,
    ProjectExecutionDetailDsStep2Form,
    ProjectExecutionDetailDsStep3Form,
    ProjectExecutionDetailSaStep2Form,
    ProjectExecutionDetailSaStep3Form,
    ProjectExecutionMapForm,
    ProjectExecutionPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000470', link: '' }, //업무 실행
        {
          title: 'NLS0000671',
          link: 'ProjectExecutionListPage',
          params: this.$route.params,
        }, //과제실행
        {
          title: 'NLS0000671',
          link: 'ProjectExecutionListPage',
          parmas: this.$route.params,
        }, //과제관리
      ],
      prjInfo: {},
      GV_PRJ_ID: this.$route.params.prjId,
    };
  },
  beforeCreate() {
    if (!this.$route.params.type && !this.$route.params.prjId)
      this.$router.push({
        path: '/ProjectExecutionListPage',
      });
  },
  async created() {
    if (common.isEmpty(this.GV_PRJ_ID) && !this.$route.params.prjId) {
      this.prjInfo = this[specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO];
    } else {
      await this[specializedTasksTypes.actions.FETCH_PROJECT_EXECUTION_INFO]({
        prjId: this.GV_PRJ_ID,
      });
      await this[specializedTasksTypes.actions.FETCH_CONN_STG_LIST]({
        prjId: this.GV_PRJ_ID,
        baseYyyy: this.$route.params.baseYyyy,
      });
      await this[specializedTasksTypes.actions.FETCH_PROJECT_SKILL_CONF_INFO]({
        prjType: this.$route.params.prjType,
        prjStepId: '',
      });
      const data = {
        ...this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO],
      };
      this.prjInfo = data.prjInfo;
    }
  },
  mounted() {
    this[commonTypes.actions.INIT_VIEWS_SPINNER](false);
  },
};
</script>

<style scoped>
.task-box {
  overflow-y: none;
}
</style>
