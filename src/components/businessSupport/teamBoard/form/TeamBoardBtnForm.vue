<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onClick"
    >
      <!-- 등록 -->
      <span>{{ $t('NLS0000367') }} </span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import { teamBoardStore } from '@/mixins';

export default {
  name: 'TeamBoardBtnForm',
  mixins: [teamBoardStore],
  components: {
    ComButton,
  },
  methods: {
    async onClick() {
      await this[teamBoardTypes.actions.INIT_TEAM_BOARD_DETAIL]({});
      this.$router.push({
        name: 'TeamBoardRegistrationPage',
        params: { auth: this.$route.params.auth, access: true },
      });
    },
  },
};
</script>
