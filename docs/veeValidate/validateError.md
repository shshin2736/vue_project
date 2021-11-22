---
title: ValidateError
---

# ValidateError 컴포넌트
유효성 검사 사용시 에러 메시지를 스크립트 영역에서 별도로 컨트롤 하기 위한 컴포넌트

## Props
- invalid: 유효성 검사 결과 (Boolean)

- validated: 유효성검사 동작 여부 (Boolean)

- errors: 에러메시지 (Object)*
```js
[ { name: String, msg: String }, ...n ]
```

## Events
- errors:  에러 반환 이벤트 (Function)
```js
function(invalid, validated, errors) { }
```

## ValidateError 컴포넌트 사용 예제
```vue {51,52,53,54,55,56,57}
<template>
  <div class="dashboard-wrap">
    <div class="dashboard-box">
      <div class="page__title">
        <strong>로그인</strong>
        <div class="page__nav">
          <a href="/dashboard">Home</a>
          <em>></em>
          <a href="/login" class="onpage">
            로그인
          </a>
          <button type="button">?</button>
        </div>
      </div>
      <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
        <form @submit.prevent="onSubmit">
          <div class="search-box">
            <div class="search__form__box">
              <p class="search__form__title email">
                E-Mail :
              </p>
              <span class="input__box">
                <com-input-text
                  id="uname"
                  classed="inputTmp"
                  label="E-MAIL"
                  rules="email|required"
                  v-model="email"
                ></com-input-text>
              </span>
            </div>
            <div class="search__form__box">
              <p class="search__form__title password">
                Password :
              </p>
              <span class="input__box">
                <com-input-text
                  id="psw"
                  classed="inputTmp"
                  rules="required"
                  type="password"
                  v-model="password"
                ></com-input-text>
              </span>
            </div>
            <div class="search__form__box">
              <button type="submit" class="black-btn write-btn">
                <span>전송</span>
              </button>
            </div>
            <!-- ValidateError 컴포넌트 영역 -->
            <com-validate-error
              :invalid="invalid"
              :validated="validated"
              :errors="errors"
              @errors="onErrors"
            ></com-validate-error>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: 'dolhead@gmail.com',
      password: 'hpp@2018',
      errorMessage: {},
    };
  },
  mounted() {
    this.$refs.obs.validate();
  },
  methods: {
    onErrors(invalid, validate, errors) {
      console.log(errors);
    },
    onSubmit() {
      console.log('submit');
    },
  },
};
</script>

```