import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';

export default {
  async [actions.FETCH_TOV_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getTovList.do',
        payload,
      );
      commit(mutations.SET_TOV_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_VIEWS_ADD_KPI_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ADD_KPI_POPUP, payload);
  },
  [actions.INIT_VIEWS_ADD_ASSIGNMENT_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ADD_ASSIGNMENT_POPUP, payload);
  },
  [actions.INIT_TAKE_TAB]({ commit }, payload) {
    commit(mutations.SET_TAKE_TAB, payload);
  },
  [actions.INIT_OVER_TAB]({ commit }, payload) {
    commit(mutations.SET_OVER_TAB, payload);
  },
  async [actions.FETCH_TAKE_KPI_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getTakeKpiList.do',
        payload,
      );
      commit(mutations.SET_TAKE_KPI_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_TAKE_PRJ_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getTakePrjList.do',
        payload,
      );
      commit(mutations.SET_TAKE_PRJ_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_SRCH_KPI_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getSrchKpiList.do',
        payload,
      );
      commit(mutations.SET_SRCH_KPI_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_SRCH_PRJ_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getSrchPrjList.do',
        payload,
      );
      commit(mutations.SET_SRCH_PRJ_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_TAKEOVER_KPI]({ dispatch, commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/updateTakeoverKpi.do',
        payload,
      );
      if (data.result === 'T') {
        if (data.message !== null) {
          payload.tkoId = data.message;
        }
        dispatch(actions.FETCH_TAKE_KPI_LIST, payload);
        commit(mutations.SET_PARAM, payload);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_TAKEOVER_PRJ]({ dispatch, commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/updateTakeoverPrj.do',
        payload,
      );
      if (data.result === 'T') {
        if (data.message !== null) {
          payload.tkoId = data.message;
        }
        dispatch(actions.FETCH_TAKE_PRJ_LIST, payload);
        commit(mutations.SET_PARAM, payload);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.DELETE_TAKEOVER_KPI]({ dispatch, commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/deleteTakeoverKpi.do',
        payload,
      );
      dispatch(actions.FETCH_TAKE_KPI_LIST, payload.param);
      commit(mutations.SET_TOTCNT, data.data);
      return data.result;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.DELETE_TAKEOVER_PRJ]({ dispatch, commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/deleteTakeoverPrj.do',
        payload,
      );
      dispatch(actions.FETCH_TAKE_PRJ_LIST, payload.param);
      commit(mutations.SET_TOTCNT, data.data);
      return data.result;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_REQ_KPI]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/reqKpi.do',
        payload,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_TOV_LIST, {});
        dispatch(actions.FETCH_TAKE_KPI_LIST, payload.param);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_REQ_PRJ]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/reqPrj.do',
        payload,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_TOV_LIST, {});
        dispatch(actions.FETCH_TAKE_PRJ_LIST, payload.param);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_TAKE_DATA]({ commit }, payload) {
    commit(mutations.SET_TAKE_KPI_LIST, payload);
    commit(mutations.SET_TAKE_PRJ_LIST, payload);
  },
  async [actions.FETCH_OVER_KPI_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getOverKpiList.do',
        payload,
      );
      if (data.result === 'T') {
        commit(mutations.SET_OVER_KPI_LIST, data.data);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_OVER_PRJ_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getOverPrjList.do',
        payload,
      );
      if (data.result === 'T') {
        commit(mutations.SET_OVER_PRJ_LIST, data.data);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_MY_KPI_TREE]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getMyKpiTree.do',
        payload,
      );
      if (data.result === 'T') {
        commit(mutations.SET_MY_KPI_TREE, data.data);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_MY_PRJ_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getMyPrjList.do',
        payload,
      );
      if (data.result === 'T') {
        commit(mutations.SET_MY_PRJ_LIST, data.data);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_OVER_KPI]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/updateOverKpi.do',
        payload,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_OVER_KPI_LIST, payload.param);
        dispatch(actions.FETCH_MY_KPI_TREE, payload.param);
        // 인수된 KPI를 체계도에서 확인하세요
        common.alert('success', 'NLS0001296');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_OVER_PRJ]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/updateOverPrj.do',
        payload,
      );
      if (data.result === 'T') {
        dispatch(actions.FETCH_OVER_PRJ_LIST, payload.param);
        dispatch(actions.FETCH_MY_PRJ_LIST, payload.param);
        //과제 인수가 완료 되었습니다
        common.alert('success', 'NLS0001072');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_PARAM]({ commit }, payload) {
    commit(mutations.SET_PARAM, payload);
  },
  [actions.INIT_MY_KPI_TREE]({ commit }, payload) {
    commit(mutations.SET_MY_KPI_TREE, payload);
  },
  [actions.INIT_MY_PRJ_LIST]({ commit }, payload) {
    commit(mutations.SET_MY_PRJ_LIST, payload);
  },
  [actions.INIT_TAKE_KPI_LIST]({ commit }, payload) {
    commit(mutations.SET_TAKE_KPI_LIST, payload);
  },
  [actions.INIT_TAKE_PRJ_LIST]({ commit }, payload) {
    commit(mutations.SET_TAKE_PRJ_LIST, payload);
  },
  [actions.INIT_OVER_KPI_LIST]({ commit }, payload) {
    commit(mutations.SET_OVER_KPI_LIST, payload);
  },
  [actions.INIT_OVER_PRJ_LIST]({ commit }, payload) {
    commit(mutations.SET_OVER_PRJ_LIST, payload);
  },
  [actions.INIT_TOTCNT]({ commit }, payload) {
    commit(mutations.SET_TOTCNT, payload);
  },
  [actions.INIT_SRCH_KPI_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_SRCH_KPI_COLUMNS, payload);
  },
  [actions.INIT_SRCH_PRJ_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_SRCH_PRJ_COLUMNS, payload);
  },
  [actions.INIT_OVER_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_OVER_COLUMNS, payload);
  },
  [actions.INIT_TAKE_COLUMNS]({ commit }, payload) {
    commit(mutations.SET_TAKE_COLUMNS, payload);
  },
  async [actions.FETCH_KPI_SYSTEM_CHART]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getKpiSystemChart.do',
        payload,
      );
      commit(mutations.SET_KPI_SYSTEM_CHART, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_REQ_KPI_SYSTEM_CHART]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/reqKpiSystemChart.do',
        payload,
      );
      if (payload.flag === 'REQ')
        commit(mutations.SET_PARAM, { tkoId: data.data });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_TEMP_TREE]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getKpiTreeTemp.do',
        payload,
      );

      commit(mutations.SET_TEMP_TREE, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_OVER_KPI_SYSTEM_CHART]({ dispatch }, payload) {
    try {
      await axiosInstance.post(
        'api/takeover/updateOverKpiSystemChart.do',
        payload,
      );
      dispatch(actions.FETCH_KPI_SYSTEM_CHART, {
        baseYyyy: payload.baseYyyy,
      });
      dispatch(actions.FETCH_TEMP_TREE, { tkoId: payload.tkoId, flag: 'OVER' });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_TID]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/takeover/getTid.do',
        payload,
      );
      commit(mutations.SET_TID, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_TREE_TKO_STATUS](_, payload) {
    try {
      await axiosInstance.post('api/takeover/completeTreeTko.do', payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
};
