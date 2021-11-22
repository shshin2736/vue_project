<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-taskfilter">
            <div class="layer-pop__title type1">
              <!-- 일정이 설정되어 있지 않습니다.<br /> 설정해주세요	 -->
              <p>{{ title }} {{ $t('NLS0000858') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <!-- 과제 전체 실행 기간	 -->
            <p class="layer-sub-title">{{ $t('NLS0000195') }}</p>
            <div class="layer-task-datepicker-wrap">
              <span class="task-datepicker">
                <com-date-picker
                  name="prjStartDate"
                  :current="prjDateInfo.prjStartDate"
                  :format="format"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <span class="task-datepicker">
                <com-date-picker
                  name="prjEndDate"
                  :current="prjDateInfo.prjEndDate"
                  :format="format"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
            </div>
            <!-- 일정 -->
            <p class="layer-sub-title">
              {{ title }} {{ $t('NLS0000859') }}
              <span class="required-text">*</span>
            </p>
            <div class="layer-task-datepicker-wrap" v-if="prjStep === '20'">
              <span class="task-datepicker">
                <com-date-picker
                  name="prjStartDate2"
                  :current="prjDateInfo.prjStartDate2"
                  :format="format"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <span class="task-datepicker">
                <com-date-picker
                  name="prjEndDate2"
                  :current="prjDateInfo.prjEndDate2"
                  :format="format"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
            </div>
            <div class="layer-task-datepicker-wrap" v-if="prjStep === '30'">
              <span class="task-datepicker">
                <com-date-picker
                  name="prjStartDate3"
                  :current="prjDateInfo.prjStartDate3"
                  :format="format"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
              <em class="date-divide">~</em>
              <span class="task-datepicker">
                <com-date-picker
                  name="prjEndDate3"
                  :current="prjDateInfo.prjEndDate3"
                  :format="format"
                  @onChange="onChange"
                ></com-date-picker>
              </span>
            </div>
            <div class="layer-btn-tbox type-center">
              <button type="button" class="red-btn" @click="onSaveProjectDt">
                <!-- 저장	 -->
                <span>{{ $t('NLS0000074') }} </span>
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
import { specializedTasksStore } from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import { common, timezone } from '@/utils';
export default {
  name: 'MeasureDateSettingPopup',
  mixins: [specializedTasksStore],
  components: { ComDatePicker, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      prjId: '',
      title: '',
      prjStep: '',
      //* DatePicker
      prjDateInfo: {
        prjStartDate: new Date(),
        prjEndDate: new Date(),
        prjStartDate2: new Date(),
        prjEndDate2: new Date(),
        prjStartDate3: new Date(),
        prjEndDate3: new Date(),
      },
      format: 'yyyy-MM-dd',
    };
  },

  computed: {
    getPrjDateInfo() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_DATE_INFO];
      return item;
    },
  },
  watch: {
    getPrjDateInfo: function(value) {
      //* 과제 전체기간
      this.prjDateInfo.prjStartDate = !common.isEmpty(value.prjStartDate)
        ? new Date(
            timezone.convertToClientTimeZone(value.prjStartDate, 'YYYY-MM-DD'),
          )
        : this.prjDateInfo.prjStartDate;
      this.prjDateInfo.prjEndDate = !common.isEmpty(value.prjStartDate)
        ? new Date(
            timezone.convertToClientTimeZone(value.prjEndDate, 'YYYY-MM-DD'),
          )
        : this.prjDateInfo.prjEndDate;

      //* step2  과제기간
      this.prjDateInfo.prjStartDate2 = !common.isEmpty(value.prjStartDate2)
        ? new Date(
            timezone.convertToClientTimeZone(value.prjStartDate2, 'YYYY-MM-DD'),
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
            timezone.convertToClientTimeZone(value.prjStartDate3, 'YYYY-MM-DD'),
          )
        : this.prjDateInfo.prjStartDate3;
      this.prjDateInfo.prjEndDate3 = !common.isEmpty(value.prjEndDate3)
        ? new Date(
            timezone.convertToClientTimeZone(value.prjEndDate3, 'YYYY-MM-DD'),
          )
        : this.prjDateInfo.prjEndDate3;
      this.prjId = value.prjId;
      this.title = value.stepTitle;
      this.prjStep = value.prjStep;
    },
  },
  methods: {
    onSaveProjectDt() {
      //* Date validation check
      if (this.prjStep === '20') {
        if (this.prjDateInfo.prjStartDate > this.prjDateInfo.prjEndDate) {
          //* 전체기간
          // 과제 전체기간 종료날짜가 시작날짜보다 작을 수 없습니다.
          common.alert('warning', 'NLS0000860');
          return false;
        } else if (
          this.prjDateInfo.prjStartDate2 > this.prjDateInfo.prjEndDate2
        ) {
          // 일정 종료날짜가 시작날짜보다 작을 수 없습니다.
          common.alert('warning', this.title + 'NLS0000863');
          return false;
        } else if (this.prjDateInfo.prjEndDate2 > this.prjDateInfo.prjEndDate) {
          // 과제 전체기간 종료날짜가	 + 종료날짜보다 작을 수 없습니다.
          common.alert('warning', 'NLS0000861' + this.title + 'NLS0000862');
          return false;
        }
      }
      if (this.prjStep === '30') {
        if (this.prjDateInfo.prjStartDate > this.prjDateInfo.prjEndDate) {
          //* 전체기간
          // 과제 전체기간 종료날짜가 시작날짜보다 작을 수 없습니다.
          common.alert('warning', 'NLS0000860');
          return false;
        } else if (
          this.prjDateInfo.prjStartDate3 > this.prjDateInfo.prjEndDate3
        ) {
          // 일정 종료날짜가 시작날짜보다 작을 수 없습니다.
          common.alert('warning', this.title + 'NLS0000863');
          return false;
        } else if (this.prjDateInfo.prjEndDate3 > this.prjDateInfo.prjEndDate) {
          // 과제 전체기간 종료날짜가	 + 종료날짜보다 작을 수 없습니다.
          common.alert('warning', 'NLS0000861' + this.title + 'NLS0000862');
          return false;
        }
      }
      const params = {
        prjId: this.prjId,
        prjStartDate: timezone.convertToServerTimeZone(
          this.prjDateInfo.prjStartDate,
          'YYYYMMDD',
        ),
        prjEndDate: timezone.convertToServerTimeZone(
          this.prjDateInfo.prjEndDate,
          'YYYYMMDD',
        ),
      };
      if (this.prjStep === '20') {
        params.prjStartDate2 = timezone.convertToServerTimeZone(
          this.prjDateInfo.prjStartDate2,
          'YYYYMMDD',
        );
        params.prjEndDate2 = timezone.convertToServerTimeZone(
          this.prjDateInfo.prjEndDate2,
          'YYYYMMDD',
        );
      } else {
        params.prjStartDate3 = timezone.convertToServerTimeZone(
          this.prjDateInfo.prjStartDate3,
          'YYYYMMDD',
        );
        params.prjEndDate3 = timezone.convertToServerTimeZone(
          this.prjDateInfo.prjEndDate3,
          'YYYYMMDD',
        );
      }
      this[specializedTasksTypes.actions.UPDATE_PROJECT_DATEINFO](params);
      this.closePopup();
    },
    onChange(date, name) {
      if (name === 'prjStartDate') this.prjDateInfo.prjStartDate = date;
      else if (name === 'prjEndDate') this.prjDateInfo.prjEndDate = date;
      else if (name === 'prjStartDate2') this.prjDateInfo.prjStartDate2 = date;
      else if (name === 'prjEndDate2') this.prjDateInfo.prjEndDate2 = date;
      else if (name === 'prjStartDate3') this.prjDateInfo.prjStartDate3 = date;
      else if (name === 'prjEndDate3') this.prjDateInfo.prjEndDate3 = date;
    },
    closePopup() {
      this.$emit('input', false);
    },
  },
};
</script>
