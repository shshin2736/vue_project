<template>
  <div class="page__btn-tbox">
    <!-- 엑셀 다운로드 버튼 -->
    <!-- <com-excel-export-btn
      :data="getExcelData"
      :columns="excelColumns"
      :title="$t('NLS0001285')"
      filename="strategyEstabilshment"
    ></com-excel-export-btn> -->
    <!-- 전년도 전략 체계도 복사 -->
    <com-button
      type="button"
      :auth="$route.params.auth"
      class="blue-btn ml-10 perm_save"
      @click="copyLastStg"
    >
      <span>{{ $t('NLS0001412') }} </span>
    </com-button>
    <!-- 엑셀 등록 버튼 -->
    <com-button
      type="button"
      :auth="$route.params.auth"
      class="white-btn excel-btn perm_save"
      @click="onExcelUpload"
    >
      <span>{{ $t('NLS0001286') }}</span>
    </com-button>
    <!-- 등록 페이지 이동 버튼 -->
    <com-button
      type="button"
      :auth="$route.params.auth"
      class="blue-btn ml-10 perm_save"
      @click="goToNew"
    >
      <!-- 등록 -->
      <span>{{ $t('NLS0000367') }} </span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as commonTypes from '@/store/modules/common/types';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';
import { common } from '@/utils/index';

export default {
  name: 'StrategyEstabilshmentBtnForm',
  mixins: [strategyEstabilshmentStore, commonStore],
  components: {
    ComButton,
  },
  data() {
    return {
      dialogs: false,
      msg: '',
      btnok: '',
      btncancel: '',
      excelData: [],
      excelColumns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getExcelData() {
      return this[strategyEstabilshmentTypes.getters.GET_STRATEGY_EXCEL_DATA];
    },
    getSrchParam() {
      return this[strategyEstabilshmentTypes.getters.GET_STG_SEARCH_INFO];
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
    //* 엑셀 업로드시 파일 파싱
    initColumns() {
      this.excelColumns = [
        {
          field: 'stgNm',
          title: this.$t('NLS0000240'), //전략과제명
          width: '500px',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000703'), //등록부서
          width: '150px',
        },
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //KPI명
          width: '200px',
        },
        {
          field: 'kpiRate',
          title: this.$t('NLS0000244'), //달성율
          width: '50px',
        },
        {
          field: 'kpiDeptNm',
          title: this.$t('NLS0000064'), //담당부서
          width: '150px',
        },
        {
          field: 'kpiManagerNm',
          title: this.$t('NLS0000065'), //담당자
          width: '100px',
        },
        {
          field: 'prjNm',
          title: this.$t('NLS0000151'), //과제명
          width: '200px',
        },
        {
          field: 'prjGrade',
          title: this.$t('NLS0000252'), //등급
          width: '30px',
        },
        {
          field: 'prjRate',
          title: this.$t('NLS0000184'), //진척율
          width: '50px',
        },
        {
          field: 'prjDeptNm',
          title: this.$t('NLS0000064'), //담당부서
          width: '150px',
        },
        {
          field: 'prjManagerNm',
          title: this.$t('NLS0000065'), //담당자
          width: '100px',
        },
      ];
    },
    //* 신규 등록 페이지로 이동
    async goToNew() {
      this.$router.push({
        name: `strategyEstablishmentInput`,
        params: {
          auth: this.$route.params.auth,
          baseYyyy: this.getSrchParam.baseYYYY,
        },
      });
    },
    //* 엑셀 업로드 팝업
    onExcelUpload() {
      //* 전략과제 업로드 양식 가져오기
      this[strategyEstabilshmentTypes.actions.FETCH_UPLOAD_EXCEL_FORM]({
        fileId: 'StrategeExcelform',
        downloadType: 'strategeExcel',
      });

      this[strategyEstabilshmentTypes.actions.INIT_VIEWS_FILES_UPLOAD_POPUP](
        true,
      );
    },
    copyLastStg() {
      //전년도체계도롤 복사하시면 현재 체계도가 변경됩니다. 진행하시겠습니까?
      common.confirm('NLS0001418', async () => {
        const res = await this[
          strategyEstabilshmentTypes.actions.UPDATE_LAST_STG
        ]({
          baseYyyy: this.getSrchParam.baseYYYY,
          lastYear: (this.getSrchParam.baseYYYY - 1).toString(),
          parentDeptId: this.getSrchParam.deptId,
        });
        if (res) common.alert('success', 'NLS0000012');
      });
    },
  },
};
</script>
