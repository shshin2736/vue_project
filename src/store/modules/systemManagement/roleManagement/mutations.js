import { mutations } from './types';

export default {
  [mutations.SET_USER_ROLE_LIST](state, payload) {
    state.roleList = payload;
  },
  [mutations.SET_ROLE_MENU_LIST](state, payload) {
    state.roleMenuList = payload;
  },
  [mutations.SET_VIEWS_ROLE_ADD_POPUP](state, payload) {
    state.roleAddPopup = payload;
  },
  [mutations.SET_ROLE_INFO](state, payload) {
    state.roleInfo = payload;
  },
  [mutations.SET_VIEWS_MENU_ADD_POPUP](state, payload) {
    state.menuAddPopup = payload;
  },
  [mutations.SET_ROLE_ID](state, payload) {
    state.roleId = payload;
  },
  [mutations.SET_SELECTED_DATA](state, payload) {
    state.selectedData = payload;
  },
};
