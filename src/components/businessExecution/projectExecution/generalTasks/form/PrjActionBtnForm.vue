<template>
  <div class="task-nav">
    <div class="task-nav__row">
      <div class="task-title">
        <!-- 과제 -->
        <!-- <span>{{ $t('NLS0000147') }} </span>
        <em>next</em> -->
        <p class="title highlight" @click="openKpiList">
          [{{ getPrjAction.prjTypeNm }}] {{ prjNm }}
        </p>
      </div>

      <!-- 과제 전체 실행 기간	 -->
      <div class="task-nav__aside">
        <span class="task-period">
          {{ $t('NLS0000195') }}
          <em>{{ actionStartDate }} ~ {{ actionEndDate }}</em>
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
            @click="deletePrjAction"
          ></button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as commonTypes from '@/store/modules/common/types';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import {
  specializedTasksStore,
  generalTasksStore,
  commonStore,
} from '@/mixins';
import { timezone, common } from '@/utils';

export default {
  name: 'PrjActionBtnForm',
  mixins: [specializedTasksStore, generalTasksStore, commonStore],
  data() {
    return {
      disabled: false,
      deleteBtnFlag: true,
      prjNm: '',
      actionStartDate: timezone.getClientDate('YYYY-MM-DD'),
      actionEndDate: timezone.getClientDate('YYYY-MM-DD'),
    };
  },
  computed: {
    getPrjAction() {
      return this[generalTasksType.getters.GET_PRJ_ACTION];
    },
  },
  watch: {
    getPrjAction(value) {
      this.prjNm = value.prjNm;
      this.actionStartDate = timezone.convertToClientTimeZone(
        value.startDate,
        'YYYY-MM-DD',
      );
      this.actionEndDate = timezone.convertToClientTimeZone(
        value.endDate,
        'YYYY-MM-DD',
      );

      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      //* 과제가 완료 상태가 아니고 권한이 있으면
      if (
        value.actStatus !== 'C' &&
        (value.userId === loginUserInfo.userId ||
          loginUserInfo.userType === 'ADMIN' ||
          loginUserInfo.userType === 'SUPER')
      )
        this.deleteBtnFlag = false;
    },
  },
  mounted() {
    //* 신규등록일 경우
    if (!this.$route.params.prjId)
      this.prjNm = this[
        specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO
      ].prjNm;
    if (
      !this.$route.params.auth.includes('S') &&
      !this.$route.params.auth.includes('X') &&
      !this.$route.params.auth.includes('D')
    ) {
      this.disabled = true;
    }
  },
  methods: {
    openKpiList() {
      this[specializedTasksTypes.actions.FETCH_PROJECT_KPI_LIST]({
        prjId: this.getPrjAction.prjId,
      });
      this[specializedTasksTypes.actions.INIT_VIEWS_KPI_LIST_POP](true);
    },
    goToTaskList() {
      // common.confirm('NLS0001343', () => {
      //* ID 초기화
      this[generalTasksType.actions.INIT_PRJ_ID]('');
      //* Task 리스트 초기화
      this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
      this.$router.push({
        path: '/ProjectExecutionListPage',
      });
      // });
    },
    deletePrjAction() {
      if (!this.deleteBtnFlag) {
        common.confirm('NLS0000004', async () => {
          const data = await this[generalTasksType.actions.DELETE_PRJ_ACTION]({
            actionId: this.getPrjAction.actionId,
            deleteYn: 'Y',
          });
          if (data.result === 'T') {
            const param = {
              prjId: this.getPrjAction.prjId,
            };
            const response = await this[
              generalTasksType.actions.DELETE_PRJ_MAIN
            ](param);
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
          }
        });
      } else {
        //* 삭제할 수 없는 과제입니다.
        common.alert('warning', 'NLS0001347');
      }
    },
  },
};
</script>
