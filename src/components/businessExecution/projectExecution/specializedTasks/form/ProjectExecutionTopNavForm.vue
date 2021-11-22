<template>
  <div class="task-nav">
    <div class="task-nav__row">
      <div class="task-title">
        <!-- 과제 -->
        <!-- <span>{{ $t('NLS0000147') }}</span> -->
        <!-- <em></em> -->
        <!-- prjInfo.prjTypeNm != null ? prjInfo.prjTypeNm : prjInfo.prjStepNm -->
        <!-- <span class="task-title__sec"></span> -->
        <p class="title highlight" @click="openKpiList">
          [{{ prjInfo.prjTypeNm }}] {{ prjInfo.prjNm }} ({{
            prjInfo.prjRate != null ? `${prjInfo.prjRate}%` : `0%`
          }})
        </p>
      </div>
      <div class="task-nav__aside">
        <span class="task-period">
          <!-- 과제 전체 실행 기간 -->
          {{ $t('NLS0000195') }}
          <em>{{ prjInfo.prjStartDate }} ~ {{ prjInfo.prjEndDate }}</em>
        </span>
        <button
          type="button"
          :title="$t('NLS0000822')"
          class="taskfilter-btn"
          @click="openPrjDatePop"
        ></button>
        <button
          type="button"
          :title="$t('NLS0000372')"
          class="tasklist-btn"
          @click="goProjectList"
        ></button>
        <button
          type="button"
          :title="$t('NLS0000707')"
          class="taskchat-btn"
          :class="{ on: GV_MSG_CNT_LIST[12].checked === '1' }"
          @click="openPrjMsgPop"
          :disabled="msgDisabled"
        ></button>
        <button
          type="button"
          :title="$t('NLS0000525')"
          class="tasksetting-btn"
          @click="openPrjSkillPop"
        ></button>
        <button
          type="button"
          class="taskdel-btn"
          :title="$t('NLS0000075')"
          @click="deletePrjMain"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import {
  specializedTasksStore,
  commonStore,
  generalTasksStore,
} from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'ProjectExecutionTopNavForm',
  mixins: [specializedTasksStore, commonStore, generalTasksStore],
  data() {
    return {
      prjInfo: {},
      prjBaseInfo: {},
      loginUserInfo: {},
      fromList: [],
      GV_PRJ_ID: this.$route.params.prjId,
      GV_STEP_LIST: [],
      GV_MSG_CNT_LIST: [
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
      ],
      skillStepList: [],
      skillStepInfo: {},
      getMsgCntList: '',
      msgDisabled: true,
      delDisabled: true,
      isPrjUser: false,
      isPrjManager: false,
    };
  },
  computed: {
    getPrjInfo() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO
      ];
      return item;
    },
    getMessgesList() {
      const item = this[specializedTasksTypes.getters.GET_CHECK_MESSAGES_LIST];
      return item;
    },
    getSkillStepList() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_SKILL_CONF_INFO
      ];
      return item;
    },
  },
  watch: {
    getPrjInfo: function(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.prjBaseInfo = value.prjBaseUserInfo;
        this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
        const userYn = this.loginUserInfo.userId === this.prjBaseInfo.prjUserId;
        const managerYn =
          this.loginUserInfo.userId === this.prjBaseInfo.prjManagerId;
        //* 담당자 또는 담당 부서장인지 확인
        this.isPrjUser = userYn ? true : false;
        this.isPrjManager = managerYn ? true : false;
        if (userYn || managerYn) {
          this.delDisabled = false;
        }
        if (
          userYn ||
          managerYn ||
          this.loginUserInfo.userId === this.prjBaseInfo.corUserId ||
          this.loginUserInfo.userId === this.prjBaseInfo.reqUserId
        ) {
          this.msgDisabled = false;
        }
        this.getFileList();
      }
    },
    getMessgesList: function(value) {
      this.GV_MSG_CNT_LIST = value;
    },
    getSkillStepList: function(value) {
      this.skillStepList = value.skillStepList;
      this.setSkillStepInfo();
    },
  },
  async mounted() {
    if (
      !common.isEmpty(this.$route.params.type) &&
      this.$route.params.type == 'new'
    ) {
      this.prjInfo = this[specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO];
      this.openPrjDatePop('mounted');
    }
    // else {
    // await this[specializedTasksTypes.actions.FETCH_PROJECT_EXECUTION_INFO]({
    //   prjId: this.GV_PRJ_ID,
    // });
    //   this[specializedTasksTypes.actions.FETCH_PROJECT_SKILL_CONF_INFO]({
    //     prjType: this.prjInfo.prjType,
    //     prjStepId: '',
    //   });
    // }
    // this.fetchPrjSkillInfo();
    //* 3분마다 미확인 메세지 체크
    this.getMsgCntList = setInterval(() => {
      this.getMsgList();
    }, 180000);
    // }, 3000);
  },
  destroyed() {
    clearInterval(this.getMsgCntList);
  },
  methods: {
    async fetchPrjSkillInfo() {
      await this[specializedTasksTypes.actions.FETCH_PROJECT_SKILL_CONF_INFO]({
        prjType: this.prjInfo.prjType,
        prjStepId: '',
      });
    },
    goProjectList() {
      // common.confirm('NLS0001343', async () => {
      clearInterval(this.getMsgCntList);
      this.$router.push({
        path: '/ProjectExecutionListPage',
      });
      // });
    },
    getFileList() {
      this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        ownerObjectId: this.GV_PRJ_ID,
      });
    },
    getMsgList() {
      this[specializedTasksTypes.actions.FETCH_CHECK_MESSAGES_LIST]({
        prjId: this.GV_PRJ_ID,
      });
    },
    openKpiList() {
      this[specializedTasksTypes.actions.FETCH_PROJECT_KPI_LIST]({
        prjId: this.GV_PRJ_ID,
      });
      this[specializedTasksTypes.actions.INIT_VIEWS_KPI_LIST_POP](true);
    },
    //* 과제 기간 설정
    openPrjDatePop(type) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_DATE_INFO]({
        prjId: this.GV_PRJ_ID,
      });
      if (type === 'mounted')
        this[commonTypes.actions.INIT_OVERLAY_CLICK_EVENT_HANDLER](true);
      this[specializedTasksTypes.actions.INIT_VIEWS_PROJECT_DATE_POP](true);
    },
    //* 과제 메신저 팝업
    openPrjMsgPop() {
      //* 메세지 목록조회
      this[specializedTasksTypes.actions.FETCH_PROJECT_MESSENGER_LIST]({
        prjId: this.prjInfo.prjId,
        prjStepId: '',
      });
      //* 메세지 목록 읽음상태 update
      this[specializedTasksTypes.actions.UPDATE_PROJECT_MESSENGER]({
        prjId: this.prjInfo.prjId,
        prjStepId: '',
      });
      //* 메세지 팝업에 param 전달
      this[specializedTasksTypes.actions.INIT_PROJECT_MESSENGER_INFO]({
        prjId: this.prjInfo.prjId,
        prjBaseInfo: this.prjBaseInfo,
        prjStepId: '',
        prjStepNm: '',
        prjStatus: this.prjInfo.prjStatus,
      });
      this[specializedTasksTypes.actions.INIT_VIEWS_MESSENGER_POP](true);
    },
    //* 과제 개선스킬 팝업
    openPrjSkillPop() {
      this.setPrjSkillInfoPop();
      this[specializedTasksTypes.actions.INIT_VIEWS_SKILL_CONF_POP](true);
    },
    setPrjSkillInfoPop() {
      const items = this[
        specializedTasksTypes.getters.GET_PROJECT_SKILL_CONF_INFO
      ].skillFileList;
      const prjSkillObj = {};
      items.forEach(item => {
        if (!prjSkillObj[item.prjStepCd]) {
          prjSkillObj[item.prjStepCd] = {
            prjStepCd: item.prjStepCd,
            prjStepNm: item.prjStepNm,
            files: [],
          };
        }
        const file = {
          fileId: item.fileId,
          fileType: item.fileType,
          fileName: item.fileName,
        };
        prjSkillObj[item.prjStepCd].files.push(file);
      });
      this[specializedTasksTypes.actions.INIT_PROJECT_SKILL_CONF_INFO_POP](
        Object.values(prjSkillObj),
      );
    },
    setSkillStepInfo() {
      this.GV_STEP_LIST = common.getCodeList('PRJ006').reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.opt1 == this.prjInfo.prjType) {
          acc.push(cur);
        }
        return acc;
      }, []);

      this.GV_STEP_LIST.forEach(value => {
        this.skillStepInfo[value.cd] = false;
      });
      this.skillStepList.forEach(value => {
        this.skillStepInfo[value.prjStepCd] = true;
      });
      this[specializedTasksTypes.actions.INIT_PROJECT_SKILL_STEP_INFO](
        this.skillStepInfo,
      );
    },
    async deletePrjMain() {
      await this[commonTypes.actions.FETCH_PRJ_DELETE_AVBL]({
        prjId: this.prjInfo.prjId,
      });
      const { delStatus } = this[commonTypes.getters.GET_PRJ_DELETE_AVBL];
      //* X: 삭제 불가, O: 담당자만 삭제 가능, T: 담담자와 담당 부서장 삭제 가능
      if (delStatus === 'X') {
        //* 삭제할 수 없는 과제입니다.
        common.alert('warning', 'NLS0001347');
        return;
      } else if (delStatus === 'O' && this.isPrjUser) {
        this.deletePrj();
      } else if (delStatus === 'T' && (this.isPrjUser || this.isPrjManager)) {
        this.deletePrj();
      } else {
        //* 해당 과제에 대한 삭제 권한이 없습니다.
        common.alert('warning', 'NLS0001372');
      }
    },
    deletePrj() {
      //* 삭제하시겠습니까?
      common.confirm('NLS0000004', async () => {
        const data = await this[generalTasksType.actions.DELETE_PRJ_MAIN]({
          prjId: this.GV_PRJ_ID,
        });
        if (data.result === 'T') {
          //* 삭제되었습니다
          common.alert('success', 'NLS0000002');
          clearInterval(this.getMsgCntList);
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
