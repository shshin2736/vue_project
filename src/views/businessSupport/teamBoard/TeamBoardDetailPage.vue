<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 팀 게시판 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001108"
        tooltip="NLS0000744"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <team-board-detail-form></team-board-detail-form>
      <!-- 댓글 그룹 영역 -->
      <team-board-detail-reply-form></team-board-detail-reply-form>
      <!-- 버튼 그룹 영역 -->
      <team-board-detail-btn-form></team-board-detail-btn-form>
    </div>
  </div>
</template>

<script>
import TeamBoardDetailForm from '@/components/businessSupport/teamBoard/form/TeamBoardDetailForm';
import TeamBoardDetailBtnForm from '@/components/businessSupport/teamBoard/form/TeamBoardDetailBtnForm';
import TeamBoardDetailReplyForm from '@/components/businessSupport/teamBoard/form/TeamBoardDetailReplyForm';
import ComPageTitle from '@/components/common/global/ComPageTitle';

export default {
  name: 'TeamBoardDeatailPage',
  components: {
    TeamBoardDetailForm,
    TeamBoardDetailBtnForm,
    TeamBoardDetailReplyForm,
    ComPageTitle,
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
          title: 'NLS0001108', //팀 게시판 상세
          link: 'TeamBoardDetailPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
