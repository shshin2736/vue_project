<template>
  <span>
    <b>{{ title }}</b>
    <button type="button" class="columnhidden-btn" @click="clickHandler(field)">
      <span>column hidden</span>
    </button>
  </span>
</template>

<script>
export default {
  name: 'HeaderCell',
  props: {
    field: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    sortable: [Boolean, Object],
  },
  methods: {
    clickHandler(field) {
      this.$emit('hidden', field);
    },
  },
};
</script>
