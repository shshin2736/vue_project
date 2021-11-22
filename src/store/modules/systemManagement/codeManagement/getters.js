import { getters } from './types';

export default {
  //* 그룹 코드 가져오기
  [getters.GET_GRP_CODE_LIST](state) {
    return state.grpCodeList;
  },
  //* 코드리스트 가져오기
  [getters.GET_CODE_LIST](state) {
    return state.codeList;
  },
  //* 코드 INFO 가져오기
  [getters.GET_CODE_INFO](state) {
    return state.codeInfo;
  },
  //* code info 팝업 on/off
  [getters.GET_VIEWS_CODE_INFO_POPUP](state) {
    return state.views.codeInfo;
  },
  [getters.GET_GRP_CODE](state) {
    return state.grpCodeCnt;
  },
  //* GROUP CODE 검색 PARAM
  [getters.GET_SRCH_PARAM](state) {
    return state.srchParam;
  },
};
