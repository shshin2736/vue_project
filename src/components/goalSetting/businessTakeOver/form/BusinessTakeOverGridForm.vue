<template>
  <div class="hms-grid">
    <com-native-grid
      :data="getTovList"
      :columns="columns"
      height="430"
      :resizable="true"
      @btnclick="onClick"
      :sortable="true"
      :sort="sort"
    >
    </com-native-grid>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import {
  businessTakeOverStore,
  commonStore,
  userManagementStore,
} from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { timezone, common } from '@/utils';
export default {
  name: 'businessTakeOverGridForm',
  mixins: [businessTakeOverStore, commonStore, userManagementStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      localData: [],
      sort: [{ field: 'reqDate', dir: 'desc' }],
      columns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getTovList() {
      return this[businessTakeOverTypes.getters.GET_TOV_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getTovList: function(value) {
      value.map(i => {
        if (!common.isEmpty(i.tkoDate)) {
          i.tkoDate = timezone.convertToClientTimeZone(i.tkoDate);
        }
        if (!common.isEmpty(i.reqDate)) {
          i.reqDate = timezone.convertToClientTimeZone(i.reqDate);
        }
      });
    },
  },
  created() {
    this.initColumns();
  },
  setPercentage(percentage) {
    return Math.round(this.width / 100) * percentage;
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'tkoType', //구분
          title: this.$t('NLS0000138'),
          className: 'center',
          width: '100px',
        },
        {
          field: 'tkoCnt', //인계 건수
          title: this.$t('NLS0001161'),
          className: 'center',
          width: '80px',
        },
        {
          field: 'takeDeptNm',
          title: this.$t('NLS0000136'), //인계자 부서
          className: 'left',
        },
        {
          field: 'takeUserName', //인계자
          title: this.$t('NLS0000137'),
          cell: FunctionCell,
          format: 'button',
          editor: 'match',
          className: 'left under-line-btn',
          width: '150px',
        },
        {
          field: 'overDeptNm', //인수자 부서
          title: this.$t('NLS0000140'),
          className: 'left',
        },
        {
          field: 'overUserName', //인수자
          title: this.$t('NLS0000141'),
          cell: FunctionCell,
          format: 'button',
          editor: 'match',
          className: 'left under-line-btn',
          width: '150px',
        },
        {
          field: 'tkoStatus', //진행상태
          title: this.$t('NLS0000269'),
          className: 'center',
          width: '140px',
        },
        {
          field: 'reqDate', //인계일자
          title: this.$t('NLS0001162'),
          className: 'center',
        },
        {
          field: 'tkoDate', //인수일자
          title: this.$t('NLS0000142'),
          className: 'center',
        },
      ];
    },
    async onClick(rowData, val, field) {
      const code = common.filterCode(common.getCodeList('TOV002'), 'TREE');
      const isTree = rowData.tkoType === code.cdNm ? true : false;
      this[businessTakeOverTypes.actions.INIT_PARAM](rowData);

      if (isTree) {
        //* 체계도 일 떄
        switch (field) {
          case 'takeUserName':
            this.$router.push({
              name: 'kpiSystemChartTakeOverPage',
              params: {
                auth: this.$route.params.auth,
                access: true,
                param: rowData,
              },
            });
            break;
          case 'overUserName':
            await this[userManagementTypes.actions.FETCH_USER_INFO]({
              userId: rowData.takeUserId,
            });
            this.$router.push({
              name: 'kpiSystemChartOverPage',
              params: {
                auth: this.$route.params.auth,
                baseYyyy: rowData.baseYyyy,
                access: true,
                param: rowData,
              },
            });
            break;
        }
      } else {
        switch (field) {
          case 'takeUserName':
            this[businessTakeOverTypes.actions.FETCH_TAKE_KPI_LIST](rowData);
            this[businessTakeOverTypes.actions.FETCH_TAKE_PRJ_LIST](rowData);
            this[businessTakeOverTypes.actions.INIT_TAKE_TAB](true);
            this[businessTakeOverTypes.actions.INIT_OVER_TAB](false);
            break;
          case 'overUserName':
            this[businessTakeOverTypes.actions.INIT_OVER_TAB](true);
            this[businessTakeOverTypes.actions.INIT_TAKE_TAB](false);
            this[businessTakeOverTypes.actions.FETCH_OVER_KPI_LIST](rowData);
            this[businessTakeOverTypes.actions.FETCH_OVER_PRJ_LIST](rowData);
            this[businessTakeOverTypes.actions.FETCH_MY_KPI_TREE]({
              baseYyyy: rowData.baseYyyy,
            });
            this[businessTakeOverTypes.actions.FETCH_MY_PRJ_LIST]({});
            break;
        }
        this.$router.push({
          name: 'businessTakeOverTabPage',
          params: {
            auth: this.$route.params.auth,
            access: true,
          },
        });
      }
    },
  },
};
</script>
