<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 이용 문의 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001105"
        tooltip="NLS0000740"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <qna-search-form></qna-search-form>
      <!-- 버튼 그룹 영역 -->
      <qna-btn-form></qna-btn-form>
      <!-- 컨텐츠 영역 -->
      <qna-grid-form></qna-grid-form>
      <!--팝업 영억-->
      <!-- <qna-popup-form></qna-popup-form> -->
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import QnaSearchForm from '@/components/businessSupport/qna/form/QnaSearchForm';
import QnaBtnForm from '@/components/businessSupport/qna/form/QnaBtnForm';
import QnaGridForm from '@/components/businessSupport/qna/form/QnaGridForm';
// import QnaPopupForm from '@/components/businessSupport/qna/form/QnaPopupForm';

export default {
  name: 'QnaPage',
  components: {
    QnaSearchForm,
    QnaBtnForm,
    QnaGridForm,
    ComPageTitle,
    // QnaPopupForm,
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
      ],
    };
  },
};
</script>
