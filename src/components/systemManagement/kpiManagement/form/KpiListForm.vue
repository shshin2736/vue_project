<template>
  <div class="">
    <div class="page__btn-tbox">
      <!-- 추가 -->
      <com-button
        type="button"
        class="blue-btn perm_save"
        :auth="$route.params.auth"
        @click="addKpiClick"
      >
        <span>{{ $t('NLS0000067') }}</span>
      </com-button>
    </div>
    <div class="hms-grid">
      <com-native-grid
        :data="getKpiAttrList"
        :columns="columns"
        :pageable="true"
        :skip="skip"
        :take="take"
        :total="total"
        :serverRander="true"
        :sortable="true"
        :sort="sort"
        height="400"
        @pageChange="onPageChange"
        @btnclick="onClick"
      ></com-native-grid>
    </div>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import * as kpiAttrTypes from '@/store/modules/systemManagement/kpiAttribute/types';
import { kpiAttributeStore, commonStore } from '@/mixins';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'kpiListPage',
  mixins: [kpiAttributeStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
  },
  data() {
    return {
      kpiAttrList: [],
      columns: [],
      skip: 0,
      take: 20,
      total: 0,
      sort: [{ field: 'kpiDefNm', dir: 'asc' }],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getKpiAttrList(state) {
      const items = this[kpiAttrTypes.getters.GET_KPI_ATTRIBUTE_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
    getSrchParam() {
      return this[kpiAttrTypes.getters.GET_SRCH_PARAM];
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
          field: 'kpiDefNm',
          title: this.$t('NLS0000056'), //속성명
          className: 'left', // under-line-btn
          format: 'button',
          cell: FunctionCell,
        },
        {
          field: 'kpiAchTypeNm',
          title: this.$t('NLS0000061'), //실적 달성 유형
          className: 'center',
        },
        {
          field: 'kpiPerTypeNm',
          title: this.$t('NLS0000059'), //실적 집계 방식
          className: 'center',
        },
        { field: 'useYn', title: this.$t('NLS0000058'), className: 'center' }, //사용여부
        {
          field: 'kpiCycleNm',
          title: this.$t('NLS0000057'), //측정 주기
          className: 'center',
        },
        { field: 'deptNm', title: this.$t('NLS0000064'), className: 'center' }, //담당부서
        { field: 'userName', title: this.$t('NLS0000065'), className: 'left' }, //담당자
        {
          field: 'kpiDefId',
          title: this.$t('NLS0000055'),
          className: 'center',
        }, //속성정의서ID
        {
          field: 'kpiAccTypeNm',
          title: this.$t('NLS0000060'), //실적 누계 방식
          className: 'center',
        },
      ];
    },
    async onPageChange(skip, take) {
      const params = {
        srchDefId: this.getSrchParam.srchDefId,
        srchDefNm: this.getSrchParam.srchDefNm,
        srchCycle: this.getSrchParam.srchCycle,
        srchUseYn: this.getSrchParam.srchUseYn,
        srchPerType: this.getSrchParam.srchPerType,
        srchAccType: this.getSrchParam.srchAccType,
        srchAchType: this.getSrchParam.srchAchType,
        srchDefDeptId: this.getSrchParam.srchDefDeptId,
        srchDefUserId: this.getSrchParam.srchDefUserId,
        limit: take,
        offset: skip,
      };
      await this[kpiAttrTypes.actions.FETCH_KPI_ATTRIBUTE_LIST](params);
      this.skip = skip;
      this.take = take;
    },
    addKpiClick() {
      this.$router.push({
        name: 'kpiAttrDetailPage',
        params: { auth: this.$route.params.auth },
      });
    },
    async onClick(rowData) {
      this.$router.push({
        name: `kpiAttrDetailPage`,
        params: {
          kpiDefId: rowData.kpiDefId,
          auth: this.$route.params.auth,
        },
      });
    },
  },
};
</script>
