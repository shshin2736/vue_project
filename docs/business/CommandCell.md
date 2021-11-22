---
title: CommandCell
---

# CommandCell 컴포넌트
네이티브 켄도 그리드 용 인라인 에디트 컴포넌트 입니다.

## 컴포넌트 사용 예제
컬럼에 에디트 속성 여부 적용 시 true 인 컬럼만 에디트 동작합니다.
```js
editable: true
```

```vue
<template>
  <div>
    <com-native-grid 
        :data="result" 
        :columns="columns" 
        editfield="inEdit"
        height="300"
        @save="save"
        @remove="remove"
    >
    </com-native-grid>
  </div>
</template>

<script>
import CommandCell from '@/components/common/business/CommandCell';

export default {
  data() {
    return {
      sort: [{ field: 'ProductID', dir: 'asc' }],
      filter: {
        logic: 'and',
        filters: [{ field: 'UnitPrice', operator: 'neq', value: 10 }],
      },
      columns: [
        { field: 'ProductID', title: '과제', width: '222px', editable: false },
        { field: 'Productgrade', title: '등급', editable: true },
        {
          field: 'UnitPrice',
          title: '담당부서',
          width: '146px',
          editable: true,
        },
        { field: 'UnitsInStock', title: '진척률', editable: true },
        { cell: CommandCell, width: '180px' },
      ],
    };
  },
  computed: {
    result() {
      return this.createRandomData(5);
    },
  },
  methods: {
    save(row) { console.log(row) },
    remove(row) { console.log(row) },
    createRandomData(count) {
      const productNames = [
        'Chai',
        'Chang',
        'Syrup',
        'Apple',
        'Orange',
        'Banana',
        'Lemon',
        'Pineapple',
        'Tea',
        'Milk',
      ];
      const productgrade = ['A', 'B', 'C', 'D', 'F'];
      const unitPrices = [12.5, 10.1, 5.3, 7, 22.53, 16.22, 20, 50, 100, 120];
      const units = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

      return Array(count)
        .fill({})
        .map((_, idx) => ({
          ProductID: idx + 1,
          ProductName:
            productNames[Math.floor(Math.random() * productNames.length)],
          Productgrade:
            productgrade[Math.floor(Math.random() * productgrade.length)],
          UnitPrice: unitPrices[Math.floor(Math.random() * unitPrices.length)],
          UnitsInStock: units[Math.floor(Math.random() * units.length)],
        }));
    },
  },
};
</script>

```