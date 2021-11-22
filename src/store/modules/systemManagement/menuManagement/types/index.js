export const getters = {
  GET_MENU_LIST: 'GET_MENU_LIST', //* 메뉴리스트 가져오기
};

export const actions = {
  FETCH_MENU_ID: 'FETCH_MENU_ID', //* 메뉴ID 가져오기
  FETCH_MENU_LIST: 'FETCH_MENU_LIST', //* 메뉴리스트 가져오기
  UPDATE_MENU_LIST: 'UPDATE_MENU_LIST', //* 메뉴리스트 수정
  DELETE_MENU_LIST: 'DELETE_MENU_LIST', //* 메뉴리스트 삭제
  UPDATE_MENU_TREE: 'UPDATE_MENU_TREE', //* Menu Tree 순서변경
  UPDATE_PAGE_LIST: 'UPDATE_PAGE_LIST', //* PAGE 리스트 수정
};

export const mutations = {
  SET_MENU_LIST: 'SET_MENU_LIST', //* 메뉴리스트 저장
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `menuManagement/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `menuManagement/${cur[1]}`;
    return acc;
  }, {}),
};
