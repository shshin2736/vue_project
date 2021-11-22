<template>
  <div>
    <div class="page__btn-tbox">
      <com-dropdowns
        :data="ganttSelectData"
        textfield="text"
        valuefield="value"
        class="hms-dropdown type5"
        v-model="ganttSelect"
        @change="ganttChange"
      ></com-dropdowns>
      <com-button
        type="button"
        :auth="$route.params.auth"
        class="white-btn excel-btn perm_down"
        @click="excelDownload"
      >
        <span>{{ $t('NLS0000321') }}</span>
      </com-button>
      <com-button
        type="button"
        class="blue-btn perm_save"
        @click="onRegistPop"
        :auth="$route.params.auth"
      >
        <span>{{ $t('NLS0000194') }}</span>
      </com-button>
    </div>
    <div class="hms-grid">
      <com-gantt
        v-if="trigger"
        :columns="column"
        :datasource="ganttList"
        :viewtype="viewtype"
        :start="range.startDate"
        :end="range.endDate"
        @viewtype="onClickViewType"
        @btnclick="onClick"
      ></com-gantt>
    </div>
    <a ref="download"></a>
    <a ref="links"></a>
  </div>
</template>

<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComGantt from '@/components/common/global/ComGantt';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import {
  specializedTasksStore,
  generalTasksStore,
  commonStore,
} from '@/mixins';
import { timezone, common } from '@/utils';

