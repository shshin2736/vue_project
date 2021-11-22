---
title: DatePicker
---

# DatePicker 컴포넌트
Kendo 라이브러리의 DatePicker 컴포넌트 화

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-date-picker></com-date-picker>
```

## Props
- min: 날짜 최소범위 (Date)
```js
default new Date(new Date().getFullYear() - 20, 1, 1)
```
- max: 날짜 최대범위 (Date)
```js
default new Date(new Date().getFullYear() + 20, 12, 31)
```
- current: 현재 날짜 (Date)
```js
default new Date()
```
- format: 날짜 형식 (String)
```js
default 'yyyy-MM-dd'
```
- disabled: 활성화 및 비활성화 (Boolean)
```js
default false
```
- name: onChange 이벤트 발생 시 반환할 이름 속성 (String)
```js
default ''
```

## Events
- onChange: DatePicker 변경 이벤트 (Function)
```js
function(date, name) { }
```

## DatePicker 사용 예제
```vue
<template>
    <div>
        <com-date-picker
            :min="min"
            :max="max"
            :current="current"
            :format="format"
            :disabled="disabled"
            @onChange="onChange"
        ></com-date-picker>
    </div>
</template>

<script>
export default {
    data() {
        return {
            min: new Date(2010, 1, 1),
            max: new Date(2040, 12, 31),
            current: new Date(),
            format: 'yyyy/MM/dd'
            disabled: false,
        }
    },
    methods: {
        onChange(date) {
            console.log(date) 
        },
    }
}
</script>
```