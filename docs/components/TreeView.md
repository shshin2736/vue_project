---
title: TreeView
---

# TreeView 컴포넌트
Kendo 라이브러리의 TreeView를 컴포넌트 화

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-tree-view :name=아이디 :dataSource=트리데이터></com-tree-view>
```

## Props
- name: 아이디(String)*

- dataSource: 트리데이터(Object)*
```js
{
    data: [
        {
            id: 아이디,
            text: 텍스트,
            url: 링크주소,
            expanded: 펼치기여부,
            items: [ 하위 데이터, ...n ],
        },
        ...n
    ]
}
```
- dragDrop: 드래그 앤 드랍 여부(Boolean)
```js
true | false | default(false)
```
- checkbox: 체크박스 사용 여부(Boolean)
```js
true | false | default(false)
```

## Events
- dataSource: 트리데이터 변경 이벤트(Function)
```js
function( 트리데이터 ) { }
```
- onCheck: 체크박스 이벤트 (Function)
```js
function ( e, items ) { }
``` 
- dragend: 드래그 앤드 이벤트 (Function)
```js
function ( e, parant ) { }
```

## TreeView 예제
```vue
<template>
    <com-tree-view
      :name="name"
      :dragDrop="dragDrop"
      :dataSource="dataSource"
      @dataSource="eventChk"
    ></com-tree-view>
</template>

<script>
export default {
  data() {
    return {
      name: 'treeView',
      dragDrop: true,
      source: [],
      dataSource: {
        data: [
          {
            id: 1,
            text: 'Brazil',
            url: '#',
            expanded: true,
            items: [
              {
                id: 2,
                text: 'Tables & Chairs',
                url: '#',
                expanded: true,
              },
              {
                id: 3,
                text: 'Sofas',
                url: '#',
                expanded: true,
              },
              {
                id: 4,
                text: 'ESLint',
                url: '#',
                expanded: true,
              },
              {
                id: 5,
                text: 'Vetur',
                url: '#',
                expanded: true,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    eventChk(dataSource) {
      console.log(dataSource);
      this.dataSource = dataSource;
    },
  },
};
</script>
```
