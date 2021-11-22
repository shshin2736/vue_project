<template>
  <div class="task-nav">
    <div class="task-nav__row">
      <div class="task-title">
        <!-- 과제 -->
        <!-- <span>{{ $t('NLS0000147') }} </span>
        <em>next</em> -->
        <!-- 원인 분석	 -->
        <p class="title highlight" @click="openKpiList">
          [{{ getGnlPrjMain.prjTypeNm }}] {{ prjNm }}
        </p>
      </div>
      <div class="task-nav__aside">
        <span class="task-period">
          {{ $t('NLS0000195') }} <em>{{ prjStartDate }} ~ {{ prjEndDate }}</em>
        </span>
        <button
          type="button"
          class="tasklist-btn"
          :title="$t('NLS0000372')"
          @click="goToTaskList"
        >
          tasklist
        </button>
        <span v-if="!disabled">
          <button
            type="button"
            class="taskdel-btn"
            :title="$t('NLS0000075')"
            :disabled="deleteBtnFlag"
            @click="deletePrjMain"
          ></button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import {
  specializedTasksStore,
  generalTasksStore,
  commonStore,
} from '@/mixins';
import { timezone, common } from '@/utils';

export default {
  name: 'GeneralTaskBtnForm',
  mixins: [specializedTasksStore, generalTasksStore, commonStore],
  data() {
    return {
      deleteBtnFlag: false,
      prjNm: '',
      prjStartDate: timezone.getClientDate('YYYY-MM-DD'),
      prjEndDate: timezone.getClientDate('YYYY-MM-DD'),
      disabled: false,
      isPrjUser: false,
      isPrjManager: false,
      isAdmin: false,
    };
  },
  computed: {
    getGnlPrjMain() {
      return this[generalTasksType.getters.GET_GNL_PRJ_MAIN];
    },
    getGnlTaskList() {
      return this[generalTasksType.getters.GET_GNL_TASK_LIST];
    },
  },
  watch: {
    getGnlPrjMain(value) {
      this.prjNm = value.prjNm;
      this.prjStartDate = timezone.convertToClientTimeZone(
        value.prjStartDate,
        'YYYY-MM-DD',
      );
      this.prjEndDate = timezone.convertToClientTimeZone(
        value.prjEndDate,
        'YYYY-MM-DD',
      );
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      this.isPrjUser = value.prjUserId === loginUserInfo.userId ? true : false;
      this.isPrjManager =
        value.prjManagerId === loginUserInfo.userId ? true : false;
      this.isAdmin =
        loginUserInfo.userType === 'ADMIN' || loginUserInfo.userType === 'SUPER'
          ? true
          : false;
    },
  },
  created() {
    this.init();

    // const isNewGnlTask = this[generalTasksType.getters.GET_IS_NEW_GNL_TASK];
    //* 신규등록일 경우
    // if (isNewGnlTask) {
    //   this.prjNm = this[
    //     specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO
    //   ].prjNm;
    // }
    // //* 수정화면일 경우
    // else {
    // }
  },
  methods: {
    init() {
      //* 신규등록일 경우
      if (!this.$route.params.prjId)
        this.prjNm = this[
          specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO
        ].prjNm;
      //* 수정화면
      if (
        !this.$route.params.auth.includes('S') &&
        !this.$route.params.auth.includes('X') &&
        !this.$route.params.auth.includes('D')
      ) {
        this.disabled = true;
      }
    },
    openKpiList() {
      this[specializedTasksTypes.actions.FETCH_PROJECT_KPI_LIST]({
        prjId: this.getGnlPrjMain.prjId,
      });
      this[specializedTasksTypes.actions.INIT_VIEWS_KPI_LIST_POP](true);
    },
    goToTaskList() {
      // common.confirm('NLS0001343', () => {
      //* ID 초기화
      this[generalTasksType.actions.INIT_PRJ_ID](undefined);
      //* Task 리스트 초기화
      this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
      this.$router.push({
        name: 'ProjectExecutionListPage',
        params: { auth: this.$route.params.auth },
      });
      // });
    },

    deletePrjMain() {
      const taskCnt = this.getGnlTaskList.length;
      const cTaskCnt = this.getGnlTaskList.filter(
        item => item.taskStatus === 'C',
      ).length;
      if (taskCnt === cTaskCnt && taskCnt > 0) {
        //* 삭제할 수 없는 과제입니다.
        common.alert('warning', 'NLS0001347');
        return;
      } else if (cTaskCnt > 0 && this.isPrjUser) {
        this.deletePrj();
      } else if (cTaskCnt === 0 && (this.isPrjUser || this.isPrjManager)) {
        this.deletePrj();
      } else {
        //* 해당 과제에 대한 삭제 권한이 없습니다.
        common.alert('warning', 'NLS0001372');
      }
    },
    deletePrj() {
      const param = {
        prjId: !common.isEmpty(this.$route.params.prjId)
          ? this.$route.params.prjId
          : this.getGnlPrjMain.prjId,
      };
      common.confirm('NLS0000004', async () => {
        const response = await this[generalTasksType.actions.DELETE_PRJ_MAIN](
          param,
        );
        if (response.result === 'T') {
          common.alert('success', 'NLS0000002');
          this[generalTasksType.actions.INIT_PRJ_ID]('');
          //* Task 리스트 초기화
          this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
          this.$router.push({
            name: 'ProjectExecutionListPage',
            params: { auth: this.$route.params.auth },
          });
        }
      });
    },
  },
};
</script>
