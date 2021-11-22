export default {
  projectSrchCondition: {}, //* 과제 검색조건(엑셀다운로드)
  projectExecutionList: [], //* 과제실행 목록 리스트
  projectReportInfo: {}, //* 보고서 팝업 INFO
  projectCauseList: [], //* 원인도출 잠재원인 List
  checkMessagesList: [], //* 단계별 미확인된 메세지 유무 List
  projectMsgList: [], //* 과제 메세지 팝업 List
  skillFileInfo: {}, //* 개선스킬 팝업 FILE INFO
  skillFileInfoPop: [], //* 개선스킬 팝업 FILE INFO
  skillStepInfo: {}, //* 개선스킬 팝업 STEP INFO
  projectMsgInfo: {}, //* 과제 메세지 팝업 INFO
  projectExecutionInfo: {}, //* 과제실행 데이터 가져오기
  projectStatusList: [], //* 과제 단계 상태
  projectPopupInfo: {}, //* 과제등록 POPUP INFO
  projectDateInfo: {}, //* 과제 기간 설정 POPUP INFO
  projectCauseInfo: {}, //* 잠재 원인 POPUP INFO
  projectReportSkinInfo: {}, //* 보고서 스킨설정 팝업 INFO
  reportAtcFileInfo: {}, //* 보고서 첨부파일 팝업 INFO
  prjReportUseInfo: {}, //* 보고서 상세 팝업 USE INFO
  projectKpiList: [], //* KPI 연결 팝업 LIST
  addCause: {},
  connStgList: [],

  //* 연구 / 개발
  prjBizInfo: {}, //* 시장 분석 INFO
  prjCsfInfo: {}, //* CSF 도출 INFO
  prjDirctInfo: {}, //* 컨셉수립 INFO
  prjDevList: [], //* 상세계획 LIST
  prjPilotList: [], //* 현장적용 LIST
  prjRdEffect: {}, //* 효과파악 INFO

  //* 의사결정
  prjGraspInfo: {}, //* 현상파악 INFO
  prjDcsList: [], //* 결정요인 LIST
  prjAltList: [], //* 대안설정  LIST
  prjImplList: [], //* 상세계획  LIST
  prjDsEffect: {}, //* 효과파악 INFO

  //* 판매 4단계
  prjSaCustInfo: {}, //* 고객파악 INFO
  prjSaBizInfo: {}, //* 질문 INFO
  prjSuggestInfo: {}, //* 제시 INFO
  prjOverInfo: {}, //* 입증 INFO
  prjMonList: [], //* 결정 LIST
  prjSaEffect: {}, //* 효과파악 INFO

  views: {
    projectRegistPop: false, //* 과제등록 팝업 ON/OFF
    projectKpiPop: false, //* KPI 연결 팝업 ON/OFF
    projectDatePop: false, //* 과제 기간 설정 팝업 ON/OFF
    measureDatePop: false, //* 대책수립 기간 설정 팝업 ON/OFF
    potentialCausePop: false, //* 잠재 원인추가 팝업 ON/OFF
    projectReportPop: false, //* 보고서 스킨설정 팝업 ON/OFF
    reportDetailPop: false, //* 보고서 상세화면 팝업 ON/OFF
    reportAtchFilePop: false, //* 보고서 첨부파일 팝업 ON/OFF
    projectMsgPop: false, //* 과제 메신저 팝업 ON/OFF
    projectSkillPop: false, //* 개선스킬 팝업 ON/OFF
  },
};
