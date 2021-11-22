---
title: Vuex
---

# Vuex란?
[Vuex](https://vuex.vuejs.org/kr/)는 [Vue.js](https://vuejs.org/) 애플리케이션에 대한 상태관리 패턴 + 라이브러리 입니다.

자세한 내용은 공식 문서 참조하시기 바랍니다.

## Vuex 설정
store/index.js 파일에 정의되어 있습니다.
이 프로젝트에서는 현재 state와 mutations만 사용합니다.
```js
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
});
```

## Vuex 사용 예제
Vuex 설정
```js
export default new Vuex.Store({
  state: {
      users: [],
      opendialog : []
  },
  mutations: {
      SET_USERS(state, payload) {
          state.users = payload.users
      },
      OPEN_CALENDAR_DIALOG(state, payload){
          state.opendialog = payload.users
      }
  }
});
```

컴포넌트
```vue
<template>
    <button @click="setUsers">저장</button>
</template>

<script>
export default {
    data() {
        return {
            users: this.$store.state.users
        }
    },
    methods: {
        setUsers() {
            this.$store.commit('SET_USERS', { users: [ ...n ] })
        }
    }
}
</script>
```