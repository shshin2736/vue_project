<template>
  <!-- 분석 팦업 to-do 퍼블-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal">
            <div class="layer-pop__title">
              <p>{{ kpiNm }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <p class="search__form__title">
                  {{ $t('NLS0000212') }}
                </p>
                <div class="search__bar">
                  <com-dropdowns
                    :data="getYearList"
                    rules="required"
                    textfield="text"
                    valuefield="value"
                    class="hms-dropdown type1"
                    v-model="baseYear1"
                  ></com-dropdowns>
                  <com-dropdowns
                    :data="baseMonthOptions"
                    rules="required"
                    textfield="text"
                    valuefield="value"
                    class="hms-dropdown type1"
                    v-model="baseMonth1"
                  ></com-dropdowns>
                  <em class="date-divide">~</em>
                  <com-dropdowns
                    :data="getYearList"
                    rules="required"
                    textfield="text"
                    valuefield="value"
                    class="hms-dropdown type1"
                    v-model="baseYear2"
                  ></com-dropdowns>
                  <com-dropdowns
                    :data="baseMonthOptions"
                    rules="required"
                    textfield="text"
                    valuefield="value"
                    class="hms-dropdown type1"
                    v-model="baseMonth2"
                  ></com-dropdowns>
                </div>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="getTargetMonthList"
                >
                  <span>{{ $t('NLS0000066') }}</span>
                </com-button>
              </div>
            </div>
            <div class="hms-graph">
              <com-am-chart
                :data="chartList"
                :options="chartOptions"
                :time="0.5"
                type="XY"
                width="800"
                height="400"
              ></com-am-chart>
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
import ComAmChart from '@/components/common/global/ComAmChart';
import { timezone, common } from '@/utils';
import { kpiPerformanceStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';

export default {
  name: 'KpiAnalysisPopup',
  mixins: [kpiPerformanceStore, commonStore],
  components: {
    ComAmChart,
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
  data: function() {
    return {
      kpiNm: '',
      kpiId: '',
      baseYear1: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      baseMonth1: { text: '01', value: '01' },
      baseYear2: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      baseMonth2: { text: '12', value: '12' },
      baseMonthOptions: [
        { text: '01', value: '01' },
        { text: '02', value: '02' },
        { text: '03', value: '03' },
        { text: '04', value: '04' },
        { text: '05', value: '05' },
        { text: '06', value: '06' },
        { text: '07', value: '07' },
        { text: '08', value: '08' },
        { text: '09', value: '09' },
        { text: '10', value: '10' },
        { text: '11', value: '11' },
        { text: '12', value: '12' },
      ],
      //* XY 차트 설정
      chartOptions: {
        titleX: '', //* X축 제목
        titleY: ' ', //* Y축 제목
        minGridDistance: 40, //* x축 최소 간격
        category: 'yearDate', //* x축 카테고리
        scrollBarX: false, //* X축 스크롤 on/off
        scrollBarY: false, //* Y축 스크롤 on/off
        legend: true, //* 범례 on/off
        cursor: true, //* 커서 on/off
        //* 막대형 그래프 내용 설정
        columnSeries: [],
        //* 라인형 그래프 내용 설정
        lineSeries: [],
        contentAlign: 'right',
      },
      chartList: [],
      labels: '',
    };
  },
  computed: {
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getChartDataList() {
      return this[kpiPerformanceTypes.getters.GET_KPI_TARGET_MONTH_LIST];
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedkpiInfo() {
      return this[kpiPerformanceTypes.getters.GET_SELECTED_ANALY_KPI_INFO_DATA];
    },
    getLatestResult() {
      return this[kpiPerformanceTypes.getters.GET_KPI_LATEST_RESULT];
    },
  },
  watch: {
    getChartDataList: function(data) {
      if (data !== undefined && data.length > 0) {
        let list = data.map(el => {
          let obj = { ...el };
          obj.yearDate = timezone.convertToDateFormat(
            timezone.convertToISO8601String(obj.yearDate),
            'YYYY-MM',
          );
          obj.resultMs = !common.isEmpty(obj.resultMs)
            ? common.getDemicalPoint(obj.resultMs, obj.pointCnt || 0)
            : 0;
          obj.targetOMs = !common.isEmpty(obj.targetOMs)
            ? common.getDemicalPoint(obj.targetOMs, obj.pointCnt || 0)
            : 0;
          obj.targetMMs = !common.isEmpty(obj.targetMMs)
            ? common.getDemicalPoint(obj.targetMMs, obj.pointCnt || 0)
            : 0;
          obj.resultLyMs = !common.isEmpty(obj.resultLyMs)
            ? common.getDemicalPoint(obj.resultLyMs, obj.pointCnt || 0)
            : 0;
          return obj;
        });
        this.chartList = list;

        const result = this.getLatestResult;
        if (!result || result.length === 0) {
          this.labels = this.labels = `${this.$t('NLS0001415')}: 0, ${this.$t(
            'NLS0000452',
          )}: 0`;
        } else {
          this.labels = `${this.$t('NLS0001415')}: ${common.numberWithCommas(
            result[0].resultMs.toFixed(result[0].pointCnt),
          )}, ${this.$t('NLS0000452')}: ${common.numberWithCommas(
            result[0].resultTs.toFixed(result[0].pointCnt),
          )}`;
        }
        const labels = this.labels;
        this.chartOptions = {
          ...this.chartOptions,
          labels,
        };
      }
    },
    getSelectedYear: function(data) {
      this.baseYear1 = { text: data, value: data };
      this.baseYear2 = { text: data, value: data };
    },
    getSelectedkpiInfo: function(data) {
      this.kpiNm = data.kpiNm;
      this.kpiId = data.kpiId;
    },
  },
  mounted() {
    this.initColumns();
    let year = this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    this.baseYear1 = { text: year, value: year };
    this.baseYear2 = { text: year, value: year };
  },
  methods: {
    initColumns() {
      this.chartOptions.columnSeries = [
        { valueY: 'resultMs', name: this.$t('NLS0000313'), tooltip: true }, //*실적
      ];
      this.chartOptions.lineSeries = [
        {
          valueY: 'targetOMs',
          name: this.$t('NLS0000310'), //*목표
          tooltip: true,
          strokeWidth: 3,
        },
        {
          valueY: 'targetMMs',
          name: this.$t('NLS0000391'), //*수정목표
          tooltip: true,
          strokeWidth: 3,
        },
        {
          valueY: 'resultLyMs',
          name: this.$t('NLS0000308'), //*전년실적
          tooltip: true,
          strokeWidth: 3,
        },
      ];
    },
    getTargetMonthList() {
      if (this.checkDate()) {
        let param = {
          kpiId: this.kpiId,
          searchFromYyyymm: this.baseYear1.value + this.baseMonth1.value,
          searchToYyyymm: this.baseY3ear2.value + this.baseMonth2.value,
        };
        this[kpiPerformanceTypes.actions.INIT_KPI_TARGET_MONTH_LIST]([]);
        this[kpiPerformanceTypes.actions.FETCH_KPI_TARGET_MONTH_LIST](param);
        this[kpiPerformanceTypes.actions.FETCH_KPI_LATEST_RESULT](param);
      }
    },
    checkDate() {
      let check = true;
      let startDate = timezone.convertToClientTimeZone(
        this.baseYear1.value + this.baseMonth1.value,
      );
      let endDate = timezone.convertToClientTimeZone(
        this.baseYear2.value + this.baseMonth2.value,
      );
      if (startDate > endDate) {
        check = false;
        common.alert('warning', 'NLS0000634');
      }
      return check;
    },
    closePopup() {
      this.$emit('input', false);
      this.baseMonth1 = { text: '01', value: '01' };
      this.baseMonth2 = { text: '12', value: '12' };
    },
  },
};
</script>
