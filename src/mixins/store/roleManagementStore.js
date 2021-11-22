import * as roleManagementStore from '@/store/modules/systemManagement/roleManagement/';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(roleManagementTypes.getters).reduce(func, []);

const actions = Object.entries(roleManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...roleManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...roleManagementStore.mapActions([...actions]),
  },
};
