import commonStore from '@/mixins/store/commonStore'; //* 공통 스토어 Mixins
import authStore from '@/mixins/store/authStore'; //* 권한 스토어 Mixins
import kpiPerformanceStore from '@/mixins/store/kpiPerformanceStore'; //* KPI 실적 스토어 Mixins
import codeManagementStore from '@/mixins/store/codeManagementStore'; //* 코드 관리 스토어 Mixins
import logManagementStore from '@/mixins/store/logManagementStore'; //* 로그 관리 스토어 Mixins
import strategyEstabilshmentStore from '@/mixins/store/strategyEstabilshmentStore'; //* 전략 수립 스토어 Mixins
import kpiTargetEstablishmentStore from '@/mixins/store/kpiTargetEstablishmentStore'; //* KPI 목표 수립 스토어 Mixins
import userManagementStore from '@/mixins/store/userManagementStore'; //* 사용자 관리 스토어 Mixins
import kpiGraphStore from '@/mixins/store/kpiGraphStore'; //* KPI 그래프 스토어 Mixins
import systemMboStatusStore from '@/mixins/store/systemMboStatusStore'; //* 조직 MBO 현황 스토어 Mixins
// import projectExecutionStore from '@/mixins/store/projectExecutionStore'; //* 과제 실행 스토어 Mixins
import generalTasksStore from '@/mixins/store/generalTasksStore'; //* 일반과제 스토어 Mixins
import specializedTasksStore from '@/mixins/store/specializedTasksStore'; //* 전문과제 스토어 Mixins
import dataSearchStore from '@/mixins/store/dataSearchStore'; //* 자료검색 스토어 Mixins
import noticeStore from '@/mixins/store/noticeStore'; //* 공지사항 스토어 Mixins
import qnaStore from '@/mixins/store/qnaStore'; //* 이용문의 스토어 Mixins
import teamScheduleStore from '@/mixins/store/teamScheduleStore'; // 팀 일정관리 스토어 Minxins
import teamBoardStore from '@/mixins/store/teamBoardStore'; //* 팀 게시판 스토어 Mixins
import businessTakeOverStore from '@/mixins/store/businessTakeOverStore'; //* 업무 인수인계 스토어 Mixins
import mboManagementStore from '@/mixins/store/mboManagementStore'; //* MBO 관리 스토어 Mixins
import mboOperationStore from '@/mixins/store/mboOperationStore'; //* MBO 운영 스토어 Mixins
import authGroupSetupStore from '@/mixins/store/authGroupSetupStore'; //* 권한 그룹 설정 스토어 Mixins
import departmentManagementStore from '@/mixins/store/departmentManagementStore'; //* 부서 관리 스토어 Mixins
import i18nManagementStore from '@/mixins/store/i18nManagementStore'; //* 다국어 설정 스토어 Mixins
import kpiAttributeStore from '@/mixins/store/kpiAttributeStore'; //* KPI 속성 스토어 Mixins
import menuManagementStore from '@/mixins/store/menuManagementStore'; //* 메뉴 관리 스토어 Mixins
import roleManagementStore from '@/mixins/store/roleManagementStore'; //* 권한 관리 스토어 Mixins
import systemStatusStore from '@/mixins/store/systemStatusStore'; //* 시스템 현황 스토어 Mixins
import dashboardStore from '@/mixins/store/dashboardStore'; //* 대시보드 스토어 Mixins
import skillFileStore from '@/mixins/store/skillFileStore'; //* 과제개선스킬양식 스토어 Mixins
import screenStore from '@/mixins/store/screenStore'; //* screen Mixins

// * All mixins export
export {
  commonStore,
  authStore,
  kpiPerformanceStore,
  kpiGraphStore,
  systemMboStatusStore,
  //projectExecutionStore,
  kpiTargetEstablishmentStore,
  strategyEstabilshmentStore,
  noticeStore,
  qnaStore,
  teamScheduleStore,
  teamBoardStore,
  codeManagementStore,
  logManagementStore,
  userManagementStore,
  dataSearchStore,
  businessTakeOverStore,
  mboManagementStore,
  mboOperationStore,
  authGroupSetupStore,
  departmentManagementStore,
  i18nManagementStore,
  kpiAttributeStore,
  menuManagementStore,
  roleManagementStore,
  systemStatusStore,
  dashboardStore,
  generalTasksStore,
  specializedTasksStore,
  skillFileStore,
  screenStore,
};
