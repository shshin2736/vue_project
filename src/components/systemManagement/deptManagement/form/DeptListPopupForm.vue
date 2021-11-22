<template>
  <div>
    <!-- 사용자 추가 팝업 -->
    <department-multi-popup
      v-model="openUserSearchPop"
    ></department-multi-popup>
    <srch-dept-tree
      :flag="openSrchDeptTree.flag"
      :deptId="openSrchDeptTree.deptId"
    ></srch-dept-tree>
  </div>
</template>
<script>
import { commonStore, departmentManagementStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as deptTypes from '@/store/modules/systemManagement/departmentManagement/types';
import DepartmentMultiPopup from '@/components/common/business/DepartmentMultiPopup';
import SrchDeptTree from '@/components/systemManagement/deptManagement/business/SrchDeptTree';
export default {
  name: 'DeptListPopupForm',
  components: {
    DepartmentMultiPopup,
    SrchDeptTree,
  },
  mixins: [commonStore, departmentManagementStore],
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
    //* 부서 추가 팝업
    openSrchDeptTree: {
      set(value) {
        this[deptTypes.actions.INIT_VIEWS_SRCH_DEPT_TREE]({
          flag: value.flag,
          deptId: value.deptId,
        });
      },
      get() {
        return this[deptTypes.getters.GET_VIEWS_SRCH_DEPT_TREE];
      },
    },
  },
  methods: {},
};
</script>
