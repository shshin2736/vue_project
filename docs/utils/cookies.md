---
title: cookies
---

# COOKIES
cookies 유틸

## Function List
쿠키 생성 함수
```js
setCookies(item) {
    const cookieData = `${item.name}=${item.value};expires=${item.expires}`;
    document.cookie = cookieData;
}
```
모든 쿠키 가져오기
```js
getAllCookies() {
    const obj = {};
    const items = document.cookie.split(';');
    for (let item of items) {
        const arrStr = item.trim().split('=');
        const key = arrStr[0];
        const value = arrStr[1];
        obj[key] = value;
    }
    return obj;
}
```
쿠키 가져오기
```js
getCookies(key) {
    const cookies = this.getAllCookies();
    return cookies[key] === undefined ? '' : cookies[key];
}
```
쿠키 삭제
```js
deleteCookies(name) {
    document.cookie = `${name}='';expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
```
