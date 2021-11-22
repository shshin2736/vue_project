<template>
  <div>
    <!-- 사용자 추가 팝업 -->
    <department-multi-popup
      v-model="openUserSearchPop"
    ></department-multi-popup>
  </div>
</template>
<script>
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import DepartmentMultiPopup from '@/components/common/business/DepartmentMultiPopup';

export default {
  name: 'UserAssignPopupForm',
  mixins: [commonStore],
  components: {
    DepartmentMultiPopup,
  },
  data() {
    return {};
  },
  computed: {
    //* 사용자 추가 팝업
    openUserSearchPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_MULTI_POP];
      },
    },
  },
  methods: {},
};
</script>
