---
title: PanelBar
---

# PanelBar 컴포넌트
Kendo 라이브러리의 PanelBar 컴포넌트 화

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-panel-bar v-model=메뉴리스트></com-panel-bar>
```

## Props
- value: 메뉴리스트 (Array)*
```js
[ { title:제목, children: [ 하위메뉴리스트, ...n ] }, ...n ]
```

## PanelBar 사용 예제
```vue
<template>
    <com-panel-bar v-model="items"></com-panel-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'items1',
          children: [
            { title: 'item1.1', link: '#' },
            { title: 'item1.2', link: '#' },
          ],
        },
        {
          title: 'items2',
          children: [
            { title: 'item2.1', link: '#' },
            {
              title: 'item2.2',
              link: '#',
              children: [{ title: 'item2.2.3', link: '#' }],
            },
          ],
        },
      ],
    };
  },
};
</script>
```