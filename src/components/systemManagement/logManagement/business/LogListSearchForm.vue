<template>
  <div class="search-box">
    <div class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0000801') }}
      </p>
      <com-dropdowns
        :data="getDropdownList"
        v-model="searchYn"
        textfield="cdNm"
        valuefield="cd"
        @change="onChange"
      >
      </com-dropdowns>
    </div>
    <div class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0000120') }}
      </p>
      <span class="input__box">
        <com-input-text v-model="srchId"></com-input-text>
      </span>
    </div>
    <div class="search__form__box">
      <p class="search__form__title">
        {{ $t('NLS0000221') }}
      </p>
      <span class="input__box">
        <com-input-text v-model="srchNm"></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="onClick">
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>
<script>
//import * as logStore from '@/store/modules/systemManagement/logManagement';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { logManagementStore, commonStore } from '@/mixins';
import * as logTypes from '@/store/modules/systemManagement/logManagement/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'logListSearchForm',
  mixins: [logManagementStore, commonStore],
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      searchYn: {},
      srchId: '',
      srchNm: '',
    };
  },

  created() {
    this[commonTypes.actions.FETCH_COM_CODE_LIST]();
    this[logTypes.actions.FETCH_LOG_LIST]({});
  },
  computed: {
    getCodeList() {
      return this[commonTypes.getters.GET_COM_CODE_LIST];
    },
    getDropdownList() {
      const dropdownList = [];
      dropdownList.push({ cd: '', cdNm: 'All' });
      for (let item of this.getCodeList) {
        if (item.grpCd == 'G01') {
          dropdownList.push(item);
        }
      }
      return dropdownList;
    },
  },
  methods: {
    onClick() {
      const params = {
        srchUserId: this.srchId,
        srchUserNm: this.srchNm,
        srchSuccessYn: this.searchYn.cd,
      };

      this[logTypes.actions.FETCH_LOG_LIST](params);
    },
  },
};
</script>
