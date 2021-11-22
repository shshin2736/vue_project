<template>
  <dl class="task-accordion">
    <validation-observer ref="obs4" v-slot="{ invalid, validated, errors }">
      <p
        class="taskstep-title"
        :class="{
          current:
            3 < GV_STEP_DETAIL_LIST[0].selectedIdx &&
            8 > GV_STEP_DETAIL_LIST[0].selectedIdx,
        }"
      >
        <span>STEP2</span>
        {{ GV_STEP_LIST[1].cdNm }}
      </p>
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[4].current }"
        :ref="GV_STEP_DETAIL_LIST[4].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[4].stepCd, 4)"
      >
        <button type="button" class="task-accordion-btn">
          <span>{{ GV_STEP_DETAIL_LIST[4].stepNm }}</span>
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[4].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[4].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[4].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onCustSave('20', GV_STEP_DETAIL_LIST[4].stepCd, '0')"
            :disabled="custDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onCustSave('20', GV_STEP_DETAIL_LIST[4].stepCd, '1')"
            :disabled="custDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[4].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[4].stepCd,
                GV_STEP_DETAIL_LIST[4].stepNm,
              )
            "
            :disabled="msgDisabled"
          >
            <!-- 메시지 -->
            <span>{{ $t('NLS0000707') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[4].stepNm, 'NLS0000774')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <label for="custInfo">
              <!-- 고객 기본정보 -->
              - {{ $t('NLS0000901') }}
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="custInfo"
              v-model="customInfo.custInfo"
              :disable="custDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <label for="tranHis">
              <!-- 기존 거래 내역 -->
              - {{ $t('NLS0000606') }}</label
            >
            <com-ck-editor
              v-if="editorRender"
              id="tranHis"
              v-model="customInfo.tranHis"
              :disable="custDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <label for="visitItem">
              <!-- 방문 시 조사 항목 -->
              - {{ $t('NLS0000607') }}</label
            >
            <com-ck-editor
              v-if="editorRender"
              id="visitItem"
              v-model="customInfo.visitItem"
              :disable="custDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <!-- 방문 결과 -->
            <label for="visitResult">- {{ $t('NLS0000608') }}</label>
            <com-ck-editor
              v-if="editorRender"
              id="visitResult"
              v-model="customInfo.visitResult"
              :disable="custDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[4].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="custFileList"
                :read="custDisabled"
                @files="getCustFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </dd>
      <!-- ValidateError 컴포넌트 영역 -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors4"
      ></com-validate-error>
    </validation-observer>
    <validation-observer ref="obs5" v-slot="{ invalid, validated, errors }">
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[5].current }"
        :ref="GV_STEP_DETAIL_LIST[5].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[5].stepCd, 5)"
      >
        <button type="button" class="task-accordion-btn">
          <span
            >{{ GV_STEP_DETAIL_LIST[5].stepNm }}
            <em class="required-text">*</em></span
          >
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[5].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[5].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[5].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onBizSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '0')"
            :disabled="bizDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onBizSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '1')"
            :disabled="bizDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[5].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[5].stepCd,
                GV_STEP_DETAIL_LIST[5].stepNm,
              )
            "
            :disabled="msgDisabled"
          >
            <!-- 메시지 -->
            <span>{{ $t('NLS0000707') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[5].stepNm, 'NLS0000775')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <!-- 고객 니즈 -->
            <label for="custNeed" class="required-field">
              - {{ $t('NLS0000609') }}<span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="custNeed"
              rules="requiredCK|required"
              v-model="bizInfo.custNeed"
              :disable="bizDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <!-- 현장조사 및 검증 -->
            <label for="fieldVerifi">- {{ $t('NLS0000610') }} </label>
            <com-ck-editor
              v-if="editorRender"
              id="fieldVerifi"
              v-model="bizInfo.fieldVerifi"
              :disable="bizDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[5].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="bizFileList"
                :read="bizDisabled"
                @files="getBizFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </dd>
      <!-- ValidateError 컴포넌트 영역 -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors5"
      ></com-validate-error>
    </validation-observer>
    <validation-observer ref="obs6" v-slot="{ invalid, validated, errors }">
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[6].current }"
        :ref="GV_STEP_DETAIL_LIST[6].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[6].stepCd, 6)"
      >
        <button type="button" class="task-accordion-btn">
          <span
            >{{ GV_STEP_DETAIL_LIST[6].stepNm }}
            <em class="required-text">*</em></span
          >
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[6].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[6].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[6].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onSuggestSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '0')"
            :disabled="suggestDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onSuggestSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '1')"
            :disabled="suggestDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[6].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[6].stepCd,
                GV_STEP_DETAIL_LIST[6].stepNm,
              )
            "
            :disabled="msgDisabled"
          >
            <!-- 메시지 -->
            <span>{{ $t('NLS0000707') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[6].stepNm, 'NLS0000776')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <!-- 고객 제안 내용 -->
            <label for="custSugt" class="required-field"
              >- {{ $t('NLS0000611') }}

              <span class="required-text">*</span></label
            >
            <com-ck-editor
              v-if="editorRender"
              id="custSugt"
              rules="requiredCK|required"
              v-model="custSugt"
              :disable="suggestDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[6].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="suggestFileList"
                :read="suggestDisabled"
                @files="getSuggestFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </dd>
      <!-- ValidateError 컴포넌트 영역 -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors6"
      ></com-validate-error>
    </validation-observer>
    <validation-observer ref="obs7" v-slot="{ invalid, validated, errors }">
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[7].current }"
        :ref="GV_STEP_DETAIL_LIST[7].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[7].stepCd, 7)"
      >
        <button type="button" class="task-accordion-btn">
          <span>{{ GV_STEP_DETAIL_LIST[7].stepNm }}</span>
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[7].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[7].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[7].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            :disabled="overDisabled"
            @click="onOverSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '0')"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            :disabled="overDisabled"
            @click="onOverSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '1')"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[7].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[7].stepCd,
                GV_STEP_DETAIL_LIST[7].stepNm,
              )
            "
            :disabled="msgDisabled"
          >
            <!-- 메시지 -->
            <span>{{ $t('NLS0000707') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[7].stepNm, 'NLS0000777')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="task-sub-accordion">
          <div class="task-textform">
            <!-- 반론 극복 / 결정유도 활동 -->
            <label for="overcome">- {{ $t('NLS0000616') }}</label>
            <com-ck-editor
              v-if="editorRender"
              id="overcome"
              v-model="overcome"
              :disable="overDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[7].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="overFileList"
                :read="overDisabled"
                @files="getOverFiles"
              ></com-upload-file>
            </div>
          </div>
          <div class="sub-accordion-wrap">
            <!-- 대책 수립 대단계 수행검토 -->
            <p
              class="sub-title line"
              v-if="
                loginUserInfo.userId == prjBaseInfo.prjManagerId &&
                  prjInfo.prjStepStatus2 == '1'
              "
            >
              <!-- 영업제안 대단계 수행검토 -->
              {{ $t('NLS0000617') }}
            </p>
            <div
              class="page__btn-bbox type-center"
              v-if="
                loginUserInfo.userId == prjBaseInfo.prjManagerId &&
                  prjInfo.prjStepStatus2 == '1'
              "
            >
              <button
                type="button"
                class="pink-btn"
                @click="onPrjOverSave('B', '3', GV_STEP_DETAIL_LIST[7].stepCd)"
              >
                <!-- 중단 -->
                <span>{{ $t('NLS0000600') }}</span>
              </button>
              <button
                type="button"
                class="red-btn"
                @click="onPrjOverSave('A', '2', GV_STEP_DETAIL_LIST[7].stepCd)"
              >
                <!-- 수행승인 -->
                <span>{{ $t('NLS0000516') }}</span>
              </button>
            </div>
            <div class="hmstask-form-box">
              <div
                class="text-info"
                v-if="
                  prjInfo.prjStepStatus2 == '1' &&
                    prjBaseInfo.prjManagerId != loginUserInfo.userId
                "
              >
                <div class="vertical-box">
                  <!-- 수행승인 대기중 입니다. -->
                  <p class="dot-text">{{ $t('NLS0000906') }}</p>
                </div>
              </div>
              <div class="text-info" v-if="prjInfo.prjStepStatus2 == '2'">
                <div class="vertical-box">
                  <!-- 수행승인 되었습니다. -->
                  <p class="dot-text">{{ $t('NLS0000907') }}</p>
                </div>
              </div>
              <div class="text-info" v-if="prjInfo.prjStepStatus2 == '3'">
                <div class="vertical-box">
                  <!-- 중단 되었습니다. -->
                  <p class="dot-text">{{ $t('NLS0000908') }}</p>
                </div>
              </div>
            </div>
            <!-- 끝 -->
          </div>
        </div>
      </dd>
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors7"
      ></com-validate-error>
    </validation-observer>
  </dl>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { specializedTasksStore, commonStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'ProjectExecutionDetailSAStep2Form',
  mixins: [specializedTasksStore, commonStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComUploadFile,
  },
  data() {
    return {
      editorRender: false,
      GV_PRJ_ID: this.$route.params.prjId,
      GV_STEP_DETAIL_LIST: [
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
        {
          stepCd: '',
          stepNm: '',
          stepStatus: '0',
          now: false,
          current: false,
          selectedIdx: 0,
        },
      ],
      GV_STEP_LIST: common.getCodeList('PRJ010'),
      GV_STATUS_LIST: [],
      GV_MSG_CNT_LIST: [
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
        { checked: '0' },
      ],
      GV_SKILL_STEP: {},
      GV_CURR_IDX: 0,
      prjStatusList: [],

      devFileList: [],
      paramDevFileList: [],

      prjInfo: {},
      // loginUserInfo: {},
      prjBaseInfo: {
        prjManager: '',
        prjUser: '',
        prjCor: '',
        prjReq: '',
        //* KEYWORD
        keyWorldList: [
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
        ],
      },
      //* 고객파악
      customInfo: {
        custInfo: '',
        tranHis: '',
        visitItem: '',
        visitResult: '',
      },
      custFileList: [],
      paramCustFileList: [],
      //* 질문
      bizInfo: {
        custNeed: '',
        fieldVerifi: '',
      },
      bizFileList: [],
      paramBizFileList: [],
      //* 제시
      custSugt: '',
      suggestFileList: [],
      paramSuggestFileList: [],

      //* 입증
      overcome: '',
      overFileList: [],
      paramOverFileList: [],

      //* Disabled
      custDisabled: true,
      bizDisabled: true,
      suggestDisabled: true,
      overDisabled: true,
      msgDisabled: true,
      //* validation
      GV_invalid4: '',
      GV_validated4: '',
      GV_errors4: {},

      GV_invalid5: '',
      GV_validated5: '',
      GV_errors5: {},

      GV_invalid6: '',
      GV_validated6: '',
      GV_errors6: {},

      GV_invalid7: '',
      GV_validated7: '',
      GV_errors7: {},
      //* All FileList
      allFileList: [],
      //* 진척률 계산
      prjRateCnt: 0,
      prjStep1Cnt: 0,
      prjStep2Cnt: 0,
      prjStep3Cnt: 0,
      currStatus: '',
      rateInfo: {
        prjRate: 0,
        prjStepRate: 0,
      },
    };
  },
  computed: {
    getPrjInfo() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO
      ];
      return item;
    },
    gvPrjStatusList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_STATUS_LIST];
      return item;
    },
    getMessgesList() {
      const item = this[specializedTasksTypes.getters.GET_CHECK_MESSAGES_LIST];
      return item;
    },
    getSkillStepInfo() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_SKILL_STEP_INFO
      ];
      return item;
    },
    getBizInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_SA_BIZ];
      return item;
    },
    getCustomInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_SA_CUST];
      return item;
    },
    getSuggestInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_SUGGEST_INFO];
      return item;
    },
    getOverInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_OVER_INFO];
      return item;
    },
    getAllFileList(state) {
      const item = this[commonTypes.getters.GET_FILE_INFO_LIST];
      state.allFileList = item;
      return item;
    },
    loginUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  watch: {
    getPrjInfo: function(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.setInitData(value);
      }
    },
    gvPrjStatusList: function(value) {
      if (!common.isEmpty(value)) {
        this.GV_STEP_DETAIL_LIST = [...value];
        this.setStepDisabled(value);
        setTimeout(() => {
          //* scroll 이동
          const idx = this.GV_STEP_DETAIL_LIST[0].selectedIdx;
          if (!common.isEmpty(idx)) {
            const el = this.$refs[this.GV_STEP_DETAIL_LIST[idx].stepCd];
            if (this.GV_STEP_DETAIL_LIST[idx].current && el)
              el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
          }
        }, 1);
      }
    },
    getMessgesList: function(value) {
      this.GV_MSG_CNT_LIST = value;
    },
    getSkillStepInfo: function(value) {
      this.GV_SKILL_STEP = value;
    },
    getCustomInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.customInfo = value;
      }
    },
    getBizInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.bizInfo = value;
      }
    },
    getSuggestInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.custSugt = value.custSugt;
      }
    },
    getOverInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.overcome = value.overcome;
      }
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      //* 첨부파일 (제시, 입증)
      this.getFileList();
    },
  },
  created() {
    // this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    this.setInitData(
      this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO],
    );
    this.GV_SKILL_STEP = this[
      specializedTasksTypes.getters.GET_PROJECT_SKILL_STEP_INFO
    ];
    this.initStatusList();
    common.delay(() => {
      this.editorRender = true;
    }, 1000);
  },
  mounted() {
    this.$refs.obs4.validate();
    this.$refs.obs5.validate();
    this.$refs.obs6.validate();
    this.$refs.obs7.validate();
    this.initStatusList();
    this.getFileList();
  },
  methods: {
    setInitData(value) {
      this.prjInfo = value.prjInfo;
      this.prjBaseInfo = value.prjBaseUserInfo;
      this.prjStatusList = value.prjStatusList;

      //* 고객파악 값 세팅
      this.setCustomInfo(this.prjInfo.prjId);
      //* 질문 값 세팅
      this.setBizInfo(this.prjInfo.prjId);
      //* 제시 값 세팅
      this.setSuggestInfo(this.prjInfo.prjId);
      // //* 입증 값 세팅
      this.setOverInfo(this.prjInfo.prjId);
    },
    //* 고객파악 저장
    async onCustSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid4) {
        common.alert('warning', this.GV_errors4.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        custInfo: this.customInfo.custInfo,
        tranHis: this.customInfo.tranHis,
        visitItem: this.customInfo.visitItem,
        visitResult: this.customInfo.visitResult,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_SA_CUST](param);
      if (stepStatus === '1') {
        this.onCompleteStep(4);
      }
    },
    //* 질문 저장
    async onBizSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid5) {
        common.alert('warning', this.GV_errors5.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        custNeed: this.bizInfo.custNeed,
        fieldVerifi: this.bizInfo.fieldVerifi,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_SA_BIZ](param);
      if (stepStatus === '1') {
        this.onCompleteStep(5);
      }
    },
    //* 제시 저장
    async onSuggestSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid6) {
        common.alert('warning', this.GV_errors6.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        custSugt: this.custSugt,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramSuggestFileList,
      };

      await this[specializedTasksTypes.actions.UPDATE_PROJECT_SUGGEST_INFO](
        param,
      );
      if (stepStatus === '1') {
        this.onCompleteStep(6);
      }
    },
    //* 입증 저장
    async onOverSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid7) {
        common.alert('warning', this.GV_errors7.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        overcome: this.overcome,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramOverFileList,
        flag: 'U',
      };
      if (stepStatus === '1') {
        // 영업제안 대단계를 완료하고 검토자에게 수행승인을 요청합니다.  취소를 누르면 완료는 되지않고 저장만 됩니다.
        common.confirm(
          this.$t('NLS0000947').replace(
            '#stepName#',
            'STEP 3',
            //this.GV_STEP_LIST[2].cdNm,
          ),
          async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_OVER_INFO](
              params,
            );
            this.onCompleteStep(7);
          },
          async () => {
            params.stepStatus = '0';
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_OVER_INFO](
              params,
            );
          },
        );
      } else {
        // 저장 시 변경된 내용으로 재검토요청을 하여야 합니다. 저장하실 경우 '확인'버튼을 눌러주세요.
        if (this.prjInfo.prjStepStatus2 === '2') {
          common.confirm('NLS0001386', async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_OVER_INFO](
              params,
            );
          });
        } else {
          await this[specializedTasksTypes.actions.UPDATE_PROJECT_OVER_INFO](
            params,
          );
        }
      }
    },
    async onPrjOverSave(prjStatus, prjStepStatus, stepCd) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      this.setPrjRate('20', stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepCd: stepCd,
        prjStatus: prjStatus,
        stepStatus: prjStepStatus,
        manager: 'Y',
        stepType: '20',
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_OVER_INFO](param);
      if (prjStatus === 'B') {
        const tmeStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
        tmeStatusList.map((item, idx) => {
          const obj = { ...item };
          if (idx === 7) {
            obj.now = true;
            obj.current = true;
            obj.selectedIdx = idx;
          } else {
            obj.now = false;
            obj.current = false;
            obj.selectedIdx = 7;
          }
          return obj;
        });
        this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
          tmeStatusList,
        );
      }
    },
    onEmptyPrjId() {
      if (!common.isEmpty(this.prjInfo.prjId)) {
        return false;
      } else {
        return true;
      }
    },
    //* 진척률 계산
    setPrjRate(stepType, stepCd) {
      const detailStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
      this.prjRateCnt = 0;
      this.prjStep1Cnt = 0;
      this.prjStep2Cnt = 0;
      this.prjStep3Cnt = 0;
      this.currStatus = '';
      this.rateInfo.prjRate = 0;
      this.rateInfo.prjStepRate = 0;
      detailStatusList.reduce((acc, cur) => {
        const obj = { ...cur };
        let stepCdNumber = Number(obj.stepCd.substr(2, 2));

        if (obj.stepStatus === '1') {
          this.prjRateCnt++;
          if (stepCdNumber <= 4) this.prjStep1Cnt++;
          if (4 < stepCdNumber && stepCdNumber <= 8) this.prjStep2Cnt++;
          if (stepCdNumber > 8) this.prjStep3Cnt++;
        }
        if (obj.stepCd === stepCd) {
          this.currStatus = obj.stepStatus;
        }
      }, []);
      if (this.currStatus === '0') {
        this.rateInfo.prjRate = Number(
          ((this.prjRateCnt + 1) * 8.3).toFixed(1),
        );
        if (stepType === '10') {
          this.rateInfo.prjStepRate = (this.prjStep1Cnt + 1) * 25;
        } else if (stepType === '20') {
          this.rateInfo.prjStepRate = (this.prjStep2Cnt + 1) * 25;
        } else {
          this.rateInfo.prjStepRate = (this.prjStep3Cnt + 1) * 25;
        }
      } else {
        this.rateInfo.prjRate = Number((this.prjRateCnt * 8.3).toFixed(1));
        if (stepType === '10') {
          this.rateInfo.prjStepRate = this.prjStep1Cnt * 25;
        } else if (stepType === '20') {
          this.rateInfo.prjStepRate = this.prjStep2Cnt * 25;
        } else {
          this.rateInfo.prjStepRate = this.prjStep3Cnt * 25;
        }
      }
    },
    getSuggestFiles(files) {
      this.paramSuggestFileList = files;
    },
    getOverFiles(files) {
      this.paramOverFileList = files;
    },
    setCustomInfo(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_SA_CUST]({
        prjId: prjId,
      });
    },
    setBizInfo(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_SA_BIZ]({
        prjId: prjId,
      });
    },
    setSuggestInfo(priId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_SUGGEST_INFO]({
        prjId: priId,
      });
    },
    setOverInfo(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_OVER_INFO]({
        prjId: prjId,
      });
    },
    setStepDisabled(value) {
      //*INIT
      this.custDisabled = true;
      this.bizDisabled = true;
      this.suggestDisabled = true;
      this.overDisabled = true;

      const { prjStatus, prjId } = this.prjInfo;
      const { pass, isPrjUser } = common.chkPrjAuth(
        this.loginUserInfo,
        this.prjBaseInfo,
      );

      if (pass) this.msgDisabled = false;
      if (!common.isEmpty(prjId) && value.length > 0) {
        if (prjStatus !== 'C' && prjStatus !== 'B') {
          if (pass) {
            this.custDisabled = false;
            this.bizDisabled = false;
            this.suggestDisabled = false;
          }
          if (isPrjUser) this.overDisabled = false;
        }
      }
    },
    onTab(stepCd, idx) {
      const tmeStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
      this.GV_CURR_IDX = idx;
      // if (idx > 0 && this.gvPrjStatusList[idx - 1].stepStatus == '0') {
      //   common.alert(
      //     'warning',
      //     '이전 단계 입력이 완료되어야 오픈 할 수 있습니다.',
      //   );
      // } else {
      //* D등급 승인 또는 과제 중단인 경우(Stpe1에서 중단된 경우에 block, step2에서 중단인 경우 이동 가능)
      const prevStepStatus = this.gvPrjStatusList[3].stepStatus;
      if (
        prevStepStatus === '3' &&
        (this.prjInfo.prjGrade === 'D' || this.prjInfo.prjStatus === 'B')
      ) {
        // 과제가 중단되어 진행할수 없습니다.
        common.alert('warning', 'NLS0000917');
        return false;
      }

      for (let i = 0; i < tmeStatusList.length; i++) {
        if (i == idx) {
          tmeStatusList[i].now = true;
          tmeStatusList[i].current = !tmeStatusList[i].current;
          tmeStatusList[i].selectedIdx = idx;
          if (idx === 4) {
            if (
              this.loginUserInfo.userId === this.prjBaseInfo.prjUserId &&
              common.isEmpty(this.prjInfo.prjStartDate2)
            ) {
              //* 전체 일정 설정
              this[specializedTasksTypes.actions.FETCH_PROJECT_DATE_INFO]({
                prjId: this.prjInfo.prjId,
              });
              this[specializedTasksTypes.actions.INIT_VIEWS_PROJECT_DATE_POP](
                true,
              );
            }
          }
        } else {
          tmeStatusList[i].now = false;
          tmeStatusList[i].selectedIdx = idx;
        }
      }

      this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        tmeStatusList,
      );
      // }
    },
    initStatusList() {
      const value = this.gvPrjStatusList;
      if (!common.isEmpty(value)) {
        this.GV_STEP_DETAIL_LIST = value;
        this.setStepDisabled(value);
        setTimeout(() => {
          //* scroll 이동
          const idx = this.GV_STEP_DETAIL_LIST[0].selectedIdx;
          if (!common.isEmpty(idx)) {
            const el = this.$refs[this.GV_STEP_DETAIL_LIST[idx].stepCd];
            if (this.GV_STEP_DETAIL_LIST[idx].current && el)
              el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
          }
        }, 1);
      }
    },
    //* STEP 끝난후, STATUS 값 변경  (Map 및 finish class 변경건)
    onCompleteStep(idx) {
      let tmeStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
      tmeStatusList[idx].stepStatus = '1';

      tmeStatusList = tmeStatusList.reduce((acc, cur, i) => {
        const obj = { ...cur };
        if (i === idx + 1) {
          obj.now = true;
          obj.current = true;
          obj.selectedIdx = idx + 1;
        } else {
          obj.now = false;
          obj.current = false;
          obj.selectedIdx = idx + 1;
        }
        acc.push(obj);
        return acc;
      }, []);

      this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        tmeStatusList,
      );
    },

    //* 과제도움말 팝업
    async openHelpPop(prjStepNm, helpMsg) {
      await this[commonTypes.actions.INIT_PROJECT_HELP_INFO]({
        prjStepNm: prjStepNm,
        helpMsg: helpMsg,
      });
      await this[commonTypes.actions.INIT_VIEWS_PRJ_HELP_POP](true);
    },
    //* 과제 메신저 팝업
    async openPrjMsgPop(prjStepId, prjStepNm) {
      //* 메세지 목록조회
      await this[specializedTasksTypes.actions.FETCH_PROJECT_MESSENGER_LIST]({
        prjId: this.prjInfo.prjId,
        prjStepId: prjStepId,
      });
      //* 메세지 목록 읽음상태 update
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_MESSENGER]({
        prjId: this.prjInfo.prjId,
        prjStepId: prjStepId,
      });
      //* 메세지 팝업에 param 전달
      await this[specializedTasksTypes.actions.INIT_PROJECT_MESSENGER_INFO]({
        prjId: this.prjInfo.prjId,
        prjBaseInfo: this.prjBaseInfo,
        prjStepId: prjStepId,
        prjStepNm: prjStepNm,
        prjStatus: this.prjInfo.prjStatus,
      });
      await this[specializedTasksTypes.actions.INIT_VIEWS_MESSENGER_POP](true);
    },
    //* 개선스킬 팝업
    async openPrjSkillPop(prjStepCd) {
      this.setPrjSkillInfoPop(prjStepCd);
      await this[specializedTasksTypes.actions.INIT_VIEWS_SKILL_CONF_POP](true);
    },
    setPrjSkillInfoPop(prjStepCd) {
      const items = this[
        specializedTasksTypes.getters.GET_PROJECT_SKILL_CONF_INFO
      ].skillFileList;
      const prjSkillObj = {};
      items.forEach(item => {
        if (!prjSkillObj[item.prjStepCd]) {
          prjSkillObj[item.prjStepCd] = {
            prjStepCd: item.prjStepCd,
            prjStepNm: item.prjStepNm,
            files: [],
          };
        }
        const file = {
          fileId: item.fileId,
          fileType: item.fileType,
          fileName: item.fileName,
        };
        prjSkillObj[item.prjStepCd].files.push(file);
      });
      this[specializedTasksTypes.actions.INIT_PROJECT_SKILL_CONF_INFO_POP](
        Object.values(prjSkillObj).filter(item => item.prjStepCd === prjStepCd),
      );
    },
    async getFileList() {
      this.custFileList = [];
      this.bizFileList = [];
      this.suggestFileList = [];
      this.overFileList = [];

      for (let item of this.allFileList) {
        switch (item.downloadType) {
          case this.GV_STEP_DETAIL_LIST[4].stepCd:
            this.custFileList.push(item); // 고객파악
            break;
          case this.GV_STEP_DETAIL_LIST[5].stepCd:
            this.bizFileList.push(item); // 질문
            break;
          case this.GV_STEP_DETAIL_LIST[6].stepCd:
            this.suggestFileList.push(item); // 제시
            break;
          case this.GV_STEP_DETAIL_LIST[7].stepCd:
            this.overFileList.push(item); // 입증
            break;
        }
      }

      // await this[commonTypes.actions.INIT_FILE_INFO_LIST]([]);
      // //* 제시
      // await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
      //   downloadType: this.GV_STEP_DETAIL_LIST[6].stepCd,
      //   ownerObjectId: prjId,
      // });
      // let list1 = [...this[commonTypes.getters.GET_FILE_INFO_LIST]];

      // list1 = common.isEmpty(list1) ? [] : list1;
      // this.suggestFileList = list1;

      // //* 입증
      // await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
      //   downloadType: this.GV_STEP_DETAIL_LIST[7].stepCd,
      //   ownerObjectId: prjId,
      // });
      // let list2 = [...this[commonTypes.getters.GET_FILE_INFO_LIST]];

      // list2 = common.isEmpty(list2) ? [] : list2;
      // this.overFileList = list2;
    },
    onErrors4(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid4 = invalid;
      this.GV_validated4 = validate;
      this.GV_errors4 = errors;
    },
    onErrors5(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid5 = invalid;
      this.GV_validated5 = validate;
      this.GV_errors5 = errors;
    },
    onErrors6(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid6 = invalid;
      this.GV_validated6 = validate;
      this.GV_errors6 = errors;
    },
    onErrors7(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid7 = invalid;
      this.GV_validated7 = validate;
      this.GV_errors7 = errors;
    },
    getCustFiles(files) {
      this.paramCustFileList = files;
    },
    getBizFiles(files) {
      this.paramBizFileList = files;
    },
  },
};
</script>
