import { mutations } from './types';

export default {
  [mutations.SET_VIEWS_SPINNER](state, payload) {
    state.views.spinner = payload;
  },
  [mutations.SET_MENU_LIST](state, payload) {
    state.menuList = payload;
  },
  [mutations.SET_MESSAGE_LIST](state, payload) {
    state.messageList = payload;
  },
  [mutations.SET_APP_BAR](state, payload) {
    state.views.appBar = payload;
  },
  //* 공통 코드 저장
  [mutations.SET_COM_CODE_LIST](state, payload) {
    state.comCodeList = payload;
  },
  //* 사용자 정보 저장
  [mutations.SET_COM_USER_INFO](state, payload) {
    state.userData = payload;
  },
  [mutations.SET_ROLE_LIST](state, payload) {
    state.roleList = payload;
  },
  //* 담당부서/담당자 팝업(싱글) ON/OFF 설정
  [mutations.SET_VIEWS_DEPT_MANAGER_SINGLE_POP](state, payload) {
    state.views.departmentManagerSingle = payload;
  },
  //* 알림창 ON/OFF 설정
  [mutations.SET_VIEWS_ALERT](state, payload) {
    state.views.comAlert = payload;
  },
  //* CONFIRM ON/OFF 설정
  [mutations.SET_VIEWS_CONFIRM](state, payload) {
    state.views.comConfirm = payload;
  },
  //* 리니어 스피너 ON/OFF 설정
  [mutations.SET_VIEWS_LINEAR](state, payload) {
    state.views.linear = payload;
  },
  //* 담당부서/담당자 팝업(다수선택) ON/OFF 설정
  [mutations.SET_VIEWS_DEPT_MANAGER_MULTI_POP](state, payload) {
    state.views.departmentMangerMulti = payload;
  },
  //* 선택한 담당자/담당부서 데이터 세팅
  [mutations.SET_SELECTED_DEPARTMENT_MANAGER_DATA](state, payload) {
    state.selectedUserDeptData = payload;
  },
  //* 선택한 담당자/담당부서 데이터(다중) 세팅
  [mutations.SET_SELECTED_DEPARTMENT_MANAGER_LIST](state, payload) {
    state.selectedUserDeptList = payload;
  },
  //* 담당자/담당부서 리스트 세팅
  [mutations.SET_DEPARTMENT_MANAGER_LIST](state, payload) {
    state.userDeptList = payload;
  },
  //* 조회년도 리스트 가져오기
  [mutations.SET_YEAR_LIST](state, payload) {
    state.yearList = payload;
  },
  //* 선택한 조회년도 가져오기
  [mutations.SET_SELECTED_YEAR_DATA](state, payload) {
    state.selectedYearData = payload;
  },
  //* 선택한 조회월 가져오기
  [mutations.SET_SELECTED_MONTH_DATA](state, payload) {
    state.selectedMonthData = payload;
  },
  //* 다국어 리스트 저장
  [mutations.SET_I18N_LIST](state, payload) {
    state.i18nList = payload;
  },
  //* 언어 코드 저장
  [mutations.SET_LANGAGE_CODE_LIST](state, payload) {
    state.langageCodeList = payload;
  },
  //* KPI POOL 리스트 세팅
  [mutations.SET_COM_KPI_POOL_LIST](state, payload) {
    state.kpiPoolList = payload;
  },
  //* 선택한 KPI 리스트 세팅
  [mutations.SET_SELECTED_COM_KPI_POOL_LIST](state, payload) {
    state.selectedKpiPoolList = payload;
  },
  //* 과제 도움말 정보 저장
  [mutations.SET_PROJECT_HELP_INFO](state, payload) {
    state.prjHelpInfo = payload;
  },
  //* 과제 도움말 팝업 ON/OFF 저장
  [mutations.SET_VIEWS_PRJ_HELP_POP](state, payload) {
    state.views.prjHelpPop = payload;
  },
  //* 과제정보 저장
  [mutations.SET_ASSIGNMENT_INFO](state, payload) {
    state.assignmentInfo = payload;
  },
  //* 과제 검색 정보 저장
  [mutations.SET_SEARCH_ASSIGNMENT_INFO](state, payload) {
    state.assignmentSearchList = payload;
  },
  //* 과제 검색 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_ASSIGNMENT_SEARCH_POPUP](state, payload) {
    state.views.assignmentSearchPopup = payload;
  },
  //* 전체 KPI 목록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_POOL_POP](state, payload) {
    state.views.kpiPoolListPop = payload;
  },
  //* 공통 부서 검색 목록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_COM_SRCH_DEPT_POPUP](state, payload) {
    state.views.comSrchDept = payload;
  },
  //* 공통 부서 검색 목록 설정
  [mutations.SET_COM_DEPT_LIST](state, payload) {
    state.comDeptList = payload;
  },
  [mutations.SET_SELECTED_DEPT](state, payload) {
    state.selectedDept = payload;
  },

  //* 공통 부서 호출 전략과제 유무 ON/OFF 설정
  [mutations.SET_IS_COM_DEPT_LIST_INNER_GRPS](state, payload) {
    state.views.isComDeptInStg = payload;
  },

  //*자신의 하위 부서 정보 설정
  [mutations.SET_LOW_DEPT_INFO](state, payload) {
    state.lowDeptInfo = payload;
  },
  //* 트리 리스트 에디터 트리거
  [mutations.SET_DEPARTMENT_MANAGER_EDITOR_ID](state, payload) {
    state.editId = payload;
  },
  //* 팝업 on시 던진 파라미터 저장
  [mutations.SET_DEPARTMENT_MANAGER_SRCH_PARAM](state, payload) {
    state.srchParams = payload;
  },
  //* 전략과제 검색 팝업 ON/OFF 저장
  [mutations.SET_STRATEGY_SEARCH_POPUP](state, payload) {
    state.views.strategySearchPopup = payload;
  },
  //* 검색한 전략과제 리스트
  [mutations.SET_SEARCH_STRATEGY_LIST](state, payload) {
    state.searchStrategyList = payload;
  },
  //* 선택한 전략과제 정보
  [mutations.SET_SELECTED_STRATEGY_LIST](state, payload) {
    state.selectedStrateyInfo = payload;
  },
  //* 파일 리스트 세팅
  [mutations.SET_FILE_INFO_LIST](state, payload) {
    state.fileInfoList = payload;
  },
  //* 하위부서 리스트 세팅
  [mutations.SET_LOW_DEPT_INFO_LIST](state, payload) {
    state.lowDeptInfoList = payload;
  },
  //* 다국어 언어 설정 저장
  [mutations.SET_I18N_LOCALE](state, payload) {
    state.i18nLocale = payload;
  },
  //* KPI 차트 목록 저장
  [mutations.SET_COM_KPI_CHART_GRP_LIST](state, payload) {
    state.chartGrpList = payload;
  },
  //* 선택된 KPI 차트 목록 저장
  [mutations.SET_SELECTED_CHART_GRP_LIST](state, payload) {
    state.selectedChartList = payload;
  },
  //* KPI 선택된 차트 저장
  [mutations.SET_SELECTED_CHART_GRP](state, payload) {
    state.selectedChart = payload;
  },
  //* KPI 차트 목록 팝업 ON/OFF
  [mutations.SET_VIEWS_KPI_CHART_GRP_MULTI_POP](state, payload) {
    state.views.chartGrpMulti = payload;
  },
  //* KPI 차트 목록 팝업 ON/OFF
  [mutations.SET_VIEWS_KPI_CHART_GRP_SINGLE_POP](state, payload) {
    state.views.chartGrpSingle = payload;
  },
  //* KPI 차트 그룹 차트 보기 팝업 ON/OFF
  [mutations.SET_VIEWS_DRAW_CHART_POP](state, payload) {
    state.views.drawChart = payload;
  },
  //* KPI 차트 그룹 별 KPI 정보
  [mutations.SET_COM_CHART_KPI_DATA](state, payload) {
    state.chartKpiData = payload;
  },
  //* KPI 차트 그룹 정보
  [mutations.SET_COM_CHART_GRP_DATA](state, payload) {
    state.chartGrpData = payload;
  },
  //* KPI 차트 그룹 리스트 KPI 정보
  [mutations.SET_COM_CHART_KPI_DATA_LIST](state, payload) {
    state.chartKpiList = payload;
  },
  //* 알람 목록
  [mutations.SET_ALARM_LIST](state, payload) {
    state.alarmList = payload;
  },
  //* KPI 실적보고 ON/OFF 저장
  [mutations.SET_VIEWS_KPI_PERFORMANCE](state, payload) {
    state.views.kpiPerformance = payload;
  },
  //* MBO화면에서 선택된 KPI 저장
  [mutations.SET_SELECTED_MBO_KPI](state, payload) {
    state.selectedMboKpi = payload;
  },
  //* 상위레벨 사용자 조회
  [mutations.SET_COM_HIGH_LEV_USER_LIST](state, payload) {
    state.highLevelUserList = payload;
  },
  //* NOTICE POPUP ON/OFF 저장
  [mutations.SET_VIEWS_NOTICE_POPUP](state, payload) {
    state.views.noticePopup = payload;
  },
  //* 사용자 검색용 TXT 저장
  [mutations.SET_SEARCH_DEPT_USER_NAME](state, payload) {
    state.searchUserNm = payload;
  },
  //* 공지사항 목록
  [mutations.SET_DSB_NOTICE_LIST](state, payload) {
    state.noticeList = payload;
  },
  //* 오버레이 이벤트 핸들러
  [mutations.SET_OVERLAY_CLICK_EVENT_HANDLER](state, payload) {
    state.overlayEventHandler = payload;
  },
  //* 과제 삭제 가능 여부 조회
  [mutations.SET_PRJ_DELETE_AVBL](state, payload) {
    state.isPrjDeleteAvbl = payload;
  },
  //* 지표 그래프 기존 KPI데이터 저장
  [mutations.SET_EXIST_KPI_LIST](state, payload) {
    state.existKpiList = payload;
  },
  [mutations.SET_BU_INFO](state, payload) {
    state.buInfo = payload;
  },
  //*선택한 국가코드 세팅
  [mutations.SET_SELECTED_COUNTRY_CODE](state, payload) {
    state.selectedCountryCd = payload;
  },
};
