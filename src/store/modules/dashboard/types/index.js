export const getters = {
  // TODO: GET CONSTANT DECLARATION
  GET_VIEWS_DASHBOARD_KPI_POPUP: 'GET_VIEWS_DASHBOARD_KPI_POPUP', //*대시보드 KPI목록 팝업 ON/OFF 설정 가져오기
  GET_VIEWS_DSBD_KPI_REASON_POPOUP: 'GET_VIEWS_DSBD_KPI_REASON_POPOUP', //* 일자별 KPI 목록 팝업 ON/OFF

  GET_CURRENT_SLIDE_NO_KPI: 'GET_CURRENT_SLIDE_NO_KPI', //* 슬라이더 현재 페이지번호 가져오기(KPI 현황)
  GET_CURRENT_SLIDE_NO_BOARD: 'GET_CURRENT_SLIDE_NO_BOARD', //* 슬라이더 현재 페이지번호 가져오기(팀게시판)
  GET_DASHBOARD_KPI_LIST: 'GET_DASHBOARD_KPI_LIST', //* KPI팝업 리스트 가져오기
  GET_DASHBOARD_BOARD_LIST: 'GET_DASHBOARD_BOARD_LIST', //* 팀게시판 리스트 가져오기
  GET_DASHBOARD_REASON_MANAGE_YEAR_LIST:
    'GET_DASHBOARD_REASON_MANAGE_YEAR_LIST', //* 업무관리 리스트 가져오기(년간)
  GET_DASHBOARD_REASON_MANAGE_WEEK_LIST:
    'GET_DASHBOARD_REASON_MANAGE_WEEK_LIST', //* 업무관리 리스트 가져오기(주간)
  GET_DASHBOARD_PROJECT_MANAGE_ALL_LIST:
    'GET_DASHBOARD_PROJECT_MANAGE_ALL_LIST', //* 프로젝트관리 리스트 세팅(총과제)
  GET_DASHBOARD_PROJECT_MANAGE_SP_LIST: 'GET_DASHBOARD_PROJECT_MANAGE_SP_LIST', //* 프로젝트관리 리스트 세팅(전문과제)
  GET_DASHBOARD_PROJECT_MANAGE_GL_LIST: 'GET_DASHBOARD_PROJECT_MANAGE_GL_LIST', //* 프로젝트관리 리스트 세팅(일반과제)
  GET_DASHBOARD_PROJECT_MANAGE_IN_LIST: 'GET_DASHBOARD_PROJECT_MANAGE_IN_LIST', //* 프로젝트관리 리스트 세팅(즉실천)
  GET_DASHBOARD_KPI_TREE_LIST: 'GET_DASHBOARD_KPI_TREE_LIST', //* KPI 체계도 리스트 조회
  GET_DSB_CHART_GRP_LIST: 'GET_DSB_CHART_GRP_LIST', //* 차트그룹 가져오기
  GET_DASHBOARD_LOW_DEPT_INFO_LIST: 'GET_DASHBOARD_LOW_DEPT_INFO_LIST', //* 팀성과 관리 하위부서 가져오기
  GET_KPI_CURRENT_LIST: 'GET_KPI_CURRENT_LIST', //* KPI 리스트 가져오기
  GET_DSBD_KPI_REASON_LIST: 'GET_DSBD_KPI_REASON_LIST', //* 일자별 KPI 목록 가져오기
  GET_DSBD_DATE_PARAM: 'GET_DSBD_DATE_PARAM', //* 업무관리 선택 일자 저장
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_DASHBOARD_KPI_LIST: 'FETCH_DASHBOARD_KPI_LIST', //* KPI팝업 리스트 가져오기
  FETCH_DASHBOARD_BOARD_LIST: 'FETCH_DASHBOARD_BOARD_LIST', //* 팀게시판 리스트 가져오기
  FETCH_DASHBOARD_REASON_MANAGE_LIST: 'FETCH_DASHBOARD_REASON_MANAGE_LIST', //* 업무관리 리스트 가져오기
  FETCH_DASHBOARD_PROJECT_MANAGE_LIST: 'FETCH_DASHBOARD_PROJECT_MANAGE_LIST', //* 프로젝트관리 리스트 가져오기
  FETCH_DASHBOARD_KPI_TREE_LIST: 'FETCH_DASHBOARD_KPI_TREE_LIST', //* KPI 체계도 리스트 조회
  FETCH_DSB_CHART_GRP_LIST: 'FETCH_DSB_CHART_GRP_LIST', //* 대시보드 차트그룹 조회
  FETCH_DASHBOARD_LOW_DEPT_INFO_LIST: 'FETCH_DASHBOARD_LOW_DEPT_INFO_LIST', //* 팀성과 관리 하위부서 가져오기
  FETCH_KPI_CURRENT_LIST: 'FETCH_KPI_CURRENT_LIST', //* KPI 리스트 가져오기
  FETCH_DSBD_KPI_REASON_LIST: 'FETCH_DSBD_KPI_REASON_LIST', //* 일자별 KPI 목록 가져오기
  // TODO: INSERT CONSTANT DECLARATION
  // TODO: UPDATE CONSTANT DECLARATION

  UPDATE_DASHBOARD_CHART_GRP: 'UPDATE_DASHBOARD_CHART_GRP', //* 차트그룹 사용자 대시보드여부 업데이트
  UPDATE_DSB_CHART_GRP_LIST: 'UPDATE_DSB_CHART_GRP_LIST', //* 대시보드 차트그룹 업데이트

  // TODO: DELETE CONSTANT DECLARATION
  // TODO: INIT CONSTANT DECLARATION
  INIT_VIEWS_DASHBOARD_KPI_POPUP: 'INIT_VIEWS_DASHBOARD_KPI_POPUP', //*대시보드 KPI목록 팝업 ON/OFF 설정
  INIT_VIEWS_DSBD_KPI_REASON_POPOUP: 'INIT_VIEWS_DSBD_KPI_REASON_POPOUP', //* 일자별 KPI 목록 팝업 ON/OFF

  INIT_CURRENT_SLIDE_NO_KPI: 'INIT_CURRENT_SLIDE_NO_KPI', //* 슬라이더 현재 페이지번호 세팅(KPI 현황)
  INIT_CURRENT_SLIDE_NO_BOARD: 'INIT_CURRENT_SLIDE_NO_BOARD', //* 슬라이더 현재 페이지번호 세팅(팀게시판)
  INIT_DSBD_DATE_PARAM: 'INIT_DSBD_DATE_PARAM', //* 업무관리 선택 일자 저장
};

