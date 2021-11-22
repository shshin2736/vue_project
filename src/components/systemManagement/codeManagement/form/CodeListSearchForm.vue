<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 그룹코드 -->
      <p class="search__form__title">
        {{ $t('NLS0000076') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text v-model="srchGrpCd"></com-input-text>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 그룹코드명 -->
      <p class="search__form__title">
        {{ $t('NLS0000078') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text v-model="srchGrpNm"></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="onClick">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import * as codeTypes from '@/store/modules/systemManagement/codeManagement/types';
import { codeManagementStore } from '@/mixins';

export default {
  name: 'CodeListSearchForm',
  mixins: [codeManagementStore],
  components: { ComInputText },
  data() {
    return {
      srchGrpCd: '',
      srchGrpNm: '',
    };
  },

  created() {
    this[codeTypes.actions.FETCH_GRP_CODE_LIST]({});
  },
  methods: {
    onClick() {
      const params = {
        srchGrpCd: this.srchGrpCd,
        srchGrpNm: this.srchGrpNm,
      };
      this[codeTypes.actions.FETCH_GRP_CODE_LIST](params);
      this[codeTypes.actions.INIT_CODE_LIST]([]);
    },
  },
};
</script>
