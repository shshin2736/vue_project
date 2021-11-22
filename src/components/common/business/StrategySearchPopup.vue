<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide2">
            <div class="layer-pop__title">
              <!-- 전략과제 검색 -->
              <p>{{ $t('NLS0001365') }}</p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box type-table line2">
                <!-- 기준년도 -->
                <p class="search__form__title">
                  {{ $t('NLS0000960') }}
                </p>
                <com-dropdowns
                  :data="getYearList"
                  class="hms-dropdown type4"
                  rules="required"
                  v-model="baseYYYY"
                  valuefield="value"
                  textfield="text"
                ></com-dropdowns>
              </div>
              <div class="search__form__box type-table line2">
                <!-- 담당부서 -->
                <p class="search__form__title">
                  {{ $t('NLS0000064') }}
                </p>
                <span class="input__box type-small">
                  <com-input-text
                    type="text"
                    v-model="srchDeptNm"
                    @enter="enterDeptSearchPop"
                  />
                  <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="onPopup"
                  >
                    더찾기
                  </button>
                </span>
              </div>
              <div class="search__form__box type-table line2">
                <!-- 전략과제명 -->
                <p class="search__form__title">
                  {{ $t('NLS0000240') }}
                </p>
                <span class="input__box type-small type-nobtn">
                  <com-input-text
                    type="text"
                    v-model="stgNm"
                    @enter="enterSearchStgNm"
                  />
                </span>
              </div>
              <div class="search__btn__box">
                <button
                  type="button"
                  class="search__btn"
                  @click="searchStrategy"
                >
                  <!-- 검색 -->
                  <span>{{ $t('NLS0000253') }}</span>
                </button>
              </div>
            </div>
            <div class="hms-grid">
              <com-native-grid
                height="300"
                :data="items"
                :sortable="true"
                :sort="sort"
                :columns="columns"
                selectedfield="selected"
                selectedtype="checked"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
              >
              </com-native-grid>
            </div>
            <div class="layer-btn-tbox type-normal">
              <button type="button" class="blue-btn" @click="onClick">
                <!-- 선택 -->
                <span>{{ $t('NLS0000237') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { commonStore } from '@/mixins';
// import FunctionCell from '@/components/common/business/FunctionCell';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';

export default {
  name: 'StrategySearchPopup',
  mixins: [commonStore],
  components: {
    ComNativeGrid,
    ComDropdowns,
    ComInputText,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      sort: [], //* 정렬 정보
      columns: [],
      //* 기준년도
      baseYYYY: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      items: [], //*보여줄 전략과제 리스트
      searchStrategyList: [], //* 검색한 전략과제 리스트
      srchDeptNm: '', //* 담당부서명
      srchDeptId: '', //*
      stgNm: '', //*전략과제명,
      skip: 0,
      totalSize: 0,
    };
  },
  computed: {
    //* 해당년도 defalut
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getSearchStrategyList() {
      return this[commonTypes.getters.GET_SEARCH_STRATEGY_LIST];
    },
    //* 선택한 부서 정보
    getSearchCompDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
  },
  watch: {
    getSearchStrategyList(value) {
      this.searchStrategyList = value;
      this.skip = 0;
      this.totalSize = this.searchStrategyList.length;
      this.items = this.searchStrategyList;
    },
    getSearchCompDept(value) {
      this.srchDeptNm = value.deptNm;
      this.srchDeptId = value.deptId;
    },
  },
  created() {
    this.initColumns();
    const userData = this[commonTypes.getters.GET_USER_DATA];
    this.srchDeptId = userData.deptId;
    this.srchDeptNm = userData.deptNm;
    this[commonTypes.actions.FETCH_YEAR_LIST]({});
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'stgNm',
          title: this.$t('NLS0000240'), //전략과제명
          className: 'left under-line-btn',
          // format: 'link',
        },
      ];
    },
    //* 해당년도 defalut
    // getEvalDate() {
    //   const intArr = [];
    //   for (var i = 0; i < 10; i++) {
    //     intArr.push(i);
    //   }
    //   const currentYear = new Date().getFullYear();
    //   const yearArr = intArr.map(idx => {
    //     return {
    //       text: currentYear - idx,
    //       value: currentYear - idx,
    //     };
    //   });
    //   return yearArr;
    // },
    //* 초기화
    popupInit() {
      const userData = this[commonTypes.getters.GET_USER_DATA];
      this.stgNm = ''; //전략과제명 초기화
      this.srchDeptNm = userData.deptNm; //부서명 초기화
      this.srchDeptId = userData.deptId; //부서 ID 초기화
      this.baseYYYY = {
        //기준년도 초기화
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      };
      this.$emit('input', false);
    },
    //* 부서 검색 popup
    onPopup() {
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    //* 전략과제 검색
    searchStrategy() {
      if (this.srchDeptNm == '') common.alert('warning', 'NLS0001364');
      else {
        const param = {
          baseYYYY: this.baseYYYY.value,
          // srchDeptNm: this.srchDeptNm,
          stgDeptId: this.srchDeptId,
          stgNm: this.stgNm,
        };
        this[commonTypes.actions.FETCH_SEARCH_STRATEGY_LIST](param);
      }
    },
    onClick() {
      var selectedStgList = this.searchStrategyList.filter(item => {
        if (item.selected === undefined || !item.selected) {
          return false;
        } else {
          return true;
        }
      });
      this[commonTypes.actions.INIT_SELECTED_STRATEGY_LIST](selectedStgList);
      this.popupInit();
    },
    //* 부분 체크
    clickCheckBox(item, checked) {
      this.items.find((o, i) => {
        if (o.stgId === item.stgId) {
          this.items[i].selected = checked;
          return true; // stop searching
        }
      });
    },
    //* 전체 체크
    clickAllCheckBox(_, checked) {
      this.searchStrategyList.forEach(element => {
        element.selected = checked;
      });
    },
    async enterDeptSearchPop() {
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      const userType = loginUserInfo.userType;

      const param = {
        srchDeptNm: this.srchDeptNm,
      };
      //* 부서 리스트 가져오기
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST](param);
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (!common.isEmpty(deptList)) {
        //* 검색한 부서 정보 결과가 2개 이상이면 부서 검색 공통 팝업 open
        if (deptList.length > 1) this.onPopup();
        else {
          //* 관리자나 슈퍼관리자일 경우
          if (userType === 'ADMIN' || userType === 'SUPER') {
            this.srchDeptNm = deptList[0].deptNm;
            this.srchDeptId = deptList[0].deptId;
            this.searchStrategy();
          } else {
            //* 하위 부서 가져오기
            await this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
            var lowDeptList = this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];

            //* 검색한 부서 정보 결과가 하위부서정보에 포함되는지 검색
            var flag = lowDeptList.some(item => {
              return item.deptId === deptList[0].deptId ? true : false;
            });
            if (flag) {
              this.srchDeptNm = deptList[0].deptNm;
              this.srchDeptId = deptList[0].deptId;
              this.searchStrategy();
            } else {
              this.srchDeptNm = loginUserInfo.deptNm;
              this.srchDeptId = loginUserInfo.deptId;
              common.alert('warning', 'NLS0001342');
            }
          }
        }
      } else {
        this.srchDeptNm = loginUserInfo.deptNm;
        this.srchDeptId = loginUserInfo.deptId;
        common.alert('warning', 'NLS0001349');
      }
    },
    enterSearchStgNm() {
      if (this.srchDeptNm == '') common.alert('warning', 'NLS0001364');
      else this.searchStrategy();
    },
  },
};
</script>

<style></style>
