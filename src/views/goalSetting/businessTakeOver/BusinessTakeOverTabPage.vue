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

      <!-- 검색 폼 영역 -->
      <business-take-over-tab-form></business-take-over-tab-form>
      <!-- 버튼 그룹 영역 -->
      <business-take-over-take-tab></business-take-over-take-tab>
      <!-- 컨텐츠 영역 -->
      <business-take-over-over-tab></business-take-over-over-tab>
      <!-- 팝업 영역 -->
      <business-take-over-popup-form></business-take-over-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import BusinessTakeOverTabForm from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverTabForm';
import BusinessTakeOverTakeTab from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverTakeTab';
import BusinessTakeOverOverTab from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverOverTab';
import BusinessTakeOverPopupForm from '@/components/goalSetting/businessTakeOver/form/BusinessTakeOverPopupForm';

export default {
  name: 'BusinessTakeOverTabPage',
  components: {
    BusinessTakeOverTabForm,
    BusinessTakeOverTakeTab,
    BusinessTakeOverOverTab,
    BusinessTakeOverPopupForm,
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
