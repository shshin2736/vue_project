<template>
  <div>
    <single-user-popup v-model="isSrchUserPopup"></single-user-popup>
  </div>
</template>

<script>
import singleUserPopup from '@/components/common/business/DepartmentSinglePopup';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'UserDetailPopupForm',
  components: {
    singleUserPopup,
  },
  mixins: [commonStore],
  computed: {
    isSrchUserPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
  },
};
</script>
