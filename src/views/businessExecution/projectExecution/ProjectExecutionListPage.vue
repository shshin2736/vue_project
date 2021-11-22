<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 과제실행 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000671"
        tooltip="NLS0000726"
      >
      </com-page-title>
      <project-execution-search-form></project-execution-search-form>
      <div class="hms-grid-wrap type-th70">
        <project-execution-list-form></project-execution-list-form>
      </div>
      <project-execution-popup-form></project-execution-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import ProjectExecutionSearchForm from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionSearchForm';
import ProjectExecutionListForm from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionListForm';
import ProjectExecutionPopupForm from '@/components/businessExecution/projectExecution/specializedTasks/form/ProjectExecutionPopupForm';

export default {
  name: 'ProjectExecutionListPage',
  components: {
    ProjectExecutionSearchForm,
    ProjectExecutionListForm,
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
      ],
    };
  },
};
</script>

<style></style>
