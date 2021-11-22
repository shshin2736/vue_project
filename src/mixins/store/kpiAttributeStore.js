import * as kpiAttributeStore from '@/store/modules/systemManagement/kpiAttribute/';
import * as kpiAttributeTypes from '@/store/modules/systemManagement/kpiAttribute/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(kpiAttributeTypes.getters).reduce(func, []);

const actions = Object.entries(kpiAttributeTypes.actions).reduce(func, []);

export default {
  computed: {
    ...kpiAttributeStore.mapGetters([...getters]),
  },
  methods: {
    ...kpiAttributeStore.mapActions([...actions]),
  },
};
