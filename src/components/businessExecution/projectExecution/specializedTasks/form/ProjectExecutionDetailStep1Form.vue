<template>
  <dl class="task-accordion">
    <p
      class="taskstep-title"
      :class="{ current: GV_STEP_DETAIL_LIST[0].selectedIdx < 4 }"
    >
      <span>STEP1</span>
      {{ GV_STEP_LIST[0].cdNm }}
    </p>
    <validation-observer
      tag="div"
      ref="obs1"
      v-slot="{ invalid, validated, errors }"
    >
      <dl>
        <dt
          :class="{ current: GV_STEP_DETAIL_LIST[0].current }"
          :ref="GV_STEP_DETAIL_LIST[0].stepCd"
          @click="onTab(GV_STEP_DETAIL_LIST[0].stepCd, 0)"
        >
          <button type="button" class="task-accordion-btn">
            <span
              >{{ GV_STEP_DETAIL_LIST[0].stepNm }}
              <em class="required-text">*</em></span
            >
            <span
              class="task-state"
              :class="{ finish: GV_STEP_DETAIL_LIST[0].stepStatus == '1' }"
              >state</span
            >
          </button>
        </dt>
        <dd>
          <div class="accordion-inner-btnbox">
            <button
              v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[0].stepCd] === true"
              type="button"
              class="accordion-btn skill"
              @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[0].stepCd)"
            >
              <!-- 개선스킬 -->
              <span>{{ $t('NLS0000903') }} </span>
            </button>
            <button
              type="button"
              class="accordion-btn save"
              @click="onBaseSave('10', GV_STEP_DETAIL_LIST[0].stepCd, '0')"
              :disabled="baseDisabled"
            >
              <!-- 저장 -->
              <span>{{ $t('NLS0000074') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn finish"
              @click="onBaseSave('10', GV_STEP_DETAIL_LIST[0].stepCd, '1')"
              :disabled="baseDisabled"
            >
              <!-- 완료 -->
              <span>{{ $t('NLS0000829') }}</span>
            </button>
            <button
              type="button"
              class="accordion-btn message"
              :class="{ on: GV_MSG_CNT_LIST[0].checked === '1' }"
              @click="
                openPrjMsgPop(
                  GV_STEP_DETAIL_LIST[0].stepCd,
                  GV_STEP_DETAIL_LIST[0].stepNm,
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
              @click="openHelpPop(GV_STEP_DETAIL_LIST[0].stepNm, 'NLS0000746')"
            >
              <!-- 도움말 -->
              <span>{{ $t('NLS0000823') }}</span>
            </button>
          </div>
          <div class="hmstask-table">
            <table>
              <colgroup>
                <col style="width:120px;" />
                <col style="width:auto" />
                <col style="width:120px;" />
                <col style="width:auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row" class="required-field">
                    <!-- 과제 명 -->
                    {{ $t('NLS0000151') }} <em class="required-text">*</em>
                  </th>
                  <td colspan="3">
                    <span class="input__box type-nobtn">
                      <com-input-text
                        type="text"
                        v-model="prjInfo.prjNm"
                        :disable="baseDisabled"
                        rules="required"
                      />
                    </span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required-field">
                    <!-- 추진 일정 -->
                    {{ $t('NLS0000937') }} <em class="required-text">*</em>
                  </th>
                  <td colspan="3">
                    {{ prjInfo.prjStartDate }}
                    <em class="date-divide">~</em>
                    {{ prjInfo.prjEndDate }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required-field">
                    <!-- 담당부서장 -->
                    {{ $t('NLS0000197') }} <em class="required-text">*</em>
                  </th>
                  <td>
                    <div class="task-inputform type2">
                      <com-input-text
                        type="text"
                        v-model="prjBaseInfo.prjManager"
                        :disable="baseDisabled"
                        rules="required"
                        @keyup="onKeyUp('Manager')"
                        @enter="enterUserSearchPop('MANAGER')"
                      />
                      <button
                        type="button"
                        class="magnifier-btn-black"
                        :disabled="baseDisabled"
                        @click="enterUserSearchPop('MANAGER')"
                      >
                        더찾기
                      </button>
                      <!-- <button
                    type="button"
                    class="magnifier-btn-black"
                    :disabled="baseDisabled"
                    @click="openUserSearchPop('MANAGER')"
                  >
                    더찾기
                  </button> -->
                    </div>
                  </td>
                  <th scope="row" class="required-field">
                    <!-- 담당자 -->
                    {{ $t('NLS0000065') }} <em class="required-text">*</em>
                  </th>
                  <td>
                    <div class="task-inputform type2">
                      <com-input-text
                        type="text"
                        v-model="prjBaseInfo.prjUser"
                        :disable="baseDisabled"
                        rules="required"
                        @keyup="onKeyUp('USER')"
                        @enter="enterUserSearchPop('USER')"
                      />
                      <button
                        type="button"
                        class="magnifier-btn-black"
                        :disabled="baseDisabled"
                        @click="enterUserSearchPop('USER')"
                      >
                        더찾기
                      </button>
                      <!-- <button
                    type="button"
                    class="magnifier-btn-black"
                    :disabled="baseDisabled"
                    @click="openUserSearchPop('USER')"
                  >
                    더찾기
                  </button> -->
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <!-- 협업 부서장 -->
                    {{ $t('NLS0001145') }}
                  </th>
                  <td>
                    <div class="task-inputform type2">
                      <com-input-text
                        type="text"
                        v-model="prjBaseInfo.prjCor"
                        :disable="baseDisabled"
                        @keyup="onKeyUp('COR')"
                        @enter="enterUserSearchPop('COR')"
                      />
                      <button
                        type="button"
                        class="magnifier-btn-black"
                        @click="enterUserSearchPop('COR')"
                        :disabled="baseDisabled"
                      >
                        더찾기
                      </button>
                      <!-- <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="openUserSearchPop('COR')"
                    :disabled="baseDisabled"
                  >
                    더찾기
                  </button> -->
                    </div>
                  </td>
                  <th scope="row">
                    <!-- 협업자 -->
                    {{ $t('NLS0000938') }}
                  </th>
                  <td>
                    <div class="task-inputform type2">
                      <com-input-text
                        type="text"
                        v-model="prjBaseInfo.prjReq"
                        :disable="baseDisabled"
                        @keyup="onKeyUp('REQ')"
                        @enter="enterUserSearchPop('REQ')"
                      />
                      <button
                        type="button"
                        class="magnifier-btn-black"
                        @click="enterUserSearchPop('REQ')"
                        :disabled="baseDisabled"
                      ></button>
                      <!-- <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="openUserSearchPop('REQ')"
                    :disabled="baseDisabled"
                  ></button> -->
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <!-- 전략과제 -->
                    {{ $t('NLS0000939') }}
                  </th>
                  <td colspan="3">
                    <div class="task-inputform type2">
                      <com-input-text
                        :isReadOnly="true"
                        :disable="baseDisabled"
                      >
                      </com-input-text>
                      <button
                        type="button"
                        class="magnifier-btn-black"
                        @click="onStrategyPop"
                        :disabled="baseDisabled"
                      >
                        더찾기
                      </button>

                      <div class="joint-user-box">
                        <span
                          class="joint-user"
                          v-for="(item, index) in connectStgList"
                          :key="index"
                        >
                          {{ item.stgDeptNm }}/{{ item.stgNm }}
                          <button
                            type="button"
                            class="del2-btn"
                            @click="deleteConnectStg(item.stgId, item.baseYYYY)"
                            :disabled="baseDisabled"
                          >
                            <!-- 삭제 -->
                            {{ $t('NLS0000075') }}
                          </button>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <!-- 검색키워드 -->
                    {{ $t('NLS0000499') }}
                  </th>
                  <td colspan="3">
                    <div class="task-inputform__row">
                      <div class="task-inputform type5">
                        <com-input-text
                          type="text"
                          v-model="prjBaseInfo.keyWorldList[0].keywd"
                          :disable="baseDisabled"
                        />
                      </div>
                      <div class="task-inputform type5">
                        <com-input-text
                          type="text"
                          v-model="prjBaseInfo.keyWorldList[1].keywd"
                          :disable="baseDisabled"
                        />
                      </div>
                      <div class="task-inputform type5">
                        <com-input-text
                          type="text"
                          v-model="prjBaseInfo.keyWorldList[2].keywd"
                          :disable="baseDisabled"
                        />
                      </div>
                    </div>
                    <!-- <span class="task-inputform type5">
                  <com-input-text
                    type="text"
                    v-model="prjBaseInfo.keyWorldList[3].keywd"
                    :disable="baseDisabled"
                  />
                </span>
                <span class="task-inputform type5">
                  <com-input-text
                    type="text"
                    v-model="prjBaseInfo.keyWorldList[4].keywd"
                    :disable="baseDisabled"
                  />
                </span> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </dd>
      </dl>
      <!-- ValidateError 컴포넌트 영역 -->
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors1"
      ></com-validate-error>
    </validation-observer>
    <validation-observer
      tag="div"
      ref="obs2"
      v-slot="{ invalid, validated, errors }"
    >
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[1].current }"
        :ref="GV_STEP_DETAIL_LIST[1].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[1].stepCd, 1)"
      >
        <button type="button" class="task-accordion-btn">
          <span
            >{{ GV_STEP_DETAIL_LIST[1].stepNm }}
            <em class="required-text">*</em></span
          >
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[1].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[1].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[1].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onOverviewSave('10', GV_STEP_DETAIL_LIST[1].stepCd, '0')"
            :disabled="overViewDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onOverviewSave('10', GV_STEP_DETAIL_LIST[1].stepCd, '1')"
            :disabled="overViewDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[1].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[1].stepCd,
                GV_STEP_DETAIL_LIST[1].stepNm,
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[1].stepNm, 'NLS0000747')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-inputform type1">
            <!-- 연관과제 -->
            <label for="test1">{{ $t('NLS0000940') }}</label>
            <com-input-text
              type="text"
              id="rltPrjNm"
              v-model="overViewInfo.rltPrjNm"
              :isReadOnly="true"
              :disable="overViewDisabled"
            />
            <button
              type="button"
              class="magnifier-btn-black"
              @click="openAssignmentSrchPop"
              :disabled="overViewDisabled"
            >
              더찾기
            </button>
          </div>
          <div class="task-textform">
            <!-- 추진 목표 및 기대 효과 -->
            <label for="prjResume" class="required-field">
              {{ $t('NLS0000529') }} <span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="prjResume"
              rules="requiredCK|required"
              v-model="overViewInfo.prjResume"
              :disable="overViewDisabled"
            ></com-ck-editor>
          </div>
          <div class="task-textform">
            <!-- 추진 배경 및 참고 웹사이트 -->
            <label for="prjBg" class="required-field"
              >{{ $t('NLS0000530') }}
              <span class="required-text">*</span></label
            >
            <com-ck-editor
              v-if="editorRender"
              id="prjBg"
              rules="requiredCK|required"
              v-model="overViewInfo.prjBg"
              :disable="overViewDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[1].stepCd"
                :fileList="overViewFileList"
                :ownerObjectId="prjInfo.prjId"
                :read="overViewDisabled"
                @files="getOverViewFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </dd>
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors2"
      ></com-validate-error>
    </validation-observer>
    <validation-observer
      tag="div"
      ref="obs3"
      v-slot="{ invalid, validated, errors }"
    >
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[2].current }"
        :ref="GV_STEP_DETAIL_LIST[2].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[2].stepCd, 2)"
      >
        <button type="button" class="task-accordion-btn">
          <span
            >{{ GV_STEP_DETAIL_LIST[2].stepNm }}
            <em class="required-text">*</em></span
          >
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[2].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div class="accordion-inner-btnbox">
          <button
            v-if="GV_SKILL_STEP[GV_STEP_DETAIL_LIST[2].stepCd] === true"
            type="button"
            class="accordion-btn skill"
            @click="openPrjSkillPop(GV_STEP_DETAIL_LIST[2].stepCd)"
          >
            <!-- 개선스킬 -->
            <span>{{ $t('NLS0000903') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn save"
            @click="onResourceSave('10', GV_STEP_DETAIL_LIST[2].stepCd, '0')"
            :disabled="resourceViewDisabled"
          >
            <!-- 저장 -->
            <span>{{ $t('NLS0000074') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn finish"
            @click="onResourceSave('10', GV_STEP_DETAIL_LIST[2].stepCd, '1')"
            :disabled="resourceViewDisabled"
          >
            <!-- 완료 -->
            <span>{{ $t('NLS0000829') }}</span>
          </button>
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[2].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[2].stepCd,
                GV_STEP_DETAIL_LIST[2].stepNm,
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[2].stepNm, 'NLS0000748')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <div class="task-textform">
            <label for="prjResource" class="required-field">
              <!-- 소요 자원 계획(비용/일정) -->
              {{ $t('NLS0000531') }}<span class="required-text">*</span>
            </label>
            <com-ck-editor
              v-if="editorRender"
              id="prjResource"
              rules="requiredCK|required"
              v-model="prjResource"
              :disable="resourceViewDisabled"
            ></com-ck-editor>
          </div>
          <div class="hms-upload">
            <div id="products1">
              <com-upload-file
                :multiple="true"
                :downloadType="GV_STEP_DETAIL_LIST[2].stepCd"
                :fileList="resourceViewFileList"
                :ownerObjectId="prjInfo.prjId"
                :read="resourceViewDisabled"
                @files="getResourceViewFiles"
              ></com-upload-file>
            </div>
          </div>
        </div>
      </dd>
      <com-validate-error
        :invalid="invalid"
        :validated="validated"
        :errors="errors"
        @errors="onErrors3"
      ></com-validate-error>
    </validation-observer>
    <validation-observer
      tag="div"
      ref="obs4"
      v-slot="{ invalid, validated, errors }"
    >
      <dt
        :class="{ current: GV_STEP_DETAIL_LIST[3].current }"
        :ref="GV_STEP_DETAIL_LIST[3].stepCd"
        @click="onTab(GV_STEP_DETAIL_LIST[3].stepCd, 3)"
      >
        <button type="button" class="task-accordion-btn">
          <span
            >{{ GV_STEP_DETAIL_LIST[3].stepNm }}
            <em class="required-text">*</em></span
          >
          <span
            class="task-state"
            :class="{ finish: GV_STEP_DETAIL_LIST[3].stepStatus == '1' }"
            >state</span
          >
        </button>
      </dt>
      <dd>
        <div
          class="accordion-inner-btnbox"
          v-if="prjBaseInfo.prjManagerId == loginUserInfo.userId"
        >
          <button
            type="button"
            class="accordion-btn message"
            :class="{ on: GV_MSG_CNT_LIST[3].checked === '1' }"
            @click="
              openPrjMsgPop(
                GV_STEP_DETAIL_LIST[3].stepCd,
                GV_STEP_DETAIL_LIST[3].stepNm,
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
            @click="openHelpPop(GV_STEP_DETAIL_LIST[3].stepNm, 'NLS0000748')"
          >
            <!-- 도움말 -->
            <span>{{ $t('NLS0000823') }}</span>
          </button>
        </div>
        <div class="hmstask-form-box">
          <!-- 과제등급 -->
          <p class="sub-title">{{ $t('NLS0000157') }}</p>
          <div
            class="layer-task-radio-wrap"
            v-if="
              prjBaseInfo.prjManagerId == loginUserInfo.userId &&
                prjInfo.prjStepStatus1 == '1'
            "
          >
            <p class="task-radio-box">
              <!-- A등급 (BU실적) -->
              <com-input-text
                type="radio"
                name="task-radio"
                id="radio0"
                value="A"
                :check="prjInfo.prjGrade === 'A' ? true : false"
                labelId="radio0"
                :labelTitle="$t('NLS0000512')"
                labelClass="title"
                :disable="reviewDisabled"
                @change="onChkChange"
              />
            </p>
            <p class="task-radio-box">
              <!-- B등급 (팀 실적) -->
              <com-input-text
                type="radio"
                name="task-radio"
                id="radio1"
                value="B"
                :check="prjInfo.prjGrade === 'B' ? true : false"
                labelId="radio1"
                :labelTitle="$t('NLS0000513')"
                labelClass="title"
                :disable="reviewDisabled"
                @change="onChkChange"
              />
            </p>
            <p class="task-radio-box">
              <!-- C등급 (개인실적) -->
              <com-input-text
                type="radio"
                name="task-radio"
                id="radio2"
                value="C"
                :check="prjInfo.prjGrade === 'C' ? true : false"
                labelId="radio2"
                :labelTitle="$t('NLS0000514')"
                labelClass="title"
                :disable="reviewDisabled"
                @change="onChkChange"
              />
            </p>
            <p class="task-radio-box">
              <!-- D등급 (즉 실천) -->
              <com-input-text
                type="radio"
                name="task-radio"
                id="radio3"
                value="D"
                :check="prjInfo.prjGrade === 'D' ? true : false"
                labelId="radio3"
                :labelTitle="$t('NLS0000515')"
                labelClass="title"
                :disable="reviewDisabled"
                @change="onChkChange"
              />
            </p>
            <div class="page__btn-bbox type-center">
              <button
                type="button"
                class="darkgray-btn"
                @click="onPrjGradeSave('B', '3', GV_STEP_DETAIL_LIST[3].stepCd)"
              >
                <!-- 진행중단 -->
                <span>{{ $t('NLS0000532') }}</span>
              </button>
              <button
                type="button"
                class="red-btn"
                @click="onPrjGradeSave('A', '2', GV_STEP_DETAIL_LIST[3].stepCd)"
              >
                <!-- 수행승인 -->
                <span>{{ $t('NLS0000516') }}</span>
              </button>
            </div>
          </div>
          <div class="task-textform">
            <div
              class="text-info"
              v-if="
                prjInfo.prjStepStatus1 == '1' &&
                  prjBaseInfo.prjManagerId != loginUserInfo.userId
              "
            >
              <div class="vertical-box">
                <!-- 수행승인 대기중 입니다. -->
                <p class="dot-text">{{ $t('NLS0000906') }}</p>
              </div>
            </div>
            <div
              class="text-info"
              v-if="prjInfo.prjGrade == 'A' && prjInfo.prjStepStatus1 == '2'"
            >
              <div class="vertical-box">
                <!-- A등급으로 수행승인 되었습니다. -->
                <p class="dot-text">{{ $t('NLS0000941') }}</p>
              </div>
            </div>

            <div
              class="text-info"
              v-if="prjInfo.prjGrade == 'B' && prjInfo.prjStepStatus1 == '2'"
            >
              <div class="vertical-box">
                <!-- B등급으로 수행승인 되었습니다. -->
                <p class="dot-text">{{ $t('NLS0000942') }}</p>
              </div>
            </div>
            <div
              class="text-info"
              v-if="prjInfo.prjGrade == 'C' && prjInfo.prjStepStatus1 == '2'"
            >
              <div class="vertical-box">
                <!-- C등급으로 수행승인 되었습니다. -->
                <p class="dot-text">{{ $t('NLS0000943') }}</p>
              </div>
            </div>
            <div
              class="text-info"
              v-if="prjInfo.prjGrade == 'D' && prjInfo.prjStepStatus1 == '3'"
            >
              <div class="vertical-box">
                <!-- D등급으로 수행승인 되었습니다. -->
                <p class="dot-text">{{ $t('NLS0000944') }}</p>
                <!-- 즉 실천을 등록해주세요 -->
                <!-- <span class="dash-text depth2"> - {{ $t('NLS0000945') }} </span> -->
              </div>
              <button
                type="button"
                class="blue-btn"
                @click="goPrjAction"
                v-if="
                  prjBaseInfo.prjUserId == loginUserInfo.userId ||
                    prjBaseInfo.prjManagerId == loginUserInfo.userId
                "
              >
                <!-- 즉실천 바로가기	 -->
                <span>{{ $t('NLS0000533') }}</span>
              </button>
            </div>
            <div
              class="text-info"
              v-if="prjInfo.prjGrade !== 'D' && prjInfo.prjStepStatus1 == '3'"
            >
              <div class="vertical-box">
                <!-- 진행중단되었습니다. -->
                <p class="dot-text">{{ $t('NLS0000946') }}</p>
              </div>
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
  </dl>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComInputText from '@/components/common/global/ComInputText';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import {
  specializedTasksStore,
  generalTasksStore,
  commonStore,
} from '@/mixins';
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectExecutionDetailStep1Form',
  mixins: [specializedTasksStore, generalTasksStore, commonStore],
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
      prjInfo: {},
      //* DatePicker
      // prjStartDate: new Date(),
      // prjEndDate: new Date(),
      format: 'yyyy-MM-dd',
      //* userSearchFlag
      srchUserFlag: '',
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
          // { itemSeq: '', keywd: '' },
          // { itemSeq: '', keywd: '' },
        ],
      },
      connectStgList: [], //* 연결전략과제 리스트
      //* 초기 담당자/부서장 세팅
      // loginUserInfo: {},
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
      //* Disabled
      baseDisabled: true,
      overViewDisabled: true,
      resourceViewDisabled: true,
      reviewDisabled: true,
      msgDisabled: true,
      //* 추진개요
      overViewInfo: {
        rltPrjNm: '',
        rltPrjId: '',
        prjResume: '',
        prjBg: '',
      },
      //* 소요자원
      prjResource: '',
      //* 계획검토
      prjGrade: 'A',
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
      isCompleteStep: false,
      isReset: false,
      stepIdx: 0,
      //* All FileList
      allFileList: [],
      //*file
      overViewFileList: [],
      paramOverViewFileList: [],
      resourceViewFileList: [],
      paramResourceViewFileList: [],
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
    getSelectedUserList() {
      //*선택한 사용자
      const param = {
        userList: this[
          commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA
        ],
      };
      return param;
    },
    //* 검색된 과제 정보 가져오기
    getAssignmentInfo() {
      const item = this[commonTypes.getters.GET_ASSIGNMENT_INFO];
      return item[0];
    },
    //* 선택한 연결전략 과제
    getSelectedStrategy() {
      return this[commonTypes.getters.GET_SELECTED_STRATEGY_LIST];
    },
    getAllFileList(state) {
      const item = this[commonTypes.getters.GET_FILE_INFO_LIST];
      state.allFileList = item;
      return item;
    },
  },
  created() {
    // this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    if (
      !common.isEmpty(this.$route.params.type) &&
      this.$route.params.type == 'new'
    ) {
      //* prjInfo세팅
      this.prjInfo = this[
        specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO
      ];
      //* 담당자 세팅
      this.$set(this.prjBaseInfo, 'prjUserId', this.loginUserInfo.userId);
      this.$set(this.prjBaseInfo, 'prjDeptId', this.loginUserInfo.deptId);
      this.$set(
        this.prjBaseInfo,
        'prjUser',
        this.loginUserInfo.deptNm + ' / ' + this.loginUserInfo.userName,
      );
      //* 부서장 세팅
      if (!common.isEmpty(this.loginUserInfo.app1UserId)) {
        this.$set(
          this.prjBaseInfo,
          'prjManagerId',
          this.loginUserInfo.app1UserId,
        );
        this.$set(
          this.prjBaseInfo,
          'prjManager',
          this.loginUserInfo.app1DeptNm +
            ' / ' +
            this.loginUserInfo.app1UserName,
        );
      }
      this.prjBaseInfo.keyWorldList = [
        { itemSeq: '', keywd: '' },
        { itemSeq: '', keywd: '' },
        { itemSeq: '', keywd: '' },
        // { itemSeq: '', keywd: '' },
        // { itemSeq: '', keywd: '' },
      ];
      this.baseDisabled = false;
    }
  },
  mounted() {
    this.$refs.obs1.validate();
    this.$refs.obs2.validate();
    this.$refs.obs3.validate();
    this.$refs.obs4.validate();
    this.getFileList();
    common.delay(() => {
      this.editorRender = true;
    }, 1000);
  },
  watch: {
    getPrjInfo: function(value) {
      if (!common.isEmpty(value.prjInfo)) {
        this.prjInfo = value.prjInfo;
        this.GV_PRJ_ID = this.prjInfo.prjId;
        this.prjBaseInfo = value.prjBaseUserInfo;
        if (this.isCompleteStep) {
          if (value.prjInfo.prjStatus === 'B' || this.isReset) {
            this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
              value.prjStatusList,
            );
            this.isReset = false;
          } else {
            this.onCompleteStep(this.stepIdx);
            this.stepIdx = 0;
          }
          this.isCompleteStep = false;
        }

        if (!common.isEmpty(value.prjOverviewInfo)) {
          this.overViewInfo = value.prjOverviewInfo;
        } else {
          this.overViewInfo = this.overViewInfo;
        }

        if (!common.isEmpty(value.prjResourceInfo)) {
          this.prjResource = value.prjResourceInfo.prjResource;
        }
        //* 부서명/사람명 설정
        if (!common.isEmpty(this.prjBaseInfo.prjManagerId)) {
          this.$set(
            this.prjBaseInfo,
            'prjManager',
            this.prjBaseInfo.managerDeptNm + ' / ' + this.prjBaseInfo.managerNm,
          );
        } else {
          if (!common.isEmpty(this.loginUserInfo.app1UserId)) {
            this.$set(
              this.prjBaseInfo,
              'prjManagerId',
              this.loginUserInfo.app1UserId,
            );
            this.$set(
              this.prjBaseInfo,
              'prjManager',
              this.loginUserInfo.app1DeptNm +
                ' / ' +
                this.loginUserInfo.app1UserName,
            );
          }
        }
        if (!common.isEmpty(this.prjBaseInfo.prjUserId)) {
          this.$set(
            this.prjBaseInfo,
            'prjUser',
            this.prjBaseInfo.deptNm + ' / ' + this.prjBaseInfo.userNm,
          );
        }
        if (!common.isEmpty(this.prjBaseInfo.corUserId)) {
          this.$set(
            this.prjBaseInfo,
            'prjCor',
            this.prjBaseInfo.corDept + ' / ' + this.prjBaseInfo.corNm,
          );
        }
        if (!common.isEmpty(this.prjBaseInfo.reqUserId)) {
          this.$set(
            this.prjBaseInfo,
            'prjReq',
            this.prjBaseInfo.reqDept + ' / ' + this.prjBaseInfo.reqNm,
          );
        }
        //* 검색 키워드
        let keyWdList = [];
        const listData = { prjId: this.GV_PRJ_ID, itemSeq: '', keywd: '' };
        for (let i = 0; i < 5; i++) {
          if (!common.isEmpty(value.prjBaseKeyWdList[i])) {
            keyWdList.push(value.prjBaseKeyWdList[i]);
          } else {
            keyWdList.push({ ...listData });
          }
        }
        if (keyWdList.length > 0) {
          this.prjBaseInfo.keyWorldList = keyWdList;
        } else {
          this.prjBaseInfo.keyWorldList = this.keyWorldList;
        }
        this.setStepDisabled(
          this[specializedTasksTypes.getters.GET_PROJECT_STATUS_LIST],
        );

        // if (this.prjInfo.prjStatus === 'C') {
        //   this.baseDisabled = true;
        //   this.overViewDisabled = true;
        //   this.resourceViewDisabled = true;
        //   this.reviewDisabled = true;
        // }
      }
    },
    getMessgesList: function(value) {
      this.GV_MSG_CNT_LIST = value;
    },
    getSkillStepInfo: function(value) {
      this.GV_SKILL_STEP = value;
    },
    getSelectedUserList: function(value) {
      if (value.userList) {
        switch (this.srchUserFlag) {
          case 'MANAGER':
            this.prjBaseInfo = {
              ...this.prjBaseInfo,
              prjManagerId: value.userList.userId,
              prjManager:
                value.userList.deptNm + ' / ' + value.userList.userName,
            };
            break;
          case 'USER':
            this.prjBaseInfo = {
              ...this.prjBaseInfo,
              prjUserId: value.userList.userId,
              prjDeptId: value.userList.deptId,
              prjUser: value.userList.deptNm + ' / ' + value.userList.userName,
            };
            break;
          case 'COR':
            this.prjBaseInfo = {
              ...this.prjBaseInfo,
              corUserId: value.userList.userId,
              corDeptId: value.userList.deptId,
              prjCor: value.userList.deptNm + ' / ' + value.userList.userName,
            };
            break;
          case 'REQ':
            this.prjBaseInfo = {
              ...this.prjBaseInfo,
              reqUserId: value.userList.userId,
              reqDeptId: value.userList.deptId,
              prjReq: value.userList.deptNm + ' / ' + value.userList.userName,
            };
            break;
        }
      }
    },
    getAssignmentInfo: function(value) {
      if (value != null) {
        this.$set(this.overViewInfo, 'rltPrjNm', value.prjNm);
        this.$set(this.overViewInfo, 'rltPrjId', value.prjId);
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
    //* 선택한 전략과제 정보
    getSelectedStrategy(value) {
      //* 중복제거
      value.forEach(element => {
        const index = this.connectStgList.findIndex(
          el => el.stgId === element.stgId,
        );
        if (index < 0) {
          this.connectStgList.push(element);
        }
      });
    },
    [specializedTasksTypes.getters.GET_CONN_STG_LIST](value) {
      this.connectStgList = value;
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      //* 첨부파일 (추진개요, 소요자원)
      this.getFileList();
    },
  },
  methods: {
    setStepDisabled(value) {
      //*INIT
      this.baseDisabled = true;
      this.overViewDisabled = true;
      this.resourceViewDisabled = true;
      this.reviewDisabled = true;

      const { prjStatus, prjId, prjGrade } = this.prjInfo;
      const { pass, isPrjUser } = common.chkPrjAuth(
        this.loginUserInfo,
        this.prjBaseInfo,
      );

      if (pass) this.msgDisabled = false;
      //*  완료 또는 중단된 과제인 경우: 버튼 비활성화, D단계 승인인 경우: 과제 중단 상태지만 버튼 활성화+
      if (!common.isEmpty(prjId) && value.length > 0) {
        if (
          (prjStatus !== 'C' && prjStatus !== 'B') ||
          (prjStatus === 'B' && prjGrade === 'D')
        ) {
          if (pass) {
            this.baseDisabled = false;
            this.overViewDisabled = false;
            this.reviewDisabled = false;
          }
          if (isPrjUser) this.resourceViewDisabled = false;
        }
      }
    },
    onBaseSave(stepType, stepCd, stepStatus) {
      //* 담당부서장이 기본정보 저장한 경우
      if (
        stepStatus === '0' &&
        this.prjBaseInfo.prjManagerId === this.loginUserInfo.userId
      ) {
        //저장 시 과제 담당자에게 과제 할당 알림 및 메일이 발송됩니다. '취소'를 누르면 임시저장 상태만 유지됩니다.
        common.confirm(
          'NLS0001384',
          () => {
            //* confirm
            this.saveBaseInfo(stepType, stepCd, stepStatus, true);
          },
          () => {
            //* cancel
            this.saveBaseInfo(stepType, stepCd, stepStatus);
          },
        );
      } else {
        this.saveBaseInfo(stepType, stepCd, stepStatus);
      }
    },
    async saveBaseInfo(stepType, stepCd, stepStatus, flag) {
      if (this.GV_invalid1) {
        common.alert('warning', this.GV_errors1.msg);
        return false;
      }
      //* Date validation check
      if (this.prjStartDate > this.prjEndDate) {
        // 과제 전체 실행기간의 종료날짜가 시작날짜보다 작을 수 없습니다.
        //* 전체기간
        common.alert('warning', 'NLS0000860');
        return false;
      }
      //* 담당자 또는 담당부서장 ID 빈값
      if (
        this.prjBaseInfo.prjUserId === '' ||
        this.prjBaseInfo.prjManagerId === ''
      ) {
        common.alert('warning', 'NLS0001054');
        return false;
      }
      this.prjInfo.prjId = this.GV_PRJ_ID;
      this.setPrjRate(stepType, stepCd);
      const prjObj = { ...this.prjInfo };
      prjObj.prjStartDate = this.prjInfo.prjStartDate.split('-').join('');
      prjObj.prjEndDate = this.prjInfo.prjEndDate.split('-').join('');
      const params = {
        ...prjObj,
        prjBaseInfo: this.prjBaseInfo,
        keyWorldList: this.prjBaseInfo.keyWorldList,
        connectStgList: this.connectStgList, //* 연결전략과제 리스트
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        loginId: this.loginUserInfo.userId,
        managerSave: flag ? flag : false,
        baseYyyy: this.$route.params.baseYyyy,
      };
      const data = await this[
        specializedTasksTypes.actions.UPDATE_PROJECT_EXECUTION
      ](params);
      this.GV_PRJ_ID = data.prjId;
      if (stepStatus === '1') {
        this.isCompleteStep = true;
        this.stepIdx = 0;
      }
    },
    async onOverviewSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid2) {
        common.alert('warning', this.GV_errors2.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjInfo: this.prjInfo,
        overViewInfo: this.overViewInfo,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        userId: this.loginUserInfo.userId,
        downloadType: stepCd,
        fileList: this.paramOverViewFileList,
      };

      await this[specializedTasksTypes.actions.UPDATE_PROJECT_OVERVIEW](params);
      if (stepStatus === '1') {
        this.isCompleteStep = true;
        this.stepIdx = 1;
        // this.onCompleteStep(1);
      }
    },
    async onResourceSave(stepType, stepCd, stepStatus) {
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      if (this.GV_invalid3) {
        common.alert('warning', this.GV_errors3.msg);
        return false;
      }
      this.setPrjRate(stepType, stepCd);
      const params = {
        prjId: this.GV_PRJ_ID,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        prjStatus: this.prjInfo.prjStatus,
        prjResource: this.prjResource,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepType: stepType,
        stepCd: stepCd,
        stepStatus: stepStatus,
        downloadType: stepCd,
        fileList: this.paramResourceViewFileList,
      };

      if (stepStatus == '1') {
        // 계획검토 대단계를 완료하고 검토자에게 수행승인을 요청합니다.
        // '#stepName#을 수행하기 위해 담당부서장에게 검토를 요청합니다. '취소'를 누르면 임시저장 상태만 유지됩니다.'
        /*const stepName =
          this.prjInfo.prjType === 'DS'
            ? common.getCodeList('PRJ009')[1]
            : this.prjInfo.prjType === 'DC'
            ? common.getCodeList('PRJ007')[1]
            : this.prjInfo.prjType === 'RD'
            ? common.getCodeList('PRJ008')[1]
            : this.prjInfo.prjType === 'SA'
            ? common.getCodeList('PRJ010')[1]
            : '';*/
        const msg = this.$t('NLS0000947').replace('#stepName#', 'STEP 2');
        //* 'D'등급으로 승인된 과제의 경우 STEP1의 버튼들 활성화 -> 요청 시 과제의 모든 Status 초기화
        common.confirm(
          msg,
          async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_RESOURCE]({
              ...params,
              resetStatus: this.prjInfo.prjGrade === 'D' ? true : false,
            });
            // this.onCompleteStep(2);
            this.isReset = this.prjInfo.prjGrade === 'D' ? true : false;
            this.isCompleteStep = true;
            this.stepIdx = 2;
          },
          async () => {
            params.stepStatus = '0';
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_RESOURCE](
              params,
            );
          },
        );
      } else {
        // 저장 시 변경된 내용으로 재검토요청을 하여야 합니다. 저장하실 경우 '확인'버튼을 눌러주세요.
        if (this.prjInfo.prjStepStatus1 === '2') {
          params.stepStatus = '0';
          common.confirm('NLS0001386', async () => {
            await this[specializedTasksTypes.actions.UPDATE_PROJECT_RESOURCE](
              params,
            );
          });
        } else {
          await this[specializedTasksTypes.actions.UPDATE_PROJECT_RESOURCE](
            params,
          );
        }
      }
    },
    async onPrjGradeSave(prjStatus, prjStepStatus, stepCd) {
      //* b3 중단, a2 수행승인
      if (this.onEmptyPrjId()) {
        common.alert('warning', 'NLS0000808');
        return false;
      }
      let actNow = null;
      this.setPrjRate('10', stepCd);
      //* D등급 수행 승인 또는 과제 중단인 경우
      if (this.prjInfo.prjGrade === 'D' && prjStepStatus === '2') {
        prjStatus = 'B';
        prjStepStatus = '3';
        actNow = 'Y';
      } else if (prjStepStatus === '3') {
        this.prjInfo.prjGrade = '';
      }
      const param = {
        prjId: this.prjInfo.prjId,
        prjManagerId: this.prjBaseInfo.prjManagerId,
        prjUserId: this.prjBaseInfo.prjUserId,
        prjNm: this.prjInfo.prjNm,
        prjStatus: prjStatus,
        prjRate: this.rateInfo.prjRate,
        prjStepRate: this.rateInfo.prjStepRate,
        stepCd: stepCd,
        stepStatus: prjStepStatus,
        prjGrade: this.prjInfo.prjGrade,
        date: timezone.getClientDate('YYYYMMDD'),
        prjDeptId: this.prjBaseInfo.prjDeptId,
        array: [],
        actNow: actNow,
      };
      await this[specializedTasksTypes.actions.UPDATE_PROJECT_EXREVIEW](param);

      // if (prjStatus === 'B') {
      // const tmeStatusList = [...this.prjStatusList];
      // tmeStatusList.map((item, idx) => {
      //   const obj = { ...item };
      //   if (idx === 3) {
      //     obj.now = true;
      //     obj.current = true;
      //     obj.selectedIdx = idx;
      //   } else {
      //     obj.now = false;
      //     obj.current = false;
      //     obj.selectedIdx = 3;
      //   }
      //   return obj;
      // });
      // this.onCompleteStep(2);
      // } else {
      //   this.onCompleteStep(3);
      // }
      this.isCompleteStep = true;
      this.stepIdx = 3;
    },
    onEmptyPrjId() {
      if (!common.isEmpty(this.prjInfo.prjId)) {
        return false;
      } else {
        return true;
      }
    },
    async goPrjAction() {
      // const params = {
      //   prjNm: this.prjInfo.prjNm,
      //   prjType: this.prjInfo.prjType,
      //   prjTypeNm: common.filterCode(
      //     common.getCodeList('PRJ005'),
      //     this.prjInfo.prjType,
      //   ).cdNm,
      // };

      // await this[specializedTasksTypes.actions.FETCH_PROJECT_POPUP_INFO](
      //   params,
      // );
      // //* 즉실천
      // this[generalTasksType.actions.INIT_IS_NEW_ACTION](true);
      //TODO: origin prjId 와 연결
      await this[generalTasksType.actions.FETCH_CONN_PRJ_ID]({
        orgPrjId: this.prjInfo.prjId,
      });
      this.$router.push({
        name: `PrjActionPage`,
        params: {
          prjId: this[generalTasksType.getters.GET_CONN_PRJ_ID],
          auth: this.$route.params.auth,
        },
      });
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
    async enterUserSearchPop(srchUserFlag) {
      this.srchUserFlag = srchUserFlag;
      let srchNm = '';
      switch (srchUserFlag) {
        case 'MANAGER':
          srchNm = this.prjBaseInfo.prjManager;
          break;

        case 'USER':
          srchNm = this.prjBaseInfo.prjUser;
          break;

        case 'COR':
          srchNm = this.prjBaseInfo.prjCor;
          break;

        case 'REQ':
          srchNm = this.prjBaseInfo.prjReq;
          break;
      }
      //* input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: srchNm,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        switch (this.srchUserFlag) {
          case 'MANAGER':
            this.$set(this.prjBaseInfo, 'prjManagerId', value.userId);
            this.$set(
              this.prjBaseInfo,
              'prjManager',
              value.deptNm + ' / ' + value.userName,
            );
            break;
          case 'USER':
            this.$set(this.prjBaseInfo, 'prjUserId', value.userId);
            this.$set(this.prjBaseInfo, 'prjDeptId', value.deptId);
            this.$set(
              this.prjBaseInfo,
              'prjUser',
              value.deptNm + ' / ' + value.userName,
            );
            break;
          case 'COR':
            this.$set(this.prjBaseInfo, 'corUserId', value.userId);
            this.$set(this.prjBaseInfo, 'corDeptId', value.deptId);
            this.$set(
              this.prjBaseInfo,
              'prjCor',
              value.deptNm + ' / ' + value.userName,
            );
            break;
          case 'REQ':
            this.$set(this.prjBaseInfo, 'reqUserId', value.userId);
            this.$set(this.prjBaseInfo, 'reqDeptId', value.deptId);
            this.$set(
              this.prjBaseInfo,
              'prjReq',
              value.deptNm + ' / ' + value.userName,
            );
            break;
        }
      } else {
        this.openUserSearchPop(srchUserFlag);
        switch (srchUserFlag) {
          case 'MANAGER':
            this.prjBaseInfo.prjManager = '';
            break;

          case 'USER':
            this.prjBaseInfo.prjUser = '';
            break;

          case 'COR':
            this.prjBaseInfo.prjCor = '';
            break;

          case 'REQ':
            this.prjBaseInfo.prjReq = '';
            break;
        }
      }
    },

    //* 담당자 설정 팝업
    openUserSearchPop(srchUserFlag) {
      this.srchUserFlag = srchUserFlag;
      let srchNm = '';
      switch (srchUserFlag) {
        case 'MANAGER':
          srchNm = this.prjBaseInfo.prjManager;
          break;

        case 'USER':
          srchNm = this.prjBaseInfo.prjUser;
          break;

        case 'COR':
          srchNm = this.prjBaseInfo.prjCor;
          break;

        case 'REQ':
          srchNm = this.prjBaseInfo.prjReq;
          break;
      }
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: srchNm,
      });
    },
    //* 연관과제 팝업
    openAssignmentSrchPop() {
      //* 과제검색 팝업
      this[commonTypes.actions.FETCH_SEARCH_ASSIGNMENT_LIST]({
        prjUserId: this.loginUserInfo.userId,
      });
      this[commonTypes.actions.FETCH_SEARCH_STRATEGY_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP](true);
    },
    //* 개선스킬 팝업
    async openPrjSkillPop(prjStepCd) {
      await this[specializedTasksTypes.actions.FETCH_PROJECT_SKILL_CONF_INFO]({
        prjType: this.prjInfo.prjType,
        prjStepId: prjStepCd,
      });
      await this[specializedTasksTypes.actions.INIT_VIEWS_SKILL_CONF_POP](true);
    },
    onStrategyPop() {
      this[commonTypes.actions.FETCH_SEARCH_STRATEGY_LIST]({});
      this[commonTypes.actions.INIT_STRATEGY_SEARCH_POPUP](true);
    },
    //* 공통 연결과제 검색 팝업창에서 가져온 연결과제 삭제
    deleteConnectStg(stgId, baseYYYY) {
      //*공동 사용자 추가 리스트에서 삭제
      const index = this.connectStgList.findIndex(
        el => el.stgId === stgId && el.baseYYYY === baseYYYY,
      );
      this.connectStgList.splice(index, 1);
    },
    //* DatePicker 변경 이벤트
    // onChange(date, name) {
    //   if (name === 'prjStartDate') this.prjStartDate = date;
    //   else if (name === 'prjEndDate') this.prjEndDate = date;
    // },
    onTab(stepCd, idx) {
      const tmeStatusList = JSON.parse(JSON.stringify(this.gvPrjStatusList));
      this.GV_CURR_IDX = idx;
      // if (idx > 0 && this.gvPrjStatusList[idx - 1].stepStatus == '0') {
      //   common.alert(
      //     'warning',
      //     '이전 단계 입력이 완료되어야 오픈 할 수 있습니다.',
      //   );
      // } else {
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
      tmeStatusList[0].selectedIdx = idx;
      this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        tmeStatusList,
      );
      // }
    },
    //* STEP 끝난후, STATUS 값 update
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
    onChkChange(e) {
      this.$set(this.prjInfo, 'prjGrade', e.target.value);
    },
    onKeyUp(flag) {
      switch (flag) {
        case 'MANAGER':
          this.$set(this.prjBaseInfo, 'prjManagerId', '');
          break;
        case 'USER':
          this.$set(this.prjBaseInfo, 'prjUserId', '');
          this.$set(this.prjBaseInfo, 'prjDeptId', '');
          break;
        case 'COR':
          this.$set(this.prjBaseInfo, 'corUserId', '');
          this.$set(this.prjBaseInfo, 'corDeptId', '');
          break;
        case 'REQ':
          this.$set(this.prjBaseInfo, 'reqUserId', '');
          this.$set(this.prjBaseInfo, 'reqDeptId', '');
          break;
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
    async getFileList() {
      this.overViewFileList = [];
      this.resourceViewFileList = [];
      for (let item of this.allFileList) {
        switch (item.downloadType) {
          case this.GV_STEP_DETAIL_LIST[1].stepCd:
            this.overViewFileList.push(item); // 추진개요
            break;
          case this.GV_STEP_DETAIL_LIST[2].stepCd:
            this.resourceViewFileList.push(item); // 소요자원
            break;
        }
      }
    },
    getOverViewFiles(files) {
      this.paramOverViewFileList = files;
    },
    getResourceViewFiles(files) {
      this.paramResourceViewFileList = files;
    },
  },
};
</script>

<style scoped lang="scss">
.hmstask-table::v-deep {
  .input__box {
    width: 100%;
    max-width: 225px;
  }
  .task-inputform {
    width: 100%;
    white-space: nowrap;
    &.type2 {
      input {
        width: calc(100% - 32px);
        max-width: 198px;
        @include breakpoint(desktop-s) {
          max-width: none;
        }
      }
    }
    &__row {
      display: flex;
      width: 100%;
    }
    &.type5 {
      display: inline-block;
      flex-basis: 198px;
      width: 100%;
      margin-right: 0;
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
      @include breakpoint(desktop-s) {
        flex: 1;
      }
      input {
        width: 100%;
      }
    }
  }
}
</style>
