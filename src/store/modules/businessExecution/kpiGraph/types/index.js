export const getters = {
  //* 월별 KPI 실적 목록 가져오기
  GET_KPI_MONTH_LIST: 'GET_KPI_MONTH_LIST',
  //* KPI 메인차트 가져오기
  GET_KPI_MAIN_CHART: 'GET_KPI_MAIN_CHART',
  //* KPI차트 그룹 목록 가져오기
  GET_CHART_GRP_LIST: 'GET_CHART_GRP_LIST',
  //* KPI차트 KPI 목록 가져오기
  GET_CHART_KPI_LIST: 'GET_CHART_KPI_LIST',
  //* KPI차트 사용자 목록 가져오기
  GET_CHART_USER_LIST: 'GET_CHART_USER_LIST',
  //* KPI 차트 그룹 상세정보 가져오기
  GET_CHART_GRP_DETAIL: 'GET_CHART_GRP_DETAIL',
  //* 임원 메인노출 여부
  GET_DSB_YN: 'GET_DSB_YN',
  //* KPI 차트 그룹 그래프 타입 가져오기
  GET_GRP_DATA: 'GET_GRP_DATA',
  //* 최근 그래프 3개 가져오기
  GET_RECENT_LIST: 'GET_RECENT_LIST',
  //* 최근 그래프의 KPI 목록 가져오기
  GET_RECENT_KPI: 'GET_RECENT_KPI',
  //* 최근 그래프의 실적데이터 가져오기
  GET_RECENT_DATA: 'GET_RECENT_KPI',
  //* 그래프 아이콘 클릭 시 넘겨주는 데이터
  GET_CHART_DATA: 'GET_CHART_DATA',
  //* 그래프 아이콘 클릭 시 넘겨주는 KPI 데이터
  GET_CHART_KPI: 'GET_CHART_KPI',
  //* 차트그룹 그룹 그리드 컬럼 설정
  GET_GRP_COLUMS: 'GET_GRP_COLUMS',
  //* 차트그룹 KPI목록 그리드 컬럼 설정
  GET_KPI_COLUMS: 'GET_KPI_COLUMS',
  //* 차트그룹 사용자 목록 그리드 컬럼 설정
  GET_USER_COLUMS: 'GET_USER_COLUMS',

  //* 차트그룹 생성 팝업 ON/OFF
  GET_VIEWS_CREATE_CHART_POPUP: 'GET_VIEWS_CREATE_CHART_POPUP',
  //* 차트그룹 상세 팝업 ON/OFF
  GET_VIEWS_CHART_DETAIL_POPUP: 'GET_VIEWS_CHART_DETAIL_POPUP',
};

