import { mutations } from './types';

//! 하나의 MUTATIONS 당 하나의 STATE 변경
export default {
  //* 팀 게시판 리스트 저장하기
  [mutations.SET_TEAM_BOARD_LIST](state, payload) {
    state.teamBoardList = payload;
  },
  //* 선택한 팀 게시판 내용 저장하기
  [mutations.SET_TEAM_BOARD_DETAIL](state, payload) {
    state.teamBoardDetail = payload;
  },
  //* 팀 게시판 리스트 검색조건 저장하기
  [mutations.SET_TBD_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
  //* 댓글 리스트 저장하기
  [mutations.SET_REPLY_LIST](state, payload) {
    state.replyList = payload;
  },
  [mutations.SET_TBD_ERRORS](state, payload) {
    state.errors = payload;
  },
  [mutations.SET_TBD_UPLOAD_FILE](state, payload) {
    state.files = payload;
  },
};
