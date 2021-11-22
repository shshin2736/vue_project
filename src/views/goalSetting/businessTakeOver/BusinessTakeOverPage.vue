<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 업무 인수인계 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001110"
        tooltip="NLS0000734"
      ></com-page-title>

      <!-- 검색 폼 영역 -->
      <business-take-over-search-form></business-take-over-search-form>
      <!-- 버튼 그룹 영역 -->
      <business-take-over-btn-form></business-take-over-btn-form>
      <!-- 컨텐츠 영역 -->
      <business-take-over-grid-form></business-take-over-grid-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import BusinessTakeOverGridForm from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverGridForm';
import BusinessTakeOverSearchForm from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverSearchForm';
import BusinessTakeOverBtnForm from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverBtnForm';

export default {
  name: 'BusinessTakeOverPage',
  components: {
    BusinessTakeOverGridForm,
    BusinessTakeOverSearchForm,
    BusinessTakeOverBtnForm,
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
