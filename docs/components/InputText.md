---
title: InputText
---

# InputText 컴포넌트
텍스트 박스 공통 컴포넌트 입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-input-text></com-input-text>
```

## Props
- id: 텍스트박스 고유 아이디 (String)*

- type: 텍스트 박스 속성 (String)
```js
'text' | 'password' | default 'text'
```
- rules: 유효성 검사 옵션 (String)
```js
'required' | 'email' | ...n
```
자세한 옵션은 VeeValidate 설정 확인

- value: 바인딩 될 데이터 속성 (String)

## Events
- keyup: 키업 이벤트 (function)
```js
function(e) { }
```
- enter: 엔터 이벤트 (function)
```js
function(e) { }
```
## InputText 사용 예제
```vue
<template>
    <div>
        <com-input-text
        rules="email|required"
        v-model="text"
        ></com-input-text>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: ''
        }
    },
}
</script>
```