<template>
  <!-- 연결과제 팦업 -->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>
                {{ getSelectedYear }}/{{ getSelectedMonth }}
                {{ selectedKpiNm }}
              </p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer-pop__subtitle">
              <p>
                {{ $t('NLS0000250') }}
                <!--연결과제-->
                <button
                  type="button"
                  class="magnifier-btn"
                  @click="searchPrjBtn"
                >
                  <span>{{ $t('NLS0000814') }}</span>
                </button>
              </p>
            </div>
            <div class="hms-grid">
              <com-native-grid
                :data="prjDataList"
                :columns="columns"
                height="500"
                @btnclick="prjClick"
              ></com-native-grid>
            </div>
          </div>
        </div>
        <a ref="links"></a>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import {
  kpiPerformanceStore,
  commonStore,
  generalTasksStore,
  specializedTasksStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
export default {
  name: 'KpiPrjPopup',
  mixins: [
    kpiPerformanceStore,
    commonStore,
    generalTasksStore,
    specializedTasksStore,
  ],
  components: {
    ComNativeGrid,
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
      selectedKpiId: '',
      selectedKpiNm: '',
      prjDataList: [],
    };
  },
  computed: {
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getSelectedPrjData() {
      return this[commonTypes.getters.GET_ASSIGNMENT_INFO];
    },
    getPrjData() {
      return this[kpiPerformanceTypes.getters.GET_KPI_PRJ_LIST];
    },
  },
  watch: {
    getSelectedPrjData: function(data) {
      //* 선택한 과제 연결하기
      this[kpiPerformanceTypes.actions.UPDATE_KPI_PRJ_LIST]({
        kpiId: this.selectedKpiId,
        prjList: data,
        kpiNm: this.selectedKpiNm,
        baseYyyy: this.getSelectedYear, //*실적리스트
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth, //*실적리스트
        searchUserId: this[
          kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID
        ],
        wwSeq: this[kpiPerformanceTypes.getters.GET_WWSEQ_PARAM],
      });
    },
    getPrjData: function(data) {
      this.selectedKpiId = data.kpiId;
      this.selectedKpiNm = data.kpiNm;
      this.prjDataList = data.data.map(el => {
        let obj = { ...el };
        obj.prjRate = common.isEmpty(obj.prjRate)
          ? undefined
          : common.getDemicalPoint(obj.prjRate, 1);
        if (obj.prjType !== 'GL' && obj.prjType !== 'IN') {
          obj.reportYn = '';
        }
        return obj;
      });
    },
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'prjNm',
          title: this.$t('NLS0000147'), //*과제명->과제
          className: 'left td-ellipsis',
          width: '430px',
          format: 'button',
          cell: FunctionCell,
        },
        // {
        //   field: 'prjGrade',
        //   title: this.$t('NLS0000252'), //*등급
        //   className: 'center',
        //   width: '70px',
        // },
        {
          field: 'reportYn',
          width: '60px',
          title: this.$t('NLS0000186'), //* 보고서
          className: 'analysis-btn',
          format: 'button',
          cell: FunctionCell,
        },
        {
          field: 'prjUserNm',
          title: this.$t('NLS0000065'), //*담당자
          className: 'left td-ellipsis',
          width: '150px',
        },
        {
          field: 'prjStartDate',
          title: this.$t('NLS0000158'), //*시작일
          className: 'center',
          width: '120px',
        },
        {
          field: 'prjEndDate',
          title: this.$t('NLS0000159'), //*종료일
          className: 'center',
          width: '120px',
        },
        {
          field: 'prjRate',
          title: this.$t('NLS0000184'), //*진척률
          className: 'right hms-grid-per size',
          format: 'progress',
          cell: FunctionCell,
          width: '100px',
        },
        {
          field: 'delete',
          title: ' ',
          format: 'delete',
          width: '95px',
          cell: FunctionCell,
          className: 'center',
        },
      ];
    },
    closePopup() {
      this.$emit('input', false);
    },
    searchPrjBtn() {
      //* 과제검색 팝업
      const param = {
        selectedYear: this.getSelectedYear,
      };
      this[commonTypes.actions.FETCH_SEARCH_ASSIGNMENT_LIST](param);

      this[commonTypes.actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP](true);
    },
    removePrj(data) {
      //* 연결과제 삭제
      common.confirm('NLS0000004', () => {
        const param = {
          kpiId: data.kpiId,
          prjId: data.prjId,
          kpiNm: this.selectedKpiNm, //*과제리스트
          baseYyyy: this.getSelectedYear, //*실적리스트
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth, //*실적리스트
          searchUserId: this[
            kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID
          ],
          wwSeq: this[kpiPerformanceTypes.getters.GET_WWSEQ_PARAM],
        };
        this[kpiPerformanceTypes.actions.DELETE_KPI_PRJ_DATA](param);
      });
    },
    async prjClick(data, value, field) {
      if (field === 'prjNm') {
        //* 과제화면 이동
        this.clickPrjNm(data);
      } else if (field === 'delete') {
        //* 연결과제 삭제
        common.confirm('NLS0000004', () => {
          const param = {
            kpiId: data.kpiId,
            prjId: data.prjId,
            kpiNm: this.selectedKpiNm, //*과제리스트
            baseYyyy: this.getSelectedYear, //*실적리스트
            baseYyyyMm: this.getSelectedYear + this.getSelectedMonth, //*실적리스트
            searchUserId: this[
              kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID
            ],
            wwSeq: this[kpiPerformanceTypes.getters.GET_WWSEQ_PARAM],
          };
          this[kpiPerformanceTypes.actions.DELETE_KPI_PRJ_DATA](param);
        });
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
    clickPrjNm(data) {
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
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_PRJ_POP](false);
    },
  },
};
</script>
