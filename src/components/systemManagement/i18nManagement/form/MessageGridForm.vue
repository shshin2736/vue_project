<template>
  <div class="page-content-box">
    <div class="hms-grid">
      <com-native-grid
        :data="getMessageList"
        :columns="columns"
        :pageable="true"
        :skip="skip"
        :take="take"
        :total="total"
        :resizable="true"
        height="400"
        :serverRander="true"
        @btnclick="onClick"
        @pageChange="onPageChange"
        :sortable="true"
        :sort="sort"
      ></com-native-grid>
    </div>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import { i18nManagementStore, commonStore } from '@/mixins';
import * as i18nManagementTypes from '@/store/modules/systemManagement/i18nManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';
export default {
  name: 'MessageGridForm',
  mixins: [i18nManagementStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      sort: [{ field: 'compId', dir: 'asc' }],
      columns: [],
      skip: 0,
      take: 10,
      total: 0,
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getMessageList(state) {
      const items = this[i18nManagementTypes.getters.GET_MESSAGE_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
    getSrchParam() {
      return this[i18nManagementTypes.getters.GET_SRCH_PARAM];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getSrchParam() {
      this.skip = 0;
      this.take = 10;
    },
  },
  async created() {
    this.initColumns();
    await this[i18nManagementTypes.actions.FETCH_MESSAGE_LIST]({
      limit: this.take,
      offset: this.skip,
    });
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'compType',
          title: this.$t('NLS0000091'), //메시지유형
          className: 'center',
          width: 110,
        },
        {
          field: 'compId',
          title: this.$t('NLS0000092'), //메시지 ID
          format: 'button',
          cell: FunctionCell,
          className: 'center under-line-btn',
          width: 160,
        },
        // { field: 'textKo', title: this.$t('NLS0000093'), className: 'left' }, //메시지(KO)
        // { field: 'textEn', title: this.$t('NLS0000094'), className: 'left' }, //메시지(EN))
        // { field: 'textZh', title: this.$t('NLS0000095'), className: 'left' }, //메시지(ZH)
      ];
      const langList = common.getCodeList('G05');
      langList.forEach(el => {
        const cd = el.cd;
        const sliceStr = cd.slice(0, -1);
        const toLowser = sliceStr + cd.charAt(cd.length - 1).toLowerCase();
        const obj = {
          field: `text${toLowser}`,
          title: this.$t('NLS0000707') + `(${el.cd})`, //메시지
          className: 'left',
        };
        this.columns.push(obj);
      });
    },
    async onPageChange(skip, take) {
      const params = {
        srchMsgType: this.getSrchParam.srchMsgType,
        srchMsgId: this.getSrchParam.srchMsgId,
        srchMsg: this.getSrchParam.srchMsg,
        limit: take,
        offset: skip,
      };
      await this[i18nManagementTypes.actions.FETCH_MESSAGE_LIST](params);
      this.skip = skip;
      this.take = take;
    },
    onClick(e) {
      this[i18nManagementTypes.actions.FETCH_MESSAGE_INFO]({
        compId: e.compId,
        param: this.getSrchParam,
      });
      this[i18nManagementTypes.actions.INIT_VIEWS_MESSAGE_UPDATE_POPUP](true);
    },
  },
};
</script>
