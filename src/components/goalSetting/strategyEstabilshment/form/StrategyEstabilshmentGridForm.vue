<template>
  <div class="page-content-box">
    <!-- 1번 그리드 -->
    <div class="hms-grid type8 type-noicon type-theader">
      <!-- 공통 켄도 네이티브 그리드 컴포넌트 -->
      <com-tree-list-vue
        :data="itemList"
        :columns="columnsA"
        :drag="getIsDrag"
        :resize="true"
        @change="onChange"
        @onClick="onClick"
        :height="427"
      ></com-tree-list-vue>
    </div>

    <div class="hms-grid type9">
      <!-- 연결 -->
      <com-native-grid
        :data="connectKpiList"
        :columns="columnsB"
        :sortable="true"
        :sort="sortB"
        :resizable="true"
        @btnclick="onBtnClick"
        height="209"
      >
      </com-native-grid>
      <com-native-grid
        :data="connectPrjList"
        :columns="columnsC"
        :sortable="true"
        :sort="sortC"
        :resizable="true"
        @btnclick="onBtnClick"
        height="209"
      >
      </com-native-grid>
    </div>
    <a ref="links"></a>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import ComTreeListVue from '@/components/common/global/ComTreeListVue';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';
import { timezone } from '@/utils';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'StrategyEstabilshmentForm',
  mixins: [strategyEstabilshmentStore, commonStore],
  components: {
    ComTreeListVue,
    ComNativeGrid,
  },
  data() {
    return {
      strategyAssignmentId: 0, //* 선택된 상세 정보 ID
      sortB: [{}],
      sortC: [{}],
      //* 1번 그리드 정렬 속성
      columnsA: [],
      //* 2번 그리드 컬럼 속성
      columnsB: [],
      //* 3번 그리드 컬럼 속성
      columnsC: [],
      connectKpiList: [],
      connectPrjList: [],
      itemList: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    //* 전략수립리스트
    getStrategyList() {
      return this[
        strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_LIST
      ];
    },
    //* 전략과제 연결 리스트
    getStrategyConnectList() {
      return this[
        strategyEstabilshmentTypes.getters
          .GET_STRATEGY_ESTABILSHMENT_CONNECT_LIST
      ];
    },
    getIsDrag() {
      return this[strategyEstabilshmentTypes.getters.GET_IS_GRID_DRAG];
    },
    baseYear() {
      return this[strategyEstabilshmentTypes.getters.GET_STG_SEARCH_INFO]
        .baseYYYY;
    },
  },
  watch: {
    baseYear() {
      this.initColumns();
    },
    getI18nLocale() {
      this.initColumns();
    },
    getStrategyConnectList(value) {
      this.connectPrjList = [];
      this.connectKpiList = [];
      const connectArr = value;
      //* 연결 KPI
      if (connectArr.connectKpiList) {
        // const tempConnectKpiList = connectArr.connectKpiList.map(function(
        //   item,
        // ) {
        //   const achRate = common.getAchRate(
        //     item.targetOYy,
        //     item.targetMYy,
        //     item.resultYy,
        //     item.kpiAchType,
        //   );
        //   item.kpiAchRate = achRate;
        //   return item;
        // });
        this.connectKpiList = connectArr.connectKpiList;
      }

      //* 연결과제
      if (connectArr.connectPrjList)
        this.connectPrjList = connectArr.connectPrjList;
    },
    getStrategyList: function(value) {
      this.itemList = value ? value : [];
    },
  },
  created() {
    this.initColumns();
    const nowYear = timezone.getClientDate('YYYY');
    const deptId = this[commonTypes.getters.GET_USER_DATA].parentDeptId;

    //* 전략과제 연결리스트 초기화
    this[
      strategyEstabilshmentTypes.actions
        .INIT_STRATEGY_ESTABILSHMENT_CONNECT_LIST
    ]({});

    //* 전략과제 리스트 가져오기 초기 조건
    const baseYyyy = this.$route.params.baseYyyy;
    const searchInfo = {
      baseYYYY: baseYyyy ? baseYyyy : nowYear, //* 현재년도 default
      deptId: deptId, //* 로그인한 사용자 부서 default
    };
    //* 전략과제 리스트 가져오기 초기 조건 저장
    this[strategyEstabilshmentTypes.actions.INIT_STG_SEARCH_INFO](searchInfo);

    //*전략과제 리스트 가져오기
    this[strategyEstabilshmentTypes.actions.FETCH_STRATEGY_ESTABILSHMENT_LIST](
      searchInfo,
    );
    //* 드래그앤 드롭 초기화
    this[strategyEstabilshmentTypes.actions.INIT_IS_GRID_DRAG](true);
  },
  methods: {
    initColumns() {
      this.columnsA = [
        {
          field: 'stgNm',
          title: `${this.baseYear}${this.$t('NLS0000812')} 전략체계도`, //xxxx년 전략체계도
          width: '350px',
          format: 'button',
          underLine: false,
          align: 'left',
        },
        {
          field: 'stgDeptNm',
          title: this.$t('NLS0000064'), //등록부서
          width: '135px',
          align: 'left',
        },
        {
          field: 'stgKpiCount',
          title: this.$t('NLS0001351'), //KPI 수
          width: '55px',
          align: 'right',
          format: 'button',
          underLine: true,
        },
        {
          field: 'kpiScore',
          title: this.$t('NLS0001414'), //KPI 달성률
          align: 'right',
          width: '80px',
          format: 'progress',
          classname: 'hms-mbo-per size',
        },
        {
          field: 'stgPrjCount',
          title: this.$t('NLS0000242'), //과제 수
          width: '60px',
          align: 'right',
          format: 'button',
          underLine: true,
        },
        {
          field: 'prjScore',
          title: this.$t('NLS0001413'), //과제 진척률
          classname: 'hms-mbo-per size',
          width: '80px',
          align: 'right',
          format: 'progress',
        },
      ];
      this.columnsB = [
        {
          title: this.$t('NLS0000245'), //KPI 정보
          width: '700px',
          locked: true,
          children: [
            {
              field: 'kpiNm',
              title: this.$t('NLS0000160'), //KPI명 -> KPI
              width: '230px',
              className: 'left under-line-btn td-ellipsis',
              format: 'button',
              cell: FunctionCell,
              sortable: true,
            },
            {
              field: 'wtRate',
              title: this.$t('NLS0001445'), //가중치->중요도
              width: '75px',
              className: 'right',
              sortable: true,
            },
            {
              field: 'kpiRate',
              title: this.$t('NLS0000244'), //달성률
              width: '75px',
              format: 'progress',
              className: 'comma hms-grid-per size',
              cell: FunctionCell,
              align: 'right',
              sortable: true,
            },
            {
              field: 'kpiDeptNm',
              width: '110px',
              title: this.$t('NLS0000064'), //KPI 담당부서
              className: 'left',
            },
            {
              field: 'kpiManagerNm',
              title: this.$t('NLS0000065'), //담당자
              width: '110px',
              className: 'left',
            },
          ],
        },
      ];
      this.columnsC = [
        {
          title: this.$t('NLS0000246'), //과제 기본 정보
          width: '700px',
          locked: false,
          children: [
            {
              field: 'prjNm',
              title: this.$t('NLS0000147'), //과제명->과제
              width: '230px',
              className: 'left under-line-btn td-ellipsis',
              format: 'button',
              cell: FunctionCell,
              sortable: true,
            },
            {
              field: 'prjGrade',
              title: this.$t('NLS0000252'), //등급
              width: '50px',
              className: 'center',
              sortable: true,
            },
            {
              field: 'wtRate',
              title: this.$t('NLS0001445'), //가중치->중요도
              width: '75px',
              className: 'right',
              sortable: true,
            },
            {
              field: 'prjRate',
              title: this.$t('NLS0000184'), //진척률
              width: '75px',
              format: 'progress',
              className: 'hms-grid-per size',
              cell: FunctionCell,
              align: 'right',
              sortable: true,
            },
            {
              field: 'prjDeptNm',
              title: this.$t('NLS0000064'), //과제 담당부서
              width: '110px',
              className: 'left',
            },
            {
              field: 'prjManagerNm',
              title: this.$t('NLS0000065'), //담당자
              width: '110px',
              className: 'left',
            },
          ],
        },
      ];
    },
    //* 전략과제 수정
    strategySelected(row) {
      this.strategyAssignmentId = row.strategyAssignmentId;
    },
    async onClick(e, field, items) {
      const isField = e.target.className.indexOf('field');
      //* 전략과제명 클릭
      if (field === 'stgNm' && isField !== -1) {
        const links = this.$refs.links;
        const hasChildren = items?.children ? 'Y' : 'N';
        links.setAttribute(
          'href',
          `/redirectForm?path=strategyEstablishmentInput&stgId=${items.id}&auth=${this.$route.params.auth}&baseYyyy=${items.baseYyyy}&hasChildren=${hasChildren}`,
        );
        links.setAttribute('target', '_blank');
        links.click();
      } else if (field === 'stgPrjCount' || field === 'stgKpiCount') {
        this[
          strategyEstabilshmentTypes.actions
            .FETCH_STRATEGY_ESTABILSHMENT_CONNECT_LIST
        ]({
          stgId: items.id,
          baseYYYY: items.baseYyyy,
        });
      }
    },
    onChange(e, treeData) {
      this[
        strategyEstabilshmentTypes.actions.UPDATE_STRATEGY_ESTABILSHMENT_LIST
      ](treeData);
    },
    children() {
      //children(from, to)
    },
    parents() {
      //parents(from, to)
    },
    async onBtnClick(item, value, field) {
      if (field === 'kpiNm') {
        //* KPI 실적 보고 팝업
        if (field === 'kpiNm') {
          const param = {
            kpiId: item.kpiId,
            baseYyyy: item.reasonYyyymm.substring(0, 4),
            baseMonth:
              item.reasonYyyymm.charAt(4) === '0'
                ? item.reasonYyyymm.charAt(5)
                : item.reasonYyyymm.substring(4, 6),
          };
          await this[commonTypes.actions.INIT_SELECTED_MBO_KPI](param);
          this[commonTypes.actions.INIT_VIEWS_KPI_PERFORMANCE](true);
        }
      } else if (field === 'prjNm') {
        const links = this.$refs.links;
        //* 일반과제
        if (item.prjType === 'GL') {
          links.setAttribute(
            'href',
            `/redirectForm?path=GeneralTaskPage&prjId=${item.prjId}&auth=${this.$route.params.auth}&baseYyyy=${this.baseYear}`,
          );
        }
        //*전문과제
        else {
          links.setAttribute(
            'href',
            `/redirectForm?path=ProjectExecutionDetailPage&prjId=${item.prjId}&auth=${this.$route.params.auth}&baseYyyy=${this.baseYear}`,
          );
        }
        links.setAttribute('target', '_blank');
        links.click();
      }
    },
  },
};
</script>
