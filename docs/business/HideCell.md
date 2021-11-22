---
title: HideCell
---

# HideCell 컴포넌트
네이티브 켄도 그리드 용 셀 숨김처리 버튼 헤더 컴포넌트 입니다.

## 컴포넌트 사용 예제
```vue
<template>
    <div>
        <com-native-grid
            :data="result"
            :columns="columns"
            :sortable="false"
            height="250"
            @btnclick="btnClickEvent"
        >
        </com-native-grid>
    </div>
</template>

<script>
import HideCell from '@/components/common/business/HideCell';

export default {
    data() {
        return {
            result: [
                { ProductID: 1, Productgrade: 'A' },
                { ProductID: 1, Productgrade: 'B' },
                { ProductID: 1, Productgrade: 'C' },
            ] 
            columns: [
                { field: 'ProductID', title: '과제' },
                {
                field: 'Productgrade',
                title: '등급',               
                headerCell: HideCell,         // 컴포넌트
                },
            ],
        }
    },
}
</script>
```