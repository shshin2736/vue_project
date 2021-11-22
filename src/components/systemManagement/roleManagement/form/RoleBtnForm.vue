<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="addRole"
    >
      <!-- 권한 추가	 -->
      <span>{{ $t('NLS0000118') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { roleManagementStore } from '@/mixins';
export default {
  name: 'RoleBtnForm',
  mixins: [roleManagementStore],
  components: {
    ComButton,
  },
  methods: {
    addRole() {
      this[roleManagementTypes.actions.INIT_ROLE_INFO]({});
      this[roleManagementTypes.actions.INIT_VIEWS_ROLE_ADD_POPUP](true);
    },
  },
};
</script>
