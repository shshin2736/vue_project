import { getters } from './types';

export default {
  //* 저장된 이용 문의 리스트 가져오기
  [getters.GET_QNA_LIST](state) {
    return state.qnaList;
  },
  //*  저장된 이용 문의 내용 가져오기
  [getters.GET_QNA_DETAIL](state) {
    return state.qnaDetail;
  },
  //* 저장된 검색 조건 가져오기
  [getters.GET_QNA_SRCH_PARAM](state) {
    return state.srchParam;
  },
  //* 저장된 로그인 중인 사용자 정보 가져오기
  [getters.GET_USER_INFO](state) {
    return state.userInfo;
  },
  //* 댓글 리스트 가져오기
  [getters.GET_QNA_REPLY_LIST](state) {
    return state.qnaReplyList;
  },
  //* 다운로드할 전략과제 EXCEL 데이터 가져오기
  [getters.GET_QNA_EXCEL_DATA](state) {
    return state.qnaExcelData;
  },
  //* VALIDATE ERROR 저장
  [getters.GET_QNA_ERRORS](state) {
    return state.errors;
  },
};
