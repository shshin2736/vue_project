<template>
  <dashboard-box
    :title="titleText + deptText"
    mainClass="dashboard__task"
    :contentsClassList="contentsClassList"
    :filterBtn="viewFilterBtn"
    :progress="progress"
    progressHeight="240px"
    @filter="onFilter"
  >
    <template v-slot:slot0>
      <span class="hms-dashboard-radio">
        <input
          type="radio"
          name="dashboard-radio"
          id="dashboard-radio1"
          checked="checked"
        />
        <label for="dashboard-radio1" @click="tabSelect('total')">
          <span>{{ $t('NLS0000926') }}</span
          ><!--총 과제-->
          <strong>{{ totalPrjTotal || 0 }}</strong>
        </label>
      </span>
      <span class="hms-dashboard-radio">
        <input type="radio" name="dashboard-radio" id="dashboard-radio2" />
        <label for="dashboard-radio2" @click="tabSelect('specialized')">
          <span>{{ $t('NLS0000927') }}</span
          ><!--전문 과제-->
          <strong>{{ specializedPrjTotal || 0 }}</strong>
        </label>
      </span>
      <span class="hms-dashboard-radio">
        <input type="radio" name="dashboard-radio" id="dashboard-radio3" />
        <label for="dashboard-radio3" @click="tabSelect('general')">
          <span>{{ $t('NLS0000192') }}</span
          ><!--일반 과제-->
          <strong>{{ generalPrjTotal || 0 }}</strong>
        </label>
      </span>
      <span class="hms-dashboard-radio">
        <input type="radio" name="dashboard-radio" id="dashboard-radio4" />
        <label for="dashboard-radio4" @click="tabSelect('imAction')">
          <span>{{ $t('NLS0000928') }}</span
          ><!--즉 실천-->
          <strong>{{ imActionPrjTotal || 0 }}</strong>
        </label>
      </span>
    </template>
    <template v-slot:slot1>
      <com-native-grid
        height="273"
        :data="prjData"
        :sortable="true"
        :sort="sort"
        :columns="columns"
        :autosortable="false"
        @btnclick="prjClick"
        @headerSortEvent="onHeaderSortEvent"
      >
      </com-native-grid>
      <a ref="links"></a>
    </template>
  </dashboard-box>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common, timezone } from '@/utils';
