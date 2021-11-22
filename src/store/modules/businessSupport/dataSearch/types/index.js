//* GETTER CONSTANT
export const getters = {
  GET_DATA_SEARCH_LIST: 'GET_DATA_SEARCH_LIST', //* 자료 검색 리스트 가져오기
  GET_DATA_SEARCH_REQ: 'GET_DATA_SEARCH_REQ', //* 자료 요청 리스트 가져오기
  GET_LIST_PAGING: 'GET_LIST_PAGING', //* 자료검색 페이징 정보 가져오기
  GET_REQ_PAGING: 'GET_REQ_PAGING', //* 자료요청 페이징 정보 가져오기
  GET_SEARCH_DATA: 'GET_SEARCH_DATA', //* 검색 데이터 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  FETCH_DATA_SEARCH_LIST: 'FETCH_DATA_SEARCH_LIST', //* 자료 검색 리스트 가져오기
  FETCH_DATA_SEARCH_REQ: 'FETCH_DATA_SEARCH_REQ', //* 자료 요청 리스트 가져오기
  INSERT_DATA_SEARCH_REQ: 'INSERT_DATA_SEARCH_REQ', //* 자료 요청 등록
  UPDATE_DATA_SEARCH_REQ: 'UPDATE_DATA_SEARCH_REQ', //* 자료 요청 업데이트
  INIT_LIST_PAGING: 'INIT_LIST_PAGING', //* 자료검색 페이징 정보 초기화
  INIT_REQ_PAGING: 'INIT_REQ_PAGING', //* 자료요청 페이징 정보 초기화
  INIT_SEARCH_DATA: 'INIT_SEARCH_DATA', //* 검색 데이터 초기화
};

//* MUTATIONS CONSTANT
export const mutations = {
  SET_DATA_SEARCH_LIST: 'SET_DATA_SEARCH_LIST', //* 자료 검색 리스트 저장
  SET_DATA_SEARCH_REQ: 'SET_DATA_SEARCH_REQ', //* 자료 요청 리스트 저장
  SET_LIST_PAGING: 'SET_LIST_PAGING', //* 자료검색 페이징 정보 저장
  SET_REQ_PAGING: 'SET_REQ_PAGING', //* 자료요청 페이징 정보 저장
  SET_SEARCH_DATA: 'SET_SEARCH_DATA', //* 검색 데이터 저장
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `dataSearch/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `dataSearch/${cur[1]}`;
    return acc;
  }, {}),
};
