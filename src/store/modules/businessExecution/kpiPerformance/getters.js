import { getters } from './types';

export default {
  //* 탭리스트 가져오기
  [getters.GET_TAB_LIST](state) {
    return state.tab;
  },
  //* 실적리스트 영역 ON/OFF 설정
  [getters.GET_VIEWS_KPI_PERFORM_LIST](state) {
    return state.views.kpiPerformList;
  },
  //* 성공부진사유 리스트 영역 ON/OFF 설정
  [getters.GET_VIEWS_KPI_REASON_LIST](state) {
    return state.views.kpiReasonList;
  },
  //* 실적입력 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_REG_PERFORM_POP](state) {
    return state.views.kpiRegPerformPop;
  },
  //* 연결과제 팝업 ON/OFF
  [getters.GET_VIEWS_KPI_PRJ_POP](state) {
    return state.views.kpiPrjPop;
  },
  //* 차트그룹 리스트팝업 ON/OFF
  [getters.GET_VIEWS_CHART_GROUP_POP](state) {
    return state.views.chartGroupPop;
  },
  //* 선택된 차트그룹 팝업 ON/OFF
  [getters.GET_VIEWS_SELECTED_CHART_GROUP_POP](state) {
    return state.views.selectedChartGroupPop;
  },
  //* 분석 팝업 ON/OFF
  [getters.GET_VIEWS_ANALYSIS_POP](state) {
    return state.views.analysisPop;
  },
  //* 성공/부진사유/대책 미리보기 팝업 ON/OFF
  [getters.GET_VIEWS_PREV_REASON_POP](state) {
    return state.views.prevReasonPop;
  },
  //* 담당자검색 팝업 ON/OFF
  [getters.GET_VIEWS_MANAGER_POP](state) {
    return state.views.managerPop;
  },
  //* KPI실적 리스트 조회
  [getters.GET_KPI_PERFORM_LIST](state) {
    return state.kpiPerformList;
  },
  //* KPI실적 리스트 조회(보고용)
  [getters.GET_KPI_PERFORM_REPORT_LIST](state) {
    return state.kpiPerformReportList;
  },
  //* //*KPI성공/부진사유 대책 리스트 조회
  [getters.GET_KPI_REASON_MEASURE_LIST](state) {
    return state.kpiReasonMeasureList;
  },
  //* //*KPI성공/부진사유 대책 리스트 조회(보고용)
  [getters.GET_KPI_REASON_MEASURE_REPORT_LIST](state) {
    return state.kpiReasonMeasureReportList;
  },
  //* 선택한 kpi정보 가져오기
  [getters.GET_SELECTED_KPI_DATA](state) {
    return state.selectedKpiData;
  },
  //* 연결과제 리스트 가져오기
  [getters.GET_KPI_PRJ_LIST](state) {
    return state.kpiPrjList;
  },
  //* 월목표실적 데이터 가져오기
  [getters.GET_KPI_TARGET_MONTH_LIST](state) {
    return state.kpiTargetMonthList;
  },
  //*선택한 kpi정보 세팅
  [getters.GET_SELECTED_ANALY_KPI_INFO_DATA](state) {
    return state.kpiInfo;
  },
  //*저장한 성공/부진사유 정보
  [getters.GET_SAVED_REASON_ID](state) {
    return state.savedReasonData;
  },
  //*저장한 성공/부진사유대책 정보
  [getters.GET_SAVED_MEASURE_ID](state) {
    return state.savedMeasureData;
  },
  //*실적리스트 검색한 사용자 ID
  [getters.GET_PERFORM_SEARCH_USER_ID](state) {
    return state.searchUserId;
  },
  //* 검색 열람용 KPI 데이터
  [getters.GET_DATA_SEARCH_KPI_DATA](state) {
    return state.kpiDataSearch;
  },
  //* 전체 주 목록 가져오기
  [getters.GET_ENTIRE_WEEK](state) {
    return state.entireWeekList;
  },
  //* KPI 최근/누적 실적 가져오기
  [getters.GET_KPI_LATEST_RESULT](state) {
    return state.kpiLatestResult;
  },
  //* 주차 파마리터 전달
  [getters.GET_WWSEQ_PARAM](state) {
    return state.wwSeq;
  },
};
