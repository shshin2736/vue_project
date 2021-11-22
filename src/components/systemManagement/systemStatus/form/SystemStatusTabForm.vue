<template>
  <div>
    <div class="page__tab-box type-equal">
      <button
        :class="{ tab__main: true, current: systemAvg }"
        @click="onTab('systemAvg')"
      >
        <span>{{ $t('NLS0000430') }}</span>
      </button>
      <button
        :class="{ tab__main: true, current: moduleUse }"
        @click="onTab('moduleUse')"
      >
        <span>{{ $t('NLS0000431') }}</span>
      </button>
      <button
        :class="{ tab__main: true, current: efficiency }"
        @click="onTab('efficiency')"
      >
        <span>{{ $t('NLS0001444') }}</span>
        <!-- 과제기간효율-> 과제 사용현황 -->
      </button>
      <button
        :class="{ tab__main: true, current: download }"
        @click="onTab('download')"
      >
        <span>{{ $t('NLS0001378') }}</span>
      </button>
    </div>
    <!-- 시스템 검색 영역 -->
    <system-status-search-form :tab="tab"></system-status-search-form>
    <!-- 시스템 버튼 영역 -->
    <system-status-button-form :tab="tab"></system-status-button-form>
    <template v-if="systemAvg">
      <!-- 시스템 그래프 영역 -->
      <system-status-graph-form :tab="tab"></system-status-graph-form>
      <!-- 시스템 리스트 영역 -->
      <system-status-list-form :tab="tab"></system-status-list-form>
    </template>
    <template v-if="moduleUse">
      <!-- 시스템 그래프 영역 -->
      <system-status-graph-form :tab="tab"></system-status-graph-form>
      <!-- 시스템 리스트 영역 -->
      <system-status-list-form :tab="tab"></system-status-list-form>
    </template>
    <template v-if="efficiency">
      <!-- 시스템 그래프 영역 -->
      <system-status-graph-form :tab="tab"></system-status-graph-form>
      <!-- 시스템 리스트 영역 -->
      <system-status-list-form :tab="tab"></system-status-list-form>
    </template>
    <template v-if="download">
      <!-- 시스템 그래프 영역 -->
      <system-status-graph-form :tab="tab"></system-status-graph-form>
      <!-- 시스템 리스트 영역 -->
      <system-status-list-form
        v-show="false"
        :tab="tab"
      ></system-status-list-form>
    </template>
  </div>
</template>

<script>
import SystemStatusSearchForm from '@/components/systemManagement/systemStatus/form/SystemStatusSearchForm.vue';
import SystemStatusButtonForm from '@/components/systemManagement/systemStatus/form/SystemStatusButtonForm.vue';
import SystemStatusGraphForm from '@/components/systemManagement/systemStatus/form/SystemStatusGraphForm.vue';
import SystemStatusListForm from '@/components/systemManagement/systemStatus/form/SystemStatusListForm.vue';

export default {
  name: 'SystemStatusTabForm',
  components: {
    SystemStatusSearchForm,
    SystemStatusButtonForm,
    SystemStatusListForm,
    SystemStatusGraphForm,
  },
  data() {
    return {
      systemAvg: true,
      moduleUse: false,
      efficiency: false,
      download: false,
      tab: 'systemAvg',
    };
  },
  methods: {
    onTab(flag) {
      this.tab = flag;
      if (flag === 'systemAvg') {
        this.moduleUse = false;
        this.efficiency = false;
        this.download = false;
        setTimeout(() => {
          this.systemAvg = true;
        }, 1);
      } else if (flag === 'moduleUse') {
        this.systemAvg = false;
        this.efficiency = false;
        this.download = false;
        setTimeout(() => {
          this.moduleUse = true;
        }, 1);
      } else if (flag === 'efficiency') {
        this.systemAvg = false;
        this.moduleUse = false;
        this.download = false;
        setTimeout(() => {
          this.efficiency = true;
        }, 1);
      } else {
        this.systemAvg = false;
        this.moduleUse = false;
        this.efficiency = false;
        setTimeout(() => {
          this.download = true;
        }, 1);
      }
    },
  },
};
</script>
