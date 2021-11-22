---
title: DashboardBox
---

# DashboardBox 컴포넌트
대시보드에서 각 템플릿 공통화 컴포넌트 슬라이드 및 버튼과 설정, 필터, 이벤트 등을 포함하고 있습니다.


## 컴포넌트 호출 방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-dashboard-box></com-dashboard-box>
```

## Props
- title: 타이틀 문자 (String)

- mainClass: 메인 클래스명 (String)

- contetnsClass: 컨텍츠 영역 클래스명 (String)

- settingBtn: 셋팅버튼 on/off (Boolean)
```js
default false
```
- filterBtn: 필터버튼 on/off (Boolean)
```js
default false
```

## Events
- setting: 세팅버튼 클릭이벤트 (Function)
```js
function(e) { }
```
- filter: 필터버튼 클릭이벤트 (Function)
```js
function(e) { }
```

## DashboardBox 사용 예제
```vue
<template>
    <div>
        <com-dashboard-box
        title="프로젝트 관리"
        mainClass="dashboard__project-achievementbox"
        contentsClass="project-achievement__graphbox"
        :settingBtn="true"
        :filterBtn="true"
        :slider="true"
        @setting="onSetting"
        @filter="onFilter"   
        >
        <div>
        // 컨텐츠 내용
        <div>
        </com-dashboard-box>
    </div>
</template>

<script>
export default {
    methods: {
        onSetting(e) { console.log(e) },
        onFilter(e) { console.log(e) }
    }
}
</script>
```