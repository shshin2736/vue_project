import { mutations } from './types';

export default {
  //* 시스템 평균접속율 저장하기
  [mutations.SET_SYS_CON_AVG](state, payload) {
    state.sysConAvg = payload;
  },
  //* 모듈별 사용현황 저장하기
  [mutations.SET_MODULE_RATE](state, payload) {
    state.moduleRate = payload;
  },
  //* 업무효율향상율 저장하기
  [mutations.SET_IMPL_RATE](state, payload) {
    state.implRate = payload;
  },
  //* 검색 데이터 저장하기
  [mutations.SET_SEARCH_DATA](state, payload) {
    state.searchData = payload;
  },
  //* 다운로드 이력 저장하기
  [mutations.SET_DOWNLOAD_LOG](state, payload) {
    state.downloadLog = payload;
  },
  //* 시스템 평균접속율 컬럼 저장하기
  [mutations.SET_SYS_CON_AVG_COLUMNS](state, payload) {
    state.sysConAvgColumns = payload;
  },
  //* 모듈별 사용현황 컬럼 저장하기
  [mutations.SET_MODULE_RATE_COLUMNS](state, payload) {
    state.moduleRateColumns = payload;
  },
  //* 업무효율향상율 컬럼 저장하기
  [mutations.SET_IMPL_RATE_COLUMNS](state, payload) {
    state.implRateColumns = payload;
  },
  //* 다운로드 이력 컬럼 저장하기
  [mutations.SET_DOWNLOAD_LOG_COLUMNS](state, payload) {
    state.downloadLogColumns = payload;
  },
  //* 시스템 평균접속율 그리드 데이터 저장하기
  [mutations.SET_SYS_CON_AVG_GRID](state, payload) {
    state.sysConAvgGrid = payload;
  },
  //* 모듈별 사용현황 그리드 데이터 저장하기
  [mutations.SET_MODULE_RATE_GRID](state, payload) {
    state.moduleRateGrid = payload;
  },
  //* 업무효율향상율 그리드 데이터 저장하기
  [mutations.SET_IMPL_RATE_GRID](state, payload) {
    state.implRateGrid = payload;
  },
  //* 다운로드 이력 그리드 데이터 저장하기
  [mutations.SET_DOWNLOAD_LOG_GRID](state, payload) {
    state.downloadLogGrid = payload;
  },
  //* 시스템 평균접속율 차트 데이터 저장하기
  [mutations.SET_SYS_CON_AVG_CHART](state, payload) {
    state.sysConAvgChart = payload;
  },
  //* 모듈별 사용현황 차트 데이터 저장하기
  [mutations.SET_MODULE_RATE_CHART](state, payload) {
    state.moduleRateChart = payload;
  },
  //* 업무효율향상율 차트 데이터 저장하기
  [mutations.SET_IMPL_RATE_CHART](state, payload) {
    state.implRateChart = payload;
  },
  //* 다운로드 이력 차트 데이터 저장하기
  [mutations.SET_DOWNLOAD_LOG_CHART](state, payload) {
    state.downloadLogChart = payload;
  },
};
