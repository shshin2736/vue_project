<template>
  <div class="page__tab-box type-equal tab-inner-btn">
    <!-- 대상 인원 내역 -->
    <button v-bind:class="mboTargetBtnClass" @click="onContents('mboTarget')">
      <span>{{ $t('NLS0000996') }} </span>
    </button>
    <!-- 평가대상 설정 -->
    <button
      v-show="getBtnMboTargetSetup"
      v-bind:class="mboTargetSetupBtnClass"
      @click="onContents('mboTargetSetup')"
    >
      <span>{{ $t('NLS0000997') }} </span>
    </button>

    <!-- 평가기간 OPEN -->
    <div class="page__btn-bbox">
      <com-button
        type="button"
        v-show="getTabContentsMboTarget"
        :auth="$route.params.auth"
        class="darkgray-btn perm_save"
        @click="mboEvalOpen"
      >
        <span>{{ $t('NLS0000284') }}</span>
      </com-button>
      <com-button
        type="button"
        v-show="getTabContentsMboTarget"
        :auth="$route.params.auth"
        class="darkgray-btn perm_save"
        @click="mboTargetDelete"
      >
        <!-- 사원 MBO 삭제 -->
        <span>{{ $t('NLS0000285') }}</span>
      </com-button>
      <com-button
        type="button"
        v-show="getTabContentsMboTarget"
        :auth="$route.params.auth"
        class="darkgray-btn perm_delete"
        @click="mboTargetInfoInit"
      >
        <!-- 사원 MBO정보 초기화 -->
        <span>{{ $t('NLS0000286') }}</span>
      </com-button>
      <com-button
        type="button"
        :auth="$route.params.auth"
        v-show="getTabContentsMboTarget"
        class="white-btn excel-btn perm_down"
        @click="excelDownload"
      >
        <span>{{ $t('NLS0000790') }}</span>
      </com-button>
    </div>
    <a ref="download"></a>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { common } from '@/utils';
