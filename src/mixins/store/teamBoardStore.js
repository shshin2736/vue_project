import * as teamBoardStore from '@/store/modules/businessSupport/teamBoard/';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(teamBoardTypes.getters).reduce(func, []);

const actions = Object.entries(teamBoardTypes.actions).reduce(func, []);

export default {
  computed: {
    ...teamBoardStore.mapGetters([...getters]),
  },
  methods: {
    ...teamBoardStore.mapActions([...actions]),
  },
};
