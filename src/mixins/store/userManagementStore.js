import * as userManagementStore from '@/store/modules/systemManagement/userManagement/';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(userManagementTypes.getters).reduce(func, []);

const actions = Object.entries(userManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...userManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...userManagementStore.mapActions([...actions]),
  },
};
