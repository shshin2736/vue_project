<template>
  <div class="page__layer-pop nodim-layer">
    <div class="layer-pop-wrap">
      <div class="layer-pop__box type-infotext type-bottom">
        <div class="layer-pop__title type1">
          <!-- 도움말 -->
          <p>
            {{ $t('NLS0000823') }}
            <span class="tip">TIP</span>
          </p>
          <button type="button" class="layer-close" @click="overlay = !overlay">
            close
          </button>
        </div>
        <!-- 담당 -->
        <p class="task-infotext">
          {{ $t('NLS0000824') }}
          <span>: {{ $t('NLS0000825') }}</span>
        </p>
        <!-- 도움말-->
        <p class="task-infotext">
          {{ $t('NLS0000823') }}
          <span> : {{ $t('NLS0000826') }} </span>
        </p>
        <!-- 담당-->
        <p class="task-infotext">
          {{ $t('NLS0000824') }}
          <span> : {{ $t('NLS0000827') }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneralTaskHelpPopup',
};
</script>
