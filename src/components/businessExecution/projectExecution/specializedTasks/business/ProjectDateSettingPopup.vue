<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-taskfilter">
            <div class="layer-pop__title type1">
              <!-- 과제 기간 설정	 -->
              <p>{{ $t('NLS0000867') }}</p>
              <button
                v-if="!clickEventHandler"
                type="button"
                class="layer-close"
                @click="closePopup(clickEventHandler)"
              >
                close
              </button>
              {{ slotProps.trigger ? '' : closePopup(clickEventHandler) }}
            </div>
            <!-- 계획검토 일정	 -->
            <p class="layer-sub-title">{{ $t('NLS0000868') }}</p>
            <div class="layer-task-datepicker-wrap">
              <span class="task-datepicker">
                <com-date-picker
                  name="prjStartDate1"
                  :current="prjDateInfo.prjStartDate1"
                  :format="format"
                  :disabled="prjDisabled"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <span class="task-datepicker">
                <com-date-picker
                  name="prjEndDate1"
                  :current="prjDateInfo.prjEndDate1"
                  :format="format"
                  :disabled="prjDisabled"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
            </div>
            <!-- 일정 -->
            <p class="layer-sub-title">
              {{ GV_STEP_LIST[1].cdNm }} {{ $t('NLS0000859') }}
            </p>
            <div class="layer-task-datepicker-wrap">
              <span class="task-datepicker">
                <com-date-picker
                  name="prjStartDate2"
                  :current="prjDateInfo.prjStartDate2"
                  :format="format"
                  :disabled="prjDisabled"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <span class="task-datepicker">
                <com-date-picker
                  name="prjEndDate2"
                  :current="prjDateInfo.prjEndDate2"
                  :format="format"
                  :disabled="prjDisabled"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
            </div>
            <!-- 일정 -->
            <p class="layer-sub-title">
              {{ GV_STEP_LIST[2].cdNm }} {{ $t('NLS0000859') }}
            </p>
            <div class="layer-task-datepicker-wrap">
              <span class="task-datepicker">
                <com-date-picker
                  name="prjStartDate3"
                  :current="prjDateInfo.prjStartDate3"
                  :format="format"
                  :disabled="prjDisabled"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <span class="task-datepicker">
                <com-date-picker
                  name="prjEndDate3"
                  :current="prjDateInfo.prjEndDate3"
                  :format="format"
                  :disabled="prjDisabled"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
            </div>
            <div class="layer-btn-tbox type-center">
              <button type="button" class="blue-btn" @click="onSaveProjectDt">
                <!-- 확인 -->
                <span>{{ $t('NLS0000959') }}</span>
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
import ComDatePicker from '@/components/common/global/ComDatePicker';
import { specializedTasksStore, commonStore } from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectDateSettingPopup',
  mixins: [specializedTasksStore, commonStore],
  components: { ComDatePicker, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    clickEventHandler: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      prjId: '',
      //* DatePicker
      prjDateInfo: {
        prjStartDate1: new Date(),
        prjEndDate1: new Date(),
        prjStartDate2: new Date(),
        prjEndDate2: new Date(),
        prjStartDate3: new Date(),
        prjEndDate3: new Date(),
      },
      prjDisabled: false,
      GV_STEP_LIST: common.getCodeList('PRJ007'),
      format: 'yyyy-MM-dd',
      readOnly: false,
    };
  },
  computed: {
    getPrjDateInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_DATE_INFO];
      return item;
    },
    getBaseUserInfo() {
      // const {
      //   prjBaseUserInfo: { prjManagerId, prjUserId },
      // } = this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO];
      return this[specializedTasksTypes.getters.GET_PROJECT_EXECUTION_INFO];
    },
    getUserId() {
      const { userId } = this[commonTypes.getters.GET_USER_DATA];
      return userId;
    },
  },
  watch: {
    getPrjDateInfo: function(value) {
      if (!common.isEmpty(value)) {
        //* step1 과제기간
        this.prjDateInfo.prjStartDate1 = !common.isEmpty(value.prjStartDate1)
          ? new Date(
              timezone.convertToClientTimeZone(
                value.prjStartDate1,
                'YYYY-MM-DD',
              ),
            )
          : this.prjDateInfo.prjStartDate1;
        this.prjDateInfo.prjEndDate1 = !common.isEmpty(value.prjEndDate1)
          ? new Date(
              timezone.convertToClientTimeZone(value.prjEndDate1, 'YYYY-MM-DD'),
            )
          : this.prjDateInfo.prjEndDate1;

        //* step2  과제기간
        this.prjDateInfo.prjStartDate2 = !common.isEmpty(value.prjStartDate2)
          ? new Date(
              timezone.convertToClientTimeZone(
                value.prjStartDate2,
                'YYYY-MM-DD',
              ),
            )
          : this.prjDateInfo.prjStartDate2;
        this.prjDateInfo.prjEndDate2 = !common.isEmpty(value.prjEndDate2)
          ? new Date(
              timezone.convertToClientTimeZone(value.prjEndDate2, 'YYYY-MM-DD'),
            )
          : this.prjDateInfo.prjEndDate2;

        //* step3  과제기간
        this.prjDateInfo.prjStartDate3 = !common.isEmpty(value.prjStartDate3)
          ? new Date(
              timezone.convertToClientTimeZone(
                value.prjStartDate3,
                'YYYY-MM-DD',
              ),
            )
          : this.prjDateInfo.prjStartDate3;
        this.prjDateInfo.prjEndDate3 = !common.isEmpty(value.prjEndDate3)
          ? new Date(
              timezone.convertToClientTimeZone(value.prjEndDate3, 'YYYY-MM-DD'),
            )
          : this.prjDateInfo.prjEndDate3;
        this.prjId = value.prjId;
        switch (value.prjType) {
          case 'DC':
            this.GV_STEP_LIST = common.getCodeList('PRJ007');
            break;
          case 'RD':
            this.GV_STEP_LIST = common.getCodeList('PRJ008');
            break;
          case 'DS':
            this.GV_STEP_LIST = common.getCodeList('PRJ009');
            break;
          case 'SA':
            this.GV_STEP_LIST = common.getCodeList('PRJ010');
            break;
          default:
            break;
        }
        if (value.prjStatus === 'C') this.prjDisabled = true;
      }
    },
    value: function(value) {
      if (value && this.getBaseUserInfo.length > 0) {
        this.prjDisabled = !this.getBaseUserInfo.includes(this.getUserId);
      }
    },
  },
  methods: {
    onSaveProjectDt() {
      if (!this.prjDisabled) {
        if (this.prjDateInfo.prjStartDate1 > this.prjDateInfo.prjEndDate1) {
          // 일정 종료날짜가 시작날짜보다 작을 수 없습니다.
          common.alert(
            'warning',
            this.GV_STEP_LIST[0].cdNm + this.$t('NLS0000863'),
          );
          return false;
        }
        if (this.prjDateInfo.prjStartDate2 > this.prjDateInfo.prjEndDate2) {
          common.alert(
            'warning',
            this.GV_STEP_LIST[1].cdNm + this.$t('NLS0000863'),
          );
          return false;
        }
        if (this.prjDateInfo.prjStartDate3 > this.prjDateInfo.prjEndDate3) {
          common.alert(
            'warning',
            this.GV_STEP_LIST[2].cdNm + this.$t('NLS0000863'),
          );
          return false;
        }
        const params = {
          prjId: this.prjId,
          prjStartDate1: timezone.convertToServerTimeZone(
            this.prjDateInfo.prjStartDate1,
            'YYYYMMDD',
          ),
          prjEndDate1: timezone.convertToServerTimeZone(
            this.prjDateInfo.prjEndDate1,
            'YYYYMMDD',
          ),
          prjStartDate2: timezone.convertToServerTimeZone(
            this.prjDateInfo.prjStartDate2,
            'YYYYMMDD',
          ),
          prjEndDate2: timezone.convertToServerTimeZone(
            this.prjDateInfo.prjEndDate2,
            'YYYYMMDD',
          ),
          prjStartDate3: timezone.convertToServerTimeZone(
            this.prjDateInfo.prjStartDate3,
            'YYYYMMDD',
          ),
          prjEndDate3: timezone.convertToServerTimeZone(
            this.prjDateInfo.prjEndDate3,
            'YYYYMMDD',
          ),
        };
        this[specializedTasksTypes.actions.UPDATE_PROJECT_DATEINFO](params);
      }
      this.closePopup();
    },
    onChange(date, name) {
      // if (name === 'prjStartDate') this.prjDateInfo.prjStartDate = date;
      // else if (name === 'prjEndDate') this.prjDateInfo.prjEndDate = date;
      if (name === 'prjStartDate1') this.prjDateInfo.prjStartDate1 = date;
      else if (name === 'prjEndDate1') this.prjDateInfo.prjEndDate1 = date;
      else if (name === 'prjStartDate2') this.prjDateInfo.prjStartDate2 = date;
      else if (name === 'prjEndDate2') this.prjDateInfo.prjEndDate2 = date;
      else if (name === 'prjStartDate3') this.prjDateInfo.prjStartDate3 = date;
      else if (name === 'prjEndDate3') this.prjDateInfo.prjEndDate3 = date;
    },
    closePopup(clickEventHandler = false) {
      if (clickEventHandler) return;
      this[commonTypes.actions.INIT_OVERLAY_CLICK_EVENT_HANDLER](false);
      this.$emit('input', false);
    },
  },
};
</script>
