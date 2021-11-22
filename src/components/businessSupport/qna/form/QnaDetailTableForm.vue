<template>
  <div class="res-table">
    <validation-observer
      tag="div"
      ref="obs"
      v-slot="{ invalid, validated, errors }"
    >
      <div class="res-table__body">
        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000366') }} <span class="required-text">*</span>
          </div>
          <div class="res-table__col">
            <div class="grid-input-form type1 type-nobtn">
              <com-input-text
                rules="required"
                v-model="getQnaDetail.bdTitle"
                :isReadOnly="disabledYn"
              ></com-input-text>
            </div>
          </div>
        </div>

        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000183') }}
          </div>
          <div class="res-table__col">
            <!-- 시스템 이용 -->
            <span class="radio-form">
              <com-input-text
                type="radio"
                name="scrhFaqType"
                id="qna-reg1"
                value="S"
                :check="getQnaDetail.faqType === 'S' ? true : false"
                labelId="qna-reg1"
                :labelTitle="$t('NLS0000383')"
                labelClass="title"
                :disabled="disabledYn"
                @change="onChkChange"
              />
            </span>
            <!-- 오류 접수 -->
            <span class="radio-form">
              <com-input-text
                type="radio"
                name="scrhFaqType"
                id="qna-reg2"
                value="E"
                :check="getQnaDetail.faqType === 'E' ? true : false"
                labelId="qna-reg2"
                :labelTitle="$t('NLS0000384')"
                labelClass="title"
                :disabled="disabledYn"
                @change="onChkChange"
              />
            </span>
          </div>

          <div class="res-table__col res-table__col--head">
            <!-- 시스템 이용 -->
            <span class="radio-form">
              {{ $t('NLS0000382') }}
            </span>
          </div>
          <div class="res-table__col">
            <!-- 오류 접수 -->
            <span class="radio-form">
              <com-dropdowns
                :data="BOD_004"
                v-model="selectedMenu"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                :disabled="disabledYn"
              ></com-dropdowns>
            </span>
          </div>
        </div>

        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000080') }}
          </div>
          <div class="res-table__col">
            {{ getQnaDetail.createUserInfo }}
          </div>
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000368') }}
          </div>
          <div class="res-table__col">
            {{ getQnaDetail.createDate }}
          </div>
        </div>

        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000371') }}<span class="required-text">*</span>
          </div>
          <div class="res-table__col">
            <com-ck-editor
              types="classic"
              v-model="bdContent"
              :disable="disabledYn"
              rules="required"
            ></com-ck-editor>
          </div>
        </div>

        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000905') }}
          </div>
          <div class="res-table__col">
            <div class="hms-upload">
              <com-upload-file
                :drag="true"
                :toolbar="true"
                :multiple="true"
                :ownerObjectId="qnaDetailId"
                :downloadType="setType"
                :fileList="qnaFileList"
                :read="disabledYn"
                @files="getFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </div>
      <!-- ValidateError 컴포넌트 영역 -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors"
      ></com-validate-error>
    </validation-observer>
  </div>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { qnaStore, commonStore } from '@/mixins';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'QnaDetailTableForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComDropdowns,
    ComInputText,
    ComUploadFile,
  },
  data() {
    return {
      selectedMenu: {},
      disabledYn: false,
      bdContent: '',
      menuList: common.getCodeList('BOD004'),
      qnaFileList: [], //* FILE 리스트
      qnaDetailId: 'qnaTemp',
      setType: 'qna',
    };
  },
  computed: {
    getQnaDetail(state) {
      //* 스토어에 저장된 팀 게시글 객체를 가져온다.
      const obj = this[qnaTypes.getters.GET_QNA_DETAIL];
      const userInfo = this[commonTypes.getters.GET_COM_USER_INFO];

      if (obj.createUser !== userInfo.userId) {
        state.disabledYn = true;
      }

      state.bdContent = obj.bdContent;
      obj.fileList = this.qnaFileList;

      return obj;
    },
    BOD_004(state) {
      const items = common.getCodeList('BOD004');
      items.unshift({ cd: '', cdNm: '전체' });
      const tmp = this.getQnaDetail.menuId;
      if (!common.isEmpty(tmp)) {
        state.selectedMenu = common.filterCode(
          common.getCodeList('BOD004'),
          tmp,
        );
      } else {
        state.selectedMenu = items[0];
      }
      return items;
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  watch: {
    //* 파일 리스트
    qnaFileList: function() {
      const qnaFiles = this[commonTypes.getters.GET_FILE_INFO_LIST];
      if (!common.isEmpty(qnaFiles)) {
        this.qnaFileList = qnaFiles;
      }
    },
    selectedMenu: function(val) {
      if (val !== undefined) {
        const items = this.getQnaDetail;
        items.selectedMenu = val.cd;
      }
    },
    //* EDITOR
    bdContent: function(value) {
      this.getQnaDetail.bdContent = value;
    },
  },
  async created() {
    await this.chkF5Btn();
  },
  async mounted() {
    this.qnaDetailId = this.getQnaDetail.bdId;
    const qnaFiles = await this[commonTypes.getters.GET_FILE_INFO_LIST];
    if (qnaFiles.length !== 0) {
      this.qnaFileList = qnaFiles;
    }
    this.$refs.obs.vaildate;
  },
  methods: {
    //* 파일 업로드 이후 이벤트
    getFiles(files) {
      this.getQnaDetail.fileList = files;
    },
    onChkChange(e) {
      this.getQnaDetail.faqType = e.target.value;
    },
    //* 수정 및 조회 화면 초기화
    chkF5Btn() {
      //* bdId는 리스트 화면에서 글 제목을 클릭할 때 같이 넘어온다.
      //* 해당 bdId값에 해당하는 공지글의 내용을 이미 서버에서 받아온 상황이다.
      //* 단, 새로고침을 하면 store에 있던 내용이 날아가기 때문에, 목록으로 되돌린다.
      if (
        this.getQnaDetail.bdId === '' ||
        this.getQnaDetail.bdId === undefined ||
        this.getQnaDetail.bdId === null
      ) {
        common.alert('warning', 'NLS0000638', null, 10);
        setTimeout(() => {
          this.$router.push({
            name: 'QnaPage',
            params: { auth: this.$route.params.auth },
          });
        }, 10000);
        return;
      }
    },
    onErrors(invalid, validated, errors) {
      if (invalid) {
        this[qnaTypes.actions.INIT_QNA_ERRORS]({
          error: true,
          msg: errors.msg,
        });
      } else {
        this[qnaTypes.actions.INIT_QNA_ERRORS]({
          error: false,
        });
      }
    },
  },
};
</script>
<style>
.qna-board .ck-editor__editable_inline {
  height: 500px;
}
</style>
