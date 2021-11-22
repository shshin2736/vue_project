import { getters } from './types';

export default {
  //* KPI 속성 리스트 가져오기
  [getters.GET_KPI_ATTRIBUTE_LIST](state) {
    return state.kpiAttrList;
  },
  //* KPI 속성 DETAIL 가져오기
  [getters.GET_KPI_ATTRIBUTE_INFO](state) {
    return state.kpiAttrInfo;
  },
  //* KPI 속성명 중복체크
  [getters.GET_KPI_ATTRIBUTE_CHECK](state) {
    return state.kpiAttrCheckInfo;
  },
  //* KPI속성 검색 PARAM
  [getters.GET_SRCH_PARAM](state) {
    return state.srchParam;
  },
};
