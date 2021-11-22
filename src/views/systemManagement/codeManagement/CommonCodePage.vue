<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 코드 관리 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001117"
        tooltip="NLS0000713"
      ></com-page-title>

      <code-list-search-form></code-list-search-form>

      <code-list-form></code-list-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import codeListForm from '@/components/systemManagement/codeManagement/form/CodeListForm';
import codeListSearchForm from '@/components/systemManagement/codeManagement/form/CodeListSearchForm';

export default {
  name: 'CommonCodePage',
  components: { codeListForm, codeListSearchForm, ComPageTitle },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001117', //코드관리
          link: 'codeListPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