//* MUTATIONS CONSTANT
export const mutations = {
  // TODO: SET CONSTANT DECLARATION
  SET_VIEWS_DASHBOARD_KPI_POPUP: 'SET_VIEWS_DASHBOARD_KPI_POPUP', //*대시보드 KPI목록 팝업 ON/OFF 설정
  SET_VIEWS_DSBD_KPI_REASON_POPOUP: 'SET_VIEWS_DSBD_KPI_REASON_POPOUP', //* 일자별 KPI 목록 팝업 ON/OFF

  SET_CURRENT_SLIDE_NO_KPI: 'SET_CURRENT_SLIDE_NO_KPI', //* 슬라이더 현재 페이지번호 세팅(KPI 현황)
  SET_CURRENT_SLIDE_NO_BOARD: 'SET_CURRENT_SLIDE_NO_BOARD', //* 슬라이더 현재 페이지번호 세팅(팀게시판)
  SET_DASHBOARD_KPI_LIST: 'SET_DASHBOARD_KPI_LIST', //* KPI팝업 리스트 세팅
  SET_DASHBOARD_BOARD_LIST: 'SET_DASHBOARD_BOARD_LIST', //* 팀게시판 리스트 세팅
  SET_DASHBOARD_REASON_MANAGE_YEAR_LIST:
    'SET_DASHBOARD_REASON_MANAGE_YEAR_LIST', //* 업무관리 리스트 세팅(년간)
  SET_DASHBOARD_REASON_MANAGE_WEEK_LIST:
    'SET_DASHBOARD_REASON_MANAGE_WEEK_LIST', //* 업무관리 리스트 세팅(주간)
  SET_DASHBOARD_PROJECT_MANAGE_ALL_LIST:
    'SET_DASHBOARD_PROJECT_MANAGE_ALL_LIST', //* 프로젝트관리 리스트 세팅(총과제)
  SET_DASHBOARD_PROJECT_MANAGE_SP_LIST: 'SET_DASHBOARD_PROJECT_MANAGE_SP_LIST', //* 프로젝트관리 리스트 세팅(전문과제)
  SET_DASHBOARD_PROJECT_MANAGE_GL_LIST: 'SET_DASHBOARD_PROJECT_MANAGE_GL_LIST', //* 프로젝트관리 리스트 세팅(일반과제)
  SET_DASHBOARD_PROJECT_MANAGE_IN_LIST: 'SET_DASHBOARD_PROJECT_MANAGE_IN_LIST', //* 프로젝트관리 리스트 세팅(즉실천)
  SET_DASHBOARD_KPI_TREE_LIST: 'SET_DASHBOARD_KPI_TREE_LIST', //* KPI 체계도 리스트 세팅
  SET_DSB_CHART_GRP_LIST: 'SET_DSB_CHART_GRP_LIST', //* 대시보드 차트그룹 저장
  SET_DASHBOARD_LOW_DEPT_INFO_LIST: 'SET_DASHBOARD_LOW_DEPT_INFO_LIST', //* 팀성과 관리 하위부서 세팅
  SET_KPI_CURRENT_LIST: 'SET_KPI_CURRENT_LIST', //* KPI 리스트 가져오기
  SET_DSBD_KPI_REASON_LIST: 'SET_DSBD_KPI_REASON_LIST', //* 일자별 KPI 목록 가져오기
  SET_DSBD_DATE_PARAM: 'SET_DSBD_DATE_PARAM', //* 업무관리 선택 일자 저장
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `dashboard/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `dashboard/${cur[1]}`;
    return acc;
  }, {}),
};
