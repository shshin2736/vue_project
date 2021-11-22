<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 권한 그룹 설정 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001121"
        tooltip="NLS0000721"
      ></com-page-title>
      <!-- 권한 테이블 영역 -->
      <role-table-form></role-table-form>
      <!-- 사용자 설정 버튼 영역 -->
      <menu-assign-btn-form></menu-assign-btn-form>
      <!-- 사용자 Grid 영역 -->
      <menu-grid-form></menu-grid-form>
      <!-- 시용자 설정 팝업 영역 -->
      <menu-assign-popup-form></menu-assign-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import RoleTableForm from '@/components/systemManagement/roleManagement/form/RoleTableForm';
import MenuGridForm from '@/components/systemManagement/roleManagement/form/MenuGridForm';
import MenuAssignBtnForm from '@/components/systemManagement/roleManagement/form/MenuAssignBtnForm';
import MenuAssignPopupForm from '@/components/systemManagement/roleManagement/form/MenuAssignPopupForm';

export default {
  name: 'RolePage',
  components: {
    RoleTableForm,
    MenuGridForm,
    MenuAssignBtnForm,
    MenuAssignPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        { title: 'NLS0001123', link: 'rolePage' }, //권한 관리
        {
          title: 'NLS0001122', //메뉴 추가
          link: 'MenuAssignPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