import DashboardBox from '@/components/dashboard/business/DashboardBox';
import {
  commonStore,
  dashboardStore,
  generalTasksStore,
  specializedTasksStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderSortCell from '@/components/common/business/HeaderSortCell';
import * as dashboardTypes from '@/store/modules/dashboard/types';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';

export default {
  name: 'ProjectManagement',
  components: {
    DashboardBox,
    ComNativeGrid,
  },
  mixins: [
    commonStore,
    dashboardStore,
    generalTasksStore,
    specializedTasksStore,
  ],
  data() {
    return {
      contentsClassList: ['hms-dashboard-radio-box', 'hms-dashboard__gridbox'],
      columns: [],
      titleText: this.$t('NLS0001248'), //*프로젝트 관리
      deptText: '',
      progress: false,
      viewFilterBtn: false,
      specializedPrjData: [],
      generalPrjData: [],
      imActionPrjData: [],
      totalPrjData: [],
      prjData: [],
      specializedPrjTotal: 0,
      generalPrjTotal: 0,
      imActionPrjTotal: 0,
      totalPrjTotal: 0,
      today: timezone.getClientDate('YYYYMMDD'),
      sortObj: '',
      func: '',
      types: 'total',
      items: '',
      sort: [{}],
      dataTrigger: false,
    };
  },
  computed: {
    getAllPrjList() {
      const items = this[
        dashboardTypes.getters.GET_DASHBOARD_PROJECT_MANAGE_ALL_LIST
      ];
      return items ? items : [];
    },
    getRowDeptInfoList() {
      //* 하위 부서
      return this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
    },
    getSelectedDept() {
      //* 선택한 부서
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
  },
  watch: {
    getAllPrjList: function(list) {
      this.dataTrigger = false;
      this.sortHandler(list, 'total');
    },
    getSelectedDept: function(value) {
      this.deptText = '';
      if (common.isEmpty(value)) {
        this.getPrjList();
        return;
      }
      let rowDeptList = -1;
      if (common.isEmpty(this.getRowDeptInfoList)) return;
      const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      rowDeptList = this.getRowDeptInfoList.findIndex(
        x => x.deptId === value.deptId,
      );
      if (
        loginUserInfo.userType !== 'ADMIN' &&
        loginUserInfo.userType !== 'SUPER' &&
        rowDeptList === -1
      ) {
        //*하위에 해당하는부서가 아닐때
        common.alert('warning', 'NLS0000929');
        return;
      }
      this.deptText = ' - ' + value.deptNm;
      this.getPrjList(value.deptId);
    },
  },
  async created() {
    this.initColumns();
    this[commonTypes.actions.INIT_SELECTED_DEPT]({});
    await this[commonTypes.actions.INIT_LOW_DEPT_INFO_LIST]([]);
    await this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
    const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    const userType = loginUserInfo.userType;
    if (
      userType === 'DIRECTOR' ||
      userType === 'ADMIN' ||
      userType === 'SUPER'
    ) {
      this.viewFilterBtn = true;
    }
  },
  mounted() {
    //this.getPrjList();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'prjNm',
          title: this.$t('NLS0000147'), //*과제
          className: 'left td-ellipsis', //under-line-btn
          format: 'button',
          cell: FunctionCell,
          width: '278px',
          headerCell: HeaderSortCell,
        },
        // {
        //   field: 'prjGrade',
        //   title: this.$t('NLS0000252'), //*등급
        //   className: 'center',
        //   width: '70px',
        //   headerCell: HeaderSortCell,
        // },
        {
          field: 'reportYn',
          width: '60px',
          title: this.$t('NLS0000186'), //* 보고서
          className: 'analysis-btn',
          format: 'button',
          cell: FunctionCell,
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //*담당부서
          width: '130px',
          className: 'left td-ellipsis',
          headerCell: HeaderSortCell,
        },
        {
          field: 'prjRate',
          title: this.$t('NLS0000184'), //*진척률
          className: 'left project-managebox-graph size',
          format: 'barProgress',
          cell: FunctionCell,
          headerCell: HeaderSortCell,
        },
      ];
    },
    //* 헤더 클릭 이벤트
    onHeaderSortEvent(sortObj, func) {
      if (this.sortObj.type && this.sortObj.field !== sortObj.field)
        this.sortObj.type = '';
      this.func = func;
      this.sortObj = sortObj;
      this.sortHandler(this.prjData);
    },
    //* 정렬 이벤트
    sortHandler(list) {
      this.prjData = [];
      if (common.isEmpty(list)) {
        list = [];
      }
      if (!this.dataTrigger) {
        const items = [...list];
        this.totalPrjData = items;
        this.totalPrjTotal =
          this.totalPrjData.length > 0 ? this.totalPrjData.length : 0;
        this.specializedPrjData = items.filter(
          item => item.prjType !== 'GL' && item.prjType !== 'IN',
        );
        this.specializedPrjTotal = this.specializedPrjData
          ? this.specializedPrjData.length
          : 0;
        this.generalPrjData = items.filter(item => item.prjType === 'GL');
        this.generalPrjTotal = this.generalPrjData
          ? this.generalPrjData.length
          : 0;
        this.imActionPrjData = items.filter(item => item.prjType === 'IN');
        this.imActionPrjTotal = this.imActionPrjData
          ? this.imActionPrjData.length
          : 0;
        this.dataTrigger = true;
      }
      this.setPrjData();
    },
    tabSelect(types) {
      this.types = types;
      this.setPrjData();
    },
    setPrjData() {
      this.prjData = [];
      if (this.types === 'total')
        this.prjData = this.setDate(this.setSort(this.totalPrjData));
      if (this.types === 'specialized')
        this.prjData = this.setDate(this.setSort(this.specializedPrjData));
      if (this.types === 'general')
        this.prjData = this.setDate(this.setSort(this.generalPrjData));
      if (this.types === 'imAction')
        this.prjData = this.setDate(this.setSort(this.imActionPrjData));
    },
    setSort(list) {
      return this.func
        ? this.func(list.slice(0), this.sortObj.field, this.sortObj.type)
        : list.slice(0);
    },
    setDate(items) {
      return items.map(el => {
        let obj = { ...el };
        let endDate = timezone.convertToDateFormat(obj.endDate, 'YYYYMMDD');
        obj.prjRate = Number(obj.prjRate).toFixed(0);
        obj.prjRate =
          obj.prjStatus === 'B' || obj.prjRate === '100'
            ? obj.prjRate + ' graph_blue'
            : !common.isEmpty(endDate) && this.today <= endDate
            ? obj.prjRate + ' graph_grn'
            : obj.prjRate + ' graph_red';
        if (obj.prjType !== 'GL' && obj.prjType !== 'IN') {
          obj.reportYn = '';
        }
        return obj;
      });
    },
    onFilter() {
      //this[commonTypes.actions.INIT_SELECTED_DEPT]({});
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    getPrjList(deptData) {
      //*과제 리스트 조회
      let param = {};
      if (!common.isEmpty(deptData)) param = { deptId: deptData };
      this[dashboardTypes.actions.FETCH_DASHBOARD_PROJECT_MANAGE_LIST](param);
    },
    getPrjRate(rate) {
      let rateVal = !common.isEmpty(rate) ? Math.round(rate / 10) * 10 : '0';
      if (rate > 100) rateVal = 100;
      if (rate < 0) rateVal = 0;
      return rateVal + '';
    },
    async prjClick(data, name, field) {
      if (field === 'prjNm') {
        this.clickPrjNm(data);
      } else if (field === 'reportYn') {
        const prjId = data.prjId;
        await this[specializedTasksTypes.actions.FETCH_PROJECT_REPORT_INFO]({
          prjId: prjId,
        });
        await this[specializedTasksTypes.actions.INIT_VIEWS_REPORT_DETAIL_POP](
          true,
        );
      }
    },
    clickPrjNm(data) {
      const links = this.$refs.links;
      switch (data.prjType) {
        //* 일반과제
        case 'GL':
          //* 일반 과제 정보 가져오기

          links.setAttribute(
            'href',
            `/redirectForm?path=GeneralTaskPage&prjId=${data.prjId}&auth=${this.$route.params.auth}&prjType=${data.prjType}`,
          );
          links.setAttribute('target', '_blank');
          links.click();
          break;
        case 'IN':
          //* 즉실천
          //* 즉실천 가져오기
          links.setAttribute(
            'href',
            `/redirectForm?path=PrjActionPage&prjId=${data.prjId}&auth=${this.$route.params.auth}&prjType=${data.prjType}`,
          );
          links.setAttribute('target', '_blank');
          links.click();
          break;
        default:
          links.setAttribute(
            'href',
            `/redirectForm?path=ProjectExecutionDetailPage&prjId=${data.prjId}&auth=${this.$route.params.auth}&prjType=${data.prjType}`,
          );
          links.setAttribute('target', '_blank');
          links.click();
          break;
      }
    },
  },
};
</script>
