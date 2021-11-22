<template>
  <div
    class="achievement__graph-wrap box"
    @mouseleave.stop="tooltipLeaveEventHandler"
    @mouseenter.stop="tooltipEnterEventHandler"
  >
    <div class="percent">
      <svg>
        <circle cx="35" cy="35" r="35"></circle>
        <circle cx="35" cy="35" r="35" :style="getStyle"></circle>
      </svg>
      <div class="number">
        <h2>{{ data.percent }}<span>%</span></h2>
      </div>
    </div>
    <div
      class="text"
      ref="text"
      @mouseenter.stop="textEnterEventHandler"
      @mouseleave.stop="textLeaveEventHandler"
    >
      {{ data.title }}
    </div>
    <span
      v-show="isText"
      class="text-tooltip"
      @mouseenter.stop="textEnterEventHandler"
      @mouseleave.stop="textLeaveEventHandler"
    >
      <div class="msg text-tooltip-box">
        {{ data.title }}
      </div>
    </span>
    <span v-show="tooltip" class="tooltip">
      <div class="msg tooltip-box">
        {{ `${data.deptNm}` }}
      </div>
      <p class="msg tooltip-box">
        {{ `${data.userName}` }}
      </p>
      <p class="target tooltip-box">
        {{ `${$t('NLS0000327')}: ${data.targetMYy ? data.targetMYy : 0}` }}
      </p>
      <p class="result tooltip-box">
        {{ `${$t('NLS0001377')}: ${data.resultYy.toFixed(0)}` }}
      </p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ComAchievement',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fill: '#50b75c', // #50b75c > 69 , #fcbb45 > 39 , #fe6d6a
      tooltip: false,
      isText: false,
    };
  },
  computed: {
    getStyle() {
      const percent = 215 - (215 * this.data.percent) / 100;
      const style =
        this.data.percent > 0
          ? this.data.percent > 80
            ? this.data.percent > 90
              ? this.data.percent > 110
                ? `stroke-dashoffset:${
                    percent > 100 || percent < 0 ? 0 : percent
                  };stroke: rgb(27, 131, 202);`
                : `stroke-dashoffset:${
                    percent > 100 || percent < 0 ? 0 : percent
                  };stroke: rgb(80, 183, 92);`
              : `stroke-dashoffset: ${percent};stroke: rgb(252, 187, 69);`
            : `stroke-dashoffset: ${percent};stroke: rgb(254, 109, 106);`
          : `stroke-dashoffset: ${percent};stroke: #f3f3f3;`;
      return style;
    },
  },
  methods: {
    tooltipEnterEventHandler() {
      this.tooltip = true;
    },
    tooltipLeaveEventHandler() {
      this.tooltip = false;
    },
    textEnterEventHandler() {
      if (this.$refs.text.offsetWidth < this.$refs.text.scrollWidth) {
        this.tooltip = false;
        this.isText = true;
      }
    },
    textLeaveEventHandler() {
      if (this.$refs.text.offsetWidth < this.$refs.text.scrollWidth) {
        this.tooltip = true;
        this.isText = false;
      }
    },
  },
};
</script>

<style scoped>
.box {
  margin: 5px 10px;
  background: #fff;
  padding: 10px;
  width: 110px;
  height: 85px;
}
.box .percent {
  position: relative;
  width: 110px;
  height: 85px;
}
.box .percent svg {
  position: relative;
  width: 110px;
  height: 85px;
}
.box .percent svg circle {
  width: 110px;
  height: 85px;
  fill: none;
  stroke-width: 6;
  stroke: #000;
  transform: translate(20px, 73px) rotate(-90deg);
  stroke-dashoffset: 215;
  stroke-dasharray: 215;
  stroke-linecap: square;
}
.box .percent svg circle:nth-child(1) {
  stroke-dashoffset: 0;
  stroke: #f3f3f3;
}
.box .percent .number {
  position: absolute;
  top: -3px;
  left: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4b4b4b;
}
.box .percent .number h2 {
  font-size: 12px;
}
.box .percent .number h2 span {
  font-size: 12px;
}
.box .text {
  position: absolute;
  display: block;
  top: 90px;
  left: -8px;
  z-index: 10;
  bottom: 0px;
  width: 140px;
  letter-spacing: 1px;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}
.tooltip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 10%;
  left: -5%;
  padding: 3px 10px;
  width: 125px;
  height: 65px;
  z-index: 3;
  border: 1px solid #ababab;
  background: #fff;
}
.tooltip-box {
  margin: 2px 0;
  font-weight: 500;
  font-size: 12px;
  color: #000;
}
.text-tooltip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: 1px solid #ababab;
  padding: 1px 10px;
  width: 125px;
  z-index: 11;
  background: #fff;
}
.text-tooltip-box {
  margin: 2px 0;
  line-height: 13px;
  font-size: 12px;
  background: #fff;
  font-weight: 500;
}
.tooltip-box.dept-name {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
