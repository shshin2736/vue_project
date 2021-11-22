<template>
  <div>
    <div class="page__btn-tbox">
      <!-- 그룹코드 추가 -->
      <com-button
        type="button"
        class="blue-btn perm_save"
        :auth="$route.params.auth"
        @click="addGroupClick"
      >
        <span>{{ $t('NLS0000079') }}</span>
      </com-button>
    </div>
    <div class="hms-grid">
      <com-native-grid
        :data="items"
        :columns="columns"
        scrollable="virtual"
        :skip="skip"
        :total="total"
        height="435"
        @pageChange="onPageChange"
        @btnclick="onClick"
      ></com-native-grid>
    </div>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import { codeManagementStore, commonStore } from '@/mixins';
import * as codeTypes from '@/store/modules/systemManagement/codeManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { timezone } from '@/utils';

export default {
  name: 'commonCodeListPage',
  mixins: [codeManagementStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
  },
  data() {
    return {
      grpCodeList: [],
      codeList: [],
      GV_GRP_CD: '',
      columns: [],
      skip: 0,
      total: 0,
      take: 15,
      items: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getGrpCodeList(state) {
      const items = this[codeTypes.getters.GET_GRP_CODE_LIST];
      const res = items.map(item => {
        const obj = { ...item };
        if (obj.createDate != null) {
          obj.createDate = timezone.convertToClientTimeZone(
            obj.createDate,
            'YYYY-MM-DD HH:MM:SS',
          );
        }
        if (obj.updateDate != null) {
          obj.updateDate = timezone.convertToClientTimeZone(
            obj.updateDate,
            'YYYY-MM-DD HH:MM:SS',
          );
        }
        return obj;
      });
      state.total = res.length === 0 ? 0 : res[0].totcnt;
      return res;
    },
    getSrchParam() {
      return this[codeTypes.getters.GET_SRCH_PARAM];
    },
  },
  watch: {
    getI18nLocale: function() {
      this.initColumns();
    },
    getGrpCodeList: function(value) {
      this.items = value.slice(this.skip, this.skip + this.take);
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'grpCd',
          title: this.$t('NLS0000076'), //그룹코드
          format: 'button',
          cell: FunctionCell,
          className: 'center', //under-line-btn
        },
        { field: 'grpNm', title: this.$t('NLS0000078'), className: 'center' }, //그룹코드명
        { field: 'useYnNm', title: this.$t('NLS0000058'), className: 'center' }, //사용여부
        {
          field: 'createUser',
          title: this.$t('NLS0000080'), //등록자
          className: 'left',
        },
        {
          field: 'createDate',
          title: this.$t('NLS0000081'), //등록일시
          className: 'center',
        },
        {
          field: 'updateUser',
          title: this.$t('NLS0000082'), //수정자
          className: 'left',
        },
        {
          field: 'updateDate',
          title: this.$t('NLS0000083'), //수정일시
          className: 'center',
        },
      ];
    },
    addGroupClick() {
      this.$router.push({
        name: `codeListrDetailPage`,
        params: {
          auth: this.$route.params.auth,
          type: 'new',
        },
      });
    },
    async onClick(rowData) {
      this.$router.push({
        name: `codeListrDetailPage`,
        params: {
          grpCd: rowData.grpCd,
          auth: this.$route.params.auth,
        },
      });
    },
    async onPageChange(skip) {
      this.skip = skip;
      this.items = this.getGrpCodeList.slice(this.skip, this.skip + this.take);
    },
    onSave(row) {
      if (row.grpCd) {
        this[codeTypes.actions.UPDATE_GRP_CODE_LIST]({
          data: this.getGrpCodeList,
        });
      } else {
        this.grpCodeList = this.getGrpCodeList;
        this.grpCodeList.push(row);
        this[codeTypes.actions.INSERT_GRP_CODE_LIST]({
          data: this.grpCodeList,
        });
      }
    },
  },
};
</script>
