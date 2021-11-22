<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 메뉴 정보 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000100"
        tooltip="NLS0000715"
      ></com-page-title>

      <!-- <code-list-search-form></code-list-search-form> -->

      <menu-list-form></menu-list-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import menuListForm from '@/components/systemManagement/menuManagement/form/MenuListForm';

export default {
  name: 'menuPage',
  components: {
    menuListForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0000100', //메뉴 정보
          link: 'menuListPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>

<style></style>
