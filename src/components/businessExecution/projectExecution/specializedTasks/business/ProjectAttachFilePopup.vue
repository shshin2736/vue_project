<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-file">
            <div class="layer-pop__title type1">
              <!-- 첨부파일 개 -->
              <p>
                {{ $t('NLS0000247') }} {{ fileInfo.fileList.length
                }}{{ $t('NLS0000866') }}
              </p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <p
              class="task-filedown"
              v-for="item in fileInfo.fileList"
              :key="item.fileId"
            >
              <a
                :href="
                  `api/fileDownload.do?fileId=${item.fileId}&downloadType=${item.downloadType}`
                "
                >{{ item.fileName }}
              </a>
              <span>({{ item.fileSize / 1000 }} KB)</span>
            </p>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import { specializedTasksStore } from '@/mixins';
export default {
  name: 'ProjectAttachFilePop',
  components: { ComOverlay },
  mixins: [specializedTasksStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      fileInfo: {
        fileList: [],
        prjStep: '',
      },
    };
  },
  computed: {
    getPrjFileInfo() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_ATTACH_FILE_INFO
      ];
      return item;
    },
  },
  watch: {
    getPrjFileInfo: function(value) {
      this.fileInfo = value;
    },
  },
  methods: {
    closePopup() {
      this.$emit('input', false);
    },
  },
};
</script>
