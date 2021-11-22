<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
        <div class="page__layer-pop">
          <div class="layer-pop-wrap">
            <div class="layer-pop__box type-middle pop_mypage">
              <div class="layer-pop__title">
                <!-- 마이페이지 -->
                <p>{{ $t('NLS0000793') }}</p>
                <button type="button" class="layer-close" @click="onClose">
                  close {{ slotProps.trigger ? '' : onClose() }}
                </button>
              </div>
              <div class="hms-grid basic-table">
                <table>
                  <colgroup>
                    <col style="width:13%" />
                    <col style="width:37%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <!-- 나의 정보	 -->
                      <th scope="row">
                        {{ $t('NLS0000167') }}
                      </th>
                      <td>
                        <p class="grid-line">
                          <!-- 성명	 -->
                          <span class="title-lang"
                            >{{ $t('NLS0000176') }}
                          </span>
                          <span class="text-lang">
                            {{ getMyInfo.userName }} ({{
                              getMyInfo.rankName
                            }}/{{ getMyInfo.dutyName }})
                          </span>
                        </p>
                        <p class="grid-line">
                          <!-- 아이디  -->
                          <span class="title-lang"
                            >{{ $t('NLS0000177') }}
                          </span>
                          <span class="text-lang">
                            {{ getMyInfo.userId }}
                          </span>
                        </p>
                        <p class="grid-line">
                          <!-- 비밀번호 만료일 -->
                          <span class="title-lang"
                            >{{ $t('NLS0000178') }}
                          </span>
                          <span class="text-lang">
                            {{ getMyInfo.pwExpDate }}
                          </span>
                        </p>
                        <p class="grid-line">
                          <!-- 휴대전화  -->
                          <span class="title-lang title-center"
                            >{{ $t('NLS0000179') }}
                          </span>
                          <span class="grid-input-form type-nobtn">
                            <com-input-text
                              type="text"
                              v-model="getMyInfo.mobileTelNo"
                            ></com-input-text>
                          </span>
                        </p>
                        <p class="grid-line">
                          <!-- E-mail -->
                          <span class="title-lang title-center"
                            >{{ $t('NLS0000180') }}
                          </span>
                          <span class="grid-input-form type-nobtn">
                            <com-input-text
                              type="text"
                              rules="email"
                              v-model="getMyInfo.emailAddress"
                            ></com-input-text>
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <!-- 조직 정보	 -->
                      <th scope="row">
                        {{ $t('NLS0000168') }}
                      </th>
                      <td>
                        <p class="grid-line">
                          <!-- 소속 조직 -->
                          <span class="title-lang"
                            >{{ $t('NLS0000794') }}
                          </span>
                          <span class="text-lang">
                            {{ getMyInfo.deptName }}
                          </span>
                        </p>
                        <p class="grid-line">
                          <!-- 결재라인 -->
                          <span class="title-lang"
                            >{{ $t('NLS0000304') }}
                          </span>
                          <!-- 1차 결재자 -->
                          <!-- 2차 결재자 -->
                          <span class="text-lang">
                            {{ $t('NLS0001440') }}: {{ getMyInfo.userName }}
                            <br />
                            {{ $t('NLS0000171') }}: {{ getMyInfo.app1UserName }}
                            <br />
                            {{ $t('NLS0000172') }}: {{ getMyInfo.app2UserName }}
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="layer__btn-box no-border ea_03">
                <button type="button" class="blue-btn" @click="goA">
                  <!-- 결재라인 변경	 -->
                  <span>
                    {{ $t('NLS0000169') }}
                  </span>
                </button>
                <button type="button" class="blue-btn" @click="goP">
                  <!-- 비밀번호 변경	 -->
                  <span>
                    {{ $t('NLS0000170') }}
                  </span>
                </button>
                <button type="button" class="blue-btn" @click="onSave">
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
import ComValidateError from '@/components/common/global/ComValidateError';
import { userManagementStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';

import { common, timezone } from '@/utils';
export default {
  name: 'MyPagePopup',
  mixins: [userManagementStore],
  components: {
    ComValidateError,
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
      invalid: '',
      validated: '',
      errors: {},
    };
  },
  computed: {
    getMyInfo() {
      return this[userManagementTypes.getters.GET_MY_INFO];
    },
  },
  watch: {
    getMyInfo: function(value) {
      value.pwExpDate = timezone.convertToClientTimeZone(
        value.pwExpDate,
        'YYYY-MM-DD',
      );
    },
  },
  methods: {
    async onSave() {
      this.$refs.obs.validate();
      if (this.invalid) {
        common.alert('warning', this.errors.msg);
        return false;
      }
      const res = await this[userManagementTypes.actions.UPDATE_MY_INFO](
        this.getMyInfo,
      );
      if (res) {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
    },
    goA() {
      const myInfo = this.getMyInfo;
      const data = {
        app1UserId: myInfo.app1UserId,
        app1UserName: myInfo.app1UserName,
        app2UserId: myInfo.app2UserId,
        app2UserName: myInfo.app2UserName,
      };
      this[userManagementTypes.actions.INIT_APVL_DATA](data);
      this[userManagementTypes.actions.INIT_VIEWS_APPROVAL_POPUP](true);
    },
    goP() {
      this[userManagementTypes.actions.INIT_VIEWS_PWD_POPUP](true);
    },
    onClose() {
      this.$emit('input', false);
    },
    onErrors(invalid, validate, errors) {
      this.invalid = invalid;
      this.validate = validate;
      this.errors = errors;
    },
  },
};
</script>
<style scoped>
.title-center {
  padding-top: 9px;
}
.text-lang {
  font-size: 12px;
}
</style>
