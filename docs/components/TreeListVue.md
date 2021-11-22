---
title: TreeListVue
---

# TreeListVue 컴포넌트
Kendo 라이브러리의 TreeListVue를 컴포넌트 화

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-tree-list-vue :data="트리데이터" :columns="컬럼데이터"></com-tree-list-vue>
```

## Props
- data: 트리 데이터 (Array)*


※ ID 값은 고유값으로 필수 입니다. (없을 시 정상 동작하지 않음)
```js
[
    {
        id: '아이디'(Number)*,
        expanded: '펼침여부'(Boolean),
        필드명: '필드값'(String),
        children: '하위노드'(Array),
        ...n
    },
    ...n
]
```
- columns: 컬럼 데이터 (Array)*

Fromat 종류

editer : delete 버튼

datePicker : 인라인 에디트 시 데이트 픽커

managerSearch : 인라인 에디트 시 사용자 검색

popup: 팝업 버튼
```js
columns: [
  { 
    field: '필드명' (String), 
    title:'제목' (String), 
    width: '가로길이' (Number), 
    format:'포멧 종류' (String), 
    inEdit: '인라인 에디트 여부' (Boolean), 
    validate: '유효성 필드명' (Array),
    func: '유효성 함수' (Function)
  }, 
  ...n
],
```
- drag: 드래그 앤 드롭 여부 (Boolean)
```js
default false
```
- resize: 컬럼 사이즈 조절 (Boolean)
```js
default false
```
## Events
- change: 트리 CHANGE 이벤트 (Function)
```js
function( treeData ) { }
```
- checked: 체크박스 사용 시 체인지 이벤트 (Function)
```js
function( e, treeData ) { }
```
- delete: 삭제버튼 사용 시 클릭 이벤트 (Function)
```js
function( e, treeData ) { }
```
- select: row 선택 이벤트 (Function)
```js
function( e, items ) { }
```
- onClick: 셀 선택 이벤트 (Function)
```js
function( e, field, items ) { }
```
- popup: 팝업 버튼 이벤트 (Function)
```js
function( e, items ) { }
```
- update: 인라인 에디트 업데이트 이벤트 (Function)
```js
function( e, treeData, data ) { }
```

## TreeListVue 예제
```vue
<template>
  <com-tree-list-vue 
    :data="localData" 
    :columns="columns"
    :drag="true"
    @change="onChange"
    @checked="onChecked"
    @delete="onDelete"
    @select="onClick"
  ></com-tree-list-vue>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          field: 'Name',
          title: 'Name',
          format: 'popup',
          width: 140,
        },
        {
          field: 'Position',
          title: 'Position',
          width: 140,
        },
        {
          field: 'checkbox',
          title: 'checkbox',
          format: 'checkbox',
          width: 140,
        },
        {
          format: 'editor',
          width: 140,
        },
      ],
      localData: [
        {
          id: 1,
          Name: 'Jane Smith',
          Position: 'CEO',
          checkbox: { value: 1, title: 'check', checked: false },
          popup: true,
          expanded: true,
          children: [
            {
              id: 2,
              Name: 'Alex Sells',
              Position: 'EVP Sales',
              checkbox: { value: 1, title: 'check', checked: false },
              popup: false,
              expanded: true,
              children: [
                {
                  id: 3,
                  Name: 'Sells',
                  Position: 'EVP Sales',
                  checkbox: { value: 1, title: 'check', checked: false },
                  popup: false,
                  expanded: true,
                },
                {
                  id: 4,
                  Name: 'Bob Price',
                  Position: 'EVP Marketing',
                  checkbox: { value: 1, title: 'check', checked: false },
                  popup: false,
                  expanded: true,
                },
              ],
            },
            {
              id: 5,
              Name: 'Price',
              Position: 'EVP Marketing',
              checkbox: { value: 1, title: 'check', checked: false },
              popup: false,
              expanded: true,
            },
          ],
        },
        {
          id: 6,
          Name: 'Jane Smith',
          Position: 'CEO',
          checkbox: { value: 1, title: 'check', checked: false },
          popup: false,
          expanded: true,
          children: [
            {
              id: 7,
              Name: 'Alex Sells',
              Position: 'EVP Sales',
              checkbox: { value: 1, title: 'check', checked: false },
              popup: false,
              expanded: true,
            },
            {
              id: 8,
              Name: 'Bob Price',
              Position: 'EVP Marketing',
              checkbox: { value: 1, title: 'check', checked: true },
              popup: false,
              expanded: true,
            },
          ],
        },
      ],
    };
  },
  computed: {
    getCheckBoxEl() {
      return this.localData.map(obj => {
        obj.checkbox = `<input type="checkbox" value="${obj.id}" />`;
        return obj;
      });
    },
  },
  methods: {
    onChange(e, treeData) {
      console.log(e, treeData);
    },
    onChecked(e, treeData) {
      console.log(e, treeData);
    },
    onDelete(e, treeData) {
      console.log(e, treeData);
    },
    onClick(e, items) {
      console.log(e, items);
    }
  },
};
</script>
```
