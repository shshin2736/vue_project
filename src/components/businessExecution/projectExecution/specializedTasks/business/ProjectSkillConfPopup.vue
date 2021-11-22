<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-tasksetting">
            <div class="layer-pop__title type1">
              <!-- 개선 스킬 양식 -->
              <p>{{ $t('NLS0000525') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="tasksetting-wrap">
              <dl v-if="getSkillConfList.length > 0" class="task-down-title">
                <template v-for="(items, idx) in getSkillConfList">
                  <dt
                    :class="{ current: current[idx] }"
                    :key="`dt-${items.prjStepCd}`"
                  >
                    <button
                      class="task-menu-btn"
                      @click.stop="taskBtnEventHandler(idx)"
                    >
                      {{ items.prjStepNm }}
                    </button>
                  </dt>
                  <dd :key="`dd-${items.prjStepCd}`">
                    <ul>
                      <li v-for="(files, idx) in items.files" :key="idx">
                        <a class="task-down-list">
                          <p
                            class="task-down-title"
                            @click.stop="onFileDownload(files)"
                          >
                            {{ files.fileName }}
                          </p>
                        </a>
                      </li>
                    </ul>
                  </dd>
                </template>
              </dl>
              <dl v-else class="task-down-title">
                <dt>{{ $t('NLS0001374') }}</dt>
              </dl>
            </div>
            <a ref="links" />
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types'; // import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import { specializedTasksStore } from '@/mixins';
// import { common } from '@/utils';

export default {
  name: 'ProjectSkillConfPopup',
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
      current: [false, false, false, false, false],
    };
  },
  computed: {
    getSkillConfList() {
      return this[
        specializedTasksTypes.getters.GET_PROJECT_SKILL_CONF_INFO_POP
      ];
    },
  },
  watch: {
    getSkillConfList: function(value) {
      if (value.length === 1) this.current = [true, false, false, false, false];
    },
  },
  methods: {
    closePopup() {
      this.current = [false, false, false, false, false];
      this.$emit('input', false);
    },
    onFileDownload({ fileId, fileType }) {
      const a = this.$refs.links;
      a.setAttribute('target', `_blank`);
      a.setAttribute(
        'href',
        `api/fileDownload.do?fileId=${fileId}&downloadType=${fileType}`,
      );
      a.click();
    },
    taskBtnEventHandler(idx) {
      this.current = this.current.map((type, i) => {
        return idx === i ? !type : type;
      });
    },
  },
};
</script>
