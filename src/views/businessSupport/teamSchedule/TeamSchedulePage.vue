<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 팀 일정관리 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001475"
        tooltip=""
      ></com-page-title>
      <!-- 컨텐츠 영역 -->
      <team-schedule-form></team-schedule-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import TeamScheduleForm from '@/components/businessSupport/teamSchedule/form/TeamScheduleForm';
export default {
  name: 'TeamSchedulePage',
  components: {
    TeamScheduleForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000471', link: '' }, //업무지원
        {
          title: 'NLS0001475', //팀 일정관리
          link: 'TeamSchedulePage',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
