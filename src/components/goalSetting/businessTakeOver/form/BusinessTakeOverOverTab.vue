<template>
  <div :class="{ 'tab-main-box': true, current: getStatus }">
    <div class="hms-grid-wrap">
      <div class="hms-grid type4">
        <div class="page__btn-tbox">
          <!-- 인수대상 KPI	 -->
          <div class="btn-box-title">
            {{ $t('NLS0000162') }}
          </div>
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="updateKpi"
          >
            <!-- 전체 추가	-> 인수하기  -->
            <span>{{ $t('NLS0000166') }}</span>
          </com-button>
        </div>
        <com-native-grid
          :resizable="true"
          :data="getOverKpiList"
          :columns="getColumns.overKpi"
          height="550"
          selectedfield="selected"
          selectedtype="checked"
          @checked="onKpiChk"
          @allchecked="allKpi"
        >
        </com-native-grid>
      </div>
      <!-- <div class="hms-grid type7">
        <div class="page__btn-tbox type-nobtn"> -->
      <!-- 나의 KPI -->
      <!-- <div class="btn-box-title">
            {{ $t('NLS0000164') }}
          </div>
        </div>
        <com-tree-list-vue
          :resizable="true"
          :data="treeListData"
          :columns="getColumns.myKpi"
          :height="560"
        ></com-tree-list-vue>
      </div> -->
      <div class="hms-grid type4">
        <div class="page__btn-tbox">
          <!-- 인수대상 과제 -->
          <div class="btn-box-title">
            {{ $t('NLS0000163') }}
          </div>
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="updatePrj"
          >
            <!-- 전체 추가 -> 인수하기  -->
            <span>{{ $t('NLS0000166') }}</span>
          </com-button>
        </div>
        <com-native-grid
          :data="getOverPrjList"
          :columns="getColumns.overPrj"
          :resizable="true"
          height="550"
          @checked="onPrjChk"
          @allchecked="allPrj"
          selectedfield="selected"
          selectedtype="checked"
        >
        </com-native-grid>
      </div>
      <!-- <div class="hms-grid type7">
        <div class="page__btn-tbox type-nobtn"> -->
      <!-- 나의 과제 -->
      <!-- <div class="btn-box-title">
            {{ $t('NLS0000165') }}
          </div>
        </div>
        <com-native-grid
          :data="getMyPrjList"
          :columns="getColumns.myPrj"
          height="550"
        >
        </com-native-grid>
      </div> -->
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
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { businessTakeOverStore, commonStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'TakeOverOverTabForm',
  mixins: [businessTakeOverStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
  },
  data() {
    return {
      selectedKpi: [],
      selectedPrj: [],
      treeListData: [],
      TAKE_USER_ID: '',
      TKO_ID: '',
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getColumns() {
      return this[businessTakeOverTypes.getters.GET_OVER_COLUMNS];
    },
    getStatus() {
      return this[businessTakeOverTypes.getters.GET_OVER_TAB];
    },
    getOverKpiList() {
      return this[businessTakeOverTypes.getters.GET_OVER_KPI_LIST];
    },
    getOverPrjList() {
      return this[businessTakeOverTypes.getters.GET_OVER_PRJ_LIST];
    },
    getParam() {
      return this[businessTakeOverTypes.getters.GET_PARAM];
    },
    getMyKpiTree() {
      const list = this[businessTakeOverTypes.getters.GET_MY_KPI_TREE].map(
        obj => {
          obj.id = parseInt(obj.sortNo);
          obj.parentId = obj.parentKpiId;
          obj.expanded = true;
          if (obj.bscKpi === 'K') {
            // 지표
            obj.bscKpiNm = this.$t('NLS0000842');
          } else if (obj.bscKpi === 'B') {
            obj.kpiNm = obj.cdNm;
            // BSC관점
            obj.bscKpiNm = this.$t('NLS0000395');
          }
          return obj;
        },
      );
      return list;
    },
    getMyPrjList() {
      return this[businessTakeOverTypes.getters.GET_MY_PRJ_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getMyKpiTree: function(list) {
      this.originTreeListData = [...list];
      let returnList = [];
      list.forEach(obj => {
        let data = { ...obj };
        if (obj.kpiLevel === 1) {
          returnList.push(data);
        }
        this.makeTreeChildrenData(returnList, obj);
      });
      this.treeListData = returnList;
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this[businessTakeOverTypes.actions.INIT_OVER_COLUMNS]({
        overKpi: [
          {
            field: 'kpiNm', //	KPI
            title: this.$t('NLS0000160'),
            className: 'left td-ellipsis',
          },
          {
            field: 'takeUserName', //인계자
            title: this.$t('NLS0000137'),
            className: 'left',
          },
        ],
        overPrj: [
          {
            field: 'prjNm', //과제명
            title: this.$t('NLS0000151'),
            className: 'left td-ellipsis',
          },
          {
            field: 'takeUserName', //인계자
            title: this.$t('NLS0000137'),
            className: 'left',
          },
        ],
        myKpi: [
          {
            field: 'kpiNm', //BSC관점/KPI
            title: this.$t('NLS0000161'),
            className: 'center',
          },
          {
            field: 'bscKpiNm', //구분
            title: this.$t('NLS0000138'),
            className: 'center',
          },
        ],
        myPrj: [
          {
            field: 'prjNm', //과제명
            title: this.$t('NLS0000151'),
            className: 'left td-ellipsis',
          },
        ],
      });
    },
    makeTreeChildrenData(rootObj, item) {
      if (rootObj instanceof Array) {
        rootObj.some(obj => {
          if (obj.kpiId === item.parentId) {
            obj.children = obj.children || [];
            obj.children.push(item);
          }
          return this.makeTreeChildrenData(obj.children, item);
        });
      }
    },
    updateKpi() {
      if (this.getOverKpiList.length > 0) {
        const list = this.getOverKpiList.filter(i => i.selected);
        if (list.length > 0) {
          this[businessTakeOverTypes.actions.UPDATE_OVER_KPI]({
            kpiList: list,
            param: this.getParam,
            takeUserId: this.getOverKpiList[0].takeUserId,
          });
        } else {
          // 추가할 행이 없습니다.
          common.alert('warning', 'NLS0000962');
        }
      } else {
        // 추가할 행이 없습니다.
        common.alert('warning', 'NLS0000962');
      }
    },
    updatePrj() {
      if (this.getOverPrjList.length > 0) {
        const list = this.getOverPrjList.filter(i => i.selected);
        if (list.length > 0) {
          this[businessTakeOverTypes.actions.UPDATE_OVER_PRJ]({
            prjList: list,
            param: this.getParam,
            takeUserId: this.getOverPrjList[0].takeUserId,
          });
        } else {
          // 추가할 행이 없습니다.
          common.alert('warning', 'NLS0000962');
        }
      } else {
        // 추가할 행이 없습니다.
        common.alert('warning', 'NLS0000962');
      }
    },
    onKpiChk(row, chk) {
      this.getOverKpiList.map(cur => {
        if (cur.kpiId === row.kpiId) {
          cur.selected = chk;
        }
      });
    },
    allKpi(rows, chk) {
      const data = this.getOverKpiList;
      data.map(i => (i.selected = chk));
    },
    onPrjChk(row, chk) {
      this.getOverPrjList.map(cur => {
        if (cur.prjId === row.prjId) {
          cur.selected = chk;
        }
      });
    },
    allPrj(rows, chk) {
      const data = this.getOverPrjList;
      data.map(i => (i.selected = chk));
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
