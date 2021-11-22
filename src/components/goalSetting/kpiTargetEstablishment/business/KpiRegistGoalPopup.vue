<template>
  <!-- KPI 목표 등록 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal">
            <div class="layer-pop__title">
              <p>{{ baseYear.value }}.{{ baseMonth.value }} {{ kpiTitle }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer_scroll">
              <div class="search-box">
                <div class="search__form__box__block">
                  <template v-if="picked === 'weekGoal'">
                    <div class="search__form__box type-table line2">
                      <p class="search__form__title">
                        {{ $t('NLS0000212') }}
                      </p>
                      <!--조회기간-->
                      <com-dropdowns
                        :data="getYearList"
                        rules="required"
                        textfield="text"
                        valuefield="value"
                        class="hms-dropdown type1"
                        v-model="baseYear"
                        @change="changeKpiGoalYearData"
                      ></com-dropdowns>
                      <com-dropdowns
                        v-if="kpiCycle === TYPE_WEEK"
                        :data="baseMonthOptions"
                        rules="required"
                        textfield="text"
                        valuefield="value"
                        class="hms-dropdown type1"
                        v-model="baseMonth"
                        @change="changeKpiGoalMonthData"
                      ></com-dropdowns>
                    </div>
                  </template>
                  <div
                    class="search__form__box type-table line2"
                    v-if="!(kpiCycle === TYPE_MONTH && picked === 'weekGoal')"
                  >
                    <p
                      class="search__form__title"
                      v-if="getField === 'targetOYy'"
                    >
                      {{ $t('NLS0000327') }} <span class="required-text">*</span
                      ><!--년간목표-->
                    </p>
                    <p
                      class="search__form__title"
                      v-if="getField === 'targetMYy'"
                    >
                      {{ $t('NLS0000975') }} <span class="required-text">*</span
                      ><!--년간 수정 목표-->
                    </p>
                    <span class="input__box type-wide type-nobtn">
                      <com-input-text
                        type="text"
                        :isReadOnly="true"
                        v-model="targetOYyForm"
                        v-if="getField === 'targetOYy'"
                      />
                      <com-input-text
                        type="text"
                        :isReadOnly="true"
                        v-model="targetMYyForm"
                        v-if="getField === 'targetMYy'"
                      />
                    </span>
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title divide">
                    {{ $t('NLS0000138') }}
                  </p>
                  <!--구분-->
                  <div class="radio-box">
                    <span class="radio-form"
                      ><input
                        type="radio"
                        id="goal-opt1"
                        value="monthGoal"
                        name="testradio"
                        v-model="picked"
                        checked="checked"
                      />
                      <label for="goal-opt1">{{ $t('NLS0000403') }}</label
                      ><!--월간 목표--></span
                    >
                    <!-- v-if="kpiCycle === TYPE_WEEK" -->
                    <span class="radio-form"
                      ><input
                        type="radio"
                        id="goal-opt2"
                        name="testradio"
                        value="weekGoal"
                        v-model="picked"
                      /><label for="goal-opt2">{{ $t('NLS0000404') }}</label
                      ><!--주간 목표--></span
                    >
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000402') }} : {{ kpiAccTypeNm }}
                  </p>
                  <!--누계 계산방식-->
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000061') }} : {{ kpiAchTypeNm }}
                  </p>
                  <!--실적 달성 유형-->
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000063') }} : {{ kpiUnitNm }}
                  </p>
                  <!--단위-->
                </div>
                <div class="search__form__box type-table line3">
                  <p class="search__form__title">
                    {{ $t('NLS0000057') }} : {{ kpiCycleNm }}
                  </p>
                  <!--측정주기 -->
                </div>
              </div>
              <template v-if="picked === 'monthGoal'">
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalMonthData"
                    :columns="columns"
                    :addBtnHide="true"
                    :isCellEnterNext="true"
                    height="625px"
                    editfield="inEdit"
                    @save="saveMonthGoal"
                  ></com-native-grid>
                </div>

                <div class="layer-pop__subtitle">
                  <p>{{ $t('NLS0000333') }}</p>
                  <!--목표수립 근거-->
                </div>
                <div class="layer-pop-editor">
                  <com-ck-editor v-model="editor"></com-ck-editor>
                </div>
                <template v-if="(showFile || showBtn) && thisYearCheck">
                  <div class="layer-pop__subtitle">
                    <p>{{ $t('NLS0000249') }}</p>
                    <!--파일 첨부-->
                  </div>
                  <div class="hms-upload">
                    <com-upload-file
                      :multiple="true"
                      downloadType="inputTarget"
                      :fileList="targetFileList"
                      :read="!showBtn"
                      @files="getFiles"
                    ></com-upload-file>
                  </div>
                </template>
              </template>
              <template v-if="picked === 'weekGoal' && kpiCycle === TYPE_WEEK">
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalWeekData"
                    :columns="columns2"
                    :addBtnHide="true"
                    :isCellEnterNext="true"
                    height="220px"
                    editfield="inEdit"
                    @save="saveWeekGoal"
                  ></com-native-grid>
                </div>
              </template>
              <template v-if="picked === 'weekGoal' && kpiCycle === TYPE_MONTH">
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalMw"
                    :columns="columns3"
                    :addBtnHide="true"
                    height="400"
                    editfield="inEdit"
                    @save="saveWeekGoal"
                    :isCellEnterNext="true"
                  ></com-native-grid>
                </div>
              </template>
            </div>
            <div class="layer__btn-box">
              <template
                v-if="picked === 'monthGoal' && showMonthBtn && thisYearCheck"
              >
                <com-button
                  type="button"
                  class="blue-btn perm_save"
                  :auth="$route.params.auth"
                  @click="saveTargetMonthBtn"
                >
                  <span>{{ $t('NLS0000074') }}</span
                  ><!--저장-->
                </com-button>
              </template>
              <template
                v-if="picked === 'weekGoal' && showWeekBtn && thisYearCheck"
              >
                <com-button
                  type="button"
                  class="blue-btn perm_save"
                  :auth="$route.params.auth"
                  @click="saveTargetWeekBtn"
                >
                  <span>{{ $t('NLS0000074') }}</span
                  ><!--저장-->
                </com-button>
              </template>
              <!--저장-->
              <template
                v-if="picked === 'weekGoal' && showMwBtn && thisYearCheck"
              >
                <com-button
                  type="button"
                  class="blue-btn perm_save"
                  :auth="$route.params.auth"
                  @click="saveTargetMwBtn"
                >
                  <span>{{ $t('NLS0000074') }}</span>
                </com-button>
              </template>
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
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone, common } from '@/utils';
//import FunctionCell from '@/components/common/business/FunctionCell';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

