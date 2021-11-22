<template>
  <div>
    <my-page-popup v-model="isMyPagePopup"></my-page-popup>
    <update-approval-popup v-model="isAprvPopup"></update-approval-popup>
    <update-pwd-popup v-model="isPwdPopup"></update-pwd-popup>
    <single-user-popup v-model="isSingleUserPopup"></single-user-popup>
  </div>
</template>
<script>
import MyPagePopup from '@/components/systemManagement/userManagement/business/MyPagePopup';
import UpdateApprovalPopup from '@/components/systemManagement/userManagement/business/UpdateApprovalPopup';
import UpdatePwdPopup from '@/components/systemManagement/userManagement/business/UpdatePwdPopup';
import SingleUserPopup from '@/components/common/business/DepartmentSinglePopup';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'UserPopupForm',
  components: {
    MyPagePopup,
    UpdateApprovalPopup,
    UpdatePwdPopup,
    SingleUserPopup,
  },
  mixins: [userManagementStore, commonStore],
  computed: {
    isMyPagePopup: {
      set(value) {
        this[userManagementTypes.actions.INIT_VIEWS_MY_PAGE_POPUP](value);
      },
      get() {
        return this[userManagementTypes.getters.GET_VIEWS_MY_PAGE_POPUP];
      },
    },
    isAprvPopup: {
      set(value) {
        this[userManagementTypes.actions.INIT_VIEWS_APPROVAL_POPUP](value);
      },
      get() {
        return this[userManagementTypes.getters.GET_VIEWS_APPROVAL_POPUP];
      },
    },
    isPwdPopup: {
      set(value) {
        this[userManagementTypes.actions.INIT_VIEWS_PWD_POPUP](value);
      },
      get() {
        return this[userManagementTypes.getters.GET_VIEWS_PWD_POPUP];
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
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
  },
};
</script>
