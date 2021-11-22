import { mutations } from './types';

export default {
  [mutations.SET_PRJ_SKILL_FILE](state, payload) {
    state.prjSkillFile = payload;
  },
  [mutations.SET_VIEWS_FILE_UPLOAD_POPUP](state, payload) {
    state.viewFileUpload = payload;
  },
  [mutations.SET_SKILL_FILE_DATA](state, payload) {
    state.prjSkillData = payload;
  },
  [mutations.SET_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
};
