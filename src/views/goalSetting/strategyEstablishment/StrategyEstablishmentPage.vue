<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 전략 수립 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001115"
        tooltip="NLS0000729"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <strategy-estabilshment-search-form></strategy-estabilshment-search-form>
      <!-- 버튼 그룹 영역 -->
      <strategy-estabilshment-btn-form></strategy-estabilshment-btn-form>
      <!-- 컨텐츠 영역 -->
      <strategy-estabilshment-grid-form></strategy-estabilshment-grid-form>
      <!-- 팝업 영역 -->
      <strategy-estabilshment-popup-form></strategy-estabilshment-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import StrategyEstabilshmentGridForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstabilshmentGridForm';
import StrategyEstabilshmentSearchForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstabilshmentSearchForm';
import StrategyEstabilshmentBtnForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstabilshmentBtnForm';
import StrategyEstabilshmentPopupForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstabilshmentPopupForm';

export default {
  name: 'StrategyEstabilshmentPage',
  components: {
    StrategyEstabilshmentGridForm,
    StrategyEstabilshmentSearchForm,
    StrategyEstabilshmentBtnForm,
    StrategyEstabilshmentPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000438', link: '' }, //목표 수립
        {
          title: 'NLS0001115',
          link: 'strategyEstablishment',
          params: this.$route.params,
        }, //전략 수립
      ],
    };
  },
};
</script>
