import { actions, mutations } from './types';
import { axiosInstance, axiosNoSpinner } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { timezone } from '@/utils';

export default {
  // TODO: FETCH Methods declaration
  //* 공통 코드 가져오기
  async [actions.FETCH_COM_CODE_LIST]({ commit }) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/system/getComCodeList.do',
        {},
      );
      commit(mutations.SET_COM_CODE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 사용자 정보 가져오기
  async [actions.FETCH_COM_USER_INFO]({ commit }, param) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getComUserInfo.do',
        param,
      );
      commit(mutations.SET_COM_USER_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 권한 리스트 가져오기
  async [actions.FETCH_ROLE_LIST]({ commit }) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/system/getRoleList.do',
        {},
      );
      commit(mutations.SET_ROLE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 담당자/담당부서 데이터 가져오기
  async [actions.FETCH_DEPARTMENT_MANAGER_LIST]({ commit }, payload) {
    try {
      // payload.limit = common.isEmpty(payload.limit) ? 20 : payload.limit;
      // payload.offset = common.isEmpty(payload.offset) ? 0 : payload.offset;
      const { data } = await axiosNoSpinner.post(
        'api/system/getComUserDeptList.do',
        payload,
      );
      commit(mutations.SET_DEPARTMENT_MANAGER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 조회년도 리스트 조회
  async [actions.FETCH_YEAR_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post('api/getYearList.do', payload);
      commit(mutations.SET_YEAR_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 검색한 과제 정보 가져오기
  async [actions.FETCH_SEARCH_ASSIGNMENT_LIST]({ commit }, payload) {
    try {
      if (!payload.selectedYear) {
        // let deptId = '';
        // if (
        //   getters.GET_USER_DATA.userType != 'ADMIN' &&
        //   getters.GET_USER_DATA.userType != 'SUPER'
        // ) {
        //   deptId = getters.GET_USER_DATA.detpId;
        // }
        payload = {
          // deptId: deptId,
          ...payload,
          selectedYear: timezone.getClientDate('YYYY'),
        };
      }
      // TODO: 데이터 가져오기
      const { data } = await axiosInstance.post(
        'api/strategy/getPrjMainList.do',
        payload,
      );
      // MUTAITON: 데이터 저장
      commit(mutations.SET_SEARCH_ASSIGNMENT_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 하위 부서정보 가져오기
  async [actions.FETCH_LOW_DEPT_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/strategy/getLowDeptInfo.do',
        payload,
      );
      commit(mutations.SET_LOW_DEPT_INFO, data.data);
      // TODO: 데이터 가져오기
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 전략과제 검색
  async [actions.FETCH_SEARCH_STRATEGY_LIST]({ commit }, payload) {
    try {
      if (Object.keys(payload).length === 0) {
        payload = {
          // stgDeptId: getters.GET_USER_DATA.deptId,
          baseYYYY: new Date().getFullYear(),
        };
      }
      const { data } = await axiosInstance.post(
        'api/strategy/getSearchStrategy.do',
        payload,
      );
      commit(mutations.SET_SEARCH_STRATEGY_LIST, data.data);
      // TODO: 데이터 가져오기
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI POOL 리스트 가져오기
  async [actions.FETCH_COM_KPI_POOL_LIST]({ commit }, payload) {
    try {
      // payload.limit = payload.limit || 10;
      // payload.offset = payload.offset || 0;
      const { data } = await axiosInstance.post(
        'api/getKpiPoolList.do',
        payload,
      );
      commit(mutations.SET_COM_KPI_POOL_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 공통 부서 검색 목록 가져오기
  async [actions.FETCH_COM_DEPT_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getComDeptList.do',
        payload,
      );
      commit(mutations.SET_COM_DEPT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 차트그룹 별 KPI 실적 가져오기
  async [actions.FETCH_COM_CHART_KPI_DATA]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/getComKpiChartData.do',
        payload,
      );
      commit(mutations.SET_COM_CHART_KPI_DATA, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 파일 리스트 가져오기
  async [actions.FETCH_FILE_INFO_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post('api/findFileInfo.do', payload);
      commit(mutations.SET_FILE_INFO_LIST, data.data);
      return data.data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 하위부서 리스트 가져오기
  async [actions.FETCH_LOW_DEPT_INFO_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getLowDeptInfoList.do',
        payload,
      );
      commit(mutations.SET_LOW_DEPT_INFO_LIST, data.data);
      return data.data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 차트그룹 목록 가져오기
  async [actions.FETCH_COM_KPI_CHART_GRP_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/getComKpiChartGrpList.do',
        payload,
      );
      commit(mutations.SET_COM_KPI_CHART_GRP_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 차트그룹 리스트 KPI 실적 가져오기
  async [actions.FETCH_COM_CHART_KPI_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getComKpiChartList.do',
        payload,
      );
      commit(mutations.SET_COM_CHART_KPI_DATA_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 알람 목록 조회
  async [actions.FETCH_ALARM_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getComAlarmList.do',
        payload,
      );
      commit(mutations.SET_ALARM_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 상위레벨 사용자 조회
  async [actions.FETCH_COM_HIGH_LEV_USER_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getHighLevelUserList.do',
        payload,
      );
      commit(mutations.SET_COM_HIGH_LEV_USER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 공지사항 목록 가져오기
  async [actions.FETCH_DSB_NOTICE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/getDsbNoticeList.do',
        payload,
      );
      commit(mutations.SET_DSB_NOTICE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 삭제 가능 여부 조회
  async [actions.FETCH_PRJ_DELETE_AVBL]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjDeleteAvbl.do',
        payload,
      );
      commit(mutations.SET_PRJ_DELETE_AVBL, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_BU_INFO]({ commit }, payload) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/getStgBuInfo.do',
        payload,
      );
      commit(mutations.SET_BU_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INSERT Methods declaration

  // TODO: UPDATE Methods declaration
  //* 알람 읽은 상태로 수정
  async [actions.UPDATE_ALARM_STATUS]({ dispatch }, payload) {
    try {
      await axiosNoSpinner.post('api/readAlarm.do', payload);
      dispatch(actions.FETCH_ALARM_LIST, {});
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 알람 읽은 날짜 업데이트
  async [actions.UPDATE_ALARM_READ]({ dispatch }, payload) {
    try {
      await axiosNoSpinner.post('api/readAlarm.do', payload);
      dispatch(actions.FETCH_ALARM_LIST, {});
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: DELETE Methods declaration
  //* 알람 읽은 상태로 수정
  async [actions.DELETE_ALARM]({ dispatch }, payload) {
    try {
      await axiosNoSpinner.post('api/deleteAlarm.do', payload);
      dispatch(actions.FETCH_ALARM_LIST, {});
    } catch (error) {
      errorEventHandler(error);
    }
  },
  // TODO: INIT Methods declaration
  //* 담당부서/담당자 팝업(싱글) ON/OFF 설정
  [actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DEPT_MANAGER_SINGLE_POP, payload);
  },
  //* 담당부서/담당자 팝업(다수선택) ON/OFF 설정
  [actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DEPT_MANAGER_MULTI_POP, payload);
  },
  //* 알림창 ON/OFF 설정
  [actions.INIT_VIEWS_ALERT]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ALERT, payload);
  },
  //* CONFIRM ON/OFF 설정
  [actions.INIT_VIEWS_CONFIRM]({ commit }, payload) {
    commit(mutations.SET_VIEWS_CONFIRM, payload);
  },
  //* 리니어 스피어 ON/OFF 설정
  [actions.INIT_VIEWS_LINEAR]({ commit }, payload) {
    commit(mutations.SET_VIEWS_LINEAR, payload);
  },
  //* 로딩 스피너 ON/OFF 설정
  [actions.INIT_VIEWS_SPINNER]({ commit }, payload) {
    commit(mutations.SET_VIEWS_SPINNER, payload);
  },
  //* 담당자/담당부서 데이터 세팅
  [actions.INIT_DEPARTMENT_MANAGER_LIST]({ commit }, payload) {
    commit(mutations.SET_DEPARTMENT_MANAGER_LIST, payload);
  },
  //* 선택한 담당자/담당부서 데이터 세팅
  [actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_DEPARTMENT_MANAGER_DATA, payload);
  },
  //* 선택한 담당자/담당부서 데이터(다중) 세팅
  [actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]({ commit }, payload) {
    commit(mutations.SET_SELECTED_DEPARTMENT_MANAGER_LIST, payload);
  },
  //* 조회년도 리스트 세팅
  [actions.INIT_SELECTED_YEAR_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_YEAR_DATA, payload);
  },
  //* 조회월 리스트 세팅
  [actions.INIT_SELECTED_MONTH_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_MONTH_DATA, payload);
  },
  //* 선택한 KPI 리스트 세팅
  [actions.INIT_SELECTED_COM_KPI_POOL_LIST]({ commit }, payload) {
    commit(mutations.SET_SELECTED_COM_KPI_POOL_LIST, payload);
  },
  //* 과제 도움말 초기화
  [actions.INIT_PROJECT_HELP_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_HELP_INFO, payload);
  },
  //* 과제 도움말 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_PRJ_HELP_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_PRJ_HELP_POP, payload);
  },
  //* 과제 정보 초기화
  [actions.INIT_ASSIGNMENT_INFO]({ commit }, payload) {
    commit(mutations.SET_ASSIGNMENT_INFO, payload);
  },
  //* 과제 검색 정보 초기화
  [actions.INIT_SEARCH_ASSIGNMENT_INFO]({ commit }, payload) {
    commit(mutations.SET_SEARCH_ASSIGNMENT_INFO, payload);
  },
  //* 과제 검색 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ASSIGNMENT_SEARCH_POPUP, payload);
  },
  //* 전체 KPI 목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_POOL_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_POOL_POP, payload);
  }, //* 공통 부서 검색 목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_COM_SRCH_DEPT_POPUP, payload);
  },
  //* 공통 부서 선택된 부서 저장하기
  [actions.INIT_SELECTED_DEPT]({ commit }, payload) {
    commit(mutations.SET_SELECTED_DEPT, payload);
  },
  //* 공통 부서 호출 전략과제 유무 ON/OFF 저장하기
  [actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS]({ commit }, payload) {
    commit(mutations.SET_IS_COM_DEPT_LIST_INNER_GRPS, payload);
  },
  //* 하위 부서 저장하기
  [actions.INIT_LOW_DEPT_INFO]({ commit }, payload) {
    commit(mutations.SET_LOW_DEPT_INFO, payload);
  },
  //* 트리리스트 에디터 트리거
  [actions.INIT_DEPARTMENT_MANAGER_EDITOR_ID]({ commit }, payload) {
    commit(mutations.SET_DEPARTMENT_MANAGER_EDITOR_ID, payload);
  },
  //* 팝업 on시 던진 파라미터 저장
  [actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({ commit }, payload) {
    commit(mutations.SET_DEPARTMENT_MANAGER_SRCH_PARAM, payload);
  },
  //* 전략과제 검색 팝업 ON/OFF 초기화
  [actions.INIT_STRATEGY_SEARCH_POPUP]({ commit }, payload) {
    commit(mutations.SET_STRATEGY_SEARCH_POPUP, payload);
  },
  //* 검색한 전략과제 리스트 초기화
  [actions.INIT_SEARCH_STRATEGY_LIST]({ commit }, payload) {
    commit(mutations.SET_SEARCH_STRATEGY_LIST, payload);
  },
  //* 선택한 전략과제 정보 초기화
  [actions.INIT_SELECTED_STRATEGY_LIST]({ commit }, payload) {
    commit(mutations.SET_SELECTED_STRATEGY_LIST, payload);
  },
  //* 파일 리스트 초기화
  [actions.INIT_FILE_INFO_LIST]({ commit }, payload) {
    commit(mutations.SET_FILE_INFO_LIST, payload);
  },
  //* 하위부서 리스트 초기화
  [actions.INIT_LOW_DEPT_INFO_LIST]({ commit }, payload) {
    commit(mutations.SET_LOW_DEPT_INFO_LIST, payload);
  },
  //* 다국어 언어 설정 초기화
  [actions.INIT_I18N_LOCALE]({ commit }, payload) {
    commit(mutations.SET_I18N_LOCALE, payload);
  },
  //* 다국어 언어 리스트 초기화
  [actions.INIT_I18N_LIST]({ commit }, payload) {
    commit(mutations.SET_I18N_LIST, payload);
  },
  //* KPI 차트그룹 목록 초기화
  [actions.INIT_COM_KPI_CHART_GRP_LIST]({ commit }, payload) {
    commit(mutations.SET_COM_KPI_CHART_GRP_LIST, payload);
  },
  //* 선택된 KPI 차트그룹 목록 저장
  [actions.INIT_SELECTED_CHART_GRP_LIST]({ commit }, payload) {
    commit(mutations.SET_SELECTED_CHART_GRP_LIST, payload);
  },
  //* 선택된 KPI 차트그룹 저장
  [actions.INIT_SELECTED_CHART_GRP]({ commit }, payload) {
    commit(mutations.SET_SELECTED_CHART_GRP, payload);
  },
  //* 선택된 KPI 차트그룹 다중선택 POPUP ON/OFF
  [actions.INIT_VIEWS_KPI_CHART_GRP_MULTI_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_CHART_GRP_MULTI_POP, payload);
  },
  //* 선택된 KPI 차트그룹 단일선택 POPUP ON/OFF
  [actions.INIT_VIEWS_KPI_CHART_GRP_SINGLE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_CHART_GRP_SINGLE_POP, payload);
  },
  //* 선택된 KPI 차트그룹 차트 보기 POPUP ON/OFF
  [actions.INIT_VIEWS_DRAW_CHART_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DRAW_CHART_POP, payload);
  },
  //* MBO화면에서 선택된 KPI 초기화
  [actions.INIT_SELECTED_MBO_KPI]({ commit }, payload) {
    commit(mutations.SET_SELECTED_MBO_KPI, payload);
  },
  //* 선택된 KPI 차트그룹 정보
  [actions.INIT_COM_CHART_GRP_DATA]({ commit }, payload) {
    commit(mutations.SET_COM_CHART_GRP_DATA, payload);
  },
  //* 사용자 정보 초기화
  [actions.INIT_COM_USER_INFO]({ commit }, payload) {
    commit(mutations.SET_COM_USER_INFO, payload);
  },
  //* KPI 실적보고 ON/OFF 초기화
  [actions.INIT_VIEWS_KPI_PERFORMANCE]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_PERFORMANCE, payload);
  },
  //* NOTICE POPUP ON/OFF 초기화
  [actions.INIT_VIEWS_NOTICE_POPUP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_NOTICE_POPUP, payload);
  },
  //* 사용자 검색용 TXT 초기화
  [actions.INIT_SEARCH_DEPT_USER_NAME]({ commit }, payload) {
    commit(mutations.SET_SEARCH_DEPT_USER_NAME, payload);
  },
  //* 오버레이 이벤트 핸들러
  [actions.INIT_OVERLAY_CLICK_EVENT_HANDLER]({ commit }, payload) {
    commit(mutations.SET_OVERLAY_CLICK_EVENT_HANDLER, payload);
  },
  //* 지표 그래프 기존 KPI데이터 저장
  [actions.INIT_EXIST_KPI_LIST]({ commit }, payload) {
    commit(mutations.SET_EXIST_KPI_LIST, payload);
  },
  //*선택한 국가코드 세팅
  [actions.INIT_SELECTED_COUNTRY_CODE]({ commit }, payload) {
    commit(mutations.SET_SELECTED_COUNTRY_CODE, payload);
  },
};
