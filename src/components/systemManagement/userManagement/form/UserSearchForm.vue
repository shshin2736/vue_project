<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 국가	 -->
      <p class="search__form__title">
        {{ $t('NLS0000214') }}
      </p>
      <com-dropdowns
        :data="G_10"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type1"
        v-model="baseContry"
        @change="onChange"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 사용자ID	 -->
      <p class="search__form__title">
        {{ $t('NLS0000120') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text
          v-model="srchUserId"
          @enter="getUserData"
        ></com-input-text>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 부서명 -->
      <p class="search__form__title">
        {{ $t('NLS0000348') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text
          v-model="srchDeptNm"
          :isReadOnly="false"
          @enter="enterDeptSrch"
          @keyup="onDeptKeyUp"
        ></com-input-text>
        <button type="button" class="magnifier-btn-black" @click="searchDept">
          더찾기
        </button>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 사용자명 -->
      <p class="search__form__title">
        {{ $t('NLS0000221') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text
          v-model="srchUserNm"
          @enter="getUserData"
        ></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="getUserData">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { userManagementStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import { common } from '@/utils';

export default {
  name: 'UserSearchBox',
  mixins: [userManagementStore, commonStore],
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      srchCountry: '',
      srchUserId: '',
      srchUserNm: '',
      baseContry: {},
      srchDeptNm: '',
      srchDeptId: '',
    };
  },
  computed: {
    getUserList() {
      return this[userManagementTypes.getters.GET_USER_LIST];
    },
    getSelectedDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    G_10() {
      const items = common.getCodeList('G10');
      return items;
    },
  },
  watch: {
    getSelectedDept: function(value) {
      this.srchDeptId = value.deptId;
      this.srchDeptNm = value.deptNm;
    },
  },
  //* 국가코드 기본값 한국으로 설정
  created() {
    const codeList = common.getCodeList('G10');
    codeList.forEach(element => {
      if (element.cd === 'KR') this.baseContry = element;
      return;
    });
  },
  methods: {
    onChange(e) {
      this.srchCountry = e.value.cd;
    },
    async getUserData() {
      try {
        const searchData = {
          srchCountry: this.srchCountry,
          srchUserId: this.srchUserId,
          srchUserNm: this.srchUserNm,
          srchDeptNm: this.srchDeptNm,
          srchDeptId: this.srchDeptId,
        };
        await this[userManagementTypes.actions.FETCH_USER_LIST](searchData);
      } catch (e) {
        alert(e);
      }
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.srchDeptNm,
      });
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (deptList.length === 1) {
        this.srchDeptNm = deptList[0].deptNm;
        this.srchDeptId = deptList[0].deptId;
      } else {
        this.searchDept();
      }
    },
    searchDept() {
      this[commonTypes.actions.INIT_SELECTED_DEPT]({}); //*부서 선택값초기화
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    onDeptKeyUp() {
      this.srchDeptId = '';
    },
  },
};
</script>

<style></style>
