<template>
  <div>
    <com-srch-dept-popup v-model="deptPopup"></com-srch-dept-popup>
  </div>
</template>

<script>
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'SystemStatusPopupForm.vue',
  mixins: [commonStore],
  components: {
    ComSrchDeptPopup,
  },
  computed: {
    deptPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
  },
};
</script>
