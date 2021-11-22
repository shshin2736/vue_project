<template>
  <div class="c-black">
    <div class="hms-grid type0 report-gridbox">
      <com-native-grid
        :data="kpiReportList"
        :columns="columns"
        height="217"
        :sortable="true"
        :sort="sort1"
        selectedfield="selected"
        @selected="onSelected"
        :selectedHover="false"
      ></com-native-grid>
    </div>
    <div class="page__tab-wrap type0">
      <div class="page__tab-box type1">
        <button type="button" :class="{ current: current1 }" @click="onTab">
          {{ $t('NLS0000821') }}
        </button>
        <button type="button" :class="{ current: !current1 }" @click="onTab">
          {{ $t('NLS0000250') }}</button
        ><!-- 연결 과제  -->
        <button type="button" @click="openChartGrpPop">
          {{ $t('NLS0001290') }}</button
        ><!--차트 그룹 선택->비교차트-->
      </div>

      <div class="page__tab" :class="{ current: tabContent1 }">
        <div class="hms-graph type0 mb0">
          <div class="graphwrap" ref="chartdiv">
            <com-am-chart
              :data="chartList"
              :options="chartOptions"
              :time="0.5"
              type="XY"
              width="800"
              height="183"
            ></com-am-chart>
          </div>
        </div>
      </div>
      <div class="page__tab" :class="{ current: tabContent2 }">
        <div class="hms-grid">
          <com-native-grid
            :data="prjDataList"
            :columns="prjColumns"
            height="185"
            @btnclick="prjClick"
            :selectedHover="false"
          ></com-native-grid>
        </div>
      </div>
    </div>
    <div class="hms-grid row-bottom imgw-100 reason-report">
      <reason-grid
        :columns="reasonColumns"
        :data="reasonMeasureList"
        :height="650"
      ></reason-grid>
    </div>
    <a ref="links"></a>
    <!-- 보고서 상세내용 팝업 -->
    <project-report-detail-popup
      v-model="openProjectReportDetailPop"
    ></project-report-detail-popup>
    <!-- 보고서 첨부파일 팝업 -->
    <project-attach-file-popup
      v-model="openProjectAttachFilePop"
    ></project-attach-file-popup>
  </div>
</template>

<script>
import ReasonGrid from '@/components/businessExecution/kpiPerformance/business/ReasonGrid';
import ReasonField from '@/components/businessExecution/kpiPerformance/business/ReasonField';
import ComAmChart from '@/components/common/global/ComAmChart';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone, common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import ProjectReportDetailPopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectReportDetailPopup';
import ProjectAttachFilePopup from '@/components/businessExecution/projectExecution/specializedTasks/business/ProjectAttachFilePopup';

