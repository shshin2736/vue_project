<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-tasksetting">
            <div class="layer-pop__title type1">
              <p>KPI 연결 목록</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <dl class="task-setting-list" v-if="getPrjKpiList.length > 0">
              <dt v-for="(item, i) in getPrjKpiList" :key="i">
                <span class="kpilink-span">{{ item.kpiNm }}</span>
                <br />
              </dt>
            </dl>
            <dl class="task-setting-list" v-if="getPrjKpiList.length === 0">
              <dt class="current">
                <p class="task-emtpyskill">연관 KPI가 없습니다.</p>
              </dt>
            </dl>
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
  name: 'ProjectKpiPopup',
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
      prjKpiList: [],
    };
  },
  computed: {
    getPrjKpiList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_KPI_LIST];
      return item;
    },
  },
  watch: {
    // getPrjKpiList: function(value) {
    //   this.prjKpiList = value.prjKpiList;
    //value
    // let stepCd = '';
    // let fileList = [];
    // this.getPrjKpiList = value.getPrjKpiList.reduce((acc, cur) => {
    //   const obj = { ...cur };
    //   if (common.isEmpty && acc.prjStepCd === obj.prjStepCd) {
    //   }
    //   acc.push(obj);
    //   return acc;
    // }, []);
    // },
  },
  methods: {
    closePopup() {
      this.$emit('input', false);
    },
  },
};
</script>
