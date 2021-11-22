import * as kpiGraphStore from '@/store/modules/businessExecution/kpiGraph/';
import * as kpiGraphTypes from '@/store/modules/businessExecution/kpiGraph/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(kpiGraphTypes.getters).reduce(func, []);

const actions = Object.entries(kpiGraphTypes.actions).reduce(func, []);

export default {
  computed: {
    ...kpiGraphStore.mapGetters([...getters]),
  },
  methods: {
    ...kpiGraphStore.mapActions([...actions]),
  },
};
