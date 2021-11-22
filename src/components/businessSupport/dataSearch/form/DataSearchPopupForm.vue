<template>
  <div>
    <com-srch-dept-popup v-model="isComDeptSrchPopup"></com-srch-dept-popup>
    <single-user-popup v-model="isSrchUserPopup"></single-user-popup>
    <!-- KPI 수정 팝업 -->
    <kpi-update-popup v-model="openKpiUpdatePop"></kpi-update-popup>
  </div>
</template>

<script>
import ComSrchDeptPopup from '@/components/common/business/ComSrchDeptPopup';
import KpiUpdatePopup from '@/components/businessSupport/dataSearch/business/KpiUpdatePopup';
import singleUserPopup from '@/components/common/business/DepartmentSinglePopup';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'DataSearchPopupForm',
  components: {
    KpiUpdatePopup,
    singleUserPopup,
    ComSrchDeptPopup,
  },
  mixins: [kpiTargetEstablishmentStore, commonStore],
  computed: {
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
    isSrchUserPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
    //* 사용자 부서설정 팝업 ON/OFF
    isComDeptSrchPopup: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_COM_SRCH_DEPT_POPUP];
      },
    },
  },
};
</script>
