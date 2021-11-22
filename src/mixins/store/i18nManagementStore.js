import * as i18nManagementStore from '@/store/modules/systemManagement/i18nManagement/';
import * as i18nManagementTypes from '@/store/modules/systemManagement/i18nManagement/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(i18nManagementTypes.getters).reduce(func, []);

const actions = Object.entries(i18nManagementTypes.actions).reduce(func, []);

export default {
  computed: {
    ...i18nManagementStore.mapGetters([...getters]),
  },
  methods: {
    ...i18nManagementStore.mapActions([...actions]),
  },
};
