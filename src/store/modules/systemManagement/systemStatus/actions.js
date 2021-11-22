import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  // TODO: FETCH Methods DECLARATION
  //* 시스템 평균접속율 가져오기
  async [actions.FETCH_SYS_CON_AVG]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getSysConAvg.do',
        payload,
      );
      commit(mutations.SET_SYS_CON_AVG, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 모듈별 사용현황 가져오기
  async [actions.FETCH_MODULE_RATE]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getModuleRate.do',
        payload,
      );
      commit(mutations.SET_MODULE_RATE, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 업무효율향상율 가져오기
  async [actions.FETCH_IMPL_RATE]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getImplRate.do',
        payload,
      );
      commit(mutations.SET_IMPL_RATE, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 다운로드 이력 가져오기
  async [actions.FETCH_DOWNLOAD_LOG]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getDownloadRank.do',
        payload,
      );
      commit(mutations.SET_DOWNLOAD_LOG, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods DECLARATION
  // TODO: UPDATE Methods DECLARATION
  // TODO: INIT Methods DECLARATION
  //* 검색 데이터 초기화
  [actions.INIT_SEARCH_DATA]({ commit }, payload) {
    commit(mutations.SET_SEARCH_DATA, payload);
  },
  //* 시스템 평균접속율 컬럼 초기화
  [actions.INIT_SYS_CON_AVG_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_SYS_CON_AVG_COLUMNS, payload);
  },
  //* 모듈별 사용현황 컬럼 초기화
  [actions.INIT_MODULE_RATE_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_MODULE_RATE_COLUMNS, payload);
  },
  //* 업무효율향상율 컬럼 초기화
  [actions.INIT_IMPL_RATE_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_IMPL_RATE_COLUMNS, payload);
  },
  //* 다운로드 로그 컬럼 초기화
  [actions.INIT_DOWNLOAD_LOG_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_DOWNLOAD_LOG_COLUMNS, payload);
  },
  //* 시스템 평균접속율 그리드 데이터 초기화
  [actions.INIT_SYS_CON_AVG_GRID]({ commit }, payload) {
    commit(mutations.SET_SYS_CON_AVG_GRID, payload);
  },
  //* 모듈별 사용현황 그리드 데이터 초기화
  [actions.INIT_MODULE_RATE_GRID]({ commit }, payload) {
    commit(mutations.SET_MODULE_RATE_GRID, payload);
  },
  //* 업무효율향상율 그리드 데이터 초기화
  [actions.INIT_IMPL_RATE_GRID]({ commit }, payload) {
    commit(mutations.SET_IMPL_RATE_GRID, payload);
  },
  //* 다운로드 로그 그리드 데이터 초기화
  [actions.INIT_DOWNLOAD_LOG_GRID]({ commit }, payload) {
    commit(mutations.SET_DOWNLOAD_LOG_GRID, payload);
  },
  //* 시스템 평균접속율 차트 데이터 초기화
  [actions.INIT_SYS_CON_AVG_CHART]({ commit }, payload) {
    commit(mutations.SET_SYS_CON_AVG_CHART, payload);
  },
  //* 모듈별 사용현황 차트 데이터 초기화
  [actions.INIT_MODULE_RATE_CHART]({ commit }, payload) {
    commit(mutations.SET_MODULE_RATE_CHART, payload);
  },
  //* 업무효율향상율 차트 데이터 초기화
  [actions.INIT_IMPL_RATE_CHART]({ commit }, payload) {
    commit(mutations.SET_IMPL_RATE_CHART, payload);
  },
  //* 다운로드 차트 데이터 초기화
  [actions.INIT_DOWNLOAD_LOG_CHART]({ commit }, payload) {
    commit(mutations.SET_DOWNLOAD_LOG_CHART, payload);
  },
};
