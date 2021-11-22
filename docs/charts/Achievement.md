---
title: Achievement
---

# Achievement 그래프 컴포넌트
달성 그래프를 공통 컴포넌트화

## 컴포넌트 호출방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-achievement :data="그래프 데이터"></com-achievement>
```

## Props 종류
- data: 그래프 데이터 (Object)*
```js
{ title: '제목', percent: 80 },
```

## Achievement 그래프 사용예제
```vue
<template>
    <com-achievement :data="data"></com-achievement>
</template>

<script>
export default {
    data() {
        return {
            data: { title: '해외사료부분매출량', percent: 90 }
        }
    }
}
</script>
```
