import { getters } from './types';

export default {
  //* 저장된 팀 일정 리스트 가져오기
  [getters.GET_TEAM_SCHEDULE_LIST](state) {
    return state.teamScheduleList;
  },
  //*  저장된 팀 일정 내용 가져오기
  [getters.GET_TEAM_SCHEDULE_DETAIL](state) {
    return state.teamScheduleDetail;
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
