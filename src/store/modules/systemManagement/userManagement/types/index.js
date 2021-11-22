export const getters = {
  //* 전체 사용자 목록 가져오기
  GET_USER_LIST: 'GET_USER_LIST',
  //* 사용자별 권한 가져오기
  GET_USER_ROLE: 'GET_USER_ROLE',
  //* 사용자 상세정보 가져오기
  GET_USER_INFO: 'GET_USER_INFO',
  //* 사용자 상세정보 테이블 오류 내용 가져오기
  GET_USER_ERROR: 'GET_USER_ERROR',
  //* 로그인 한 사용자 정보 가져오기
  GET_MY_INFO: 'GET_MY_INFO',
  //* 결재자 등록 정보 가져오기
  GET_APVL_DATA: 'GET_APVL_DATA',
  //* 비밀번호 만료일 가져오기
  GET_PW_EXP_DATE: 'GET_PW_EXP_DATE',
  //* 조직일괄적용 엑셀 데이터 가져오기
  GET_EXCEL_DATA: 'GET_EXCEL_DATA',

  //* 사용자별 권한 설정 팝업 ON/OFF 가져오기
  GET_VIEWS_USER_ROLE_ASSIGN_POPUP: 'GET_VIEWS_USER_ROLE_ASSIGN_POPUP',
  //* 사용자별 부서 설정 팝업 ON/OFF 가져오기
  GET_VIEWS_USER_DEPT_ASSIGN_POPUP: 'GET_VIEWS_USER_DEPT_ASSIGN_POPUP',
  //* 엑셀 등록 팝업 ON/OFF 가져오기
  GET_VIEWS_USER_EXCEL_UPLOAD_POPUP: 'GET_VIEWS_USER_EXCEL_UPLOAD_POPUP',
  //* 결재자 등록/수정 팝업 ON/OFF 가져오기
  GET_VIEWS_APPROVAL_POPUP: 'GET_VIEWS_APPROVAL_POPUP',
  //* 비밀번호 변경 팝업 ON/OFF 가져오기
  GET_VIEWS_PWD_POPUP: 'GET_VIEWS_PWD_POPUP',
  //* 마이페이지 팝업 ON/OFF 가져오기
  GET_VIEWS_MY_PAGE_POPUP: 'GET_VIEWS_MY_PAGE_POPUP',
  //* 검색 파라미터 가져오기
  GET_SRCH_PARAM: 'GET_SRCH_PARAM',
};

export const actions = {
  //* 사용자 목록 불러오기
  FETCH_USER_LIST: 'FETCH_USER_LIST',
  //* 사용자 상세정보 불러오기
  FETCH_USER_INFO: 'FETCH_USER_INFO',
  //* 사용자별 권한 불러오기
  FETCH_USER_ROLE_ASSIGN: 'FETCH_USER_ROLE_ASSIGN',
  //* 로그인 한 사용자 정보 불러오기
  FETCH_MY_INFO: 'FETCH_MY_INFO',
  //* 비밀번호 일치 여부 확인
  FETCH_PASS_CHECK: 'FETCH_PASS_CHECK',
  //* 조직일괄적용 엑셀 데이터 불러오기
  FETCH_EXCEL_DATA: 'FETCH_EXCEL_DATA',

  //* 사용자 상세정보 초기화
  INIT_USER_INFO: 'INIT_USER_INFO',
  //* 사용자 상세정보 필수사항 및 형식 오류 저장/초기화
  INIT_USER_ERROR: 'INIT_USER_ERROR',
  //* 사용자별 권한 목록 초기화
  INIT_USER_ROLE_LIST: 'INIT_USER_ROLE_LIST',
  //* 결재자 정보 저장/초기화
  INIT_APVL_DATA: 'INIT_APVL_DATA',
  //* 비밀번호 만료일 저장
  INIT_PW_EXP_DATE: 'INIT_PW_EXP_DATE',
  //* 조직일괄적용 엑셀 데이터 초기화
  INIT_EXCEL_DATA: 'INIT_EXCEL_DATA',

  //* 사용자 권한 등록/수정하기
  UPDATE_ROLE_ASSIGN: 'UPDATE_ROLE_ASSIGN',
  //* 사용자 상세정보 등록/수정하기
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  //* 비밀번호 수정
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  //* 로그인 한 사용자 정보 수정
  UPDATE_MY_INFO: 'UPDATE_MY_INFO',
  //* 엑셀 업로드 유저 추가
  UPDATE_EXCEL_USER: 'UPDATE_EXCEL_USER',
  //* 결재라인 변경
  UPDATE_APV_LINE: 'UPDATE_APV_LINE',
  //* 사용자별 권한 삭제
  DELETE_ROLE_ASSIGN: 'DELETE_ROLE_ASSIGN',
  //* 사용자 권한 등록 팝업 ON/OFF 설정
  INIT_VIEWS_USER_ROLE_ASSIGN_POPUP: 'INIT_VIEWS_USER_ROLE_ASSIGN_POPUP',
  //* 사용자 부서 등록 팝업 ON/OFF 설정
  INIT_VIEWS_USER_DEPT_ASSIGN_POPUP: 'INIT_VIEWS_USER_DEPT_ASSIGN_POPUP',
  //* 엑셀 등록 팝업 ON/OFF 설정
  INIT_VIEWS_USER_EXCEL_UPLOAD_POPUP: 'INIT_VIEWS_USER_EXCEL_UPLOAD_POPUP',
  //* 마이페이지 팝업 ON/OFF 설정
  INIT_VIEWS_MY_PAGE_POPUP: 'INIT_VIEWS_MY_PAGE_POPUP',
  //* 결재자 등록/수정 팝업 ON/OFF 설정
  INIT_VIEWS_APPROVAL_POPUP: 'INIT_VIEWS_APPROVAL_POPUP',
  //* 비밓번호 변경 팝업 ON/OFF 설정
  INIT_VIEWS_PWD_POPUP: 'INIT_VIEWS_PWD_POPUP',
  UPDATE_PW_EXP_DATE: 'UPDATE_PW_EXP_DATE', //* 비밀번호 초기화 시 비밀번호 만료일 오늘로부터 3개월 후로 설정
};

