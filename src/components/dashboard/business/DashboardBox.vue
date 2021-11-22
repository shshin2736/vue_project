<template>
  <div :class="mainClass">
    <div class="dashboard__titlebox">
      <p class="title">{{ title }}</p>
      <!-- 프로젝트 관리 필터, 설정 버튼 및 슬라이더 버튼 박스 -->
      <div class="dashboard__control">
        <div v-if="checkBtn" class="hms-periodbox">
          <div class="hms-period">
            <input
              type="checkbox"
              id="period1"
              @change="onChange"
              checked="checked"
            />
            <label for="period1" class="week-label">{{ checkLabel[0] }}</label>
            <label for="period1" class="day-label">{{ checkLabel[1] }}</label>
          </div>
        </div>
        <div v-if="searchBox" class="input__box">
          <input type="text" v-model="searchText" @keyup.enter="onSearch" />
          <button type="button" class="magnifier-btn-black" @click="onSearch">
            더찾기
          </button>
        </div>
        <button
          v-if="settingBtn"
          type="button"
          class="setting__btn"
          @click="onSetting"
        >
          <span>설정</span>
        </button>
        <button
          v-if="filterBtn"
          type="button"
          class="setting__btn"
          @click="onFilter"
        >
          <span>필터</span>
        </button>
        <div v-if="sliderAll" class="slider__btnbox">
          <button type="button" @click="onPrev" class="slider__left">
            <span>left</span>
          </button>
          <button type="button" @click="onNext" class="slider__right">
            <span>right</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 프로젝트 관리 슬릭 박스 -->
    <div v-if="!progress" :class="{ ['dashboard-header-fix']: headerFix }">
      <div v-for="(classNm, i) in contentsClassList" :key="i" :class="classNm">
        <VueSlickCarousel v-if="sliderAll" :arrows="false" ref="slickBox">
          <template>
            <slot :name="`slot${i}`"></slot>
          </template>
        </VueSlickCarousel>
        <VueSlickCarousel
          ref="sliderOne"
          v-else-if="sliderSingle && (!sliderOne || i === 0)"
          v-bind="sliderOption[i]"
        >
          <template>
            <slot :name="`slot${i}`"></slot>
          </template>
          <template
            v-if="sliderArrowsSize[i] === 'big'"
            #prevArrow="arrowOption"
          >
            <button type="button" class="dashboard-bigprev">
              {{ (currentPage = arrowOption.currentSlide) }}
            </button>
          </template>
          <template v-else #prevArrow="arrowOption">
            <button type="button" class="dashboard-prev">
              {{ (currentPage = arrowOption.currentSlide) }}
            </button>
          </template>
          <template
            v-if="sliderArrowsSize[i] === 'big'"
            #nextArrow="arrowOption"
          >
            <button type="button" class="dashboard-bignext">
              {{ (currentPage = arrowOption.currentSlide) }}
            </button>
          </template>
          <template v-else #nextArrow="arrowOption">
            <button type="button" class="dashboard-next">
              {{ (currentPage = arrowOption.currentSlide) }}
            </button>
          </template>
        </VueSlickCarousel>
        <slot v-else :name="`slot${i}`"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import { dashboardStore } from '@/mixins';
import * as dashboardTypes from '@/store/modules/dashboard/types';

export default {
  name: 'DashboardBox',
  mixins: [dashboardStore],
  components: {
    VueSlickCarousel,
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    mainClass: {
      type: String,
      required: false,
    },
    contentsClassList: {
      type: Array,
      required: false,
    },
    settingBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    filterBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    sliderAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    sliderSingle: {
      type: Boolean,
      required: false,
      default: false,
    },
    sliderOption: {
      type: Array,
      required: false,
    },
    sliderArrowsSize: {
      type: Array,
      required: false,
    },
    checkBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    checkLabel: {
      type: Array,
      required: false,
    },
    searchBox: {
      type: Boolean,
      required: false,
      default: false,
    },
    progress: {
      type: Boolean,
      required: false,
      default: false,
    },
    progressHeight: {
      type: String,
      required: false,
    },
    totalPage: {
      type: Number,
      required: false,
    },
    headerFix: {
      type: Boolean,
      required: false,
      default: false,
    },
    sliderOne: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      arrowOption: {
        currentSlide: 0,
        slideCount: 0,
      },
      currentPage: 0,
      searchText: '',
    };
  },
  watch: {
    currentPage: function(value) {
      if (this.mainClass === 'dashboard__kpinow') {
        this[dashboardTypes.actions.INIT_CURRENT_SLIDE_NO_KPI](value);
      } else if (this.mainClass === 'dashboard__teamboard') {
        this[dashboardTypes.actions.INIT_CURRENT_SLIDE_NO_BOARD](value);
      }
    },
  },
  methods: {
    //* 이전 이벤트
    onPrev() {
      if (this.currentPage === 0) this.currentPage = this.totalPage;
      else this.currentPage--;
      this.$refs.slickBox[0].prev();
    },
    //* 다음 이벤트
    onNext() {
      if (this.currentPage === this.totalPage) this.currentPage = 0;
      else this.currentPage++;
      this.$refs.slickBox[0].next();
    },
    //* 설정 버튼 이벤트
    onSetting(e) {
      this.$emit('setting', e);
    },
    //* 필터 버튼 이벤트
    onFilter(e) {
      this.$emit('filter', e);
    },
    onChange(e) {
      this.$emit('checkbox', e);
    },
    //* 찾기 이벤트
    onSearch() {
      this.$emit('search', this.searchText);
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard {
  &__titlebox {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    .title {
      flex: none;
      padding-right: 20px;
    }
  }
  &__control {
    margin-left: auto;
    display: flex;
    width: 100%;
    max-width: 400px;
    align-items: center;
    justify-content: flex-end;

    .input__box {
      width: 100%;
    }

    .slider__btnbox {
      width: 70px;
      flex: none;
    }
  }
  .setting__btn {
    display: inline-block;
  }
}
</style>
