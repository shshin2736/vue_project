<template>
  <!-- 등록 KPI 업데이트 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <validation-observer
            ref="obs"
            v-slot="{ invalid, validated, errors }"
          >
            <div class="layer-pop__box type-wide2">
              <div class="layer-pop__title">
                <p>{{ $t('NLS0001009') }} ({{ kpiNmForm }})</p>
                <button type="button" class="layer-close" @click="closePopup">
                  close {{ slotProps.trigger ? '' : closePopup() }}
                </button>
              </div>
              <div class="hms-grid basic-table layer_scroll">
                <table>
                  <colgroup>
                    <col style="width:18%" />
                    <col />
                    <col style="width:13%" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0000405') }}
                        <span class="required-text">*</span>
                      </th>
                      <!--KPI속성그룹-->
                      <td colspan="3">
                        <p>
                          <span class="grid-input-form type-large">
                            <com-input-text
                              rules="required"
                              :isReadOnly="true"
                              v-model="kpiDefNmForm"
                            ></com-input-text>
                            <button
                              type="button"
                              class="magnifier-btn-black"
                              @click="openDefGroupPopup"
                              v-if="validKpi"
                            >
                              더찾기
                            </button>
                            <input type="hidden" v-model="kpiDefIdForm" />
                          </span>
                          <com-button
                            type="button"
                            class="white-btn perm_save"
                            :auth="$route.params.auth"
                            @click="updateAttr"
                            v-if="!validKpi"
                          >
                            <span>{{ $t('NLS0001369') }}</span> </com-button
                          ><!--속성그룹 수정-->
                          <button
                            type="button"
                            class="white-btn"
                            @click="openCustomDefPopup"
                            v-if="validKpi"
                          >
                            <span>{{ $t('NLS0000406') }}</span
                            ><!--맞춤 속성 찾기-->
                          </button>
                          <button
                            type="button"
                            class="white-btn"
                            @click="openExistDefPopup"
                            v-if="validKpi"
                          >
                            <span>{{ $t('NLS0000407') }}</span>
                            <!--기존 KPI로 찾기-->
                          </button>
                        </p>
                      </td>
                    </tr>
                    <tr v-if="isAdmin">
                      <th scope="row">
                        {{ $t('NLS0000138')
                        }}<span class="required-text">*</span>
                      </th>
                      <!--구분-->
                      <td colspan="3">
                        <span class="radio-form">
                          <input
                            type="radio"
                            id="upd-std-op1"
                            name="stdRadioNm"
                            value="S"
                            v-model="stdRadioNm"
                            checked="checked"
                          /><label for="upd-std-op1">{{
                            $t('NLS0000337')
                          }}</label
                          ><!--전사표준--></span
                        >
                        <span class="radio-form in-input"
                          ><input
                            type="radio"
                            id="upd-std-op2"
                            name="stdRadioNm"
                            value="P"
                            v-model="stdRadioNm"
                          /><label for="upd-std-op2">{{
                            $t('NLS0000338')
                          }}</label
                          ><!--선행--></span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0000148') }}
                        <span class="required-text">*</span>
                      </th>
                      <!--KPI명-->
                      <td colspan="3">
                        <p
                          class="grid-line"
                          v-for="item in laguageList"
                          :key="item.cdNm"
                        >
                          <span class="title-lang lang-check">{{
                            item.cdNm
                          }}</span>
                          <span
                            class="grid-input-form type-large type-nobtn lang-check"
                          >
                            <com-input-text
                              type="text"
                              :title="item.cdNm"
                              v-model="lang[`${item.cd}InputForm`]"
                              @keyup="changeKpiNameForm(item.cd)"
                            />
                          </span>
                          <com-button
                            type="button"
                            class="white-btn perm_read"
                            :auth="$route.params.auth"
                            @click="
                              checkKpiNm(
                                `${item.cd}`,
                                lang[`${item.cd}InputForm`],
                              )
                            "
                          >
                            <span>{{ $t('NLS0000077') }}</span> </com-button
                          ><!--중복체크-->
                          <span
                            class="grid-text-info alert lang-check"
                            :title="`check${item.cd}1`"
                            v-if="langCheck[`check${item.cd}1`]"
                            >{{ $t('NLS0000799') }}</span
                          ><!--이미 등록된 이름입니다.-->
                          <span
                            class="grid-text-info lang-check"
                            v-if="langCheck[`check${item.cd}2`]"
                            >{{ $t('NLS0000798') }}</span
                          ><!--등록 가능합니다.-->
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0000062') }}
                        <span class="required-text">*</span>
                      </th>
                      <!--담당부서/담당자 -->
                      <td>
                        <span class="grid-input-form type-large type-large">
                          <!-- <com-input-text
                            type="text"
                            title="담당부서 입력폼"
                            :isReadOnly="true"
                            v-model="deptMangerForm"
                            rules="required"
                          /> -->
                          <com-input-text
                            type="text"
                            v-model="deptMangerForm"
                            rules="required"
                            @enter="openDeptMangSinglePopup"
                          />
                          <input type="hidden" v-model="deptIdForm" />
                          <input type="hidden" v-model="userIdForm" />
                          <button
                            type="button"
                            class="magnifier-btn-black"
                            @click="openDeptMangSinglePopup"
                          >
                            더찾기
                          </button>
                          <!-- <button
                            type="button"
                            class="magnifier-btn-black"
                            @click="openDeptMangSinglePopup"
                          >
                            더찾기
                          </button> -->
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0001389') }}
                        <!-- 목표/실적 등록자 추가-->
                        <button
                          type="button"
                          class="magnifier-btn-black"
                          @click="openDeptMangMultiPopup('target')"
                        >
                          더찾기
                        </button>
                      </th>
                      <td colspan="3">
                        <div class="joint-user-box">
                          <span
                            class="joint-user"
                            v-for="(item, index) in coUserList"
                            :key="index"
                          >
                            {{ item.deptNm }}/{{ item.userName }}
                            <button
                              type="button"
                              class="del2-btn"
                              @click="
                                deleteDeptManager(
                                  item.userId,
                                  item.deptId,
                                  'target',
                                )
                              "
                            >
                              {{ $t('NLS0000075') }}</button
                            ><!--삭제 -->
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0000408') }}
                        <!--활동/계획 등록자 추가 -->
                        <button
                          type="button"
                          class="magnifier-btn-black"
                          @click="openDeptMangMultiPopup('user')"
                        >
                          더찾기
                        </button>
                      </th>
                      <td colspan="3">
                        <div class="joint-user-box">
                          <span
                            class="joint-user"
                            v-for="(item, index) in deptManagerListData"
                            :key="index"
                          >
                            {{ item.deptNm }}/{{ item.userName }}
                            <button
                              type="button"
                              class="del2-btn"
                              @click="
                                deleteDeptManager(
                                  item.userId,
                                  item.deptId,
                                  'user',
                                )
                              "
                            >
                              {{ $t('NLS0000075') }}</button
                            ><!--삭제 -->
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0000409') }}
                        <span class="required-text">*</span>
                      </th>
                      <!--측정 단위 -->
                      <td colspan="3">
                        <span class="grid-dropdown-title">
                          {{ $t('NLS0000412') }} </span
                        ><!--카테고리 -->
                        <com-dropdowns
                          :data="getkpiUnitCateList"
                          textfield="text"
                          valuefield="value"
                          class="hms-dropdown type1"
                          v-model="kpiUnitCateForm"
                          rules="selected"
                          @change="onChangeCate"
                        ></com-dropdowns>
                        <span class="grid-dropdown-title">
                          {{ $t('NLS0000063') }} </span
                        ><!--단위 -->
                        <com-dropdowns
                          :data="getkpiUnitUnitList"
                          textfield="text"
                          valuefield="value"
                          class="hms-dropdown type1"
                          v-model="kpiUnitUnitForm"
                          @change="onChangeUnit"
                        ></com-dropdowns>
                        <span class="grid-dropdown-title">
                          {{ $t('NLS0000413') }} </span
                        ><!--소수점 자릿수 -->
                        <com-dropdowns
                          :data="pointCntOption"
                          textfield="text"
                          valuefield="value"
                          class="hms-dropdown type1"
                          v-model="pointCntForm"
                        ></com-dropdowns>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{{ $t('NLS0000410') }}</th>
                      <!--측정속성-->
                      <td colspan="3">
                        <div class="hms-grid grid-grid">
                          <table>
                            <colgroup>
                              <col />
                              <col />
                              <col />
                              <col />
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="row">{{ $t('NLS0000061') }}</th>
                                <!--실적 달성 유형-->
                                <th scope="row">{{ $t('NLS0000059') }}</th>
                                <!--실적 집계 방식-->
                                <th scope="row">{{ $t('NLS0000060') }}</th>
                                <!--실적 누계 방식-->
                                <th scope="row">{{ $t('NLS0000057') }}</th>
                                <!--측정 주기-->
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{{ kpiAchTypeForm }}</td>
                                <td>{{ kpiPerTypeForm }}</td>
                                <td>{{ kpiAccTypeForm }}</td>
                                <td>{{ kpiCycleForm }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {{ $t('NLS0000411') }}
                        <span class="required-text">*</span
                        ><!--달성도 측정-->
                      </th>
                      <td colspan="3">
                        <span class="radio-form">
                          <input
                            type="radio"
                            id="ach-u-op1"
                            name="achMeasureForm2"
                            value="D"
                            v-model="achMeasureForm2"
                            checked="checked"
                          /><label for="ach-u-op1">{{
                            $t('NLS0000414')
                          }}</label></span
                        ><!--척도-->
                        <span class="radio-form in-input"
                          ><input
                            type="radio"
                            id="ach-u-op2"
                            name="achMeasureForm2"
                            value="R"
                            v-model="achMeasureForm2"
                          /><label for="ach-u-op2"
                            >{{ $t('NLS0001133') }} (min:
                            <input
                              type="text"
                              title="Range min 입력폼"
                              class="radio-text"
                              v-model="achMinForm"
                            />
                            % ~ max:
                            <input
                              type="text"
                              title="Range max 입력폼"
                              class="radio-text"
                              v-model="achMaxForm"
                            />
                            %)
                          </label></span
                        >
                        <span class="grid-text-info">{{
                          $t('NLS0001148')
                        }}</span
                        ><!--※ 달성도 범위는 0 ~ 200 % 까지 입니다.-->
                      </td>
                    </tr>
                    <tr v-if="childKpiView">
                      <th scope="row">
                        {{ $t('NLS0000416')
                        }}<!--하위 KPI 연결-->
                        <button
                          type="button"
                          class="magnifier-btn-black"
                          @click="openKpiPoolPop"
                        >
                          더찾기
                        </button>
                      </th>
                      <td colspan="3">
                        <div class="hms-grid">
                          <com-native-grid
                            :data="selectedChildKpiList"
                            :columns="columns"
                            height="163"
                            @btnclick="removeChildKpi"
                          ></com-native-grid>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{{ $t('NLS0000417') }}</th>
                      <!--산출공식-->
                      <td colspan="3">
                        <textarea
                          title="산출 공식 입력폼"
                          class="grid-textarea"
                          v-model="kpiDescForm"
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">{{ $t('NLS0000058') }}</th>
                      <!--사용여부-->
                      <td colspan="3">
                        <span class="radio-form">
                          <input
                            type="radio"
                            id="upd-use-op1"
                            name="useYnForm"
                            value="Y"
                            v-model="useYnForm"
                            checked="checked"
                            :disabled="allMboAppYn > 0"
                          /><label for="upd-use-op1">Y</label></span
                        >
                        <span class="radio-form in-input"
                          ><input
                            type="radio"
                            id="upd-use-op2"
                            name="useYnForm"
                            value="N"
                            v-model="useYnForm"
                            :disabled="allMboAppYn > 0"
                          /><label for="upd-use-op2">N</label></span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <span class="grid-text-info"
                  >{{ $t('NLS0001149')
                  }}<!--※ 담당자의 1차 상사는 성공/부진 사유에 대해 수정 가능합니다.--></span
                ><br />
              </div>
              <div class="layer-btn-tbox type-normal" v-if="showSaveBtn">
                <com-button
                  type="button"
                  class="blue-btn perm_save"
                  :auth="$route.params.auth"
                  @click="saveKpiFormBtn"
                >
                  <span>{{ $t('NLS0000074') }}</span
                  ><!--저장-->
                </com-button>
              </div>
            </div>
            <com-validate-error
              :invalid="invalid"
              :validated="validated"
              :errors="errors"
              @errors="onErrors"
            ></com-validate-error>
          </validation-observer>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import {
  kpiTargetEstablishmentStore,
  kpiPerformanceStore,
  commonStore,
} from '@/mixins';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
  name: 'KpiUpdatePopup',
  components: {
    ComNativeGrid,
    ComValidateError,
    ComButton,
    ComDropdowns,
    ComInputText,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore, kpiPerformanceStore, commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      columns: [],
      lang: {
        KOInputForm: '',
        ENInputForm: '',
        ZHInputForm: '',
        VNInputForm: '',
        IDInputForm: '',
        PHInputForm: '',
      },
      msg: '',
      alert: false,
      langCheck: {
        checkKO1: false,
        checkKO2: true,
        checkEN1: false,
        checkEN2: true,
        checkZH1: false,
        checkZH2: true,
        checkVN1: false,
        checkVN2: true,
        checkID1: false,
        checkID2: true,
        checkPH1: false,
        checkPH2: true,
      },
      pointCntOption: [
        { text: this.$t('NLS0000237'), value: '' }, //*선택
        { text: '0', value: 0 },
        { text: '1', value: 1 },
        { text: '2', value: 2 },
      ],
      kpiNmForm: '',
      userIdForm: '',
      deptIdForm: '',
      kpiDefNmForm: '',
      kpiDefIdForm: '',
      kpiAchTypeForm: '',
      kpiPerTypeForm: '',
      kpiAccTypeForm: '',
      kpiCycleForm: '',
      deptMangerForm: '', //*담당부서/담당자이름
      deptManagerListData: [], //*공동 사용자 추가
      kpiUnitCateForm: { text: this.$t('NLS0000237'), value: '' }, //*측정단위 카테고리
      kpiUnitUnitForm: { text: this.$t('NLS0000237'), value: '' }, //*측정단위 단위
      pointCntForm: { text: this.$t('NLS0000237'), value: '' }, //*소수점자리수
      achMeasureForm2: 'D', //*달성도측정
      achMinForm: '', //* Range min
      achMaxForm: '', //* Range max
      kpiDescForm: '', //*산출공식
      childKpiView: false,
      showSaveBtn: false,
      selectedChildKpiList: [],
      isAdmin: false,
      useYnForm: 'Y',
      stdRadioNm: 'S',
      laguageList: [],
      allMboAppYn: 0,
      validKpi: false,
      isOpenChildPop: false,
      isChildKpi: false,
      isChanged: false,
      flag: '',
      coUserList: [],
    };
  },
  computed: {
    getSelectedKpiDefForm() {
      //*수정한 속성그룹 폼데이터
      return this[kpiTargetEstablishmentTypes.getters.GET_KPI_DEF_GROUP_DATA];
    },
    getKpiDefForm() {
      //*속성그룹폼데이터
      let data = this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA];
      return data.kpiDefData;
    },
    getKpiAddUserList() {
      //*해당 KPI선택한 공동사용자
      let data = this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA];
      return data.kpiAddUserList;
    },
    getCoUserList() {
      //*해당 KPI 공동 목표/실적 사용자
      return this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA]
        .kpiCoUserList;
    },
    getKpiChildKpiList() {
      //*해당 KPI 하위 KPI
      return this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA]
        .getChildKpiList;
    },
    getSelectedUserListUp() {
      //*선택한 공동사용자
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_LIST];
    },
    getSelectedUserData() {
      //*선택한 담당자
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getkpiUnitCateList() {
      //*측정단위 카테고리
      let cateListData = [{ text: this.$t('NLS0000237'), value: '' }];
      common.getCodeList('KPI200').map(el => {
        cateListData.push({ text: el.cdNm, value: el.cd });
      });
      return cateListData;
    },
    getkpiUnitUnitList() {
      //*측정단위 단위
      let unitListData = [{ text: this.$t('NLS0000237'), value: '' }];
      this[kpiTargetEstablishmentTypes.getters.GET_KPI_UNIT_UNIT_LIST].map(
        el => {
          unitListData.push({ text: el.cdNm, value: el.cd });
        },
      );
      return unitListData;
    },
    getSelectedKpiList() {
      //*선택한 하위kPI
      return this[
        kpiTargetEstablishmentTypes.getters.GET_SELECTED_KPI_POOL_LIST
      ];
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
  },
  watch: {
    getSelectedKpiDefForm: function(value) {
      if (!common.isEmpty(value) && this.value) {
        if (!this.isOpenChildPop) {
          this.isChanged = true;
          const data = {
            ...this[kpiTargetEstablishmentTypes.getters.GET_KPI_INFO_DATA],
          };
          const originData = {
            kpiId: data.kpiDefData.kpiId,
            userId: data.kpiDefData.userId,
            userNm: data.kpiDefData.userNm,
            deptId: data.kpiDefData.deptId,
            deptNm: data.kpiDefData.deptNm,
          };
          Object.assign(data.kpiDefData, value);
          Object.assign(data.kpiDefData, originData);
          //* 자동합산의 하위 KPI를 모두 비워준다
          data.getChildKpiList = [];
          this[kpiTargetEstablishmentTypes.actions.INIT_KPI_INFO_DATA](data);
        }
      }
    },
    getKpiDefForm: function(value) {
      //*실적집계방식이 자동합산인 경우 하위KPI등록가능
      this.childKpiView = value.kpiPerType === '91' ? true : false;
      //* kpi명
      this.lang.KOInputForm = value.kpiNmKo;
      this.lang.ENInputForm = value.kpiNmEn;
      this.lang.ZHInputForm = value.kpiNmZh;
      this.lang.VNInputForm = value.kpiNmVn;
      this.lang.IDInputForm = value.kpiNmId;
      this.lang.PHInputForm = value.kpiNmPh;

      this.kpiNmForm = value.kpiNm;
      this.userIdForm = value.userId;
      this.deptIdForm = value.deptId;
      this.kpiDefIdForm = value.kpiDefId;
      this.kpiDefNmForm = value.kpiDefNm;
      this.kpiUnitUnitForm.value = value.kpiUnit;
      this.achMeasureForm2 = common.isEmpty(value.achMeasure)
        ? 'D'
        : value.achMeasure;
      this.achMaxForm = value.achMax;
      this.achMinForm = value.achMin;
      this.kpiAchTypeForm = value.kpiAchTypeNm;
      this.kpiPerTypeForm = value.kpiPerTypeNm;
      this.kpiAccTypeForm = value.kpiAccTypeNm;
      this.kpiCycleForm = value.kpiCycleNm;
      this.kpiDescForm = value.kpiDesc;
      this.useYnForm = value.useYn;
      this.stdRadioNm = value.kpiStdYn;
      this.mboAppYn = value.mboAppYn;
      this.allMboAppYn = value.allMboAppYn || 0;

      //*담당자 데이터 세팅
      this.deptMangerForm = value.deptNm + '/' + value.userNm;

      //*측정단위 카테고리 세팅
      let cateObj = this.getkpiUnitCateList.filter(function(obj) {
        return obj.value === value.unitOtp;
      });
      this.kpiUnitCateForm = {
        text: cateObj[0].text || '',
        value: value.unitOtp,
      };
      //*측정단위 단위 세팅
      this.setUnitData(value);

      //*소수점자리 세팅
      if (!common.isEmpty(value.pointCnt)) {
        this.pointCntForm = {
          text: value.pointCnt + '',
          value: value.pointCnt,
        };
      } else {
        this.pointCntForm = {
          text: 0,
          value: 0,
        };
      }

      //*사용자체크
      if (this.getCheckUserId()) this.showSaveBtn = true;
    },
    getSelectedUserData: function(value) {
      if (this.value) {
        if (value.userName != undefined) {
          this.deptMangerForm = value.deptNm + '/' + value.userName;
          this.userIdForm = value.userId;
          this.deptIdForm = value.deptId;
        }
      }
    },
    getKpiAddUserList: function(value) {
      if (this.value) {
        //*해당 KPI 공동사용자 데이터 세팅
        this.deptManagerListData = [...value];
      }
    },
    getKpiChildKpiList: function(value) {
      this.selectedChildKpiList = [...value];
    },
    getSelectedKpiList: function(value) {
      if (this.value) {
        //*하위kpi팝업에서 선택한 데이터 처리
        if (this.selectedChildKpiList.length > 0) {
          this.selectedChildKpiList = [...this.selectedChildKpiList, ...value];
        } else {
          this.selectedChildKpiList = [...value];
        }
        //*중복제거
        this.selectedChildKpiList = this.getUniqueObjectArray([
          ...this.selectedChildKpiList,
        ]);
      }
    },
    getSelectedUserListUp: function(value) {
      if (this.value) {
        if (!common.isEmpty(value)) {
          //*공동사용자 데이터 세팅
          value.findIndex(el => {
            const index = this.deptManagerListData.findIndex(
              obj => obj.userId == el.userId && obj.deptId === el.deptId,
            );
            if (index == -1 && this.flag === 'user') {
              this.deptManagerListData.push(el);
            } else if (this.flag === 'target') {
              this.coUserList.push(el);
            }
          });
          this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
        }
      }
    },
    getCoUserList: function(value) {
      if (!common.isEmpty(value)) {
        this.coUserList = value;
      }
    },
  },
  created() {
    this.initColumns();
    this.getCheckUserAdmin();
    this.getLaguageList();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //*KPI명
          width: '310px',
          className: 'left',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //*담당부서
          className: 'left',
        },
        {
          field: 'userNm',
          title: this.$t('NLS0000065'), //*담당자
          className: 'left',
        },
        {
          field: 'kpiUnitNm',
          title: this.$t('NLS0000063'), //*단위
          className: 'left',
        },
        {
          field: '',
          title: '',
          format: 'delete',
          width: '110px',
          cell: FunctionCell,
          className: 'center',
        },
      ];
    },
    getLaguageList() {
      let list = common.getCodeList('G05');
      //* 사용언어 리스트
      const loginUserLan = this[commonTypes.getters.GET_COM_USER_INFO]
        .languageCode;
      const loginUserUserType = this[commonTypes.getters.GET_COM_USER_INFO]
        .userType;
      if (loginUserUserType !== 'ADMIN' && loginUserUserType !== 'SUPER') {
        list = list.filter(el => el.cd === loginUserLan);
      }
      this.laguageList = list;
    },
    getCheckUserAdmin() {
      //*해당kpi수정가능한 user인지
      const loginuserType = this[commonTypes.getters.GET_COM_USER_INFO]
        .userType;
      this.isAdmin =
        loginuserType === 'ADMIN' || loginuserType === 'SUPER' ? true : false;
    },
    getUniqueObjectArray(array) {
      //*arr중복제거
      return array.filter((item, i) => {
        return (
          array.findIndex(item2 => {
            return item.kpiNm === item2.kpiNm;
          }) === i
        );
      });
    },
    getCheckUserId() {
      //*해당kpi수정가능한 user인지
      let check = false;
      const loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      const loginUser = loginUserInfo.userId;
      const userType = loginUserInfo.userType;
      if (
        loginUser === this.userIdForm ||
        userType === 'ADMIN' ||
        userType === 'SUPER'
      ) {
        check = true;
      }
      return check;
    },
    async setUnitData(value) {
      //*측정단위 단위세팅
      await this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_UNIT_UNIT_LIST]({
        opt1: value.unitOtp,
      });
      if (this.getkpiUnitUnitList.length > 0) {
        let unitObj = this.getkpiUnitUnitList.filter(function(obj) {
          return obj.value === value.kpiUnit;
        });
        this.kpiUnitUnitForm = {
          text: unitObj[0].text,
          value: value.kpiUnit,
        };
      }
    },
    openDeptMangSinglePopup() {
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.deptMangerForm,
      });
    },
    openDeptMangMultiPopup(flag) {
      //* 공동사용자 창 열기
      this.flag = flag;
      if (this.value) {
        const loginUserInfo = {
          ...this[commonTypes.getters.GET_COM_USER_INFO],
        };
        const param = {
          srchDeptId: loginUserInfo.deptId,
          exceptList:
            flag === 'user' ? this.deptManagerListData : this.coUserList,
        };
        this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
        this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({
          ...param.excepList,
        });
        // this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
        //this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](true);
      }
    },
    deleteDeptManager(userId, deptId, flag) {
      //*공동 사용자 추가 리스트에서 삭제
      if (flag === 'user') {
        const index = this.deptManagerListData.findIndex(
          el => el.userId === userId && el.deptId === deptId,
        );
        this.deptManagerListData.splice(index, 1);
      } else if (flag === 'target') {
        this.coUserList = this.coUserList.filter(
          item => item.userId !== userId,
        );
      }
    },
    removeChildKpi(data) {
      //*하위연결 KPI 리스트에서 삭제
      if (this.mboAppYn === 'Y') {
        common.alert('warning', 'NLS0001355'); //*MBO로 선정된 KPI는 하위KPI를 추가/삭제 할수 없습니다.
        return;
      }
      const list = this.selectedChildKpiList.filter(
        el => el.kpiNm !== data.kpiNm,
      );
      this.selectedChildKpiList = [...list];
    },
    onChangeCate(e) {
      //*측정단위 단위 가져오기
      if (common.isEmpty(e.target.value.value)) return;
      let optVal = e.target.value.value;
      if (optVal == '60') {
        common.alert('warning', 'NLS0000998'); //*달성률을 계산할수없는 단위입니다.
      }

      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_UNIT_UNIT_LIST]([
        {
          text: this.$t('NLS0000237'),
          value: '',
        },
      ]); //* 측정단위 카테고리 초기화
      if (optVal !== '') {
        this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_UNIT_UNIT_LIST]({
          opt1: optVal,
        });
      }
    },
    onChangeUnit(e) {
      if (common.isEmpty(e.target.value.value)) return;
      let optVal = e.target.value.value;
      //*선택한 단위 세팅
      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_UNIT_DATA](optVal);
    },
    openKpiPoolPop() {
      if (this.mboAppYn === 'Y') {
        common.alert('warning', 'NLS0001355'); //*MBO로 선정된 KPI는 하위KPI를 추가/삭제 할수 없습니다.
        return;
      }
      if (this.kpiUnitUnitForm.value === '') {
        common.alert('warning', 'NLS0001000'); //*측정단위를 먼저 선택하세요.
        return;
      }
      //* 하위 KPI 선택을 위한 INIT 진행 시, childList 초기화하지 못하도록 설정
      this.isOpenChildPop = true;
      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_DEF_GROUP_DATA]({
        ...this.getKpiDefForm,
      }); //*속성그룹데이터 세팅
      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_UNIT_DATA](
        this.kpiUnitUnitForm.value,
      ); //*단위데이터 세팅

      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_KPI_POOL_LIST]([]); //*선택한 데이터 초기화
      // this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*담당자 데이터 초기화
      this[kpiTargetEstablishmentTypes.actions.FETCH_CHILD_KPI_POOL_LIST]({}); //*하위 KPI리스트 조회
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CHILD_KPI_POOL_POP](
        true,
      );
    },
    onErrors(invalid, validate, errors) {
      this.form_invalid = invalid;
      this.form_validated = validate;
      this.form_errors = errors;
    },
    onValidate() {
      this.$refs.obs.validate();
    },
    saveKpiFormBtn() {
      common.confirm('NLS0000005', this.saveKpiFormData);
    },
    async saveKpiFormData() {
      if (this.checkCustomValidation()) {
        //* custom validation에 걸릴때
        return;
      }

      let managerList = [];
      this.deptManagerListData.map(obj => {
        managerList.push({ userId: obj.userId, deptId: obj.deptId });
      });
      let kpiList = [];
      //*기존에 불러온 하위kpi 와 새로추가한 하위kpi데이터를 구분해서 처리
      this.selectedChildKpiList.map(obj => {
        kpiList.push({ kpiId: obj.subKpiId || obj.kpiId });
      });
      const userLan = this[commonTypes.getters.GET_COM_USER_INFO].languageCode;
      const param = {
        kpiId: this.getKpiDefForm.kpiId,
        kpiDefId: this.getKpiDefForm.kpiDefId || '', //*KPI속성그룹ID
        kpiDefNm: this.kpiDefNmForm,
        //* KPI명
        koDefNm: !common.isEmpty(this.lang.KOInputForm)
          ? this.lang.KOInputForm
          : this.lang[`${userLan}InputForm`],
        enDefNm: !common.isEmpty(this.lang.ENInputForm)
          ? this.lang.ENInputForm
          : this.lang[`${userLan}InputForm`],
        zhDefNm: !common.isEmpty(this.lang.ZHInputForm)
          ? this.lang.ZHInputForm
          : this.lang[`${userLan}InputForm`],
        vnDefNm: !common.isEmpty(this.lang.VNInputForm)
          ? this.lang.VNInputForm
          : this.lang[`${userLan}InputForm`],
        idDefNm: !common.isEmpty(this.lang.IDInputForm)
          ? this.lang.IDInputForm
          : this.lang[`${userLan}InputForm`],
        phDefNm: !common.isEmpty(this.lang.PHInputForm)
          ? this.lang.PHInputForm
          : this.lang[`${userLan}InputForm`],
        kpiDefAchType: this.getKpiDefForm.kpiAchType || '', //*실적당성유형
        kpiDefPerType: this.getKpiDefForm.kpiPerType || '', //*실적집계방식
        kpiDefAccType: this.getKpiDefForm.kpiAccType || '', //*실적누계방식
        kpiDefCycle: this.getKpiDefForm.kpiCycle || '', //*측정주기
        deptId: this.deptIdForm || '', //*담당부서ID
        userId: this.userIdForm || '', //*담당자 ID
        managerList: managerList, //*공동 사용자 추가
        coUserList: this.coUserList,
        childKpiList: kpiList, //* 하위kpi
        kpiUnit: this.kpiUnitUnitForm.value, //*측정단위
        poinCnt: this.pointCntForm.value || 0, //*소수점자리수
        achMeasure: this.achMeasureForm2, //*달성도측정
        achMin:
          this.achMeasureForm2 === 'R' && this.isNumeric(this.achMinForm)
            ? parseInt(this.achMinForm, 10)
            : 0, //* Range min
        achMax:
          this.achMeasureForm2 === 'R' && this.isNumeric(this.achMaxForm)
            ? parseInt(this.achMaxForm, 10)
            : 100, //* Range max
        kpiDesc: this.kpiDescForm, //*산출공식
        kpiStdYn: this.stdRadioNm || 'P', //*구분
        useYn: this.useYnForm || 'Y', //*사용여부
        baseYyyy: this[commonTypes.getters.GET_SELECTED_YEAR_DATA],
        baseYyyyMm:
          this[commonTypes.getters.GET_SELECTED_YEAR_DATA] +
          this[commonTypes.getters.GET_SELECTED_MONTH_DATA],
        isChanged: this.isChanged,
        isChildKpi: this.isChildKpi,
      };
      //* KPI 수정
      await this[kpiTargetEstablishmentTypes.actions.UPDATE_LOADED_KPI_DATA](
        param,
      );
      //* KPI명 중복체크 초기화
      this.resetCheckLang('all');
      //* 리스트 재호출
      if (this.$router.history.current.name === 'KpiPerformanceListPage') {
        this.getKpiPerformList();
      } else if (
        this.$router.history.current.name === 'kpiTargetEstablishment'
      ) {
        this.getKpiTreeList();
        //this.getKpiPoolList();
      }
    },
    async checkKpiNm(lang, val) {
      const langEl = lang.substr(0, 1) + lang.substr(1).toLowerCase();
      //* 불러온 KPI는 체크안함
      if (this.getKpiDefForm[`kpiNm${langEl}`] === val) {
        this.langCheck[`check${lang}1`] = false;
        this.langCheck[`check${lang}2`] = true;
        return;
      }

      //* KPI명 중복체크 초기화
      this.resetCheckLang(lang);

      if (val === '') {
        common.alert('warning', 'NLS0001001'); //*	KPI를 입력해 주십시오.
        return;
      }
      //* 중복체크
      await this[kpiTargetEstablishmentTypes.actions.INIT_CHECK_KPI_NM](0); //*초기화

      let param = { lang: lang, kpiNm: val };
      await this[kpiTargetEstablishmentTypes.actions.FETCH_CHECK_KPI_NM](param);
      let cnt = 0;
      cnt = this[kpiTargetEstablishmentTypes.getters.GET_CHECK_KPI_NM];

      if (cnt > 0) {
        this.langCheck[`check${lang}1`] = true;
        this.langCheck[`check${lang}2`] = false;
      } else {
        this.langCheck[`check${lang}1`] = false;
        this.langCheck[`check${lang}2`] = true;
      }
    },
    resetData() {
      this.coUserList = [];
      this.selectedChildKpiList = [];
      this.isChanged = false;
      this.childKpiView = false;
      this.showSaveBtn = false;
      this.validKpi = false;
      this.isOpenChildPop = false;
      //* 측정단위 초기화
      this.kpiUnitCateForm = {
        text: this.$t('NLS0000237'),
        value: '',
      };
      this.kpiUnitUnitForm = {
        text: this.$t('NLS0000237'),
        value: '',
      };

      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_UNIT_UNIT_LIST]([
        {
          text: this.$t('NLS0000237'),
          value: '',
        },
      ]);

      this.pointCntForm = {
        text: this.$t('NLS0000237'),
        value: '',
      };

      this.deptMangerForm = ''; //*담당부서
      this.deptManagerListData = []; //*공동 사용자 추가
      this.achMeasureForm2 = 'D'; //*달성도측정
      this.achMinForm = ''; //* Range min
      this.achMaxForm = ''; //* Range max
      this.kpiDescForm = ''; //*산출공식
      this.kpiDefNmForm = '';
      this.kpiDefIdForm = '';
      this.kpiAchTypeForm = '';
      this.kpiPerTypeForm = '';
      this.kpiAccTypeForm = '';
      this.kpiCycleForm = '';
      this.useYnForm = 'Y'; //*사용여부
      this.stdRadioNm = 'S'; //*구분
      this.mboAppYn = '';
      this.allMboAppYn = 0;
      //* KPI명 초기화
      this.lang.KOInputForm = '';
      this.lang.ENInputForm = '';
      this.lang.ZHInputForm = '';
      this.lang.VNInputForm = '';
      this.lang.IDInputForm = '';
      this.lang.PHInputForm = '';

      //* KPI명 중복체크 초기화
      this.resetCheckLang('all');

      //* 선택한 단위 초기화
      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_UNIT_DATA]('');
      //*선택한 데이터 초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*담당자 데이터 초기화
      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_KPI_POOL_LIST]([]);
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]);
      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_DEF_GROUP_DATA]({});
    },
    isNumeric(data) {
      return !isNaN(data);
    },
    closePopup() {
      this.resetData();
      this.$emit('input', false);
    },
    checkCustomValidation() {
      if (this.validationCheckKpiLang()) {
        common.alert('warning', 'NLS0001006'); //*KPI 중복체크를 해주십시오.
        return true;
      } else if (common.isEmpty(this.deptMangerForm)) {
        common.alert('warning', 'NLS0001003'); //*담당자를 입력해 주십시오.
        return true;
      } else if (common.isEmpty(this.kpiUnitUnitForm.value)) {
        common.alert('warning', 'NLS0001004'); //*측정단위를 입력해 주십시오.
        return true;
      } else if (this.achMeasureForm2 === 'R') {
        if (
          common.isEmpty(this.achMinForm) ||
          common.isEmpty(this.achMaxForm)
        ) {
          common.alert('warning', 'NLS0001005'); //*	달성도 범위를 입력해 주십시오.
          return true;
        }
        if (
          !this.isNumeric(this.achMinForm) ||
          !this.isNumeric(this.achMaxForm)
        ) {
          common.alert('warning', 'NLS0001007'); //*숫자를 입력해 주십시오.
          return true;
        }
        if (
          this.achMinForm < 0 ||
          this.achMaxForm > 200 ||
          Number(this.achMinForm) > Number(this.achMaxForm)
        ) {
          common.alert('warning', 'NLS0001147'); //*달성도 범위를 확인해 주십시오.
          return true;
        }
      }
      // else if (this.allMboAppYn > 0 && this.useYnForm === 'N') {
      //   //*MBO선정된 KPI가 존재하는지 체크
      //   common.alert('warning', 'NLS0001361'); //*MBO승인이된 KPI는 사용여부를 변경할수없습니다.
      //   return true;
      // }
      let checkUnit = false;
      this.selectedChildKpiList.forEach(obj => {
        if (this.kpiUnitUnitForm.value !== obj.kpiUnit) {
          checkUnit = true;
          return false;
        }
      });
      if (this.getKpiDefForm.kpiPerType === '91' && checkUnit) {
        common.alert(
          'info',
          'NLS0001008', //*선택한 측정단위와 연결된 하위KPI의 측정단위가 일치하지 않습니다.
        );
        return true;
      }
    },
    validationCheckKpiLang() {
      let langList = [...this.laguageList];
      let checkVal = false;
      langList.forEach(obj => {
        const check1 = this.langCheck[`check${obj.cd}1`];
        const check2 = this.langCheck[`check${obj.cd}2`];

        if (!(check2 && !check1)) {
          checkVal = true;
          return false;
        }
      });
      return checkVal;
    },
    resetCheckLang(lang) {
      //* KPI명 중복체크 초기화
      let langList = [...this.laguageList];
      if (lang === 'all') {
        langList.map(obj => {
          this.langCheck[`check${obj.cd}1`] = false;
          this.langCheck[`check${obj.cd}2`] = true;
        });
      } else {
        this.langCheck[`check${lang}1`] = false;
        this.langCheck[`check${lang}2`] = false;
      }
    },
    changeKpiNameForm(lang) {
      //* KPI명 입력값 변경시 VALIDATION 초기화
      this.langCheck[`check${lang}1`] = false;
      this.langCheck[`check${lang}2`] = false;
    },
    getKpiPerformList() {
      const searchUserId = this[
        kpiPerformanceTypes.getters.GET_PERFORM_SEARCH_USER_ID
      ];
      //* KPI실적 리스트 조회
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
        searchUserId: searchUserId || '',
      };
      this[kpiPerformanceTypes.actions.FETCH_KPI_PERFORM_LIST](param);
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.getSelectedYear);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.getSelectedMonth);
    },
    getKpiTreeList() {
      //* KPI목표수립 리스트 조회
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
      };
      this[
        kpiTargetEstablishmentTypes.actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST
      ](param);
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.getSelectedYear);
      this[commonTypes.actions.INIT_SELECTED_MONTH_DATA](this.getSelectedMonth);
    },
    getKpiPoolList() {
      //*KPI전체목록가져오기
      const param = {
        limit: 13,
        offset: 0,
      };
      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_POOL_DATA_LIST](param);
    },
    async updateAttr() {
      //* 해당 KPI의 속성그룹 수정 가능 여부
      await this[kpiTargetEstablishmentTypes.actions.FETCH_IS_MBO_KPI]({
        kpiId: this.getKpiDefForm.kpiId,
      });
      const { cnt, childCnt } = this[
        kpiTargetEstablishmentTypes.getters.GET_IS_MBO_KPI
      ];
      if (cnt > 0) {
        //* MBO 선정된 KPI일 때
        //* MBO 선정된 KPI의 측정속성은 수정할 수 없습니다.
        common.alert('warning', 'NLS0001370');
        return;
      } else if (
        cnt === 0 &&
        this.getKpiDefForm.kpiStdYn === 'S' &&
        !this.isAdmin
      ) {
        //* 전사표준 KPI이고 관리자가 아닐 때
        common.alert('warning', 'NLS0001373'); //* 전사표준 KPI는 관리자 계정만 수정 가능합니다.
        return;
      } else if (
        (cnt === 0 && this.getKpiDefForm.kpiStdYn === 'P') ||
        (cnt === 0 && this.getKpiDefForm.kpiStdYn === 'S' && this.isAdmin)
      ) {
        //* MBO 선정되지 않은 선행 KPI 또는 MBO 선정되지 않은 전사표준 KPI이고 ADMIN 일 때
        this.validKpi = true;
        //* 하위 KPI로 속해져있는 KPI인 경우
        this.isChildKpi = !this.childKpiView && childCnt > 0 ? true : false;
      }
    },
    openDefGroupPopup() {
      //* KPI속성그룹 더찾기 팝업
      let kpiCustomData = {
        //* 맞춤속성데이터
        kpiAchType: '',
        kpiPerType: '',
        kpiAccType: '',
        kpiCycle: '',
      };
      this[kpiTargetEstablishmentTypes.actions.UPDATE_SEARCH_KPI_CUSTOM_DATA](
        kpiCustomData,
      ); //* 맞춤속성데이터 초기화

      this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_DEF_GROUP_LIST]({});
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_DEF_GROUP_POP](true);
    },
    openExistDefPopup() {
      //* 기존 KPI로 찾기
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({}); //*사용자/부서 선택값초기화
      this[kpiTargetEstablishmentTypes.actions.FETCH_EXIST_DEF_LIST]({});
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_EXIST_DEF_POP](true);
    },
    openCustomDefPopup() {
      //* 맞춤 속성 찾기
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CUSTOM_DEF_POP](true);
    },
  },
};
</script>
