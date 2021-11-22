<template>
  <div>
    <mbo-mng-target-form v-if="mboTarget"></mbo-mng-target-form>
    <mbo-mng-target-setup-form
      v-if="mboTargetSetup"
    ></mbo-mng-target-setup-form>
  </div>
</template>

<script>
import { mboManagementStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';

import MboMngTargetForm from '@/components/goalSetting/mboManagement/form/MboMngTargetForm';
import MboMngTargetSetupForm from '@/components/goalSetting/mboManagement/form/MboMngTargetSetupForm';

export default {
  name: 'MboMngTabContentsForm',
  mixins: [mboManagementStore],
  components: {
    MboMngTargetForm,
    MboMngTargetSetupForm,
  },
  computed: {
    mboTarget: {
      set(value) {
        this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET](value);
      },
      get() {
        return this[mboManagementTypes.getters.GET_TAB_CONTENTS_MBO_TARGET];
      },
    },
    mboTargetSetup: {
      set(value) {
        this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET_SETUP](
          value,
        );
      },
      get() {
        return this[
          mboManagementTypes.getters.GET_TAB_CONTENTS_MBO_TARGET_SETUP
        ];
      },
    },
  },
};
</script>

<style></style>
