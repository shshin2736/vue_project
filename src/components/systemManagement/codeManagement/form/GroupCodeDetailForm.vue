<template>
  <div>
    <div class="page__btn-tbox">
      <!-- 그룹코드 정보 -->
      <div class="btn-box-title">
        {{ $t('NLS0000098') }}
      </div>
      <!-- <button type="button" class="red-btn" @click="saveGrpCode">
        <span>저장</span>
      </button> -->
      <!-- <button type="button" class="deepdarkgray-btn" @click="goCodeList">
        <span>목록</span>
      </button> -->
      <!-- 저장 -->
      <com-button
        type="button"
        class="blue-btn perm_save"
        :auth="$route.params.auth"
        @click="saveGrpCode"
      >
        <!-- 저장 -->
        <span>{{ $t('NLS0000074') }}</span>
      </com-button>
      <!-- 목록 -->
      <com-button
        type="button"
        class="deepdarkgray-btn perm_read"
        :auth="$route.params.auth"
        @click="goCodeList"
      >
        <!-- 목록 -->
        <span>{{ $t('NLS0000372') }}</span>
      </com-button>
    </div>
    <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
      <div class="hms-grid basic-table">
        <table>
          <colgroup>
            <col style="width:13%" />
            <col />
            <col style="width:13%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 그룹코드 -->
                {{ $t('NLS0000076') }}<span class="required-text">*</span>
              </th>
              <td>
                <p class="grid-line">
                  <span class="grid-input-form type-nobtn">
                    <com-input-text
                      v-if="addAble"
                      type="text"
                      rules="required|max:10"
                      v-model="grpCdInfo.grpCd"
                    />
                    <com-input-text
                      v-if="!addAble"
                      type="text"
                      :disable="!addAble"
                      v-model="grpCdInfo.grpCd"
                    />
                  </span>
                  <button
                    v-if="addAble"
                    type="button"
                    class="white-btn"
                    @click="checkGrpcd"
                  >
                    <!-- 중복확인 -->
                    <span>{{ $t('NLS0000077') }}</span>
                  </button>
                </p>
                <span class="grid-text-info" v-if="GV_CHECK === 0">
                  <!-- 등록 가능합니다.	 -->
                  {{ $t('NLS0000798') }}
                </span>
                <!-- 이미 등록된 이름입니다.	 -->
                <span class="grid-text-info alert" v-if="GV_CHECK === 1">
                  {{ $t('NLS0000799') }}
                </span>
              </td>
              <!-- 그룹코드명 -->
              <th scope="row">
                {{ $t('NLS0000078') }}<span class="required-text">*</span>
              </th>
              <td>
                <span class="grid-input-form type-nobtn">
                  <com-input-text
                    type="text"
                    v-model="grpCdInfo.grpNm"
                    rules="required"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <!-- 순서 -->
              <th scope="row">
                {{ $t('NLS0000084') }}<span class="required-text">*</span>
              </th>
              <td>
                <span class="grid-input-form type-nobtn">
                  <com-input-text
                    type="number"
                    v-model="grpCdInfo.sortNo"
                    rules="required"
                  />
                </span>
              </td>
              <!-- 사용여부 -->
              <th scope="row">
                {{ $t('NLS0000058') }}<span class="required-text">*</span>
              </th>
              <td>
                <com-dropdowns
                  :data="useYnList"
                  v-model="grpCdInfo.useYn"
                  textfield="cdNm"
                  valuefield="cd"
                  rules="selected"
                  class="hms-dropdown type2"
                ></com-dropdowns>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComValidateError from '@/components/common/global/ComValidateError';
import { codeManagementStore } from '@/mixins';
import * as codeTypes from '@/store/modules/systemManagement/codeManagement/types';
import { common } from '@/utils';

export default {
  name: 'groupCodeDetailPage',
  mixins: [codeManagementStore],
  components: {
    ComValidateError,
    ComButton,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      useYnList: [],
      grpCdInfo: {}, //* 그룹코드 정보 상세
      addAble: false,
      GV_CHECK: '',
      GV_invalid: '',
      GV_validated: '',
      GV_errors: {},
    };
  },
  created() {
    //* dropdown
    this.useYnList = common.getCodeList('G01');

    if (common.isEmpty(this.$route.params.grpCd)) {
      // 등록
      this.addAble = true;
      this.GV_CHECK = 2;
      this.grpCdInfo.useYn = this.useYnList[0];
    } else {
      // 수정
      this.addAble = false;
      this.grpCdInfo.grpCd = this.$route.params.grpCd;
      this.setGrpInfo(this.grpCdInfo.grpCd);
    }
  },
  mounted() {
    //* validation
    this.$refs.obs.validate();
  },
  beforeCreate() {
    if (!this.$route.params.type && !this.$route.params.grpCd)
      this.$router.push({
        path: '/codeListPage',
      });
  },
  methods: {
    async setGrpInfo(grpCd) {
      //* grpCd값의 info 조회
      const params = { srchGrpCd: grpCd };
      await this[codeTypes.actions.FETCH_GRP_CODE_LIST](params);
      const grpInfo = this[codeTypes.getters.GET_GRP_CODE_LIST];

      //* grpCdInfo 값 셋팅.
      this.grpCdInfo = grpInfo[0];
      this.grpCdInfo.useYn = common.filterCode(
        common.getCodeList('G01'),
        this.grpCdInfo.useYn,
      );
      this.grpCdInfo.sortNo = this.grpCdInfo.sortNo.toString();
    },
    goCodeList() {
      this.$router.push({
        path: `/codeListPage`,
      });
    },
    onErrors(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid = invalid;
      this.GV_validated = validate;
      this.GV_errors = errors;
    },
    async checkGrpcd() {
      if (!common.isEmpty(this.grpCdInfo.grpCd)) {
        if (this.grpCdInfo.grpCd.length < 11) {
          await this[codeTypes.actions.FETCH_GRP_CODE]({
            grpCode: this.grpCdInfo.grpCd,
          });
          const data = this[codeTypes.getters.GET_GRP_CODE];
          this.GV_CHECK = data.cnt;
        } else {
          //그룹코드는 10자리 이하로 입력해주세요
          common.alert('warning', 'NLS0001058');
          alert(this.grpCdInfo.grpCd.length > 10);
        }
      } else {
        //그룹코드를 입력후 중복체크 해주세요
        common.alert('warning', 'NLS0001057');
      }
    },
    saveGrpCode() {
      if (this.addAble == true) {
        //* 등록
        if (this.GV_CHECK === 1 || this.GV_CHECK === 2) {
          //그룹코드 중복체크후 저장해주세요
          common.alert('warning', 'NLS0001056');
          return false;
        }
      }
      if (this.GV_invalid && !common.isEmpty(this.grpCdInfo.grpCd)) {
        common.alert('warning', this.GV_errors.msg);
        return false;
      } else {
        let params = { ...this.grpCdInfo };
        params.useYn = this.grpCdInfo.useYn.cd;
        this[codeTypes.actions.INSERT_GRP_CODE_LIST](params);
        //저장되었습니다
        common.alert('success', 'NLS0000012');
        this.$router.push({
          path: `/codeListrDetailPage/${this.grpCdInfo.grpCd}`,
        });
      }
    },
  },
};
</script>
