<template>
  <div class="layerpopup-wrap" v-if="value">
    <div class="layerpopup-box type-basic">
      <div class="description warning">
        {{ getMsg }}
      </div>
      <div class="popupbtn-box">
        <button type="button" class="halfbtn confirm" @click="onConfirm">
          {{ confirmTxt }}
        </button>
        <button type="button" class="halfbtn cancel" @click="onCancel">
          {{ cancelTxt }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'ComAlert',
  mixins: [commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      msg: '',
      confirmTxt: this.$t('NLS0000959'),
      cancelTxt: this.$t('NLS0001259'),
    };
  },
  computed: {
    getMsg(state) {
      const confirmData = this[commonTypes.getters.GET_CONFIRM_DATA];
      if (confirmData.confirmTxt) state.confirmTxt = confirmData.confirmTxt;
      else state.confirmTxt = this.$t('NLS0000959');
      if (confirmData.cancelTxt) state.cancelTxt = confirmData.cancelTxt;
      else state.cancelTxt = this.$t('NLS0001259');
      state.msg = confirmData.msg;
      return state.msg;
    },
    getI18nState() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
  },
  watch: {
    getI18nState: function() {
      this.$forceUpdate();
    },
  },
  methods: {
    onConfirm() {
      const confirmData = this[commonTypes.getters.GET_CONFIRM_DATA];
      if (typeof confirmData.confirmCallback === 'function')
        confirmData.confirmCallback();
      this.$emit('input', false);
    },
    onCancel() {
      const confirmData = this[commonTypes.getters.GET_CONFIRM_DATA];
      if (typeof confirmData.cancelCallback === 'function')
        confirmData.cancelCallback();
      this.$emit('input', false);
    },
  },
};
</script>
