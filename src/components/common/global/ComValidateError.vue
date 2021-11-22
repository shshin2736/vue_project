<template>
  <div>{{ onErrors }}</div>
</template>
<script>
export default {
  name: 'ComValidateError',
  props: {
    errors: {
      type: Object,
      required: true,
    },
    invalid: {
      type: Boolean,
      required: true,
    },
    validated: {
      type: Boolean,
      required: true,
    },
    step: {
      type: String,
      required: false,
    },
  },
  computed: {
    onErrors() {
      // const errors = [];
      let errors = {};
      for (let error of Object.entries(this.errors)) {
        let obj = {
          id: error[0],
          msg: error[1][0] === undefined ? '' : error[1][0],
        };

        if (obj.msg !== '') {
          errors = obj;
          break;
        }
        // errors.push(obj);
      }
      this.$emit('errors', this.invalid, this.validated, errors, this.step);
      return null;
    },
  },
};
</script>

<style scoped>
div {
  display: none;
}
</style>
