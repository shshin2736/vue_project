<template>
  <div ref="datepicker" @mouseleave="mouseleave" @mouseenter="mouseenter">
    <template v-if="!direction">
      <localization-provider :language="$i18n.locale">
        <intl-provider :locale="$i18n.locale">
          <date-picker
            :min="min"
            :max="max"
            v-model="now"
            :format="format"
            :disabled="disabled"
            @change="onChange"
          ></date-picker>
        </intl-provider>
      </localization-provider>
    </template>
    <template v-else>
      <div ref="calendar" :class="{ 'datepicker-wrap': true, [id]: true }">
        <div :class="calendarClass" :style="calendarStyle">
          <localization-provider :language="$i18n.locale">
            <intl-provider :locale="$i18n.locale">
              <calendar
                v-show="show"
                :min="min"
                :max="max"
                v-model="now"
                @change="onChange"
              />
            </intl-provider>
          </localization-provider>
        </div>
        <date-picker
          v-model="now"
          :format="format"
          :disabled="disabled"
          :show="false"
          @change="onChange"
        ></date-picker>
      </div>
    </template>
  </div>
</template>

<script>
import { timezone } from '@/utils';
import {
  IntlProvider,
  loadMessages,
  LocalizationProvider,
  load,
} from '@progress/kendo-vue-intl';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbersKo from 'cldr-numbers-full/main/ko/numbers.json';
import caGregorianKo from 'cldr-dates-full/main/ko/ca-gregorian.json';
import dateFieldsKo from 'cldr-dates-full/main/ko/dateFields.json';
import timeZoneNamesKo from 'cldr-dates-full/main/ko/timeZoneNames.json';
import numbersEn from 'cldr-numbers-full/main/en/numbers.json';
import caGregorianEn from 'cldr-dates-full/main/en/ca-gregorian.json';
import dateFieldsEn from 'cldr-dates-full/main/en/dateFields.json';
import timeZoneNamesEn from 'cldr-dates-full/main/en/timeZoneNames.json';
import numbersZh from 'cldr-numbers-full/main/zh/numbers.json';
import caGregorianZh from 'cldr-dates-full/main/zh/ca-gregorian.json';
import dateFieldsZh from 'cldr-dates-full/main/zh/dateFields.json';
import timeZoneNamesZh from 'cldr-dates-full/main/zh/timeZoneNames.json';
import { Calendar } from '@progress/kendo-vue-dateinputs';
import { DatePicker } from '@progress/kendo-vue-dateinputs';

export default {
  mixins: [commonStore],
  components: {
    LocalizationProvider,
    IntlProvider,
    Calendar,
    DatePicker,
  },
  props: {
    min: {
      type: Date,
      required: false,
      default: () => new Date(new Date().getFullYear() - 20, 1, 1),
    },
    max: {
      type: Date,
      required: false,
      default: () => new Date(new Date().getFullYear() + 20, 12, 31),
    },
    current: {
      type: [Date, String],
      required: false,
      default: null,
    },
    format: {
      type: String,
      required: false,
      default: 'yyyy-MM-dd',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    direction: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      now: null,
      show: false,
      calendarClass: {
        ['calendar-box']: true,
        ['up']: false,
        ['down']: false,
      },
      calendarStyle: {},
      app: document.querySelector('#app'),
    };
  },
  computed: {
    getI18nList() {
      return this[commonTypes.getters.GET_I18N_LIST];
    },
    getLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
  },
  watch: {
    current: function(value) {
      if (typeof value === 'string') {
        this.now = new Date(
          timezone.convertToClientTimeZone(value, 'YYYY-MM-DD'),
        );
      } else this.now = value;
    },
    getLocale: function() {
      this.setLanguage();
    },
  },
  created() {
    if (typeof this.current === 'string') {
      this.now = new Date(
        timezone.convertToClientTimeZone(this.current, 'YYYY-MM-DD'),
      );
    } else this.now = this.current;
    this.setLanguage();
  },
  mounted() {
    if (this.id !== '') this.setClick();
    this.setCalendarPosition();
  },
  methods: {
    setCalendarPosition() {
      const el = this.$refs.datepicker;
      const datepicker = el.getBoundingClientRect();
      const left = datepicker.left;
      const top = datepicker.top - 270;
      this.calendarStyle = {
        position: 'fixed',
        top: `${top}px`,
        left,
        ['z-index']: 10,
      };
    },
    mouseEvent(e) {
      e.stopPropagation();
      this.show = false;
    },
    mouseleave() {
      if (this.show) this.app.addEventListener('mousedown', this.mouseEvent);
    },
    mouseenter() {
      if (this.show) this.app.removeEventListener('mousedown', this.mouseEvent);
    },
    setClick() {
      const btn = document.querySelector(`.${this.id} .k-select`);
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this.show = !this.show;
        this.calendarClass['up'] = this.show;
      });
    },
    onChange(e) {
      this.show = false;
      this.now = e.value;
      this.$emit('onChange', e.value, this.name);
    },
    setLanguage() {
      const locale = this.$i18n.locale;
      load(
        likelySubtags,
        currencyData,
        weekData,
        this.$i18n.locale === 'ko'
          ? numbersKo
          : this.$i18n.locale === 'en'
          ? numbersEn
          : numbersZh,
        this.$i18n.locale === 'ko'
          ? caGregorianKo
          : this.$i18n.locale === 'en'
          ? caGregorianEn
          : caGregorianZh,
        this.$i18n.locale === 'ko'
          ? dateFieldsKo
          : this.$i18n.locale === 'en'
          ? dateFieldsEn
          : dateFieldsZh,
        this.$i18n.locale === 'ko'
          ? timeZoneNamesKo
          : this.$i18n.locale === 'en'
          ? timeZoneNamesEn
          : timeZoneNamesZh,
      );
      const language = {
        datepicker: {
          toggleCalendar: this.$t('NLS0001267'),
        },
        calendar: {
          today: this.$t('NLS0001268'),
        },
        dateinput: {
          increment: this.$t('NLS0001269'),
          decrement: this.$t('NLS0001270'),
        },
        datetimepicker: {
          date: this.$t('NLS0001271'),
          time: this.$t('NLS0001272'),
          cancel: this.$t('NLS0001259'),
          set: this.$t('NLS0001273'),
        },
        timepicker: {
          set: this.$t('NLS0001273'),
          cancel: this.$t('NLS0001259'),
          now: this.$t('NLS0001274'),
          selectNow: this.$t('NLS0001275'),
          toggleTimeSelector: this.$t('NLS0001276'),
          toggleClock: this.$t('NLS0001277'),
        },
        daterangepicker: {
          swapStartEnd: 'Swap start and end values',
          start: this.$t('NLS0001278'),
          end: this.$t('NLS0001279'),
        },
      };
      loadMessages(language, locale);
    },
  },
};
</script>
<style scoped lang="scss">
.datepicker-wrap {
  position: relative;
  overflow: visible;
}
.calendar-box {
  position: absolute;
}
</style>
