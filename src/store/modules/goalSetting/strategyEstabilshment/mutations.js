import { mutations } from './types';

//! 하나의 MUTATIONS 당 하나의 STATE 변경
export default {
  //* 전략 과제 리스트 저장
  [mutations.SET_STRATEGY_ESTABILSHMENT_LIST](state, payload) {
    state.strategyEstabilshmentList = payload;
  },

  //* 전략 과제 연결리스트 저장
  [mutations.SET_STRATEGY_ESTABILSHMENT_CONNECT_LIST](state, payload) {
    state.strategyEstabilshmentConnectList = payload;
  },
  //* 전략 과제 아이템 저장
  [mutations.SET_STRATEGY_ESTABILSHMENT_ITEM](state, payload) {
    state.strategyEstabilshmentItem = payload;
  },
  //* KPI 정보 저장
  [mutations.SET_KPI_INFO](state, payload) {
    state.kpiInfo = payload;
  },
  //* KPI 검색 정보 저장
  [mutations.SET_KPI_SEARCH_LIST](state, payload) {
    state.kpiSearchList = payload;
  },
  //* 파일 정보 저장
  [mutations.SET_FILE_LIST](state, payload) {
    state.fileList = payload;
  },
  //* KPI 검색 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_SEARCH_POPUP](state, payload) {
    state.views.kpiSearchPopup = payload;
  },
  //* 부서 검색 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_DEPARTMENT_SEARCH_POPUP](state, payload) {
    state.views.departmentSearchPopup = payload;
  },
  //* 담당자 검색 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_MANAGER_SEARCH_POPUP](state, payload) {
    state.views.managerSearchPopup = payload;
  },
  //* 파일 업로드 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_FILES_UPLOAD_POPUP](state, payload) {
    state.views.excelUploadPopup = payload;
  },
  //* 전략과제 신규/수정 FORM 유효성 저장
  [mutations.SET_INPUT_STRATEGY_INVALID](state, payload) {
    state.inputStgInvalid = payload;
  },
  //* 다운로드할 전략과제 EXCEL 데이터 저장
  [mutations.SET_STRATEGY_EXCEL_DATA](state, payload) {
    state.strategyExcelData = payload;
  },
  //* 전략과제 EXCEL 업로드 양식 저장
  [mutations.SET_UPLOAD_EXCEL_FORM](state, payload) {
    state.uploadExcelForm = payload;
  },
  //* 전략과제 조회시 검색 정보 저장
  [mutations.SET_STG_SEARCH_INFO](state, payload) {
    state.stgSearchInfo = payload;
  },
  //* 그리드 드래그온 드롭 ON/OFF
  [mutations.SET_IS_GRID_DRAG](state, payload) {
    state.isDrag = payload;
  },
  //* 상위 부서 검색
  [mutations.SET_UPPER_DEPT](state, payload) {
    state.upperDept = payload;
  },
};
