<template>
  <div class="header__bottom" @mouseleave="onMouseleave">
    <div :class="menuClass">
      <a href="#" class="header__logo" @click="toDashboard">
        <img src="@/assets/images/logo_hms.png" alt="sunjin hms" />
      </a>
      <template v-for="(item, i) in data">
        <a :key="i" @mouseenter="onMouseover">{{ item.title }}</a>
      </template>
    </div>
    <div class="header__depth2" @mouseleave="onMouseleave">
      <ul v-for="(items, i) in data" :key="i">
        <li v-for="(item, i) in items.children" :key="i">
          <a @click="toRouter(item.to)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { common } from '@/utils';

export default {
  name: 'MenuBar',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      menuClass: { header__depth1: true, open: false },
    };
  },
  methods: {
    toDashboard() {
      this.menuClass.open = false;
      if (this.$route.path !== '/') {
        common.setLinear(true);
        setTimeout(() => {
          this.$router.push('/dashboardAfter');
        }, 100);
      }
    },
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
    onMouseover() {
      this.menuClass.open = true;
    },
    onMouseleave() {
      this.menuClass.open = false;
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
