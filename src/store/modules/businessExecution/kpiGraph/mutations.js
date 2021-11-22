import { mutations } from './types';

export default {
  [mutations.SET_KPI_MONTH_LIST](state, payload) {
    state.kpiMonthList = payload;
  },
  [mutations.SET_KPI_MAIN_CHART](state, payload) {
    state.mainchart = payload;
  },
  [mutations.SET_VIEWS_CHART_DETAIL_POPUP](state, payload) {
    state.detailView = payload;
  },
  [mutations.SET_VIEWS_CREATE_CHART_POPUP](state, payload) {
    state.createView = payload;
  },
  [mutations.SET_CHART_GRP_LIST](state, payload) {
    state.grpList = payload;
  },
  [mutations.SET_CHART_KPI_LIST](state, payload) {
    state.kpiList = payload;
  },
  [mutations.SET_CHART_USER_LIST](state, payload) {
    state.userList = payload;
  },
  [mutations.SET_CHART_GRP_DETAIL](state, payload) {
    state.grpDetail = payload;
  },
  [mutations.SET_DSB_YN](state, payload) {
    state.dsbYn = payload;
  },
  [mutations.SET_GRP_DATA](state, payload) {
    state.grpData = payload;
  },
  [mutations.SET_RECENT_LIST](state, payload) {
    state.three = payload;
  },
  [mutations.SET_RECENT_KPI](state, payload) {
    state.threeKpi = payload;
  },
  [mutations.SET_RECENT_DATA](state, payload) {
    state.threeData = payload;
  },
  [mutations.SET_CHART_DATA](state, payload) {
    state.chartData = payload;
  },
  [mutations.SET_CHART_KPI](state, payload) {
    state.chartKpi = payload;
  },
  [mutations.SET_GRP_COLUMS](state, payload) {
    state.grpCol = payload;
  },
  [mutations.SET_KPI_COLUMS](state, payload) {
    state.kpiCol = payload;
  },
  [mutations.SET_USER_COLUMS](state, payload) {
    state.userCol = payload;
  },
};
