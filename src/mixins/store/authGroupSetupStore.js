import * as authGroupSetupStore from '@/store/modules/systemManagement/authGroupSetup/';
import * as authGroupSetupTypes from '@/store/modules/systemManagement/authGroupSetup/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(authGroupSetupTypes.getters).reduce(func, []);

const actions = Object.entries(authGroupSetupTypes.actions).reduce(func, []);

export default {
  computed: {
    ...authGroupSetupStore.mapGetters([...getters]),
  },
  methods: {
    ...authGroupSetupStore.mapActions([...actions]),
  },
};
