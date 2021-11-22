<template>
  <!--조직 성과관리-->
  <dashboard-box
    :title="$t('NLS0000475')"
    mainClass="dashboard-management"
    :contentsClassList="contentsClassList"
    :sliderSingle="true"
    :sliderOne="true"
    :sliderOption="sliderOption"
    :sliderArrowsSize="['small', 'big']"
    :totalPage="totalPageCnt - 1"
    :progress="progress"
    progressHeight="206px"
  >
    <template v-slot:slot0>
      <button
        v-for="(btn, i) in rowDeptInfoList"
        :key="i"
        type="button"
        :class="{
          'management__topbox-btn': true,
          on: btn.selected,
          cursor: true,
        }"
        @click="onclick(btn)"
      >
        <span>{{ btn.title }}</span>
      </button>
    </template>
    <template v-slot:slot1>
      <span v-for="(achievement, i) in achievementList" :key="i">
        <com-achievement
          v-for="(item, j) in achievement"
          :key="j"
          :data="item"
        ></com-achievement>
      </span>
    </template>
  </dashboard-box>
</template>

<script>
import ComAchievement from '@/components/common/global/ComAchievement';
import DashboardBox from '@/components/dashboard/business/DashboardBox';
import { dashboardStore } from '@/mixins';
import * as dashboardTypes from '@/store/modules/dashboard/types';
import { common } from '../../../utils';
export default {
  name: 'PerformanceManagement',
  mixins: [dashboardStore],
  components: {
    DashboardBox,
    ComAchievement,
  },
  data() {
    return {
      contentsClassList: ['management__topwrap', 'management__bottomwrap'],
      sliderOption: [
        {
          arrows: true,
          edgeFriction: 0.35,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
        // {
        //   arrows: true,
        //   edgeFriction: 0.35,
        //   infinite: true,
        //   speed: 500,
        //   slidesToShow: 1,
        //   slidesToScroll: 1,
        // },
      ],
      achievementList: [[], []],
      take: 8,
      totalPageCnt: 2,
      progress: false,
      showTeam: false,
      rowDeptInfoList: [{ title: '', selected: false }],
    };
  },
  computed: {
    getKpiTreeList() {
      return this[dashboardTypes.getters.GET_DASHBOARD_KPI_TREE_LIST];
    },
    getCurrentSlideNo() {
      return this[dashboardTypes.getters.GET_CURRENT_SLIDE_NO_PERFORM];
    },
  },
  watch: {
    getKpiTreeList: function(data) {
      this.resetData();
      if (common.isEmpty(data)) return;
      let resultList = data.map(el => {
        let obj = { ...el };
        obj.title = obj.kpiNm;
        obj.percent = common.getDemicalPoint(
          common.getAchRate(
            obj.targetOYy,
            obj.targetMYy,
            obj.resultYy,
            obj.kpiAchType,
          ),
          1,
        );
        return obj;
      });
      this.achievementList = [];
      //*총 페이지 개수
      this.take = resultList.length;
      const pageCnt = Math.ceil(resultList.length / this.take);
      this.totalPageCnt = pageCnt;
      for (let i = 0; i < pageCnt; i++) {
        let list = resultList.slice(i * this.take, i * this.take + this.take);
        this.achievementList.push(list);
      }
    },
  },
  async mounted() {
    await this[dashboardTypes.actions.FETCH_DASHBOARD_LOW_DEPT_INFO_LIST]({});
    this.setDeptInfoList();
  },
  methods: {
    onclick(item) {
      this.rowDeptInfoList.forEach(item => {
        item.selected = false;
      });
      item.selected = true;
      this.getKpiTreeListFn(item.deptId);
    },
    setDeptInfoList() {
      let list = this[dashboardTypes.getters.GET_DASHBOARD_LOW_DEPT_INFO_LIST];
      let result = list.map((el, i) => {
        let obj = {};
        obj.selected = i === 0 ? true : false;
        obj.title = el.deptNm;
        obj.deptId = el.deptId;
        return obj;
      });
      this.rowDeptInfoList = [...result];

      this.sliderOption[0].slidesToShow =
        this.rowDeptInfoList.length < 5 ? this.rowDeptInfoList.length : 5;

      if (this.rowDeptInfoList.length > 0) {
        this.getKpiTreeListFn(this.rowDeptInfoList[0].deptId);
      } else {
        this.resetData();
      }
    },
    getKpiTreeListFn(deptId) {
      const param = {
        searchDeptId: deptId || '',
      };
      this[dashboardTypes.actions.FETCH_DASHBOARD_KPI_TREE_LIST](param);
    },
    resetData() {
      this.achievementList = [[], []];
    },
  },
};
</script>

<style scoped lang="scss">
.cursor {
  cursor: default;
}
.dashboard-management {
  width: 100%;
  max-width: 680px;
  flex: none;

  @include breakpoint(desktop-s) {
    max-width: 100%;
    width: 100%;
  }
}
</style>
