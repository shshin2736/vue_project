---
title: FunctionCell
---

# FunctionCell 컴포넌트
네이티브 켄도 그리드 용 셀 커스텀 컴포넌트 입니다.

## Format 종류
- circle
- progress
- button
- check
- dropdown
- progress
- pupupButton
- link
- columns

## Editor 종류
- btn
- tree

## Events
- btnclick: 커스텀 셀 버튼 타입일 경우 클릭 이벤트 (Fucntion)
```js
function(value) { }
```
- columnsBtn: 커스텀 셀 컬럼 버튼 타입일 경우 클릭 이벤트 (Function)
```js
function(items, inx) { }
```

## 컴포넌트 사용 예제
```vue {29,30,31}
<template>
    <div>
        <com-native-grid
            :data="result"
            :columns="columns"
            :sortable="false"
            height="250"
            @btnclick="btnClickEvent"
        >
        </com-native-grid>
    </div>
</template>

<script>
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
    data() {
        return {
            result: [
                { ProductID: 1, Productgrade: 'A' },
                { ProductID: 1, Productgrade: 'B' },
                { ProductID: 1, Productgrade: 'C' },
            ] 
            columns: [
                { field: 'ProductID', title: '과제' },
                {
                field: 'Productgrade',
                title: '등급',               
                format: 'circle'            // 종류 
                className: 'gradecircle',   // 커스텀할 클래스 명
                cell: FunctionCell,         // 컴포넌트
                },
            ],
        }
    },
    methods: {
        btnClickEvent(rowData, value, field) {
            console.log(rowData);
            console.log(value);
            console.log(field);
        }
    }
}
</script>
```