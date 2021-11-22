import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  // TODO: FETCH Methods DECLARATION
  //* 공지사항 리스트 가져오기
  async [actions.FETCH_NOTICE_LIST]({ commit }, payload) {
    try {
      //* 공지사항 리스트 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getNoticeList.do',
        payload,
      );
      //* 공지사항 리스트 저장하기
      commit(mutations.SET_NOTICE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 공지사항 내용 가져오기
  async [actions.FETCH_NOTICE_DETAIL]({ commit }, payload) {
    try {
      //* 공지사항 내용 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getNoticeDetail.do',
        payload,
      );
      //* 공지사항 내용 저장하기
      commit(mutations.SET_NOTICE_DETAIL, data.data[0]);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods DECLARATION
  //* 새 공지사항 저장하기(인서트)
  async [actions.INSERT_NOTICE_DETAIL](_, payload) {
    try {
      //* 새 공지사항 저장하기(인서트)
      const { data } = await axiosInstance.post(
        'api/support/insertNoticeDetail.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: UPDATE Methods DECLARATION
  async [actions.UPDATE_NOTICE_DETAIL](_, payload) {
    try {
      //* 선택한 공지사항 수정하기(업데이트)
      const { data } = await axiosInstance.post(
        'api/support/updateNoticeDetail.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: DELETE Methods DECLARATION
  async [actions.DELETE_NOTICE_DETAIL](_, payload) {
    try {
      //* 선택한 공지사항 삭제하기(딜리트)
      await axiosInstance.post('api/support/deleteNoticeDetail.do', payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INIT Methods DECLARATION
  //* 공지사항 등록화면 초기화하기
  [actions.INIT_NOTICE_DETAIL]({ commit }, payload) {
    commit(mutations.SET_NOTICE_DETAIL, payload);
  },
  //* 공지사항 리스트 검색조건 초기화하기
  [actions.INIT_NTC_SRCH_PARAM]({ commit }, payload) {
    commit(mutations.SET_NTC_SRCH_PARAM, payload);
  },
};
