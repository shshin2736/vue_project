<template>
  <div>
    <!-- 사용자 추가 팝업 -->
    <!-- <department-single-popup
      v-model="openUserSearchPop"
    ></department-single-popup> -->
  </div>
</template>
<script>
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
// import DepartmentSinglePopup from '@/components/common/business/DepartmentSinglePopup';

export default {
  name: 'KpiAttrPopupForm',
  mixins: [commonStore],
  components: {
    // DepartmentSinglePopup,
  },
  data() {
    return {};
  },
  computed: {
    //* 사용자 추가 팝업
    openUserSearchPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
  },
  methods: {},
};
</script>
