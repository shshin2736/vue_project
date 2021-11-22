export const getters = {
  //* 권한 목록 가져오기
  GET_USER_ROLE_LIST: 'GET_USER_ROLE_LIST',
  //* 권한별 메뉴 목록 가져오기
  GET_ROLE_MEMU_LIST: 'GET_ROLE_MEMU_LIST',
  //* 권한 상세정보 가져오기
  GET_ROLE_INFO: 'GET_ROLE_INFO',
  //* 권한별 사용자 목록 가져오기
  GET_ROLE_USER: 'GET_ROLE_USER',

  //* 권한 추가 팝업 ON/OFF 가져오기
  GET_VIEWS_ROLE_ADD_POPUP: 'GET_VIEWS_ROLE_ADD_POPUP',
  //* 사용자별 권한 설정 팝업 ON/OFF 가져오기
  GET_VIEWS_MENU_ADD_POPUP: 'GET_VIEWS_MENU_ADD_POPUP',
};

export const actions = {
  //* 권한 목록 불러오기
  FETCH_USER_ROLE_LIST: 'FETCH_USER_ROLE_LIST',
  //* 권한별 메뉴 목록 불러오기
  FETCH_ROLE_MEMU_LIST: 'FETCH_ROLE_MEMU_LIST',
  //* 권한 상세정보 불러오기
  FETCH_ROLE_INFO: 'FETCH_ROLE_INFO',
  //* 권한 저장/수정하기
  UPDATE_ROLE: 'UPDATE_ROLE',
  //* 권한별 메뉴 등록/수정
  UPDATE_ROLE_MEMU_LIST: 'UPDATE_ROLE_MEMU_LIST',
  //* 권한별 사용자 등록/수정
  UPDATE_USER_ASSIGN: 'UPDATE_USER_ASSIGN',

  //* 권한 삭제하기
  DELETE_ROLE: 'DELETE_ROLE',
  //* 권한별 사용자 삭제
  DELETE_USER_ASSIGN: 'DELETE_USER_ASSIGN',
  //* 권한별 메뉴 삭제
  DELETE_ROLE_MENU: 'DELETE_ROLE_MENU',

  //* 권한 상세정보 초기화
  INIT_ROLE_INFO: 'INIT_ROLE_INFO',
  //* 권한별 메뉴 목록 초기화
  INIT_ROLE_MENU_LIST: 'INIT_ROLE_MENU_LIST',

  //* 권한 추가 팝업 ON/OFF 설정
  INIT_VIEWS_ROLE_ADD_POPUP: 'INIT_VIEWS_ROLE_ADD_POPUP',
  //* 권한별 메뉴 등록/수정 팝업 ON/OFF 설정
  INIT_VIEWS_MENU_ADD_POPUP: 'INIT_VIEWS_MENU_ADD_POPUP',
};

export const mutations = {
  //* 권한 추가 팝업 ON/OFF 설정
  SET_USER_ROLE_LIST: 'SET_USER_ROLE_LIST',
  //* 권한별 메누 목록 저장하기
  SET_ROLE_MENU_LIST: 'SET_ROLE_MEMU_LIST',
  //* 권한 상세정보 저장하기
  SET_ROLE_INFO: 'SET_ROLE_INFO',
  //* 권한별 사용자 저장하기
  SET_ROLE_USER: 'SET_ROLE_USER',

  //* 메뉴 추가 팝업 ON/OFF 저장하기
  SET_VIEWS_MENU_ADD_POPUP: 'SET_VIEWS_MENU_ADD_POPUP',
  //* 권한 추가 팝업 ON/OFF 저장하기
  SET_VIEWS_ROLE_ADD_POPUP: 'SET_VIEWS_ROLE_ADD_POPUP',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `roleManagement/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `roleManagement/${cur[1]}`;
    return acc;
  }, {}),
};
