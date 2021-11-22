<template>
  <div class="page__btn-bbox">
    <com-button
      type="button"
      class="darkgray-btn perm_read"
      :auth="$route.params.auth"
      @click="goToList"
    >
      <!-- 목록 -->
      <span>{{ $t('NLS0000372') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { teamBoardStore, commonStore } from '@/mixins';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'teamBoardDetailBtnForm',
  mixins: [teamBoardStore, commonStore],
  components: {
    ComButton,
  },
  data() {
    return { authorized: false };
  },
  computed: {
    //* 스토어에 저장된 공지사항 리스트에 변동이 생긴경우 자동으로 갱신
    getTeamBoardDetail() {
      return this[teamBoardTypes.getters.GET_TEAM_BOARD_DETAIL];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  methods: {
    // async onEdit() {
    //   const param = this.getTeamBoardDetail;
    //   await this[teamBoardTypes.actions.INIT_TEAM_BOARD_DETAIL](param);
    //   await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
    //     ownerObjectId: this.getTeamBoardDetail.bdId,
    //     downloadType: 'teamBoard',
    //   });
    //   this.$router.push({
    //     name: 'TeamBoardRegistrationPage',
    //     params: { auth: this.$route.params.auth, access: true },
    //   });
    // },

    //* 목록 버튼 기능
    goToList() {
      this.$router.push({
        name: 'TeamBoardPage',
        params: { auth: this.$route.params.auth, detail: true },
      });
    },
  },
};
</script>