import {
  kpiPerformanceStore,
  commonStore,
  specializedTasksStore,
  generalTasksStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';

export default {
  name: 'kpiPerformReportForm',
  components: {
    ComNativeGrid,
    ComAmChart,
    ReasonGrid,
    ProjectReportDetailPopup,
    ProjectAttachFilePopup,
  },
  mixins: [
    kpiPerformanceStore,
    commonStore,
    specializedTasksStore,
    generalTasksStore,
  ],
  data() {
    return {
      sort1: [{ field: 'sortNo', dir: 'asc' }],
      sort2: [{ field: 'reasonDate', dir: 'desc' }],
      options1: [],
      options2: [],
      selectedField: 'selected',
      current1: true,
      current2: false,
      tabContent1: true,
      tabContent2: false,
      selected: '',
      classed: 'hms-dropdown type1',
      columns: [],
      prjColumns: [],
      reasonColumns: [],
      //* XY 차트 설정
      chartOptions: {
        titleX: '', //* X축 제목
        titleY: '', //* Y축 제목
        minGridDistance: 40, //* x축 최소 간격
        category: 'yearDate', //* x축 카테고리
        scrollBarX: false, //* X축 스크롤 on/off
        scrollBarY: false, //* Y축 스크롤 on/off
        legend: true, //* 범례 on/off
        legendPosition: 'right',
        cursor: true, //* 커서 on/off
        hiddenX: true,
        //* 막대형 그래프 내용 설정
        columnSeries: [],
        //* 라인형 그래프 내용 설정
        lineSeries: [],
      },
      kpiReportList: [],
      chartList: [],
      prjDataList: [],
      reasonMeasureList: [],
      labels: '',
    };
  },
  computed: {
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getKpiPerformList() {
      return this[kpiPerformanceTypes.getters.GET_KPI_PERFORM_REPORT_LIST];
    },
    getReasonMeasureList() {
      return this[
        kpiPerformanceTypes.getters.GET_KPI_REASON_MEASURE_REPORT_LIST
      ].reasonMeasureList;
    },
    getChartDataList() {
      return this[kpiPerformanceTypes.getters.GET_KPI_TARGET_MONTH_LIST];
    },
    getPrjDataList() {
      return this[kpiPerformanceTypes.getters.GET_KPI_PRJ_LIST];
    },
    getDataSearch() {
      return this[kpiPerformanceTypes.getters.GET_DATA_SEARCH_KPI_DATA];
    },
    getLatestResult() {
      return this[kpiPerformanceTypes.getters.GET_KPI_LATEST_RESULT];
    },
    // //* 보고서 상세 팝업
    openProjectReportDetailPop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_REPORT_DETAIL_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_REPORT_DETAIL_POP];
      },
    },
    //* 보고서 첨부파일 팝업
    openProjectAttachFilePop: {
      set(value) {
        this[projectExecutionTypes.actions.INIT_VIEWS_ATTACH_FILE_POP](value);
      },
      get() {
        return this[projectExecutionTypes.getters.GET_VIEWS_ATTACH_FILE_POP];
      },
    },
  },
  watch: {
    getKpiPerformList(list) {
      //*초기화
      this.kpiReportList = [];
      this.resetData();

      let resultList = [];
      list.map(el => {
        let obj = { ...el };
        if (!common.isEmpty(obj.resultMs)) {
          //*당월
          obj.msPer = common.getDemicalPoint(
            common.getAchRate(
              obj.targetMs,
              obj.targetMMs,
              obj.resultMs,
              obj.kpiAchType,
            ),
            0,
          );
          if (obj.achMeasure === 'R') {
            //*RANGE일때 (달성률-min)/(max-min)*100 계산식
            const achRateVal = obj.msPer;
            obj.msPer = [
              achRateVal,
              common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
            ];
          }
        }
        if (!common.isEmpty(obj.resultTs)) {
          //*누계
          obj.tsPer = common.getDemicalPoint(
            common.getAchRate(
              obj.targetOTs,
              obj.targetMTs,
              obj.resultTs,
              obj.kpiAchType,
            ),
            0,
          );
          if (obj.achMeasure === 'R') {
            //*RANGE일때 (달성률-min)/(max-min)*100 계산식
            const achRateVal = obj.tsPer;
            obj.tsPer = [
              achRateVal,
              common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
            ];
          }
        }

        let filterData = resultList.filter(el => el.kpiId === obj.kpiId);
        if (filterData.length === 0) {
          resultList.push(obj);
        }
      });
      this.kpiReportList = resultList;

      if (
        resultList.length > 0 &&
        Object.keys(this.getDataSearch).length === 0
      ) {
        //*분석차트 세팅
        this.getChartData(resultList[0].kpiId);
        //*연결과제 세팅
        this.getPrjData(resultList[0].kpiId);
        //*성공부진사유 세팅
        this.reasonMeasureData(resultList[0].kpiId);
      } else {
        //*분석차트 세팅
        this.getChartData(this.getDataSearch.srcId);
        //*연결과제 세팅
        this.getPrjData(this.getDataSearch.srcId);
        //*성공부진사유 세팅
        this.reasonMeasureData(this.getDataSearch.srcId);
      }
    },
    getReasonMeasureList: function(list) {
      let rmList = [];
      if (!common.isEmpty(list) && list.length > 0) {
        rmList = list.map(obj => {
          obj.measureData = [];
          obj.measurelist.map(el => {
            obj.measureData.push({
              contents: common.enterToBr(el.contents),
              fileList: el.measurefilelist,
            });
          });
          obj.contents = {
            contents: common.enterToBr(obj.contents),
            fileList: obj.reasonfilelist,
          };
          return obj;
        });
      }
      this.reasonMeasureList = rmList;
    },
    getChartDataList: function(data) {
      if (data !== undefined && data.length > 0) {
        let list = data.map(el => {
          let obj = { ...el };
          obj.yearDate = timezone.convertToDateFormat(
            timezone.convertToISO8601String(obj.yearDate),
            'YYYY-MM',
          );
          obj.resultMs = !common.isEmpty(obj.resultMs) ? obj.resultMs : 0;
          obj.targetOMs = !common.isEmpty(obj.targetOMs) ? obj.targetOMs : 0;
          obj.targetMMs = !common.isEmpty(obj.targetMMs) ? obj.targetMMs : 0;
          obj.resultLyMs = !common.isEmpty(obj.resultLyMs) ? obj.resultLyMs : 0;
          return obj;
        });
        this.chartList = [...list];
        const result = this.getLatestResult;
        if (!result || result.length === 0) {
          this.labels = this.labels = `${this.$t('NLS0001415')}: 0\n ${this.$t(
            'NLS0000452',
          )}: 0`;
        } else {
          this.labels = `${this.$t('NLS0001415')}: ${common.numberWithCommas(
            result[0].resultMs.toFixed(result[0].pointCnt),
          )}\n ${this.$t('NLS0000452')}: ${common.numberWithCommas(
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
    getPrjDataList: function(list) {
      if (list.data !== undefined && list.data.length > 0) {
        this.prjDataList = list.data.map(el => {
          let obj = { ...el };
          if (obj.prjType !== 'GL' && obj.prjType !== 'IN') {
            obj.reportYn = '';
          }
          obj.prjRate = common.isEmpty(obj.prjRate)
            ? undefined
            : common.getDemicalPoint(obj.prjRate, 1);
          return obj;
        });
      }
    },
    reasonMeasureList() {
      setTimeout(() => {
        this.initClickImg();
      }, 200);
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000160'), //*KPI명-> KPI
          className: 'left  td-ellipsis',
          // width: '350px',
        },
        {
          field: 'targetMs',
          title: this.$t('NLS0000392'), //*당월 목표
          className: 'right',
          format: '{0:n}',
          width: '75px',
        },
        {
          field: 'resultMs',
          title: this.$t('NLS0000451'), //*당월 실적
          className: 'right',
          format: '{0:n}',
          width: '75px',
        },
        {
          field: 'msPer',
          title: this.$t('NLS0000244'), //*달성률
          className: 'right hms-grid-per size',
          width: '70px',
          format: 'progress',
          cell: FunctionCell,
        },
        {
          field: 'prjCnt',
          title: this.$t('NLS0000445'), //*연결과제
          className: 'center',
          width: '50px',
        },
        {
          field: 'targetOTs',
          title: this.$t('NLS0000817'), //*연간 목표
          className: 'right',
          format: '{0:n}',
          width: '80px',
        },
        {
          field: 'resultTs',
          title: this.$t('NLS0000452'), //*누계 실적
          className: 'right',
          format: '{0:n}',
          width: '80px',
        },
        {
          field: 'tsPer',
          title: this.$t('NLS0000244'), //*달성률
          width: '70px',
          className: 'right hms-grid-per size',
          format: 'progress',
          cell: FunctionCell,
        },
      ];
      this.prjColumns = [
        {
          field: 'prjNm',
          title: this.$t('NLS0000147'), //*과제명->과제
          format: 'button',
          className: 'left td-ellipsis',
          cell: FunctionCell,
          width: '260px',
        },
        // {
        //   field: 'prjGrade',
        //   title: this.$t('NLS0000252'), //*등급
        //   className: 'center',
        //   width: '45px',
        // },
        {
          field: 'reportYn',
          width: '57px',
          title: this.$t('NLS0000186'), //* 보고서
          className: 'analysis-btn',
          format: 'button',
          cell: FunctionCell,
        },
        {
          field: 'prjUserNm',
          title: this.$t('NLS0000065'), //*담당자
          width: '100px',
          cell: FunctionCell,
          className: 'center td-ellipsis',
        },
        {
          field: 'prjRate',
          title: this.$t('NLS0000184'), //*진척률
          width: '75px',
          className: 'right hms-grid-per size',
          format: 'progress',
          cell: FunctionCell,
        },
        {
          field: 'prjStartDate',
          title: this.$t('NLS0000158'), //*시작일
          className: 'center',
          width: '85px',
        },
        {
          field: 'prjEndDate',
          title: this.$t('NLS0000159'), //*종료일
          className: 'center',
          width: '85px',
        },
      ];
      this.reasonColumns = [
        // { field: 'reasonId', title: '', width: '0px' },
        {
          field: 'reasonDateForm',
          title: this.$t('NLS0000852'), //*날짜
          width: '70px',
          valign: 'center',
          halign: 'center',
          className: 'center',
        },
        {
          field: 'contents',
          title: this.$t('NLS0000456'), //*성공/부진사유 분석->성공/부진사유
          format: 'reason',
          valign: 'flex-start',
          className: 'left cell-top',
          cell: ReasonField,
        },
        {
          field: 'measureData',
          title: this.$t('NLS0000457'), //*대책(전략) 구상->대책
          format: 'columns',
          editor: 'btn',
          valign: 'flex-start',
          className: 'cell-top',
          cell: ReasonField,
        },
      ];
      this.chartOptions.columnSeries = [
        {
          valueY: 'resultMs',
          name: this.$t('NLS0000313'), //*실적
          tooltip: true,
        },
      ];
      //* 라인형 그래프 내용 설정
      this.chartOptions.lineSeries = [
        {
          valueY: 'targetOMs',
          name: this.$t('NLS0000310'), //*목표
          tooltip: true,
          strokeWidth: 3,
        },
        {
          valueY: 'targetMMs',
          name: this.$t('NLS0000391'), //*수정 목표
          tooltip: true,
          strokeWidth: 3,
        },
        {
          valueY: 'resultLyMs',
          name: this.$t('NLS0000308'), //*전년 실적
          tooltip: true,
          strokeWidth: 3,
        },
      ];
    },
    onTab() {
      this.current1 = !this.current1;
      this.current2 = !this.current2;
      this.tabContent1 = !this.tabContent1;
      this.tabContent2 = !this.tabContent2;
    },
    resetData() {
      this.chartList = [];
      this.prjDataList = [];
      this.reasonMeasureList = [];
    },
    onSelected(row) {
      //*그리드 클릭시 해당데이터 조회
      //*초기화
      this.resetData();
      //*분석차트 세팅
      this.getChartData(row.kpiId);
      //*연결과제 세팅
      this.getPrjData(row.kpiId);
      //*성공부진사유 세팅
      this.reasonMeasureData(row.kpiId);
    },
    openChartPopup() {
      this[kpiPerformanceTypes.actions.INIT_VIEWS_CHART_GROUP_POP](true);
    },
    async getChartData(kpiId) {
      //*분석차트 데이터 가져오기
      let param = {
        kpiId: kpiId,
        searchFromYyyymm: this.getSelectedYear + '01',
        searchToYyyymm: this.getSelectedYear + '12',
      };
      await this[kpiPerformanceTypes.actions.FETCH_KPI_LATEST_RESULT](param);
      await this[kpiPerformanceTypes.actions.INIT_KPI_TARGET_MONTH_LIST]([]);
      await this[kpiPerformanceTypes.actions.FETCH_KPI_TARGET_MONTH_LIST](
        param,
      );
    },
    getPrjData(kpiId) {
      //* 연결과제 데이터 가져오기
      this[kpiPerformanceTypes.actions.FETCH_KPI_PRJ_LIST]({
        kpiId: kpiId,
      });
    },
    reasonMeasureData(kpiId) {
      //*성공부진사유대책 가져오기
      const param = {
        baseYyyymm: this.getSelectedYear + this.getSelectedMonth,
        kpiId: kpiId,
      };
      this[kpiPerformanceTypes.actions.FETCH_KPI_REASON_MEASURE_REPORT_LIST](
        param,
      );
    },
    async prjClick(data, name, field) {
      if (field === 'prjNm') {
        this.clickPrjNm(data);
      } else if (field === 'reportYn') {
        const prjId = data.prjId;
        await this[specializedTasksTypes.actions.FETCH_PROJECT_REPORT_INFO]({
          prjId: prjId,
        });
        await this[specializedTasksTypes.actions.INIT_VIEWS_REPORT_DETAIL_POP](
          true,
        );
      }
    },
    openChartGrpPop() {
      //*차트그룹선택 팝업
      this[commonTypes.actions.FETCH_COM_KPI_CHART_GRP_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_KPI_CHART_GRP_SINGLE_POP](true);
    },
    async clickPrjNm(data) {
      const links = this.$refs.links;
      switch (data.prjType) {
        //* 일반과제
        case 'GL':
          links.setAttribute(
            'href',
            `/redirectForm?path=GeneralTaskPage&prjId=${data.prjId}&auth=${this.$route.params.auth}&prjType=${data.prjType}`,
          );
          links.setAttribute('target', '_blank');
          links.click();
          break;
        case 'IN':
          //* 즉실천
          //* 즉실천 가져오기
          links.setAttribute(
            'href',
            `/redirectForm?path=PrjActionPage&prjId=${data.prjId}&auth=${this.$route.params.auth}&prjType=${data.prjType}`,
          );
          links.setAttribute('target', '_blank');
          links.click();
          break;
        default:
          //* 전문과제
          links.setAttribute(
            'href',
            `/redirectForm?path=ProjectExecutionDetailPage&prjId=${data.prjId}&auth=${this.$route.params.auth}&prjType=${data.prjType}`,
          );
          links.setAttribute('target', '_blank');
          links.click();
          break;
      }
    },
    initClickImg() {
      let imgList = document.querySelectorAll('.reason-report img');
      if (imgList.length == 0) return;
      for (let i = 0; i < imgList.length; i++) {
        let img = imgList[i];
        img.onload = function() // 이미지 로딩 완료 시 실행되는 함수
        {
          //var width = myImg.width; // 정확한 이미지 폭 알 수 있음.
          //img.addEventListener('click', this.image_popup(img.src));
          img.addEventListener('click', function() {
            var imgObj = new Image();
            imgObj.src = img.src;
            // let imageWin = window.open(
            //   '',
            //   'profile_popup',
            //   'width=' +
            //     img.naturalWidth +
            //     'px, height=' +
            //     img.naturalHeight +
            //     'px',
            // );
            let imageWin = window.open(
              '',
              'profile_popup',
              'width=' +
                window.innerWidth +
                'px, height=' +
                window.outerHeight +
                'px',
            );
            imageWin.document.write("<html><body style='margin:0'>");
            imageWin.document.write(
              "<a href=javascript:window.close()><img src='" +
                imgObj.src +
                "' border=0 style='width: 100%;'></a>",
            );
            imageWin.document.write('</body><html>');
            imageWin.document.title = imgObj.src;
          });
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.c-black {
  margin-top: -10px;
}
.hms-graph.type1 {
  height: 142px;
  .graphwrap {
    height: 142px;
  }
}
.hms-grid.row-bottom {
  margin-top: -10px;
}
.page__tab > .hms-grid,
.page__tab > .hms-graph {
  margin-top: -20px;
}
</style>
