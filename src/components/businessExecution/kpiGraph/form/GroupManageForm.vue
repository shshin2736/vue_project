<template>
  <div class="hms-grid type3 graph_custom">
    <!-- 지표 그래프 목록	 -->
    <p class="title">{{ $t('NLS0000485') }}</p>
    <div class="page__btn-tbox">
      <div class="btn-box-title">{{ $t('NLS0000488') }} :</div>
      <div class="f_left">
        <div class="search__form__box">
          <span class="input__box">
            <com-input-text
              type="text"
              title="사용자 입력폼"
              v-model="srchParam"
              @enter="srch"
            />
          </span>
        </div>
        <div class="search__btn__box">
          <com-button
            type="button"
            class="search__btn perm_read"
            :auth="$route.params.auth"
            @click="srch"
          >
            <!-- 조회 -->
            <span>{{ $t('NLS0000066') }}</span>
          </com-button>
        </div>
      </div>
      <com-button
        type="button"
        class="blue-btn perm_save"
        :auth="$route.params.auth"
        @click="createChart"
      >
        <!-- 차트 생성 -->
        <span>{{ $t('NLS0000489') }}</span>
      </com-button>
    </div>
    <div class="hms-grid">
      <com-native-grid
        :data="getChartGrpList"
        :columns="getGrpColumns"
        height="250"
        :resizable="true"
        :sortable="true"
        :sort="grpSort"
        @btnclick="onClick"
      >
      </com-native-grid>
    </div>
    <!-- * ’지표 그래프’ 클릭 시 그래프 유형 선택 가능 -->
    <!-- * ‘분석 KPI 수‘ 클릭 시 분석할 KPI의 목록 편집 및 사용자 편집 가능 -->
    <ul class="check-info">
      <li>{{ $t('NLS0001318') }}</li>
      <li>{{ $t('NLS0001319') }}</li>
    </ul>
    <div class="page__tab-box type-equal">
      <button :class="{ tab__main: true, current: isKpi }" @click="onTab">
        <!-- 분석 KPI 목록-->
        <span>{{ $t('NLS0000487') }}</span>
      </button>
      <button :class="{ tab__main: true, current: isUser }" @click="onTab">
        <!-- 그래프 사용자 편집 -->
        <span>{{ $t('NLS0000491') }}</span>
      </button>
    </div>
    <div :class="{ 'tab-main-box': true, current: isKpi }">
      <div class="page__btn-tbox">
        <div class="btn-box-title">
          <!-- 지표 그래프 -->
          <h4>{{ $t('NLS0000483') }}: {{ this.chartNm }}</h4>
        </div>
        <com-button
          type="button"
          class="blue-btn perm_save"
          :auth="$route.params.auth"
          @click="openKpiPopup"
          v-if="isAuthorized"
        >
          <!-- 분석 KPI 추가 -->
          <span>{{ $t('NLS0000493') }}</span>
        </com-button>
        <com-button
          type="button"
          class="darkgray-btn perm_delete"
          :auth="$route.params.auth"
          @click="delKpi"
          v-if="isAuthorized"
        >
          <!-- 분석 KPI 삭제 -->
          <span>{{ $t('NLS0000492') }}</span>
        </com-button>
      </div>
      <div class="hms-grid">
        <com-native-grid
          :data="getKpiList"
          :columns="getKpiColumns"
          :resizable="true"
          :sortable="true"
          :sort="kpiSort"
          height="250"
          selectedfield="selected"
          selectedtype="checked"
          @checked="onKpiChange"
          @allchecked="allKpi"
          @onCheck="axisChecked"
        >
        </com-native-grid>
      </div>
    </div>
    <div :class="{ 'tab-main-box': true, current: isUser }">
      <div class="page__btn-tbox">
        <div class="btn-box-title">
          <!-- 지표 그래프 -->
          <h4>{{ $t('NLS0000483') }}: {{ this.chartNm }}</h4>
        </div>
        <com-button
          type="button"
          class="blue-btn perm_save"
          :auth="$route.params.auth"
          @click="openUserPopup"
          v-if="isCreator"
        >
          <!-- 차트 사용자 추가->추가 -->
          <span>{{ $t('NLS0000493') }}</span>
        </com-button>
        <com-button
          type="button"
          class="darkgray-btn perm_delete"
          :auth="$route.params.auth"
          @click="delUser"
          v-if="isCreator"
        >
          <!-- 사용자 제거 -->
          <span>{{ $t('NLS0000494') }}</span>
        </com-button>
      </div>
      <div class="hms-grid">
        <com-native-grid
          :data="getUserList"
          :columns="getUserColumns"
          :resizable="true"
          :sortable="true"
          :sort="userSort"
          height="350"
          selectedfield="selected"
          selectedtype="checked"
          @checked="onUserChange"
          @allchecked="allUser"
        >
        </com-native-grid>
      </div>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { kpiGraphStore, commonStore } from '@/mixins';
