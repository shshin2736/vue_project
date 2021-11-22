<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 공지사항 조회 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001103"
        tooltip="NLS0000738"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <notice-detail-table-form></notice-detail-table-form>
      <!-- 버튼 그룹 영역 -->
      <notice-detail-btn-form></notice-detail-btn-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import NoticeDetailTableForm from '@/components/businessSupport/notice/form/NoticeDetailTableForm';
import NoticeDetailBtnForm from '@/components/businessSupport/notice/form/NoticeDetailBtnForm';

export default {
  name: 'NoticeDetailPage',
  components: {
    NoticeDetailTableForm,
    NoticeDetailBtnForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        { title: 'NLS0001103', link: 'NoticePage', params: this.$route.params }, //공지사항
        {
          title: 'NLS0001102', //공지사항 조회
          link: 'NoticeDetailPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
