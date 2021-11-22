<template>
  <button type="button" class="white-btn" @click="onShow">
    <span v-html="isShow ? $t('NLS0000723') : $t('NLS0000724')"></span>
  </button>
</template>

<script>
export default {
  name: 'ComColumnsShowBtn',
  props: {
    value: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '숨김항목 보기',
    },
    field: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    onShow() {
      this.isShow = !this.isShow;
      // 숨김 체크
      const columns = this.value.reduce((acc, cur) => {
        let obj = {};
        if (cur.children === undefined) {
          obj = { ...cur };
          this.field.forEach(name => {
            if (name === obj.field) obj.hidden = this.isShow;
          });
        } else {
          obj = { ...cur };
          obj.children = obj.children.reduce((acc2, cur2) => {
            this.field.forEach(name => {
              if (name === cur2.field) cur2.hidden = this.isShow;
            });
            acc2.push(cur2);
            return acc2;
          }, []);
        }
        acc.push(obj);
        return acc;
      }, []);

      this.$emit('input', columns);
    },
  },
};
</script>
