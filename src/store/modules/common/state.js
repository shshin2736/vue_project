export default {
  comCodeList: [], //* 공통 코드 데이터
  roleList: [],
  menuList: [],
  messageList: [],
  userDeptList: [], //* 담당자/담당부서 데이터
  selectedUserDeptData: {}, //*선택한 담당자/담당부서 데이터
  selectedUserDeptList: [], //*선택한 담당자/담당부서(다중) 데이터
  userData: {}, //* 사용자 정보
  selectedYearData: '', //* 선택한 조회년도
  selectedMonthData: '', //* 선택한 조회월
  yearList: [], //* 조회년도 리스트
  i18nList: [], //* 다국어 리스트
  i18nLocale: 'ko', //* 다국어 언어 설정 값
  langageCodeList: [], //* 언어 코드 리스트
  kpiPoolList: [], //*kpi전체리스트
  selectedKpiPoolList: [], //*선택한 kpi리스트
  assignmentInfo: {}, //* 과제 정보
  assignmentSearchList: [], //* 과제 검색 결과
  prjHelpInfo: {}, //* 과제 도움말
  comDeptList: [], //*공통 부서 검색 결과
  selectedDept: {}, //* 선택된 부서
  lowDeptInfo: {}, //* 하위부서
  editId: '', //* 트리리스트 에디터용
  srchParams: {}, //* 팝업 ON시 던진 파라미터
  searchStrategyList: [], //* 검색한 전략과제 리시트
  selectedStrateyInfo: {}, //* 선택한 전략과제 정보
  fileInfoList: [], //*파일 리스트
  lowDeptInfoList: [], //* 하위부서 리스트
  chartGrpList: [], //* 차트그룹 목록
  selectedChartList: [], //* 선택된 차트그룹 목록
  selectedChart: {}, //* 선택된 차트그룹
  chartGrpData: {}, //* 차트그룹 데이터
  chartKpiData: [], //* 차트그룹의 KPI 데이터
  chartKpiList: [], //* 차트그룹의 KPI 목록 데이터
  alarmList: [], //* 알람 목록
  selectedMboKpi: {}, //* MBO화면에서 선택된 KPI
  highLevelUserList: [], //*상위레벨 사용자리스트
  searchUserNm: '', //* 사용자 검색용
  noticeList: [], //* 공지사항 목록
  isPrjDeleteAvbl: {}, //* 과제 삭제 가능 여부 조회
  routePath: '',
  existKpiList: [], //* 지표그래프 기존 KPI 리스트
  overlayEventHandler: false,
  buInfo: {},
  selectedCountryCd: '',
  //* Alert 데이터
  alertData: {
    type: 'info',
    msg: 'Message',
  },
  //* Confirm 데이터
  confirmData: {
    msg: 'Confirm',
    confirmCallback: null,
    cancelCallback: null,
  },
  error: {}, //* Error 데이터
  views: {
    spinner: false,
    linear: false,
    appBar: false,
    departmentManagerSingle: false, //* 담당부서/담당자 팝업(싱글) ON/OFF 설정
    departmentMangerMulti: false, //* 담당부서/담당자 팝업(다수선택) ON/OFF 설정
    comAlert: false, //* 알림창 ON/OFF 설정
    comConfirm: false, //* CONFIRM ON/OFF 설정
    assignmentSearchPopup: false, //* 과제 검색 팝업(멀티) ON/OFF
    // kpiPoolListPop: false, //* 전체 KPI 목록 팝업 ON/OFF
    kpiPoolListPop: { value: false, flag: '' }, //* 전체 KPI 목록 팝업 ON/OFF
    comSrchDept: false, //* 공통 부서 검색 목록 팝업 ON/OFF
    isComDeptInStg: false, //* 공통 부서 호출 전략과제 유뮤 ON/OFF
    strategySearchPopup: false, //* 전략과제 검색 팝업 ON/OFF
    prjHelpPop: false, //* 과제 도움말 팝업 ON/OFF
    chartGrpMulti: false, //* 공통 kpi 차트그룹 검색 팝업 ON/OFF
    chartGrpSingle: false, //* 공통 kpi 차트그룹 검색 팝업 ON/OFF
    drawChart: false, //* 공통 kpi 차트그룹 차트 보기 팝업 ON/OFF
    kpiPerformance: false, //* 공통 kpi 차트그룹 차트 보기 팝업 ON/OFF
    noticePopup: true, //* 공통 Notice 팝업 ON/OFF
    isNoPush: false,
  },
};
