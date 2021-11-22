<template>
  <div class="">
    <div class="page__tab-box type-equal">
      <button
        class="tab__main"
        :class="{ current: getMboListTab }"
        @click="onTab('list')"
      >
        <!-- MBO 목록 -->
        <span>{{ $t('NLS0000300') }}</span>
      </button>
      <button
        class="tab__main"
        :class="{ current: getMboBoardTab }"
        @click="onTab('board')"
      >
        <!-- MBO 현황 -->
        <span>{{ $t('NLS0000299') }} </span>
      </button>
    </div>
    <!-- MBO 현황-->
    <mbo-oper-board-form v-show="getMboBoardTab"></mbo-oper-board-form>
    <!-- MBO 리스트-->
    <mbo-oper-list-form v-show="getMboListTab"></mbo-oper-list-form>
  </div>
</template>

<script>
import MboOperBoardForm from '@/components/goalSetting/mboOperation/form/MboOperBoardForm';
import MboOperListForm from '@/components/goalSetting/mboOperation/form/MboOperListForm';
import { mboOperationStore } from '@/mixins';
import * as mboOperTypes from '@/store/modules/goalSetting/mboOperation/types';
export default {
  name: 'MboOperTabForm',
  mixins: [mboOperationStore],
  components: {
    MboOperBoardForm,
    MboOperListForm,
  },
  computed: {
    getMboBoardTab: {
      set(value) {
        this[mboOperTypes.actions.INIT_MBO_BOARD_TAB](value);
      },
      get() {
        return this[mboOperTypes.getters.GET_MBO_BOARD_TAB];
      },
    },
    getMboListTab: {
      set(value) {
        this[mboOperTypes.actions.INIT_MBO_LIST_TAB](value);
      },
      get() {
        return this[mboOperTypes.getters.GET_MBO_LIST_TAB];
      },
    },
  },
  mounted() {
    this[mboOperTypes.actions.INIT_MBO_BOARD_TAB](false);
    this[mboOperTypes.actions.INIT_MBO_LIST_TAB](true);
    //* 알림 클릭으로 들어온 경우
    if (this.$route.params.onListTab) {
      this[mboOperTypes.actions.INIT_MBO_LIST_TAB](true);
      this[mboOperTypes.actions.INIT_MBO_BOARD_TAB](false);
    }
  },
  methods: {
    onTab(type) {
      if (type === 'board') {
        this[mboOperTypes.actions.INIT_MBO_BOARD_TAB](true);
        this[mboOperTypes.actions.INIT_MBO_LIST_TAB](false);
      }
      if (type === 'list') {
        this[mboOperTypes.actions.INIT_MBO_BOARD_TAB](false);
        this[mboOperTypes.actions.INIT_MBO_LIST_TAB](true);
      }
    },
  },
};
</script>
