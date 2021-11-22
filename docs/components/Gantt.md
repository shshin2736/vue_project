---
title: Gantt
---

# Gantt 컴포넌트
Kendo UI 라이브러리의 Gantt를 컴포넌트 화 (기능은 계속 추가 될 예정)

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-gantt :columns="컬럼데이터" :datasource="간트데이터"></com-gantt>
```

## Props
- columns: 간트 컬럼 데이터 (Array)*
```js
{
    field: '데이터 필드명' (String),
    title: '컬럼 제목' (String),
    format: '포멧 형식' (String),
    editable: '수정여부' (Boolean),
    sortable: '정렬여부' (Boolean),
    width: '셀가로길이' (String),
}
```
- datasource: 칸트 데이터 (Array)*
```js
{
    id: 0 (Number),
    orderId: 0 (Number),
    parentId: null (Number),
    title: 'Main Project' (String),
    summary: false (Boolean),
    expanded: true (Boolean),
    start: new Date('2014/6/17 9:00') (Date),
    end: new Date('2014/6/17 15:00') (Date),
}
```

## Events
- databinding: 바인딩 시 데이터 소스 (Function)
```js
function(data) { }
```
- btnclick: 버튼 이벤트 (Function) 
```js
function(row) { }
```

## Gantt 사용 예제
```vue
<template>
    <div>
        <com-gantt :columns="columns" :datasource="localdatasource"></com-gantt>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                { field: 'id', title: 'ID', width: '40px' },
                {
                field: 'title',
                title: 'Title',
                editable: false,
                sortable: false,
                width: '150px',
                },
                {
                field: 'start',
                title: 'Start',
                format: '{0:MM/dd/yyyy}',
                editable: false,
                sortable: false,
                width: '120px',
                },
                {
                field: 'progress',
                title: 'progress',
                encoded: 'progress',
                width: '150px',
                },
                {
                field: 'button',
                title: 'button',
                encoded: 'button',
                width: '150px',
                },
                {
                field: 'end',
                title: 'End',
                format: '{0:MM/dd/yyyy}',
                editable: false,
                sortable: false,
                width: '120px',
                },
            ],
            localdatasource: [
                {
                id: 0,
                orderId: 0,
                parentId: null,
                title: 'Main Project',
                progress: '20',
                button: 'dd',
                summary: true,
                expanded: true,
                start: new Date('2014/6/17 9:00'),
                end: new Date('2014/6/17 15:00'),
                },
                {
                id: 1,
                orderId: 1,
                parentId: 0,
                title: 'Task1',
                progress: '80',
                button: 'dd',
                percentComplete: 0.47,
                start: new Date('2014/6/17 09:00'),
                end: new Date('2014/6/17 12:00'),
                },
                {
                id: 2,
                orderId: 2,
                parentId: 0,
                title: 'Task2',
                progress: '50',
                button: 'dd',
                percentComplete: 0.5,
                start: new Date('2014/6/17 09:30'),
                end: new Date('2014/6/17 12:30'),
                },
                {
                id: 3,
                orderId: 3,
                parentId: 0,
                title: 'Task3',
                progress: '20',
                button: 'dd',
                percentComplete: 0.5,
                start: new Date('2014/6/17 10:30'),
                end: new Date('2014/6/17 17:30'),
                },
            ],
        }
    }
}
</script>
```