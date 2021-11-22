<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 즉실천 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000193"
        tooltip="NLS0000726"
      >
      </com-page-title>
      <prj-action-btn-form></prj-action-btn-form>
      <div class="task-wrap">
        <div class="task-box type-full">
          <!-- 즉실천 등록 -->
          <prj-action-regist-form></prj-action-regist-form>
        </div>
      </div>
      <!-- 즉실천 팝업 -->
      <prj-action-popup-form></prj-action-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import PrjActionPopupForm from '@/components/businessExecution/projectExecution/generalTasks/form/PrjActionPopupForm';
import PrjActionRegistForm from '@/components/businessExecution/projectExecution/generalTasks/form/PrjActionRegistForm';
import PrjActionBtnForm from '@/components/businessExecution/projectExecution/generalTasks/form/PrjActionBtnForm';

export default {
  name: 'PrjActionPage',
  mixins: [commonStore],
  components: {
    PrjActionRegistForm,
    PrjActionBtnForm,
    PrjActionPopupForm,
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
