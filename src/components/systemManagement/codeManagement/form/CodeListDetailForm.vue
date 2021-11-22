<template>
  <div>
    <div class="page__btn-tbox">
      <!-- 코드 정보	 -->
      <div class="btn-box-title">
        {{ $t('NLS0000099') }}
      </div>
      <!-- 코드 추가 -->
      <com-button
        type="button"
        class="blue-btn perm_save"
        :auth="$route.params.auth"
        @click="openAddPopup"
      >
        <span>{{ $t('NLS0000785') }}</span>
      </com-button>
      <!-- 
      <button type="button" class="blue-btn" @click="openAddPopup">
        <span>{{ $t('NLS0000785') }}</span>
      </button> -->
    </div>
    <div class="hms-grid">
      <com-native-grid
        :data="getCodeList"
        :columns="columns"
        height="550"
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
import { common } from '@/utils';
import * as codeTypes from '@/store/modules/systemManagement/codeManagement/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'codeListDetailPage',
  mixins: [codeManagementStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
  },
  data() {
    return {
      grpInfo: [],
      codeList: [],
      GV_GRP_CD: '',
      columns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getGrpInfo() {
      const items = [];
      return items;
    },
    getCodeList() {
      return this[codeTypes.getters.GET_CODE_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
  },
  created() {
    this.initColumns();
    if (!common.isEmpty(this.$route.params.grpCd)) {
      const params = { grpCd: this.$route.params.grpCd };
      this[codeTypes.actions.FETCH_CODE_LIST](params);
    } else {
      this[codeTypes.actions.INIT_CODE_LIST]([]);
    }
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'cd',
          title: this.$t('NLS0000797'), //코드
          width: 150,
          format: 'button',
          cell: FunctionCell,
          className: 'under-line-btn',
        },
        // { field: 'cdNmKo', title: this.$t('NLS0000085'), className: 'left' }, //코드명(KO)
        // { field: 'cdNmEn', title: this.$t('NLS0000086'), className: 'left' }, //코드명(EN)
        // { field: 'cdNmZh', title: this.$t('NLS0000087'), className: 'left' }, //코드명(ZH)
        {
          field: 'sortNo',
          title: this.$t('NLS0000084'), //순서
          width: 70,
          className: 'center',
        },
        {
          field: 'useYn',
          title: this.$t('NLS0000058'), //사용여부
          width: 100,
          className: 'center',
        },
      ];
      const langList = common.getCodeList('G05');
      const objList = [];
      langList.forEach(el => {
        const cd = el.cd;
        const sliceStr = cd.slice(0, -1);
        const toLowser = sliceStr + cd.charAt(cd.length - 1).toLowerCase();
        const obj = {
          field: `cdNm${toLowser}`,
          title: this.$t('NLS0000800') + `(${el.cd})`, //코드명
          className: 'left',
        };
        objList.push(obj);
      });
      this.columns.splice(1, 0, ...objList);
    },
    async onClick(rowData) {
      await this[codeTypes.actions.INIT_CODE_INFO](rowData);
      this[codeTypes.actions.INIT_VIEWS_CODE_INFO_POPUP](true);
    },
    async openAddPopup() {
      if (this.$route.params.grpCd != undefined) {
        await this[codeTypes.actions.INIT_CODE_INFO]({});
        this[codeTypes.actions.INIT_VIEWS_CODE_INFO_POPUP](true);
      } else {
        //그룹코드 정보를 먼저 등록해주세요
        common.alert('warning', 'NLS0001055');
      }
    },
  },
};
</script>
