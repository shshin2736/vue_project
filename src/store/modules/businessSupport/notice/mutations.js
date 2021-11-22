import { mutations } from './types';

//! 하나의 MUTATIONS 당 하나의 STATE 변경
export default {
  //* 공지사항 리스트 저장하기
  [mutations.SET_NOTICE_LIST](state, payload) {
    state.noticeList = payload;
  },
  //* 조회중인 공지사항 내용 저장하기
  [mutations.SET_NOTICE_DETAIL](state, payload) {
    state.noticeDetail = payload;
  },
  //* 검색조건 저장하기
  [mutations.SET_NTC_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
};
