import * as kpiPerformanceStore from '@/store/modules/businessExecution/kpiPerformance/';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(kpiPerformanceTypes.getters).reduce(func, []);

const actions = Object.entries(kpiPerformanceTypes.actions).reduce(func, []);

export default {
  computed: {
    ...kpiPerformanceStore.mapGetters([...getters]),
  },
  methods: {
    ...kpiPerformanceStore.mapActions([...actions]),
  },
};
