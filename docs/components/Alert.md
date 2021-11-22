---
title: Alert
---

# Alert 컴포넌트
Alert 컴포넌트

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-alert :msg="메시지" v-model="ON/OFF"></com-alert>
```

## Props
- msg: 출력 메시지 (msg)*

- value: ON/OFF (Boolean)*

## Alert 사용예제
```vue
<template>
  <div>
    <com-alert :msg="메시지" v-model="alert"></com-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
    };
  },
};
</script>

```