export const actions = {
  //* 월별 KPI 실적 목록 불러오기
  FETCH_KPI_MONTH_LIST: 'FETCH_KPI_MONTH_LIST',
  //* 월별 KPI 실적 목록 초기화
  INIT_KPI_MONTH_LIST: 'INIT_KPI_MONTH_LIST',
  //* KPI차트 그룹 목록 불러오기
  FETCH_CHART_GRP_LIST: 'FETCH_CHART_GRP_LIST',
  //* KPI차트 KPI 목록 불러오기
  FETCH_CHART_KPI_LIST: 'FETCH_CHART_KPI_LIST',
  //* KPI차트 사용자 목록 불러오기
  FETCH_CHART_USER_LIST: 'FETCH_CHART_USER_LIST',
  //* KPI 메인차트 불러오기
  FETCH_KPI_MAIN_CHART: 'FETCH_KPI_MAIN_CHART',
  //* KPI 차트 그룹 생성/수정
  UPDATE_CHART_GRP: 'UPDATE_CHART_GRP',
  //* KPI 차트 그룹 상세정보 불러오기
  FETCH_CHART_GRP_DETAIL: 'FETCH_CHART_GRP_DETAIL',
  //* KPI 차트 그룹 상세정보 초기화
  INIT_CHART_GRP_DETAIL: 'INIT_CHART_GRP_DETAIL',
  //* 임원 메인노출 여부
  FETCH_DSB_YN: 'FETCH_DSB_YN',
  //* 차트그룹 KPI 추가/삭제
  UPDATE_CHART_KPI: 'UPDATE_CHART_KPI',
  //* 차트그룹 사용자 추가/삭제
  UPDATE_CHART_USER: 'UPDATE_CHART_USER',
  //* KPI 이중축 사용 여부
  UPDATE_KPI_AXIS2_YN: 'UPDATE_KPI_AXIS2_YN',
  //* KPI 차트 그룹 KPI 목록 초기화
  INIT_CHART_KPI: 'INIT_CHART_KPI',
  //* KPI 차트 그룹 사용자 목록 초기화
  INIT_CHART_USER: 'INIT_CHART_USER',
  //* KPI 차트 그룹 그래프 타입 저장
  INIT_GRP_DATA: 'INIT_GRP_DATA',
  //* 임원 메인화면 출력여부
  UPDATE_DSB_YN: 'UPDATE_DSB_YN',
  //* 최근 그래프 3개 불러오기
  FETCH_RECENT_LIST: 'FETCH_RECENT_LIST',
  //* 최근 그래프의 KPI 목록 저장
  INIT_RECENT_KPI: 'INIT_RECENT_KPI',
  //* 최근 그래프의 실적데이터 저장
  INIT_RECENT_DATA: 'INITIT_RECENT_KPI',
  //* 차트그룹 그룹 그리드 컬럼 설정
  INIT_GRP_COLUMS: 'INIT_GRP_COLUMS',
  //* 차트그룹 KPI목록 그리드 컬럼 설정
  INIT_KPI_COLUMS: 'INIT_KPI_COLUMS',
  //* 차트그룹 사용자 목록 그리드 컬럼 설정
  INIT_USER_COLUMS: 'INIT_USER_COLUMS',

  //* 차트그룹 생성 팝업 ON/OFF
  INIT_VIEWS_CREATE_CHART_POPUP: 'INIT_VIEWS_CREATE_CHART_POPUP',
  //* 차트그룹 상세 팝업 ON/OFF
  INIT_VIEWS_CHART_DETAIL_POPUP: 'INIT_VIEWS_CHART_DETAIL_POPUP',
};

export const mutations = {
  //* 월별 KPI 실적 목록 저장
  SET_KPI_MONTH_LIST: 'SET_KPI_MONTH_LIST',
  //* KPI 메인차트 저장
  SET_KPI_MAIN_CHART: 'SET_KPI_MAIN_CHART',
  //* KPI차트 그룹 목록 저장
  SET_CHART_GRP_LIST: 'SET_CHART_GRP_LIST',
  //* KPI차트 KPI 목록 저장
  SET_CHART_KPI_LIST: 'SET_CHART_KPI_LIST',
  //* KPI차트 사용자 목록 저장
  SET_CHART_USER_LIST: 'SET_CHART_USER_LIST',
  //* KPI 차트 그룹 상세정보 저장
  SET_CHART_GRP_DETAIL: 'SET_CHART_GRP_DETAIL',
  //* 임원 메인노출 여부
  SET_DSB_YN: 'SET_DSB_YN',
  //* KPI 차트 그룹 그래프 타입 저장
  SET_GRP_DATA: 'SET_GRP_DATA',
  //* 최근 그래프 3개 저장
  SET_RECENT_LIST: 'SET_RECENT_LIST',
  //* 최근 그래프의 KPI 목록 저장
  SET_RECENT_KPI: 'SET_RECENT_KPI',
  //* 최근 그래프의 실적데이터 저장
  SET_RECENT_DATA: 'SET_RECENT_KPI',
  //* 그래프 아이콘 클릭 시 넘겨주는 데이터
  SET_CHART_DATA: 'SET_CHART_DATA',
  //* 그래프 아이콘 클릭 시 넘겨주는 KPI 데이터
  SET_CHART_KPI: 'SET_CHART_KPI',
  //* 차트그룹 그룹 그리드 컬럼 설정
  SET_GRP_COLUMS: 'SET_GRP_COLUMS',
  //* 차트그룹 KPI목록 그리드 컬럼 설정
  SET_KPI_COLUMS: 'SET_KPI_COLUMS',
  //* 차트그룹 사용자 목록 그리드 컬럼 설정
  SET_USER_COLUMS: 'SET_USER_COLUMS',

  //* 차트그룹 생성 팝업 ON/OFF
  SET_VIEWS_CREATE_CHART_POPUP: 'SET_VIEWS_CREATE_CHART_POPUP',
  //* 차트그룹 상세 팝업 ON/OFF
  SET_VIEWS_CHART_DETAIL_POPUP: 'SET_VIEWS_CHART_DETAIL_POPUP',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `kpiGraph/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `kpiGraph/${cur[1]}`;
    return acc;
  }, {}),
};
