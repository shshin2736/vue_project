import { mutations } from './types';

export default {
  [mutations.SET_TOV_LIST](state, payload) {
    state.tovList = payload;
  },
  [mutations.SET_VIEWS_ADD_KPI_POPUP](state, payload) {
    state.viewKpi = payload;
  },
  [mutations.SET_VIEWS_ADD_ASSIGNMENT_POPUP](state, payload) {
    state.viewAssignment = payload;
  },
  [mutations.SET_TAKE_TAB](state, payload) {
    state.takeTab = payload;
  },
  [mutations.SET_OVER_TAB](state, payload) {
    state.overTab = payload;
  },
  [mutations.SET_TAKE_KPI_LIST](state, payload) {
    state.takeKpiList = payload;
  },
  [mutations.SET_TAKE_PRJ_LIST](state, payload) {
    state.takePrjList = payload;
  },
  [mutations.SET_SRCH_KPI_LIST](state, payload) {
    state.srchKpiList = payload;
  },
  [mutations.SET_SRCH_PRJ_LIST](state, payload) {
    state.srchPrjList = payload;
  },
  [mutations.SET_OVER_KPI_LIST](state, payload) {
    state.overKpiList = payload;
  },
  [mutations.SET_OVER_PRJ_LIST](state, payload) {
    state.overPrjList = payload;
  },
  [mutations.SET_MY_KPI_TREE](state, payload) {
    state.myKpiTree = payload;
  },
  [mutations.SET_MY_PRJ_LIST](state, payload) {
    state.myPrjList = payload;
  },
  [mutations.SET_PARAM](state, payload) {
    state.param = payload;
  },
  [mutations.SET_TOTCNT](state, payload) {
    state.totcnt = payload;
  },
  [mutations.SET_SRCH_KPI_COLUMNS](state, payload) {
    state.srchKpiColumns = payload;
  },
  [mutations.SET_SRCH_PRJ_COLUMNS](state, payload) {
    state.srchPrjColumns = payload;
  },
  [mutations.SET_TAKE_COLUMNS](state, payload) {
    state.takeColumns = payload;
  },
  [mutations.SET_OVER_COLUMNS](state, payload) {
    state.overColumns = payload;
  },
  [mutations.SET_KPI_SYSTEM_CHART](state, payload) {
    state.kpiSystemChart = payload;
  },
  [mutations.SET_TEMP_TREE](state, payload) {
    state.tempTree = payload;
  },
  [mutations.SET_TID](state, payload) {
    state.tid = payload;
  },
};
