---
title: MenuBar
---

# MenuBar 컴포넌트
헤더 측 메뉴버튼 공통화 컴포넌트입니다.

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-menu-bar :data="메뉴리스트"></com-menu-btn>
```

## Props
- data: 메뉴리스트 (Array)*
```js
[
  {
    title: '제목',
    to: '링크',
    children: [{ title: '제목', to: '링크',}, ...n],
  },
  ...n
]
```

## MenuBtn 사용 예제
```vue
<template>
  <com-menu-bar :data="items"></com-menu-bar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: '업무실행',
          to: '#',
          children: [
            { title: 'KPI 실적', to: '#' },
            { title: '과제 실행', to: '#' },
            { title: 'KPI 그래프', to: '#' },
            { title: '조직 MBO 현황', to: '#' },
          ],
        },
        {
          title: '목표수립',
          to: '#',
          children: [
            { title: '전략 수립', to: '#' },
            { title: 'KPI 목표 수립', to: '#' },
            { title: 'MBO 관리', to: '#' },
            { title: 'MBO 운영', to: '#' },
            { title: '업무 인수인계', to: '#' },
          ],
        },
        {
          title: '업무지원',
          to: '#',
          children: [
            { title: '자료 검색', to: '#' },
            { title: '공지 사항', to: '#' },
            { title: '팀 게시판', to: '#' },
            { title: '이용 문의', to: '#' },
          ],
        },
        {
          title: '시스템관리',
          to: '#',
          children: [
            { title: 'KPI 속성', to: '#' },
            { title: '부서 관리', to: '#' },
            { title: '직원 정보', to: '#' },
            { title: '메뉴 정보', to: '#' },
            { title: '권한 그룹 설정', to: '#' },
            { title: '다국어 설정', to: '#' },
            { title: '코드 관리', to: '#' },
            { title: '시스템 현황', to: '#' },
          ],
        },
      ]
    }
  },
};
</script>
```