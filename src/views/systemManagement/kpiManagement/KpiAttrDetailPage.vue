<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- KPI 속성 상세 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000993"
        tooltip="NLS0000720"
      ></com-page-title>

      <kpi-attr-detail-form></kpi-attr-detail-form>
      <kpi-attr-popup-form></kpi-attr-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import KpiAttrDetailForm from '@/components/systemManagement/kpiManagement/form/KpiAttrDetailForm';
import KpiAttrPopupForm from '@/components/systemManagement/kpiManagement/form/KpiAttrPopupForm';

export default {
  name: 'KpiAttrDetailPage',
  components: { KpiAttrDetailForm, KpiAttrPopupForm, ComPageTitle },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0000993', //KPI속성
          link: 'kpiAttrListPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0001119', //KPI속성
          link: 'kpiAttrDetailPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
