import { common } from '@/utils';
import { errorEventHandler } from '@/errors';
import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  //* 그룹 코드 가져오기
  async [actions.FETCH_GRP_CODE_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getCodeGroupList.do',
        params,
      );
      commit(mutations.SET_SRCH_PARAM, params);
      commit(mutations.SET_GRP_CODE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* GRP 코드 가져오기(중복체크)
  async [actions.FETCH_GRP_CODE]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getGrpCode.do',
        params,
      );
      commit(mutations.SET_GRP_CODE, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 그룹 코드 등록
  async [actions.INSERT_GRP_CODE_LIST](_, params) {
    try {
      await axiosInstance.post('api/system/saveCodeGroup.do', params);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 코드 리스트 가져오기
  async [actions.FETCH_CODE_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getCodeList.do',
        params,
      );
      commit(mutations.SET_CODE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 코드 리스트 등록
  async [actions.INSERT_CODE_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/system/saveCode.do', params);
      dispatch(actions.FETCH_CODE_LIST, {
        grpCd: params.grpCd,
        cd: '',
      });
      //저장되었습니다
      common.alert('success', 'NLS0000012');
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* code info 팝업 on/off
  [actions.INIT_VIEWS_CODE_INFO_POPUP]({ commit }, params) {
    commit(mutations.SET_VIEWS_CODE_INFO_POPUP, params);
  },
  //* 코드 리스트 데이터 초기화
  [actions.INIT_CODE_LIST]({ commit }, params) {
    commit(mutations.SET_CODE_LIST, params);
  },
  // CODE_INFO
  //* 코드 INFO 데이터 초기화
  [actions.INIT_CODE_INFO]({ commit }, params) {
    commit(mutations.SET_CODE_INFO, params);
  },
};
