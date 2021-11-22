<template>
  <div class="tab-main-box" :class="{ current: tabContent1 }">
    <div
      class="page__btn-tbox"
      v-if="
        loginUserInfo.userType == 'ADMIN' || loginUserInfo.userType == 'SUPER'
      "
    >
      <!-- 결재항목 -->
      <div class="btn-box-title f_none">
        {{ $t('NLS0000305') }}
        <com-dropdowns
          v-model="defaultMboStep"
          :data="mboMboStepList"
          textfield="cdNm"
          valuefield="cd"
          class="hms-dropdown type1"
        ></com-dropdowns>
      </div>
      <button type="button" class="white-btn" @click="initMboApvStatus">
        <!-- 결재승인 초기화 -->
        <span>{{ $t('NLS0000301') }}</span>
      </button>
    </div>
    <div class="hms-grid-wrap">
      <div class="hms-grid type4 border-table">
        <table class="txt-center">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="col" rowspan="3">
                <span class="hms-dropdown typembo">
                  <com-dropdowns
                    id="mbo"
                    :data="mboDropdownList"
                    rules="required"
                    textfield="mboEvalNm"
                    valuefield="mboEvalId"
                    :disabled="isMboDropDownDisable"
                    v-model="defaultMbo"
                    @change="onChange"
                  ></com-dropdowns>
                </span>
                <button
                  type="button"
                  class="white-btn mbonewbtn"
                  v-if="isShowNewAppoint"
                  @click="onNewMboAppoint"
                >
                  <!-- 인사발령 MBO 신규추가 -->
                  <span>{{ $t('NLS0000302') }}</span>
                </button>
                <!-- {{ mboCrrInfo != null ? mboCrrInfo.mboEvalNm : '' }} -->
              </th>
              <!-- 부서명 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000348') }}
              </th>
              <!-- 이름 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000342') }}
              </th>
              <!-- 직위 ->직급 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000343') }}
              </th>
              <!-- 직책 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000124') }}
              </th>
            </tr>
            <tr>
              <td style="white-space: nowrap;">
                {{
                  mboCrrInfo != null ? mboCrrInfo.deptNm : loginUserInfo.deptNm
                }}
                <button
                  type="button"
                  class="magnifier-btn-black"
                  v-if="addNewMbo"
                  @click="onDeptSearch"
                >
                  <!-- 찾아보기 -->
                  <span>{{ $t('NLS0000814') }}</span>
                </button>
              </td>
              <td style="white-space: nowrap;">
                {{
                  mboCrrInfo != null
                    ? mboCrrInfo.mboUserName
                    : loginUserInfo.userName
                }}
              </td>
              <td style="white-space: nowrap;">
                {{
                  mboCrrInfo != null
                    ? mboCrrInfo.userRank
                    : loginUserInfo.deptNm
                }}
              </td>
              <td style="white-space: nowrap;">
                {{
                  mboCrrInfo != null
                    ? mboCrrInfo.userDuty
                    : loginUserInfo.dutyNm
                }}
              </td>
            </tr>
            <tr>
              <td colspan="4" class="no-padding" style="white-space: nowrap;">
                <div class="mbo-box">
                  <span class="mbo-box-text" v-if="addNewMbo">
                    <!-- 인사발령일자 -->
                    {{ $t('NLS0000303') }}
                    <span class="required-text">*</span>
                  </span>
                  <span v-if="addNewMbo" class="newmbo">
                    <com-date-picker
                      :min="minDate"
                      :max="maxDate"
                      :current="currentDate"
                      :format="dateFormat"
                    ></com-date-picker>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="hms-grid type4 border-table height-table">
        <table class="txt-center">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <!-- 결재라인 결재항목 -->
              <th scope="col" rowspan="2" style="white-space: nowrap;">
                {{ $t('NLS0000305') }}
              </th>
              <!-- 담당자 -->
              <th scope="col" rowspan="2" style="white-space: nowrap;">
                {{ $t('NLS0000982') }}({{ $t('NLS0000065') }})
              </th>
              <!-- 1차 결재 -->
              <th scope="col" colspan="2" style="white-space: nowrap;">
                {{ $t('NLS0000983') }}
              </th>
              <!-- 2차 결재 -->
              <th scope="col" colspan="2" style="white-space: nowrap;">
                {{ $t('NLS0001280') }}
              </th>
            </tr>
            <tr>
              <!-- 승인자 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000279') }}
              </th>
              <!-- 결재 상태 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000306') }}
              </th>
              <!-- 승인자 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000279') }}
              </th>
              <!-- 결재 상태 -->
              <th scope="col" style="white-space: nowrap;">
                {{ $t('NLS0000306') }}
              </th>
            </tr>
            <tr>
              <!-- MBO 선정 -->
              <td style="white-space: nowrap;">{{ $t('NLS0000292') }}</td>
              <!-- MBO 선정 결재라인 > 담당자 -->
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.myTStatus : '' }}
              </td>
              <!-- MBO 선정 결재라인 > 1차결재 -->
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.appUserNameT1 : '' }}
                <button
                  type="button"
                  class="magnifier-btn-black"
                  v-show="isShowaddUserT1"
                  @click="openUserSearchPop('31')"
                >
                  <!-- 찾아보기 -->
                  <span>{{ $t('NLS0000814') }}</span>
                </button>
              </td>
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.apvStatusT1 : '' }}
              </td>
              <!-- MBO 선정 결재라인 > 2차결재 -->
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.appUserNameT2 : '' }}
                <button
                  type="button"
                  class="magnifier-btn-black"
                  v-show="isShowaddUserT2"
                  @click="openUserSearchPop('32')"
                >
                  <!-- 찾아보기 -->
                  <span>{{ $t('NLS0000814') }}</span>
                </button>
              </td>
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.apvStatusT2 : '' }}
              </td>
            </tr>
            <tr>
              <!-- MBO 평가 -->
              <td style="white-space: nowrap;">{{ $t('NLS0000293') }}</td>
              <!-- MBO 평가 결재라인 > 담당자 -->
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.myEStatus : '' }}
              </td>
              <!-- MBO 평가 결재라인 > 1차결재 -->
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.appUserNameE1 : '' }}
                <button
                  type="button"
                  class="magnifier-btn-black"
                  v-show="isShowaddUserE1"
                  @click="openUserSearchPop('41')"
                >
                  <!-- 찾아보기 -->
                  <span>{{ $t('NLS0000814') }}</span>
                </button>
              </td>

              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.apvStatusE1 : '' }}
              </td>
              <!-- MBO 평가 결재라인 > 2차결재 -->
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.appUserNameE2 : '' }}
                <button
                  type="button"
                  class="magnifier-btn-black"
                  v-show="isShowaddUserE2"
                  @click="openUserSearchPop('42')"
                >
                  <!-- 찾아보기 -->
                  <span>{{ $t('NLS0000814') }}</span>
                </button>
              </td>
              <td style="white-space: nowrap;">
                {{ mboCrrInfo != null ? mboCrrInfo.apvStatusE2 : '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="hms-grid">
        <!-- mbo 수정목표  클릭시 선진cu매출액-->
        <com-native-grid
          height="400"
          :data="mboCrrList"
          :columns="columnsA"
          :inCellAutoSave="inCellAutoSave"
          editfield="inEdit"
          :footer="true"
          :operator="[
            { field: 'wtRate', unit: '', fixed: 12 },
            { field: 'sysScore', unit: '', fixed: 1 },
            { field: 'selfEstScore', unit: '', fixed: 12 },
            { field: 'estScore1', unit: '', fixed: 12 },
            { field: 'estScore2', unit: '', fixed: 12 },
          ]"
          @sum="onSum"
          @headerEvent="onClickHeader"
          @btnclick="onBtnClick"
        >
        </com-native-grid>
      </div>
    </div>
    <dl class="hms-accordion">
      <dt :class="{ current: accordion1 }">
        <button type="button" @click="onBtn('1')">
          <!-- 1차 결재자 의견-->
          <span>{{ $t('NLS0000318') }}</span>
        </button>
      </dt>
      <dd v-if="accordion1">
        <span class="hms-textarea">
          <com-ck-editor
            v-model="myEComment"
            :disable="myECommentYn"
          ></com-ck-editor>
        </span>
      </dd>
      <dt :class="{ current: accordion2 }">
        <button type="button" @click="onBtn('2')">
          <!-- 2차 결재자 의견 -->
          <span>{{ $t('NLS0000319') }}</span>
        </button>
      </dt>
      <dd v-if="accordion2">
        <span class="hms-textarea">
          <!-- v-model="mboCrrInfo.estComment1" -->
          <com-ck-editor
            v-model="estComment1"
            :disable="estComment1Yn"
          ></com-ck-editor>
        </span>
      </dd>
      <dt :class="{ current: accordion3 }">
        <button type="button" @click="onBtn('3')">
          <!-- 3차 결재자 의견 -->
          <span>{{ $t('NLS0000320') }}</span>
        </button>
      </dt>
      <dd v-if="accordion3">
        <span class="hms-textarea">
          <!-- v-model="mboCrrInfo.estComment2" -->
          <com-ck-editor
            v-model="estComment2"
            :disable="estComment2Yn"
          ></com-ck-editor>
        </span>
      </dd>
    </dl>
    <div class="page__btn-bbox">
      <!-- MBO운영_현황 -->
      <com-excel-export-btn
        :data="mboCrrList"
        :columns="getExcelColumns"
        :title="$t('NLS0000790')"
        :filename="$t('NLS0001028')"
      ></com-excel-export-btn>

      <!-- MBO목표수정 승인요청 -->
      <com-button
        type="button"
        :auth="$route.params.auth"
        class="darkblue-btn perm_save"
        @click="updateMboTargetStatus('145', 'NLS0001308')"
        v-if="
          mboCrrInfo != null &&
          mboCrrInfo.mboUserId == loginUserInfo.userId && //* 로그인한 사용자 = 피평가자
          getMboCurrInfo.mboTargetStatus !== '145' &&
          this.mboCrrInfo.evalStatus == '131' && //* MBO 평가기간 OPEN
          mboCrrInfo.mbotargetopen && //* 최종승인 상태가 아닐떄
          !addNewMbo && //* 신규인사발령 모드가 아닐떄
            mboCrrInfo.apvStatusE1Cd !== '196' &&
            mboCrrInfo.mbostatus == 'E1' &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001029') }}</span>
      </com-button>
      <!-- MBO목표수정 승인 -->
      <!-- mboCrrInfo !== null &&
          mboCrrInfo.mboTargetStatus === 'Y' &&
          mboCrrInfo.appUserE1 == loginUserInfo.userId && //* 로그인한 사용자가 MBO평가 1차평가자 일때
          this.mboCrrInfo.evalStatus == '131' && //* MBO 평가기간 OPEN
          mboCrrInfo.mbotargetopen && //* MBO가 완료된 상태가 아닐떄(모든 라인 승인X)
          (mboCrrInfo.mbostatus == 'B1' || mboCrrInfo.mbostatus == 'B2') && //* MBO 평가 단계
            this.isAllowPeriod //* MBO 평가기간이 허용 -->
      <button
        type="button"
        class="darkblue-btn perm_save"
        @click="updateMboTargetStatus('196', 'NLS0001309')"
        v-if="
          mboCrrInfo !== null &&
          mboCrrInfo.appUserE1 == loginUserInfo.userId && //* 로그인한 사용자가 MBO평가 1차평가자 일때
            getMboCurrInfo.mboTargetStatus === '145' &&
            mboCrrInfo.mbostatus === 'A1' &&
            mboCrrInfo.evalStatus == '131' //* MBO 평가기간 OPEN
        "
      >
        <span>{{ $t('NLS0000325') }}</span>
      </button>

      <!-- MBO목표수정 반려 -->
      <button
        type="button"
        class="red-btn perm_save"
        @click="updateMboTargetStatus('197', 'NLS0001310')"
        v-if="
          mboCrrInfo !== null &&
          mboCrrInfo.appUserE1 == loginUserInfo.userId && //* 로그인한 사용자가 MBO평가 1차평가자 일때
            getMboCurrInfo.mboTargetStatus === '145' &&
            mboCrrInfo.mbostatus === 'A1' &&
            mboCrrInfo.evalStatus == '131' //* MBO 평가기간 OPEN
        "
      >
        <span>{{ $t('NLS0000324') }}</span>
      </button>

      <!-- MBO선정 승인요청 -->
      <button
        type="button"
        class="darkblue-btn perm_save"
        @click="updateMboApvStatus('145', 'NLS0001302', 'R1')"
        v-if="
          (mboCrrInfo != null ? mboCrrInfo.mbostatus : '') == 'R1' &&
            this.mboCrrInfo.evalStatus == '131' &&
            !addNewMbo &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001030') }} </span>
      </button>

      <!-- MBO평가 승인요청 -->
      <button
        type="button"
        class="darkblue-btn"
        @click="updateMboApvStatus('145', 'NLS0001305')"
        v-if="
          (mboCrrInfo != null ? mboCrrInfo.mbostatus : '') == 'E1' &&
            this.mboCrrInfo.evalStatus == '131' &&
            !addNewMbo &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001031') }}</span>
      </button>

      <!-- MBO선정 승인 -->
      <button
        type="button"
        class="darkblue-btn"
        @click="updateMboApvStatus('196', 'NLS0001303')"
        v-if="
          (mboCrrInfo != null ? mboCrrInfo.mbostatus : '') == 'A2' &&
            this.mboCrrInfo.evalStatus === '131' &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001032') }}</span>
      </button>

      <!-- MBO선정 반려 -->
      <button
        type="button"
        class="red-btn"
        @click="updateMboApvStatus('197', 'NLS0001304')"
        v-if="
          (mboCrrInfo != null ? mboCrrInfo.mbostatus : '') == 'A2' &&
            this.mboCrrInfo.evalStatus === '131' &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001046') }}</span>
      </button>

      <!-- MBO평가 승인 -->
      <button
        type="button"
        class="darkblue-btn"
        @click="updateMboApvStatus('196', 'NLS0001307')"
        v-if="
          (mboCrrInfo != null ? mboCrrInfo.mbostatus : '') == 'B2' &&
            this.mboCrrInfo.evalStatus === '131' &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001033') }}</span>
      </button>

      <!-- MBO평가 반려 -->
      <button
        type="button"
        class="red-btn"
        @click="updateMboApvStatus('197', 'NLS0001306')"
        v-if="
          (mboCrrInfo != null ? mboCrrInfo.mbostatus : '') == 'B2' &&
            this.mboCrrInfo.evalStatus === '131' &&
            this.isAllowPeriod
        "
      >
        <span>{{ $t('NLS0001034') }}</span>
      </button>

      <!-- 임시 저장 -->
      <button
        type="button"
        class="gray-btn"
        @click="onMboSave()"
        v-if="isShowTempSaveBtn() && this.isAllowPeriod"
      >
        <span>{{ $t('NLS0000322') }}</span>
      </button>
    </div>
    <a ref="links"></a>
  </div>
</template>
<script>
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComExcelExportBtn from '@/components/common/global/ComExcelExportBtn';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common, timezone } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import HeaderCell from '@/components/common/business/HeaderCell';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import {
  commonStore,
  mboOperationStore,
  kpiPerformanceStore,
  kpiTargetEstablishmentStore,
} from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as mboOperTypes from '@/store/modules/goalSetting/mboOperation/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import HeaderHtmlCell from '@/components/common/business/HeaderHtmlCell';

