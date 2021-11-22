---
title: VeeValidate 유효성검사
---

# VeeValidate 유효성검사
유효성검사는 [VeeValidate](https://logaretm.github.io/vee-validate/) 라이브러리를 사용하고 있습니다.

자세한 내용은 공식 문서 참조하시기 바랍니다.

## VeeValidate 규칙 추가 방법
설정파일은 plugins/veeValidate.js 파일에 정의 되어 있습니다.
```js
extend('기능명', {
  validate(value) {
    return value > 0;
  },
  message: '출력 메시지',
})
```

## VeeValidate 사용 예제
```vue
<template>
  <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
      <form ref="frm">
        <div class="visible-spacer"></div>
        <com-input-text
          rules="email|required"
          v-model="text"
        ></com-input-text>
        <div class="visible-spacer"></div>
        <com-dropdowns 
        :data="data" 
        rules="required" 
        v-model="selected">
        </com-dropdowns>
        <div>{{ errors }}
        </div><button type="button" @click="onValidate">
          유효성검사
        </button>
        <button :disabled="invalid || !validated">
          전송
        </button>
      </form>
    </validation-observer>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { text: 'Y', value: 'Y' },
        { text: 'N', value: 'N' },
      ],
      selected: '',
      text: '',
    }
  },
  methods: {
    onValidate() {
      this.$refs.obs.validate();
    },
  }
}
</script>
```