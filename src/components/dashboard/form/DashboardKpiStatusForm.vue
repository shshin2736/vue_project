<template>
  <!--KPI 현황-->
  <dashboard-box
    :title="$t('NLS0000467')"
    mainClass="dashboard__kpinow"
    :contentsClassList="contentsClassList"
    :settingBtn="true"
    :sliderAll="sliderAll"
    :totalPage="totalPageCnt - 1"
    :sliderOption="sliderOption"
    :progress="progress"
    progressHeight="206px"
    @setting="onSetting"
  >
    <template v-slot:slot0>
      <div v-for="(items, i) in kpiStatusPagingList" :key="i">
        <div class="hms-dashboard__gridbox">
          <com-native-grid
            height="295"
            :data="items"
            :columns="columns"
            @selected="onSelected"
          >
          </com-native-grid>
        </div>
        <div class="hms-kpinow__graphbox">
          <p class="hms-kpinow__graphbox__title">
            KPI : {{ selectedKpiNm[i] }}
          </p>
          <div class="hms-dashboard-graph">
            <com-am-chart
              :data="perData[i]"
              :options="{}"
              type="GAUGE"
              width="220"
              height="200"
            ></com-am-chart>
          </div>
        </div>
      </div>
    </template>
  </dashboard-box>
</template>

<script>
import ComAmChart from '@/components/common/global/ComAmChart';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common, timezone } from '@/utils';
import DashboardBox from '@/components/dashboard/business/DashboardBox';
import { dashboardStore, screenStore } from '@/mixins';
import * as dashboardTypes from '@/store/modules/dashboard/types';
import FunctionCell from '@/components/common/business/FunctionCell';
//import * as screenTypes from '@/store/modules/screen/types';

