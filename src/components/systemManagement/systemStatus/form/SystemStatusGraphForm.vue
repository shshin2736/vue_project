<template>
  <div class="hms-graph">
    <com-am-chart
      :data="getChartData"
      :options="getChartOptions"
      :type="types"
      :height="getChartHeight"
    ></com-am-chart>
  </div>
</template>

<script>
import ComAmChart from '@/components/common/global/ComAmChart';
import { systemStatusStore } from '@/mixins';
import * as systemStatusTypes from '@/store/modules/systemManagement/systemStatus/types';

export default {
  name: 'SystemStatusGraphForm',
  mixins: [systemStatusStore],
  components: {
    ComAmChart,
  },
  props: {
    tab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      types: 'XY',
    };
  },
  computed: {
    getChartData(state) {
      return state.tab === 'systemAvg'
        ? this[systemStatusTypes.getters.GET_SYS_CON_AVG_CHART]
        : state.tab === 'moduleUse'
        ? this[systemStatusTypes.getters.GET_MODULE_RATE_CHART]
        : state.tab === 'efficiency'
        ? this[systemStatusTypes.getters.GET_IMPL_RATE_CHART]
        : this[systemStatusTypes.getters.GET_DOWNLOAD_LOG_CHART];
    },
    getChartHeight(state) {
      if (state.tab === 'download') {
        return `${state.getChartData.length * 20 + 140}`;
      } else {
        return '250';
      }
    },
    getChartOptions(state) {
      const options =
        state.tab === 'systemAvg'
          ? {
              titleX: '', //* X축 제목
              titleY: '', //* Y축 제목
              minGridDistance: 40, //* x축 최소 간격
              category: 'date', //* x축 카테고리
              scrollBarX: false, //* X축 스크롤 on/off
              scrollBarY: false, //* Y축 스크롤 on/off
              legend: true, //* 범례 on/off
              cursor: true, //* 커서 on/off
              stacked: false, //* 스택형 막대 그래프 on/off
              //* 라인형 그래프 내용 설정
              lineSeries: [
                {
                  valueY: 'conCnt',
                  name: this.$t('NLS0000435'),
                  tooltip: true,
                  strokeWidth: 3,
                },
                {
                  valueY: 'actCnt',
                  name: this.$t('NLS0000436'),
                  tooltip: true,
                  strokeWidth: 3,
                },
              ],
              columnSeries: [
                {
                  valueY: 'conRate',
                  name: this.$t('NLS0000437'),
                  tooltip: true,
                  strokeWidth: 3,
                  multiY: true,
                  multiyFormat: '%',
                  valueAxes: true,
                  min: 0,
                  max: 100,
                },
              ],
            }
          : state.tab === 'moduleUse'
          ? {
              category: 'valueX', //* x축 카테고리
              valueY: 'valueY',
              cursor: true, //* 커서 on/off
              fontSize: '10px',
            }
          : state.tab === 'efficiency'
          ? {
              titleX: '', //* X축 제목
              titleY: '', //* Y축 제목
              minGridDistance: 40, //* x축 최소 간격
              category: 'date', //* x축 카테고리
              scrollBarX: false, //* X축 스크롤 on/off
              scrollBarY: false, //* Y축 스크롤 on/off
              legend: true, //* 범례 on/off
              cursor: true, //* 커서 on/off
              stacked: false, //* 스택형 막대 그래프 on/off
              //* 라인형 그래프 내용 설정
              lineSeries: [
                {
                  valueY: 'create',
                  name: this.$t('NLS0001323'),
                  tooltip: true,
                  strokeWidth: 3,
                },
                {
                  valueY: 'ing',
                  name: this.$t('NLS0001324'),
                  tooltip: true,
                  strokeWidth: 3,
                },
                {
                  valueY: 'comp',
                  name: this.$t('NLS0001325'),
                  tooltip: true,
                  strokeWidth: 3,
                },
              ],
              columnSeries: [
                {
                  valueY: 'efficiency',
                  name: this.$t('NLS0000432'),
                  tooltip: true,
                  strokeWidth: 3,
                  multiY: true,
                  multiyFormat: '%',
                  valueAxes: true,
                  min: 0,
                  max: 220,
                },
              ],
            }
          : {
              valueX: 'totalCnt',
              valueY: 'label',
            };
      state.types =
        state.tab === 'systemAvg'
          ? 'XY'
          : state.tab === 'moduleUse'
          ? 'DATASORT'
          : state.tab === 'efficiency'
          ? 'XY'
          : 'SORTBAR';
      return options;
    },
  },
};
</script>
