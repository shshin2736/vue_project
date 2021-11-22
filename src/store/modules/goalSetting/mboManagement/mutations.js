import { mutations } from './types';

export default {
  //* MBO 관리 리스트 저장
  [mutations.SET_MBO_MANAGEMET_LIST](state, payload) {
    state.mboManagementList = payload;
  },

  //* 단일 MBO 정보
  [mutations.SET_MBO_EVAL_CONF](state, payload) {
    state.mboEvalConf = payload;
  },

  //* MBO 관리 대상인원 내역 저장
  [mutations.SET_MBO_TARGET_LIST](state, payload) {
    state.mboTargetList = payload;
  },

  //* 선택된 MBO 정보 저장
  [mutations.SET_SELECTED_MBO_INFO](state, payload) {
    state.selectedMboInfo = payload;
  },

  //* MBO 평가 대상자 가져오기
  [mutations.SET_MBO_EVAL_TARGET_LIST](state, payload) {
    state.mboEvalTargetList = payload;
  },

  //* MBO 관리 드롭다운 리스트 저장
  [mutations.SET_MBO_DROPDOWN_LIST](state, payload) {
    state.mboDropdownList = payload;
  },

  //* MBO 대상자 탭 저장
  [mutations.SET_TAB_CONTENTS_MBO_TARGET](state, payload) {
    state.contents.mboTarget = payload;
  },

  //* MBO 대상자 탭 저장
  [mutations.SET_TAB_CONTENTS_MBO_TARGET_SETUP](state, payload) {
    state.contents.mboTargetSetup = payload;
  },

  //* MBO 등록 팝업 ON/OFF 저장
  [mutations.SET_VIEWS_MBO_REGIST_POPUP](state, payload) {
    state.views.mboRegistPopup = payload;
  },

  //* MBO 등록 팝업 ON/OFF 저장
  [mutations.SET_BTN_MBO_TARGET_SETUP](state, payload) {
    state.button.btnMboTargetSetup = payload;
  },

  //* MBO명 존재 유무 ONF/OFF 저장
  [mutations.SET_EXIST_MBO_NAME](state, payload) {
    state.isExistMboName = payload;
  },

  //* MBO명 등록 가능 ON/OFF 저장
  [mutations.SET_BE_REGIST_NAME](state, payload) {
    state.beRegistName = payload;
  },

  //* MBO명 등록 불가능 ON/OFF 저장
  [mutations.SET_ALREADY_REGIST_NAME](state, payload) {
    state.alreayRegistName = payload;
  },

  //* MBO명 등록 불가능 ON/OFF 저장
  [mutations.SET_IS_NEW_SAVE_MBO](state, payload) {
    state.isNewMboSave = payload;
  },
};
