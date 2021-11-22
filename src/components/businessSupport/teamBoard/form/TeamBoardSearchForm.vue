<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 검색 유형 -->
      <p class="search__form__title">
        {{ $t('NLS0001135') }}
      </p>
      <com-dropdowns
        :data="srchCombo"
        v-model="selectedCombo"
        rulse="required"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type1"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 검색 키워드 -->
      <p class="search__form__title">
        {{ $t('NLS0000499') }}
      </p>
      <span class="input__box type-wide type-nobtn">
        <com-input-text
          v-model="srchKeyword"
          @enter="getTeamBoardList"
        ></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <com-button
        type="button"
        class="search__btn perm_read"
        :auth="$route.params.auth"
        @click="getTeamBoardList"
      >
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </com-button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import { teamBoardStore, commonStore } from '@/mixins';
import { common } from '@/utils';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'TeamBoardSearchBoxForm',
  mixins: [teamBoardStore, commonStore],
  components: {
    ComButton,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      srchCombo: [
        { cd: '', cdNm: this.$t('NLS0000336') }, //전체
        { cd: 'title', cdNm: this.$t('NLS0000366') }, //제목
        { cd: 'dept', cdNm: this.$t('NLS0000703') }, //등록부서
        { cd: 'user', cdNm: this.$t('NLS0000080') }, //등록자
      ],
      srchKeyword: '',
      selectedCombo: {},
      limit: 10,
      offset: 0,
      leaderYn: false,
    };
  },
  computed: {
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getSrchParam() {
      return this[teamBoardTypes.getters.GET_TBD_SRCH_PARAM];
    },
    // getRankLeaderList() {
    //   const obj = common.getCodeList('G07');
    //   let leaderList = [];

    //   for (let i = 0; i < obj.length; i++) {
    //     if (obj[i].opt1 === '임원') {
    //       leaderList.push(obj[i]);
    //     }
    //   }

    //   return leaderList;
    // },
    // getDutyLeaderList() {
    //   const obj = common.getCodeList('G08');
    //   let leaderList = [];

    //   for (let i = 0; i < obj.length; i++) {
    //     if (obj[i].opt1 === '임원') {
    //       leaderList.push(obj[i]);
    //     }
    //   }

    //   return leaderList;
    // },
    // getSelectedUserList() {
    //   //*선택한 사용자
    //   const param = {
    //     userList: this[
    //       commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA
    //     ],
    //   };
    //   return param;
    // },
    // getSelectedDept() {
    //   //* 선택한 부서
    //   return this[commonTypes.getters.GET_SELECTED_DEPT];
    // },
  },
  watch: {
    // getSelectedUserList: function(value) {
    //   if (!common.isEmpty(value.userList)) {
    //     this.srchUserId = value.userList.userId;
    //     this.srchUserNm = value.userList.userName;
    //     this.srchDeptId = value.userList.deptId;
    //     this.srchDeptNm = value.userList.deptNm;
    //   }
    // },
    // getSelectedDept: function(value) {
    //   if (!common.isEmpty(value)) {
    //     this.srchDeptId = value.deptId;
    //     this.srchDeptNm = value.deptNm;
    //   }
    // },
  },
  async created() {
    if (common.isEmpty(this.getSrchParam) || !this.$route.params.detail) {
      this.selectedCombo = this.srchCombo[0];
    } else {
      this.selectedCombo = common.filterCode(
        this.srchCombo,
        this.getSrchParam.srchCombo,
      );
      this.srchKeyword = this.getSrchParam.srchKeyword;
    }
    await this.getTeamBoardList();
  },
  methods: {
    setInit() {
      // for (let i = 0; i < this.getRankLeaderList.length; i++) {
      //   if (this.getUserInfo.rankCode === this.getRankLeaderList[i].cd) {
      //     this.leaderYn = true;
      //   }
      // }
      // for (let i = 0; i < this.getDutyLeaderList.length; i++) {
      //   if (this.getUserInfo.dutyCode === this.getDutyLeaderList[i].cd) {
      //     this.leaderYn = true;
      //   }
      // }
    },
    async getTeamBoardList() {
      // if (this.srchUserNm === '' || this.srchUserNm === null) {
      //   this.srchUserId = '';
      // }
      // if (this.srchDeptNm === '' || this.srchDeptNm === null) {
      //   this.srchDeptId = '';
      // }
      const param = {
        srchCombo: this.selectedCombo.cd,
        srchKeyword: this.srchKeyword,
        limit: this.$route.params.detail ? this.limit : 10,
        offset: this.$route.params.detail ? this.offset : 0,
      };
      if (this.$route.params.detail) this.$route.params.detail = '';
      this[teamBoardTypes.actions.INIT_TBD_SRCH_PARAM](param);
      await this[teamBoardTypes.actions.FETCH_TEAM_BOARD_LIST](param);
    },
    // openUserSearchPop() {
    //   this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
    //   this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
    //   this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
    //   this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({});
    // },
    // onDeptSearch() {
    //   this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]([]);
    //   this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
    //   this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    // },
  },
};
</script>
