<template>
  <div class="search-box">
    <div class="search__form__box">
      <!-- 권한 코드	 -->
      <p class="search__form__title">
        {{ $t('NLS0000112') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text v-model="srchRoleId"></com-input-text>
      </span>
    </div>
    <div class="search__form__box">
      <!-- 권한명 -->
      <p class="search__form__title">
        {{ $t('NLS0000113') }}
      </p>
      <span class="input__box type-nobtn">
        <com-input-text v-model="srchRoleNm"></com-input-text>
      </span>
    </div>
    <div class="search__btn__box">
      <button type="button" class="search__btn" @click="srchClick">
        <!-- 조회 -->
        <span>{{ $t('NLS0000066') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { roleManagementStore } from '@/mixins';

export default {
  name: 'RoleSearchBox',
  mixins: [roleManagementStore],
  components: { ComInputText },
  data() {
    return {
      srchRoleNm: '',
      srchRoleId: '',
    };
  },
  computed: {
    getRoleList() {
      return this[roleManagementTypes.getters.GET_USER_ROLE_LIST];
    },
  },
  async created() {
    this[roleManagementTypes.actions.FETCH_USER_ROLE_LIST]({});
  },
  methods: {
    srchClick() {
      try {
        const searchData = {
          srchRoleNm: this.srchRoleNm,
          srchRoleId: this.srchRoleId,
        };
        this[roleManagementTypes.actions.FETCH_USER_ROLE_LIST](searchData);
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>
