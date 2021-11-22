import { mutations } from './types';

export default {
  //* 메뉴리스트 저장
  [mutations.SET_MENU_LIST](state, payload) {
    state.menuList = payload;
  },
};
