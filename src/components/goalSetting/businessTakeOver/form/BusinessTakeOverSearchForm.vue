<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 조회년도 -->
      <p class="search__form__title">
        {{ $t('NLS0000134') }}
      </p>
      <com-dropdowns
        :data="getYearList"
        rules="required"
        textfield="text"
        valuefield="value"
        class="hms-dropdown type1"
        v-model="baseYear"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 업무 인계자	 -->
      <p class="search__form__title">
        {{ $t('NLS0000135') }}
      </p>
      <span class="input__box">
        <com-input-text
          type="text"
          title="업무 인계자 입력폼"
          v-model="srchUserNm"
          disabled="true"
          @enter="enterUserSearchPop"
          @keyup="onKeyup"
        />
        <button
          type="button"
          class="magnifier-btn-black"
          @click="enterUserSearchPop"
        >
          더찾기
        </button>
        <!-- <button type="button" class="magnifier-btn-black" @click="onUserAdd">
          더찾기
        </button> -->
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="onSrch">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { businessTakeOverStore, commonStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'businessTakeOverSearchForm',
  mixins: [businessTakeOverStore, commonStore],
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      baseYear: {},
      srchUserId: '',
      srchUserNm: '',
    };
  },
  created() {
    this[commonTypes.actions.FETCH_YEAR_LIST]({});
    const yy = new Date().getFullYear().toString();
    const userType = this[commonTypes.getters.GET_USER_DATA].userType;
    this[businessTakeOverTypes.actions.FETCH_TOV_LIST]({
      srchYear: yy,
      userType: userType,
    });
    this.baseYear = { text: yy, value: yy };
  },
  computed: {
    getYearList() {
      const list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    selectedUser() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    userInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  watch: {
    selectedUser: function(value) {
      if (!common.isEmpty(value)) {
        this.srchUserNm = `${value.deptNm} / ${value.userName}`;
        this.srchUserId = value.userId;
      } else {
        this.srchUserNm = '';
        this.srchUserId = '';
      }
    },
  },
  methods: {
    async enterUserSearchPop() {
      const userType = this.userInfo.userType;
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchUserNm,
        srchInnerGrps: true,
        userType: userType,
      });
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({
        srchInnerGrps: true,
        userType: userType,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.srchUserNm = `${value.deptNm} / ${value.userName}`;
        this.srchUserId = value.userId;
      } else if (userList.length === 0) {
        //검색 권한이 없는 사용자입니다.
        common.alert('warning', 'NLS0001242');
      } else {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      }
    },
    onSrch() {
      const userType = this[commonTypes.getters.GET_USER_DATA].userType;
      this[businessTakeOverTypes.actions.FETCH_TOV_LIST]({
        srchUserId: this.srchUserId,
        srchUserNm: this.srchUserNm,
        srchYear: this.baseYear.value,
        userType: userType,
      });
    },
    onKeyup() {
      this.srchUserId = '';
    },
  },
};
</script>

<style></style>
