import { mutations } from './types';

export default {
  [mutations.SET_VIEWTYPE](state, type) {
    state.isViewType = type;
  },
  [mutations.SET_HANDDIVCE](state, deviceBoolean) {
    state.isHandDvice = deviceBoolean;
  },
  [mutations.SET_HEIGHT](state, height) {
    state.viewportHeight = height;
  },
  [mutations.SET_WIDTH](state, width) {
    state.viewportWidth = width;
  },
};
