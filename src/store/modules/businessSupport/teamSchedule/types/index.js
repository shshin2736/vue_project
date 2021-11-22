//* GETTER CONSTANT
export const getters = {
  // TODO: GET CONSTANT DECLARATION
  GET_TEAM_SCHEDULE_LIST: 'GET_TEAM_SCHEDULE_LIST', //* 저장된 팀 일정 리스트 가져오기
  GET_TEAM_SCHEDULE_DETAIL: 'GET_TEAM_SCHEDULE_DETAIL', //* 저장된 팀 일정 내용 가져오기
  GET_TBD_SRCH_PARAM: 'GET_TBD_SRCH_PARAM', //* 저장된 검색 조건 가져오기
  GET_REPLY_LIST: 'GET_REPLY_LIST', //* 저장된 댓글 리스트 가져오기
  GET_TBD_ERRORS: 'GET_TBD_ERRORS', //* 에러 가져오기
  GET_TBD_UPLOAD_FILE: 'GET_TBD_UPLOAD_FILE', //*첨부파일 가져오기
};

//* ACTION CONSTANT
/*
! FETCH, INSERT, UPDATE, DELETE: 비동기으로 인한 데이터 서버 전송 및 내부 STATE 변경 시
! INIT: 컴포넌트 내부에서 STATE 변경 시
*/
export const actions = {
  // TODO: FETCH CONSTANT DECLARATION
  FETCH_TEAM_SCHEDULE_LIST: 'FETCH_TEAM_SCHEDULE_LIST', //* 팀 일정 리스트 가져오기
  FETCH_TEAM_SCHEDULE_DETAIL: 'FETCH_TEAM_SCHEDULE_DETAIL', //* 선택한 팀 일정 내용 가져오기
  FETCH_REPLY_LIST: 'FETCH_REPLY_LIST', //* 댓글 리스트 가져오기
  // TODO: INSERT CONSTANT DECLARATION
  INSERT_TEAM_BOARD_DETAIL: 'INSERT_TEAM_BOARD_DETAIL', //* 새 팀 게시판 저장하기(인서트)
  INSERT_REPLY: 'INSERT_REPLY', //* 입력한 내용 댓글로 저장하기
  // TODO: UPDATE CONSTANT DECLARATION
  UPDATE_TEAM_BOARD_DETAIL: 'UPDATE_TEAM_BOARD_DETAIL', //* 팀 게시판 수정하기(업데이트)
  UPDATE_SH_COUNT: 'UPDATE_SH_COUNT', //* 게시글 조회수 증가하기
  // TODO: DELETE CONSTANT DECLARATION
  DELETE_TEAM_BOARD_DETAIL: 'DELETE_TEAM_BOARD_DETAIL', //* 선택한 팀 게시판 삭제하기(딜리트)
  DELETE_REPLY: 'DELETE_REPLY', //* 선택한 댓글 삭제하기
  // TODO: INIT CONSTANT DECLARATION
  INIT_TEAM_BOARD_DETAIL: 'INIT_TEAM_BOARD_DETAIL', //* 팀 게시판 등록화면 초기화하기
  INIT_TBD_SRCH_PARAM: 'INIT_TBD_SRCH_PARAM', //* 검색조건 초기화하기
  INIT_REPLY_LIST: 'INIT_REPLY_LIST', //* 댓글 리스트 초기화하기
  INIT_TBD_ERRORS: 'INIT_TBD_ERRORS', //* 에러 저장
  INIT_TBD_UPLOAD_FILE: 'INIT_TBD_UPLOAD_FILE', //*첨부파일 추가/삭제
};

//* MUTATIONS CONSTANT
export const mutations = {
  // TODO: SET CONSTANT DECLARATION
  SET_TEAM_SCHEDULE_LIST: 'SET_TEAM_SCHEDULE_LIST', //* 팀 일정 리스트 저장하기
  SET_TEAM_SCHEDULE_DETAIL: 'SET_TEAM_SCHEDULE_DETAIL', //* 선택한 팀 일정 내용 저장하기
  SET_TBD_SRCH_PARAM: 'SET_TBD_SRCH_PARAM', //* 팀 게시판 리스트 검색조건 저장하기
  SET_REPLY_LIST: 'SET_REPLY_LIST', //* 댓글 리스트 저장하기
  SET_TBD_ERRORS: 'SET_TBD_ERRORS', //* 에러 저장
  SET_TBD_UPLOAD_FILE: 'SET_TBD_UPLOAD_FILE', //*첨부파일 저장
  OPEN_CALENDAR_DIALOG : 'OPEN_CALENDAR_DIALOG', // 다이얼로그 오픈
  CLOSE_CALENDAR_DIALOG : 'CLOSE_CALENDAR_DIALOG', // 다이얼로그 클로즈
  ADD_EVENTS : 'ADD_EVENTS', // 이벤트 추가 
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `teamSchedule/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `teamSchedule/${cur[1]}`;
    return acc;
  }, {}),
};
