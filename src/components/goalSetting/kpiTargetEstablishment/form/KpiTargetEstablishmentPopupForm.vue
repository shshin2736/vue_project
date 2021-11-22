<template>
  <div>
    <!-- 하위 KPI 팝업 영역 -->
    <kpi-child-popup v-model="openChildPop"></kpi-child-popup>
    <!--공통KPI 리스트 팝업-->
    <kpi-pool-popup v-model="openCmmKpiPoolPop"></kpi-pool-popup>
    <!-- 단순하위 KPI 팝업 영역 -->
    <kpi-simple-child-popup
      v-model="openSimpleChildPop"
    ></kpi-simple-child-popup>
    <!-- 목표 등록 팝업 영역 -->
    <kpi-regist-goal-popup v-model="openRegGoalPop"></kpi-regist-goal-popup>
    <!-- 전체 KPI 목록 팝업 영역 -->
    <kpi-pool-list-popup v-model="openKpiPoolListPop"> </kpi-pool-list-popup>
    <!-- 신규 KPI 등록 팝업-->
    <kpi-regist-popup v-model="openKpiRegistPop"> </kpi-regist-popup>
    <!-- KPI 수정 팝업-->
    <kpi-update-popup v-model="openKpiUpdatePop"> </kpi-update-popup>
    <!-- 전체 BSC 목록 팝업 영역 -->
    <bsc-pool-list-popup v-model="openBscPoolListPop"> </bsc-pool-list-popup>
    <!-- 하위 KPI연결 전체 KPI 목록 팝업 영역 -->
    <child-kpi-pool-list-popup
      v-model="openChildKpiPoolListPop"
    ></child-kpi-pool-list-popup>
    <!-- 속성그룹찾기 팝업 -->
    <kpi-search-def-group-popup
      v-model="openKpiDefGroupPop"
    ></kpi-search-def-group-popup>
    <!-- 맞춤속성찾기 팝업 -->
    <kpi-custom-def-popup v-model="openCustomDefPop"></kpi-custom-def-popup>
    <!-- 기존 KPI로 찾기 팝업 -->
    <kpi-existing-def-popup v-model="openExistDefPop"></kpi-existing-def-popup>
    <!-- 담당자/담당부서 추가 파업 -->
    <!-- <department-single-popup
      v-model="openDepartSinglePop"
    ></department-single-popup> -->
    <!-- 공동사용자 추가 팝업 -->
    <department-multi-popup
      v-model="openDepartMultiPop"
    ></department-multi-popup>
    <!-- 부서트리 팝업 -->
    <com-srch-dept-popup v-model="openComDeptSrchPopup"></com-srch-dept-popup>
    <!-- 월/주간 실적입력 팝업 -->
    <kpi-perform-popup v-model="openKpiPerformPop"></kpi-perform-popup>
  </div>
</template>
<script>
import {
  kpiTargetEstablishmentStore,
  commonStore,
  kpiPerformanceStore,
} from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as commonTypes from '@/store/modules/common/types';
import KpiChildPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiChildPopup';
import KpiSimpleChildPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiSimpleChildPopup';
import kpiRegistGoalPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiRegistGoalPopup';
import KpiPoolListPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiPoolListPopup';
//import KpiPoolListPopup from '@/components/common/business/KpiPoolListPopup';
import ChildKpiPoolListPopup from '@/components/goalSetting/kpiTargetEstablishment/business/ChildKpiPoolListPopup';
import BscPoolListPopup from '@/components/goalSetting/kpiTargetEstablishment/business/BscPoolListPopup';
import KpiRegistPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiRegistPopup';
import KpiUpdatePopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiUpdatePopup';
import KpiSearchDefGroupPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiSearchDefGroupPopup';
import KpiCustomDefPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiCustomDefPopup';
import KpiExistingDefPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiExistingDefPopup';
import DepartmentMultiPopup from '@/components/common/business/DepartmentMultiPopup';
import kpiPoolPopup from '@/components/common/business/KpiPoolListPopup';
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import KpiPerformPopup from '@/components/businessExecution/kpiPerformance/business/KpiPerformPopup.vue';
export default {
  name: 'KpiTargetEstablishmentPopupForm',
  mixins: [kpiTargetEstablishmentStore, commonStore, kpiPerformanceStore],
  components: {
    KpiChildPopup,
    KpiSimpleChildPopup,
    kpiRegistGoalPopup,
    KpiPoolListPopup,
    ChildKpiPoolListPopup,
    BscPoolListPopup,
    KpiRegistPopup,
    KpiUpdatePopup,
    KpiSearchDefGroupPopup,
    KpiCustomDefPopup,
    KpiExistingDefPopup,
    DepartmentMultiPopup,
    // DepartmentSinglePopup,
    ComSrchDeptPopup,
    kpiPoolPopup,
    KpiPerformPopup,
  },
  computed: {
    //* 하위 KPI 팝업 ON/OFF
    openChildPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_CHILD_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_CHILD_POP
        ];
      },
    },
    //* 단순하위 KPI 팝업 ON/OFF
    openSimpleChildPop: {
      set(value) {
        this[
          kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_SIMPLE_CHILD_POP
        ](value);
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_SIMPLE_CHILD_POP
        ];
      },
    },
    //* 목표등록 팝업 ON/OFF
    openRegGoalPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_REG_GOAL_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_REG_GOAL_POP
        ];
      },
    },
    //* KPI 전체목록 팝업 ON/OFF
    openKpiPoolListPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_POOL_LIST_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_POOL_LIST_POP
        ];
      },
    },
    //* BSC 전체목록 팝업 ON/OFF
    openBscPoolListPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_BSC_POOL_POP](
          value,
        );
      },
      get() {
        return this[kpiTargetEstablishmentTypes.getters.GET_VIEWS_BSC_POOL_POP];
      },
    },
    //* 신규 KPI 등록 팝업 ON/OFF
    openKpiRegistPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_REGIST_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_REGIST_POP
        ];
      },
    },
    //* KPI 수정 팝업 ON/OFF
    openKpiUpdatePop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_UPDATE_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_KPI_UPDATE_POP
        ];
      },
    },
    //* KPI속성그룹팝업 ON/OFF
    openKpiDefGroupPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_DEF_GROUP_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_DEF_GROUP_POP
        ];
      },
    },
    //* 맞춤속성찾기 팝업 ON/OFF
    openCustomDefPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CUSTOM_DEF_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_CUSTOM_DEF_POP
        ];
      },
    },
    //* 기존 KPI로 찾기팝업 ON/OFF
    openExistDefPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_EXIST_DEF_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_EXIST_DEF_POP
        ];
      },
    },
    //* 담당부서/담당자 추가 팝업
    openDepartSinglePop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
    //* 공동사용자 추가 팝업
    openDepartMultiPop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_MULTI_POP];
      },
    },
    //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF
    openChildKpiPoolListPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CHILD_KPI_POOL_POP](
          value,
        );
      },
      get() {
        return this[
          kpiTargetEstablishmentTypes.getters.GET_VIEWS_CHILD_KPI_POOL_POP
        ];
      },
    },
    //* 부서트리 검색 팝업
    openComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
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
    //* 실적등록팝업 ON/OFF
    openKpiPerformPop: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REG_PERFORM_POP](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_KPI_REG_PERFORM_POP];
      },
    },
  },
};
</script>
