import { getters } from './types';

export default {
  //* 하위 KPI 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_CHILD_POP](state) {
    return state.views.kpiChildPop;
  },
  //* 단순하위 KPI 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_SIMPLE_CHILD_POP](state) {
    return state.views.kpiSimpleChildPop;
  },
  //* 목표 등록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_REG_GOAL_POP](state) {
    return state.views.regiGoalPop;
  },
  //* 전체 BSC 목록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_BSC_POOL_POP](state) {
    return state.views.bscPoolListPop;
  },
  //* 전체 KPI 목록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_POOL_LIST_POP](state) {
    return state.views.kpiPoolListPop;
  },
  //* 맞춤속성찾기팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_CUSTOM_DEF_POP](state) {
    return state.views.customDefPop;
  },
  //* 기존 KPI로 찾기팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_EXIST_DEF_POP](state) {
    return state.views.existDefPop;
  },
  //* KPI속성그룹 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_DEF_GROUP_POP](state) {
    return state.views.defGroupPop;
  },
  //* 신규 KPI 등록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_REGIST_POP](state) {
    return state.views.kpiRegistPop;
  },
  //* KPI 수정 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_KPI_UPDATE_POP](state) {
    return state.views.kpiUpdatePop;
  },
  //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF 가져오기
  [getters.GET_VIEWS_CHILD_KPI_POOL_POP](state) {
    return state.views.childKpiPoolListPop;
  },
  //* KPI목표수립 리스트 가져오기
  [getters.GET_KPI_TARGET_ESTABILSHMENT_LIST](state) {
    return state.kpiTargetList;
  },
  //* BSC 관점 리스트 가져오기
  [getters.GET_BSC_POOL_LIST](state) {
    return state.bscPoolList;
  },
  //* KPI POOL 리스트 가져오기
  [getters.GET_KPI_POOL_DATA_LIST](state) {
    return state.kpiPoolList;
  },
  //* 하위 KPI연결 KPI POOL 리스트 가져오기
  [getters.GET_CHILD_KPI_POOL_LIST](state) {
    return state.childKpiPoolList;
  },
  //* 하위 KPI 리스트 가져오기
  [getters.GET_KPI_CHILD_LIST](state) {
    return state.kpiChildList;
  },
  //* 단순하위 KPI 리스트 가져오기
  [getters.GET_KPI_SIMPLE_CHILD_LIST](state) {
    return state.kpiSimpleChildList;
  },
  //* 기존KPI속성찾기 리스트 가져오기
  [getters.GET_EXIST_DEF_LIST](state) {
    return state.existDefList;
  },
  //* 맞춤속성찾기데이터 가져오기
  [getters.GET_SEARCH_KPI_CUSTOM_DATA](state) {
    return state.searchKpiCustomData;
  },
  //* 속성그룹 리스트 가져오기
  [getters.GET_KPI_DEF_GROUP_LIST](state) {
    return state.kpiDefGroupList;
  },
  //* 속성그룹 데이터 가져오기
  [getters.GET_KPI_DEF_GROUP_DATA](state) {
    return state.kpiDefGroupData;
  },
  //* 실적집계방식 리스트 가져오기
  [getters.GET_PER_TYPE_LIST](state) {
    return state.perTypeList;
  },
  //* 실적누계방식 리스트 가져오기
  [getters.GET_ACC_TYPE_LIST](state) {
    return state.accTypeList;
  },
  //* 단위 리스트 가져오기
  [getters.GET_UNIT_TYPE_LIST](state) {
    return state.unitTypeList;
  },
  //* KPI명 중복체크 데이터 가져오기
  [getters.GET_CHECK_KPI_NM](state) {
    return state.checkKpiNm;
  },
  //* 측정단위 카테고리 리스트 가져오기
  [getters.GET_KPI_UNIT_CATEGORY_LIST](state) {
    return state.kpiUnitCateList;
  },
  //* 측정단위 단위 리스트 가져오기
  [getters.GET_KPI_UNIT_UNIT_LIST](state) {
    return state.kpiUnitUnitList;
  },
  //* 선택한 KPI 리스트 가져오기
  [getters.GET_SELECTED_KPI_POOL_LIST](state) {
    return state.selectedKpiList;
  },
  //*선택한 단위 세팅
  [getters.GET_SELECTED_UNIT_DATA](state) {
    return state.selectedUnitData;
  },
  //*사용언어 리스트 세팅
  [getters.GET_LANGUAGE_LIST](state) {
    return state.languageList;
  },
  //* 목표등록 - KPI정보가져오기
  [getters.GET_REG_GOAL_KPI_DATA](state) {
    return state.kpiGoalData;
  },
  //* 목표등록 - 선택한 조회년도 가져오기
  [getters.GET_REG_GOAL_SELECTED_YEAR_DATA](state) {
    return state.selectedYearData;
  },
  //* 목표등록 - 선택한 조회월가져오기
  [getters.GET_REG_GOAL_SELECTED_MONTH_DATA](state) {
    return state.selectedMonthData;
  },
  //* KPI 정보 데이터가져오기
  [getters.GET_KPI_INFO_DATA](state) {
    return state.kpiInfoData;
  },
  //* KPI공동사용자 조회
  [getters.GET_KPI_ADD_USER_LIST](state) {
    return state.kpiAddUserList;
  },
  //* KPI MBO 적용 리스트 조회
  [getters.GET_APPLY_MBO_LIST](state) {
    return state.mboKpiList;
  },
  //* KPI MBO 여부 조회
  [getters.GET_IS_MBO_KPI](state) {
    return state.isMboKpi;
  },
};
