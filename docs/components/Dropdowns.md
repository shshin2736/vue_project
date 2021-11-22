---
title: Dropdowns
---

# Dropdowns 컴포넌트

Kendo 라이브러리의 Dropdowns 컴포넌트 화

## 컴포넌트 호출 방법

기본적인 컴포넌트 호출 방법입니다.

```html
<com-dropdowns :data="드롭다운 데이터"></com-dropdowns>
```

## Props

- value: 데이터 바인딩 및 초기 선택 값 (String)

- textfield: 텍스트 필드 (String)

- valuefield: 옵션 값 필드 (String)

- data: 드롭다운 데이터 (Array)

```js
[{ text: String, value: String }, ...n];
```

- classed: 사용될 클래스명 (String)

```js
default 'hms-dropdown type1',
```

- rules: 유효성 규칙 (Sring)

```js
'required' | 'email' | ...n
```

- disabled: 활성화/비활성화 선택 (Boolean)

```js
default false,
```


자세한 옵션은 VeeValidate 설정 확인

## Events

- change: 드롭다운 변경이벤트 (function)

```js
function(e) { }
```

## Dropdowns 사용 예제

```vue
<template>
  <div>
    <com-dropdowns
      :data="data"
      :classed="classed"
      :disabled="disabled"
      rules="required"
      textfield="text"
      valuefield="value"
      v-model="selected"
      @change="onChange"
    ></com-dropdowns>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        { text: "Y", value: "Y" },
        { text: "N", value: "N" },
      ],
      selected: "Y",
      classed: "hms-dropdown type1",
      disabled: false,
    };
  },
  methods: {
    onchange(e) {
      console.log(e);
    },
  },
};
</script>
```
