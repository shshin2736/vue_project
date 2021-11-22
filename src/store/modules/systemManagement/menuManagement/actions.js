import { errorEventHandler } from '@/errors';
import { common } from '@/utils';
import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';

export default {
  //* 메뉴 리스트 가져오기
  async [actions.FETCH_MENU_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getMenuList.do',
        params,
      );
      commit(mutations.SET_MENU_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: UPDATE_MENU_LIST
  //* 메뉴리스트 수정
  async [actions.UPDATE_MENU_LIST]({ dispatch }, params) {
    try {
      // await axiosInstance.post('api/system/saveMenu.do', params);
      const { data } = await axiosInstance.post(
        'api/system/saveMenu.do',
        params,
      );
      dispatch(actions.FETCH_MENU_LIST, {});
      //저장되었습니다
      common.alert('success', 'NLS0000012');
      return data.data.data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: UPDATE_MENU_TREE
  //* Menu Tree 순서변경
  async [actions.UPDATE_MENU_TREE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/system/saveMenuTree.do', params);
      dispatch(actions.FETCH_MENU_LIST, {});
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: UPDATE_PAGE_LIST
  //* PAGE 리스트 등록 OR 수정
  async [actions.UPDATE_PAGE_LIST]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/savePage.do',
        params,
      );
      dispatch(actions.FETCH_MENU_LIST, {});
      //저장되었습니다
      common.alert('success', 'NLS0000012');
      return data.data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: DELETE_MENU_LIST
  //* 메뉴리스트 삭제
  async [actions.DELETE_MENU_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/system/deleteMenu.do', params);
      dispatch(actions.FETCH_MENU_LIST, {});
      //삭제되었습니다
      common.alert('success', 'NLS0000002');
    } catch (error) {
      errorEventHandler(error);
    }
  },
};
