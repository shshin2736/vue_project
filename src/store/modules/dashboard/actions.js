import { actions, mutations } from './types';
import { axiosInstance, axiosNoSpinner } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';
export default {
  //* 업무관리 선택 일자 저장
  [actions.INIT_DSBD_DATE_PARAM]({ commit }, payload) {
    commit(mutations.SET_DSBD_DATE_PARAM, payload);
  },
  //*대시보드 KPI목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_DASHBOARD_KPI_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DASHBOARD_KPI_POPUP, payload);
  },
  //* 슬라이더 현재 페이지번호 세팅 (KPI 현황)
  [actions.INIT_CURRENT_SLIDE_NO_KPI]({ commit }, payload) {
    commit(mutations.SET_CURRENT_SLIDE_NO_KPI, payload);
  },
  //* 슬라이더 현재 페이지번호 세팅 (팀게시판)
  [actions.INIT_CURRENT_SLIDE_NO_BOARD]({ commit }, payload) {
    commit(mutations.SET_CURRENT_SLIDE_NO_BOARD, payload);
  },
  //*대시보드 일자별 KPI 및 성공부진 사유 목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_DSBD_KPI_REASON_POPOUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DSBD_KPI_REASON_POPOUP, payload);
  },
  //* KPI팝업 리스트 가져오기
  async [actions.FETCH_DASHBOARD_KPI_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/getBscKpiTreeList.do',
        payload,
      );
      commit(mutations.SET_DASHBOARD_KPI_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 팀게시판 리스트 가져오기
  async [actions.FETCH_DASHBOARD_BOARD_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/dashboard/getTeamBoardList.do',
        payload,
      );
      commit(mutations.SET_DASHBOARD_BOARD_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 업무관리 리스트 가져오기
  async [actions.FETCH_DASHBOARD_REASON_MANAGE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/getReasonManagementList.do',
        payload,
      );
      commit(
        mutations.SET_DASHBOARD_REASON_MANAGE_YEAR_LIST,
        data.data.yearMeasureList,
      );
      commit(
        mutations.SET_DASHBOARD_REASON_MANAGE_WEEK_LIST,
        data.data.weekMeasureList,
      );
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 프로젝트관리 리스트 가져오기
  async [actions.FETCH_DASHBOARD_PROJECT_MANAGE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/getPrjMainList.do',
        payload,
      );
      commit(mutations.SET_DASHBOARD_PROJECT_MANAGE_ALL_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 차트그룹 사용자 대시보드여부 업데이트
  async [actions.UPDATE_DASHBOARD_CHART_GRP](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/dashboard/updateChartGrpData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 체계도 리스트 세팅
  async [actions.FETCH_DASHBOARD_KPI_TREE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/dashboard/getKpiTreeTargetList.do',
        payload,
      );
      commit(mutations.SET_DASHBOARD_KPI_TREE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // //* 차트 그룹 목록
  async [actions.FETCH_DSB_CHART_GRP_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/getComKpiChartGrpList.do',
        payload,
      );
      commit(mutations.SET_DSB_CHART_GRP_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 차트 그룹 목록 업데이트
  async [actions.UPDATE_DSB_CHART_GRP_LIST]({ dispatch }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/updateChartGrpData.do',
        payload,
      );
      if (data.result === 'T') {
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_DSB_CHART_GRP_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 팀성과 관리 하위부서 가져오기
  async [actions.FETCH_DASHBOARD_LOW_DEPT_INFO_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/getDashboardLowDeptInfoList.do',
        payload,
      );
      commit(mutations.SET_DASHBOARD_LOW_DEPT_INFO_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 리스트 가져오기
  async [actions.FETCH_KPI_CURRENT_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/getKpiCurrentList.do',
        payload,
      );
      commit(mutations.SET_KPI_CURRENT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 일자별 KPI 리스트 가져오기
  async [actions.FETCH_DSBD_KPI_REASON_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/dashboard/getReasonKpiList.do',
        payload,
      );
      commit(mutations.SET_DSBD_KPI_REASON_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
};
