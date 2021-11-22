<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 전략 수립 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001115"
        tooltip="NLS0000730"
      ></com-page-title>
      <!-- 메인 영역 -->
      <strategy-Establishment-input-form></strategy-Establishment-input-form>
      <!-- 버튼 영역 -->
      <strategy-Establishment-input-btn-form></strategy-Establishment-input-btn-form>
      <!-- 팝업 영역 -->
      <strategy-estabilshment-popup-form></strategy-estabilshment-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import StrategyEstablishmentInputForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstablishmentInputForm';
import StrategyEstablishmentInputBtnForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstablishmentInputBtnForm';
import StrategyEstabilshmentPopupForm from '@/components/goalSetting/strategyEstabilshment/form/StrategyEstabilshmentPopupForm';

export default {
  name: 'StrategyEstablishmentInputPage',
  components: {
    StrategyEstablishmentInputForm,
    StrategyEstablishmentInputBtnForm,
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
        {
          title: 'NLS0001116', //전략 수립 등록
          link: 'strategyEstablishmentInput',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
