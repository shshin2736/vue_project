<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- KPI 그래프 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000672"
        tooltip="NLS0000727"
      ></com-page-title>
      <recent-graph-form> </recent-graph-form>
      <group-manage-form></group-manage-form>
      <kpi-graph-popup-form></kpi-graph-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import GroupManageForm from '@/components/businessExecution/kpiGraph/form/GroupManageForm.vue';
import RecentGraphForm from '@/components/businessExecution/kpiGraph/form/RecentGraphForm.vue';
import KpiGraphPopupForm from '@/components/businessExecution/kpiGraph/form/KpiGraphPopupForm.vue';

export default {
  name: 'kpiGraphPage',
  components: {
    GroupManageForm,
    RecentGraphForm,
    KpiGraphPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        {
          title: 'NLS0001095', //업무실행
          link: '',
        },
        {
          title: 'NLS0000672', //KPI 그래프
          link: 'kpiGraphPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
