<template>
  <div class="hms-grid basic-table">
    <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
      <table>
        <colgroup>
          <col style="width:13%" />
          <col />
          <col style="width:13%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <!-- 제목 -->
            <th scope="row">
              {{ $t('NLS0000366') }} <span class="required-text">*</span>
            </th>
            <td colspan="3">
              <span class="grid-input-form type1 type-nobtn">
                <com-input-text
                  rules="required"
                  v-model="getQnaDetail.bdTitle"
                ></com-input-text>
              </span>
            </td>
          </tr>
          <tr>
            <!-- 유형 -->
            <th scope="row">{{ $t('NLS0000183') }}</th>
            <td>
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
                  @change="onChkChange"
                />
              </span>
            </td>
            <th scope="row">
              <!-- 메뉴구분 -->
              {{ $t('NLS0000382') }}
            </th>
            <td>
              <com-dropdowns
                :data="selectList"
                v-model="selectedMenu"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                @change="onSelected"
              ></com-dropdowns>
            </td>
          </tr>
          <tr>
            <!-- 등록자 -->
            <th scope="row">{{ $t('NLS0000080') }}</th>
            <td>
              <span class="grid-input-form type-nobtn">
                {{ getQnaDetail.createUserInfo }}
              </span>
            </td>
            <!-- 등록일 -->
            <th scope="row">
              {{ $t('NLS0000368') }}
            </th>
            <td>
              {{ getQnaDetail.createDate }}
            </td>
          </tr>
          <tr>
            <!-- 내용 -->
            <th scope="row">
              {{ $t('NLS0000371') }}<span class="required-text">*</span>
            </th>
            <td colspan="3">
              <com-ck-editor
                v-model="bdContent"
                rules="required"
              ></com-ck-editor>
            </td>
          </tr>
          <tr>
            <!-- 파일첨부 -->
            <th scope="row">{{ $t('NLS0000905') }}</th>
            <td colspan="3">
              <div class="hms-upload">
                <!-- 파일 업로드 공통 컴포넌트 -->
                <com-upload-file
                  :drag="true"
                  :toolbar="true"
                  :multiple="true"
                  :ownerObjectId="qnaDetailId"
                  :downloadType="setType"
                  :fileList="qnaFileList"
                  @files="getFiles"
                ></com-upload-file>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
import { common, timezone } from '@/utils';

export default {
  name: 'QnaRegistrationTableForm',
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
      selectList: [],
      selectedMenu: {},
      srchFaqType: 'S',
      bdContent: '',
      qnaFileList: [], //* FILE 리스트
      qnaDetailId: 'qnaTemp',
      setType: 'qna',
    };
  },
  computed: {
    getQnaDetail() {
      //* 스토어에 저장된 팀 게시글 객체를 가져온다.
      const obj = this[qnaTypes.getters.GET_QNA_DETAIL];
      const userInfo = this[commonTypes.getters.GET_COM_USER_INFO];

      //* 등록화면인 경우
      //* 등록부서/등록자 입력.
      obj.createUserInfo = `${userInfo.deptNm} / ${userInfo.userName}`;
      obj.deptId = userInfo.deptId;

      if (obj.createDate == undefined || obj.createDate == '') {
        let nowDate = this.getDate();
        obj.createDate = timezone.convertToClientTimeZone(
          nowDate,
          'YYYY-MM-DD',
        );
      }
      obj.fileList = this.qnaFileList;
      obj.faqType = this.srchFaqType;
      // obj.menuId = this.selectedMenu.cd;

      return obj;
    },
  },
  watch: {
    //* 파일 리스트
    qnaFileList: function() {
      this.qnaFileList = this.getQnaDetail.fileList;
    },
    //* EDITOR
    bdContent: function(value) {
      this.getQnaDetail.bdContent = value;
    },
  },
  mounted() {
    this.getDropdownList();
    this.$refs.obs.vaildate;
  },
  methods: {
    getDropdownList() {
      const items = common.getCodeList('BOD004');
      items.unshift({ cd: '', cdNm: this.$t('NLS0000336') });
      this.selectedMenu = items[0];
      this.selectList = items;
    },
    onSelected(e) {
      this.getQnaDetail.menuId = e.target.value.cd;
    },
    //* 파일 업로드 이후 이벤트
    getFiles(files) {
      this.getQnaDetail.fileList = files;
    },
    onChkChange(e) {
      this.getQnaDetail.faqType = e.target.value;
    },
    //* 초기 검색일 설정 관련
    getDate(option) {
      if (common.isEmpty(option)) {
        return new Date();
      } else {
        let cDate = common.isEmpty(option.date) ? new Date() : option.date;
        if (!common.isEmpty(option.mode) && !common.isEmpty(option.value)) {
          let mode = option.mode;
          let value = option.value;
          if (mode === 'year') {
            cDate.setFullYear(cDate.getFullYear() + value);
          } else if (mode === 'month') {
            cDate.setMonth(cDate.getMonth() + value);
          } else if (mode === 'day') {
            cDate.setDate(cDate.getDate() + value);
          }
        }
        return cDate;
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
