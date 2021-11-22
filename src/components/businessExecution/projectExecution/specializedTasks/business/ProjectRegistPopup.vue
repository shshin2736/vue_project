<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middlesmall">
            <div class="layer-pop__title type1">
              <!-- 과제 등록	 -->
              <p>{{ $t('NLS0000871') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer type-newtask">
              <div class="search__form__box type-table line2 type-100">
                <p class="search__form__title">
                  <!-- 과제명 -->
                  {{ $t('NLS0000151') }}<span class="required-text">*</span>
                </p>
                <span class="input__box type-nobtn">
                  <com-input-text type="text" v-model="prjNm" />
                </span>
              </div>
            </div>
            <!-- 과제유형 (유형을 선택하세요)	 -->
            <p class="layer-info-text">{{ $t('NLS0000872') }}</p>
            <!-- 전문과제 -->
            <p class="layer-sub-title">{{ $t('NLS0000873') }}</p>
            <div class="layer-task-radio-wrap">
              <p class="task-radio-box">
                <!--
                  NLS0000188:원인분석 , NLS0000874:기존업무개선, NLS0000875:고객문제 해결	
                -->
                <com-input-text
                  type="radio"
                  name="task-radio"
                  id="radio0"
                  value="DC"
                  labelId="radio0"
                  :labelTitle="$t('NLS0000188')"
                  :subTitle="[$t('NLS0000874'), $t('NLS0000875')]"
                  labelClass="title"
                  @change="onPrjTypeChange"
                />
              </p>
              <p class="task-radio-box">
                <!--
                  NLS0000876:연구 / 개발, NLS0000877:기술 / 제품 개발, NLS0000878:신상품 / 서비스 기획
                -->
                <com-input-text
                  type="radio"
                  name="task-radio"
                  id="radio1"
                  value="RD"
                  labelId="radio1"
                  :labelTitle="$t('NLS0000876')"
                  :subTitle="[$t('NLS0000877'), $t('NLS0000878')]"
                  labelClass="title"
                  @change="onPrjTypeChange"
                />
              </p>
              <p class="task-radio-box">
                <!--
                  NLS0000190:판매 4단계, NLS0000879:고객니즈 충족, NLS0000880:신규거래 영입
                -->
                <com-input-text
                  type="radio"
                  name="task-radio"
                  id="radio2"
                  value="SA"
                  labelId="radio2"
                  :labelTitle="$t('NLS0000190')"
                  :subTitle="[$t('NLS0000879'), $t('NLS0000880')]"
                  labelClass="title"
                  @change="onPrjTypeChange"
                />
              </p>
              <p class="task-radio-box">
                <!--
                  NLS0000191:의사 결정, NLS0000881:적절한 상황판단, NLS0000882:최적대안 선정
                -->
                <com-input-text
                  type="radio"
                  name="task-radio"
                  id="radio3"
                  value="DS"
                  labelId="radio3"
                  :labelTitle="$t('NLS0000191')"
                  :subTitle="[$t('NLS0000881'), $t('NLS0000882')]"
                  labelClass="title"
                  @change="onPrjTypeChange"
                />
              </p>
            </div>
            <!-- 일반과제 -->
            <p class="layer-sub-title">{{ $t('NLS0000883') }}</p>
            <div class="layer-task-radio-wrap">
              <p class="task-radio-box">
                <!--
                  NLS0000883:일반과제, NLS0000884:계획된 업무 수행	
                -->
                <com-input-text
                  type="radio"
                  name="task-radio"
                  id="radio4"
                  value="GL"
                  labelId="radio4"
                  :labelTitle="$t('NLS0000883')"
                  :subTitle="[$t('NLS0000884')]"
                  labelClass="title"
                  @change="onPrjTypeChange"
                />
              </p>
              <p class="task-radio-box">
                <!--
                  NLS0000191:즉실천, NLS0000881:기존제도 / 지침 활용, NLS0000882:단기간 처리 업무	
                -->
                <com-input-text
                  type="radio"
                  name="task-radio"
                  id="radio5"
                  value="IN"
                  labelId="radio5"
                  :labelTitle="$t('NLS0000193')"
                  :subTitle="[$t('NLS0000885'), $t('NLS0000886')]"
                  labelClass="title"
                  @change="onPrjTypeChange"
                />
              </p>
            </div>
            <div class="layer-btn-tbox type-center">
              <button type="button" class="blue-btn" @click="registProject">
                <!-- 신규과제 등록	 -->
                <span>{{ $t('NLS0000194') }}</span>
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
import ComInputText from '@/components/common/global/ComInputText';
import {
  specializedTasksStore,
  generalTasksStore,
  commonStore,
} from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectRegistPopup',
  mixins: [specializedTasksStore, generalTasksStore, commonStore],
  components: { ComInputText, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      prjType: '',
      prjTypeNm: '',
      prjNm: '',
    };
  },
  computed: {},
  methods: {
    onPrjTypeChange(e) {
      this.prjType = e.target.value;
    },
    async registProject() {
      if (common.isEmpty(this.prjNm)) {
        // 과제명을 입력해주세요.
        common.alert('warning', 'NLS0000887');
        return false;
      }
      if (common.isEmpty(this.prjType)) {
        // 과제유형을 선택해주세요.
        common.alert('warning', '	NLS0001101');
        return false;
      }
      this[commonTypes.actions.INIT_VIEWS_SPINNER](true);
      setTimeout(async () => {
        const params = {
          prjNm: this.prjNm,
          prjType: this.prjType,
          prjTypeNm: common.filterCode(
            common.getCodeList('PRJ005'),
            this.prjType,
          ).cdNm,
        };

        await this[specializedTasksTypes.actions.FETCH_PROJECT_POPUP_INFO](
          params,
        );
        switch (this.prjType) {
          case 'GL':
            //* 일반과제
            this[generalTasksType.actions.INIT_IS_NEW_GNL_TASK](true);
            //* task 초기화
            this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
            this.$router.push({
              name: `GeneralTaskPage`,
              params: {
                type: 'new',
                auth: this.$route.params.auth,
                baseYyyy: this[commonTypes.getters.GET_SELECTED_YEAR_DATA],
              },
            });
            break;
          case 'IN':
            //* 즉실천
            this[generalTasksType.actions.INIT_IS_NEW_ACTION](true);
            this.$router.push({
              name: `PrjActionPage`,
              params: {
                type: 'new',
                auth: this.$route.params.auth,
              },
            });
            break;
          default:
            this.updateBeforeProject();
            this.closePopup();
            break;
        }
      }, 1);
    },
    async updateBeforeProject() {
      const params = {
        prjNm: this.prjNm,
        prjType: this.prjType,
        prjStartDate: timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD'),
        prjEndDate: timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD'),
      };
      const data = await this[
        specializedTasksTypes.actions.UPDATE_PROJECT_EXECUTION
      ]({
        ...params,
        prjStepStatusList: ['10', '20', '30'],
        stepStatus: '0',
        prjStepStatus: '5',
        prjRate: 0,
        prjStepRate: 0,
        stepType: '10',
        stepCd: `${this.prjType}01`,
        type: 'new',
      });
      //* 전문과제
      this.$router.push({
        name: `ProjectExecutionDetailPage`,
        params: {
          prjId: data.prjId,
          auth: this.$route.params.auth,
          baseYyyy: this[commonTypes.getters.GET_SELECTED_YEAR_DATA],
          type: 'new',
          prjType: data.prjType,
        },
      });
    },
    closePopup() {
      this.prjNm = '';
      this.prjType = '';
      this.$emit('input', false);
    },
  },
};
</script>
