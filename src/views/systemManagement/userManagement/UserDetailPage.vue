<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <com-page-title
        :data="pageTitleList"
        :title="title"
        tooltip="NLS0000711"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <user-detail-table-form></user-detail-table-form>
      <!-- 버튼 그룹 영역 -->
      <user-detail-btn-form></user-detail-btn-form>
      <!-- 사용자 권한 타이틀 및 버튼 영역 -->
      <user-role-btn-form></user-role-btn-form>
      <!-- 사용자 권한 설정 영역 -->
      <user-role-grid-form></user-role-grid-form>
      <!-- 팝업 영역 -->
      <user-detail-popup-form></user-detail-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import UserDetailTableForm from '@/components/systemManagement/userManagement/form/UserDetailTableForm';
import UserDetailBtnForm from '@/components/systemManagement/userManagement/form/UserDetailBtnForm';
import UserRoleBtnForm from '@/components/systemManagement/userManagement/form/UserRoleBtnForm';
import UserRoleGridForm from '@/components/systemManagement/userManagement/form/UserRoleGridForm';
import UserDetailPopupForm from '@/components/systemManagement/userManagement/form/UserDetailPopupForm';
import { userManagementStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';

export default {
  name: 'UserDetailPage',
  components: {
    UserDetailTableForm,
    UserDetailBtnForm,
    UserRoleGridForm,
    UserRoleBtnForm,
    UserDetailPopupForm,
    ComPageTitle,
  },
  mixins: [userManagementStore],
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001125', // 계정 관리
          link: 'userPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0001124', //직원 상세 정보
          link: 'userDetailPage',
          params: this.$route.params,
        },
      ],
      title: 'NLS0001124', //직원 상세정보
    };
  },
  computed: {
    getUserDetail() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
  },
  created() {
    if (
      this.$route.params.flag !== 'dept' &&
      (this.getUserDetail.userId === null ||
        this.getUserDetail.userId == undefined)
    ) {
      this.pageTitleList = [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001125', // 계정 관리
          link: 'userPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0000225', //신규 정보
          link: 'userDetailPage',
          params: this.$route.params,
        },
      ];
      this.title = 'NLS0000225';
    } else {
      this.pageTitleList = [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title:
            this.$route.params.flag === 'dept' ? 'NLS0001118' : 'NLS0001125', // 계정 관리
          link:
            this.$route.params.flag === 'dept' ? 'deptListPage' : 'userPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0001124', //직원 상세 정보
          link: 'userDetailPage',
          params: this.$route.params,
        },
      ];
      this.title = 'NLS0001124'; //직원 상세정보
    }
  },
};
</script>
