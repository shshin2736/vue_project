import * as commonStore from '@/store/modules/common/';
import * as commonTypes from '@/store/modules/common/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(commonTypes.getters).reduce(func, []);

const actions = Object.entries(commonTypes.actions).reduce(func, []);

export default {
  computed: {
    ...commonStore.mapGetters([...getters]),
  },
  methods: {
    ...commonStore.mapActions([...actions]),
  },
};
