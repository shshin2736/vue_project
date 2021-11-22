<template>
  <div class="page-content-box">
    <div class="hms-grid">
      <com-native-grid
        :data="items"
        :columns="columns"
        :sortable="true"
        :sort="sort"
        :resizable="true"
        scrollable="virtual"
        :skip="skip"
        :total="total"
        height="350"
        @btnclick="onClick"
        @pageChange="onPageChange"
        @headerSortEvent="onHeaderSortEvent"
      ></com-native-grid>
    </div>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderSortCell from '@/components/common/business/HeaderSortCell';
import { userManagementStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
export default {
  name: 'UserGridForm',
  mixins: [userManagementStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      sort: [{ field: 'userName', dir: 'asc' }],
      columns: [],
      skip: 0,
      total: 0,
      items: [],
      func: null,
      sortObj: {},
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getUserList() {
      const data = this[userManagementTypes.getters.GET_USER_LIST];
      return data;
    },
    getSrchParam() {
      return this[userManagementTypes.getters.GET_SRCH_PARAM];
    },
  },
  watch: {
    getUserList: function(value) {
      //? 전체 아이템 수
      this.total = value.length === 0 ? 0 : value[0].totcnt;
      //? 초기 값 설정
      this.items = value.slice(this.skip, this.skip + 15);
    },
    getI18nLocale() {
      this.initColumns();
    },
  },
  created() {
    this[userManagementTypes.actions.FETCH_USER_LIST]({
      srchCountry: 'KR',
    });
    this.getUserList;
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'userId',
          title: this.$t('NLS0000120'), //사용자ID
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'userName',
          title: this.$t('NLS0000221'), //사용자명
          editable: false,
          format: 'button',
          cell: FunctionCell,
          className: 'left', // under-line-btn
          headerCell: HeaderSortCell,
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000348'), //부서명
          editable: false,
          className: 'left', // under-line-btn
          headerCell: HeaderSortCell,
        },
        {
          field: 'typeName',
          title: this.$t('NLS0000122'), //사용자 유형
          editable: false,
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'rankName',
          title: this.$t('NLS0000343'), //직위 -> 직급
          editable: false,
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'dutyName',
          title: this.$t('NLS0000124'), //직책
          editable: false,
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'mboYn',
          title: this.$t('NLS0001292'), //MBO 대상자 여부
          editable: false,
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'activeFlag',
          title: this.$t('NLS0000226'), //Active 상태
          editable: false,
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'retireYn',
          title: this.$t('NLS0000125'), //퇴사여부
          editable: false,
          className: 'center',
          headerCell: HeaderSortCell,
        },
      ];
    },
    async onClick(rowData) {
      await this[userManagementTypes.actions.FETCH_USER_INFO]({
        userId: rowData.userId,
      });
      this[userManagementTypes.actions.FETCH_USER_ROLE_ASSIGN]({
        userId: rowData.userId,
      });
      this.$router.push({
        name: 'userDetailPage',
        params: { auth: this.$route.params.auth, access: true },
      });
    },
    //* 스크롤 페이징 이벤트
    onPageChange(skip) {
      this.skip = skip;
      this.sortHandler();
    },
    //* 헤더 클릭 이벤트
    onHeaderSortEvent(sortObj, func) {
      if (this.sortObj.type && this.sortObj.field !== sortObj.field)
        this.sortObj.type = '';
      this.func = func;
      this.sortObj = sortObj;
      this.sortHandler();
    },
    //* 정렬 이벤트
    sortHandler() {
      let items = this.getUserList.slice(0);
      if (this.sortObj.field)
        items = this.func(
          items.slice(0),
          this.sortObj.field,
          this.sortObj.type,
        );
      this.items = items.slice(this.skip, this.skip + 15);
    },
  },
};
</script>
