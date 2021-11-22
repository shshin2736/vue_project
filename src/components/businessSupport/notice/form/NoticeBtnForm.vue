<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      @click="onClick"
      :auth="$route.params.auth"
    >
      <!-- v-if="isAdmin" -->
      <!-- 등록 -->
      <span>{{ $t('NLS0000367') }} </span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as commonTypes from '@/store/modules/common/types';
import { commonStore } from '@/mixins';

export default {
  name: 'NoticeBtnForm',
  mixins: [commonStore],
  components: {
    ComButton,
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  computed: {
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  created() {
    if (
      this.getUserInfo.userType === 'ADMIN' ||
      this.getUserInfo.userType === 'SUPER'
    ) {
      this.isAdmin = true;
    }
  },
  methods: {
    //* 등록버튼을 누르는 것은 무조건 새 글 등록이다.
    //* 새글은 '무 조 건' 파일 리스트가 비어야 한다.
    onClick() {
      this.$router.push({
        name: 'NoticeRegistrationPage',
        params: { auth: this.$route.params.auth },
      });
    },
  },
};
</script>
