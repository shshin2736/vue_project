<template>
  <div class="kpireport-title">
    <strong>{{ $t('NLS0000673') }}</strong
    ><!--KPI실적보고-> 회의 / 보고-->
    <div class="kpireport_inputbox">
      <div class="search__form__box">
        <!-- 부서 -->
        <p class="search__form__title">
          {{ $t('NLS0000121') }}
        </p>
        <span class="input__box">
          <com-input-text
            type="text"
            v-model="selectedDeptNm"
            @enter="enterDeptSearchPop"
          />
          <button type="button" class="magnifier-btn-black" @click="searchDept">
            더찾기
          </button>
        </span>
      </div>
      <div class="search__form__box">
        <!-- 담당자->성명 -->
        <p class="search__form__title">
          {{ $t('NLS0000176') }}
        </p>
        <span class="input__box">
          <com-input-text
            type="text"
            v-model="selectedManagerNm"
            @enter="enterUserSearchPop"
          />
          <button
            type="button"
            class="magnifier-btn-black"
            @click="enterUserSearchPop"
          >
            더찾기
          </button>
        </span>
      </div>
    </div>
    <com-button
      type="button"
      class="prev-btn perm_read"
      :auth="$route.params.auth"
      @click="search('prev')"
    >
      <span>prev</span>
    </com-button>
    <span>{{ baseYear }}{{ $t('NLS0000812') }} {{ baseMonth.text }}</span>
    <com-button
      type="button"
      class="next-btn perm_read"
      :auth="$route.params.auth"
      @click="search('next')"
    >
      <span>next</span>
    </com-button>
    <button type="button" class="layer-close" @click="closePopup">
      {{ $t('NLS0001330')
      }}<!-- 이전화면 -->
    </button>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import { common, timezone, route } from '@/utils';
