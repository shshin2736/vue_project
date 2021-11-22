export default {
  kpiPerformList: [], //* KPI실적리스트
  kpiPerformReportList: [], //* KPI실적리스트(보고용)
  kpiReasonMeasureList: {}, //* 성공/부진 리스트
  kpiReasonMeasureReportList: {}, //* 성공/부진 리스트(보고용)
  selectedKpiData: {}, //* 선택한 KPI 정보
  kpiPrjList: [], //* 연결과제 리스트
  kpiTargetMonthList: [], //* 월목표실적 데이터
  kpiInfo: {}, //*선택한 kpi정보
  savedReasonData: {}, //*저장된 성공/부진사유글
  savedMeasureData: {}, //*저장된 성공/부진사유대책글
  searchUserId: '', //*검색사용자ID
  kpiDataSearch: {}, //* 검색, 열람 용 데이터
  entireWeekList: [], //* 총 주 목록
  kpiLatestResult: [], //* KPI 최근/누적실적 가져오기
  wwSeq: '', //*주차 파라미터
  tab: {
    id: '0',
    title: '',
    current: true,
    children: [],
  },
  views: {
    kpiPerformList: true, //* 실적리스트 영역 ON/OFF
    kpiReasonList: false, //* 성공부진사유 리스트 영역 ON/OFF
    kpiRegPerformPop: false, //* 실적입력 팝업 ON/OFF
    kpiPrjPop: false, //* 연결과제 팝업 ON/OFF
    chartGroupPop: false, //* 차트그룹 리스트팝업 ON/OFF
    selectedChartGroupPop: false, //* 선택된 차트그룹 팝업 ON/OFF
    analysisPop: false, //* 분석 팝업 ON/OFF
    prevReasonPop: false, //* 성공/부진사유/대책 미리보기 팝업 ON/OFF
    managerPop: false, //* 담당자검색 팝업 ON/OFF
  },
};
