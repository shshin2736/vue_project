---
title: route
---

# ROUTE
router interceptor 용 유틸

## Function List
토큰 재발급
```js
async reissuedAccessToken() {
    const refreshToken = cookies.getCookies('refreshToken');
    if (refreshToken) {
        try {
        //* 토큰 가져오기
        if (!authStore.state.views.isLogin) await getAccessToken(refreshToken);
        commonStore.state.views.appBar = true;
        return true;
        } catch (error) {
        errorEventHandler(error);
        return false;
        }
    } else {
        return false;
    }
}
```
공통 코드 가져오기
```js
async fetchedCodeList() {
    try {
        if (commonStore.state.comCodeList.length === 0) await getCodeList();
    } catch (error) {
        errorEventHandler(error);
    }
}
```
다국어 가져오기
```js
async fechedI18nList() {
    try {
        if (commonStore.state.i18nList.length === 0) await getI18nList();
    } catch (error) {
        errorEventHandler(error);
    }
}
```
APPBAR 설정
```js
    setAppBar(item) {
    commonStore.state.views.appBar = item;
}
```
