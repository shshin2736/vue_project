<template>
  <!-- <button class="white-btn excel-btn" @click="exportExcel">{{ title }}</button> -->
  <com-button
    class="white-btn excel-btn perm_down"
    :auth="$route.params.auth"
    @click="exportExcel"
    >{{ title }}</com-button
  >
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { saveExcel } from '@progress/kendo-vue-excel-export';

export default {
  name: 'ComExcelExport',
  components: {
    ComButton,
  },
  props: {
    data: {
      type: Array,
      required: false,
    },
    columns: {
      type: Array,
      required: false,
    },
    title: {
      type: String,
      required: false,
      default: 'Excel Export',
    },
    filename: {
      type: String,
      required: false,
      default: 'myFile',
    },
  },
  methods: {
    exportExcel() {
      saveExcel({
        data: this.data,
        fileName: `${this.filename}.xlsx`,
        columns: this.columns,
      });
    },
  },
};
</script>
