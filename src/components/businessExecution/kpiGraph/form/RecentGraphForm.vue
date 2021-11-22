<template>
  <div class="hms-grid type2">
    <!-- 최근 업데이트 그래프 -->
    <p class="title">{{ $t('NLS0000484') }}</p>
    <br />
    <span @mouseenter="mouseenter" @mouseleave="mouseleave">
      <div class="hms-graph" v-for="item in chartData" :key="item.groupNm">
        <p class="hms-graph-title">
          {{ item.groupNm }}
          <span class="hms-graph-date">
            {{ item.updateDate }}
          </span>
        </p>
        <com-am-chart
          :data="item.chartList"
          :options="item.chartOptions"
          type="XY"
          height="300"
          @chartData="chartDataHandler"
        ></com-am-chart>
      </div>
    </span>
  </div>
</template>
<script>
import ComAmChart from '@/components/common/global/ComAmChart';
import { kpiGraphStore, commonStore } from '@/mixins';
import { timezone } from '@/utils';
import * as kpiGraphTypes from '@/store/modules/businessExecution/kpiGraph/types';
export default {
  name: 'RecentGraphFrom',
  mixins: [kpiGraphStore, commonStore],
  components: {
    ComAmChart,
  },
  data() {
    return {
      chartEl: [],
      chartData: [],
      chartList: [],
    };
  },
  computed: {
    getRecentList() {
      const data = this[kpiGraphTypes.getters.GET_RECENT_LIST];
      return data;
    },
  },
  watch: {
    // chartEl: function(value) {
    //   if (value.length > 1) {
    //     value.forEach((el1, i) => {
    //       el1.cursor.events.on('cursorpositionchanged', ev => {
    //         ev.target.triggerMove(ev.target.point, 'soft');
    //         value.forEach((el2, j) => {
    //           if (i !== j) el2.cursor.triggerMove(ev.target.point, false);
    //         });
    //       });
    //     });
    //   }
    // },
    getRecentList: async function(value) {
      if (value.length > 0) {
        const res = [];
        this.chartEl = [];
        const items = value.reduce((acc, cur) => {
          const arr = [];
          const obj = { ...cur };
          let flag = true;

          if (acc.length > 0)
            acc.forEach(item => {
              if (item[0].groupId === obj.groupId) {
                item.push(obj);
                flag = false;
              }
            });
          if (flag) {
            arr.push(obj);
            acc.push(arr);
          }
          return acc;
        }, []);
        for (const i of items) {
          const data = await this.makeChart(i);
          if (data != undefined) {
            res.push(data);
          }
        }
        this.chartData = res;
      }
    },
  },
  mounted() {
    this.getRecentList;
  },
  methods: {
    mouseenter() {
      this.chartEl.forEach(el1 => {
        el1.cursor.disabled = false;
        el1.series.values[
          el1.series.values.length - 1
        ].tooltip.disabled = false;
      });
    },
    mouseleave() {
      this.chartEl.forEach(el1 => {
        el1.cursor.disabled = true;
        el1.series.values[el1.series.values.length - 1].tooltip.disabled = true;
      });
    },
    chartDataHandler(chart) {
      this.chartEl.push(chart);
    },
    async makeChart(grpData) {
      const baseChartType = grpData[0].baseChartType;
      const updateDate = timezone.convertToClientTimeZone(
        grpData[0].orderDate,
        'YYYY-MM-DD',
      );
      const groupNm = grpData[0].groupNm;
      const baseYyyymm = grpData[0].baseYyyymm;
      baseYyyymm.sort((a, b) => {
        return a - b;
      });
      const dataList = [];
      const chartOptions = {
        titleX: '', //* X축 제목
        titleY: '', //* Y축 제목
        minGridDistance: 40, //* x축 최소 간격
        category: 'baseYyyymm', //* x축 카테고리
        scrollBarX: false, //* X축 스크롤 on/off
        scrollBarY: false, //* Y축 스크롤 on/off
        legend: true, //* 범례 on/off
        cursor: true, //* 커서 on/off
        stacked: false, //* 스택형 막대 그래프 on/off
        columnSeries: [],
        lineSeries: [],
      };

      for (const i of grpData) {
        const list = JSON.parse(i.result.value);
        dataList.push(...list);
        i.kpiNm = i.kpiNm === null ? '' : i.kpiNm;
        const option = {
          valueY: `chart_${i.kpiId}`,
          name: i.kpiNm,
          tooltip: true,
        };
        if (i.axis2Yn === 'Y') {
          option.multiY = true;
          option.valueAxes = true;
        } //* 10 : line, 20: bar, 30: stack colum, 40: multiY
        if (baseChartType === '10' || baseChartType === '40') {
          option.strokeWidth = 3;
          chartOptions.lineSeries.push(option);
        } else if (baseChartType === '20') {
          chartOptions.columnSeries.push(option);
        } else if (baseChartType === '30') {
          chartOptions.columnSeries.push(option);
          chartOptions.stacked = true;
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
            obj[`chart_${item.kpi_id}`] = item.result_ms ? item.result_ms : '';
            obj[item.kpi_id] = item.kpi_nm;
          }
        });
        acc.push(obj);
        return acc;
      }, []);
      return {
        chartList: result,
        chartOptions: chartOptions,
        groupNm: groupNm,
        updateDate: updateDate,
      };
    },
  },
};
</script>
