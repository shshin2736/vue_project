import { mutations } from './types';

export default {
  //* 부서 리스트 저장
  [mutations.SET_DEPT_LIST](state, param) {
    state.deptList = param;
  },
  //* 부서에속한 사용자 저장
  [mutations.SET_DEPT_USER_LIST](state, param) {
    state.deptUserList = param;
  },
  //* //* 부서코드 중복체크
  [mutations.SET_DEPT_CODE](state, param) {
    state.deptCodeCnt = param;
  },
  //* 부서 상세정보 저장
  [mutations.SET_DEPT_INFO](state, payload) {
    state.deptInfo = payload;
  },
  //* 부서 추가 팝업
  [mutations.SET_VIEWS_SRCH_DEPT_TREE](state, payload) {
    state.srchDeptTree = payload;
  },
  //* 연계부서
  [mutations.SET_ASSIGNED_DEPT](state, payload) {
    state.assignedDept = payload;
  },
  [mutations.SET_DEL_DEPT_HIDE](state, payload) {
    state.deptHide = payload;
  },
};
