import * as dashboardStore from '@/store/modules/dashboard/';
import * as dashboardTypes from '@/store/modules/dashboard/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(dashboardTypes.getters).reduce(func, []);

const actions = Object.entries(dashboardTypes.actions).reduce(func, []);

export default {
  computed: {
    ...dashboardStore.mapGetters([...getters]),
  },
  methods: {
    ...dashboardStore.mapActions([...actions]),
  },
};
