<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-small">
            <div class="layer-pop__title">
              <!-- 작성 방법 -->
              <p>{{ $t('NLS0000958') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <p class="taskinfo-title">
              {{ helpInfo.prjStepNm }}
            </p>
            <ul class="taskinfo-list">
              <li v-html="$t(helpInfo.helpMsg)"></li>
            </ul>
            <div class="page__btn-bbox type-center">
              <button type="button" class="black-btn" @click="closePopup">
                <!-- 확인 -->
                <span>
                  {{ $t('NLS0000959') }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>
<script>
// import { common } from '@/utils';
import ComOverlay from '@/components/common/global/ComOverlay';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'ProjectHelpPopup',
  components: { ComOverlay },
  mixins: [commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      helpInfo: {},
    };
  },
  computed: {
    getHelpInfo() {
      const item = this[commonTypes.getters.GET_PROJECT_HELP_INFO];
      return item;
    },
  },
  watch: {
    getHelpInfo: function(value) {
      this.helpInfo = value;
    },
  },
  methods: {
    closePopup() {
      this.$emit('input', false);
    },
  },
};
</script>
