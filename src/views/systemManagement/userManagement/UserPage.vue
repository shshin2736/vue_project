<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 계정 관리 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001125"
        tooltip="NLS0000710"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <user-search-form></user-search-form>
      <!-- 버튼 그룹 영역 -->
      <user-btn-form></user-btn-form>
      <!-- 컨텐츠 영역 -->
      <user-grid-form></user-grid-form>
      <!-- 팝업 영역 -->
      <user-popup-form></user-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import UserGridForm from '@/components/systemManagement/userManagement/form/UserGridForm';
import UserSearchForm from '@/components/systemManagement/userManagement/form/UserSearchForm';
import UserBtnForm from '@/components/systemManagement/userManagement/form/UserBtnForm';
import UserPopupForm from '@/components/systemManagement/userManagement/form/UserPopupForm';

export default {
  name: 'UserPage',
  components: {
    UserGridForm,
    UserSearchForm,
    UserBtnForm,
    UserPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001125', //계정 관리
          link: 'userPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
