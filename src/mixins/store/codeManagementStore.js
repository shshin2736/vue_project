import * as codeManagementStore from '@/store/modules/systemManagement/codeManagement/';
import * as codeManagementTypes from '@/store/modules/systemManagement/codeManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(codeManagementTypes.getters).reduce(func, []);

const actions = Object.entries(codeManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...codeManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...codeManagementStore.mapActions([...actions]),
  },
};
