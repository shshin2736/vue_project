---
title: RoleGridVue
---

# RoleGridVue 컴포넌트
권한 설정 페이지 전용 그리드

## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-role-grid-vue :data="그리드 데이터" :columns="컬럼 데이터"></com-role-grid-vue>
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
        editable: '인라인 에디터 사용시 수정 여부' (Boolean),
        selected: '드롭다운 사용시' (Boolean),
        button: '버튼 사용시' (Boolean),
        ...n 
    }, 
    ...n 
]
```
- height: 그리드 높이 (String)
```js
default '300'
```

## Events
- onData: 데이터 변경 이벤트 (Fucntion)
```js
fuction(data) { }
```

## RoleGridVue 사용 예제
```vue
<template>
    <div>
        <com-role-grid-vue
            :data="gridData3"
            :columns="columns3"
            height="300"
            @onData="onData"
        ></com-role-grid-vue>
    </div>
</template>

<script>
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
    name: 'ProjectManagement',
    data() {
        return {
            columns3: [
                { field: 'roleCode', title: '권한코드', editable: false, width: 80 },
                { field: 'ko', title: '권한명(KO)', editable: true },
                { field: 'en', title: '권한명(EN)', editable: true },
                { field: 'zh', title: '권한명(ZH)', editable: true },
                {
                field: 'used',
                title: '사용여부',
                selected: true,
                editable: true,
                width: 200,
                },
                {
                field: 'menu',
                title: '메뉴',
                button: true,
                editable: false,
                width: 200,
                },
                {
                field: 'user',
                title: '사용자',
                button: true,
                editable: false,
                width: 200,
                },
            ],
            gridData3: [
                {
                inEdit: false,
                roleCode: 1,
                ko: '관리자',
                en: 'administrator',
                zh: 'admin',
                used: [
                    { cd: 'Y', cdNm: '사용', selected: true },
                    { cd: 'N', cdNm: '사용않함', selected: false },
                ],
                menu: {
                    title: '메뉴',
                    event: () => {
                    console.log('menu');
                    },
                },
                user: {
                    title: '사용자',
                    event: () => {
                    console.log('user');
                    },
                },
                },
                {
                inEdit: false,
                roleCode: 2,
                ko: '사용자',
                en: 'user',
                zh: 'user',
                used: [
                    { cd: 'Y', cdNm: '사용', selected: false },
                    { cd: 'N', cdNm: '사용않함', selected: true },
                ],
                menu: {
                    title: '메뉴',
                    event: () => {
                    console.log('menu');
                    },
                },
                user: {
                    title: '사용자',
                    event: () => {
                    console.log('user');
                    },
                },
                },
            ],
        }
    },
    methods: {
        onData(data) {
            console.log(data);
        },
    },
}
</script>
```