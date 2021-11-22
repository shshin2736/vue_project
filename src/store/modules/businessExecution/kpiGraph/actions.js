import { actions, mutations } from './types';
import { axiosInstance } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';

export default {
  async [actions.FETCH_KPI_MONTH_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/getComKpiChartData.do',
        payload,
      );
      if (payload.chart === 'Y') {
        commit(mutations.SET_CHART_DATA, data.data);
      } else {
        commit(mutations.SET_KPI_MONTH_LIST, data.data);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_VIEWS_CHART_DETAIL_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_CHART_DETAIL_POPUP, payload);
  },
  [actions.INIT_VIEWS_CREATE_CHART_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_CREATE_CHART_POPUP, payload);
  },
  async [actions.UPDATE_CHART_GRP]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/updateChartGrp.do',
        payload,
      );
      let res = false;
      if (data.result === 'T') {
        res = true;
        dispatch(actions.FETCH_CHART_GRP_LIST, {});
        dispatch(actions.FETCH_RECENT_LIST, {});
        common.alert('success', 'NLS0000012');
      }
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_CHART_GRP_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/getKpiChartGrpList.do',
        payload,
      );
      commit(mutations.SET_CHART_GRP_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_CHART_KPI_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/getChartKpiList.do',
        payload,
      );
      if (payload.chart === 'Y') {
        commit(mutations.SET_CHART_KPI, data.data);
      } else {
        commit(mutations.SET_CHART_KPI_LIST, data.data);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_CHART_USER_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/getChartUserList.do',
        payload,
      );
      commit(mutations.SET_CHART_USER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_CHART_GRP_DETAIL]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/getChartGrpDeail.do',
        payload,
      );
      data.data.isGroupUser = payload.isGroupUser;
      commit(mutations.SET_CHART_GRP_DETAIL, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_CHART_GRP_DETAIL]({ commit }, payload) {
    commit(mutations.SET_CHART_GRP_DETAIL, payload);
  },
  async [actions.FETCH_DSB_YN]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/getDsbYn.do',
        payload,
      );
      commit(mutations.SET_DSB_YN, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_CHART_KPI]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/updateChartKpi.do',
        payload,
      );
      let res = false;
      dispatch(actions.FETCH_CHART_KPI_LIST, { groupId: payload.groupId });
      dispatch(actions.FETCH_CHART_GRP_LIST, {});
      dispatch(actions.FETCH_RECENT_LIST, {});
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.UPDATE_CHART_USER]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/updateChartUser.do',
        payload,
      );
      let res = false;
      dispatch(actions.FETCH_CHART_USER_LIST, { groupId: payload.groupId });
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_CHART_KPI]({ commit }, payload) {
    commit(mutations.SET_CHART_KPI_LIST, payload);
  },
  [actions.INIT_CHART_USER]({ commit }, payload) {
    commit(mutations.SET_CHART_USER_LIST, payload);
  },
  [actions.INIT_KPI_MONTH_LIST]({ commit }, payload) {
    commit(mutations.SET_CHART_KPI_LIST, payload);
  },
  [actions.INIT_GRP_DATA]({ commit }, payload) {
    commit(mutations.SET_GRP_DATA, payload);
  },
  async [actions.UPDATE_DSB_YN]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiGraph/updateDsbYn.do',
        payload,
      );
      let res = false;
      dispatch(actions.FETCH_CHART_GRP_LIST, payload);
      if (data.result === 'T') {
        res = true;
      }
      return res;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_RECENT_LIST]({ commit }, payload) {
    try {
      const yyyy = new Date().getFullYear().toString();
      payload.searchFromYyyymm = `${yyyy}01`;
      payload.searchToYyyymm = `${yyyy}12`;
      const { data } = await axiosInstance.post(
        'api/kpiGraph/getRecentChartList.do',
        payload,
      );
      commit(mutations.SET_RECENT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  [actions.INIT_GRP_COLUMS]({ commit }, payload) {
    commit(mutations.SET_GRP_COLUMS, payload);
  },
  [actions.INIT_KPI_COLUMS]({ commit }, payload) {
    commit(mutations.SET_KPI_COLUMS, payload);
  },
  [actions.INIT_USER_COLUMS]({ commit }, payload) {
    commit(mutations.SET_USER_COLUMS, payload);
  },
  async [actions.UPDATE_KPI_AXIS2_YN]({ dispatch }, payload) {
    try {
      await axiosInstance.post('api/kpiGraph/updateKpiAxis2Yn.do', payload);
      dispatch(actions.FETCH_CHART_KPI_LIST, { groupId: payload.groupId });
      dispatch(actions.FETCH_RECENT_LIST, {
        searchFromYyyymm: payload.searchFromYyyymm,
        searchToYyyymm: payload.searchToYyyymm,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
};
