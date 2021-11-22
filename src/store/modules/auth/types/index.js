export const getters = {
  // TODO: GET CONSTANT DECLARATION
  GET_VIEWS_IS_LOGIN: 'GET_VIEWS_IS_LOGIN',
  GET_FIND_ACCOUNT_INFO: 'GET_FIND_ACCOUNT_INFO', //* ID/PW 찾기 정보 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_LOGIN: 'FETCH_LOGIN', //* 로그인 데이터 가져오기
  FETCH_FIND_ACCOUNT_INFO: 'FETCH_FIND_ACCOUNT_INFO', //* ID/PW 찾기 정보
  FETCH_SSO_LOGIN: 'FETCH_SSO_LOGIN', //* AS_IS HMS 로그인

  // TODO: INSERT CONSTANT DECLARATION

  // TODO: UPDATE CONSTANT DECLARATION

  // TODO: DELETE CONSTANT DECLARATION

  // TODO: INIT CONSTANT DECLARATION
  INIT_LOGIN: 'INIT_LOGIN', //* 로그인 데이터 초기화
  INIT_FIND_ACCOUNT_INFO: 'INIT_FIND_ACCOUNT_INFO', //* ID/PW 찾기 정보 초기화
};

//* MUTATIONS CONSTANT
export const mutations = {
  // TODO: SET CONSTANT DECLARATION
  SET_IS_LOGIN: 'SET_LOGIN', //* 로그인 여부 저장
  SET_FIND_ACCOUNT_INFO: 'SET_FIND_ACCOUNT_INFO', //* ID/PW 찾기 정보 저장
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `auth/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `auth/${cur[1]}`;
    return acc;
  }, {}),
};
