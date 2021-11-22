import { mutations } from './types';

export default {
  //* 하위 KPI 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_CHILD_POP](state, payload) {
    state.views.kpiChildPop = payload;
  },
  //* 단순하위 KPI 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_SIMPLE_CHILD_POP](state, payload) {
    state.views.kpiSimpleChildPop = payload;
  },
  //* 목표 등록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_REG_GOAL_POP](state, payload) {
    state.views.regiGoalPop = payload;
  },
  //* 전체 BSC 목록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_BSC_POOL_POP](state, payload) {
    state.views.bscPoolListPop = payload;
  },
  //* 전체 KPI 목록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_POOL_LIST_POP](state, payload) {
    state.views.kpiPoolListPop = payload;
  },
  //* 맞춤속성찾기 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_CUSTOM_DEF_POP](state, payload) {
    state.views.customDefPop = payload;
  },
  //* 기존 KPI로 찾기 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_EXIST_DEF_POP](state, payload) {
    state.views.existDefPop = payload;
  },
  //* KPI속성그룹 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_DEF_GROUP_POP](state, payload) {
    state.views.defGroupPop = payload;
  },
  //* 신규 KPI 등록 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_REGIST_POP](state, payload) {
    state.views.kpiRegistPop = payload;
  },
  //* KPI 수정 팝업 ON/OFF 설정
  [mutations.SET_VIEWS_KPI_UPDATE_POP](state, payload) {
    state.views.kpiUpdatePop = payload;
  },
  //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF
  [mutations.SET_VIEWS_CHILD_KPI_POOL_POP](state, payload) {
    state.views.childKpiPoolListPop = payload;
  },
  //* KPI목표수립 리스트 가져오기
  [mutations.SET_KPI_TARGET_ESTABILSHMENT_LIST](state, payload) {
    state.kpiTargetList = payload;
  },
  //* BSC 관점 리스트 가져오기
  [mutations.SET_BSC_POOL_LIST](state, payload) {
    state.bscPoolList = payload;
  },
  //* KPI POOL 리스트 가져오기
  [mutations.SET_KPI_POOL_DATA_LIST](state, payload) {
    state.kpiPoolList = payload;
  },
  //* 하위 KPI연결 KPI POOL 리스트 가져오기
  [mutations.SET_CHILD_KPI_POOL_LIST](state, payload) {
    state.childKpiPoolList = payload;
  },
  //* 하위 KPI 리스트 가져오기
  [mutations.SET_KPI_CHILD_LIST](state, payload) {
    state.kpiChildList = payload;
  },
  //* 단순 하위 KPI 리스트 가져오기
  [mutations.SET_KPI_SIMPLE_CHILD_LIST](state, payload) {
    state.kpiSimpleChildList = payload;
  },
  //* 기존KPI속성찾기 리스트 가져오기
  [mutations.SET_EXIST_DEF_LIST](state, payload) {
    state.existDefList = payload;
  },
  //* 맞춤속성찾기데이터 설정
  [mutations.SET_SEARCH_KPI_CUSTOM_DATA](state, payload) {
    state.searchKpiCustomData = payload;
  },
  //* 속성그룹 리스트 가져오기
  [mutations.SET_KPI_DEF_GROUP_LIST](state, payload) {
    state.kpiDefGroupList = payload;
  },
  //* 속성그룹 데이터 가져오기
  [mutations.SET_KPI_DEF_GROUP_DATA](state, payload) {
    state.kpiDefGroupData = payload;
  },
  //* 실적집계방식 리스트 가져오기
  [mutations.SET_PER_TYPE_LIST](state, payload) {
    state.perTypeList = payload;
  },
  //* 실적누계방식 리스트 가져오기
  [mutations.SET_ACC_TYPE_LIST](state, payload) {
    state.accTypeList = payload;
  },
  //* 단위 리스트 가져오기
  [mutations.SET_UNIT_TYPE_LIST](state, payload) {
    state.unitTypeList = payload;
  },
  //* KPI명 중복체크 데이터 가져오기
  [mutations.SET_CHECK_KPI_NM](state, payload) {
    state.checkKpiNm = payload;
  },
  //* 측정단위 카테고리 리스트 가져오기
  [mutations.SET_KPI_UNIT_CATEGORY_LIST](state, payload) {
    state.kpiUnitCateList = payload;
  },
  //* 측정단위 단위 리스트 가져오기
  [mutations.SET_KPI_UNIT_UNIT_LIST](state, payload) {
    state.kpiUnitUnitList = payload;
  },
  //* 선택한 KPI 리스트 세팅
  [mutations.SET_SELECTED_KPI_POOL_LIST](state, payload) {
    state.selectedKpiList = payload;
  },
  //*선택한 단위 세팅
  [mutations.SET_SELECTED_UNIT_DATA](state, payload) {
    state.selectedUnitData = payload;
  },
  //*사용언어 리스트 세팅
  [mutations.SET_LANGUAGE_LIST](state, payload) {
    state.languageList = payload;
  },
  //* 목표등록 - KPI정보 세팅
  [mutations.SET_REG_GOAL_KPI_DATA](state, payload) {
    state.kpiGoalData = payload;
  },
  //* 목표등록 - 선택한 조회년도 가져오기
  [mutations.SET_REG_GOAL_SELECTED_YEAR_DATA](state, payload) {
    state.selectedYearData = payload;
  },

  //* 목표등록 - 선택한 조회월가져오기
  [mutations.SET_REG_GOAL_SELECTED_MONTH_DATA](state, payload) {
    state.selectedMonthData = payload;
  },
  //* KPI 정보 데이터가져오기
  [mutations.SET_KPI_INFO_DATA](state, payload) {
    state.kpiInfoData = payload;
  },
  //* KPI공동사용자 조회
  [mutations.SET_KPI_ADD_USER_LIST](state, payload) {
    state.kpiAddUserList = payload;
  },

  //* KPI MBO 적용 리스트 저장
  [mutations.SET_APPLY_MBO_LIST](state, payload) {
    state.mboKpiList = payload;
  },
  //* KPI MBO 여부 조회
  [mutations.SET_IS_MBO_KPI](state, payload) {
    state.isMboKpi = payload;
  },
};
