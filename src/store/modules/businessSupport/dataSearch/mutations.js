import { mutations } from './types';

export default {
  //* 자료검색 리스트 저장
  [mutations.SET_DATA_SEARCH_LIST](state, payload) {
    state.dataSearchList = payload;
  },
  //* 자료요청 리스트 저장
  [mutations.SET_DATA_SEARCH_REQ](state, payload) {
    state.dataSearchReq = payload;
  },
  //* 자료검색 페이징 정보 저장
  [mutations.SET_LIST_PAGING](state, payload) {
    state.listPaging = payload;
  },
  //* 자료요청 페이징 정보 저장
  [mutations.SET_REQ_PAGING](state, payload) {
    state.reqPaging = payload;
  },
  //* 검색 정보 저장
  [mutations.SET_SEARCH_DATA](state, payload) {
    state.searchData = payload;
  },
};
