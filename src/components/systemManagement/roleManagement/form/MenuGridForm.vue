<template>
  <div class="page-content-box">
    <div class="hms-grid">
      <com-native-grid
        :data="getRoleMenuList"
        :columns="columns"
        height="550"
        selectedfield="selected"
        selectedtype="checked"
        @checked="onChange"
        @onCheck="checked"
        @allchecked="all"
        :sortable="true"
        :sort="sort"
      ></com-native-grid>
    </div>
  </div>
</template>
<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { roleManagementStore, commonStore } from '@/mixins';
import FunctionCell from '@/components/common/business/FunctionCell';
export default {
  name: 'MenuGrid',
  mixins: [roleManagementStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      checkedData: [],
      columns: [],
      sort: [{ field: 'roleMenuNm', dir: 'asc' }],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getRoleMenuList() {
      return this[roleManagementTypes.getters.GET_ROLE_MEMU_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
  },
  created() {
    this.initColumns();
    this[roleManagementTypes.actions.FETCH_ROLE_MEMU_LIST]({
      roleId: this.$route.params.roleId,
    });
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'roleMenuNm',
          title: this.$t('NLS0000708'), //메뉴
          editable: false,
          className: 'left',
        },
        {
          field: 'pageUrl',
          title: 'URL',
          editable: false,
          className: 'left',
        },
        {
          field: 'readYn',
          title: 'Read ',
          editable: false,
          format: 'check',
          cell: FunctionCell,
          className: 'center',
        },
        {
          field: 'downYn',
          title: 'Download ',
          editable: false,
          format: 'check',
          cell: FunctionCell,
          className: 'center',
        },
        {
          field: 'saveYn',
          title: 'Save',
          editable: false,
          format: 'check',
          cell: FunctionCell,
          className: 'center',
        },
        {
          field: 'deleteYn',
          title: 'Delete',
          editable: false,
          format: 'check',
          cell: FunctionCell,
          className: 'center',
        },
      ];
    },
    onChange(row, chk) {
      const obj = this.getRoleMenuList;
      obj.reduce((acc, cur) => {
        if (cur.menuId === row.menuId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    checked(item, chk, field) {
      const data = this.getRoleMenuList;
      data.reduce((acc, cur) => {
        if (cur.menuId === item.menuId) {
          if (chk === true) {
            cur[field] = 'Y';
          } else {
            cur[field] = 'N';
          }
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    all(rows, chk) {
      const obj = this.getRoleMenuList;
      obj.map(i => (i.selected = chk));
    },
  },
};
</script>
