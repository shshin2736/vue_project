import * as mboManagementStore from '@/store/modules/goalSetting/mboManagement';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(mboManagementTypes.getters).reduce(func, []);

const actions = Object.entries(mboManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...mboManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...mboManagementStore.mapActions([...actions]),
  },
};
