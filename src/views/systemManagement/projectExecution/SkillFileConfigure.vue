<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 과제개선스킬 양식 설정 -->
      <com-page-title
        :data="pageTitleList"
        title="NLS0001120"
        tooltip="NLS0000719"
      ></com-page-title>
      <!-- 검색 폼 영역 -->
      <skill-file-srch-form></skill-file-srch-form>
      <!-- 버튼 그룹 영역 -->
      <skill-file-btn-form></skill-file-btn-form>
      <!-- 그리드 영역 -->
      <skill-file-grid-form></skill-file-grid-form>
      <!-- 그리드 버튼 영역 -->
      <skill-file-grid-btn-form></skill-file-grid-btn-form>
      <!--팝업 영역-->
      <skill-file-popup-form></skill-file-popup-form>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import SkillFileSrchForm from '@/components/systemManagement/skillFileConfigure/form/SkillFileSrchForm';
import SkillFileBtnForm from '@/components/systemManagement/skillFileConfigure/form/SkillFileBtnForm';
import SkillFileGridForm from '@/components/systemManagement/skillFileConfigure/form/SkillFileGridForm';
import SkillFileGridBtnForm from '@/components/systemManagement/skillFileConfigure/form/SkillFileGridBtnForm';
import SkillFilePopupForm from '@/components/systemManagement/skillFileConfigure/form/SkilFilePopupForm';

export default {
  name: 'SkillFileConfigurePage',
  components: {
    SkillFileSrchForm,
    SkillFileBtnForm,
    SkillFileGridForm,
    SkillFileGridBtnForm,
    SkillFilePopupForm,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000472', link: '' }, //시스템 관리
        {
          title: 'NLS0001120', //과제개선스킬 양식 설정
          link: 'skillFileConfigure',
          params: this.$route.params,
        },
      ],
    };
  },
};
</script>
