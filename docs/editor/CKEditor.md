---
title: CKEditor5
---

# CKEditor 컴포넌트
CKEditor5 라이브러리를 컴포넌트 화

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-ck-editor></com-ck-editor>
```

## Props
- value: 에디터 내용 (String)*

- types: 에디트 툴바 타입 (String)*
```js
'classic' | default 'balloon'
```

- disabled: 에디트 수정 및 입력 활성화 여부 (Boolean) 
```js
'disabled' | default false
```

## CKEditor 사용 예제
//* disabled 속성은 필수가 아닙니다.
```vue
<template>
    <div>
        <com-ck-editor v-model="editor" :disabled="disabledYn"></com-ck-editor>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editor: '',
            disabledYn: false,
        }
    }
 }
</script>
```