<template>
  <div class="search-box">
    <div v-if="tab !== 'download'" class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0000134') }}
      </p>
      <com-dropdowns
        :data="getYearList"
        textfield="text"
        valuefield="value"
        v-model="year"
        class="hms-dropdown type1"
      ></com-dropdowns>
      <com-dropdowns
        v-if="tab === 'moduleUse'"
        :data="getMonthList"
        textfield="text"
        valuefield="value"
        v-model="month"
        class="hms-dropdown type1"
      ></com-dropdowns>
    </div>
    <div v-if="tab !== 'download'" class="search__form__box">
      <p class="search__form__title">{{ $t('NLS0000433') }}</p>
      <span class="input__box">
        <com-input-text
          v-model="deptNm"
          @enter="enterDeptSrch"
          @keyup="onDeptKeyUp"
        ></com-input-text>
        <com-button
          type="button"
          class="magnifier-btn-black perm_read"
          :auth="$route.params.auth"
          @click="openDeptPopup"
        >
          더찾기
        </com-button>
      </span>
    </div>
    <div v-if="tab === 'download'" class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0000263') }}
      </p>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="fromDate"
          @onChange="onChangeStartDate"
        ></com-date-picker>
      </span>
      <em class="date-divide">~</em>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="toDate"
          @onChange="onChangeEndDate"
        ></com-date-picker>
      </span>
    </div>
    <div class="search__btn__box">
      <com-button
        type="button"
        class="search__btn perm_read"
        :auth="$route.params.auth"
        @click="search"
      >
        <span>{{ $t('NLS0000066') }}</span>
      </com-button>
    </div>
  </div>
</template>

<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComButton from '@/components/common/global/ComButton';
import ComInputText from '@/components/common/global/ComInputText';
import { commonStore, systemStatusStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as systemStatusTypes from '@/store/modules/systemManagement/systemStatus/types';
import { timezone } from '@/utils';

export default {
  name: 'SystemStatusSearchForm',
  mixins: [commonStore, systemStatusStore],
  components: {
    ComButton,
    ComInputText,
    ComDropdowns,
    ComDatePicker,
  },
  props: {
    tab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      deptNm: '',
      deptId: '',
      year: {
        text: `${new Date().getFullYear()}`,
        value: `${new Date().getFullYear()}`,
      },
      month: {
        text: `${
          new Date().getMonth() + 1 < 10 ? '0' : ''
        }${new Date().getMonth() + 1}`,
        value: `${
          new Date().getMonth() + 1 < 10 ? '0' : ''
        }${new Date().getMonth() + 1}`,
      },
      fromDate: null,
      toDate: null,
    };
  },
  computed: {
    //* 연도 설정
    getYearList() {
      const start = new Date().getFullYear();
      const arr = [];
      for (let i = start; i > start - 11; i--) {
        arr.push({ text: `${i}`, value: `${i}` });
      }
      return arr;
    },
    //* 월 설정
    getMonthList() {
      const arr = [];
      for (let i = 1; i < 13; i++) {
        arr.push({
          text: `${i < 10 ? '0' : ''}${i}`,
          value: `${i < 10 ? '0' : ''}${i}`,
        });
      }
      return arr;
    },
    //* 부서정보 가져오기
    getDeptInfo() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
  },
  watch: {
    //* 부서정보 설정
    getDeptInfo: function(value) {
      this.deptId = value.deptId;
      this.deptNm = value.deptNm;
    },
    //* 탭 변경시 검색 이벤트
    tab: function() {
      this.deptId = '';
      this.deptNm = '';
      this.year = {
        text: `${new Date().getFullYear()}`,
        value: `${new Date().getFullYear()}`,
      };
      this.month = {
        text: `${
          new Date().getMonth() + 1 < 10 ? '0' : ''
        }${new Date().getMonth() + 1}`,
        value: `${
          new Date().getMonth() + 1 < 10 ? '0' : ''
        }${new Date().getMonth() + 1}`,
      };
      this[systemStatusTypes.actions.INIT_SEARCH_DATA]({});
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      this.setDate();
      this.search();
    },
  },
  mounted() {
    //* 초기 검색 이벤트
    this.search();
    this.setDate();
  },
  methods: {
    setDate() {
      const date = new Date();
      const day = date.getDate();
      date.setDate(day - 14);
      this.fromDate = date;
      this.toDate = new Date();
    },
    onChangeStartDate(date) {
      this.fromDate = date;
    },
    onChangeEndDate(date) {
      this.toDate = date;
    },
    onDeptKeyUp() {
      this.deptId = '';
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.deptNm,
      });
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (deptList.length === 1) {
        this.deptNm = deptList[0].deptNm;
        this.deptId = deptList[0].deptId;
      } else {
        this.openDeptPopup();
      }
    },
    //* 부서검색 팝업 오픈
    openDeptPopup() {
      // this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_IN_STG](true);
      //* 공통 부서 리스트 가져오기
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    //* 검색 이벤트
    search() {
      this[systemStatusTypes.actions.INIT_SEARCH_DATA]({
        year: this.year.value,
        month: this.month.value,
        deptId: this.deptId,
        // assignmentNm: this.assignmentNm,
      });
      if (this.tab === 'systemAvg') {
        //* 시스템 평균 접속율 가져오기
        this[systemStatusTypes.actions.FETCH_SYS_CON_AVG]({
          yyyy: this.year.value,
          deptId: this.deptId,
        });
      } else if (this.tab === 'moduleUse') {
        //* 모듈별 사용현황 가져오기
        this[systemStatusTypes.actions.FETCH_MODULE_RATE]({
          yyyy: `${this.year.value}${this.month.value}`,
          deptId: this.deptId,
        });
      } else if (this.tab === 'efficiency') {
        //* 업무효율 향상율 가져오기
        this[systemStatusTypes.actions.FETCH_IMPL_RATE]({
          yyyy: this.year.value,
          deptId: this.deptId,
          // prjNm: this.assignmentNm,
        });
      } else {
        this[systemStatusTypes.actions.FETCH_DOWNLOAD_LOG]({
          fromDate: timezone.convertToServerTimeZone(this.fromDate, 'YYYYMMDD'),
          toDate: timezone.convertToServerTimeZone(this.toDate, 'YYYYMMDD'),
        });
      }
    },
  },
};
</script>
