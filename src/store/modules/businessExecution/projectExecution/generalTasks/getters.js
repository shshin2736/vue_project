import { getters } from './types';

export default {
  //* 일반과제 상세정보 조회
  [getters.GET_GNL_PRJ_MAIN](state) {
    return state.gnlPrjMain;
  },
  //* TAKS 리스트 가져오기
  [getters.GET_GNL_TASK_LIST](state) {
    return state.gnlTaskList;
  },
  //* 일반과제ID 가져오기
  [getters.GET_PRJ_ID](state) {
    return state.prjId;
  },
  //* 신규일반 과제 등록인지 확인하는 Boolean 가져오기
  [getters.GET_IS_NEW_GNL_TASK](state) {
    return state.isNewGnlTask;
  },
  //* TASK 상세 팝업 ON/OFF 가져오기
  [getters.GET_TASK_DETAIL_POPUP](state) {
    return state.views.taskDetailPopup;
  },
  //* 선택한 Task 정보 가져오기
  [getters.GET_SELECTED_GNL_TASK](state) {
    return state.selectedGnlTask;
  },
  //* 신규 즉실천 or 수정 즉실천 Boolean 가져오기
  [getters.GET_IS_NEW_ACTION](state) {
    return state.isNewAction;
  },

  //* 즉실천 상세정보 가져오기
  [getters.GET_PRJ_ACTION](state) {
    return state.prjAction;
  },
  [getters.GET_CONN_PRJ_ID](state) {
    return state.connPrjId;
  },
};
