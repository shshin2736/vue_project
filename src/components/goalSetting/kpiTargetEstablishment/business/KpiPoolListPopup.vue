<template>
  <!-- 전체 KPI Pool 목록 (목표추가) 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000477') }}</p>
              <!--KPI 목록-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box type-table line3">
                <p class="search__form__title divide">
                  {{ $t('NLS0000138') }}
                </p>
                <!--구분-->
                <div class="radio-box">
                  <span class="radio-form">
                    <input
                      type="radio"
                      id="std-all"
                      name="stdRadioNm"
                      value="all"
                      v-model="stdRadio"
                      checked
                    />
                    <label for="std-all">{{ $t('NLS0000336') }}</label
                    ><!--전체-->
                  </span>
                  <span class="radio-form">
                    <input
                      type="radio"
                      id="std-op1"
                      name="stdRadioNm"
                      value="S"
                      v-model="stdRadio"
                    />
                    <label for="std-op1">{{ $t('NLS0000337') }}</label
                    ><!--전사표준-->
                  </span>
                  <span class="radio-form">
                    <input
                      type="radio"
                      id="std-op2"
                      name="stdRadioNm"
                      value="P"
                      v-model="stdRadio"
                    />
                    <label for="std-op2">{{ $t('NLS0000338') }}</label
                    ><!--선행-->
                  </span>
                </div>
              </div>
              <div class="search__form__box type-table line3">
                <p class="search__form__title">
                  {{ $t('NLS0000059') }}
                </p>
                <!--실적 집계 방식-->
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
                <p class="search__form__title">
                  {{ $t('NLS0000060') }}
                </p>
                <!--실적 누계 방식-->
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
                  {{ $t('NLS0000148') }}
                </p>
                <!--KPI명-->
                <span class="input__box type-small type-nobtn">
                  <com-input-text
                    type="text"
                    v-model="searchKpiNm"
                    @enter="searhKpiList()"
                  />
                </span>
              </div>
              <div class="search__form__box type-table line3">
                <p class="search__form__title">
                  {{ $t('NLS0000064') }}
                </p>
                <!--담당부서-->
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
                <p class="search__form__title">
                  {{ $t('NLS0000065') }}
                </p>
                <!--담당자-->
                <span class="input__box type-small">
                  <!-- <com-input-text
                    type="text"
                    title="담당자 입력폼"
                    :isReadOnly="true"
                    v-model="searchUserNm"
                  /> -->
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
                  <!-- <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="searchUser"
                  >
                    더찾기
                  </button> -->
                </span>
              </div>
              <div class="search__form__box type-table line3" v-if="true">
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
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="searhKpiList"
                >
                  <span>{{ $t('NLS0000253') }}</span>
                  <!--검색-->
                </com-button>
              </div>
            </div>
            <div class="hms-grid kpi-pool-list">
              <com-native-grid
                :data="getKpiPoolData"
                :columns="columns"
                height="470"
                selectedfield="selected"
                selectedtype="checked"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
                :pageable="true"
                :skip="skip"
                :take="take"
                :total="total"
                :serverRander="true"
                @pageChange="onPageChange"
                @btnclick="openPopupFunc"
              ></com-native-grid>
            </div>
            <div class="layer__btn-box">
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="addKpiData"
              >
                <span>{{ $t('NLS0000067') }}</span
                ><!--추가-->
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
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
  name: 'KpiPoolListPopup',
  components: {
    ComNativeGrid,
    ComButton,
    ComDropdowns,
    ComInputText,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore, commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      skip: 0,
      take: 13,
      total: 0,
      searchPerType: { text: this.$t('NLS0000237'), value: '' }, //*선택
      searchAccType: { text: this.$t('NLS0000237'), value: '' }, //*선택
      getUseYn: [
        { text: this.$t('NLS0000237'), value: '' },
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      searchUseYn: { text: 'Y', value: 'Y' },
      columns: [],
      selectedRow: [],
      searchKpiNm: '',
      searchDeptNm: '',
      searchDeptId: '',
      searchUserNm: '',
      searchUserId: '',
      stdRadio: 'all',
      showUseYn: false,
    };
  },
  computed: {
    getKpiPoolData(state) {
      let items = this[
        kpiTargetEstablishmentTypes.getters.GET_KPI_POOL_DATA_LIST
      ];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
    getSelectedRow() {
      return this.selectedRow;
    },
    getPerTypeDropDown() {
      //*실적집계 셀렉트 데이터
      let list = [{ text: this.$t('NLS0000237'), value: '' }]; //*선택
      common.getCodeList('KPI007').map(obj => {
        list.push({ text: obj.cdNm, value: obj.cd });
      });
      return list;
    },
    getAccTypeDropDown() {
      //*실적누계 셀렉트 데이터
      let list = [{ text: this.$t('NLS0000237'), value: '' }]; //*선택
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
  },
  watch: {
    getSelectedManager(data) {
      if (this.value && !common.isEmpty(data)) {
        this.searchUserNm = data.userName;
        this.searchUserId = data.userId;
        this.searchDeptNm = data.deptNm;
        this.searchDeptId = data.deptId;
      }
    },
    getSelectedDept: function(value) {
      if (this.value && !common.isEmpty(value)) {
        this.searchDeptNm = value.deptNm;
        this.searchDeptId = value.deptId;
      }
    },
    value() {
      const userInfo = this.getUserInfo;
      // this.searchUserNm = userInfo.userName;
      // this.searchUserId = userInfo.userId;
      this.searchDeptNm = userInfo.deptNm;
      this.searchDeptId = userInfo.deptId;
    },
  },
  mounted() {
    this.initColumns();
    this.getCheckUser();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //*KPI명
          width: '265px',
          className: 'left ellipsis  under-line-btn pop-tooltip',
          cell: FunctionCell,
          format: 'button',
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
    getCheckUser() {
      //*해당kpi수정가능한 user인지
      const loginuserType = this[commonTypes.getters.GET_COM_USER_INFO]
        .userType;
      this.showUseYn =
        loginuserType === 'ADMIN' || loginuserType === 'SUPER' ? true : false;
    },
    clickCheckBox(item, checked) {
      if (checked) {
        this.selectedRow.push(item);
      } else {
        const index = this.selectedRow.findIndex(el => el.kpiId === item.kpiId);
        this.selectedRow.splice(index, 1);
      }
    },
    clickAllCheckBox(row) {
      this.selectedRow = [];
      this.selectedRow = row;
    },
    addKpiData() {
      common.confirm('NLS0000005', () => {
        if (this.selectedRow.length == 0) {
          common.alert('warning', 'NLS0000919'); //*KPI를 선택해 주십시오.
          return false;
        }
        //* KPI목록에 추가
        let param = {
          baseYyyy: this.getSelectedYear,
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
          bscKpi: 'K',
          list: this.getSelectedRow,
        };
        this[kpiTargetEstablishmentTypes.actions.UPDATE_KPI_POOL_DATA_LIST](
          param,
        );
        this.closePopup();
      });
    },
    searhKpiList() {
      const param = {
        searchStdYn: this.stdRadio === 'all' ? '' : this.stdRadio,
        searchUserId: this.searchUserId,
        searchKpiNm: this.searchKpiNm,
        searchDeptId: this.searchDeptId,
        searchPerType: this.searchPerType.value,
        searchAccType: this.searchAccType.value,
        //searchUseYn: this.showUseYn ? this.searchUseYn.value : '',
        searchUseYn: this.searchUseYn.value,
        limit: 13,
        offset: 0,
      };
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_POOL_DATA_LIST](param);
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
    onDeptKeyUp() {
      this.searchDeptId = '';
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
    async enterUserSearchPop() {
      //* 담당자 input 엔터시
      const param = {
        srchUserNm: this.searchUserNm,
        srchInnerGrps: true,
      };
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM](param);
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
    async onPageChange(skip, take) {
      const param = {
        searchStdYn: this.stdRadio === 'all' ? '' : this.stdRadio,
        searchUserId: this.searchUserId,
        searchKpiNm: this.searchKpiNm,
        searchDeptId: this.searchDeptId,
        searchPerType: this.searchPerType.value,
        searchAccType: this.searchAccType.value,
        searchUseYn: this.searchUseYn.value,
        limit: take,
        offset: skip,
      };
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_POOL_DATA_LIST](param);
      this.skip = skip;
      this.take = take;
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
    closePopup() {
      this.selectedRow = [];
      this.searchUserNm = '';
      this.searchUserId = '';
      this.searchKpiNm = '';
      this.searchDeptNm = '';
      this.searchDeptId = '';
      this.searchUseYn = { text: 'Y', value: 'Y' };
      this.searchPerType = { text: this.$t('NLS0000237'), value: '' }; //*선택
      this.searchAccType = { text: this.$t('NLS0000237'), value: '' }; //*선택
      //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      this.$emit('input', false);
    },
  },
};
</script>
