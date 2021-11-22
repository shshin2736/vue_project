<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-reportskin">
            <div class="layer-pop__title type4">
              <p>
                <!-- 보고서 스킨 선택 -->
                {{ $t('NLS0000902') }}
              </p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="report-skin-wrap">
              <div class="report-skin-box">
                <VueSlickCarousel ref="slickBox" v-bind="sliderOption">
                  <span v-for="(item, i) in getSkinList" :key="i">
                    <div class="slide-box">
                      <p class="title">{{ item.cdNm }}</p>
                      <img :src="item.opt1" :alt="item.cdNm" />
                    </div>
                  </span>
                  <template #prevArrow="arrowOption">
                    <button
                      type="button"
                      class="slide-prev-btn"
                      @click="onSlideClick('prev')"
                    >
                      {{ (currentPage = arrowOption.currentSlide) }}
                    </button>
                  </template>
                  <template #nextArrow="arrowOption">
                    <button
                      type="button"
                      class="slide-next-btn"
                      @click="onSlideClick('next')"
                    >
                      {{ (currentPage = arrowOption.currentSlide) }}
                    </button>
                  </template>
                </VueSlickCarousel>
              </div>
            </div>
            <button type="button" class="gray-btn" @click="onReportSave">
              <!-- 스킨 설정 -->
              <span>{{ $t('NLS0000558') }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import VueSlickCarousel from 'vue-slick-carousel';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types'; // import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import { specializedTasksStore } from '@/mixins';
import { common } from '@/utils';
export default {
  name: 'ProjectReportPopup',
  components: {
    VueSlickCarousel,
    ComOverlay,
  },
  mixins: [specializedTasksStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      sliderOption: {
        arrows: true,
        prevArrowClass: 'slide-prev-btn',
        nextArrowClass: 'slide-next-btn',
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      arrowOption: {
        currentSlide: 0,
        slideCount: 0,
      },
      currentPage: 0,
      slideCnt: 0,
    };
  },
  computed: {
    getSkinList() {
      return common.getCodeList('PRJ014').reduce((acc, cur) => {
        const obj = { ...cur };
        obj.opt1 = require(`@/assets${obj.opt1}`);
        acc.push(obj);
        return acc;
      }, []);
    },
  },
  methods: {
    async onReportSave() {
      const reportInfo = common.filterCode(
        this.getSkinList,
        `S${(this.currentPage + 1).toString()}`,
      );
      this[specializedTasksTypes.actions.INIT_PROJECT_REPORT_SKIN_INFO](
        reportInfo,
      );
      this.closePopup();
    },
    onSlideClick(flag) {
      const listSize = this.getSkinList.length - 1;
      if (flag === 'prev') {
        this.slideCnt = this.slideCnt === 0 ? listSize : this.slideCnt--;
      } else {
        this.slideCnt = this.slideCnt === listSize ? 0 : this.slideCnt++;
      }
    },
    closePopup() {
      this.$emit('input', false);
    },
  },
};
</script>
