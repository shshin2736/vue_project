import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth/';
import dataSearch from '@/store/modules/businessSupport/dataSearch';
import notice from '@/store/modules/businessSupport/notice';
import teamBoard from '@/store/modules/businessSupport/teamBoard';
import qna from '@/store/modules/businessSupport/qna';
import businessTakeOver from '@/store/modules/goalSetting/businessTakeOver';
import kpiTargetEstablishment from '@/store/modules/goalSetting/kpiTargetEstablishment';
import mboManagement from '@/store/modules/goalSetting/mboManagement';
import mboOperation from '@/store/modules/goalSetting/mboOperation';
import strategyEstabilshment from '@/store/modules/goalSetting/strategyEstabilshment';
import kpiGraph from '@/store/modules/businessExecution/kpiGraph';
import kpiPerformance from '@/store/modules/businessExecution/kpiPerformance';
import systemMboStatus from '@/store/modules/businessExecution/systemMboStatus';
import generalTasks from '@/store/modules/businessExecution/projectExecution/generalTasks';
import specializedTasks from '@/store/modules/businessExecution/projectExecution/specializedTasks';
import authGroupSetup from '@/store/modules/systemManagement/authGroupSetup';
import codeManagement from '@/store/modules/systemManagement/codeManagement';
import i18nManagement from '@/store/modules/systemManagement/i18nManagement';
import departmentManagement from '@/store/modules/systemManagement/departmentManagement';
import kpiAttribute from '@/store/modules/systemManagement/kpiAttribute';
import menuManagement from '@/store/modules/systemManagement/menuManagement';
import systemStatus from '@/store/modules/systemManagement/systemStatus';
import logManagement from '@/store/modules/systemManagement/logManagement';
import userManagement from '@/store/modules/systemManagement/userManagement';
import roleManagement from '@/store/modules/systemManagement/roleManagement';
import skillFile from '@/store/modules/systemManagement/skillFile';
import common from '@/store/modules/common';
import dashboard from '@/store/modules/dashboard';
import screen from '@/store/modules/screen';

Vue.use(Vuex);
//* 라우터 설정
export default new Vuex.Store({
  modules: {
    auth,
    dataSearch,
    notice,
    teamBoard,
    qna,
    businessTakeOver,
    kpiTargetEstablishment,
    mboManagement,
    mboOperation,
    strategyEstabilshment,
    kpiGraph,
    kpiPerformance,
    systemMboStatus,
    authGroupSetup,
    codeManagement,
    departmentManagement,
    i18nManagement,
    kpiAttribute,
    menuManagement,
    systemStatus,
    userManagement,
    common,
    roleManagement,
    logManagement,
    dashboard,
    generalTasks,
    specializedTasks,
    skillFile,
    screen,
  },
});
