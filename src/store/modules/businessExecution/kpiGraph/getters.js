import { getters } from './types';

export default {
  [getters.GET_KPI_MONTH_LIST](state) {
    return state.kpiMonthList;
  },
  [getters.GET_KPI_MAIN_CHART](state) {
    return state.mainChart;
  },
  [getters.GET_VIEWS_CHART_DETAIL_POPUP](state) {
    return state.detailView;
  },
  [getters.GET_VIEWS_CREATE_CHART_POPUP](state) {
    return state.createView;
  },
  [getters.GET_CHART_GRP_LIST](state) {
    return state.grpList;
  },
  [getters.GET_CHART_KPI_LIST](state) {
    return state.kpiList;
  },
  [getters.GET_CHART_USER_LIST](state) {
    return state.userList;
  },
  [getters.GET_CHART_GRP_DETAIL](state) {
    return state.grpDetail;
  },
  [getters.GET_DSB_YN](state) {
    return state.dsbYn;
  },
  [getters.GET_GRP_DATA](state) {
    return state.grpData;
  },
  [getters.GET_RECENT_LIST](state) {
    return state.three;
  },
  [getters.GET_RECENT_KPI](state) {
    return state.threeKpi;
  },
  [getters.GET_RECENT_DATA](state) {
    return state.threeData;
  },
  [getters.GET_CHART_DATA](state) {
    return state.chartData;
  },
  [getters.GET_CHART_KPI](state) {
    return state.chartKpi;
  },
  [getters.GET_GRP_COLUMS](state) {
    return state.grpCol;
  },
  [getters.GET_KPI_COLUMS](state) {
    return state.kpiCol;
  },
  [getters.GET_USER_COLUMS](state) {
    return state.userCol;
  },
};
