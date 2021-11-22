<template>
  <div class="layerpopup-wrap" v-if="value">
    <div class="layerpopup-box type-basic">
      <div
        :class="{
          description: true,
          success: isSuccess,
          error: isError,
          warning: isWarning,
        }"
        v-html="msg"
      >
        <!-- {{ msg }} -->
      </div>
      <div class="popupbtn-box">
        <button
          type="button"
          ref="alert"
          :class="{
            fullbtn: true,
            success: isSuccess,
            error: isError,
            warning: isWarning,
          }"
          @click="onClick"
        >
          {{ $t('NLS0000959') }}
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
      isSuccess: false,
      isError: false,
      isWarning: false,
      icon: '&#33;',
      title: 'info',
      type: 'info',
      msg: 'message',
      timer: null,
    };
  },
  computed: {
    getAlertData() {
      return this[commonTypes.getters.GET_ALERT_DATA];
    },
  },
  watch: {
    value: function(value) {
      if (value && this.getAlertData.timer)
        this.timer = setTimeout(() => {
          this.onClick();
        }, this.getAlertData.timer * 1000);
    },
  },
  created() {
    this.initData();
  },
  beforeUpdate() {
    this.initData();
  },
  updated() {
    if (this.value) this.$refs.alert.focus();
  },
  methods: {
    onClick() {
      const alertData = this.getAlertData;
      clearTimeout(this.timer);
      if (typeof alertData.confirmCallback === 'function')
        alertData.confirmCallback();
      this.$emit('input', false);
    },
    initData() {
      const alertData = this.getAlertData;
      this.success = false;
      this.isError = false;
      this.isWarning = false;
      this.type = alertData.type;
      this.msg = alertData.msg;
      if (this.type === 'success') {
        this.isSuccess = true;
        this.icon = '&#10004;';
        this.title = 'success';
      } else if (this.type === 'warning') {
        this.isWarning = true;
        this.icon = '&#215;';
        this.title = 'warning';
      } else {
        this.isError = true;
        this.icon = '&#33;';
        this.title = 'info';
      }
    },
  },
};
</script>
