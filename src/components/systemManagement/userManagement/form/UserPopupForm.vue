<template>
  <div>
    <user-excel-upload-popup
      v-model="isUserExcelUploadPopup"
    ></user-excel-upload-popup>
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
  </div>
</template>
<script>
import UserExcelUploadPopup from '@/components/systemManagement/userManagement/business/UserExcelUploadPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'UserPopupForm',
  components: {
    UserExcelUploadPopup,
    ComSrchDeptPopup,
  },
  mixins: [userManagementStore, commonStore],
  computed: {
    isUserExcelUploadPopup: {
      set(value) {
        this[userManagementTypes.actions.INIT_VIEWS_USER_EXCEL_UPLOAD_POPUP](
          value,
        );
      },
      get() {
        return this[
          userManagementTypes.getters.GET_VIEWS_USER_EXCEL_UPLOAD_POPUP
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
  },
};
</script>
