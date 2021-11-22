export default {
  strategyEstabilshmentList: [], //* 전략과제 리스트
  strategyEstabilshmentConnectList: {}, //*메인화면 연결(과제,KPI) 정보
  strategyEstabilshmentItem: {}, //* 전략과제 아이템
  strategyExcelData: [], //* 전략과제 엑셀 다운로드 데이터
  managerName: '', //* 담당자 이름
  managerSearchList: [], //* 담당자 검색
  assignmentInfo: {}, //* 과제 정보
  assignmentSearchList: [], //* 과제 검색 결과
  kpiInfo: {}, //* KPI 정보
  kpiSearchList: [], //* KPI 검색 결과
  uploadExcelForm: [], //* 엑셀 업로드 양식
  fileList: [], //* 첨부파일
  stgSearchInfo: {}, //* 전략과제 조회시 검색한 조건(기준년도 , 전략과제명 , 부서명)
  isDrag: true, //* 그리드 드래그 앤 드롭 ON/OFF
  upperDept: {},
  views: {
    kpiSearchPopup: false, //* KPI 검색 팝업 ON/OFF
    departmentSearchPopup: false, //* 부서 검색 팝업 ON/OFF
    managerSearchPopup: false, //* 담당자 검색 팝업 ON/OFF
    excelUploadPopup: false, //* 파일 업로드 팝업 ON/OFF
  },
  inputStgInvalid: false, //* 전략과제 신규/수정 form 유효성 결과
};
