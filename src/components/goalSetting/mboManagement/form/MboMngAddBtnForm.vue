<template>
  <div class="page__btn-tbox">
    <span class="belong_title" v-show="isShowDropdown">
      {{ $t('NLS0000262') }}</span
    >
    <span class="hms-dropdown type1">
      <com-dropdowns
        :data="getCountryCode"
        :classed="classed"
        rules="required"
        textfield="cdNm"
        valuefield="cd"
        v-model="countryCode"
        v-if="isShowDropdown"
        @change="onChange"
      ></com-dropdowns>
    </span>
    <com-button
      type="button"
      :auth="$route.params.auth"
      class="blue-btn perm_save"
      @click="mboRegistPopUp"
    >
      <!-- 추가 -->
      <span>{{ $t('NLS0000067') }} </span>
    </com-button>
  </div>
</template>

<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import { common } from '@/utils';
import * as commonTypes from '@/store/modules/common/types';
import { mboManagementStore, commonStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';

export default {
  name: 'MboMngAddBtnFrom',
  mixins: [mboManagementStore, commonStore],
  components: {
    ComButton,
    ComDropdowns,
  },
  data() {
    return {
      classed: 'hms-dropdown type1',
      countryCode: {},
      isShowDropdown: true,
      loginUserInfo: {},
    };
  },
  created() {
    this.loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
    this.isShowDropdown =
      this.loginUserInfo.userType === 'ADMIN' ||
      this.loginUserInfo.userType === 'SUPER'
        ? true
        : false;
  },
  computed: {
    getCountryCode(state) {
      common.getCodeList('G10').forEach(element => {
        if (element.cd === this.loginUserInfo.country)
          state.countryCode = element;
      });
      return common.getCodeList('G10');
    },
  },

  methods: {
    mboRegistPopUp() {
      this[mboManagementTypes.actions.INIT_IS_NEW_SAVE_MBO](true);
      this[mboManagementTypes.actions.INIT_VIEWS_MBO_REGIST_POPUP](true);
    },
    onChange(e) {
      //* 선택한 MBO 정보 초기화
      this[mboManagementTypes.actions.INIT_SELECTED_MBO_INFO]({});
      //[대상 인원 내역] 리스트 초기화
      this[mboManagementTypes.actions.INIT_MBO_TARGET_LIST]([]);

      //* 평가 대상 설정 버튼 Show OFF
      this[mboManagementTypes.actions.INIT_BTN_MBO_TARGET_SETUP](false);
      //* 대상인원내역 폼 내용 ON
      this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET_SETUP](
        false,
      );
      //* 대상인원내역 폼 내용 OFF
      this[mboManagementTypes.actions.INIT_TAB_CONTENTS_MBO_TARGET](true);

      //* MBO 리스트 가져오기
      this[mboManagementTypes.actions.FETCH_MBO_MANAGEMENT_LIST]({
        country: e.value.cd,
      });
    },
  },
};
</script>

<style></style>
