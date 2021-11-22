<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- MBO 운영 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001113"
        tooltip="NLS0000733"
      ></com-page-title>
      <mbo-oper-tab-form></mbo-oper-tab-form>
      <!-- <mbo-oper-board-form></mbo-oper-board-form>
      <mbo-oper-list-form></mbo-oper-list-form> -->
      <mbo-oper-popup-form></mbo-oper-popup-form>
    </div>
  </div>
</template>
MbOperListForm
<script>
// import MboOperBoardForm from '@/components/goalSetting/mboOperation/form/MboOperBoardForm';
// import MboOperListForm from '@/components/goalSetting/mboOperation/form/MboOperListForm';
import MboOperTabForm from '@/components/goalSetting/mboOperation/form/MboOperTabForm';
import MboOperPopupForm from '@/components/goalSetting/mboOperation/form/MboOperPopupForm';
import ComPageTitle from '@/components/common/global/ComPageTitle';

export default {
  name: 'MboOperationPage',
  components: {
    MboOperPopupForm,
    MboOperTabForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000438', link: '' }, //목표 수립
        {
          title: 'NLS0001113', //MBO운영
          link: 'mboOperation',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
