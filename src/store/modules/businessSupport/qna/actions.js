import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  // TODO: FETCH Methods DECLARATION
  //* 게시글 조회수 증가하기
  async [actions.UPDATE_SH_COUNT](_, payload) {
    try {
      await axiosInstance.post('api/support/updateShCount.do', payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 이용 문의 리스트 가져오기
  async [actions.FETCH_QNA_LIST]({ commit }, payload) {
    try {
      //* 이용 문의 리스트 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getQnaList.do',
        payload,
      );
      //* 이용 문의 리스트 저장하기
      commit(mutations.SET_QNA_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 이용 문의 내용 가져오기
  async [actions.FETCH_QNA_DETAIL]({ commit }, payload) {
    try {
      //* 이용 문의 내용 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getQnaDetail.do',
        payload,
      );
      //* 이용 문의 내용 저장하기
      commit(mutations.SET_QNA_DETAIL, data.data);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 댓글 리스트 가져오기
  async [actions.FETCH_QNA_REPLY_LIST]({ commit }, payload) {
    try {
      //* 댓글 리스트 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getQnaReplyList.do',
        payload,
      );
      commit(mutations.SET_QNA_REPLY_LIST, data.data);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 다운로드할 이용문의 EXCEL 데이터 가져오기
  async [actions.FETCH_QNA_EXCEL_DATA]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getQnaExcelData.do',
        payload,
      );
      commit(mutations.SET_QNA_EXCEL_DATA, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods DECLARATION
  //* 새 이용 문의 저장하기(서버에 저장)
  async [actions.INSERT_QNA_DETAIL](_, payload) {
    try {
      //* 새 이용 문의 저장하기(서버에 저장)
      const { data } = await axiosInstance.post(
        'api/support/insertQnaDetail.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 댓글 리스트 저장하기 (서버에 저장)
  async [actions.INSERT_QNA_REPLY](_, payload) {
    try {
      //* 댓글 리스트 저장하기(서버에 저장)
      const { data } = await axiosInstance.post(
        'api/support/insertQnaReply.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: UPDATE Methods DECLARATION
  async [actions.UPDATE_QNA_DETAIL](_, payload) {
    try {
      //* 선택한 이용 문의 수정하기(업데이트)
      const { data } = await axiosInstance.post(
        'api/support/updateQnaDetail.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_QNA_STATUS_A](_, payload) {
    try {
      //* 운영자 이용 문의 조회 시 문의접수 상태로 업데이트
      const { data } = await axiosInstance.post(
        'api/support/updateQnaStatusA.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_QNA_STATUS_C](_, payload) {
    try {
      //* 운영자 이용 문의 답변 시 답변완료 상태로 업데이트
      const { data } = await axiosInstance.post(
        'api/support/updateQnaStatusC.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_QNA_REPLY](_, payload) {
    try {
      //* 선택한 이용 문의 수정하기(업데이트)
      const { data } = await axiosInstance.post(
        'api/support/updateQnaReply.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: DELETE Methods DECLARATION
  async [actions.DELETE_QNA_DETAIL]({ dispatch }, payload) {
    try {
      //* 선택한 이용 문의 삭제하기(딜리트)
      const { data } = await axiosInstance.post(
        'api/support/deleteQnaDetail.do',
        payload,
      );
      dispatch(actions.FETCH_QNA_LIST, {});
      return data;
    } catch (error) {
      errorEventHandler('error');
    }
  },
  async [actions.DELETE_QNA_REPLY](_, payload) {
    try {
      //* 선택한 팀 게시판 삭제하기(딜리트)
      const { data } = await axiosInstance.post(
        'api/support/deleteQnaReply.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler('error');
    }
  },
  // TODO: INIT Methods DECLARATION
  //* 이용 문의 리스트 초기화하기 (스토어 초기화)
  [actions.INIT_QNA_LIST]({ commit }, payload) {
    commit(mutations.SET_QNA_LIST, payload);
  },
  //* 이용 문의 등록화면 초기화하기 (스토어 초기화)
  [actions.INIT_QNA_DETAIL]({ commit }, payload) {
    commit(mutations.SET_QNA_DETAIL, payload);
  },
  //* 이용 문의 리스트 검색조건 초기화하기
  [actions.INIT_QNA_SRCH_PARAM]({ commit }, payload) {
    commit(mutations.SET_QNA_SRCH_PARAM, payload);
  },
  //* 팀 게시판 리스트 검색조건 초기화하기
  [actions.INIT_QNA_REPLY_LIST]({ commit }, payload) {
    commit(mutations.SET_QNA_REPLY_LIST, payload);
  },
  //* 이용문의 EXCEL DATA 설정
  [actions.INIT_QNA_EXCEL_DATA]({ commit }, payload) {
    commit(mutations.SET_QNA_EXCEL_DATA, payload);
  },
  //* VALIDATE ERROR 저장
  [actions.INIT_QNA_ERRORS]({ commit }, payload) {
    commit(mutations.SET_QNA_ERRORS, payload);
  },
};
