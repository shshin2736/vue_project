<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 이용 문의 등록 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001107"
        tooltip="NLS0000742"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <Qna-registration-table-form></Qna-registration-table-form>
      <!-- 버튼 그룹 영역 -->
      <Qna-registration-btn-form></Qna-registration-btn-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import QnaRegistrationTableForm from '@/components/businessSupport/qna/form/QnaRegistrationTableForm';
import QnaRegistrationBtnForm from '@/components/businessSupport/qna/form/QnaRegistrationBtnForm';

export default {
  name: 'QnaRegistrationPage',
  components: {
    QnaRegistrationTableForm,
    QnaRegistrationBtnForm,
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
          title: 'NLS0001107', //이용 문의 등록
          link: 'QnaRegistrationPage',
        },
      ],
    };
  },
};
</script>
