<template>
  <div class="page-content-box">
    <div class="hms-grid">
      <com-native-grid
        :data="getRoleList"
        :columns="columns"
        height="500"
        @btnclick="onClick"
        :sortable="true"
        :sort="sort"
      >
      </com-native-grid>
    </div>
  </div>
</template>
<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import { roleManagementStore, commonStore } from '@/mixins';
import { common } from '@/utils';
export default {
  name: 'RoleGrid',
  mixins: [roleManagementStore, commonStore],
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
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getRoleList() {
      const data = this[roleManagementTypes.getters.GET_USER_ROLE_LIST];
      data.reduce((acc, cur) => {
        cur.menu = this.$t('NLS0001164'); //메뉴 설정
        cur.user = this.$t('NLS0001133'); //사용자 설정
      }, []);
      return data;
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
          field: 'roleId',
          title: this.$t('NLS0000112'), //권한 코드
          cell: FunctionCell,
          format: 'button',
          className: 'center under-line-btn',
        },
        {
          field: 'useYnNm',
          title: this.$t('NLS0000058'), //사용여부
          className: 'center',
          width: '100',
        },
        {
          field: 'menu',
          title: this.$t('NLS0001164'), //메뉴 설정
          cell: FunctionCell,
          format: 'button',
          className: 'black-btn ellipsis center',
          width: '200',
        },
        {
          field: 'user',
          title: this.$t('NLS0001133'), //사용자 설정
          cell: FunctionCell,
          className: 'black-btn ellipsis center',
          format: 'button',
          width: '200',
        },
      ];
      const langList = common.getCodeList('G05');
      const objList = [];
      langList.forEach(el => {
        const cd = el.cd;
        const sliceStr = cd.slice(0, -1);
        const toLowser = sliceStr + cd.charAt(cd.length - 1).toLowerCase();
        const obj = {
          field: `roleNm${toLowser}`,
          title: this.$t('NLS0001163') + `(${el.cd})`, //권한그룹 명
          className: 'center',
        };
        objList.push(obj);
      });
      this.columns.splice(1, 0, ...objList);
    },
    onClick(rowData, value, field) {
      switch (field) {
        case 'user':
          this.$router.push({
            name: 'userAssignPage',
            params: {
              auth: this.$route.params.auth,
              roleId: rowData.roleId,
              access: true,
            },
          });
          break;
        case 'menu':
          this.$router.push({
            name: 'menuAssignPage',
            params: {
              auth: this.$route.params.auth,
              roleId: rowData.roleId,
              access: true,
            },
          });
          break;
        case 'roleId':
          this[roleManagementTypes.actions.INIT_ROLE_INFO](rowData);
          this[roleManagementTypes.actions.INIT_VIEWS_ROLE_ADD_POPUP](true);
      }
    },
  },
};
</script>
