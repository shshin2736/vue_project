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
  //* 팀 일정 리스트 가져오기
  async [actions.FETCH_TEAM_SCHEDULE_LIST]({ commit }, payload) {
    try {
      //* 팀 일정 리스트 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getTeamScheduleList.do',
        payload,
      );
      //* 팀 일정 리스트 저장하기
      commit(mutations.SET_TEAM_SCHEDULE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 팀 일정 내용 가져오기
  async [actions.FETCH_TEAM_SCHEDULE_DETAIL]({ commit }, payload) {
    try {
      //* 팀 일정 내용 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getTeamScheduleDetail.do',
        payload,
      );
      //* 팀 게시판 내용 저장하기
      commit(mutations.SET_TEAM_SCHEDULE_DETAIL, data.data);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 댓글 리스트 가져오기
  async [actions.FETCH_REPLY_LIST]({ commit }, payload) {
    try {
      //* 댓글 리스트 가져오기
      const { data } = await axiosInstance.post(
        'api/support/getReplyList.do',
        payload,
      );
      commit(mutations.SET_REPLY_LIST, data.data);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods DECLARATION
  //* 새 팀 게시판 저장하기(서버에 저장)
  async [actions.INSERT_TEAM_BOARD_DETAIL](_, payload) {
    try {
      //* 새 팀 게시판 저장하기(서버에 저장)
      const { data } = await axiosInstance.post(
        'api/support/insertTeamBoardDetail.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 댓글 리스트 저장하기 (서버에 저장)
  async [actions.INSERT_REPLY]({ dispatch }, payload) {
    try {
      //* 댓글 리스트 저장하기(서버에 저장)
      const { data } = await axiosInstance.post(
        'api/support/insertReply.do',
        payload,
      );
      dispatch(actions.FETCH_REPLY_LIST, { bdId: payload.bdId });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: UPDATE Methods DECLARATION
  async [actions.UPDATE_TEAM_BOARD_DETAIL]({ dispatch }, payload) {
    try {
      //* 선택한 팀 게시판 수정하기(업데이트)
      const { data } = await axiosInstance.post(
        'api/support/updateTeamBoardDetail.do',
        payload,
      );
      dispatch(actions.FETCH_TEAM_SCHEDULE_LIST, {});
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: DELETE Methods DECLARATION
  async [actions.DELETE_TEAM_BOARD_DETAIL]({ dispatch }, payload) {
    try {
      //* 선택한 팀 게시판 삭제하기(딜리트)
      const { data } = await axiosInstance.post(
        'api/support/deleteTeamBoardDetail.do',
        payload,
      );
      dispatch(actions.FETCH_TEAM_SCHEDULE_LIST, {});
      return data;
    } catch (error) {
      errorEventHandler('error');
    }
  },
  async [actions.DELETE_REPLY]({ dispatch }, payload) {
    try {
      //* 선택한 팀 게시판 삭제하기(딜리트)
      const { data } = await axiosInstance.post(
        'api/support/deleteReply.do',
        payload,
      );
      dispatch(actions.FETCH_REPLY_LIST, { bdId: payload.bdId });
      return data;
    } catch (error) {
      errorEventHandler('error');
    }
  },
  // TODO: INIT Methods DECLARATION
  //* 팀 게시판 등록화면 초기화하기 (스토어 초기화)
  [actions.FETCH_TEAM_SCHEDULE_DETAIL]({ commit }, payload) {
    commit(mutations.SET_TEAM_SCHEDULE_DETAIL, payload);
  },
  //* 팀 게시판 리스트 검색조건 초기화하기 (스토어 초기화)
  [actions.INIT_TBD_SRCH_PARAM]({ commit }, payload) {
    commit(mutations.SET_TBD_SRCH_PARAM, payload);
  },
  //* 팀 게시판 댓글 초기화하기 (스토어 초기화)
  [actions.INIT_REPLY_LIST]({ commit }, payload) {
    commit(mutations.SET_REPLY_LIST, payload);
  },
  [actions.INIT_TBD_ERRORS]({ commit }, payload) {
    commit(mutations.SET_TBD_ERRORS, payload);
  },
  [actions.INIT_TBD_UPLOAD_FILE]({ commit }, payload) {
    commit(mutations.SET_TBD_UPLOAD_FILE, payload);
  },
};
