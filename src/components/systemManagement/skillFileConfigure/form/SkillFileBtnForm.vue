<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onClick"
    >
      <!-- 양식 추가	 -->
      <span>{{ $t('NLS0000207') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { skillFileStore } from '@/mixins';
import * as skillFileTypes from '@/store/modules/systemManagement/skillFile/types';
// import { common, timezone } from '@/utils';

export default {
  name: 'skillFileBtnForm',
  mixins: [skillFileStore],
  components: {
    ComButton,
  },
  methods: {
    onClick() {
      this[skillFileTypes.actions.INIT_VIEWS_FILE_UPLOAD_POPUP](true);
    },
  },
};
</script>
