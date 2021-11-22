import { getters } from './types';

export default {
  //* 공지사항 리스트 가져오기
  [getters.GET_NOTICE_LIST](state) {
    return state.noticeList;
  },
  //* 선택한 공지사항 내용 가져오기
  [getters.GET_NOTICE_DETAIL](state) {
    return state.noticeDetail;
  },
  //* 검색 조건 가져오기
  [getters.GET_NTC_SRCH_PARAM](state) {
    return state.srchParam;
  },
};
