<template>
  <com-overlay v-model="value">
    <template v-slot:default="slotProps">
      <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
        <div class="page__layer-pop">
          <div class="layer-pop-wrap">
            <div class="layer-pop__box type-normal3">
              <div class="layer-pop__title">
                <!-- 코드 정보	 -->
                <p>{{ $t('NLS0000099') }}</p>
                <button type="button" class="layer-close" @click="closePopup">
                  close {{ slotProps.trigger ? '' : closePopup() }}
                </button>
              </div>
              <div class="hms-grid borderno-table">
                <table>
                  <colgroup>
                    <col style="width:20%" />
                    <col />
                    <col style="width:20%" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <!-- 코드 -->
                      <th scope="col">
                        {{ $t('NLS0000797')
                        }}<span class="required-text">*</span>
                      </th>
                      <td colspan="3">
                        <span class="grid-input-form type-nobtn">
                          <com-input-text
                            type="text"
                            v-model="codeInfo.cd"
                            rules="required|min:1|max:8"
                            v-if="editAble"
                          />
                          <com-input-text
                            type="text"
                            v-if="!editAble"
                            :disable="!editAble"
                            v-model="codeInfo.cd"
                          />
                        </span>
                        <button
                          v-if="editAble"
                          type="button"
                          class="white-btn"
                          @click="checkCd"
                        >
                          <!-- 중복체크 -->
                          <span>{{ $t('NLS0000077') }}</span>
                        </button>
                        <span
                          class="grid-text-info"
                          v-if="editAble && GV_CHECK === 0"
                        >
                          <!-- 등록 가능합니다.	 -->
                          {{ $t('NLS0000798') }}
                        </span>
                        <span
                          class="grid-text-info alert"
                          v-if="GV_CHECK === 1"
                        >
                          <!-- 이미 등록된 이름입니다.	 -->
                          {{ $t('NLS0000799') }}
                        </span>
                      </td>
                    </tr>
                    <tr v-for="item in languageList" :key="item.cdNm">
                      <th scope="col">
                        <!-- 코드명 -->
                        {{ $t('NLS0000800') }}({{ item.cd }})<span
                          class="required-text"
                          >*</span
                        >
                      </th>
                      <td colspan="3">
                        <span class="grid-input-form type1 type-nobtn">
                          <com-input-text
                            type="text"
                            v-model="codeInfo[`cdNm${item.cd}`]"
                            rules="required"
                          />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <!-- 순서 -->
                      <th scope="col">{{ $t('NLS0000084') }}</th>
                      <td>
                        <span class="grid-input-form type-nobtn">
                          <com-input-text
                            type="number"
                            v-model="codeInfo.sortNo"
                          />
                        </span>
                      </td>
                      <!-- 사용여부	 -->
                      <th scope="col">
                        {{ $t('NLS0000058')
                        }}<span class="required-text">*</span>
                      </th>
                      <td>
                        <com-dropdowns
                          :data="useYnList"
                          v-model="codeInfo.useYn"
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
              <div class="layer__btn-box">
                <button
                  type="button"
                  class="blue-btn perm_save"
                  @click="saveCode"
                >
                  <!-- 저장 -->
                  <span>
                    {{ $t('NLS0000074') }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          @errors="onErrors"
        ></com-validate-error>
      </validation-observer>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComValidateError from '@/components/common/global/ComValidateError';
import * as codeTypes from '@/store/modules/systemManagement/codeManagement/types';
import { codeManagementStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'CodeInfoPopup',
  mixins: [codeManagementStore],
  components: {
    ComValidateError,
    ComDropdowns,
    ComInputText,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      codeInfo: {},
      useYnList: [],
      languageList: [],
      GV_invalid: '',
      GV_validated: '',
      GV_errors: {},
      editAble: false,
      codeAllList: [],
      GV_CHECK: 2,
    };
  },

  async created() {
    this.languageList = common.getCodeList('G05');
    this.useYnList = common.getCodeList('G01');
    this.codeAllList = await this[codeTypes.getters.GET_CODE_LIST];
  },
  mounted() {
    if (!common.isEmpty(this.$refs.obs)) {
      this.$refs.obs.validate();
    }
  },
  updated() {
    if (!common.isEmpty(this.$refs.obs)) {
      this.$refs.obs.validate();
    }
  },
  computed: {
    getCodeInfo() {
      const item = this[codeTypes.getters.GET_CODE_INFO];
      return item;
    },
  },
  watch: {
    getCodeInfo: function(value) {
      this.codeInfo = { ...value };
      this.setCdNm('D');
      if (this.codeInfo.useYn !== undefined) {
        this.codeInfo.useYn = common.filterCode(
          common.getCodeList('G01'),
          this.codeInfo.useYn,
        );
        this.editAble = false;
      } else {
        this.codeInfo.useYn = this.useYnList[0]; //* validation check를 위한 초기화.
        this.editAble = true;
      }
      if (this.codeInfo.sortNo != undefined) {
        this.codeInfo.sortNo = this.codeInfo.sortNo.toString();
      }
    },
  },
  methods: {
    onErrors(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid = invalid;
      this.GV_validated = validate;
      this.GV_errors = errors;
    },
    closePopup() {
      this[codeTypes.actions.INIT_CODE_INFO]({});
      this.$emit('input', false);
      this.editAble = false;
    },
    saveCode() {
      if (this.GV_invalid == true) {
        common.alert('warning', this.GV_errors.msg);
        return false;
      }
      if (common.isEmpty(this.getCodeInfo)) {
        if (this.GV_CHECK === 2) {
          //코드 중복체크해주세요
          common.alert('warning', 'NLS0001049');
          return false;
        }
      }
      this.setCdNm('P');
      let params = { ...this.codeInfo };
      params.grpCd = this.$route.params.grpCd;
      params.useYn = this.codeInfo.useYn.cd;

      this[codeTypes.actions.INSERT_CODE_LIST](params);
      this.closePopup();
    },
    checkCd() {
      const cd = this.codeInfo.cd;
      if (!common.isEmpty(cd)) {
        if (cd.length < 9) {
          if (this.codeAllList.length < 1) {
            this.GV_CHECK = 0;
            return false;
          }

          for (let data of this.codeAllList) {
            if (cd === data.cd) {
              this.GV_CHECK = 1;
              break;
            } else {
              this.GV_CHECK = 0;
            }
          }
        } else {
          //코드는 8자리 이하로 입력해주세요
          common.alert('warning', 'NLS0001050');
        }
      } else {
        //코드를 입력후 중복체크를 클릭해주세요.
        common.alert('warning', 'NLS0001051');
      }
    },
    setCdNm(flag) {
      //* P : PARAM, D : DATA
      if (flag === 'P') {
        this.codeInfo.cdNmKo = this.codeInfo.cdNmKO;
        this.codeInfo.cdNmEn = this.codeInfo.cdNmEN;
        this.codeInfo.cdNmZh = this.codeInfo.cdNmZH;
        this.codeInfo.cdNmVn = this.codeInfo.cdNmVN;
        this.codeInfo.cdNmId = this.codeInfo.cdNmID;
        this.codeInfo.cdNmPh = this.codeInfo.cdNmPH;
      } else if (flag === 'D') {
        this.codeInfo.cdNmKO = this.codeInfo.cdNmKo;
        this.codeInfo.cdNmEN = this.codeInfo.cdNmEn;
        this.codeInfo.cdNmZH = this.codeInfo.cdNmZh;
        this.codeInfo.cdNmVN = this.codeInfo.cdNmVn;
        this.codeInfo.cdNmID = this.codeInfo.cdNmId;
        this.codeInfo.cdNmPH = this.codeInfo.cdNmPh;
      }
    },
  },
};
</script>
