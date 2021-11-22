import { common } from '@/utils';
import { errorEventHandler } from '@/errors';
import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  //* 부서 리스트 가져오기
  async [actions.FETCH_DEPT_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getDeptList.do',
        params,
      );
      commit(mutations.SET_DEPT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_DEPT_USER_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getComUserDeptList.do',
        params,
      );
      commit(mutations.SET_DEPT_USER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 코드 리스트 데이터 초기화
  [actions.INIT_DEPT_USER_LIST]({ commit }, params) {
    commit(mutations.SET_DEPT_USER_LIST, params);
  },
  //* DEPT 부서 추가.
  async [actions.INSERT_DEPT_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/system/saveDeptInfo.do', params);
      common.alert('success', 'NLS0000012');
      const param = {
        srchCountryCd: params.country,
      };
      dispatch(actions.FETCH_DEPT_LIST, param);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* DEPT 직원 추가.
  async [actions.UPDATE_DEPT_USER_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/system/saveDeptUserList.do', params);
      const param = {
        srchCountryCd: params.country,
        srchDeptId: params.deptId,
      };
      dispatch(actions.FETCH_DEPT_USER_LIST, param);
      //추가되었습니다
      common.alert('success', 'NLS0000013');
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_DEPT_TREE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/system/saveDeptTree.do', params);
      const param = {
        srchCountryCd: params.country,
      };
      dispatch(actions.FETCH_DEPT_LIST, param);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 부서코드 중복체크
  async [actions.FETCH_DEPT_CODE]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getDeptCode.do',
        params,
      );
      commit(mutations.SET_DEPT_CODE, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 부서 상세정보 저장/초기화
  [actions.INIT_DEPT_INFO]({ commit }, payload) {
    commit(mutations.SET_DEPT_INFO, payload);
  },
  //* 부서 추가 팝업
  [actions.INIT_VIEWS_SRCH_DEPT_TREE]({ commit }, payload) {
    commit(mutations.SET_VIEWS_SRCH_DEPT_TREE, payload);
  },
  //* 연계부서 불러오기
  async [actions.FETCH_ASSIGNED_DEPT]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getAssignedDept.do',
        params,
      );
      commit(mutations.SET_ASSIGNED_DEPT, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 연계부서 추가
  async [actions.UPDATE_ASSIGNED_DEPT]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/updateAssignedDept.do',
        params,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_ASSIGNED_DEPT, { deptId: params.deptId });
        //* 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 연계부서 삭제
  async [actions.DELETE_ASSIGNED_DEPT]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/deleteAssignedDept.do',
        params,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_ASSIGNED_DEPT, { deptId: params.deptId });
        //* 삭제되었습니다.
        common.alert('success', 'NLS0000002');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 연계부서 초기화
  [actions.INIT_ASSIGNED_DEPT]({ commit }, payload) {
    commit(mutations.SET_ASSIGNED_DEPT, payload);
  },
  [actions.INIT_DEL_DEPT_HIDE]({ commit }, payload) {
    commit(mutations.SET_DEL_DEPT_HIDE, payload);
  },
};
