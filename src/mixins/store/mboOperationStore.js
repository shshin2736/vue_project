import * as mboOperationStore from '@/store/modules/goalSetting/mboOperation/';
import * as mboOperationTypes from '@/store/modules/goalSetting/mboOperation/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(mboOperationTypes.getters).reduce(func, []);

const actions = Object.entries(mboOperationTypes.actions).reduce(func, []);

export default {
  computed: {
    ...mboOperationStore.mapGetters([...getters]),
  },
  methods: {
    ...mboOperationStore.mapActions([...actions]),
  },
};
