<template>
  <!-- 전체 KPI Pool 목록 (목표추가) 팝업-->
  <com-overlay v-model="value.value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <!-- KPI 목록 -->
              <p>{{ $t('NLS0000477') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search-box__row">
                <div class="search__form__box type-table line3">
                  <!-- 구분 -->
                  <p class="search__form__title divide">
                    {{ $t('NLS0000138') }}
                  </p>
                  <div class="radio-box">
                    <span class="radio-form">
                      <input
                        type="radio"
                        id="all"
                        name="stdRadio"
                        value="all"
                        v-model="stdRadio"
                      />
                      <!-- 전체 -->
                      <label for="all">{{ $t('NLS0000336') }}</label>
                    </span>
                    <span class="radio-form">
                      <input
                        type="radio"
                        id="comm-kpi-op1"
                        name="stdRadio"
                        value="S"
                        v-model="stdRadio"
                      />
                      <!-- 전사표준 -->
                      <label for="comm-kpi-op1">{{ $t('NLS0000337') }}</label>
                    </span>
                    <span class="radio-form">
                      <input
                        type="radio"
                        id="comm-kpi-op2"
                        name="stdRadioForm"
                        value="P"
                        v-model="stdRadio"
                      />
                      <!-- 선행 -->
                      <label for="comm-kpi-op2">{{ $t('NLS0000338') }}</label>
                    </span>
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- 실적 집계 방식 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000059') }}
                  </p>
                  <com-dropdowns
                    :data="getPerTypeDropDown"
                    rules="required"
                    textfield="text"
                    valuefiedl="value"
                    class="hms-dropdown type4"
                    v-model="searchPerType"
                  ></com-dropdowns>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- 실적 누계 방식 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000060') }}
                  </p>
                  <com-dropdowns
                    :data="getAccTypeDropDown"
                    rules="required"
                    textfield="text"
                    valuefiedl="value"
                    class="hms-dropdown type4"
                    v-model="searchAccType"
                  ></com-dropdowns>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000058') }}
                  </p>
                  <!--사용여부-->
                  <com-dropdowns
                    :data="getUseYn"
                    rules="required"
                    textfield="text"
                    valuefiedl="value"
                    class="hms-dropdown type8"
                    v-model="searchUseYn"
                  ></com-dropdowns>
                </div>
              </div>
              <div class="search-box__row">
                <div class="search__form__box type-table line3">
                  <!-- 담당부서 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000064') }}
                  </p>
                  <span class="input__box type-small">
                    <com-input-text
                      type="text"
                      :isReadOnly="false"
                      v-model="searchDeptNm"
                      @enter="enterDeptSrch"
                      @keyup="onDeptKeyUp"
                    />
                    <button
                      type="button"
                      class="magnifier-btn-black"
                      @click="searchDept"
                    >
                      더찾기
                    </button>
                  </span>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- 담당자 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000065') }}
                  </p>
                  <span class="input__box type-small">
                    <com-input-text
                      type="text"
                      title="담당자 입력폼"
                      v-model="searchUserNm"
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
                  </span>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- KPI명 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000148') }}
                  </p>
                  <span class="input__box type-wide type-nobtn">
                    <input
                      type="text"
                      v-model="searchKpiNm"
                      @keypress.enter="searhKpiList"
                    />
                  </span>
                  <com-button
                    type="button"
                    class="search__btn perm_read margin-custom"
                    :auth="$route.params.auth"
                    @click="searhKpiList"
                  >
                    <!-- 검색 -->
                    <span>{{ $t('NLS0000253') }}</span>
                  </com-button>
                </div>
              </div>
            </div>
            <div class="hms-grid kpi-pool-list">
              <!-- :serverRander="true" :pageable="true"  @pageChange="onPageChange"-->
              <!-- :skip="skip" :take="take" :total="total" -->
              <com-native-grid
                :data="items"
                :columns="columns"
                height="385"
                selectedfield="selected"
                selectedtype="checked"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
                @btnclick="openPopupFunc"
                scrollable="virtual"
                :skip="skip"
                :total="total"
                @pageChange="onPageChange"
              ></com-native-grid>
            </div>
            <div class="layer__btn-box">
              <span class="kpi-text-info" v-if="value.flag === 'kpi'"
                >{{ $t('NLS0001442')
                }}<!--※ ‘추가’ 버튼 클릭 시 체계도 최하단으로 KPI가 추가됩니다.--></span
              >
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="addKpiData"
              >
                <!-- 추가 -->
                <span>{{ $t('NLS0000067') }}</span>
              </com-button>
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
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import { commonStore, kpiTargetEstablishmentStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import FunctionCell from '@/components/common/business/FunctionCell';
export default {
  name: 'CommonKpiPoolListPopup',
  mixins: [commonStore, kpiTargetEstablishmentStore],
  components: {
    ComNativeGrid,
    ComButton,
    ComDropdowns,
    ComInputText,
    ComOverlay,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      skip: 0,
      take: 10,
      total: 0,
      searchPerType: { text: this.$t('NLS0000237'), value: '' },
      searchAccType: { text: this.$t('NLS0000237'), value: '' },
      searchUseYn: { text: 'Y', value: 'Y' },
      getUseYn: [
        { text: this.$t('NLS0000237'), value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      columns: [],
      searchKpiNm: '',
      searchDeptNm: '',
      searchDeptId: '',
      searchUserNm: '',
      searchUserId: '',
      stdRadio: 'all',
      items: [],
    };
  },
  computed: {
    getKpiPoolData() {
      // let data = this[commonTypes.getters.GET_COM_KPI_POOL_LIST];
      return this[commonTypes.getters.GET_COM_KPI_POOL_LIST];
    },
    getSelectedRow() {
      return this.selectedRow;
    },
    getPerTypeDropDown() {
      //*실적집계 셀렉트 데이터
      let list = [{ text: '', value: '' }];
      common.getCodeList('KPI007').map(obj => {
        list.push({ text: obj.cdNm, value: obj.cd });
      });
      return list;
    },
    getAccTypeDropDown() {
      //*실적누계 셀렉트 데이터
      let list = [{ text: '', value: '' }];
      common.getCodeList('KPI001').map(obj => {
        list.push({ text: obj.cdNm, value: obj.cd });
      });
      return list;
    },
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getSelectedDept() {
      //* 선택한 부서
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
    getExistKpiList() {
      return this[commonTypes.getters.GET_EXIST_KPI_LIST];
    },
  },
  watch: {
    getKpiPoolData: function(value) {
      this.total = value.length;
      this.items = value.slice(0, 12);
    },
    getPerTypeDropDown(list) {
      if (list.length > 0) {
        this.searchPerType = { text: list[0].text, value: list[0].value };
      }
    },
    getAccTypeDropDown(list) {
      if (list.length > 0) {
        this.searchAccType = { text: list[0].text, value: list[0].value };
      }
    },
    getSelectedManager(data) {
      this.searchUserNm = data.userName;
      this.searchUserId = data.userId;
      this.searchDeptNm = data.deptNm;
      this.searchDeptId = data.deptId;
    },
    getSelectedDept: function(value) {
      this.searchDeptNm = '';
      if (!common.isEmpty(value)) {
        this.searchDeptNm = value.deptNm;
        this.searchDeptId = value.deptId;
      }
    },
    value: function({ value }) {
      if (value) {
        this.initColumns();
        const userInfo = this.getUserInfo;
        this.searchUserNm = userInfo.userName;
        this.searchUserId = userInfo.userId;
        this.searchDeptNm = userInfo.deptNm;
        this[commonTypes.actions.FETCH_COM_KPI_POOL_LIST]({
          searchUserId: this.getUserInfo.userId,
          searchUseYn: this.searchUseYn.value,
        });
      }
    },
  },
  created() {
    // this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //*KPI명
          width: '265px',
          // className: 'left ellipsis under-line-btn pop-tooltip',
          className:
            this.value.flag === 'other'
              ? 'left td-ellipsis'
              : 'left td-ellipsis under-line-btn pop-tooltip',
          cell: this.value.flag === 'other' ? '' : FunctionCell,
          format: this.value.flag === 'other' ? '' : 'button',
        },
        {
          field: 'kpiUnitNm',
          title: this.$t('NLS0000063'), //*단위
          width: '80px',
          className: 'center',
        },
        {
          field: 'kpiAchType',
          title: this.$t('NLS0001130'), //*달성 유형
          width: '98px',
          className: 'center',
        },
        {
          field: 'kpiAccType',
          title: this.$t('NLS0001132'), //*누계 방식
          width: '98px',
          className: 'center',
        },
        {
          field: 'userNm',
          title: this.$t('NLS0000065'), //*담당자
          width: '105px',
          className: 'center td-ellipsis',
        },
        {
          field: 'kpiPerType',
          title: this.$t('NLS0001131'), //*집계 방식
          width: '98px',
          className: 'center',
        },
        {
          field: 'kpiCycle',
          title: this.$t('NLS0000057'), //*측정 주기
          width: '85px',
          className: 'center',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //*담당부서
          width: '125px',
          className: 'center td-ellipsis',
        },
        {
          field: 'kpiId',
          title: 'KPI ID',
          width: '85px',
          className: 'center',
        },
        {
          field: 'useYn',
          title: this.$t('NLS0000058'), //*사용여부
          width: '75px',
          className: 'center',
        },
      ];
    },
    //* 스크롤 페이징 이벤트
    onPageChange(skip) {
      this.skip = skip;
      const items = this.getKpiPoolData;
      this.items = items.slice(this.skip, this.skip + 12);
    },
    roleCheck() {
      return true;
    },
    clickCheckBox(item, checked) {
      this.getKpiPoolData.map(i => {
        if (i.kpiId === item.kpiId) i.selected = checked;
      });
    },
    clickAllCheckBox(rows, chk) {
      this.getKpiPoolData.map(i => (i.selected = chk));
    },
    addKpiData() {
      const selectedItems = this.getKpiPoolData.filter(i => i.selected);
      if (selectedItems.length === 0) {
        common.alert('warning', 'NLS0000935');
        return false;
      }
      common.confirm('NLS0000934', () => {
        //* 지표 그래프, 전략 체계도에서 호출한 경우
        if (this.value.flag === 'other') {
          const uniqueList = selectedItems.filter(
            item => !this.getExistKpiList.includes(item.kpiId),
          );
          if (uniqueList.length > 0) {
            //* 선택한 KPI STORE에 저장하기
            this[commonTypes.actions.INIT_SELECTED_COM_KPI_POOL_LIST](
              selectedItems,
            );
            this.closePopup();
          } else {
            // 이미 추가된 KPI가 존재합니다.
            common.alert('warning', 'NLS0001376');
            return;
          }
        } else {
          //* KPI 체계도에서 호출한 경우
          //* KPI목록에 추가
          let param = {
            baseYyyy: this.getSelectedYear,
            baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
            bscKpi: 'K',
            list: selectedItems,
          };
          this[kpiTargetEstablishmentTypes.actions.UPDATE_KPI_POOL_DATA_LIST](
            param,
          );
          this.closePopup();
        }
      });
    },
    searhKpiList() {
      // limit: 10, offset: 0,
      // this.skip = 0;
      const param = {
        searchStdYn: this.stdRadio === 'all' ? '' : this.stdRadio,
        searchUserId: this.searchUserId,
        searchKpiNm: this.searchKpiNm,
        searchDeptId: this.searchDeptId,
        searchPerType: this.searchPerType.value,
        searchAccType: this.searchAccType.value,
        searchUseYn: this.searchUseYn.value,
      };
      this[commonTypes.actions.FETCH_COM_KPI_POOL_LIST](param);
    },
    async enterUserSearchPop() {
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.searchUserNm,
        srchInnerGrps: true,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.searchUserNm = value.userName;
        this.searchUserId = value.userId;
        this.searchDeptNm = value.deptNm;
        this.searchDeptId = value.deptId;
      } else {
        this.searchUserId = '';
        this.searchUser();
      }
    },
    onKeyup() {
      this.searchUserId = '';
      // this.searchDeptId = '';
      // this.searchDeptNm = '';
    },
    onDeptKeyUp() {
      this.searchDeptId = '';
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.searchDeptNm,
      });
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (deptList.length === 1) {
        this.searchDeptNm = deptList[0].deptNm;
        this.searchDeptId = deptList[0].deptId;
      } else {
        this.searchDept();
      }
    },
    searchDept() {
      this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      this[commonTypes.actions.INIT_SELECTED_DEPT]({}); //*부서 선택값초기화
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    searchUser() {
      // this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*사용자/부서 선택값초기화
      const param = {
        srchUserNm: this.searchUserNm,
        srchInnerGrps: true,
      };
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM](param);
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
    },
    closePopup() {
      this.selectedRow = [];
      this.searchUserNm = '';
      this.searchUserId = '';
      this.searchKpiNm = '';
      this.searchDeptNm = '';
      this.searchDeptId = '';
      this.skip = 0;
      this.take = 10;
      this.searchUseYn = { text: 'Y', value: 'Y' };
      // 선택
      this.searchPerType = { text: this.$t('NLS0000237'), value: '' };
      this.searchAccType = { text: this.$t('NLS0000237'), value: '' };
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      this.$emit('input', { value: false, flag: '' });
    },
    openPopupFunc(dataItem, value, field) {
      if (field == 'kpiNm') {
        this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
          kpiId: dataItem.kpiId,
          baseYyyy: this.getSelectedYear,
        });
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_UPDATE_POP](
          true,
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">
.radio-box {
  @include breakpoint(desktop-s) {
    .radio-form:first-child {
      margin-left: 0 !important;
    }
  }
}
.search-box {
  padding-right: 130px;
}
.hms-dropdown.type4 {
  width: 100%;
  min-width: 150px;
  max-width: 300px;
  @include breakpoint(desktop-s) {
    width: calc(50% - 5px);
    max-width: none;
  }
}
.search-box.type-layer .search__form__box .type-small input {
  max-width: 200px;
  width: 100%;
  @include breakpoint(desktop-s) {
    max-width: none;
  }
}
</style>
