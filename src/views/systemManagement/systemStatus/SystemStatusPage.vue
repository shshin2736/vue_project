<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 시스템 현황	 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0000658"
        tooltip="NLS0000717"
      ></com-page-title>
      <!-- 시스템 탭 영역 -->
      <system-status-tab-form></system-status-tab-form>
      <!-- 팝업 영역 -->
      <system-status-popup-form></system-status-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import SystemStatusTabForm from '@/components/systemManagement/systemStatus/form/SystemStatusTabForm.vue';
import SystemStatusPopupForm from '@/components/systemManagement/systemStatus/form/SystemStatusPopupForm.vue';

export default {
  name: 'SystemStatusPage',
  components: {
    SystemStatusTabForm,
    SystemStatusPopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0000658', //시스템 현황
          link: 'systemStatusPage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
