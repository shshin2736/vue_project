import * as strategyEstabilshmentStore from '@/store/modules/goalSetting/strategyEstabilshment/';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(strategyEstabilshmentTypes.getters).reduce(
  func,
  [],
);

const actions = Object.entries(strategyEstabilshmentTypes.actions).reduce(
  func,
  [],
);

export default {
  computed: {
    ...strategyEstabilshmentStore.mapGetters([...getters]),
  },
  methods: {
    ...strategyEstabilshmentStore.mapActions([...actions]),
  },
};
