<template>
  <div class="tab-main-box" :class="{ current: true }">
    <div class="search-box">
      <div class="search__form__box">
        <!-- MBO 명 -->
        <p class="search__form__title">
          {{ $t('NLS0000289') }}
        </p>
        <com-dropdowns
          :data="getMboNameList"
          textfield="cdNm"
          valuefield="cd"
          v-model="srchMboNm"
          class="hms-dropdown type2"
        ></com-dropdowns>
      </div>
      <div class="search__form__box">
        <p class="search__form__title">{{ $t('NLS0000121') }}</p>
        <!--부서 입력폼  -->
        <span class="input__box">
          <com-input-text
            type="text"
            @keyup="onDeptKeyUp"
            v-model="srchDeptNm"
            :isReadOnly="false"
            @enter="enterDeptSrch"
          />
          <button
            type="button"
            class="magnifier-btn-black"
            @click="onDeptSearch"
          >
            더찾기
          </button>
        </span>
      </div>
      <div class="search__form__box">
        <!-- 담당자->성명 -->
        <p class="search__form__title">
          {{ $t('NLS0000176') }}
        </p>
        <!--담당자 입력폼 -->
        <span class="input__box">
          <com-input-text
            type="text"
            v-model="srchUserNm"
            @enter="enterUserSearchPop"
            @keyup="onUserKeyUp"
          />
          <button
            type="button"
            class="magnifier-btn-black"
            @click="enterUserSearchPop"
          >
            더찾기
          </button>
          <!-- <button
            type="button"
            class="magnifier-btn-black"
            @click="openUserSearchPop('list')"
          >
            더찾기
          </button> -->
        </span>
      </div>
      <div class="search__btn__box">
        <button type="button" class="search__btn" @click="onSearchClick">
          <!-- 조회 -->
          <span>{{ $t('NLS0000066') }}</span>
        </button>
      </div>
    </div>
    <div class="page__btn-mbox">
      <!-- MBO운영_현황 -->
      <com-excel-export-btn
        :data="getMboList"
        :columns="columnsB"
        :title="$t('NLS0000321')"
        :filename="$t('NLS0000300')"
      ></com-excel-export-btn>
    </div>
    <div class="hms-grid">
      <com-native-grid
        height="550"
        :data="getMboList"
        :columns="columnsB"
        :sortable="true"
        :enableSort="enableSort"
        :sort="sort"
        @btnclick="onClick"
      >
      </com-native-grid>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComExcelExportBtn from '@/components/common/global/ComExcelExportBtn';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import { commonStore, mboOperationStore } from '@/mixins';
import { common } from '@/utils';
import * as commonTypes from '@/store/modules/common/types';
import * as mboOperTypes from '@/store/modules/goalSetting/mboOperation/types';

