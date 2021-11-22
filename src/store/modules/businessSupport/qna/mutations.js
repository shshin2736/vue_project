import { mutations } from './types';

//! 하나의 MUTATIONS 당 하나의 STATE 변경
export default {
  //* 이용 문의 리스트 저장하기
  [mutations.SET_QNA_LIST](state, payload) {
    state.qnaList = payload;
  },
  //* 선택한 이용 문의 내용 저장하기
  [mutations.SET_QNA_DETAIL](state, payload) {
    state.qnaDetail = payload;
  },
  //* 이용 문의 리스트 검색조건 저장하기
  [mutations.SET_QNA_SRCH_PARAM](state, payload) {
    state.srchParam = payload;
  },
  //* 로그인 중인 사용자 정보 저장하기
  [mutations.SET_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  //* 댓글 리스트 저장하기
  [mutations.SET_QNA_REPLY_LIST](state, payload) {
    state.qnaReplyList = payload;
  },
  //* 다운로드할 이용문의 EXCEL 데이터 저장
  [mutations.SET_QNA_EXCEL_DATA](state, payload) {
    state.qnaExcelData = payload;
  },
  //* VALIDATE ERROR 저장
  [mutations.SET_QNA_ERRORS](state, payload) {
    state.errors = payload;
  },
};
