<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 기준년도 -->
      <p class="search__form__title">
        {{ $t('NLS0000960') }}
      </p>
      <com-dropdowns
        :data="getYearList"
        rules="required"
        textfield="text"
        valuefiedl="value"
        class="hms-dropdown type2"
        v-model="baseYear"
      >
      </com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 등록부서 -->
      <p class="search__form__title">
        {{ $t('NLS0000434') }}
      </p>
      <span class="input__box">
        <com-input-text
          v-model="searchDeptNm"
          @enter="enterDeptSrch"
          @keyup="onDeptKeyUp"
        >
        </com-input-text>
        <button
          type="button"
          class="magnifier-btn-black"
          @click="enterDeptSrch"
        >
          더찾기
        </button>
      </span>
    </div>

    <!-- 검색 박스 영역 -->
    <div class="search__form__box">
      <!-- 전략과제명 -->
      <p class="search__form__title">
        {{ $t('NLS0000240') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text
          rules=""
          v-model="strategyName"
          @enter="enterSearchStgNm"
        >
        </com-input-text>
      </span>
    </div>

    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="onSearch">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import * as commonTypes from '@/store/modules/common/types';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { commonStore, strategyEstabilshmentStore } from '@/mixins';
import { common, timezone } from '@/utils';
export default {
  name: 'StrategyEstabilshmentSearchForm',
  mixins: [commonStore, strategyEstabilshmentStore], //* 믹스인
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      //* 기준년도 데이터
      baseYear: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      }, //* 기준년도 선택 데이터
      strategyName: '', //* 전략과제명
      searchDeptId: '',
      searchDeptNm: '',
    };
  },
  mounted() {
    //* 초기화
    //this[commonTypes.actions.INIT_SELECTED_DEPT]({});
    this[commonTypes.actions.FETCH_YEAR_LIST]({});
    this.searchDeptNm = this[commonTypes.getters.GET_USER_DATA].parentDeptNm;
    this.searchDeptId = this[commonTypes.getters.GET_USER_DATA].parentDeptId;
  },

  computed: {
    inputStrNm: {
      set(value) {
        this.strategyName = value;
      },
      get(state) {
        return state.strategyName;
      },
    },
    getDeptInfo() {
      //* 부서 트리 팝업창에서 선택한 부서 정보
      return this[commonTypes.getters.GET_SELECTED_DEPT];
      //* 선택된 부서트리가 없으면  자기부서 id 가져오기
      // if (Object.keys(selectedDept).length === 0) {
      //   const param = {
      //     deptId: this[commonTypes.getters.GET_USER_DATA].deptId,
      //     deptNm: this[commonTypes.getters.GET_USER_DATA].deptNm,
      //   };
      //   this[commonTypes.actions.INIT_SELECTED_DEPT](param);
      // }

      // return this[commonTypes.getters.GET_SELECTED_DEPT].deptNm;
    },
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
  },
  watch: {
    getDeptInfo(value) {
      if (!common.isEmpty(value)) {
        this.searchDeptNm = value.parentDeptNm;
        this.searchDeptId = value.parentDeptId;
      }
    },
    getYearList: function(data) {
      if (data.length > 0) {
        const now = timezone.getClientDate('YYYY');
        const baseYyyy = this.$route.params.baseYyyy;
        this.baseYear = {
          text: baseYyyy ? baseYyyy : now,
          value: baseYyyy ? baseYyyy : now,
        };
      }
    },
  },
  methods: {
    //* 검색 버튼 이벤트
    onSearch() {
      if (this.searchDeptNm == '') common.alert('warning', 'NLS0001364');
      else {
        let flag = '';
        if (this.strategyName != '') {
          flag = 'search';
        }
        const params = {
          baseYYYY: this.baseYear.value,
          stgNm: this.strategyName,
          deptId: this.searchDeptId,
          flag: flag,
        };

        //* 검색 조건 저장
        this[strategyEstabilshmentTypes.actions.INIT_STG_SEARCH_INFO](params);

        //* 연결리스트 초기화
        this[
          strategyEstabilshmentTypes.actions
            .INIT_STRATEGY_ESTABILSHMENT_CONNECT_LIST
        ]({});

        //* 전략과제명을 통해 조회시 드래그앤 드롭 막기
        let isDrag = true;
        if (!common.isEmpty(this.strategyName)) isDrag = false;
        this[strategyEstabilshmentTypes.actions.INIT_IS_GRID_DRAG](isDrag);

        //* 검색조건에 맞는 전략과제 리스트 가져오기
        this[
          strategyEstabilshmentTypes.actions.FETCH_STRATEGY_ESTABILSHMENT_LIST
        ](params);
      }
    },
    //* 해당년도 defalut
    getEvalDate() {
      const intArr = [];
      for (var i = 0; i < 10; i++) {
        intArr.push(i);
      }
      const currentYear = new Date().getFullYear();
      const yearArr = intArr.map(idx => {
        return {
          text: currentYear - idx,
          value: currentYear - idx,
        };
      });
      return yearArr;
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.searchDeptNm,
      });
      const { userType, deptId } = this[commonTypes.getters.GET_USER_DATA];
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      let isAdmin = userType === 'SUPER' || userType === 'ADMIN';
      if (deptList.length === 1) {
        if (!isAdmin) {
          await this[commonTypes.actions.FETCH_BU_INFO]({
            deptId: deptId,
          });
          const buInfo = this[commonTypes.getters.GET_BU_INFO];
          await this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
          const lowDeptList = this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
          //* 운영자가 아니고, 하위부서가 존재하는 경우 => 검색 결과가 하위부서에 속하는지 검증
          const res = lowDeptList.some(el => el.deptId === deptList[0].deptId);
          if (res || buInfo.deptId === deptList[0].deptId) {
            this.searchDeptId = deptList[0].deptId;
            this.searchDeptNm = deptList[0].deptNm;
            this.onSearch();
          } else {
            common.alert('warning', 'NLS0001342', () => {
              this.srchDept();
            });
          }
        } else {
          //* 운영자의 경우
          this.searchDeptId = deptList[0].deptId;
          this.searchDeptNm = deptList[0].deptNm;
          this.onSearch();
        }
      } else {
        this.srchDept();
      }
    },
    srchDept() {
      this[commonTypes.actions.INIT_SELECTED_DEPT]({});
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    onDeptKeyUp() {
      this.searchDeptId = '';
    },
    enterSearchStgNm() {
      if (this.searchDeptNm == '') common.alert('warning', 'NLS0001364');
      else this.onSearch();
    },
  },
};
</script>
