export const NAMESPACE = 'screen';

//? GETTER CONSTANT
export const getters = {
  GET_VIEWTYPE: 'GET_VIEWTYPE',
  GET_HANDDIVCE: 'GET_HANDDIVCE',
  GET_HEIGHT: 'GET_HEIGHT',
  GET_WIDTH: 'GET_WIDTH',
};

//? ACTION CONSTANT
export const actions = {
  FETCH_VIEWTYPE: 'FETCH_VIEWTYPE',
  FETCH_HANDDIVCE: 'FETCH_HANDDIVCE',
  FETCH_HEIGHT: 'FETCH_HEIGHT',
  FETCH_WIDTH: 'FETCH_WIDTH',
};

//? MUTATIONS CONSTANT
export const mutations = {
  SET_VIEWTYPE: 'SET_VIEWTYPE',
  SET_HANDDIVCE: 'SET_HANDDIVCE',
  SET_HEIGHT: 'SET_HEIGHT',
  SET_WIDTH: 'SET_WIDTH',
};

//* ROOT ACTIONS CONSTANT
export const rootActions = {
  ...Object.entries(actions).reduce((acc, cur) => {
    acc[cur[0]] = `${NAMESPACE}/${cur[1]}`;
    return acc;
  }, {}),
};

//* ROOT MUTATIONS CONSTANT
export const rootMutations = {
  ...Object.entries(mutations).reduce((acc, cur) => {
    acc[cur[0]] = `${NAMESPACE}/${cur[1]}`;
    return acc;
  }, {}),
};
