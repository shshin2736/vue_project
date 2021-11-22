import * as businessTakeOverStore from '@/store/modules/goalSetting/businessTakeOver/';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(businessTakeOverTypes.getters).reduce(func, []);

const actions = Object.entries(businessTakeOverTypes.actions).reduce(func, []);

export default {
  computed: {
    ...businessTakeOverStore.mapGetters([...getters]),
  },
  methods: {
    ...businessTakeOverStore.mapActions([...actions]),
  },
};
