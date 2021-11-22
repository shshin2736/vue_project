export const getters = {
  //* 업무 인수인계 목록 가져오기
  GET_TOV_LIST: 'GET_TOV_LIST',
  //* 업무인계 TAB 상태 가져오기
  GET_TAKE_TAB: 'GET_TAKE_TAB',
  //* 업무인수 TAB 상태 가져오기
  GET_OVER_TAB: 'GET_OVER_TAB',
  //* 업무 인계 KPI 목록 가져오기
  GET_TAKE_KPI_LIST: 'GET_TAKE_KPI_LIST',
  //* 업무 인계 과제 목록 가져오기
  GET_TAKE_PRJ_LIST: 'GET_TAKE_PRJ_LIST',
  //* 업무 인계 추가할 KPI 목록 가져오기
  GET_SRCH_KPI_LIST: 'GET_SRCH_KPI_LIST',
  //* 업무 인계 추가할 과제 목록 가져오기
  GET_SRCH_PRJ_LIST: 'GET_SRCH_PRJ_LIST',
  //* 업무 인계 인수할 KPI 목록 가져오기
  GET_OVER_KPI_LIST: 'GET_OVER_KPI_LIST',
  //* 업무 인계 인수할 과제 목록 가져오기
  GET_OVER_PRJ_LIST: 'GET_OVER_PRJ_LIST',
  //* 업무 인계 나의 KPI 트리 가져오기
  GET_MY_KPI_TREE: 'GET_MY_KPI_TREE',
  //* 업무 인계 니의 과제 목록 가져오기
  GET_MY_PRJ_LIST: 'GET_MY_PRJ_LIST',
  //* 업무 인수인계 PARAMETER 가져오기
  GET_PARAM: 'GET_PARAM',
  //* 업무 인계 KPI, 과제 총 개수 가져오기
  GET_TOTCNT: 'GET_TOTCNT',
  //* 그리드 컬럼 설정
  GET_SRCH_PRJ_COLUMNS: 'GET_SRCH_PRJ_COLUMNS',
  GET_SRCH_KPI_COLUMNS: 'GET_SRCH_KPI_COLUMNS',
  GET_TAKE_COLUMNS: 'GET_TAKE_COLUMNS',
  GET_OVER_COLUMNS: 'GET_OVER_COLUMNS',
  GET_KPI_SYSTEM_CHART: 'GET_KPI_SYSTEM_CHART', //* KPI 체계도 가져오기
  GET_TEMP_TREE: 'GET_TEMP_TREE', //* 인계자 임시 체계도 가져오기
  GET_TREE_TKO_STATUS: 'GET_TREE_TKO_STATUS', //* 체계도 인수 확정
  GET_TID: 'GET_TID', //* TID 가져오기

  //* 인계 KPI 추가 팝업 ON/OFF 가져오기
  GET_VIEWS_ADD_KPI_POPUP: 'GET_VIEWS_ADD_KPI_POPUP',
  //* 인계 과제 추가 팝업 ON/OFF 가져오기
  GET_VIEWS_ADD_ASSIGNMENT_POPUP: 'GET_VIEWS_ADD_ASSIGNMENT_POPUP',
};

