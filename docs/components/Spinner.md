---
title: Spinner
---

# Spinner 컴포넌트
Spinner CSS가 적용된 공통컴포넌트 입니다.

## 컴포넌트 호출 방법
라인 스피너
```html
<com-linear v-show=사용여부></com-linear>
```
서클 스피너
```html
<com-circle-spinner v-show=사용여부></com-circle-spinner>
```
막대 스피너
```html
<com-rect-spinner v-show=사용여부></com-rect-spinner>
```
큐브 스피너
```html
<com-sk-cube-spinner v-show=사용여부></com-sk-cube-spinner>
```

## Props
- value: 사용 여부 (Boolean)
```js
true | false
```

## Spinner 사용 예제
```vue
<template>
    <com-linear v-show="linear"></com-linear>
    <button @click="linear = !linear">linear on</button>
    <com-circle-spinner v-show="circle"></com-circle-spinner>
    <button @click="circle = !circle">circle on</button>
    <com-rect-spinner v-show="rect"></com-rect-spinner>
    <button @click="rect = !rect">rect on</button>
    <com-sk-cube-spinner v-show="cube"></com-sk-cube-spinner>
    <button @click="cube = !cube">cube on</button>
    <!-- Overlay 사용 시 ( 서클만 사용 ) -->
    <com-overlay v-model="circle">
        <com-circle-spinner></com-circle-spinner>
    </com-overlay>
</template>

<script>
export default {
    data() {
        return {
            linear: false,
            circle: false,
            rect: false,
            cube: false,
        }
    }
}
</script>
```
