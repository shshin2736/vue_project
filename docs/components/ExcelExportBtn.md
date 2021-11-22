---
title: ExcelExportBtn
---

# ExcelExportBtn 컴포넌트
Excel 파일로 다운로드 받기 위한 버튼 컴포넌트 입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-excel-export-btn :data="데이터" :columns="컬럼설정"></com-excel-export-btn>
```

## Props
- data: 엑셀 데이터 (Array)*
```js
[ { key: value, ...n }, ...n ]
```
- columns: 엑셀 컬럼 설정 (Array)*
```js
[ 
    { 
        field: '필드명' (String),
        title: '헤더명' (String),
        width: '셀넓이' (String),
        locked: '셀고정' (Boolean),
        hidden: '셀숨김여부' (Boolean),
        editable: '인라인 에디터 사용시 수정 여부' (Boolean),
        format: '커스텀 셀 사용시 종류' (String),
        className: '셀 클래스명' (String),
        cell: '커스텀 셀 객체' (Object),
        children: '그룹헤더 사용시 하위 노드 그룹' (Array),
        ...n 
    }, 
    ...n 
]
```
- title: 버튼의 이름 (String)
```js
default 'Excel Export'
```
- filename: 생성될 파일명 (String)
```js
default 'myFile'
```

## ExcelExportBtn 사용 예제
```vue
<template>
    <div>
        <com-excel-export-btn
        :data="result"
        :columns="columns"
        title="EXCEL로 저장"
        filename="test"
        ></com-excel-export-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            result: [
                { ProductID: 1, Productgrade: 'A' },
                { ProductID: 2, Productgrade: 'B' },
                { ProductID: 3, Productgrade: 'C' },
            ] 
            columns: [
                { field: 'ProductID', title: '과제' },
                { field: 'Productgrade', title: '등급' },
            ],
        },
    }
}
</script>
```