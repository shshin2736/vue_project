export const getters = {
  //* 다국어 메시지 목록 가져오기
  GET_MESSAGE_LIST: 'GET_MESSAGE_LIST',
  //* 검색 파라미터 가져오기
  GET_SRCH_PARAM: 'GET_SRCH_PARAM',
  //* 다국어 상세 정보 가져오기
  GET_MESSAGE_INFO: 'GET_MESSAGE_INFO',

  //* 다국어 메시지 등록 팝업 ON/OFF 가져오기
  GET_VIEWS_MESSAGE_UPDATE_POPUP: 'GET_VIEWS_MESSAGE_UPDATE_POPUP',
};

export const actions = {
  //* 다국어 메시지 목록 불러오기
  FETCH_MESSAGE_LIST: 'FETCH_MESSAGE_LIST',
  //* 다국어 상세 정보 불러오기
  FETCH_MESSAGE_INFO: 'FETCH_MESSAGE_INFO',

  //* 다국어 메시지 상세 정보 초기화
  INIT_MESSAGE_INFO: 'INIT_MESSAGE_INFO',

  //* 다국어 메시지 저장하기
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',

  //* 다국어 메시지 삭제하기
  DELETE_MESSAGE: 'DELETE_MESSAGE',

  //* 다국어 메시지 등록 팝업 ON/OFF 설정
  INIT_VIEWS_MESSAGE_UPDATE_POPUP: 'INIT_VIEWS_MESSAGE_UPDATE_POPUP',
};

export const mutations = {
  //* 다국어 메시지 목록 저장하기
  SET_MESSAGE_LIST: 'SET_MESSAGE_LIST',
  //* 검색 파라미터 저장하기
  SET_SRCH_PARAM: 'SET_SRCH_PARAM',
  //* 다국어 메시지 상세 정보 저장하기
  SET_MESSAGE_INFO: 'SET_MESSAGE_INFO',

  //* 다국어 메시지 등록 팝업 ON/OFF 저장하기
  SET_VIEWS_MESSAGE_UPDATE_POPUP: 'SET_VIEWS_MESSAGE_UPDATE_POPUP',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `i18nManagement/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `i18nManagement/${cur[1]}`;
    return acc;
  }, {}),
};