export default {
  name: 'kpiRegistGoalPopup',
  mixins: [kpiTargetEstablishmentStore, commonStore],
  components: {
    ComNativeGrid,
    ComCkEditor,
    ComButton,
    ComDropdowns,
    ComInputText,
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
      paramTargetFileList: [],
      targetFileList: [],
      goalMonthData: [],
      goalWeekData: [],
      kpiUnitNm: '',
      kpiPerType: '',
      kpiAccTypeNm: '',
      kpiAchTypeNm: '',
      kpiAccType: '',
      kpiCycle: '',
      kpiCycleNm: '',
      kpiTitle: '',
      baseYear: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      baseMonth: {
        text: timezone.getClientDate('MM'),
        value: timezone.getClientDate('MM'),
      },
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
      editor: '',
      initialFiles: [],
      deleteFiles: [],
      reorderFiles: [],
      picked: 'monthGoal',
      columns: [],
      columns2: [],
      targetOYyForm: '',
      targetMYyForm: '',
      pointCnt: 0,
      TYPE_SUM: '31', //*합계 (공통코드)
      TYPE_AVG: '32', //*단순평균
      TYPE_LQ: '117', //*기말
      TYPE_TAVG: '33', //*총평균
      TYPE_MONTH: '34', //*월별
      TYPE_WEEK: '118', //*주별
      TYPE_AUTO_SUM: '91', //*자동합산
      showBtn: false, //*버튼권한(r,w)
      showFile: true, //*파일권한
      kpiUserId: '',
      kpiDeptId: '',
      showMonthBtn: false,
      showWeekBtn: false,
      thisYearCheck: true,
      yearData: timezone.getClientDate('YYYY'),
      kpiUseYn: 'Y',
      showMwBtn: false,
      goalMw: [],
    };
  },
  computed: {
    coUserList() {
      return this[kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA]
        .coUserList;
    },
    getMboAppYn() {
      let list = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return list.mboAppYn;
    },
    getField() {
      //* 목표(targetOYy)/수정목표(targetMYy) 판단하기위한 값
      let list = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return list.field;
    },
    getKpiAddUserList() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.kpiAddUser;
    },
    getKpiGoalYearData() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetYearData;
    },
    getGoalMonthData() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetMonthData;
    },
    getGoalWeekData() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetWeekData;
    },
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getSelectedYear() {
      return this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_YEAR_DATA
      ];
    },
    getSelectedMonth() {
      return this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_MONTH_DATA
      ];
    },
    getRowDeptInfoList() {
      return this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
    },
    getGoalMw() {
      let data = this[
        kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_KPI_DATA
      ];
      return data.targetMwData;
    },
  },
  watch: {
    getSelectedYear: function(data) {
      this.baseYear = { text: data, value: data };
      this.columns[0].title = data + this.$t('NLS0000812'); //*년
      this.checkWriteData(data);
    },
    getSelectedMonth: function(data) {
      this.baseMonth = { text: data, value: data };
    },
    //*년간목표데이터 및 KPI 관련 데이터 처리
    getKpiGoalYearData: function(data) {
      this.kpiTitle = data.kpiNm;
      this.kpiUserId = data.kpiUserId;
      this.kpiDeptId = data.kpiDeptId;
      this.kpiAccTypeNm = data.kpiAccTypeNm;
      this.kpiAchTypeNm = data.kpiAchTypeNm;
      this.kpiAccType = data.kpiAccType;
      this.kpiPerType = data.kpiPerType;
      this.kpiCycle = data.kpiCycle;
      this.kpiCycleNm = data.kpiCycleNm;
      this.kpiUnitNm = data.kpiUnitNm;
      this.pointCnt = data.pointCnt;
      this.kpiUseYn = data.useYn;
      this.editor = data.kpiTargetBase != null ? data.kpiTargetBase : '';
      //*년간목표 데이터 세팅
      this.targetOYyForm = common.getDemicalComma(
        data.targetOYy,
        this.pointCnt || 0,
      );
      this.targetMYyForm = common.getDemicalComma(
        data.targetMYy,
        this.pointCnt || 0,
      );
      //*헤더명변경 월목표/수정목표
      // this.columns[1].title =
      //   this.getField === 'targetOYy'
      //     ? this.$t('NLS0000330')
      //     : this.$t('NLS0000331'); //*월 목표/월 수정 목표
      // this.columns2[3].title =
      //   this.getField === 'targetOYy'
      //     ? this.$t('NLS0000310')
      //     : this.$t('NLS0000391'); //*목표/수정 목표

      //*첨부파일
      this.getFileList(data.kpiId + '_' + this.getSelectedYear);

      //*권한체크
      this.getCheckUser();

      //*파일권한체크
      this.getCheckFileAcc();

      //*월버튼
      this.showMonthBtnFn();

      //*주버튼
      this.showWeekBtnFn();
      this.showMwBtnFn();

      //*총평균 에디터수정가능처리
      this.getCheckTavg();
    },
    //*월간목표데이터처리
    getGoalMonthData: function(data) {
      const items = data.map(item => {
        const obj = { ...item };
        //*년월표시
        obj.sumTypeNm =
          obj.sumType === '0'
            ? timezone.convertToDateFormat(
                timezone.convertToISO8601String(obj.baseYyyymm),
                'YYYY-MM',
              )
            : this.getSumTypeNm(obj.sumType);

        //*목표등록/수정목표등록
        obj.targetMs =
          this.getField === 'targetOYy' ? obj.targetOMs : obj.targetMMs;
        obj.targetMs = common.getDemicalComma(obj.targetMs, this.pointCnt || 0);
        //*누적목표
        obj.targetTs =
          this.getField === 'targetOYy' ? obj.targetOTs : obj.targetMTs;
        obj.targetTs = common.getDemicalComma(obj.targetTs, this.pointCnt || 0);
        obj.preResultMs = common.getDemicalComma(
          obj.preResultMs,
          this.pointCnt || 0,
        );
        obj.avg3mmResult = common.getDemicalComma(
          obj.avg3mmResult,
          this.pointCnt || 0,
        );
        //* mbo승인이나거나, 주별이면서 총평균이아니거나, 총평균이아니면서 년월표시가 아니고,자동합산인 데이터들은 데이터수정불가
        obj.inCell =
          this.getMboAppYn === 'Y' ||
          (this.kpiCycle === this.TYPE_WEEK &&
            this.kpiAccType !== this.TYPE_TAVG) ||
          (this.kpiAccType !== this.TYPE_TAVG && obj.sumType !== '0') ||
          this.kpiPerType === this.TYPE_AUTO_SUM
            ? false
            : true;

        return obj;
      });
      this.goalMonthData = items;
    },
    //*주간목표데이터처리
    getGoalWeekData: function(data) {
      const items = data.map(item => {
        const obj = { ...item };
        //*주목표
        obj.targetWs =
          this.getField === 'targetOYy'
            ? common.getDemicalComma(
                common.getDemicalPoint(obj.targetOWs, this.pointCnt || 0),
              )
            : common.getDemicalComma(
                common.getDemicalPoint(obj.targetMWs, this.pointCnt || 0),
              );
        //*주누적
        obj.targetWTs =
          this.getField === 'targetOYy'
            ? common.getDemicalComma(
                common.getDemicalPoint(obj.targetOTs, this.pointCnt || 0),
              )
            : common.getDemicalComma(
                common.getDemicalPoint(obj.targetMTs, this.pointCnt || 0),
              );
        //*주별이면서 자동합산이 아닐때 목표수정가능
        obj.inCell =
          this.kpiCycle === this.TYPE_WEEK &&
          this.kpiPerType !== this.TYPE_AUTO_SUM
            ? true
            : false;
        return obj;
      });
      this.goalWeekData = items;
    },
    getGoalMw: function(data) {
      const items = data.map(item => {
        const obj = { ...item };
        //*주목표
        obj.targetWs =
          this.getField === 'targetOYy'
            ? common.getDemicalComma(
                common.getDemicalPoint(obj.targetOWs, this.pointCnt || 0),
              )
            : common.getDemicalComma(
                common.getDemicalPoint(obj.targetMWs, this.pointCnt || 0),
              );
        //*주누적
        obj.targetWTs =
          this.getField === 'targetOYy'
            ? common.getDemicalComma(
                common.getDemicalPoint(obj.targetOTs, this.pointCnt || 0),
              )
            : common.getDemicalComma(
                common.getDemicalPoint(obj.targetMTs, this.pointCnt || 0),
              );
        obj.inCell =
          this.kpiCycle === this.TYPE_MONTH &&
          this.kpiPerType !== this.TYPE_AUTO_SUM
            ? true
            : false;
        return obj;
      });
      this.goalMw = items;
    },
  },
  mounted() {
    this.initColumns();
    let year = this[
      kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_YEAR_DATA
    ];
    year = year ? year : this.baseYear.value;
    this.baseYear = { text: year, value: year };
    this.columns[0].title = year + this.$t('NLS0000812'); //*년
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'sumTypeNm',
          title: this.$t('NLS0000812'), //*년
          className: 'center',
        },
        {
          field: 'targetMs',
          title: this.$t('NLS0000330'), //*월 목표
          inCell: true,
          className: 'inCell input-cell', //inCell
          format: '{0:n}',
        },
        {
          field: 'targetTs',
          title: this.$t('NLS0000393'), //*누적 목표
          inCell: false,
          format: '{0:n}',
        },
        {
          field: 'preResultMs',
          title: this.$t('NLS0000308'), //*전년 실적
        },
        {
          field: 'avg3mmResult',
          title: this.$t('NLS0000394'), //*3개년 평균실적
        },
      ];
      this.columns2 = [
        {
          field: 'wwSeq',
          title: this.$t('NLS0000813'), //*주차
          className: 'center',
        },
        {
          field: 'startDateForm',
          title: this.$t('NLS0000158'), //*시작일
          className: 'center',
        },
        {
          field: 'endDateForm',
          title: this.$t('NLS0000159'), //*종료일
          className: 'center',
        },
        {
          field: 'targetWs',
          title: this.$t('NLS0001404'), //* 주 목표
          format: '{0:n}',
          inCell: true,
          className: 'inCell input-cell', //inCell
        },
        {
          field: 'targetWTs',
          title: this.$t('NLS0000393'), //*누적 목표
          inCell: false,
          format: '{0:n}',
        },
      ];
      this.columns3 = [
        {
          field: 'wwSeq',
          title: this.$t('NLS0000813'), //*주차
          className: 'center',
        },
        {
          field: 'weekFromDateForm',
          title: this.$t('NLS0000158'), //*시작일
          className: 'center',
        },
        {
          field: 'weekToDateForm',
          title: this.$t('NLS0000159'), //*종료일
          className: 'center',
        },
        {
          field: 'targetWs',
          title: this.$t('NLS0001404'), //* 주 목표
          inCell: true,
          format: '{0:n}',
          className: 'comma inCell input-cell',
        },
        {
          field: 'targetWTs',
          title: this.$t('NLS0000393'), //*누적 목표
          inCell: false,
          format: '{0:n}',
        },
      ];
    },
    checkWriteData(year) {
      const future = Number(this.yearData) < Number(year);
      this.thisYearCheck =
        this.yearData === year || future || year === '2020' ? true : false;
      // this.thisYearCheck = this.yearData === year ? true : false;
    },
    //* 월별, 총평균, 자동합산, 버튼권한, mbo승인
    showMonthBtnFn() {
      this.showMonthBtn = false;
      if (
        (this.kpiCycle === this.TYPE_MONTH &&
          this.kpiPerType !== this.TYPE_AUTO_SUM &&
          this.showBtn &&
          this.getMboAppYn !== 'Y') ||
        (this.kpiCycle === this.TYPE_WEEK &&
          this.kpiAccType === this.TYPE_TAVG &&
          this.kpiPerType !== this.TYPE_AUTO_SUM &&
          this.showBtn &&
          this.getMboAppYn !== 'Y')
      ) {
        this.showMonthBtn = true;
      }
    },
    showWeekBtnFn() {
      //* 월별, 자동합산, 버튼권한, mbo승인
      this.showWeekBtn = false;
      if (
        this.kpiCycle === this.TYPE_WEEK &&
        this.kpiPerType !== this.TYPE_AUTO_SUM &&
        this.showBtn &&
        this.getMboAppYn !== 'Y'
      ) {
        this.showWeekBtn = true;
      }
    },
    showMwBtnFn() {
      //* 월별, 자동합산, 버튼권한, mbo승인
      this.showMwBtn = false;
      if (
        this.kpiCycle === this.TYPE_MONTH &&
        this.kpiPerType !== this.TYPE_AUTO_SUM &&
        this.showBtn &&
        this.getMboAppYn !== 'Y'
      ) {
        this.showMwBtn = true;
      }
    },
    getFiles(files) {
      this.paramTargetFileList = files;
    },
    closePopup() {
      this.picked = 'monthGoal';
      this.goalMonthData = [];
      this.goalWeekData = [];
      this.kpiUserId = '';
      this.kpiDeptId = '';
      this.showMonthBtn = false;
      this.showWeekBtn = false;
      this.$emit('input', false);
    },
    getCheckUser() {
      //*해당kpi수정가능한 user인지
      this.showBtn = false;
      const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      const loginUserId = loginUserInfo.userId;
      const userType = loginUserInfo.userType;
      // let addUser = -1;
      // if (!common.isEmpty(this.getKpiAddUserList)) {
      //   addUser = this.getKpiAddUserList.findIndex(
      //     x => x.kpiAddUserId === loginUserId,
      //   );
      // }
      //*ADMIN, 당담자 일때 데이터 수정삭제가능
      if (
        (loginUserId === this.kpiUserId ||
          this.coUserList.some(item => item.userId === loginUserId) ||
          userType === 'ADMIN' ||
          userType === 'SUPER') &&
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
          x => x.deptId === this.kpiDeptId,
        );
      }
      //*하위 부서
      if (rowDeptList > -1) {
        this.showFile = true;
      }
    },
    getCheckTavg() {
      //*총평균체크 에디터 수정여부처리
      this.columns[2].inCell = false;
      this.columns2[4].inCell = false;
      this.columns[2].className = '';
      this.columns2[4].className = '';
      if (
        this.kpiAccType === this.TYPE_TAVG &&
        !common.isEmpty(this.columns[2]) &&
        !common.isEmpty(this.columns2[4])
      ) {
        this.columns[2].inCell = true;
        this.columns2[4].inCell = true;
        this.columns[2].className = 'inCell input-cell';
        this.columns2[4].className = 'inCell input-cell';
      }
    },
    changeKpiGoalYearData(e) {
      //* 목표등록데이터 조회
      this.baseYear = e.target.value.value;
      this.columns[0].title = this.baseYear + this.$t('NLS0000812'); //*년
      this[
        kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_YEAR_DATA
      ](this.baseYear);
      this.getRegGoalDataSet();
    },
    changeKpiGoalMonthData(e) {
      //* 목표등록데이터 조회
      this.baseMonth = e.target.value.value;
      this[
        kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_MONTH_DATA
      ](this.baseMonth);
      this.getRegGoalDataSet();
    },
    getSumTypeNm(sumType) {
      if (sumType === '1') return this.$t('NLS0000832');
      //*1분기 계
      else if (sumType === '2') return this.$t('NLS0000833');
      //*2분기 계
      else if (sumType === '3') return this.$t('NLS0000834');
      //*상반기 계
      else if (sumType === '4') return this.$t('NLS0000835');
      //*3분기 계
      else if (sumType === '5') return this.$t('NLS0000836');
      //*4분기 계
      else if (sumType === '6') return this.$t('NLS0000837');
      //*하반기 계
      else if (sumType === '7') return this.$t('NLS0000839');
      //*년간 합계
    },
    saveMonthGoal(row, items) {
      this.goalMonthData = this.getCal(items);
    },
    getCal(items) {
      //*1월-12월데이터세팅
      const yearList = items.reduce((acc, cur) => {
        const obj = Object.assign(cur, {});
        if (obj.sumType === '0') acc.push(obj['targetMs']);
        return acc;
      }, []);
      //*계산
      let list = [...items];
      let dataList = list.map(item => {
        const obj = Object.assign(item, {});
        //*년도(ex_2020.01)
        if (obj.sumType === '0') {
          let month = parseInt(common.getMonth(obj.baseYyyymm), 10);
          //*합계
          if (this.kpiAccType === this.TYPE_SUM) {
            obj.targetTs = common.isEmpty(obj.targetMs)
              ? ''
              : common.getSum(yearList.slice(0, month));
          }
          //*평균
          else if (this.kpiAccType === this.TYPE_AVG) {
            obj.targetTs = common.isEmpty(obj.targetMs)
              ? ''
              : common.getAverage(yearList.slice(0, month));
          }
          //*기말
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetTs = yearList[month - 1];
          }
        }
        //*1분기
        else if (obj.sumType === '1') {
          let yearData = yearList.slice(0, 3);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (1분기 = 1월 + 2월 + 3월)
            obj.targetMs = common.getSum(yearData);
            //*합계누계 (1분기 = 1월 + 2월 + 3월)
            obj.targetTs = common.getSum(yearData);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (1분기 = (1월 + 2월 + 3월) / 3)
            obj.targetMs = common.getAverage(yearData);
            //*단순평균누계 (1분기 = (1월 + 2월 + 3월) / 3)
            obj.targetTs = common.getAverage(yearData);
          }
          //*기말(3월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[2];
            obj.targetTs = yearList[2];
          }
        }
        //*2분기
        else if (obj.sumType === '2') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (2분기 = 4월 + 5월 + 6월)
            obj.targetMs = common.getSum(yearList.slice(3, 6));
            //*합계누계 (1분기+2분기)
            obj.targetTs = common.getSum(yearList.slice(0, 6));
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (2분기 = (4월 + 5월 + 6월) / 3)
            obj.targetMs = common.getAverage(yearList.slice(3, 6));
            //*단순평균누계 (2분기 = (1분기+2분기) / 2)
            obj.targetTs = common.getAverage(yearList.slice(0, 6));
          }
          //*기말(6월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[5];
            obj.targetTs = yearList[5];
          }
        }
        //*상반기
        else if (obj.sumType === '3') {
          let yearData = yearList.slice(0, 6);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (상반기 = 1분기 + 2분기)
            obj.targetMs = common.getSum(yearData);
            //*합계누계 (상반기 = 1분기 + 2분기)
            obj.targetTs = common.getSum(yearData);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (상반기 = (1월 + 2월 + 3월 + 4월 + 5월 + 6월) / 6)
            obj.targetMs = common.getAverage(yearData);
            //*단순평균누계 (상반기 = (1월 + 2월 + 3월 + 4월 + 5월 + 6월) / 6)
            obj.targetTs = common.getAverage(yearData);
          }
          //*기말(6월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[5];
            obj.targetTs = yearList[5];
          }
        }
        //*3분기
        else if (obj.sumType === '4') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (3분기 = 7월 + 8월 + 9월)
            obj.targetMs = common.getSum(yearList.slice(6, 9));
            //*합계누계 (3분기 = 1분기+2분기+3분기)
            obj.targetTs = common.getSum(yearList.slice(0, 9));
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (3분기 = (7월 + 8월 + 9월) / 3)
            obj.targetMs = common.getAverage(yearList.slice(6, 9));
            //*단순평균누계 (3분기 = 1분기+2분기+3분기) / 3)
            obj.targetTs = common.getAverage(yearList.slice(0, 9));
          }
          //*기말(9월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[8];
            obj.targetTs = yearList[8];
          }
        }
        //*4분기
        else if (obj.sumType === '5') {
          let yearData = yearList.slice(9, 12);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (4분기 = 10월 + 11월 + 12월)
            obj.targetMs = common.getSum(yearData);
            //*합계누계 (4분기 = 1분기+2분기+3분기+4분기)
            obj.targetTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (4분기 = (10월 + 11월 + 12월) / 3)
            obj.targetMs = common.getAverage(yearData);
            //*단순평균누계 (4분기 = (1분기+2분기+3분기+4분기) / 4)
            obj.targetTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[11];
            obj.targetTs = yearList[11];
          }
        }
        //*하반기
        else if (obj.sumType === '6') {
          let yearData = yearList.slice(6, 12);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (3분기 + 4분기)
            obj.targetMs = common.getSum(yearData);
            //*합계누계 (하반기 = 1분기+2분기+3분기+4분기)
            obj.targetTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (하반기 = (7월 + 8월 + 9월 + 10월 + 11월 + 12월) / 6)
            obj.targetMs = common.getAverage(yearData);
            //*단순평균누계 (하반기 = (1월 + ... +7월 + 8월 + 9월 + 10월 + 11월 + 12월) / 12)
            obj.targetTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[11];
            obj.targetTs = yearList[11];
          }
        }
        //*총 계
        else if (obj.sumType === '7') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (년간실적 = 상반기 + 하반기)
            obj.targetMs = common.getSum(yearList);
            //*합계누계 (년간실적 = 상반기 + 하반기)
            obj.targetTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (년간실적 = (상반기 + 하반기) / 12)
            obj.targetMs = common.getAverage(yearList);
            //*단순평균누계 (년간실적 = (상반기 + 하반기) / 12)
            obj.targetTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMs = yearList[11];
            obj.targetTs = yearList[11];
          }
          //*총계 년데이터에 표시
          if (this.getField === 'targetOYy') {
            this.targetOYyForm = common.numberWithCommas(obj.targetMs);
          } else {
            this.targetMYyForm = common.numberWithCommas(obj.targetMs);
          }
        }

        //*총평균일때 처리-->(총평균 월데이터 누적데이터로 세팅제거 20.09.09_khm)
        // if (this.kpiAccType === this.TYPE_TAVG) {
        //   obj.targetTs = obj.targetMs;
        // }

        return obj;
      });
      return dataList;
    },
    changeTargetFormat(data) {
      if (typeof data === 'string') {
        data = data.replace(/,/g, '');
      }
      return common.isEmpty(data) ? null : parseFloat(data);
    },
    saveTargetMonthBtn() {
      common.confirm('NLS0000005', this.saveTargetMonthData);
    },
    async saveTargetMonthData() {
      //*월간목표등록 - 저장
      let monthData = [...this.goalMonthData];
      let newMonthData = [];
      monthData.map(obj => {
        let newObj = {};
        if (this.getField === 'targetOYy') {
          //*월목표
          newObj.targetOMs = this.changeTargetFormat(obj.targetMs);
          newObj.targetOTs = this.changeTargetFormat(obj.targetTs);
          newObj.targetMMs = this.changeTargetFormat(obj.targetMMs);
          newObj.targetMTs = this.changeTargetFormat(obj.targetMTs);
        } else {
          //*월수정목표
          newObj.targetOMs = this.changeTargetFormat(obj.targetOMs);
          newObj.targetOTs = this.changeTargetFormat(obj.targetOTs);
          newObj.targetMMs = this.changeTargetFormat(obj.targetMs);
          newObj.targetMTs = this.changeTargetFormat(obj.targetTs);
        }
        newObj.sumType = obj.sumType;
        newObj.baseYyyymm = obj.baseYyyymm;
        newMonthData.push(newObj);
      });
      let saveParam = {
        baseYyyy: this.getSelectedYear,
        targetMonthList: newMonthData,
        downloadType: 'inputTarget',
        kpiId: this.getKpiGoalYearData.kpiId,
        kpiTargetBase: this.editor,
        kpiAccType: this.kpiAccType,
        kpiPerType: this.kpiPerType,
        targetOYy: this.changeTargetFormat(this.targetOYyForm),
        targetMYy: this.changeTargetFormat(this.targetMYyForm),
        fileList: this.paramTargetFileList,
      };
      await this[
        kpiTargetEstablishmentTypes.actions.UPDATE_KPI_TARGET_MONTH_DATA
      ](saveParam);
      this.getRegGoalDataSet();
      this.getTargetListData();
    },
    saveTargetWeekBtn() {
      common.confirm('NLS0000005', this.saveTargetWeekData);
    },
    async saveTargetWeekData() {
      //*주간목표등록 - 저장
      let weekData = [...this.goalWeekData];
      let newWeekData = [];
      weekData.map(obj => {
        let newObj = {};
        newObj.baseYyyy = this.getSelectedYear;
        newObj.baseYyyymm = obj.baseYyyymm;
        if (this.getField === 'targetOYy') {
          //*주목표
          newObj.targetOWs = this.changeTargetFormat(obj.targetWs);
          newObj.targetOTs = this.changeTargetFormat(obj.targetWTs);
          newObj.targetMWs = obj.targetMWs;
          newObj.targetMTs = obj.targetMTs;
        } else {
          //*주수정목표
          newObj.targetOWs = obj.targetOWs;
          newObj.targetOTs = obj.targetOTs;
          newObj.targetMWs = this.changeTargetFormat(obj.targetWs);
          newObj.targetMTs = this.changeTargetFormat(obj.targetWTs);
        }
        newObj.startDate = obj.startDate;
        newObj.endDate = obj.endDate;
        newObj.wwSeq = obj.wwSeq;
        newWeekData.push(newObj);
      });

      let saveParam = {
        baseYyyy: this.getSelectedYear,
        field: this.getField,
        kpiAccType: this.kpiAccType,
        kpiPerType: this.kpiPerType,
        downloadType: 'inputTarget',
        targetWeekList: newWeekData,
        kpiId: this.getKpiGoalYearData.kpiId,
        kpiTargetBase: this.editor,
        fileList: this.paramTargetFileList,
      };
      await this[
        kpiTargetEstablishmentTypes.actions.UPDATE_KPI_TARGET_WEEK_DATA
      ](saveParam);
      this.getRegGoalDataSet();
      this.getTargetListData();
    },

    saveWeekGoal(row, items) {
      this.getCalWeek(items);
    },
    saveTargetMwBtn() {
      common.confirm('NLS0000005', async () => {
        //* 월간 KPI의 주간실적 저장
        const weekData = [...this.goalMw];
        const newWeekData = weekData.map(obj => {
          obj.baseYyyy = this.getSelectedYear;
          if (this.getField === 'targetOYy') {
            obj.targetOWs = this.changeTargetFormat(obj.targetWs);
            obj.targetOTs = this.changeTargetFormat(obj.targetWTs);
          } else {
            obj.targetMWs = this.changeTargetFormat(obj.targetWs);
            obj.targetMTs = this.changeTargetFormat(obj.targetWTs);
          }
          return obj;
        });
        let param = {
          field: this.getField,
          baseYyyy: this.getSelectedYear,
          kpiAccType: this.kpiAccType,
          kpiPerType: this.kpiPerType,
          targetWeekList: newWeekData,
          kpiId: this.getKpiGoalYearData.kpiId,
        };
        await this[kpiTargetEstablishmentTypes.actions.UPDATE_KPI_TARGET_MW](
          param,
        );
        this.getRegGoalDataSet();
        this.getTargetListData();
      });
    },
    getCalWeek(items) {
      //*주데이터세팅
      //*입력한 주목표데이터
      const goalList = items.reduce((acc, cur) => {
        const obj = Object.assign(cur, {});
        acc.push(obj.targetWs);
        return acc;
      }, []);
      //*계산
      let weekDataList = items.map((item, index) => {
        const obj = Object.assign(item, {});

        if (this.kpiAccType === this.TYPE_SUM) {
          //*합계
          obj.targetWTs = common.isEmpty(obj.targetWs)
            ? ''
            : common.getSum(goalList.slice(0, index + 1));
        } else if (this.kpiAccType === this.TYPE_AVG) {
          //*단순평균
          obj.targetWTs = common.isEmpty(obj.targetWs)
            ? ''
            : common.getAverage(goalList.slice(0, index + 1));
        } else if (this.kpiAccType === this.TYPE_LQ) {
          //*기말
          // obj.targetWTs = obj.targetWs;
          obj.targetWTs = obj.targetWs ? 0 : '';
        }
        // else if (this.kpiAccType === this.TYPE_TAVG) {
        //* 총평균-->(총평균 월데이터 누적데이터로 세팅제거 20.09.09_khm)
        //   obj.targetWTs = obj.targetWs;
        // }
        return obj;
      });
      //*주간목표  데이터 세팅
      this.goalWeekData = weekDataList;
    },
    getRegGoalDataSet() {
      //*목표데이터 다시가져오기
      let param = {
        field: this.getField,
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        baseMm: this.getSelectedMonth,
        kpiId: this.getKpiGoalYearData.kpiId,
      };

      this[kpiTargetEstablishmentTypes.actions.FETCH_REG_GOAL_KPI_DATA_SET](
        param,
      );
    },
    getTargetListData() {
      //* KPI목표수립 리스트 조회
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
      };

      this[
        kpiTargetEstablishmentTypes.actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST
      ](param);
    },
    async getFileList(ownerObjectId) {
      //*첨부파일리스트가져오기
      await this[commonTypes.actions.INIT_FILE_INFO_LIST]([]);
      await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        downloadType: 'inputTarget',
        ownerObjectId: ownerObjectId || '-1',
      });
      let list = this[commonTypes.getters.GET_FILE_INFO_LIST];
      list = common.isEmpty(list) ? [] : list;
      this.targetFileList = list;
    },
  },
};
</script>
