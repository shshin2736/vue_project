//* GETTER CONSTANT
export const getters = {
  // TODO: GET CONSTANT DECLARATION
  GET_QNA_LIST: 'GET_QNA_LIST', //* 저장된 이용 문의 리스트 가져오기
  GET_QNA_DETAIL: 'GET_QNA_DETAIL', //*  저장된 이용 문의 내용 가져오기
  GET_QNA_SRCH_PARAM: 'GET_QNA_SRCH_PARAM', //* 저장된 검색 조건 가져오기
  GET_USER_INFO: 'GET_USER_INFO', //* 저장된 로그인 중인 사용자 정보 가져오기
  GET_QNA_REPLY_LIST: 'GET_QNA_REPLY_LIST', //* 저장된 댓글 리스트 가져오기
  GET_QNA_EXCEL_DATA: 'GET_QNA_EXCEL_DATA', //* QNA 글 및 댓글 리스트 가져오기
  GET_QNA_ERRORS: 'GET_QNA_ERRORS', //* VALIDATE ERROR 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_QNA_LIST: 'FETCH_QNA_LIST', //* 이용 문의 리스트 가져오기
  FETCH_QNA_DETAIL: 'FETCH_QNA_DETAIL', //* 선택한 이용 문의 내용 가져오기
  FETCH_QNA_REPLY_LIST: 'FETCH_QNA_REPLY_LIST', //* 댓글 리스트 가져오기
  FETCH_QNA_EXCEL_DATA: 'FETCH_QNA_EXCEL_DATA', //* QNA 글 및 댓글 리스트 가져오기
  // TODO: INSERT CONSTANT DECLARATION
  INSERT_QNA_DETAIL: 'INSERT_QNA_DETAIL', //* 새 이용 문의 저장하기(인서트)
  INSERT_QNA_REPLY: 'INSERT_QNA_REPLY', //* 입력한 내용 댓글로 저장하기
  // TODO: UPDATE CONSTANT DECLARATION
  UPDATE_QNA_DETAIL: 'UPDATE_QNA_DETAIL', //* 이용 문의 수정하기(업데이트)
  UPDATE_SH_COUNT: 'UPDATE_SH_COUNT', //* 게시글 조회수 증가하기
  UPDATE_QNA_STATUS_A: 'UPDATE_QNA_STATUS_A', //* 이용문의 운영자 조회 시 상태 변경하기
  UPDATE_QNA_STATUS_C: 'UPDATE_QNA_STATUS_C', //* 이용문의 운영자 답변 시 상태 변경하기
  UPDATE_QNA_REPLY: 'UPDATE_QNA_REPLY', //* 댓글 수정하기(업데이트)
  // TODO: DELETE CONSTANT DECLARATION
  DELETE_QNA_DETAIL: 'DELETE_QNA_DETAIL', //* 선택한 이용 문의 삭제하기(딜리트)
  DELETE_QNA_REPLY: 'DELETE_QNA_REPLY', //* 선택한 댓글 삭제하기
  // TODO: INIT CONSTANT DECLARATION
  INIT_QNA_LIST: 'INIT_QNA_LIST', //* 이용 문의 리스트 초기화하기
  INIT_QNA_DETAIL: 'INIT_QNA_DETAIL', //* 이용 문의 등록화면 초기화하기
  INIT_QNA_SRCH_PARAM: 'INIT_QNA_SRCH_PARAM', //* 검색조건 초기화하기
  INIT_QNA_REPLY_LIST: 'INIT_QNA_REPLY_LIST', //* 댓글 리스트 초기화하기
  INIT_QNA_EXCEL_DATA: 'INIT_QNA_EXCEL_DATA', //* QNA 글 및 댓글 리스트 초기화하기
  INIT_QNA_ERRORS: 'INIT_QNA_ERRORS', //* VALIDATE ERROR 저장
};

//* MUTATIONS CONSTANT
export const mutations = {
  // TODO: SET CONSTANT DECLARATION
  SET_QNA_LIST: 'SET_QNA_LIST', //* 이용 문의 리스트 저장하기
  SET_QNA_DETAIL: 'SET_QNA_DETAIL', //* 선택한 이용 문의 내용 저장하기
  SET_QNA_SRCH_PARAM: 'SET_QNA_SRCH_PARAM', //* 이용 문의 리스트 검색조건 저장하기
  SET_USER_INFO: 'SET_USER_INFO', //* 로그인 중인 사용자 정보 저장하기
  SET_QNA_REPLY_LIST: 'SET_QNA_REPLY_LIST', //* 댓글 리스트 저장하기
  SET_QNA_EXCEL_DATA: 'SET_QNA_EXCEL_DATA', //* QNA 글 및 댓글 리스트 저장하기
  SET_QNA_ERRORS: 'SET_QNA_ERRORS', //* VALIDATE ERROR 저장
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `qna/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `qna/${cur[1]}`;
    return acc;
  }, {}),
};
