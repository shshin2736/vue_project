<template>
  <div>
    <!-- KPI 검색 팝업 -->
    <kpi-search-popup v-model="isKpiSearchPopup"></kpi-search-popup>
    <!-- 과제 검색 팝업 -->
    <assignment-search-popup
      v-model="isAssignmentSearchPopup"
    ></assignment-search-popup>
    <!-- 부서 검색 팝업 -->
    <com-srch-dept-popup
      v-model="isComDeptSrchPopup"
      :isBuRange="true"
    ></com-srch-dept-popup>
    <!-- 담당자 검색 팝업 -->
    <manager-search-popup v-model="isManagerSearchPopup"></manager-search-popup>
    <!-- 파일 업로드 팝업 -->
    <excel-upload-popup v-model="isExcelUploadPopup"></excel-upload-popup>
    <!-- 공통 kpi 리스트 팝업 -->
    <kpi-pool-popup v-model="openCmmKpiPoolPop"></kpi-pool-popup>
  </div>
</template>

<script>
import * as commonTypes from '@/store/modules/common/types';
import kpiPoolPopup from '@/components/common/business/KpiPoolListPopup';
import KpiSearchPopup from '@/components/goalSetting/strategyEstabilshment/business/KpiSearchPopup';
import AssignmentSearchPopup from '@/components/common/business/AssignmentSearchPopup';
import ManagerSearchPopup from '@/components/goalSetting/strategyEstabilshment/business/ManagerSearchPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import ExcelUploadPopup from '@/components/goalSetting/strategyEstabilshment/business/ExcelUploadPopup';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';

export default {
  name: 'StrategyEstabilshmentPopupForm',
  components: {
    KpiSearchPopup,
    AssignmentSearchPopup,
    ManagerSearchPopup,
    ComSrchDeptPopup,
    ExcelUploadPopup,
    kpiPoolPopup,
  },
  mixins: [strategyEstabilshmentStore, commonStore],
  computed: {
    //* KPI 검색 팝업 ON/OFF
    isKpiSearchPopup: {
      set(value) {
        this[strategyEstabilshmentTypes.actions.INIT_VIEWS_KPI_SEARCH_POPUP](
          value,
        );
      },
      get() {
        return this[
          strategyEstabilshmentTypes.getters.GET_VIEWS_KPI_SEARCH_POPUP
        ];
      },
    },
    //* 과제 검색 팝업 ON/OFF
    isAssignmentSearchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_ASSIGNMENT_SEARCH_POPUP];
      },
    },
    //* 부서 검색 팝업 ON/OFF
    //* 사용자 부서설정 팝업 ON/OFF
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
    //* 담당자 검색 팝업 ON/OFF
    isManagerSearchPopup: {
      set(value) {
        this[
          strategyEstabilshmentTypes.actions.INIT_VIEWS_MANAGER_SEARCH_POPUP
        ](value);
      },
      get() {
        return this[
          strategyEstabilshmentTypes.getters.GET_VIEWS_MANAGER_SEARCH_POPUP
        ];
      },
    },
    //* 파일 업로드 팝업 ON/OFF
    isExcelUploadPopup: {
      set(value) {
        this[strategyEstabilshmentTypes.actions.INIT_VIEWS_FILES_UPLOAD_POPUP](
          value,
        );
      },
      get() {
        return this[
          strategyEstabilshmentTypes.getters.GET_VIEWS_FILES_UPLOAD_POPUP
        ];
      },
    },
    //*공통 KPI리스트 팝업
    openCmmKpiPoolPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_POOL_POP];
      },
    },
  },
};
</script>
