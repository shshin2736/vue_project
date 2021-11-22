---
title: NativeGrid
---

# NativeGrid 컴포넌트
Kendo UI 라이브러리의 Native Grid를 컴포넌트 화 (기능은 계속 추가 될 예정)

자세한 내용은 공식 문서 참조 바랍니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-native-grid :data="그리드데이터" :columns="컬럼데이터"></com-native-grid>
```

## Props
- data: 그리드 데이터 (Array)*
```js
[ { key: value, ...n }, ...n ]
```
- columns: 그리드 컬럼 데이터 (Array)*
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
        inCell: '인셀 에디터 여부' (Boolean),
        ...n 
    }, 
    ...n 
]
```
- sortable: 정렬 여부 (Boolean)
```js
default false
```
- sort: 정렬 속성 (Array)
```js
[ 
    { 
        field: '필드명' (String),
        dir: '정렬속성' (String),
        ...n 
    }, 
    ...n ]
```
- pageable: 페이징 여부 (Boolean)
```js
default false
```
- skip: 현재 페이지 (Number)
```js
default 0
```
- take: 표시될 아이템 수 (Number)
```js
default 10
```
- total: 아이템 총 갯 수 (Number)
```js
default data의 총 갯 수 체크
```
- filterable: 필터 사용 여부 (Boolean)
```js
default false
```
- filter: 필터 속성 (Object)
```js
{
    login: 'and' | 'or' | 'not',
    filters: [
        { field: '필드명' (String), operator: '지시값' (String), value: '기본값' (Any) }
    ]
}
```
- selectedfield: 선택 속성 (String)
```js
default 'selected'
```
- selectedtype: 선택 종류 (String)
```js
'checked' | default 'selected' 
```
- selectedwidth: 체크박스 셀 넓이 (String)
```js
default '80'
```
- editfield: 에디트 여부 (String)
```js
default 'inEdit'
```
- height: 그리드 높이 (String)
```js
default '250'
```
- resizable: 컬럼 리사이즈 여부 (Boolean)
```js
default false
```

## Events
- btnclick: 커스텀 셀 버튼 타입일 경우 클릭 이벤트 (Fucntion)
```js
fuction(rowData, value, field) { }
```
- selected: row 선택 시 이벤트 (Function)
```js
function(row) { }
```
- checked: 체크 이벤트 (Function)
```js
function(row, checked) { }
```
- allchecked: 전체 선택 이벤트 (Function)
```js
function(items, checked) { }
```
- save: 인라인 및 인셀 에디트 세이브 이벤트 (Function)
```js
function(row) { }
```
- remove: 인라인 에디트 삭제 이벤트 (Function)
```js
function(row) { }
```
- pageChange: 페이징 이벤트 (Function)
```js
function(skip, take) { }
```

## 커스텀 셀 사용 방법
셀 기능 추가 - [FuctionCell 참조](/business/FunctionCell)

헤더 숨김처리 기능 추가 - [HideCell 참조](/bussiness/HideCell)

인라인 에디트 커멘트 셀 - [CommandCell 참조](/bussiness/CommandCel)

## NativeGrid 사용 예제
```vue
<template>
    <div>
        <com-native-grid
            :data="result"
            :columns="columns"
            :sortable="true"
            :sort="sort"
            :pageable="true"
            :skip="0"
            :take="10"
            :total="20"
            :filterable="true"
            :filter="filter"
            height="250"
        >
        </com-native-grid>
    </div>
</template>

<script>
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
    name: 'ProjectManagement',
    data() {
        return {
            sort: [{ field: 'ProductID', dir: 'asc' }],
            filter: {
                logic: 'and',
                filters: [{ field: 'UnitPrice', operator: 'neq', value: 10 }],
            },
            columns: [
            { field: 'ProductID', title: '과제', width: '222px' },
            {
                field: 'Productgrade',
                title: '등급',
                width: '77px',
                format: 'circle',
                className: 'gradecircle',
                cell: FunctionCell,
            },
            { field: 'UnitPrice', title: '담당부서', width: '146px' },
            {
                field: 'UnitsInStock',
                title: '진척률',
                format: 'progress',
                className: 'project-managebox-graph size',
                cell: FunctionCell,
            },
            ],
        }
    },
    computed: {
        result() {
        return this.createRandomData(30);
        },
    },
    methods: {
        onFilter() {},
        createRandomData(count) {
        const productNames = [
            'Chai',
            'Chang',
            'Syrup',
            'Apple',
            'Orange',
            'Banana',
            'Lemon',
            'Pineapple',
            'Tea',
            'Milk',
        ];
        const productgrade = ['A', 'B', 'C', 'D', 'F'];
        const unitPrices = [12.5, 10.1, 5.3, 7, 22.53, 16.22, 20, 50, 100, 120];
        const units = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

        return Array(count)
            .fill({})
            .map((_, idx) => ({
            ProductID: idx + 1,
            ProductName:
                productNames[Math.floor(Math.random() * productNames.length)],
            Productgrade:
                productgrade[Math.floor(Math.random() * productgrade.length)],
            UnitPrice: unitPrices[Math.floor(Math.random() * unitPrices.length)],
            UnitsInStock: units[Math.floor(Math.random() * units.length)],
            }));
        },
    },
}
</script>
```