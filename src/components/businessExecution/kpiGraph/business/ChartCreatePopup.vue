<template>
  <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
    <com-overlay v-model="value" :draggable="true">
      <template v-slot:default="slotProps">
        <div class="page__layer-pop">
          <div class="layer-pop-wrap">
            <div class="layer-pop__box type-wide2">
              <div class="layer-pop__title">
                <p v-if="!edit">{{ $t('NLS0000489') }}</p>
                <p v-if="edit">{{ $t('NLS0001100') }}</p>
                <button type="button" class="layer-close" @click="onClose">
                  close {{ slotProps.trigger ? '' : onClose() }}
                </button>
              </div>
              <div class="search-box type-layer">
                <div class="search__form__box">
                  <div class="search__form__box type-table line2">
                    <!-- 차트명 -->
                    <p class="search__form__title">
                      {{ $t('NLS0001086') }}
                      <span class="required-text">*</span>
                    </p>
                    <span class="input__box type-wide type-nobtn">
                      <com-input-text
                        rules="required"
                        type="text"
                        v-model="getChartGrpDetail.groupNm"
                        :isReadOnly="disabled"
                      />
                    </span>
                  </div>
                  <div class="search__form__box">
                    <!-- 사용여부 -->
                    <p class="search__form__title">
                      {{ $t('NLS0000058') }}
                    </p>
                    <com-dropdowns
                      :data="G01"
                      textfield="cdNm"
                      valuefield="cd"
                      v-model="useYn"
                      class="hms-dropdown type2"
                      @change="onUseChange"
                      :disabled="disabled"
                    ></com-dropdowns>
                  </div>
                  <div class="search__form__box">
                    <!-- 차트 유형	 -->
                    <p class="search__form__title">
                      {{ $t('NLS0000497') }}
                    </p>
                    <com-dropdowns
                      :data="typeList"
                      textfield="cdNm"
                      valuefield="cd"
                      v-model="baseChartType"
                      class="hms-dropdown type2"
                      @change="onTypeChange"
                      :disabled="disabled"
                    ></com-dropdowns>
                  </div>
                </div>
              </div>
              <div class="layer__btn-box">
                <com-button
                  type="button"
                  class="blue-btn perm_save"
                  :auth="$route.params.auth"
                  @click="onSave"
                  v-if="!disabled"
                >
                  <!-- 저장 -->
                  <span>{{ $t('NLS0000074') }}</span>
                </com-button>
              </div>
            </div>
          </div>
        </div>
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          @errors="onErrors"
        ></com-validate-error>
      </template>
    </com-overlay>
  </validation-observer>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import { kpiGraphStore, commonStore } from '@/mixins';
import { common } from '@/utils';
import * as kpiGraphTypes from '@/store/modules/businessExecution/kpiGraph/types';
import * as commonTypes from '@/store/modules/common/types';
import ComValidateError from '@/components/common/global/ComValidateError';

export default {
  name: 'ChartCreatePopup',
  mixins: [kpiGraphStore, commonStore],
  components: {
    ComValidateError,
    ComButton,
    ComDropdowns,
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
      groupNm: '',
      baseChartType: {},
      useYn: {},
      edit: false,
      invalid: '',
      errors: '',
      disabled: false,
    };
  },
  computed: {
    userInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    typeList() {
      const codeList = common.getCodeList('KPI206');
      return codeList;
    },
    G01() {
      const list = common.getCodeList('G01');
      return list;
    },
    getChartGrpDetail(state) {
      const data = this[kpiGraphTypes.getters.GET_CHART_GRP_DETAIL];
      const userType = this.userInfo.userType;
      const isAdmin =
        userType === 'SUPER' || userType === 'ADMIN' ? true : false;
      if (
        data.createUser != undefined &&
        (isAdmin ||
          data.createUser === this.userInfo.userId ||
          data.isGroupUser !== null)
      ) {
        state.disabled = false;
      } else {
        state.disabled = true;
      }

      if (!common.isEmpty(data.groupId)) {
        state.edit = true;
        state.useYn = common.filterCode(this.G01, data.useYn);
        state.baseChartType = common.filterCode(
          this.typeList,
          data.baseChartType,
        );
      } else {
        state.disabled = false;
        state.edit = false;
        state.useYn = this.G01[0];
        state.baseChartType = this.typeList[0];
      }
      return data;
    },
  },
  methods: {
    async onSave() {
      if (this.invalid) {
        common.alert('warning', this.errors.msg);
        return false;
      } else {
        common.confirm('NLS0000005', async () => {
          const userType = this.userInfo.userType;
          const param = {
            ...this.getChartGrpDetail,
            baseChartType: this.baseChartType.cd,
            useYn: this.useYn.cd,
            userType: userType,
          };
          this[kpiGraphTypes.actions.UPDATE_CHART_GRP](param);
          this.onClose();
        });
      }
    },
    onUseChange(e) {
      this.useYn = e.value;
    },
    onTypeChange(e) {
      this.baseChartType = e.value;
    },
    onErrors(invalid, valdiate, errors) {
      this.invalid = invalid;
      this.errors = errors;
    },
    onClose() {
      this[kpiGraphTypes.actions.INIT_CHART_GRP_DETAIL]({});
      this.$emit('input', false);
    },
  },
};
</script>
