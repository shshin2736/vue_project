import * as menuManagementStore from '@/store/modules/systemManagement/menuManagement/';
import * as menuManagementTypes from '@/store/modules/systemManagement/menuManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(menuManagementTypes.getters).reduce(func, []);

const actions = Object.entries(menuManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...menuManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...menuManagementStore.mapActions([...actions]),
  },
};
