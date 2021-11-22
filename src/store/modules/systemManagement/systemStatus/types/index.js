//* GETTER CONSTANT
export const getters = {
  GET_SYS_CON_AVG: 'GET_SYS_CON_AVG', //* 시스템 평균접속율 가져오기
  GET_MODULE_RATE: 'GET_MODULE_RATE', //* 모듈별 사용현황 가져오기
  GET_IMPL_RATE: 'GET_IMPL_RATE', //* 업무효율향상율 가져오기
  GET_SEARCH_DATA: 'GET_SEARCH_DATA', //* 검색 데이터 가져오기
  GET_DOWNLOAD_LOG: 'GET_DOWNLOAD_LOG', //* 다운로드 이력 가져오기
  GET_SYS_CON_AVG_COLUMNS: 'GET_SYS_CON_AVG_COLUMNS', //* 시스템 평균접속율 컬럼 가져오기
  GET_MODULE_RATE_COLUMNS: 'GET_MODULE_RATE_COLUMNS', //* 모듈별 사용현황 컬럼 가져오기
  GET_DOWNLOAD_LOG_COLUMNS: 'GET_DOWNLOAD_LOG_COLUMNS', //* 다운로드 이력 컬럼 가져오기
  GET_IMPL_RATE_COLUMNS: 'GET_IMPL_RATE_COLUMNS', //* 업무효율향상율 컬럼 가져오기
  GET_SYS_CON_AVG_GRID: 'GET_SYS_CON_AVG_GRID', //* 시스템 평균접속율 그리드 데이터 가져오기
  GET_MODULE_RATE_GRID: 'GET_MODULE_RATE_GRID', //* 모듈별 사용현황 그리드 데이터 가져오기
  GET_IMPL_RATE_GRID: 'GET_IMPL_RATE_GRID', //* 업무효율향상율 그리드 데이터 가져오기
  GET_DOWNLOAD_LOG_GRID: 'GET_DOWNLOAD_LOG_GRID', //* 다운로드 이력 데이터 가져오기
  GET_SYS_CON_AVG_CHART: 'GET_SYS_CON_AVG_CHART', //* 업무효율향상율 차트 데이터 가져오기
  GET_MODULE_RATE_CHART: 'GET_MODULE_RATE_CHART', //* 업무효율향상율 차트 데이터 가져오기
  GET_IMPL_RATE_CHART: 'GET_IMPL_RATE_CHART', //* 업무효율향상율 차트 데이터 가져오기
  GET_DOWNLOAD_LOG_CHART: 'GET_DOWNLOAD_LOG_CHART', //* 다운로드 이력 차트 데이터 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  FETCH_SYS_CON_AVG: 'FETCH_SYS_CON_AVG', //* 시스템 평균접속율 가져오기
  FETCH_MODULE_RATE: 'FETCH_MODULE_RATE', //* 모듈별 사용현황 가져오기
  FETCH_IMPL_RATE: 'FETCH_IMPL_RATE', //* 업무효율향상율 가져오기
  FETCH_DOWNLOAD_LOG: 'FETCH_DOWNLOAD_LOG', //* 다운로드 이력 가져오기
  INIT_SEARCH_DATA: 'INIT_SEARCH_DATA', //* 검색 데이터 초기화
  INIT_SYS_CON_AVG_COLUMNS: 'INIT_SYS_CON_AVG_COLUMNS', //* 시스템 평균접속율 컬럼 초기화
  INIT_MODULE_RATE_COLUMNS: 'INIT_MODULE_RATE_COLUMNS', //* 모듈별 사용현황 컬럼 초기화
  INIT_IMPL_RATE_COLUMNS: 'INIT_IMPL_RATE_COLUMNS', //* 업무효율향상율 컬럼 초기화
  INIT_DOWNLOAD_LOG_COLUMNS: 'INIT_DOWNLOAD_LOG_COLUMNS', //* 다운로드 이력 컬럼 초기화
  INIT_SYS_CON_AVG_GRID: 'INIT_SYS_CON_AVG_GRID', //* 시스템 평균접속율 그리드 데이터 초기화
  INIT_MODULE_RATE_GRID: 'INIT_MODULE_RATE_GRID', //* 모듈별 사용현황 그리드 데이터 초기화
  INIT_IMPL_RATE_GRID: 'INIT_IMPL_RATE_GRID', //* 업무효율향상율 그리드 데이터 초기화
  INIT_DOWNLOAD_LOG_GRID: 'INIT_DOWNLOAD_LOG_GRID', //* 다운로드 이력 데이터 초기화
  INIT_SYS_CON_AVG_CHART: 'INIT_SYS_CON_AVG_CHART', //* 업무효율향상율 차트 데이터 초기화
  INIT_MODULE_RATE_CHART: 'INIT_MODULE_RATE_CHART', //* 업무효율향상율 차트 데이터 초기화
  INIT_IMPL_RATE_CHART: 'INIT_IMPL_RATE_CHART', //* 업무효율향상율 차트 데이터 초기화
  INIT_DOWNLOAD_LOG_CHART: 'INIT_DOWNLOAD_LOG_CHART', //* 다운로드 이력 차트 데이터 초기화
};

