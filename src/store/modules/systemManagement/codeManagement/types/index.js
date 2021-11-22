//* GETTER CONSTANT
export const getters = {
  GET_GRP_CODE_LIST: 'GET_GRP_CODE_LIST', //* 그룹 코드 가져오기
  GET_CODE_LIST: 'GET_CODE_LIST', //* 코드 가져오기
  GET_VIEWS_CODE_INFO_POPUP: 'GET_VIEWS_CODE_INFO_POPUP', //* code info 팝업 on/off
  GET_CODE_INFO: 'GET_CODE_INFO', //* 코드 info 가져오기
  GET_GRP_CODE: 'GET_GRP_CODE', //* GRP 코드 가져오기(중복체크)
  GET_SRCH_PARAM: 'GET_SRCH_PARAM', //* GROUP CODE 검색 PARAM
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  FETCH_GRP_CODE_LIST: 'FETCH_GRP_CODE_LIST', //* 그룹 코드 가져오기
  FETCH_CODE_LIST: 'FETCH_CODE_LIST', //* 코드 가져오기
  FETCH_GRP_CODE: 'FETCH_GRP_CODE', //* GRP 코드 가져오기(중복체크)
  INSERT_GRP_CODE_LIST: 'INSERT_GRP_CODE_LIST', //* 그룹 코드 등록
  INSERT_CODE_LIST: 'INSERT_CODE_LIST', //* 코드 등록
  INIT_CODE_LIST: 'INIT_CODE_LIST', //* 코드 리스트 데이터 초기화
  INIT_CODE_INFO: 'INIT_CODE_INFO', //* 코드 info 초기화
  INIT_VIEWS_CODE_INFO_POPUP: 'INIT_VIEWS_CODE_INFO_POPUP', //* code info 팝업 on/off
  // UPDATE_GRP_CODE_LIST: 'UPDATE_GRP_CODE_LIST', //* 그룹 코드 수정
  // UPDATE_CODE_LIST: 'UPDATE_CODE_LIST', //* 코드 수정
  // DELETE_GRP_CODE_LIST: 'DELETE_GRP_CODE_LIST', //* 그룹 코드 삭제
  // DELETE_CODE_LIST: 'DELETE_CODE_LIST', //* 코드 삭제
};

//* MUTATIONS CONSTANT
export const mutations = {
  SET_GRP_CODE_LIST: 'SET_GRP_CODE_LIST', //* 그룹 코드 저장
  SET_CODE_LIST: 'SET_CODE_LIST', //* 코드 저장
  SET_VIEWS_CODE_INFO_POPUP: 'SET_VIEWS_CODE_INFO_POPUP', //* code info 팝업 on/off
  SET_CODE_INFO: 'SET_CODE_INFO', //* 코드 info 저장
  SET_GRP_CODE: 'SET_GRP_CODE', //* GRP 코드 가져오기(중복체크)
  SET_SRCH_PARAM: 'SET_SRCH_PARAM', //* GROUP CODE 검색 PARAM
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `codeManagement/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `codeManagement/${cur[1]}`;
    return acc;
  }, {}),
};
