//* GETTER CONSTANT
export const getters = {
  GET_LOG_LIST: 'GET_LOG_LIST', //* LOG 리스트 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  FETCH_LOG_LIST: 'FETCH_LOG_LIST', //* LOG 리스트 가져오기
  INIT_LOG_LIST: 'INIT_LOG_LIST', //* LOG 리스트데이터 초기화
};

//* MUTATIONS CONSTANT
export const mutations = {
  SET_LOG_LIST: 'SET_LOG_LIST', //* LOG 리스트 저장
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `logManagement/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `logManagement/${cur[1]}`;
    return acc;
  }, {}),
};
