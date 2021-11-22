<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 공지사항 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001103"
        tooltip="NLS0000737"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <notice-search-form></notice-search-form>
      <!-- 버튼 그룹 영역 -->
      <notice-btn-form></notice-btn-form>
      <!-- 컨텐츠 영역 -->
      <notice-grid-form></notice-grid-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import NoticeGridForm from '@/components/businessSupport/notice/form/NoticeGridForm';
import NoticeSearchForm from '@/components/businessSupport/notice/form/NoticeSearchForm';
import NoticeBtnForm from '@/components/businessSupport/notice/form/NoticeBtnForm';

export default {
  name: 'NoticePage',
  components: {
    NoticeGridForm,
    NoticeSearchForm,
    NoticeBtnForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        { title: 'NLS0001103', link: 'NoticePage', params: this.$route.params }, //공지사항
      ],
    };
  },
};
</script>
