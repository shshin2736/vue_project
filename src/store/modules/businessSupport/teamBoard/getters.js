import { getters } from './types';

export default {
  //* 저장된 팀 게시판 리스트 가져오기
  [getters.GET_TEAM_BOARD_LIST](state) {
    return state.teamBoardList;
  },
  //*  저장된 팀 게시판 내용 가져오기
  [getters.GET_TEAM_BOARD_DETAIL](state) {
    return state.teamBoardDetail;
  },
  //* 저장된 검색 조건 가져오기
  [getters.GET_TBD_SRCH_PARAM](state) {
    return state.srchParam;
  },
  //* 댓글 리스트 가져오기
  [getters.GET_REPLY_LIST](state) {
    return state.replyList;
  },
  [getters.GET_TBD_ERRORS](state) {
    return state.errors;
  },
  [getters.GET_TBD_UPLOAD_FILE](state) {
    return state.files;
  },
};
