<template>
  <!-- 기존 kPI로 속성 찾기 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide2">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000957') }}</p>
              <!--기존 KPI로 속성 찾기-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <p class="search__form__title">
                  {{ $t('NLS0000148') }}
                </p>
                <!--KPI명-->
                <span class="input__box type-wide type-nobtn">
                  <input
                    type="text"
                    v-model="searchkpiNm"
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
                :data="getKpiData"
                :sortable="true"
                :sort="sort"
                :columns="columns"
                :pageable="true"
                :skip="skip"
                :take="take"
                :total="total"
                :serverRander="true"
                height="390"
                selectedfield="selected"
                @selected="onSelected"
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
import { kpiTargetEstablishmentStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

export default {
  name: 'KpiExistingDefPopup',
  components: {
    ComNativeGrid,
    ComButton,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      skip: 0,
      take: 10,
      total: 0,
      searchkpiNm: '',
      searchText: '',
      sort: [
        { field: 'kpiNm', dir: 'asc' },
        { field: 'deptNm', dir: 'asc' },
        { field: 'userNm', dir: 'asc' },
      ],
      columns: [],
      views: {
        spinner: true,
      },
    };
  },
  computed: {
    getKpiData(state) {
      let items = this[kpiTargetEstablishmentTypes.getters.GET_EXIST_DEF_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiId',
          title: this.$t('NLS0000255'), //*KPI 코드
          width: '90px',
          className: 'center',
        },
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //*KPI명
          width: '220px',
          className: 'left',
        },
        {
          field: 'kpiAchTypeNm',
          title: this.$t('NLS0000061'), //*실적 달성 유형
          width: '150px',
          className: 'center',
        },
        {
          field: 'kpiPerTypeNm',
          title: this.$t('NLS0000059'), //*실적 집계 방식
          width: '120px',
          className: 'center',
        },
        {
          field: 'kpiAccTypeNm',
          title: this.$t('NLS0000060'), //*실적 누계 방식
          width: '110px',
          className: 'center',
        },
        {
          field: 'kpiCycleNm',
          title: this.$t('NLS0000057'), //*측정주기
          width: '100px',
          className: 'center',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //*담당부서
          width: '130px',
          className: 'center',
        },
        {
          field: 'userNm',
          title: this.$t('NLS0000065'), //*담당자
          width: '110px',
          className: 'center',
        },
      ];
    },
    closePopup() {
      this.searchkpiNm = '';
      this.skip = 0;
      this.take = 10;
      this.$emit('input', false);
    },
    onSelected(row) {
      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_DEF_GROUP_DATA](row);
      this.$emit('input', false);
    },
    searchKpiList() {
      this.skip = 0;
      this.take = 10;
      this[kpiTargetEstablishmentTypes.actions.FETCH_EXIST_DEF_LIST]({
        searchkpiNm: this.searchkpiNm,
        limit: 10,
        offset: 0,
      });
    },
    async onPageChange(skip, take) {
      const params = {
        searchkpiNm: this.searchkpiNm,
        limit: take,
        offset: skip,
      };
      await this[kpiTargetEstablishmentTypes.actions.FETCH_EXIST_DEF_LIST](
        params,
      );
      this.skip = skip;
      this.take = take;
    },
  },
};
</script>
