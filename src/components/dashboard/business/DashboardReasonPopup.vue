<template>
  <!-- 단순 하위 kPI 보기 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000470') }}</p>
              <!--업무 관리-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer-pop__subtitle">
              <p>{{ $t('NLS0001271') }} : {{ date }}</p>
              <!--일자 : -->
            </div>
            <div class="hms-grid">
              <com-native-grid
                :data="getKpiReasonList"
                :columns="columns"
                @btnclick="openPopupFunc"
              ></com-native-grid>
            </div>
          </div>
        </div>
      </div>
      <a ref="links"></a>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
// import { common } from '@/utils';
import {
  kpiTargetEstablishmentStore,
  commonStore,
  dashboardStore,
} from '@/mixins';
// import * as commonTypes from '@/store/modules/common/types';
import * as dashboardTypes from '@/store/modules/dashboard/types';
// import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderHtmlCell from '@/components/common/business/HeaderHtmlCell';
export default {
  name: 'KpiSimpleChildPopup',
  components: {
    ComNativeGrid,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore, commonStore, dashboardStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      date: '',
    };
  },
  computed: {
    getKpiReasonList() {
      const data = this[dashboardTypes.getters.GET_DSBD_KPI_REASON_LIST];
      const res = data.map(item => {
        item.reasonGoal = '';
        return item;
      });
      return res;
    },
    getKpiDate() {
      return this[dashboardTypes.getters.GET_DSBD_DATE_PARAM];
    },
  },
  watch: {
    getKpiDate: function(value) {
      this.date =
        value !== undefined && value.reasonDate !== undefined
          ? value.reasonDate
          : `${value.weekFromDateForm} ~ ${value.weekToDateForm}`;
    },
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: 'KPI명', //*KPI명
          width: '280px',
          className: 'left td-ellipsis',
        },
        {
          field: 'deptNm',
          title: '담당부서', //*담당부서
          width: '125px',
          className: 'left td-ellipsis',
        },
        {
          field: 'userName',
          title: '담당자', //*담당자
          width: '125px',
          className: 'left td-ellipsis',
        },
        {
          field: 'kpiUnitNm',
          title: '단위', //*단위
          width: '73px',
          className: 'center td-ellipsis',
        },
        {
          field: 'reasonGoal',
          width: '77px',
          title: this.$t('NLS0000819'), //* 성공/부진사유분석 및 대책->활동 및 계획
          className: 'counterplan-btn',
          format: 'button',
          cell: FunctionCell,
          headerCell: HeaderHtmlCell,
        },
      ];
    },
    openPopupFunc(dataItem) {
      const links = this.$refs.links;
      links.setAttribute(
        'href',
        `/redirectForm?auth=${this.$route.params.auth}&path=KpiPerformanceListPage&baseYyyyMm=${dataItem.baseYyyymm}&kpiId=${dataItem.kpiId}`,
      );
      links.setAttribute('target', '_blank');
      links.click();
    },
    closePopup() {
      this.date = '';
      this.$emit('input', false);
    },
  },
};
</script>
