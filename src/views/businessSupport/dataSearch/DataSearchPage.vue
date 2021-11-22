<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000651"
        tooltip="NLS0000736"
      ></com-page-title>
      <!-- 데이터 검색 영역 -->
      <data-search-form></data-search-form>
      <!-- 데이터 탭 영역 -->
      <data-search-tab-form></data-search-tab-form>
      <!-- 팝업 영역 -->
      <data-search-popup-form></data-search-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import DataSearchForm from '@/components/businessSupport/dataSearch/form/DataSearchForm';
import DataSearchTabForm from '@/components/businessSupport/dataSearch/form/DataSearchTabForm';
import DataSearchPopupForm from '@/components/businessSupport/dataSearch/form/DataSearchPopupForm';

export default {
  name: 'DataSearchPage',
  components: {
    DataSearchForm,
    DataSearchTabForm,
    DataSearchPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        {
          title: 'NLS0000651', //자료 검색
          link: 'DataSearchPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
