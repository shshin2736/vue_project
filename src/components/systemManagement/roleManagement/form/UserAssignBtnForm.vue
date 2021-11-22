<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="addUser"
    >
      <!-- 추가 -->
      <span>{{ $t('NLS0000067') }}</span>
    </com-button>
    <com-button
      type="button"
      class="darkgray-btn perm_delete"
      :auth="$route.params.auth"
      @click="delUser"
    >
      <!-- 삭제 -->
      <span>{{ $t('NLS0000075') }}</span>
    </com-button>
    <button type="button" class="deepdarkgray-btn" @click="goToList">
      <!-- 목록 -->
      <span>{{ $t('NLS0000372') }} </span>
    </button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { commonStore, userManagementStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'userAssignBtnForm',
  mixins: [commonStore, userManagementStore],
  components: {
    ComButton,
  },
  computed: {
    getUser() {
      return this[userManagementTypes.getters.GET_USER_ROLE];
    },
  },
  methods: {
    addUser() {
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        exceptList: this.getUser,
      });
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({
        exceptList: this.getUser,
      });
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](true);
    },
    delUser() {
      const list = this.getUser.filter(i => i.selected === true);
      if (list.length > 0) {
        //삭제하시겠습니까?
        common.confirm('NLS0000004', () => {
          this[userManagementTypes.actions.DELETE_ROLE_ASSIGN]({
            list: list,
            roleId: this.$route.params.roleId,
          });
        });
      } else {
        //삭제할 행이 없습니다.
        common.alert('warning', 'NLS0000965');
      }
    },
    goToList() {
      this.$router.push({ path: `/rolePage` });
    },
  },
};
</script>
