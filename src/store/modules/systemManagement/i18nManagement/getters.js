import { getters } from './types';

export default {
  [getters.GET_MESSAGE_LIST](state) {
    return state.messageList;
  },
  [getters.GET_SRCH_PARAM](state) {
    return state.srchParam;
  },
  [getters.GET_VIEWS_MESSAGE_UPDATE_POPUP](state) {
    return state.messageUpdatePopup;
  },
  [getters.GET_MESSAGE_INFO](state) {
    return state.messageInfo;
  },
};
