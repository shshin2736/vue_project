<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- KPI목표 수립 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001111"
        tooltip="NLS0000731"
      ></com-page-title>
      <!-- 검색 영역 -->
      <kpi-target-search-form></kpi-target-search-form>
      <!-- 버튼 영역 -->
      <kpi-target-btn-form></kpi-target-btn-form>
      <!-- 리스트 영역 -->
      <div class="hms-grid-wrap type-th25">
        <kpi-target-list-form></kpi-target-list-form>
      </div>
      <!-- 팝업 영역 -->
      <kpi-target-establishment-popup-form></kpi-target-establishment-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import KpiTargetListForm from '@/components/goalSetting/kpiTargetEstablishment/form/KpiTargetListForm';
import KpiTargetSearchForm from '@/components/goalSetting/kpiTargetEstablishment/form/KpiTargetSearchForm';
import KpiTargetBtnForm from '@/components/goalSetting/kpiTargetEstablishment/form/KpiTargetBtnForm';
import KpiTargetEstablishmentPopupForm from '@/components/goalSetting/kpiTargetEstablishment/form/KpiTargetEstablishmentPopupForm';

export default {
  name: 'KpiTargetEstablishmentPage',
  components: {
    KpiTargetListForm,
    KpiTargetSearchForm,
    KpiTargetBtnForm,
    KpiTargetEstablishmentPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000438', link: '' }, //목표 수립
        {
          title: 'NLS0001111',
          link: 'kpiTargetEstablishment',
          params: this.$route.params,
        }, //KPI목표 수립
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>
