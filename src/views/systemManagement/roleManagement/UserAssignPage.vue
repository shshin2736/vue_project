<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 권한 그룹 설정 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001121"
        tooltip="NLS0000722"
      ></com-page-title>
      <!-- 권한 테이블 영역 -->
      <role-table-form></role-table-form>
      <!-- 사용자 설정 버튼 영역 -->
      <user-assign-btn-form></user-assign-btn-form>
      <!-- 사용자 Grid 영역 -->
      <user-grid-form></user-grid-form>
      <!-- 시용자 설정 팝업 영역 -->
      <user-assign-popup-form></user-assign-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import RoleTableForm from '@/components/systemManagement/roleManagement/form/RoleTableForm';
import UserGridForm from '@/components/systemManagement/roleManagement/form/UserGridForm';
import UserAssignBtnForm from '@/components/systemManagement/roleManagement/form/UserAssignBtnForm';
import UserAssignPopupForm from '@/components/systemManagement/roleManagement/form/UserAssignPopupForm';

export default {
  name: 'RolePage',
  components: {
    RoleTableForm,
    UserGridForm,
    UserAssignBtnForm,
    UserAssignPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        { title: 'NLS0001123', link: 'rolePage' }, //권한 관리
        {
          title: 'NLS0000495', //사용자 추가
          link: 'UserAssignPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