import { kpiPerformanceStore, commonStore } from '@/mixins';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'KpiPerformReportSearchForm',
  mixins: [kpiPerformanceStore, commonStore],
  components: {
    ComButton,
    ComInputText,
  },
  data: function() {
    return {
      baseMonthOptions: {
        ['M1']: { month: `01`, text: this.$t('NLS0000659') },
        ['M2']: { month: `02`, text: this.$t('NLS0000660') },
        ['M3']: { month: `03`, text: this.$t('NLS0000661') },
        ['M4']: { month: `04`, text: this.$t('NLS0000662') },
        ['M5']: { month: `05`, text: this.$t('NLS0000663') },
        ['M6']: { month: `06`, text: this.$t('NLS0000664') },
        ['M7']: { month: `07`, text: this.$t('NLS0000665') },
        ['M8']: { month: `08`, text: this.$t('NLS0000666') },
        ['M9']: { month: `09`, text: this.$t('NLS0000667') },
        ['M10']: { month: `10`, text: this.$t('NLS0000668') },
        ['M11']: { month: `11`, text: this.$t('NLS0000669') },
        ['M12']: { month: `12`, text: this.$t('NLS0000670') },
      },
      baseYear: timezone.convertToServerTimeZone(new Date(), 'YYYY'),
      baseMonth: {},
      selectedDeptNm: '',
      selectedDeptId: '',
      selectedManagerNm: '',
      selectedManagerId: '',
      kpiId: '',
      //showSearchBtn: false,
    };
  },
  computed: {
    //* 선택한 부서 정보
    getSelectedDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    //* 선택한 부서/담당자 정보
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getRowDeptInfoList() {
      //* 하위 부서
      return this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
    },
    getDataSearch() {
      return this[kpiPerformanceTypes.getters.GET_DATA_SEARCH_KPI_DATA];
    },
  },
  watch: {
    getSelectedDept(value) {
      //* 팝업창 close 버튼을 눌렀을떄 value안에 빈 객체가 들어오기 떄문에 조건 첨부
      if (route.getKpiPerformance() && Object.keys(value).length > 0) {
        this.selectedDeptNm = value.deptNm;
        this.selectedDeptId = value.deptId;
        this.selectedManagerNm = '';
        this.selectedManagerId = '';
        this.getKpiPerformReportList();
        this[commonTypes.actions.INIT_SELECTED_DEPT]([]); //*사용자/부서 선택값초기화
      }
    },
    getSelectedManager(value) {
      //* 팝업창 close 버튼을 눌렀을떄 value안에 빈 객체가 들어오기 떄문에 조건 첨부
      if (route.getKpiPerformance() && Object.keys(value).length > 0) {
        this.selectedDeptNm = value.deptNm;
        this.selectedDeptId = value.deptId;
        this.selectedManagerId = value.userId;
        this.selectedManagerNm = value.userName;
        this.getKpiPerformReportList();
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*사용자/부서 선택값초기화
      }
    },
  },
  mounted() {
    // this[commonTypes.actions.FETCH_YEAR_LIST]({});
    this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
    this.baseMonth = this.baseMonthOptions[`M${new Date().getMonth() + 1}`];
    //* MBO에서  해당 팝업을 불러왔을떄
    const selectedMboKpi = this[commonTypes.getters.GET_SELECTED_MBO_KPI];
    if (
      selectedMboKpi !== undefined &&
      Object.keys(selectedMboKpi).length !== 0
    ) {
      this.baseYear = selectedMboKpi.baseYyyy;
      if (selectedMboKpi.baseMonth) {
        this.baseMonth = this.baseMonthOptions[`M${selectedMboKpi.baseMonth}`];
      }
      this.kpiId = selectedMboKpi.kpiId;
    }
    this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear);
    this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.month);
    //this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PERFORM_LIST](true);
    //this.checkAdmin();
    const dataSearch = this.getDataSearch;
    if (Object.keys(dataSearch).length > 0) {
      //   this.selectedManagerId = dataSearch.userId;
      //   this.selectedDeptNm = dataSearch.deptNm;
      //   this.selectedDeptId = dataSearch.deptId;
      //   this.selectedManagerNm = dataSearch.userNm;
      this.kpiId = dataSearch.srcId;
    }
    this.getKpiPerformReportList();
  },
  beforeDestroy() {
    this[kpiPerformanceTypes.actions.INIT_DATA_SEARCH_KPI_DATA]({});
  },
  methods: {
    // checkAdmin() {
    //   this.showSearchBtn = false;
    //   const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    //   const userType = loginUserInfo.userType;
    //   //*ADMIN, 당담자 일때
    //   if (userType === 'ADMIN' || userType === 'SUPER') {
    //     this.showSearchBtn = true;
    //   }
    // },
    getKpiPerformReportList() {
      let param = {
        baseYyyy: this.baseYear,
        baseYyyyMm: this.baseYear + this.baseMonth.month,
        searchUserId: this.selectedManagerId,
        searchDeptId: this.selectedDeptId,
        kpiId: this.kpiId ? this.kpiId : '',
      };

      // //* MBO에서  해당 팝업을 불러왔을떄
      const selectedMboKpi = this[commonTypes.getters.GET_SELECTED_MBO_KPI];
      if (
        selectedMboKpi == undefined &&
        Object.keys(selectedMboKpi).length == 0
      ) {
        param.viewReport = 'Y';
      }
      this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_REPORT_LIST](param);
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.month);
    },
    search(flag) {
      const month = Number(this.baseMonth.month);
      if (flag === 'prev') {
        if (month > 1) this.baseMonth = this.baseMonthOptions[`M${month - 1}`];
        else {
          this.baseYear = (Number(this.baseYear) - 1).toString();
          this.baseMonth = this.baseMonthOptions[`M12`];
        }
      } else {
        if (month < 12) this.baseMonth = this.baseMonthOptions[`M${month + 1}`];
        else {
          this.baseYear = (Number(this.baseYear) + 1).toString();
          this.baseMonth = this.baseMonthOptions[`M1`];
        }
      }
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.baseMonth.month);
      this.getKpiPerformReportList();
    },
    searchDept() {
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    //* 담당자 검색
    searchManager() {
      const param = {
        srchUserNm: this.selectedManagerNm,
        srchInnerGrps: true,
      };
      // this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM](param);
    },
    async enterUserSearchPop() {
      //* 담당자 input 엔터시
      const param = {
        srchUserNm: this.selectedManagerNm,
        srchInnerGrps: true,
      };
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.selectedDeptNm = value.deptNm;
        this.selectedDeptId = value.deptId;
        this.selectedManagerId = value.userId;
        this.selectedManagerNm = value.userName;
        this.getKpiPerformReportList();
      } else {
        this.searchManager();
        this.selectedManagerNm = '';
      }
    },
    checkLowDeptUser() {
      if (common.isEmpty(this.getRowDeptInfoList)) return;
      // const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      // rowDeptList = this.getRowDeptInfoList.findIndex(
      //   x => x.deptId === value.deptId,
      // );
    },
    closePopup() {
      this.selectedDeptNm = '';
      this.selectedDeptId = '';
      this.selectedManagerId = '';
      this.selectedManagerNm = '';
      this.kpiId = '';
      this[commonTypes.actions.INIT_SELECTED_MBO_KPI]({});
      this[commonTypes.actions.INIT_VIEWS_KPI_PERFORMANCE](false);
    },
    async enterDeptSearchPop() {
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      const userType = loginUserInfo.userType;

      const param = {
        srchDeptNm: this.selectedDeptNm,
      };
      //* 부서 리스트 가져오기
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST](param);
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (!common.isEmpty(deptList)) {
        //* 검색한 부서 정보 결과가 2개 이상이면 부서 검색 공통 팝업 open
        if (deptList.length > 1) this.searchDept();
        else {
          //* 관리자나 슈퍼관리자일 경우
          if (userType === 'ADMIN' || userType === 'SUPER') {
            this.selectedDeptNm = deptList[0].deptNm;
            this.selectedDeptId = deptList[0].deptId;
          } else {
            //* 하위 부서 가져오기
            await this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
            var lowDeptList = this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];

            //* 검색한 부서 정보 결과가 하위부서정보에 포함되는지 검색
            var flag = lowDeptList.some(item => {
              return item.deptId === deptList[0].deptId ? true : false;
            });
            if (flag) {
              this.selectedDeptNm = deptList[0].deptNm;
              this.selectedDeptId = deptList[0].deptId;
              this.getKpiPerformReportList();
            } else {
              this.selectedDeptNm = loginUserInfo.deptNm;
              this.selectedDeptId = loginUserInfo.deptId;
              common.alert('warning', 'NLS0001342');
            }
          }
        }
      } else {
        this.selectedDeptNm = loginUserInfo.deptNm;
        this.selectedDeptId = loginUserInfo.deptId;
        common.alert('warning', 'NLS0001349');
      }
    },
  },
};
</script>
