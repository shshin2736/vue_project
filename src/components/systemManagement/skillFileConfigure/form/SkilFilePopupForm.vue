<template>
  <div>
    <file-upload-popup v-model="isFileUploadPopup"></file-upload-popup>
  </div>
</template>
<script>
import FileUploadPopup from '@/components/systemManagement/skillFileConfigure/business/FileUploadPopup';
import { skillFileStore } from '@/mixins';
import * as skillFileTypes from '@/store/modules/systemManagement/skillFile/types';

export default {
  name: 'SkillFilePopupForm',
  components: {
    FileUploadPopup,
  },
  mixins: [skillFileStore],
  computed: {
    isFileUploadPopup: {
      set(value) {
        this[skillFileTypes.actions.INIT_VIEWS_FILE_UPLOAD_POPUP](value);
      },
      get() {
        return this[skillFileTypes.getters.GET_VIEWS_FILE_UPLOAD_POPUP];
      },
    },
  },
};
</script>