export default {
  name: 'MbOperListForm',
  mixins: [commonStore, mboOperationStore],
  components: {
    ComNativeGrid,
    ComExcelExportBtn,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      enableSort: [
        'mboEvalNm',
        'deptNm',
        'userName',
        'rankNm',
        'dutyNm',
        'annDate',
      ],
      sort: [],
      classed: 'hms-dropdown type1',
      srchMboNm: {},
      srchMboStatus: {},
      srchDeptId: '',
      srchDeptNm: '',
      srchUserId: '',
      srchUserNm: '',
      srchAppUserFlag: '', //* 승인자 설정을 위한값.
      srchMboStatusList: [],
      mboApprovalList: [],
      mboCrrList: [],
      mboStatus3: {},
      mboStatus4: {},
      mboCrrInfo: {},
      mboApprovalInfo: [],
      loginUserInfo: {},
      mboDropdownList: [],
      defaultMbo: {},
      currDate: '',
      loginId: '',
      current1: true,
      current2: false,
      accordion1: false,
      accordion2: false,
      accordion3: false,
      tabContent1: true,
      tabContent2: false,
      srchUserType: '',
      columnsB: [],
    };
  },
  computed: {
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getSelectedDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    getMboNameList() {
      return this[mboOperTypes.getters.GET_MBO_NAME_LIST];
    },
    getMboList() {
      return this[mboOperTypes.getters.GET_MBO_LIST];
    },
  },
  watch: {
    getSelectedManager: function(value) {
      if (this[mboOperTypes.getters.GET_MBO_LIST_TAB]) {
        this.srchUserNm = value.userName;
        this.srchUserId = value.userId;
      }
    },
    getSelectedDept: function(value) {
      if (this[mboOperTypes.getters.GET_MBO_LIST_TAB]) {
        this.srchDeptId = value.deptId;
        this.srchDeptNm = value.deptNm;
      }
    },
    getMboNameList: function(value) {
      //* MBO명 드롭다운 기본값 세팅
      this.getDefaultMboNm(value, new Date().getFullYear());
      //* MBO 목록
      this.fetchMboList();
    },
  },
  mounted() {
    this.initColumns();
    //* MBO목록 > 평가구분
    this.srchMboStatusList = common.getCodeList('MBO005');
    //* 초기값 세팅
    this.loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
    //* MBO목록 > MBO명
    if (common.isEmpty(this[mboOperTypes.getters.GET_SELECTED_MBO_INFO])) {
      this[mboOperTypes.actions.FETCH_MBO_NAME_LIST]({});
    }
    // const userType = this.loginUserInfo.userType;
    // if (
    //   userType !== 'ADMIN' &&
    //   userType !== 'SUPER' &&
    //   userType !== 'DIRECTOR'
    // ) {
    //   this.srchDeptId = this.loginUserInfo.deptId;
    //   this.srchDeptNm = this.loginUserInfo.deptNm;
    //   this.srchUserNm = this.loginUserInfo.userName;
    //   this.srchUserId = this.loginUserInfo.userId;
    // }
  },
  methods: {
    initColumns() {
      this.columnsB = [
        {
          title: this.$t('NLS0000271'), //MBO 대상
          // width: '600px',
          // locked: true,
          children: [
            {
              field: 'mboEvalNm',
              title: this.$t('NLS0000289'), //MBO명
              width: '250px',
              className: 'left',
            },
            {
              field: 'deptNm',
              title: this.$t('NLS0000121'), //부서명
              width: '200px',
              className: 'left',
            },
            {
              field: 'userName',
              title: this.$t('NLS0000342'), //이름
              width: '130px',
              format: 'button',
              className: 'left under-line-btn',
              cell: FunctionCell,
            },
            {
              field: 'rankNm',
              title: this.$t('NLS0000343'), //직급
              width: '70px',
              className: 'left',
            },
            {
              field: 'dutyNm',
              title: this.$t('NLS0000124'), //직책
              width: '70px',
              className: 'left',
            },
            {
              field: 'annDate',
              title: this.$t('NLS0000287'), //인사발령일
              width: '100px',
              className: 'left',
            },
          ],
        },
        {
          title: this.$t('NLS0000339'), //MBO 선정 현황
          // width: '300px',
          // locked: true,
          children: [
            {
              field: 'apvStatusTNm',
              title: this.$t('NLS0000982'), //담당자 -> 1차 결재
              width: '100px',
              className: 'left',
            },
            {
              field: 'apvStatusT1Nm',
              title: this.$t('NLS0000983'), //2차 결재
              width: '100px',
              className: 'left',
            },
            {
              field: 'apvStatusT2Nm',
              title: this.$t('NLS0001280'), //3차 결재
              width: '100px',
              className: 'left',
            },
          ],
        },
        {
          title: this.$t('NLS0000340'), //MBO 평가 현황
          // width: '600px',
          // locked: true,
          children: [
            {
              field: 'apvStatusENm',
              title: this.$t('NLS0000982'), //담당자 -> 1차 결재
              width: '100px',
              className: 'left',
            },
            {
              field: 'estScore',
              title: this.$t('NLS0000282'), //점수
              width: '100px',
              className: 'left',
            },
            {
              field: 'apvStatusE1Nm',
              title: this.$t('NLS0000983'), //2차 결재
              width: '100px',
              className: 'left',
            },
            {
              field: 'estScore1',
              title: this.$t('NLS0000282'), //점수
              width: '100px',
              className: 'left',
            },
            {
              field: 'apvStatusE2Nm',
              title: this.$t('NLS0001280'), //3차 결재
              width: '100px',
              className: 'left',
            },
            {
              field: 'estScore2',
              title: this.$t('NLS0000282'), //최종점수 -> 점수
              width: '100px',
              className: 'left',
            },
          ],
        },
      ];
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.srchDeptNm,
      });
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (deptList.length === 1) {
        this.srchDeptNm = deptList[0].deptNm;
        this.srchDeptId = deptList[0].deptId;
        this.onSearchClick();
      } else {
        this.onDeptSearch();
      }
    },
    onDeptSearch() {
      //   if (
      //     this.loginUserInfo.userType === 'DIRECTOR' ||
      //     this.loginUserInfo.userType === 'ADMIN' ||
      //     this.loginUserInfo.userType === 'SUPER'
      //   ) {
      //   this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
      //   }
    },
    onSearchClick() {
      this.fetchMboList();
    },
    onDeptKeyUp() {
      this.srchDeptId = '';
    },
    onUserKeyUp() {
      // this.srchDeptId = '';
      // this.srchDeptNm = '';
      this.srchUserId = '';
    },
    async enterUserSearchPop() {
      // if (
      //   this.loginUserInfo.userType === 'DIRECTOR' ||
      //   this.loginUserInfo.userType === 'ADMIN' ||
      //   this.loginUserInfo.userType === 'SUPER'
      // ) {
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchUserNm,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];

      if (userList.length === 1) {
        const value = userList[0];
        this.srchDeptId = value.deptId;
        this.srchDeptNm = value.deptNm;
        this.srchUserNm = value.userName;
        this.srchUserId = value.userId;
        this.onSearchClick();
      } else {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      }
      // }
    },
    getDefaultMboNm(mboNameList, baseYear) {
      if (baseYear == 2010) this.srchMboNm = mboNameList[0];

      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      var evalType = '0'; //팀원
      if (loginUserInfo.userType == 'MANAGER') evalType = '1';
      // 팀장
      else if (loginUserInfo.userType == 'DIRECTOR') evalType = '2'; //임원
      mboNameList.some(item => {
        if (item.baseYyyy == baseYear && item.evalType == evalType) {
          this.srchMboNm = item;
          return true;
        }
      });
      if (common.isEmpty(this.srchMboNm)) {
        this.getDefaultMboNm(mboNameList, baseYear - 1);
      }
    },
    fetchMboList() {
      //* 검색조건 초기 설정
      if (this.srchMboStatus.cd == undefined) {
        this.srchMboStatus = this.srchMboStatusList[0];
      }
      if (this.srchMboNm.cd == undefined) {
        this.srchMboNm = this.getMboNameList[0];
      }

      if (
        this.loginUserInfo.userType === 'ADMIN' ||
        this.loginUserInfo.userType === 'SUPER'
      ) {
        this.srchUserType = '0';
      } else {
        this.srchUserType = '1';
      }

      // if (this.loginUserInfo.userType == 'USER') {
      //   this.srchUserId = this.loginUserInfo.userId;
      //   this.srchDeptId = this.loginUserInfo.deptId;
      //   this.srchUserNm = this.loginUserInfo.userName;
      // } else if (this.loginUserInfo.userType == 'MANAGER') {
      //   this.srchDeptId = this.loginUserInfo.deptId;
      // }

      if (this.srchUserNm === '') {
        this.srchUserId = '';
      }

      if (this.srchDeptNm === '') {
        this.srchDeptId = '';
      }

      //* MBO 목록
      const params = {
        srchBaseYyyy: this.srchMboNm.baseYyyy,
        srchMboEvalId: this.srchMboNm.cd,
        srchMboStatus: this.srchMboStatus.cd,
        srchDeptId: this.srchDeptId,
        srchUserId: this.srchUserId,
        srchUserType: this.srchUserType,
      };
      this[mboOperTypes.actions.FETCH_MBO_LIST](params);
    },
    //* 피평가자의 MBO 현황으로 보기
    async onClick(rowData) {
      const param = {
        baseYYYY: rowData.baseYyyy,
        mboEvalId: rowData.mboEvalId,
        mboUserId: rowData.mboUserId,
        mboUserDeptId: rowData.mboUserDeptId,
        mboEvalNm: rowData.mboEvalNm,
      };
      // this.resetCoulmCell();
      // this.getMboCurrInfo(rowData.mboUserId, rowData.mboUserDeptId);
      //this[mboOperTypes.actions.FETCH_MBO_CURR_INFO](param);

      // this[mboOperTypes.actions.INIT_SELECTED_MBO_INFO](param);
      await this[mboOperTypes.actions.FETCH_MBO_CURR_INFO](param);
      this[mboOperTypes.actions.INIT_MBO_LIST_TAB](false);
      this[mboOperTypes.actions.INIT_MBO_BOARD_TAB](true);
    },
  },
};
</script>

<style></style>