import { mboManagementStore, commonStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'MboMngTabForm',
  mixins: [mboManagementStore, commonStore],
  components: {
    ComButton,
  },
  data() {
    return {
      mboTargetBtnClass: 'tab__main current',
      mboTargetSetupBtnClass: 'tab__main',
      mboTargetList: [],
      selectedMboInfo: {},
    };
  },
  created() {
    this.initColumns();

    this.mboTargetBtnClass = 'tab__main current';
    this.mboTargetSetupBtnClass = 'tab__main';

    //* 평가 대상 설정 버튼 Show OFF
    this[mboManagementTypes.actions.INIT_BTN_MBO_TARGET_SETUP](false);
    //* 평가대상 설정 폼 내용 OFF
    this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET_SETUP](false);
    //* 대상인원내역 폼 내용 ON
    this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET](true);
    //* 선택한 MBO 정보 초기화
    this[mboManagementTypes.actions.INIT_SELECTED_MBO_INFO]({});
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    //* 대상인원 내역
    getMboTargetList() {
      return this[mboManagementTypes.getters.GET_MBO_TARGET_LIST];
    },
    getBtnMboTargetSetup() {
      return this[mboManagementTypes.getters.GET_BTN_MBO_TARGET_SETUP];
    },
    getSelectedMboInfo() {
      return this[mboManagementTypes.getters.GET_SELECTED_MBO_INFO];
    },
    getTabContentsMboTarget() {
      return this[mboManagementTypes.getters.GET_TAB_CONTENTS_MBO_TARGET];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    //* 대상인원 내역 변경시 실행
    getMboTargetList(value) {
      this.mboTargetList = value;
    },
    getSelectedMboInfo(value) {
      this.selectedMboInfo = value;
    },
  },
  methods: {
    excelDownload() {
      //선택한 MBO 정보
      const download = this.$refs.download;
      download.setAttribute(
        'href',
        `/api/mboManage/getExcelMboTargetList.do?baseYYYY=${this.selectedMboInfo.baseYYYY}&mboEvalId=${this.selectedMboInfo.mboEvalId}`,
      );
      download.click();
    },

    onContents(types) {
      switch (types) {
        case 'mboTarget':
          this.mboTargetBtnClass = 'tab__main current';
          this.mboTargetSetupBtnClass = 'tab__main';

          this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET_SETUP](
            false,
          );
          this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET](true);

          //* 선택한 MBO 정보
          var selectedMboInfo = this[
            mboManagementTypes.getters.GET_SELECTED_MBO_INFO
          ];

          //* 선택한 MBO정보가 있으면 다시 loading
          if (
            selectedMboInfo !== undefined &&
            Object.keys(selectedMboInfo).length !== 0
          ) {
            this[mboManagementTypes.actions.FETCH_MBO_TARGET_LIST](
              selectedMboInfo,
            );
          }
          break;
        case 'mboTargetSetup':
          this.mboTargetBtnClass = 'tab__main';
          this.mboTargetSetupBtnClass = 'tab__main current';

          this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET](false);
          this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET_SETUP](
            true,
          );
          //* 평가대상 설정 초기화
          this[mboManagementTypes.actions.INIT_MBO_EVAL_TARGET_LIST]([]);
          break;
      }
    },

    //평가기간 OPEN
    mboEvalOpen() {
      const selectedMboInfo = this[
        mboManagementTypes.getters.GET_SELECTED_MBO_INFO
      ];

      //* 선택한 MBO가 있는지 체크
      if (selectedMboInfo.mboEvalId !== undefined) {
        const evalStatus = selectedMboInfo.evalStatus;
        //* 선택한 MBO 진행상태
        if (evalStatus === '129' || evalStatus === '130') {
          // 평가 기간을 OPEN 하시겠습니까??
          common.confirm('NLS0001010', async () => {
            const selectedMboInfo = this[
              mboManagementTypes.getters.GET_SELECTED_MBO_INFO
            ];
            selectedMboInfo.evalStatus = '131'; //평가타입(평가기간OPEN)
            const data = await this[
              mboManagementTypes.actions.UPDATE_MBO_STATUS
            ](selectedMboInfo);
            if (data.result === 'T') {
              // 평가기간이 OPEN 되었습니다.
              common.alert('warning', 'NLS0001011');
            }
          });
        } else {
          // 평가기간이 이미 OPEN된 상태입니다.
          common.alert('warning', 'NLS0001012');
        }
      } else {
        // 평가기간을 OPEN할 MBO를 선택하십시오.
        common.alert('warning', 'NLS0001013');
      }
    },

    //사원 MBO 삭제
    mboTargetDelete() {
      // 삭제되어야할 MBO 리스트
      var deleteTargetList = this.mboTargetList.filter(item => {
        if (item.selected === undefined || !item.selected) {
          return false;
        } else {
          return true;
        }
      });
      // //현재 선택한 MBO정보
      const selectedMboInfo = this[
        mboManagementTypes.getters.GET_SELECTED_MBO_INFO
      ];

      if (deleteTargetList.length > 0) {
        common.confirm('NLS0000004', async () => {
          this.skip = 0;

          const param = {
            deleteTargetList: deleteTargetList,
            baseYYYY: selectedMboInfo.baseYYYY,
            mboEvalId: selectedMboInfo.mboEvalId,
          };

          //서버 UPDATE
          const data = await this[
            mboManagementTypes.actions.DELETE_MBO_TARGET_LIST
          ](param);
          if (data.result === 'T') {
            common.alert('success', 'NLS0000002');
          }
        });
      } else {
        // 선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      }
    },

    //사원 MBO정보 초기화
    mboTargetInfoInit() {
      //현재 선택한 MBO정보
      const selectedMboInfo = this[
        mboManagementTypes.getters.GET_SELECTED_MBO_INFO
      ];

      //초기화 할 MBO 리스트
      const initTargetList = this.mboTargetList.filter(item => {
        if (item.selected) {
          return item;
        }
      });

      const param = {
        initTargetList: initTargetList,
        baseYYYY: selectedMboInfo.baseYYYY,
        mboEvalId: selectedMboInfo.mboEvalId,
      };

      if (initTargetList.length > 0) {
        // 초기화 하시겠습니까?
        common.confirm('NLS0001014', async () => {
          const response = await this[
            mboManagementTypes.actions.UPDATE_MBO_TARGET_LIST
          ](param);
          if (response.result === 'T') {
            common.alert('success', 'NLS0001329');
          }
        });
      } else {
        // 선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      }
    },

    initColumns() {
      this.excelColumns = [
        {
          title: this.$t('NLS0000270'), //사원기본정보
          locked: true,
          children: [
            {
              field: 'deptNm',
              title: this.$t('NLS0000348'), //부서명
              className: 'left',
            },
            {
              field: 'empNo',
              title: this.$t('NLS0000229'), //사번
              className: 'left',
            },
            {
              field: 'userNm',
              title: this.$t('NLS0000342'), //이름
              className: 'left',
            },
            {
              field: 'rankCode',
              title: this.$t('NLS0000343'), //직위->직급
              className: 'left',
            },
            {
              field: 'dutyCode',
              title: this.$t('NLS0000124'), //직책
              className: 'left',
            },
            {
              field: 'annDate',
              title: this.$t('NLS0000287'), //인사발령일
              className: 'center',
            },
          ],
        },
        {
          title: this.$t('NLS0000273'), //MBO KPI 선정 및 가중치 승인 현황
          locked: false,
          children: [
            {
              title: this.$t('NLS0000274'), //본인
              children: [
                {
                  title: this.$t('NLS0000281'), //평가여부
                  field: 'apvStatusT',
                  className: 'left',
                },
              ],
            },
            {
              title: this.$t('NLS0000984'), //1차승인
              children: [
                {
                  field: 'appUserNmT1',
                  title: this.$t('NLS0000279'), //승인자
                  className: 'left',
                },
                {
                  field: 'apvStatusT1',
                  title: this.$t('NLS0000281'), //평가여부
                  className: 'left',
                },
              ],
            },
            {
              title: this.$t('NLS0000985'), //2차승인
              children: [
                {
                  title: this.$t('NLS0000279'), //승인자
                  field: 'appUserNmT2',
                  className: 'left',
                },
                {
                  field: 'apvStatusT2',
                  title: this.$t('NLS0000281'), //평가여부
                  className: 'left',
                },
              ],
            },
          ],
        },
        {
          title: this.$t('NLS0000277'), //MBO KPI 평가 현황
          locked: false,
          children: [
            {
              title: this.$t('NLS0000274'), //본인
              children: [
                {
                  field: 'apvStatusE',
                  title: this.$t('NLS0000281'), //평가여부
                  className: 'left',
                },
                {
                  field: 'estScore',
                  title: this.$t('NLS0000282'), //점수
                  className: 'right',
                },
              ],
            },
            {
              title: this.$t('NLS0000984'), //1차승인
              children: [
                {
                  field: 'appUserNmE1',
                  title: this.$t('NLS0000279'), //승인자
                  className: 'left',
                },
                {
                  field: 'apvStatusE1',
                  title: this.$t('NLS0000281'), //평가여부
                  className: 'left',
                },
                {
                  field: 'estScore1',
                  title: this.$t('NLS0000282'), //점수
                  className: 'right',
                },
              ],
            },
            {
              title: this.$t('NLS0000985'), //2차승인
              children: [
                {
                  field: 'appUserNmE2',
                  title: this.$t('NLS0000279'), //승인자
                  className: 'left',
                },
                {
                  field: 'apvStatusE2',
                  title: this.$t('NLS0000281'), //평가여부
                  className: 'left',
                },
                {
                  field: 'estScore2',
                  title: this.$t('NLS0000282'), //점수
                  className: 'right',
                },
              ],
            },
          ],
        },
      ];
    },
  },
};
</script>

<style></style>
