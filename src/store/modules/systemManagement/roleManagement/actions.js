import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { common } from '@/utils';
import { errorEventHandler } from '@/errors';

export default {
  async [actions.FETCH_USER_ROLE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getRoleList.do',
        payload,
      );
      commit(mutations.SET_USER_ROLE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_ROLE]({ dispatch }, payload) {
    try {
      await axiosInstance.post('api/system/saveRole.do', payload);
      if (payload.flag === 'edit') {
        common.alert('success', 'NLS0000012'); //저장되었습니다.
      } else {
        common.alert('success', 'NLS0000013'); //추가되었습니다.
      }
      dispatch(actions.FETCH_USER_ROLE_LIST, {});
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.DELETE_ROLE]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/deleteRole.do',
        payload,
      );
      if (data.result === 'T') {
        //삭제되었습니다.
        common.alert('success', 'NLS0000002');
      }
      dispatch(actions.FETCH_USER_ROLE_LIST, {});
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_ROLE_MEMU_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getRoleMenuList.do',
        payload,
      );
      commit(mutations.SET_ROLE_MENU_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_ROLE_MEMU_LIST]({ dispatch }, payload) {
    try {
      await axiosInstance.post('api/system/saveRoleMenu.do', payload);
      //저장되었습니다.
      common.alert('success', 'NLS0000012');
      dispatch(actions.FETCH_ROLE_MEMU_LIST, { roleId: payload.roleId });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_VIEWS_ROLE_ADD_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ROLE_ADD_POPUP, payload);
  },
  [actions.INIT_ROLE_INFO]({ commit }, payload) {
    commit(mutations.SET_ROLE_INFO, payload);
  },
  [actions.INIT_VIEWS_MENU_ADD_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MENU_ADD_POPUP, payload);
  },
  async [actions.FETCH_ROLE_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getRole.do',
        payload,
      );
      commit(mutations.SET_ROLE_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_SELECTED_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_DATA, payload);
  },
  async [actions.DELETE_ROLE_MENU]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/deleteRoleMenuAssigment.do',
        payload,
      );
      dispatch(actions.FETCH_ROLE_MEMU_LIST, { roleId: payload.roleId });
      if (data.result === 'T') {
        //삭제되었습니다.
        common.alert('success', 'NLS0000002');
      }
    } catch (e) {
      errorEventHandler(e);
    }
  },
  [actions.INIT_ROLE_MENU_LIST]({ commit }, payload) {
    commit(mutations.SET_ROLE_MENU_LIST, payload);
  },
};
