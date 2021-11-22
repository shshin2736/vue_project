<template>
  <div class="search-box item4">
    <div class="search__form__box">
      <!-- 속성정의서ID	 -->
      <p class="search__form__title">
        {{ $t('NLS0000055') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text type="text" v-model="srchDefId" />
      </span>
    </div>
    <div class="search__form__box">
      <!-- 속성명 -->
      <p class="search__form__title">
        {{ $t('NLS0000056') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text type="text" v-model="srchDefNm" />
      </span>
    </div>
    <div class="search__form__box">
      <!-- 측정 주기	 -->
      <p class="search__form__title">
        {{ $t('NLS0000057') }}
      </p>
      <com-dropdowns
        :data="srchCycleList"
        v-model="srchCycle"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 사용여부	 -->
      <p class="search__form__title">
        {{ $t('NLS0000058') }}
      </p>
      <com-dropdowns
        :data="srchUseYnList"
        v-model="srchUseYn"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 실적 집계 방식	 -->
      <p class="search__form__title">
        {{ $t('NLS0000059') }}
      </p>
      <com-dropdowns
        :data="srchPerTypeList"
        v-model="srchPerType"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 실적 누계 방식	 -->
      <p class="search__form__title">
        {{ $t('NLS0000060') }}
      </p>
      <com-dropdowns
        :data="srchAccTypeList"
        v-model="srchAccType"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 실적 달성 유형	 -->
      <p class="search__form__title">
        {{ $t('NLS0000061') }}
      </p>
      <com-dropdowns
        :data="srchAchTypeList"
        v-model="srchAchType"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 담당부서 / 담당자	 -->
      <p class="search__form__title">
        {{ $t('NLS0000062') }}
      </p>
      <span class="input__box">
        <com-input-text
          type="text"
          @enter="searchDeptMangSinglePopup"
          v-model="srchDeptUser"
        />
        <!-- <button
          type="button"
          class="magnifier-btn-black"
          @click="openUserSearchPop"
        > -->
        <button
          type="button"
          class="magnifier-btn-black"
          @click="searchDeptMangSinglePopup"
        >
          더찾기
        </button>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="onClick">
        <!-- 조회	 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import * as kpiAttrTypes from '@/store/modules/systemManagement/kpiAttribute/types';
import * as commonTypes from '@/store/modules/common/types';
import { kpiAttributeStore, commonStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'KpiListSearchForm',
  mixins: [kpiAttributeStore, commonStore],
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      srchDefId: '',
      srchDefNm: '',
      srchDeptUser: '',
      srchDefDeptId: '',
      srchDefUserId: '',
      srchCycle: {},
      srchUseYn: {},
      srchPerType: {},
      srchAccType: {},
      srchAchType: {},
      srchCycleList: common.getCodeList('KPI002'),
      srchUseYnList: common.getCodeList('G01'),
      srchPerTypeList: common.getCodeList('KPI007'),
      srchAccTypeList: common.getCodeList('KPI001'),
      srchAchTypeList: common.getCodeList('KPI004'),
    };
  },

  created() {
    this.setSrchCodeList();
    this[kpiAttrTypes.actions.FETCH_KPI_ATTRIBUTE_LIST]({});
  },
  computed: {
    getSelectedUserList() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
  },
  watch: {
    getSelectedUserList: function(value) {
      if (!common.isEmpty(value)) {
        this.srchDeptUser = value.deptNm + '/' + value.userName;
        this.srchDefDeptId = value.deptId;
        this.srchDefUserId = value.userId;
      }
    },
  },
  methods: {
    setSrchCodeList() {
      //* 측정주기
      //this.srchCycleList = common.getCodeList('KPI002');
      if (this.srchCycleList[0].cd != '') {
        //선택
        this.srchCycleList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }

      //* 사용여부
      //this.srchUseYnList = common.getCodeList('G01');
      if (this.srchUseYnList[0].cd != '') {
        this.srchUseYnList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      //* 실적집계방식
      //this.srchPerTypeList = common.getCodeList('KPI007');
      if (this.srchPerTypeList[0].cd != '') {
        this.srchPerTypeList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      //* 실적누계방식
      //this.srchAccTypeList = common.getCodeList('KPI001');
      if (this.srchAccTypeList[0].cd != '') {
        this.srchAccTypeList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      //* 실적달성유형
      //this.srchAchTypeList = common.getCodeList('KPI004');
      if (this.srchAchTypeList[0].cd != '') {
        this.srchAchTypeList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }

      this.srchCycle = this.srchCycleList[0];
      this.srchUseYn = this.srchUseYnList[0];
      this.srchPerType = this.srchPerTypeList[0];
      this.srchAccType = this.srchAccTypeList[0];
      this.srchAchType = this.srchAchTypeList[0];
    },
    async searchDeptMangSinglePopup() {
      //*담당부서/담당 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchDeptUser,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        this.srchDeptUser = userList[0].deptNm + '/' + userList[0].userName;
        this.srchDefDeptId = userList[0].deptId;
        this.srchDefUserId = userList[0].userId;
      } else if (userList.length > 1) {
        this.openUserSearchPop();
        this.srchDeptUser = '';
      }
    },
    //* 직원추가 팝업 OPEN
    openUserSearchPop() {
      //* 공동사용자 창 열기
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchDeptUser,
      }); //*사용자/부서 팝업 데이터 불러오기
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
    },
    onClick() {
      if (this.srchDeptUser == '') {
        this.srchDefDeptId = '';
        this.srchDefUserId = '';
      }
      const params = {
        srchDefId: this.srchDefId,
        srchDefNm: this.srchDefNm,
        srchCycle: this.srchCycle.cd,
        srchUseYn: this.srchUseYn.cd,
        srchPerType: this.srchPerType.cd,
        srchAccType: this.srchAccType.cd,
        srchAchType: this.srchAchType.cd,
        srchDefDeptId: this.srchDefDeptId,
        srchDefUserId: this.srchDefUserId,
      };
      this[kpiAttrTypes.actions.FETCH_KPI_ATTRIBUTE_LIST](params);
    },
  },
};
</script>
