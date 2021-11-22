<template>
  <span v-html="title"> </span>
</template>

<script>
export default {
  props: {
    field: String,
    title: String,
    sortable: [Boolean, Object],
  },
  methods: {
    clickHandler(e) {
      this.$emit('headerEvent', e);
    },
  },
};
</script>
