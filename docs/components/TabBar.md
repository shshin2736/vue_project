---
title: TabBar
---

# TabBar 컴포넌트
탭기능 공통 컴포넌트화


## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-tab-bar v-model="탭 데이터"></com-tab-bar>
```

## Props
- value: 탭 데이터 (Object)*
```js
{
    id: Number,
    title: String,
    current: Boolean,
    children: [
        { id: Number, title: String, current:  Boolean}, ...n
    ],
},
```

## Events
- onTab: 탭 클릭 이벤트 (Function)
```js
function(id) { }
```

## TabBar 사용 예제
```vue
<template>
    <div>
        <com-tab-bar v-model="tab"></com-tab-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: {
                id: 0,
                title: 'main tab',
                current: true,
                children: [
                { id: 1, title: 'sub tab1', current: false },
                { id: 2, title: 'sub tab2', current: false },
                { id: 3, title: 'sub tab3', current: false },
                ],
            },
        }
    }
}
</script>
```