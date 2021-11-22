<template>
  <div class="hms-grid">
    <com-native-grid
      :data="gridData"
      :columns="getColumns"
      :sortable="true"
      :sort="[]"
      height="250"
      @selected="selected"
    >
    </com-native-grid>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { systemStatusStore } from '@/mixins';
import * as systemStatusTypes from '@/store/modules/systemManagement/systemStatus/types';
import { timezone } from '@/utils';

export default {
  name: 'SystemStatusListForm',
  mixins: [systemStatusStore],
  components: {
    ComNativeGrid,
  },
  props: {
    tab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sort: [],
      gridData: [],
      skip: 0,
      take: 15,
      total: 0,
      func: null,
      sortObj: {},
      item: {},
    };
  },
  computed: {
    getColumns(state) {
      const columns =
        state.tab === 'systemAvg'
          ? this[systemStatusTypes.getters.GET_SYS_CON_AVG_COLUMNS]
          : state.tab === 'moduleUse'
          ? this[systemStatusTypes.getters.GET_MODULE_RATE_COLUMNS]
          : state.tab === 'efficiency'
          ? this[systemStatusTypes.getters.GET_IMPL_RATE_COLUMNS]
          : this[systemStatusTypes.getters.GET_DOWNLOAD_LOG_COLUMNS];
      return columns;
    },
    getGridData(state) {
      return state.tab === 'systemAvg'
        ? this[systemStatusTypes.getters.GET_SYS_CON_AVG]
        : state.tab === 'moduleUse'
        ? this[systemStatusTypes.getters.GET_MODULE_RATE]
        : state.tab === 'efficiency'
        ? this[systemStatusTypes.getters.GET_IMPL_RATE]
        : this[systemStatusTypes.getters.GET_DOWNLOAD_LOG];
    },
    getSearchData() {
      return this[systemStatusTypes.getters.GET_SEARCH_DATA];
    },
  },
  watch: {
    getGridData: function(value) {
      if (value.length > 0) {
        //* 셀렉트 초기화
        // this.initSelected();
        let items = this.fetchGridData(value);
        // if (
        //   this.tab !== 'efficiency' &&
        //   this.tab !== 'download' &&
        //   this.getSearchData.deptId
        // )
        //   items = items.filter(
        //     item => item.deptId === this.getSearchData.deptId,
        //   );
        //* 전체 아이템 수
        this.total = items.length;
        if (this.tab === 'systemAvg') {
          this.gridData = items;
          this[systemStatusTypes.actions.INIT_SYS_CON_AVG_GRID](items);
          this.selected(this.gridData[this.getSearchData.deptId ? 1 : 0]);
        } else if (this.tab === 'moduleUse') {
          this.gridData = items;
          this[systemStatusTypes.actions.INIT_MODULE_RATE_GRID](items);
          this.selected(this.gridData[this.getSearchData.deptId ? 1 : 0]);
        } else if (this.tab === 'efficiency') {
          this.gridData = items;
          this[systemStatusTypes.actions.INIT_IMPL_RATE_GRID](items);
          this.selected(this.gridData[this.getSearchData.deptId ? 1 : 0]);
        } else {
          this.gridData = items;
          this[systemStatusTypes.actions.INIT_DOWNLOAD_LOG_GRID](items);
          this[systemStatusTypes.actions.INIT_DOWNLOAD_LOG_CHART](
            items.map(item => {
              const obj = { ...item };
              obj.label = `${obj.deptNm}/${obj.userName} ${obj.rankNo}`;
              return obj;
            }),
          );
        }
      } else {
        this.initData();
      }
    },
  },
  created() {
    //* 컬럼 초기화
    this.initColumns();
  },
  updated() {
    if (this.tab === 'download') this.initTableWidth();
  },
  methods: {
    //* 전체 초기화
    initData() {
      this.gridData = [];
      this.item = {};
      this[systemStatusTypes.actions.INIT_SYS_CON_AVG_CHART]([]);
      this[systemStatusTypes.actions.INIT_MODULE_RATE_CHART]([]);
      this[systemStatusTypes.actions.INIT_IMPL_RATE_CHART]([]);
      // this[systemStatusTypes.actions.INIT_DOWNLOAD_LOG_CHART]([]);
    },
    initSelected() {
      const selected = document.querySelectorAll('.select-row');
      if (selected)
        Array.from(selected).forEach(el => {
          el.classList.remove('select-row');
        });
    },
    //* Table width 초기화
    initTableWidth() {
      const table = document.querySelectorAll('table');
      const headerCol = document.querySelectorAll('.k-grid-header col');
      const contentCol = document.querySelectorAll('.k-grid-content col');
      if (table) {
        Array.from(table).forEach(el => {
          el.removeAttribute('style');
        });
        Array.from(headerCol).forEach((el, i) => {
          if (i < 2) el.removeAttribute('width');
        });
        Array.from(contentCol).forEach((el, i) => {
          if (i < 2) el.removeAttribute('width');
        });
        if (this.tab === 'systemAvg' || this.tab === 'efficiency') {
          //..
          Array.from(headerCol).forEach((el, i) => {
            if (i < 2) el.setAttribute('width', '150px');
          });
          Array.from(contentCol).forEach((el, i) => {
            if (i < 2) el.setAttribute('width', '150px');
          });
        }
      }
    },
    //* 그리드 선택 이벤트
    selected(item) {
      if (this.tab === 'systemAvg') {
        //? 시스템 평균 접속율
        this[systemStatusTypes.actions.INIT_SYS_CON_AVG_CHART](
          this.getSystemAvgChartData(item),
        );
      } else if (this.tab === 'moduleUse') {
        //? 모듈 사용현황
        this[systemStatusTypes.actions.INIT_MODULE_RATE_CHART](
          this.getModuleUseChartData(item),
        );
      } else if (this.tab === 'efficiency') {
        //? 업무효율 향상율
        this[systemStatusTypes.actions.INIT_IMPL_RATE_CHART](
          this.getEfficiencyChartData(item),
        );
      }
    },
    //* 그리드 데이터 설정
    fetchGridData(items) {
      if (this.tab === 'systemAvg') {
        return this.getSystemAvgData(items); //? 시스템 평균 접속율
      } else if (this.tab === 'moduleUse') {
        return this.getModuleUseData(items); //? 모듈 사용현황
      } else if (this.tab === 'efficiency') {
        return this.getEfficiencyData(items); //? 업무효율 향상율
      } else {
        return items;
      }
    },
    //* 각 컬럼 초기화 메소드
    initColumns() {
      //? 시스템 평균 접속율
      this[systemStatusTypes.actions.INIT_SYS_CON_AVG_COLUMNS](
        this.getSystemAvgColumnsData(),
      );
      //? 모듈 사용현황
      this[systemStatusTypes.actions.INIT_MODULE_RATE_COLUMNS](
        this.getModuleUseColumnsData(),
      );
      //? 업무효율 향상율
      this[systemStatusTypes.actions.INIT_IMPL_RATE_COLUMNS](
        this.getEfficiencyColumnsData(),
      );
      //? 다운로드 이력
      this[systemStatusTypes.actions.INIT_DOWNLOAD_LOG_COLUMNS](
        this.getDownloadLogColumnsData(),
      );
    },
    //* 업무효율 향상율 Columns Parse
    getEfficiencyColumnsData() {
      return [
        {
          field: 'orgNm',
          title: this.$t('NLS0001321'),
          className: 'left',
          locked: true,
          width: '150px',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000348'),
          className: 'left',
          locked: true,
          width: '150px',
        },
        {
          title: this.$t('NLS0000659'),
          children: [
            {
              field: 'createTxt01',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt01',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt01',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt01',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt01',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000660'),
          children: [
            {
              field: 'createTxt02',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt02',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt02',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt02',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt02',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000661'),
          children: [
            {
              field: 'createTxt03',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt03',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt03',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt03',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt03',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000662'),
          children: [
            {
              field: 'createTxt04',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt04',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt04',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt04',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt04',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000663'),
          children: [
            {
              field: 'createTxt05',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt05',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt05',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt05',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt05',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000664'),
          children: [
            {
              field: 'createTxt06',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt06',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt06',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt06',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt06',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000665'),
          children: [
            {
              field: 'createTxt07',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt07',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt07',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt07',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt02',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000666'),
          children: [
            {
              field: 'createTxt08',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt08',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt08',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt08',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt08',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000667'),
          children: [
            {
              field: 'createTxt09',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt09',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt09',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt09',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt09',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000668'),
          children: [
            {
              field: 'createTxt10',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt10',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt10',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt10',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt10',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000669'),
          children: [
            {
              field: 'createTxt11',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt11',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt11',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt11',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt11',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000670'),
          children: [
            {
              field: 'createTxt12',
              title: this.$t('NLS0001323'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'ingTxt12',
              title: this.$t('NLS0001324'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'compTxt12',
              title: this.$t('NLS0001325'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'leadDateTxt12',
              title: this.$t('NLS0001326'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'efficiencyTxt12',
              title: this.$t('NLS0000432'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
      ];
    },
    //* 모듈 사용현황 Columns Parse
    getModuleUseColumnsData() {
      return [
        {
          field: 'orgNm',
          title: this.$t('NLS0000434'),
          className: 'left',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000348'),
          className: 'left',
        },
        {
          field: 'kpiCnt1',
          title: this.$t('NLS0000449'),
          format: '{0:n}',
        },
        {
          field: 'estabilshmentCnt',
          title: this.$t('NLS0000671'),
          format: '{0:n}',
        },
        {
          field: 'kpiGraphCnt',
          title: this.$t('NLS0000672'),
          format: '{0:n}',
        },
        {
          field: 'kpiCnt2',
          title: this.$t('NLS0000673'),
          format: '{0:n}',
        },
        {
          field: 'target',
          title: this.$t('NLS0000438'),
          format: '{0:n}',
        },
        {
          field: 'support',
          title: this.$t('NLS0000471'),
          format: '{0:n}',
        },
      ];
    },
    //* 시스템 평균 접속율 Columns Parse
    getSystemAvgColumnsData() {
      return [
        {
          field: 'orgNm',
          title: this.$t('NLS0000434'),
          className: 'left',
          width: '150px',
          locked: true,
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000348'),
          className: 'left',
          width: '150px',
          locked: true,
        },
        {
          title: this.$t('NLS0000659'),
          children: [
            {
              field: 'conCnt1',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt1',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate1',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000660'),
          children: [
            {
              field: 'conCnt2',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt2',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate2',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000661'),
          children: [
            {
              field: 'conCnt3',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt3',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate3',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000662'),
          children: [
            {
              field: 'conCnt4',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt4',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate4',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000663'),
          children: [
            {
              field: 'conCnt5',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt5',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate5',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000664'),
          children: [
            {
              field: 'conCnt6',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt6',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate6',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000665'),
          children: [
            {
              field: 'conCnt7',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt7',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate7',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000666'),
          children: [
            {
              field: 'conCnt8',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt8',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate8',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000667'),
          children: [
            {
              field: 'conCnt9',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt9',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate9',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000668'),
          children: [
            {
              field: 'conCnt10',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt10',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate10',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000669'),
          children: [
            {
              field: 'conCnt11',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt11',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate11',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
        {
          title: this.$t('NLS0000670'),
          children: [
            {
              field: 'conCnt12',
              title: this.$t('NLS0000435'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'actCnt12',
              title: this.$t('NLS0000436'),
              format: '{0:n}',
              width: '120px',
            },
            {
              field: 'conRate12',
              title: this.$t('NLS0000437'),
              format: '{0:n}',
              width: '120px',
            },
          ],
        },
      ];
    },
    //* 다운로드 이력 Columns Parse
    getDownloadLogColumnsData() {
      return [
        {
          field: 'rankNo',
          title: this.$t('NLS0001379'),
          width: '100px',
        },
        {
          field: 'userId',
          title: this.$t('NLS0000699'),
          width: '100px',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000466'),
          width: '200px',
        },
        {
          field: 'userName',
          title: this.$t('NLS0000117'),
          width: '100px',
        },
        {
          title: this.$t('NLS0001381'),
          children: [
            {
              field: 'totalCnt',
              title: this.$t('NLS0000674'),
              width: '100px',
            },
            {
              field: 'actionCnt',
              title: this.$t('NLS0001380'),
              width: '100px',
            },
            {
              field: 'projectCnt',
              title: this.$t('NLS0000671'),
              width: '100px',
            },
            {
              field: 'teamBoardCnt',
              title: this.$t('NLS0000469'),
              width: '100px',
            },
            {
              field: 'etcCnt',
              title: this.$t('NLS0001382'),
              width: '100px',
            },
          ],
        },
      ];
    },
    //* 업무효율 향상율 Data Parse
    getEfficiencyChartData(item) {
      const arr = [];
      this.item = item;
      for (let i = 1; i < 13; i++) {
        const obj = {};
        const num = i.toString().padStart(2, 0);
        const date = `${num}`;
        const { year } = this[systemStatusTypes.getters.GET_SEARCH_DATA];
        // const toMonth = new Date().getMonth() + 1;
        const toMonth =
          year < new Date().getFullYear() ? 12 + 1 : new Date().getMonth() + 1;

        if (i <= toMonth) {
          obj.create = item[`create${num}`];
          obj.ing = item[`ing${num}`];
          obj.comp = item[`comp${num}`];
          obj.efficiency = item[`efficiency${num}`];
        }
        obj.date = date;
        arr.push(obj);
      }
      return arr;
    },
    //* 모듈 사용현황 Data Parse
    getModuleUseChartData(item) {
      const arr = [];
      this.item = item;
      Object.entries(item).forEach(([key, value]) => {
        const obj = {};
        if (key === 'kpiCnt1') {
          obj.valueX = this.$t('NLS0000449');
          obj.valueY = value;
          obj.order = 6;
          arr.push(obj);
        } else if (key === 'estabilshmentCnt') {
          obj.valueX = this.$t('NLS0000671');
          obj.valueY = value;
          obj.order = 5;
          arr.push(obj);
        } else if (key === 'kpiGraphCnt') {
          obj.valueX = this.$t('NLS0000672');
          obj.valueY = value;
          obj.order = 4;
          arr.push(obj);
        } else if (key === 'kpiCnt2') {
          obj.valueX = this.$t('NLS0000673');
          obj.valueY = value;
          obj.order = 3;
          arr.push(obj);
        } else if (key === 'target') {
          obj.valueX = this.$t('NLS0000438');
          obj.valueY = value;
          obj.order = 2;
          arr.push(obj);
        } else if (key === 'support') {
          obj.valueX = this.$t('NLS0000471');
          obj.valueY = value;
          obj.order = 1;
          arr.push(obj);
        }
      });
      arr.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        }
        if (a.order < b.order) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return arr;
    },
    //* 시스템 평균 접속율 Data Parse
    getSystemAvgChartData(item) {
      const arr = [];
      this.item = item;
      for (let i = 1; i < 13; i++) {
        const obj = {};
        const date = `${i < 10 ? '0' : ''}${i}`;
        obj.conCnt = item[`conCnt${i}`];
        obj.conRate = item[`conRate${i}`];
        obj.actCnt = item[`actCnt${i}`];
        obj.date = date;
        arr.push(obj);
      }
      return arr;
    },
    //* 업무효율 향상율 Data Parse
    getEfficiencyData(items) {
      const arr = [];
      const itemTxt = this.$t('NLS0001263');
      const dateTxt = this.$t('NLS0001320');
      const { year } = this[systemStatusTypes.getters.GET_SEARCH_DATA];
      // const toMonth = new Date().getMonth() + 1;
      const toMonth =
        year < new Date().getFullYear() ? 12 + 1 : new Date().getMonth() + 1;

      items.forEach(item => {
        const obj = { ...item };
        obj.year = this.getSearchData.year;
        for (let i = 1; i <= 12; i++) {
          const num = i.toString().padStart(2, 0);
          if (i <= toMonth) {
            obj[`createTxt${num}`] = `${
              item[`create${num}`] ? item[`create${num}`].toFixed(0) : 0
            }${itemTxt}`;
            obj[`ingTxt${num}`] = `${
              item[`ing${num}`] ? item[`ing${num}`].toFixed(0) : 0
            }${itemTxt}`;
            obj[`compTxt${num}`] = `${
              item[`comp${num}`] ? item[`comp${num}`].toFixed(0) : 0
            }${itemTxt}`;
            obj[`leadDateTxt${num}`] = `${
              item[`leadDate${num}`]
                ? `${item[`leadDate${num}`].toFixed(0)}${dateTxt}`
                : ''
            }`;
            obj[`efficiencyTxt${num}`] = `${
              item[`efficiency${num}`]
                ? `${item[`efficiency${num}`].toFixed(0)}%`
                : ''
            }`;
          } else {
            obj[`createTxt${num}`] = '';
            obj[`ingTxt${num}`] = '';
            obj[`compTxt${num}`] = '';
            obj[`leadDateTxt${num}`] = '';
            obj[`efficiencyTxt${num}`] = '';
          }
        }
        arr.push(obj);
      });
      return arr;
    },
    //* 모듈 사용현황 Data Parse
    getModuleUseData(items) {
      const arr = [];
      items.forEach(item => {
        const obj = {
          deptId: item.deptId,
          deptNm: item.deptNm,
          orgNm: item.orgNm,
          year: timezone.convertToClientTimeZone(item.yyyymm, 'YYYY-MM'),
        };
        let flag = true;
        const cnt = item.moduleCnt;

        if (item.moduleId === 'M01') {
          obj.kpiCnt1 = cnt ? cnt : 0;
        } else if (item.moduleId === 'M02') {
          obj.estabilshmentCnt = cnt ? cnt : 0;
        } else if (item.moduleId === 'M03') {
          obj.kpiGraphCnt = cnt ? cnt : 0;
        } else if (item.moduleId === 'M04') {
          obj.kpiCnt2 = cnt ? cnt : 0;
        } else if (item.moduleId === 'M05') {
          obj.target = cnt ? cnt : 0;
        } else {
          obj.support = cnt ? cnt : 0;
        }

        if (obj.deptNm && arr.length > 0) {
          for (const value of arr) {
            if (value.deptId === obj.deptId) {
              if (item.moduleId === 'M01') {
                value.kpiCnt1 = obj.kpiCnt1;
              } else if (item.moduleId === 'M02') {
                value.estabilshmentCnt = obj.estabilshmentCnt;
              } else if (item.moduleId === 'M03') {
                value.kpiGraphCnt = obj.kpiGraphCnt;
              } else if (item.moduleId === 'M04') {
                value.kpiCnt2 = obj.kpiCnt2;
              } else if (item.moduleId === 'M05') {
                value.target = obj.target;
              } else {
                value.support = obj.support;
              }
              flag = false;
              break;
            }
          }
        }
        if (obj.deptNm && flag) {
          arr.push(obj);
        }
      });
      return arr;
    },
    //* 시스템 평균 접속율 Data Parse
    getSystemAvgData(items) {
      const arr = [];
      const { year } = this[systemStatusTypes.getters.GET_SEARCH_DATA];
      // const toMonth = new Date().getMonth() + 1;
      const toMonth =
        year < new Date().getFullYear() ? 12 + 1 : new Date().getMonth() + 1;

      items.forEach(item => {
        const month = Number(item.yyyymm.toString().substring(4, 6));
        const obj = {
          deptId: item.deptId,
          deptNm: item.deptNm,
          orgNm: item.orgNm,
          year: Number(item.yyyymm.toString().substring(0, 4)),
        };
        let flag = true;
        for (let i = 1; i <= toMonth; i++) {
          if (i === month) {
            obj[`conCnt${month}`] = item.conCnt ? item.conCnt : 0;
            obj[`conRate${month}`] = item.conRate ? item.conRate : 0;
            obj[`actCnt${month}`] = item.actCnt ? item.actCnt : 0;
          } else {
            obj[`conCnt${i}`] = 0;
            obj[`conRate${i}`] = 0;
            obj[`actCnt${i}`] = 0;
          }
        }

        if (obj.deptNm && arr.length > 0) {
          for (const value of arr) {
            if (value.deptId === obj.deptId) {
              value[`conCnt${month}`] = obj[`conCnt${month}`];
              value[`conRate${month}`] = obj[`conRate${month}`];
              value[`actCnt${month}`] = obj[`actCnt${month}`];
              flag = false;
              break;
            }
          }
        }
        if (obj.deptNm && flag) {
          arr.push(obj);
        }
      });
      return arr;
    },
  },
};
</script>
