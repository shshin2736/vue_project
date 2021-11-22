<template>
  <com-overlay
    v-model="value"
    :draggable="true"
    custom-class="max-1000 layermax"
  >
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ getChartData.name }}</p>
              <button type="button" class="layer-close" @click="onClose">
                close {{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <!-- 조회기간 -->
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
                  <!-- 조회 -->
                  <span>{{ $t('NLS0000066') }}</span>
                </com-button>
              </div>
            </div>
            <div class="hms-graph">
              <com-am-chart
                className="graphwrap-70"
                :data="chartList"
                :options="chartOptions"
                :type="type"
                height="730"
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
import { kpiGraphStore, commonStore } from '@/mixins';
import { timezone } from '@/utils';
import * as kpiGraphTypes from '@/store/modules/businessExecution/kpiGraph/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'ChartDetailPopup',
  mixins: [kpiGraphStore, commonStore],
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
  data() {
    return {
      //* XY 차트 설정
      chartOptions: {
        titleX: '', //* X축 제목
        titleY: ' ', //* Y축 제목
        minGridDistance: 40, //* x축 최소 간격
        category: 'baseYyyymm', //* x축 카테고리
        scrollBarX: false, //* X축 스크롤 on/off
        scrollBarY: false, //* Y축 스크롤 on/off
        legend: true, //* 범례 on/off
        cursor: true, //* 커서 on/off
        stacked: false, //* 스택형 막대 그래프 on/off
        columnSeries: [],
        lineSeries: [],
        pointerOrientation: 'left',
      },
      chartList: [],
      baseYear1: {
        text: new Date().getFullYear().toString(),
        value: new Date().getFullYear().toString(),
      },
      baseMonth1: { text: '01', value: '01' },
      baseYear2: {
        text: new Date().getFullYear().toString(),
        value: new Date().getFullYear().toString(),
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
      type: 'XY',
    };
  },
  computed: {
    getYearList() {
      const list = this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        return { text: obj.year, value: obj.year };
      });
      return list;
    },
    getChartDataList() {
      return this[kpiGraphTypes.getters.GET_CHART_DATA];
    },
    getChartData() {
      return this[kpiGraphTypes.getters.GET_GRP_DATA];
    },
  },
  watch: {
    getChartDataList: function(data) {
      if (data.length > 0) {
        const baseYyyymm = data[0].baseYyyymm.filter(item => {
          return 0 < item.substring(4, 6) && item.substring(4, 6) < 13;
        });
        //* 10 : line, 20: bar, 30: stack colum
        const chartType = this.getChartData.type;
        const dataList = [];
        //* 차트 옵션 초기화
        this.chartOptions.lineSeries = [];
        this.chartOptions.columnSeries = [];
        this.chartOptions.stacked = false;

        for (const i of data) {
          const list = JSON.parse(i.result.value);
          dataList.push(...list);
          const option = {
            valueY: `chart_${i.kpiId}`,
            name: i.kpiNm,
            tooltip: true,
          };
          if (i.axis2Yn === 'Y') {
            option.multiY = true;
            option.valueAxes = true;
          }
          if (chartType === '10' || chartType === '40') {
            option.strokeWidth = 3;
            this.chartOptions.lineSeries.push(option);
          } else if (chartType === '20') {
            this.chartOptions.columnSeries.push(option);
          } else {
            this.chartOptions.columnSeries.push(option);
            this.chartOptions.stacked = true;
          }
        }
        const result = baseYyyymm.reduce((acc, cur) => {
          const obj = {};
          dataList.forEach(item => {
            if (cur === item.base_yyyymm) {
              obj.baseYyyymm = timezone.convertToDateFormat(
                timezone.convertToISO8601String(item.base_yyyymm),
                'YYYY-MM',
              );
              item.result_ms = item.result_ms ? item.result_ms : '';
              obj[`chart_${item.kpi_id}`] = item.result_ms;
              obj[item.kpi_id] = item.kpi_nm;
            }
          });
          acc.push(obj);
          return acc;
        }, []);
        this.chartList = result;
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    onClose() {
      this.$emit('input', false);
      this.init();
    },
    async getTargetMonthList() {
      const searchFromYyyymm = this.baseYear1.value + this.baseMonth1.value;
      const searchToYyyymm = this.baseYear2.value + this.baseMonth2.value;
      if (searchFromYyyymm > searchToYyyymm) {
        common.alert('warning', 'NLS0000634'); //시작일이 종료일 보다 클 수 없습니다.
        return false;
      }
      let param = {
        groupId: this.getChartData.groupId,
        searchFromYyyymm: searchFromYyyymm,
        searchToYyyymm: searchToYyyymm,
        chart: 'Y',
      };
      this[kpiGraphTypes.actions.FETCH_KPI_MONTH_LIST](param);
    },
    init() {
      this.baseYear1 = {
        text: new Date().getFullYear().toString(),
        value: new Date().getFullYear().toString(),
      };
      this.baseMonth1 = { text: '01', value: '01' };
      this.baseYear2 = {
        text: new Date().getFullYear().toString(),
        value: new Date().getFullYear().toString(),
      };
      this.baseMonth2 = { text: '12', value: '12' };
    },
  },
};
</script>
