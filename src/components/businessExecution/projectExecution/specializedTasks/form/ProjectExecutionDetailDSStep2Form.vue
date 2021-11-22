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
            @click="onGraspSave('20', GV_STEP_DETAIL_LIST[4].stepCd, '0')"
            :disabled="graspDisabled"
          >
            <!-- 저장 -->
            <span> {{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onGraspSave('20', GV_STEP_DETAIL_LIST[4].stepCd, '1')"
            :disabled="graspDisabled"
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[4].stepNm, 'NLS0000766')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <!-- 현상 파악->상황 분석 결과 -->
            <label for="bizAny" class="required-field">
              - {{ $t('NLS0001452') }} <span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="bizAny"
              rules="requiredCK|required"
              v-model="graspContent"
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
          <span class="required-text">*</span>
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
            @click="onDcsSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '0')"
            :disabled="dcsDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onDcsSave('20', GV_STEP_DETAIL_LIST[5].stepCd, '1')"
            :disabled="dcsDisabled"
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[5].stepNm, 'NLS0000767')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="task-sub-accordion">
          <p class="title">
            <!-- 결정요인 -->
            {{ $t('NLS0000899') }}
            <span class="required-text">*</span>
          </p>
          <div class="all-accordion-box type-button">
            <button
              type="button"
              class="sub-accordion-btn"
              :class="{ open: openAll }"
              @click="onDcsOpen(openAll)"
            >
              <span>toggle</span>
            </button>
            {{ $t('NLS0000336') }}

            <button
              type="button"
              class="blue-btn f_right"
              @click="onDcsAdd"
              :disabled="dcsDisabled"
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
              v-for="(item, i) in dcsList"
              :key="i"
            >
              <button
                type="button"
                @click="onDcsClick(item)"
                :class="{
                  'sub-accordion-btn': true,
                  [`open`]: item.views,
                }"
              >
                <span>toggle</span>
              </button>

              <div class="task-inputform type4">
                <!-- 의사결정 기준 -->
                <label for="stdDecision" class="required-field">
                  {{ $t('NLS0000591') }}
                  <span class="required-text">*</span>
                </label>
                <com-input-text
                  type="text"
                  :id="`stdDecision${i}`"
                  rules="required"
                  v-model="item.stdDecision"
                  :disable="dcsDisabled"
                />
              </div>
              <div class="task-textform type1">
                <!-- 고려사항 -->
                <label for="consDecision">
                  {{ $t('NLS0000590') }}
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  :id="`consDecision${i}`"
                  v-model="item.consDecision"
                  :disable="dcsDisabled"
                ></com-ck-editor>
              </div>
              <div class="t_right">
                <button
                  type="button"
                  class="taskformdel-btn"
                  @click="onDcsDel(i)"
                >
                  <!-- 삭제 -->
                  <span>{{ $t('NLS0000075') }}</span>
                </button>
              </div>
            </div>
            <div class="hms-upload">
              <div id="products">
                <com-upload-file
                  :multiple="true"
                  :downloadType="GV_STEP_DETAIL_LIST[5].stepCd"
                  :fileList="dscFileList"
                  :ownerObjectId="prjInfo.prjId"
                  :read="dcsDisabled"
                  @files="getDscFiles"
                ></com-upload-file>
              </div>
            </div>
          </div>
        </div>
      </dd>
      <!-- ValidateError 컴포넌트 영역  -->
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
          <span>{{ GV_STEP_DETAIL_LIST[6].stepNm }}</span>
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
            @click="onAltSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '0')"
            :disabled="altDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onAltSave('20', GV_STEP_DETAIL_LIST[6].stepCd, '1')"
            :disabled="altDisabled"
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
            <span>메시지</span>
          </button>
          <button
            type="button"
            class="accordion-btn info"
            @click="openHelpPop(GV_STEP_DETAIL_LIST[6].stepNm, 'NLS0000768')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="task-sub-accordion">
          <!-- 후보 대안 평가 -->
          <p class="title">
            {{ $t('NLS0000592') }}
          </p>
          <div class="all-accordion-box type-button">
            <button
              type="button"
              class="sub-accordion-btn"
              :class="{ open: openAltAll }"
              @click="onAltOpen(openAltAll)"
            >
              <span>toggle</span>
            </button>
            {{ $t('NLS0000336') }}
            <button
              type="button"
              class="blue-btn f_right"
              @click="onAltAdd"
              :disabled="altDisabled"
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
              v-for="(item, i) in altList"
              :key="i"
            >
              <button
                type="button"
                @click="onAltClick(item)"
                :class="{
                  'sub-accordion-btn': true,
                  [`open`]: item.views,
                }"
              >
                <span>toggle</span>
              </button>

              <div class="task-inputform type4">
                <!-- 후보대안 -->
                <label for="altDecision">
                  {{ $t('NLS0000593') }}
                </label>
                <com-input-text
                  type="text"
                  :id="`altDecision${i}`"
                  v-model="item.altDecision"
                  :disable="altDisabled"
                />
                <span class="selection-checkbox">
                  <com-input-text
                    type="checkbox"
                    :id="`altYn_${i}`"
                    value="Y"
                    :check="item.altYn === 'Y' ? true : false"
                    :labelId="`altYn_${i}`"
                    labelTitle=""
                    :disable="altDisabled"
                    @change="onAltYnClick"
                  />
                </span>
              </div>
              <div class="task-textform type1">
                <!-- 조사 및 분석 결과 -->
                <label for="altResult">
                  {{ $t('NLS0000595') }}
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  :id="`altResult${i}`"
                  v-model="item.altResult"
                  :disable="altDisabled"
                ></com-ck-editor>
              </div>
              <div class="task-textform type1" v-if="item.altYn === 'Y'">
                <!-- 최적대안 구체화 -->
                <label for="optObj">
                  {{ $t('NLS0000594') }}
                </label>
                <com-ck-editor
                  v-if="editorRender"
                  :id="`optObj${i}`"
                  v-model="item.optObj"
                  :disable="altDisabled"
                ></com-ck-editor>
              </div>
              <div class="t_right">
                <button
                  type="button"
                  class="taskformdel-btn"
                  @click="onAltDel(i)"
                >
                  <!-- 삭제 -->
                  <span>{{ $t('NLS0000075') }}</span>
                </button>
              </div>
            </div>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[6].stepCd"
                :fileList="altFileList"
                :ownerObjectId="prjInfo.prjId"
                :read="altDisabled"
                @files="getAltFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </dd>
      <!-- ValidateError 컴포넌트 영역  -->
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
            :disabled="implDisabled"
            @click="onImplSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '0')"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }} </span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            :disabled="implDisabled"
            @click="onImplSave('20', GV_STEP_DETAIL_LIST[7].stepCd, '1')"
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[7].stepNm, 'NLS0000769')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }} </span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <p class="subtitle-btnbox">
            <!-- 실행계획수립 -->
            <span class="text">
              - {{ $t('NLS0000598') }}
              <span class="required-text">*</span>
            </span>
            <button
              type="button"
              class="blue-btn"
              @click="onImplAdd"
              :disabled="implDisabled"
            >
              <!-- 추가 -->
              <span>{{ $t('NLS0000067') }} </span>
            </button>
          </p>
          <div class="hmstask-table">
            <div
              class="hmstask-table-bgbox"
              v-for="(item, i) in implList"
              :key="i"
            >
              <table>
                <colgroup>
                  <col style="width:15%" />
                  <col style="width:35%" />
                  <col style="width:15%" />
                  <col style="width:35%" />
                </colgroup>
                <tbody>
                  <tr>
                    <!-- <template v-if="i % 2 === 0"> -->
                    <!-- 추진 계획 -->
                    <th class="required-field">
                      {{ $t('NLS0000596') }}
                      <span class="required-text">*</span>
                    </th>
                    <td colspan="3">
                      <com-input-text
                        type="text"
                        rules="required"
                        class="task-inputform type4"
                        v-model="item.implPlan"
                        :disable="implDisabled"
                      />
                    </td>
                  </tr>
                  <!-- </template>
									<template v-if="i % 2 === 1"> -->
                  <tr>
                    <!-- 추진 기간 -->
                    <th>{{ $t('NLS0000597') }}</th>
                    <td>
                      <span class="task-datepicker">
                        <com-date-picker
                          :name="`implFromDate_${i}`"
                          :current="
                            item.implFromDate ? item.implFromDate : new Date()
                          "
                          :format="format"
                          :disabled="implDisabled"
                          @onChange="onChange"
                        ></com-date-picker>
                      </span>
                      <em class="date-divide">~</em>
                      <span class="task-datepicker">
                        <com-date-picker
                          :name="`implToDate_${i}`"
                          :current="
                            item.implToDate ? item.implToDate : new Date()
                          "
                          :format="format"
                          :disabled="implDisabled"
                          @onChange="onChange"
                        ></com-date-picker>
                      </span>
                    </td>
                    <!-- 담당 부서 -->
                    <th>{{ $t('NLS0000064') }}</th>
                    <td>
                      <div class="task-inputform type2">
                        <com-input-text
                          type="text"
                          v-model="item.implDeptNm"
                          :disable="implDisabled"
                        />
                        <button
                          type="button"
                          class="magnifier-btn-black"
                          :disabled="implDisabled"
                          @click="onDeptSearchPop(i)"
                        >
                          더찾기
                        </button>
                      </div>
                    </td>
                    <!-- </template> -->
                  </tr>

                  <!-- <tr v-for="(item, i) in implList" :key="i"></tr> -->
                </tbody>
              </table>
              <div class="hmstask-table-btnbox">
                <button
                  type="button"
                  class="taskformdel-btn"
                  @click="onImplDel(i)"
                >
                  <!-- 삭제 -->
                  <span>{{ $t('NLS0000075') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="hmstask-form-box">
          <!-- 소요 자원 계획 -->
          <p class="sub-title">
            {{ $t('NLS0000547') }}
          </p>
          <div class="task-textform type2">
            <!-- 예산 -->
            <label for="prjBudget">
              {{ $t('NLS0000893') }}
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="prjBudget"
              v-model="implBudget"
              :disable="implDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform type2">
            <!-- 인력 -->
            <label for="prjMan">
              {{ $t('NLS0000894') }}
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="prjMan"
              v-model="implMan"
              :disable="implDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[7].stepCd"
                :ownerObjectId="prjInfo.prjId"
                :fileList="implFileList"
                :read="implDisabled"
                @files="getImplFiles"
              ></com-upload-file>
            </div>
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
              @click="onPrjImplSave('B', '3', GV_STEP_DETAIL_LIST[7].stepCd)"
            >
              <!-- 중단 -->
              <span>{{ $t('NLS0000600') }} </span>
            </button>
            <button
              type="button"
              class="red-btn"
              @click="onPrjImplSave('A', '2', GV_STEP_DETAIL_LIST[7].stepCd)"
            >
              <!-- 수행승인 -->
              <span>{{ $t('NLS0000516') }} </span>
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
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { specializedTasksStore, commonStore } from '@/mixins';
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectExecutionDetailDSStep2Form',
  mixins: [specializedTasksStore, commonStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComDatePicker,
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
      GV_STEP_LIST: common.getCodeList('PRJ009'),
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
      // bizAysFileList: [],
      // paramMarketAysFileList: [],
      // dercFileList: [],
      // paramDercFileList: [],
      // devFileList: [],
      // paramDevFileList: [],
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
      //* 상황분석
      graspFileList: [],
      paramGraspFileList: [],
      //* 현상파악
      graspContent: '',
      //* 결정요인
      dcsList: [],
      openAll: true,
      dscFileList: [],
      paramDscFileList: [],
      //* 대안설정
      altList: [],
      openAltAll: true,
      altFileList: [],
      paramAltFileList: [],
      //* 상세계획
      implList: [],
      implFileList: [],
      paramImplFileList: [],
      implIdx: '',
      implMan: '',
      implBudget: '',
      //* DatePicker
      format: 'yyyy-MM-dd',
      //* Disabled
      graspDisabled: true,
      dcsDisabled: true,
      altDisabled: true,
      implDisabled: true,
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
    getGraspInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_GRASP_INFO];
      return item;
    },
    getDcsList() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_DECISION_LIST
      ];
      return item;
    },
    getAltList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_ALT_LIST];
      return item;
    },
    getImplList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_IMPL_LIST];
      return item;
    },
    getSelectedDept() {
      //* 선택한 부서
      return this[commonTypes.getters.GET_SELECTED_DEPT];
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
    getGraspInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.graspContent = value.graspContent;
      }
    },
    getDcsList: function(value) {
      if (common.isEmpty(value)) {
        if (this.dcsList.length === 0) {
          this.onDcsAdd();
        }
      } else {
        this.dcsList = value.reduce((acc, cur) => {
          const obj = { ...cur };
          obj.views = true;
          acc.push(obj);
          return acc;
        }, []);
      }
    },
    getAltList: function(value) {
      if (!common.isEmpty(value)) {
        this.altList = value.reduce((acc, cur) => {
          const obj = { ...cur };
          obj.views = true;
          acc.push(obj);
          return acc;
        }, []);
      }
    },
    getImplList: function(value) {
      if (!common.isEmpty(value)) {
        this.implList = value.reduce((acc, cur) => {
          const obj = { ...cur };
          obj.implFromDate = new Date(
            timezone.convertToClientTimeZone(obj.implFromDate, 'YYYY-MM-DD'),
          );
          obj.implToDate = new Date(
            timezone.convertToClientTimeZone(obj.implToDate, 'YYYY-MM-DD'),
          );
          acc.push(obj);
          return acc;
        }, []);
        this.implBudget = value[0].implBudget;
        this.implMan = value[0].implMan;
      }
    },
    getSelectedDept: function(value) {
      if (!common.isEmpty(value)) {
        this.implList[this.implIdx].implDeptId = value.deptId;
        this.implList[this.implIdx].implDeptNm = value.deptNm;
      }
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      //* 첨부파일 (현상파악)
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

      //* 현상파악 값 세팅
      this.setGraspInfo(this.prjInfo.prjId);
      //* 결정요인 값 세팅
      this.setDcsList(this.prjInfo.prjId);
      //* 대안설정 값 세팅
      this.setAltList(this.prjInfo.prjId);
      //* 상세계획 값 세팅
      this.setImplList(this.prjInfo.prjId);
    },
    //* 현상파악 저장
    async onGraspSave(stepType, stepCd, stepStatus) {
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
        graspContent: this.graspContent,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramGraspFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_GRASP_INFO](
        param,
      );
      if (stepStatus === '1') {
        this.onCompleteStep(4);
      }
    },
    //* 결정요인 저장
    async onDcsSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid2) {
        common.alert('warning', this.GV_errors2.msg);
        return false;
      }
      if (this.dcsList.length === 0) {
        // 결정요인을 추가해주세요.
        common.alert('warning', 'NLS0000915');
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const param = {
        prjId: this.prjInfo.prjId,
        dcsList: this.dcsList,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramDscFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_DECISION_LIST](
        param,
      );
      if (stepStatus === '1') {
        this.onCompleteStep(5);
      }
    },
    //* 대안설정 저장
    async onAltSave(stepType, stepCd, stepStatus) {
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
        altList: this.altList,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramAltFileList,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_ALT_LIST](param);
      if (stepStatus === '1') {
        this.onCompleteStep(6);
      }
    },
    //* 상세계획 저장
    async onImplSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid4) {
        common.alert('warning', this.GV_errors4.msg);
        return false;
      }
      if (this.implList.length === 0) {
        // 실행계획수립을 추가해주세요
        common.alert('warning', 'NLS0000916');
        return false;
      }

      this.implList = this.implList.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.implFromDate = timezone.convertToServerTimeZone(
          obj.implFromDate,
          'YYYYMMDD',
        );
        obj.implToDate = timezone.convertToServerTimeZone(
          obj.implToDate,
          'YYYYMMDD',
        );
        acc.push(obj);
        return acc;
      }, []);
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        implList: this.implList,
        implBudget: this.implBudget,
        implMan: this.implMan,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramImplFileList,
      };
      if (stepStatus === '1') {
        common.confirm(
          this.$t('NLS0000947').replace(
            '#stepName#',
            'STEP 3',
            //this.GV_STEP_LIST[2].cdNm,
          ),
          async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_IMPL_LIST](
              params,
            );
            this.onCompleteStep(7);
          },
          async () => {
            params.stepStatus = '0';
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_IMPL_LIST](
              params,
            );
          },
        );
      } else {
        //* 수행승인 된 과제 저장 누른 경우
        if (this.prjInfo.prjStepStatus2 === '2') {
          // 저장 시 변경된 내용으로 재검토요청을 하여야 합니다. 저장하실 경우 '확인'버튼을 눌러주세요.
          common.confirm('NLS0001386', async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_IMPL_LIST](
              params,
            );
          });
        } else {
          await this[specializedTasksTypes.actions.UPDATE_PROJECT_IMPL_LIST](
            params,
          );
        }
      }
    },
    async onPrjImplSave(prjStatus, prjStepStatus, stepCd) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      this.setPrjRate('20', stepCd);
      const params = {
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
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_IMPL_LIST](
        params,
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
    getGraspFiles(files) {
      this.paramGraspFileList = files;
    },
    getDscFiles(files) {
      this.paramDscFileList = files;
    },
    getAltFiles(files) {
      this.paramAltFileList = files;
    },
    getImplFiles(files) {
      this.paramImplFileList = files;
    },
    setGraspInfo(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_GRASP_INFO]({
        prjId: prjId,
      });
    },
    setDcsList(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_DECISION_LIST]({
        prjId: prjId,
      });
    },
    setAltList(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_ALT_LIST]({
        prjId: prjId,
      });
    },
    setImplList(prjId) {
      this[specializedTasksTypes.actions.FETCH_PROJECT_IMPL_LIST]({
        prjId: prjId,
      });
    },
    setStepDisabled(value) {
      //*INIT
      this.graspDisabled = true;
      this.dcsDisabled = true;
      this.altDisabled = true;
      this.implDisabled = true;

      const { prjStatus, prjId } = this.prjInfo;
      const { pass, isPrjUser } = common.chkPrjAuth(
        this.loginUserInfo,
        this.prjBaseInfo,
      );

      if (pass) this.msgDisabled = false;
      if (!common.isEmpty(prjId) && value.length > 0) {
        if (prjStatus !== 'C' && prjStatus !== 'B') {
          if (pass) {
            this.graspDisabled = false;
            this.dcsDisabled = false;
            this.altDisabled = false;
          }
          if (isPrjUser) this.implDisabled = false;
        }
      }
    },
    onAltYnClick(e) {
      const idx = e.target.id.split('_')[1];
      if (e.target.checked === true) {
        this.altList[idx].altYn = 'Y';
      } else {
        this.altList[idx].altYn = 'N';
      }
    },
    onChange(date, name) {
      const idx = Number(name.split('_')[1]);
      if (name.includes('implFromDate')) this.implList[idx].implFromDate = date;
      else if (name.includes('implToDate'))
        this.implList[idx].implToDate = date;
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
    onDcsOpen(openFlag) {
      this.openAll = !openFlag;
      this.dcsList = this.dcsList.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.views = this.openAll;
        acc.push(obj);
        return acc;
      }, []);
    },
    onDcsClick(item) {
      item.views = !item.views;
    },
    onDcsAdd() {
      this.dcsList.push({
        prjId: this.prjInfo.prjId,
        prjSeq: '',
        stdDecision: '',
        consDecision: '',
        views: true,
      });
    },
    onDcsDel(index) {
      this.dcsList.splice(index, 1);
    },
    onAltOpen(openFlag) {
      this.openAltAll = !openFlag;
      this.altList = this.altList.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.views = this.openAltAll;
        acc.push(obj);
        return acc;
      }, []);
    },
    onAltClick(item) {
      item.views = !item.views;
    },
    onAltAdd() {
      this.altList.push({
        prjId: this.prjInfo.prjId,
        prjSeq: '',
        altDecision: '',
        altYn: 'Y',
        altResult: '',
        optObj: '',
        views: true,
      });
    },
    onAltDel(index) {
      this.altList.splice(index, 1);
    },
    onImplAdd() {
      this.implList.push({
        implPlan: '',
        implDeptId: '',
        implDeptNm: '',
        implFromDate: new Date(),
        implToDate: new Date(),
        prjId: this.prjInfo.prjId,
        prjSeq: '',
      });
    },
    onImplDel(index) {
      this.implList.splice(index, 1);
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
    //* 부서조회 팝업
    onDeptSearchPop(implIdx) {
      this.implIdx = implIdx;
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },

    async getFileList() {
      this.implFileList = [];
      this.graspFileList = [];
      this.dscFileList = [];
      this.altFileList = [];
      for (let item of this.allFileList) {
        if (item.downloadType === this.GV_STEP_DETAIL_LIST[7].stepCd) {
          this.implFileList.push(item); // 현상파악
        } else if (item.downloadType === this.GV_STEP_DETAIL_LIST[4].stepCd) {
          this.graspFileList.push(item); // 상황분석
        } else if (item.downloadType === this.GV_STEP_DETAIL_LIST[5].stepCd) {
          this.dscFileList.push(item); // 결정요인
        } else if (item.downloadType === this.GV_STEP_DETAIL_LIST[6].stepCd) {
          this.altFileList.push(item); // 대안선정
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
  },
};
</script>
