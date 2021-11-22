import { getters } from './types';

export default {
  //* 로그 리스트 가져오기
  [getters.GET_LOG_LIST](state) {
    return state.logList;
  },
};
