<template>
  <div class="hms-grid-wrap">
    <div class="hms-grid type4 taketab-box">
      <div class="page__btn-tbox t_left w100p">
        <!-- 인계자 KPI체계도 -->
        <div class="btn-box-title w100p">
          <span class="font-bold">{{ $t('NLS0001392') }}</span>
        </div>
      </div>
      <com-tree-view
        :name="name1"
        :dragDrop="dragDrop"
        :dataSource="tempTreeList"
        height="420"
        @drop="drop1"
        @dataSource="getData1"
      ></com-tree-view>
    </div>
    <div
      class="hms-grid type4 taketab-box"
      style="margin-left:0.5%; margin-right:0.5%;"
    >
      <div class="page__btn-tbox t_left w100p">
        <!-- 인수자 KPI체계도 -->
        <div class="btn-box-title w100p">
          <span class="font-bold">{{ $t('NLS0001393') }}</span>
        </div>
      </div>
      <com-tree-view
        :name="name2"
        :dragDrop="dragDrop"
        :dataSource="kpiTreeList"
        height="420"
        @drop="drop"
        @dataSource="getData"
      ></com-tree-view>
    </div>
    <div class="hms-grid type4 w33-full">
      <div class="page__btn-tbox t_right">
        <com-button
          type="button"
          class="blue-btn perm_save"
          :auth="$route.params.auth"
          @click="onSave"
        >
          <!-- 체계도 인수 확정 -->
          <span>{{ $t('NLS0001394') }}</span>
        </com-button>
      </div>
      <!-- 인계/인수자 정보 테이블 -->
      <kpi-system-chart-user-form
        :getOverUserInfo="tkoInfo"
        :reqStatus="reqStatus"
      ></kpi-system-chart-user-form>
      <div class="page__btn-bbox">
        <button type="button" class="deepdarkgray-btn" @click="goToList">
          <!-- 목록 -->
          <span>{{ $t('NLS0000372') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import { businessTakeOverStore, commonStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import KpiSystemChartUserForm from '@/components/goalSetting/businessTakeOver/form/KpiSystemChartUserForm';
import ComTreeView from '@/components/common/global/ComTreeView';

import { common } from '@/utils';

export default {
  name: 'KpiSystemChartOverForm',
  mixins: [businessTakeOverStore, commonStore],
  components: {
    ComButton,
    KpiSystemChartUserForm,
    ComTreeView,
  },
  data() {
    return {
      name1: 'TakeUserTree',
      name2: 'overUserTree',
      dragDrop: true,
      trigger1: false,
      trigger2: true,
      tempTreeList: {},
      kpiTreeList: {},
      newSortNo: 1,
      afterDropData: {},
      isChanged: false,
      newTreeList: [],
      flag: '',
      cnt: 1,
      tidList: [],
      movedTreeToArray: [],
      reqStatus: '',
      statusI: common.filterCode(common.getCodeList('TOV001'), 'I'),
    };
  },
  computed: {
    tkoInfo() {
      return this[businessTakeOverTypes.getters.GET_PARAM];
    },
    getKpiSystemChart() {
      return this[businessTakeOverTypes.getters.GET_KPI_SYSTEM_CHART].map(
        item => {
          const obj = { ...item };
          obj.girdNm = this.name2;
          obj.id = obj.tid;
          obj.parentId = common.isEmpty(obj.parentTid) ? '' : obj.parentTid;
          obj.expanded = true;
          obj.text = obj.bscKpi === 'B' ? obj.cdNm : obj.kpiNm;
          return obj;
        },
      );
    },
    getTempTree() {
      return this[businessTakeOverTypes.getters.GET_TEMP_TREE].map(item => {
        const obj = { ...item };
        obj.girdNm = this.name1;
        obj.id = obj.tid;
        obj.parentId = common.isEmpty(obj.parentTid) ? '' : obj.parentTid;
        obj.expanded = true;
        obj.text = obj.bscKpi === 'B' ? obj.cdNm : obj.kpiNm;
        return obj;
      });
    },
  },
  watch: {
    getKpiSystemChart: function(value) {
      const rootList = value.filter(i => i.kpiLevel === 1);
      value.forEach(item => {
        const obj = { ...item };
        this.makeTreeChildrenData(rootList, obj);
      });
      this.kpiTreeList = { data: rootList };
      setTimeout(() => {
        this.trigger1 = true;
      }, 100);
    },
    getTempTree: function(value) {
      const rootList = value.filter(i => i.kpiLevel === 1);
      value.forEach(item => {
        const obj = { ...item };
        this.makeTreeChildrenData(rootList, obj);
      });
      this.tempTreeList = { data: rootList };
    },
  },
  async mounted() {
    const param = this.$route.params.param;
    this[businessTakeOverTypes.actions.FETCH_TEMP_TREE]({
      tkoId: param.tkoId,
      flag: 'OVER',
    });
    this[businessTakeOverTypes.actions.FETCH_KPI_SYSTEM_CHART]({
      baseYyyy: param.baseYyyy,
    });
  },
  async created() {
    if (common.isEmpty(this.$route.params.access)) {
      this.goToList();
    }
  },
  methods: {
    makeTreeChildrenData(rootList, obj) {
      if (rootList instanceof Array) {
        rootList.forEach(item => {
          if (item.tid === obj.parentTid) {
            item.items = item.items || [];
            item.items.push(obj);
          }
          this.makeTreeChildrenData(item.items, obj);
        });
      }
    },
    getData1(data) {
      //* 인계자 tree에 drop 한 후의 treeData
      if (this.isChanged && this.flag === 'TAKE') {
        this.isChanged = false;
        this.doMerge(data);
      }
    },
    getData(data) {
      //* 인수자 tree에 drop 한 후의 treeData
      if (this.isChanged && this.flag === 'OVER') {
        this.isChanged = false;
        this.doMerge(data);
      }
    },
    async doMerge(data) {
      await this[businessTakeOverTypes.actions.FETCH_TID]({ cnt: this.cnt });
      this.tidList = this[businessTakeOverTypes.getters.GET_TID];
      this.newTreeList = [];
      this.newSortNo = 1;
      data.data.map(item => {
        const obj = { ...item };
        obj.newSortNo = this.newSortNo++;
        obj.kpiLevel = 1;
        obj.parantKpiId = null;
        obj.parentTid = null;
        this.newTreeList.push(obj);
        if (obj.items !== undefined && obj.items.length > 0) {
          this.remakeTreeList(obj.items, obj);
        }
      });
      //* 새로운 Tid로 치환
      this.mergeTid(this.newTreeList);
      await this[businessTakeOverTypes.actions.UPDATE_OVER_KPI_SYSTEM_CHART]({
        tree: this.newTreeList,
        kpiData: this.movedTreeToArray,
        baseYyyy: this.$route.params.baseYyyy,
        tkoId: this.tkoInfo.tkoId,
        takeUserId: this.tkoInfo.takeUserId,
        flag: this.flag,
      });
    },
    remakeTreeList(rootList, obj) {
      if (rootList !== undefined && rootList.length > 0) {
        rootList.forEach(item => {
          const i = { ...item };
          i.kpiLevel = obj.kpiLevel + 1;
          i.newSortNo = this.newSortNo++;
          i.parentTid = obj.tid;
          i.parentKpiId = obj.kpiId;
          this.newTreeList.push(i);
          return this.remakeTreeList(i.items, i);
        });
      }
    },
    mergeTid(rootList) {
      this.movedTreeToArray.forEach((i, idx) => {
        const obj = { ...i };
        rootList.map(j => {
          if (obj.tid === j.tid) {
            j.tid = this.tidList[idx].tid;
          }
          if (obj.tid === j.parentTid) j.parentTid = this.tidList[idx].tid;
        });
      });
    },
    drop(data) {
      //* 인계자 tree에 drop 했을 때
      this.flag = 'TAKE';
      this.dropProc(data);
    },
    drop1(data) {
      //* 인수자 tree에 drop 했을 때
      this.flag = 'OVER';
      this.dropProc(data);
    },
    dropProc(data) {
      this.movedTreeToArray = [];
      this.reqStatus = this.statusI.cdNm;
      this.cnt = 1;
      this.movedTreeToArray.push(data);
      if (data?.items) this.getCnt(data.items);
      this.isChanged = true;
    },
    getCnt(data) {
      data.forEach(i => {
        this.cnt++;
        this.movedTreeToArray.push(i);
        if (i?.items) this.getCnt(i.items);
      });
    },
    onSave() {
      if (
        this.tkoInfo.statusCd === 'C' &&
        this.reqStatus != this.statusI.cdNm
      ) {
        //이미 완료된 요청입니다.
        common.alert('warning', 'NLS0001395');
      } else {
        // 체계도 인수를 확정하시겠습니까?
        common.confirm('NLS0001396', () => {
          this[businessTakeOverTypes.actions.UPDATE_TREE_TKO_STATUS]({
            tkoId: this.tkoInfo.tkoId,
            tko: {
              tkoId: this.tkoInfo.tkoId,
              takeUserId: this.tkoInfo.takeUserId,
              flag: '',
            },
          });
          this.reqStatus = common.filterCode(
            common.getCodeList('TOV001'),
            'C',
          ).cdNm;
        });
      }
    },
    goToList() {
      this.$router.push({
        name: 'businessTakeOverPage',
        param: { auth: this.$route.params.auth },
      });
    },
  },
};
</script>
