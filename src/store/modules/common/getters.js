import { getters } from './types';

export default {
  [getters.GET_APP_BAR](state) {
    return state.views.appBar;
  },
  [getters.GET_COM_CODE_LIST](state) {
    return state.comCodeList;
  },
  //* 사용자 정보 가져오기
  [getters.GET_COM_USER_INFO](state) {
    return state.userData;
  },
  [getters.GET_ROLE_LIST](state) {
    return state.roleList;
  },
  //* 담당부서/담당자 팝업(싱글) ON/OFF 설정
  [getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP](state) {
    return state.views.departmentManagerSingle;
  },
  //* 담당부서/담당자 팝업(다수선택) ON/OFF 설정
  [getters.GET_VIEWS_DEPT_MANAGER_MULTI_POP](state) {
    return state.views.departmentMangerMulti;
  },
  //* 알림창 ON/OFF 설정
  [getters.GET_VIEWS_ALERT](state) {
    return state.views.comAlert;
  },
  //* CONFIRM ON/OFF 설정
  [getters.GET_VIEWS_CONFIRM](state) {
    return state.views.comConfirm;
  },
  //* 리니어 스피너 ON/OFF 설정
  [getters.GET_VIEWS_LINEAR](state) {
    return state.views.linear;
  },
  //* 로딩 스피너 ON/OFF 설정
  [getters.GET_VIEWS_SPINNER](state) {
    return state.views.spinner;
  },
  //* 선택한 담당자/담당부서 데이터 가져오기
  [getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA](state) {
    return state.selectedUserDeptData;
  },
  //* 선택한 담당자/담당부서 데이터(다중) 가져오기
  [getters.GET_SELECTED_DEPARTMENT_MANAGER_LIST](state) {
    return state.selectedUserDeptList;
  },
  //* 담당자/담당부서 리스트  가져오기
  [getters.GET_DEPARTMENT_MANAGER_LIST](state) {
    return state.userDeptList;
  },
  //* ERROR 메시지 가져오기
  [getters.GET_ERROR](state) {
    return state.error;
  },
  //* ALERT DATA 가져오기
  [getters.GET_ALERT_DATA](state) {
    return state.alertData;
  },
  //* CONFIRM DATA 가져오기
  [getters.GET_CONFIRM_DATA](state) {
    return state.confirmData;
  },
  //* 사용자 정보 가져오기
  [getters.GET_USER_DATA](state) {
    return state.userData;
  },
  //* 조회년도 리스트 가져오기
  [getters.GET_YEAR_LIST](state) {
    return state.yearList;
  },
  //* 선택한 조회년도 가져오기
  [getters.GET_SELECTED_YEAR_DATA](state) {
    return state.selectedYearData;
  },
  //* 선택한 조회월 가져오기
  [getters.GET_SELECTED_MONTH_DATA](state) {
    return state.selectedMonthData;
  },
  //* 다국어 리스트 가져오기
  [getters.GET_I18N_LIST](state) {
    return state.i18nList;
  },
  //* 언어 코드 가져오기
  [getters.GET_LANGAGE_CODE_LIST](state) {
    return state.langageCodeList;
  },
  //* KPI POOL 리스트 가져오기
  [getters.GET_SELECTED_COM_KPI_POOL_LIST](state) {
    return state.selectedKpiPoolList;
  },
  //* 과제 정보 가져오기
  [getters.GET_ASSIGNMENT_INFO](state) {
    return state.assignmentInfo;
  },
  //* 과제 검색 정보 가져오기
  [getters.GET_SEARCH_ASSIGNMENT_INFO](state) {
    return state.assignmentSearchList;
  },
  //* 과제 도움말 정보가져오기
  [getters.GET_PROJECT_HELP_INFO](state) {
    return state.prjHelpInfo;
  },
  //* KPI POOL 리스트 가져오기
  [getters.GET_COM_KPI_POOL_LIST](state) {
    return state.kpiPoolList;
  },
  //* 과제 도움말 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_PRJ_HELP_POP](state) {
    return state.views.prjHelpPop;
  },
  //* 과제 검색 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_ASSIGNMENT_SEARCH_POPUP](state) {
    return state.views.assignmentSearchPopup;
  },
  //* 전체 KPI 목록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_POOL_POP](state) {
    return state.views.kpiPoolListPop;
  },
  //* 공통 부서 검색 목록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_COM_SRCH_DEPT_POPUP](state) {
    return state.views.comSrchDept;
  },
  //*공통 부서 검색 결과 가져오기
  [getters.GET_COM_DEPT_LIST](state) {
    return state.comDeptList;
  },
  //* 선택된 부서 가져오기
  [getters.GET_SELECTED_DEPT](state) {
    return state.selectedDept;
  },
  //* 공통 부서 호출 전략과제 유무 ON/OFF 가져오기
  [getters.GET_IS_COM_DEPT_LIST_INNER_GRPS](state) {
    return state.views.isComDeptInStg;
  },
  //* 자신의 하위 부서정보 가져오기
  [getters.GET_LOW_DEPT_INFO](state) {
    return state.lowDeptInfo;
  },
  //* 트리리스트 에디터 트리거
  [getters.GET_DEPARTMENT_MANAGER_EDITOR_ID](state) {
    return state.editId;
  },
  //* 팝업 on시 던진 파라미터
  [getters.GET_DEPARTMENT_MANAGER_SRCH_PARAM](state) {
    return state.srchParams;
  },
  //* 전략과제 검색 팝업 ON/OFF 가져오기
  [getters.GET_STRATEGY_SEARCH_POPUP](state) {
    return state.views.strategySearchPopup;
  },
  //* 검색한 전략과제 리스트 가져오기
  [getters.GET_SEARCH_STRATEGY_LIST](state) {
    return state.searchStrategyList;
  },
  //* 선택한 전략과제 정보 가져오기
  [getters.GET_SELECTED_STRATEGY_LIST](state) {
    return state.selectedStrateyInfo;
  },
  //* 파일 리스트 가져오기
  [getters.GET_FILE_INFO_LIST](state) {
    return state.fileInfoList;
  },
  //* 하위부서 리스트 가져오기
  [getters.GET_LOW_DEPT_INFO_LIST](state) {
    return state.lowDeptInfoList;
  },
  //* 다국어 언어설정 가져오기
  [getters.GET_I18N_LOCALE](state) {
    return state.i18nLocale;
  },
  //* KPI 차트 목록 가져오기
  [getters.GET_COM_KPI_CHART_GRP_LIST](state) {
    return state.chartGrpList;
  },
  //* 선택된 KPI 차트 목록 가져오기
  [getters.GET_SELECTED_CHART_GRP_LIST](state) {
    return state.selectedChartList;
  },
  //* KPI 선택된 차트 가져오기
  [getters.GET_SELECTED_CHART_GRP](state) {
    return state.selectedChart;
  },
  //* KPI 차트 목록 팝업 ON/OFF
  [getters.GET_VIEWS_KPI_CHART_GRP_MULTI_POP](state) {
    return state.views.chartGrpMulti;
  },
  //* KPI 차트 목록 팝업 ON/OFF
  [getters.GET_VIEWS_KPI_CHART_GRP_SINGLE_POP](state) {
    return state.views.chartGrpSingle;
  },
  //* KPI 차트 그룹 차트 보기 팝업 ON/OFF
  [getters.GET_VIEWS_DRAW_CHART_POP](state) {
    return state.views.drawChart;
  },
  //* KPI 차트 그룹 별 KPI 정보
  [getters.GET_COM_CHART_KPI_DATA](state) {
    return state.chartKpiData;
  },
  //* KPI 차트 그룹 정보
  [getters.GET_COM_CHART_GRP_DATA](state) {
    return state.chartGrpData;
  },
  //* KPI 차트 그룹 리스트 KPI 정보
  [getters.GET_COM_CHART_KPI_LIST](state) {
    return state.chartKpiList;
  },

  //* 알람 목록
  [getters.GET_ALARM_LIST](state) {
    return state.alarmList;
  },
  //* KPI 실적보고 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_PERFORMANCE](state) {
    return state.views.kpiPerformance;
  },
  //* MBO화면에서 선택된 KPI 가져오기
  [getters.GET_SELECTED_MBO_KPI](state) {
    return state.selectedMboKpi;
  },
  //* 상위레벨 사용자 조회
  [getters.GET_COM_HIGH_LEV_USER_LIST](state) {
    return state.highLevelUserList;
  },
  //* NOTICE POPUP ON/OFF 가져오기
  [getters.GET_VIEWS_NOTICE_POPUP](state) {
    return state.views.noticePopup;
  },
  //* 사용자 검색용 TXT 가져오기
  [getters.GET_SEARCH_DEPT_USER_NAME](state) {
    return state.searchUserNm;
  },
  //* 공지사항 목록
  [getters.GET_DSB_NOTICE_LIST](state) {
    return state.noticeList;
  },
  //* 오버레이 이벤트 핸들러
  [getters.GET_OVERLAY_CLICK_EVENT_HANDLER](state) {
    return state.overlayEventHandler;
  },
  //* 과제 삭제 가능 여부 조회
  [getters.GET_PRJ_DELETE_AVBL](state) {
    return state.isPrjDeleteAvbl;
  },
  //* 지표 그래프 기존 KPI데이터 저장
  [getters.GET_EXIST_KPI_LIST](state) {
    return state.existKpiList;
  },
  [getters.GET_BU_INFO](state) {
    return state.buInfo;
  },
  //*선택한 국가코드 가져오기
  [getters.GET_SELECTED_COUNTRY_CODE](state) {
    return state.selectedCountryCd;
  },
};
