---
title: Vue Router
---

# Vue Router란?
[Vue Router](https://router.vuejs.org/kr/)는 [Vue.js](https://vuejs.org/)의 공식 라우터 입니다.
자세한 내용은 공식 문서 참조하시기 바랍니다.

# Vue Router 설정
router/index.js 파일에 정의되어 있습니다.
```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        component: () => import('@/views/NotFoundPage.vue'),
    },
];

const router = new VueRouter({
    mode: 'abstract', // history, abstract, default hash
    base: process.env.BASE_URL,
    routes,
});

export default router;
```

## 네비게이션 가드 설정
전역 네비게이션 가드
```js
router.beforeEach((to, from, next) => {
    next()
})
```
지역 네비게이션 가드
```js
{
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
    beforeEnter(to, from, next) {
        next()
    },
}
```

## Vue Router 사용 예제
라우터 설정
```js
const routes = [
    {
        path: '/login',
        component: () => import('@/views/loginPage.vue'),
    },
];
```
컴포넌트
```vue
<template>
    <div>
        <router-link to="/login">로그인</router-link>
        <router-view></router-view>
    </div>
</template>
```