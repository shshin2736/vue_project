<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 코드 정보 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000099"
        tooltip="NLS0000714"
      ></com-page-title>

      <group-code-detail-form></group-code-detail-form>

      <code-list-detail-form></code-list-detail-form>

      <code-info-popup-form></code-info-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import CodeListDetailForm from '@/components/systemManagement/codeManagement/form/CodeListDetailForm';
import GroupCodeDetailForm from '@/components/systemManagement/codeManagement/form/GroupCodeDetailForm';
import CodeInfoPopupForm from '@/components/systemManagement/codeManagement/form/CodeInfoPopupForm';

export default {
  name: 'CommonCodePage',
  components: {
    CodeListDetailForm,
    GroupCodeDetailForm,
    CodeInfoPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001117', //코드관리
          link: 'codeListPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0000099', //코드정보
          link: 'codeListrDetailPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
