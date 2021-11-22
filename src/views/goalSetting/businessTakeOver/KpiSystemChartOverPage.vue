<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 업무 인수인계 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001110"
        tooltip="NLS0000735"
      ></com-page-title>
      <!-- 버튼 그룹 영역 -->
      <kpi-system-chart-over-form></kpi-system-chart-over-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import KpiSystemChartOverForm from '@/components/goalSetting/businessTakeOver/form/KpiSystemChartOverForm';
export default {
  name: 'KpiSystemChartOverPage',
  components: {
    KpiSystemChartOverForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000438', link: '' }, //목표 수립
        {
          title: 'NLS0001110',
          link: 'businessTakeOverPage',
          params: this.$route.params,
        }, //업무 인수인계
      ],
    };
  },
};
</script>

<style></style>
