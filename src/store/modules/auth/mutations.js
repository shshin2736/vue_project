import { mutations } from './types';

export default {
  //* 로그인 여부 설정
  [mutations.SET_IS_LOGIN](state, payload) {
    state.views.isLogin = payload;
  },
  //* ID/PW 찾기 정보 가져오기
  [mutations.SET_FIND_ACCOUNT_INFO](state, payload) {
    state.findAccoutInfo = payload;
  },
};
