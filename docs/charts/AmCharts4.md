---
title: AmCharts4
---
# AmCharts4 컴포넌트
AmCharts4 라이브러리 기능 일부를 공통 컴포넌트화

## 컴포넌트 호출방법
기본적인 컴포넌트 호출 방법입니다.
```html
<com-am-chart :data="데이터" :options="옵션" type="차트종류"></com-am-chart>
```
## Props 종류
- data: 차트데이터 (Array)* 
```js
[ { key: value, ...n }, ...n ]
```
- options: 차트옵션 (Object)*
```js
{ key: value, ...n }
```
- type: 차트종류 (String)*
```js
'XY' | 'PIE' | 'GAUGE' | 'DURATION' | 'COLUMNBREAK' | 'MULTIPLEVALUE' | 'MULTIPLEDATE'
```
- width: 차트 가로길이 (String)

- height: 차트 세로길이 (String)

## XY 차트 예제
XY 차트를 사용하는 예제입니다.
```vue
<template>
    <com-am-chart
        :data="data"
        :options="options"
        type="XY"
        width="1000"
        height="500"
    ></com-am-chart>
</template>

<script>
export default {
    data() {
        return {
            // XY 차트 설정
            options: {
                titleX: 'XY-CHART', // X축 제목
                titleY: 'VALUE', // Y축 제목
                minGridDistance: 40, // x축 최소 간격
                category: 'date', // x 축 카테고리
                scrollBarX: true, // X축 스크롤 on/off
                scrollBarY: true, // Y축 스크롤 on/off
                legend: true, // 범례 on/off
                cursor: true, // 커서 on/off
                // 막대형 그래프 내용 설정
                columnSeries: [
                { valueY: 'litres', name: 'Sales', tooltip: true },
                { valueY: 'units', name: 'Units', tooltip: true },
                ],
                // 라인형 그래프 내용 설정
                lineSeries: [
                {
                    valueY: 'units',
                    name: 'Units',
                    tooltip: true,
                    strokeWidth: 3,
                },
                {
                    valueY: 'litres',
                    name: 'Sales',
                    tooltip: true,
                    strokeWidth: 3,
                },
                ],
            },
            // XY 차트 데이터
            data: [
                {
                date: '2020-01',
                litres: 501.9,
                units: 250,
                },
                {
                date: '2020-02',
                litres: 301.9,
                units: 222,
                },
            ],
        }
    }
}
</script>
```


## PIE 차트 예제
PIE 차트를 사용하는 예제입니다.
```vue
<template>
    <com-am-chart
      :data="pieData"
      :options="pieChartOptions"
      type="PIE"
      width="1000"
      height="500"
    ></com-am-chart>
</template>

<script>
export default {
    data() {
        return {
            // PIE 차트 설정
            options: {
                category: 'category', // 카테고리
                value: 'value', // 값
                legend: true, // 범례 on/off
                radius: 40, // 굴곡
            },
            // PIE 차트 데이터
            data: [
                {
                category: 'Korea',
                value: '30',
                },
                {
                category: 'China',
                value: '40',
                },
                {
                category: 'America',
                value: '50',
                },
            ],
        }
    }
}
</script>
```
