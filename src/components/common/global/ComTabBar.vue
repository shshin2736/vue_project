<template>
  <div class="page__tab-box">
    <button
      :class="{ tab__main: true, current: value.current }"
      @click="onTab(value.id)"
    >
      <span>{{ value.title }}</span>
    </button>
    <template v-if="value.children !== undefined">
      <div
        v-for="(item, i) in value.children"
        :key="i"
        :class="{ tab__sub: true, current: item.current }"
      >
        <button type="button" class="tab-button" @click="onTab(item.id)">
          <span>{{ item.title }}</span>
        </button>
        <button type="button" class="tab-close" @click="onClose(item.id)">
          <span>close</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ComTapBar',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onTab(id) {
      let obj = { ...this.value };
      let title = '';
      if (id === this.value.id) {
        obj.current = true;
        obj.children.map(el => {
          el.current = false;
        });
        title = obj.title;
      } else {
        obj.current = false;
        obj.children.map(el => {
          if (el.id === id) {
            el.current = true;
            title = el.title;
            conten;
          } else el.current = false;
        });
      }
      this.$emit('input', obj);
      this.$emit('onTab', id, title);
    },
    onClose(id) {
      const children = this.value.children.filter(el => el.id !== id);
      const obj = {
        id: this.value.id,
        title: this.value.title,
        current: true,
        children: [...children],
      };

      obj.children.map(el => {
        if (el.current === true) el.current = false;
      });
      this.$emit('input', obj);
      this.$emit('deleteTab', obj);
    },
  },
};
</script>
