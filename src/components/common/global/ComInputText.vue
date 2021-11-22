<template>
  <keep-alive>
    <validation-provider :name="id" immediate :rules="rules">
      <input
        :type="chkType"
        ref="text"
        :value="value"
        :disabled="disable"
        :name="name"
        :class="classed"
        :readonly="isReadOnly"
        :checked="check"
        :id="labelId ? labelId : id"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        @input="$emit('input', $refs.text.value)"
        @keyup.enter="onEnter"
        @keyup="onKeyup"
        @change="onChange"
      />
      <label v-if="labelId" :for="labelId">
        <template v-if="chkType === 'checkbox'">
          <em :class="labelClass">{{ labelTitle }}</em>
        </template>
        <template v-if="chkType === 'radio'">
          <em :class="labelClass">{{ labelTitle }}</em>
          <span v-for="(sub, idx) in subTitle" :key="idx"> - {{ sub }} </span>
        </template>
      </label>
    </validation-provider>
  </keep-alive>
</template>

<script>
export default {
  props: {
    rules: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    classed: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    value: {
      type: String,
      required: false,
    },
    isReadOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    check: {
      type: Boolean,
      required: false,
    },
    labelId: {
      type: String,
      required: false,
    },
    labelTitle: {
      type: String,
      required: false,
      default: '',
    },
    labelClass: {
      type: String,
      required: false,
      default: '',
    },
    subTitle: {
      type: Array,
      required: false,
    },
    autocomplete: {
      type: String,
      required: false,
    },
  },
  computed: {
    chkType() {
      let type = this.type;
      // if (type !== 'text' && type !== 'password') type = 'text';
      return type;
    },
  },
  methods: {
    onKeyup(e) {
      this.$emit('keyup', e);
    },
    onEnter(e) {
      this.$emit('enter', e);
    },
    onChange(e) {
      this.$emit('change', e);
    },
  },
};
</script>
<style scoped>
p {
  color: red;
  font-size: 0.5rem;
}
</style>
