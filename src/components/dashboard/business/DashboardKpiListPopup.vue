<template>
  <!-- 전체 KPI Pool 목록 (목표추가) 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal3">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000477') }}</p>
              <!--KPI 목록-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <p class="search__form__title">
                  {{ $t('NLS0000160') }}
                </p>
                <!--KPI명 -> KPI-->
                <span class="input__box type-wide type-nobtn">
                  <input
                    type="text"
                    v-model="searchKpiNm"
                    @keyup.enter="searchKpiList"
                  />
                </span>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="searchKpiList"
                >
                  <span>{{ $t('NLS0000253') }}</span
                  ><!--검색-->
                </com-button>
              </div>
            </div>
            <div class="hms-grid type-nomargin kpi_multi">
              <com-native-grid
                :data="getKpiList"
                :columns="columns"
                height="438"
                @onCheck="clickCheckBox"
                :sortable="true"
                :sort="sort"
              ></com-native-grid>
            </div>
            <div class="layer__btn-box">
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="addKpiToDashboard"
              >
                <span>{{ $t('NLS0000074') }}</span
                ><!--저장-->
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
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common, timezone } from '@/utils';
import { kpiTargetEstablishmentStore, dashboardStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as dashboardTypes from '@/store/modules/dashboard/types';
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
  name: 'DashboardKpiListPopup',
  mixins: [kpiTargetEstablishmentStore, dashboardStore],
  components: {
    ComNativeGrid,
    ComButton,
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
      columns: [],
      year: timezone.getClientDate('YYYY'),
      month: timezone.getClientDate('MM'),
      searchKpiNm: '',
      selectedRow: [],
      sort: [{ field: 'kpiNm', dir: 'asc' }],
    };
  },
  computed: {
    getKpiList() {
      return this[dashboardTypes.getters.GET_DASHBOARD_KPI_LIST];
    },
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'dashboardYn',
          title: ' ',
          width: '50px',
          className: 'center',
          format: 'check',
          cell: FunctionCell,
        },
        {
          field: 'kpiNm',
          title: this.$t('NLS0000160'), //*KPI명 - > KPI
          width: '400px',
          className: 'left',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //*담당부서
          className: 'center',
        },
        {
          field: 'userName',
          title: this.$t('NLS0000065'), //*담당자
          className: 'center',
        },
        // { field: 'kpiId', title: '', width: '0px' },
        // { filed: 'tid', title: '', width: '0px' },
        // { filed: 'sortNo', title: '', width: '0px' },
      ];
    },
    clickCheckBox(item, checked) {
      const index = this.selectedRow.findIndex(el => el.tid === item.tid);
      item.dashboardYn = checked ? 'Y' : 'N';
      if (index === -1) {
        this.selectedRow.push(item);
      } else {
        this.selectedRow[index] = item;
      }
    },
    searchKpiList() {
      //* KPI리스트 조회
      let param = {
        searchKpiNm: this.searchKpiNm,
        //viewDashBoadKpi: 'Y',
        baseYyyy: this.year,
        baseYyyyMm: this.year + this.month,
      };
      this[dashboardTypes.actions.FETCH_DASHBOARD_KPI_LIST](param);
    },
    addKpiToDashboard() {
      //* DASHBOARD KPI목록에 추가

      common.confirm('NLS0000005', async () => {
        // let checkedData = document.querySelectorAll(
        //   '.kpi_multi [type=checkbox]:checked',
        // );
        // if (checkedData.length === 0) {
        //   common.alert('warning', 'NLS0000919'); //*KPI를 선택해 주십시오.
        //   return false;
        // }

        let getSelectedRow = this.selectedRow.map(el => {
          let obj = {};
          obj.baseYyyy = this.year;
          obj.kpiId = el.kpiId;
          obj.tId = el.tid;
          obj.sortNo = el.sortNo;
          obj.dashboardYn = el.dashboardYn;
          return obj;
        });
        let param = {
          baseYyyy: this.year,
          baseYyyyMm: this.year + this.month,
          list: getSelectedRow,
          viewDashBoad: 'Y',
        };
        await this[kpiTargetEstablishmentTypes.actions.UPDATE_KPI_TREE_LIST](
          param,
        );
        this[dashboardTypes.actions.FETCH_KPI_CURRENT_LIST]({}); //*KPI체계도 조회
        this.closePopup();
      });
    },
    closePopup() {
      this.searchKpiNm = '';
      this.selectedRow = [];
      this.$emit('input', false);
    },
  },
};
</script>
