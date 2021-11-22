<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- KPI 실적 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000449"
        tooltip="NLS0000725"
      ></com-page-title>
      <!-- 검색 영역 -->
      <kpi-perform-search-form></kpi-perform-search-form>
      <!-- KPI 실적 탭 영역 -->
      <kpi-perform-tab-form></kpi-perform-tab-form>
      <!-- KPI 실적 리스트 영역 -->
      <kpi-perform-list-form
        v-model="openKpiPerformList"
      ></kpi-perform-list-form>
      <!-- 성공/부진사유 리스트/입력 폼 -->
      <!-- <kpi-reason-form v-model="openKpiReasonList"></kpi-reason-form> -->
      <!-- 팝업 영역 -->
      <kpi-perform-popup-form></kpi-perform-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import { kpiPerformanceStore } from '@/mixins';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import KpiPerformListForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformListForm.vue';
import KpiPerformSearchForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformSearchForm.vue';
import KpiPerformTabForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformTabForm.vue';
import KpiPerformPopupForm from '@/components/businessExecution/kpiPerformance/form/KpiPerformPopupForm.vue';

export default {
  name: 'KpiPerformanceListPage',
  mixins: [kpiPerformanceStore],
  components: {
    KpiPerformListForm,
    KpiPerformSearchForm,
    KpiPerformTabForm,
    KpiPerformPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000470', link: '' }, //업무 실행
        {
          title: 'NLS0000449',
          link: 'KpiPerformanceListPage',
          params: this.$route.params,
        }, //KPI 실적],
      ],
    };
  },
  computed: {
    //* 실적리스트 영역 ON/OFF
    openKpiPerformList: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_KPI_PERFORM_LIST];
      },
    },
    //* 성공부진사유 리스트 영역 ON/OFF
    openKpiReasonList: {
      set(value) {
        this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](value);
      },
      get() {
        return this[kpiPerformanceTypes.getters.GET_VIEWS_KPI_REASON_LIST];
      },
    },
  },
};
</script>
