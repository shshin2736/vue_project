<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 일반과제 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000883"
        tooltip="NLS0000726"
      >
      </com-page-title>
      <general-task-btn-form></general-task-btn-form>
      <div class="task-wrap">
        <div class="task-box type-full">
          <!-- 추가 버튼 폼 영역 -->

          <!-- 일반과제 기본정보 -->
          <general-task-basic-info-form></general-task-basic-info-form>
          <!-- Task 등록 -->
          <general-task-grid-form></general-task-grid-form>
        </div>
      </div>
      <!-- 일반과제 팝업 -->
      <general-task-popup-form></general-task-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import GeneralTaskPopupForm from '@/components/businessExecution/projectExecution/generalTasks/form/GeneralTaskPopupForm';
import GeneralTaskBasicInfoForm from '@/components/businessExecution/projectExecution/generalTasks/form/GeneralTaskBasicInfoForm';
import GeneralTaskBtnForm from '@/components/businessExecution/projectExecution/generalTasks/form/GeneralTaskBtnForm';
import GeneralTaskGridForm from '@/components/businessExecution/projectExecution/generalTasks/form/GeneralTaskGridForm';

export default {
  name: 'GeneralTask',
  mixins: [commonStore],
  components: {
    GeneralTaskBasicInfoForm,
    GeneralTaskPopupForm,
    GeneralTaskBtnForm,
    GeneralTaskGridForm,
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
      ],
    };
  },
  beforeCreate() {
    if (!this.$route.params.type && !this.$route.params.prjId)
      this.$router.push({
        path: '/ProjectExecutionListPage',
      });
  },
  mounted() {
    this[commonTypes.actions.INIT_VIEWS_SPINNER](false);
  },
};
</script>

<style></style>
