<template>
  <div>
    <com-srch-dept-popup v-model="isSrchDeptPopup"></com-srch-dept-popup>
    <!-- <single-user-popup v-model="isSrchUserPopup"></single-user-popup> -->
  </div>
</template>
<script>
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
// import SingleUserPopup from '@/components/common/business/DepartmentSinglePopup';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'UserDetailPopupForm',
  components: {
    ComSrchDeptPopup,
    // SingleUserPopup,
  },
  mixins: [commonStore],
  computed: {
    isSrchDeptPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
    // isSrchUserPopup: {
    //   set(value) {
    //     this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
    //   },
    //   get() {
    //     return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
    //   },
    // },
  },
};
</script>
