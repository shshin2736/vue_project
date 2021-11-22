<template>
  <td v-if="!dataItem['inEdit']">
    <span class="command-btn-wrap">
      <button class="brightgray-btn pencil-btn2" @click="editHandler">
        Edit
      </button>
      <button class="brightgray-btn delete-btn" @click="removeHandler">
        Remove
      </button>
    </span>
  </td>
  <td v-else>
    <span class="command-btn-wrap">
      <button class="red-btn check-btn" @click="addUpdateHandler">
        {{ 'Update' }}
      </button>
      <button class="deepdarkgray-btn cancel-btn" @click="cancelDiscardHandler">
        {{ 'Cancel' }}
      </button>
    </span>
  </td>
</template>

<script>
export default {
  props: {
    field: String,
    dataItem: Object,
    format: String,
    className: String,
    columnIndex: Number,
    columnsCount: Number,
    rowType: String,
    level: Number,
    expanded: Boolean,
    editor: String,
  },
  methods: {
    editHandler() {
      this.$emit('edit', { dataItem: this.dataItem });
    },
    removeHandler() {
      this.$emit('remove', { dataItem: this.dataItem });
    },
    addUpdateHandler() {
      this.$emit('save', { dataItem: this.dataItem });
    },
    cancelDiscardHandler() {
      this.$emit('cancel', { dataItem: this.dataItem });
    },
  },
};
</script>

<style></style>
