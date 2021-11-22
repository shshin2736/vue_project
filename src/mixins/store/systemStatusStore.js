import * as systemStatusStore from '@/store/modules/systemManagement/systemStatus/';
import * as systemStatusTypes from '@/store/modules/systemManagement/systemStatus/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(systemStatusTypes.getters).reduce(func, []);

const actions = Object.entries(systemStatusTypes.actions).reduce(func, []);

export default {
  computed: {
    ...systemStatusStore.mapGetters([...getters]),
  },
  methods: {
    ...systemStatusStore.mapActions([...actions]),
  },
};
