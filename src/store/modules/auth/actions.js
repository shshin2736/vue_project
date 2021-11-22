import { actions, mutations } from './types';
import { rootActions } from '@/store/modules/common/types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  //* 로그인 요청
  async [actions.FETCH_LOGIN]({ commit }, payload) {
    try {
      const response = await axiosInstance.post(
        payload.loginURL,
        payload.loginInfo,
        {},
      );
      if (response.status === 200) {
        commit(mutations.SET_IS_LOGIN, true);
        const accessInfo = {
          timestamp: new Date().getTime(),
          menuList: response.data.data.menuList,
        };
        localStorage.setItem('accessInfo', JSON.stringify(accessInfo));
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* ID/PW 찾기 정보 가져오기
  async [actions.FETCH_FIND_ACCOUNT_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/findAccountInfo.do',
        payload,
      );
      commit(mutations.SET_FIND_ACCOUNT_INFO, data.data);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* AS-IS HMS LOGIN
  async [actions.FETCH_SSO_LOGIN]() {
    try {
      const response = await axiosInstance.post('/api/ssoLogin.do');
      if (response.status === 200) {
        //* ...
        return response.data;
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_LOGIN]({ commit, dispatch }) {
    try {
      //* 로그인 여부 설정
      commit(mutations.SET_IS_LOGIN, false);
      localStorage.removeItem('accessInfo');
      localStorage.removeItem('locale');
      dispatch(rootActions.INIT_COM_USER_INFO, {}, { root: true });
      dispatch(rootActions.INIT_I18N_LIST, [], { root: true });
      axiosInstance.get('api/logout.do');
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* ID/PW 찾기 정보 초기화
  [actions.INIT_FIND_ACCOUNT_INFO]({ commit }, payload) {
    commit(mutations.SET_FIND_ACCOUNT_INFO, payload);
  },
};
