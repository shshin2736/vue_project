<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <com-page-title :data="pageTitleList"></com-page-title>

      <log-list-search-form></log-list-search-form>

      <log-list-form></log-list-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import logListForm from '@/components/systemManagement/logManagement/form/LogListForm';
import logListSearchForm from '@/components/systemManagement/logManagement/business/LogListSearchForm';

export default {
  name: 'LogListPage',
  components: {
    logListSearchForm,
    logListForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' },
        {
          title: 'NLS0001367',
          link: 'logListPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
