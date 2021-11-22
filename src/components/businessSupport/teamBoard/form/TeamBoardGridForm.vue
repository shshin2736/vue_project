<template>
  <div class="page-content-box">
    <div class="hms-grid perm_read">
      <com-native-grid
        :data="getTeamBoardList"
        :columns="columns"
        :pageable="true"
        :skip="skip"
        :take="take"
        :total="total"
        :serverRander="true"
        height="400"
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
import { teamBoardStore, commonStore } from '@/mixins';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'TeamBoardGridForm',
  mixins: [teamBoardStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      isNew: '',
      columns: [],
      sort: [{ field: 'idx', dir: 'asc' }],
      skip: 0,
      take: 10,
      total: 0,
    };
  },
  computed: {
    getTeamBoardList(state) {
      const items = this[teamBoardTypes.getters.GET_TEAM_BOARD_LIST];
      state.total = items.length === 0 ? 0 : items[0].totCnt;
      return items;
    },
    getSrchParam() {
      return this[teamBoardTypes.getters.GET_TBD_SRCH_PARAM];
    },
    userInfo() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
  },
  watch: {
    getTeamBoardList: function(items) {
      items.forEach(item => {
        // const isNew = common.isNew(item);
        if (item.isNew === 'new')
          item.bdTitle = {
            title: item.bdTitle,
            icon: true,
            files: item.fileYn === 'Y' ? true : false,
          };
        else
          item.bdTitle = {
            title: item.bdTitle,
            icon: false,
            files: item.fileYn === 'Y' ? true : false,
          };
      });
    },
  },
  async created() {
    this.initColumns();
    await this.setDefault();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'idx',
          title: this.$t('NLS0000365'), //번호
          width: '70px',
          className: 'center',
        },
        {
          field: 'bdTitle',
          title: this.$t('NLS0000366'), //제목
          format: 'button',
          cell: FunctionCell,
          editor: 'new',
          width: '570px',
          className: 'left',
        },
        {
          field: 'shCount',
          title: this.$t('NLS0000374'), //조회수
          width: '120px',
          className: 'center',
        },
        {
          field: 'userName',
          title: this.$t('NLS0000080'), //등록자
          width: '160px',
          className: 'center',
        },
        {
          field: 'createDate',
          title: this.$t('NLS0000368'), //등록일
          width: '150px',
          className: 'center',
        },
        {
          field: 'buOpenYn',
          title: this.$t('NLS0000953'), //BU 공개
          width: '75px',
          className: 'center',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000703'), //등록부서
          width: '160px',
          className: 'center',
        },

        {
          field: 'updateDate',
          title: this.$t('NLS0000375'), //수정일
          width: '150px',
          className: 'center',
        },
      ];
    },
    setDefault() {
      if (!common.isEmpty(this.getSrchParam)) {
        this.skip = this.getSrchParam.offset;
        this.take = this.getSrchParam.limit;
      }
    },
    onClick(rowData) {
      if (rowData.createUser === this.userInfo.userId) {
        this.$router.push({
          name: 'TeamBoardRegistrationPage',
          params: {
            auth: this.$route.params.auth,
            access: true,
            param: rowData,
            bdId: rowData.bdId,
            myPost: true,
          },
        });
      } else {
        this.$router.push({
          name: 'TeamBoardDetailPage',
          params: {
            auth: this.$route.params.auth,
            bdId: rowData.bdId,
            access: true,
          },
        });
      }
    },
    async onPageChange(skip, take) {
      const params = {
        srchCombo: this.getSrchParam.srchCombo,
        srchKeyword: this.getSrchParam.srchKeyword,
        limit: take,
        offset: skip,
      };
      this[teamBoardTypes.actions.INIT_TBD_SRCH_PARAM](params);
      await this[teamBoardTypes.actions.FETCH_TEAM_BOARD_LIST](params);
      this.skip = skip;
      this.take = take;
    },
  },
};
</script>
