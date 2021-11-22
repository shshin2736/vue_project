<template>
  <div class="idpw-wrap">
    <div class="idpw-center">
      <img
        src="@/assets/images/logo_hms.svg"
        alt="logo"
        class="login-pc-logo"
      />
      <div class="idpw-box">
        <div class="find-tab-box">
          <button
            type="button"
            v-bind:class="idTabClass"
            @click="tabChange('id')"
          >
            <span>{{ $t('NLS0001337') }}</span>
          </button>
          <button
            type="button"
            v-bind:class="pwTabClass"
            @click="tabChange('password')"
          >
            <span>{{ $t('NLS0001150') }}</span>
          </button>
        </div>
        <validation-observer ref="obs1" v-slot="{ invalid, validated, errors }">
          <div v-bind:class="idTabContentClass">
            <div class="input-form">
              <label for="name">
                {{ $t('NLS0000176') }}
                <span class="required-text">*</span>
              </label>
              <com-input-text
                rules="required"
                v-model="userName"
              ></com-input-text>
            </div>
            <div class="input-form">
              <label for="email">
                {{ $t('NLS0000228') }}
                <span class="required-text">*</span>
              </label>
              <com-input-text
                rules="email|required"
                v-model="emailAddress1"
              ></com-input-text>
            </div>
            <button type="button" class="red-btn" @click="findAccount">
              <span>{{ $t('NLS0001090') }}</span>
            </button>
            <button type="button" class="find" @click="goLogin">
              <span>{{ $t('NLS0001091') }}</span>
            </button>
          </div>
          <com-validate-error
            :invalid="invalid"
            :validated="validated"
            :errors="errors"
            @errors="onErrors1"
          ></com-validate-error>
        </validation-observer>

        <validation-observer ref="obs2" v-slot="{ invalid, validated, errors }">
          <div v-bind:class="pwTabContentClass">
            <div class="input-form">
              <label for="id">
                {{ $t('NLS0001092') }}
                <span class="required-text">*</span>
              </label>
              <com-input-text
                rules="required"
                v-model="userId"
              ></com-input-text>
            </div>
            <div class="input-form">
              <label for="email1">
                {{ $t('NLS0000228') }}
                <span class="required-text">*</span>
              </label>
              <com-input-text
                rules="email|required"
                v-model="emailAddress2"
              ></com-input-text>
              <button type="button" class="red-btn" @click="findAccount">
                <span>{{ $t('NLS0001090') }}</span>
              </button>
              <button type="button" class="find" @click="goLogin">
                <span>{{ $t('NLS0001091') }}</span>
              </button>
            </div>
          </div>
          <com-validate-error
            :invalid="invalid"
            :validated="validated"
            :errors="errors"
            @errors="onErrors2"
          ></com-validate-error>
        </validation-observer>
      </div>
      <div class="footer-wrap">
        <p class="address-text">
          {{ $t('NLS0000702') }}
        </p>
        <p class="copyright-text">
          <span v-html="$t('NLS0000950')"> </span>
        </p>
      </div>
      <div class="confirm-popup" v-show="successFindAct">
        <p class="text-box">{{ successText }}</p>
        <button type="button" class="idfind-btn" @click="close()">
          <span>{{ $t('NLS0000959') }}</span>
        </button>
      </div>
    </div>
    <alert-modal v-model="alertM"></alert-modal>
    <confirm-modal v-model="confirm"></confirm-modal>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComValidateError from '@/components/common/global/ComValidateError';
import { authStore, commonStore } from '@/mixins';
import * as authTypes from '@/store/modules/auth/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';
import AlertModal from '@/components/common/business/AlertModal';
import ConfirmModal from '@/components/common/business/ConfirmModal';

export default {
  name: 'FindAccountForm',
  mixins: [authStore, commonStore],
  components: { ComInputText, ComValidateError, AlertModal, ConfirmModal },
  data: function() {
    return {
      //* 아이디 찾기 유효성
      invalid1: true,
      validated1: '',
      errors1: {},

      //* 비밀번호 찾기 유효성
      invalid2: true,
      validated2: '',
      errors2: {},

      //* Class 설정
      idTabClass: 'find-btn current',
      pwTabClass: 'find-btn',
      idTabContentClass: 'id-tab-box current',
      pwTabContentClass: 'id-tab-box',
      isFindId: true,

      //* 이메일 발송 성공 알림창
      successFindAct: false,
      successText: '',

      //* ID 찾기
      userName: '',
      emailAddress1: '',

      //* 비밀번호 찾기
      userId: '',
      emailAddress2: '',
    };
  },

  computed: {
    alertM: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_ALERT](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_ALERT];
      },
    },
    confirm: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_CONFIRM](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_CONFIRM];
      },
    },
  },
  mounted() {
    this.$refs.obs1.validate();
    this.$refs.obs2.validate();
  },
  methods: {
    //* 탭 전환
    tabChange(type) {
      switch (type) {
        //* 아이디 찾기
        case 'id':
          this.idTabClass = 'find-btn current';
          this.pwTabClass = 'find-btn';
          this.idTabContentClass = 'id-tab-box current';
          this.pwTabContentClass = 'id-tab-box';
          this.isFindId = true;
          this.userName = '';
          this.emailAddress1 = '';
          this.invalid1 = true;
          break;
        //* 비밀번호 찾기
        case 'password':
          this.idTabClass = 'find-btn';
          this.pwTabClass = 'find-btn current';
          this.idTabContentClass = 'id-tab-box';
          this.pwTabContentClass = 'id-tab-box current';
          this.isFindId = false;
          this.userId = '';
          this.emailAddress2 = '';
          this.invalid2 = true;
          break;
      }
    },
    async findAccount() {
      var invalid = false;
      var errorMsg = '';

      if (this.isFindId) {
        invalid = this.invalid1;
        errorMsg = this.errors1.msg;
      } else {
        invalid = this.invalid2;
        errorMsg = this.errors2.msg;
      }

      if (invalid) {
        common.alert('warning', errorMsg);
        return false;
      }

      let param = {};
      //* 아이디 찾기인 경우
      if (this.isFindId) {
        param = {
          userName: this.userName.split(' ').join(''),
          emailAddress: this.emailAddress1.split(' ').join(''),
          findType: 'id',
        };
        this.successText = this.$t('NLS0001331');
      }
      //* 비밀번호 찾기인 경우
      else {
        param = {
          userId: this.userId.split(' ').join(''),
          emailAddress: this.emailAddress2.split(' ').join(''),
          findType: 'password',
        };
        //이메일 주소로 임시 비밀번호가 발송되었습니다.
        this.successText = this.$t('NLS0001053');
      }
      const returnData = await this[authTypes.actions.FETCH_FIND_ACCOUNT_INFO](
        param,
      );
      if (returnData.result === 'T') {
        if (returnData.data.isAccountExist) {
          this.successFindAct = true;
        } else {
          //존재하지 않는 계정정보입니다.
          common.alert('success', '	NLS0001052');
        }
      }
    },
    //* 알림창 닫기
    close() {
      this.successFindAct = false;
    },
    //* 로그인 화면으로
    goLogin() {
      this.$router.push({
        path: '/login',
      });
    },
    onErrors1(invalid, validate, errors) {
      this.invalid1 = invalid;
      this.validated1 = validate;
      this.errors1 = errors;
    },

    onErrors2(invalid, validate, errors) {
      this.invalid2 = invalid;
      this.validated2 = validate;
      this.errors2 = errors;
    },
  },
};
</script>
