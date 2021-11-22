import { mutations } from './types';

export default {
  [mutations.SET_ROLE_COMBO](state, payload) {
    state.roleCombo = payload;
  },
  [mutations.SET_USER_ROLE](state, payload) {
    state.userRole = payload;
  },
  [mutations.SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  [mutations.SET_USER_LIST](state, payload) {
    state.userList = payload;
  },
  [mutations.INIT_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  [mutations.SET_USER_ERROR](state, payload) {
    state.userError = payload;
  },
  [mutations.SET_VIEWS_USER_ROLE_ASSIGN_POPUP](state, payload) {
    state.userRoleAssignPopup = payload;
  },
  [mutations.SET_VIEWS_USER_DEPT_ASSIGN_POPUP](state, payload) {
    state.userDeptAssignPopup = payload;
  },
  [mutations.SET_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
  [mutations.SET_VIEWS_USER_EXCEL_UPLOAD_POPUP](state, payload) {
    state.userExcelUploadPopup = payload;
  },
  [mutations.SET_VIEWS_MY_PAGE_POPUP](state, payload) {
    state.myPagePopup = payload;
  },
  [mutations.SET_VIEWS_APPROVAL_POPUP](state, payload) {
    state.aprvlPopup = payload;
  },
  [mutations.SET_VIEWS_PWD_POPUP](state, payload) {
    state.pwdPopup = payload;
  },
  [mutations.SET_MY_INFO](state, payload) {
    state.myInfo = payload;
  },
  [mutations.SET_APVL_DATA](state, payload) {
    state.apvl = payload;
  },
  [mutations.SET_PW_EXP_DATE](state, payload) {
    state.pwExpDate = payload;
  },
  [mutations.SET_EXCEL_DATA](state, payload) {
    state.excelData = payload;
  },
};
