import { getters } from './types';

export default {
  //* 연결 전략과제
  [getters.GET_CONN_STG_LIST](state) {
    return state.connStgList;
  },
  //* 과제 리스트 검색 조건 가져오기
  [getters.GET_PRJ_SRCH_CONDITION](state) {
    return state.projectSrchCondition;
  },
  //* 과제실행 목록 리스트 가져오기
  [getters.GET_PROJECT_EXECUTION_LIST](state) {
    return state.projectExecutionList;
  },
  //* 과제실행 데이터 가져오기
  [getters.GET_PROJECT_EXECUTION_INFO](state) {
    return state.projectExecutionInfo;
  },
  //* 연결 KPI 데이터 가져오기
  [getters.GET_PROJECT_KPI_LIST](state) {
    return state.projectKpiList;
  },
  //* Report INFO 가져오기
  [getters.GET_PROJECT_REPORT_INFO](state) {
    return state.projectReportInfo;
  },
  //* 단계별 미확인된 메세지 유무 가져오기
  [getters.GET_CHECK_MESSAGES_LIST](state) {
    return state.checkMessagesList;
  },
  //* 최초 과제등록 POPUP INFO 값 가져오기
  [getters.GET_PROJECT_POPUP_INFO](state) {
    return state.projectPopupInfo;
  },
  //* 과제 기간 설정 POPUP INFO 값가져오기
  [getters.GET_PROJECT_DATE_INFO](state) {
    return state.projectDateInfo;
  },
  //* 잠재 원인 POPUP INFO 값가져오기
  [getters.GET_PROJECT_CAUSE_INFO](state) {
    return state.projectCauseInfo;
  },
  //* 보고서 스킨설정 팝업 INFO 값가져오기
  [getters.GET_PROJECT_REPORT_SKIN_INFO](state) {
    return state.projectReportSkinInfo;
  },
  //* 보고서 상세 팝업 USE INFO 값 가져오기
  [getters.GET_PROJECT_REPORT_USE_INFO](state) {
    return state.prjReportUseInfo;
  },
  //* 보고서 첨부파일 팝업 INFO 값가져오기
  [getters.GET_PROJECT_ATTACH_FILE_INFO](state) {
    return state.reportAtcFileInfo;
  },
  //* 잠재 원인 LIST 값가져오기
  [getters.GET_PROJECT_CAUSE_LIST](state) {
    return state.projectCauseList;
  },
  //* 과제 단계 상태 가져오기
  [getters.GET_PROJECT_STATUS_LIST](state) {
    return state.projectStatusList;
  },
  //* 과제 메세지 팝업 LIST 가져오기
  [getters.GET_PROJECT_MESSENGER_LIST](state) {
    return state.projectMsgList;
  },
  //* 과제 메세지 팝업 INFO 가져오기
  [getters.GET_PROJECT_MESSENGER_INFO](state) {
    return state.projectMsgInfo;
  },
  //* 개선스킬 FILE INFO 가져오기
  [getters.GET_PROJECT_SKILL_CONF_INFO](state) {
    return state.skillFileInfo;
  },
  //* 개선스킬 팝업 FILE INFO 가져오기
  [getters.GET_PROJECT_SKILL_CONF_INFO_POP](state) {
    return state.skillFileInfoPop;
  },
  //* 개선스킬 팝업 FILE INFO 가져오기
  [getters.GET_PROJECT_SKILL_STEP_INFO](state) {
    return state.skillStepInfo;
  },
  // TODO 연구 / 개발
  //* 시장 분석 INFO 가져오기
  [getters.GET_PROJECT_BIZ_INFO](state) {
    return state.prjBizInfo;
  },
  //* CSF 도출 INFO 가져오기
  [getters.GET_PROJECT_CSF_INFO](state) {
    return state.prjCsfInfo;
  },
  //* 컨셉수립 INFO 가져오기
  [getters.GET_PROJECT_DIRCT_INFO](state) {
    return state.prjDirctInfo;
  },
  //* 상세계획 LIST 가져오기
  [getters.GET_PROJECT_DEV_LIST](state) {
    return state.prjDevList;
  },
  //* 현장적용 LIST 가져오기
  [getters.GET_PROJECT_PILOT_LIST](state) {
    return state.prjPilotList;
  },
  //* 효과파악 INFO 가져오기
  [getters.GET_PROJECT_RD_EFFECT](state) {
    return state.prjRdEffect;
  },

  // TODO 의사결정
  //* 효과파악 INFO 가져오기
  [getters.GET_PROJECT_GRASP_INFO](state) {
    return state.prjGraspInfo;
  },
  //* 결정요인 LIST 가져오기
  [getters.GET_PROJECT_DECISION_LIST](state) {
    return state.prjDcsList;
  },
  //* 대안설정 LIST 가져오기
  [getters.GET_PROJECT_ALT_LIST](state) {
    return state.prjAltList;
  },
  //* 상세계획 LIST가져오기
  [getters.GET_PROJECT_IMPL_LIST](state) {
    return state.prjImplList;
  },
  //* 효과파악 INFO 가져오기
  [getters.GET_PROJECT_DS_EFFECT](state) {
    return state.prjDsEffect;
  },

  // TODO 판매 4단계
  //* 고객파악 INFO 가져오기
  [getters.GET_PROJECT_SA_CUST](state) {
    return state.prjSaCustInfo;
  },
  //* 질문 INFO 가져오기
  [getters.GET_PROJECT_SA_BIZ](state) {
    return state.prjSaBizInfo;
  },
  //* 제시 INFO 가져오기
  [getters.GET_PROJECT_SUGGEST_INFO](state) {
    return state.prjSuggestInfo;
  },
  //* 입증 INFO 가져오기
  [getters.GET_PROJECT_OVER_INFO](state) {
    return state.prjOverInfo;
  },
  //* 결정 LIST 가져오기
  [getters.GET_PROJECT_MON_LIST](state) {
    return state.prjMonList;
  },
  //* 효과파악 INFO 가져오기
  [getters.GET_PROJECT_SA_EFFECT](state) {
    return state.prjSaEffect;
  },
  // TODO POPUP
  //* KPI 연결 리스트 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_LIST_POP](state) {
    return state.views.projectKpiPop;
  },
  //* 과제 검색 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_PROJECT_REGIST_POP](state) {
    return state.views.projectRegistPop;
  },
  //* 과제 기간 설정 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_PROJECT_DATE_POP](state) {
    return state.views.projectDatePop;
  },
  //* 대첵수립 기간 설정 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_MEASURE_DATE_POP](state) {
    return state.views.measureDatePop;
  },
  //* 잠재 원인추가 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_POTENTIAL_CAUSE_POP](state) {
    return state.views.potentialCausePop;
  },
  //* 보고서 스킨설정 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_REPORT_SKIN_POP](state) {
    return state.views.projectReportPop;
  },
  //* 보고서 상세화면 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_REPORT_DETAIL_POP](state) {
    return state.views.reportDetailPop;
  },
  //* 보고서 첨부파일 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_ATTACH_FILE_POP](state) {
    return state.views.reportAtchFilePop;
  },
  //* 과제 메신저 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_MESSENGER_POP](state) {
    return state.views.projectMsgPop;
  },
  //* 개선스킬 팝업 ON/OFF가져오기
  [getters.GET_VIEWS_SKILL_CONF_POP](state) {
    return state.views.projectSkillPop;
  },
  [getters.GET_ADD_CAUSE_LIST](state) {
    return state.addCause;
  },
};
