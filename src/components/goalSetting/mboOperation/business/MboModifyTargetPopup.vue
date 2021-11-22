<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide3">
            <div class="layer-pop__title">
              <p>{{ baseYear.value }}.{{ baseMonth.value }} {{ kpiTitle }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer_scroll">
              <div class="hms-grid borderno-table" style="margin-top:0px">
                <table>
                  <colgroup>
                    <col style="width:12%" />
                    <col style="width:30%" />
                    <col style="width:30%" />
                    <col style="width:30%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <!-- 년간 목표 -->
                      <th scope="col">{{ $t('NLS0000327') }}</th>
                      <th scope="col">{{ $t('NLS0001260') }}</th>
                      <th scope="col">{{ $t('NLS0001261') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!-- 수정전 -->
                      <td>{{ $t('NLS0000328') }}</td>
                      <!-- 년간목표 입력폼 -->
                      <td>
                        <span class="grid-input-form type-nobtn type1">
                          <com-input-text
                            :isReadOnly="true"
                            type="text"
                            v-model="targetOYyForm"
                          />
                        </span>
                      </td>
                      <!-- Threshold 입력폼 -->
                      <td>
                        <span class="grid-input-form type-nobtn type1">
                          <com-input-text
                            :isReadOnly="true"
                            type="text"
                            v-model="threshold"
                          />
                        </span>
                      </td>
                      <!-- Max 입력폼 -->
                      <td>
                        <span class="grid-input-form type-nobtn type1">
                          <com-input-text
                            :isReadOnly="true"
                            type="text"
                            title="Max 입력폼"
                            v-model="maximum"
                          />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <!-- 수정후 -->
                      <td>{{ $t('NLS0000329') }}</td>
                      <!--년간목표 입력폼 -->
                      <td>
                        <span class="grid-input-form type-nobtn type1">
                          <com-input-text
                            type="text"
                            v-model="targetMboYy"
                            :isReadOnly="true"
                          />
                        </span>
                      </td>
                      <!-- Threshold 입력폼 -->
                      <td>
                        <span class="grid-input-form type-nobtn type1">
                          <com-input-text
                            :isReadOnly="thresholdDisabled"
                            type="text"
                            v-model="threshold_m"
                          />
                        </span>
                      </td>
                      <!-- Max 입력폼 -->
                      <td>
                        <span class="grid-input-form type-nobtn type1">
                          <com-input-text
                            :isReadOnly="maximumDisabled"
                            type="text"
                            title="Max 입력폼"
                            v-model="maximum_m"
                          />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="search-box">
                <div class="search__form__box__block">
                  <template v-if="picked === 'weekGoal'">
                    <div class="search__form__box type-table line2">
                      <!-- 조회기간 -->
                      <p class="search__form__title">
                        {{ $t('NLS0000212') }}
                      </p>
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
                  <div class="search__form__box type-table line2">
                    <p
                      class="search__form__title"
                      v-if="getField === 'targetOYy'"
                    >
                      <!-- 년간목표 -->
                      {{ $t('NLS0000327') }}
                      <span class="required-text">*</span>
                    </p>
                    <p
                      class="search__form__title"
                      v-if="getField === 'targetMYy'"
                    >
                      <!-- 년간 MBO 수정목표 -->
                      {{ $t('NLS0001312') }}
                      <span class="required-text">*</span>
                    </p>
                    <!--년간수정목표  -->
                    <span class="input__box type-wide type-nobtn">
                      <com-input-text
                        type="text"
                        v-model="targetMboYy"
                        v-if="getField === 'targetMYy'"
                        :isReadOnly="true"
                      />
                      <!-- <input
                        type="text"
                        title="년간목표"
                        v-model="targetOYyForm"
                        v-if="getField === 'targetOYy'"
                      /> -->
                      <!-- <input
                        type="text"
                        title="년간수정목표"
                        v-model="targetMboMYyForm"
                        v-if="getField === 'targetMYy'"
                      /> -->
                      <!-- <input
                        type="text"
                        title="년간수정목표"
                        v-model="targetMYyForm"
                        v-if="getField === 'targetMYy'"
                      /> -->
                    </span>
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- 구분 -->
                  <p class="search__form__title divide">
                    {{ $t('NLS0000138') }}
                  </p>
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
                      <!-- 월간 목표 -->
                      <label for="goal-opt1">{{
                        $t('NLS0000403')
                      }}</label></span
                    >
                    <span class="radio-form" v-if="kpiCycle === TYPE_WEEK"
                      ><input
                        type="radio"
                        id="goal-opt2"
                        name="testradio"
                        value="weekGoal"
                        v-model="picked"
                      />
                      <!-- 주간 목표 -->
                      <label for="goal-opt2">{{
                        $t('NLS0000404')
                      }}</label></span
                    >
                  </div>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- 누계 계산방식 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000402') }} : {{ kpiAccTypeNm }}
                  </p>
                </div>
                <div class="search__form__box type-table line3">
                  <!-- 단위 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000063') }} : {{ kpiUnitNm }}
                  </p>
                </div>
              </div>
              <template v-if="picked === 'monthGoal'">
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalMonthData"
                    :columns="columns"
                    :addBtnHide="true"
                    :isCellEnterNext="true"
                    height="240"
                    editfield="inEdit"
                    @save="saveMonthGoal"
                  ></com-native-grid>
                </div>

                <div class="layer-pop__subtitle">
                  <!-- 목표수립 근거 -->
                  <p>{{ $t('NLS0000333') }}</p>
                </div>
                <div class="layer-pop-editor">
                  <com-ck-editor v-model="editor"></com-ck-editor>
                </div>
                <!-- <template v-if="true"> -->
                <template v-if="showFile || showBtn">
                  <div class="layer-pop__subtitle">
                    <!-- 파일첨부 -->
                    <p>{{ $t('NLS0000905') }}</p>
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
              <template v-if="picked === 'weekGoal'">
                <div class="hms-grid">
                  <com-native-grid
                    :data="goalWeekData"
                    :columns="columns2"
                    :addBtnHide="true"
                    :isCellEnterNext="true"
                    height="200"
                    editfield="inEdit"
                    @save="saveWeekGoal"
                  ></com-native-grid>
                </div>
              </template>
            </div>
            <div class="layer__btn-box">
              <template v-if="picked === 'monthGoal' && showMonthBtn">
                <button
                  type="button"
                  class="blue-btn perm_save"
                  @click="saveTargetMonthBtn"
                >
                  <!-- 저장 -->
                  <span>{{ $t('NLS0000074') }}</span>
                </button>
              </template>
              <template v-if="picked === 'weekGoal' && showWeekBtn">
                <button
                  type="button"
                  class="blue-btn perm_save"
                  @click="saveTargetWeekBtn"
                >
                  <!-- 저장 -->
                  <span>{{ $t('NLS0000074') }}</span>
                </button>
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
import ComCkEditor from '@/components/common/global/ComCKEditor';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone, common } from '@/utils';
import {
  kpiTargetEstablishmentStore,
  commonStore,
  mboOperationStore,
} from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as mboOperTypes from '@/store/modules/goalSetting/mboOperation/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'MboModifyTargetPopup',
  mixins: [kpiTargetEstablishmentStore, commonStore, mboOperationStore],
  components: {
    ComNativeGrid,
    ComCkEditor,
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
      invalidFlag: false,
      invalidMessage: '',
      //* 수정전
      threshold: '',
      maximum: '',

      //* 수정후
      threshold_m: '',
      maximum_m: '',
      thresholdDisabled: true,
      maximumDisabled: true,
      kpiId: '',
      paramTargetFileList: [],
      targetFileList: [],
      goalMonthData: [],
      goalWeekData: [],
      kpiUnitNm: '',
      kpiPerType: '',
      kpiAccTypeNm: '',
      kpiAccType: '',
      kpiCycle: '',
      kpiTitle: '',
      baseYear: { text: '2020', value: '2020' },
      baseMonth: { text: '03', value: '03' },
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
      targetMboYy: '',
      targetMboMYyForm: '',
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
    };
  },
  computed: {
    //* 선택한 KPI 정보
    getSelectedTargetMboKpi() {
      return this[mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI];
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
  },
  watch: {
    getSelectedTargetMboKpi(value) {
      if (value.threshold !== null) {
        this.threshold = String(value.threshold);
      }
      if (value.maximum !== null) {
        this.maximum = String(value.maximum);
      }

      this.threshold_m = '';
      this.maximum_m = '';

      //* 수정후 threshold와 maximum은 피평가자 본인이면서 팀장인 사람만 입력가능
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      if (
        loginUserInfo.userId == value.mboUserId &&
        (loginUserInfo.userType == 'MANAGER' ||
          loginUserInfo.userType == 'DIRECTOR')
      ) {
        this.thresholdDisabled = false;
        this.maximumDisabled = false;
      }
    },

    getSelectedYear: function(data) {
      this.baseYear = { text: data, value: data };
      this.columns[0].title = data + '년';
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
      this.kpiAccType = data.kpiAccType;
      this.kpiPerType = data.kpiPerType;
      this.kpiCycle = data.kpiCycle;
      this.kpiUnitNm = data.kpiUnitNm;
      this.pointCnt = data.pointCnt;
      this.editor = data.kpiTargetBase != null ? data.kpiTargetBase : '';
      //*년간목표 데이터 세팅
      this.targetOYyForm = common.getDemicalComma(
        data.targetMYy ? data.targetMYy : data.targetOYy,
        this.pointCnt || 0,
      );
      // this.targetMYyForm = common.getDemicalComma(
      //   data.targetMYy,
      //   this.pointCnt || 0,
      // );
      this.targetMboYy = common.getDemicalComma(
        data.targetMboYy,
        this.pointCnt || 0,
      );

      // this.targetMboMYyForm = common.getDemicalComma(
      //   data.targetMboMs,
      //   this.pointCnt || 0,
      // );

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
        // obj.targetMs =
        //   this.getField === 'targetOYy' ? obj.targetOMs : obj.targetMMs;

        //월 목표
        obj.targetOMs = common.getDemicalComma(
          obj.targetOMs,
          this.pointCnt || 0,
        );

        //* MBO 월 수정목표
        obj.targetMboMs = common.getDemicalComma(
          obj.targetMboMs,
          this.pointCnt || 0,
        );

        //* MBO 누적 수정목표
        obj.targetMboTs = common.getDemicalComma(
          obj.targetMboTs,
          this.pointCnt || 0,
        );

        //* 현재 실적
        obj.resultMs = common.getDemicalComma(obj.resultMs, this.pointCnt || 0);

        //* 전년 실적
        obj.preResultMs = common.getDemicalComma(
          obj.preResultMs,
          this.pointCnt || 0,
        );

        //* mbo승인이나거나, 주별이면서 총평균이아니거나, 총평균이아니면서 년월표시가 아니고,자동합산인 데이터들은 데이터수정불가
        obj.inCell =
          //this.getMboAppYn === 'Y' ||
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
        //*[수정하는 값이기 떄문에 0]
        //*주목표

        //* MBO 주간 목표
        obj.targetMboWs = common.getDemicalPoint(
          obj.targetMboWs,
          this.pointCnt || 0,
        );

        //* MBO 주간 누적 목표
        obj.targetMboTs = common.getDemicalPoint(
          obj.targetMboTs,
          this.pointCnt || 0,
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
  },
  mounted() {
    this.initColumns();
    let year = this[
      kpiTargetEstablishmentTypes.getters.GET_REG_GOAL_SELECTED_YEAR_DATA
    ];
    year = year ? year : this.baseYear.value;
    this.columns[0].title = year + '년';
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'sumTypeNm',
          title: this.$t('NLS0000812'), //년
          className: 'center',
          width: '112px',
        },
        {
          field: 'targetOMs',
          title: this.$t('NLS0000330'), //월 목표
          format: '{0:n}',
        },
        {
          field: 'targetMboMs',
          title: this.$t('NLS0000311'), //MBO수정 목표
          format: '{0:n}',
          inCell: true,
          className: 'inCell input-cell',
        },
        {
          field: 'targetMboTs',
          title: this.$t('NLS0001096'), //MBO누적수정 목표
          format: '{0:n}',
          inCell: false,
        },
        {
          field: 'resultMs',
          title: this.$t('NLS0000332'), //현재 실적
        },
        {
          field: 'preResultMs',
          title: this.$t('NLS0000308'), //전년 실적
        },
        //{ field: 'avg3yyResult', title: '3개년 평균실적' },
      ];
      this.columns2 = [
        {
          field: 'wwSeq',
          title: this.$t('NLS0000813'), //주차
          className: 'center',
        },
        {
          field: 'startDateForm',
          title: this.$t('NLS0000158'), //시작일
          className: 'center',
        },
        {
          field: 'endDateForm',
          title: this.$t('NLS0000159'), //종료
          className: 'center',
        },
        {
          field: 'targetMboWs',
          title: this.$t('NLS0000311'), //수정 목표
          // field: 'targetWs',
          format: '{0:n}',
          inCell: true,
          className: 'inCell input-cell',
        },
        {
          field: 'targetMboTs',
          title: this.$t('NLS0001023'), //수정 누계
          inCell: false,
          format: '{0:n}',
        },
        // { field: 'targetWTs', title: '수정 누계', format: '{0:n}' },
      ];
    },
    //* 월별, 총평균, 자동합산, 버튼권한, mbo승인
    showMonthBtnFn() {
      this.showMonthBtn = false;
      const mboInfo = this[mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI];
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      if (
        (this.kpiCycle === this.TYPE_MONTH &&
          this.kpiPerType !== this.TYPE_AUTO_SUM &&
          this.showBtn &&
          //this.getMboAppYn !== 'Y' &&
          mboInfo.mboUserId === loginUserInfo.userId) ||
        (this.kpiCycle === this.TYPE_WEEK &&
          this.kpiAccType === this.TYPE_TAVG &&
          this.kpiPerType !== this.TYPE_AUTO_SUM &&
          this.showBtn &&
          //this.getMboAppYn !== 'Y' &&
          mboInfo.mboUserId === loginUserInfo.userId)
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
        this.showBtn
        //this.getMboAppYn !== 'Y'
      ) {
        this.showWeekBtn = true;
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
      //*ADMIN, 당담자, 공동사용자 일때 데이터 수정삭제가능
      if (
        loginUserId === this.kpiUserId ||
        userType === 'ADMIN' ||
        userType === 'SUPER'
        // addUser > -1
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
      this.columns[3].inCell = false;
      this.columns2[4].inCell = false;
      this.columns[3].className = '';
      this.columns2[4].className = '';
      if (
        this.kpiAccType === this.TYPE_TAVG &&
        !common.isEmpty(this.columns[2]) &&
        !common.isEmpty(this.columns2[4])
      ) {
        this.columns[3].inCell = true;
        this.columns2[4].inCell = true;
        this.columns[3].className = 'inCell input-cell';
        this.columns2[4].className = 'inCell input-cell';
      }
    },
    changeKpiGoalYearData(e) {
      //* 목표등록데이터 조회
      this.baseYear = e.target.value.value;
      this.columns[0].title = this.baseYear + '년';
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
      //TODO: CODE TABLE 에서 가져오기
      if (sumType === '1') return '1분기 계';
      else if (sumType === '2') return '2분기 계';
      else if (sumType === '3') return '상반기 계';
      else if (sumType === '4') return '3분기 계';
      else if (sumType === '5') return '4분기 계';
      else if (sumType === '6') return '하반기 계';
      else if (sumType === '7') return '총 계';
    },
    saveMonthGoal(row, items) {
      this.goalMonthData = this.getCal(items);
    },
    getCal(items) {
      //*1월-12월데이터세팅
      const yearList = items.reduce((acc, cur) => {
        const obj = Object.assign(cur, {});
        if (obj.sumType === '0') acc.push(obj['targetMboMs']);
        return acc;
      }, []);
      //*계산
      let list = [...items];
      let dataList = list.map(item => {
        const obj = Object.assign(item, {});
        //*년도(ex_2020.01)
        if (obj.sumType === '0') {
          let month = parseInt(common.getMonth(obj.baseYyyymm), 10);
          // //*합계
          if (this.kpiAccType === this.TYPE_SUM) {
            obj.targetMboTs = common.isEmpty(obj.targetMboMs)
              ? ''
              : common.getSum(yearList.slice(0, month));
          }
          //*평균
          else if (this.kpiAccType === this.TYPE_AVG) {
            obj.targetMboTs = common.isEmpty(obj.targetMboMs)
              ? ''
              : common.getAverage(yearList.slice(0, month));
          }
          //*기말
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboTs = yearList[month - 1];
          }
        }
        //*1분기
        else if (obj.sumType === '1') {
          let yearData = yearList.slice(0, 3);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (1분기 = 1월 + 2월 + 3월)
            obj.targetMboMs = common.getSum(yearData);
            obj.targetMboTs = common.getSum(yearData);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (1분기 = (1월 + 2월 + 3월) / 3)
            obj.targetMboMs = common.getAverage(yearData);
            obj.targetMboTs = common.getAverage(yearData);
          }
          //*기말(3월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[2];
            obj.targetMboTs = yearList[2];
          }
        }
        //*2분기
        else if (obj.sumType === '2') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (2분기 = 4월 + 5월 + 6월)
            obj.targetMboMs = common.getSum(yearList.slice(3, 6));
            obj.targetMboTs = common.getSum(yearList.slice(0, 6));
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (2분기 = (4월 + 5월 + 6월) / 3)
            obj.targetMboMs = common.getAverage(yearList.slice(3, 6));
            obj.targetMboTs = common.getAverage(yearList.slice(0, 6));
          }
          //*기말(6월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[5];
            obj.targetMboTs = yearList[5];
          }
        }
        //*상반기
        else if (obj.sumType === '3') {
          let yearData = yearList.slice(0, 6);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (상반기 = 1분기 + 2분기)
            obj.targetMboMs = common.getSum(yearData);
            //*합계누계 (상반기 = 1분기 + 2분기)
            obj.targetMboTs = common.getSum(yearData);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (상반기 = (1월 + 2월 + 3월 + 4월 + 5월 + 6월) / 6)
            obj.targetMboMs = common.getAverage(yearData);
            //*단순평균누계 (상반기 = (1월 + 2월 + 3월 + 4월 + 5월 + 6월) / 6)
            obj.targetMboTs = common.getAverage(yearData);
          }
          //*기말(6월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[5];
            obj.targetMboTs = yearList[5];
          }
        }
        //*3분기
        else if (obj.sumType === '4') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (3분기 = 7월 + 8월 + 9월)
            obj.targetMboMs = common.getSum(yearList.slice(6, 9));
            //*합계누계 (3분기 = 1분기+2분기+3분기)
            obj.targetMboTs = common.getSum(yearList.slice(0, 9));
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (3분기 = (7월 + 8월 + 9월) / 3)
            obj.targetMboMs = common.getAverage(yearList.slice(6, 9));
            //*단순평균누계 (3분기 = 1분기+2분기+3분기) / 3)
            obj.targetMboTs = common.getAverage(yearList.slice(0, 9));
          }
          //*기말(9월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[8];
            obj.targetMboTs = yearList[8];
          }
        }
        //*4분기
        else if (obj.sumType === '5') {
          let yearData = yearList.slice(9, 12);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (4분기 = 10월 + 11월 + 12월)
            obj.targetMboMs = common.getSum(yearData);
            //*합계누계 (4분기 = 1분기+2분기+3분기+4분기)
            obj.targetMboTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (4분기 = (10월 + 11월 + 12월) / 3)
            obj.targetMboMs = common.getAverage(yearData);
            //*단순평균누계 (4분기 = (1분기+2분기+3분기+4분기) / 4)
            obj.targetMboTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[11];
            obj.targetMboTs = yearList[11];
          }
        }
        //*하반기
        else if (obj.sumType === '6') {
          let yearData = yearList.slice(6, 12);
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (3분기 + 4분기)
            obj.targetMboMs = common.getSum(yearData);
            //*합계누계 (하반기 = 1분기+2분기+3분기+4분기)
            obj.targetMboTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (하반기 = (7월 + 8월 + 9월 + 10월 + 11월 + 12월) / 6)
            obj.targetMboMs = common.getAverage(yearData);
            //*단순평균누계 (하반기 = (1월 + ... +7월 + 8월 + 9월 + 10월 + 11월 + 12월) / 12)
            obj.targetMboTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[11];
            obj.targetMboTs = yearList[11];
          }
        }
        //*총 계
        else if (obj.sumType === '7') {
          if (this.kpiAccType === this.TYPE_SUM) {
            //*합계 (년간실적 = 상반기 + 하반기)
            obj.targetMboMs = common.getSum(yearList);
            //*합계누계 (년간실적 = 상반기 + 하반기)
            obj.targetMboTs = common.getSum(yearList);
          } else if (this.kpiAccType === this.TYPE_AVG) {
            //*단순평균 (년간실적 = (상반기 + 하반기) / 12)
            obj.targetMboMs = common.getAverage(yearList);
            //*단순평균누계 (년간실적 = (상반기 + 하반기) / 12)
            obj.targetMboTs = common.getAverage(yearList);
          }
          //*기말(12월)
          else if (this.kpiAccType === this.TYPE_LQ) {
            obj.targetMboMs = yearList[11];
            obj.targetMboTs = yearList[11];
          }
          //*총계 년데이터에 표시
          //this.targetMYyForm = common.numberWithCommas(obj.targetMboMs);
          // this.targetMboMYyForm = common.numberWithCommas(obj.targetMboMs);
          this.targetMboYy = common.numberWithCommas(obj.targetMboMs);
          // if (this.getField === 'targetOYy') {
          //   this.targetMboMYyForm = common.numberWithCommas(obj.targetMboMs);
          // } else {
          //   this.targetMboMYyForm = common.numberWithCommas(obj.targetMboMs);
          // }
        }

        //*총평균일때 처리-->(총평균 월데이터 누적데이터로 세팅제거 20.09.09_khm)
        // if (this.kpiAccType === this.TYPE_TAVG) {
        //   obj.targetMboTs = obj.targetMboMs;
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
      // this.checkMboKpiInfo();
      // if (this.invalidFlag) common.alert('warning', this.invalidMessage);
      //else
      // if (this.targetMboYy === undefined || common.isEmpty(this.targetMboYy)) {
      //   // MBO수정목표 값이 누락되었습니다.
      //   common.alert('warning', 'NLS0001427');
      //   return;
      // }
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
          //* MBO 월 수정 목표
          newObj.targetMboMs = this.changeTargetFormat(obj.targetMboMs);
          //* MBO 월 누적 수정 목표
          newObj.targetMboTs = this.changeTargetFormat(obj.targetMboTs);
        } else {
          //*월수정목표
          newObj.targetOMs = this.changeTargetFormat(obj.targetOMs);
          newObj.targetOTs = this.changeTargetFormat(obj.targetOTs);
          newObj.targetMMs = this.changeTargetFormat(obj.targetMs);
          newObj.targetMTs = this.changeTargetFormat(obj.targetTs);
          //* MBO 월 수정 목표
          newObj.targetMboMs = this.changeTargetFormat(obj.targetMboMs);
          //* MBO 누적 수정 목표
          newObj.targetMboTs = this.changeTargetFormat(obj.targetMboTs);
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
        // targetOYy: this.changeTargetFormat(this.targetOYyForm),
        // targetMYy: this.changeTargetFormat(this.targetMYyForm),
        targetMboYy: this.changeTargetFormat(this.targetMboYy),
        fileList: this.paramTargetFileList,
      };
      //* MBO 추가 정보
      saveParam = this.addMboInfoToParam(saveParam);
      const response = await this[
        mboOperTypes.actions.UPDATE_MBO_KPI_TARGET_MONTH_DATA
      ](saveParam);

      if (response.data.result === 'T') {
        common.alert('success', 'NLS0000012');
        //* 저장한 KPI 정보 저장
        this[mboOperTypes.actions.INIT_CHANGED_TARGET_MBO_KPI]({
          kpiId: this.getKpiGoalYearData.kpiId,
          //picked: this.picked, //* 주간 , 월간?
        });

        //* MBO 운영화면 갱신
        const mboInfo = this[mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI];
        this[mboOperTypes.actions.FETCH_MBO_CURR_INFO]({
          baseYYYY: mboInfo.baseYYYY,
          mboEvalId: mboInfo.mboEvalId,
          mboUserId: mboInfo.mboUserId,
          mboUserDeptId: mboInfo.mboUserDeptId,
        });
      }
      // this.getRegGoalDataSet();
      //this.getTargetListData();
    },
    saveTargetWeekBtn() {
      // this.checkMboKpiInfo();
      // if (this.invalidFlag) common.alert('warning', this.invalidMessage);
      //else
      if (this.targetMboYy === undefined || common.isEmpty(this.targetMboYy)) {
        // MBO수정목표 값이 누락되었습니다.
        common.alert('warning', 'NLS0001427');
        return;
      }
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
          //* MBO 주 수정 목표
          newObj.targetMboWs = this.changeTargetFormat(obj.targetMboWs);
          //* MBO 누적 수정 목표
          newObj.targetMboTs = this.changeTargetFormat(obj.targetMboTs);
        } else {
          //*주수정목표
          newObj.targetOWs = obj.targetOWs;
          newObj.targetOTs = obj.targetOTs;
          newObj.targetMWs = this.changeTargetFormat(obj.targetWs);
          newObj.targetMTs = this.changeTargetFormat(obj.targetWTs);
          //* MBO 주 수정 목표
          newObj.targetMboWs = this.changeTargetFormat(obj.targetMboWs);
          //* MBO 누적 수정 목표
          newObj.targetMboTs = this.changeTargetFormat(obj.targetMboTs);
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
      //* MBO 추가 정보
      saveParam = this.addMboInfoToParam(saveParam);
      const response = await this[
        mboOperTypes.actions.UPDATE_MBO_KPI_TARGET_WEEK_DATA
      ](saveParam);

      if (response.data.result === 'T') {
        common.alert('success', 'NLS0000012');
        this[mboOperTypes.actions.INIT_CHANGED_TARGET_MBO_KPI]({
          kpiId: this.getKpiGoalYearData.kpiId,
          //picked: this.picked, //* 주간 , 월간?
        });

        //* MBO 운영화면 갱신
        const mboInfo = this[mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI];
        this[mboOperTypes.actions.FETCH_MBO_CURR_INFO]({
          baseYYYY: mboInfo.baseYYYY,
          mboEvalId: mboInfo.mboEvalId,
          mboUserId: mboInfo.mboUserId,
          mboUserDeptId: mboInfo.mboUserDeptId,
        });
        this.getRegGoalDataSet();
      }
      // this.getTargetListData();
    },

    saveWeekGoal(row, items) {
      this.getCalWeek(items);
    },

    getCalWeek(items) {
      //*주데이터세팅
      //*입력한 주목표데이터
      const goalList = items.reduce((acc, cur) => {
        const obj = Object.assign(cur, {});
        // acc.push(obj.targetWs);
        acc.push(obj.targetMboWs);
        return acc;
      }, []);
      //*계산
      let weekDataList = items.map((item, index) => {
        const obj = Object.assign(item, {});

        if (this.kpiAccType === this.TYPE_SUM) {
          //*합계
          obj.targetMboTs = common.isEmpty(obj.targetMboWs)
            ? ''
            : common.getSum(goalList.slice(0, index + 1));
        } else if (this.kpiAccType === this.TYPE_AVG) {
          //*단순평균
          obj.targetMboTs = common.isEmpty(obj.targetMboWs)
            ? ''
            : common.getAverage(goalList.slice(0, index + 1));
        } else if (this.kpiAccType === this.TYPE_LQ) {
          //*기말
          obj.targetMboTs = obj.targetMboWs;
        }
        //else if (this.kpiAccType === this.TYPE_TAVG) {
        //* 총평균-->(총평균 월데이터 누적데이터로 세팅제거 20.09.09_khm)
        //   obj.targetMboTs = obj.targetMboWs;
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
    addMboInfoToParam(param) {
      //* 추가 파라미터
      param.baseYYYY = this.getSelectedYear;
      param.mboEvalId = this[
        mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI
      ].mboEvalId;
      param.thresholdM = Number(this.threshold_m);
      param.maximumM = Number(this.maximum_m);
      param.mboUserId = this[
        mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI
      ].mboUserId;
      param.mboUserDeptId = this[
        mboOperTypes.getters.GET_SELECTED_TARGET_MBO_KPI
      ].mboUserDeptId;
      return param;
    },
    checkMboKpiInfo() {
      if (this.threshold_m == '' || this.threshold_m == undefined) {
        this.invalidFlag = true;
        this.invalidMessage = '수정 후 Threhold 값을 입력해야합니다.';
      } else {
        this.invalidFlag = false;
      }
      if (this.maximum_m == '' || this.maximum_m == undefined) {
        this.invalidFlag = true;
        this.invalidMessage = '수정 후 MAX 값을 입력해야합니다.';
      } else {
        this.invalidFlag = false;
      }
    },
  },
};
</script>
