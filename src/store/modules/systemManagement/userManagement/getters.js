import { getters } from './types';

export default {
  [getters.GET_ROLE_COMBO](state) {
    return state.roleCombo;
  },
  [getters.GET_USER_ROLE](state) {
    return state.userRole;
  },
  [getters.GET_USER_LIST](state) {
    return state.userList;
  },
  [getters.GET_USER_INFO](state) {
    return state.userInfo;
  },
  [getters.GET_USER_ERROR](state) {
    return state.userError;
  },
  [getters.GET_VIEWS_USER_ROLE_ASSIGN_POPUP](state) {
    return state.userRoleAssignPopup;
  },
  [getters.GET_VIEWS_USER_DEPT_ASSIGN_POPUP](state) {
    return state.userDeptAssignPopup;
  },
  [getters.GET_SRCH_PARAM](state) {
    return state.srchParam;
  },
  [getters.GET_VIEWS_USER_EXCEL_UPLOAD_POPUP](state) {
    return state.userExcelUploadPopup;
  },
  [getters.GET_VIEWS_MY_PAGE_POPUP](state) {
    return state.myPagePopup;
  },
  [getters.GET_VIEWS_APPROVAL_POPUP](state) {
    return state.aprvlPopup;
  },
  [getters.GET_VIEWS_PWD_POPUP](state) {
    return state.pwdPopup;
  },
  [getters.GET_MY_INFO](state) {
    return state.myInfo;
  },
  [getters.GET_APVL_DATA](state) {
    return state.apvl;
  },
  [getters.GET_PW_EXP_DATE](state) {
    return state.pwExpDate;
  },
  [getters.GET_EXCEL_DATA](state) {
    return state.excelData;
  },
};
