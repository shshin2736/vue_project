---
title: InputCheckbox
---

# InputCheckbox 컴포넌트
체크 박스 공통 컴포넌트 입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-input-checkbox id="아이디" value="속성값"></com-input-checkbox>
```

## Props
- id: 체크박스 고유 아이디 (String)*

- value: 체크박스 속성 값 (String)*

- rules: 체크박스 필수 체크 여부 (String)
```js
default 'checked'
```

## Events
- checked: 체크박스 체크 이벤트 (Function)
```js
function(id, checked, value) { }
```

## InputCheckbox 사용 예제
```vue
<template>
    <com-input-checkbox
        id="checkbox"
        rules="checked"
        value="1"
        @checked="onChecked"
    ></com-input-checkbox>
</template>

<script>
export default {
    methods: {
        onChecked(id, checked, value) {
            console.log(id, checked, value);
        },
    }
}
</script>
```