import * as generalTasksStore from '@/store/modules/businessExecution/projectExecution/generalTasks';
import * as generalTasksTypes from '@/store/modules/businessExecution/projectExecution/generalTasks/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(generalTasksTypes.getters).reduce(func, []);

const actions = Object.entries(generalTasksTypes.actions).reduce(func, []);

export default {
  computed: {
    ...generalTasksStore.mapGetters([...getters]),
  },
  methods: {
    ...generalTasksStore.mapActions([...actions]),
  },
};
