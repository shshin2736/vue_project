<template>
  <div class="page__tab-box type-equal">
    <button
      type="button"
      :class="{ tab__main: true, current: take }"
      disabled="!take"
      v-show="take"
      @click="onTab"
    >
      <!-- 업무 인계	 -->
      <span>{{ $t('NLS0000144') }}</span>
    </button>
    <button
      type="button"
      :class="{ tab__main: true, current: over }"
      disabled="!over"
      v-show="over"
      @click="onTab"
    >
      <!-- 업무 인수	 -->
      <span>{{ $t('NLS0000145') }}</span>
    </button>
  </div>
</template>
<script>
import { businessTakeOverStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
export default {
  name: 'TakeOverTabForm',
  mixins: [businessTakeOverStore],
  computed: {
    take: {
      set(value) {
        this[businessTakeOverTypes.actions.INIT_TAKE_TAB](value);
      },
      get() {
        return this[businessTakeOverTypes.getters.GET_TAKE_TAB];
      },
    },
    over: {
      set(value) {
        this[businessTakeOverTypes.actions.INIT_OVER_TAB](value);
      },
      get() {
        return this[businessTakeOverTypes.getters.GET_OVER_TAB];
      },
    },
  },
  methods: {
    onTab() {
      this.take = !this.take;
      this.over = !this.over;
      this[businessTakeOverTypes.actions.INIT_TAKE_TAB](this.take);
      this[businessTakeOverTypes.actions.INIT_OVER_TAB](this.over);
    },
  },
};
</script>
