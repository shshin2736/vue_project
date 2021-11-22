<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 권한 관리 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001123"
        tooltip="NLS0000718"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <role-search-form></role-search-form>
      <!-- 버튼 그룹 영역 -->
      <role-btn-form></role-btn-form>
      <!-- 컨텐츠 영역 -->
      <role-grid-form></role-grid-form>
      <!--팝업 영역-->
      <role-popup-form></role-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import RoleGridForm from '@/components/systemManagement/roleManagement/form/RoleGridForm';
import RoleSearchForm from '@/components/systemManagement/roleManagement/form/RoleSearchForm';
import RoleBtnForm from '@/components/systemManagement/roleManagement/form/RoleBtnForm';
import RolePopupForm from '@/components/systemManagement/roleManagement/form/RolePopupForm';

export default {
  name: 'RolePage',
  components: {
    RoleGridForm,
    RoleSearchForm,
    RoleBtnForm,
    RolePopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001123', //권한 관리
          link: 'rolePage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
