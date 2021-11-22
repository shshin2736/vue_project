import { getters } from './types';

export default {
  //* 전략 과제 리스트 가져오기
  [getters.GET_STRATEGY_ESTABILSHMENT_LIST](state) {
    return state.strategyEstabilshmentList;
  },
  //* 전략 과제 아이템 가져오기
  [getters.GET_STRATEGY_ESTABILSHMENT_ITEM](state) {
    return state.strategyEstabilshmentItem;
  },

  //* 전략 과제 연결(과제,kpi) 정보 가져오기GET_DEPARTMENT_ID
  [getters.GET_STRATEGY_ESTABILSHMENT_CONNECT_LIST](state) {
    return state.strategyEstabilshmentConnectList;
  },
  //* KPI 정보 가져오기
  [getters.GET_KPI_INFO](state) {
    return state.kpiInfo;
  },
  //* KPI 검색 리스트 가져오기
  [getters.GET_KPI_SEARCH_LIST](state) {
    return state.kpiSearchList;
  },
  //* 파일 정보 가져오기
  [getters.GET_FILE_LIST](state) {
    return state.fileList;
  },
  //* KPI 검색 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_SEARCH_POPUP](state) {
    return state.views.kpiSearchPopup;
  },
  //* 부서 검색 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_DEPARTMENT_SEARCH_POPUP](state) {
    return state.views.departmentSearchPopup;
  },
  //* 담당자 검색 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_MANAGER_SEARCH_POPUP](state) {
    return state.views.managerSearchPopup;
  },
  //* 파일 업로드 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_FILES_UPLOAD_POPUP](state) {
    return state.views.excelUploadPopup;
  },
  //* 전략과제 신규/수정 FORM 유효성 가져오기
  [getters.GET_INPUT_STRATEGY_INVALID](state) {
    return state.inputStgInvalid;
  },
  //* 다운로드할 전략과제 EXCEL 데이터 가져오기
  [getters.GET_STRATEGY_EXCEL_DATA](state) {
    return state.strategyExcelData;
  },
  //* 전략과제 EXCEL 업로드 양식 가져오기
  [getters.GET_UPLOAD_EXCEL_FORM](state) {
    return state.uploadExcelForm;
  },
  //* 전략과제 조회시 검색 정보 가져오기
  [getters.GET_STG_SEARCH_INFO](state) {
    return state.stgSearchInfo;
  },
  //* 그리드 드래그온 드롭 ON/OFF
  [getters.GET_IS_GRID_DRAG](state) {
    return state.isDrag;
  },
  //* 상위 부서 검색
  [getters.GET_UPPER_DEPT](state) {
    return state.upperDept;
  },
};