export default {
  name: 'ProjectExecutionListForm',
  mixins: [specializedTasksStore, generalTasksStore, commonStore],
  components: {
    ComGantt,
    ComButton,
    ComDropdowns,
  },
  data() {
    return {
      trigger: false,
      viewtype: 'month',
      column: [],
      ganttList: [],
      ganttSelectData: [
        { text: this.$t('NLS0000627'), value: 'week' },
        { text: this.$t('NLS0001171'), value: 'month' },
      ],
      ganttSelect: { text: this.$t('NLS0001171'), value: 'month' },
      range: {
        startDate: new Date(`${new Date().getFullYear()}-01-01`),
        endDate: new Date(`${new Date().getFullYear()}-12-31`),
      },
    };
  },
  computed: {
    getProjectExecutionList(state) {
      common.setSpinner(true);
      state.trigger = false;
      //* 과제 실행 목록 리스트 값
      const items = this[
        projectExecutionTypes.getters.GET_PROJECT_EXECUTION_LIST
      ];
      items.list?.forEach(item => {
        item.percentComplete = item.prjRate / 100;
      });
      return items.length === 0 ? [] : items;
    },
  },
  watch: {
    getProjectExecutionList: function(value) {
      const range = {
        startDate: new Date(
          timezone.convertToClientTimeZone(value.range[0].startDate),
        ),
        endDate: new Date(
          timezone.convertToClientTimeZone(value.range[0].endDate),
        ),
      };
      this.range = range;
      const items = [...value.list];
      this.ganttList = items.map((item, i) => {
        const obj = { ...item };
        obj.id = obj.prjType === 'TASK' ? obj.taskId : obj.prjId;
        obj.summary = true;
        obj.expanded = false;
        obj.parentId = obj.prjType === 'TASK' ? obj.parentId : null;
        obj.orderId = i;
        obj.title =
          obj.prjType === 'IN' ? `[${obj.prjTypeNm}] ${obj.prjNm}` : obj.prjNm;
        obj.progerss = obj.prjRate;
        if (obj.prjStepType != '') {
          obj.id = parseInt(obj.prjId + obj.prjStepType);
          obj.parentId = parseInt(obj.prjId);
          obj.title = obj.prjStep;
          //obj.summary = false; //간트차트 데이터 표시안되는문제
          //obj.expanded = false; //간트차트 데이터 표시안되는문제
          obj.orderId = i;
        }
        if (!common.isEmpty(obj.prjStartDate)) {
          obj.prjStartDate = timezone.convertToClientTimeZone(
            obj.prjStartDate,
            'YYYY-MM-DD',
          );
        }
        if (!common.isEmpty(obj.prjEndDate)) {
          obj.prjEndDate = timezone.convertToServerTimeZone(
            obj.prjEndDate,
            'YYYY-MM-DD',
          );
        }
        if (!common.isEmpty(obj.compDate)) {
          obj.prjCompDate = timezone.convertToServerTimeZone(
            obj.compDate,
            'YYYY-MM-DD',
          );
        } else {
          obj.prjCompDate = '';
        }
        obj.prjRate = !common.isEmpty(obj.prjRate)
          ? Math.round(obj.prjRate)
          : 0;
        obj.start = new Date(obj.prjStartDate);
        if (obj.prjCompDate) {
          obj.end = new Date(obj.prjCompDate);
        } else {
          obj.end = new Date(obj.prjEndDate);
        }
        return obj;
      });
      setTimeout(() => {
        this.trigger = true;
      }, 1);
    },
  },
  mounted() {
    this.initColums();
    this.ganttList = this.getProjectExecutionList;
    window.addEventListener('resize', () => {
      // this.trigger = false;
      // setTimeout(() => {
      //   this.trigger = true;
      // }, 1);
      this.trigger = true;
    });
  },
  methods: {
    ganttChange(e) {
      this.viewtype = e.target.value.value;
    },
    initColums() {
      this.column = [
        { field: 'id', title: 'id' },
        { field: 'prjStatus', title: 'prjStatus' },
        {
          field: 'title',
          title: this.$t('NLS0000151'), // 과제명
          encoded: 'link',
          align: 'left',
          width: '270px',
          icon: true,
          sortable: true,
        },
        {
          field: 'prjStatusNm',
          title: this.$t('NLS0000149'), //'상태'
          width: '70px',
          align: 'left',
          sortable: true,
        },
        {
          field: 'prjRate',
          title: this.$t('NLS0000184'), // '진척률'
          encoded: 'progress',
          width: '100px',
          align: 'right',
          sortable: true,
        },

        {
          field: 'prjDeptNm',
          title: this.$t('NLS0000064'), // 담당부서
          width: '100px',
          align: 'left',
          sortable: true,
        },
        {
          field: 'reportYn',
          title: this.$t('NLS0000186'), // 보고서
          encoded: 'button',
          width: '80px',
          align: 'center',
          sortable: true,
        },

        {
          field: 'prjStartDate',
          title: this.$t('NLS0000158'), //'시작일'
          width: '100px',
          align: 'center',
          sortable: true,
        },
        {
          field: 'prjEndDate',
          title: this.$t('NLS0000159'), //'종료일'
          width: '100px',
          align: 'center',
          sortable: true,
        },
        {
          field: 'prjCompDate',
          title: this.$t('NLS0000439'), // 완료일
          width: '100px',
          align: 'left',
          sortable: true,
        },
        {
          field: 'prjTypeNm',
          title: this.$t('NLS0000183'), // 유형
          width: '80px',
          align: 'left',
          sortable: true,
        },
        {
          field: 'prjUserNm',
          title: this.$t('NLS0000065'), //'담당자'
          width: '100px',
          align: 'left',
          sortable: true,
        },
        // { field: 'orderId', title: 'orderId' },
      ];
    },
    pdfExport() {
      const btn = document.querySelector('.k-gantt-pdf');
      btn.click();
    },
    onClickViewType(type) {
      this.trigger = false;
      this.viewtype = type;
      this.trigger = true;
    },
    async onClick(data, field) {
      const links = this.$refs.links;
      const baseYyyy = this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
      if (field == 'title') {
        switch (data[0].prjType) {
          //* 일반과제
          case 'GL':
            // this.$router.push({
            //   name: `GeneralTaskPage`,
            //   params: {
            //     prjId: data[0].prjId,
            //     auth: this.$route.params.auth,
            //   },
            // });
            links.setAttribute(
              'href',
              `/redirectForm?path=GeneralTaskPage&prjId=${data[0].prjId}&auth=${this.$route.params.auth}&baseYyyy=${baseYyyy}`,
            );
            links.setAttribute('target', '_blank');
            links.click();
            break;
          case 'TASK':
            //* TASA
            // this.$router.push({
            //   name: `GeneralTaskPage`,
            //   params: {
            //     prjId: data[0].prjId,
            //     auth: this.$route.params.auth,
            //   },
            // });
            links.setAttribute(
              'href',
              `/redirectForm?path=GeneralTaskPage&prjId=${data[0].prjId}&auth=${this.$route.params.auth}`,
            );
            links.setAttribute('target', '_blank');
            links.click();
            break;
          case 'IN':
            //* 즉실천
            //* 즉실천 가져오기
            //* 화면 이동
            // this.$router.push({
            //   name: `PrjActionPage`,
            //   params: {
            //     prjId: data[0].prjId,
            //     auth: this.$route.params.auth,
            //   },
            // });
            links.setAttribute(
              'href',
              `/redirectForm?path=PrjActionPage&prjId=${data[0].prjId}&auth=${this.$route.params.auth}`,
            );
            links.setAttribute('target', '_blank');
            links.click();

            break;
          default:
            //* 전문과제
            // this.$router.push({
            //   name: `ProjectExecutionDetailPage`,
            //   params: {
            //     prjId: data[0].prjId,
            //     auth: this.$route.params.auth,
            //   },
            // });
            links.setAttribute(
              'href',
              `/redirectForm?path=ProjectExecutionDetailPage&prjId=${data[0].prjId}&auth=${this.$route.params.auth}&baseYyyy=${baseYyyy}&prjType=${data[0].prjType}`,
            );
            links.setAttribute('target', '_blank');
            links.click();
            break;
        }
      } else if (field == 'reportYn') {
        const prjId = data[0].prjId;
        await this[specializedTasksTypes.actions.FETCH_PROJECT_REPORT_INFO]({
          prjId: prjId,
        });
        await this[specializedTasksTypes.actions.INIT_VIEWS_REPORT_DETAIL_POP](
          true,
        );
      }
    },
    onRegistPop() {
      this[projectExecutionTypes.actions.INIT_VIEWS_PROJECT_REGIST_POP](true);
    },
    excelDownload() {
      const prjSrchCondition = this[
        projectExecutionTypes.getters.GET_PRJ_SRCH_CONDITION
      ];
      //* 선택한 MBO 정보
      const download = this.$refs.download;
      download.setAttribute(
        'href',
        `/api/project/getExcelProjectList.do?srchYYYY=${prjSrchCondition.srchYYYY}&srchDeptId=${prjSrchCondition.srchDeptId}&srchUserId=${prjSrchCondition.srchUserId}&srchPrjNm=${prjSrchCondition.srchPrjNm}`,
      );
      download.click();
    },
  },
};
</script>
