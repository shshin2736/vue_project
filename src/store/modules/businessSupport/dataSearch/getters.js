import { getters } from './types';

export default {
  //* 자료 검색 리스트 가져오기
  [getters.GET_DATA_SEARCH_LIST](state) {
    return state.dataSearchList;
  },
  //* 자료 요청 리스트 가져오기
  [getters.GET_DATA_SEARCH_REQ](state) {
    return state.dataSearchReq;
  },
  //* 자료검색 페이징 정보 가져오기
  [getters.GET_LIST_PAGING](state) {
    return state.listPaging;
  },
  //* 자료요청 페이징 정보 가져오기
  [getters.GET_REQ_PAGING](state) {
    return state.reqPaging;
  },
  //* 검색 데이터 가져오기
  [getters.GET_SEARCH_DATA](state) {
    return state.searchData;
  },
};
