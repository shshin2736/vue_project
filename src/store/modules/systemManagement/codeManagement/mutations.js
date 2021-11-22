import { mutations } from './types';

export default {
  //* 그룹 코드 저장
  [mutations.SET_CODE_LIST](state, payload) {
    state.codeList = payload;
  },
  //* 코드 저장
  [mutations.SET_GRP_CODE_LIST](state, payload) {
    state.grpCodeList = payload;
  },
  //* 코드 info 초기화
  [mutations.SET_CODE_INFO](state, payload) {
    state.codeInfo = payload;
  },
  //* code info 팝업 on/off
  [mutations.SET_VIEWS_CODE_INFO_POPUP](state, payload) {
    state.views.codeInfo = payload;
  },
  [mutations.SET_GRP_CODE](state, param) {
    state.grpCodeCnt = param;
  },
  //* GROUP CODE 검색 PARAM
  [mutations.SET_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
};
