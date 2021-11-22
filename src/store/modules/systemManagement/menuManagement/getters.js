import { getters } from './types';

export default {
  //* 메뉴리스트 가져오기
  [getters.GET_MENU_LIST](state) {
    return state.menuList;
  },
};