export const actions = {
  //* 업무 인수인계 목록 불러오기
  FETCH_TOV_LIST: 'FETCH_TOV_LIST',
  //* 업무 인계 KPI 목록 블러오기
  FETCH_TAKE_KPI_LIST: 'FETCH_TAKE_KPI_LIST',
  //* 업무 인계 과제 목록 블러오기
  FETCH_TAKE_PRJ_LIST: 'FETCH_TAKE_PRJ_LIST',
  //* 업무 인계 추가할 KPI 목록 불러오기
  FETCH_SRCH_KPI_LIST: 'FETCH_SRCH_KPI_LIST',
  //* 업무 인계 추가할 과제 목록 불러오기
  FETCH_SRCH_PRJ_LIST: 'FETCH_SRCH_PRJ_LIST',
  //* 업무 인수 인수할 KPI 목록 불러오기
  FETCH_OVER_KPI_LIST: 'FETCH_OVER_KPI_LIST',
  //* 업무 인수 인수할 과제 목록 불러오기
  FETCH_OVER_PRJ_LIST: 'FETCH_OVER_PRJ_LIST',
  //* 업무 인수 나의 KPI 트리 불러오기
  FETCH_MY_KPI_TREE: 'FETCH_MY_KPI_TREE',
  //* 업무 인수 나의 과제 목록 불러오기
  FETCH_MY_PRJ_LIST: 'FETCH_MY_PRJ_LIST',
  FETCH_KPI_SYSTEM_CHART: 'FETCH_KPI_SYSTEM_CHART', //* KPI 체계도 가져오기
  FETCH_TEMP_TREE: 'FETCH_TEMP_TREE', //* 인계자 임시 체계도 가져오기
  //* 업무 인계 KPI 추가
  UPDATE_TAKEOVER_KPI: 'UPDATE_TAKEOVER_KPI',
  //* 업무 인계 과제 추가
  UPDATE_TAKEOVER_PRJ: 'UPDATE_TAKEOVER_PRJ',
  //* 업무 인계 KPI 인수인계 요청
  UPDATE_REQ_KPI: 'UPDATE_REQ_KPI',
  //* 업무 인계 과제 인수인계 요청
  UPDATE_REQ_PRJ: 'UPDATE_REQ_PRJ',
  //* 업무 인수 인수된 KPI 저장하기
  UPDATE_OVER_KPI: 'UPDATE_OVER_KPI',
  //* 업무 인수 인수된 과제 저장하기
  UPDATE_OVER_PRJ: 'UPDATE_OVER_PRJ',
  UPDATE_REQ_KPI_SYSTEM_CHART: 'UPDATE_REQ_KPI_SYSTEM_CHART', //* KPI체계도 인수 요청
  UPDATE_OVER_KPI_SYSTEM_CHART: 'UPDATE_OVER_KPI_SYSTEM_CHART', //* 체계도 인수 drag & drop
  UPDATE_TREE_TKO_STATUS: 'UPDATE_TREE_TKO_STATUS', //* 체계도 인수 확정
  FETCH_TID: 'FETCH_TID', //* TID 가져오기
  //* 업무 인계 KPI 삭제
  DELETE_TAKEOVER_KPI: 'DELETE_TAKEOVER_KPI',
  //* 업무 인계 과제 삭제
  DELETE_TAKEOVER_PRJ: 'DELETE_TAKEOVER_PRJ',

  //* 업무인계 TAB 상태 설정
  INIT_TAKE_TAB: 'INIT_TAKE_TAB',
  //* 업무인수 TAB 상태 설정
  INIT_OVER_TAB: 'INIT_OVER_TAB',
  //* 업무 인계 TAB 데이터 초기화
  INIT_TAKE_DATA: 'INIT_TAKE_DATA',
  //* 업무 인수인계 PARAMETER 저장하기
  INIT_PARAM: 'INIT_PARAM',
  //* 업무 인수인계 나의 KPI 체계도 초기화
  INIT_MY_KPI_TREE: 'INIT_MY_KPI_TREE',
  //* 업무 인수인계 나의 과제 목록 초기화
  INIT_MY_PRJ_LIST: 'INIT_MY_PRJ_LIST',
  //* 업무 인계 KPI 목록 초기화
  INIT_TAKE_KPI_LIST: 'INIT_TAKE_KPI_LIST',
  //* 업무 인계 과제 목록 초기화
  INIT_TAKE_PRJ_LIST: 'INIT_TAKE_PRJ_LIST',
  //* 업무 인계 KPI 목록 초기화
  INIT_OVER_KPI_LIST: 'INIT_OVER_KPI_LIST',
  //* 업무 인계 과제 목록 초기화
  INIT_OVER_PRJ_LIST: 'INIT_OVER_PRJ_LIST',
  //* 업무 인계 KPI, 과제 총 개수 초기화
  INIT_TOTCNT: 'INIT_TOTCNT',

  //* 그리드 컬럼 설정
  INIT_SRCH_PRJ_COLUMNS: 'INIT_SRCH_PRJ_COLUMNS',
  INIT_SRCH_KPI_COLUMNS: 'INIT_SRCH_KPI_COLUMNS',
  INIT_TAKE_COLUMNS: 'INIT_TAKE_COLUMNS',
  INIT_OVER_COLUMNS: 'INIT_OVER_COLUMNS',

  //* 인계 KPI 추가 팝업 ON/OFF 설정
  INIT_VIEWS_ADD_KPI_POPUP: 'INIT_VIEWS_ADD_KPI_POPUP',
  //* 인계 과제 추가 팝업 ON/OFF 설정
  INIT_VIEWS_ADD_ASSIGNMENT_POPUP: 'INIT_VIEWS_ADD_ASSIGNMENT_POPUP',
};

