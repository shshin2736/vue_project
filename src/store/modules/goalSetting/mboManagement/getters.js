import { getters } from './types';

export default {
  //* MBO 관리 리스트 가져오기
  [getters.GET_MBO_MANAGEMENT_LIST](state) {
    return state.mboManagementList;
  },

  //* MBO 관리 대상 인원 리스트 가져오기
  [getters.GET_MBO_TARGET_LIST](state) {
    return state.mboTargetList;
  },

  //* 선택된 MBO 정보 가져오기
  [getters.GET_SELECTED_MBO_INFO](state) {
    return state.selectedMboInfo;
  },

  //* MBO 평가 대상자 가져오기
  [getters.GET_MBO_EVAL_TARGET_LIST](state) {
    return state.mboEvalTargetList;
  },

  //* MBO 관리 드롭다운 리스트 가져오기(평가유형 , 평가진행상태)
  [getters.GET_MBO_DROPDOWN_LIST](state) {
    return state.mboDropdownList;
  },

  //* MBO 대상자 탭 가져오기
  [getters.GET_TAB_CONTENTS_MBO_TARGET](state) {
    return state.contents.mboTarget;
  },

  //* MBO 대상자 설정 탭 가져오기
  [getters.GET_TAB_CONTENTS_MBO_TARGET_SETUP](state) {
    return state.contents.mboTargetSetup;
  },

  //* MBO 등록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_MBO_REGIST_POPUP](state) {
    return state.views.mboRegistPopup;
  },
  //* MBO 등록 팝업 ON/OFF 가져오기
  [getters.GET_BTN_MBO_TARGET_SETUP](state) {
    return state.button.btnMboTargetSetup;
  },

  //* MBO 평가 대상 기간 가져오기
  [getters.GET_MBO_EVAL_CONF](state) {
    return state.mboEvalConf;
  },

  //* MBO명 존재 유무 가져오기
  [getters.GET_EXIST_MBO_NAME](state) {
    return state.isExistMboName;
  },

  //* MBO명 등록 가능 ON/OFF 가져오기
  [getters.GET_BE_REGIST_NAME](state) {
    return state.beRegistName;
  },

  //* MBO명 등록 불가능 ON/OFF 가져오기
  [getters.GET_ALREADY_REGIST_NAME](state) {
    return state.alreayRegistName;
  },

  //* MBO명 등록 불가능 ON/OFF 가져오기
  [getters.GET_IS_NEW_SAVE_MBO](state) {
    return state.isNewMboSave;
  },
};
