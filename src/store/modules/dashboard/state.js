export default {
  currentSlideNoKpi: 0, //* 슬라이더 현재 페이지번호 (KPI 현황)
  currentSlideNoBoard: 0, //* 슬라이더 현재 페이지번호 (팀게시판)
  kpiList: [], //* KPI팝업 리스트
  boardList: [], //* 팀게시판 리스트
  weekMeasureList: [], //* 업무관리 리스트 (주간)
  yearMeasureList: [], //* 업무관리 리스트 (년간)
  allPrjList: [], //* 프로젝트관리 리스트 (총과제)
  specializedPrjList: [], //* 프로젝트관리 리스트 (전문과제)
  generalPrjList: [], //* 프로젝트관리 리스트 (일반과제)
  imActionPrjList: [], //* 프로젝트관리 리스트 (즉실천)
  kpiTreeList: [], //* KPI 체계도 리스트 세팅
  chartGrp: [], //* 지표 그래프 그룹 목록
  lowDeptList: [], //* 팀성과 관리 하위부서 세팅
  kpiCurrentList: [],
  kpiReasonList: [],
  kpiDate: {},
  views: {
    dashboardKpi: false, //* 대시보드 KPI목록 팝업 ON/OFF
    kpiReason: false, //* 일자별 KPI 목록 팝업 ON/OFF
  },
};
