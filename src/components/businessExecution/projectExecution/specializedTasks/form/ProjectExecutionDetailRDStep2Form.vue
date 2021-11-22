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
            @click="onBizAsySave('20', GV_STEP_DETAIL_LIST[4].stepCd, '0')"
            :disabled="bizDisabled"
          >
            <!-- 저장 -->
            <span> {{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onBizAsySave('20', GV_STEP_DETAIL_LIST[4].stepCd, '1')"
            :disabled="bizDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }} </span>
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
            <span>{{ $t('NLS0000707') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[4].stepNm, 'NLS0000758')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <label for="bizAny" class="required-field">
              <!-- 사업 환경 분석 -->
              - {{ $t('NLS0000563') }} <span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="bizAny"
              rules="requiredCK|required"
              v-model="bizInfo.bizAny"
              :disable="bizDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <label for="custNeed" class="required-field">
              <!-- 고객 니즈 조사 -->
              - {{ $t('NLS0000564') }}
              <span class="required-text">*</span></label
            >
            <com-ck-editor
              v-if="editorRender"
              id="custNeed"
              rules="requiredCK|required"
              v-model="bizInfo.custNeed"
              :disable="bizDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[4].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="bizAysFileList"
                :read="bizDisabled"
                @files="getMarketAysFiles"
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
        @errors="onErrors1"
      ></com-validate-error>
    </validation-observer>
    <validation-observer ref="obs5" v-slot="{ invalid, validated, errors }">
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[5].current }"
        :ref="GV_STEP_DETAIL_LIST[5].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[5].stepCd, 5)"
      >
        <button type="button" class="task-accordion-btn">
          <span>{{ GV_STEP_DETAIL_LIST[5].stepNm }} </span>
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
            <span>{{ $t('NLS0000903') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onCsfSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '0')"
            :disabled="csfDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onCsfSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '1')"
            :disabled="csfDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }} </span>
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
            <span>{{ $t('NLS0000707') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[5].stepNm, 'NLS0000759')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <p class="subtitle-btnbox">
            <span class="text">
              <!-- 목표수립->CSF도출 -->
              - {{ $t('NLS0000565') }}
            </span>
            <button type="button" class="blue-btn" @click="onCsfListAdd">
              <!-- 추가 -->
              <span>{{ $t('NLS0000067') }} </span>
            </button>
          </p>
          <div class="hms-grid borderno-table task-table type-center">
            <table>
              <colgroup>
                <col style="width:20%;" />
                <col style="width:20%;" />
                <col style="width:20%;" />
                <col style="width:20%;" />
                <col style="width:20%;" />
              </colgroup>
              <thead>
                <tr>
                  <!-- 목표항목 -->
                  <th scope="col">{{ $t('NLS0000568') }}</th>
                  <!-- 목표수치 -->
                  <th scope="col">{{ $t('NLS0000567') }}</th>
                  <!-- 현수준 -->
                  <th scope="col">{{ $t('NLS0000569') }}</th>
                  <!-- GAP -->
                  <th scope="col">{{ $t('NLS0000570') }}</th>
                  <!-- 판정 -> 삭제 -->
                  <th scope="col">{{ $t('NLS0000075') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in csfList" :key="i">
                  <td>
                    <div class="task-inputform type5">
                      <com-input-text
                        :ref="`tartget_${i}`"
                        type="text"
                        v-model="item.targetItem"
                        rules="required"
                        @keyup.enter="enterEvent(`cnt_${i}`, i)"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="task-inputform type5">
                      <com-input-text
                        :ref="`cnt_${i}`"
                        type="number"
                        v-model="item.targetNum"
                        rules="required"
                        @keyup.enter="enterEvent(`now_${i}`, i)"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="task-inputform type5">
                      <com-input-text
                        :ref="`now_${i}`"
                        type="number"
                        v-model="item.targetNow"
                        rules="required"
                        @keyup.enter="enterEvent(`gap_${i}`, i)"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="task-inputform type5">
                      <com-input-text
                        :ref="`gap_${i}`"
                        type="number"
                        v-model="item.targetGap"
                        rules="required"
                        @keyup.enter="enterEvent('new', i)"
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="brightgray-btn type-del"
                      @click="onCsfDelete(i)"
                    >
                      <span>{{ $t('NLS0000075') }}</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="task-textform type3">
            <label for="funcContent">
              <!-- 핵심기능정의 -->
              - {{ $t('NLS0000566') }}
              <span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="bizAny"
              rules="requiredCK|required"
              v-model="funcContent"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[5].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="csfFileList"
                :read="csfDisabled"
                @files="getCsfFiles"
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
        @errors="onErrors2"
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
            <span>{{ $t('NLS0000903') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onDirectionSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '0')"
            :disabled="directDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onDirectionSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '1')"
            :disabled="directDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }} </span>
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
            <span>{{ $t('NLS0000707') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[6].stepNm, 'NLS0000760')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <label for="custNeed" class="required-field"
              >- {{ $t('NLS0000572') }}
              <!-- 개발방향 결정 -->
              <span class="required-text">*</span></label
            >
            <com-ck-editor
              v-if="editorRender"
              id="custNeed"
              rules="requiredCK|required"
              v-model="devDirection"
              :disable="directDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[6].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="dercFileList"
                :read="directDisabled"
                @files="getDercFiles"
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
        @errors="onErrors3"
      ></com-validate-error>
    </validation-observer>
    <validation-observer ref="obs7" v-slot="{ invalid, validated, errors }">
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
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[7].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[7].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            :disabled="devDisabled"
            @click="onDevSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '0')"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            :disabled="devDisabled"
            @click="onDevSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '1')"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }} </span>
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
            <span>{{ $t('NLS0000707') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[7].stepNm, 'NLS0000761')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="task-sub-accordion">
          <p class="title">
            <!-- 개선대책->설계 계획 -->
            {{ $t('NLS0001450') }}
            <span class="required-text">*</span>
          </p>
          <div class="all-accordion-box type-button">
            <button
              type="button"
              class="sub-accordion-btn"
              :class="{ open: openAll }"
              @click="openDevAll(openAll)"
            >
              <span>toggle</span>
            </button>
            <!-- 전체 -->
            {{ $t('NLS0000336') }}

            <button
              type="button"
              class="blue-btn f_right"
              @click="onDevAdd"
              :disabled="devDisabled"
            >
              <!-- 추가 -->
              <span>{{ $t('NLS0000067') }} </span>
            </button>
          </div>

          <div class="sub-accordion-wrap">
            <div
              :class="{
                'sub-accordion-box': true,
                current: item.views,
              }"
              v-for="(item, i) in devContentList"
              :key="i"
            >
              <button
                type="button"
                @click="onDevClick(item)"
                :class="{
                  'sub-accordion-btn': true,
                  [`open`]: item.views,
                }"
              >
                <span>toggle</span>
              </button>

              <div class="task-inputform type4">
                <label for="directionItem" class="required-field">
                  <!-- 개발방향 -->
                  {{ $t('NLS0000576') }}
                  <span class="required-text">*</span>
                </label>
                <com-input-text
                  type="text"
                  :id="`directionItem${i}`"
                  rules="required"
                  v-model="item.directionItem"
                  :disable="devDisabled"
                />
              </div>
              <div class="task-textform type1">
                <label for="devResult" class="required-field">
                  <!-- 상세 개발결과 -->
                  {{ $t('NLS0000930') }}
                  <span class="required-text">*</span>
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  rules="requiredCK|required"
                  :id="`devResult_${i}`"
                  v-model="item.devResult"
                  :disable="devDisabled"
                ></com-ck-editor>
              </div>
              <div class="t_right">
                <button
                  type="button"
                  class="taskformdel-btn"
                  @click="onDevDel(i)"
                >
                  <!-- 삭제 -->
                  <span>{{ $t('NLS0000075') }}</span>
                </button>
              </div>
            </div>

            <!-- <div class="accordion-line"> -->
            <div class="hmstask-form-box">
              <!-- 파일첨부   accordion-line-->
              <!-- <span class="sub-title">{{ $t('NLS0000905') }} </span> -->
              <div class="hms-upload">
                <div id="products1">
                  <com-upload-file
                    :multiple="true"
                    :downloadType="GV_STEP_DETAIL_LIST[7].stepCd"
                    :ownerObjectId="prjInfo.prjId"
                    :fileList="devFileList"
                    :read="devDisabled"
                    @files="getDevFiles"
                  ></com-upload-file>
                </div>
              </div>
            </div>
            <!-- </div> -->
            <!-- 대책 수립 대단계 수행검토 -->
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
                @click="onPrjDevSave('B', '3', GV_STEP_DETAIL_LIST[7].stepCd)"
              >
                <!-- 중단 -->
                <span>{{ $t('NLS0000600') }} </span>
              </button>
              <button
                type="button"
                class="red-btn"
                @click="onPrjDevSave('A', '2', GV_STEP_DETAIL_LIST[7].stepCd)"
              >
                <!-- 수행승인 -->
                <span>{{ $t('NLS0000516') }} </span>
              </button>
            </div>
            <div
              class="task-textform"
              v-if="
                prjInfo.prjStepStatus2 == '1' &&
                  prjBaseInfo.prjManagerId != loginUserInfo.userId
              "
            >
              <div class="text-info">
                <div class="vertical-box">
                  <!-- 수행승인 대기중 입니다. -->
                  <p class="dot-text">{{ $t('NLS0000906') }}</p>
                </div>
              </div>
            </div>
            <div class="task-textform" v-if="prjInfo.prjStepStatus2 == '2'">
              <div class="text-info">
                <div class="vertical-box">
                  <!-- 수행승인 되었습니다 -->
                  <p class="dot-text">{{ $t('NLS0000907') }}</p>
                </div>
              </div>
            </div>
            <div class="task-textform" v-if="prjInfo.prjStepStatus2 == '3'">
              <div class="text-info">
                <div class="vertical-box">
                  <!-- 중단 되었습니다 -->
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
        @errors="onErrors4"
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
import { common } from '@/utils';

export default {
  name: 'ProjectExecutionDetailRDStep2Form',
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
      bizAysFileList: [],
      paramMarketAysFileList: [],
      dercFileList: [],
      paramDercFileList: [],
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
      //* 시장분석
      bizInfo: {
        bizAny: '',
        custNeed: '',
      },
      //* CSF 도출
      // add: '',
      csfList: [],
      delCsfList: [],
      funcContent: '',
      csfFileList: [],
      paramCsfFileList: [],
      //* 컵셉수립
      devDirection: '',
      //* 상세계획
      devContentList: [],
      openAll: true,
      //* Disabled
      bizDisabled: true,
      csfDisabled: true,
      directDisabled: true,
      devDisabled: true,
      msgDisabled: true,
      //* validation
      GV_invalid1: '',
      GV_validated1: '',
      GV_errors1: {},

      GV_invalid2: '',
      GV_validated2: '',
      GV_errors2: {},

      GV_invalid3: '',
      GV_validated3: '',
      GV_errors3: {},

      GV_invalid4: '',
      GV_validated4: '',
      GV_errors4: {},
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
    getBizInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_BIZ_INFO];
      return item;
    },
    getCsfInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_CSF_INFO];
      return item;
    },
    getDirctInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_DIRCT_INFO];
      return item;
    },
    getDevContentList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_DEV_LIST];
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
    getBizInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.bizInfo = value;
      }
    },
    getCsfInfo: function(value) {
      if (!common.isEmpty(value) && value.csfList.length > 0) {
        this.csfList = value.csfList.reduce((acc, cur) => {
          const obj = { ...cur };
          obj.targetNum = obj.targetNum.toString();
          obj.targetNow = obj.targetNow.toString();
          obj.targetGap = obj.targetGap.toString();
          obj.csfInfo = obj.csfInfo ? obj.csfInfo : '';
          acc.push(obj);
          return acc;
        }, []);
        this.funcContent = value.csfInfo ? value.csfInfo.funcContent : '';
      }
    },
    getDirctInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.devDirection = value.devDirection;
      }
    },
    getDevContentList: function(value) {
      if (!common.isEmpty(value) && value.length > 0) {
        const devList = value.reduce((acc, cur) => {
          const obj = { ...cur };
          obj.views = true;
          obj.pilotTitle = obj.pilotTitle ? obj.pilotTitle : '';
          acc.push(obj);
          return acc;
        }, []);
        this.$set(this, 'devContentList', devList);
      }
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      //* 첨부파일 (시장분석, 컨셉수립, 상세계획)
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
  },
  mounted() {
    this.$refs.obs4.validate();
    this.$refs.obs5.validate();
    this.$refs.obs6.validate();
    this.$refs.obs7.validate();
    this.initStatusList();
    this.getFileList();
    common.delay(() => {
      this.editorRender = true;
    }, 1000);
  },
  methods: {
    setInitData(value) {
      this.prjInfo = value.prjInfo;
      this.prjBaseInfo = value.prjBaseUserInfo;
      this.prjStatusList = value.prjStatusList;

      //* 시장분석 값 세팅
      this.setBizInfo(this.prjInfo.prjId);
      //* CSF도출 값 세팅
      this.setCsfInfo(this.prjInfo.prjId);
      //* 컨셉수립 값 세팅
      this.setDirctInfo(this.prjInfo.prjId);
      //* 상세계획 LIST 세팅
      this.setDevContentList(this.prjInfo.prjId);
    },
    //* 시장 분석 저장
    async onBizAsySave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid1) {
        common.alert('warning', this.GV_errors1.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        bizAny: this.bizInfo.bizAny,
        custNeed: this.bizInfo.custNeed,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramMarketAysFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_BIZ_INFO](param);
      if (stepStatus === '1') {
        this.onCompleteStep(4);
      }
    },
    //* CSF 도출 저장
    async onCsfSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid2) {
        common.alert('warning', this.GV_errors2.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        csfList: this.csfList,
        delCsfList: this.delCsfList,
        funcContent: this.funcContent,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramCsfFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_CSF_INFO](param);
      if (stepStatus === '1') {
        this.onCompleteStep(5);
      }
    },
    //* 컨셉수립 저장
    async onDirectionSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid3) {
        common.alert('warning', this.GV_errors3.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        devDirection: this.devDirection,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramDercFileList,
      };

      await this[specializedTasksTypes.actions.UPDATE_PROJECT_DIRCT_INFO](
        param,
      );
      if (stepStatus === '1') {
        this.onCompleteStep(6);
      }
    },
    //onDevSave
    //* 상세계획 저장
    async onDevSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid4) {
        common.alert('warning', this.GV_errors4.msg);
        return false;
      }
      if (this.devContentList.length === 0) {
        // /	개선대책을 추가해주세요
        common.alert('warning', 'NLS0001170');
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        devContentList: this.devContentList,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramDevFileList,
      };
      if (stepStatus === '1') {
        common.confirm(
          this.$t('NLS0000947').replace(
            '#stepName#',
            'STEP 3',
            //this.GV_STEP_LIST[2].cdNm,
          ),
          async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_DEV_LIST](
              params,
            );
            this.onCompleteStep(7);
          },
          async () => {
            params.stepStatus = '0';
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_DEV_LIST](
              params,
            );
          },
        );
      } else {
        // 저장 시 변경된 내용으로 재검토요청을 하여야 합니다. 저장하실 경우 '확인'버튼을 눌러주세요.
        if (this.prjInfo.prjStepStatus2 === '2') {
          common.confirm('NLS0001386', async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_DEV_LIST](
              params,
            );
          });
        } else {
          await this[specializedTasksTypes.actions.UPDATE_PROJECT_DEV_LIST](
            params,
          );
        }
      }
    },
    async onPrjDevSave(prjStatus, prjStepStatus, stepCd) {
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
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_DEV_LIST](param);
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
    getMarketAysFiles(files) {
      this.paramMarketAysFileList = files;
    },
    getDercFiles(files) {
      this.paramDercFileList = files;
    },
    getDevFiles(files) {
      this.paramDevFileList = files;
    },
    setBizInfo(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_BIZ_INFO]({
        prjId: prjId,
      });
    },
    setCsfInfo(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_CSF_INFO]({
        prjId: prjId,
      });
    },
    setDirctInfo(priId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_DIRCT_INFO]({
        prjId: priId,
      });
    },
    setDevContentList(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_DEV_LIST]({
        prjId: prjId,
      });
    },
    enterEvent(el, idx) {
      if (el === 'new') {
        this.onCsfListAdd();
      } else {
        this.$refs[el][idx].focus();
      }
    },
    async onCsfDelete(idx) {
      if (!common.isEmpty(this.csfList[idx].prjSeq)) {
        this.delCsfList.push({
          prjId: this.csfList[idx].prjId,
          prjSeq: this.csfList[idx].prjSeq,
        });
      }
      this.csfList.splice(idx, 1);
    },
    onCsfListAdd() {
      this.csfList.push({
        prjId: this.prjInfo.prjId,
        prjSeq: '',
        targetItem: '',
        targetNum: '0',
        targetNow: '0',
        targetGap: '0',
      });
    },
    setStepDisabled(value) {
      //*INIT
      this.bizDisabled = true;
      this.csfDisabled = true;
      this.directDisabled = true;
      this.devDisabled = true;

      const { prjStatus, prjId } = this.prjInfo;
      const { pass, isPrjUser } = common.chkPrjAuth(
        this.loginUserInfo,
        this.prjBaseInfo,
      );

      if (pass) this.msgDisabled = false;
      if (!common.isEmpty(prjId) && value.length > 0) {
        if (prjStatus !== 'C' && prjStatus !== 'B') {
          if (pass) {
            this.bizDisabled = false;
            this.csfDisabled = false;
            this.directDisabled = false;
          }
          if (isPrjUser) this.devDisabled = false;
        }
      }
    },
    //* 시장 분석 파일
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
    openDevAll(openFlag) {
      this.openAll = !openFlag;
      this.devContentList = this.devContentList.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.views = this.openAll;
        acc.push(obj);
        return acc;
      }, []);
    },
    onDevClick(item) {
      item.views = !item.views;
    },
    onDevAdd() {
      this.devContentList.push({
        prjId: this.prjInfo.prjId,
        prjSeq: '',
        directionItem: '',
        devResult: '',
        views: true,
      });
    },
    onDevDel(index) {
      this.devContentList.splice(index, 1);
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
      this.bizAysFileList = [];
      this.dercFileList = [];
      this.devFileList = [];
      this.csfFileList = [];

      for (let item of this.allFileList) {
        switch (item.downloadType) {
          case this.GV_STEP_DETAIL_LIST[4].stepCd:
            this.bizAysFileList.push(item); // 시장 분석
            break;
          case this.GV_STEP_DETAIL_LIST[5].stepCd:
            this.csfFileList.push(item); // CSF도출
            break;
          case this.GV_STEP_DETAIL_LIST[6].stepCd:
            this.dercFileList.push(item); // 컨셉 수립
            break;
          case this.GV_STEP_DETAIL_LIST[7].stepCd:
            this.devFileList.push(item); // 상세계획
            break;
        }
      }
    },
    onErrors1(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid1 = invalid;
      this.GV_validated1 = validate;
      this.GV_errors1 = errors;
    },
    onErrors2(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid2 = invalid;
      this.GV_validated2 = validate;
      this.GV_errors2 = errors;
    },
    onErrors3(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid3 = invalid;
      this.GV_validated3 = validate;
      this.GV_errors3 = errors;
    },
    onErrors4(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid4 = invalid;
      this.GV_validated4 = validate;
      this.GV_errors4 = errors;
    },
    getCsfFiles(files) {
      this.paramCsfFileList = files;
    },
  },
};
</script>
