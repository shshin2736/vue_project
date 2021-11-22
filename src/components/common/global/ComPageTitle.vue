<template>
  <div class="page__title">
    <strong class="page__name">{{ $t(title) }}</strong>
    <div class="page__nav">
      <a style="cursor:pointer" @click="toPush('/dashboardAfter')">Home</a>
      <span v-for="(item, i) in data" :key="i">
        <em>></em>
        <a href="#" @click="toPush(item.link, item.params)">{{
          $t(item.title)
        }}</a>
      </span>
      <button type="button" class="nav-question-btn" @mouseenter="tooltipOpen">
        ?
      </button>
      <div
        v-if="show"
        class="question-box-hover nav"
        @mouseleave="tooltipClose"
      >
        <div class="question-box">
          <span
            v-if="
              getUserInfo.userType === 'ADMIN' ||
                getUserInfo.userType === 'SUPER'
            "
            >{{ tooltip }}</span
          >
          <!-- <div class="tip" v-html="$t(tooltip)"></div> -->
          <div class="ck-editor__main" style="border:0" role="presentation">
            <div
              class="tip2 ck-read-only"
              lang="en"
              dir="ltr"
              role="textbox"
              aria-label="Rich Text Editor, main"
              contenteditable="false"
              v-html="$t(tooltip)"
            ></div>
          </div>
          <!-- {{ $t(tooltip) }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as commonType from '@/store/modules/common/types';
import { commonStore } from '@/mixins';
export default {
  mixins: [commonStore],
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    data: {
      type: Array,
      required: true,
    },
    tooltip: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    getUserInfo(state) {
      const info = this[commonType.getters.GET_COM_USER_INFO];
      if (Object.keys(info).length > 0) {
        state.$i18n.locale = info.languageCode.toLowerCase();
      }
      return info;
    },
  },
  methods: {
    toPush(name, params) {
      if (this.$route.name !== name && name !== '')
        this.$router.push({
          name,
          params,
        });
    },
    tooltipOpen() {
      this.show = true;
    },
    tooltipClose() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
  /* border-bottom: 1px dotted black; */
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #eee;
  color: #999;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  width: 120px;
  top: 100%;
  left: 0;
  margin-left: -80px; /* Use half of the width (120/2 = 60), to center the tooltip */
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
.question-box .tip {
  display: flex;
  /* flex-direction: column; */
}

.question-box .tip2 {
  line-height: 20px;
  font-size: 12px;
  text-align: left;
  overflow: auto;
  max-width: 1000px;
}
</style>
