<template>
  <com-overlay v-model="value" :draggable="false">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-checkpop type-600">
            <div class="layer-pop__title type3">
              <!-- Task 상세 -->
              <p>
                {{ $t('NLS0000828') }}
                <span class="required-text">*</span>
              </p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>
            <div class="accordion-line type-btn">
              <button
                type="button"
                class="accordion-btn save"
                @click="saveTaskDetail('save')"
              >
                <!-- 저장 -->
                <span>{{ $t('NLS0000074') }}</span>
              </button>
              <button
                type="button"
                class="accordion-btn finish"
                @click="saveTaskDetail('comp')"
              >
                <!-- 완료 -->
                <span>{{ $t('NLS0000829') }}</span>
              </button>
              <button
                type="button"
                class="accordion-btn info"
                @click="openHelpPop('Task', 'NLS0001368')"
              >
                <!-- 도움말 -->
                <span>{{ $t('NLS0000823') }}</span>
              </button>
            </div>
            <div class="accordion-line">
              <!-- Task 명	 -->
              <span class="sub-title">
                {{ $t('NLS0000201') }}
                <em class="required-text">*</em>
              </span>
              <p class="text">{{ taskNm }}</p>
            </div>
            <div class="accordion-line">
              <!-- 실행 기간 -->
              <span class="sub-title">
                {{ $t('NLS0000830') }}
                <em class="required-text">*</em>
              </span>
              <p class="text">{{ startDate }} ~ {{ endDate }}</p>
            </div>
            <div class="accordion-line">
              <!-- 담당부서 / 담당자 -->
              <span class="sub-title">
                {{ $t('NLS0000062') }}
                <em class="required-text">*</em>
              </span>
              <p class="text">{{ manager }}</p>
            </div>
            <div class="hms-editorbox">
              <com-ck-editor
                v-model="taskContent"
                :disabled="disabledYn"
              ></com-ck-editor>
              <!--rules="requiredCK-->
            </div>
            <div class="hms-upload">
              <div id="products1">
                <com-upload-file
                  :multiple="true"
                  :fileList="attachFiles"
                  :downloadType="downloadType"
                  :ownerObjectId="ownerObjectId"
                  @files="getFiles"
                ></com-upload-file>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { generalTasksStore, commonStore } from '@/mixins';
