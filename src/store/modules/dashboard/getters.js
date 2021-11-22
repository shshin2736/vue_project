import { getters } from './types';

export default {
  //*대시보드 KPI목록 팝업 ON/OFF 설정
  [getters.GET_VIEWS_DASHBOARD_KPI_POPUP](state) {
    return state.views.dashboardKpi;
  },
  //* 슬라이더 현재 페이지번호 세팅 (KPI 현황)
  [getters.GET_CURRENT_SLIDE_NO_KPI](state) {
    return state.currentSlideNoKpi;
  },
  //* 슬라이더 현재 페이지번호 세팅 (팀게시판)
  [getters.GET_CURRENT_SLIDE_NO_BOARD](state) {
    return state.currentSlideNoBoard;
  },
  //* KPI팝업 리스트 가져오기
  [getters.GET_DASHBOARD_KPI_LIST](state) {
    return state.kpiList;
  },
  //* 팀게시판 리스트 가져오기
  [getters.GET_DASHBOARD_BOARD_LIST](state) {
    return state.boardList;
  },
  //* 업무관리 리스트 가져오기(년간)
  [getters.GET_DASHBOARD_REASON_MANAGE_YEAR_LIST](state) {
    return state.yearMeasureList;
  },
  //* 업무관리 리스트 가져오기(주간)
  [getters.GET_DASHBOARD_REASON_MANAGE_WEEK_LIST](state) {
    return state.weekMeasureList;
  },
  //* 프로젝트관리 리스트 세팅(총과제)
  [getters.GET_DASHBOARD_PROJECT_MANAGE_ALL_LIST](state) {
    return state.allPrjList;
  },
  //* 프로젝트관리 리스트 세팅(전문과제)
  [getters.GET_DASHBOARD_PROJECT_MANAGE_SP_LIST](state) {
    return state.specializedPrjList;
  },
  //* 프로젝트관리 리스트 세팅(일반과제)
  [getters.GET_DASHBOARD_PROJECT_MANAGE_GL_LIST](state) {
    return state.generalPrjList;
  },
  //* 프로젝트관리 리스트 세팅(즉실천)
  [getters.GET_DASHBOARD_PROJECT_MANAGE_IN_LIST](state) {
    return state.imActionPrjList;
  },
  //* KPI 체계도 리스트 세팅
  [getters.GET_DASHBOARD_KPI_TREE_LIST](state) {
    return state.kpiTreeList;
  },
  //* 지표 그래프 그룹 목록
  [getters.GET_DSB_CHART_GRP_LIST](state) {
    return state.chartGrp;
  },
  //* 팀성과 관리 하위부서 가져오기
  [getters.GET_DASHBOARD_LOW_DEPT_INFO_LIST](state) {
    return state.lowDeptList;
  }, //* KPI 리스트 가져오기
  [getters.GET_KPI_CURRENT_LIST](state) {
    return state.kpiCurrentList;
  },
  //* 일자별 KPI 리스트 가져오기
  [getters.GET_DSBD_KPI_REASON_LIST](state) {
    return state.kpiReasonList;
  },
  //* 일자별 KPI 리스트 팝업 ON/OFF
  [getters.GET_VIEWS_DSBD_KPI_REASON_POPOUP](state) {
    return state.views.kpiReason;
  },
  //* 업무관리 선택 일자 저장
  [getters.GET_DSBD_DATE_PARAM](state) {
    return state.kpiDate;
  },
};
