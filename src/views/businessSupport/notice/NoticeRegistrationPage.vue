<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 공지사항 등록 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001104"
        tooltip="NLS0000739"
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <notice-registration-table-form></notice-registration-table-form>
      <!-- 버튼 그룹 영역 -->
      <notice-registration-btn-form></notice-registration-btn-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import NoticeRegistrationTableForm from '@/components/businessSupport/notice/form/NoticeRegistrationTableForm';
import NoticeRegistrationBtnForm from '@/components/businessSupport/notice/form/NoticeRegistrationBtnForm';

export default {
  name: 'NoticeRegistrationPage',
  components: {
    NoticeRegistrationTableForm,
    NoticeRegistrationBtnForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        { title: 'NLS0001103', link: 'NoticePage', params: this.$route.params }, //공지사항
        {
          title: 'NLS0001104', //공지사항 등록
          link: 'NoticeRegistrationPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