export const mutations = {
  //* 사용자 목록 저장하기
  SET_USER_LIST: 'SET_USER_LIST',
  //* 사용자별 권한 저장하기
  SET_USER_ROLE: 'SET_USER_ROLE',
  //* 사용자 상세 정보 저장하기
  SET_USER_INFO: 'SET_USER_INFO',
  //* 사용자 상세정보 필수사항 및 형식 오류 저장/초기화
  SET_USER_ERROR: 'SET_USER_ERROR',
  //* 검색 파라미터 저장하기
  SET_SRCH_PARAM: 'SET_SRCH_PARAM',
  //* 로그인 한 사용자 정보 저장하기
  SET_MY_INFO: 'SET_MY_INFO',
  //* 결재자 정보 저장하기
  SET_APVL_DATA: 'SET_APVL_DATA',
  //* 비밀번호 만료일 저장하기
  SET_PW_EXP_DATE: 'SET_PW_EXP_DATE',
  //* 조직일괄적용 엑셀 데이터 저장하기
  SET_EXCEL_DATA: 'SET_EXCEL_DATA',

  //* 사용자별 권한 등록/수정 팝업 ON/OFF 저장하기
  SET_VIEWS_USER_ROLE_ASSIGN_POPUP: 'SET_VIEWS_USER_ROLE_ASSIGN_POPUP',
  //* 사용자별 부서 등록/수정 팝업 ON/OFF 저장하기
  SET_VIEWS_USER_DEPT_ASSIGN_POPUP: 'SET_VIEWS_USER_DEPT_ASSIGN_POPUP',
  //* 엑셀 등록 팝업 ON/OFF 저장하기
  SET_VIEWS_USER_EXCEL_UPLOAD_POPUP: 'SET_VIEWS_USER_EXCEL_UPLOAD_POPUP',
  //* 마이페이지 팝업 ON/OFF 저장하기
  SET_VIEWS_MY_PAGE_POPUP: 'INIT_VIEWS_MY_PAGE_POPUP',
  //* 결재자 등록/수정 팝업 ON/OFF 저장하기
  SET_VIEWS_APPROVAL_POPUP: 'SET_VIEWS_APPROVAL_POPUP',
  //* 비밀번호 변경 팝업 ON/OFF 저장하기
  SET_VIEWS_PWD_POPUP: 'SET_VIEWS_PWD_POPUP',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `userManagement/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `userManagement/${cur[1]}`;
    return acc;
  }, {}),
};
