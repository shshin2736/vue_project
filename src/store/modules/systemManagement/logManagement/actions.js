import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  //* 로그리스트 가져오기
  async [actions.FETCH_LOG_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getLogList.do',
        params,
      );
      commit(mutations.SET_LOG_LIST, data.data);
    } catch (error) {
      alert(error);
    }
  },
};
