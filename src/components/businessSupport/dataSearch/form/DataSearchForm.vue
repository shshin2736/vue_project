<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 기간 -->
      <p class="search__form__title">
        {{ $t('NLS0000263') }}
      </p>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="startDt"
          @onChange="onChangeStartDate"
        ></com-date-picker>
      </span>
      <em class="date-divide">~</em>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="endDt"
          @onChange="onChangeEndDate"
        ></com-date-picker>
      </span>
    </div>
    <div class="search__form__box check-searchbox">
      <com-dropdowns
        :data="dropdownList"
        v-model="flag"
        rules="required"
        textfield="text"
        valuefield="value"
        class="hms-dropdown type1"
      ></com-dropdowns>
      <!-- KPI -->
      <!-- <p class="check-form text-in type-grid">
        <input type="checkbox" id="check-ex0" value="10" @change="selected" />
        <label for="check-ex0">
          <p class="search__form__title">{{ $t('NLS0000148') }}</p></label
        >
      </p>
      <p class="check-form text-in type-grid">
        <input type="checkbox" id="check-ex1" value="20" @change="selected" />
        <label for="check-ex1">
          <p class="search__form__title">{{ $t('NLS0000151') }}</p></label
        >
      </p>
      <p class="check-form text-in type-grid">
        <input type="checkbox" id="check-ex2" value="30" @change="selected" />
        <label for="check-ex2">
          <p class="search__form__title">{{ $t('NLS0000247') }}</p></label
        >
      </p> -->
    </div>
    <!-- 사용부서 -->
    <!-- <div class="search__form__box">
      <p class="search__form__title">사용부서</p>
      <span class="input__box users">
        <com-input-text
          v-model="srchDeptNm"
          @enter="enterDeptSrch"
          @keyup="onDeptKeyUp"
        ></com-input-text>
        <button
          type="button"
          class="magnifier-btn-black"
          @click="enterDeptSrch"
        >
          더찾기
        </button>
      </span>
    </div> -->
    <div class="search__form__box">
      <!-- 자료소유자 -->
      <p class="search__form__title">{{ $t('NLS0001153') }}</p>
      <span class="input__box users">
        <com-input-text
          v-model="userNm"
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
      </span>
    </div>
    <div class="search__form__box">
      <!-- 키워드 -->
      <p class="search__form__title">{{ $t('NLS0001441') }}</p>
      <span class="input__box">
        <input type="text" v-model="keyword" @keyup.enter="searchData" />
      </span>
    </div>
    <div class="search__btn__box">
      <com-button
        type="button"
        class="search__btn perm_read"
        :auth="$route.params.auth"
        @click="searchData"
      >
        <span>{{ $t('NLS0000253') }}</span>
      </com-button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import { common, timezone } from '@/utils';
import { dataSearchStore, commonStore } from '@/mixins';
import * as dataSearchTypes from '@/store/modules/businessSupport/dataSearch/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'DataSearchForm',
  mixins: [dataSearchStore, commonStore],
  components: {
    ComButton,
    ComDatePicker,
    ComInputText,
    ComDropdowns,
  },
  data() {
    return {
      keyword: '',
      userNm: '',
      userId: '',
      startDt: null,
      endDt: null,
      srchDeptNm: '',
      srchDeptId: '',
      flag: {},
      dropdownList: [
        { text: this.$t('NLS0000336'), value: '' },
        { text: 'KPI', value: '10' },
        { text: this.$t('NLS0000147'), value: '20' },
        { text: this.$t('NLS0000247'), value: '30' },
      ],
    };
  },
  computed: {
    getDataTypeCode(state) {
      const dataCode = common.getCodeList('G15');
      state.selected = {
        cdNm: dataCode[0].cdNm,
        cd: dataCode[0].cd,
      };
      return dataCode;
    },
    getListPaging() {
      return this[dataSearchTypes.getters.GET_LIST_PAGING];
    },
    getReqPaging() {
      return this[dataSearchTypes.getters.GET_REQ_PAGING];
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
    getSelectedDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
  },
  watch: {
    getSelectedUserList: function(value) {
      if (!common.isEmpty(value.userList)) {
        this.userId = value.userList.userId;
        this.userNm = `${value.userList.deptNm}/${value.userList.userName}`;
      }
    },
    getSelectedDept: function(value) {
      if (!common.isEmpty(value)) {
        this.srchDeptNm = value.deptNm;
        this.srchDeptId = value.deptId;
      }
    },
  },
  async created() {
    this.flag = this.dropdownList[0];
    this.setDate();
    await this.fetchDeptList();
    this.searchData();
  },
  methods: {
    setDate() {
      const stDate = new Date();
      stDate.setMonth(0);
      stDate.setDate(1);
      this.startDt = stDate;
      const edDate = new Date();
      edDate.setMonth(11);
      edDate.setDate(31);
      this.endDt = edDate;
    },
    onKeyUp() {
      this.userId = '';
    },
    async enterUserSearchPop() {
      //* 문의자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.userNm,
      });
      const userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.userId = value.userId;
        this.userNm = `${value.deptNm}/${value.userName}`;
      } else {
        this.openUserSearchPop();
      }
    },
    openUserSearchPop() {
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.userNm,
      }); //* 특정부서가 아닌 모든 부서와 모든 사람에 대해 검색 필요.
    },
    onChangeStartDate(date) {
      this.startDt = date;
    },
    onChangeEndDate(date) {
      this.endDt = date;
    },
    //* 부서 리스트 가져오기
    fetchDeptList() {
      this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
    },
    //* 자료 요청 리스트
    fetchDataSearchReq() {
      this[dataSearchTypes.actions.INIT_REQ_PAGING]({
        offset: 0,
        limit: 10,
        field: '',
        sort: '',
      });
      this[dataSearchTypes.actions.FETCH_DATA_SEARCH_REQ]({
        ...this.getReqPaging,
      });
    },
    selected(e) {
      this.flag.map(el => {
        let key = Object.keys(el)[0];
        if (e.target.value === key) {
          el[key] = e.target.checked;
        }
      });
    },
    //* 검색 이벤트
    searchData() {
      // srchDeptId: this.srchDeptId
      this.fetchDataSearchList({
        flag: this.flag.value,
        keyword: this.keyword,
        userId: this.userId,
        userNm: this.userNm,
        startDt: timezone.convertToServerTimeZone(this.startDt, 'YYYYMMDD'),
        endDt: timezone.convertToServerTimeZone(this.endDt, 'YYYYMMDD'),
      });
      this.fetchDataSearchReq();
    },
    //* 자료검색 리스트
    fetchDataSearchList(search = {}, types = '') {
      this[dataSearchTypes.actions.INIT_LIST_PAGING]({
        offset: 0,
        limit: 10,
        field: '',
        sort: '',
      });
      this[dataSearchTypes.actions.FETCH_DATA_SEARCH_LIST]({
        ...this.getListPaging,
        ...search,
        types,
      });
      this[dataSearchTypes.actions.INIT_SEARCH_DATA]({
        ...search,
        types,
      });
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.srchDeptNm,
      });
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (deptList.length === 1) {
        this.srchDeptId = deptList[0].deptId;
        this.srchDeptNm = deptList[0].deptNm;
      } else {
        this[commonTypes.actions.INIT_SELECTED_DEPT]({});
        this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
        this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
      }
    },
    onDeptKeyUp() {
      this.srchDeptId = '';
    },
  },
};
</script>
