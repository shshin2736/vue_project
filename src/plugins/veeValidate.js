import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { required, max, min, email } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'NLS0001054',
  // '필수값 입력이 누락되었습니다.	'
});

extend('max', {
  ...max,
  message: 'This field must be {length} characters or less',
});

extend('min', {
  ...min,
  message: 'This field must be {length} characters or more',
});

extend('email', {
  ...email,
  // 이메일 형식이 아닙니다.이메일 형식이 아닙니다.
  message: 'NLS0000040',
});

extend('confirm', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  //입력한 두 개의 비밀번호가 서로  일치하지 않습니다.
  message: 'NLS0000039',
});

extend('checked', {
  validate(value) {
    return value !== '_';
  },
  message: 'this field must be checked',
});

extend('selected', {
  validate(value) {
    return value.cd !== undefined;
  },
  message: 'NLS0001054',
  // '필수값 입력이 누락되었습니다.	'
});

extend('passRegEx', {
  validate(value) {
    // const passRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%?^&*()_-])[A-Za-z\d~!@#$%?^&*()_-]{8,}$/;
    const passRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\u005b\u005d\-_])[A-Za-z\d@$!%*#?&\u005b\u005d\-_]{8,}$/;
    return passRegEx.test(value);
  },
  //비밀번호는 영문, 숫자, 특수문자 조합으로 8자리 이상이어야하며 연속된 숫자를 사용할 수 없습니다.
  message: 'NLS0001288',
});

extend('phoneRegEx', {
  validate(value) {
    const phoneRegEx = /^\d{3}-\d{3,4}-\d{4}$/;
    return phoneRegEx.test(value);
  },
  //휴대폰 번호는 숫자와 - 만 사용하실 수 있습니다.
  message: 'NLS0001289',
});

extend('requiredCK', {
  validate(value) {
    return value.length > 0 && value !== '<p></p>';
  },
  message: 'NLS0001054',
  // '필수값 입력이 누락되었습니다.	'
});

export default {
  install(Vue) {
    Vue.component('validation-observer', ValidationObserver);
    Vue.component('validation-provider', ValidationProvider);
  },
};
