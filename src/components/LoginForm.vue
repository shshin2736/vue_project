<template>
  <div class="login-page">
    <div class="login__wrap" v-show="visible">
      <div class="login__top">
        <img
          src="@/assets/images/logo_hms.png"
          alt="logo"
          class="login-pc-logo"
        />
        <img
          src="@/assets/images/logo_hms.png"
          alt="logo"
          class="login-mobile-logo"
        />
        <div class="family-link">
          <span>{{ $t('NLS0000695') }}</span>
          <a href="https://www.sj.co.kr/" target="_blank">{{
            $t('NLS0000692')
          }}</a>
          <a href="http://intra.sj.co.kr/" target="_blank">{{
            $t('NLS0000693')
          }}</a>
          <a href="http://hello.sj.co.kr/" target="_blank">{{
            $t('NLS0000694')
          }}</a>
          <a href="https://www.pig-on.com" target="_blank">{{
            $t('NLS0000696')
          }}</a>
          <a href="https://www.remotemeeting.com/" target="_blank">{{
            $t('NLS0000697')
          }}</a>
        </div>
      </div>
      <div class="login-box">
        <div class="login_visual">
          <img src="@/assets/images/login-img.png" alt="login image" />
        </div>
        <div class="login-content">
          <div class="login-content-box">
            <div class="search__form__box type-login">
              <p class="search__form__title">
                {{ $t('NLS0001339') }}
              </p>
              <com-dropdowns
                :data="languageOptions"
                :textfield="languageNm"
                valuefield="cd"
                v-model="selected"
                class="hms-dropdown type6"
                @change="setlanguage"
              ></com-dropdowns>
            </div>
            <!-- 유효성 검사 옵저버 박스 -->
            <validation-observer
              ref="obs"
              v-slot="{ invalid, validated, errors }"
            >
              <div class="input-form">
                <label for="userId">{{ $t('NLS0000177') }}</label>
                <com-input-text
                  id="NLS0000023"
                  rules="required"
                  type="text"
                  v-model="userId"
                  @enter="invalidEventHandler"
                ></com-input-text>
              </div>
              <div class="input-form pw_iconbox">
                <label for="password">{{ $t('NLS0000231') }}</label>
                <com-input-text
                  id="NLS0001345"
                  rules="required"
                  v-bind:type="passwordType"
                  v-model="password"
                  @enter="invalidEventHandler"
                ></com-input-text>
                <button v-bind:class="className" @click="onClick"></button>
              </div>
              <!-- ValidateError 컴포넌트 영역 -->
              <com-validate-error
                :invalid="invalid"
                :validated="validated"
                :errors="errors"
                @errors="onErrors"
              ></com-validate-error>
              <button class="login_btn" @click="invalidEventHandler">
                <span>{{ $t('NLS0001336') }}</span>
              </button>
            </validation-observer>
            <div class="login-check">
              <span class="check-form text-in">
                <input type="checkbox" id="isSaveId" v-model="isSaveId" />
                <label for="isSaveId">{{ $t('NLS0001282') }}</label>
              </span>
              <router-link to="/findAccount" class="find">{{
                $t('NLS0001338')
              }}</router-link>
            </div>
          </div>
          <div class="login__bottom">
            <p>{{ $t('NLS0000695') }}</p>
            <div class="family-link">
              <a href="https://www.sj.co.kr/" target="_blank">{{
                $t('NLS0000692')
              }}</a>
              <a href="http://intra.sj.co.kr/" target="_blank">{{
                $t('NLS0000693')
              }}</a>
              <a href="#" target="_blank">{{ $t('NLS0000694') }}</a>
              <a href="https://www.pig-on.com" target="_blank">{{
                $t('NLS0000696')
              }}</a>
              <a href="https://www.remotemeeting.com/" target="_blank">{{
                $t('NLS0000697')
              }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="login-footer">
        <strong>
          {{ $t('NLS0000702') }}
        </strong>
        <span v-html="$t('NLS0000950')"> </span>
      </div>
    </div>
    <alert-modal v-model="alertM"></alert-modal>
    <confirm-modal v-model="confirm"></confirm-modal>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { authStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as authTypes from '@/store/modules/auth/types';
import { timezone, common } from '@/utils';
import AlertModal from '@/components/common/business/AlertModal';
import ConfirmModal from '@/components/common/business/ConfirmModal';
import ComValidateError from '@/components/common/global/ComValidateError';

export default {
  name: 'LoginForm',
  mixins: [authStore, commonStore],
  components: {
    AlertModal,
    ConfirmModal,
    ComValidateError,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      userId: '',
      password: '',
      passwordType: 'password',
      className: 'pw_on',
      languageOptions: [],
      languageNm: 'cdNmEn',
      selected: {},
      errorMessage: {},
      invalid: false,
      validate: false,
      alert: false,
      linear: false,
      visible: false,
      isSaveId: false,
    };
  },
  computed: {
    //* 로그인 여부 확인
    isLogin() {
      return this[authTypes.getters.GET_VIEWS_IS_LOGIN];
    },
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
  created() {
    if (this.isLogin) this.$router.push('/dashboardAfter');
    const languageCode = common.getCodeList('G05');
    const locale = this.$i18n.locale;
    timezone.setLanguage(locale);
    const code = `${locale.charAt(0).toUpperCase()}${locale.charAt(1)}`;
    this.languageNm = `cdNm${code}`;
    this.languageOptions = languageCode;
    languageCode.forEach(code => {
      if (code.cd.toLowerCase().includes(locale))
        this.selected = {
          [this.languageNm]: code[this.languageNm],
          cd: code.cd,
        };
    });
    localStorage.setItem('locale', locale);

    // * 로컬스토리지에서 유저 아이디 체크
    if (localStorage.getItem('inputUserId')) {
      this.userId = localStorage.getItem('inputUserId');
      this.isSaveId = true;
    }
  },
  mounted() {
    this.visible = true;
    //* 유효성체크 초기화
    this.$refs.obs.validate();
  },
  methods: {
    //* 언어셋 설정
    setlanguage(e) {
      this.$i18n.locale = e.target.value.cd.toLowerCase();
      timezone.setLanguage(this.$i18n.locale);
      const languageCode = common.getCodeList('G05');
      const locale = this.$i18n.locale;
      const code = `${locale.charAt(0).toUpperCase()}${locale.charAt(1)}`;
      this.languageNm = `cdNm${code}`;
      this.languageOptions = languageCode;
      languageCode.forEach(code => {
        if (code.cd.toLowerCase().includes(locale))
          this.selected = {
            [this.languageNm]: code[this.languageNm],
            cd: code.cd,
          };
      });
      localStorage.setItem('locale', locale);
    },
    //* 유효성 검사 내용 저장
    onErrors(invalid, validate, errors) {
      this.invalid = invalid;
      this.validate = validate;
      this.errorMessage = errors;
    },
    //* 유효성 검사 알림창 이벤트
    invalidEventHandler() {
      //* 아이디 저장 유무 체크
      if (this.isSaveId) localStorage.setItem('inputUserId', this.userId);
      else localStorage.removeItem('inputUserId');
      if (this.invalid) common.alert('warning', this.errorMessage.id);
      else this.onSubmit();
    },
    preparing() {
      common.alert('warning', 'Preparing...');
    },
    //* 로그인버튼 이벤트
    async onSubmit() {
      //* LINEAR ON
      common.setLinear(true);
      //* 접속 URL
      const loginURL = 'api/login.do';
      //* 데이터 파싱
      const loginInfo = {
        userId: this.userId.split(' ').join(''),
        password: this.password.split(' ').join(''),
      };
      //* params 설정
      const payload = {
        loginURL,
        loginInfo,
      };
      //* 로그인 요청
      await this[authTypes.actions.FETCH_LOGIN](payload);
      //* 로그인 여부 확인
      if (this.isLogin) this.$router.push('/dashboardAfter');
      //* LINEAR OFF
      else common.setLinear(false);
    },
    to(path) {
      this.$router.push(path);
    },
    onClick() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.className = this.className === 'pw_on' ? 'pw_off' : 'pw_on';
    },
  },
};
</script>
