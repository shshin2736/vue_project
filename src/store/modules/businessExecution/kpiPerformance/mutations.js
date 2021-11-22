import { mutations } from './types';

export default {
  //* 실적리스트 영역 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_PERFORM_LIST](state, payload) {
    state.tab.children.push(payload);
  },
  //* 실적리스트 영역 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_PERFORM_LIST](state, payload) {
    state.views.kpiPerformList = payload;
  },
  //* 성공부진사유 리스트 영역 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_REASON_LIST](state, payload) {
    state.views.kpiReasonList = payload;
  },
  //* 실적입력 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_REG_PERFORM_POP](state, payload) {
    state.views.kpiRegPerformPop = payload;
  },
  //* 연결과제 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_PRJ_POP](state, payload) {
    state.views.kpiPrjPop = payload;
  },
  //* 차트그룹 리스트팝업 ON/OFF 설정
  [mutations.SET_VIEWS_CHART_GROUP_POP](state, payload) {
    state.views.chartGroupPop = payload;
  },
  //* 선택된 차트그룹 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_SELECTED_CHART_GROUP_POP](state, payload) {
    state.views.selectedChartGroupPop = payload;
  },
  //* 분석 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_ANALYSIS_POP](state, payload) {
    state.views.analysisPop = payload;
  },
  //* 성공/부진사유/대책 미리보기팝업 ON/OFF 설정
  [mutations.SET_VIEWS_PREV_REASON_POP](state, payload) {
    state.views.prevReasonPop = payload;
  },
  //* 담당자검색 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_MANAGER_POP](state, payload) {
    state.views.managerPop = payload;
  },
  //* 탭 내용 업데이트
  [mutations.SET_TAB_LIST](state, payload) {
    state.tab = payload;
  },
  //* KPI실적 리스트 조회
  [mutations.SET_KPI_PERFORM_LIST](state, payload) {
    state.kpiPerformList = payload;
  },
  //* KPI실적 리스트 조회(보고용)
  [mutations.SET_KPI_PERFORM_REPORT_LIST](state, payload) {
    state.kpiPerformReportList = payload;
  },
  //* KPI성공/부진사유 대책 리스트 조회
  [mutations.SET_KPI_REASON_MEASURE_LIST](state, payload) {
    state.kpiReasonMeasureList = payload;
  },
  //* KPI성공/부진사유 대책 리스트 조회(보고용)
  [mutations.SET_KPI_REASON_MEASURE_REPORT_LIST](state, payload) {
    state.kpiReasonMeasureReportList = payload;
  },
  //* 선택한 kpi정보 세팅
  [mutations.SET_SELECTED_KPI_DATA](state, payload) {
    state.selectedKpiData = payload;
  },
  //* 연결과제 리스트 세팅
  [mutations.SET_KPI_PRJ_LIST](state, payload) {
    state.kpiPrjList = payload;
  },
  //* 월목표실적 데이터 세팅
  [mutations.SET_KPI_TARGET_MONTH_LIST](state, payload) {
    state.kpiTargetMonthList = payload;
  },
  //*선택한 kpi정보 세팅
  [mutations.SET_SELECTED_ANALY_KPI_INFO_DATA](state, payload) {
    state.kpiInfo = payload;
  },
  //*저장한 성공/부진사유 정보
  [mutations.SET_SAVED_REASON_ID](state, payload) {
    state.savedReasonData = payload;
  },
  //*저장한 성공/부진사유대책 정보
  [mutations.SET_SAVED_MEASURE_ID](state, payload) {
    state.savedMeasureData = payload;
  },
  //*실적리스트 검색한 사용자 ID 세팅
  [mutations.SET_PERFORM_SEARCH_USER_ID](state, payload) {
    state.searchUserId = payload;
  },
  //* 검색 열람용 KPI 데이터
  [mutations.SET_DATA_SEARCH_KPI_DATA](state, payload) {
    state.kpiDataSearch = payload;
  },
  //* 전체 주 목록 가져오기
  [mutations.SET_ENTIRE_WEEK](state, payload) {
    state.entireWeekList = payload;
  },
  //* KPI 최근/누적실적 가져오기
  [mutations.SET_KPI_LATEST_RESULT](state, payload) {
    state.kpiLatestResult = payload;
  },
  //* 주차 파마리터 전달
  [mutations.SET_WWSEQ_PARAM](state, payload) {
    state.wwSeq = payload;
  },
};
