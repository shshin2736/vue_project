<template>
  <div>
    <user-role-assign-popup
      v-model="isUserRoleAssignPopup"
    ></user-role-assign-popup>
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
    <!-- <single-user-popup v-model="isSingleUserPopup"></single-user-popup> -->
  </div>
</template>
<script>
import UserRoleAssignPopup from '@/components/systemManagement/userManagement/business/UserRoleAssignPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
// import SingleUserPopup from '@/components/common/business/DepartmentSinglePopup';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'UserDetailPopupForm',
  components: {
    UserRoleAssignPopup,
    ComSrchDeptPopup,
    // SingleUserPopup,
  },
  mixins: [userManagementStore, commonStore],
  computed: {
    //* 사용자 권한설정 팝업 ON/OFF
    isUserRoleAssignPopup: {
      set(value) {
        this[userManagementTypes.actions.INIT_VIEWS_USER_ROLE_ASSIGN_POPUP](
          value,
        );
      },
      get() {
        return this[
          userManagementTypes.getters.GET_VIEWS_USER_ROLE_ASSIGN_POPUP
        ];
      },
    },
    //* 사용자 부서설정 팝업 ON/OFF
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
    isSingleUserPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
  },
};
</script>
