import * as logManagementStore from '@/store/modules/systemManagement/logManagement/';
import * as logManagementTypes from '@/store/modules/systemManagement/logManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(logManagementTypes.getters).reduce(func, []);

const actions = Object.entries(logManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...logManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...logManagementStore.mapActions([...actions]),
  },
};
