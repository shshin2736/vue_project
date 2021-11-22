---
title: common
---

# COMMON
공통 유틸

## Function List
전체 공통 코드 리스트 가져오기
```js
getCodeListAll() {
    return commonStore.state.comCodeList;
}
```
선택한 코드 리스트 가져오기
```js
getCodeList(code) {
    const items = commonStore.state.comCodeList[code];
    return items;
},
```
코드 필터
```js
filterCode(codeList, cd) {
    return codeList.filter(item => {
        return item.cd === cd;
    })[0];
},
```
알림창 호출
```js
alert(type, code) {
commonStore.state.alertData = { type, msg: vm.$t(code) };
commonStore.state.views.comAlert = true;
}
```
다이아로그 호출
```js
confirm(code, confirmCallback, cancelCallback) {
    commonStore.state.confirmData = {
        msg: vm.$t(code),
        confirmCallback,
        cancelCallback,
    };
    commonStore.state.views.comConfirm = true;
}
```
LINEAR ON/OFF
```js
setLinear(item) {
    commonStore.state.views.linear = item;
}
```
슬립 함수
```js
sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```
목표값 계산용 함수
```js
getTargetYY(targetOYY, targetMYY, resultYY, achType) {
    var achRate = 0;
    var targetYY = 0;
    /**
     * 목표값 : targetOYY
     * 수정목표값: targetMYY
     * 실적값 : resultYY
     * 달성유형 : achType
     */

    //* 수정 목표가 존재하면 목표값 = 수정목표
    targetYY = targetMYY === null || targetYY === '' ? targetOYY : targetMYY;

    //* 증가형
    if (achType === 44) {
        //step1. 목표값이 0보다 클 경우
        if (targetYY > 0) {
        //step1-1. 실적값이 0 이 아니면 , 달성률 = ROUND((실적값/목표값),3) * 100
        if (resultYY !== 0) {
            achRate = (Math.round((resultYY / targetYY) * 1000) / 1000) * 100;
        }
        }
        //step2. 목표값이 0보다 클 경우
        else if (targetYY < 0) {
        //step2-1. 실적값이 0보다 크면 , 달성률 = (2-Round((실적값/목표),3)) * 100
        if (resultYY > 0) {
            achRate = (2 - Math.round((resultYY / targetYY) * 1000) / 1000) * 100;
        }
        //step2-2. 실적이0이면 ,실적값 0
        else if (resultYY === 0) {
            achRate = 0;
        }
        //step2-3. 실적값이 0보다 작고 목표값 보다 크거나 같으면, 달성률 = (2-Round((실적값/목표),3)) * 100
        else if (resultYY < 0 && resultYY >= targetYY) {
            (2 - Math.round((resultYY / targetYY) * 1000) / 1000) * 100;
        }
        //step2-4. 실적값이 0보다 작고 목표값 보다 작으면, 달성률 = ROUND((실적값/목표값),3) * 100
        else if (resultYY < 0 && resultYY < targetYY) {
            (Math.round((resultYY / targetYY) * 1000) / 1000) * 100;
        }
        }

        //step3.목표값이 0이면
        else if (targetYY === 0) {
        //step3-1. 실적값이 0이면 , 달성률 100
        if (resultYY === 0) {
            achRate = 100;
        }
        }
    }

    //*감소형
    else if (achType === 45) {
        //step1. 목표값이 0보다 크면
        if (targetYY > 0) {
        //step1-1. 실적이 0보다 크고 목표값보다 크면, 달성률 = ROUND((실적값/목표값),3) * 100
        if (resultYY > 0 && resultYY > targetYY) {
            achRate = (Math.round((targetYY / resultYY) * 1000) / 1000) * 100;
        }
        //step1-2. 실적이 0보다 작거나 목표값보다 작으면
        if (resultYY < 0 || resultYY <= targetYY) {
            achRate = (2 - Math.round((resultYY / targetYY) * 1000) / 1000) * 100;
        }
        //step1-3. 실적이 0이고 목표값 보다 이하면
        if (resultYY === 0 && resultYY <= targetYY) {
            achRate = 0;
        }
        }
        //step2. 목표값이 0보다 작으면
        else if (targetYY < 0) {
        achRate = (Math.round((resultYY / targetYY) * 1000) / 1000) * 100;
        }
        //step3. 목표값이 0 이면
        else if (targetYY === 0) {
        //step3-1. 실적이 0이면
        if (targetYY === 0) {
            achRate = 100;
        }
        }
    }

    return achRate;
},
```