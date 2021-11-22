import { mutations } from './types';

export default {
  //* 연결 전략과제
  [mutations.SET_CONN_STG_LIST](state, payload) {
    state.connStgList = payload;
  },
  //* 과제 리스트 검색 조건 설정
  [mutations.SET_PRJ_SRCH_CONDITION](state, payload) {
    state.projectSrchCondition = payload;
  },
  //* 과제실행 목록 데이터 설정
  [mutations.SET_PROJECT_EXECUTION_LIST](state, payload) {
    state.projectExecutionList = payload;
  },
  //* 과제실행 데이터 설정
  [mutations.SET_PROJECT_EXECUTION_INFO](state, payload) {
    state.projectExecutionInfo = payload;
  },
  //* 과제실행 데이터 설정
  [mutations.SET_PROJECT_KPI_LIST](state, payload) {
    state.projectKpiList = payload;
  },
  //* Report INFO 가져오기
  [mutations.SET_PROJECT_REPORT_INFO](state, payload) {
    state.projectReportInfo = payload;
  },
  //* 단계별 미확인된 메세지 유무 설정
  [mutations.SET_CHECK_MESSAGES_LIST](state, payload) {
    state.checkMessagesList = payload;
  },
  //* 최초 과제등록 POPUP INFO 값 세팅
  [mutations.SET_PROJECT_POPUP_INFO](state, payload) {
    state.projectPopupInfo = payload;
  },
  //* 과제 기간 설정 POPUP INFO 값가져오기
  [mutations.SET_PROJECT_DATE_INFO](state, payload) {
    state.projectDateInfo = payload;
  },
  //* 잠재 원인 POPUP INFO 설정
  [mutations.SET_PROJECT_CAUSE_INFO](state, payload) {
    state.projectCauseInfo = payload;
  },
  //* 보고서 스킨설정 팝업 INFO 설정
  [mutations.SET_PROJECT_REPORT_SKIN_INFO](state, payload) {
    state.projectReportSkinInfo = payload;
  },
  //* 보고서 상세 팝업 USE INFO 설정
  [mutations.SET_PROJECT_REPORT_USE_INFO](state, payload) {
    state.prjReportUseInfo = payload;
  },
  //* 보고서 첨부파일 팝업 INFO 설정
  [mutations.SET_PROJECT_ATTACH_FILE_INFO](state, payload) {
    state.reportAtcFileInfo = payload;
  },
  //* 잠재 원인 LIST 설정
  [mutations.SET_PROJECT_CAUSE_LIST](state, payload) {
    state.projectCauseList = payload;
  },
  //* 과제 단계 상태 설정
  [mutations.SET_PROJECT_STATUS_LIST](state, payload) {
    state.projectStatusList = payload;
  },
  //* 과제 메세지 팝업 List 설정
  [mutations.SET_PROJECT_MESSENGER_LIST](state, payload) {
    state.projectMsgList = payload;
  },
  //* 과제 메세지 팝업 INFO 설정
  [mutations.SET_PROJECT_MESSENGER_INFO](state, payload) {
    state.projectMsgInfo = payload;
  },
  //* 개선스킬 FILE INFO 설정
  [mutations.SET_PROJECT_SKILL_CONF_INFO](state, payload) {
    state.skillFileInfo = payload;
  },
  //* 개선스킬 팝업 FILE INFO 설정
  [mutations.SET_PROJECT_SKILL_STEP_INFO](state, payload) {
    state.skillStepInfo = payload;
  },
  //* 개선스킬 팝업 STEP INFO 설정
  [mutations.SET_PROJECT_SKILL_CONF_INFO_POP](state, payload) {
    state.skillFileInfoPop = payload;
  },
  //* 과제실행 목록 데이터 세팅
  [mutations.SET_VIEWS_PROJECT_REGIST_POP](state, payload) {
    state.views.projectRegistPop = payload;
  },

  // TODO 연구 / 개발
  //* 시장 분석 INFO 설정
  [mutations.SET_PROJECT_BIZ_INFO](state, payload) {
    state.prjBizInfo = payload;
  },
  //* CSF 도출 INFO 설정
  [mutations.SET_PROJECT_CSF_INFO](state, payload) {
    state.prjCsfInfo = payload;
  },
  //* 컨셉수립 INFO 설정
  [mutations.SET_PROJECT_DIRCT_INFO](state, payload) {
    state.prjDirctInfo = payload;
  },
  //* 상세계획 LIST 설정
  [mutations.SET_PROJECT_DEV_LIST](state, payload) {
    state.prjDevList = payload;
  },
  //* 현장적용  LIST설정
  [mutations.SET_PROJECT_PILOT_LIST](state, payload) {
    state.prjPilotList = payload;
  },
  //* 효과파악 INFO 설정
  [mutations.SET_PROJECT_RD_EFFECT](state, payload) {
    state.prjRdEffect = payload;
  },

  // TODO 연구 / 개발
  //* 현상파악 INFO 설정
  [mutations.SET_PROJECT_GRASP_INFO](state, payload) {
    state.prjGraspInfo = payload;
  },
  //* 결정요인 LIST 설정
  [mutations.SET_PROJECT_DECISION_LIST](state, payload) {
    state.prjDcsList = payload;
  },
  //* 대안설정 LIST 설정
  [mutations.SET_PROJECT_ALT_LIST](state, payload) {
    state.prjAltList = payload;
  },
  //* 상세계획 LIST 설정
  [mutations.SET_PROJECT_IMPL_LIST](state, payload) {
    state.prjImplList = payload;
  },
  //* 효과파악 INFO 설정
  [mutations.SET_PROJECT_DS_EFFECT](state, payload) {
    state.prjDsEffect = payload;
  },

  // TODO 판매 4단계
  //* 고객파악 INFO 설정
  [mutations.SET_PROJECT_SA_CUST](state, payload) {
    state.prjSaCustInfo = payload;
  },
  //* 질문 INFO 설정
  [mutations.SET_PROJECT_SA_BIZ](state, payload) {
    state.prjSaBizInfo = payload;
  },
  //* 제시 INFO 설정
  [mutations.SET_PROJECT_SUGGEST_INFO](state, payload) {
    state.prjSuggestInfo = payload;
  },
  //* 입증 INFO 설정
  [mutations.SET_PROJECT_OVER_INFO](state, payload) {
    state.prjOverInfo = payload;
  },
  //* 결정 LIST 설정
  [mutations.SET_PROJECT_MON_LIST](state, payload) {
    state.prjMonList = payload;
  },
  //* 효과파악 INFO 설정
  [mutations.SET_PROJECT_SA_EFFECT](state, payload) {
    state.prjSaEffect = payload;
  },
  // TODO POPUP
  //* KPI 연결 LIST 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_LIST_POP](state, payload) {
    state.views.projectKpiPop = payload;
  },
  //* 과제 기간 설정 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_PROJECT_DATE_POP](state, payload) {
    state.views.projectDatePop = payload;
  },
  //* 대첵수립 기간 설정 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_MEASURE_DATE_POP](state, payload) {
    state.views.measureDatePop = payload;
  },
  //* 잠재 원인추가 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_POTENTIAL_CAUSE_POP](state, payload) {
    state.views.potentialCausePop = payload;
  },
  //* 보고서 스킨설정 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_REPORT_SKIN_POP](state, payload) {
    state.views.projectReportPop = payload;
  },
  //* 보고서 상세화면 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_REPORT_DETAIL_POP](state, payload) {
    state.views.reportDetailPop = payload;
  },
  //* 보고서 첨부파일 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_ATTACH_FILE_POP](state, payload) {
    state.views.reportAtchFilePop = payload;
  },
  //* 과제 메신저 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_MESSENGER_POP](state, payload) {
    state.views.projectMsgPop = payload;
  },
  //* 개선스킬 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_SKILL_CONF_POP](state, payload) {
    state.views.projectSkillPop = payload;
  },
  [mutations.SET_ADD_CAUSE_LIST](state, payload) {
    state.addCause = payload;
  },
};
