<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 국가	 -->
      <p class="search__form__title">
        {{ $t('NLS0000214') }}
      </p>
      <com-dropdowns
        :data="srchCountryList"
        v-model="srchCountry"
        textfield="cdNm"
        valuefield="cd"
        class="hms-dropdown type2"
        @change="onChange"
      >
      </com-dropdowns>
      <!-- 삭제부서숨김 -->
      <span class="input__box">
        <p class="checkbox-title">{{ $t('NLS0001371') }}</p>
        <input type="checkbox" id="del" class="checkbox" @change="onCheck" />
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
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { commonStore, departmentManagementStore } from '@/mixins';
import * as deptTypes from '@/store/modules/systemManagement/departmentManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'deptListSearchForm',
  mixins: [commonStore, departmentManagementStore],
  components: { ComDropdowns },
  data() {
    return {
      srchUseYn: {},
      srchCountryList: [],
      srchCountry: {},
    };
  },
  mounted() {
    this.setSrchCodeList();
    this.getDeptList();
  },
  methods: {
    setSrchCodeList() {
      this.srchCountryList = common.getCodeList('G10');
      this.srchCountry = this.srchCountryList[0];
    },
    onClick() {
      this.getDeptList();
      this[commonTypes.actions.INIT_SELECTED_COUNTRY_CODE](this.srchCountry.cd);
    },
    onCheck(e) {
      this[deptTypes.actions.INIT_DEL_DEPT_HIDE](e.target.checked);
    },
    onChange() {
      //this.srchCountry = e.target.value;
    },
    getDeptList() {
      const params = {
        srchCountryCd: this.srchCountry.cd,
      };
      this[deptTypes.actions.FETCH_DEPT_LIST](params);
    },
  },
};
</script>
