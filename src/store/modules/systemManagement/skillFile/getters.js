import { getters } from './types';

export default {
  [getters.GET_PRJ_SKILL_FILE](state) {
    return state.prjSkillFile;
  },
  [getters.GET_VIEWS_FILE_UPLOAD_POPUP](state) {
    return state.viewFileUpload;
  },
  [getters.GET_SKILL_FILE_DATA](state) {
    return state.prjSkillData;
  },
  [getters.GET_SRCH_PARAM](state) {
    return state.srchParam;
  },
};
