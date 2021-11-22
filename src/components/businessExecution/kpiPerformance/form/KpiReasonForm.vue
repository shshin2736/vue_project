<template>
  <div>
    <div class="tab-sub-box" v-if="showList">
      <div class="page__btn-tbox">
        <div class="page__selects">
          <com-dropdowns
            :data="getYearList"
            rules="required"
            textfield="text"
            valuefield="value"
            class="hms-dropdown type1"
            v-model="baseYear"
            @change="changeYear"
          ></com-dropdowns>
          <com-dropdowns
            :data="baseMonthOptions"
            rules="required"
            textfield="text"
            valuefield="value"
            class="hms-dropdown type1"
            v-model="baseMonth"
            @change="changeMonth"
          ></com-dropdowns>
        </div>
        <div class="page__btn-tbox">
          <com-button
            type="button"
            class="white-btn perm_read"
            :auth="$route.params.auth"
            @click="showKpiContentFunc"
          >
            <span>{{ $t('NLS0001470') }}</span></com-button
          ><!--조회 화면-->
          <com-button
            type="button"
            class="blue-btn perm_read"
            :auth="$route.params.auth"
            @click="openReasonTab"
          >
            <span>{{ $t('NLS0001313') }}</span> </com-button
          ><!--활동 및 계획 등록-->
        </div>
      </div>
      <div
        class="hms-grid hms-grid--header-bf border-bottom row-bottom imgw-100 reason"
      >
        <reason-grid
          class="fixpx"
          :columns="columns"
          :data="reasonMeasureList"
          @btnclick="clickReasonCell"
        ></reason-grid>
      </div>
    </div>
    <div class="tab-sub-box  tab-accordion" v-if="showReason">
      <div class="res-table">
        <div class="res-table__body">
          <div class="res-table__row">
            <!-- <div class="res-table__col res-table__col--head">
              
              {{ $t('NLS0000160') }}
            </div>
            <div class="res-table__col">
              {{ selectedKpiNm }}
            </div> -->
            <div class="res-table__col res-table__col--head">
              <!--날짜-->
              {{ $t('NLS0000852') }}
            </div>
            <div class="res-table__col">
              <div class="hms-datepicker">
                <com-date-picker
                  name="reasonDate"
                  :min="minDate"
                  :max="maxDate"
                  :current="reasonDate"
                  :format="'yyyy-MM-dd'"
                  @onChange="onChange"
                ></com-date-picker>
              </div>
            </div>
          </div>
          <div class="res-table__row">
            <div class="res-table__col res-table__col--head">
              <!--내용->성공/부진사유-->
              {{ $t('NLS0000456') }}
            </div>
            <div class="res-table__col">
              <com-ck-editor
                v-model="reasonEditor"
                ref="editor1"
              ></com-ck-editor>
              <!--파일첨부-->
              <template v-if="showFile || showBtn">
                <com-upload-file
                  :multiple="true"
                  downloadType="bssCause"
                  :fileList="reasonFileList"
                  :read="!showBtn"
                  @files="getReasonFiles"
                ></com-upload-file>
              </template>
            </div>
          </div>
          <div
            class="res-table__row"
            v-if="
              mesureDetailList.length === 1 || mesureDetailList.length === 0
            "
          >
            <div class="res-table__col res-table__col--head">
              <!--대책(전략) 구상->대책 -->
              {{ $t('NLS0000457') }}
            </div>
            <div class="res-table__col">
              <com-ck-editor
                class="measureResult0"
                v-model="measureEditor"
                ref="editor2"
              ></com-ck-editor>
              <template v-if="showFile || showBtn">
                <com-upload-file
                  :multiple="true"
                  downloadType="bssAction"
                  :fileList="measureFileListArr[0]"
                  :read="!showBtn"
                  @files="files => getMeasureListFiles(files, 0)"
                ></com-upload-file>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="res-table" v-if="mesureDetailList.length > 1">
        <div
          class="res-table__body"
          v-for="(item, i) in mesureDetailList"
          :key="i"
        >
          <div class="res-table__row">
            <div class="res-table__col res-table__col--head">
              {{ $t('NLS0000457') }}
            </div>
            <div class="res-table__col">
              <com-ck-editor
                :class="`measureResult${i}`"
                v-model="item.contents"
              ></com-ck-editor>
            </div>
          </div>
          <div class="res-table__row">
            <div class="res-table__col res-table__col--head">
              {{ $t('NLS0000249') }}
            </div>
            <div class="res-table__col">
              <template v-if="showFile || showBtn">
                <com-upload-file
                  :multiple="true"
                  downloadType="bssAction"
                  :fileList="measureFileListArr[i]"
                  :read="!showBtn"
                  @files="files => getMeasureListFiles(files, i)"
                ></com-upload-file>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="page__btn-bbox">
        <template v-if="showBtn">
          <com-button
            type="button"
            v-if="selectedUpdateResonId.length > 0"
            class="darkgray-btn perm_delete"
            :auth="$route.params.auth"
            @click="deleteReasonBtn"
          >
            <span>{{ $t('NLS0000075') }}</span
            ><!--삭제-->
          </com-button>
          <!-- <button type="button" class="gray-btn" @click="showPrevPopup">
            <span>{{ $t('NLS0000460') }}</span
            >미리 보기 -->
          <!-- </button> -->
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="saveReasonBtn"
          >
            <span>{{ $t('NLS0000074') }}</span
            ><!--저장-->
          </com-button>
        </template>
        <com-button
          type="button"
          class="deepdarkgray-btn perm_read"
          :auth="$route.params.auth"
          @click="goToListPage"
        >
          <span>{{ $t('NLS0000372') }}</span
          ><!--목록-->
        </com-button>
      </div>
    </div>

    <div class="tab-sub-box"></div>
    <com-overlay v-model="showPopup" :draggable="true">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000461') }}</p>
              <!--성공/부진사유 분석 및 대책(전략) 구상-->
              <button
                type="button"
                class="layer-close"
                @click="showPopup = false"
              >
                close
              </button>
            </div>
            <div class="hms-grid check-table">
              <table>
                <colgroup>
                  <col style="width:50%" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">{{ $t('NLS0000456') }}</th>
                    <!--성공/부진사유 분석->성공/부진사유 -->
                    <th scope="col">{{ $t('NLS0000457') }}</th>
                    <!--대책(전략) 구상->대책-->
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <com-ck-editor
                        v-model="preReasonEditor"
                        :disable="true"
                      ></com-ck-editor>
                    </td>
                    <td>
                      <com-ck-editor
                        v-model="preMeasureEditor"
                        :disable="true"
                      ></com-ck-editor>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </com-overlay>
  </div>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ReasonField from '@/components/businessExecution/kpiPerformance/business/ReasonField';
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import ComButton from '@/components/common/global/ComButton';
import ReasonGrid from '@/components/businessExecution/kpiPerformance/business/ReasonGrid';
import { timezone, common } from '@/utils';
import {
  kpiPerformanceStore,
  commonStore,
  kpiTargetEstablishmentStore,
  userManagementStore,
} from '@/mixins';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';

