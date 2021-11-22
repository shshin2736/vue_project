import { mutations } from './types';

export default {
  //* KPI 속성 리스트 데이터 세팅
  [mutations.SET_KPI_ATTRIBUTE_LIST](state, param) {
    state.kpiAttrList = param;
  },
  //* KPI 속성 DETAIL 가져오기
  [mutations.SET_KPI_ATTRIBUTE_INFO](state, param) {
    state.kpiAttrInfo = param;
  },
  //* KPI 속성명 중복체크
  [mutations.SET_KPI_ATTRIBUTE_CHECK](state, param) {
    state.kpiAttrCheckInfo = param;
  },
  //* KPI속성 검색 PARAM
  [mutations.SET_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
};
