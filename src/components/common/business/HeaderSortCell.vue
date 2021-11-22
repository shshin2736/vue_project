<template>
  <span>
    <a href="#" :class="classObj" @click="clickHandler">
      {{ title }}
      <span
        v-if="sortObj.type === 'DESC'"
        class="k-icon k-i-sort-asc-sm"
      ></span>
      <span
        v-if="sortObj.type === 'ASC'"
        class="k-icon k-i-sort-desc-sm"
      ></span>
    </a>
  </span>
</template>

<script>
export default {
  props: {
    field: String,
    title: String,
    sortable: [Boolean, Object],
  },
  data() {
    return {
      sortObj: {
        type: '',
        field: this.field,
      },
      sorted: false,
      classObj: {
        [`k-link`]: true,
      },
    };
  },
  methods: {
    clickHandler() {
      this.sortObj.type =
        this.sortObj.type === ''
          ? 'DESC'
          : this.sortObj.type === 'DESC'
          ? 'ASC'
          : '';
      const func = (items, field, sortType) => {
        return items.sort((a, b) => {
          var itemA = isNaN(Number(a[field]))
            ? a[field].toUpperCase()
            : a[field] === null
            ? 'Z'
            : Number(a[field]);
          var itemB = isNaN(Number(b[field]))
            ? b[field].toUpperCase()
            : b[field] === null
            ? 'Z'
            : Number(b[field]);
          if (sortType === 'DESC') {
            if (itemA < itemB) return -1;
            if (itemA > itemB) return 1;
            return 0;
          } else if (sortType === 'ASC') {
            if (itemA > itemB) return -1;
            if (itemA < itemB) return 1;
            return 0;
          } else return 0;
        });
      };
      this.$emit('headerSortEvent', this.sortObj, func, this.field);
    },
  },
};
</script>
