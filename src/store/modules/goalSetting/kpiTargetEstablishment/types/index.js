export const getters = {
  //! 컨텐츠 데이터
  GET_BASE_YEAR_DATA: 'GET_BASE_YEAR_DATA', //* 기준 년 가져오기
  GET_BASE_MONTH_DATA: 'GET_BASE_MONTH_DATA', //* 기준 년 가져오기
  GET_KPI_TARGET_ESTABILSHMENT_LIST: 'GET_KPI_TARGET_ESTABILSHMENT_LIST', //* KPI목표수립 리스트 가져오기
  GET_BSC_POOL_LIST: 'GET_BSC_POOL_LIST', //* BSC 관점 리스트 가져오기
  GET_KPI_POOL_DATA_LIST: 'GET_KPI_POOL_DATA_LIST', //* KPI POOL 리스트 가져오기
  GET_CHILD_KPI_POOL_LIST: 'GET_CHILD_KPI_POOL_LIST', //*하위 KPI연결 KPI POOL 리스트 가져오기
  GET_KPI_CHILD_LIST: 'GET_KPI_CHILD_LIST', //* 하위 KPI리스트 가져오기
  GET_KPI_SIMPLE_CHILD_LIST: 'GET_KPI_SIMPLE_CHILD_LIST', //* 단순하위 KPI리스트 가져오기
  GET_EXIST_DEF_LIST: 'GET_EXIST_DEF_LIST', //* 기존KPI속성찾기 리스트 가져오기
  GET_KPI_CUSTOM_DATA: 'GET_KPI_CUSTOM_DATA', //* 맞춤속성데이터 가져오기
  GET_SEARCH_KPI_CUSTOM_DATA: 'GET_SEARCH_KPI_CUSTOM_DATA', //* 맞춤속성찾기데이터 가져오기
  GET_KPI_DEF_GROUP_LIST: 'GET_KPI_DEF_GROUP_LIST', //* 속성그룹 리스트 가져오기
  GET_KPI_DEF_GROUP_DATA: 'GET_KPI_DEF_GROUP_DATA', //* 속성그룹 데이터 가져오기
  GET_PER_TYPE_LIST: 'GET_PER_TYPE_LIST', //* 실적집계 리스트 가져오기
  GET_ACC_TYPE_LIST: 'GET_ACC_TYPE_LIST', //* 실적누계 리스트 가져오기
  GET_UNIT_TYPE_LIST: 'GET_UNIT_TYPE_LIST', //* 단위 리스트 가져오기
  GET_CHECK_KPI_NM: 'GET_CHECK_KPI_NM', //* KPI명 중복체크 데이터 가져오기
  GET_KPI_UNIT_CATEGORY_LIST: 'GET_KPI_UNIT_CATEGORY_LIST', //* 측정단위 카테고리 리스트 가져오기
  GET_KPI_UNIT_UNIT_LIST: 'GET_KPI_UNIT_UNIT_LIST', //* 측정단위 단위 리스트 가져오기
  GET_SELECTED_KPI_POOL_LIST: 'GET_SELECTED_KPI_POOL_LIST', //* 선택한 KPI 리스트 가져오기
  GET_SELECTED_UNIT_DATA: 'GET_SELECTED_UNIT_DATA', //*선택한 단위 가져오기
  GET_LANGUAGE_LIST: 'GET_LANGUAGE_LIST', //* 사용언어 리스트 가져오기
  GET_REG_GOAL_KPI_DATA: 'GET_REG_GOAL_KPI_DATA', //* 목표등록 - KPI정보가져오기
  GET_REG_GOAL_TARGET_YY_DATA: 'GET_REG_GOAL_TARGET_YY_DATA', //* 목표등록 - KPI년목표 가져오기
  GET_REG_GOAL_SELECTED_YEAR_DATA: 'GET_REG_GOAL_SELECTED_YEAR_DATA', //* 목표등록 - 선택한 조회년도 가져오기
  GET_REG_GOAL_SELECTED_MONTH_DATA: 'GET_REG_GOAL_SELECTED_MONTH_DATA', //* 목표등록 - 선택한 조회월 가져오기
  GET_KPI_INFO_DATA: 'GET_KPI_INFO_DATA', //* KPI 정보 데이터가져오기
  GET_KPI_ADD_USER_LIST: 'GET_KPI_ADD_USER_LIST', //* KPI공동사용자 가져오기
  GET_APPLY_MBO_LIST: 'GET_APPLY_MBO_LIST', //* KPI MBO 적용 리스트 가져오기
  GET_IS_MBO_KPI: 'GET_IS_MBO_KPI', //* KPI MBO 여부 조회

  //! 팝업 ON/OFF 설정
  GET_VIEWS_KPI_CHILD_POP: 'GET_VIEWS_KPI_CHILD_POP', //* 하위 KPI 팝업 ON/OFF 설정
  GET_VIEWS_KPI_SIMPLE_CHILD_POP: 'GET_VIEWS_KPI_SIMPLE_CHILD_POP', //* 단순하위 KPI 팝업 ON/OFF 설정
  GET_VIEWS_KPI_REG_GOAL_POP: 'GET_VIEWS_KPI_REG_GOAL_POP', //* 목표 등록 팝업 ON/OFF 설정
  GET_VIEWS_BSC_POOL_POP: 'GET_VIEWS_BSC_POOL_POP', //* 전체 BSC 목록 팝업 ON/OFF 설정
  GET_VIEWS_KPI_POOL_LIST_POP: 'GET_VIEWS_KPI_POOL_LIST_POP', //* 전체 KPI 목록 팝업 ON/OFF 설정
  GET_VIEWS_CUSTOM_DEF_POP: 'GET_VIEWS_CUSTOM_DEF_POP', //* 맞춤속성찾기 팝업 ON/OFF 설정
  GET_VIEWS_EXIST_DEF_POP: 'GET_VIEWS_EXIST_DEF_POP', //* 기존 KPI로 찾기 팝업 ON/OFF 설정
  GET_VIEWS_DEF_GROUP_POP: 'GET_VIEWS_DEF_GROUP_POP', //* KPI속성그룹 팝업 ON/OFF 설정
  GET_VIEWS_KPI_REGIST_POP: 'GET_VIEWS_KPI_REGIST_POP', //* 신규 KPI 등록 팝업 ON/OFF 설정
  GET_VIEWS_KPI_UPDATE_POP: 'GET_VIEWS_KPI_UPDATE_POP', //* KPI 수정 팝업 ON/OFF 설정
  GET_VIEWS_CHILD_KPI_POOL_POP: 'GET_VIEWS_CHILD_KPI_POOL_POP', //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF
};

