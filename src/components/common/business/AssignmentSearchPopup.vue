<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal2">
            <div class="layer-pop__title">
              <!-- 과제 검색 -->
              <p>{{ $t('NLS0000254') }}</p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box type-table line2">
                <!-- 조회년도 -->
                <p class="search__form__title">
                  {{ $t('NLS0000134') }}
                </p>
                <com-dropdowns
                  :data="getYearList"
                  rules="required"
                  class="hms-dropdown type3"
                  v-model="searchYear"
                  valuefield="value"
                  textfield="text"
                >
                </com-dropdowns>
              </div>
              <div class="search__form__box type-table line2">
                <!-- 담당부서 -->
                <p class="search__form__title">
                  {{ $t('NLS0000064') }}
                </p>
                <span class="input__box type-wide2">
                  <com-input-text
                    rules=""
                    v-model="deptNm"
                    :isReadOnly="false"
                    @keyup="resetDept"
                    @enter="enterDeptSearchPop"
                  ></com-input-text>
                  <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="onPopup('department')"
                  >
                    더찾기
                  </button>
                </span>
              </div>
              <div class="search__form__box type-table line2">
                <!-- 과제명 -->
                <p class="search__form__title">
                  {{ $t('NLS0000151') }}
                </p>
                <span class="input__box type-nobtn type-wide2">
                  <com-input-text
                    rules=""
                    v-model="AssignmentName"
                    @enter="searchAssignment"
                  ></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <button
                  type="button"
                  class="search__btn"
                  @click="searchAssignment"
                >
                  <!-- 검색 -->
                  <span>{{ $t('NLS0000253') }}</span>
                </button>
              </div>
            </div>
            <div class="hms-grid">
              <!-- 공통 켄도 네이티브 그리드 컴포넌트 -->
              <com-native-grid
                :data="items"
                :columns="columns"
                :total="totalCnt"
                :skip="skip"
                :sort="sort"
                :sortable="true"
                selectedfield="selected"
                selectedtype="checked"
                height="250"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
              >
              </com-native-grid>
            </div>
            <div class="layer__btn-box">
              <button type="button" class="blue-btn" @click="addPrjMain">
                <!-- 추가 -->
                <span>{{ $t('NLS0000067') }}</span>
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
// import HeaderSortCell from '@/components/common/business/HeaderSortCell';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'AssignmentSearchPopup',
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
      searchYear: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      }, //* 조회년도
      deptNm: '', //* 부서명
      deptId: '', //* 부서 ID
      manager: '', //* 담당자명
      AssignmentName: '', //* 과제명
      skip: 0,
      totalCnt: 0,
      items: [], //* 페이징 처리한 과제리스트
      searchAssignList: [], //* 검색한 과제리스트
      //* 컬럼 정보
      columns: [],
      sort: [{}],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    //* 가져온 부서 정보
    getSearchAssignment() {
      return this[commonTypes.getters.GET_SEARCH_ASSIGNMENT_INFO];
    },
    //* 선택한 부서 정보
    getSearchCompDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
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
    getI18nLocale() {
      this.initColumns();
    },
    getSearchAssignment(value) {
      this.searchAssignList = value.map(item => {
        item.startDate = timezone.convertToClientTimeZone(
          item.startDate,
          'YYYY-MM-DD',
        );
        item.endDate = timezone.convertToClientTimeZone(
          item.endDate,
          'YYYY-MM-DD',
        );
        return item;
      });
      this.skip = 0;
      // this.totalCnt = this.searchAssignList.length;
      // this.items = this.searchAssignList.slice(this.skip, this.skip + 5);
      this.items = [...this.searchAssignList];
    },
    getSearchCompDept(value) {
      if (!common.isEmpty(value) && this.value) {
        this.deptNm = value.deptNm;
        this.deptId = value.deptId;
        this[commonTypes.actions.INIT_SELECTED_DEPT]({});
      }
    },
  },
  created() {
    this.initColumns();
    // const userData = this[commonTypes.getters.GET_USER_DATA];
    const baseYyyy = this.$route.params.baseYyyy;
    this.searchYear = baseYyyy
      ? { value: baseYyyy, text: baseYyyy }
      : this.searchYear;
    // if (userData.userType !== 'ADMIN' && userData.userType !== 'SUPER') {
    //   this.deptNm = userData.deptNm;
    //   this.deptId = userData.deptId;
    // }
  },
  methods: {
    resetDept() {
      this.deptId = '';
    },
    initColumns() {
      this.columns = [
        {
          field: 'prjNm',
          title: this.$t('NLS0000151'), //과제명
          width: '250px',
          className: 'left',
        },
        {
          field: 'prjGrade',
          title: this.$t('NLS0000252'), //등급
          width: '67px',
          className: 'left',
          cell: FunctionCell,
        },
        {
          field: 'managerName',
          title: this.$t('NLS0000065'), //담당자
          width: '146px',
          className: 'left',
        },
        {
          field: 'startDate',
          title: this.$t('NLS0000158'), //시작일
          width: '146px',
          className: 'center',
        },
        {
          field: 'endDate',
          title: this.$t('NLS0000159'), //종료일
          width: '146px',
          className: 'center',
        },
      ];
    },
    popupInit() {
      this.AssignmentName = '';
      this[commonTypes.actions.INIT_SELECTED_DEPT]({});
      // this.searchYear = {
      //   //평가년도
      //   text: timezone.getClientDate('YYYY'),
      //   value: timezone.getClientDate('YYYY'),
      // };
      // const userData = this[commonTypes.getters.GET_USER_DATA];
      // if (userData.userType !== 'ADMIN' && userData.userType !== 'SUPER') {
      //   this.deptNm = userData.deptNm;
      //   this.deptId = userData.deptId;
      // }
      //this[commonTypes.actions.INIT_SEARCH_ASSIGNMENT_INFO]([]);
      this.$emit('input', false);
    },
    searchAssignment() {
      const param = {
        searchPrjNm: this.AssignmentName,
        deptId: this.deptId,
        selectedYear: this.searchYear.value,
      };
      this[commonTypes.actions.FETCH_SEARCH_ASSIGNMENT_LIST](param);
    },
    clickCheckBox(item, checked) {
      this.items.find((o, i) => {
        if (o.prjId === item.prjId) {
          this.items[i].selected = checked;
          return true; // stop searching
        }
      });
    },
    clickAllCheckBox(_, checked) {
      this.searchAssignList.forEach(element => {
        element.selected = checked;
      });
    },
    addPrjMain() {
      // 추가하시겠습니까?
      common.confirm(this.$t('NLS0000934'), () => {
        var selectedAssignList = this.searchAssignList.filter(item => {
          if (item.selected === undefined || !item.selected) {
            return false;
          } else {
            return true;
          }
        });
        this[commonTypes.actions.INIT_ASSIGNMENT_INFO](selectedAssignList);
        const POPUPINIT = this.popupInit;
        POPUPINIT();
      });
    },
    //* 해당년도 defalut
    // getEvalDate() {
    //   const intArr = [];
    //   for (var i = -10; i < 4; i++) {
    //     intArr.push(i);
    //   }
    //   const currentYear = new Date().getFullYear();
    //   const yearArr = intArr.map(idx => {
    //     return {
    //       text: currentYear + idx,
    //       value: currentYear + idx,
    //     };
    //   });
    //   return yearArr.reverse();
    // },
    onPopup() {
      //* 관리자/일반 권한별 부서 선택 가능 여부 설정
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      //* 하위부서 체크를 위해 자신의 하위부서 가져오기
      //this[commonTypes.actions.FETCH_LOW_DEPT_INFO]({});
      this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
      //* 공통 부서 리스트 가져오기
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      //* 팝업창 띄우기
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    //* 페이징 처리
    onPageChange(skip) {
      this.skip = skip;
      this.items = this.kpiSearchList.slice(this.skip, this.skip + 5);
    },

    async enterDeptSearchPop() {
      // if (common.isEmpty(this.deptNm)) {
      // this.searchAssignment();
      // } else {
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      const userType = loginUserInfo.userType;

      const param = {
        srchDeptNm: this.deptNm,
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
            this.deptNm = deptList[0].deptNm;
            this.deptId = deptList[0].deptId;
          } else {
            //* 하위 부서 가져오기
            await this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
            var lowDeptList = this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];

            //* 검색한 부서 정보 결과가 하위부서정보에 포함되는지 검색
            var flag = lowDeptList.some(item => {
              return item.deptId === deptList[0].deptId ? true : false;
            });
            if (flag) {
              this.deptNm = deptList[0].deptNm;
              this.deptId = deptList[0].deptId;
              this.searchAssignment();
            } else {
              this.deptNm = loginUserInfo.deptNm;
              this.deptId = loginUserInfo.deptId;
              common.alert('warning', 'NLS0001342');
            }
          }
        }
      } else {
        this.deptNm = loginUserInfo.deptNm;
        this.deptId = loginUserInfo.deptId;
        common.alert('warning', 'NLS0001349');
      }
      // }
    },
  },
};
</script>
