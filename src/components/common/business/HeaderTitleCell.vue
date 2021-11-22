<template>
  <span>
    <b v-html="getTitle"></b>
  </span>
</template>

<script>
export default {
  props: {
    field: String,
    title: String,
    sortable: [Boolean, Object],
  },
  computed: {
    getTitle() {
      const title = this.title.split(' ');
      return `${title[0]}<br>${title[1]}`;
    },
  },
  methods: {
    clickHandler(e) {
      this.$emit('headerEvent', e);
    },
  },
};
</script>
