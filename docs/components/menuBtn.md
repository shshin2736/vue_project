---
title: MenuBtn 
---

# MenuBtn 컴포넌트
헤더 측 메뉴버튼 공통화 컴포넌트입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-menu-btn v-model="메뉴리스트"></com-menu-btn>
```

## Props
- value: 메뉴리스트 (Array)*
```js
{ 
  title: 제목, 
  mainClass: 메인 클래스명, 
  subClass: 서브 클래스명, 
  children: [ {
    id: 아이디,
    title: 제목,
  }, 
  ...n ] }
```

## Events
- onClick: 클릭이벤트 (Function)
```js
function(obj) { 
  console.log('id : ', obj.id)
  console.log('title : ', obj.title)
}
```

## MenuBtn 사용 예제
```vue
<template>
    <com-menu-btn v-model="items"></com-menu-btn>
</template>

<script>
export default {
  data() {
    return {
      items: {
        title: 'Korean',
        mainClass: 'header__language',
        subClass: 'header__language__button',
        children: [
          { id: 1, title: 'Korean' },
          { id: 2, title: 'English' },
          { id: 3, title: 'China' },
          { id: 4, title: 'vietnam' },
        ],
      }
    }
  },
};
</script>
```