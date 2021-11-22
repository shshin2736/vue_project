<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 메시지유형 -->
      <p class="search__form__title">
        {{ $t('NLS0000091') }}
      </p>
      <com-dropdowns
        :data="G_11"
        textfield="cdNm"
        valuefield="cd"
        v-model="compType"
        class="hms-dropdown type2"
        @input="onChange"
      ></com-dropdowns>
    </div>
    <div class="search__form__box">
      <!-- 메시지 ID -->
      <p class="search__form__title">
        {{ $t('NLS0000092') }}
      </p>
      <span class="input__box">
        <com-input-text v-model="srchMsgId"></com-input-text>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 메시지(KO) -->
      <p class="search__form__title">
        {{ $t('NLS0000093') }}
      </p>
      <span class="input__box">
        <com-input-text
          v-model="srchMsg"
          @enter="getMessageData"
        ></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="getMessageData">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { i18nManagementStore } from '@/mixins';
import * as i18nManagementTypes from '@/store/modules/systemManagement/i18nManagement/types';
import { common } from '@/utils';

export default {
  name: 'MessageSearchBox',
  mixins: [i18nManagementStore],
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      compType: {},
      srchMsgType: '',
      srchMsgId: '',
      srchMsg: '',
    };
  },
  computed: {
    getMessageList() {
      return this[i18nManagementTypes.getters.GET_MESSAGE_LIST];
    },
    G_11(state) {
      const items = common.getCodeList('G11');
      if (items[0].cd != '') {
        items.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      state.compType = items[0];
      return items;
    },
  },
  methods: {
    onChange(val) {
      this.srchMsgType = val.cd;
    },
    getMessageData() {
      try {
        const searchData = {
          srchMsgType: this.srchMsgType,
          srchMsgId: this.srchMsgId,
          srchMsg: this.srchMsg,
          limit: 10,
          offset: 0,
        };
        this[i18nManagementTypes.actions.FETCH_MESSAGE_LIST](searchData);
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
