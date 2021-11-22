<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="white-btn excel-btn perm_save"
      :auth="$route.params.auth"
      @click="onExcel"
    >
      <!-- EXCEL Upload	 -->
      <span>{{ $t('NLS0000791') }}</span>
    </com-button>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onAdd"
    >
      <!-- 신규 사용자 추가	 -->
      <span>{{ $t('NLS0000225') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { userManagementStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
export default {
  name: 'UserBtnForm',
  mixins: [userManagementStore],
  components: {
    ComButton,
  },
  methods: {
    onAdd() {
      this.$router.push({
        name: 'userDetailPage',
        query: { isNew: true },
        params: { auth: this.$route.params.auth, access: true, isNew: true },
      });
      this[userManagementTypes.actions.INIT_USER_INFO]();
      this[userManagementTypes.actions.INIT_USER_ROLE_LIST]();
    },
    onExcel() {
      this[userManagementTypes.actions.INIT_VIEWS_USER_EXCEL_UPLOAD_POPUP](
        true,
      );
    },
  },
};
</script>
