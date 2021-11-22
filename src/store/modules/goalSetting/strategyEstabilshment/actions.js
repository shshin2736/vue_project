import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';

//* 다른 vuex모듈 접근 step.1
// import {
//   rootActions,
//   rootMutations,
// } from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

export default {
  // [actions.FETCH_MANAGER_LIST]({ commit, dispatch }, payload) {
  //   try {
  //     // TODO: 데이터 가져오기
  //     //* 다른 vuex모듈 접근 step.2 ex)
  //     dispatch(rootActions.FETCH_KPI_SEARCH_LIST, null, { root: true });
  //     commit(rootMutations.SET_VIEWS_FILES_UPLOAD_POPUP, null, { root: true });

  //     //* 내부 vuex모듈 접근 ex)
  //     dispatch(actions.FETCH_ASSIGNMENT_LIST, null);
  //     commit(mutations.SET_ASSIGNMENT_INFO, null);

  //   } catch (error) {
  //     errorEventHandler(error);
  //   }
  // },

  // TODO: FETCH Methods DECLARATION
  //* 전략 과제 리스트 가져오기
  async [actions.FETCH_STRATEGY_ESTABILSHMENT_LIST]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/strategy/getStrategyList.do',
        payload,
      );
      commit(mutations.SET_STRATEGY_ESTABILSHMENT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 선택한 전략과제 연결정보(과제,KPI) 가져오기
  async [actions.FETCH_STRATEGY_ESTABILSHMENT_CONNECT_LIST](
    { commit },
    payload,
  ) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/strategy/getStrategyConnectList.do',
        payload,
      );
      commit(mutations.SET_STRATEGY_ESTABILSHMENT_CONNECT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 선택한 단일 전략과제 정보 및 하위정보(연결과제,KPI) 가져오기
  async [actions.FETCH_STRATEGY_ESTABILSHMENT_ITEM]({ commit }, payload) {
    //_,
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/strategy/getStrategyItem.do',
        payload,
      );
      commit(mutations.SET_STRATEGY_ESTABILSHMENT_ITEM, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 자신의 하위 부서정보 가져오기
  async [actions.FETCH_MY_LOW_DEPT_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/strategy/getMyLowDeptInfo.do',
        payload,
      );
      commit(mutations.SET_MY_LOW_DEPT_INFO, data.data);
      // TODO: 데이터 가져오기
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 팝업창에서 검색한 KPI 리스트 가져오기
  async [actions.FETCH_KPI_SEARCH_LIST]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/strategy/getKpiPoolList.do',
        payload,
      );
      commit(mutations.SET_KPI_SEARCH_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //*  전략과제 업로드 EXCEL 양식 가져오기
  async [actions.FETCH_UPLOAD_EXCEL_FORM]({ commit }, payload) {
    try {
      // TODO: 데이터 가져오기
      // dispatch(rootActions.INIT_VIEWS_SPINNER, true, { root: true });
      const { data } = await axiosInstance.post(
        'api/strategy/getUploadExcelForm.do',
        payload,
      );
      // dispatch(rootActions.INIT_VIEWS_SPINNER, false, { root: true });
      commit(mutations.SET_UPLOAD_EXCEL_FORM, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 파일 정보 가져오기
  // [actions.FETCH_FILE_LIST]({ commit }, payload) {
  //   try {
  //     // TODO: 데이터 가져오기
  //   } catch (error) {
  //     errorEventHandler(error);
  //   }
  // },

  // TODO: INSERT Methods DECLARATION
  //* 전략 수립 등록
  async [actions.INSERT_STRATEGY_ESTABILSHMENT_ITEM](_, payload) {
    // TODO: 데이터 인서트
    const { data } = await axiosInstance.post(
      'api/strategy/insertStrategy.do',
      payload,
    );
    return data;
    // dispatch(actions.FETCH_STRATEGY_ESTABILSHMENT_LIST, {});
  },
  //* 전략과제 수정
  async [actions.UPDATE_STRATEGY_ESTABILSHMENT_ITEM](_, payload) {
    try {
      // TODO: 데이터 업데이트
      const { data } = await axiosInstance.post(
        'api/strategy/updateStrategy.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 전년도 전략체계도 복사
  async [actions.UPDATE_LAST_STG]({ dispatch }, payload) {
    try {
      const {
        data: { result },
      } = await axiosInstance.post('api/strategy/copyLastStg.do', payload);
      let res = false;
      if (result === 'T') {
        dispatch(actions.FETCH_STRATEGY_ESTABILSHMENT_LIST, {
          baseYYYY: payload.baseYyyy,
          deptId: payload.parentDeptId,
        });
        res = true;
      }
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 전략과제 리스트 드래그 앤 드롭
  // TODO: UPDATE Methods DECLARATION
  async [actions.UPDATE_STRATEGY_ESTABILSHMENT_LIST](_, payload) {
    try {
      // TODO: 데이터 업데이트
      await axiosInstance.post('api/strategy/updateStrategyList.do', payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: DELETE Methods DECLARATION
  //* 전략과제 삭제
  async [actions.DELETE_STRATEGY_ESTABILSHMENT_ITEM](_, payload) {
    try {
      // TODO: 데이터 업데이트
      const { data } = await axiosInstance.post(
        'api/strategy/deleteStrategy.do',
        payload,
      );
      return data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 상위 부서 조회
  async [actions.FETCH_UPPER_DEPT]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/strategy/getUpperDept.do',
        payload,
      );
      commit(mutations.SET_UPPER_DEPT, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INIT Methods DECLARATION
  //* 전략 수립 목록 초기화
  [actions.INIT_STRATEGY_ESTABILSHMENT_LIST]({ commit }, payload) {
    commit(mutations.SET_STRATEGY_ESTABILSHMENT_LIST, payload);
  },
  //* 전략 과제 연결 리스트 초기화
  [actions.INIT_STRATEGY_ESTABILSHMENT_CONNECT_LIST]({ commit }, payload) {
    commit(mutations.SET_STRATEGY_ESTABILSHMENT_CONNECT_LIST, payload);
  },

  //* 전략 과제 아이템 초기화
  [actions.INIT_STRATEGY_ESTABILSHMENT_ITEM]({ commit }, payload) {
    commit(mutations.SET_STRATEGY_ESTABILSHMENT_ITEM, payload);
  },

  //* KPI 정보 초기화
  [actions.INIT_KPI_INFO]({ commit }, payload) {
    commit(mutations.SET_KPI_INFO, payload);
  },
  //* KPI 검색 정보 초기화
  [actions.INIT_KPI_SEARCH_LIST]({ commit }, payload) {
    commit(mutations.SET_KPI_SEARCH_LIST, payload);
  },
  //* 파일 정보 초기화
  [actions.INIT_FILE_LIST]({ commit }, payload) {
    commit(mutations.SET_FILE_LIST, payload);
  },
  //* KPI 검색 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_SEARCH_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_SEARCH_POPUP, payload);
  },
  //* 부서 검색 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_DEPARTMENT_SEARCH_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DEPARTMENT_SEARCH_POPUP, payload);
  },
  //* 담당자 검색 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MANAGER_SEARCH_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MANAGER_SEARCH_POPUP, payload);
  },
  //* 파일 업로드 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_FILES_UPLOAD_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_FILES_UPLOAD_POPUP, payload);
  },
  //* 전략과제 신규/수정 form 유효성
  [actions.INIT_INPUT_STRATEGY_INVALID]({ commit }, payload) {
    commit(mutations.SET_INPUT_STRATEGY_INVALID, payload);
  },
  //* 전략과제 excel Data 설정
  [actions.INIT_STRATEGY_EXCEL_DATA]({ commit }, payload) {
    commit(mutations.SET_STRATEGY_EXCEL_DATA, payload);
  },
  //* 전략과제 EXCEL 업로드 양식 저장
  [actions.INIT_UPLOAD_EXCEL_FORM]({ commit }, payload) {
    commit(mutations.SET_UPLOAD_EXCEL_FORM, payload);
  },
  //* 전략과제 조회시 검색 정보 설정
  [actions.INIT_STG_SEARCH_INFO]({ commit }, payload) {
    commit(mutations.SET_STG_SEARCH_INFO, payload);
  },
  //* 그리드 드래그온 드롭 ON/OFF
  [actions.INIT_IS_GRID_DRAG]({ commit }, payload) {
    commit(mutations.SET_IS_GRID_DRAG, payload);
  },
};
