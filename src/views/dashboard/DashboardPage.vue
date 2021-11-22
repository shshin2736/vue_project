<template>
  <div class="dashboard-wrap">
    <div class="dashboard-box">
      <!-- 비전 달성도 (임원) -->
      <dashboard-vision-achieve v-if="executives"></dashboard-vision-achieve>
      <!-- 업무  관리 (팀장) -->
      <dashboard-business-management-form
        v-if="manager"
      ></dashboard-business-management-form>
      <!-- 프로젝트 관리 (팀장 / 임원) -->
      <dashboard-project-management-form></dashboard-project-management-form>
      <div class="rowfix">
        <div class="rowfix__col rowfix__col--kpi-status">
          <!-- KPI 현황 (팀장 /임원) -->
          <dashboard-kpi-status-form></dashboard-kpi-status-form>
        </div>
        <div class="rowfix__col rowfix__col--teamboard-form" v-if="executives">
          <!-- 조직 성과관리 (임원) -->
          <dashboard-performance-management></dashboard-performance-management>
        </div>
        <div class="rowfix__col rowfix__col--teamboard-form" v-if="manager">
          <!-- 팀게시판 (팀장)-->
          <dashboard-teamboard-form></dashboard-teamboard-form>
        </div>
      </div>
      <!-- 하단 영역 -->
      <dashboard-footer-form></dashboard-footer-form>
      <!-- 팝업 영역 -->
      <dashboard-popup-form></dashboard-popup-form>
    </div>
  </div>
</template>

<script>
import { commonStore } from '@/mixins';
import DashboardBusinessManagementForm from '@/components/dashboard/form/DashboardBusinessManagementForm';
import DashboardProjectManagementForm from '@/components/dashboard/form/DashboardProjectManagementForm';
import DashboardKpiStatusForm from '@/components/dashboard/form/DashboardKpiStatusForm';
import DashboardTeamboardForm from '@/components/dashboard/form/DashboardTeamboardForm';
import DashboardVisionAchieve from '@/components/dashboard/form/DashboardVisionAchieve';
import DashboardPerformanceManagement from '@/components/dashboard/form/DashboardPerformanceManagement';
import DashboardFooterForm from '@/components/dashboard/form/DashboardFooterForm';
import DashboardPopupForm from '@/components/dashboard/form/DashboardPopupForm';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'DashboardPform',
  mixins: [commonStore],
  components: {
    DashboardBusinessManagementForm,
    DashboardProjectManagementForm,
    DashboardKpiStatusForm,
    DashboardTeamboardForm,
    DashboardVisionAchieve,
    DashboardPerformanceManagement,
    DashboardFooterForm,
    DashboardPopupForm,
  },
  data() {
    return {
      manager: false,
      executives: false,
    };
  },
  async created() {
    await this[commonTypes.actions.FETCH_COM_USER_INFO]({});
    const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    const userType = loginUserInfo.userType;
    if (userType === 'DIRECTOR') {
      this.executives = true;
      this.manager = false;
    } else {
      this.executives = false;
      this.manager = true;
    }
  },
};
</script>

<style scoped lang="scss">
.rowfix {
  width: 100%;
  display: flex;
  @include breakpoint($point: desktop-s) {
    flex-direction: column;
  }
  &__col {
    &--kpi-status {
      width: 100%;
      max-width: calc(100% - 520px);

      @include respond-below(1457px) {
        width: calc(50% - 10px);
        max-width: 50%;
      }

      @include breakpoint($point: desktop-s) {
        width: 100%;
        max-width: 100%;
      }
    }
    &--teamboard-form {
      flex: none;
      width: 100%;
      max-width: 520px;

      @include respond-below(1457px) {
        width: calc(50% - 10px);
        max-width: 50%;
      }

      @include breakpoint($point: desktop-s) {
        flex: 1;
        width: auto;
        max-width: 100%;
      }
    }
  }
}
</style>
