<template>
  <!-- kPI 속성그룹 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000405') }}</p>
              <!--KPI속성그룹-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <p class="search__form__title">
                  {{ $t('NLS0000419') }}
                </p>
                <!--KPI 속성그룹명-->
                <span class="input__box type-wide type-nobtn">
                  <input
                    type="text"
                    v-model="searchDefNm"
                    @keyup.enter="searchKpiList"
                  />
                </span>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="searchKpiList"
                >
                  <span>{{ $t('NLS0000253') }}</span
                  ><!--검색-->
                </com-button>
              </div>
            </div>
            <div class="hms-grid type-nomargin">
              <com-native-grid
                :data="getKpiDefData"
                :sortable="true"
                :sort="sort"
                :columns="columns"
                height="485"
                @btnclick="onSelected"
                :pageable="true"
                :skip="skip"
                :take="take"
                :total="total"
                :serverRander="true"
                @pageChange="onPageChange"
              >
              </com-native-grid>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
  name: 'KpiSearchDefGroupPopup',
  mixins: [kpiTargetEstablishmentStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
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
      skip: 0,
      take: 20,
      total: 0,
      searchDefNm: '',
      sort: [{ field: 'kpiDefNm', dir: 'asc' }],
      columns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getKpiDefData(state) {
      let items = this[
        kpiTargetEstablishmentTypes.getters.GET_KPI_DEF_GROUP_LIST
      ];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        { field: 'kpiDefId', title: '', width: '0px' },
        {
          field: 'kpiDefNm',
          title: this.$t('NLS0000069'), //*KPI 속성 -> KPI속성명
          className: 'left',
          format: 'button',
          cell: FunctionCell,
        },
      ];
    },
    onSelected(row) {
      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_DEF_GROUP_DATA](row);
      this.closePopup();
    },
    searchKpiList() {
      this.skip = 0;
      this.take = 20;
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_DEF_GROUP_LIST]({
        ...this[kpiTargetEstablishmentTypes.getters.GET_SEARCH_KPI_CUSTOM_DATA],
        searchDefNm: this.searchDefNm,
      });
    },
    async onPageChange(skip, take) {
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_DEF_GROUP_LIST]({
        searchDefNm: this.searchDefNm,
        limit: take,
        offset: skip,
        ...this[kpiTargetEstablishmentTypes.getters.GET_SEARCH_KPI_CUSTOM_DATA],
      });
      this.skip = skip;
      this.take = take;
    },
    closePopup() {
      this.skip = 0;
      this.take = 20;
      this.searchDefNm = '';
      this.$emit('input', false);
    },
  },
};
</script>
