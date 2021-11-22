import { getters } from './types';

export default {
  //* 부서 리스트 가져오기
  [getters.GET_DEPT_LIST](state) {
    return state.deptList;
  },
  //* 부서에 속한 사용자 리스트 가져오기
  [getters.GET_DEPT_USER_LIST](state) {
    return state.deptUserList;
  },
  //* 부서코드 중복체크
  [getters.GET_DEPT_CODE](state) {
    return state.deptCodeCnt;
  },
  //* 부서 상세정보 가져오기
  [getters.GET_DEPT_INFO](state) {
    return state.deptInfo;
  },
  //* 부서 추가 팝업
  [getters.GET_VIEWS_SRCH_DEPT_TREE](state) {
    return state.srchDeptTree;
  },
  //* 연계부서
  [getters.GET_ASSIGNED_DEPT](state) {
    return state.assignedDept;
  },
  [getters.GET_DEL_DEPT_HIDE](state) {
    return state.deptHide;
  },
};
