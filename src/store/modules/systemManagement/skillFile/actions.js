import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  async [actions.FETCH_PRJ_SKILL_FILE]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getPrjSkillFile.do',
        payload,
      );
      commit(mutations.SET_PRJ_SKILL_FILE, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_VIEWS_FILE_UPLOAD_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_FILE_UPLOAD_POPUP, payload);
  },
  [actions.INIT_SKILL_FILE_DATA]({ commit }, payload) {
    commit(mutations.SET_SKILL_FILE_DATA, payload);
  },
  async [actions.UPDATE_SKILL_FILE]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/savePrjSkillFile.do',
        payload,
      );
      let res = false;
      if (data.result === 'T') {
        res = true;
      }
      dispatch(actions.FETCH_PRJ_SKILL_FILE, {
        prjType: payload.prjType,
        languageCode: payload.languageCode,
      });
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_SRCH_PARAM]({ commit }, payload) {
    commit(mutations.SET_SRCH_PARAM, payload);
  },
};
