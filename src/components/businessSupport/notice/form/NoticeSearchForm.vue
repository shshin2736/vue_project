<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 기간 -->
      <p class="search__form__title">
        {{ $t('NLS0000263') }}
      </p>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="crrStartDate"
          @onChange="changeStartDate"
        ></com-date-picker>
      </span>
      <em class="date-divide">~</em>
      <span class="hms-datepicker type1">
        <com-date-picker
          :current="crrEndDate"
          @onChange="changeEndDate"
        ></com-date-picker>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 제목 -->
      <p class="search__form__title">
        {{ $t('NLS0000366') }}
      </p>
      <span class="input__box type-wide type-nobtn">
        <com-input-text
          v-model="srchTitle"
          @enter="srchNoticeData"
        ></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <com-button
        type="button"
        class="search__btn perm_read"
        :auth="$route.params.auth"
        @click="srchNoticeData"
      >
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </com-button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComButton from '@/components/common/global/ComButton';
import { noticeStore } from '@/mixins';
import * as noticeTypes from '@/store/modules/businessSupport/notice/types';
import { timezone, common } from '@/utils';

export default {
  name: 'NoticeSearchBox',
  mixins: [noticeStore],
  components: {
    ComButton,
    ComDatePicker,
    ComInputText,
  },
  data() {
    return {
      srchTitle: '',
      offset: 0,
      limit: 10,
      crrStartDate: new Date(),
      crrEndDate: new Date(),
    };
  },
  computed: {
    getSrchParam() {
      return this[noticeTypes.getters.GET_NTC_SRCH_PARAM];
    },
  },
  async created() {
    if (common.isEmpty(this.getSrchParam) || !this.$route.params.detail) {
      //* 날짜 default 한달 전 ~ 현재
      this.crrStartDate.setMonth(this.crrEndDate.getMonth() - 1);
    } else {
      this.litmit = this.getSrchParam.limit;
      this.offset = this.getSrchParam.offset;
      this.srchTitle = this.getSrchParam.srchTitle;
      this.crrStartDate = new Date(
        timezone.convertToClientTimeZone(this.getSrchParam.srchStartDate),
      );
      this.crrEndDate = new Date(
        timezone.convertToClientTimeZone(this.getSrchParam.srchEndDate),
      );
    }
    //* 공지사항 리스트를 받아 스토어에 저장.
    await this.srchNoticeData();
  },
  methods: {
    //* 날자 변경 이벤트.
    changeStartDate(date) {
      this.crrStartDate = date;
    },
    //* 날자 변경 이벤트.
    changeEndDate(date) {
      this.crrEndDate = date;
    },
    //* 검색 기능.
    async srchNoticeData() {
      if (this.crrEndDate < this.crrStartDate) {
        common.alert('warning', 'NLS0000636');
      } else {
        const convertStart = timezone.convertToString(this.crrStartDate);
        const convertEnd = timezone.convertToString(this.crrEndDate);
        const param = {
          srchStartDate: convertStart,
          srchEndDate: convertEnd,
          srchTitle: this.srchTitle,
          limit: this.$route.params.detail ? this.limit : 10,
          offset: this.$route.params.detail ? this.offset : 0,
        };
        if (this.$route.params.detail) this.$route.params.detail = '';
        //* 현재 검색 조건 store에 저장
        this[noticeTypes.actions.INIT_NTC_SRCH_PARAM](param);
        await this[noticeTypes.actions.FETCH_NOTICE_LIST](param);
      }
    },
  },
};
</script>
