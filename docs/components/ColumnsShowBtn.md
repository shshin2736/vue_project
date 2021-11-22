---
title: ColumnsShowBtn
---

# ColumnsShowBtn 컴포넌트
NativeGrid 컴포넌트에서 숨김처리된 항목 표시 해주는 공통 버튼 컴포넌트 입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-columns-show-btn v-model="컬럼 데이터"></com-columns-show-btn>
```

## Props
- value: 컬럼데이터 (Array)*
```js
[ 
    { 
        field: '필드명' (String), 
        title: '컬럼명' (String), 
        className: '클래스명' (String), 
        cell: '커스텀셀' (Object), 
        ...n 
    }, 
    ...n 
]
```
- title: 버튼 내용 (String)
```js
default '숨김 항목 보기'
```

## ColumnsShowBtn 사용 예제
```vue
<template>
    <div>
        <com-columns-show-btn v-model="columns" title="숨김 항목 보기"></com-columns-show-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                { field: 'ProductID', title: '과제' },
                { field: 'Productgrade', title: '등급' },
            ],
        },
    }
}
</script>
```