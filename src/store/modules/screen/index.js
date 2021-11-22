import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { NAMESPACE } from './types';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(NAMESPACE);

export { mapState, mapGetters, mapActions };

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
