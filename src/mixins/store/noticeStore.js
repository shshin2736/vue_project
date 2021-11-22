import * as noticeStore from '@/store/modules/businessSupport/notice/';
import * as noticeTypes from '@/store/modules/businessSupport/notice/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(noticeTypes.getters).reduce(func, []);

const actions = Object.entries(noticeTypes.actions).reduce(func, []);

export default {
  computed: {
    ...noticeStore.mapGetters([...getters]),
  },
  methods: {
    ...noticeStore.mapActions([...actions]),
  },
};