export default {
  name: 'KpiStatusForm',
  components: {
    DashboardBox,
    ComNativeGrid,
    ComAmChart,
  },
  mixins: [screenStore, dashboardStore],
  data() {
    return {
      currentSlide: 0,
      sliderAll: false,
      contentsClassList: ['hms-kpinow__gridwrap'],
      sliderOption: [
        {
          arrows: false,
          edgeFriction: 0.35,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      ],
      sort: [{ field: 'kpiNm', dir: 'asc' }],
      columns: [],
      progress: false,
      perData: [],
      yearData: timezone.getClientDate('YYYY'),
      monthData: timezone.getClientDate('MM'),
      kpiStatusList: [],
      kpiStatusPagingList: [],
      take: 6,
      totalPageCnt: 2,
      selectedKpiNm: [],
    };
  },
  computed: {
    getKpiTreeList() {
      return this[dashboardTypes.getters.GET_KPI_CURRENT_LIST];
    },
    getCurrentSlideNo() {
      return this[dashboardTypes.getters.GET_CURRENT_SLIDE_NO_KPI];
    },
  },
  watch: {
    getKpiTreeList: function(list) {
      this.resetData();
      if (common.isEmpty(list)) return;
      let resultList = list.map(el => {
        let obj = { ...el };
        //* 년간 목표달성도
        let rate = common.getAchRate(
          obj.targetYy || 0,
          obj.targetYy || 0,
          obj.resultTs || 0,
          obj.kpiAchType,
        );
        obj.targetPerformYyPer = this.getPerData(
          obj.targetYy,
          obj.resultTs,
          rate,
        );
        obj.targetYy = common.isEmpty(obj.targetYy) ? 0 : obj.targetYy;
        obj.resultTs = common.isEmpty(obj.resultTs) ? 0 : obj.resultTs;
        let tooltip =
          this.$t('NLS0000310') +
          ' : ' +
          obj.targetYy +
          '\n' +
          this.$t('NLS0000313') +
          ' : ' +
          obj.resultTs +
          '\n' +
          this.$t('NLS0000244') +
          ' : ' +
          rate.toFixed(1);
        obj.targetPerformYyPer[0].val = tooltip; //*년간목표/년간실적
        obj.targetPerformYyPer[1].val = tooltip;
        obj.targetTs = common.isEmpty(obj.targetTs)
          ? 0
          : common.getDemicalComma(obj.targetTs, obj.pointCnt || 0); //*누적목표
        obj.resultTs = common.isEmpty(obj.resultTs)
          ? 0
          : common.getDemicalComma(obj.resultTs, obj.pointCnt || 0); //*누적실적
        obj.targetTsNm = common.numberWithCommas(obj.targetYy) + obj.kpiUnitNm;
        obj.resultTsNm = common.numberWithCommas(obj.resultTs) + obj.kpiUnitNm;
        return obj;
      });
      this.kpiStatusList = [...resultList];

      //*총 페이지 개수
      const pageCnt = Math.ceil(this.kpiStatusList.length / this.take);
      this.sliderAll = pageCnt > 1 ? true : false;
      this.totalPageCnt = pageCnt;
      for (let i = 0; i < pageCnt; i++) {
        let list = this.kpiStatusList.slice(
          i * this.take,
          i * this.take + this.take,
        );
        if (list.length > 0) {
          this.getPerDataFn(list[0], i);
        }
        if (i === 0) {
          this.kpiStatusPagingList = [];
          this.kpiStatusPagingList.push(list);
        } else {
          this.kpiStatusPagingList.push(list);
        }
      }
    },
  },
  mounted() {
    this.initColumns();
    this[dashboardTypes.actions.FETCH_KPI_CURRENT_LIST]({}); //*KPI체계도 조회
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: 'KPI',
          className: 'cursor-pointer min-300',
          // format: 'ellipsis',
          // cell: FunctionCell,
        },
        {
          field: 'targetTsNm',
          title: this.$t('NLS0000310'), //*목표
          width: '110px',
          className: 'center cursor-pointer',
        },
        {
          field: 'resultTsNm',
          title: this.$t('NLS0000313'), //*실적
          width: '110px',
          className: 'center cursor-pointer',
        },
        {
          field: 'targetPerformYyPer',
          title: this.$t('NLS0000468'), //*년간 목표달성도
          format: 'barProgress',
          cell: FunctionCell,
        },
        { field: 'kpiId', title: '', width: '0px' },
      ];
      this.perData = [
        [
          {
            category: this.$t('NLS0000922'), //*누적 달성도
            value: 0,
            full: 120,
          },
          {
            category: '' + this.$t('NLS0001283'), //*월 달성도
            value: 0,
            full: 120,
          },
          {
            category: ' ' + this.$t('NLS0001283'), //*월 달성도
            value: 0,
            full: 120,
          },
        ],
        [
          {
            category: this.$t('NLS0000922'), //*누적 달성도
            value: 0,
            full: 120,
          },
          {
            category: '' + this.$t('NLS0001283'), //*월 달성도
            value: 0,
            full: 120,
          },
          {
            category: ' ' + this.$t('NLS0001283'), //*월 달성도
            value: 0,
            full: 120,
          },
        ],
      ];
    },
    getPerData(target, result, rate) {
      //*param: target:목표, result:실적, rate:달성률
      //*return: 목표, 실적
      let resultList = [{ per: 0 }, { per: 0 }];
      let a = 0;
      let b = 0;
      result = common.isEmpty(result) ? 0 : result;
      target = common.isEmpty(target) ? 0 : target;
      if (result === 0 && target === 0) {
        //목표 실적이 0인 경우
        a = 0;
        b = 0;
      } else if (target === 0) {
        //목표 0인 경우
        b = rate; //공통계산식에서 처리한 rate (0 or 100)
      } else if (100 > rate) {
        //달성률이 100이안되는경우
        a = 100;
        b = rate;
      } else if (100 < rate) {
        //달성률이 100보다 큰경우
        b = 100;
        a = (100 / rate) * 100;
      } else if (rate === 100) {
        a = 100;
        b = 100;
      }
      resultList[0].per = Math.round(parseFloat(a) / 10) * 10;
      resultList[1].per = Math.round(parseFloat(b) / 10) * 10;
      return resultList;
    },
    onSetting() {
      //*KPI 현황 setting버튼 팝업
      //*KPI리스트 호출
      let param = {
        viewDashBoadKpi: 'Y',
        baseYyyy: this.yearData,
        baseYyyyMm: this.yearData + this.monthData,
      };
      this[dashboardTypes.actions.FETCH_DASHBOARD_KPI_LIST](param);
      this[dashboardTypes.actions.INIT_VIEWS_DASHBOARD_KPI_POPUP](true);
    },
    onSelected(row) {
      this.getPerDataFn(row, this.getCurrentSlideNo);
    },
    getPerDataFn(row, i) {
      this.selectedKpiNm[i] = row.kpiNm;
      let preMonth = !common.isEmpty(row.preBaseYyyymm)
        ? row.preBaseYyyymm.substring(4, 7)
        : ' ';
      let prePreMonth = !common.isEmpty(row.prePreBaseYyyymm)
        ? row.prePreBaseYyyymm.substring(4, 7)
        : '';
      this.$set(this.perData, i, [
        {
          category: prePreMonth + this.$t('NLS0001283'), //*전전월 달성도->월 달성도
          value: common.getAchRate(
            row.prePreTargetMs || 0,
            row.prePreTargetMs || 0,
            row.prePreResultMs || 0,
            row.kpiAchType,
          ),
          full: 120,
        },
        {
          category: preMonth + this.$t('NLS0001283'), //*전월 달성도->월 달성도
          value: common.getAchRate(
            row.preTargetMs || 0,
            row.preTargetMs || 0,
            row.preResultMs || 0,
            row.kpiAchType,
          ),
          full: 120,
        },
        {
          category: this.$t('NLS0000922'), //*누적 달성도
          value: common.getAchRate(
            row.targetYy || 0,
            row.targetYy || 0,
            row.resultTs || 0,
            row.kpiAchType,
          ),
          full: 120,
        },
      ]);
    },
    resetData() {
      this.sliderAll = false;
      this.selectedKpiNm = [];
      this.kpiStatusList = [];
      this.kpiStatusPagingList = [];
      this.perData = [];
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard__kpinow {
  width: 100%;
}
</style>

<style lang="scss">
.min-300 {
  min-width: 300px !important;
}
.hms-dashboard__gridbox {
  overflow: auto;
  & > div {
    min-width: 400px;
  }
}
</style>
