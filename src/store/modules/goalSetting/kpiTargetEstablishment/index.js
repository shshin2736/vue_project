import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import { createNamespacedHelpers } from 'vuex';
const NAMESPACE = 'kpiTargetEstablishment';
const { mapState, mapGetters, mapActions } = createNamespacedHelpers(NAMESPACE);

export { mapState, mapGetters, mapActions };

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
