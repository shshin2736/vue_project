//import { common } from '@/utils';
import { errorEventHandler } from '@/errors';
import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  // TODO: FETCH Methods declaration

  //* 일반과제 상세 정보 가져오기
  async [actions.FETCH_GNL_PRJ_MAIN]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/getGnlPrjMain.do',
        params,
      );
      commit(mutations.SET_GNL_PRJ_MAIN, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 과제실행 목록 리스트 가져오기
  async [actions.FETCH_GNL_TASK_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/getGnlTaskList.do',
        params,
      );
      commit(mutations.SET_GNL_TASK_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 선택한 Task 상세정보 가져오기
  async [actions.FETCH_SELECTED_GNL_TASK]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/getUnitTaskInfo.do',
        params,
      );
      commit(mutations.SET_SELECTED_GNL_TASK, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 즉실천 상세정보 가져오기
  async [actions.FETHC_PRJ_ACTION]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/getPrjAction.do',
        params,
      );
      commit(mutations.SET_PRJ_ACTION, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 즉실천 상세정보 가져오기
  async [actions.FETCH_CONN_PRJ_ID]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/getConnPrjId.do',
        params,
      );
      commit(mutations.SET_CONN_PRJ_ID, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INSERT Methods declaration
  //* 신규 일반과제 INSERT
  async [actions.INSERT_NEW_PRJ_MAIN](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/insertNewPrjMain.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 신규 Task INSERT
  async [actions.INSERT_NEW_UNIT_TASK](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/insertUnitTask.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 신규 즉실천 등록
  async [actions.INSERT_NEW_PRJ_ACTION](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/insertPrjAction.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO : UPDATE Methods declartion

  //* 일반과제 Update
  async [actions.UPDATE_PRJ_MAIN](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/updatePrjMain.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 단일 Task Update
  async [actions.UPDATE_UNIT_TASK](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/updateUnitTask.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 복수 Task 상태 변경
  async [actions.UPDATE_TASK_LIST_STATUS]({ dispatch }, params) {
    try {
      await axiosInstance.post(
        'api/generalTask/updateTaskListStatus.do',
        params,
      );
      dispatch(actions.FETCH_GNL_TASK_LIST, params);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* TaskList 업데이트(드래그 앤 드롭)
  async [actions.UPDATE_TASK_LIST](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/updateTaskList.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 즉실천 update
  async [actions.UPDATE_PRJ_ACTION](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/updatePrjAction.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* task 완료 처리
  async [actions.UPDATE_TASK_COMPLETE](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/updateTaskComplete.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: DELETE Methods declartion

  //* 일반과제 삭제
  async [actions.DELETE_PRJ_MAIN](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/deletePrjMain.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* Task 삭제
  async [actions.DELETE_GNL_TASK]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/deleteGnlTask.do',
        params,
      );
      dispatch(actions.FETCH_GNL_TASK_LIST, params);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 즉실천 삭제
  async [actions.DELETE_PRJ_ACTION](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/generalTask/deletePrjAction.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INIT Methods declaration

  //* 일반과제 상세정보 초기화
  [actions.INIT_GNL_PRJ_MAIN]({ commit }, payload) {
    commit(mutations.SET_GNL_PRJ_MAIN, payload);
  },

  //* Task 리스트 초기화
  [actions.INIT_GNL_TASK_LIST]({ commit }, payload) {
    commit(mutations.SET_GNL_TASK_LIST, payload);
  },

  //* 신규일반 과제 등록인지 확인하는 Boolean 가져오기
  [actions.INIT_IS_NEW_GNL_TASK]({ commit }, payload) {
    commit(mutations.SET_IS_NEW_GNL_TASK, payload);
  },

  //* TASK 상세 팝업 ON/OFF 설정
  [actions.INIT_TASK_DETAIL_POPUP]({ commit }, payload) {
    commit(mutations.SET_TASK_DETAIL_POPUP, payload);
  },

  //* 일반과제ID 초기화
  [actions.INIT_PRJ_ID]({ commit }, payload) {
    commit(mutations.SET_PRJ_ID, payload);
  },

  //* 선택한 Task 상세 정보 초기화
  [actions.INIT_SELECTED_GNL_TASK]({ commit }, payload) {
    commit(mutations.SET_SELECTED_GNL_TASK, payload);
  },

  //* 신규 즉실천 or 수정 즉실천 Boolean 초기화
  [actions.INIT_IS_NEW_ACTION]({ commit }, payload) {
    commit(mutations.SET_IS_NEW_ACTION, payload);
  },

  //* 즉실천 상세정보 초기화
  [actions.INIT_PRJ_ACTION]({ commit }, payload) {
    commit(mutations.SET_PRJ_ACTION, payload);
  },
};