export const mutations = {
  //* 가져온 업무 인수인계 목록 저장
  SET_TOV_LIST: 'SET_TOV_LIST',
  //* 업무인계 TAB 상태 설정
  SET_TAKE_TAB: 'SET_TAKE_TAB',
  //* 업무인수 TAB 상태 설정
  SET_OVER_TAB: 'SET_OVER_TAB',
  //* 업무 인계 KPI 목록 설정
  SET_TAKE_KPI_LIST: 'SET_TAKE_KPI_LIST',
  //* 업무 인계 과제 목록 설정
  SET_TAKE_PRJ_LIST: 'SET_TAKE_PRJ_LIST',
  //* 업무 인계 추가할 KPI 목록 설정
  SET_SRCH_KPI_LIST: 'SET_SRCH_KPI_LIST',
  //* 업무 인계 추가할 과제 목록 설정
  SET_SRCH_PRJ_LIST: 'SET_SRCH_PRJ_LIST',
  //* 업무 인계 인수할 KPI 목록 저장
  SET_OVER_KPI_LIST: 'SET_OVER_KPI_LIST',
  //* 업무 인계 인수할 과제 목록 저장
  SET_OVER_PRJ_LIST: 'SET_OVER_PRJ_LIST',
  //* 업무 인계 나의 KPI 트리 저장
  SET_MY_KPI_TREE: 'SET_MY_KPI_TREE',
  //* 업무 인계 니의 과제 목록 저장
  SET_MY_PRJ_LIST: 'SET_MY_PRJ_LIST',
  //* 업무 인수인계 PARAMETER 저장
  SET_PARAM: 'SET_PARAM',
  //* 업무 인계 KPI, 과제 총 개수 저장
  SET_TOTCNT: 'SET_TOTCNT',
  //* 그리드 컬럼 설정
  SET_SRCH_PRJ_COLUMNS: 'SET_SRCH_PRJ_COLUMNS',
  SET_SRCH_KPI_COLUMNS: 'SET_SRCH_KPI_COLUMNS',
  SET_TAKE_COLUMNS: 'SET_TAKE_COLUMNS',
  SET_OVER_COLUMNS: 'SET_OVER_COLUMNS',
  SET_TID: 'SET_TID', //* TID 가져오기
  //* 인계 KPI 추가 팝업 ON/OFF 설정
  SET_VIEWS_ADD_KPI_POPUP: 'SET_VIEWS_ADD_KPI_POPUP',
  //* 인계 과제 추가 팝업 ON/OFF 설정
  SET_VIEWS_ADD_ASSIGNMENT_POPUP: 'SET_VIEWS_ADD_ASSIGNMENT_POPUP',
  SET_KPI_SYSTEM_CHART: 'SET_KPI_SYSTEM_CHART', //* KPI 체계도 가져오기
  SET_TEMP_TREE: 'SET_TEMP_TREE', //* 인계자 임시 체계도 가져오기
  SET_TREE_TKO_STATUS: 'SET_TREE_TKO_STATUS', //* 체계도 인수 확정
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `businessTakeOver/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `businessTakeOver/${cur[1]}`;
    return acc;
  }, {}),
};
