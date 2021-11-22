<template>
  <div class="page__btn-bbox">
    <button
      type="button"
      class="deepdarkgray-btn"
      v-if="
        getLoginInfo.userType === 'SUPER' &&
          getUserInfo.userId &&
          getUserInfo.activeFlag == 'A' &&
          getUserInfo.retireYn == 'N' &&
          getUserInfo.deleteYn == 'N'
      "
      @click="goLogin"
    >
      <!-- 로그인 -->
      <span>{{ $t('NLS0001336') }} </span>
    </button>

    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="saveUser"
    >
      <!-- 저장 -->
      <span>{{ $t('NLS0000074') }}</span>
    </com-button>
    <button type="button" class="deepdarkgray-btn" @click="goToList">
      <!-- 목록 -->
      <span>{{ $t('NLS0000372') }} </span>
    </button>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import { userManagementStore, commonStore, authStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import * as authTypes from '@/store/modules/auth/types';
import { common, timezone } from '@/utils';

export default {
  name: 'UserDetailBtnForm',
  mixins: [userManagementStore, commonStore, authStore],
  components: {
    ComButton,
  },
  computed: {
    //* 로그인 여부 확인
    isLogin() {
      return this[authTypes.getters.GET_VIEWS_IS_LOGIN];
    },
    getLoginInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getUserInfo() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
    getUserError() {
      return this[userManagementTypes.getters.GET_USER_ERROR];
    },
    getSrchParam() {
      return this[userManagementTypes.getters.GET_SRCH_PARAM];
    },
    getPwExpDate() {
      return this[userManagementTypes.getters.GET_PW_EXP_DATE];
    },
  },
  methods: {
    async goLogin() {
      //* 로그인 요청
      await this[authTypes.actions.FETCH_LOGIN]({
        loginURL: 'api/userChange.do',
        loginInfo: this.getUserInfo,
      });
      //* 로그인 여부 확인
      // if (this.isLogin) this.$router.push('/dashboardAfter');
      if (this.isLogin) location.reload();
    },
    async saveUser() {
      if (this.getUserError.error) {
        //에러메시지 입력
        common.alert('warning', this.getUserError.msg);
      } else {
        const pwExpDate = this.getPwExpDate;
        const convert = timezone.convertToString(pwExpDate);
        this.getUserInfo.pwExpDate = convert;
        const res = await this[userManagementTypes.actions.UPDATE_USER_INFO](
          this.getUserInfo,
        );
        if (res) {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012', this.goToList);
        }
      }
    },
    goToList() {
      this[userManagementTypes.actions.INIT_USER_INFO]({});
      this[userManagementTypes.actions.INIT_USER_ROLE_LIST]([]);
      if (this.$route.params.flag === 'dept') {
        this.$router.push({
          name: 'deptListPage',
          params: { auth: this.$route.params.auth, flag: 'SHOW' },
        });
      } else {
        this.$router.push({
          name: 'userPage',
        });
      }
    },
  },
};
</script>
