<template>
  <div></div>
</template>

<script>
export default {
  name: 'RedirectForm',
  beforeCreate() {
    if (this.$route.params.path) {
      const path = this.$route.params.path;
      const params = this.$route.params;
      this.$router.push({ name: path, params });
    } else {
      const path = this.$route.query.path;
      const params = this.$route.query;
      this.$router.push({ name: path, params });
    }
  },
};
</script>
