import { getters } from './types';

export default {
  //* 시스템 평균접속율 가져오기
  [getters.GET_SYS_CON_AVG](state) {
    return state.sysConAvg;
  },
  //* 모듈별 사용현황 가져오기
  [getters.GET_MODULE_RATE](state) {
    return state.moduleRate;
  },
  //* 업무효율향상율 가져오기
  [getters.GET_IMPL_RATE](state) {
    return state.implRate;
  },
  //* 다운로드 이력저장하기
  [getters.GET_DOWNLOAD_LOG](state) {
    return state.downloadLog;
  },
  //* 검색 데이터 저장하기
  [getters.GET_SEARCH_DATA](state) {
    return state.searchData;
  },
  //* 시스템 평균접속율 컬럼 가져오기
  [getters.GET_SYS_CON_AVG_COLUMNS](state) {
    return state.sysConAvgColumns;
  },
  //* 모듈별 사용현황 컬럼 가져오기
  [getters.GET_MODULE_RATE_COLUMNS](state) {
    return state.moduleRateColumns;
  },
  //* 업무효율향상율 컬럼 가져오기
  [getters.GET_IMPL_RATE_COLUMNS](state) {
    return state.implRateColumns;
  },
  //* 다운로드 이력 컬럼 가져오기
  [getters.GET_DOWNLOAD_LOG_COLUMNS](state) {
    return state.downloadLogColumns;
  },
  //* 시스템 평균접속율 그리드 데이터 가져오기
  [getters.GET_SYS_CON_AVG_GRID](state) {
    return state.sysConAvgGrid;
  },
  //* 모듈별 사용현황 그리드 데이터 가져오기
  [getters.GET_MODULE_RATE_GRID](state) {
    return state.moduleRateGrid;
  },
  //* 업무효율향상율 그리드 데이터 가져오기
  [getters.GET_IMPL_RATE_GRID](state) {
    return state.implRateGrid;
  },
  //* 다운로드 이력 그리드 데이터 가져오기
  [getters.GET_DOWNLOAD_LOG_GRID](state) {
    return state.downloadLogGrid;
  },
  //* 시스템 평균접속율 차트 데이터 가져오기
  [getters.GET_SYS_CON_AVG_CHART](state) {
    return state.sysConAvgChart;
  },
  //* 모듈별 사용현황 차트 데이터 가져오기
  [getters.GET_MODULE_RATE_CHART](state) {
    return state.moduleRateChart;
  },
  //* 업무효율향상율 차트 데이터 가져오기
  [getters.GET_IMPL_RATE_CHART](state) {
    return state.implRateChart;
  },
  //* 다운로드 이력 차트 데이터 가져오기
  [getters.GET_DOWNLOAD_LOG_CHART](state) {
    return state.downloadLogChart;
  },
};
