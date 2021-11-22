<template>
  <validation-provider :name="id" :rules="rules">
    <drop-down-list
      ref="dropdowns"
      :data-items="setItems"
      :class="classed"
      :value="value"
      :data-item-key="'id'"
      :text-field="textfield"
      :value-field="valuefield"
      :disabled="disabled"
      @change="onChange"
    ></drop-down-list>
  </validation-provider>
</template>

<script>
import { DropDownList } from '@progress/kendo-vue-dropdowns';

export default {
  components: { DropDownList },
  props: {
    data: {
      type: Array,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    classed: {
      type: String,
      required: false,
    },
    value: {
      type: Object,
      required: false,
    },
    textfield: {
      type: String,
      required: false,
    },
    valuefield: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    animate: {
      type: Boolean,
      required: false,
      default: true,
    },
    opened: {
      type: Boolean,
      required: false,
      defaule: false,
    },
  },
  computed: {
    setItems(state) {
      const items = state.data;
      return items.length > 0
        ? items.map((item, i) => {
            item.id = i;
            if (
              state.id !== 'mbo' &&
              state.value &&
              state.value[state.textfield] &&
              state.value[state.textfield] === item[state.textfield]
            ) {
              state.value.id = i;
            } else if (
              state.value &&
              state.value[state.textfield] &&
              state.value.idx === item.id
            ) {
              state.value.id = i;
            }
            return item;
          })
        : [];
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e, this.id);
      this.$emit('input', e.value);
    },
  },
};
</script>

<style scoped lang="scss"></style>
