<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 팀 게시판 등록 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001109"
        tooltip="NLS0000745"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <team-board-registration-form></team-board-registration-form>
      <div v-if="$route.params.myPost">
        <team-board-reply-form></team-board-reply-form>
      </div>
      <!-- 버튼 그룹 영역 -->
      <team-board-registration-btn-form></team-board-registration-btn-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import TeamBoardRegistrationForm from '@/components/businessSupport/teamBoard/form/TeamBoardRegistrationForm';
import TeamBoardRegistrationBtnForm from '@/components/businessSupport/teamBoard/form/TeamBoardRegistrationBtnForm';
import TeamBoardReplyForm from '@/components/businessSupport/teamBoard/form/TeamBoardDetailReplyForm';
export default {
  name: 'TeamBoardRegistrationPage',
  components: {
    TeamBoardRegistrationForm,
    TeamBoardRegistrationBtnForm,
    ComPageTitle,
    TeamBoardReplyForm,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        {
          title: 'NLS0000469', //팀 게시판
          link: 'TeamBoardPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0001109', //팀 게시판 등록
          link: 'TeamBoardRegistrationPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