import { common, timezone } from '@/utils';
export default {
  name: 'DetailTaskPopup',
  mixins: [generalTasksStore, commonStore],
  components: {
    ComCkEditor,
    ComUploadFile,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      disabledYn: false,
      downloadType: 'actionDrsDetail',
      taskNm: '', //* task명
      taskId: '', //* task Id
      taskStatus: '', //* task 상태
      taskUserId: '', //* task 담당자 ID
      prjId: '', //* 과제 id
      startDate: '', //* 시작날짜
      endDate: '', //* 종료날짜
      manager: '', //* 담당자부서/ 담당자
      taskContent: '', //* task 내용
      attachFiles: [], //* 업로드 파일
      ownerObjectId: '',
      files: [], //* getFiles files 담기 위한 배열
    };
  },
  computed: {
    getSelectedTask() {
      return this[generalTasksType.getters.GET_SELECTED_GNL_TASK];
    },
  },
  watch: {
    getSelectedTask(value) {
      this.taskId = value.taskId;
      this.prjId = value.prjId;
      this.ownerObjectId = value.taskId;
      this.taskNm = value.taskNm;
      // this.taskStatus = value.taskStatus;
      this.taskUserId = value.taskUserId;
      this.manager = value.taskDeptNm.concat(' / ', value.taskUserNm);
      this.startDate = timezone.convertToClientTimeZone(
        value.startDate,
        'YYYY-MM-DD',
      );
      this.endDate = timezone.convertToClientTimeZone(
        value.endDate,
        'YYYY-MM-DD',
      );
      this.taskContent = value.taskContent;
      this.attachFiles = value.attachfiles;
    },
  },
  methods: {
    popupInit() {
      this.taskId = '';
      this.taskNm = '';
      this.manager = '';
      this.startDate = '';
      this.taskStatus = '';
      this.taskUserId = '';
      this.endDate = '';
      this.taskContent = '';
      this.$emit('input', false);
    },
    //* 파일 업로드 이벤트
    getFiles(files) {
      this.files = files;
      // this.attachFiles = files;
      // const uploadFile = files.filter(file => {
      //   file.ownerObjectId = this.taskId;
      //   file.downloadType = this.downloadType;
      //   return true;
      // });
      // this.attachFiles.push(...uploadFile);
    },
    //* 내용 저장
    saveTaskDetail(type) {
      // 저장하시겠습니까?
      const msg = type === 'comp' ? 'NLS0000831' : 'NLS0000005';
      common.confirm(msg, async () => {
        const param = {
          prjId: this[generalTasksType.getters.GET_GNL_PRJ_MAIN].prjId,
          prjUserId: this[generalTasksType.getters.GET_GNL_PRJ_MAIN].prjUserId,
          taskId: this.taskId,
          taskUserId: this.taskUserId,
          taskContent: this.taskContent,
          attachFiles: this.attachFiles,
          taskNm: this.taskNm,
          baseYyyy: this.$route.params.baseYyyy,
          type: type,
          compDate:
            type === 'comp'
              ? timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD')
              : null,
        };
        const retunrData = await this[
          generalTasksType.actions.UPDATE_UNIT_TASK
        ](param);
        if (retunrData.result === 'T') {
          this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN](param);
          this[generalTasksType.actions.FETCH_GNL_TASK_LIST](param);
          type === 'comp'
            ? common.alert('success', 'NLS0000838')
            : common.alert('success', 'NLS0000012');

          this.popupInit();
        }
      });
    },
    //* 완료상태로 변경
    completeTask() {
      // 해당 Task를 완료하시겠습니까?
      common.confirm(this.$t('NLS0000831'), async () => {
        const param = {
          taskId: this.taskId,
          taskStatus: 'C', //* 완료 상태
          prjId: this[generalTasksType.getters.GET_GNL_PRJ_MAIN].prjId, //*과제 ID
          prjNm: this[generalTasksType.getters.GET_GNL_PRJ_MAIN].prjNm, //* 과제명
          prjManagerId: this[generalTasksType.getters.GET_GNL_PRJ_MAIN] //* 담당부서장 ID
            .prjManagerId,
          compDate: timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD'),
        };
        const retunrData = await this[
          generalTasksType.actions.UPDATE_TASK_COMPLETE
        ](param);
        if (retunrData.result === 'T') {
          //추가중인 상태에서 완료 버튼눌렀을떄 까지 고려 해야함
          // var taskList = this[generalTasksType.getters.GET_GNL_TASK_LIST];
          //taskList = this.recursiveFindTask(taskList, param);
          // taskList.find((o, i) => {
          //   if (o.taskId === param.taskId) {
          //     taskList[i].taskStatusNm = '완료';
          //     taskList[i].taskStatus = 'C';
          //     return true; // stop searching
          //   }
          // });

          // this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
          //const copyTaskList = JSON.parse(JSON.stringify(taskList));
          //this[generalTasksType.actions.INIT_GNL_TASK_LIST](copyTaskList);
          this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN](param);
          this[generalTasksType.actions.FETCH_GNL_TASK_LIST](param);
          // 완료 상태로 변경되었습니다.
          common.alert('success', 'NLS0000838');
          this.popupInit();
        }
      });
    },
    recursiveFindTask(taskList, param) {
      //* 서버로 부터 받아온 Tree리스트 데이터를 하나씩 꺼내서 date형식 변경
      taskList.forEach(item => {
        if ('children' in item) {
          this.recursiveFindTask(item.children);
        }

        if (item.taskId === param.taskId) {
          // item.taskStatusNm = '완료';
          item.taskStatusNm = 'NLS0000829';
          item.taskStatus = 'C';
        }
      });
      return taskList;
    }, //* 과제도움말 팝업
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
