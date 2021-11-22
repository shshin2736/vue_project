<template>
  <div>
    <!-- 사용자 추가 팝업 -->
    <menu-add-popup v-model="openMenuAddPop"></menu-add-popup>
  </div>
</template>
<script>
import { roleManagementStore } from '@/mixins';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import MenuAddPopup from '@/components/systemManagement/roleManagement/business/MenuAddPopup';

export default {
  name: 'MenuAssignPopupForm',
  mixins: [roleManagementStore],
  components: {
    MenuAddPopup,
  },
  computed: {
    //* 사용자 추가 팝업
    openMenuAddPop: {
      set(value) {
        this[roleManagementTypes.actions.INIT_VIEWS_MENU_ADD_POPUP](value);
      },
      get() {
        return this[roleManagementTypes.getters.GET_VIEWS_MENU_ADD_POPUP];
      },
    },
  },
  methods: {},
};
</script>
