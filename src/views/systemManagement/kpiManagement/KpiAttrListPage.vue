<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- KPI 속성 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000993"
        tooltip="NLS0000712"
      ></com-page-title>

      <kpi-list-search-form></kpi-list-search-form>

      <kpi-list-form></kpi-list-form>
      <kpi-attr-popup-form></kpi-attr-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import KpiListForm from '@/components/systemManagement/kpiManagement/form/KpiListForm';
import KpiListSearchForm from '@/components/systemManagement/kpiManagement/form/KpiListSearchForm';
import KpiAttrPopupForm from '@/components/systemManagement/kpiManagement/form/KpiAttrPopupForm';

export default {
  name: 'KpiAttrListPage',
  components: {
    KpiListForm,
    KpiListSearchForm,
    KpiAttrPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0000993', //KPI속성
          link: 'kpiAttrListPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
