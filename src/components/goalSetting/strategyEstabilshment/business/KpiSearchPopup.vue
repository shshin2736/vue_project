<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal">
            <div class="layer-pop__title">
              <!-- KPI 목록 KPI 검색-->
              <p>
                {{ from === 'dashboard' ? $t('NLS0000477') : $t('NLS0001093') }}
              </p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <!-- KPI명 -->
                <p class="search__form__title">
                  {{ $t('NLS0000148') }}
                </p>
                <span class="input__box type-wide type-nobtn">
                  <com-input-text
                    rules=""
                    v-model="kpiName"
                    @enter="kpiSearch"
                  ></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <button type="button" class="search__btn" @click="kpiSearch">
                  <!-- 검색 -->
                  <span>{{ $t('NLS0000253') }}</span>
                </button>
              </div>
            </div>
            <div class="hms-grid">
              <!-- 공통 켄도 네이티브 그리드 컴포넌트 -->
              <com-native-grid
                :data="items"
                :columns="strategyEstabilshmentColumns"
                :total="totalCnt"
                :skip="skip"
                scrollable="virtual"
                selectedfield="selected"
                selectedtype="checked"
                height="500"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
                @pageChange="onPageChange"
              >
              </com-native-grid>
            </div>
            <div class="layer__btn-box">
              <button type="button" class="blue-btn" @click="addKpi">
                <!-- 저장 추가-->
                <span>{{
                  from === 'dashboard' ? $t('NLS0000074') : $t('NLS0000067')
                }}</span>
              </button>
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
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'KpiSearch',
  mixins: [strategyEstabilshmentStore, commonStore],
  components: {
    ComNativeGrid,
    ComInputText,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    from: {
      type: String,
      required: false,
      default: 'strategyEstabilshment',
    },
  },
  data() {
    return {
      kpiName: '', //* 검색 문자열
      //* 데이터 리스트
      selectedRow: [],
      skip: 0,
      totalCnt: 0,
      kpiSearchList: [],
      items: [],
      //* 컬럼 정보
      strategyEstabilshmentColumns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getKpiSerachData() {
      return this[strategyEstabilshmentTypes.getters.GET_KPI_SEARCH_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getKpiSerachData(value) {
      this.kpiSearchList = value;
      this.skip = 0;
      this.totalCnt = this.kpiSearchList.length;
      this.items = this.kpiSearchList.slice(this.skip, this.skip + 15);
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.strategyEstabilshmentColumns = [
        {
          field: 'kpiId',
          title: this.$t('NLS0000255'), //KPI코드
          width: '90px',
          className: 'right',
        },
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //KPI명
          width: '300px',
          className: 'left',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //담당부서
          width: '146px',
          className: 'left',
        },
        {
          field: 'managerName',
          title: this.$t('NLS0000065'), //담당자
          width: '146px',
          className: 'left',
        },
        {
          field: 'kpiUnitNm',
          title: this.$t('NLS0000063'), //단위
          width: '80px',
          className: 'left',
        },
      ];
    },
    //* 팝업 초기화
    popupInit() {
      this.kpiName = '';
      // this.selectedRow = [];
      this[strategyEstabilshmentTypes.actions.INIT_KPI_SEARCH_LIST]([]);
      this.$emit('input', false);
    },
    //* KPI 조회 이벤트
    kpiSearch() {
      const param = {
        searchKpiNm: this.kpiName,
      };
      this[strategyEstabilshmentTypes.actions.FETCH_KPI_SEARCH_LIST](param);
    },
    clickCheckBox(item, checked) {
      this.items.find((o, i) => {
        if (o.kpiId === item.kpiId) {
          this.items[i].selected = checked;
          return true; // stop searching
        }
      });
    },
    clickAllCheckBox(_, checked) {
      this.kpiSearchList.forEach(element => {
        element.selected = checked;
      });
    },
    addKpi() {
      // 추가하시겠습니까?
      common.confirm(this.$t('NLS0000934'), () => {
        // const INIT_KPI_INFO = this[
        //   strategyEstabilshmentTypes.actions.INIT_KPI_INFO
        // ];
        var selectedKpiList = this.kpiSearchList.filter(item => {
          if (item.selected === undefined || !item.selected) {
            return false;
          } else {
            return true;
          }
        });
        this[strategyEstabilshmentTypes.actions.INIT_KPI_INFO](selectedKpiList);
        // const selectedRow = this.selectedRow;
        // INIT_KPI_INFO(selectedRow);
        const POPUPINIT = this.popupInit;
        POPUPINIT();
      });
    },
    //* 페이징 처리
    onPageChange(skip) {
      this.skip = skip;
      this.items = this.kpiSearchList.slice(this.skip, this.skip + 15);
    },
  },
};
</script>
