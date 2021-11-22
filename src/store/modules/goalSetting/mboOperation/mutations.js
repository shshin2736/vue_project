import { mutations } from './types';

export default {
  //* MBO 현황 정보 데이터 세팅
  [mutations.SET_MBO_CURR_INFO](state, payload) {
    state.mboCurrInfo = payload;
  },
  //* MBO 목록 리스트 데이터 세팅
  [mutations.SET_MBO_LIST](state, payload) {
    state.mboList = payload;
  },
  //* MBO명 DROPDOWN 리스트 데이터 세팅
  [mutations.SET_MBO_NAME_LIST](state, payload) {
    state.mboNameList = payload;
  },
  //* MBO 수정목표 데이터 세팅
  [mutations.SET_MBO_MODIFY_TARGET_INFO](state, payload) {
    state.mboModTargetInfo = payload;
  },
  //* MBO 수정목표 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_MBO_MODIFY_TARGET_POP](state, payload) {
    state.views.mboModifyTarget = payload;
  },
  //* MBO 항목(KPI) 팝업 ON/OFF
  [mutations.SET_VIEWS_MBO_KPI_POPUP](state, payload) {
    state.views.MboKpiPopup = payload;
  },
  //* MBO 항목(KPI) 조회 설정
  [mutations.SET_MBO_KPI_POOL_LIST](state, payload) {
    state.mboKpiPoolList = payload;
  },
  // //* 선택한 MBO 항목(KPI) 설정
  // [mutations.SET_IS_SELECTED_NEW_KPI](state, payload) {
  //   state.isSelectedNewKpi = payload;
  // },
  //* MBO 현황탭 ON/OFF 저장
  [mutations.SET_MBO_BOARD_TAB](state, payload) {
    state.mboBoardTab = payload;
  },
  //* MBO 목록탭 ON/OFF 저장
  [mutations.SET_MBO_LIST_TAB](state, payload) {
    state.mboListTab = payload;
  },

  //* 선택한 수정목표 MBO 항목 가져오기
  [mutations.SET_SELECTED_TARGET_MBO_KPI](state, payload) {
    state.selectedTargetMboKpi = payload;
  },
  //* 목표를 수정한 MBO KPI 저장하기
  [mutations.SET_CHANGED_TARGET_MBO_KPI](state, payload) {
    state.changedTargetMboKpi = payload;
  },

  //* MBO목록에서 선택한 MBO 정보 가져오기
  [mutations.SET_SELECTED_MBO_INFO](state, payload) {
    state.selectedMboInfo = payload;
  },
};
