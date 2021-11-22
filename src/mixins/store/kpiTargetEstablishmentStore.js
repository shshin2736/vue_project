import * as kpiTargetEstablishmentStore from '@/store/modules/goalSetting/kpiTargetEstablishment/';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(kpiTargetEstablishmentTypes.getters).reduce(
  func,
  [],
);

const actions = Object.entries(kpiTargetEstablishmentTypes.actions).reduce(
  func,
  [],
);

export default {
  computed: {
    ...kpiTargetEstablishmentStore.mapGetters([...getters]),
  },
  methods: {
    ...kpiTargetEstablishmentStore.mapActions([...actions]),
  },
};
