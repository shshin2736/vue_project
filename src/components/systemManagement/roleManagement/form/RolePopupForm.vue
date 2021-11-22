<template>
  <div>
    <role-add-popup v-model="isRoleAddPopup"></role-add-popup>
  </div>
</template>
<script>
import RoleAddPopup from '@/components/systemManagement/roleManagement/business/RoleAddPopup';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { roleManagementStore } from '@/mixins';
export default {
  name: 'RolePopupForm',
  components: { RoleAddPopup },
  mixins: [roleManagementStore],
  computed: {
    //* 권한 추가 팝업 ON/OFF
    isRoleAddPopup: {
      set(value) {
        this[roleManagementTypes.actions.INIT_VIEWS_ROLE_ADD_POPUP](value);
      },
      get() {
        return this[roleManagementTypes.getters.GET_VIEWS_ROLE_ADD_POPUP];
      },
    },
  },
};
</script>
