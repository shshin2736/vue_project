<template>
  <div>
    <!-- 코드 추가 팝업 -->
    <code-info-popup v-model="openCodeInfoPop"></code-info-popup>
  </div>
</template>
<script>
import { codeManagementStore } from '@/mixins';
import * as codeTypes from '@/store/modules/systemManagement/codeManagement/types';
import CodeInfoPopup from '@/components/systemManagement/codeManagement/business/CodeInfoPopup';

export default {
  name: 'CodeInfoPopupForm',
  mixins: [codeManagementStore],
  components: { CodeInfoPopup },
  data() {
    return {};
  },
  computed: {
    openCodeInfoPop: {
      set(value) {
        this[codeTypes.actions.INIT_VIEWS_CODE_INFO_POPUP](value);
      },
      get() {
        return this[codeTypes.getters.GET_VIEWS_CODE_INFO_POPUP];
      },
    },
  },
  methods: {},
};
</script>
