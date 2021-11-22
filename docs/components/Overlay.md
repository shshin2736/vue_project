---
title: Overlay
---

# Overlay 컴포넌트
Overlay CSS가 적용된 공통컴포넌트입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-overlay v-model=사용여부></com-spinner>
```

## Props
- value: 사용 여부 (Boolean)*
```js
true | false
```
-draggable: 드래그 사용 여부 (Boolean)
```js
default false
```

## Overlay 사용 예제
```vue
<template>
    <com-overlay v-model="overlay">
        <button @click="overlay = !overlay">CLOSE</button>
    </com-overlay>
</template>

<script>
export default {
    data() {
        return {
            overlay: false,
        }
    }
}
</script>
```
