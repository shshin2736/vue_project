<template>
  <dl class="task-accordion">
    <dt v-bind:class="dtClassNm" @click="changeDtClass">
      <button type="button" class="task-accordion-btn">
        <span>Task <em class="required-text">*</em></span>
      </button>
    </dt>
    <dd v-show="dtContent">
      <div class="accordion-inner-btnbox">
        <!-- <button type="button" class="accordion-btn save" @click="saveTaskList">
          <span>저장</span>
        </button> -->
        <!-- <button
          type="button"
          class="accordion-btn finish"
          @click="updateTaskStatus"
          v-show="isShowBtn"
        > -->
        <!-- 진행	 -->
        <!-- <span>{{ $t('NLS0000844') }} </span> -->
        <!-- </button> -->
        <button
          type="button"
          class="accordion-btn info"
          @click="openHelpPop('Task', 'NLS0000784')"
        >
          <!-- 도움말 -->
          <span>{{ $t('NLS0000823') }}</span>
        </button>
      </div>
      <div class="hmstask-form-box">
        <span v-if="!isDisabled">
          <button
            v-show="isShowBtn"
            type="button"
            class="brightgray-btn plus-btn"
            @click="addTasks"
          >
            <!-- Task 추가	 -->
            <span>{{ $t('NLS0000202') }}</span>
          </button></span
        >
        <div class="hms-newgrid task-table">
          <com-tree-list-vue
            :data="taskList"
            :columns="columns"
            :drag="drag"
            :resize="true"
            @change="onChange"
            @delete="onDelete"
            @update="onUpdate"
            @cancel="onCancel"
            @edit="onEdit"
            @onClick="onClick"
          ></com-tree-list-vue>
        </div>
      </div>
    </dd>
  </dl>
</template>

<script>
import ComTreeListVue from '@/components/common/global/ComTreeListVue';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { generalTasksStore, commonStore } from '@/mixins';
import { common, timezone } from '@/utils';

