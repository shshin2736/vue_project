<template>
  <div class="report-view-cover cover1" ref="reportTitle">
    <p class="title">
      {{ prjInfo != null ? prjInfo.prjNm : '' }}
      <!-- <strong>총수율 98.5% 달성</strong> -->
    </p>
    <p class="writer-info">
      <span>{{ prjBaseInfo.deptNm }}</span>
      <!-- 수행 -->
      <span>{{ $t('NLS0000888') }}: {{ prjBaseInfo.userNm }}</span>
      <!-- 스폰서 -->
      <span>{{ $t('NLS0000889') }}: {{ prjBaseInfo.managerNm }}</span>
      <!-- 기간 -->
      <span
        >{{ $t('NLS0000263') }}: {{ prjInfo.prjStartDate }} ~
        {{ prjInfo.prjEndDate }}</span
      >
    </p>
    <img :src="prjSkin" alt="cover" />
  </div>
</template>

<script>
export default {
  props: {
    prjBaseInfo: {
      type: Object,
      required: false,
    },
    prjInfo: {
      type: Object,
      required: false,
    },
    prjSkin: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.report-view-cover.cover1 {
  .title {
    margin-left: 0;
    left: 50%;
    top: calc(50% - min(8vw, 100px));
    transform: translate(-50%, -50%);
    font-size: min(4.5vw, 52px);
  }
  .writer-info {
    width: auto;
    margin-left: 0;
    left: 50%;
    top: calc(50% + min(8vw, 200px));
    transform: translate(-50%, -50%);
    span {
      line-height: 1.5;
      font-size: min(2vw, 16px);
      &:before {
        top: min(1.4vw, 12px);
      }
    }
  }
}
</style>
