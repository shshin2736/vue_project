<template>
  <div class="page__btn-tbox">
    <!-- 엑셀 다운로드 버튼 -->
    <com-excel-export-btn
      :data="getExcelData"
      :columns="excelColumns"
      v-if="excelExpShow()"
      filename="qnaList"
    ></com-excel-export-btn>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onClick"
    >
      <!-- 등록 -->
      <span>{{ $t('NLS0000367') }} </span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import ComExcelExportBtn from '@/components/common/global/ComExcelExportBtn';
import { qnaStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';

export default {
  name: 'QnaBtnForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComExcelExportBtn,
    ComButton,
  },
  data() {
    return {
      excelData: [],
      excelColumns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getExcelData() {
      return this[qnaTypes.getters.GET_QNA_EXCEL_DATA];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
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
      this.excelColumns = [
        {
          field: 'country',
          title: this.$t('NLS0000214'), //국가
          width: '70px',
        },
        {
          field: 'bdNo',
          title: this.$t('NLS0000365'), //번호
          width: '100px',
        },
        {
          field: 'bdTitle',
          title: this.$t('NLS0000366'), //제목
          width: '500px',
        },
        {
          field: 'faqType',
          title: this.$t('NLS0000183'), //유형
          width: '100px',
        },
        {
          field: 'status',
          title: this.$t('NLS0000149'), //상태
          width: '90px',
        },
        {
          field: 'createUserInfo',
          title: this.$t('NLS0000948'), //문의부서/문의자
          width: '250px',
        },
        {
          field: 'createDate',
          title: this.$t('NLS0000380'), //문의일자
          width: '100px',
        },
        {
          field: 'answeredUser',
          title: this.$t('NLS0000949'), //답변자
          width: '200px',
        },
        {
          field: 'answeredDate',
          title: this.$t('NLS0000381'), //답변완료일
          width: '100px',
        },
      ];
    },
    //* 등록버튼을 누르는 것은 무조건 새 글 등록이다.
    //* 새글은 '무 조 건' 파일 리스트가 비어야 한다.
    async onClick() {
      await this[qnaTypes.actions.INIT_QNA_DETAIL]({});
      this.$router.push({
        name: 'QnaRegistrationPage',
        params: { auth: this.$route.params.auth },
      });
    },
    excelExpShow() {
      const userType = this.getUserInfo.userType;
      let showYn = false;
      //* 현재 사용자가 운영자인 경우.
      if (userType === 'ADMIN' || userType === 'SUPER') {
        showYn = true;
      } else {
        showYn = false;
      }
      return showYn;
    },
  },
};
</script>
