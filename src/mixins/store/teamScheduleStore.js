import * as teamScheduleStore from '@/store/modules/businessSupport/teamSchedule/';
import * as teamScheduleTypes from '@/store/modules/businessSupport/teamSchedule/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(teamScheduleTypes.getters).reduce(func, []);

const actions = Object.entries(teamScheduleTypes.actions).reduce(func, []);

export default {
  computed: {
    ...teamScheduleStore.mapGetters([...getters]),
  },
  methods: {
    ...teamScheduleStore.mapActions([...actions]),
  },
};
