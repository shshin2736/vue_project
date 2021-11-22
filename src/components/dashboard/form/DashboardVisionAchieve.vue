<template>
  <!--비전 달성도-->
  <dashboard-box
    :title="$t('NLS0000473')"
    mainClass="dashboard-vision"
    :contentsClassList="contentsClassList"
    :settingBtn="true"
    :sliderSingle="slider"
    :sliderOption="sliderOption"
    :progress="progress"
    progressHeight="206px"
    :sliderArrowsSize="['big']"
    @setting="onSetting"
  >
    <template v-slot:slot0>
      <span v-for="(item, i) in chartData" :key="i">
        <div class="vision__graph" v-if="item.chartList">
          <p class="title">{{ item.groupNm }}</p>
          <com-am-chart
            :data="item.chartList"
            :options="item.chartOptions"
            type="XY"
            width="100%"
            height="300"
          ></com-am-chart>
        </div>
      </span>
    </template>
  </dashboard-box>
</template>

<script>
import ComAmChart from '@/components/common/global/ComAmChart';
import DashboardBox from '@/components/dashboard/business/DashboardBox';
import { timezone } from '@/utils';
import { commonStore, dashboardStore } from '@/mixins';
import * as dashboardTypes from '@/store/modules/dashboard/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'VisionAchieve',
  components: {
    DashboardBox,
    ComAmChart,
  },
  mixins: [commonStore, dashboardStore],
  data() {
    return {
      contentsClassList: ['vision__graphbox'],
      sliderOption: [
        {
          arrows: true,
          prevArrowClass: 'dashboard-bigprev',
          nextArrowClass: 'dashboard-bignext',
          edgeFriction: 0.35,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      ],
      chartData: [[], []],
      chartList: [],
      progress: false,
      slider: false,
    };
  },
  computed: {
    getChartList() {
      return this[commonTypes.getters.GET_COM_CHART_KPI_LIST];
    },
    getSelectedChartGrp() {
      return this[commonTypes.getters.GET_SELECTED_CHART_GRP_LIST];
    },
    getDsbChartGrpList() {
      return this[dashboardTypes.getters.GET_DSB_CHART_GRP_LIST];
    },
  },
  watch: {
    getDsbChartGrpList: function() {
      this.getKpiChartList();
    },
    // getSelectedChartGrp: function(data) {
    //   if (common.isEmpty(data)) {
    //     this.chartData = [[], []];
    //   }
    //   this.updateChartGrpFn(data);
    // },
    getChartList: async function(value) {
      if (value.length > 0) {
        const res = [];
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
            i[0].createDate = await timezone.convertToClientTimeZone(
              i[0].createDate,
            );
            res.unshift(data);
          }
        }
        this.chartData = res;
      } else {
        this.chartData = [];
      }
      if (this.chartData.length > 1) this.slider = true;
      else this.slider = false;
    },
  },
  mounted() {
    this.getKpiChartList();
  },
  methods: {
    onSetting() {
      this[commonTypes.actions.FETCH_COM_KPI_CHART_GRP_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_KPI_CHART_GRP_MULTI_POP](true);
      //this[commonTypes.actions.INIT_SELECTED_CHART_GRP_LIST]([]);
    },
    getKpiChartList() {
      let param = {
        searchFromYyyymm: new Date().getFullYear().toString() + '01',
        searchToYyyymm: new Date().getFullYear().toString() + '12',
      };
      this[commonTypes.actions.FETCH_COM_CHART_KPI_LIST](param);
    },
    // updateChartGrpFn(data) {
    //   let paramList = data.map(el => {
    //     let obj = {};
    //     obj.groupId = el.groupId;
    //     obj.dsbYn = el.selected ? 'Y' : 'N';
    //     return obj;
    //   });
    //   this[dashboardTypes.actions.UPDATE_DASHBOARD_CHART_GRP]({
    //     list: paramList,
    //   });
    //   this.getKpiChartList();
    // },
    // chartDataHandler(chart) {
    //   this.chartEl.push(chart);
    // },
    async makeChart(grpData) {
      //* 10 : line, 20: bar, 30: stack colum
      const baseChartType = grpData[0].baseChartType;
      const createDate = grpData[0].createDate;
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
        legend: false, //* 범례 on/off
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
        if (baseChartType === '10') {
          option.strokeWidth = 3;
          chartOptions.lineSeries.push(option);
        } else if (baseChartType === '20') {
          chartOptions.columnSeries.push(option);
        } else {
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
              'MM',
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
        createDate: createDate,
      };
    },
  },
};
</script>
