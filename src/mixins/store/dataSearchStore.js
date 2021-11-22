import * as dataSearchStore from '@/store/modules/businessSupport/dataSearch/';
import * as dataSearchTypes from '@/store/modules/businessSupport/dataSearch/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(dataSearchTypes.getters).reduce(func, []);

const actions = Object.entries(dataSearchTypes.actions).reduce(func, []);

export default {
  computed: {
    ...dataSearchStore.mapGetters([...getters]),
  },
  methods: {
    ...dataSearchStore.mapActions([...actions]),
  },
};
