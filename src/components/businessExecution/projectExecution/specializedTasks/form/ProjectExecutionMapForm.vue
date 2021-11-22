<template>
  <div class="task-map">
    <!-- <p class="title">{{ prjInfo.prjNm }}</p> -->
    <div class="map-box">
      <div class="map-line">
        <p class="line-title" :class="{ current: GV_CURR_IDX < 4 }">
          <span>STEP 1</span>
          {{ GV_STEP_LIST[0].cdNm }}
        </p>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[0].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[0].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[0].stepCd, 0)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[0].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[1].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[1].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[1].stepCd, 1)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[1].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[2].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[2].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[2].stepCd, 2)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[2].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[3].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[3].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[3].stepCd, 3)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[3].stepNm }}</span>
        </button>
        <p class="line-state" v-if="prjInfo.prjStepStatus1 == '2'">
          <!-- 진행 -->
          {{ $t('NLS0000844') }}
        </p>
        <p class="line-state stop" v-if="prjInfo.prjStepStatus1 == '3'">
          <!-- 중단 -->
          {{ $t('NLS0000600') }}
        </p>
        <p class="line-state finish" v-if="prjInfo.prjStepStatus1 == '6'">
          <!-- 완료 -->
          {{ $t('NLS0000829') }}
        </p>
      </div>
      <div class="map-line">
        <p
          class="line-title"
          :class="{
            current: 3 < GV_CURR_IDX && 8 > GV_CURR_IDX,
          }"
        >
          <span>STEP 2</span>
          {{ GV_STEP_LIST[1].cdNm }}
        </p>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[4].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[4].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[4].stepCd, 4)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[4].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[5].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[5].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[5].stepCd, 5)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[5].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[6].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[6].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[6].stepCd, 6)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[6].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[7].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[7].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[7].stepCd, 7)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[7].stepNm }}</span>
        </button>
        <p class="line-state" v-if="prjInfo.prjStepStatus2 == '2'">
          <!-- 진행 -->
          {{ $t('NLS0000844') }}
        </p>
        <p class="line-state stop" v-if="prjInfo.prjStepStatus2 == '3'">
          <!-- 중단 -->
          {{ $t('NLS0000600') }}
        </p>
        <p class="line-state finish" v-if="prjInfo.prjStepStatus2 == '6'">
          <!-- 완료 -->
          {{ $t('NLS0000829') }}
        </p>
      </div>
      <div class="map-line">
        <p class="line-title" :class="{ current: 7 < GV_CURR_IDX }">
          <span>STEP 3</span>
          {{ GV_STEP_LIST[2].cdNm }}
        </p>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[8].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[8].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[8].stepCd, 8)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[8].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[9].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[9].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[9].stepCd, 9)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[9].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[10].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[10].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[10].stepCd, 10)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[10].stepNm }}</span>
        </button>
        <em class="map-divider">|</em>
        <button
          type="button"
          class="map-btn"
          :class="{
            finish: GV_STEP_DETAIL_LIST[11].stepStatus == '1',
            now: GV_STEP_DETAIL_LIST[11].now,
          }"
          @click="onTab(GV_STEP_DETAIL_LIST[11].stepCd, 11)"
        >
          <span>{{ GV_STEP_DETAIL_LIST[11].stepNm }}</span>
        </button>
        <p class="line-state" v-if="prjInfo.prjStepStatus3 == '2'">
          <!-- 진행 -->
          {{ $t('NLS0000844') }}
        </p>
        <p class="line-state stop" v-if="prjInfo.prjStepStatus1 == '3'">
          <!-- 중단 -->
          {{ $t('NLS0000600') }}
        </p>
        <p class="line-state finish" v-if="prjInfo.prjStepStatus3 == '6'">
          <!-- 완료 -->
          {{ $t('NLS0000829') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { specializedTasksStore, commonStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'ProjectExecutionMapForm',
  mixins: [specializedTasksStore, commonStore],
  data() {
    return {
      prjInfo: {},
      // loginUserInfo: {},
      prjBaseInfo: {},
      prjStatusList: [],
      GV_PRJ_ID: this.$route.params.prjId,
      GV_STEP_LIST: common.getCodeList('PRJ007'),
      GV_STEP_DETAIL_LIST: [
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: true,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
      ],
      GV_STATUS_LIST: [],
      GV_CURR_IDX: 0,
    };
  },
  computed: {
    loginUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getPrjInfo() {
      return {
        ...this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO],
      };
    },
    gvPrjStatusList() {
      return this[specializedTasksTypes.getters.GET_PROJECT_STATUS_LIST];
    },
  },
  watch: {
    getPrjInfo: function(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.prjBaseInfo = value.prjBaseUserInfo;
        if (common.isEmpty(this.GV_STEP_DETAIL_LIST[0].stepCd)) {
          this.GV_STEP_DETAIL_LIST = value.prjStatusList;
          this.setStepDetailList();
        }
      }
    },
    gvPrjStatusList: function(value) {
      if (!common.isEmpty(value)) {
        this.GV_STEP_DETAIL_LIST = value;
        this.GV_CURR_IDX = value[0].selectedIdx;
      }
    },
  },
  created() {
    // this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    if (
      !common.isEmpty(this.$route.params.type) &&
      this.$route.params.type == 'new'
    ) {
      this.prjInfo = this[
        specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO
      ];
      const tmpDetailList = common.getCodeList('PRJ006').reduce((acc, cur) => {
        const obj = { ...cur };
        let detailInfo = {};
        if (obj.opt1 == this.$route.params.prjType) {
          if (Number(obj.cd.substr(2, 4)) === 1) {
            detailInfo.now = true;
            detailInfo.current = true;
          }
          detailInfo.stepCd = obj.cd;
          detailInfo.stepNm = obj.cdNm;
          detailInfo.stepStatus = '0';
          acc.push(detailInfo);
        }
        return acc;
      }, []);
      this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        tmpDetailList,
      );
    }
    // else {
    //   await this[specializedTasksTypes.actions.FETCH_PROJECT_EXECUTION_INFO]({
    //     prjId: this.GV_PRJ_ID,
    //   });
    // }
  },
  methods: {
    async setStepDetailList() {
      switch (!common.isEmpty(this.prjInfo.prjType) && this.prjInfo.prjType) {
        case 'DC':
          this.GV_STEP_LIST = common.getCodeList('PRJ007');
          break;
        case 'RD':
          this.GV_STEP_LIST = common.getCodeList('PRJ008');
          break;
        case 'DS':
          this.GV_STEP_LIST = common.getCodeList('PRJ009');
          break;
        case 'SA':
          this.GV_STEP_LIST = common.getCodeList('PRJ010');
          break;
        default:
          break;
      }

      const arr = this.GV_STEP_DETAIL_LIST;
      const { prjStepStatus1, prjStepStatus2, prjStepStatus3 } = this.prjInfo;

      let tmpIdx =
        this.prjInfo.prjGrade === 'D' ||
        (arr[3].stepStatus === '3' && arr[7].stepStatus !== '3')
          ? 3
          : arr[7].stepStatus === '3'
          ? 7
          : arr[11].stepStatus === '1'
          ? 0
          : prjStepStatus1 === '1'
          ? 3
          : prjStepStatus2 === '1'
          ? 7
          : prjStepStatus3 === '1'
          ? 11
          : arr.indexOf(arr.filter(i => i.stepStatus === '1').slice(-1)[0]) !==
            -1
          ? arr.indexOf(arr.filter(i => i.stepStatus === '1').slice(-1)[0])
          : 0;

      this.GV_STEP_DETAIL_LIST = arr.map((item, idx) => {
        const obj = { ...item };
        if (idx === tmpIdx) {
          obj.now = true;
          obj.current = true;
          obj.selectedIdx = tmpIdx;
        } else {
          obj.now = false;
          obj.current = false;
          obj.selectedIdx = tmpIdx;
        }
        return obj;
      });
      await this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        this.GV_STEP_DETAIL_LIST,
      );
    },
    onTab(stepCd, idx) {
      const tmeStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
      const firstStepStatus = this.gvPrjStatusList[3].stepStatus;
      const isPaused = this.prjInfo.prjStatus === 'B';
      this.GV_CURR_IDX = idx;
      for (let i = 0; i < tmeStatusList.length; i++) {
        if (i == idx) {
          tmeStatusList[i].now = true;
          tmeStatusList[i].current = true;
          tmeStatusList[i].selectedIdx = idx;
          if (isPaused) {
            if (firstStepStatus === '3' && 4 <= idx) {
              // 과제가 중단되어 진행할수 없습니다.
              common.alert('warning', 'NLS0000917');
              return false;
            } else if (firstStepStatus !== '3' && 8 <= idx) {
              // 과제가 중단되어 진행할수 없습니다.
              common.alert('warning', 'NLS0000917');
              return false;
            }
          }
          if (idx === 4) {
            if (
              this.loginUserInfo.userId === this.prjBaseInfo.prjUserId &&
              common.isEmpty(this.prjInfo.prjStartDate2)
            ) {
              //* 전체 일정 설정
              this[specializedTasksTypes.actions.FETCH_PROJECT_DATE_INFO]({
                prjId: this.prjInfo.prjId,
              });
              this[specializedTasksTypes.actions.INIT_VIEWS_PROJECT_DATE_POP](
                true,
              );
            }
          }
          if (idx === 8) {
            if (
              this.loginUserInfo.userId === this.prjBaseInfo.prjUserId &&
              common.isEmpty(this.prjInfo.prjStartDate3)
            ) {
              //* 전체 일정 설정
              this[specializedTasksTypes.actions.FETCH_PROJECT_DATE_INFO]({
                prjId: this.prjInfo.prjId,
              });
              this[specializedTasksTypes.actions.INIT_VIEWS_PROJECT_DATE_POP](
                true,
              );
            }
          }
        } else {
          tmeStatusList[i].now = false;
          tmeStatusList[i].selectedIdx = idx;
        }
      }
      this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        tmeStatusList,
      );
      // }
    },
  },
};
</script>
