<template>
  <div
    class="overlay"
    v-if="value"
    :style="`z-index: ${index};`"
    @dragover.stop="dragover"
    @mousedown.self="onClick"
  >
    <div class="overlayContainer" :class="customClass" ref="overlayContainer">
      <div
        v-if="draggable"
        ref="drag"
        class="draggable-bar"
        :style="draggableBar"
        @mousedown.self="dragstart"
      ></div>
      <slot :trigger="trigger"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComOverlay',
  props: {
    customClass: {
      type: String,
    },
    value: {
      type: Boolean,
      required: true,
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false,
    },
    draggableHeight: {
      type: Number,
      required: false,
      default: 50,
    },
    loader: {
      type: Boolean,
      required: false,
      default: false,
    },
    dragBoxWidth: {
      type: Number,
      required: false,
    },
    dragBoxHeight: {
      type: Number,
      required: false,
    },
    index: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      distX: 0,
      distY: 0,
      posX: 0,
      posY: 0,
      container: null,
      close: null,
      offsetWidth: 0,
      offsetHeight: 0,
      containerTop: '',
      containerLeft: '',
      trigger: false,
      drag: false,
      draggableBar: {
        position: `absolute`,
        width: `calc(100% - 80px)`,
        height: `${this.draggableHeight}px`,
        background: `#00ff00 transparent`,
        zIndex: 20,
      },
    };
  },
  watch: {
    value: function(value) {
      this.trigger = value;
    },
  },
  mounted() {
    if (this.draggable) {
      this.getOffset();
      this.getPopupEl();
    }
  },
  updated() {
    if (this.draggable) {
      this.getOffset();
      this.getPopupEl();
    }
  },
  methods: {
    getOffset() {
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        this.offsetWidth = overlay.offsetWidth / 2;
        this.offsetHeight = overlay.offsetHeight / 2;
      }
    },
    getPopupEl() {
      const header = this.$refs.drag;
      const container = this.$refs.overlayContainer;
      const close = document.querySelector('.layer-close');
      if (header && container) {
        this.container = container;
        this.close = close;
      }
    },
    onClick(e) {
      e.stopPropagation();
      this.trigger = false;
    },
    mousemove(e) {
      this.offsetWidth = e.pageX + this.container.offsetWidth / 7.5;
      this.offsetHeight = e.pageY + this.container.offsetHeight / 2.5;
      this.container.style.left = `${this.offsetWidth}px`;
      this.container.style.top = `${this.offsetHeight}px`;
      this.container.ondragstart = function() {
        return false;
      };
    },
    dragover(e) {
      e.preventDefault();
    },
    dragstart(e) {
      e.stopPropagation();
      this.cnt = 0;
      this.distX = e.pageX;
      this.distY = e.pageY;
      this.container.style.left = `${this.offsetWidth}px`;
      this.container.style.top = `${this.offsetHeight}px`;
      document.addEventListener('mouseup', this.drop);
      document.addEventListener('mousemove', this.mousemove);
    },
    drop() {
      this.container.style.left = `${this.offsetWidth}px`;
      this.container.style.top = `${this.offsetHeight}px`;

      document.removeEventListener('mouseup', this.drop);
      document.removeEventListener('mousemove', this.mousemove);
    },
    dragDist(e) {
      e.stopPropagation();
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  position: absolute; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Black background with opacity */
  /*cursor: pointer; !* Add a pointer on hover *!*/
}
.overlayContainer {
  // max-width: calc(100% - 40px);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &.max-1000 {
    width: calc(100% - 40px);
    max-width: 1000px;
  }
  &.max-1221 {
    width: calc(100% - 40px);
    max-width: 1261px;
  }
  &.max-1417 {
    width: calc(100% - 40px);
    max-width: 1457px;
    max-height: 100%;
    height: 100%;
  }
  &.max-full {
    width: 100%;
    height: 100%;
  }
}
.overlayContainer.conference {
  max-width: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &.max-1000 {
    width: calc(100% - 40px);
    max-width: 1000px;
  }
  &.max-1221 {
    width: calc(100% - 40px);
    max-width: 1261px;
  }
  &.max-1417 {
    width: calc(100% - 40px);
    max-width: 1457px;
  }
}
.page__layer-pop .layer-pop {
  &__box {
    &.type-wide {
      width: 100%;
    }
    & .search-box.type-newtask {
      padding-top: 10px;
    }
  }
}

@media screen and (max-width: 1023px) {
  .page__layer-pop .layer-pop__box .layer-pop__title {
    padding-right: 0;
  }
}
</style>
