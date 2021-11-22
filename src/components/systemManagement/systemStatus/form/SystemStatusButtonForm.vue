<template>
  <div class="page__btn-mbox">
    <com-excel-export-btn
      :data="getResult"
      :columns="getColumns"
      :title="$t('NLS0000790')"
      :filename="`${this.tab}`"
    ></com-excel-export-btn>
  </div>
</template>

<script>
import ComExcelExportBtn from '@/components/common/global/ComExcelExportBtn';
import { systemStatusStore } from '@/mixins';
import * as systemStatusTypes from '@/store/modules/systemManagement/systemStatus/types';

export default {
  name: 'SystemStatusButtonForm',
  mixins: [systemStatusStore],
  components: {
    ComExcelExportBtn,
  },
  props: {
    tab: {
      type: String,
      required: true,
    },
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
      if (columns[0]) state.sort = [{ field: columns[0].field, dir: '' }];
      return columns;
    },
    getResult(state) {
      return state.tab === 'systemAvg'
        ? this[systemStatusTypes.getters.GET_SYS_CON_AVG_GRID]
        : state.tab === 'moduleUse'
        ? this[systemStatusTypes.getters.GET_MODULE_RATE_GRID]
        : state.tab === 'efficiency'
        ? this[systemStatusTypes.getters.GET_IMPL_RATE_GRID]
        : this[systemStatusTypes.getters.GET_DOWNLOAD_LOG_GRID];
    },
  },
};
</script>
