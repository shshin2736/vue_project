<template>
  <com-overlay v-model="value">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middlesmall">
            <div class="layer-pop__title">
              <!-- 직원 검색 -->
              <p>{{ $t('NLS0001094') }}</p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <!-- 부서/직원명 -->
                <p class="search__form__title">
                  {{ $t('NLS0000126') }}
                </p>
                <span class="input__box type-wide type-nobtn">
                  <com-input-text rules="" v-model="name"></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <button type="button" class="search__btn">
                  <!-- 검색 -->
                  <span>{{ $t('NLS0001094') }}</span>
                </button>
              </div>
            </div>
            <div class="hms-grid type-nomargin">
              <!-- 공통 켄도 네이티브 그리드 컴포넌트 -->
              <com-native-grid
                :data="result"
                :columns="columns"
                :sortable="true"
                :sort="sort"
                selectedfield="selected"
                height="250"
                @selected="onSelected"
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
import ComInputText from '@/components/common/global/ComInputText';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'ManagerSearch',
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
  },
  data() {
    return {
      name: '', //* 검색 문자열
      //* 데이터 리스트
      result: [
        {
          department: '영업1팀',
          position: '대리',
          name: '홍길동',
        },
        {
          department: '영업2팀',
          position: '사원',
          name: '김철수',
        },
      ],
      sort: [{ field: 'department', dir: 'asc' }], //* 정렬 데이터
      //* 컬럼 데이터
      columns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
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
        {
          field: 'department',
          title: this.$t('NLS0000121'), //부서
        },
        {
          field: 'name',
          title: this.$t('NLS0000342'), //이름
          width: '146px',
        },
        {
          field: 'position',
          title: this.$t('NLS0000124'), //직책
          width: '146px',
        },
      ];
    },
    popupInit() {
      this.$emit('input', false);
    },
    //* 선택 이벤트
    onSelected(row) {
      this[strategyEstabilshmentTypes.actions.INIT_MANAGER_NAME](row.name);
      this.$emit('input', false);
    },
  },
};
</script>
