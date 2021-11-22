---
title: ExcelImportBtn
---

# ExcelImportBtn 컴포넌트
Excel 파일로 임포트 받기 위한 버튼 컴포넌트 입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-excel-import-btn></com-excel-import-btn>
```

## Props
- title: 버튼의 이름 (String)
```js
default 'Excel Import'
```

## Events
- items: 파싱된 데이터 처리 (Function)
```js
function(items) { }
```

## ExcelImportBtn 사용 예제
```vue
<template>
    <div>
        <com-excel-import-btn
        title="EXCEL 등록"
        ></com-excel-import-btn>
    </div>
</template>

<script>
export default {

}
</script>
```