export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_KPI_TARGET_ESTABILSHMENT_LIST: 'FETCH_KPI_TARGET_ESTABILSHMENT_LIST', //* KPI목표수립 리스트 가져오기
  FETCH_BSC_POOL_LIST: 'FETCH_BSC_POOL_LIST', //* BSC 관점 리스트 가져오기
  FETCH_KPI_POOL_DATA_LIST: 'FETCH_KPI_POOL_DATA_LIST', //* KPI POOL 리스트 가져오기
  FETCH_CHILD_KPI_POOL_LIST: 'FETCH_CHILD_KPI_POOL_LIST', //*하위 KPI연결 KPI POOL 리스트 가져오기
  FETCH_KPI_CHILD_LIST: 'FETCH_KPI_CHILD_LIST', //* 하위 KPI리스트 가져오기
  FETCH_KPI_SIMPLE_CHILD_LIST: 'FETCH_KPI_SIMPLE_CHILD_LIST', //* 단순하위 KPI리스트 가져오기
  FETCH_EXIST_DEF_LIST: 'FETCH_EXIST_DEF_LIST', //* 기존KPI속성찾기 리스트 가져오기
  FETCH_KPI_DEF_GROUP_LIST: 'FETCH_KPI_DEF_GROUP_LIST', //* 속성그룹 리스트 가져오기
  FETCH_PER_TYPE_LIST: 'FETCH_PER_TYPE_LIST', //* 실적집계 리스트 가져오기
  FETCH_ACC_TYPE_LIST: 'FETCH_ACC_TYPE_LIST', //* 실적누계 리스트 가져오기
  FETCH_UNIT_TYPE_LIST: 'FETCH_UNIT_TYPE_LIST', //* 단위 리스트 가져오기
  FETCH_CHECK_KPI_NM: 'FETCH_CHECK_KPI_NM', //* KPI명 중복체크 데이터 가져오기
  FETCH_KPI_UNIT_CATEGORY_LIST: 'FETCH_KPI_UNIT_CATEGORY_LIST', //* 측정단위 카테고리 리스트 가져오기
  FETCH_KPI_UNIT_UNIT_LIST: 'FETCH_KPI_UNIT_UNIT_LIST', //* 측정단위 단위 리스트 가져오기
  FETCH_LANGUAGE_LIST: 'FETCH_LANGUAGE_LIST', //* 사용언어 리스트 가져오기
  FETCH_REG_GOAL_KPI_DATA_SET: 'FETCH_REG_GOAL_KPI_DATA_SET', //* 목표등록 - KPI정보가져오기
  FETCH_KPI_INFO_DATA: 'FETCH_KPI_INFO_DATA', //* KPI 정보 데이터가져오기
  FETCH_KPI_ADD_USER_LIST: 'FETCH_KPI_ADD_USER_LIST', //* KPI공동사용자 조회
  FETCH_IS_MBO_KPI: 'FETCH_IS_MBO_KPI', //* KPI MBO 여부 조회

  // TODO: UPDATE CONSTANT DECLARATION
  UPDATE_BASE_YEAR_DATA: 'GET_BASE_YEAR_DATA', //* 기준 년 설정
  UPDATE_BASE_MONTH_DATA: 'GET_BASE_MONTH_DATA', //* 기준 년 설정
  UPDATE_BSC_POOL_LIST: 'UPDATE_BSC_POOL_LIST', //* BSC 목표수립리스트에 업데이트
  UPDATE_KPI_POOL_DATA_LIST: 'UPDATE_KPI_POOL_DATA_LIST', //* KPI 목표수립리스트에 업데이트
  UPDATE_KPI_POOL_SINGLE: 'UPDATE_KPI_POOL_SINGLE', //* KPI 목표수립리스트 단일ROW 업데이트
  UPDATE_SEARCH_KPI_CUSTOM_DATA: 'UPDATE_SEARCH_KPI_CUSTOM_DATA', //* 맞춤속성찾기데이터 업데이트
  UPDATE_NEW_KPI_DATA: 'UPDATE_NEW_KPI_DATA', //* 신규KPI 저장
  UPDATE_LOADED_KPI_DATA: 'UPDATE_LOADED_KPI_DATA', //*KPI 수정
  UPDATE_KPI_TARGET_MONTH_DATA: 'UPDATE_KPI_TARGET_MONTH_DATA', //*KPI 월목표 저장
  UPDATE_KPI_TARGET_WEEK_DATA: 'UPDATE_KPI_TARGET_WEEK_DATA', //*KPI 주목표 저장
  UPDATE_KPI_TREE_LIST: 'UPDATE_KPI_TREE_LIST', //*KPI목표수립리스트 데이터 업데이트
  UPDATE_KPI_INFO_DATA: 'UPDATE_KPI_INFO_DATA', //* KPI 정보 업데이트 하기
  UPDATE_COPY_LAST_YEAR_TREE_LIST: 'UPDATE_COPY_LAST_YEAR_TREE_LIST', //*작년체계도 복사
  UPDATE_APPLY_MBO_KPI: 'UPDATE_APPLY_MBO_KPI', //* KPI MBO 적용
  UPDATE_KPI_SIMPLE_CHILD_LIST: 'UPDATE_KPI_SIMPLE_CHILD_LIST', //*단순하위kpi추가
  UPDATE_KPI_TARGET_MW: 'UPDATE_KPI_TARGET_MW', //* 월별 KPI 주간목표 등록
  // TODO: DELETE CONSTANT DECLARATION
  DELETE_BSC_KPI_LIST: 'DELETE_BSC_KPI_LIST', //* KPI 목표수립리스트 ROW 삭제
  DELETE_KPI_SIMPLE_CHILD_LIST: 'DELETE_KPI_SIMPLE_CHILD_LIST', //*단순하위kpi삭제
  // TODO: INIT CONSTANT DECLARATION
  INIT_KPI_DEF_GROUP_DATA: 'INIT_KPI_DEF_GROUP_DATA', //* 속성그룹 데이터 설정
  INIT_CHECK_KPI_NM: 'INIT_CHECK_KPI_NM', //* KPI명 중복체크 데이터 설정
  INIT_KPI_UNIT_CATEGORY_LIST: 'INIT_KPI_UNIT_CATEGORY_LIST', //* 측정단위 카테고리 리스트 세팅
  INIT_KPI_UNIT_UNIT_LIST: 'INIT_KPI_UNIT_UNIT_LIST', //* 측정단위 단위 리스트 세팅
  INIT_SELECTED_KPI_POOL_LIST: 'INIT_SELECTED_KPI_POOL_LIST', //* 선택한 KPI 리스트 세팅
  INIT_SELECTED_UNIT_DATA: 'INIT_SELECTED_UNIT_DATA', //*선택한 단위 세팅
  INIT_EXIST_DEF_LIST: 'INIT_EXIST_DEF_LIST', //* 기존KPI속성찾기 리스트 세팅
  INIT_REG_GOAL_SELECTED_YEAR_DATA: 'INIT_REG_GOAL_SELECTED_YEAR_DATA', //* 목표등록 - 선택한 조회년도 세팅
  INIT_REG_GOAL_SELECTED_MONTH_DATA: 'INIT_REG_GOAL_SELECTED_MONTH_DATA', //* 목표등록 - 선택한 조회월 세팅
  INIT_KPI_ADD_USER_LIST: 'INIT_KPI_ADD_USER_LIST', //* KPI공동사용자 세팅
  INIT_APPLY_MBO_LIST: 'INIT_APPLY_MBO_LIST', //* KPI MBO 적용 리스트 세팅
  INIT_KPI_INFO_DATA: 'INIT_KPI_INFO_DATA', //* KPI 속성그룹 수정 데이터 세팅

  //! 팝업 ON/OFF 설정
  INIT_VIEWS_KPI_CHILD_POP: 'INIT_VIEWS_KPI_CHILD_POP', //* 하위 KPI 팝업 ON/OFF 설정
  INIT_VIEWS_KPI_SIMPLE_CHILD_POP: 'INIT_VIEWS_KPI_SIMPLE_CHILD_POP', //* 단순하위 KPI 팝업 ON/OFF 설정
  INIT_VIEWS_KPI_REG_GOAL_POP: 'INIT_VIEWS_KPI_REG_GOAL_POP', //* 목표 등록 팝업 ON/OFF 설정
  INIT_VIEWS_BSC_POOL_POP: 'INIT_VIEWS_BSC_POOL_POP', //* 전체 BSC 목록 팝업 ON/OFF 설정
  INIT_VIEWS_KPI_POOL_LIST_POP: 'INIT_VIEWS_KPI_POOL_LIST_POP', //* 전체 KPI 목록 팝업 ON/OFF 설정
  INIT_VIEWS_CUSTOM_DEF_POP: 'INIT_VIEWS_CUSTOM_DEF_POP', //* 맞춤속성찾기 팝업 ON/OFF 설정
  INIT_VIEWS_EXIST_DEF_POP: 'INIT_VIEWS_EXIST_DEF_POP', //* 기존 KPI로 찾기 팝업 ON/OFF 설정
  INIT_VIEWS_DEF_GROUP_POP: 'INIT_VIEWS_DEF_GROUP_POP', //* KPI속성그룹 팝업 ON/OFF 설정
  INIT_VIEWS_KPI_REGIST_POP: 'INIT_VIEWS_KPI_REGIST_POP', //* 신규 KPI 등록 팝업 ON/OFF 설정
  INIT_VIEWS_KPI_UPDATE_POP: 'INIT_VIEWS_KPI_UPDATE_POP', //* KPI 수정 팝업 ON/OFF 설정
  INIT_VIEWS_CHILD_KPI_POOL_POP: 'INIT_VIEWS_CHILD_KPI_POOL_POP', //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF 설정
};

