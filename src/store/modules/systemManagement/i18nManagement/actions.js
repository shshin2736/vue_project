import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';

export default {
  async [actions.FETCH_MESSAGE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getMessageList.do',
        payload,
      );
      commit(mutations.SET_MESSAGE_LIST, data.data);
      commit(mutations.SET_SRCH_PARAM, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_MESSAGE]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/saveMessage.do',
        payload.data,
      );
      dispatch(actions.FETCH_MESSAGE_LIST, payload.param);
      dispatch(actions.INIT_MESSAGE_INFO, {});
      if (data.result === 'T') {
        //저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 메시지 등록/수정 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MESSAGE_UPDATE_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MESSAGE_UPDATE_POPUP, payload);
  },
  async [actions.FETCH_MESSAGE_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getMessageInfo.do',
        { compId: payload.compId },
      );
      commit(mutations.SET_MESSAGE_INFO, data.data);
      commit(mutations.SET_SRCH_PARAM, payload.param);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_MESSAGE_INFO]({ commit }) {
    commit(mutations.SET_MESSAGE_INFO, {
      compId: '',
      textKo: '',
      textEn: '',
      textZh: '',
    });
  },
};
