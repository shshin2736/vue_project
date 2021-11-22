import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

export default {
  //* MBO 전체 리스트 가져오기
  async [actions.FETCH_MBO_MANAGEMENT_LIST]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/getMboManageList.do',
        payload,
      );
      commit(mutations.SET_MBO_MANAGEMET_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 단일 MBO 정보 가져오기
  async [actions.FETCH_MBO_EVAL_CONF]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/getUnityMboInfo.do',
        payload,
      );
      commit(mutations.SET_MBO_EVAL_CONF, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO관리 대상인원 내역 가져오기
  async [actions.FETCH_MBO_TARGET_LIST]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/getMboTargetList.do',
        payload,
      );
      commit(mutations.SET_MBO_TARGET_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO관리 평가대상자 가져오기
  async [actions.FETCH_MBO_EVAL_TARGET_LIST]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/getMboEvalTargetList.do',
        payload,
      );
      commit(mutations.SET_MBO_EVAL_TARGET_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO관리 드롭다운 리스트 가져오기(평가유형 , 평가 진행 상태)
  async [actions.FETCH_MBO_DROPDOWN_LIST]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/getMboManageDropdown.do',
        payload,
      );
      commit(mutations.SET_MBO_DROPDOWN_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO관리 드롭다운 리스트 가져오기(평가유형 , 평가 진행 상태)
  async [actions.FETCH_EXIST_MBO_NAME]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/getExistMboName.do',
        payload,
      );
      commit(mutations.SET_EXIST_MBO_NAME, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INSERT
  //* MBO 평가대상자 저장
  async [actions.INSERT_MBO_EVAL_TARGET_LIST]({ dispatch }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/insertMboEvalTargetList.do',
        payload,
      );
      //* 변경된 MBO 전체리스트 가져오기
      dispatch(actions.FETCH_MBO_MANAGEMENT_LIST, { country: payload.country });
      //* 변경된 MBO 대상 인원 내역
      // dispatch(actions.FETCH_MBO_TARGET_LIST, payload);
      //* 변경된 MBO 평가대상자(저장한것을 제외하고) 가져오기
      //dispatch(actions.FETCH_MBO_EVAL_TARGET_LIST, payload);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO 신규 저장
  async [actions.INSERT_NEW_MBO]({ dispatch }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/insertNewMbo.do',
        payload,
      );
      dispatch(actions.FETCH_MBO_MANAGEMENT_LIST, {
        country: payload.mboEvalConf.country,
      });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO 신규 수정
  async [actions.UPDATE_MBO]({ dispatch }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/mboManage/updateMbo.do',
        payload,
      );
      dispatch(actions.FETCH_MBO_MANAGEMENT_LIST, {
        country: payload.mboEvalConf.oldCountry,
      });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: UPDATRE
  //* MBO 평가기간 OPEN
  async [actions.UPDATE_MBO_STATUS]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/mboManage/updateMboStatus.do',
        payload,
      );
      dispatch(actions.FETCH_MBO_MANAGEMENT_LIST, {});
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 사원 MBO정보 초기화
  async [actions.UPDATE_MBO_TARGET_LIST]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/mboManage/updateMboTargetList.do',
        payload,
      );
      dispatch(actions.FETCH_MBO_TARGET_LIST, payload);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: DELETE

  async [actions.DELETE_MBO]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/mboManage/deleteMbo.do',
        payload,
      );
      //* 변경된 MBO 리스트 가져오기
      dispatch(actions.FETCH_MBO_MANAGEMENT_LIST, {});
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO 대상인원 삭제
  async [actions.DELETE_MBO_TARGET_LIST]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/mboManage/deleteMboTargetList.do',
        payload,
      );
      //* 변경된 MBO 리스트 가져오기
      dispatch(actions.FETCH_MBO_MANAGEMENT_LIST, {});
      //* 대상인원 다시 가져오기
      dispatch(actions.FETCH_MBO_TARGET_LIST, payload);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 대상 인원 내역 리스트 초기화
  [actions.INIT_MBO_TARGET_LIST]({ commit }, payload) {
    commit(mutations.SET_MBO_TARGET_LIST, payload);
  },

  //* 선택된 MBO 정보 초기화
  [actions.INIT_SELECTED_MBO_INFO]({ commit }, payload) {
    commit(mutations.SET_SELECTED_MBO_INFO, payload);
  },

  //* MBO 평가 대상자 초기화
  [actions.INIT_MBO_EVAL_TARGET_LIST]({ commit }, payload) {
    commit(mutations.SET_MBO_EVAL_TARGET_LIST, payload);
  },

  //* 부서 검색 팝업 ON/OFF 설정
  [actions.INIT_TAB_CONTENTS_MBO_TARGET]({ commit }, payload) {
    commit(mutations.SET_TAB_CONTENTS_MBO_TARGET, payload);
  },

  //* 부서 검색 팝업 ON/OFF 설정
  [actions.INIT_TAB_CONTENTS_MBO_TARGET_SETUP]({ commit }, payload) {
    commit(mutations.SET_TAB_CONTENTS_MBO_TARGET_SETUP, payload);
  },

  //* MBO 등록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MBO_REGIST_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MBO_REGIST_POPUP, payload);
  },

  //* MBO 평가 대상 설정 버튼 ON/OFF 설정
  [actions.INIT_BTN_MBO_TARGET_SETUP]({ commit }, payload) {
    commit(mutations.SET_BTN_MBO_TARGET_SETUP, payload);
  },

  //* MBO 평가 대상 기간 초기화
  [actions.INIT_MBO_EVAL_CONF]({ commit }, payload) {
    commit(mutations.SET_MBO_EVAL_CONF, payload);
  },

  //* MBO명 등록 가능 ON/OFF 설정
  [actions.INIT_BE_REGIST_NAME]({ commit }, payload) {
    commit(mutations.SET_BE_REGIST_NAME, payload);
  },

  //* MBO명 등록 불가능 ON/OFF 설정
  [actions.INIT_ALREADY_REGIST_NAME]({ commit }, payload) {
    commit(mutations.SET_ALREADY_REGIST_NAME, payload);
  },

  //*MBO 신규 저장 ON/OFF 설정
  [actions.INIT_IS_NEW_SAVE_MBO]({ commit }, payload) {
    commit(mutations.SET_IS_NEW_SAVE_MBO, payload);
  },
};
