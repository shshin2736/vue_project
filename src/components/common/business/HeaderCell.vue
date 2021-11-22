<template>
  <span>
    <b>{{ title }}</b>
    <button type="button" class="magnifier-btn-black" @click="clickHandler">
      <!-- 더 찾기 -->
      {{ $t('NLS0000956') }}
    </button>
  </span>
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
