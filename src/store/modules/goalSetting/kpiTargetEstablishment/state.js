export default {
  kpiTargetList: [], //* KPI 목표수립 리스트
  bscPoolList: [], //* BSC 관점 리스트
  kpiPoolList: [], //* KPI POOL 리스트
  childKpiPoolList: [], //* 하위 KPI 연결 KPI POOL 리스트
  kpiChildList: [], //* 하위 KPI 리스트
  kpiSimpleChildList: [], //* 하위 KPI 리스트
  baseYear: '2020', //* 기준 년
  baseMonth: '01', //* 기준 월
  existDefList: [], //* 기존KPI속성찾기 리스트
  searchKpiCustomData: {}, //* 맞춤속성찾기 데이터
  kpiDefGroupList: [], //*속성그룹 리스트
  kpiDefGroupData: {}, //*속성그룹 데이터
  perTypeList: [], //* 실적집계방식 리스트
  accTypeList: [], //* 실적누계방식 리스트
  unitTypeList: [], //*단위 리스트
  checkKpiNm: 0, //* KPI명 중복체크 데이터
  kpiUnitCateList: [], //* 측정단위 카테고리 리스트
  kpiUnitUnitList: [], //* 측정단위 단위 리스트
  selectedKpiList: [], //* 선택한 KPI 리스트
  selectedUnitData: '', //*선택한 단위
  languageList: [], //* 사용언어 리스트
  kpiGoalData: [], //* 목표등록 - KPI정보
  selectedYearData: '', //* 목표등록 - 선택한 조회년도
  selectedMonthData: '', //* 목표등록 - 선택한 조회월
  kpiInfoData: {}, //* KPI 정보 데이터
  kpiAddUserList: [], //* KPI 공동사용자리스트
  mboKpiList: [], //* MBO적용 KPI 리스트
  isMboKpi: {}, //* KPI MBO 여부
  views: {
    kpiChildPop: false, //* 하위 KPI 팝업 ON/OFF
    kpiSimpleChildPop: false, //* 단순하위 KPI 팝업 ON/OFF
    regiGoalPop: false, //* 목표 등록 팝업 ON/OFF
    bscPoolListPop: false, //* 전체 BSC 목록 팝업 ON/OFF
    kpiPoolListPop: false, //* 전체 KPI 목록 팝업 ON/OFF
    customDefPop: false, //* 맞춤속성찾기 팝업 ON/OFF
    existDefPop: false, //* 기존 KPI로 찾기팝업 ON/OFF
    defGroupPop: false, //* KPI속성그룹팝업 ON/OFF
    kpiRegistPop: false, //* 신규 KPI등록 팝업 ON/OFF
    kpiUpdatePop: false, //* KPI수정 팝업 ON/OFF
    childKpiPoolListPop: false, //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF
  },
};