export default {
  name: 'GeneralTaskGridForm',
  mixins: [generalTasksStore, commonStore],
  components: {
    ComTreeListVue,
  },
  data() {
    return {
      prjMainInfo: {},
      testIdx: 0,
      taskList: [],
      idx: 0,
      //sortNo: 10000,
      editFlag: 0, // * 신규로 추가되거나 edit상태가 아닌 상태
      dtClassNm: 'current',
      dtContent: true,
      // isShowAddTask: true,
      // isShowProgress: true,
      isShowBtn: true, //* task 추가 버튼 , 진행 버튼 ON/OFF
      sort: [{ field: 'ProductName', dir: 'asc' }],
      columns: [],
      isDisabled: false,
      drag: true,
      showEditBtn: false,
      showDelBtn: false,
      isPrjUser: false,
      isPrjManager: false,
      unfoldTree: [],
    };
  },
  computed: {
    getGnlTaskList() {
      return this[generalTasksType.getters.GET_GNL_TASK_LIST];
      //* object.BtnDelete = true or false
    },
    getGnlPrjMain() {
      return this[generalTasksType.getters.GET_GNL_PRJ_MAIN];
    },
  },
  watch: {
    //* taskList 변경시  reload
    getGnlTaskList(value) {
      if (value !== undefined && value.length > 0) {
        this.getTaskListLength(value);
        //* Object Deep Copy
        const tempTaskList = JSON.parse(JSON.stringify(value));
        //* ClinetTimeZone 설정
        this.recursiveClientTimeZone(tempTaskList);
        tempTaskList.forEach(element => {
          this.setTaskBtn(element);
        });
        this.taskList = tempTaskList;
      }
    },
    getGnlPrjMain(value) {
      this.prjMainInfo = value;
      //* task 추가 및 taks 진행 버튼 ON/OFF
      this.setShowBtn();
    },
  },
  mounted() {
    if (
      !this.$route.params.auth.includes('S') &&
      !this.$route.params.auth.includes('X') &&
      !this.$route.params.auth.includes('D')
    ) {
      this.isShowBtn = false;
      this.isDisabled = true;
    }
    //* 데이터 세팅
    this.initData();

    this.initColumns();
    //* task추가 버튼 , 진행버튼 SHOW ON/OFF
    //this.setShowBtn();
    //* task 리스트(edit, delete 버튼 SHOW ON/OFF) 세팅
    //this.setTaskList();
  },
  methods: {
    initData() {
      if (this.$route.params.prjId) {
        //* 일반 과제 정보 가져오기
        // await this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN]({
        //   prjId: this.$route.params.prjId,
        // });
        //* Task 리스트 가져오기
        this[generalTasksType.actions.FETCH_GNL_TASK_LIST]({
          prjId: this.$route.params.prjId,
        });
        //* 수정화면 ON
        this[generalTasksType.actions.INIT_IS_NEW_GNL_TASK](false);
      } else {
        this[generalTasksType.actions.INIT_IS_NEW_GNL_TASK](true);
      }
    },

    initColumns() {
      this.columns = [
        {
          field: 'taskNm',
          title: this.$t('NLS0000201'), //Task 명
          width: 300,
          inEdit: true,
          underLine: false,
          format: 'button',
        },
        {
          field: 'startDate',
          title: this.$t('NLS0000158'), //시작일
          width: 150,
          inEdit: true,
          validate: ['startDate', 'endDate'],
          func: (a, b) => {
            return a > b;
          },
          format: 'datePicker',
          classname: 'cell-fixed',
        },
        {
          field: 'endDate',
          title: this.$t('NLS0000159'), //종료일
          width: 150,
          inEdit: true,
          validate: ['startDate', 'endDate'],
          func: (a, b) => {
            return a > b;
          },
          format: 'datePicker',
          classname: 'cell-fixed',
        },
        {
          field: 'manager',
          title: this.$t('NLS0000065'), //담당자
          width: 200,
          inEdit: true,
          format: 'managerSearch',
          classname: 'cell-fixed',
        },
        {
          field: 'taskStatusNm',
          title: this.$t('NLS0000149'), //상태
          width: 70,
          classname: 'cell-fixed',
          // format: 'popup',
        },
        {
          field: 'commandBtn',
          title: ' ',
          format: this.isDisabled ? '' : 'command',
          width: 200,
          align: 'center',
        },
      ];
    },
    setShowBtn() {
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      this.isPrjUser =
        this.prjMainInfo.prjUserId == loginUserInfo.userId ? true : false;
      this.isPrjManager =
        this.prjMainInfo.prjManagerId == loginUserInfo.userId ? true : false;
      if (
        this.prjStatus === 'C' ||
        (this.isPrjUser === false && this.isPrjManager === false)
      )
        this.isShowBtn = false;
      else this.isShowBtn = true;
    },
    doMerge(tree) {
      if (tree.length > 0) {
        const children = [];
        tree.forEach(t => {
          let sortNo = t.sortNo;
          t.children = t.children.map(i => {
            sortNo++;
            const obj = { ...i };
            obj.sortNo = sortNo;
            obj.parentTaskId = t.taskId;
            obj.taskLevel = t.taskLevel + 1;
            return obj;
          });
          children.push(...t.children);
        });
        this.unfoldTree.push(...children);

        const arr = children.filter(i => i.children);
        return this.doMerge(arr);
      }
    },
    onChange(e, treeData) {
      this.taskList = treeData;
      this.unfoldTree = [];
      treeData = treeData.map((i, idx) => {
        const obj = { ...i };
        obj.taskLevel = 1;
        obj.parentTaskId = null;
        obj.sortNo = idx + 1;
        return obj;
      });
      this.unfoldTree.push(...treeData);
      const arr = treeData.filter(i => i.children);
      if (arr.length > 0) {
        this.doMerge(arr);
      }

      const prjId = this[generalTasksType.getters.GET_PRJ_ID]; //* 일반과제 ID
      const param = {
        taskList: this.unfoldTree,
        prjId: prjId,
      };
      this[generalTasksType.actions.UPDATE_TASK_LIST](param);
    },
    onEdit(e, treeData, data) {
      data.isNew = false; //* 해당 데이터는 update해야할 row
      this.editFlag = this.editFlag + 1;
    },
    async onDelete(e, treeData, data) {
      const resultData = await this[generalTasksType.actions.DELETE_GNL_TASK](
        data,
      );
      if (resultData.result === 'T') {
        this.taskList = treeData;
        // 삭제되었습니다
        common.alert('success', 'NLS0000002');
      }
    },
    async onUpdate(e, treeData, data) {
      //* 일반과제 ID
      const prjId = this[generalTasksType.getters.GET_PRJ_ID];

      //* 신규일 경우
      //* 일반과제 id 속성으로 추가
      //* 진행상태 : 미진행(D)
      if (data.isNew) {
        data.prjId = prjId;
        data.taskStatus = 'D';
      }

      //* 임시 종료 날짜
      const tempEndDate = data.endDate.replace(/-/g, '');
      //* 종료일짜가 현재일자보다 작을경우
      if (
        tempEndDate <
          timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD') &&
        data.taskStatus !== 'C'
      ) {
        data.taskStatus = 'E';
        data.taskStatusNm = '지연';
      }

      //* param으로 shallow copy
      const param = Object.assign({}, data);
      //** 시작/종료 날짜 Timezone 설정
      this.setParamTimeZone(param);

      var returnData = {};
      //* 신규 추가일 경우(INSERT)

      //* task 시작날짜 , 종료날짜와 과제 기본정보 날짜를 비교해서 과제 기본정보 날짜 변경 필요
      param.prjStartDate = this.prjMainInfo.prjStartDate;
      param.prjEndDate = this.prjMainInfo.prjEndDate;

      if (data.isNew) {
        //** DB INSERT
        returnData = await this[generalTasksType.actions.INSERT_NEW_UNIT_TASK](
          param,
        );
        data.taskId = returnData.data.taskId;
      }
      //* 수정일 경우(UPDATE)
      else {
        //* DB UPDATE
        returnData = await this[generalTasksType.actions.UPDATE_UNIT_TASK](
          param,
        );
      }

      //* 저장하거나 수정이 완료되면
      if (returnData.result === 'T') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
        this.taskList = treeData;
        this.editFlag = this.editFlag - 1;
        //* 과제 기본정보 가져오기
        this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN](param);
      }
    },
    onCancel(e, treeData) {
      this.editFlag = this.editFlag - 1;
      this.taskList = treeData;
    },
    addTasks() {
      const prjId = this[generalTasksType.getters.GET_PRJ_ID];
      if (prjId !== '' && prjId !== undefined) {
        this.editFlag = this.editFlag + 1;
        this.idx = this.idx + 1;
        // this.taskList.unshift({
        this.taskList.push({
          id: this.idx,
          taskLevel: 1, //* 트리 depth 레벨,
          taskStatus: 'D', //* 신규 추가 = 미진행상태
          taskStatusNm: this.$t('NLS0000846'),
          //sortNo: 0,
          isNew: true,
          inEdit: 'new',
          btnDelete: true,
          btnEdit: true,
          manager: this.getGnlPrjMain.prjUserInfo,
          taskDeptId: this.getGnlPrjMain.prjDeptId,
          taskUserId: this.getGnlPrjMain.prjUserId,
        });
      } else {
        // 일반과제를 등록해야합니다.
        common.alert('warning', 'NLS0000847');
      }
    },
    //* TaskList 길이를 기준으로 idx를 잡는다.
    getIdx() {
      return this.taskList.length;
    },
    async saveTaskList() {
      this.editFlag === 0;

      if (this.editFlag === 0) {
        const prjId = this[generalTasksType.getters.GET_PRJ_ID]; //* 일반과제 ID
        const param = {
          taskList: this.taskList,
          prjId: prjId,
        };
        const result = await this[
          generalTasksType.actions.INSERT_NEW_TASK_LIST
        ](param);
        if (result === 'T') {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012');
        }
      } else {
        //* 추가하거나 수정중인 TASK가 없다면
        // 추가하거나 수정중인 Task가 존재합니다.
        common.alert('warning', 'NLS0000848');
      }
    },
    //* Task명 클릭시
    onClick(e, field, item) {
      if (this.isDisabled) return;
      const isField = e.target.className.indexOf('field');
      if (field === 'taskNm' && item.taskId !== undefined && isField !== -1) {
        //* 첨부파일 타입
        item.downloadType = 'actionDrsDetail';
        //* 선택한 Task정보 저장
        this[generalTasksType.actions.FETCH_SELECTED_GNL_TASK](item);
        //* Task 상세정보 팝업 ON
        this[generalTasksType.actions.INIT_TASK_DETAIL_POPUP](true);
      }
    },
    //* Task 리스트 상태 : 진행 으로 변경
    // updateTaskStatus() {
    //   //* 유효성 체크
    //   //* 1. 일반과제 등록여부
    //   const prjId = this[generalTasksType.getters.GET_PRJ_ID];
    //   if (prjId !== '' && prjId !== undefined) {
    //     //* 2.task 등록 여부
    //     if (this.taskList.length <= 0) {
    //       // Task를 먼저 등록해주세요.
    //       common.alert('warning', 'NLS0000849');
    //     } else {
    //       //* 3.등록된 task 확인 및 추가하거나 수정 중인 task 존재 X
    //       if (this.editFlag === 0) {
    //         // 모든 Task를 진행 하시겠습니까?
    //         common.confirm(this.$t('NLS0000850'), () => {
    //           const param = {
    //             prjId: prjId, //* 일반과제 ID
    //             prjNm: this[generalTasksType.getters.GET_GNL_PRJ_MAIN].prjNm, //* 과제명
    //             prjManagerId: this[generalTasksType.getters.GET_GNL_PRJ_MAIN]
    //               .prjManagerId, //* 담당부서장 ID
    //             prjUserId: this[generalTasksType.getters.GET_GNL_PRJ_MAIN]
    //               .prjUserId, //* 담당자 ID
    //             taskList: this.taskList, //* Task 리스트
    //             taskStatus: 'A', //* 진행
    //           };
    //           this[generalTasksType.actions.UPDATE_TASK_LIST_STATUS](param);
    //         });
    //       } else {
    //         // 추가하거나 수정중인 Task가 존재합니다.
    //         common.alert('warning', 'NLS0000848');
    //       }
    //     }
    //   } else {
    //     // 일반과제를 등록해야합니다.
    //     common.alert('warning', 'NLS0000847');
    //   }
    // },
    setParamTimeZone(param) {
      //** 시작날짜 Timezone 설정
      param.startDate = timezone.convertToServerTimeZone(
        new Date(param.startDate),
        'YYYYMMDD',
      );
      param.endDate = timezone.convertToServerTimeZone(
        new Date(param.endDate),
        'YYYYMMDD',
      );
    },
    getTaskListLength(array) {
      array.forEach(element => {
        this.idx = this.idx + 1;
        if ('children' in element) {
          this.getTaskListLength(element.children);
        }
      });
    },

    recursiveClientTimeZone(array) {
      //* 서버로 부터 받아온 Tree리스트 데이터를 하나씩 꺼내서 date형식 변경
      array.forEach(element => {
        element.startDate = timezone.convertToClientTimeZone(
          element.startDate,
          'YYYY-MM-DD',
        );
        element.endDate = timezone.convertToClientTimeZone(
          element.endDate,
          'YYYY-MM-DD',
        );
        if ('children' in element) {
          this.recursiveClientTimeZone(element.children);
        }
      });
    },
    complateCheck(list) {
      return list.some(obj => {
        let flag = false;
        if (obj.children) {
          flag = this.complateCheck(obj.children);
        }
        return obj.taskStatus !== 'C' || flag;
      });
    },
    setTaskBtn(item) {
      if (item.taskStatus === 'C' && (this.isPrjUser || this.isPrjManager)) {
        item.btnEdit = true;
        item.btnDelete = false;
      } else if (
        item.taskStatus !== 'C' &&
        (this.isPrjUser || this.isPrjManager)
      ) {
        item.btnEdit = true;
        item.btnDelete = true;
      } else {
        item.btnEdit = false;
        item.btnDelete = false;
      }
      if ('children' in item) item['children'].forEach(i => this.setTaskBtn(i));
    },
    //* task 정보 SHOW/HIDE
    changeDtClass() {
      if (this.dtClassNm === 'current') {
        this.dtClassNm = '';
        this.dtContent = false;
      } else {
        this.dtClassNm = 'current';
        this.dtContent = true;
      }
    },
    //* 과제도움말 팝업
    openHelpPop(prjStepNm, helpMsg) {
      this[commonTypes.actions.INIT_PROJECT_HELP_INFO]({
        prjStepNm: prjStepNm,
        helpMsg: helpMsg,
      });
      this[commonTypes.actions.INIT_VIEWS_PRJ_HELP_POP](true);
    },
  },
};
</script>
