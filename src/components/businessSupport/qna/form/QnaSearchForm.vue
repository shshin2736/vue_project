<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 국가 -->
      <p class="search__form__title">
        {{ $t('NLS0000214') }}
      </p>
      <com-dropdowns
        :data="G_10"
        v-model="srchCountry"
        rulse="required"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 유형 -->
      <p class="search__form__title">
        {{ $t('NLS0000183') }}
      </p>
      <com-dropdowns
        :data="srchFaqList"
        v-model="srchFaqType"
        rulse="required"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 제목 -->
      <p class="search__form__title">
        {{ $t('NLS0000366') }}
      </p>
      <span class="input__box type-wide type-nobtn">
        <com-input-text
          v-model="srchTitle"
          @enter="getQnaList"
        ></com-input-text>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 상태 -->
      <p class="search__form__title">
        {{ $t('NLS0000149') }}
      </p>
      <com-dropdowns
        :data="srchStatusList"
        v-model="srchStatus"
        rulse="required"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 문의자 -->
      <p class="search__form__title">{{ $t('NLS0000378') }}</p>
      <span class="input__box">
        <com-input-text
          v-model="srchUserNm"
          @keyup="onKeyUp"
          @enter="enterUserSearchPop"
        ></com-input-text>
        <com-button
          type="button"
          class="magnifier-btn-black perm_read"
          :auth="$route.params.auth"
          @click="enterUserSearchPop"
        >
          더찾기
        </com-button>
        <!-- <com-button
          type="button"
          class="magnifier-btn-black perm_read"
          :auth="$route.params.auth"
          @click="openUserSearchPop"
        >
          더찾기
        </com-button> -->
      </span>
    </div>
    <div class="search__form__box">
      <!-- 문의일 -->
      <p class="search__form__title">{{ $t('NLS0000379') }}</p>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="crrStartDate"
          :format="'yyyy-MM-dd'"
          @onChange="changeStartDate"
        ></com-date-picker>
      </span>
      <em class="date-divide">~</em>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="crrEndDate"
          :format="'yyyy-MM-dd'"
          @onChange="changeEndDate"
        ></com-date-picker>
      </span>
    </div>
    <div class="search__btn__box">
      <com-button
        type="button"
        class="search__btn perm_read"
        :auth="$route.params.auth"
        @click="getQnaList"
      >
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </com-button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import { qnaStore, commonStore } from '@/mixins';
import { common, timezone } from '@/utils';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'QnaSearchBox',
  mixins: [qnaStore, commonStore],
  components: {
    ComButton,
    ComDropdowns,
    ComDatePicker,
    ComInputText,
  },
  data() {
    return {
      srchCountry: {},
      srchFaqType: {},
      srchTitle: '',
      srchStatus: {},
      srchUserNm: '',
      srchUserId: '',
      crrStartDate: new Date(),
      crrEndDate: new Date(),
      loginUserInfo: {},
      limit: 10,
      offset: 0,
      srchFaqList: common.getCodeList('BOD003'),
      srchStatusList: common.getCodeList('BOD002'),
    };
  },
  computed: {
    getInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getSelectedUserList() {
      //*선택한 사용자
      const param = {
        userList: this[
          commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA
        ],
      };
      return param;
    },
    getSrchParam() {
      return this[qnaTypes.getters.GET_QNA_SRCH_PARAM];
    },
    G_10() {
      return common.getCodeList('G10');
    },
  },
  watch: {
    getSelectedUserList: function(value) {
      if (!common.isEmpty(value.userList)) {
        this.srchUserId = value.userList.userId;
        this.srchUserNm = `${value.userList.deptNm}/${value.userList.userName}`;
      }
    },
    srchCountry: function(val) {
      if (val !== undefined) {
        const items = this.getSrchParam;
        items.srchCountry = val.cd;
      }
    },
  },
  async created() {
    //* 처음 공지사항 페이지 접속시 검색 파라미터 여부 검사 및 초기화
    await this.setInit();
    //* 공지사항 리스트를 받아 스토어에 저장.
    await this.getQnaList();
  },
  methods: {
    setInit() {
      if (this.srchStatusList[0].cd != '') {
        this.srchStatusList.unshift({ cd: '', cdNm: '선택' });
      }
      if (this.srchFaqList[0].cd != '') {
        this.srchFaqList.unshift({ cd: '', cdNm: '선택' });
      }
      if (common.isEmpty(this.getSrchParam) || !this.$route.params.detail) {
        //* 국가 default 한국 설정
        this.srchCountry = common.filterCode(common.getCodeList('G10'), 'KR');

        this.srchFaqType = this.srchFaqList[0];
        this.srchStatus = this.srchStatusList[0];
        //* 날짜 default 한달 전 ~ 현재
        this.crrStartDate.setMonth(this.crrEndDate.getMonth() - 1);
      } else {
        //* 검색 파라미터로 설정
        this.litmit = this.getSrchParam.limit;
        this.offset = this.getSrchParam.offset;
        this.srchCountry = common.filterCode(
          this.G_10,
          this.getSrchParam.srchCountry,
        );
        this.srchFaqType = common.filterCode(
          this.srchFaqList,
          this.getSrchParam.srchFaqType,
        );
        this.srchTitle = this.getSrchParam.srchTitle;
        this.srchStatus = common.filterCode(
          this.srchStatusList,
          this.getSrchParam.srchStatus,
        );
        this.srchUserId = this.getSrchParam.srchUserId;
        this.srchUserNm = this.getSrchParam.srchUserNm;
        this.crrStartDate = new Date(
          timezone.convertToClientTimeZone(this.getSrchParam.srchStartDate),
        );
        this.crrEndDate = new Date(
          timezone.convertToClientTimeZone(this.getSrchParam.srchEndDate),
        );
      }
    },
    //* 검색 기능
    async getQnaList() {
      if (this.crrEndDate < this.crrStartDate) {
        common.alert('warning', 'NLS0000636');
      } else {
        const param = {
          srchCountry: this.srchCountry.cd,
          srchFaqType: this.srchFaqType.cd,
          srchTitle: this.srchTitle,
          srchStatus: this.srchStatus.cd,
          srchUserId: this.srchUserId,
          srchUserNm: this.srchUserNm,
          srchStartDate: timezone.convertToString(this.crrStartDate),
          srchEndDate: timezone.convertToString(this.crrEndDate),
          limit: this.$route.params.detail ? this.limit : 10,
          offset: this.$route.params.detail ? this.offset : 0,
        };
        if (this.$route.params.detail) this.$route.params.detail = '';
        this[qnaTypes.actions.INIT_QNA_SRCH_PARAM](param);
        await this[qnaTypes.actions.FETCH_QNA_LIST](param);
        await this[qnaTypes.actions.FETCH_QNA_EXCEL_DATA](param);
      }
    },
    async enterUserSearchPop() {
      //* 문의자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchUserNm,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.srchUserId = value.userId;
        this.srchUserNm = `${value.deptNm}/${value.userName}`;
      } else {
        this.openUserSearchPop();
      }
    },
    openUserSearchPop() {
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchUserNm,
      }); //* 특정부서가 아닌 모든 부서와 모든 사람에 대해 검색 필요.
    },
    onKeyUp() {
      this.srchUserId = '';
    },
    //* 날자 변경 이벤트.
    changeStartDate(date) {
      this.crrStartDate = date;
    },
    //* 날자 변경 이벤트.
    changeEndDate(date) {
      this.crrEndDate = date;
    },
  },
};
</script>
