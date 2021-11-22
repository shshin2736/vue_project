<template>
  <div class="hms-grid basic-table">
    <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
      <table>
        <colgroup>
          <col style="width:13%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <!-- 제목 -->
            <th scope="row">
              {{ $t('NLS0000366') }}<span class="required-text">*</span>
            </th>
            <td colspan="3">
              <span class="grid-input-form type-nobtn">
                <com-input-text
                  rules="required"
                  v-model="getTeamBoardDetail.bdTitle"
                ></com-input-text>
              </span>
              <span class="check-form text-in type-grid">
                <input
                  type="checkbox"
                  ref="check"
                  class="k-checkbox"
                  id="chk"
                  v-model="buOpenYn"
                  @change="onCheck"
                />
                <!-- BU 공개 -->
                <label for="chk"
                  ><span>{{ $t('NLS0000953') }}</span></label
                >
              </span>
            </td>
          </tr>
          <tr>
            <!-- 등록부서/등록자 -->
            <th scope="row">
              {{ $t('NLS0000376') }}
            </th>
            <td colspan="3">
              <span class="grid-input-form type-nobtn">
                {{ getTeamBoardDetail.createUserInfo }}
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
                types="classic"
                v-model="bdContent"
              ></com-ck-editor>
            </td>
          </tr>
          <tr>
            <!-- 파일첨부 -->
            <th scope="row">{{ $t('NLS0000905') }}</th>
            <td>
              <div class="hms-upload">
                <!-- 파일 업로드 공통 컴포넌트 -->
                <com-upload-file
                  :drag="true"
                  :toolbar="true"
                  :multiple="true"
                  :ownerObjectId="ownerObjectId"
                  :downloadType="downloadType"
                  :fileList="teamBoardFileList"
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
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { teamBoardStore, commonStore } from '@/mixins';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'TeamBoardRegistrationForm',
  mixins: [teamBoardStore, commonStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComInputText,
    ComUploadFile,
  },
  data() {
    return {
      disabledYn: false,
      bdContent: '',
      buOpenYn: false,
      teamBoardFileList: [], //* FILE 리스트
      ownerObjectId: '',
      downloadType: 'teamBoard',
    };
  },
  computed: {
    getTeamBoardDetail() {
      return this[teamBoardTypes.getters.GET_TEAM_BOARD_DETAIL];
    },
    getComFileList() {
      return this[commonTypes.getters.GET_FILE_INFO_LIST];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  watch: {
    getComFileList(value) {
      this.teamBoardFileList = value.filter(
        i => this.getTeamBoardDetail.bdId === i.ownerObjectId,
      );
    },
    bdContent: function(value) {
      this.getTeamBoardDetail.bdContent = value;
    },
  },
  beforeCreate() {
    if (common.isEmpty(this.$route.params.access)) {
      this.$router.push({
        name: 'TeamBoardPage',
        params: { auth: this.$route.params.auth },
      });
    }
  },
  async created() {
    if (this.$route.params.myPost) {
      const param = this.$route.params.param;
      await this[teamBoardTypes.actions.FETCH_TEAM_BOARD_DETAIL](param);
      this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        ownerObjectId: param.bdId,
        downloadType: 'teamBoard',
      });
      this.ownerObjectId = this.getTeamBoardDetail.bdId;
      if (this.getTeamBoardDetail.buOpenYn === 'Y') {
        this.buOpenYn = true;
      }
      this.bdContent = this.getTeamBoardDetail.bdContent;
    } else {
      this.getTeamBoardDetail.buOpenYn = 'N';
      this.getTeamBoardDetail.deptId = this.getUserInfo.deptId;
      this.getTeamBoardDetail.createUserInfo = `${this.getUserInfo.deptNm} / ${this.getUserInfo.userName}`;
    }
  },
  methods: {
    //* 파일 업로드 이후 이벤트
    getFiles(files) {
      this[teamBoardTypes.actions.INIT_TBD_UPLOAD_FILE](files);
    },
    onCheck() {
      this.buOpenYn = this.$refs.check.checked;
      if (this.buOpenYn) {
        this.getTeamBoardDetail.buOpenYn = 'Y';
      } else {
        this.getTeamBoardDetail.buOpenYn = 'N';
      }
    },
    onErrors(invalid) {
      if (invalid) {
        this[teamBoardTypes.actions.INIT_TBD_ERRORS](true);
      } else {
        this[teamBoardTypes.actions.INIT_TBD_ERRORS](false);
      }
    },
  },
};
</script>
