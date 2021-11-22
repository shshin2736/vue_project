<template>
  <!-- mheader__menu <=이곳에 "mheader__menu--open" 추가시 열림    -->
  <div :class="menuClass" @click="$emit('input', false)">
    <dl class="mhms-menu">
      <template v-for="(menuList, i) in data">
        <dt
          :key="menuList.title"
          :class="getMenuOpenClass[i]"
          @click.stop="open(i)"
        >
          <button type="button" class="menu-depth1">
            {{ menuList.title }}
          </button>
        </dt>
        <dd :key="i">
          <a
            v-for="(list, j) in menuList.children"
            :key="j"
            @click="toRouter(list.to)"
            >{{ list.title }}</a
          >
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
import { common } from '@/utils';

export default {
  name: 'MenuBarMobile',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      menuClass: { mheader__menu: true, 'mheader__menu--open': false },
      menuOpenClass: [],
    };
  },
  computed: {
    getMenuOpenClass(state) {
      if (state.menuOpenClass.length === 0)
        state.data.forEach((_, i) => {
          if (!state.menuOpenClass.open)
            state.menuOpenClass[i] = { open: false };
        });
      return state.menuOpenClass;
    },
  },
  watch: {
    value: function() {
      this.menuClass['mheader__menu--open'] = !this.menuClass[
        'mheader__menu--open'
      ];
    },
  },
  methods: {
    toRouter(to) {
      this.menuClass.open = false;
      if (to !== this.$route.path) {
        common.setLinear(true);
        setTimeout(() => {
          this.$router.push(to);
        }, 300);
        // this.$router.push(to);
      }
    },
    open(inx) {
      this.menuOpenClass = this.menuOpenClass.map((item, i) => {
        return { open: i === inx ? !item.open : false };
      });
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
