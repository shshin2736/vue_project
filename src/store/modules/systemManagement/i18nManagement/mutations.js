import { mutations } from './types';

export default {
  [mutations.SET_MESSAGE_LIST](state, payload) {
    state.messageList = payload;
  },
  [mutations.SET_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
  [mutations.SET_VIEWS_MESSAGE_UPDATE_POPUP](state, payload) {
    state.messageUpdatePopup = payload;
  },
  [mutations.SET_MESSAGE_INFO](state, payload) {
    state.messageInfo = payload;
  },
};
