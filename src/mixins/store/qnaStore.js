import * as qnaStore from '@/store/modules/businessSupport/qna/';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(qnaTypes.getters).reduce(func, []);

const actions = Object.entries(qnaTypes.actions).reduce(func, []);

export default {
  computed: {
    ...qnaStore.mapGetters([...getters]),
  },
  methods: {
    ...qnaStore.mapActions([...actions]),
  },
};
