<template>
  <div class="hms-grid">
    <com-native-grid
      :data="getUserRole"
      :columns="columns"
      @btnclick="onClick"
      :resizable="true"
      height="300"
      :sortable="true"
      :sort="sort"
    ></com-native-grid>
  </div>
</template>
<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';
export default {
  name: 'UserRoleGridForm',
  mixins: [userManagementStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      sort: [{ field: 'roleId', dir: 'asc' }],
      columns: [],
    };
  },
  computed: {
    getUserRole() {
      return this[userManagementTypes.getters.GET_USER_ROLE];
    },
    getUserInfo() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
  },
  watch: {
    getUserRole: function(value) {
      value.map(i => {
        if (i.createDate != null) {
          i.createDate = timezone.convertToClientTimeZone(i.createDate);
        }
      });
    },
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
          field: 'roleId',
          title: this.$t('NLS0000112'), //권한 코드
          className: 'left',
        },
        {
          field: 'roleNm',
          title: this.$t('NLS0000113'), //권한명
          className: 'left',
        },
        {
          field: 'createUserName',
          title: this.$t('NLS0000080'), //등록자
          width: '200',
          className: 'left',
        },
        {
          field: 'createDate',
          title: this.$t('NLS0000081'), //등록일시
          className: 'center',
        },
        {
          cell: FunctionCell,
          title: this.$t('NLS0000075'), //삭제
          format: 'delete',
          className: 'center perm_delete',
        },
      ];
    },
    onClick(row) {
      const param = { userId: this.getUserInfo.userId, roleId: row.roleId };
      common.confirm('NLS0000004', () => {
        this[userManagementTypes.actions.DELETE_ROLE_ASSIGN](param);
      });
    },
  },
};
</script>
