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
                  rules=""
                  v-model="getNoticeDetail.bdTitle"
                ></com-input-text>
              </span>
            </td>
          </tr>
          <tr>
            <!-- 팝업사용여부 -->
            <th scope="row">
              {{ $t('NLS0000369') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_01"
                v-model="selectedYn"
                rules="required"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
              ></com-dropdowns>
            </td>
            <!-- 팝업사용기간 -->
            <th scope="row">
              {{ $t('NLS0000370') }}
            </th>
            <td>
              <!-- DATE PICKER 공통 컴포넌트 -->
              <span class="hms-datepicker">
                <com-date-picker
                  :current="crrStartDate"
                  :value="getNoticeDetail.popUpStartDate"
                  :format="'yyyy-MM-dd'"
                  @onChange="changeStartDate"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <!-- DATE PICKER 공통 컴포넌트 -->
              <span class="hms-datepicker">
                <com-date-picker
                  :current="crrEndDate"
                  :value="getNoticeDetail.popUpEndDate"
                  :format="'yyyy-MM-dd'"
                  @onChange="changeEndDate"
                ></com-date-picker>
              </span>
            </td>
          </tr>
          <tr>
            <!-- 내용 -->
            <th scope="row">
              {{ $t('NLS0000371') }}<span class="required-text">*</span>
            </th>
            <td colspan="3">
              <com-ck-editor
                rules="requiredCK"
                v-model="editorContent"
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
                  :fileList="noticeFileList"
                  :downloadType="setType"
                  :ownerObjectId="noticeDetailId"
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
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { noticeStore } from '@/mixins';
import * as noticeTypes from '@/store/modules/businessSupport/notice/types';
import { common, timezone } from '@/utils';

export default {
  name: 'NoticeRegistrationTableForm',
  mixins: [noticeStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComDropdowns,
    ComDatePicker,
    ComInputText,
    ComUploadFile,
  },
  data() {
    return {
      selectedYn: {},
      editorContent: '',
      crrStartDate: this.getDate(), //* 팝업 시작날짜 초기값
      crrEndDate: this.getDate({ mode: 'month', value: 1 }), //* 팝업 종료날짜 초기값
      noticeFileList: [], //* FILE 리스트
      noticeDetailId: '',
      setType: 'notice',
    };
  },
  computed: {
    //* 스토어에 저장된 공지사항 리스트에 변동이 생긴경우 자동으로 갱신
    getNoticeDetail() {
      const obj = this[noticeTypes.getters.GET_NOTICE_DETAIL];
      obj.fileList = this.noticeFileList;

      return obj;
    },
    G_01(state) {
      const items = common.getCodeList('G01');
      const tmp = this.getNoticeDetail.selectedYn;
      if (tmp !== undefined) {
        state.selectedYn = common.filterCode(common.getCodeList('G01'), tmp);
      }
      return items;
    },
  },
  watch: {
    //* 파일 리스트
    noticeFileList: function() {
      this.noticeFileList = this.getNoticeDetail.fileList;
    },
    //* 팝업 이용 여부
    selectedYn: function(val) {
      if (val !== undefined) {
        const items = this.getNoticeDetail;
        items.selectedYn = val.cd;
      }
    },
    //* EDITOR
    editorContent: function(value) {
      this.getNoticeDetail.editorContent = value;
    },
  },
  async created() {
    await this.setInitNew();
  },
  mounted() {
    this.$refs.obs.vaildate;
  },
  methods: {
    //* 파일 업로드 이벤트
    getFiles(files) {
      this.getNoticeDetail.fileList = files;
    },
    //* 화면 초기화
    async setInitNew() {
      //* 신규 화면
      await this[noticeTypes.actions.INIT_NOTICE_DETAIL]({
        popUpStartDate: timezone.convertToString(this.crrStartDate), //* 팝업사용기간 시작날짜
        popUpEndDate: timezone.convertToString(this.crrEndDate), //* 팝업 사용기간 끝 날짜
      });
      this.selectedYn = common.filterCode(common.getCodeList('G01'), 'N');
    },
    //* 시작날자 변경 이벤트.
    changeStartDate(date) {
      this.getNoticeDetail.popUpStartDate = timezone.convertToString(date);
    },
    //* 종료날자 변경 이벤트.
    changeEndDate(date) {
      this.getNoticeDetail.popUpEndDate = timezone.convertToString(date);
    },
    //* 초기 검색일 설정 관련.
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
    onErrors() {},
  },
};
</script>
