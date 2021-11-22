<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 과제유형 -->
      <p class="search__form__title">
        {{ $t('NLS0000187') }}
      </p>
      <com-dropdowns
        :data="prjTypeList"
        textfield="cdNm"
        valuefield="cd"
        v-model="prjType"
        class="hms-dropdown type2"
        @change="onChange"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 국가별 언어	 -->
      <p class="search__form__title">
        {{ $t('NLS0000792') }}
      </p>
      <com-dropdowns
        :data="languageList"
        textfield="cdNm"
        valuefield="cd"
        v-model="languageCode"
        class="hms-dropdown type2"
        @change="onLangChange"
      ></com-dropdowns>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="onSrch">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }} </span>
      </button>
    </div>
  </div>
</template>

<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { skillFileStore } from '@/mixins';
import * as skillFileTypes from '@/store/modules/systemManagement/skillFile/types';
import { common } from '@/utils';
export default {
  name: 'skillFileSrchPage',
  mixins: [skillFileStore],
  components: { ComDropdowns },
  data() {
    return {
      prjType: {},
      languageCode: {},
    };
  },
  computed: {
    prjTypeList() {
      const cdList = common.getCodeList('PRJ005');
      const res = cdList.filter(i => i.opt1 === '1');
      return res;
    },
    languageList() {
      return common.getCodeList('G05');
    },
  },
  mounted() {
    this.prjType = this.prjTypeList[0];
    this.languageCode = this.languageList[0];
    this[skillFileTypes.actions.INIT_SRCH_PARAM]({
      prjType: this.prjType.cd,
      languageCode: this.languageCode.cd,
    });

    this.onSrch();
  },
  methods: {
    onChange(e) {
      this.prjType = e.target.value;
    },
    onLangChange(e) {
      this.languageCode = e.target.value;
    },
    onSrch() {
      this[skillFileTypes.actions.INIT_SRCH_PARAM]({
        prjType: this.prjType.cd,
        languageCode: this.languageCode.cd,
      });
      this[skillFileTypes.actions.FETCH_PRJ_SKILL_FILE]({
        prjType: this.prjType.cd,
        languageCode: this.languageCode.cd,
      });
    },
  },
};
</script>
