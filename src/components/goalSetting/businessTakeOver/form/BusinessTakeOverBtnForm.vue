<template>
  <div class="page__btn-tbox">
    <button type="button" class="blue-btn" @click="onClick2">
      <span>{{ $t('NLS0001403') }}</span>
    </button>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onClick"
    >
      <!-- 인수인계 등록 -->
      <span>{{ $t('NLS0000143') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { businessTakeOverStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';

export default {
  name: 'businessTakeOverBtnForm',
  mixins: [businessTakeOverStore],
  components: {
    ComButton,
  },
  methods: {
    onClick() {
      this[businessTakeOverTypes.actions.INIT_TAKE_TAB](true);
      this[businessTakeOverTypes.actions.INIT_OVER_TAB](false);
      this[businessTakeOverTypes.actions.INIT_PARAM]({});
      this[businessTakeOverTypes.actions.INIT_TAKE_KPI_LIST]([]);
      this[businessTakeOverTypes.actions.INIT_TAKE_PRJ_LIST]([]);
      this.$router.push({
        name: 'businessTakeOverTabPage',
        params: {
          auth: this.$route.params.auth,
          access: true,
        },
      });
    },
    onClick2() {
      this[businessTakeOverTypes.actions.INIT_PARAM]({});
      this.$router.push({
        name: 'kpiSystemChartTakeOverPage',
        params: {
          auth: this.$route.params.auth,
          access: true,
          fetch: 'Y',
        },
      });
    },
  },
};
</script>

<style></style>
