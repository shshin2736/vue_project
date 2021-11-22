import { actions, mutations } from './types';

export default {
  [actions.FETCH_VIEWTYPE]({ commit }, viewtype) {
    commit(mutations.SET_VIEWTYPE, viewtype);
  },
  [actions.FETCH_HANDDIVCE]({ commit }, handdvice) {
    commit(mutations.SET_HANDDIVCE, handdvice);
  },
  [actions.FETCH_HEIGHT]({ commit }, height) {
    commit(mutations.SET_HEIGHT, height);
  },
  [actions.FETCH_WIDTH]({ commit }, width) {
    commit(mutations.SET_WIDTH, width);
  },
};
