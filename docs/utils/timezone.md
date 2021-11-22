---
title: Timezone
---

# Timezone
[Moment Timezone](https://momentjs.com/timezone/) 기반으로 구성된 타임존 설정 기능.

## Function List
문자열 날짜를 ISO08601 문자열로 변환
```js
convertToISO8601String(dateStr) {
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(4, 2) ? dateStr.substr(4, 2) : '01';
    const day = dateStr.substr(6, 2) ? dateStr.substr(6, 2) : '01';
    const hour = dateStr.substr(8, 2) ? dateStr.substr(8, 2) : '00';
    const minutes = dateStr.substr(10, 2) ? dateStr.substr(10, 2) : '00';
    const second = dateStr.substr(12, 2) ? dateStr.substr(10, 2) : '00';
    return `${year}${month}${day}T${hour}${minutes}${second}`;
  }
```
ISO8601를 타임스템프로 전환
```js
convertToTimestamp(ISO08601) {
    return moment(ISO08601).format('x');
}
```
ISO8601를 원하는 포멧 형식으로 전환
```js  
convertToDateFormat(ISO08601, format) {
    return moment(ISO08601).format(format);
}
```
기본 타임존 변경
```js
setTimezoneDefault(timezone) {
    moment.tz.setDefault(timezone);
}
```
기본 타임존 브라이저 기준 초기화
```js
setTimezoneInit() {
    moment.tz.setDefault();
}
```
사용자 타임존 영역 반환
```js
getTimezone() {
    return moment.tz.guess();
}
```
지정된 타임존의 오프셋 얻기
```js
getTimezoneOffset(timezone, timestamp) {
    return moment.tz.zone(timezone).utcOffset(timestamp);
}
```
사용가능한 모든 타임존 이름 목록 반환
```js
getTimezoneNames() {
    return moment.tz.names();
}
```
타임존 존재 확인 zone or null 반환
```js
getIsTimezone(timezone) {
    return moment.tz.zone(timezone);
}
```
모는 국가 코드 얻기
```js
getTimezoneCountries() {
    return moment.tz.countries();
}
```
국가 코드로 관련 지역 타임존 이름과 오프셋 얻기
```js
getTimezonesForCountries(code) {
    return moment.tz.zonesForCountry(code, { offset: true });
}
```
현재 클라이언트 시간을 원하는 포멧으로 반환
```js
getClientDate(format) {
    return moment().format(format);
}
```
현재 클라이언트 시간을 서버 타임존으로 원하는 포멧으로 반환
```js
getServerDate(format) {
    return moment
        .tz(Number(moment().format('x')), sessionStorage.getItem('serverTz'))
        .format(format);
}
```
문자열 날짜를 클라이언트 타임존으로 변환
```js
convertToClientTimeZone(dateStr, format) {
    const iso = this.convertToISO8601String(dateStr);
    const serverTz = sessionStorage.getItem('serverTz');
    const serverTime = moment.tz(iso, serverTz).format('x');
    const clientTz = this.getTimezone();
    return moment.tz(Number(serverTime), clientTz).format(format);
}
```
문자열 날짜를 서버 타임존으로 변환
```js
convertToServerTimeZone(dateStr, format) {
    const iso = this.convertToISO8601String(dateStr);
    const serverTz = sessionStorage.getItem('serverTz');
    return moment
        .tz(Number(this.convertToTimestamp(iso)), serverTz)
        .format(format);
}
```
날짜 객체를 문자열로 변환
```js
onvertToString(date) {
    const newDate = new Date(date.toString());
    const year = newDate.getFullYear();
    const month =
      newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth();
    const day =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    return `${year}${month}${day}`;
  },
```