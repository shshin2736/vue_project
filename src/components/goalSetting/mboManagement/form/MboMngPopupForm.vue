<template>
  <div>
    <!-- MBO 등록 팝업 -->
    <mbo-mng-regist-popup v-model="getMboMngRegistPopup"></mbo-mng-regist-popup>
    <!-- 부서 검색 팝업 -->
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
    <!-- 멀티 부서/담당자 검색 팝업 -->
    <department-multi-popup
      v-model="openDepartMultiPop"
    ></department-multi-popup>
    <!-- 싱글 부서/담당자 검색 팝업 -->
    <!-- <department-single-popup
      v-model="openDepartSinglePop"
    ></department-single-popup> -->
  </div>
</template>
<script>
import * as commonTypes from '@/store/modules/common/types';
import { mboManagementStore, commonStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';
import MboMngRegistPopup from '@/components/goalSetting/mboManagement/business/MboMngRegistPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import DepartmentMultiPopup from '@/components/common/business/DepartmentMultiPopup';
// import DepartmentSinglePopup from '@/components/common/business/DepartmentSinglePopup';
export default {
  name: 'MboMngPopupForm',
  mixins: [mboManagementStore, commonStore],
  components: {
    MboMngRegistPopup,
    DepartmentMultiPopup,
    ComSrchDeptPopup,
    // DepartmentSinglePopup,
  },
  data() {
    return {};
  },
  computed: {
    getMboMngRegistPopup: {
      set(value) {
        this[mboManagementTypes.actions.INIT_VIEWS_MBO_REGIST_POPUP](value);
      },

      get() {
        return this[mboManagementTypes.getters.GET_VIEWS_MBO_REGIST_POPUP];
      },
    },

    //* 공동사용자 추가 팝업(멀티)
    openDepartMultiPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_MULTI_POP];
      },
    },
    //* 공동사용자 추가 팝업(싱글)
    openDepartSinglePop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },

    //* 부서 검색 팝업
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
  },
  methods: {},
};
</script>
