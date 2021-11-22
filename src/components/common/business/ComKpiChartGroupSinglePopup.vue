<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-small">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000447') }}</p>
              <!--차트 그룹 선택-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <p class="search__form__title">
                  {{ $t('NLS0000462') }}
                </p>
                <!--차트그룹명-->
                <span class="input__box type-wide type-nobtn">
                  <com-input-text
                    v-model="srchParam"
                    @enter="onSrch"
                  ></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="onSrch"
                >
                  <span>{{ $t('NLS0000253') }}</span
                  ><!--검색-->
                </com-button>
              </div>
            </div>
            <div class="hms-grid selectedAll">
              <com-native-grid
                :data="getChartGroupData"
                :columns="columns"
                height="330"
                :resizable="true"
                @btnclick="onClick"
              ></com-native-grid>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { commonStore } from '@/mixins';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'ComKpiChartGroupSinglePopup',
  components: {
    ComNativeGrid,
    ComButton,
    ComInputText,
    ComOverlay,
  },
  mixins: [commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    baseYyyy: {
      value: {
        type: String,
        required: false,
      },
    },
  },
  data: function() {
    return {
      columns: [],
      srchParam: '',
    };
  },
  computed: {
    getChartGroupData() {
      return this[commonTypes.getters.GET_COM_KPI_CHART_GRP_LIST];
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'groupNm',
          title: this.$t('NLS0000462'), //*차트그룹명
          format: 'button',
          className: 'left',
          cell: FunctionCell,
        },
        {
          field: 'userName',
          title: this.$t('NLS0000065'), //*담당자
          className: 'center',
          width: '130px',
        },
        {
          field: 'kpiTotCnt',
          title: this.$t('NLS0001469'), //*KPI수
          className: 'center',
          width: '75px',
        },
      ];
    },
    onSrch() {
      this[commonTypes.actions.FETCH_COM_KPI_CHART_GRP_LIST]({
        srchParam: this.srchParam,
      });
    },
    onClick(row) {
      row.searchFromYyyymm = this.baseYyyy
        ? this.baseYyyy + '01'
        : new Date().getFullYear().toString() + '01';
      row.searchToYyyymm = this.baseYyyy
        ? this.baseYyyy + '12'
        : new Date().getFullYear().toString() + '12';
      this[commonTypes.actions.FETCH_YEAR_LIST]({});
      this[commonTypes.actions.INIT_SELECTED_CHART_GRP](row);
      this[commonTypes.actions.FETCH_COM_CHART_KPI_DATA](row);
      this[commonTypes.actions.INIT_COM_CHART_GRP_DATA](row);
      this[commonTypes.actions.INIT_VIEWS_DRAW_CHART_POP](true);
    },
    init() {
      this.srchParam = '';
      this[commonTypes.actions.INIT_COM_KPI_CHART_GRP_LIST]([]);
    },
    closePopup() {
      this.init();
      this.$emit('input', false);
    },
  },
};
</script>
