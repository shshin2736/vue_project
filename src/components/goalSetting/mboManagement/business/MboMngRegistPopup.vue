<template>
  <com-overlay v-model="value" :draggable="true" customClass="max-1221">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-wide">
            <div class="layer-pop__title">
              <!-- MBO 추가 -->
              <p>{{ isShowSaveBtn ? $t('NLS0000968') : $t('NLS0001375') }}</p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>

            <div class="layer_scroll">
              <div class="layer-pop__subtitle">
                <!-- 평가 정보 -->
                <p>{{ $t('NLS0000969') }}</p>
              </div>

              <div class="hms-grid basic-table">
                <table>
                  <colgroup>
                    <col style="width:13%" />
                    <col style="width:37%" />
                    <col style="width:13%" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <!-- 평가명 -->
                        {{ $t('NLS0000970')
                        }}<span class="required-text">*</span>
                      </th>
                      <!-- 평가명 입력폼 -->
                      <td colspan="3">
                        <span class="grid-input-form type-nobtn">
                          <com-input-text
                            type="text"
                            v-model="getMboEvalNm"
                            rules="required"
                          ></com-input-text>
                        </span>
                        <button
                          type="button"
                          class="white-btn"
                          @click="overlapCheck"
                        >
                          <!-- 중복체크 -->
                          <span>{{ $t('NLS0000077') }}</span>
                        </button>
                        <span class="grid-text-info normal">
                          <!-- 등록 후 수정 불가 -->
                          * {{ $t('NLS0000974') }}
                        </span>
                        <span class="grid-text-info" v-show="isBeMboNm">
                          <!-- 등록 가능합니다. -->
                          {{ $t('NLS0000798') }}</span
                        >
                        <span
                          class="grid-text-info alert"
                          v-show="isAlreayMboNm"
                        >
                          <!-- 이미 등록된 이름입니다. -->
                          {{ $t('NLS0000799') }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <!-- 평가 년도 -->
                        {{ $t('NLS0000971') }}
                        <span class="required-text">*</span>
                      </th>
                      <td>
                        <span class="hms-dropdown type1">
                          <com-dropdowns
                            :data="getEvalDate()"
                            :classed="classed"
                            rules="required"
                            textfield="text"
                            valuefield="value"
                            v-model="baseYYYY"
                          ></com-dropdowns>
                        </span>
                      </td>
                      <th scope="row">
                        <!-- 평가 인원 -->
                        {{ $t('NLS0000976') }}
                      </th>
                      <td>{{ appCnt }} / {{ userCnt }}</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <!-- 평가 기간 -->
                        {{ $t('NLS0000973') }}
                        <span class="required-text">*</span>
                      </th>
                      <td>
                        <span class="hms-datepicker type1">
                          <com-date-picker
                            :min="min"
                            :max="max"
                            name="mboFromDate"
                            :current="mboFromDate"
                            :format="format"
                            @onChange="onChange"
                          ></com-date-picker>
                        </span>
                        <em>~</em>
                        <span class="hms-datepicker type1">
                          <com-date-picker
                            :min="min"
                            :max="max"
                            name="mboToDate"
                            :current="mboToDate"
                            :format="format"
                            @onChange="onChange"
                          ></com-date-picker>
                        </span>
                      </td>
                      <!-- 평가 타입 -->
                      <th scope="row">
                        {{ $t('NLS0000290') }}
                      </th>
                      <td>
                        <span class="hms-dropdown type1">
                          <com-dropdowns
                            :data="typeList"
                            :classed="classed"
                            rules="required"
                            textfield="text"
                            valuefield="value"
                            v-model="evalType"
                          ></com-dropdowns>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <!-- 평가 진행 상태 -->
                      <th scope="row">
                        {{ $t('NLS0000977') }}
                      </th>
                      <td>
                        <span class="hms-dropdown type2">
                          <com-dropdowns
                            :data="statusList"
                            :disabled="evalStautsDisable"
                            rules="required"
                            textfield="text"
                            valuefield="value"
                            v-model="evalStatus"
                          ></com-dropdowns>
                        </span>
                      </td>
                      <!-- 귀속 국가 -->
                      <th scope="row">
                        {{ $t('NLS0000262') }}
                      </th>
                      <td>
                        <span class="hms-dropdown type1">
                          <com-dropdowns
                            :data="getCountryCode"
                            :classed="classed"
                            rules="required"
                            textfield="cdNm"
                            valuefield="cd"
                            v-model="countryCode"
                            @change="onChangeCountry"
                          ></com-dropdowns>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <!-- 비고 -->
                      <th scope="row">
                        {{ $t('NLS0000291') }}
                      </th>
                      <td colspan="3">
                        <span class="hms-textarea">
                          <textarea
                            class="grid-textarea"
                            title="비고 입력폼"
                            v-model="remark"
                          ></textarea>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="layer-pop__subtitle">
                <!-- KPI 선정 및 목표승인과 MBO 평가 단계 설정 -->
                <p>{{ $t('NLS0000978') }}</p>
              </div>
              <div class="hms-grid border-table">
                <table>
                  <colgroup>
                    <col style="width:10%" />
                    <col style="width:40%" />
                    <col style="width:10%" />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th colspan="2" scope="col">
                        <!-- KPI 세부항목 선정 및 목표승인 -->
                        {{ $t('NLS0000979') }}
                        <span class="required-text">*</span>
                      </th>
                      <th colspan="2" scope="col">
                        <!-- MBO 평가 -->
                        {{ $t('NLS0000293')
                        }}<span class="required-text">*</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <!-- 단계 -->
                        {{ $t('NLS0000294')
                        }}<span class="required-text">*</span>
                      </th>
                      <td>
                        <span class="hms-dropdown type1">
                          <com-dropdowns
                            :data="getStepOrder()"
                            :classed="classed"
                            rules="required"
                            textfield="text"
                            valuefield="value"
                            v-model="mboKpiStepOrder"
                            @change="onChangeMboUserKpi"
                          ></com-dropdowns>
                        </span>
                      </td>
                      <th scope="row">
                        <!-- 단계 -->
                        {{ $t('NLS0000294')
                        }}<span class="required-text">*</span>
                      </th>
                      <td>
                        <span class="hms-dropdown type1">
                          <com-dropdowns
                            :data="getStepOrder()"
                            :classed="classed"
                            rules="required"
                            textfield="text"
                            valuefield="value"
                            v-model="mboEvalStepOrder"
                            @change="onChangeMboEval"
                          ></com-dropdowns>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <!-- 기간 -->
                        {{ $t('NLS0000263') }}
                        <span class="required-text">*</span>
                      </th>
                      <td>
                        <span class="hms-datepicker type1">
                          <com-date-picker
                            name="mboKpiFromDate"
                            :min="min"
                            :max="max"
                            :current="mboKpiFromDate"
                            :format="format"
                            @onChange="onChange"
                          ></com-date-picker>
                        </span>
                        <em>~</em>
                        <span class="hms-datepicker type1">
                          <com-date-picker
                            name="mboKpiToDate"
                            :min="min"
                            :max="max"
                            :current="mboKpiToDate"
                            :format="format"
                            @onChange="onChange"
                          ></com-date-picker>
                        </span>
                      </td>
                      <th scope="row">
                        <!-- 기간 -->
                        {{ $t('NLS0000263') }}
                        <span class="required-text">*</span>
                      </th>
                      <td>
                        <span class="hms-datepicker type1">
                          <com-date-picker
                            name="mboEvalFromDate"
                            :min="min"
                            :max="max"
                            :current="mboEvalFromDate"
                            :format="format"
                            @onChange="onChange"
                          ></com-date-picker>
                        </span>
                        <em>~</em>
                        <span class="hms-datepicker type1">
                          <com-date-picker
                            name="mboEvalToDate"
                            :min="min"
                            :max="max"
                            :current="mboEvalToDate"
                            :format="format"
                            @onChange="onChange"
                          ></com-date-picker>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="no-padding" colspan="2">
                        <div class="hms-grid joo-fix">
                          <com-native-grid
                            :data="mboUserKpiData"
                            :columns="mboUserKpiColums"
                            height="174"
                          >
                          </com-native-grid>
                        </div>
                      </td>
                      <td class="no-padding" colspan="2">
                        <div class="hms-grid joo-fix">
                          <com-native-grid
                            :data="mboEvalData"
                            :columns="mboEvalColums"
                            :addBtnHide="true"
                            editfield="inEdit"
                            height="174"
                          >
                          </com-native-grid>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="layer__btn-box">
              <button
                type="button"
                class="white-btn"
                v-if="isShowMboEnd"
                @click="mboEvalEnd"
              >
                <!-- 평가완료 -->
                <span>{{ $t('NLS0000298') }}</span>
              </button>
              <button
                type="button"
                class="darkgray-btn"
                v-if="getIsNewMboSave"
                @click="deleteMbo"
              >
                <!-- 삭제 -->
                <span>{{ $t('NLS0000075') }}</span>
              </button>
              <button
                type="button"
                class="blue-btn"
                @click="saveMbo"
                v-if="isShowSaveBtn"
              >
                <!-- 저장 -->
                <span>{{ $t('NLS0000074') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone } from '@/utils';
import { common } from '@/utils';
import { mboManagementStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';

export default {
  name: 'mboMngRegistPopup',
  mixins: [mboManagementStore],
  components: {
    ComNativeGrid,
    ComDropdowns,
    ComDatePicker,
    ComInputText,
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
      //* KPI 세부항목 선정 및 목표승인 컬럼
      mboUserKpiColums: [],
      //* MBO 평가 컬럼
      mboEvalColums: [],
      //* KPI 세부항목 선정 및 목표승인 row
      mboUserKpiData: [],
      //* MBO 평가 row
      mboEvalData: [],
      //* Input data
      //* MBO 평가기간 설정
      mboEvalId: '',
      mboEvalNm: '',
      mboFromDate: new Date(new Date().getFullYear(), 0, 1),
      mboToDate: new Date(new Date().getFullYear() + 1, 0, 0),
      appCnt: '0',
      userCnt: '0',
      typeList: [],
      statusList: [],
      evalType: {},
      evalStatus: {},
      evalStautsDisable: true,
      remark: '',

      //* MBO명 중복 여부
      onOverLap: false, //중복체크 여부
      isAlreayMboNm: false,
      isBeMboNm: false,

      //* KPI 세부항목 선정 및 목표승인
      mboKpiFromDate: new Date(),
      mboKpiToDate: new Date(),
      mboKpiStep: 3,
      mboKpiStepOrder: { text: '1', value: '1' },

      //* MBO 평가
      mboEvalFromDate: new Date(),
      mboEvalToDate: new Date(),
      mboEvalStep: 4,
      mboEvalStepOrder: { text: '1', value: '1' },

      //* 유효성 체크
      invalid: true,
      invalidMessage: '',

      // * DatePicker
      min: new Date(2010, 1, 1),
      max: new Date(2040, 12, 31),
      current: new Date(),
      format: 'yyyy-MM-dd',

      //* DropDowns
      classed: 'hms-dropdown type1',
      baseYYYY: {
        text: new Date().getFullYear(),
        value: new Date().getFullYear(),
      },

      //* 귀속 국가
      countryCode: {},
      //* 수정 화면에서 수정 전 귀속 국가 코드
      oldCountry: '',
    };
  },
  computed: {
    //* MBO 평가명
    getMboEvalNm: {
      set(value) {
        this.onOverLap = false; //* 새로운 MBO평가명 입력시 중복체크 여부 false
        this.isAlreayMboNm = false; //* 등록가능한 이름  OFF
        this.isBeMboNm = false; //* 등록가능한 이름 ON
        this.mboEvalNm = value;
      },
      get(state) {
        return state.mboEvalNm;
      },
    },
    getDropDown() {
      return this[mboManagementTypes.getters.GET_MBO_DROPDOWN_LIST];
    },
    //* MBO 평가 타입 가져오기
    // getEvalTypeList(state) {
    //   state.evalType = this[
    //     mboManagementTypes.getters.GET_MBO_DROPDOWN_LIST
    //   ].mboEvalType[0];
    //   return this[mboManagementTypes.getters.GET_MBO_DROPDOWN_LIST].mboEvalType;
    // },
    // //* MBO 진행 상태 가져오기
    // getEvalStatusList(state) {
    //   const mboEvalStatus = this[
    //     mboManagementTypes.getters.GET_MBO_DROPDOWN_LIST
    //   ].mboEvalStatus;

    //   state.evalStatus = mboEvalStatus[2];
    //   return mboEvalStatus;
    // },
    getExistMboName() {
      return this[mboManagementTypes.getters.GET_EXIST_MBO_NAME];
    },

    getBeRegistName() {
      return this[mboManagementTypes.getters.GET_BE_REGIST_NAME];
    },
    getAlreadyRegistName() {
      return this[mboManagementTypes.getters.GET_ALREADY_REGIST_NAME];
    },
    //* MBO명을 클릭해서 가져온 정보
    getUnityMboInfo() {
      return this[mboManagementTypes.getters.GET_MBO_EVAL_CONF];
    },
    getCountryCode(state) {
      state.countryCode = common.getCodeList('G10')[0];
      return common.getCodeList('G10');
    },

    //* 평가 완료 버튼을 보여줄 기준 return
    isShowMboEnd() {
      var flag = false;

      if (this.evalStatus !== undefined) {
        //* 평가진행상태가 평가기간OPEN(131)이거나 평가중(132) 일떄
        if (this.evalStatus.value === '131' || this.evalStatus.value === '132')
          flag = true;
      }
      return flag;
    },

    //* 저장 버튼을 보여줄 기준 return
    isShowSaveBtn() {
      const isNewMboSave = this[mboManagementTypes.getters.GET_IS_NEW_SAVE_MBO];
      var flag = false;
      if (isNewMboSave) {
        //* 신규저장이면
        flag = true;
      } else {
        //* 평가 대상자가 0명이거나 진행상태가 평가기간OPEN(131)전
        if (this.userCnt === 0 && this.evalStatus.value < 131) flag = true;
      }
      return flag;
    },
    getIsNewMboSave() {
      const isNewMboSave = this[mboManagementTypes.getters.GET_IS_NEW_SAVE_MBO];
      return !isNewMboSave;
    },
  },
  watch: {
    //* MBO 평가명을 클릭했을떄 선택한 MBO 정보 불러오기
    getUnityMboInfo: function(value) {
      this.oldCountry = value.mboEvalConf.country;

      //* MBO 수정의 기존 이름은 사용가능하게 ON
      this.onOverLap = true; //중복체크 여부
      this.isAlreayMboNm = false;
      this.isBeMboNm = true;

      //* MBO 평가기간 설정
      const mboEvalConf = value.mboEvalConf;

      this.mboEvalId = mboEvalConf.mboEvalId;
      this.mboEvalNm = mboEvalConf.mboEvalNm; //* MBO평가명
      this.baseYYYY = {
        //* 귀속년도
        text: value.mboEvalConf.baseYyyy,
        value: value.mboEvalConf.baseYyyy,
      };
      this.mboFromDate = new Date(
        timezone.convertToClientTimeZone(mboEvalConf.mboFromDate, 'YYYY-MM-DD'),
      ); //* MBO 시작날짜
      this.mboToDate = new Date(
        timezone.convertToClientTimeZone(mboEvalConf.mboToDate, 'YYYY-MM-DD'),
      ); //* MBO 종료날짜
      this.appCnt = mboEvalConf.appCnt; //* 평가인원
      this.userCnt = mboEvalConf.userCnt; //* 전체인원

      // this.getEvalType(mboEvalConf.evalType); //* MBO 평가 타입
      //       this.getEvalStatus(mboEvalConf.evalStatus); //* MBO 평가 상태
      this.evalType = this.typeList.filter(
        el => el.value === mboEvalConf.evalType,
      )[0];
      this.evalStatus = this.statusList.filter(
        el => el.value === mboEvalConf.evalStatus,
      )[0];

      this.getCountry(mboEvalConf.country); //* 귀속 국가
      this.remark = mboEvalConf.remark;

      //* KPI 세부항목 선정 및 목표승인
      const fetchUserKpiData = value.mboUserKpiData;
      if (fetchUserKpiData.length > 1) {
        this.mboKpiFromDate = new Date(
          timezone.convertToClientTimeZone(
            fetchUserKpiData[0].startDate,
            'YYYY-MM-DD',
          ),
        );
        this.mboKpiToDate = new Date(
          timezone.convertToClientTimeZone(
            fetchUserKpiData[0].endDate,
            'YYYY-MM-DD',
          ),
        );

        //* 단계dropdown
        this.mboKpiStepOrder.text = fetchUserKpiData.length;
        this.mboKpiStepOrder.value = fetchUserKpiData.length;

        //* grid data
        this.mboUserKpiData = fetchUserKpiData.map(item => {
          if (item.stepOrder === 1) item.stepNm = '본인등록';
          else if (item.stepOrder === 2) item.stepNm = '2차 결재';
          else if (item.stepOrder === 3) item.stepNm = '3차 결재';
          return item;
        });
        this.mboUserKpiData = fetchUserKpiData;
      }
      //* MBO 평가
      const fetcheMboEvalData = value.mboEvalData;
      if (fetcheMboEvalData.length > 1) {
        this.mboEvalFromDate = new Date(
          timezone.convertToClientTimeZone(
            fetcheMboEvalData[0].startDate,
            'YYYY-MM-DD',
          ),
        );
        this.mboEvalToDate = new Date(
          timezone.convertToClientTimeZone(
            fetcheMboEvalData[0].endDate,
            'YYYY-MM-DD',
          ),
        );

        this.mboEvalStepOrder.text = fetcheMboEvalData.length;
        this.mboEvalStepOrder.value = fetcheMboEvalData.length;

        //grid data
        this.mboEvalData = fetcheMboEvalData.map(item => {
          if (item.stepOrder === 1) item.stepNm = '본인등록';
          else if (item.stepOrder === 2) {
            item.stepNm = '1차 승인';
            item.inCell = true;
          } else if (item.stepOrder === 3) {
            item.stepNm = '2차 승인';
            item.inCell = true;
          }
          return item;
        });

        this.mboEvalData = fetcheMboEvalData;
      }
    },
    getDropDown: function(value) {
      const { mboEvalType, mboEvalStatus } = value;
      this.typeList = mboEvalType;
      this.statusList = mboEvalStatus;
      this.evalStatus = mboEvalStatus[0];
      this.evalType = mboEvalType[0];
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.mboUserKpiColums = [
        {
          field: 'stepOrder',
          title: this.$t('NLS0000294'), //단계
          className: 'center',
        },
        {
          field: 'stepNm',
          title: this.$t('NLS0000295'), //단계명
          className: 'center',
        },
      ];
      this.mboEvalColums = [
        {
          field: 'stepOrder',
          title: this.$t('NLS0000294'), //단계
          className: 'center',
        },
        {
          field: 'stepNm',
          title: this.$t('NLS0000295'), //단계명
          className: 'center',
        },
        {
          field: 'wtRate',
          title: this.$t('NLS0000296'), //가중치
          className: 'comma inCell',
          inCell: true,
        },
        {
          field: 'modPoint',
          title: this.$t('NLS0000980'), //조정범위(%)
          className: 'comma inCell',
          inCell: true,
        },
      ];
      this.mboUserKpiData = [
        {
          stepOrder: '1',
          stepNm: this.$t('NLS0000981'), //본인등록
        },
      ];
      this.mboEvalData = [
        {
          stepOrder: '1',
          stepNm: this.$t('NLS0000981'), //본인등록
          wtRate: '0',
        },
      ];
    },
    //* DatePicker 변경 이벤트
    onChange(date, name) {
      if (name === 'mboFromDate') this.mboFromDate = date;
      else if (name === 'mboToDate') this.mboToDate = date;
      else if (name === 'mboKpiFromDate') this.mboKpiFromDate = date;
      else if (name === 'mboKpiToDate') this.mboKpiToDate = date;
      else if (name === 'mboEvalFromDate') this.mboEvalFromDate = date;
      else if (name === 'mboEvalToDate') this.mboEvalToDate = date;
    },

    //* 해당년도 defalut
    getEvalDate() {
      const intArr = [];
      for (var i = 0; i < 10; i++) {
        intArr.push(i);
      }
      const currentYear = new Date().getFullYear() + 1;
      const yearArr = intArr.map(idx => {
        return {
          text: currentYear - idx,
          value: currentYear - idx,
        };
      });
      return yearArr;
    },

    //* 단계 default값
    getStepOrder() {
      const intArr = [];
      for (var i = 1; i < 4; i++) {
        intArr.push(i);
      }
      const stepOrder = intArr.map(idx => {
        return {
          text: idx,
          value: idx,
        };
      });
      return stepOrder;
    },
    //* KPI 세부항목 선정 및 목표 승인 [단계] 드롭다운 이벤트
    onChangeMboUserKpi(e) {
      const stepOrder = e.value.value;
      if (stepOrder === 1)
        this.mboUserKpiData = [
          {
            stepOrder: '1',
            stepNm: this.$t('NLS0000981'), //본인등록
          },
        ];
      if (stepOrder === 2)
        this.mboUserKpiData = [
          {
            stepOrder: '1',
            stepNm: this.$t('NLS0000981'), //본인등록
          },
          {
            stepOrder: '2',
            stepNm: this.$t('NLS0000983'), //1차 결제 -> 2차 결제
          },
        ];
      if (stepOrder === 3)
        this.mboUserKpiData = [
          {
            stepOrder: '1',
            stepNm: this.$t('NLS0000981'), //본인등록
          },
          {
            stepOrder: '2',
            stepNm: this.$t('NLS0000983'), //1차 결제 -> 2차 결제
          },
          {
            stepOrder: '3',
            stepNm: this.$t('NLS0001280'), //2차 결제 -> 3차 결재
          },
        ];
    },

    //* MBO평가  [단계] 드롭다운 이벤트
    onChangeMboEval(e) {
      const stepOrder = e.value.value;
      if (stepOrder === 1)
        this.mboEvalData = [
          {
            stepOrder: '1',
            stepNm: this.$t('NLS0000981'), //본인등록
            wtRate: 0,
            modPoint: 0,
          },
        ];
      if (stepOrder === 2)
        this.mboEvalData = [
          {
            stepOrder: '1',
            stepNm: this.$t('NLS0000981'), //본인등록
            wtRate: 0,
            modPoint: 0,
          },
          {
            stepOrder: '2',
            stepNm: this.$t('NLS0000984'), //1차 승인
            wtRate: 0,
            inCell: true,
            modPoint: 0,
          },
        ];
      if (stepOrder === 3) {
        this.mboEvalData = [
          {
            stepOrder: '1',
            stepNm: this.$t('NLS0000981'), //본인등록
            wtRate: 0,
            modPoint: 0,
          },
          {
            stepOrder: '2',
            stepNm: this.$t('NLS0000984'), //1차 승인
            wtRate: 0,
            inCell: true,
            modPoint: 0,
          },
          {
            stepOrder: '3',
            stepNm: this.$t('NLS0000985'), //2차 승인
            wtRate: 0,
            inCell: true,
            modPoint: 0,
          },
        ];
      }
    },

    //* MBO 평가기간설정 저장
    saveMbo() {
      //* 유효성 체크
      if (!this.onInvalid()) {
        common.alert('warning', this.invalidMessage);
      } else {
        //* 저장
        //* Mbo 정보
        const mboEvalConf = {
          mboEvalNm: this.mboEvalNm,
          baseYYYY: this.baseYYYY.value,
          mboFromDate: timezone.convertToServerTimeZone(
            this.mboFromDate,
            'YYYYMMDD',
          ),
          mboToDate: timezone.convertToServerTimeZone(
            this.mboToDate,
            'YYYYMMDD',
          ),
          evalType: this.evalType.value,
          evalStatus: this.evalStatus.value,
          country: this.countryCode.cd,
          remark: this.remark,
          oldCountry: this.oldCountry,
        };

        //* MBO평가단계 설정(TB_MBO_EVAL_LEVEL)
        const mboEvalLevel = [];

        //* KPI 세부항목 선정 및 목표승인
        const mboKpiInfo = this.mboUserKpiData.map(item => {
          item.mboStep = this.mboKpiStep;
          item.baseYYYY = this.baseYYYY.value;
          item.startDate = timezone.convertToServerTimeZone(
            this.mboKpiFromDate,
            'YYYYMMDD',
          );
          item.endDate = timezone.convertToServerTimeZone(
            this.mboKpiToDate,
            'YYYYMMDD',
          );
          return item;
        });

        mboKpiInfo.forEach(item => {
          mboEvalLevel.push(item);
        });

        //* MBO 평가
        const mboEvalInfo = this.mboEvalData.map(item => {
          item.mboStep = this.mboEvalStep;
          item.baseYYYY = this.baseYYYY.value;
          item.startDate = timezone.convertToServerTimeZone(
            this.mboEvalFromDate,
            'YYYYMMDD',
          );
          item.endDate = timezone.convertToServerTimeZone(
            this.mboEvalToDate,
            'YYYYMMDD',
          );
          return item;
        });

        mboEvalInfo.forEach(item => {
          mboEvalLevel.push(item);
        });

        const param = {
          mboEvalId: this.mboEvalId,
          mboEvalConf: mboEvalConf,
          mboEvalLevel: mboEvalLevel,
        };

        common.confirm('NLS0000005', async () => {
          const isNewMboFlag = this[
            mboManagementTypes.getters.GET_IS_NEW_SAVE_MBO
          ];

          let response = undefined;
          if (isNewMboFlag)
            //* 신규저장
            response = await this[mboManagementTypes.actions.INSERT_NEW_MBO](
              param,
            );
          //* 수정
          else
            response = await this[mboManagementTypes.actions.UPDATE_MBO](param);

          if (response.result === 'T') {
            common.alert('success', 'NLS0000012');
            this.popupInit();
          }
          //선택한 MBO 정보를 갱신
          this[mboManagementTypes.actions.INIT_BTN_MBO_TARGET_SETUP](false);
        });
      }
    },

    //* MBO명 중복체크
    overlapCheck() {
      if (this.mboEvalNm.length === 0) {
        // 'MBO명을 입력해주세요.
        common.alert('warning', 'NLS0000986');
      } else {
        this[mboManagementTypes.actions.FETCH_EXIST_MBO_NAME]({
          mboEvalNm: this.mboEvalNm,
        });
        const flag = this.getExistMboName;
        if (flag) {
          this.isAlreayMboNm = true;
          this.isBeMboNm = false;
        } else {
          this.isAlreayMboNm = false;
          this.isBeMboNm = true;
        }
        this.onOverLap = true;
      }
    },

    onInvalid() {
      //* MBO명 입력 여부
      if (this.mboEvalNm.trim().length === 0) {
        // 'MBO명을 입력해주세요.
        this.invalidMessage = this.$t('NLS0000986');
        return false;
      }
      //* MBO 중복체크 여부
      if (!this.onOverLap) {
        // '평가명을 중복체크해주세요.'
        this.invalidMessage = this.$t('NLS0000987');
        return false;
      }

      //* MBO 평가명 중복여부
      if (this.isAlreayMboNm) {
        // 이미 중복된 MBO 평가명이 존재합니다.
        this.invalidMessage = this.$t('NLS0000988');
        return false;
      }

      //* MBO 평가기간 체크
      if (this.mboFromDate > this.mboToDate) {
        // MBO평가 종료날짜가 시작날짜 보다  작을 수 없습니다.
        this.invalidMessage = this.$('NLS0000989');
        return false;
      }

      //* [KPI세부항목 선정및 목표승인 단계] 가 1일 경우
      if (this.mboUserKpiData.length === 1) {
        // KPI세부항목 선정및 목표승인 단계가 1단계입니다.
        this.invalidMessage = this.$t('NLS0000990');
        return false;
      }

      //* [KPI세부항목 선정및 목표승인] 기간 체크
      if (this.mboKpiFromDate > this.mboKpiToDate) {
        // [KPI세부항목 선정및 목표승인] 종료날짜가 시작날짜보다  작을 수 없습니다.
        this.invalidMessage = this.$t('NLS0000990');
        return false;
      }

      //* [KPI세부항목 선정및 목표승인 단계] 가 1일 경우
      if (this.mboEvalData.length === 1) {
        // MBO평가 단계가 1단계입니다.
        this.invalidMessage = this.$t('NLS0000992');

        return false;
      }

      //* [MBO 평가] 기간 체크
      if (this.mboEvalFromDate > this.mboEvalToDate) {
        // '[MBO평가] 종료날짜가 시작날짜보다  작을 수 없습니다.'
        this.invalidMessage = this.$t('NLS0000989');
        return false;
      }

      //* [MBO 평가] 가중치 범위 체크 (100)
      const wtRateSum = this.mboEvalData.reduce((acc, cur) => {
        return acc + parseInt(cur.wtRate);
      }, 0);
      if (wtRateSum !== 100) {
        // [MBO평가] 가중치의 합이 100 되어야합니다.
        this.invalidMessage = this.$t('NLS0000994');
        return false;
      }

      var modPointInvalid = true;
      //* [MBO 평가] 조정범위 체크 (단계당 100이 넘어가서는 안된다.)
      this.mboEvalData.forEach(element => {
        if (element.modPoint > 100) {
          modPointInvalid = false;
          // [MBO평가] 조정범위가 100을 초과하였습니다.
          this.invalidMessage = 'NLS0000995';
          return false;
        }
      });
      if (!modPointInvalid) {
        return false;
      }

      return true;
    },
    deleteMbo() {
      const param = {
        mboEvalId: this.mboEvalId,
        baseYYYY: this.baseYYYY.value,
      };

      common.confirm('NLS0000004', async () => {
        //MBO 초기화
        const response = await this[mboManagementTypes.actions.DELETE_MBO](
          param,
        );
        if (response.result === 'T') {
          //평가대상자 탭 숨기기
          this[mboManagementTypes.actions.INIT_BTN_MBO_TARGET_SETUP](false);
          //대상 인원내역 초기화
          this[mboManagementTypes.actions.INIT_MBO_TARGET_LIST]([]);
          //선택한 MBO정보 초기화
          this[mboManagementTypes.actions.INIT_SELECTED_MBO_INFO]({});
          //데이터 초기화
          this.popupInit();
          common.alert('success', 'NLS0000002');
        }
      });
    },
    getCountry(cd) {
      const countryCode = common.getCodeList('G10');
      countryCode.forEach(element => {
        if (element.cd === cd) this.countryCode = element;
      });
    },

    popupInit() {
      //* 날짜 초기화
      this.mboFromDate = new Date(new Date().getFullYear(), 0, 1);
      this.mboToDate = new Date(new Date().getFullYear() + 1, 0, 0);
      this.mboKpiFromDate = this.current;
      this.mboKpiToDate = this.current;
      this.mboEvalFromDate = this.current;
      this.mboEvalToDate = this.current;
      //
      this.mboEvalNm = ''; //MBO명
      this.baseYYYY = {
        //평가년도
        text: new Date().getFullYear() + 1,
        value: new Date().getFullYear() + 1,
      };
      this.onOverLap = false; //중복체크여부
      this.isAlreayMboNm = false; // 사용 불가능한 이름 OFF
      this.isBeMboNm = false; // 사용가능한 이름 텍스트 OFF
      this.appCnt = '0';
      this.userCnt = '0';
      this.evalType = this.typeList[0]; // 평가 타입 초기화
      this.evalStatus = this.statusList[0]; //평가 상태
      this.evalStautsDisable = true; //평가 상태 disabled On
      this.remark = ''; // 비고 초기화

      //* KPI 세부항목 선정 및 목표승인 초기화
      this.mboKpiStepOrder = { text: '1', value: '1' };
      this.mboUserKpiData = [
        {
          stepOrder: '1',
          stepNm: '본인등록',
        },
      ];

      //* MBO 평가 초기화
      this.mboEvalStepOrder = { text: '1', value: '1' };
      this.mboEvalData = [
        {
          stepOrder: '1',
          stepNm: '본인등록',
          wtRate: '0',
        },
      ];

      this.$emit('input', false);
    },

    //* 평가 기간 OPEN
    mboEvalEnd() {
      common.confirm('평가를 완료하시겠습니까?', () => {
        const param = {
          mboEvalId: this.mboEvalId,
          baseYYYY: this.baseYYYY.value,
          evalStatus: '133', //평가타입(평가기간OPEN)
        };
        this[mboManagementTypes.actions.UPDATE_MBO_STATUS](param);

        this.popupInit();
        //평가대상자 탭 숨기기
        this[mboManagementTypes.actions.INIT_BTN_MBO_TARGET_SETUP](false);
        //대상 인원내역 초기화
        this[mboManagementTypes.actions.INIT_MBO_TARGET_LIST]([]);

        //선택한 MBO정보 초기화
        this[mboManagementTypes.actions.INIT_SELECTED_MBO_INFO]({});
      });
    },
    //* 귀속국가 코드 체인지 이벤트
    onChangeCountry(e) {
      this.countryCode = e.value;
    },
  },
};
</script>
