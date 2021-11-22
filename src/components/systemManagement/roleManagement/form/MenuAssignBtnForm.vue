<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onAdd"
    >
      <!-- 추가 -->
      <span>{{ $t('NLS0000067') }}</span>
    </com-button>
    <com-button
      type="button"
      class="darkgray-btn perm_delete"
      :auth="$route.params.auth"
      @click="onDel"
    >
      <!-- 삭제 -->
      <span>{{ $t('NLS0000075') }}</span>
    </com-button>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onSave"
    >
      <!-- 저장 -->
      <span>{{ $t('NLS0000074') }}</span>
    </com-button>
    <button type="button" class="deepdarkgray-btn" @click="goToList">
      <!-- 목록 -->
      <span>{{ $t('NLS0000372') }} </span>
    </button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { roleManagementStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'MenuAssignBtnForm',
  mixins: [roleManagementStore],
  components: {
    ComButton,
  },
  computed: {
    getRoleMenu() {
      return this[roleManagementTypes.getters.GET_ROLE_MEMU_LIST];
    },
  },
  methods: {
    onSave() {
      this[roleManagementTypes.actions.UPDATE_ROLE_MEMU_LIST]({
        roleId: this.$route.params.roleId,
        roleMenuData: this.getRoleMenu,
      });
    },
    onAdd() {
      this[roleManagementTypes.actions.INIT_VIEWS_MENU_ADD_POPUP](true);
    },
    goToList() {
      this.$router.push({ path: `/rolePage` });
    },
    onDel() {
      const data = this.getRoleMenu.filter(i => i.selected === true);

      if (data.length > 0) {
        //삭제하시겠습니까?
        common.confirm('NLS0000004', () => {
          this[roleManagementTypes.actions.DELETE_ROLE_MENU]({
            roleId: this.$route.params.roleId,
            list: data,
          });
        });
      } else {
        //삭제할 행이 없습니다.
        common.alert('warning', 'NLS0000965');
      }
    },
  },
};
</script>
