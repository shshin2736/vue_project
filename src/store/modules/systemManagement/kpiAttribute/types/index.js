export const getters = {
  //! 컨텐츠 데이터
  GET_KPI_ATTRIBUTE_LIST: 'GET_KPI_ATTRIBUTE_LIST', //* KPI 속성 리스트 가져오기
  GET_KPI_ATTRIBUTE_INFO: 'GET_KPI_ATTRIBUTE_INFO', //* KPI 속성 DETAIL 가져오기
  GET_KPI_ATTRIBUTE_CHECK: 'GET_KPI_ATTRIBUTE_CHECK', //* KPI 속성명 중복체크
  GET_SRCH_PARAM: 'GET_SRCH_PARAM', //* KPI속성 검색 PARAM
};

export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_KPI_ATTRIBUTE_LIST: 'FETCH_KPI_ATTRIBUTE_LIST', //* KPI 속성 리스트 가져오기
  FETCH_KPI_ATTRIBUTE_INFO: 'FETCH_KPI_ATTRIBUTE_INFO', //* KPI 속성 DETAIL 가져오기
  FETCH_KPI_ATTRIBUTE_CHECK: 'FETCH_KPI_ATTRIBUTE_CHECK', //* KPI 속성명 중복체크

  // TODO: UPDATE CONSTANT DECLARATION
  UPDATE_KPI_ATTRIBUTE_INFO: 'UPDATE_KPI_ATTRIBUTE_INFO', //* KPI 속성 저장

  // TODO: DELETE CONSTANT DECLARATION
  DELETE_KPI_ATTRIBUTE_INFO: 'DELETE_KPI_ATTRIBUTE_INFO', //* KPI 속성 삭제
};

export const mutations = {
  //! 컨텐츠 데이터
  SET_KPI_ATTRIBUTE_LIST: 'SET_KPI_ATTRIBUTE_LIST', //* KPI 속성 리스트 데이터 세팅
  SET_KPI_ATTRIBUTE_INFO: 'SET_KPI_ATTRIBUTE_INFO', //* KPI 속성 DETAIL 데이터 세팅
  SET_KPI_ATTRIBUTE_CHECK: 'SET_KPI_ATTRIBUTE_CHECK', //* KPI 속성명 중복체크
  SET_SRCH_PARAM: 'SET_SRCH_PARAM', //* KPI속성 검색 PARAM
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `kpiAttribute/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `kpiAttribute/${cur[1]}`;
    return acc;
  }, {}),
};
