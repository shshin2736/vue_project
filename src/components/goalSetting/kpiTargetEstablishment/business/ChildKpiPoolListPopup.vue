<template>
  <!-- 하위 KPI 연결 전체 KPI Pool 목록 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000477') }} ({{ $t('NLS0000416') }})</p>
              <!--KPI 목록 (하위 KPI 연결)-->
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
                      id="std-all-ck"
                      name="stdRadioNm"
                      value="all"
                      v-model="stdRadio"
                      checked
                    />
                    <label for="std-all-ck">{{ $t('NLS0000336') }}</label
                    ><!--전체-->
                  </span>
                  <span class="radio-form">
                    <input
                      type="radio"
                      id="std-op1-ck"
                      name="stdRadioNm"
                      value="S"
                      v-model="stdRadio"
                    />
                    <label for="std-op1-ck">{{ $t('NLS0000337') }}</label
                    ><!--전사표준-->
                  </span>
                  <span class="radio-form">
                    <input
                      type="radio"
                      id="std-op2-ck"
                      name="stdRadioNm"
                      value="P"
                      v-model="stdRadio"
                    />
                    <label for="std-op2-ck">{{ $t('NLS0000338') }}</label
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
                  textfield="text"
                  valuefiedl="value"
                  class="hms-dropdown type6"
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
                  class="hms-dropdown type6"
                  v-model="searchAccType"
                ></com-dropdowns>
              </div>
              <div class="search__form__box type-table line3">
                <p class="search__form__title">
                  {{ $t('NLS0000063') }}
                </p>
                <!--단위-->
                <com-dropdowns
                  :data="getUnitTypeDropDown"
                  rules="required"
                  textfield="text"
                  valuefiedl="value"
                  class="hms-dropdown type8"
                  v-model="searchUnitType"
                ></com-dropdowns>
              </div>
              <div class="search__form__box type-table line3">
                <p class="search__form__title">
                  {{ $t('NLS0000148') }}
                </p>
                <!--KPI명-->
                <span class="input__box type-small type-nobtn">
                  <input type="text" v-model="searchKpiNm" />
                </span>
              </div>
              <div class="search__form__box type-table line3">
                <p class="search__form__title">
                  {{ $t('NLS0000064') }}
                </p>
                <!--담당부서-->
                <span class="input__box type-small">
                  <input type="text" v-model="searchDeptNm" />
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
                  <input type="text" v-model="searchUserNm" />
                  <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="searchUser"
                  >
                    더찾기
                  </button>
                </span>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="searhKpiList"
                >
                  <span>{{ $t('NLS0000253') }}</span
                  ><!--검색-->
                </com-button>
              </div>
            </div>
            <div class="hms-grid kpi_checkbox">
              <com-native-grid
                :data="getKpiPoolData"
                :columns="columns"
                height="390"
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
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'ChildKpiPoolListPopup',
  mixins: [kpiTargetEstablishmentStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
    ComDropdowns,
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
      skip: 0,
      take: 10,
      total: 0,
      searchPerType: { text: this.$t('NLS0000237'), value: '' }, //*선택
      searchAccType: { text: this.$t('NLS0000237'), value: '' }, //*선택
      searchUnitType: { text: this.$t('NLS0000237'), value: '' }, //*선택
      columns: [],
      selectedRow: [],
      searchKpiNm: '',
      searchDeptNm: '',
      searchUserNm: '',
      stdRadio: 'all',
      selectedUnit: '',
      TYPE_AUTO_SUM: '91', //*자동합산
    };
  },
  computed: {
    getKpiPoolData(state) {
      let items = this[
        kpiTargetEstablishmentTypes.getters.GET_CHILD_KPI_POOL_LIST
      ];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
    getSelectedRow() {
      return this.selectedRow;
    },
    getPerTypeDropDown() {
      //*실적집계 셀렉트 데이터
      let list = [{ text: '선택', value: '' }]; //*선택
      common.getCodeList('KPI007').map(obj => {
        list.push({ text: obj.cdNm, value: obj.cd });
      });
      return list;
    },
    getAccTypeDropDown() {
      //*실적누계 셀렉트 데이터
      let list = [{ text: '선택', value: '' }]; //*선택
      common.getCodeList('KPI001').map(obj => {
        list.push({ text: obj.cdNm, value: obj.cd });
      });
      return list;
    },
    getUnitTypeDropDown() {
      //*단위 셀렉트 데이터
      let list = [{ text: '선택', value: '' }]; //*선택
      common.getCodeList('KPI201').map(obj => {
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
  },
  watch: {
    getSelectedManager(data) {
      this.searchUserNm = '';
      this.searchUserNm = data.userName;
    },
    getSelectedDept: function(value) {
      this.searchDeptNm = '';
      if (!common.isEmpty(value)) {
        this.searchDeptNm = value.deptNm;
      }
    },
  },
  mounted() {
    this.initColumns();
    //this[kpiTargetEstablishmentTypes.actions.FETCH_CHILD_KPI_POOL_LIST]({}); //*하위KPI리스트 조회
  },
  methods: {
    initColumns() {
      this.columns = [
        { field: 'kpiId', title: '', width: '0px' },
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //*KPI명
          width: '300px',
          className: 'left',
        },
        {
          field: 'kpiUnitNm',
          title: this.$t('NLS0000063'), //*단위
          width: '80px',
          className: 'center',
        },
        {
          field: 'kpiAchTypeNm',
          title: this.$t('NLS0000061'), //*실적 달성 유형
          width: '130px',
          className: 'center',
        },
        {
          field: 'kpiPerTypeNm',
          title: this.$t('NLS0000059'), //*실적 집계 방식
          width: '110px',
          className: 'center',
        },
        {
          field: 'kpiAccTypeNm',
          title: this.$t('NLS0000060'), //*실적 누계 방식
          width: '110px',
          className: 'center',
        },
        {
          field: 'kpiCycleNm',
          title: this.$t('NLS0000057'), //*측정주기
          width: '90px',
          className: 'center',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //*담당부서
          width: '160px',
          className: 'center',
        },
        {
          field: 'userNm',
          title: this.$t('NLS0000065'), //*담당자
          width: '130px',
          className: 'center',
        },
      ];
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
      this.selectedRow = row;
    },
    addKpiData() {
      common.confirm('NLS0000005', this.saveKpiData);
    },
    async saveKpiData() {
      //* 하위KPI 추가

      const selDefData = this[
        kpiTargetEstablishmentTypes.getters.GET_KPI_DEF_GROUP_DATA
      ];
      let index = 0;
      let indexPer = 0;
      //let kpiNm = '';

      for (let item of this.selectedRow) {
        if (item.kpiPerType === this.TYPE_AUTO_SUM) {
          indexPer = 1;
          break;
        }
        if (
          item.kpiUnit !==
          this[kpiTargetEstablishmentTypes.getters.GET_SELECTED_UNIT_DATA]
        ) {
          index = 1;
        }
        if (selDefData.kpiAchType !== item.kpiAchType) {
          index = 1;
        }
        if (selDefData.kpiAccType !== item.kpiAccType) {
          index = 1;
        }
        if (selDefData.kpiCycle !== item.kpiCycle) {
          index = 1;
        }
        //kpiNm = item.kpiNm;
        if (index) break;
      }
      if (indexPer) {
        common.alert('warning', 'NLS0000951'); //*자동합산 속성을 선택할수없습니다.
        return;
      }
      if (index) {
        common.alert('warning', 'NLS0000952'); //*속성이 불일치 합니다.
        return;
      }

      //* 선택한 KPI리스트 세팅
      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_KPI_POOL_LIST](
        this.getSelectedRow,
      );
      this.closePopup();
    },
    searhKpiList() {
      const param = {
        searchStdYn: this.stdRadio === 'all' ? '' : this.stdRadio,
        searchUserNm: this.searchUserNm,
        searchKpiNm: this.searchKpiNm,
        searchDeptNm: this.searchDeptNm,
        searchPerType: this.searchPerType.value,
        searchAccType: this.searchAccType.value,
        searchUnitType: this.searchUnitType.value,
        limit: 10,
        offset: 0,
      };
      this[kpiTargetEstablishmentTypes.actions.FETCH_CHILD_KPI_POOL_LIST](
        param,
      );
      this.selectedRow = [];
    },
    async onPageChange(skip, take) {
      const param = {
        searchStdYn: this.stdRadio === 'all' ? '' : this.stdRadio,
        searchUserNm: this.searchUserNm,
        searchKpiNm: this.searchKpiNm,
        searchDeptNm: this.searchDeptNm,
        searchPerType: this.searchPerType.value,
        searchAccType: this.searchAccType.value,
        searchUnitType: this.searchUnitType.value,
        limit: take,
        offset: skip,
      };
      this[kpiTargetEstablishmentTypes.actions.FETCH_CHILD_KPI_POOL_LIST](
        param,
      );
      this.skip = skip;
      this.take = take;
      this.selectedRow = [];
    },
    searchDept() {
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.searchDeptNm,
      });
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    searchUser() {
      const param = {
        srchUserNm: this.searchUserNm,
      };
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
    },
    resetData() {
      this.selectedRow = [];
      this.searchUserNm = '';
      this.searchKpiNm = '';
      this.searchDeptNm = '';
      this.searchPerType = { text: this.$t('NLS0000237'), value: '' }; //*선택
      this.searchAccType = { text: this.$t('NLS0000237'), value: '' }; //*선택
      this.searchUnitType = { text: this.$t('NLS0000237'), value: '' }; //*선택
    },
    closePopup() {
      this.resetData();
      this.$emit('input', false);
    },
  },
};
</script>
