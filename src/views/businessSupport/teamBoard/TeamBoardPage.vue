<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 팀 게시판 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000469"
        tooltip="NLS0000743"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <team-board-search-form></team-board-search-form>
      <!-- 버튼 그룹 영역 -->
      <team-board-btn-form></team-board-btn-form>
      <!-- 컨텐츠 영역 -->
      <team-board-grid-form></team-board-grid-form>
      <!--팝업 영억-->
      <team-board-popup-form></team-board-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import TeamBoardSearchForm from '@/components/businessSupport/teamBoard/form/TeamBoardSearchForm';
import TeamBoardBtnForm from '@/components/businessSupport/teamBoard/form/TeamBoardBtnForm';
import TeamBoardGridForm from '@/components/businessSupport/teamBoard/form/TeamBoardGridForm';
import TeamBoardPopupForm from '@/components/businessSupport/teamBoard/form/TeamBoardPopupForm';

export default {
  name: 'TeamBoardPage',
  components: {
    TeamBoardSearchForm,
    TeamBoardBtnForm,
    TeamBoardGridForm,
    TeamBoardPopupForm,
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
      ],
    };
  },
};
</script>
