import * as departmentManagementStore from '@/store/modules/systemManagement/departmentManagement/';
import * as departmentManagementTypes from '@/store/modules/systemManagement/departmentManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(departmentManagementTypes.getters).reduce(
  func,
  [],
);

const actions = Object.entries(departmentManagementTypes.actions).reduce(
  func,
  [],
);

export default {
  computed: {
    ...departmentManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...departmentManagementStore.mapActions([...actions]),
  },
};