//* MUTATIONS CONSTANT
export const mutations = {
  SET_SYS_CON_AVG: 'SET_SYS_CON_AVG', //* 시스템 평균접속율 저장하기
  SET_MODULE_RATE: 'SET_MODULE_RATE', //* 모듈별 사용현황 저장하기
  SET_IMPL_RATE: 'SET_IMPL_RATE', //* 업무효율향상율 저장하기
  SET_SEARCH_DATA: 'SET_SEARCH_DATA', //* 검색 데이터 저장하기
  SET_DOWNLOAD_LOG: 'SET_DOWNLOAD_LOG', //* 다운로드 이력 저장하기
  SET_SYS_CON_AVG_COLUMNS: 'SET_SYS_CON_AVG_COLUMNS', //* 시스템 평균접속율 컬럼 저장하기
  SET_MODULE_RATE_COLUMNS: 'SET_MODULE_RATE_COLUMNS', //* 모듈별 사용현황 컬럼 저장하기
  SET_IMPL_RATE_COLUMNS: 'SET_IMPL_RATE_COLUMNS', //* 업무효율향상율 컬럼 저장하기
  SET_DOWNLOAD_LOG_COLUMNS: 'SET_DOWNLOAD_LOG_COLUMNS', //* 다운로드 이력 컬럼 저장하기
  SET_SYS_CON_AVG_GRID: 'SET_SYS_CON_AVG_GRID', //* 시스템 평균접속율 그리드 데이터 저장하기
  SET_MODULE_RATE_GRID: 'SET_MODULE_RATE_GRID', //* 모듈별 사용현황 그리드 데이터 저장하기
  SET_IMPL_RATE_GRID: 'SET_IMPL_RATE_GRID', //* 업무효율향상율 그리드 데이터 저장하기
  SET_DOWNLOAD_LOG_GRID: 'SET_DOWNLOAD_LOG_GRID', //* 다운로드 이력 데이터 저장하기
  SET_SYS_CON_AVG_CHART: 'SET_SYS_CON_AVG_CHART', //* 업무효율향상율 차트 데이터 저장하기
  SET_MODULE_RATE_CHART: 'SET_MODULE_RATE_CHART', //* 업무효율향상율 차트 데이터 저장하기
  SET_IMPL_RATE_CHART: 'SET_IMPL_RATE_CHART', //* 업무효율향상율 차트 데이터 저장하기
  SET_DOWNLOAD_LOG_CHART: 'SET_DOWNLOAD_LOG_CHART', //* 다운로드 이력 차트 데이터 저장하기
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `systemStatus/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `systemStatus/${cur[1]}`;
    return acc;
  }, {}),
};
