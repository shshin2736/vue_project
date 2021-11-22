import { getters } from './types';

export default {
  [getters.GET_USER_ROLE_LIST](state) {
    return state.roleList;
  },
  [getters.GET_ROLE_MEMU_LIST](state) {
    return state.roleMenuList;
  },
  [getters.GET_VIEWS_ROLE_ADD_POPUP](state) {
    return state.roleAddPopup;
  },
  [getters.GET_ROLE_INFO](state) {
    return state.roleInfo;
  },
  [getters.GET_VIEWS_MENU_ADD_POPUP](state) {
    return state.menuAddPopup;
  },
  [getters.GET_ROLE_ID](state) {
    return state.roleId;
  },
  [getters.GET_SELECTED_DATA](state) {
    return state.selectedData;
  },
  [getters.GET_ROLE_USER](state) {
    return state.userRole;
  },
};
