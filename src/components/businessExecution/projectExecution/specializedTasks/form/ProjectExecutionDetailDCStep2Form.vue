<template>
  <dl class="task-accordion">
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
        <span
          >{{ GV_STEP_DETAIL_LIST[4].stepNm }}
          <em class="required-text">*</em></span
        >
        <span
          class="task-state"
          :class="{ finish: GV_STEP_DETAIL_LIST[4].stepStatus == '1' }"
          >state</span
        >
      </button>
    </dt>
    <dd>
      <validation-observer ref="obs5" v-slot="{ invalid, validated, errors }">
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
            @click="
              onGraspSave('20', GV_STEP_DETAIL_LIST[4].stepCd, '0', 'step1')
            "
            :disabled="graspDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="
              onGraspSave('20', GV_STEP_DETAIL_LIST[4].stepCd, '1', 'step1')
            "
            :disabled="graspDisabled"
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[4].stepNm, 'NLS0000750')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <!-- 현장 조사 및 문제점 -->
          <!-- <span class="text">
            - {{ $t('NLS0000534') }}
            <span class="required-text">*</span>
          </span> -->
          <div class="task-textform">
            <!-- 현장 조사결과 -->
            <label for="test2" class="required-field">
              {{ $t('NLS0000904') }} <span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              rules="requiredCK|required"
              id="fieldResult"
              v-model="graspInfo.fieldResult"
              :disable="graspDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <!-- 중요 문제점 -->
            <label for="test3">{{ $t('NLS0000536') }} </label>
            <com-ck-editor
              v-if="editorRender"
              id="fieldIssue"
              v-model="graspInfo.fieldIssue"
              :disable="graspDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[4].stepCd"
                :fileList="graspFileList"
                :ownerObjectId="prjInfo.prjId"
                :read="graspDisabled"
                @files="getGraspFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
        <!-- ValidateError 컴포넌트 영역 -->
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          step="step1"
          @errors="onErrors"
        ></com-validate-error>
      </validation-observer>
    </dd>
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
      <validation-observer ref="obs6" v-slot="{ invalid, validated, errors }">
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[5].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[5].stepCd)"
            :disabled="causeDisabled"
          >
            <!-- 개선 스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <!-- <button
            type="button"
            class="accordion-btn save"
            @click="
              onCauseSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '0', 'step2')
            "
            :disabled="causeDisabled"
          >
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          //저장
            -->
          <button
            type="button"
            class="accordion-btn finish"
            @click="
              onCauseSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '1', 'step2')
            "
            :disabled="causeDisabled"
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[5].stepNm, 'NLS0000751')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <p class="subtitle-btnbox">
            <!-- 잠재원인 / 검증 -->
            <span class="text required-field">
              -{{ $t('NLS0000537') }}
              <span class="required-text">*</span>
            </span>
            <button
              type="button"
              class="blue-btn"
              @click="openPotenalCausePop('')"
              :disabled="causeDisabled"
            >
              <!-- 잠재원인 추가 -->
              <span>{{ $t('NLS0000538') }}</span>
            </button>
          </p>
          <div class="hms-grid borderno-table task-table">
            <table>
              <colgroup>
                <col />
                <col style="width:20%;" />
              </colgroup>
              <thead>
                <tr>
                  <!-- 잠재원인 -->
                  <th scope="col">{{ $t('NLS0000539') }}</th>
                  <!-- 판정 -->
                  <th scope="col">{{ $t('NLS0000540') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in prjCauseList" :key="item.prjSeq">
                  <td class="cr-pointer" @click="openPotenalCausePop(item)">
                    {{ item.causeItem }}
                  </td>
                  <td class="t_center">{{ item.causeDeterminNm }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[5].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="potenalFileList"
                :read="causeDisabled"
                @files="getPotenalFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
        <!-- ValidateError 컴포넌트 영역 -->
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          step="step2"
          @errors="onErrors"
        ></com-validate-error>
      </validation-observer>
    </dd>
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
      <validation-observer ref="obs7" v-slot="{ invalid, validated, errors }">
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
            :disabled="measureDisabled"
            @click="
              onMeasureSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '0', 'step3')
            "
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            :disabled="measureDisabled"
            @click="
              onMeasureSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '1', 'step3')
            "
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[6].stepNm, 'NLS0000752')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="task-sub-accordion">
          <!-- 개선대책->대책-->
          <p class="title">
            {{ $t('NLS0000457') }}
            <span class="required-text">*</span>
          </p>
          <div class="all-accordion-box">
            <button
              type="button"
              class="sub-accordion-btn"
              :class="{ open: openAll }"
              @click="openMeasureAll(openAll)"
            >
              <span>toggle</span>
            </button>
            <!-- 전체 -->
            {{ $t('NLS0000336') }}
          </div>

          <div class="sub-accordion-wrap">
            <div
              :class="{
                'sub-accordion-box': true,
                current: item.views,
              }"
              v-for="(item, i) in prjMeasureList"
              :key="item.prjSeq"
            >
              <button
                type="button"
                @click="onMeasureClick(item)"
                :class="{
                  'sub-accordion-btn': true,
                  [`open`]: item.views,
                }"
              >
                <span>toggle</span>
              </button>
              <span
                :class="{
                  'task-state': true,
                  finish: item.measureTitle,
                }"
              >
                state
              </span>
              <div class="accordion-line">
                <!-- 잠재원인 -->
                <span class="sub-title">{{ $t('NLS0000539') }}</span>
                <p class="text">{{ item.causeItem }}</p>
              </div>
              <div class="task-inputform type4">
                <!-- 개선대책 -->
                <label for="measureTitle" class="required-field">
                  {{ $t('NLS0000545') }}
                  <span class="required-text">*</span>
                </label>
                <com-input-text
                  type="text"
                  :id="`measureTitle_${i}`"
                  rules="required"
                  v-model="item.measureTitle"
                  :disable="measureDisabled"
                />
              </div>
              <div class="task-textform type1">
                <!-- 상세내용 -->
                <label for="measureContent" class="required-field">
                  {{ $t('NLS0000546') }}
                  <span class="required-text">*</span>
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  rules="requiredCK|required"
                  :id="`measureContent_${i}`"
                  v-model="item.measureContent"
                  :disable="measureDisabled"
                ></com-ck-editor>
              </div>
            </div>

            <!-- <div class="sub-accordion-box"> -->
            <div class="hmstask-form-box">
              <!-- 파일첨부 accordion-line -->
              <!-- <span class="sub-title">{{ $t('NLS0000905') }}</span> -->
              <div class="hms-upload">
                <div id="products1">
                  <com-upload-file
                    :multiple="true"
                    :downloadType="GV_STEP_DETAIL_LIST[6].stepCd"
                    :ownerObjectId="prjInfo.prjId"
                    :fileList="measureFileList"
                    :read="measureDisabled"
                    @files="getMeasureFiles"
                  ></com-upload-file>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
        <!-- ValidateError 컴포넌트 영역 -->
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          step="step3"
          @errors="onErrors"
        ></com-validate-error>
      </validation-observer>
    </dd>
    <dt
      :class="{ current: GV_STEP_DETAIL_LIST[7].current }"
      :ref="GV_STEP_DETAIL_LIST[7].stepCd"
      @click="onTab(GV_STEP_DETAIL_LIST[7].stepCd, 7)"
    >
      <button type="button" class="task-accordion-btn">
        <span
          >{{ GV_STEP_DETAIL_LIST[7].stepNm }}
          <em class="required-text">*</em></span
        >
        <span
          class="task-state"
          :class="{ finish: GV_STEP_DETAIL_LIST[7].stepStatus == '1' }"
          >state</span
        >
      </button>
    </dt>
    <dd>
      <validation-observer ref="obs8" v-slot="{ invalid, validated, errors }">
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
            :disabled="planDisabled"
            @click="
              onPlanSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '0', 'step4')
            "
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            :disabled="planDisabled"
            @click="
              onPlanSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '1', 'step4')
            "
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[7].stepNm, 'NLS0000753')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <p
            class="sub-title"
            v-if="loginUserInfo.userId == prjBaseInfo.prjUserId"
          >
            <!-- 소요 자원 계획 -->
            {{ $t('NLS0000547') }}
          </p>
          <div class="task-textform type2">
            <!-- 소요 예산 -->
            <label for="prjBudget">
              {{ $t('NLS0000893') }}
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="prjBudget"
              v-model="prjPlanInfo.prjBudget"
              :disable="planDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform type2">
            <!-- 소요 인력 -->
            <label for="prjMan">
              {{ $t('NLS0000894') }}
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="prjMan"
              v-model="prjPlanInfo.prjMan"
              :disable="planDisabled"
            ></com-ck-editor>
          </div>
          <p
            class="sub-title line"
            v-if="
              loginUserInfo.userId == prjBaseInfo.prjManagerId &&
                prjInfo.prjStepStatus2 == '1'
            "
          >
            <!-- 대책수립 대단계 수행검토 -->
            {{ $t('NLS0000548') }}
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
              @click="onPrjPlanSave('B', '3', GV_STEP_DETAIL_LIST[7].stepCd)"
            >
              <!-- 중단 -->
              <span>{{ $t('NLS0000600') }}</span>
            </button>
            <button
              type="button"
              class="red-btn"
              @click="onPrjPlanSave('A', '2', GV_STEP_DETAIL_LIST[7].stepCd)"
            >
              <!-- 수행승인 -->
              <span>{{ $t('NLS0000516') }}</span>
            </button>
          </div>
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

          <div class="hmstask-form-box">
            <!-- 파일첨부  accordion-line -->
            <!-- <span class="sub-title">{{ $t('NLS0000905') }}</span> -->
            <div class="hms-upload">
              <div id="products1">
                <com-upload-file
                  :multiple="true"
                  :downloadType="GV_STEP_DETAIL_LIST[7].stepCd"
                  :fileList="planFileList"
                  :ownerObjectId="prjInfo.prjId"
                  :read="planDisabled"
                  @files="getPlanFiles"
                ></com-upload-file>
              </div>
            </div>
          </div>
        </div>
        <!-- ValidateError 컴포넌트 영역 -->
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          step="step4"
          @errors="onErrors"
        ></com-validate-error>
      </validation-observer>
    </dd>
  </dl>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComInputText from '@/components/common/global/ComInputText';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { specializedTasksStore, commonStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'ProjectExecutionDetailDCStep2Form',
  mixins: [specializedTasksStore, commonStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComInputText,
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
      GV_STEP_LIST: common.getCodeList('PRJ007'),
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
      graspFileList: [],
      paramGraspFileList: [],
      potenalFileList: [],
      paramPotenalFileList: [],
      measureFileList: [],
      paramMeasureFileList: [],
      planFileList: [],
      paramPlanFileList: [],
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
      //* disable 처리
      graspDisabled: true,
      causeDisabled: true,
      measureDisabled: true,
      planDisabled: true,
      msgDisabled: true,
      //* validation
      GV_invalid: {},
      GV_validated: {},
      GV_errors: {},
      //* 현상파악
      graspInfo: {
        fieldResult: '',
        fieldIssue: '',
      },
      //* 원인도출 List
      prjCauseList: [],
      //* 대책수립 List
      prjMeasureList: [],
      //* 상세계획
      prjPlanInfo: { prjBudget: '', prjMan: '' },
      //* 대책수립 btn All
      openAll: true,
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
    loginUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
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
    getPrjCauseList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_CAUSE_LIST];
      return item;
    },
    getAllFileList(state) {
      const item = this[commonTypes.getters.GET_FILE_INFO_LIST];
      state.allFileList = item;
      return item;
    },
    getAddCause() {
      return this[specializedTasksTypes.getters.GET_ADD_CAUSE_LIST];
    },
  },
  watch: {
    getPrjInfo: function(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.prjBaseInfo = value.prjBaseUserInfo;
        this.prjStatusList = value.prjStatusList;
        if (!common.isEmpty(value.prjPlanInfo))
          this.prjPlanInfo = value.prjPlanInfo;
        if (!common.isEmpty(value.prjGraspInfo))
          this.graspInfo = value.prjGraspInfo;

        // if (this.prjInfo.prjStatus === 'C') {
        //   this.graspDisabled = true;
        //   this.causeDisabled = true;
        //   this.measureDisabled = true;
        //   this.planDisabled = true;
        // }
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
    getPrjCauseList: function(value) {
      this.prjCauseList = value;
      const prjMeasureList = value.reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.causeDetermin == '10') {
          if (obj.measureTitle == null) {
            obj.measureTitle = '';
          }
          if (!obj.measureContent) {
            obj.measureContent = '';
          }
          obj.views = true;
          acc.push(obj);
        }
        return acc;
      }, []);
      this.$set(this, 'prjMeasureList', prjMeasureList);
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      //* 첨부파일 (현상파악, 원인도출, 대책수립)
      this.getFileList();
    },
    getAddCause: function(value) {
      if (!common.isEmpty(value)) {
        this.setPrjRate('20', this.GV_STEP_DETAIL_LIST[5].stepCd);
        value.prjRate = this.rateInfo.prjRate;
        value.prjStepRate = this.rateInfo.prjStepRate;
        this[specializedTasksTypes.actions.UPDATE_PROJECT_CAUSE](value);
      }
    },
  },
  async created() {
    // this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    this.setPrjInfo(
      this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO],
    );
    this.GV_SKILL_STEP = this[
      specializedTasksTypes.getters.GET_PROJECT_SKILL_STEP_INFO
    ];
    if (
      common.isEmpty(this.$route.params.type) &&
      this.$route.params.type != 'new' &&
      this.$route.params.prjId
    ) {
      await this[specializedTasksTypes.actions.FETCH_PROJECT_CAUSE_LIST]({
        prjId: this.GV_PRJ_ID,
      });
    }

    this.initStatusList();
  },
  mounted() {
    this.$refs.obs5.validate();
    this.$refs.obs6.validate();
    this.$refs.obs7.validate();
    this.$refs.obs8.validate();
    this.initStatusList();
    this.getFileList();
    common.delay(() => {
      this.editorRender = true;
    }, 1000);
  },
  methods: {
    setStepDisabled(value) {
      //*INIT
      this.graspDisabled = true;
      this.causeDisabled = true;
      this.measureDisabled = true;
      this.planDisabled = true;

      const { prjStatus, prjId } = this.prjInfo;
      const { pass, isPrjUser } = common.chkPrjAuth(
        this.loginUserInfo,
        this.prjBaseInfo,
      );

      if (pass) this.msgDisabled = false;
      if (!common.isEmpty(prjId) && value.length > 0) {
        if (prjStatus !== 'C' && prjStatus !== 'B' && pass) {
          this.graspDisabled = false;
          this.causeDisabled = false;
          this.measureDisabled = false;
        }
        if (prjStatus !== 'C' && prjStatus !== 'B' && isPrjUser) {
          this.planDisabled = false;
        }
      }
    },
    //* 현상 파악
    async onGraspSave(stepType, stepCd, stepStatus, step) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid[`_${step}`]) {
        common.alert('warning', this.GV_errors[`_${step}`].msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        graspInfo: this.graspInfo,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramGraspFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_GRASP](params);
      if (stepStatus === '1') {
        this.onCompleteStep(4);
      }
    },
    //* 원인도출
    async onCauseSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.prjCauseList.length === 0) {
        // 잠재원인을 추가해주세요.
        common.alert('warning', 'NLS0001160');
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramPotenalFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_CAUSE](params);
      if (stepStatus === '1') {
        this.onCompleteStep(5);
      }
    },
    //* 대책수립
    async onMeasureSave(stepType, stepCd, stepStatus, step) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      // if (stepStatus == '1') {
      if (this.GV_invalid[`_${step}`]) {
        common.alert('warning', this.GV_errors[`_${step}`].msg);
        return false;
      }
      // }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        prjMeasureList: this.prjMeasureList,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramMeasureFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_MEASURE](params);
      if (stepStatus === '1') {
        this.onCompleteStep(6);
      }
    },
    //* 상세계획
    async onPlanSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        prjPlanInfo: this.prjPlanInfo,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramPlanFileList,
      };
      if (stepStatus === '1') {
        // 대책수립 대단계를 완료하고 검토자에게 수행승인을 요청합니다.  취소를 누르면 완료는 되지않고 저장만 됩니다.
        common.confirm(
          this.$t('NLS0000947').replace(
            '#stepName#',
            'STEP 3',
            //this.GV_STEP_LIST[2].cdNm,
          ),
          async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_PLAN](
              params,
            );
            this.onCompleteStep(7);
          },
          async () => {
            params.stepStatus = '0';
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_PLAN](
              params,
            );
          },
        );
      } else {
        //* 수행승인 된 과제 저장 누른 경우
        if (this.prjInfo.prjStepStatus2 === '2') {
          // 저장 시 변경된 내용으로 재검토요청을 하여야 합니다. 저장하실 경우 '확인'버튼을 눌러주세요.
          common.confirm('NLS0001386', async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_PLAN](
              params,
            );
          });
        } else {
          await this[specializedTasksTypes.actions.UPDATE_PROJECT_PLAN](params);
        }
      }
    },
    //* 대책수립 수행검토
    async onPrjPlanSave(prjStatus, prjStepStatus, stepCd) {
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
        stepType: '20',
        manager: true,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_MANAGER_PLAN](
        param,
      );
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
    onTab(stepCd, idx) {
      const tmeStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
      this.GV_CURR_IDX = idx;
      // if (idx > 0 && this.gvPrjStatusList[idx - 1].stepStatus == '0') {
      //   common.alert(
      //     'warning',
      //     '이전 단계 입력이 완료되어야 오픈 할 수 있습니다.',
      //   );
      // } else {
      // this.prjInfo.prjStepStatus1 === '3'
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
        if (i == this.GV_CURR_IDX) {
          tmeStatusList[i].now = true;
          tmeStatusList[i].current = !tmeStatusList[i].current;
          tmeStatusList[i].selectedIdx = idx;
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
    getGraspFiles(files) {
      this.paramGraspFileList = files;
    },
    getPotenalFiles(files) {
      this.paramPotenalFileList = files;
    },
    getMeasureFiles(files) {
      this.paramMeasureFileList = files;
    },
    getPlanFiles(files) {
      this.paramPlanFileList = files;
    },
    async getFileList() {
      this.graspFileList = [];
      this.potenalFileList = [];
      this.measureFileList = [];
      this.planFileList = [];
      for (let item of this.allFileList) {
        switch (item.downloadType) {
          case this.GV_STEP_DETAIL_LIST[4].stepCd:
            this.graspFileList.push(item); // 현상파악
            break;
          case this.GV_STEP_DETAIL_LIST[5].stepCd:
            this.potenalFileList.push(item); // 원인도출
            break;
          case this.GV_STEP_DETAIL_LIST[6].stepCd:
            this.measureFileList.push(item); // 대책수립
            break;
          case this.GV_STEP_DETAIL_LIST[7].stepCd:
            this.planFileList.push(item); // 상세계획
            break;
        }
      }
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
    openPotenalCausePop(item) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      //* 잠재원인 추가팝업
      if (!common.isEmpty(item)) {
        this[specializedTasksTypes.actions.INIT_PROJECT_CAUSE_INFO](item);
      } else {
        this[specializedTasksTypes.actions.INIT_PROJECT_CAUSE_INFO]({
          prjId: this.prjInfo.prjId,
          prjSeq: '',
          causeItem: '',
          causeDetermin: '10',
          causeVerifi: '',
        });
      }
      this[specializedTasksTypes.actions.INIT_VIEWS_POTENTIAL_CAUSE_POP](true);
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
    //* 대책수립 btn All event
    openMeasureAll(openFlag) {
      this.openAll = !openFlag;

      this.prjMeasureList = this.prjMeasureList.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.views = this.openAll;
        acc.push(obj);
        return acc;
      }, []);
    },
    onErrors(invalid, validate, errors, step) {
      //* validation check 결과값
      this.GV_invalid[`_${step}`] = invalid;
      this.GV_validated[`_${step}`] = validate;
      this.GV_errors[`_${step}`] = errors;
    },
    onMeasureClick(item) {
      item.views = !item.views;
    },
    setPrjInfo(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.prjBaseInfo = value.prjBaseUserInfo;
        this.prjStatusList = value.prjStatusList;
        if (!common.isEmpty(value.prjPlanInfo))
          this.prjPlanInfo = value.prjPlanInfo;
        if (!common.isEmpty(value.prjGraspInfo))
          this.graspInfo = value.prjGraspInfo;
      }
    },
  },
};
</script>
