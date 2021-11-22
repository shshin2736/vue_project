import { mutations } from './types';

export default {
  //* 일반과제 상세정보 저장
  [mutations.SET_GNL_PRJ_MAIN](state, payload) {
    state.gnlPrjMain = payload;
  },
  //* TASK 리스트 저장
  [mutations.SET_GNL_TASK_LIST](state, payload) {
    state.gnlTaskList = payload;
  },

  //* 일반과제ID 저장
  [mutations.SET_PRJ_ID](state, payload) {
    state.prjId = payload;
  },

  //* 신규일반 과제 등록인지 확인하는 Boolean 저장
  [mutations.SET_IS_NEW_GNL_TASK](state, payload) {
    state.isNewGnlTask = payload;
  },

  //* TASK 상세 팝업 ON/OFF 저장
  [mutations.SET_TASK_DETAIL_POPUP](state, payload) {
    state.views.taskDetailPopup = payload;
  },

  //* 선택한 Task 정보 가져오기
  [mutations.SET_SELECTED_GNL_TASK](state, payload) {
    state.selectedGnlTask = payload;
  },

  //* 신규 즉실천 or 수정 즉실천 Boolean 저장
  [mutations.SET_IS_NEW_ACTION](state, payload) {
    state.isNewAction = payload;
  },
  //* 즉실천 상세정보 저장
  [mutations.SET_PRJ_ACTION](state, payload) {
    state.prjAction = payload;
  },
  [mutations.SET_CONN_PRJ_ID](state, payload) {
    state.connPrjId = payload;
  },
};
