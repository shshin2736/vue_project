<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 다국어 관리 -->
      <com-page-title
        :data="pageTitleList"
        tooltip="NLS0000709"
        title="NLS0000097"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <message-srch-form></message-srch-form>
      <!-- 버튼 영역 -->
      <message-btn-form></message-btn-form>
      <!-- 컨텐츠 영역 -->
      <message-grid-form></message-grid-form>
      <!-- 팝업 영역 -->
      <message-popup-form></message-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import MessageGridForm from '@/components/systemManagement/i18nManagement/form/MessageGridForm';
import MessageSrchForm from '@/components/systemManagement/i18nManagement/form/MessageSrchForm';
import MessageBtnForm from '@/components/systemManagement/i18nManagement/form/MessageBtnForm';
import MessagePopupForm from '@/components/systemManagement/i18nManagement/form/MessagePopupForm';

export default {
  name: 'MessagePage',
  components: {
    MessageGridForm,
    MessageSrchForm,
    MessageBtnForm,
    MessagePopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0000097', //다국어 관리
          link: 'i18nPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