export default {
  name: 'MboOperBoardForm',
  mixins: [
    commonStore,
    mboOperationStore,
    kpiPerformanceStore,
    kpiTargetEstablishmentStore,
  ],
  components: {
    ComNativeGrid,
    ComCkEditor,
    ComExcelExportBtn,
    ComButton,
    ComDropdowns,
    ComDatePicker,
  },
  data() {
    return {
      classed: 'hms-dropdown type1',
      flag: true,
      isShowNewAppoint: false,
      inCellAutoSave: true,
      invalidFlag: false,
      invalidMessage: '',
      isAllowPeriod: false,
      wtRateSum: 0,
      srchMboNm: {},
      srchMboStatus: {},
      srchDeptId: '',
      srchDeptNm: '',
      srchUserId: '',
      srchUserNm: '',
      isSrchDeptFlag: false, //* 담당부서 검색 팝업창 사용 유무,
      srchAppUserFlag: '', //* 승인자 설정을 위한값.
      srchMboStatusList: [],
      mboNameList: [],
      mboMboStepList: [], //* 결제 초기화 드롭다운
      defaultMboStep: {}, //* 결제 초기화 드롭다운 기본값
      mboList: [],
      mboCrrList: [],
      mboStatus3: {},
      mboStatus4: {},
      mboCrrInfo: {},
      mboApprovalInfo: [],
      loginUserInfo: {},
      mboDropdownList: [],
      defaultMbo: {},
      selectedMbo: {},
      currDate: '',
      loginId: '',
      current1: true,
      current2: false,
      accordion1: false,
      accordion2: false,
      accordion3: false,
      tabContent1: true,
      tabContent2: false,
      minDate: new Date(2010, 1, 1),
      maxDate: new Date(2040, 12, 31),
      currentDate: new Date(),
      dateFormat: 'yyyy-MM-dd',
      addNewMbo: false,
      myEComment: '',
      estComment1: '',
      estComment2: '',
      myECommentYn: true,
      estComment1Yn: true,
      estComment2Yn: true,
      isShowaddUserT1: false,
      isShowaddUserT2: false,
      isShowaddUserE1: false,
      isShowaddUserE2: false,
      isMboDropDownDisable: false,
      baseYYYY: { text: '2019', value: '2019' },
      columnsA: [],
      excelColumns: [
        { field: 'bscNm', title: 'BSC', width: '90px', className: 'left' }, // BSC
        {
          // title: this.$t('NLS0001043'), //MBO항목
          // fieldId: 'mboItems',
          // // width: '330px',
          // children: [
          // {
          field: 'kpiNm',
          title: 'KPI',
          width: '330px',
          className: 'left',
          // },
          // {
          //   field: 'temp',
          //   width: '0px',
          // },
          // ],
        },
        {
          field: 'kpiUnitNm',
          title: this.$t('NLS0000063'), //단위
          width: '50px',
          className: 'left',
        },
        {
          field: 'beforeResultYy',
          title: this.$t('NLS0000308'), //전년실적
          width: '80px',
          className: 'comma right under-line-btn',
          format: 'button',
          cell: FunctionCell,
        },
        {
          title: this.$t('NLS0001044'), //목표설정
          // width: '600px',
          fieldId: 'targetSetting',
          className: 'center',
          children: [
            {
              field: 'threshold',
              title: this.$t('NLS0001260'), //Threshold
              width: '70px',
              className: 'inCell',
              format: '{0:n}',
              // cell: FunctionCell,
            },
            {
              field: 'targetTs',
              title: this.$t('NLS0000310'), //목표
              format: '{0:n}',
              width: '70px',
            },
            {
              field: 'maximum',
              title: this.$t('NLS0001261'), //Maximum
              width: '70px',
              className: 'inCell',
              format: '{0:n}',
              // cell: FunctionCell,
            },
            {
              field: 'targetMboTs',
              title: this.$t('NLS0000311'), //MBO 수정목표
              width: '110px',
              className: 'right comma under-line-btn',
              format: 'button',
              cell: FunctionCell,
            },
            {
              field: 'wtRate',
              className: 'inCell',
              title: this.$t('NLS0000296'), //가중치
              width: '70px',
            },
          ],
        },
        {
          title: this.$t('NLS0001045'), //1차 결재자(담당자) 평가
          // width: '600px',
          fieldId: 'managerEval',
          className: 'center',
          children: [
            {
              field: 'resultTs',
              title: this.$t('NLS0000313'), //실적
              width: '80px',
              className: '{0:n}',
            },
            {
              field: 'kpiRate',
              title: this.$t('NLS0000244'), //달성률
              className: 'font-red',
              width: '80px',
            },
            {
              field: 'sysScore',
              title: this.$t('NLS0000314'), //시스템점수
              width: '100px',
            },
            {
              field: 'selfEstScore',
              className: 'inCell',
              format: '{0:n}',
              title: this.$t('NLS0000315'), //평가점수
              width: '100px',
            },
          ],
        },
        {
          field: 'estScore1',
          className: 'inCell',
          format: '{0:n}',
          title: this.$t('NLS0000316'), //2차 결재가 평가점수
          width: '100px',
        },
        {
          field: 'estScore2',
          className: 'inCell',
          format: '{0:n}',
          title: this.$t('NLS0000317'), //3차 결재자 평가점수
          width: '100px',
        },
        {
          field: 'deleteBtn',
          className: 'center',
          title: this.$t('NLS0000075'), //삭제
          width: '100px',
        },
      ],
    };
  },
  computed: {
    getExcelColumns(state) {
      return state.excelColumns.length > 0
        ? state.excelColumns.splice(0, state.excelColumns.length - 1)
        : [];
    },
    //* [MBO 목록]에서 선택한 MBO정보
    // getSelectedMboInfo() {
    //   return this[mboOperTypes.getters.GET_SELECTED_MBO_INFO];
    // },
    //* MBO 목표수정에서 변경 후 저장한 KPI
    getChangedTargetMboKpi() {
      return this[mboOperTypes.getters.GET_CHANGED_TARGET_MBO_KPI];
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },

    // //* 신규 MBO KPI 항목 추가
    // getIsSelectedNewKpi() {
    //   return this[mboOperTypes.getters.GET_IS_SELECTED_NEW_KPI];
    // },
    getSelectedUserList() {
      //*선택한 사용자
      const param = {
        userList: this[
          commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA
        ],
      };
      return param;
    },
    getSelectedDept() {
      //* 선택한 부서
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    //* 현재 부서 변경시
    getMboCurrInfo() {
      return this[mboOperTypes.getters.GET_MBO_CURR_INFO];
    },
  },
  watch: {
    //* [MBO 목록]에서 선택한 MBO 정보를 DROP DOWN 디폴트값으로 넣어준다.
    // getSelectedMboInfo(value) {
    //   this.defaultMbo = value;
    // },
    getChangedTargetMboKpi(value) {
      const changedKpi = value;
      this.mboCrrList.forEach(element => {
        if (element.kpiId === changedKpi.kpiId) {
          element.changeTarget = true;
        }
      });
    },
    getSelectedUserList: function(value) {
      if (this[mboOperTypes.getters.GET_MBO_BOARD_TAB]) {
        if (value.userList) {
          switch (this.srchAppUserFlag) {
            //* MBO 선정 1차 승인차
            case '31':
              this.$set(this.mboCrrInfo, 'appUserT1', value.userList.userId);
              this.$set(
                this.mboCrrInfo,
                'appUserNameT1',
                value.userList.userName,
              );
              break;
            //* MBO 선정2 차 승인차
            case '32':
              this.$set(this.mboCrrInfo, 'appUserT2', value.userList.userId);
              this.$set(
                this.mboCrrInfo,
                'appUserNameT2',
                value.userList.userName,
              );
              break;
            //* MBO 평가 1차 승인차
            case '41':
              this.$set(this.mboCrrInfo, 'appUserE1', value.userList.userId);
              this.$set(
                this.mboCrrInfo,
                'appUserNameE1',
                value.userList.userName,
              );
              break;
            //* MBO 평가 2차 승인차
            case '42':
              this.$set(this.mboCrrInfo, 'appUserE2', value.userList.userId);
              this.$set(
                this.mboCrrInfo,
                'appUserNameE2',
                value.userList.userName,
              );
              break;
          }
        }
      }
    },
    getSelectedDept: function(value) {
      //* 인사발령 신규추가에서 선택한 부서팝업창
      if (
        this[mboOperTypes.getters.GET_MBO_BOARD_TAB] &&
        this.isSrchDeptFlag &&
        Object.keys(value).length > 0 &&
        value !== undefined
      ) {
        this.mboCrrInfo.newMboUserDeptId = value.deptId;
        this.mboCrrInfo.deptNm = value.deptNm;
      }
      this.isSrchDeptFlag = false;
    },
    getMboCurrInfo(value) {
      if (value.mboCrrInfo) {
        value.mboCrrInfo.idx = value.mboCrrInfo?.idx || 0;
      }
      this[mboOperTypes.actions.INIT_SELECTED_MBO_INFO](value.mboCrrInfo);

      //* 해당 MBO가 변경될떄마다 버튼 및 그리드 안에 기능이 조건에 따라 변경되어야함
      this.initColumns();
      //* 데이터 초기화
      this.initData();
      //* 드랍다운 설정
      this.setMboDropdown(value);

      if (value !== undefined && Object.keys(value).length !== 0) {
        //* 현재일
        const resp = value;
        //* MBO 정보
        this.mboCrrInfo = resp.mboCrrInfo;
        //* MBO 항목(KPI)
        for (let item of resp.mboCrrList) {
          const obj = { ...item };
          obj.inCell = true;
          obj.kpiRate = common.getDemicalPoint(obj.kpiRate, 1);
          obj.sysScore = common.getDemicalPoint(obj.sysScore, 1);
          obj.threshold =
            obj.threshold !== null
              ? common.getDemicalComma(obj.threshold, obj.pointCnt || 0)
              : null;
          obj.maximum =
            obj.maximum !== null
              ? common.getDemicalComma(obj.maximum, obj.pointCnt || 0)
              : null;
          obj.targetTs =
            obj.targetTs !== null
              ? common.getDemicalComma(obj.targetTs, obj.pointCnt || 0)
              : null;
          obj.targetMboTs =
            obj.targetMboTs !== null
              ? common.getDemicalComma(obj.targetMboTs, obj.pointCnt || 0)
              : null;
          obj.resultTs =
            obj.resultTs !== null
              ? common.getDemicalComma(obj.resultTs, obj.pointCnt || 0)
              : null;
          if (common.isEmpty(obj.kpiRate)) {
            if (obj.achMeasure === 'R') {
              //*RANGE일때 (달성률-min)/(max-min)*100 계산식
              const achRateVal = obj.msPer;
              obj.kpiRate = [
                achRateVal,
                common.getAchRateRange(achRateVal, obj.achMin, obj.achMax),
              ];
            }
          }

          this.mboCrrList.push(obj);
        }
        //* 컬럼 세팅
        this.setCoulmCell();
        //* MBO 선정 기간 정보
        this.mboStatus3 = resp.mboStatusList[0];
        //* MBO 평가기간 정보
        this.mboStatus4 = resp.mboStatusList[1];
        //* 평가기간 체크
        this.checkDatePeriod();
        //* 결재자 정보 세팅
        this.mboApprovalInfo = resp.mboLevelInfo;
        this.setMboAprroval(this.mboApprovalInfo);
        //* 신규 인사발령 체크
        this.checkShowNewAppoint();
        //* MBO 평가 의견 세팅
        const mboEstInfoMap = resp.mboEstInfoMap;
        if (mboEstInfoMap.myEComment !== undefined) {
          this.myEComment = mboEstInfoMap.myEComment;
        }
        if (mboEstInfoMap.estComment1 !== undefined) {
          this.estComment1 = mboEstInfoMap.estComment1;
        }
        if (mboEstInfoMap.estComment2 !== undefined) {
          this.estComment2 = mboEstInfoMap.estComment2;
        }

        //this.estComment1 = this.mboEstInfoMap.estComment1;
        //this.estComment2 = this.mboEstInfoMap.estComment2;
        // TODO 권한별 코멘트 disable
        this.setCommentYn();
        //* MBO 드롭다운 세팅
      }
    },
  },
  created() {
    this.initColumns();
    this.init();
  },
  beforeDestroy() {
    //* 컴포넌트 소멸 시, selected mbo info 초기화
    this[mboOperTypes.actions.INIT_SELECTED_MBO_INFO]({});
  },
  methods: {
    initData() {
      this.mboMboStepList = common.getCodeList('MBO004');
      this.defaultMboStep = this.mboMboStepList[0];
      this.addNewMbo = false;
      this.isAllowPeriod = false;
      this.mboCrrList = [];
      this.currDate = timezone.convertToString(new Date());
      //* 초기화
      this.invalidFlag = false;
      //* MBO 드롭다운 허용
      this.isMboDropDownDisable = false;
      this.myEComment = '';
      this.estComment1 = '';
      this.estComment2 = '';
      this.mboCrrInfo = {};
      this.mboApprovalInfo = [];
      this.mboStatus3 = {}; // MBO 선정기간 정보
      this.mboStatus4 = {}; //MBO 평가기간 정보
      this.isShowaddUserT1 = false;
      this.isShowaddUserT2 = false;
      this.isShowaddUserE1 = false;
      this.isShowaddUserE2 = false;
    },
    initColumns() {
      this.columnsA = [
        { field: 'bscNm', title: 'BSC', width: '90px', className: 'left' }, // BSC
        {
          title: this.$t('NLS0001043'), //MBO항목
          // width: '700px',
          fieldId: 'mboItems',
          //headerCell: HeaderCell,
          children: [
            {
              field: 'kpiNm',
              title: 'KPI',
              width: '330px',
              format: 'button',
              className: 'left under-line-btn',
              cell: FunctionCell,
            },
            {
              field: 'kpiUnitNm',
              title: this.$t('NLS0000063'), //단위
              width: '60px',
              className: 'left',
            },
            {
              field: 'beforeResultYy',
              title: this.$t('NLS0000308'), //전년실적
              width: '110px',
              className: 'comma right under-line-btn',
              format: 'button',
              cell: FunctionCell,
            },
          ],
        },

        {
          title: this.$t('NLS0001044'), //목표설정
          // width: '600px',
          fieldId: 'targetSetting',
          children: [
            {
              field: 'threshold',
              title: this.$t('NLS0001260'), //Threshold 최소치
              width: '110px',
              className: 'inCell',
              format: '{0:n}',
              // cell: FunctionCell,
            },
            {
              field: 'targetTs',
              title: this.$t('NLS0000310'), //목표
              format: '{0:n}',
              width: '110px',
            },
            {
              field: 'maximum',
              title: this.$t('NLS0001261'), //Maximum 최대치
              width: '110px',
              className: 'inCell',
              format: '{0:n}',
              // cell: FunctionCell,
            },
            {
              field: 'targetMboTs',
              title: this.$t('NLS0000311'), //MBO 수정목표
              width: '110px',
              className: 'right comma under-line-btn',
              format: 'button',
              cell: FunctionCell,
            },
            {
              field: 'wtRate',
              className: 'inCell',
              title: this.$t('NLS0000296'), //가중치
              width: '70px',
            },
          ],
        },
        {
          title: this.$t('NLS0001045'), //1차 결재자(담당자) 평가
          // width: '600px',
          fieldId: 'managerEval',
          children: [
            {
              field: 'resultTs',
              title: this.$t('NLS0000313'), //실적
              width: '110px',
              className: '{0:n}',
            },
            {
              field: 'kpiRate',
              title: this.$t('NLS0000244'), //달성률
              className: 'hms-mbo-per size',
              width: '60px',
              format: 'progress',
              cell: FunctionCell,
            },
            {
              field: 'sysScore',
              title: this.$t('NLS0000314'), //시스템점수
              width: '83px',
            },
            {
              field: 'selfEstScore',
              className: 'inCell',
              format: '{0:n}',
              title: this.$t('NLS0000315'), //평가점수
              width: '70px',
            },
          ],
        },
        {
          field: 'estScore1',
          className: 'inCell',
          format: '{0:n}',
          title: this.$t('NLS0000316'), //2차 결재자 평가점수
          width: '100px',
          headerCell: HeaderHtmlCell,
        },
        {
          field: 'estScore2',
          className: 'inCell',
          format: '{0:n}',
          title: this.$t('NLS0000317'), //3차 결재자 평가점수
          width: '100px',
          headerCell: HeaderHtmlCell,
        },
        {
          field: 'deleteBtn',
          className: 'center',
          title: this.$t('NLS0000075'), //삭제
          cell: FunctionCell,
          width: '210px',
        },
        {
          field: 'temp',
          title: ' ',
        },
      ];
    },
    async init() {
      //최초 생성 시
      //* Login한 사용자 정보
      this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      await this[mboOperTypes.actions.FETCH_MBO_CURR_INFO]({});
      // //* mbo 항목에서 선택된 mbo 정보 불러오기
      // if (this[mboOperTypes.getters.GET_SELECTED_MBO_INFO].mboEvalId) {
      //   const param = {
      //     baseYYYY: this[mboOperTypes.getters.GET_SELECTED_MBO_INFO].baseYYYY,
      //     mboEvalId: this[mboOperTypes.getters.GET_SELECTED_MBO_INFO].mboEvalId,
      //     mboUserId: this[mboOperTypes.getters.GET_SELECTED_MBO_INFO].mboUserId,
      //     mboUserDeptId: this[mboOperTypes.getters.GET_SELECTED_MBO_INFO]
      //       .mboUserDeptId,
      //     mboEvalNm: this[mboOperTypes.getters.GET_SELECTED_MBO_INFO].mboEvalNm,
      //   };
      //   await this[mboOperTypes.actions.FETCH_MBO_CURR_INFO](param);
      //   this.defaultMbo = param;
      // } else {
      //   //* 로그인한 사용자의 mbo 정보 불러오기
      //   await this[mboOperTypes.actions.FETCH_MBO_CURR_INFO]({});
      // }
    },
    //* inCell  여부 설정 & header btn 추가설정
    setCoulmCell() {
      //let colums = [];
      //* 평가기간 OPEN일떄
      // if (this.mboCrrInfo.evalStatus === '131') {
      for (let item of this.columnsA) {
        //* 오브젝트 copy;
        if (item.field == undefined) {
          //* MBO 항목 검색버튼 (피평자가 && MBO 선정 기간일떄 && 평가기간)
          if (item.fieldId === 'mboItems') {
            if (
              this.mboCrrInfo.mboUserId == this.loginUserInfo.userId &&
              this.mboCrrInfo.mbostatus === 'R1' &&
              this.mboCrrInfo.evalStatus === '131' &&
              !this.addNewMbo
            ) {
              item.headerCell = HeaderCell;
            }
          } else if (item.fieldId === 'targetSetting') {
            for (let item2 of item.children) {
              //* 가중치(피평자가 && MBO 선정 기간일떄)
              //* ThresHold (피평가자&& 로그인 유저 직급이 팀장 혹은 임원 && MBO 선정기간)
              if (item2.field == 'threshold' || item2.field == 'maximum') {
                if (
                  this.mboCrrInfo.evalType != '0' &&
                  this.mboCrrInfo.mboUserId == this.loginUserInfo.userId &&
                  this.mboCrrInfo.mbostatus === 'R1' &&
                  this.mboCrrInfo.evalStatus === '131'
                ) {
                  item2.inCell = true;
                }
              }
              //* 가중치 컬럼 설정
              if (item2.field == 'wtRate') {
                if (
                  this.mboCrrInfo.mboUserId === this.loginUserInfo.userId &&
                  this.mboCrrInfo.mbostatus === 'R1' &&
                  this.mboCrrInfo.evalStatus === '131'
                ) {
                  item2.inCell = true;
                }
              }
              //* MBO 수정 목표 팝업
              // else if (item2.field == 'targetMboTs') {
              //   if (this.mboCrrInfo.evalStatus === '131') {
              //     item2.cell = FunctionCell;
              //   }
              // }
              //colums.push(item2);
            }
          } else if (item.fieldId == 'managerEval') {
            for (let item2 of item.children) {
              if (item2.field == 'selfEstScore') {
                //* 평가점수
                if (
                  this.mboCrrInfo.mboUserId == this.loginUserInfo.userId &&
                  this.mboCrrInfo.mbostatus === 'E1' &&
                  this.mboCrrInfo.evalStatus === '131'
                ) {
                  item2.inCell = true;
                  this.inCellAutoSave = false;
                }
              }
              //colums.push(item2);
            }
          }
          //colums.push(item);
          // item.children = children;
        } else {
          //* field가 있는 header
          //* 1차 평가점수
          if (item.field == 'estScore1') {
            if (
              this.mboCrrInfo.appUserE1 === this.loginUserInfo.userId &&
              this.mboCrrInfo.mbostatus === 'B2' &&
              this.mboCrrInfo.evalStatus === '131'
            ) {
              this.inCellAutoSave = false;
              item.inCell = true;
            }
          }
          //* 2차 평가점수
          else if (item.field == 'estScore2') {
            if (
              this.mboCrrInfo.appUserE2 == this.loginUserInfo.userId &&
              this.mboCrrInfo.mbostatus === 'B2' &&
              this.mboCrrInfo.evalStatus === '131'
            ) {
              this.inCellAutoSave = false;
              item.inCell = true;
            }
            //* 삭제버튼
          } else if (item.field === 'deleteBtn') {
            if (
              this.mboCrrInfo.mboUserId === this.loginUserInfo.userId &&
              this.mboCrrInfo.mbostatus === 'R1' &&
              this.mboCrrInfo.evalStatus === '131'
            )
              item.format = 'deleteBtn';
          }
          //colums.push(item);
        }
      }
      //this.$set(this.columnsA, colums);
    },
    //* 평가 ediotr ON/OFF 설정
    setCommentYn() {
      this.myECommentYn = true;
      this.estComment1Yn = true;
      this.estComment2Yn = true;

      const mboStatus = this.mboCrrInfo.mbostatus;
      //* 본인 === 피평가자
      if (this.mboCrrInfo.mboUserId === this.loginUserInfo.userId) {
        //* 선정 및 평가 승인요청 버튼 활성화
        if (mboStatus === 'R1' || mboStatus === 'E1') this.myECommentYn = false;
      } else {
        //* MBO 선정 버튼 활성화
        if (mboStatus === 'A2') {
          if (this.mboCrrInfo.appUserT1 === this.loginUserInfo.userId)
            this.estComment1Yn = false;
          if (this.mboCrrInfo.appUserT2 === this.loginUserInfo.userId)
            this.estComment2Yn = false;
        } else if (mboStatus === 'B2') {
          if (this.mboCrrInfo.appUserE1 === this.loginUserInfo.userId)
            this.estComment1Yn = false;

          if (this.mboCrrInfo.appUserE2 === this.loginUserInfo.userId)
            this.estComment2Yn = false;
        }
      }
    },
    onBtn(target) {
      switch (target) {
        case '1':
          this.accordion1 = !this.accordion1;
          break;
        case '2':
          this.accordion2 = !this.accordion2;
          break;
        case '3':
          this.accordion3 = !this.accordion3;
          break;
      }
    },
    onNewMboAppoint() {
      // 기존에 등록된 결재 평가자 항목과 MBO항목, 평가 의견 항목이 모두 초기화됩니다. 계속 진행하시겠습니까?
      // 수정-> 변경된 조직의 MBO를 추가로 생성합니다. 계속 진행하시겠습니까?
      common.confirm('NLS0001041', () => {
        //* 신규 인사발령 여부 체크
        this.addNewMbo = !this.addNewMbo;

        //* 결제 라인 초기화

        //* MBO 선정 본인 대기
        this.mboCrrInfo.myTStatus = this.$t('NLS0001042');

        //* MBO 선정 1차 결재자
        this.mboCrrInfo.appUserNameT1 = '';
        if (this.mboCrrInfo.apvStatusT1)
          this.mboCrrInfo.apvStatusT1 = this.$t('NLS0001042');

        //* MBO 선정 2차 결재자
        this.mboCrrInfo.appUserNameT2 = '';
        if (this.mboCrrInfo.apvStatusT2)
          this.mboCrrInfo.apvStatusT2 = this.$t('NLS0001042');

        //* MBO 평가 본인 대기
        this.mboCrrInfo.myEStatus = this.$t('NLS0001042');

        //* MBO 평가 1차 결재자
        this.mboCrrInfo.appUserNameE1 = '';
        if (this.mboCrrInfo.apvStatusE1)
          this.mboCrrInfo.apvStatusE1 = this.$t('NLS0001042');

        //* MBO 평가 2차 결재자
        this.mboCrrInfo.appUserNameE2 = '';
        if (this.mboCrrInfo.apvStatusE2)
          this.mboCrrInfo.apvStatusE2 = this.$t('NLS0001042');

        //* 결재자 정보 세팅
        this.setMboAprroval(this.mboApprovalInfo);

        this.isMboDropDownDisable = true;
        //* MBo 항목 초기화
        this.mboCrrList = [];

        //* 평가 의견 초기화
        this.myEComment = '';
        this.estComment1 = '';
        this.estComment2 = '';

        //* 인사발령 추가 버튼 OFF
        this.isShowNewAppoint = false;
      });
    },
    //* 사용자조회 팝업 (mbo현황 승인자 추가, mbo목록 담당자 조회)
    openUserSearchPop(srchAppUserFlag) {
      let params = {
        srchNotUser: 'USER',
        srchDeptId: '',
      };

      this.srchAppUserFlag = srchAppUserFlag;
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      if (
        srchAppUserFlag === 'srchUser' &&
        this.loginUserInfo.userType === 'MANAGER'
      ) {
        params.srchDeptId = this.loginUserInfo.deptId;
      }
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](params);
    },
    //* MBO 항목 검색 기능
    onClickHeader() {
      if (this.addNewMbo) {
        // 임시저장을 한 후 MBO 항목을 추가하셔야합니다.
        common.alert('warning', 'NLS0001040');
      } else {
        const links = this.$refs.links;
        links.setAttribute(
          'href',
          `/redirectForm?path=kpiTargetEstablishment&auth=${this.$route.params.auth}&baseYyyy=${this.mboCrrInfo.baseYyyy}`,
        );
        links.setAttribute('target', '_blank');
        links.click();

        // const param = {
        //   baseYYYY: this.currDate.substr(0, 4),
        //   userId: this.mboCrrInfo.mboUserId, //* 현재 선택된 MBO 피평가자의 ID
        //   deptId: this.mboCrrInfo.mboUserDeptId, //* 현재 선택된 피평가자의 부서 ID
        // };
        // //this[mboOperTypes.actions.INIT_IS_SELECTED_NEW_KPI](false);
        // this[mboOperTypes.actions.FETCH_MBO_KPI_POOL_LIST](param);
        // this[mboOperTypes.actions.INIT_VIEWS_MBO_KPI_POPUP](true);
      }
    },
    onSum(result, field) {
      if (field === 'wtRate') {
        this.wtRateSum = result;
        if (this.wtRateSum === 100) {
          this.invalidFlag = false;
        }
        // if (result > 100) common.alert('warning', 'NLS0001035');
      }
    },
    //* MBO 임시저장
    onMboSave() {
      //* 평가점수 설정
      this.setEstScore();
      //* 유효성 체크
      this.checkInvalid('SAVE');
      //* 팀장, 임원의 경우만 최소치 최대치 범위 체크
      // if (
      //   this.loginUserInfo.userType === 'MANAGER' ||
      //   this.loginUserInfo.userType === 'DIRECTOR'
      // )
      //   this.isValidRange();

      if (this.invalidFlag) {
        common.alert('warning', this.invalidMessage);
      } else {
        common.confirm('NLS0001311', async () => {
          //* 입력값 캐스팅 (String => int)
          const tempMboCrrList = this.setCastStringToInt();
          const param = {
            addNewMbo: this.addNewMbo,
            baseYYYY: this.mboCrrInfo.baseYyyy,
            mboEvalId: this.mboCrrInfo.mboEvalId,
            mboUserId: this.mboCrrInfo.mboUserId,
            mboUserDeptId: this.mboCrrInfo.mboUserDeptId,
            //* MBO 선정 1차 승인자
            appUserT1: this.mboCrrInfo.appUserT1,
            //* MBO 선정 2차 승인자
            appUserT2: this.mboCrrInfo.appUserT2,
            //* MBO 평가 1차 승인자
            appUserE1: this.mboCrrInfo.appUserE1,
            //* MBO 평가 2차 승인자
            appUserE2: this.mboCrrInfo.appUserE2,
            //* 현재 MBO 진행 상태
            mboStatus: this.mboCrrInfo.mbostatus,
            mboCrrList: tempMboCrrList,
          };

          //* 신규 인사발령 이면 변경할 부서 추가
          if (this.addNewMbo) {
            param.newMboUserDeptId = this.mboCrrInfo.newMboUserDeptId;
            param.annDate = this.currDate;
            param.userRank = this.mboCrrInfo.userRank;
          }
          //* 평가의견 설정
          if (!this.myECommentYn) param.estComment = this.myEComment;
          if (!this.estComment1Yn) param.estComment = this.estComment1;
          if (!this.estComment2Yn) param.estComment = this.estComment2;

          const returnData = await this[mboOperTypes.actions.SAVE_MBO](param);
          if (returnData.result === 'T') {
            common.alert('success', 'NLS0000012');
            if (this.addNewMbo) {
              //* 현재 MBO 부서 정보 변경
              param.mboUserDeptId = this.mboCrrInfo.newMboUserDeptId;
              // this
              // this.addNewMbo = false;
              // this.isMboDropDownDisable = false;
            }
            //* 데이터 갱신
            this.renewMboInfo(param);
          }
        });
      }
    },
    onDeptSearch() {
      //* 신규 인사발령을 통해 해당 팝업을 OPEN
      this.isSrchDeptFlag = true;
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    isShowTempSaveBtn() {
      if (this.addNewMbo) return true;
      /*
       * 1. 로그인한 사용자와 === 현재 불러온 MBO 피평가자가
       * 2. KPI 선정 날짜 지나면안됨
       */
      return (
        (this.mboCrrInfo.mbostatus === 'R1' ||
          this.mboCrrInfo.mbostatus === 'E1' ||
          this.mboCrrInfo.mbostatus === 'A2' ||
          this.mboCrrInfo.mbostatus === 'B2') &&
        this.mboCrrInfo.evalStatus === '131' &&
        this.mboCrrInfo.mbotargetopen
      );
      // return (
      //   this.loginUserInfo.userId === this.mboCrrInfo.mboUserId &&
      //   (this.mboCrrInfo.mbostatus === 'R1' ||
      //     this.mboCrrInfo.mbostatus === 'E1')
      // );
    },
    //* 전년실적 컬럼클릭
    async onBtnClick(item, value, field) {
      //* KPI 실적 보고 팝업
      if (field === 'kpiNm') {
        // mbo 평가년도 전달
        // const {
        //   mboCrrInfo: { baseYyyy },
        // } = this.getMboCurrInfo;
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
        // this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_REPORT_LIST](param);
      }

      if (field === 'beforeResultYy') {
        //* 작년 = 현재가져온 MBO의 기준년도 -1
        const lastYear = this.mboCrrInfo.baseYyyy - 1;
        //* 공통쪽 저장
        this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](lastYear);
        let param = {
          kpiId: item.kpiId,
          searchFromYyyymm:
            this[commonTypes.getters.GET_SELECTED_YEAR_DATA] + '01',
          searchToYyyymm:
            this[commonTypes.getters.GET_SELECTED_YEAR_DATA] + '12',
        };
        //*선택한 kpi정보 세팅
        this[kpiPerformanceTypes.actions.INIT_SELECTED_ANALY_KPI_INFO_DATA]({
          kpiId: item.kpiId,
          kpiNm: item.kpiNm,
        });
        this[kpiPerformanceTypes.actions.INIT_KPI_TARGET_MONTH_LIST]([]);
        this[kpiPerformanceTypes.actions.FETCH_KPI_TARGET_MONTH_LIST](param);
        this[kpiPerformanceTypes.actions.INIT_VIEWS_ANALYSIS_POP](true);
      } else if (field === 'targetMboTs') {
        //* 현재년도로 세팅
        this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](
          this.mboCrrInfo.baseYyyy,
        );
        this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](
          timezone.getClientDate('MM'),
        );
        //* 수정목표 팝업 오픈
        let param = {
          field: 'targetMYy',
          kpiId: item.kpiId,
          mboAppYn: item.mboAppYn,
          baseYyyy: this.mboCrrInfo.baseYyyy,
          baseYyyyMm: String(this.mboCrrInfo.baseYyyy + this.getSelectedMonth),
          baseMm: String(this.getSelectedMonth),
        };

        //*선택한날짜 세팅
        this[
          kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_YEAR_DATA
        ](this.getSelectedYear);
        this[
          kpiTargetEstablishmentTypes.actions.INIT_REG_GOAL_SELECTED_MONTH_DATA
        ](this.getSelectedMonth);

        //*목표데이터 리스트 조회(년,월,주)
        this[kpiTargetEstablishmentTypes.actions.FETCH_REG_GOAL_KPI_DATA_SET](
          param,
        );
        //* 선택한 MBO / KPI 정보 저장
        this[mboOperTypes.actions.INIT_SELECTED_TARGET_MBO_KPI]({
          kpiId: item.kpiId,
          threshold: item.threshold,
          maximum: item.maximum,
          baseYYYY: this.mboCrrInfo.baseYyyy,
          mboEvalId: item.mboEvalId,
          mboStatus: this.mboCrrInfo.mbostatus,
          mboUserId: this.mboCrrInfo.mboUserId,
          mboUserDeptId: this.mboCrrInfo.mboUserDeptId,
        });

        //* 팝업창
        this[mboOperTypes.actions.INIT_VIEWS_MBO_MODIFY_TARGET_POP](true);
      } else if (field === 'deleteBtn') {
        common.confirm('NLS0001146', async () => {
          item.baseYYYY = this.mboCrrInfo.baseYyyy;
          item.mboEvalId = this.mboCrrInfo.mboEvalId;
          item.mboUserId = this.mboCrrInfo.mboUserId;
          item.mboUserDeptId = this.mboCrrInfo.mboUserDeptId;
          item.mboYn = 'N';
          const data = await this[mboOperTypes.actions.DELETE_MBO_KPI](item);
          if (data.result === 'T') {
            this.renewMboInfo(item);
            //* 삭제되었습니다.
            common.alert('success', 'NLS0000002');
          }
        });
      }
    },
    //* 해당년도 defalut
    setMboDropdown(resp) {
      if (resp.mboDropdownList === undefined) {
        return [];
      } else {
        const dropDownList = resp.mboDropdownList.reduce((acc, cur, idx) => {
          const dropDown = {
            baseYYYY: cur.baseYyyy,
            mboEvalNm: cur.mboEvalNm,
            mboEvalId: cur.mboEvalId,
            mboUserId: cur.mboUserId,
            mboUserDeptId: cur.mboUserDeptId,
            idx,
          };
          acc.push(dropDown);
          return acc;
        }, []);

        this.mboDropdownList = dropDownList;
        const selectedMbo = this[mboOperTypes.getters.GET_SELECTED_MBO_INFO];
        if (!common.isEmpty(selectedMbo)) {
          this.defaultMbo = selectedMbo;
        } else {
          this.defaultMbo = dropDownList[0];
        }

        // this.defaultMbo = this.mboDropdownList[0];
      }
    },
    //* MBO 명 드롭다운 이벤트
    onChange(e) {
      const param = {
        baseYYYY: e.value.baseYYYY,
        mboEvalId: e.value.mboEvalId,
        mboEvalNm: e.value.mboEvalNm,
        mboUserId: e.value.mboUserId,
        mboUserDeptId: e.value.mboUserDeptId,
        idx: e.value.idx || 0,
      };
      // this[mboOperTypes.actions.INIT_SELECTED_MBO_INFO](param);
      this[mboOperTypes.actions.FETCH_MBO_CURR_INFO](param);
    },
    //* 인사발령 신규추가 버튼 ON/OFF
    checkShowNewAppoint() {
      //* 피평가자 && 승인요청 단계 && 평가기간 OPEN
      if (
        this.mboCrrInfo.mboUserId === this.loginUserInfo.userId &&
        //this.mboCrrInfo.mbostatus === 'R1'
        this.mboCrrInfo.evalStatus === '131'
      )
        this.isShowNewAppoint = true;
      else this.isShowNewAppoint = false;
    },
    setMboAprroval(mboApprovalInfo) {
      //* 초기화
      this.isShowaddUserT1 = false;
      this.isShowaddUserT2 = false;
      this.isShowaddUserE1 = false;
      this.isShowaddUserE2 = false;

      //* MBO 항목 설정
      //* 신규인사발령 이거나 || 피평가자 본인만 가능 && MBO 선정기간일 경우
      if (
        this.addNewMbo ||
        (this.loginUserInfo.userId === this.mboCrrInfo.mboUserId &&
          this.mboCrrInfo.mbostatus === 'R1' &&
          this.mboCrrInfo.evalStatus === '131')
      ) {
        const mboKpiAprLevel = mboApprovalInfo[0];
        if (mboKpiAprLevel.stepLevel === 2) this.isShowaddUserT1 = true;
        if (mboKpiAprLevel.stepLevel === 3) {
          this.isShowaddUserT1 = true;
          this.isShowaddUserT2 = true;
        }
        //* MBO 평가 설정
        const mboEvalLevel = mboApprovalInfo[1];
        if (mboEvalLevel.stepLevel === 2) this.isShowaddUserE1 = true;
        if (mboEvalLevel.stepLevel === 3) {
          this.isShowaddUserE1 = true;
          this.isShowaddUserE2 = true;
        }
      }
    },
    setEstScore() {
      //* MBO 항목 평가점수 설정 (현재 MBO 평가 단계일때 평가점수 = 본인의 점수 )
      //* 피평자가 본인이면
      if (this.mboCrrInfo.mbostatus === 'E1') {
        this.mboCrrList = this.mboCrrList.map(item => {
          item.estScore = item.selfEstScore;
          return item;
        });
      } else if (this.mboCrrInfo.mbostatus === 'B2') {
        //* 1차 승인자 === 본인
        if (this.mboCrrInfo.appUserE1 === this.loginUserInfo.userId) {
          this.mboCrrList = this.mboCrrList.map(item => {
            item.estScore = item.estScore1;
            return item;
          });
        }
        //* 2차 승인자 === 본인
        else if (this.mboCrrInfo.appUserE2 === this.loginUserInfo.userId) {
          this.mboCrrList = this.mboCrrList.map(item => {
            item.estScore = item.estScore2;
            return item;
          });
        }
      }
    },
    setCastStringToInt() {
      const tempMboCrrList = this.mboCrrList.map(item => {
        //최소치 int화 및 유호 소수점으로 변경
        if (!common.isEmpty(item.threshold)) {
          const tmp =
            typeof item.threshold === 'string'
              ? item.threshold.split(',').join('')
              : item.threshold;
          item.threshold = common.getDemicalPoint(
            Number(tmp),
            item.pointCnt || 0,
          );
        } else {
          item.threshold = null;
        }
        //최대치 int화 및 유호 소수점으로 변경
        if (!common.isEmpty(item.maximum)) {
          // item.maximum = Number(item.maximum);
          const tmp =
            typeof item.maximum === 'string'
              ? item.maximum.split(',').join('')
              : item.maximum;
          item.maximum = common.getDemicalPoint(
            Number(tmp),
            item.pointCnt || 0,
          );
        } else {
          item.maximum = null;
        }
        if (!common.isEmpty(item.estScore)) {
          item.estScore = Number(item.estScore);
        } else {
          item.estScore = null;
        }
        if (!common.isEmpty(item.wtRate)) {
          item.wtRate = Number(item.wtRate);
        } else {
          item.wtRate = null;
        }
        // if (item.targetMboTs !== undefined && item.targetMboTs !== '') {
        //   item.targetMboTs = Number(item.targetMboTs);
        // }
        return item;
      });
      return tempMboCrrList;
    },
    isValidRange() {
      // 최소치는 목표값의 80%값부터 목표값까지 입력가능
      // 최대치는 목표값부터 목표값의 120%까지 입력가능
      // 최소치 최대치는 목표값으로부터 같은 비율값으로 설정되어야 함(예: 최대치가 +20%이면, 최소치는 -20%)
      for (const el of this.mboCrrList) {
        let { threshold, maximum, targetTs, kpiAchType } = { ...el };
        //* 최소치, 최대치 중 한 값이 빈값일 때
        if (
          (!common.isEmpty(threshold) && common.isEmpty(maximum)) ||
          (common.isEmpty(threshold) && !common.isEmpty(maximum))
        ) {
          this.setInvalidRange();
          // * 두 값 모두 빈값이 아닐 때,
        } else if (!common.isEmpty(threshold) && !common.isEmpty(maximum)) {
          threshold = Number(threshold.split(',').join(''));
          maximum = Number(maximum.split(',').join(''));
          targetTs = Number(targetTs.split(',').join(''));

          //* 1. 증가형일 때
          if (kpiAchType === '44') {
            // 1-1. 최소 최대 비교
            if (threshold > maximum) {
              this.setInvalidRange();
              break;
            }
            // 1-2. 목표대비 값 비교
            const minValid = Number((targetTs - targetTs * 0.2).toFixed(3));
            const maxValid = Number((targetTs + targetTs * 0.2).toFixed(3));
            if (
              threshold < minValid ||
              threshold > targetTs ||
              maximum > maxValid ||
              maximum < targetTs
            ) {
              this.setInvalidRange();
              break;
            }
            //* 2. 감소형일 때
          } else if (kpiAchType === '45') {
            // 2-1. 최소 최대 비교
            if (threshold < maximum) {
              this.setInvalidRange();
              break;
            }
            // 2-2. 목표대비 값 비교
            const minValid = Number(
              (targetTs + Math.abs(targetTs * 0.2)).toFixed(3),
            );
            const maxValid = Number(
              (targetTs - Math.abs(targetTs * 0.2)).toFixed(3),
            );
            if (
              threshold > minValid ||
              threshold < targetTs ||
              maximum < maxValid ||
              maximum > targetTs
            ) {
              this.setInvalidRange();
              break;
            }
          }
          //* 3. 퍼센테이지 비교
          if (
            Number((threshold - targetTs).toFixed(12)) !==
            Number((targetTs - maximum).toFixed(12))
          ) {
            this.setInvalidRange();
            break;
          }
        }
      }
    },
    setInvalidRange() {
      this.invalidFlag = true;
      this.invalidMessage = 'NLS0001429'; //최소치, 최대치가 입력조건에 맞지 않습니다.
    },
    //* 승인요청, 승인 ,반려  처리
    updateMboApvStatus(apvStatus, confirmMessage, status) {
      // mbo 목표 값 존재 여부 체크
      const hasEmptyTarget = this.mboCrrList.some(
        el =>
          el.targetTs === null ||
          el.targetTs === '' ||
          el.targetTs == undefined,
      );
      if (hasEmptyTarget) {
        //MBO 목표 입력이 누락되었습니다.
        common.alert('warning', 'NLS0001426');
        return;
      }
      //* 피평가자 승인요청이라면 데이터 저장을 위해서 유효성 체크
      this.setEstScore();
      this.checkInvalid('UPDATE');

      //* 팀장, 임원의 경우만 최소치 최대치 범위 체크
      if (
        this.mboCrrInfo.evalType !== '0' &&
        status !== undefined &&
        status === 'R1'
      ) {
        this.isValidRange();
      }

      //* 평가점수 입력 유효성 체크
      this.checkEstScoreInvalid(apvStatus);
      if (this.invalidFlag) {
        common.alert('warning', this.invalidMessage);
      } else {
        common.confirm(confirmMessage, async () => {
          //* 본인 평가 점수 설정

          //* KPI 그리드 데이터 String to INT
          const tempMboCrrList = this.setCastStringToInt();

          //* 전송 파라미터
          const param = {
            baseYYYY: this.mboCrrInfo.baseYyyy,
            mboEvalId: this.mboCrrInfo.mboEvalId,
            mboUserId: this.mboCrrInfo.mboUserId,
            mboUserDeptId: this.mboCrrInfo.mboUserDeptId,
            mboEvalNm: this.mboCrrInfo.mboEvalNm,
            //* 현재 MBO 진행 상태
            mboStatus: this.mboCrrInfo.mbostatus,
            mboCrrList: tempMboCrrList,
            apvStatus: apvStatus,
            mboApprovalInfo: this.mboApprovalInfo,
            //* MBO 선정 1차 승인자
            appUserT1: this.mboCrrInfo.appUserT1,
            //* MBO 선정 2차 승인자
            appUserT2: this.mboCrrInfo.appUserT2,
            //* MBO 평가 1차 승인자
            appUserE1: this.mboCrrInfo.appUserE1,
            //* MBO 평가 2차 승인자
            appUserE2: this.mboCrrInfo.appUserE2,
          };
          //* 반려일떄 mboAppYn = 'N'
          param.mboAppYn = apvStatus === '197' ? 'N' : 'Y';

          //* 평가의견 설정
          if (!this.myECommentYn) param.estComment = this.myEComment;
          if (!this.estComment1Yn) param.estComment = this.estComment1;
          if (!this.estComment2Yn) param.estComment = this.estComment2;

          const returnData = await this[
            mboOperTypes.actions.UPDATE_MBO_APV_STATUS
          ](param);

          if (returnData.result === 'T') {
            var successMsg = '';
            // 승인요청을 완료하였습니다.
            if (apvStatus === '145') successMsg = 'NLS0001036';
            // 승인 하였습니다.
            else if (apvStatus === '196') successMsg = 'NLS0001038';
            // 반려 하였습니다.
            else if (apvStatus === '197') successMsg = 'NLS0001037';
            common.alert('success', successMsg);
            //* 갱신
            this.renewMboInfo(param);
          }
        });
      }
    },
    //* MBO 목표 수정 승인요청 ,승인, 반려
    updateMboTargetStatus(apvStatus, confirmMessage) {
      // mbo 수정 목표 값 존재 여부 체크
      // const hasEmptyTarget = this.mboCrrList.some(
      //   el =>
      //     el.targetMboTs === null ||
      //     el.targetMboTs === '' ||
      //     el.targetMboTs == undefined,
      // );
      // if (hasEmptyTarget) {
      //   //MBO수정목표 값이 누락되었습니다.
      //   common.alert('warning', 'NLS0001427');
      //   return;
      // }
      if (this.invalidFlag) {
        common.alert('warning', this.invalidMessage);
      } else {
        common.confirm(confirmMessage, async () => {
          //* 본인 평가 점수 설정
          this.setEstScore();

          //* KPI 그리드 데이터 String to INT
          const tempMboCrrList = this.setCastStringToInt();

          //* 전송 파라미터
          const param = {
            baseYYYY: this.mboCrrInfo.baseYyyy,
            mboEvalId: this.mboCrrInfo.mboEvalId,
            mboUserId: this.mboCrrInfo.mboUserId,
            mboUserDeptId: this.mboCrrInfo.mboUserDeptId,
            mboEvalNm: this.mboCrrInfo.mboEvalNm,
            //* 현재 MBO 진행 상태
            mboCrrList: tempMboCrrList,
            apvStatus: apvStatus,
            //* MBO 1차평가자
            appUserE1: this.mboCrrInfo.appUserE1,
          };

          const returnData = await this[
            mboOperTypes.actions.UPDATE_MBO_TARGET_STATUS
          ](param);

          if (returnData.result === 'T') {
            var successMsg = '';
            if (apvStatus === '145')
              // '승인요청을 완료하였습니다'
              successMsg = 'NLS0001036';
            // 승인 하였습니다.
            else if (apvStatus === '196') successMsg = 'NLS0001038';
            // 반려 하였습니다.
            else if (apvStatus === '197') successMsg = 'NLS0001037';
            common.alert('success', successMsg);
            this.renewMboInfo(param);
          }
        });
      }
    },
    checkInvalid(type) {
      //* 신규 인사발령시 유효성 체크
      this.invalidFlag = false;

      if (this.addNewMbo) {
        if (
          this.mboCrrInfo.mboUserDeptId === this.mboCrrInfo.newMboUserDeptId ||
          this.mboCrrInfo.newMboUserDeptId == undefined
        ) {
          this.invalidFlag = true;
          this.invalidMessage = '피평가자 부서를 변경하여야합니다';
        }
      }

      //* 기존 유효성 체크
      if (this.mboCrrInfo.appUserE1 === this.mboCrrInfo.appUserE2) {
        this.invalidFlag = true;
        this.invalidMessage = 'NLS0001255'; //MBO 평가 1차승인자 2차 승인자가 같습니다.
      }
      if (this.mboCrrInfo.appUserT1 === this.mboCrrInfo.appUserT2) {
        this.invalidFlag = true;
        this.invalidMessage = 'NLS0001256'; //MBO 선정 1차승인자 2차 승인자가 같습니다.
      }

      if (
        this.isShowaddUserE2 &&
        common.isEmpty(this.mboCrrInfo.appUserNameE2)
      ) {
        this.invalidFlag = true;
        this.invalidMessage = 'NLS0001251'; //MBO 평가 2차승인자를 지정해주십시오
      }
      if (
        this.isShowaddUserE1 &&
        common.isEmpty(this.mboCrrInfo.appUserNameE1)
      ) {
        this.invalidFlag = true;
        this.invalidMessage = 'NLS0001252'; //MBO 평가 1차승인자를 지정해주십시오
      }
      if (
        this.isShowaddUserT2 &&
        common.isEmpty(this.mboCrrInfo.appUserNameT2)
      ) {
        this.invalidFlag = true;
        this.invalidMessage = 'NLS0001253'; //MBO 선정 2차승인자를 지정해주십시오
      }
      if (
        this.isShowaddUserT1 &&
        common.isEmpty(this.mboCrrInfo.appUserNameT1)
      ) {
        this.invalidFlag = true;
        this.invalidMessage = 'NLS0001254'; //MBO 선정 1차승인자를 지정해주십시오
      }

      if (type === 'UPDATE') {
        if (this.wtRateSum !== 100) {
          this.invalidFlag = true;
          this.invalidMessage = 'NLS0001257'; //가중치 합계가 100이 되어야합니다.
        }
      }
    },
    //* 평가점수 유효성 체크
    checkEstScoreInvalid(apvStatus) {
      //* 반려단계가 아닐떄만
      if (apvStatus !== '197' && !this.invalidFlag) {
        this.invalidFlag = false;
        if (apvStatus === '196') {
          // 196 - 평가자가 평가승인 시 평가점수와 1차 평가 점수 조정 범위 확인
          const flag = this.mboCrrList.some(item => {
            let res = false;
            const value = item.selfEstScore ? Number(item.selfEstScore) : 0;
            const score1 = item.estScore1 ? Number(item.estScore1) : 0;
            const score2 = item.estScore2 ? Number(item.estScore2) : 0;
            const estUp = value + value * (item.modPoint / 100);
            const estDown = value - value * (item.modPoint / 100);
            if (score1 > 0 && (score1 > estUp || score1 < estDown)) {
              res = true;
            }
            if (score2 > 0 && (score2 > estUp || score2 < estDown)) {
              res = true;
            }
            return res;
          });
          if (this.mboCrrInfo.mbostatus === 'B2') {
            if (flag) {
              this.invalidFlag = true;
              this.invalidMessage = 'NLS0000818';
              return false;
            }
          }
        }
        //* MBO 평가 단계에서 평가점수(본인 ,1차평가자 ,2차평가자에 맞게)를 입력했는지 체크
        if (
          this.mboCrrInfo.mbostatus === 'E1' ||
          this.mboCrrInfo.mbostatus === 'B2'
        ) {
          this.mboCrrList.forEach(element => {
            if (
              element.estScore === undefined ||
              element.estScore === null ||
              element.estScore === ''
            ) {
              this.invalidFlag = true;
              if (this.mboCrrInfo.mboUserId === this.loginUserInfo.userId) {
                this.invalidMessage = 'NLS0001097';
              }
              //* 1차 승인자 === 본인
              if (this.mboCrrInfo.appUserE1 === this.loginUserInfo.userId) {
                this.invalidMessage = 'NLS0001098';
              }
              //* 2차 승인자 === 본인
              else if (
                this.mboCrrInfo.appUserE2 === this.loginUserInfo.userId
              ) {
                this.invalidMessage = 'NLS0001099';
              }
              return false;
            }
          });
        }
      }
    },
    //* 관리자 결제 라인 초기화
    async initMboApvStatus() {
      //* 전송 파라미터

      const param = {
        baseYYYY: this.mboCrrInfo.baseYyyy,
        mboEvalId: this.mboCrrInfo.mboEvalId,
        mboUserId: this.mboCrrInfo.mboUserId,
        mboUserDeptId: this.mboCrrInfo.mboUserDeptId,
        apvStatus: '144',
        mboStep: this.defaultMboStep.cd,
        mboAppYn: 'N',
      };
      const returnData = await this[
        mboOperTypes.actions.UPDATE_INIT_MBO_APV_STATUS
      ](param);
      if (returnData.result === 'T') {
        this.renewMboInfo(param);
        common.alert('success', 'NLS0001039');
      }
    },
    //* 데이터 갱신
    renewMboInfo(param) {
      this[mboOperTypes.actions.FETCH_MBO_CURR_INFO]({
        baseYYYY: param.baseYYYY,
        mboEvalId: param.mboEvalId,
        mboUserId: param.mboUserId,
        mboUserDeptId: param.mboUserDeptId,
      });
    },
    //* MBO 선정 / 평가 기간체크
    checkDatePeriod() {
      const currDate = timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD');
      this.isAllowPeriod =
        this.mboStatus4.endDate >= currDate &&
        this.mboStatus3.startDate <= currDate;
    },
  },
};
</script>
<style scoped>
th {
  font-weight: unset;
}
</style>
