import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  // TODO: FETCH Methods DECLARATION
  //* 자료검색 리스트 가져오기
  async [actions.FETCH_DATA_SEARCH_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/support/getDataSearchList.do',
        payload,
      );
      commit(mutations.SET_DATA_SEARCH_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 자료 요청 리스트 가져오기
  async [actions.FETCH_DATA_SEARCH_REQ]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/support/getDataSearchReq.do',
        payload,
      );
      commit(mutations.SET_DATA_SEARCH_REQ, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods DECLARATION
  //* 자료 요청 등록
  async [actions.INSERT_DATA_SEARCH_REQ](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/support/insertDataSearchReq.do',
        payload,
      );
      return response;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: UPDATE Methods DECLARATION
  //* 자료 요청 업데이트
  async [actions.UPDATE_DATA_SEARCH_REQ](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/support/updateDataSearchReq.do',
        payload,
      );
      return response;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INIT Methods DECLARATION
  //* 자료 검색 페이징 데이터 초기화
  [actions.INIT_LIST_PAGING]({ commit }, payload) {
    commit(mutations.SET_LIST_PAGING, payload);
  },
  //* 자료 요청 페이징 데이터 초기화
  [actions.INIT_REQ_PAGING]({ commit }, payload) {
    commit(mutations.SET_REQ_PAGING, payload);
  },
  //* 검색 데이터 초기화
  [actions.INIT_SEARCH_DATA]({ commit }, payload) {
    commit(mutations.SET_SEARCH_DATA, payload);
  },
};
