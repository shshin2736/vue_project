export const getters = {
  //* 과제개선스킬양식파일 목록 가져오기
  GET_PRJ_SKILL_FILE: 'GET_PRJ_SKILL_FILE',
  //* 과제개선스킬양식파일 가공 데이터 가져오기
  GET_SKILL_FILE_DATA: 'GET_SKILL_FILE_DATA',
  //* 서치폼 검색 파라미터 가져오기
  GET_SRCH_PARAM: 'GET_SRCH_PARAM',

  //* 파일 업로드 팝업 ON/OFF
  GET_VIEWS_FILE_UPLOAD_POPUP: 'GET_VIEWS_FILE_UPLOAD_POPUP',
};

export const actions = {
  //* 과제개선스킬양식파일 목록 블러오기
  FETCH_PRJ_SKILL_FILE: 'FETCH_PRJ_SKILL_FILE',
  //* 과제개선스킬양식파일 가공 데이터 저장하기
  INIT_SKILL_FILE_DATA: 'INIT_SKILL_FILE_DATA',
  //* 과제개선스킬양식파일 저장하기
  UPDATE_SKILL_FILE: 'UPDATE_SKILL_FILE',
  //* 서치폼 검색 파라미터 저장
  INIT_SRCH_PARAM: 'INIT_SRCH_PARAM',

  //* 파일 업로드 팝업 ON/OFF
  INIT_VIEWS_FILE_UPLOAD_POPUP: 'INIT_VIEWS_FILE_UPLOAD_POPUP',
};

export const mutations = {
  //* 과제개선스킬양식파일 목록 저장
  SET_PRJ_SKILL_FILE: 'SET_PRJ_SKILL_FILE',
  //* 과제개선스킬양식파일 가공 데이터 저장
  SET_SKILL_FILE_DATA: 'SET_SKILL_FILE_DATA',
  //* 서치폼 검색 파라미터 저장
  SET_SRCH_PARAM: 'SET_SRCH_PARAM',

  //* 파일 업로드 팝업 ON/OFF
  SET_VIEWS_FILE_UPLOAD_POPUP: 'SET_VIEWS_FILE_UPLOAD_POPUP',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `skillFile/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `skillFile/${cur[1]}`;
    return acc;
  }, {}),
};
