export const getters = {
  GET_GNL_PRJ_MAIN: 'GET_GNL_PRJ_MAIN', //* 일반과제 상세정보 가져오기
  GET_PRJ_ID: 'GET_PRJ_ID', //* 저장한 일반과제 ID 가져오기
  GET_GNL_TASK_LIST: 'GET_GNL_TASK_LIST', //* TASK 리스트 가져오기
  GET_SELECTED_GNL_TASK: 'GET_SELECTED_GNL_TASK', //* 선택한 Task정보 들고오기
  GET_PRJ_ACTION: 'GET_PRJ_ACTION', //* 즉실천 상세정보 가져오기

  GET_IS_NEW_GNL_TASK: 'GET_IS_NEW_GNL_TASK', //* 신규일반 과제 등록인지 확인하는 Boolean 가져오기
  GET_TASK_DETAIL_POPUP: 'GET_TASK_DETAIL_POPUP', //* TAKS 상세 팝업 ON/OFF 가져오기
  GET_IS_NEW_ACTION: 'GET_IS_NEW_ACTION', //* 신규 즉실천 or 수정 즉실천 Boolean 가져오기
  GET_CONN_PRJ_ID: 'GET_CONN_PRJ_ID',
};

export const actions = {
  // TODO FETCH
  FETCH_GNL_PRJ_MAIN: 'FETCH_GNL_PRJ_MAIN', //* 일반과제 상세정보 가져오기
  FETCH_GNL_TASK_LIST: 'FETCH_GNL_TASK_LIST', //* TASK 리스트 가져오기
  FETCH_SELECTED_GNL_TASK: 'FETCH_SELECTED_GNL_TASK', //* 선택한 Task정보 들고오기
  FETHC_PRJ_ACTION: 'FETHC_PRJ_ACTION', //* 즉실천 상세정보 가져오기
  FETCH_CONN_PRJ_ID: 'FETCH_CONN_PRJ_ID',

  // TODO INSERT
  INSERT_NEW_PRJ_MAIN: 'INSERT_NEW_PRJ_MAIN', //* 신규 일반과제 등록하기
  INSERT_NEW_UNIT_TASK: 'INSERT_NEW_UNIT_TASK', //* 신규 단일 Task 등록하기
  INSERT_NEW_PRJ_ACTION: 'INSERT_NEW_PRJ_ACTION', //* 신규 즉실천 등록

  // TODO UPDATE
  UPDATE_PRJ_MAIN: 'UPDATE_PRJ_MAIN', //* 일반과제 update
  UPDATE_TASK_LIST: 'UPDATE_TASK_LIST', //* TaskList 변경
  UPDATE_TASK_LIST_STATUS: 'UPDATE_TASK_LIST_STATUS', //*  Task 상태 변경
  UPDATE_UNIT_TASK: 'UPDATE_UNIT_TASK', //* 단일 Task 수정
  UPDATE_PRJ_ACTION: 'UPDATE_PRJ_ACTION', //* 즉실천 수정
  UPDATE_TASK_COMPLETE: 'UPDATE_TASK_COMPLETE', //* Task 완료

  // TODO DELETE
  DELETE_PRJ_MAIN: 'DELETE_PRJ_MAIN', // 일반과제 삭제
  DELETE_GNL_TASK: 'DELETE_GNL_TASK', //Task 삭제
  DELETE_PRJ_ACTION: 'DELETE_PRJ_ACTION', //Task 삭제

  // TODO INIT
  INIT_GNL_PRJ_MAIN: 'INIT_GNL_PRJ_MAIN', //* 일반과제 정보 초기화
  INIT_PRJ_ID: 'INIT_PRJ_ID', //* 일반과제 ID 초기화
  INIT_GNL_TASK_LIST: 'INIT_GNL_TASK_LIST', //* TASK 리스트 초기화
  INIT_IS_NEW_GNL_TASK: 'INIT_IS_NEW_GNL_TASK', //* 신규일반 과제 등록인지 확인하는 Boolean 초기화
  INIT_TASK_DETAIL_POPUP: 'INIT_TASK_DETAIL_POPUP', //* TASK 상세 팝업 ON/OFF 초기화
  INIT_SELECTED_GNL_TASK: 'INIT_SELECTED_GNL_TASK', //* 선택한 Task정보 초기화
  INIT_IS_NEW_ACTION: 'INIT_IS_NEW_ACTION', //* 신규 즉실천 or 수정 즉실천 Boolean 초기화
  INIT_PRJ_ACTION: 'INIT_PRJ_ACTION', //* 즉실천 상세정보 가져오기
};

export const mutations = {
  // TODO SET
  SET_GNL_PRJ_MAIN: 'SET_GNL_PRJ_MAIN', //* 일반과제 상세 정보 저장
  SET_PRJ_ID: 'SET_PRJ_ID', //*일반과제 ID 저장
  SET_GNL_TASK_LIST: 'SET_GNL_TASK_LIST', //* TASK 리스트 저장
  SET_IS_NEW_GNL_TASK: 'SET_IS_NEW_GNL_TASK', //* 신규일반 과제 등록인지 확인하는 Boolean 저장
  SET_TASK_DETAIL_POPUP: 'SET_TASK_DETAIL_POPUP', //* TASK 상세 팝업 ON/OFF 설정
  SET_SELECTED_GNL_TASK: 'SET_SELECTED_GNL_TASK', //* 선택한 Task정보 저장
  SET_IS_NEW_ACTION: 'SET_IS_NEW_ACTION', //* 신규 즉실천 or 수정 즉실천 Boolean 저장
  SET_PRJ_ACTION: 'SET_PRJ_ACTION', //* 즉실천 상세정보 저장
  SET_CONN_PRJ_ID: 'SET_CONN_PRJ_ID',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `generalTasks/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `generalTasks/${cur[1]}`;
    return acc;
  }, {}),
};
