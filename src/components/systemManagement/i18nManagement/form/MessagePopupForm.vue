<template>
  <div>
    <message-update-popup v-model="isMessageUpdatePopup"></message-update-popup>
  </div>
</template>
<script>
import MessageUpdatePopup from '@/components/systemManagement/i18nManagement/business/MessageUpdatePopup';
import { i18nManagementStore } from '@/mixins';
import * as i18nManagementType from '@/store/modules/systemManagement/i18nManagement/types';

export default {
  name: 'MessagePopupForm',
  components: { MessageUpdatePopup },
  mixins: [i18nManagementStore],
  computed: {
    //* 메시지 등록/수정 팝업 ON/OFF
    isMessageUpdatePopup: {
      set(value) {
        this[i18nManagementType.actions.INIT_VIEWS_MESSAGE_UPDATE_POPUP](value);
      },
      get() {
        return this[i18nManagementType.getters.GET_VIEWS_MESSAGE_UPDATE_POPUP];
      },
    },
  },
};
</script>
