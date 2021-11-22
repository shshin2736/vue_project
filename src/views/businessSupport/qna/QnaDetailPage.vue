<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 이용 문의 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001106"
        tooltip="NLS0000741"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <qna-detail-table-form></qna-detail-table-form>
      <!-- 댓글 그룹 영역 -->
      <qna-detail-reply-form></qna-detail-reply-form>
      <!-- 목록 버튼 그룹 영역 -->
      <qna-detail-btn-list-form></qna-detail-btn-list-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import QnaDetailTableForm from '@/components/businessSupport/qna/form/QnaDetailTableForm';
import QnaDetailReplyForm from '@/components/businessSupport/qna/form/QnaDetailReplyForm';
import QnaDetailBtnListForm from '@/components/businessSupport/qna/form/QnaDetailBtnListForm';

export default {
  name: 'QnaDeatailPage',
  components: {
    QnaDetailTableForm,
    QnaDetailReplyForm,
    QnaDetailBtnListForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        {
          title: 'NLS0001105', //이용 문의
          link: 'QnaPage',
          params: this.$route.params,
        },
        {
          title: 'NLS0001106', //이용문의 상세
          link: 'QnaDetailPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
