<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- MBO 관리 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001112"
        tooltip="NLS0000732"
      ></com-page-title>

      <!-- 추가 버튼 폼 영역 -->
      <mbo-mng-add-btn-form></mbo-mng-add-btn-form>
      <!-- 그리드 영역 -->
      <mbo-mng-grid-form></mbo-mng-grid-form>
      <!-- 탭 버튼 영역 -->
      <mbo-mng-tab-form></mbo-mng-tab-form>
      <!-- 선택된 탭 내용 영역-->
      <mbo-mng-tab-contents-form></mbo-mng-tab-contents-form>
      <!-- 팝업 영역-->
      <mbo-mng-popup-form></mbo-mng-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import MboMngAddBtnForm from '@/components/goalSetting/mboManagement/form/MboMngAddBtnForm';
import MboMngGridForm from '@/components/goalSetting/mboManagement/form/MboMngGridForm';
import MboMngTabForm from '@/components/goalSetting/mboManagement/form/MboMngTabForm';
import MboMngTabContentsForm from '@/components/goalSetting/mboManagement/form/MboMngTabContentsForm';
import MboMngPopupForm from '@/components/goalSetting/mboManagement/form/MboMngPopupForm';

export default {
  name: 'MboManagementPage',
  components: {
    MboMngAddBtnForm,
    MboMngGridForm,
    MboMngTabForm,
    MboMngTabContentsForm,
    MboMngPopupForm,
    ComPageTitle,
  },

  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000438', link: '' }, //목표 수립
        {
          title: 'NLS0001112', //MBO관리
          link: 'mboManagement',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
