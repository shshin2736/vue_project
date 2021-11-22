<template>
  <div class="page__btn-tbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onClick"
    >
      <!-- 조회 -->
      <span>{{ $t('NLS0000690') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { i18nManagementStore } from '@/mixins';
import * as i18nManagementTypes from '@/store/modules/systemManagement/i18nManagement/types';

export default {
  name: 'MessageBtnForm',
  mixins: [i18nManagementStore],
  components: {
    ComButton,
  },
  methods: {
    onClick() {
      this[i18nManagementTypes.actions.INIT_MESSAGE_INFO]({});
      this[i18nManagementTypes.actions.INIT_VIEWS_MESSAGE_UPDATE_POPUP](true);
    },
  },
};
</script>
