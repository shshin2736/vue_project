<template>
  <div class="hms-grid">
    <com-tree-list-vue
      :data="treeListData"
      :columns="columns"
      :drag="thisYearCheck"
      :height="433"
      @change="onChange"
      @checked="onChecked"
      @delete="onDelete"
      @onClick="onClick"
      @popup="openChildKpiPopup"
    ></com-tree-list-vue>
  </div>
</template>
<script>
import ComTreeListVue from '@/components/common/global/ComTreeListVue';
import { timezone, common } from '@/utils';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

export default {
  name: 'KpiTargetListForm',
  mixins: [kpiTargetEstablishmentStore, commonStore],
  components: {
    ComTreeListVue,
  },
  data() {
    return {
      treeListData: [],
      originTreeListData: [],
      getData: [],
      indexSortNo: 1,
      columns: [],
      thisYearCheck: true,
      yearData: timezone.getClientDate('YYYY'),
    };
  },
  computed: {
    getTargetListData() {
      const list = this[
        kpiTargetEstablishmentTypes.getters.GET_KPI_TARGET_ESTABILSHMENT_LIST
      ].map(el => {
        let obj = { ...el };
        obj.id = obj.tid;
        obj.parentId = common.isEmpty(obj.parentTid) ? '' : obj.parentTid;
        obj.expanded = true;
        obj.checkbox = {
          value: obj.kpiId,
          title: 'check',
          render: obj.bscKpi === 'K' ? true : false,
          checked: obj.bscKpi === 'K' && obj.mboYn === 'Y' ? true : false,
          disable:
            !this.thisYearCheck || (obj.bscKpi === 'K' && obj.mboAppYn === 'Y')
              ? true
              : false,
        };
        if (obj.bscKpi === 'K') {
          obj.bscKpiNm = this.$t('NLS0000842'); //*지표
          obj.popup = obj.subYn === 'Y' ? true : false; //*하위 KPI표시
        } else if (obj.bscKpi === 'B') {
          obj.kpiNm = obj.cdNm;
          obj.bscKpiNm = this.$t('NLS0000841'); //*관점
        }
        obj.targetOYy = common.getDemicalComma(
          obj.targetOYy,
          obj.pointCnt || 0,
        );
        obj.targetMYy = common.getDemicalComma(
          obj.targetMYy,
          obj.pointCnt || 0,
        );
        obj.targetMs = common.getDemicalComma(obj.targetMs, obj.pointCnt || 0);
        obj.targetTs = common.getDemicalComma(obj.targetTs, obj.pointCnt || 0);
        obj.preResultYy = common.getDemicalComma(
          obj.preResultYy,
          obj.pointCnt || 0,
        );
        obj.avg3yyResult = common.getDemicalComma(
          obj.avg3yyResult,
          obj.pointCnt || 0,
        );
        return obj;
      });
      return list;
    },
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
  },
  watch: {
    getTargetListData: function(list) {
      this.originTreeListData = [...list];
      let returnList = [];
      list.some(obj => {
        let data = { ...obj };
        if (obj.kpiLevel === 1) {
          returnList.push(data);
        }
        this.makeTreeChildrenData(returnList, obj);
      });

      //* MBO 적용할떄 필요
      this[kpiTargetEstablishmentTypes.actions.INIT_APPLY_MBO_LIST](returnList);
      this.treeListData = returnList;
    },
    getSelectedYear: function(year) {
      //*올해 체계도만 수정가능
      this.checkWriteData(year);
    },
  },
  mounted() {
    this.initColumns();
    //*로그인사용자의 하위부서 리스트 조회
    this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
    this.checkWriteData(this[commonTypes.getters.GET_SELECTED_YEAR_DATA]);
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000161'), //*BSC관점/KPI
          width: '450',
          underLine: false,
          format: 'popup',
        },
        {
          field: 'kpiUnitNm',
          width: '72',
          title: this.$t('NLS0000063'), //*단위
          align: 'center',
        },
        {
          field: 'deptNm',
          width: '135',
          title: this.$t('NLS0000064'), //*담당부서
          align: 'left',
        },
        {
          field: 'userName',
          width: '125',
          title: this.$t('NLS0000065'), //*담당자
          align: 'left ',
        },
        // {
        //   field: 'bscKpiNm',
        //   title: this.$t('NLS0000138'), //*구분
        //   width: '75',
        //   align: 'center',
        // },
        {
          field: 'checkbox',
          title: this.$t('NLS0000479'), //*MBO 선정 - >MBO
          width: '70',
          format: 'checkbox',
          align: 'center',
        },
        {
          field: 'targetOYy',
          title: this.$t('NLS0000327'), //*년간 목표
          format: 'button',
          underLine: true,
          width: '75',
          classname: 'inCell input-cell',
          className: 'comma',
          align: 'right',
        },
        {
          field: 'targetMYy',
          title: this.$t('NLS0001358'), //*수정 목표
          className: 'comma',
          underLine: true,
          width: '75',
          format: 'button',
          align: 'right',
        },
        // {
        //   field: 'targetMs',
        //   title: this.$t('NLS0000392'), //*당월 목표
        //   className: 'comma ellipsis',
        //   align: 'right',
        // },
        // {
        //   field: 'targetTs',
        //   title: this.$t('NLS0000393'), //*누적 목표
        //   className: 'comma ellipsis',
        //   align: 'right',
        // },
        {
          field: 'preResultYy',
          title: this.$t('NLS0000308'), //*전년 실적
          width: '75',
          className: 'comma ',
          align: 'right',
        },
        {
          field: 'avg3yyResult',
          title: this.$t('NLS0000394'), //*3개년 평균실적
          className: 'comma ',
          width: '110',
          align: 'right',
        },
        {
          field: 'deleteBtn',
          title: ' ',
          format: 'editor',
          width: '95',
          align: 'center',
        },
      ];
    },
    checkWriteData(year) {
      // const date = new Date();
      // date.setFullYear(date.getFullYear() + 1);
      // const nextYear = date.getFullYear().toString();
      const future = Number(this.yearData) < Number(year);
      this.thisYearCheck =
        this.yearData === year || future || year === '2020' ? true : false;
    },
    makeTreeChildrenData(rootObj, item) {
      //* treevue 구조에 맞게 데이터 구조 변경
      if (rootObj instanceof Array) {
        rootObj.some(obj => {
          if (obj.id === item.parentId) {
            obj.children = obj.children || [];
            obj.children.push(item);
          }
          return this.makeTreeChildrenData(obj.children, item);
        });
      }
    },
    async openChildKpiPopup(e, row) {
      //* 하위 KPI 팝업 오픈
      //* KPI 상세정보 조회
      await this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
        kpiId: row.kpiId,
      });
      //* 하위 KPI 조회
      // this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_CHILD_LIST]({
      //   baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
      //   kpiId: row.kpiId,
      // });
      // this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_CHILD_POP](true);
      //* 단순하위 KPI 조회
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_SIMPLE_CHILD_LIST]({
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        kpiId: row.kpiId,
      });
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_SIMPLE_CHILD_POP](
        true,
      );
    },
    //* tree vue row change
    async onChange(e, treeData) {
      if (!this.thisYearCheck) return;
      this.indexSortNo = 1;
      this.getData = [];
      treeData.map(item => {
        let obj = { ...item };
        this.getData.push({
          kpiId: obj.kpiId,
          tId: obj.tid,
          sortNo: obj.sortNo,
          newSortNo: this.indexSortNo++,
          mboYn: obj.mboYn,
          parentId: '',
          parentTid: '',
          kpiLevel: 1,
          baseYyyy: this.getSelectedYear,
        });
        obj.indexKpiLevel = 1;
        if (obj.children !== undefined && obj.children.length > 0) {
          this.searchTreeData(obj.children, obj);
        }
      });
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        list: this.getData,
      };
      await this[kpiTargetEstablishmentTypes.actions.UPDATE_KPI_TREE_LIST](
        param,
      );
      this.getData = [];
    },
    searchTreeData(rootObj, item) {
      if (rootObj instanceof Array) {
        rootObj.some(objVal => {
          let obj = { ...objVal };
          //*부모id 넣기
          this.getData.push({
            kpiId: obj.kpiId,
            tId: obj.tid,
            sortNo: obj.sortNo,
            parentTid: item.tid,
            newSortNo: this.indexSortNo++,
            kpiLevel: item.indexKpiLevel + 1,
            parentId: item.kpiId,
            baseYyyy: this.getSelectedYear,
            mboYn: obj.mboYn,
          });
          obj.indexKpiLevel = item.indexKpiLevel + 1;
          if (obj.children !== undefined && obj.children.length > 0) {
            this.searchTreeData(obj.children, obj);
          }
        });
      }
    },
    onChecked(e, treeData, checkYn, item) {
      // -> mbo선정 삭제됨.
      //*mbo선정여부 클릭시
      const mboYn = checkYn ? 'Y' : 'N';
      this.onSearchKpi(this.treeListData, item, mboYn);
      this[kpiTargetEstablishmentTypes.actions.INIT_APPLY_MBO_LIST](
        this.treeListData,
      );
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        mboYn: checkYn ? 'Y' : 'N',
        kpiId: item.kpiId,
        tId: item.tid,
        sortNo: item.sortNo,
      };
      this[kpiTargetEstablishmentTypes.actions.UPDATE_KPI_POOL_SINGLE](param);
    },
    //* MBOYn 체크한 KPI 찾기
    onSearchKpi(rootObj, item, mboYn) {
      if (rootObj instanceof Array) {
        rootObj.some(obj => {
          if (obj.kpiId == item.kpiId) {
            obj.mboYn = mboYn;
            return;
          }
          if (obj.children !== undefined && obj.children.length > 0) {
            this.onSearchKpi(obj.children, item, mboYn);
          }
        });
      }
    },
    onDelete(e, treeData, delData) {
      if (!this.thisYearCheck) return;
      common.confirm('NLS0000004', () => {
        let param = [];
        let mboYnVal = false;
        let delParam = [];
        if (delData.children != undefined && delData.children.length > 0) {
          //*하위 KPI있는경우
          this.deleteTreeData(delData.children, delParam);
        }
        param = [...delParam];
        param.push({
          kpiId: delData.kpiId,
          tId: delData.tid,
          sortNo: delData.sortNo,
          baseYyyy: this.getSelectedYear,
          mboAppYn: delData.mboAppYn,
        });
        param.forEach(obj => {
          if (obj.mboAppYn === 'Y') {
            mboYnVal = true;
            return false;
          }
        });
        if (mboYnVal) {
          common.alert(
            'info',
            'NLS0001017', //*이미 mbo 승인된 KPI가 존재하여 삭제할 수 없습니다.
          );
          return;
        }
        this[kpiTargetEstablishmentTypes.actions.DELETE_BSC_KPI_LIST]({
          baseYyyy: this.getSelectedYear,
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
          list: param,
        });
      });
    },
    deleteTreeData(delData, delParam) {
      if (!this.thisYearCheck) return;
      //* 삭제를위해 선택한데이터와 하위데이터 가져오기
      delData.map(obj => {
        delParam.push({
          kpiId: obj.kpiId,
          sortNo: obj.sortNo,
          tId: obj.tid,
          baseYyyy: this.getSelectedYear,
          mboAppYn: obj.mboAppYn,
        });
        if (obj.children !== undefined) {
          this.deleteTreeData(obj.children, delParam);
        }
      });
      return delParam;
    },
    onClick(e, field, items) {
      const isField = e.target.className.indexOf('field');
      //*지표일때만 목표입력 팝업오픈
      if (items.bscKpi === 'B') return;

      //*KPI수정팝업오픈
      if (field === 'kpiNm' && isField !== -1) {
        this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
          kpiId: items.kpiId,
          baseYyyy: this.getSelectedYear,
        });
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_UPDATE_POP](
          true,
        );
      }
      if (field === 'targetOYy' || field === 'targetMYy') {
        //*목표등록팝업오픈
        let param = {
          field: field,
          mboAppYn: items.mboAppYn,
          kpiId: items.kpiId,
          baseYyyy: this.getSelectedYear,
          baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
          baseMm: this.getSelectedMonth,
        };
        //*선택한날짜 세팅
        this[
          kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_YEAR_DATA
        ](this.getSelectedYear);
        this[
          kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_MONTH_DATA
        ](this.getSelectedMonth);

        //*목표데이터 리스트 조회(년,월,주)
        this[kpiTargetEstablishmentTypes.actions.FETCH_REG_GOAL_KPI_DATA_SET](
          param,
        );
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_REG_GOAL_POP](
          true,
        );
      }
    },
  },
};
</script>
