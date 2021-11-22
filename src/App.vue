<template>
  <div id="app">
    <div id="container">
      <div class="hms2020-main-layout">
        <app-bar v-if="isAppBar">
          <template v-slot:common>
            <common-popup-form></common-popup-form>
          </template>
        </app-bar>
        <router-view></router-view>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import AppBar from '@/components/common/layout/AppBar';
import CommonPopupForm from '@/components/common/layout/CommonPopupForm';
import FooterBar from '@/components/common/layout/FooterBar';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'App',
  components: {
    AppBar,
    CommonPopupForm,
    FooterBar,
  },
  mixins: [commonStore],
  computed: {
    isAppBar() {
      return this[commonTypes.getters.GET_APP_BAR];
    },
  },
};
</script>
<style lang="scss">
body {
  overflow: hidden;
}
@import './assets/css/main.css';
@import './assets/css/all.css';
@import './assets/css/vue-slick-carousel.css';
@import './assets/css/fixed.scss';
</style>
