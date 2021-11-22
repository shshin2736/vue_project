<template>
  <div class="page__btn-tbox">
    <!-- 사용자 권한 정보	 -->
    <div class="btn-box-title">
      {{ $t('NLS0000354') }}
    </div>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onClick"
    >
      <!-- 권한 추가	 -->
      <span>{{ $t('NLS0000118') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { userManagementStore, roleManagementStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { common } from '@/utils';

export default {
  name: 'UserRoleBtnForm',
  mixins: [userManagementStore, roleManagementStore],
  components: {
    ComButton,
  },
  computed: {
    getUserRole() {
      return this[userManagementTypes.getters.GET_USER_ROLE];
    },
    getUserInfo() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
  },
  methods: {
    onClick() {
      if (!common.isEmpty(this.getUserInfo.userId)) {
        this[roleManagementTypes.actions.FETCH_USER_ROLE_LIST]({
          exceptList: this.getUserRole,
        });
        this[userManagementTypes.actions.INIT_VIEWS_USER_ROLE_ASSIGN_POPUP](
          true,
        );
      } else {
        // 사용자 정보를 먼저 저장해야합니다.
        common.alert('warning', 'NLS0001048');
      }
    },
  },
};
</script>
