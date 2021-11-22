import * as authStore from '@/store/modules/auth/';
import * as authTypes from '@/store/modules/auth/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(authTypes.getters).reduce(func, []);

const actions = Object.entries(authTypes.actions).reduce(func, []);

export default {
  computed: {
    ...authStore.mapGetters([...getters]),
  },
  methods: {
    ...authStore.mapActions([...actions]),
  },
};
