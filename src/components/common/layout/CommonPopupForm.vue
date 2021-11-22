<template>
  <div>
    <alert-modal v-model="alert"></alert-modal>
    <confirm-modal v-model="confirm"></confirm-modal>
    <my-page-popup-form v-model="myPage"></my-page-popup-form>
    <com-overlay v-model="kpiPerformance" :index="100" customClass="conference">
      <kpi-perform-report-page
        v-model="kpiPerformance"
      ></kpi-perform-report-page>
    </com-overlay>
  </div>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import MyPagePopupForm from '@/components/systemManagement/userManagement/form/MyPagePopupForm';
import KpiPerformReportPage from '@/views/businessExecution/kpiPerformance/KpiPerformReportPage';
import AlertModal from '@/components/common/business/AlertModal';
import ConfirmModal from '@/components/common/business/ConfirmModal';
import { commonStore, userManagementStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';

export default {
  name: 'CommonPopupForm',
  mixins: [commonStore, userManagementStore],
  components: {
    MyPagePopupForm,
    KpiPerformReportPage,
    AlertModal,
    ConfirmModal,
    ComOverlay,
  },
  computed: {
    myPage: {
      set(value) {
        this[userManagementTypes.actions.INIT_VIEWS_MY_PAGE_POPUP](value);
      },
      get() {
        return this[userManagementTypes.getters.GET_VIEWS_MY_PAGE_POPUP];
      },
    },
    kpiPerformance: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_KPI_PERFORMANCE](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_KPI_PERFORMANCE];
      },
    },
    alert: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_ALERT](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_ALERT];
      },
    },
    confirm: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_CONFIRM](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_CONFIRM];
      },
    },
  },
};
</script>
