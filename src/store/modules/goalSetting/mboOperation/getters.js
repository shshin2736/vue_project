import { getters } from './types';

export default {
  //* MBO 현황 정보가져오기
  [getters.GET_MBO_CURR_INFO](state) {
    return state.mboCurrInfo;
  },
  //* MBO 목록 리스트 가져오기
  [getters.GET_MBO_LIST](state) {
    return state.mboList;
  },
  //* MBO명 DROPDOWN 리스트 가져오기
  [getters.GET_MBO_NAME_LIST](state) {
    return state.mboNameList;
  },
  //* MBO 수정목표 DATA 가져오기
  [getters.GET_MBO_MODIFY_TARGET_INFO](state) {
    return state.mboModTargetInfo;
  },
  //* MBO 수정목표 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_MBO_MODIFY_TARGET_POP](state) {
    return state.views.mboModifyTarget;
  },
  //* MBO 항목(KPI) 팝업 ON/OFF
  [getters.GET_VIEWS_MBO_KPI_POPUP](state) {
    return state.views.MboKpiPopup;
  },
  //* MBO 항목(KPI) 조회 설정
  [getters.GET_MBO_KPI_POOL_LIST](state) {
    return state.mboKpiPoolList;
  },
  // //* MBO 항목(KPI) 조회 설정
  // [getters.GET_IS_SELECTED_NEW_KPI](state) {
  //   return state.isSelectedNewKpi;
  // },
  //* MBO 현황탭 ON/OFF 가져오기
  [getters.GET_MBO_BOARD_TAB](state) {
    return state.mboBoardTab;
  },
  //* MBO 목록탭 ON/OFF 가져오기
  [getters.GET_MBO_LIST_TAB](state) {
    return state.mboListTab;
  },
  //* 선택한 수정목표 MBO 항목 가져오기
  [getters.GET_SELECTED_TARGET_MBO_KPI](state) {
    return state.selectedTargetMboKpi;
  },
  //* 목표를 수정한 MBO KPI 가져오기
  [getters.GET_CHANGED_TARGET_MBO_KPI](state) {
    return state.changedTargetMboKpi;
  },

  //* MBO목록에서 선택한 MBO 정보 가져오기
  [getters.GET_SELECTED_MBO_INFO](state) {
    return state.selectedMboInfo;
  },
};
