<template>
  <span>
    <com-tab-bar
      v-model="getTab"
      @onTab="clickTabBar"
      @deleteTab="deleteTabBar"
    ></com-tab-bar>
    <template v-for="item in items">
      <kpi-reason-form
        :key="item.id"
        v-show="item.current"
        :selectedYear="item.selectedYear"
        :selectedMonth="item.selectedMonth"
        :data="item.data"
        @list="clickKpiListTab"
      ></kpi-reason-form>
    </template>
  </span>
</template>

<script>
import ComTabBar from '@/components/common/global/ComTabBar';
import { kpiPerformanceStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import KpiReasonForm from '@/components/businessExecution/kpiPerformance/form/KpiReasonForm.vue';

export default {
  name: 'KpiPerformTabForm',
  mixins: [kpiPerformanceStore, commonStore],
  components: {
    ComTabBar,
    KpiReasonForm,
  },
  data: function() {
    return {
      searchUserId: '',
      items: [],
    };
  },
  computed: {
    getTab: {
      set(value) {
        this[kpiPerformanceTypes.actions.UPDATE_TAB_LIST](value);
      },
      get(state) {
        const items = this[kpiPerformanceTypes.getters.GET_TAB_LIST];
        state.items = Object.values(items.children);
        return items;
      },
    },
    getWwSeq() {
      return this[kpiPerformanceTypes.getters.GET_WWSEQ_PARAM];
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getSelectedManagerId() {
      return this[kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID];
    },
  },
  mounted() {
    let tabData = {
      id: '0',
      title: this.$t('NLS0001114'), //*KPI 체계도->KPI 실적관리
      current: true,
      children: [],
    };
    this.getTab = tabData;
  },
  methods: {
    clickTabBar(id, title) {
      if (id === '0') {
        //*kpi실적 탭 클릭
        this.showKpiContentFunc();
      } else {
        this.showReasonContentFunc(id, title);
      }
    },
    deleteTabBar() {
      //
      let tab = { ...this.getTab };
      if (tab.children !== undefined && tab.children.length > 0) {
        let tabData = tab.children[tab.children.length - 1];
        this.showReasonContentFunc(tabData.id, tabData.title);
        tab.current = false;
        tab.children.map(el => {
          if (el.current === true) el.current = false;
          if (el.id === tabData.id) el.current = true;
        });
        this.getTab = { ...tab };
      } else {
        this.showKpiContentFunc();
      }
    },
    showKpiContentFunc() {
      //* kpi 실적 오픈
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        searchUserId: this.getSelectedManagerId,
        wwSeq: this.getWwSeq,
      };
      this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](true);
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](false);
    },
    showReasonContentFunc(id, title) {
      //* 성공사유리스트 오픈
      // const param = {
      //   baseYyyymm: this.getSelectedYear + this.getSelectedMonth,
      //   kpiId: id,
      // };
      // this[kpiPerformanceTypes.actions.INIT_SELECTED_KPI_DATA]({
      //   kpiId: id,
      //   kpiNm: title,
      //   kpiDeptId: deptIdVal || '',
      //   kpiUserId: userIdVal || '',
      //   selectedYyyy: this.getSelectedYear,
      //   selectedMm: this.getSelectedMonth,
      // });
      // this[kpiPerformanceTypes.actions.INIT_KPI_REASON_MEASURE_LIST]({});
      // this[kpiPerformanceTypes.actions.FETCH_KPI_REASON_MEASURE_LIST](param);

      let filterData = this.getTab.children.filter(el => el.id === id);
      let deptIdVal = '';
      let userIdVal = '';
      if (filterData.length > 0) {
        deptIdVal = filterData[0].kpiDeptId;
        userIdVal = filterData[0].kpiUserId;
      }
      this[kpiPerformanceTypes.actions.INIT_SELECTED_KPI_DATA]({
        kpiId: id,
        kpiNm: title,
        kpiDeptId: deptIdVal || '',
        kpiUserId: userIdVal || '',
        selectedYyyy: this.getSelectedYear,
        selectedMm: this.getSelectedMonth,
      });
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](false);
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](true);
    },
    clickKpiListTab() {
      //*kpi실적관리 탭 클릭
      let listTab = document.getElementsByClassName('tab__main')[0];
      listTab.click();
    },
  },
};
</script>
