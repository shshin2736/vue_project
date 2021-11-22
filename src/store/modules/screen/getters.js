import { getters } from './types';

export default {
  [getters.GET_VIEWTYPE](state) {
    return state.isViewType;
  },
  [getters.GET_HANDDIVCE](state) {
    return state.isHandDvice;
  },
  [getters.GET_HEIGHT](state) {
    return state.viewportHeight;
  },
  [getters.GET_WIDTH](state) {
    return state.viewportWidth;
  },
};
