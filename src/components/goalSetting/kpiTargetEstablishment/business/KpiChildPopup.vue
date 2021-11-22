<template>
  <!-- 하위 kPI 보기 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000936') }}</p>
              <!--하위 KPI 보기-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer-pop__subtitle">
              <p>
                {{ $t('NLS0000396') }} : {{ getSelectedYear
                }}{{ $t('NLS0000812') }} {{ getSelectedMonth
                }}{{ $t('NLS0000684') }}
              </p>
              <!--실적년월 , 년, 월 -->
            </div>
            <div class="hms-grid">
              <com-native-grid
                :data="getChildKpiData"
                :columns="columns"
                height="340"
                @btnclick="openPopupFunc"
              ></com-native-grid>
            </div>
            <div
              class="hms-grid summary-table"
              v-if="kpiAccType === type_sum || kpiAccType === type_avg"
            >
              <table>
                <colgroup>
                  <col style="width:25%" />
                  <col />
                  <col style="width:25%" />
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">{{ $t('NLS0000400') }}</th>
                    <!--당월 실적 합계-->
                    <td>{{ totalResultMs }}</td>
                    <th scope="row">{{ $t('NLS0000401') }}</th>
                    <!--누계 실적 합계-->
                    <td>
                      {{ totalResultTs }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
import { common } from '@/utils';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderHtmlCell from '@/components/common/business/HeaderHtmlCell';
export default {
  name: 'KpiChildPopup',
  components: {
    ComNativeGrid,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore, commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      totalResultMs: 0,
      totalResultTs: 0,
      kpiAccType: '',
      type_sum: '31', //*합계
      type_avg: '32', //*단순평균
      //*단순평균
      columns: [],
    };
  },
  computed: {
    getChildKpiData() {
      return this[kpiTargetEstablishmentTypes.getters.GET_KPI_CHILD_LIST];
    },
    getSumMonth() {
      return '';
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getKpiDefForm() {
      //*속성그룹폼데이터
      let data = this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA];
      return data.kpiDefData;
    },
  },
  watch: {
    getChildKpiData(data) {
      let msArr = [];
      let tsArr = [];
      data.map(obj => {
        msArr.push(
          !common.isEmpty(obj.resultMs)
            ? parseFloat(common.getDemicalPoint(obj.resultMs, 1))
            : null,
        );
        tsArr.push(
          !common.isEmpty(obj.resultTs)
            ? parseFloat(common.getDemicalPoint(obj.resultTs, 1))
            : null,
        );
        obj.targetMs = !common.isEmpty(obj.targetMMs)
          ? obj.targetMMs
          : obj.targetOMs;
        obj.targetTs = !common.isEmpty(obj.targetMTs)
          ? obj.targetMTs
          : obj.targetOTs;

        if (!common.isEmpty(obj.resultMs)) {
          obj.archRateMm = common.getDemicalPoint(
            common.getAchRate(
              obj.targetOMs,
              obj.targetMMs,
              obj.resultMs,
              obj.kpiAchType,
            ),
            0,
          );
          if (obj.achMeasure === 'R') {
            //*RANGE일때 (달성률-min)/(max-min)*100 계산식
            const achRateVal = obj.archRateMm;
            obj.archRateMm = [
              achRateVal,
              common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
            ];
          }
        }
        if (!common.isEmpty(obj.resultTs)) {
          obj.archComuRate = common.getDemicalPoint(
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
            const achRateVal = obj.archComuRate;
            obj.archComuRate = [
              achRateVal,
              common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
            ];
          }
        }
        obj.reasonGoal = obj.reasonCnt > 0 ? 'bg_on' : '';

        return obj;
      });
      if (this.kpiAccType === this.type_sum) {
        this.totalResultMs = common.getSum(msArr);
        this.totalResultTs = common.getSum(tsArr);
      } else if (this.kpiAccType === this.type_avg) {
        this.totalResultMs = common.getAverage(msArr);
        this.totalResultTs = common.getAverage(tsArr);
      }
    },
    getKpiDefForm: function(value) {
      this.kpiAccType = value.kpiAccType; //*실적누계
    },
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          title: 'KPI',
          locked: true,
          children: [
            {
              field: 'kpiNm',
              title: 'KPI명', //*KPI명
              width: '255px',
              className: 'left td-ellipsis',
            },
            {
              field: 'deptNm',
              title: '담당부서', //*담당부서
              width: '117px',
              className: 'left td-ellipsis',
            },
            {
              field: 'userNm',
              title: '담당자', //*담당자
              width: '95px',
              className: 'left td-ellipsis',
            },
            {
              field: 'kpiUnitNm',
              title: '단위', //*단위
              width: '73px',
              className: 'center td-ellipsis',
            },
          ],
        },
        {
          title: '당월', //*당월
          locked: true,
          children: [
            {
              field: 'targetMs',
              title: '목표', //*목표
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'resultMs',
              title: '실적', //*실적
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'archRateMm',
              title: '달성률', //*달성률
              width: '82px',
              className: 'right hms-grid-per size',
              format: 'progress',
              cell: FunctionCell,
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
          ],
        },
        {
          title: '누계', //*누계
          locked: true,
          children: [
            {
              field: 'targetTs',
              title: '목표', //*목표
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'resultTs',
              title: '실적', //*실적
              width: '95px',
              format: '{0:n}',
              className: 'right',
            },
            {
              field: 'archComuRate',
              title: '달성률', //*달성률
              width: '82px',
              className: 'right hms-grid-per size',
              format: 'progress',
              cell: FunctionCell,
            },
          ],
        },
      ];
    },
    openPopupFunc(dataItem, value, field) {
      if (field == 'reasonGoal') {
        //성공부진사유및대책
        if (common.isEmpty(dataItem.subKpiId)) return;
        const links = this.$refs.links;
        links.setAttribute(
          'href',
          `/redirectForm?auth=${
            this.$route.params.auth
          }&path=KpiPerformanceListPage&baseYyyyMm=${this.getSelectedYear +
            this.getSelectedMonth}&kpiId=${dataItem.subKpiId}`,
        );
        links.setAttribute('target', '_blank');
        links.click();
      }
    },
    closePopup() {
      this.kpiAccType = ''; //*실적누계
      this.$emit('input', false);
    },
  },
};
</script>
