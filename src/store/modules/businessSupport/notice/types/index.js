//* GETTER CONSTANT
export const getters = {
  // TODO: GET CONSTANT DECLARATION
  GET_NOTICE_LIST: 'GET_NOTICE_LIST', //* 저장된 공지사항 리스트 가져오기
  GET_NOTICE_DETAIL: 'GET_NOTICE_DETAIL', //*  저장된 공지사항 내용 가져오기
  GET_NTC_SRCH_PARAM: 'GET_NTC_SRCH_PARAM', //* 저장된 검색 조건 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_NOTICE_LIST: 'FETCH_NOTICE_LIST', //* 공지사항 리스트 가져오기
  FETCH_NOTICE_DETAIL: 'FETCH_NOTICE_DETAIL', //* 선택한 공지사항 내용 서버에서 가져오기
  // TODO: INSERT CONSTANT DECLARATION
  INSERT_NOTICE_DETAIL: 'INSERT_NOTICE_DETAIL', //* 새 공지사항 저장하기(인서트 스토어 저장)
  // TODO: UPDATE CONSTANT DECLARATION
  UPDATE_NOTICE_DETAIL: 'UPDATE_NOTICE_DETAIL', //* 선택한 공지사항 수정하기(업데이트)
  // TODO: DELETE CONSTANT DECLARATION
  DELETE_NOTICE_DETAIL: 'DELETE_NOTICE_DETAIL', //* 선택한 공지사항 삭제하기(딜리트)
  // TODO: INIT CONSTANT DECLARATION
  INIT_NOTICE_DETAIL: 'INIT_NOTICE_DETAIL', //* 공지사항 등록화면 초기화하기
  INIT_NTC_SRCH_PARAM: 'INIT_NTC_SRCH_PARAM', //* 검색조건 초기화하기
};

//* MUTATIONS CONSTANT
export const mutations = {
  // TODO: SET CONSTANT DECLARATION
  SET_NOTICE_LIST: 'SET_NOTICE_LIST', //* 공지사항 리스트 저장하기
  SET_NOTICE_DETAIL: 'SET_NOTICE_DETAIL', //* 선택한 공지사항 내용 저장하기
  SET_NTC_SRCH_PARAM: 'SET_NTC_SRCH_PARAM', //* 공지사항 리스트 검색조건 저장하기
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `notice/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `notice/${cur[1]}`;
    return acc;
  }, {}),
};
