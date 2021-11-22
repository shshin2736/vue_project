<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 부서 관리 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001118"
        tooltip="NLS0000716"
      ></com-page-title>
      <!-- 검색조건 영역 -->
      <dept-list-search-form></dept-list-search-form>
      <!-- 리스트 영역 -->
      <dept-list-form></dept-list-form>
      <!-- 팝업 영역 -->
      <dept-list-popup-form></dept-list-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import DeptListSearchForm from '@/components/systemManagement/deptManagement/form/DeptListSearchForm';
import DeptListForm from '@/components/systemManagement/deptManagement/form/DeptListForm';
import DeptListPopupForm from '@/components/systemManagement/deptManagement/form/DeptListPopupForm';

export default {
  name: 'DeptListPage',
  components: {
    DeptListSearchForm,
    DeptListForm,
    DeptListPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001118', //부서관리
          link: 'deptListPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
