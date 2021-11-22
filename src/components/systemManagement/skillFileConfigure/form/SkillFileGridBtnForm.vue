<template>
  <div class="page__btn-bbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onSave"
    >
      <!-- 저장 -->
      <span>{{ $t('NLS0000074') }}</span>
    </com-button>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import { skillFileStore } from '@/mixins';
import * as skillFileTypes from '@/store/modules/systemManagement/skillFile/types';
import { common } from '@/utils';

export default {
  name: 'skillFileGridBtnForm',
  mixins: [skillFileStore],
  components: {
    ComButton,
  },
  computed: {
    getPrjSkillFile() {
      return this[skillFileTypes.getters.GET_SKILL_FILE_DATA];
    },
  },
  methods: {
    async onSave() {
      const data = this.getPrjSkillFile;
      const prjType = data[0].prjType;
      const languageCode = data[0].languageCode;
      const res = data.reduce((acc, cur) => {
        const keys = Object.keys(cur);
        for (const i of keys) {
          if (i.includes(prjType)) {
            const obj = {};
            obj.prjStepCd = i;
            obj.applyYn = cur[i];
            obj.fileId = cur.fileId;
            obj.prjType = cur.prjType;
            obj.languageCode = cur.languageCode;
            obj.update = 'Y';
            acc.push(obj);
          }
        }
        return acc;
      }, []);

      const result = await this[skillFileTypes.actions.UPDATE_SKILL_FILE]({
        prjSkillList: res,
        prjType: prjType,
        languageCode: languageCode,
      });
      if (result) {
        //저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
    },
  },
};
</script>