export const mutations = {
  //! 컨텐츠 데이터
  SET_BASE_YEAR_DATA: 'GET_BASE_YEAR_DATA', //* 기준 년 설정
  SET_BASE_MONTH_DATA: 'GET_BASE_MONTH_DATA', //* 기준 년 설정
  SET_KPI_TARGET_ESTABILSHMENT_LIST: 'SET_KPI_TARGET_ESTABILSHMENT_LIST', //* KPI목표수립 리스트 데이터 세팅
  SET_BSC_POOL_LIST: 'SET_BSC_POOL_LIST', //* BSC 관점 리스트 데이터 세팅
  SET_KPI_POOL_DATA_LIST: 'SET_KPI_POOL_DATA_LIST', //* KPI POOL 리스트 데이터 세팅
  SET_CHILD_KPI_POOL_LIST: 'SET_CHILD_KPI_POOL_LIST', //*하위 KPI연결 KPI POOL 리스트 데이터 세팅
  SET_KPI_CHILD_LIST: 'SET_KPI_CHILD_LIST', //* 하위 KPI리스트 데이터 세팅
  SET_KPI_SIMPLE_CHILD_LIST: 'SET_KPI_SIMPLE_CHILD_LIST', //* 단순하위 KPI리스트 데이터 세팅
  SET_EXIST_DEF_LIST: 'SET_EXIST_DEF_LIST', //* 기존KPI속성찾기 리스트 세팅
  SET_SEARCH_KPI_CUSTOM_DATA: 'SET_SEARCH_KPI_CUSTOM_DATA', //* 맞춤속성찾기데이터 세팅
  SET_KPI_DEF_GROUP_LIST: 'SET_KPI_DEF_GROUP_LIST', //* 속성그룹 리스트 데이터 세팅
  SET_KPI_DEF_GROUP_DATA: 'SET_KPI_DEF_GROUP_DATA', //* 속성그룹 데이터 설정
  SET_PER_TYPE_LIST: 'SET_PER_TYPE_LIST', //* 실적집계 리스트 데이터 세팅
  SET_ACC_TYPE_LIST: 'SET_ACC_TYPE_LIST', //* 실적누계 리스트  데이터 세팅
  SET_UNIT_TYPE_LIST: 'SET_UNIT_TYPE_LIST', //* 단위 리스트  데이터 세팅
  SET_CHECK_KPI_NM: 'SET_CHECK_KPI_NM', //* KPI명 중복체크 데이터 세팅
  SET_KPI_UNIT_CATEGORY_LIST: 'SET_KPI_UNIT_CATEGORY_LIST', //* 측정단위 카테고리 리스트 세팅
  SET_KPI_UNIT_UNIT_LIST: 'SET_KPI_UNIT_UNIT_LIST', //* 측정단위 단위 리스트 세팅
  SET_SELECTED_KPI_POOL_LIST: 'SET_SELECTED_KPI_POOL_LIST', //* 선택한 KPI 리스트 세팅
  SET_SELECTED_UNIT_DATA: 'SET_SELECTED_UNIT_DATA', //*선택한 단위 세팅
  SET_LANGUAGE_LIST: 'SET_LANGUAGE_LIST', //* 사용언어 리스트 세팅
  SET_REG_GOAL_KPI_DATA: 'SET_REG_GOAL_KPI_DATA', //* 목표등록 - KPI정보 세팅
  SET_REG_GOAL_TARGET_YY_DATA: 'SET_REG_GOAL_TARGET_YY_DATA', //* 목표등록 - KPI년목표 세팅
  SET_REG_GOAL_SELECTED_YEAR_DATA: 'SET_REG_GOAL_SELECTED_YEAR_DATA', //* 목표등록 - 선택한 조회년도 세팅
  SET_REG_GOAL_SELECTED_MONTH_DATA: 'SET_REG_GOAL_SELECTED_MONTH_DATA', //* 목표등록 - 선택한 조회월 세팅
  SET_KPI_INFO_DATA: 'SET_KPI_INFO_DATA', //* KPI 정보 데이터가져오기
  SET_KPI_ADD_USER_LIST: 'SET_KPI_ADD_USER_LIST', //* KPI공동사용자 조회
  SET_APPLY_MBO_LIST: 'SET_APPLY_MBO_LIST', //* KPI MBO 적용 리스트 세팅
  SET_IS_MBO_KPI: 'SET_IS_MBO_KPI', //* KPI MBO 여부 조회
  //! 팝업 ON/OFF 설정
  SET_VIEWS_KPI_CHILD_POP: 'SET_VIEWS_KPI_CHILD_POP', //* 하위 KPI 팝업 ON/OFF 설정
  SET_VIEWS_KPI_SIMPLE_CHILD_POP: 'SET_VIEWS_KPI_SIMPLE_CHILD_POP', //* 단순하위 KPI 팝업 ON/OFF 설정
  SET_VIEWS_KPI_REG_GOAL_POP: 'SET_VIEWS_KPI_REG_GOAL_POP', //* 목표 등록 팝업 ON/OFF 설정
  SET_VIEWS_BSC_POOL_POP: 'SET_VIEWS_BSC_POOL_POP', //* 전체 BSC 목록 팝업 ON/OFF 설정
  SET_VIEWS_KPI_POOL_LIST_POP: 'SET_VIEWS_KPI_POOL_LIST_POP', //* 전체 KPI 목록 팝업 ON/OFF 설정
  SET_VIEWS_CUSTOM_DEF_POP: 'SET_VIEWS_CUSTOM_DEF_POP', //* 맞춤속성찾기 팝업 ON/OFF 설정
  SET_VIEWS_EXIST_DEF_POP: 'SET_VIEWS_EXIST_DEF_POP', //* 전기존 KPI로 찾기팝업 ON/OFF 설정
  SET_VIEWS_DEF_GROUP_POP: 'SET_VIEWS_DEF_GROUP_POP', //* KPI속성그룹팝업 ON/OFF 설정
  SET_VIEWS_KPI_REGIST_POP: 'SET_VIEWS_KPI_REGIST_POP', //* 신규 KPI 등록 팝업 ON/OFF 설정
  SET_VIEWS_KPI_UPDATE_POP: 'SET_VIEWS_KPI_UPDATE_POP', //* KPI 수정 팝업 ON/OFF 설정
  SET_VIEWS_CHILD_KPI_POOL_POP: 'SET_VIEWS_CHILD_KPI_POOL_POP', //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF 설정
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `kpiTargetEstablishment/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `kpiTargetEstablishment/${cur[1]}`;
    return acc;
  }, {}),
};