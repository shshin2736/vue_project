<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
        <div class="page__layer-pop">
          <div class="layer-pop-wrap">
            <div class="layer-pop__box type-middle">
              <div class="layer-pop__title">
                <!-- 비밀번호 변경	 -->
                <p>{{ $t('NLS0000170') }}</p>
                <button type="button" class="layer-close" @click="onClose">
                  close {{ slotProps.trigger ? '' : onClose() }}
                </button>
              </div>
              <div class="search__form__box type-block">
                <!-- 현재 비밀번호	 -->
                <p class="search__form__title">
                  {{ $t('NLS0000173') }}<span class="required-text">*</span>
                </p>
                <span class="input__box">
                  <com-input-text
                    v-model="pwdCur"
                    v-bind:type="passwordShow[0].type"
                    rules="required"
                  ></com-input-text>
                  <button
                    v-bind:class="passwordShow[0].classNm"
                    @click="changePwType('now')"
                  ></button>
                </span>
              </div>
              <div class="search__form__box type-block">
                <!-- 새 비밀번호	 -->
                <p class="search__form__title">
                  {{ $t('NLS0000174') }}<span class="required-text">*</span>
                </p>
                <span class="input__box">
                  <com-input-text
                    name="password"
                    v-model="pwdNew"
                    v-bind:type="passwordShow[1].type"
                    id="pwdNew"
                    rules="required|confirm:@pwdCfm|passRegEx"
                    target="password"
                  ></com-input-text>
                  <button
                    v-bind:class="passwordShow[1].classNm"
                    @click="changePwType('pass')"
                  ></button>
                </span>
              </div>
              <div class="search__form__box type-block">
                <!-- 새 비밀번호 확인	 -->
                <p class="search__form__title">
                  {{ $t('NLS0000175') }}<span class="required-text">*</span>
                </p>
                <span class="input__box">
                  <com-input-text
                    v-model="pwdCfm"
                    v-bind:type="passwordShow[2].type"
                    id="pwdCfm"
                    rules="required|confirm:@pwdNew"
                  ></com-input-text>
                  <button
                    v-bind:class="passwordShow[2].classNm"
                    @click="changePwType('check')"
                  ></button>
                </span>
              </div>
              <div class="layer__btn-box no-border">
                <button type="button" class="blue-btn" @click="onClick">
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
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';

import { common } from '@/utils';
export default {
  name: 'UpdateApprovalPopup',
  mixins: [userManagementStore, commonStore],
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
      passwordShow: [
        { id: 'now', type: 'password', classNm: 'pw_on' },
        { id: 'pass', type: 'password', classNm: 'pw_on' },
        { id: 'check', type: 'password', classNm: 'pw_on' },
      ],
      pwdCur: '',
      pwdNew: '',
      pwdCfm: '',
      validate: '',
      invalid: '',
      error: '',
    };
  },
  computed: {
    getMyInfo() {
      return this[userManagementTypes.getters.GET_MY_INFO];
    },
  },
  methods: {
    async onClick() {
      this.$refs.obs.validate();
      const res = await this[userManagementTypes.actions.FETCH_PASS_CHECK]({
        userId: this.getMyInfo.userId,
        password: this.pwdCur.split(' ').join(''),
      });
      if (this.invalid) {
        common.alert('warning', this.errors.msg);
        return false;
      }
      if (res) {
        this[userManagementTypes.actions.UPDATE_PASSWORD]({
          userId: this.getMyInfo.userId,
          password: this.pwdNew.split(' ').join(''),
        });
        //변경되었습니다.
        common.alert('success', 'NLS0000795', this.onClose);
      } else {
        //입력하신 비밀번호가 현재 비밀번호와 일치하지 않습니다.
        common.alert('warning', 'NLS0001068');
      }
    },
    onClose() {
      this.passwordShow = [
        { id: 'now', type: 'password', classNm: 'pw_on' },
        { id: 'pass', type: 'password', classNm: 'pw_on' },
        { id: 'check', type: 'password', classNm: 'pw_on' },
      ];
      this.pwdCur = '';
      this.pwdNew = '';
      this.pwdCfm = '';
      this.$emit('input', false);
    },
    onErrors(invalid, validate, errors) {
      this.invalid = invalid;
      this.validate = validate;
      this.errors = errors;
    },
    changePwType(id) {
      this.passwordShow = this.passwordShow.map(item => {
        if (item.id === id) {
          item.type = item.type === 'text' ? 'password' : 'text';
          item.classNm = item.classNm === 'pw_on' ? 'pw_off' : 'pw_on';
        }
        return item;
      });
    },
  },
};
</script>
