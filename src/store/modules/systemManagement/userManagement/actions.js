import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { common } from '@/utils';
import { errorEventHandler } from '@/errors';

export default {
  async [actions.FETCH_USER_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getUserList.do',
        payload,
      );
      commit(mutations.SET_USER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_USER_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getUser.do',
        payload,
      );
      commit(mutations.SET_USER_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_USER_INFO]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/saveUser.do',
        payload,
      );
      dispatch(actions.FETCH_USER_INFO, { userId: payload.userId });
      dispatch(actions.FETCH_MY_INFO, {});
      dispatch(actions.FETCH_USER_LIST, {});
      let res = false;
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_USER_INFO]({ commit }) {
    commit(mutations.SET_USER_INFO, {});
  },
  [actions.INIT_USER_ERROR]({ commit }, payload) {
    commit(mutations.SET_USER_ERROR, payload);
  },
  //* 사용자 권한 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_USER_ROLE_ASSIGN_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_USER_ROLE_ASSIGN_POPUP, payload);
  },
  //* 사용자 부서 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_USER_DEPT_ASSIGN_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_USER_DEPT_ASSIGN_POPUP, payload);
  },
  //* 사용자 권한 불러오기
  async [actions.FETCH_USER_ROLE_ASSIGN]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getRoleAssignment.do',
        payload,
      );
      commit(mutations.SET_USER_ROLE, data.data.roleAssign);
    } catch (e) {
      errorEventHandler(e);
    }
  },
  async [actions.DELETE_ROLE_ASSIGN]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/deleteRoleAssignment.do',
        payload,
      );
      if (data.result === 'T') {
        if (payload.userId != undefined) {
          dispatch(actions.FETCH_USER_ROLE_ASSIGN, { userId: payload.userId });
        } else {
          dispatch(actions.FETCH_USER_ROLE_ASSIGN, { roleId: payload.roleId });
        }
        dispatch(actions.FETCH_USER_LIST, {});
        // 삭제되었습니다.
        common.alert('success', 'NLS0000002');
      }
    } catch (e) {
      errorEventHandler(e);
    }
  },
  async [actions.UPDATE_ROLE_ASSIGN]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/saveRoleAssignment.do',
        payload,
      );
      dispatch(actions.FETCH_USER_ROLE_ASSIGN, payload);
      if (data.result === 'T') {
        //추가되었습니다.
        common.alert('success', 'NLS0000013');
      }
    } catch (e) {
      errorEventHandler(e);
    }
  },
  async [actions.DELETE_USER]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/deleteUser.do',
        payload,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_USER_ROLE_ASSIGN, {});
        // 삭제되었습니다.
        common.alert('success', 'NLS0000002');
      }
    } catch (e) {
      errorEventHandler(e);
    }
  },
  [actions.INIT_USER_ROLE_LIST]({ commit }) {
    commit(mutations.SET_USER_ROLE, []);
  },
  //* 사용자 엑셀 일괄적용 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_USER_EXCEL_UPLOAD_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_USER_EXCEL_UPLOAD_POPUP, payload);
  },
  //* 마이페이지 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MY_PAGE_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MY_PAGE_POPUP, payload);
  },
  //* 결재 라인 변경 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_APPROVAL_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_APPROVAL_POPUP, payload);
  },
  //* 비밀번호 변경 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_PWD_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_PWD_POPUP, payload);
  },
  async [actions.FETCH_MY_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post('api/getMyInfo.do', payload);
      commit(mutations.SET_MY_INFO, data.data);
    } catch (e) {
      errorEventHandler(e);
    }
  },
  [actions.INIT_APVL_DATA]({ commit }, payload) {
    commit(mutations.SET_APVL_DATA, payload);
  },
  async [actions.UPDATE_MY_INFO]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post('api/saveMyInfo.do', payload);
      dispatch(actions.FETCH_MY_INFO, {});
      let res = false;
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (e) {
      errorEventHandler(e);
    }
  },
  async [actions.FETCH_PASS_CHECK](_, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/checkPassword.do',
        payload,
      );
      return data.data;
    } catch (e) {
      errorEventHandler(e);
    }
  },
  async [actions.UPDATE_PASSWORD]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/updatePassword.do',
        payload,
      );
      dispatch(actions.FETCH_MY_INFO, {});
      return data.result;
    } catch (e) {
      errorEventHandler(e);
    }
  },
  [actions.INIT_PW_EXP_DATE]({ commit }, payload) {
    commit(mutations.SET_PW_EXP_DATE, payload);
  },
  async [actions.FETCH_EXCEL_DATA]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/getExcelUserList.do',
        payload,
      );
      commit(mutations.SET_EXCEL_DATA, data.data);
    } catch (e) {
      errorEventHandler(e);
    }
  },
  [actions.INIT_EXCEL_DATA]({ commit }, payload) {
    commit(mutations.SET_EXCEL_DATA, payload);
  },
  async [actions.UPDATE_EXCEL_USER](_, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/updateExcelUser.do',
        payload,
      );
      let res = false;
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (e) {
      errorEventHandler(e);
    }
  },

  async [actions.UPDATE_APV_LINE]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/system/updateApvLine.do',
        payload,
      );
      dispatch(actions.FETCH_USER_INFO, { userId: payload.userId });
      dispatch(actions.FETCH_MY_INFO, {});
      dispatch(actions.FETCH_USER_LIST, {});
      let res = false;
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (e) {
      errorEventHandler(e);
    }
  },
  async [actions.UPDATE_PW_EXP_DATE](__, payload) {
    try {
      await axiosInstance.post('api/system/updatePwdExpDate.do', payload);
    } catch (e) {
      errorEventHandler(e);
    }
  },
};
