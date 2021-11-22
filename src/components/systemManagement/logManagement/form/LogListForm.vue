<template>
  <div class="page-content-box">
    <div class="hms-grid">
      <com-native-grid
        :data="getLogList"
        :columns="columns"
        :pageable="true"
        :skip="skip"
        :take="take"
        :total="total"
        :height="500"
        :serverRander="true"
        @btnclick="onClick"
        @selected="onSelected"
        @pageChange="onPageChange"
      ></com-native-grid>
    </div>
  </div>
</template>
<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { logManagementStore } from '@/mixins';
import * as logTypes from '@/store/modules/systemManagement/logManagement/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import { timezone } from '@/utils';
export default {
  name: 'LogListForm',
  mixins: [logManagementStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      columns: [
        {
          field: 'userId',
          editable: false,
          title: 'User ID',
          className: 'left',
        },
        { field: 'executionTime', editable: true, title: 'Execution Time' },
        { field: 'url', editable: true, title: 'url', className: 'left' },
        { field: 'agent', editable: true, title: 'Agent', className: 'left' },
        { field: 'os', editable: true, title: 'os', className: 'left' },
        {
          field: 'connectionIp',
          editable: true,
          title: 'Connection IP',
          className: 'left',
        },
        // { field: 'errMsg', editable: true, title: 'Error Message' },
        {
          field: 'errMsg',
          title: 'Error Message',
          width: '116px',
          className: 'left analysis-btn',
          format: 'pupupButton',
          cell: FunctionCell,
        },
        {
          field: 'startDate',
          editable: true,
          title: 'Request Date',
          className: 'center',
        },
      ],
      skip: 0,
      take: 20,
      total: 0,
    };
  },
  computed: {
    getLogList(state) {
      const items = this[logTypes.getters.GET_LOG_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      const res = items.reduce((acc, cur) => {
        if (cur.startDate != null) {
          cur.startDate = timezone.convertToClientTimeZone(
            cur.startDate,
            'YYYY-MM-DD HH:MM:SS',
          );
        }
        acc.push(cur);
        return acc;
      }, []);

      return res;
    },
    getTotalCnt() {
      const logList = this.getLogList;
      return logList[0].totcnt;
    },
  },
  methods: {
    onSelected(row) {
      this.$emit('selected', row);
    },
    async onPageChange(skip, take) {
      const params = {
        userId: this.srchId,
        userName: this.srchNm,
        limit: take,
        offset: skip,
      };
      await this[logTypes.actions.FETCH_LOG_LIST](params);
      this.skip = skip;
      this.take = take;
    },
    async onClick(rowData, value, field) {
      switch (field) {
        case 'errMsg':
          alert(rowData.errMsg);
          // await this[userManagementTypes.actions.FETCH_USER_ROLE_ASSIGN]({
          //   userId: rowData.userId,
          // });
          // this[userManagementTypes.actions.INIT_VIEWS_USER_ROLE_ASSIGN_POPUP](
          //   true,
          // );
          break;
      }
    },
  },
};
</script>
