import { getters } from './types';

export default {
  [getters.GET_TOV_LIST](state) {
    return state.tovList;
  },
  [getters.GET_VIEWS_ADD_KPI_POPUP](state) {
    return state.viewKpi;
  },
  [getters.GET_VIEWS_ADD_ASSIGNMENT_POPUP](state) {
    return state.viewAssignment;
  },
  [getters.GET_TAKE_TAB](state) {
    return state.takeTab;
  },
  [getters.GET_OVER_TAB](state) {
    return state.overTab;
  },
  [getters.GET_TAKE_KPI_LIST](state) {
    return state.takeKpiList;
  },
  [getters.GET_TAKE_PRJ_LIST](state) {
    return state.takePrjList;
  },
  [getters.GET_SRCH_KPI_LIST](state) {
    return state.srchKpiList;
  },
  [getters.GET_SRCH_PRJ_LIST](state) {
    return state.srchPrjList;
  },
  [getters.GET_OVER_KPI_LIST](state) {
    return state.overKpiList;
  },
  [getters.GET_OVER_PRJ_LIST](state) {
    return state.overPrjList;
  },
  [getters.GET_MY_KPI_TREE](state) {
    return state.myKpiTree;
  },
  [getters.GET_MY_PRJ_LIST](state) {
    return state.myPrjList;
  },
  [getters.GET_PARAM](state) {
    return state.param;
  },
  [getters.GET_TOTCNT](state) {
    return state.totcnt;
  },
  [getters.GET_SRCH_KPI_COLUMNS](state) {
    return state.srchKpiColumns;
  },
  [getters.GET_SRCH_PRJ_COLUMNS](state) {
    return state.srchPrjColumns;
  },
  [getters.GET_TAKE_COLUMNS](state) {
    return state.takeColumns;
  },
  [getters.GET_OVER_COLUMNS](state) {
    return state.overColumns;
  },
  [getters.GET_KPI_SYSTEM_CHART](state) {
    return state.kpiSystemChart;
  },
  [getters.GET_TEMP_TREE](state) {
    return state.tempTree;
  },
  [getters.GET_TID](state) {
    return state.tid;
  },
};
