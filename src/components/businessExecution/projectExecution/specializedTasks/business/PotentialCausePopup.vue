<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <validation-observer
            ref="obs1"
            v-slot="{ invalid, validated, errors }"
          >
            <div class="layer-pop__box type-checkpop type-600">
              <!-- 잠재원인 추가->원인 상세내역	 -->
              <div class="layer-pop__title type3">
                {{ $t('NLS0001448') }}
                <button type="button" class="layer-close" @click="closePopup">
                  close {{ slotProps.trigger ? '' : closePopup() }}
                </button>
              </div>
              <div class="layer-btn-tbox type-task">
                <button
                  type="button"
                  class="accordion-btn delete"
                  v-if="causeInfo.prjSeq != ''"
                  @click="onDeleteClick"
                >
                  <!-- 삭제 -->
                  <span> {{ $t('NLS0000075') }}</span>
                </button>
                <button
                  type="button"
                  class="accordion-btn save"
                  @click="onSaveClick"
                >
                  <!-- 저장 -->
                  <span> {{ $t('NLS0000074') }}</span>
                </button>
                <button
                  type="button"
                  class="accordion-btn info"
                  @click="openHelpPop('NLS0000188', 'NLS0001301')"
                >
                  <!-- 도움말 -->
                  <span> {{ $t('NLS0000823') }}</span>
                </button>
              </div>
              <!-- <div class="layer-pop__title type3">
                <p>
                  <button
                    type="button"
                    class="accordion-btn delete"
                    @click="onDeleteClick"
                    v-if="causeInfo.prjSeq != ''"
                  >
                    <span>삭제</span>
                  </button>
                  <button
                    type="button"
                    class="accordion-btn save"
                    @click="onSaveClick"
                  >
                    <span>저장</span>
                  </button>
                  <button type="button" class="accordion-btn info">
                    <span>도움말</span>
                  </button>
                </p>
                <button type="button" class="layer-close" @click="closePopup">
                  close {{ slotProps.trigger ? '' : closePopup() }}
                </button>
              </div> -->
              <div class="task-inputform type-layer">
                <!-- 잠재원인 -> 원인-->
                <label for="test222">
                  - {{ $t('NLS0001449') }}
                  <span class="required-text">*</span>
                </label>
                <com-input-text
                  type="text"
                  id="causeItemNm"
                  v-model="causeInfo.causeItem"
                  rules="required"
                />
              </div>
              <div class="task-check-wrap type-layer">
                <!-- 중요원인 판정 -> 판정	 -->
                <p class="title">
                  - {{ $t('NLS0000540') }}<span class="required-text">*</span>
                </p>
                <div class="task-check-form">
                  <!-- 중요 -->
                  <com-input-text
                    type="radio"
                    id="radio1"
                    name="task-radio"
                    value="10"
                    :check="causeInfo.causeDetermin === '10' ? true : false"
                    labelId="radio1"
                    :labelTitle="$t('NLS0000542')"
                    @change="onChange"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 제외 -->
                  <com-input-text
                    type="radio"
                    id="radio2"
                    name="task-radio"
                    value="20"
                    :check="causeInfo.causeDetermin === '20' ? true : false"
                    labelId="radio2"
                    :labelTitle="$t('NLS0000543')"
                    @change="onChange"
                  />
                </div>
                <div class="task-check-form">
                  <!-- 즉실천 -->
                  <com-input-text
                    type="radio"
                    id="radio3"
                    name="task-radio"
                    value="30"
                    :check="causeInfo.causeDetermin === '30' ? true : false"
                    labelId="radio3"
                    :labelTitle="$t('NLS0000193')"
                    @change="onChange"
                  />
                  <!-- <input type="checkbox" id="check663" />
              <label for="check663">즉 실천</label> -->
                </div>
              </div>
              <com-input-text
                rules="required"
                type="hidden"
                id="radio2"
                name="task-radio-hidden"
                :value="causeInfo.causeDetermin"
              />
              <div class="task-textform type-layer">
                <!-- 중요원인 or 즉실천	 -->
                <label for="causeVerifi">- {{ $t('NLS0000864') }}</label>
                <com-ck-editor
                  id="causeVerifi"
                  v-model="causeInfo.causeVerifi"
                ></com-ck-editor>
              </div>
            </div>
            <!-- ValidateError 컴포넌트 영역 -->
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
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { specializedTasksStore, commonStore } from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';
export default {
  name: 'PotentialCausePopup',
  mixins: [specializedTasksStore, commonStore],
  components: {
    ComCkEditor,
    ComValidateError,
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
      causeInfo: {
        prjId: '',
        prjSeq: '',
        causeItem: '',
        causeDetermin: '',
        causeVerifi: '',
        dc03Cnt: 0,
        dc05Cnt: 0,
      },
      //* validation
      GV_invalid: '',
      GV_validated: '',
      GV_errors: {},
    };
  },
  mounted() {
    if (!common.isEmpty(this.$refs.obs1)) {
      this.$refs.obs1.validate();
    }
  },
  updated() {
    if (!common.isEmpty(this.$refs.obs1)) {
      this.$refs.obs1.validate();
    }
  },
  created() {},
  computed: {
    getPrjCauseInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_CAUSE_INFO];
      return item;
    },
  },
  watch: {
    getPrjCauseInfo: function(value) {
      this.causeInfo = value;
    },
  },
  methods: {
    onSaveClick() {
      if (this.GV_invalid) {
        common.alert('warning', this.GV_errors.msg);
        return false;
      }
      this.causeInfo.stepType = '20';
      this.causeInfo.stepCd = 'DC06';
      this.causeInfo.stepStatus = '0';
      this[specializedTasksTypes.actions.INIT_ADD_CAUSE_LIST](this.causeInfo);
      this.closePopup();
    },
    onDeleteClick() {
      // 해당 잠재원인을 삭제하면 작성된 검증/대책/실행결과 및 보완 정보도 같이 삭제됩니다. 정말 삭제 하시겠습니까?
      common.confirm(this.$t('NLS0000865'), async () => {
        await this[specializedTasksTypes.actions.DELETE_PROJECT_CAUSE](
          this.causeInfo,
        );
        this.closePopup();
      });
    },
    //* 과제도움말 팝업
    async openHelpPop(prjStepNm, helpMsg) {
      await this[commonTypes.actions.INIT_PROJECT_HELP_INFO]({
        prjStepNm: this.$t(prjStepNm),
        helpMsg: helpMsg,
      });
      await this[commonTypes.actions.INIT_VIEWS_PRJ_HELP_POP](true);
    },
    closePopup() {
      this.$emit('input', false);
    },
    onChange(e) {
      this.causeInfo.causeDetermin = e.target.value;
    },
    onErrors(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid = invalid;
      this.GV_validated = validate;
      this.GV_errors = errors;
    },
  },
};
</script>
