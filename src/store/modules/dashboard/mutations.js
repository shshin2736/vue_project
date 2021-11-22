import { mutations } from './types';

export default {
  //*대시보드 KPI목록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_DASHBOARD_KPI_POPUP](state, payload) {
    state.views.dashboardKpi = payload;
  },
  //* 슬라이더 현재 페이지번호 세팅 (KPI 현황)
  [mutations.SET_CURRENT_SLIDE_NO_KPI](state, payload) {
    state.currentSlideNoKpi = payload;
  },
  //* 슬라이더 현재 페이지번호 세팅 (팀게시판)
  [mutations.SET_CURRENT_SLIDE_NO_BOARD](state, payload) {
    state.currentSlideNoBoard = payload;
  },
  //* KPI팝업 리스트 세팅
  [mutations.SET_DASHBOARD_KPI_LIST](state, payload) {
    state.kpiList = payload;
  },
  //* 팀게시판 리스트 세팅
  [mutations.SET_DASHBOARD_BOARD_LIST](state, payload) {
    state.boardList = payload;
  },
  //* 업무관리 리스트 세팅(년간)
  [mutations.SET_DASHBOARD_REASON_MANAGE_YEAR_LIST](state, payload) {
    state.yearMeasureList = payload;
  },
  //* 업무관리 리스트 세팅(주간)
  [mutations.SET_DASHBOARD_REASON_MANAGE_WEEK_LIST](state, payload) {
    state.weekMeasureList = payload;
  },
  //* 프로젝트관리 리스트 세팅(총과제)
  [mutations.SET_DASHBOARD_PROJECT_MANAGE_ALL_LIST](state, payload) {
    state.allPrjList = payload;
  },
  //* 프로젝트관리 리스트 세팅(전문과제)
  [mutations.SET_DASHBOARD_PROJECT_MANAGE_SP_LIST](state, payload) {
    state.specializedPrjList = payload;
  },
  //* 프로젝트관리 리스트 세팅(일반과제)
  [mutations.SET_DASHBOARD_PROJECT_MANAGE_GL_LIST](state, payload) {
    state.generalPrjList = payload;
  },
  //* 프로젝트관리 리스트 세팅(즉실천)
  [mutations.SET_DASHBOARD_PROJECT_MANAGE_IN_LIST](state, payload) {
    state.imActionPrjList = payload;
  },
  //* KPI 체계도 리스트 세팅
  [mutations.SET_DASHBOARD_KPI_TREE_LIST](state, payload) {
    state.kpiTreeList = payload;
  },
  //* 지표 그래프 그룹 목록
  [mutations.SET_DSB_CHART_GRP_LIST](state, payload) {
    state.chartGrp = payload;
  },
  //* 팀성과 관리 하위부서 세팅
  [mutations.SET_DASHBOARD_LOW_DEPT_INFO_LIST](state, payload) {
    state.lowDeptList = payload;
  },
  //* KPI 리스트 저장
  [mutations.SET_KPI_CURRENT_LIST](state, payload) {
    state.kpiCurrentList = payload;
  },
  //* 일자별 KPI 리스트 가져오기
  [mutations.SET_DSBD_KPI_REASON_LIST](state, payload) {
    state.kpiReasonList = payload;
  },
  //* 일자별 KPI 리스트 팝업 ON/OFF
  [mutations.SET_VIEWS_DSBD_KPI_REASON_POPOUP](state, payload) {
    state.views.kpiReason = payload;
  },
  //* 업무관리 선택 일자 저장
  [mutations.SET_DSBD_DATE_PARAM](state, payload) {
    state.kpiDate = payload;
  },
};
