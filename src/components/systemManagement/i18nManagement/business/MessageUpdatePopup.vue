<template>
  <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
    <com-overlay v-model="value" :draggable="true">
      <template v-slot:default="slotProps">
        <div class="page__layer-pop">
          <div class="layer-pop-wrap">
            <div class="layer-pop__box type-wide2">
              <div class="layer-pop__title">
                <!-- 다국어 메시지	 -->
                <p>{{ $t('NLS0000096') }}</p>
                <button type="button" class="layer-close" @click="popupInit">
                  close {{ slotProps.trigger ? '' : popupInit() }}
                </button>
              </div>
              <div class="hms-grid borderno-table">
                <table>
                  <colgroup>
                    <col style="width:15%" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <!-- 메시지 ID	 -->
                      <th scope="col">
                        {{ $t('NLS0000092') }}
                      </th>
                      <td>
                        <span class="grid-input-form type1 type-nobtn">
                          <input
                            type="text"
                            v-model="getMessageInfo.compId"
                            :disabled="true"
                          />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <!-- 메시지유형 -->
                      <th scope="col">
                        {{ $t('NLS0000091')
                        }}<span class="required-text">*</span>
                      </th>
                      <td>
                        <com-dropdowns
                          :data="G_11"
                          textfield="cdNm"
                          valuefield="cd"
                          v-model="compType"
                          class="hms-dropdown type2"
                        ></com-dropdowns>
                      </td>
                    </tr>
                    <tr v-for="item in languageList" :key="item.cdNm">
                      <!-- 메시지 -->
                      <th scope="col">
                        {{ $t('NLS0000707') }}({{ item.cd }})<span
                          class="required-text"
                          >*</span
                        >
                      </th>

                      <td>
                        <span class="grid-input-form type1 type-nobtn">
                          <com-input-text
                            v-if="
                              getMessageInfo.compType !== 'HELP' &&
                                getMessageInfo.compType !== 'MAIL'
                            "
                            type="text"
                            v-model="getMessageInfo[`text${item.cdL}`]"
                            rules="required"
                          />
                          <com-ck-editor
                            v-if="getMessageInfo.compType === 'HELP'"
                            rules="requiredCK|required"
                            id="fieldResult"
                            class="i18n_help"
                            v-model="getMessageInfo[`text${item.cdL}`]"
                          />
                          <textarea
                            v-if="getMessageInfo.compType === 'MAIL'"
                            rules="requiredCK|required"
                            id="fieldResult"
                            class="i18n"
                            v-model="getMessageInfo[`text${item.cdL}`]"
                          ></textarea>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="layer__btn-box">
                <com-button
                  :auth="$route.params.auth"
                  type="button"
                  class="blue-btn perm_save"
                  @click="onSave"
                >
                  <!-- 저장 -->
                  <span>
                    {{ $t('NLS0000074') }}
                  </span>
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
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { commonStore, i18nManagementStore } from '@/mixins';
import * as i18nManagementType from '@/store/modules/systemManagement/i18nManagement/types';
import { common } from '@/utils';

export default {
  name: 'MessageUpdatePopup',
  mixins: [i18nManagementStore, commonStore],
  components: {
    ComValidateError,
    ComCkEditor,
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
      compType: {},
      languageList: [],
      invalid: '',
      errors: {},
    };
  },
  computed: {
    getMessageInfo() {
      return this[i18nManagementType.getters.GET_MESSAGE_INFO];
    },
    G_11(state) {
      const items = common.getCodeList('G11');
      if (common.isEmpty(this.getMessageInfo.compId)) {
        state.compType = items[0];
      } else {
        const tmp = this.getMessageInfo.compType;
        state.compType = common.filterCode(common.getCodeList('G11'), tmp);
      }
      return items;
    },
    getParam() {
      return this[i18nManagementType.getters.GET_SRCH_PARAM];
    },
  },
  watch: {
    compType: function(val) {
      if (val !== undefined) {
        const items = this.getMessageInfo;
        items.compType = val.cd;
      }
    },
  },
  created() {
    const list = common.getCodeList('G05');
    list.reduce((acc, cur) => {
      const cd = cur.cd;
      const sliceStr = cd.slice(0, -1);
      const toLowser = sliceStr + cd.charAt(cd.length - 1).toLowerCase();
      cur.cdL = toLowser;
      acc.push(cur);
      return acc;
    }, []);
    this.languageList = list;
  },
  methods: {
    popupInit() {
      this.$emit('input', false);
    },
    onSave() {
      this.$refs.obs.validate();
      if (this.invalid) {
        common.alert('warning', this.errors.msg);
      } else {
        this[i18nManagementType.actions.UPDATE_MESSAGE]({
          data: this.getMessageInfo,
          param: this.getParam,
        });
        this.$emit('input', false);
      }
    },
    onErrors(invalid, valdiate, errors) {
      this.invalid = invalid;
      this.errors = errors;
    },
  },
};
</script>
