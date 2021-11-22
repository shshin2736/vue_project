<template>
  <div class="page-content-box">
    <div class="hms-grid">
      <com-native-grid
        :data="getRoleAssign"
        :columns="columns"
        height="400"
        selectedfield="selected"
        selectedtype="checked"
        @checked="onChange"
        @allchecked="all"
        :sortable="true"
        :sort="sort"
      ></com-native-grid>
    </div>
  </div>
</template>
<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { commonStore, userManagementStore } from '@/mixins';
export default {
  name: 'UserGridForm',
  mixins: [commonStore, userManagementStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      columns: [],
      sort: [{ field: 'userName', dir: 'asc' }],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getRoleAssign(state) {
      const data = this[userManagementTypes.getters.GET_USER_ROLE];
      state.total = data.length === 0 ? 0 : data.length;
      return data;
    },
    getSelectedData() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getSelectedData: function(value) {
      if (value.length > 0) {
        this[userManagementTypes.actions.UPDATE_ROLE_ASSIGN]({
          roleId: this.$route.params.roleId,
          list: this.getSelectedData,
        });
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
      }
    },
  },
  created() {
    this.initColumns();
    this[userManagementTypes.actions.FETCH_USER_ROLE_ASSIGN]({
      roleId: this.$route.params.roleId,
    });
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'userId',
          title: this.$t('NLS0000120'), //사용자 ID
          className: 'left',
        },
        {
          field: 'userName',
          title: this.$t('NLS0000221'), //사용자명
          editable: false,
          className: 'left',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000121'), //부서
          className: 'left',
        },

        {
          field: 'typeName',
          title: this.$t('NLS0000122'), //사용자 유형
          editable: false,
          className: 'center',
          width: 170,
        },
        {
          field: 'rankName',
          title: this.$t('NLS0000343'), //직위 -> 직급
          editable: false,
          className: 'center',
          width: 150,
        },
        {
          field: 'dutyName',
          title: this.$t('NLS0000124'), //직책
          editable: false,
          className: 'center',
          width: 150,
        },
        {
          field: 'retireYn',
          title: this.$t('NLS0000125'), //퇴사여부
          editable: false,
          className: 'center',
          width: 120,
        },
      ];
    },
    onChange(row, chk) {
      const obj = this.getRoleAssign;
      obj.reduce((acc, cur) => {
        if (cur.userId === row.userId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    all(rows, chk) {
      const allData = this[userManagementTypes.getters.GET_USER_ROLE];
      allData.map(i => (i.selected = chk));
    },
  },
};
</script>
