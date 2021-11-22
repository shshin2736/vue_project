<template>
  <dl class="task-accordion">
    <validation-observer
      ref="obs8"
      v-slot="{ invalid, validated, errors }"
      tag="div"
    >
      <p
        class="taskstep-title"
        :class="{ current: 7 < GV_STEP_DETAIL_LIST[0].selectedIdx }"
      >
        <span>STEP3</span>
        {{ GV_STEP_LIST[2].cdNm }}
      </p>
      <dl>
        <dt
          :class="{ current: GV_STEP_DETAIL_LIST[8].current }"
          :ref="GV_STEP_DETAIL_LIST[8].stepCd"
          @click="onTab(GV_STEP_DETAIL_LIST[8].stepCd, 8)"
        >
          <button type="button" class="task-accordion-btn">
            <span>{{ GV_STEP_DETAIL_LIST[8].stepNm }} </span>
            <span
              class="task-state"
              :class="{ finish: GV_STEP_DETAIL_LIST[8].stepStatus == '1' }"
              >state</span
            >
          </button>
        </dt>
        <dd>
          <div class="accordion-inner-btnbox">
            <button
              v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[8].stepCd] === true"
              type="button"
              class="accordion-btn skill"
              @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[8].stepCd)"
            >
              <!-- 개선스킬 -->
              <span>{{ $t('NLS0000903') }} </span>
            </button>
            <button
              type="button"
              class="accordion-btn save"
              @click="onPilotSave('30', GV_STEP_DETAIL_LIST[8].stepCd, '0')"
              :disabled="pilotDisabled"
            >
              <!-- 저장 -->
              <span>{{ $t('NLS0000074') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn finish"
              @click="onPilotSave('30', GV_STEP_DETAIL_LIST[8].stepCd, '1')"
              :disabled="pilotDisabled"
            >
              <!-- 완료 -->
              <span>{{ $t('NLS0000829') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn message"
              :class="{ on: GV_MSG_CNT_LIST[8].checked === '1' }"
              @click="
                openPrjMsgPop(
                  GV_STEP_DETAIL_LIST[8].stepCd,
                  GV_STEP_DETAIL_LIST[8].stepNm,
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
              @click="openHelpPop(GV_STEP_DETAIL_LIST[8].stepNm, 'NLS0000762')"
            >
              <!-- 도움말 -->
              <span>{{ $t('NLS0000823') }}</span>
            </button>
          </div>
          <div class="all-accordion-box type-button">
            <button
              type="button"
              class="sub-accordion-btn"
              :class="{ open: openAll }"
              @click="openPilotAll(openAll)"
            >
              <span>toggle</span>
            </button>
            {{ $t('NLS0000336') }}

            <!--<button
              type="button"
              class="blue-btn f_right"
              @click="onPilotAdd"
              :disabled="pilotDisabled"
            >
               추가
              <span>{{ $t('NLS0000067') }}</span>
            </button>-->
          </div>
          <div class="sub-accordion-wrap">
            <div
              :class="{
                'sub-accordion-box': true,
                current: item.views,
              }"
              v-for="(item, i) in pilotList"
              :key="i"
            >
              <button
                type="button"
                @click="onPilotClick(item)"
                :class="{
                  'sub-accordion-btn': true,
                  [`open`]: item.views,
                }"
              >
                <span>toggle</span>
              </button>

              <div class="task-inputform type4">
                <label for="pilotTitle" class="required-field">
                  <!-- 개발방향 -->
                  {{ $t('NLS0000576') }}
                  <span class="required-text">*</span>
                </label>
                <com-input-text
                  type="text"
                  :id="`direction${i}`"
                  rules="required"
                  v-model="item.directionItem"
                  :disable="true"
                />
              </div>
              <div class="task-textform">
                <label for="pilotResult">
                  <!-- Pilot Test / 정기점검 결과 -->
                  {{ $t('NLS0000578') }}
                  <span class="required-text">*</span>
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  :id="`pilotResult_${i}`"
                  v-model="item.pilotResult"
                  :disable="pilotDisabled"
                ></com-ck-editor>
              </div>
              <div class="task-textform">
                <label for="pilotMeasure">
                  <!-- 문제점 및 보완 대책 -->
                  {{ $t('NLS0000580') }}
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  :id="`pilotMeasure_${i}`"
                  v-model="item.pilotMeasure"
                  :disable="pilotDisabled"
                ></com-ck-editor>
              </div>
            </div>

            <!-- <div class="sub-accordion-box"> -->
            <div class="hmstask-form-box">
              <!-- 파일첨부 accordion-line-->
              <!-- <span class="sub-title">{{ $t('NLS0000905') }}</span> -->
              <div class="hms-upload">
                <div id="products1">
                  <com-upload-file
                    :multiple="true"
                    :downloadType="GV_STEP_DETAIL_LIST[8].stepCd"
                    :ownerObjectId="prjInfo.prjId"
                    :fileList="pilotFileList"
                    :read="pilotDisabled"
                    @files="getPilotFiles"
                  ></com-upload-file>
                </div>
              </div>
            </div>
            <!-- </div> -->

            <!-- 끝 -->
          </div>
        </dd>
      </dl>

      <!-- ValidateError 컴포넌트 영역  -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors8"
      ></com-validate-error>
    </validation-observer>
    <validation-observer
      ref="obs9"
      v-slot="{ invalid, validated, errors }"
      tag="div"
    >
      <dl>
        <dt
          :class="{ current: GV_STEP_DETAIL_LIST[9].current }"
          :ref="GV_STEP_DETAIL_LIST[9].stepCd"
          @click="onTab(GV_STEP_DETAIL_LIST[9].stepCd, 9)"
        >
          <button type="button" class="task-accordion-btn">
            <span
              >{{ GV_STEP_DETAIL_LIST[9].stepNm }}
              <em class="required-text">*</em></span
            >
            <span
              class="task-state"
              :class="{ finish: GV_STEP_DETAIL_LIST[9].stepStatus == '1' }"
              >state</span
            >
          </button>
        </dt>
        <dd>
          <div class="accordion-inner-btnbox">
            <button
              v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[9].stepCd] === true"
              type="button"
              class="accordion-btn skill"
              @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[9].stepCd)"
            >
              <!-- 개선스킬 -->
              <span>{{ $t('NLS0000903') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn save"
              @click="onEffectSave('30', GV_STEP_DETAIL_LIST[9].stepCd, '0')"
            >
              <!-- 저장 -->
              <span>{{ $t('NLS0000074') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn finish"
              @click="onEffectSave('30', GV_STEP_DETAIL_LIST[9].stepCd, '1')"
              :disabled="effectDisabled"
            >
              <!-- 완료 -->
              <span>{{ $t('NLS0000829') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn message"
              :class="{ on: GV_MSG_CNT_LIST[9].checked === '1' }"
              @click="
                openPrjMsgPop(
                  GV_STEP_DETAIL_LIST[9].stepCd,
                  GV_STEP_DETAIL_LIST[9].stepNm,
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
              @click="openHelpPop(GV_STEP_DETAIL_LIST[9].stepNm, 'NLS0000763')"
            >
              <!-- 도움말 -->
              <span>{{ $t('NLS0000823') }}</span>
            </button>
          </div>
          <div class="hmstask-form-box">
            <div class="task-textform">
              <label for="qntEff" class="required-field">
                <!-- 정량적 효과 -->
                - {{ $t('NLS0000552') }}<span class="required-text">*</span>
              </label>
              <com-ck-editor
                v-if="editorRender"
                id="qntEff"
                rules="requiredCK|required"
                v-model="effectInfo.qntEff"
                :disable="effectDisabled"
              ></com-ck-editor>
            </div>
            <div class="task-textform">
              <!-- 정성적 효과 -->
              <label for="qltEff" class="required-field"
                >- {{ $t('NLS0000553') }}
                <span class="required-text">*</span></label
              >
              <com-ck-editor
                v-if="editorRender"
                id="qltEff"
                rules="requiredCK|required"
                v-model="effectInfo.qltEff"
                :disable="effectDisabled"
              ></com-ck-editor>
            </div>

            <div class="task-textform">
              <label for="prjOutput">
                <!-- 최종산출물 -->
                - {{ $t('NLS0000581') }}
              </label>
              <com-ck-editor
                v-if="editorRender"
                id="prjOutput"
                v-model="effectInfo.prjOutput"
                :disable="effectDisabled"
              ></com-ck-editor>
            </div>

            <div class="task-textform">
              <label for="usePlan">
                <!-- 활용 계획 -->
                - {{ $t('NLS0000582') }}
              </label>
              <com-ck-editor
                v-if="editorRender"
                id="usePlan"
                v-model="effectInfo.usePlan"
                :disable="effectDisabled"
              ></com-ck-editor>
            </div>

            <div class="hms-upload">
              <div id="products">
                <com-upload-file
                  :multiple="true"
                  :downloadType="GV_STEP_DETAIL_LIST[9].stepCd"
                  :ownerObjectId="prjInfo.prjId"
                  :fileList="effectFileList"
                  :read="effectDisabled"
                  @files="getEffectFiles"
                ></com-upload-file>
              </div>
            </div>
          </div>
        </dd>
      </dl>
      <!-- ValidateError 컴포넌트 영역  -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors9"
      ></com-validate-error>
    </validation-observer>
    <validation-observer
      ref="obs10"
      v-slot="{ invalid, validated, errors }"
      tag="div"
    >
      <dl>
        <dt
          :class="{ current: GV_STEP_DETAIL_LIST[10].current }"
          :ref="GV_STEP_DETAIL_LIST[10].stepCd"
          @click="onTab(GV_STEP_DETAIL_LIST[10].stepCd, 10)"
        >
          <button type="button" class="task-accordion-btn">
            <span
              >{{ GV_STEP_DETAIL_LIST[10].stepNm }}
              <em class="required-text">*</em></span
            >
            <span
              class="task-state"
              :class="{ finish: GV_STEP_DETAIL_LIST[10].stepStatus == '1' }"
              >state</span
            >
          </button>
        </dt>
        <dd>
          <div class="accordion-inner-btnbox">
            <button
              v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[10].stepCd] === true"
              type="button"
              class="accordion-btn skill"
              @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[10].stepCd)"
            >
              <!-- 개선스킬 -->
              <span>{{ $t('NLS0000903') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn save"
              :disabled="reportDisabled"
              @click="onReportSave('30', GV_STEP_DETAIL_LIST[10].stepCd, '0')"
            >
              <!-- 저장 -->
              <span>{{ $t('NLS0000074') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn finish"
              :disabled="reportDisabled"
              @click="onReportSave('30', GV_STEP_DETAIL_LIST[10].stepCd, '1')"
            >
              <!-- 완료 -->
              <span>{{ $t('NLS0000829') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn message"
              :class="{ on: GV_MSG_CNT_LIST[10].checked === '1' }"
              @click="
                openPrjMsgPop(
                  GV_STEP_DETAIL_LIST[10].stepCd,
                  GV_STEP_DETAIL_LIST[10].stepNm,
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
              @click="openHelpPop(GV_STEP_DETAIL_LIST[10].stepNm, 'NLS0000764')"
            >
              <!-- 도움말 -->
              <span>{{ $t('NLS0000823') }}</span>
            </button>
          </div>
          <div class="hmstask-form-box">
            <!-- 보고서 항목 설정 -->
            <p class="sub-title">{{ $t('NLS0000583') }}</p>
            <div class="task-check-wrap">
              <!-- 계획검토->과제정의 -->
              <p class="title">{{ $t('NLS0001455') }}</p>
              <div class="task-check-wrap__row">
                <div class="task-check-form">
                  <!-- 기본정보 -->
                  <com-input-text
                    type="checkbox"
                    id="check1"
                    value="RD01"
                    :check="reportCheck['RD01'] === true ? true : false"
                    labelId="check1"
                    :labelTitle="$t('NLS0000196')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 추진개요 -->
                  <com-input-text
                    type="checkbox"
                    id="check2"
                    value="RD02"
                    :check="reportCheck['RD02'] === true ? true : false"
                    labelId="check2"
                    :labelTitle="$t('NLS0000503')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 소요자원 -->
                  <com-input-text
                    type="checkbox"
                    id="check3"
                    value="RD03"
                    :check="reportCheck['RD03'] === true ? true : false"
                    labelId="check3"
                    :labelTitle="$t('NLS0000504')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
              </div>
            </div>
            <div class="task-check-wrap">
              <!-- 연구/개발->개발 -->
              <p class="title">{{ $t('NLS0001459') }}</p>
              <div class="task-check-wrap__row">
                <div class="task-check-form">
                  <!-- 시장분석 -->
                  <com-input-text
                    type="checkbox"
                    id="check10"
                    value="RD05"
                    :check="reportCheck['RD05'] === true ? true : false"
                    labelId="check10"
                    :labelTitle="$t('NLS0000562')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
                <div class="task-check-form">
                  <!-- CSF도출 -->
                  <com-input-text
                    type="checkbox"
                    id="check20"
                    value="RD06"
                    :check="reportCheck['RD06'] === true ? true : false"
                    labelId="check20"
                    :labelTitle="$t('NLS0000565')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 컨셉수립 -->
                  <com-input-text
                    type="checkbox"
                    id="check30"
                    value="RD07"
                    :check="reportCheck['RD07'] === true ? true : false"
                    labelId="check30"
                    :labelTitle="$t('NLS0000571')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 상세계획->개발 -->
                  <com-input-text
                    type="checkbox"
                    id="check40"
                    value="RD08"
                    :check="reportCheck['RD08'] === true ? true : false"
                    labelId="check40"
                    :labelTitle="$t('NLS0001459')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
              </div>
            </div>
            <div class="task-check-wrap">
              <!-- 적용완료->결과 -->
              <p class="title">{{ $t('NLS0001446') }}</p>
              <div class="task-check-wrap__row">
                <div class="task-check-form">
                  <!-- 현장적용->판매전략 -->
                  <com-input-text
                    type="checkbox"
                    id="check11"
                    value="RD09"
                    :check="reportCheck['RD09'] === true ? true : false"
                    labelId="check11"
                    :labelTitle="$t('NLS0001460')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 효과파악 -->
                  <com-input-text
                    type="checkbox"
                    id="check21"
                    value="RD10"
                    :check="reportCheck['RD10'] === true ? true : false"
                    labelId="check21"
                    :labelTitle="$t('NLS0000551')"
                    :disable="reportDisabled"
                    @change="reportChecked"
                  />
                </div>
              </div>
            </div>
            <!-- 보고서 스킨 설정 -->
            <p class="sub-title line" style="border-bottom: 1px solid #FFF;">
              {{ $t('NLS0000556') }}
            </p>
            <div class="task-inputform type2 type-report">
              <com-input-text
                type="text"
                v-model="reportInfo.reportSkinNm"
                :disable="reportDisabled"
              />
              <button
                type="button"
                class="magnifier-btn-black"
                @click="openProjectReportPop"
                :disabled="reportDisabled"
              >
                더찾기
              </button>
              <button
                type="button"
                class="white-btn html-btn"
                @click="openReportDetailPop('preview')"
              >
                <!-- 보고서 보기 -->
                <span>{{ $t('NLS0000911') }}</span>
              </button>
            </div>
          </div>
        </dd>
      </dl>
      <!-- ValidateError 컴포넌트 영역  -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors10"
      ></com-validate-error>
    </validation-observer>
    <validation-observer
      ref="obs11"
      v-slot="{ invalid, validated, errors }"
      tag="div"
    >
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[11].current }"
        :ref="GV_STEP_DETAIL_LIST[11].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[11].stepCd, 11)"
      >
        <button type="button" class="task-accordion-btn">
          <span
            >{{ GV_STEP_DETAIL_LIST[11].stepNm }}
            <em class="required-text">*</em></span
          >
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[11].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[11].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[11].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn report"
            @click="openReportDetailPop('review')"
          >
            <!-- 보고서 -->
            <span>{{ $t('NLS0000186') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            :disabled="
              prjBaseInfo.prjManagerId != loginUserInfo.userId || finishDisabled
            "
            @click="onFinishSave('30', GV_STEP_DETAIL_LIST[11].stepCd, '0')"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[11].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[11].stepCd,
                GV_STEP_DETAIL_LIST[11].stepNm,
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[11].stepNm, 'NLS0000765')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <!-- 과제 완료 및 우수과제 선정 -->
          <p class="sub-title">{{ $t('NLS0000584') }}</p>
          <div class="task-textform type2">
            <!-- 과제 완료일 -->
            <p class="textform-title">
              {{ $t('NLS0000585') }} : {{ prjCompDate }}
            </p>
            <label for="prjAdvice" class="required-field">
              <!-- 검토의견 -->
              {{ $t('NLS0000586') }}<span class="required-text">*</span></label
            >

            <com-ck-editor
              v-if="editorRender"
              id="prjAdvice"
              rules="requiredCK|required"
              v-model="prjAdvice"
              :disable="
                prjBaseInfo.prjManagerId != loginUserInfo.userId ||
                  finishDisabled
              "
            ></com-ck-editor>
          </div>
          <div class="page__btn-bbox type-center">
            <button
              type="button"
              class="green-btn"
              @click="onFinishSave('30', GV_STEP_DETAIL_LIST[11].stepCd, '1')"
              v-if="
                prjBaseInfo.prjManagerId == loginUserInfo.userId &&
                  prjInfo.prjStepStatus3 == '1'
              "
            >
              <!-- 과제 완료하기 -->
              <span>{{ $t('NLS0000587') }}</span>
            </button>
            <button
              type="button"
              class="darkgray-btn"
              @click="onBestProject"
              v-if="
                (prjBaseInfo.prjManagerId === loginUserInfo.userId &&
                  prjInfo.prjStepStatus3 === '6' &&
                  prjInfo.prjBestYn == null) ||
                  prjInfo.prjBestYn == 'N'
              "
            >
              <!-- 우수과제 선정 -->
              <span>{{ $t('NLS0000588') }}</span>
            </button>
          </div>
        </div>
      </dd>
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors11"
      ></com-validate-error>
    </validation-observer>
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
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectExecutionDetailRDStep3Form',
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
      GV_STEP_LIST: common.getCodeList('PRJ008'),
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

      pilotFileList: [],
      paramPilotFileList: [],
      effectFileList: [],
      paramEffectFileList: [],
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
      //* 현장적용
      pilotList: [],
      openAll: true,
      //* 효과파악
      effectInfo: { qntEff: '', qltEff: '', prjOutput: '', usePlan: '' },
      //* 종료보고
      reportCheck: {
        RD01: true,
        RD02: true,
        RD03: true,
        RD05: true,
        RD06: true,
        RD07: true,
        RD08: true,
        RD09: true,
        RD10: true,
      },
      reportList: [],
      reportInfo: {
        reportSkinNm: common.getCodeList('PRJ014')[0].cdNm,
        reportSkinCd: common.getCodeList('PRJ014')[0].cd,
      },
      //* 과제완료
      prjAdvice: '',
      prjCompDate: '',
      //* Disabled
      pilotDisabled: true,
      effectDisabled: true,
      reportDisabled: true,
      finishDisabled: true,
      msgDisabled: true,
      //* validation
      GV_invalid8: '',
      GV_validated8: '',
      GV_errors8: {},

      GV_invalid9: '',
      GV_validated9: '',
      GV_errors9: {},

      GV_invalid10: '',
      GV_validated10: '',
      GV_errors10: {},

      GV_invalid11: '',
      GV_validated11: '',
      GV_errors11: {},
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
    getPilotList() {
      // const item = this[specializedTasksTypes.getters.GET_PROJECT_PILOT_LIST];
      const item = this[specializedTasksTypes.getters.GET_PROJECT_DEV_LIST];
      return item;
    },
    getEffectInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_RD_EFFECT];
      return item;
    },
    getReportInfo() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_REPORT_SKIN_INFO
      ];
      return item;
    },
    getAllFileList(state) {
      const item = this[commonTypes.getters.GET_FILE_INFO_LIST];
      state.allFileList = item;
      return item;
    },
  },
  watch: {
    getPrjInfo: function(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.prjBaseInfo = value.prjBaseUserInfo;
        this.prjStatusList = value.prjStatusList;

        //* 현장적용 LIST 세팅
        this.setPilotList(this.prjInfo.prjId);
        //* 효과파악 INFO 세팅
        this.setEffectInfo(this.prjInfo.prjId);
        //* 종료보고
        this.reportCheck = {
          RD01: true,
          RD02: true,
          RD03: true,
          RD05: true,
          RD06: true,
          RD07: true,
          RD08: true,
          RD09: true,
          RD10: true,
        };
        this.reportList = [];
        this.resetReportList();
        if (!common.isEmpty(this.prjInfo.reportSkin)) {
          // if (!common.isEmpty(value.prjReportList)) {
          //   this.reportList = value.prjReportList.reduce((acc, cur) => {
          //     const obj = { ...cur };
          //     if (obj.reportYn === 'Y') acc.push(obj.prjStepCd);
          //     return acc;
          //   }, []);
          //   value.prjReportList.forEach(value => {
          //     this.reportCheck[value.prjStepCd] =
          //       value.reportYn == 'Y' ? true : false;
          //   });
          // }
          this.$set(
            this.reportInfo,
            'reportSkinCd',
            !common.isEmpty(this.prjInfo.reportSkin)
              ? this.prjInfo.reportSkin
              : this.reportInfo.reportSkinCd,
          );
          this.$set(
            this.reportInfo,
            'reportSkinNm',
            !common.isEmpty(this.prjInfo.reportSkinNm)
              ? this.prjInfo.reportSkinNm
              : this.reportInfo.reportSkinNm,
          );
        } else {
          // Object.entries(this.reportCheck).forEach(([key]) => {
          //   if (key != 'RD06' && key != 'RD09') {
          //     this.reportCheck[key] = true;
          //     this.reportList.push(key);
          //   }
          // });
        }
        //* 과제완료
        if (!common.isEmpty(this.prjInfo.compDate)) {
          this.prjCompDate =
            this.prjInfo.compDate.substr(0, 4) +
            '-' +
            this.prjInfo.compDate.substr(4, 2) +
            '-' +
            this.prjInfo.compDate.substr(6, 2);
        } else {
          this.prjCompDate = timezone.getClientDate('YYYY-MM-DD');
        }
        this.prjAdvice = !common.isEmpty(this.prjInfo.prjAdvice)
          ? this.prjInfo.prjAdvice
          : '';

        // if (this.prjInfo.prjStatus === 'C') {
        //   this.pilotDisabled = true;
        //   this.effectDisabled = true;
        //   this.reportDisabled = true;
        //   this.finishDisabled = true;
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
    getPilotList: function(value) {
      if (!common.isEmpty(value)) {
        this.pilotList = value.reduce((acc, cur) => {
          const obj = { ...cur };
          obj.views = true;
          obj.pilotResult = obj.pilotResult ? obj.pilotResult : '';
          obj.pilotMeasure = obj.pilotMeasure ? obj.pilotMeasure : '';
          acc.push(obj);
          return acc;
        }, []);
      }
    },
    getEffectInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.effectInfo = value;
      }
    },
    getReportInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.$set(this.reportInfo, 'reportSkinCd', value.cd);
        this.$set(this.reportInfo, 'reportSkinNm', value.cdNm);
      }
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      //* 첨부파일 (현장적용, 효과파악)
      this.getFileList();
    },
  },
  created() {
    // this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    this.setPrjInfo(
      this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO],
    );
    this.GV_SKILL_STEP = this[
      specializedTasksTypes.getters.GET_PROJECT_SKILL_STEP_INFO
    ];
    // if (
    //   !common.isEmpty(this.$route.params.type) &&
    //   this.$route.params.type == 'new'
    // ) {
    //   //* prjInfo세팅
    //   this.prjInfo = this[
    //     specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO
    //   ];
    // }
    this.initStatusList();
  },
  mounted() {
    this.$refs.obs8.validate();
    this.$refs.obs9.validate();
    this.$refs.obs10.validate();
    // this.$refs.obs11.validate();
    this.initStatusList();
    this.getFileList();
    common.delay(() => {
      this.editorRender = true;
    }, 1000);
  },
  methods: {
    resetReportList() {
      for (let obj in this.reportCheck) {
        this.reportList.push(obj);
      }
    },
    //* 현장적용 저장
    async onPilotSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid8) {
        common.alert('warning', this.GV_errors8.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        pilotList: this.pilotList,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramPilotFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_PILOT_LIST](
        params,
      );
      if (stepStatus === '1') {
        this.onCompleteStep(8);
      }
    },
    async onEffectSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid9) {
        common.alert('warning', this.GV_errors9.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        qntEff: this.effectInfo.qntEff,
        qltEff: this.effectInfo.qltEff,
        prjOutput: this.effectInfo.prjOutput,
        usePlan: this.effectInfo.usePlan,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramEffectFileList,
      };

      await this[specializedTasksTypes.actions.UPDATE_PROJECT_RD_EFFECT](
        params,
      );
      if (stepStatus === '1') {
        this.onCompleteStep(9);
      }
    },
    onReportSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.reportList.length > 0) {
        stepStatus === '1'
          ? common.confirm(
              'NLS0001438',
              () => {
                this.doReportSave(stepType, stepCd, '1', true);
              },
              () => {
                this.doReportSave(stepType, stepCd, '0', false);
              },
            )
          : this.doReportSave(stepType, stepCd, stepStatus, false);
      } else {
        // 보고서 항목을 선택해주세요
        common.alert('warning', 'NLS0000912');
      }
    },
    async doReportSave(stepType, stepCd, stepStatus, flag) {
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjNm: this.prjInfo.prjNm,
        prjId: this.prjInfo.prjId,
        reprotList: this.reportList,
        reportSkin: this.reportInfo.reportSkinCd,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        flag: flag,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_REPORT](params);
      if (stepStatus === '1' && flag) {
        this.onCompleteStep(10);
      }
    },
    async onFinishSave(stepType, stepCd, stepStatus) {
      const isAllDone =
        this.GV_STEP_DETAIL_LIST.filter(
          (i, idx, arr) => idx !== arr.length - 1 && i.stepStatus !== '1',
        ).length > 0
          ? false
          : true;
      if (stepStatus === '1' && !isAllDone) {
        //* 모든 세부 단계가 완료되어야만 과제를 완료할 수 있습니다.
        common.alert('warning', 'NLS0001406');
        return false;
      }
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid) {
        common.alert('warning', this.GV_errors4.msg);
        return false;
      }
      const params = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        prjAdvice: this.prjAdvice,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
      };
      if (stepStatus === '1') {
        params.compDate = timezone.convertToServerTimeZone(
          new Date(),
          'YYYYMMDD',
        );
      }
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_FINISH](params);
      if (stepStatus === '1') {
        this.onCompleteStep(11);
      }
    },
    async onBestProject() {
      // 우수과제로 선정하시겠습니까?
      common.confirm(this.$t('NLS0000913'), async () => {
        await this[specializedTasksTypes.actions.UPDATE_PROJECT_BEST]({
          prjId: this.prjInfo.prjId,
        });
      });
    },
    onEmptyPrjId() {
      if (common.isEmpty(this.prjInfo.prjId) || !this.$route.params.prjId) {
        return true;
      } else {
        return false;
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
    setStepDisabled(value) {
      //*INIT
      this.pilotDisabled = true;
      this.effectDisabled = true;
      this.reportDisabled = true;
      this.finishDisabled = true;

      const { prjStatus, prjId } = this.prjInfo;
      const { pass, isPrjUser, isManager } = common.chkPrjAuth(
        this.loginUserInfo,
        this.prjBaseInfo,
      );

      if (pass) this.msgDisabled = false;
      if (!common.isEmpty(prjId) && value.length > 0) {
        if (prjStatus !== 'C' && prjStatus !== 'B') {
          if (pass) {
            this.pilotDisabled = false;
            this.effectDisabled = false;
          }
          if (isPrjUser) this.reportDisabled = false;
          if (isManager) this.finishDisabled = false;
        }
      }
    },
    getPilotFiles(files) {
      this.paramPilotFileList = files;
    },
    getEffectFiles(files) {
      this.paramEffectFileList = files;
    },
    async setPilotList(prjId) {
      await this[specializedTasksTypes.actions.FETCH_PROJECT_PILOT_LIST]({
        prjId: prjId,
      });
    },
    async setEffectInfo(prjId) {
      await this[specializedTasksTypes.actions.FETCH_PROJECT_RD_EFFECT]({
        prjId: prjId,
      });
    },
    reportChecked(e) {
      this.$set(this.reportCheck, e.target.value, e.target.checked);
      if (e.target.checked) {
        this.reportList.push(e.target.value);
      } else {
        const idx = this.reportList.indexOf(e.target.value);
        if (idx > -1) this.reportList.splice(idx, 1);
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
      if (this.prjInfo.prjGrade === 'D' || this.prjInfo.prjStatus === 'B') {
        // 과제가 중단되어 진행할수 없습니다.
        common.alert('warning', 'NLS0000917');
        return false;
      }
      for (let i = 0; i < tmeStatusList.length; i++) {
        if (i == idx) {
          tmeStatusList[i].now = true;
          tmeStatusList[i].current = !tmeStatusList[i].current;
          tmeStatusList[i].selectedIdx = idx;
          if (idx === 8) {
            if (
              this.loginUserInfo.userId === this.prjBaseInfo.prjUserId &&
              common.isEmpty(this.prjInfo.prjStartDate3)
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
    openPilotAll(openFlag) {
      this.openAll = !openFlag;
      this.pilotList = this.pilotList.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.views = this.openAll;
        acc.push(obj);
        return acc;
      }, []);
    },
    onPilotClick(item) {
      item.views = !item.views;
    },
    // onPilotAdd() {
    //   this.pilotList.push({
    //     prjId: this.prjInfo.prjId,
    //     prjSeq: '',
    //     pilotTitle: '',
    //     pilotResult: '',
    //     pilotMeasure: '',
    //     views: true,
    //   });
    // },
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
    //* 보고서 스킨설정 팝업
    openProjectReportPop() {
      this[specializedTasksTypes.actions.INIT_VIEWS_REPORT_SKIN_POP](true);
    },
    //* 보고서 보기 팝업
    async openReportDetailPop(type) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (type == 'preview') {
        await this[specializedTasksTypes.actions.FETCH_PROJECT_REPORT_INFO]({
          prjId: this.GV_PRJ_ID,
          reportList: this.reportList,
          reportSkin: this.reportInfo.reportSkinCd,
          reportType: type,
        });
      } else {
        await this[specializedTasksTypes.actions.FETCH_PROJECT_REPORT_INFO]({
          prjId: this.GV_PRJ_ID,
          reportType: type,
        });
      }
      await this[specializedTasksTypes.actions.INIT_VIEWS_REPORT_DETAIL_POP](
        true,
      );
    },
    async getFileList() {
      this.pilotFileList = [];
      this.effectFileList = [];

      for (let item of this.allFileList) {
        switch (item.downloadType) {
          case this.GV_STEP_DETAIL_LIST[8].stepCd:
            this.pilotFileList.push(item); // 현장적용
            break;
          case this.GV_STEP_DETAIL_LIST[9].stepCd:
            this.effectFileList.push(item); // 효과파악
            break;
        }
      }
    },
    onErrors8(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid8 = invalid;
      this.GV_validated8 = validate;
      this.GV_errors8 = errors;
    },
    onErrors9(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid9 = invalid;
      this.GV_validated9 = validate;
      this.GV_errors9 = errors;
    },
    onErrors10(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid10 = invalid;
      this.GV_validated10 = validate;
      this.GV_errors10 = errors;
    },
    onErrors11(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid11 = invalid;
      this.GV_validated11 = validate;
      this.GV_errors11 = errors;
    },
    setPrjInfo(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.prjBaseInfo = value.prjBaseUserInfo;
        this.prjStatusList = value.prjStatusList;

        //* 현장적용 LIST 세팅
        this.setPilotList(this.prjInfo.prjId);
        //* 효과파악 INFO 세팅
        this.setEffectInfo(this.prjInfo.prjId);
        //* 종료보고
        this.reportCheck = {
          RD01: true,
          RD02: true,
          RD03: true,
          RD05: true,
          RD06: true,
          RD07: true,
          RD08: true,
          RD09: true,
          RD10: true,
        };
        this.reportList = [];
        this.resetReportList();
        if (!common.isEmpty(this.prjInfo.reportSkin)) {
          // if (!common.isEmpty(value.prjReportList)) {
          //   this.reportList = value.prjReportList.reduce((acc, cur) => {
          //     const obj = { ...cur };
          //     if (obj.reportYn === 'Y') acc.push(obj.prjStepCd);
          //     return acc;
          //   }, []);
          //   value.prjReportList.forEach(value => {
          //     this.reportCheck[value.prjStepCd] =
          //       value.reportYn == 'Y' ? true : false;
          //   });
          // }
          this.$set(
            this.reportInfo,
            'reportSkinCd',
            !common.isEmpty(this.prjInfo.reportSkin)
              ? this.prjInfo.reportSkin
              : this.reportInfo.reportSkinCd,
          );
          this.$set(
            this.reportInfo,
            'reportSkinNm',
            !common.isEmpty(this.prjInfo.reportSkinNm)
              ? this.prjInfo.reportSkinNm
              : this.reportInfo.reportSkinNm,
          );
        } else {
          // Object.entries(this.reportCheck).forEach(([key]) => {
          //   if (key != 'RD06' && key != 'RD09') {
          //     this.reportCheck[key] = true;
          //     this.reportList.push(key);
          //   }
          // });
        }
        //* 과제완료
        if (!common.isEmpty(this.prjInfo.compDate)) {
          this.prjCompDate =
            this.prjInfo.compDate.substr(0, 4) +
            '-' +
            this.prjInfo.compDate.substr(4, 2) +
            '-' +
            this.prjInfo.compDate.substr(6, 2);
        } else {
          this.prjCompDate = timezone.getClientDate('YYYY-MM-DD');
        }
        this.prjAdvice = !common.isEmpty(this.prjInfo.prjAdvice)
          ? this.prjInfo.prjAdvice
          : '';

        // if (this.prjInfo.prjStatus === 'C') {
        //   this.pilotDisabled = true;
        //   this.effectDisabled = true;
        //   this.reportDisabled = true;
        //   this.finishDisabled = true;
        // }
      }
    },
  },
};
</script>
