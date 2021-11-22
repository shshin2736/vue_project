import { common } from '@/utils';
import { errorEventHandler } from '@/errors';
import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  //* KPI 속성 리스트 가져오기
  async [actions.FETCH_KPI_ATTRIBUTE_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getKpiAttrList.do',
        params,
      );
      commit(mutations.SET_KPI_ATTRIBUTE_LIST, data.data);
      commit(mutations.SET_SRCH_PARAM, params);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 속성 DETAIL 가져오기
  async [actions.FETCH_KPI_ATTRIBUTE_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getKpiAttrInfo.do',
        params,
      );
      commit(mutations.SET_KPI_ATTRIBUTE_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 속성명 중복체크
  async [actions.FETCH_KPI_ATTRIBUTE_CHECK]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getKpiAttrInfo.do',
        params,
      );
      commit(mutations.SET_KPI_ATTRIBUTE_CHECK, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 속성 저장
  async [actions.UPDATE_KPI_ATTRIBUTE_INFO](_, params) {
    try {
      axiosInstance.post('api/system/saveKpiAttrInfo.do', params);
      //저장되었습니다
      common.alert('success', 'NLS0000012');
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 속성 삭제
  async [actions.DELETE_KPI_ATTRIBUTE_INFO](_, params) {
    try {
      axiosInstance.post('api/system/deleteKpiAttrInfo.do', params);
      //삭제되었습니다
      common.alert('success', 'NLS0000002');
    } catch (error) {
      errorEventHandler(error);
    }
  },
};
