import * as specializedTasksStore from '@/store/modules/businessExecution/projectExecution/specializedTasks/';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(specializedTasksTypes.getters).reduce(func, []);

const actions = Object.entries(specializedTasksTypes.actions).reduce(func, []);

export default {
  computed: {
    ...specializedTasksStore.mapGetters([...getters]),
  },
  methods: {
    ...specializedTasksStore.mapActions([...actions]),
  },
};
