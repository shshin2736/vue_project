import * as skillFileStore from '@/store/modules/systemManagement/skillFile/';
import * as skillFileStoreTypes from '@/store/modules/systemManagement/skillFile/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(skillFileStoreTypes.getters).reduce(func, []);

const actions = Object.entries(skillFileStoreTypes.actions).reduce(func, []);

export default {
  computed: {
    ...skillFileStore.mapGetters([...getters]),
  },
  methods: {
    ...skillFileStore.mapActions([...actions]),
  },
};
