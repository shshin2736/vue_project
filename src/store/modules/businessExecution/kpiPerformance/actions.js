import { actions, mutations } from './types';
import { axiosInstance, axiosNoSpinner } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';

export default {
  //* 탭 추가 하기
  [actions.UPDATE_TAB_LIST]({ commit }, payload) {
    commit(mutations.SET_TAB_LIST, payload);
  },
  //* 실적리스트 영역 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_PERFORM_LIST]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_PERFORM_LIST, payload);
  },
  //* 성공부진사유 리스트 영역 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_REASON_LIST]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_REASON_LIST, payload);
  },
  //* 실적입력 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_REG_PERFORM_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_REG_PERFORM_POP, payload);
  },
  //* 연결과제 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_PRJ_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_PRJ_POP, payload);
  },
  //* 차트그룹 리스트팝업 ON/OFF 설정
  [actions.INIT_VIEWS_CHART_GROUP_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_CHART_GROUP_POP, payload);
  },
  //* 선택된 차트그룹 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_SELECTED_CHART_GROUP_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_SELECTED_CHART_GROUP_POP, payload);
  },
  //* 분석 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_ANALYSIS_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ANALYSIS_POP, payload);
  },
  //* 성공/부진사유/대책 미리보기팝업 ON/OFF 설정
  [actions.INIT_VIEWS_PREV_REASON_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_PREV_REASON_POP, payload);
  },
  //* 담당자검색 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MANAGER_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MANAGER_POP, payload);
  },
  //* KPI실적 리스트 세팅
  [actions.INIT_KPI_PERFORM_LIST]({ commit }, payload) {
    commit(mutations.SET_KPI_PERFORM_LIST, payload);
  },
  //* 검색 열람용 KPI 데이터
  [actions.INIT_DATA_SEARCH_KPI_DATA]({ commit }, payload) {
    commit(mutations.SET_DATA_SEARCH_KPI_DATA, payload);
  },
  //* KPI실적 리스트 조회
  async [actions.FETCH_KPI_PERFORM_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getBscKpiTreeList.do',
        payload,
      );
      commit(mutations.SET_KPI_PERFORM_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI실적 리스트 조회 (보고용)
  async [actions.FETCH_KPI_PERFORM_REPORT_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getKpiReportList.do',
        payload,
      );
      commit(mutations.SET_KPI_PERFORM_REPORT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 실적리스트 단일ROW 업데이트
  async [actions.UPDATE_KPI_PERFORM_SINGLE](_, payload) {
    try {
      await axiosNoSpinner.post('api/kpiTarget/saveBscKpiSingle.do', payload);
      // if (response.status === 200) {
      //   common.alert('success', 'NLS0000012');
      // }
      // let param = {
      //   baseYyyy: payload.baseYyyy,
      //   baseYyyyMm: payload.baseYyyyMm,
      //   searchUserId: payload.searchUserId || '',
      // };
      //dispatch(actions.INIT_KPI_PERFORM_LIST, []);
      //dispatch(actions.FETCH_KPI_PERFORM_LIST, param);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI성공/부진사유 대책 리스트 조회
  async [actions.FETCH_KPI_REASON_MEASURE_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiPerform/getReasonMeasureList.do',
        payload,
      );
      commit(mutations.SET_KPI_REASON_MEASURE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI성공/부진사유 대책 리스트 조회(보고용)
  async [actions.FETCH_KPI_REASON_MEASURE_REPORT_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiPerform/getReasonMeasureList.do',
        payload,
      );
      commit(mutations.SET_KPI_REASON_MEASURE_REPORT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI성공/부진사유 대책 리스트 설정
  [actions.INIT_KPI_REASON_MEASURE_LIST]({ commit }, payload) {
    commit(mutations.SET_KPI_REASON_MEASURE_LIST, payload);
  },
  //* 선택한 kpi정보 세팅
  [actions.INIT_SELECTED_KPI_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_KPI_DATA, payload);
  },
  //* 성공부진사유 저장
  async [actions.UPDATAE_KPI_REASON_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/saveReasonData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
      // commit(mutations.SET_SAVED_REASON_ID, response.data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 성공부진사유 대책 저장
  async [actions.UPDATAE_KPI_MEASURE_DATA]({ commit }, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/saveMeasureData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
      commit(mutations.SET_SAVED_MEASURE_ID, response.data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 연결과제 리스트 가져오기
  async [actions.FETCH_KPI_PRJ_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiPerform/getKpiPrjList.do',
        payload,
      );
      data.kpiNm = payload.kpiNm || '';
      data.kpiId = payload.kpiId || '';
      commit(mutations.SET_KPI_PRJ_LIST, data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 성공부진사유 삭제
  async [actions.DELETE_KPI_REASON_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/deleteReasonData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000002');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 성공부진사유 대책 삭제
  async [actions.DELETE_KPI_MEASURE_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/deleteMeasureData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000002');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 월목표실적 데이터 가져오기
  async [actions.FETCH_KPI_TARGET_MONTH_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiPerform/getTargetMonth.do',
        payload,
      );
      commit(mutations.SET_KPI_TARGET_MONTH_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 월목표실적 데이터 세팅
  [actions.INIT_KPI_TARGET_MONTH_LIST]({ commit }, payload) {
    commit(mutations.SET_KPI_TARGET_MONTH_LIST, payload);
  },
  //* 선택한 과제 연결
  async [actions.UPDATE_KPI_PRJ_LIST]({ dispatch }, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/saveKpiPrj.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
        let param = {
          baseYyyy: payload.baseYyyy,
          baseYyyyMm: payload.baseYyyyMm,
          searchUserId: payload.searchUserId,
          wwSeq: payload.wwSeq,
        };
        dispatch(actions.FETCH_KPI_PRJ_LIST, payload);
        dispatch(actions.FETCH_KPI_PERFORM_LIST, param);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*연결과제 삭제
  async [actions.DELETE_KPI_PRJ_DATA]({ dispatch }, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/deleteKpiPrj.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000002');
        //*과제리스트 불러오기
        let param = {
          baseYyyy: payload.baseYyyy,
          baseYyyyMm: payload.baseYyyyMm,
          searchUserId: payload.searchUserId,
          wwSeq: payload.wwSeq,
        };
        dispatch(actions.FETCH_KPI_PRJ_LIST, payload);
        dispatch(actions.FETCH_KPI_PERFORM_LIST, param);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*선택한 kpi정보 세팅
  [actions.INIT_SELECTED_ANALY_KPI_INFO_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_ANALY_KPI_INFO_DATA, payload);
  },
  //*월실적 업데이트
  async [actions.UPDATE_KPI_PERFORM_MONTH_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/saveKpiPerformMonthData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*주실적 업데이트
  async [actions.UPDATE_KPI_PERFORM_WEEK_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/saveKpiPerformWeekData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*실적리스트 검색한 사용자 ID 세팅
  [actions.INIT_PERFORM_SEARCH_USER_ID]({ commit }, payload) {
    commit(mutations.SET_PERFORM_SEARCH_USER_ID, payload);
  },
  //* 월별 KPI 주실적 업데이트
  async [actions.UPDATE_KPI_PERFORM_MW](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiPerform/saveKpiPerformMW.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 전체 주 목록 가져오기
  async [actions.FETCH_ENTIRE_WEEK]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiPerform/getEntireWeekByYear.do',
        payload,
      );
      commit(mutations.SET_ENTIRE_WEEK, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 최근/누적실적 가져오기
  async [actions.FETCH_KPI_LATEST_RESULT]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiPerform/getKpiLatestResult.do',
        payload,
      );
      commit(mutations.SET_KPI_LATEST_RESULT, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 주차 파마리터 전달
  [actions.INIT_WWSEQ_PARAM]({ commit }, payload) {
    commit(mutations.SET_WWSEQ_PARAM, payload);
  },
};
