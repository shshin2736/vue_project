import { getters } from './types';

export default {
  //* 로그인 여부 가져오기
  [getters.GET_VIEWS_IS_LOGIN](state) {
    return state.views.isLogin;
  },

  //* ID/PW 찾기 정보 가져오기
  [getters.GET_FIND_ACCOUNT_INFO](state) {
    return state.findAccoutInfo;
  },
};