import { common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as kpiGraphTypes from '@/store/modules/businessExecution/kpiGraph/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'GroupManageForm',
  mixins: [kpiGraphStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
    ComInputText,
  },
  data() {
    return {
      isKpi: true,
      isUser: false,
      srchParam: '',
      GROUP_ID: '',
      isAuthorized: false,
      isCreator: false,
      chartNm: '',
      chartGrpList: [],
      chartList: [],
      grpSort: [{ field: 'orderDate', dir: 'desc' }],
      kpiSort: [{ field: 'kpiNm', dir: 'asc' }],
      userSort: [{ field: 'deptNm', dir: 'asc' }],
    };
  },
  computed: {
    getGrpColumns() {
      return this[kpiGraphTypes.getters.GET_GRP_COLUMS];
    },
    getKpiColumns() {
      return this[kpiGraphTypes.getters.GET_KPI_COLUMS];
    },
    getUserColumns() {
      return this[kpiGraphTypes.getters.GET_USER_COLUMS];
    },
    getChartGrpList() {
      return this[kpiGraphTypes.getters.GET_CHART_GRP_LIST];
    },
    getKpiList() {
      return this[kpiGraphTypes.getters.GET_CHART_KPI_LIST];
    },
    getUserList() {
      return this[kpiGraphTypes.getters.GET_CHART_USER_LIST];
    },
    getSelectedKpi() {
      return this[commonTypes.getters.GET_SELECTED_COM_KPI_POOL_LIST];
    },
    getSelectedUser() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_LIST];
    },
    getDsbYn() {
      return this[kpiGraphTypes.getters.GET_DSB_YN];
    },
  },
  watch: {
    getSelectedKpi: function(value) {
      if (value.length > 0) {
        const list = value.map(i => i.kpiId);
        const param = {
          groupId: this.GROUP_ID,
          list: list,
          flag: 'ADD',
        };
        this[kpiGraphTypes.actions.UPDATE_CHART_KPI](param);
        this[commonTypes.actions.INIT_SELECTED_COM_KPI_POOL_LIST]([]);
      }
    },
    getSelectedUser: function(value) {
      if (value.length > 0) {
        const list = value.map(i => i.userId);
        const param = { groupId: this.GROUP_ID, list: list, flag: 'ADD' };
        this[kpiGraphTypes.actions.UPDATE_CHART_USER](param);
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
      }
    },
    getChartGrpList: function(value) {
      if (!common.isEmpty(value)) {
        this.chartNm = value[0].groupNm;
        this.kpiMng(value[0]);
      }
    },
  },
  mounted() {
    this.srch();
    this.initCloums();
    this.initKpiColumn();
    this.fetchRecentGraph();
  },
  methods: {
    init() {
      this[kpiGraphTypes.actions.INIT_CHART_GRP_DETAIL]({});
      this[kpiGraphTypes.actions.INIT_CHART_KPI]([]);
      this[kpiGraphTypes.actions.INIT_CHART_USER]([]);
    },
    srch() {
      this[kpiGraphTypes.actions.FETCH_CHART_GRP_LIST]({
        srchParam: this.srchParam,
      });
    },
    async fetchRecentGraph() {
      const yyyy = new Date().getFullYear().toString();
      let param = {
        searchFromYyyymm: `${yyyy}01`,
        searchToYyyymm: `${yyyy}12`,
      };
      await this[kpiGraphTypes.actions.FETCH_RECENT_LIST](param);
    },
    async getTabData(groupId) {
      this.GROUP_ID = groupId;
      await this[kpiGraphTypes.actions.FETCH_CHART_KPI_LIST]({
        groupId: groupId,
      });
      await this[kpiGraphTypes.actions.FETCH_CHART_USER_LIST]({
        groupId: groupId,
      });
    },
    onTab() {
      this.isKpi = !this.isKpi;
      this.isUser = !this.isUser;
    },
    createChart() {
      this.init();
      this[kpiGraphTypes.actions.INIT_VIEWS_CREATE_CHART_POPUP](true);
    },
    onClick(item, value, field) {
      this.init();
      if (field === 'groupNm') {
        this.groupMng(item);
      } else if (field === 'totCnt') {
        this.kpiMng(item);
        this.chartNm = item.groupNm;
      } else if (field === 'groupId') {
        this.graphMng(item);
      }
    },
    //* 그룹차트명 클릭
    groupMng(item) {
      this[kpiGraphTypes.actions.FETCH_CHART_GRP_DETAIL]({
        groupId: item.groupId,
        isGroupUser: item.isGroupUser,
      });
      this[kpiGraphTypes.actions.INIT_VIEWS_CREATE_CHART_POPUP](true);
    },
    //* KPI수 클릭
    kpiMng(item) {
      const { userType, userId } = this[commonTypes.getters.GET_USER_DATA];
      const isAdmin =
        userType === 'SUPER' || userType === 'ADMIN' ? true : false;
      this.isCreator = isAdmin || item.createUser === userId ? true : false;
      this.isAuthorized =
        isAdmin || this.isCreator || item.isGroupUser !== null ? true : false;
      this.getTabData(item.groupId);
      this.initKpiColumn(item);
    },
    //* 차트보기 클릭
    async graphMng(item) {
      this.chartNm = '';
      await this[kpiGraphTypes.actions.FETCH_CHART_KPI_LIST]({
        groupId: item.groupId,
        chart: 'Y',
      });
      const kpiIdList = this[kpiGraphTypes.getters.GET_CHART_KPI].map(
        i => i.kpiId,
      );
      if (kpiIdList.length > 0) {
        const yyyy = new Date().getFullYear().toString();
        this[commonTypes.actions.FETCH_YEAR_LIST]({});
        let param = {
          searchFromYyyymm: `${yyyy}01`,
          searchToYyyymm: `${yyyy}12`,
          chart: 'Y',
          groupId: item.groupId,
        };
        this[kpiGraphTypes.actions.INIT_GRP_DATA]({
          type: item.baseChartType,
          name: item.groupNm,
          groupId: item.groupId,
        });
        await this[kpiGraphTypes.actions.FETCH_KPI_MONTH_LIST](param);
        this[kpiGraphTypes.actions.INIT_VIEWS_CHART_DETAIL_POPUP](true);
      } else {
        // 조회할 KPI가 없습니다.
        common.alert('warning', 'NLS0001024');
      }
    },
    //* 임원 메인화면 적용 여부
    // async onCheck(item, chk, field, e) {
    //   const dsbYn = this.getChartGrpList.map(i => i.dsbYn);
    //   const filter = dsbYn.filter(i => i === 'Y');
    //   if (chk) {
    //     if (filter.length === 3) {
    //       // 메인화면 노출 가능 차트그룹은 3개까지 선택 가능합니다.
    //       common.alert('warning', 'NLS0000910');
    //       e.target.checked = false;
    //       return false;
    //     } else {
    //       item.dsbYn = 'Y';
    //     }
    //   } else {
    //     item.dsbYn = 'N';
    //   }
    //   const res = await this[kpiGraphTypes.actions.UPDATE_DSB_YN]({
    //     ...item,
    //     userType: this.USER_TYPE,
    //   });
    //   if (res) {
    //     // 저장되었습니다
    //     common.alert('success', 'NLS0000012');
    //   }
    // },
    //* KPI 그리드 체크박스 선택 이벤트
    onKpiChange(row, chk) {
      this.getKpiList.map(cur => {
        if (cur.kpiId === row.kpiId) {
          cur.selected = chk;
        }
      });
    },
    //* KPI 그리드 체크박스 전체선택 이벤트
    allKpi(rows, chk) {
      const data = this.getKpiList;
      data.map(i => (i.selected = chk));
    },
    openKpiPopup() {
      this[commonTypes.actions.INIT_EXIST_KPI_LIST](
        this.getKpiList.map(item => item.kpiId),
      );
      this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP]({
        value: true,
        flag: 'other',
      });
    },
    delKpi() {
      const list = this.getKpiList.filter(i => i.selected === true);
      if (list.length === 0) {
        // 삭제할 KPI를 선택해주세요.
        common.alert('warning', 'NLS0001025');
      } else {
        const param = {
          groupId: this.GROUP_ID,
          list: list,
          flag: 'DELETE',
          userType: this.USER_TYPE,
        };
        // 삭제하시겠습니까?
        common.confirm('NLS0000004', async () => {
          const res = await this[kpiGraphTypes.actions.UPDATE_CHART_KPI](param);
          if (res) {
            // 삭제하였습니다
            common.alert('success', 'NLS0000002');
          }
        });
      }
    },
    //* 사용자 그리드 체크박스 선택 이벤트
    onUserChange(row, chk) {
      const obj = this.getUserList;
      obj.reduce((acc, cur) => {
        if (cur.userId === row.userId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    //* 사용자 그리드 체크박스 전체선택 이벤트
    allUser(rows, chk) {
      const data = this.getUserList;
      data.map(i => (i.selected = chk));
    },
    delUser() {
      const list = this.getUserList.filter(i => i.selected === true);
      if (list.length === 0) {
        // 삭제할 사용자를 선택해주세요.
        common.alert('warning', 'NLS0001026');
      } else {
        const param = { groupId: this.GROUP_ID, list: list, flag: 'DELETE' };
        // 삭제하시겠습니까?
        common.confirm('NLS0000004', async () => {
          const res = await this[kpiGraphTypes.actions.UPDATE_CHART_USER](
            param,
          );
          if (res) {
            // 삭제되었습니다.
            common.alert('success', 'NLS0000002');
          }
        });
      }
    },
    openUserPopup() {
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        exceptList: this.getUserList,
      });
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({
        exceptList: this.getUserList,
      });
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](true);
    },
    //* 사용자 언어 변경 시, 컬럼 새로 그리기
    initCloums() {
      //* 그룹 그리드 컬럼
      this[kpiGraphTypes.actions.INIT_GRP_COLUMS]([
        {
          field: 'groupNm',
          title: this.$t('NLS0000483'), // 지표 그래프
          className: 'left under-line-btn td-ellipsis',
          format: 'button',
          cell: FunctionCell,
          width: 250,
        },
        {
          field: 'groupId', //차트보기
          title: this.$t('NLS0000490'),
          className: 'analysis-btn',
          format: 'button',
          width: '100',
          cell: FunctionCell,
        },
        {
          field: 'totCnt', // 분석 KPI 수
          title: this.$t('NLS0000243'),
          className: 'center kpisel under-line-btn',
          format: 'button',
          cell: FunctionCell,
          width: '100',
        },
        {
          field: 'deptNm', //담당부서
          title: this.$t('NLS0000064'),
          className: 'left',
          width: '150',
        },
        {
          field: 'userName', //담당자->성명
          title: this.$t('NLS0000176'),
          className: 'left td-ellipsis',
          width: '150',
        },
        {
          field: 'useYn', //사용여부
          title: this.$t('NLS0000058'),
          className: 'center',
          cell: FunctionCell,
          width: '70',
        },
      ]);
      //* 사용자 그리드 컬럼
      this[kpiGraphTypes.actions.INIT_USER_COLUMS]([
        {
          field: 'deptNm', //시용자 부서
          title: this.$t('NLS0000213'),
          className: 'left',
          width: '270',
        },
        {
          field: 'userName', //시용자명
          title: this.$t('NLS0000221'),
          className: 'left',
          width: '270',
        },
        {
          field: 'rankName', //직위->직급
          title: this.$t('NLS0000343'),
          className: 'center',
          width: '120',
        },
        {
          field: 'dutyName', //직책
          title: this.$t('NLS0000124'),
          className: 'center',
          width: '130',
        },
      ]);
    },
    initKpiColumn(item) {
      const columns = [
        {
          field: 'kpiNm', //분석 KPI
          title: this.$t('NLS0001316'),
          className: 'left td-ellipsis',
          width: 210,
        },
        {
          field: 'kpiUnitNm', //단위
          title: this.$t('NLS0000063'),
          className: 'center',
          width: 80,
        },
        {
          field: 'arcType', //지표유형
          title: this.$t('NLS0000704'),
          className: 'center',
          width: 80,
        },
        {
          field: 'kpiCycle', //측정주기
          title: this.$t('NLS0000057'),
          className: 'center',
          width: 80,
        },
        {
          field: 'kpiPerType', //계산방식
          title: this.$t('NLS0000705'),
          className: 'center',
          width: 80,
        },
      ];
      //* 이중축 타입인 경우 이중축 column 추가
      if (item !== undefined) {
        if (item.baseChartType === '40') {
          const list = [
            {
              field: 'deptNm', //담당부서
              title: this.$t('NLS0000064'),
              className: 'left td-ellipsis',
              width: 95,
            },
            {
              field: 'userName', //담당자
              title: this.$t('NLS0000065'),
              className: 'left',
              width: 95,
            },
            {
              title: this.$t('NLS0001387'), //이중축
              field: 'axis2Yn',
              editable: false,
              format: 'check',
              cell: FunctionCell,
              className: 'center',
              width: '65',
            },
          ];
          columns.push(...list);
        } else {
          const list = [
            {
              field: 'deptNm', //담당부서
              title: this.$t('NLS0000064'),
              className: 'left td-ellipsis',
              width: 120,
            },
            {
              field: 'userName', //담당자
              title: this.$t('NLS0000065'),
              className: 'left',
              width: 120,
            },
          ];
          columns.push(...list);
        }
      }

      //* KPI 그리드 컬럼
      this[kpiGraphTypes.actions.INIT_KPI_COLUMS](columns);
    },
    axisChecked(item, chk, field, e) {
      const axis2Y = this.getKpiList.filter(item => item.axis2Yn === 'Y');
      const isSameUnit = axis2Y[0]?.kpiUnit
        ? axis2Y[0].kpiUnit === item.kpiUnit
          ? true
          : false
        : false;
      const yyyy = new Date().getFullYear().toString();
      if (chk && (common.isEmpty(axis2Y) || isSameUnit)) {
        item.axis2Yn = 'Y';
        this[kpiGraphTypes.actions.UPDATE_KPI_AXIS2_YN]({
          ...item,
          searchFromYyyymm: `${yyyy}01`,
          searchToYyyymm: `${yyyy}12`,
        });
      } else if (chk && !isSameUnit) {
        // 단위가 다른 항목은 2개 이상 이중축을 선택할 수 없습니다.
        common.alert('warning', 'NLS0001388');
        e.target.checked = false;
      } else if (!chk) {
        item.axis2Yn = 'N';
        this[kpiGraphTypes.actions.UPDATE_KPI_AXIS2_YN]({
          ...item,
          searchFromYyyymm: `${yyyy}01`,
          searchToYyyymm: `${yyyy}12`,
        });
      }
    },
  },
};
</script>
