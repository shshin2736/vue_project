<template>
  <div>
    <com-linear class="linear" v-show="linear"></com-linear>
    <com-overlay :index="1000" :loader="true" v-model="spinner">
      <com-circle-spinner></com-circle-spinner>
    </com-overlay>
  </div>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComLinear from '@/components/common/global/ComLinear';
import ComCircleSpinner from '@/components/common/global/ComCircleSpinner';
import { authStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as authTypes from '@/store/modules/auth/types';

export default {
  name: 'FooterBar',
  mixins: [authStore, commonStore],
  components: {
    ComCircleSpinner,
    ComLinear,
    ComOverlay,
  },
  computed: {
    show() {
      return this[commonTypes.getters.GET_APP_BAR];
    },
    authTypes() {
      return this[authTypes.getters.GET_VIEWS_IS_LOGIN];
    },
    linear() {
      return this[commonTypes.getters.GET_VIEWS_LINEAR];
    },
    spinner() {
      return this[commonTypes.getters.GET_VIEWS_SPINNER];
    },
  },
};
</script>

<style scoped>
.linear {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
