import { errorEventHandler } from '@/errors';
import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  // TODO: FETCH Methods declaration
  //* MBO 현황 정보가져오기
  async [actions.FETCH_MBO_CURR_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/getMboCurrentInfo.do',
        params,
      );
      if (params.hasOwnProperty('idx')) data.data.mboCrrInfo.idx = params.idx;
      commit(mutations.SET_MBO_CURR_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* MBO 목록 리스트 가져오기
  async [actions.FETCH_MBO_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/getMboList.do',
        params,
      );
      commit(mutations.SET_MBO_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* MBO명 DROPDOWN 리스트 가져오기
  async [actions.FETCH_MBO_NAME_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/getMboNameList.do',
        params,
      );
      commit(mutations.SET_MBO_NAME_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* MBO 수정목표 DATA
  async [actions.FETCH_MBO_MODIFY_TARGET_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/getMboModifyTargetInfo.do',
        params,
      );
      commit(mutations.SET_MBO_MODIFY_TARGET_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* MBO 항목(KPI) 조회
  async [actions.FETCH_MBO_KPI_POOL_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/getMboKpiPoolList.do',
        params,
      );
      commit(mutations.SET_MBO_KPI_POOL_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INSERT Methods declation
  //* MBO 항목 > KPI 추가
  async [actions.INSERT_MBO_KPI_LIST]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/insertMboKpiList.do',
        params,
      );
      dispatch(actions.FETCH_MBO_CURR_INFO, {
        baseYYYY: params.baseYYYY,
        userId: params.mboUserId,
        deptId: params.mboUserDeptId,
      });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods declation

  // TODO : UPDATE Methods declation
  //* MBO 승인상태 변경(승인요청 , 승인, 반려)
  async [actions.UPDATE_MBO_APV_STATUS](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/updateMboApvStatus.do',
        params,
      );
      // dispatch(actions.FETCH_MBO_CURR_INFO, {
      //   baseYyyy: params.baseYYYY,
      //   userId: params.mboCrrInfo.mboUserId,
      //   deptId: params.mboCrrInfo.mboUserDeptId,
      // });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO 목표수정 (승인요청, 승인, 반려)
  async [actions.UPDATE_MBO_TARGET_STATUS](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/updateMboTargetStauts.do',
        params,
      );
      // dispatch(actions.FETCH_MBO_CURR_INFO, {
      //   baseYyyy: params.baseYYYY,
      //   userId: params.mboCrrInfo.mboUserId,
      //   deptId: params.mboCrrInfo.mboUserDeptId,
      // });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO 승인상태 초기화 (관리자 기능);
  async [actions.UPDATE_INIT_MBO_APV_STATUS](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/updateInitMboApvStatus.do',
        params,
      );
      // dispatch(actions.FETCH_MBO_CURR_INFO, {
      //   baseYyyy: params.baseYYYY,
      //   userId: params.mboCrrInfo.mboUserId,
      //   deptId: params.mboCrrInfo.mboUserDeptId,
      // });
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //*KPI 월목표 저장
  async [actions.UPDATE_MBO_KPI_TARGET_MONTH_DATA](_, payload) {
    try {
      const data = await axiosInstance.post(
        'api/mbo/saveMboKpiTargetMonthData.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //*KPI 주목표 저장
  async [actions.UPDATE_MBO_KPI_TARGET_WEEK_DATA](_, payload) {
    try {
      const data = await axiosInstance.post(
        'api/mbo/saveKpiTargetWeekData.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: SAVE Methods declation
  //* MBO 현황 > 저장
  async [actions.SAVE_MBO](_, params) {
    try {
      const { data } = await axiosInstance.post('api/mbo/saveMbo.do', params);
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* MBO 현황 > 저장
  async [actions.SAVE_MBO_OPER_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/mbo/saveMboOperList.do', params);
      dispatch(actions.FETCH_MBO_CURR_INFO, {
        baseYyyy: params.baseYYYY,
        userId: params.mboCrrInfo.mboUserId,
        deptId: params.mboCrrInfo.mboUserDeptId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: DELETE Methods declaration
  //* MBO 현황 > KPI 삭제
  async [actions.DELETE_MBO_KPI](_, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/mbo/deleteMboKpi.do',
        params,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INIT Methods declaration
  //* MBO 수정목표 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MBO_MODIFY_TARGET_POP]({ commit }, params) {
    commit(mutations.SET_VIEWS_MBO_MODIFY_TARGET_POP, params);
  },

  //* MBO 항목(KPI) 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MBO_KPI_POPUP]({ commit }, params) {
    commit(mutations.SET_VIEWS_MBO_KPI_POPUP, params);
  },

  //* MBO 항목(KPI) 조회 설정
  [actions.INIT_MBO_KPI_POOL_LIST]({ commit }, params) {
    commit(mutations.SET_MBO_KPI_POOL_LIST, params);
  },

  // //* 선택한 MBO 항목(KPI) 조회 설정
  // [actions.INIT_IS_SELECTED_NEW_KPI]({ commit }, params) {
  //   commit(mutations.SET_IS_SELECTED_NEW_KPI, params);
  // },

  //* MBO 현황탭 ON/OFF 저장
  [actions.INIT_MBO_BOARD_TAB]({ commit }, params) {
    commit(mutations.SET_MBO_BOARD_TAB, params);
  },
  //* MBO 목록탭 ON/OFF 저장
  [actions.INIT_MBO_LIST_TAB]({ commit }, params) {
    commit(mutations.SET_MBO_LIST_TAB, params);
  },
  //* 선택한 수정목표 MBO 항목 초기화
  [actions.INIT_SELECTED_TARGET_MBO_KPI]({ commit }, params) {
    commit(mutations.SET_SELECTED_TARGET_MBO_KPI, params);
  },
  //* 목표를 수정한 MBO KPI
  [actions.INIT_CHANGED_TARGET_MBO_KPI]({ commit }, params) {
    commit(mutations.SET_CHANGED_TARGET_MBO_KPI, params);
  },

  //* MBO목록에서 선택한 MBO 정보
  [actions.INIT_SELECTED_MBO_INFO]({ commit }, params) {
    commit(mutations.SET_SELECTED_MBO_INFO, params);
  },
};
