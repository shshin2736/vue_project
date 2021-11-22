import { mutations } from './types';

export default {
  //* 로그 리스트 저장
  [mutations.SET_LOG_LIST](state, param) {
    state.logList = param;
  },
};
