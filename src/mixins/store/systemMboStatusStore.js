import * as systemMboStatusStore from '@/store/modules/businessExecution/systemMboStatus/';
import * as systemMboStatusTypes from '@/store/modules/businessExecution/systemMboStatus/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(systemMboStatusTypes.getters).reduce(func, []);

const actions = Object.entries(systemMboStatusTypes.actions).reduce(func, []);

export default {
  computed: {
    ...systemMboStatusStore.mapGetters([...getters]),
  },
  methods: {
    ...systemMboStatusStore.mapActions([...actions]),
  },
};