export default {
  name: 'KpiReasonForm',
  mixins: [
    kpiPerformanceStore,
    commonStore,
    kpiTargetEstablishmentStore,
    userManagementStore,
  ],
  components: {
    ComCkEditor,
    ComButton,
    ComDropdowns,
    ComDatePicker,
    ComUploadFile,
    ComOverlay,
    ReasonGrid,
  },
  props: {
    data: {
      type: Object,
      required: false,
    },
    selectedYear: {
      type: String,
      required: false,
    },
    selectedMonth: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      columns: [],
      reviewColumns: [],
      baseMonthOptions: [
        { text: '01', value: '01' },
        { text: '02', value: '02' },
        { text: '03', value: '03' },
        { text: '04', value: '04' },
        { text: '05', value: '05' },
        { text: '06', value: '06' },
        { text: '07', value: '07' },
        { text: '08', value: '08' },
        { text: '09', value: '09' },
        { text: '10', value: '10' },
        { text: '11', value: '11' },
        { text: '12', value: '12' },
      ],
      baseYear: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      baseMonth: {
        text: timezone.getClientDate('MM'),
        value: timezone.getClientDate('MM'),
      },
      sort: [{ field: 'reasonDate', dir: 'asc' }],
      showList: true,
      showReason: false,
      showPopup: false,
      currentVal: false,
      minDate: new Date(2010, 1, 1),
      maxDate: new Date(2040, 12, 31),
      reasonDate: new Date(),
      reasonFileList: [],
      reasonFileListParam: [],
      paramMeasureFileList: [],
      reasonMeasureList: [], //*성공부진사유리스트
      reasonEditor: '',
      measureEditor: '',
      selectedKpiUserId: '', //*선택한 KPI USER ID
      selectedKpiId: '', //*선택한 KPI ID
      selectedKpiNm: '', //*선택한 KPI NAME
      selectedKpiDeptId: '', //*선택한 KPI부서
      selectedUpdateResonId: '', //*선택한 성공부진 ID
      selectedUpdateMeasureIdList: [], //*선택한 대책 ID LIST
      preReasonEditor: '', //*미리보기내용
      showBtn: false, //*버튼권한(r,w)
      kpiAddUser: [],
      showFile: true, //*파일권한
      readWriteFile: false,
      highLevelUserList: [], //*kpi담당자의 상위유저
      mesureDetailList: [], //*대책리스트
      measureFileListArr: [],
      measureFileListArrParam: [],
      preMeasureEditor: '',
      kpiUseYn: 'Y',
    };
  },
  computed: {
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getKpiAddUser(state) {
      //*KPI공동사용자
      state.setKpiAddUser(state.data.kpiAddUserList);
      return state.kpiAddUser;
    },
    getSelKpiData() {
      //*선택한 KPI정보
      return this[kpiPerformanceTypes.getters.GET_SELECTED_KPI_DATA];
    },
    getSavedReasonMeasureId() {
      return this[kpiPerformanceTypes.getters.GET_SAVED_REASON_ID];
    },
    getRowDeptInfoList() {
      return this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
    },
    getHighLevelUserList() {
      return this[commonTypes.getters.GET_COM_HIGH_LEV_USER_LIST];
    },
  },
  watch: {
    getSelKpiData: function(data) {
      //*kpi정보세팅
      this.selectedKpiId = data.kpiId;
      this.selectedKpiNm = data.kpiNm;
      this.selectedKpiDeptId = data.kpiDeptId;
      this.selectedKpiUserId = data.kpiUserId;
      this.highLevelUserList = [];
      // this[commonTypes.actions.FETCH_COM_HIGH_LEV_USER_LIST]({
      //   userId: this.selectedKpiUserId,
      // });
    },
    getSavedReasonMeasureId(data) {
      if (!common.isEmpty(data)) {
        this.selectedUpdateResonId = data.reasonId;
        this.selectedUpdateMeasureIdList = data.measureIdList;
      }
    },
    getHighLevelUserList: function(data) {
      //*팀장리스트
      this.highLevelUserList = [];
      if (common.isEmpty(data)) return;
      this.highLevelUserList = [...data];
    },
    selectedYear: function(value) {
      this.baseYear = {
        text: value,
        value: value,
      };
      //*해당월변경
      const param = {
        baseYyyymm: value + this.selectedMonth,
        kpiId: this.selectedKpiId,
      };
      this.getKpiReasonMeasure(param);
    },
    selectedMonth: function(value) {
      this.baseMonth = {
        text: value,
        value: value,
      };
      //*해당월변경
      const param = {
        baseYyyymm: this.selectedYear + value,
        kpiId: this.selectedKpiId,
      };
      this.getKpiReasonMeasure(param);
    },
    reasonMeasureList() {
      setTimeout(() => {
        this.initClickImg();
      }, 200);
    },
  },
  created() {
    this.initColumns();
    this.setReasonMeasureList(this.data.reasonMeasureList);
  },
  mounted() {
    // window.addEventListener('resize', this.onResize);
    // this.onResize();
    this[commonTypes.actions.FETCH_YEAR_LIST]({});
    this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
    if (this.$route.params.kpiId) {
      let baseYyyy = this.$route.params.baseYyyyMm.substr(0, 4);
      let baseMm = this.$route.params.baseYyyyMm.substr(4, 2);
      this.baseYear = {
        text: baseYyyy,
        value: baseYyyy,
      };
      this.baseMonth = {
        text: baseMm,
        value: baseMm,
      };
    }
    this.$nextTick(function() {
      //Code that will run only after the
      //entire view has been rendered
      this.initClickImg();
    });
  },
  // updated() {
  //   this.$refs.editor1 && this.$refs.editor2
  //     ? window.addEventListener('resize', this.onResize)
  //     : window.removeEventListener('resize', this.onResize);
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.onResize);
  // },
  methods: {
    onResize() {
      const editor1 = this.$refs?.editor1?.$el;
      const editor2 = this.$refs?.editor2?.$el;
      if (!editor1.style) return;
      editor1.style.maxHeight = `${editor1.clientWidth * 1.618}px`;
      editor2.style.maxHeight = `${editor2.clientWidth * 1.618}px`;
    },
    setSelKpiData(data) {
      //*kpi정보세팅
      this.selectedKpiId = data.kpiId;
      this.selectedKpiNm = data.kpiNm;
      this.selectedKpiDeptId = data.kpiDeptId;
      this.selectedKpiUserId = data.kpiUserId;
      let year = data.selectedYyyy;
      let month = data.selectedMm;
      this.baseYear = { text: year, value: year };
      this.baseMonth = { text: month, value: month };
      //*초기화
      // this.resetReasonData();
      // this.resetMeasureData();
      // this.highLevelUserList = [];
      // this[commonTypes.actions.FETCH_COM_HIGH_LEV_USER_LIST]({
      //   userId: this.selectedKpiUserId,
      // });
      this.showListView();
    },
    setKpiAddUser(data) {
      this.kpiAddUser = [];
      if (!common.isEmpty(data)) {
        this.kpiAddUser = [...data];
      }
    },
    setReasonMeasureList(list) {
      this.reasonMeasureList = [];
      //*권한체크
      this.getCheckUser();
      //*파일권한체크
      this.getCheckFileAcc();
      let resultList = [];
      if (!common.isEmpty(list)) {
        resultList = list.map(item => {
          const obj = { ...item };
          obj.userList = [];
          obj.measureContents = [];
          //*담당자데이터세팅
          obj.measurelist.map(el => {
            obj.userList.push(el.createUserNm);
            //obj.measureContents.push(el.contents)
            obj.measureContents.push({
              contents: el.contents,
              fileList: el.measurefilelist,
            });
          });
          obj.contents = {
            contents: obj.contents,
            fileList: obj.reasonfilelist,
          };
          obj.reasonDateUserForm =
            obj.reasonDateForm + '</br>' + obj.createUserNm;

          return obj;
        });
        this.reasonMeasureList = [...resultList];
        //*리스트값 호출할때 대책리스트보여주기
        this.showListView();
      }
    },
    initColumns() {
      this.columns = [
        // { field: 'reasonId', title: '', width: '0px' },
        {
          field: 'reasonDateUserForm',
          title: this.$t('NLS0000852'), //*날짜+담당자
          width: '60px',
          format: 'button',
          className: 'center under-line-btn cursor-pointer htmlForm',
          cell: FunctionCell,
        },
        {
          field: 'contents',
          title: this.$t('NLS0000456'), //*성공/부진사유 분석->성공/부진사유
          format: 'reason',
          className: 'left cell-top',
          valign: 'flex-start',
          cell: ReasonField,
        },
        {
          field: 'measureContents',
          title: this.$t('NLS0000457'), //*대책(전략) 구상->대책
          format: 'columns',
          valign: 'flex-start',
          className: 'left cell-top',
          cell: ReasonField,
        },
        // {
        //   field: 'userList',
        //   title: this.$t('NLS0000065'), //*담당자
        //   width: '100px',
        //   format: 'columns',
        //   className: 'center',
        //   cell: FunctionCell,
        // },
      ];
      this.reviewColumns = [
        {
          field: 'review_reason',
          title: this.$t('NLS0000456'), //*성공/부진사유 분석->성공/부진사유
          format: 'ckeditor',
          className: 'left',
          cell: FunctionCell,
        },
        {
          field: 'review_measure',
          title: this.$t('NLS0000457'), //*대책(전략) 구상->대책
          //format: 'encode',
          //className: 'left',
          format: 'columns',
          editor: 'btn',
          cell: FunctionCell,
        },
      ];
    },
    showPrevPopup() {
      //*대책입력 미리보기
      this.showPopup = true;
      this.preReasonEditor = this.reasonEditor;
      this.preMeasureEditor = '';
    },
    getReasonFiles(files) {
      //*파일업로드시 호출
      this.reasonFileListParam = [...files];
    },
    getMeasureListFiles(files, i) {
      //*파일업로드시 호출
      this.measureFileListArrParam[i] = [...files];
    },
    changeYear(e) {
      //*해당년도변경
      const param = {
        baseYyyymm: e.target.value.value + this.baseMonth.value,
        kpiId: this.selectedKpiId,
      };
      this.baseYear = {
        text: e.target.value.value,
        value: e.target.value.value,
      };
      this.getKpiReasonMeasure(param);
    },
    changeMonth(e) {
      //*해당월변경
      const param = {
        baseYyyymm: this.baseYear.value + e.target.value.value,
        kpiId: this.selectedKpiId,
      };
      this.baseMonth = {
        text: e.target.value.value,
        value: e.target.value.value,
      };
      this.getKpiReasonMeasure(param);
    },
    async useKpiCheck() {
      this.setSelKpiData(this.getSelKpiData);
      this.kpiUseYn = 'Y';
      //*KPI 사용여부체크
      await this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
        kpiId: this.selectedKpiId,
      });
      let data = this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA]
        .kpiDefData;
      this.kpiUseYn = data.useYn;
    },
    async getCheckUser() {
      //*kpi사용유무체크
      await this.useKpiCheck();
      //*해당kpi 성공부진사유 수정가능한 user인지

      this.showBtn = false;
      //*KPI 담당자의 사용자 정보 조회
      await this[userManagementTypes.actions.FETCH_USER_INFO]({
        userId: this.selectedKpiUserId,
      });
      const { app1UserId } = this[userManagementTypes.getters.GET_USER_INFO];
      const { userType, userId } = this[commonTypes.getters.GET_COM_USER_INFO];
      const addUser = this.getKpiAddUser.filter(i => i.kpiAddUserId === userId);
      // const highUser = this.highLevelUserList.filter(i => i.userId === userId);
      //*ADMIN, 당담자, 공동사용자, 팀장 일때 데이터 수정삭제가능
      if (
        (userId === this.selectedKpiUserId ||
          (userId === app1UserId && !common.isEmpty(app1UserId)) ||
          userType === 'ADMIN' ||
          userType === 'SUPER' ||
          addUser.length > 0) &&
        this.kpiUseYn === 'Y'
      ) {
        this.showBtn = true;
      }
    },
    getCheckFileAcc() {
      //*파일권한처리
      this.showFile = false;
      let rowDeptList = -1;
      if (!common.isEmpty(this.getRowDeptInfoList)) {
        rowDeptList = this.getRowDeptInfoList.findIndex(
          x => x.deptId === this.selectedKpiDeptId,
        );
      }
      if (rowDeptList > -1) {
        this.showFile = true;
      }
    },
    async getKpiReasonMeasure(param) {
      //*성공부진사유/대책 리스트 가져오기
      await this[kpiPerformanceTypes.actions.INIT_KPI_REASON_MEASURE_LIST]({});
      if (common.isEmpty(param)) {
        param = {
          kpiId: this.selectedKpiId,
          baseYyyymm: this.baseYear.value + this.baseMonth.value,
        };
      }
      this[kpiPerformanceTypes.actions.INIT_SELECTED_KPI_DATA]({
        kpiId: this.selectedKpiId,
        kpiNm: this.selectedKpiNm,
        kpiDeptId: this.selectedKpiDeptId || '',
        kpiUserId: this.selectedKpiUserId || '',
        selectedYyyy: this.baseYear.value,
        selectedMm: this.baseMonth.value,
      });
      await this[kpiPerformanceTypes.actions.FETCH_KPI_REASON_MEASURE_LIST](
        param,
      );
      this.setReasonMeasureList(
        this[kpiPerformanceTypes.getters.GET_KPI_REASON_MEASURE_LIST]
          .reasonMeasureList,
      );
      //*리스트화면보여주기
      // this.showListView();
    },
    resetReasonData() {
      //*성공부진사유분석 입력값초기화
      this.selectedUpdateResonId = '';
      this.reasonEditor = '';
      this.reasonDate = new Date();
      this.reasonFileList = [];
      this.reasonFileListParam = [];
      this.selectedUpdateMeasureIdList = [];
    },
    resetMeasureData() {
      //*성공부진사유 대책 입력값초기화
      this.measureEditor = '';
      this.mesureDetailList = []; //*대책리스트
      this.measureFileListArr = []; //*대책파일리스트
      this.measureFileListArrParam = []; //*대책파일리스트파람
    },
    openReasonTab() {
      //*성공부진사유/대책 신규등록화면
      //route.setNoPush(true);
      this.showList = false;
      this.showReason = true;
      this.resetReasonData();
      this.resetMeasureData();
    },
    clickReasonCell(item, value, field) {
      //*성공부진사유 분석 수정화면
      //* 초기화
      //route.setNoPush(true);
      // this.resetReasonData();
      // this.resetMeasureData();
      this.showReasonMeasure();
      this[commonTypes.actions.INIT_FILE_INFO_LIST]([]);
      if (field === 'reasonDateUserForm') {
        //*성공부진사유 내용
        this.setReasonData(item);
        //*대책 내용
        this.setMeasureData(item);
      }
    },
    setReasonData(item) {
      //*성공부진파일리스트파라미터 초기화
      this.reasonFileListParam = [];
      //*성공부진사유 데이터세팅
      this.selectedUpdateResonId = item.reasonId;
      this.reasonEditor = item.contents['contents'] || '';
      this.reasonDate = new Date(
        timezone.convertToClientTimeZone(item.reasonDate),
      );
      //*첨부파일가져오기
      this.getFileList('bssCause', this.selectedUpdateResonId);
    },
    async setMeasureData(item) {
      //*대책파일리스트파라미터 초기화
      this.measureFileListArrParam = [];
      //*대책 데이터세팅
      let result = this.reasonMeasureList.filter(
        el => el.reasonId === item.reasonId,
      );
      this.selectedUpdateMeasureIdList = result[0].measurelist;
      //*첨부파일가져오기
      for (let i = 0; i < this.selectedUpdateMeasureIdList.length; i++) {
        await this.getFileList(
          'bssAction',
          this.selectedUpdateMeasureIdList[i].measureId,
          i,
        );
      }
      //*에디터
      this.measureEditor = result[0].measurelist[0].contents || '';
      this.mesureDetailList = result[0].measurelist;
    },
    async getFileList(downloadType, ownerObjectId, i) {
      //*첨부파일리스트가져오기
      await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        downloadType: downloadType,
        ownerObjectId: ownerObjectId || '-1',
      });
      let list = this[commonTypes.getters.GET_FILE_INFO_LIST];
      list = common.isEmpty(list) ? [] : list;
      if (downloadType === 'bssCause') {
        this.reasonFileList = list;
      } else if (downloadType === 'bssAction') {
        this.measureFileListArr[i] = list;
      }
    },
    saveReasonBtn() {
      common.confirm('NLS0000005', this.saveReasonData);
    },
    async saveReasonData() {
      //*성공부진사유대책 저장
      //*성공부진 param
      let paramReason = {
        kpiId: this.selectedKpiId,
        contents: this.reasonEditor,
        downloadType: 'bssCause',
        baseYyyymm: this.baseYear.value + this.baseMonth.value,
        reasonDate: timezone.convertToDateFormat(this.reasonDate, 'YYYYMMDD'),
        fileList: this.reasonFileListParam,
      };
      if (this.selectedUpdateResonId !== '') {
        paramReason.reasonId = this.selectedUpdateResonId;
      }
      //*대책 param
      let paramMeasuereList = [];
      let measureList = [...this.selectedUpdateMeasureIdList];
      let mesureLeng = measureList.length === 0 ? 1 : measureList.length;
      for (let i = 0; i < mesureLeng; i++) {
        // let contents = document.querySelector(
        //   `.measureResult${i} .ck-editor__editable`,
        // ).innerHTML;
        const contents = this.measureEditor;
        let paramMeasure = {
          kpiId: this.selectedKpiId,
          contents: contents || '',
          downloadType: 'bssAction',
          reasonId: this.selectedUpdateResonId,
          measureId: measureList.length === 0 ? '' : measureList[i].measureId,
          baseYyyymm: this.baseYear.value + this.baseMonth.value,
          measureDate: timezone.convertToDateFormat(
            this.reasonDate,
            'YYYYMMDD',
          ),
          fileList: this.measureFileListArrParam[i] || [],
        };
        paramMeasuereList.push(paramMeasure);
      }
      let param = {
        reasonData: paramReason,
        measureData: paramMeasuereList,
      };
      await this[kpiPerformanceTypes.actions.UPDATAE_KPI_REASON_DATA](param);
      this.getKpiReasonMeasure();
      this.showListView();
      // this.resetReasonData(); 2020.10.06
      // this.resetMeasureData(); 2020.10.06
    },
    deleteReasonBtn() {
      common.confirm('NLS0000004', this.deleteReasonData);
    },
    async deleteReasonData() {
      //*성공부진사유 삭제
      const param = {
        reasonId: this.selectedUpdateResonId,
        kpiId: this.selectedKpiId,
        baseYyyymm: this.baseYear.value + this.baseMonth.value,
      };
      await this[kpiPerformanceTypes.actions.DELETE_KPI_REASON_DATA](param);
      this.getKpiReasonMeasure();
      this.showListView();
      // this.resetReasonData(); 2020.10.06
      // this.resetMeasureData(); 2020.10.06
      //route.setNoPush(false);
    },
    deleteMeasureBtn() {
      common.confirm('NLS0000004', this.deleteMeasureData);
    },
    showListView() {
      //*성공부진사유 리스트보여주기
      this.showList = true;
      this.showReason = false;
    },
    showReasonMeasure() {
      //*성공부진사유 입력화면보여주기
      this.showList = false;
      this.showReason = true;
      this[kpiPerformanceTypes.actions.INIT_VIEWS_KPI_REASON_LIST](true);
    },
    onChange(date, name) {
      //*날짜변경시
      if (name === 'reasonDate') this.reasonDate = date;
    },
    goToListPage() {
      this.showFile = false;
      this.readWriteFile = false;
      // this.getKpiReasonMeasure();
      this.showListView();
      // this.resetReasonData(); 2020.10.06
      // this.resetMeasureData(); 2020.10.06
    },
    showKpiContentFunc() {
      this.$emit('list');
    },
    initClickImg() {
      let imgList = document.querySelectorAll('.reason img');

      for (let i = 0; i < imgList.length; i++) {
        let img = imgList[i];
        img.onload = function() // 이미지 로딩 완료 시 실행되는 함수
        {
          //var width = myImg.width; // 정확한 이미지 폭 알 수 있음.
          //img.addEventListener('click', this.image_popup(img.src));
          img.addEventListener('click', function() {
            var imgObj = new Image();
            imgObj.src = img.src;
            // let imageWin = window.open(
            //   '',
            //   'profile_popup',
            //   'width=' +
            //     img.naturalWidth +
            //     'px, height=' +
            //     img.naturalHeight +
            //     'px',
            // );
            let imageWin = window.open(
              '',
              'profile_popup',
              'width=' +
                window.innerWidth +
                'px, height=' +
                window.outerHeight +
                'px',
            );
            imageWin.document.write("<html><body style='margin:0'>");
            imageWin.document.write(
              "<a href=javascript:window.close()><img src='" +
                imgObj.src +
                "' border=0 style='width: 100%;'></a>",
            );
            imageWin.document.write('</body><html>');
            imageWin.document.title = imgObj.src;
          });
        };
      }
    },
    image_popup(url) {
      var imgObj = new Image();
      imgObj.src = url;
      let imageWin = window.open(
        '',
        'profile_popup',
        'width=' + imgObj.width + 'px, height=' + imgObj.height + 'px',
      );
      imageWin.document.write("<html><body style='margin:0'>");
      imageWin.document.write(
        "<a href=javascript:window.close()><img src='" +
          imgObj.src +
          "' border=0></a>",
      );
      imageWin.document.write('</body><html>');
      imageWin.document.title = imgObj.src;
    },
  },
};
</script>

<style scoped lang="scss">
.page__btn-tbox {
  display: flex;
  justify-content: space-between;
  @include breakpoint(desktop-s) {
    flex-wrap: wrap;
  }
}
.page__selects {
  //width: 100%;
  text-align: left;

  .hms-dropdown.type1 {
    @include breakpoint(desktop-s) {
      width: calc(50% - 5px);
    }
  }

  & + .blue-btn {
    flex: none;
    margin-left: auto;
    @include breakpoint(desktop-s) {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
