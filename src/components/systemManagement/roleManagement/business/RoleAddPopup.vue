<template>
  <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
    <com-overlay v-model="value" :draggable="true">
      <template v-slot:default="slotProps">
        <div class="page__layer-pop">
          <div class="layer-pop-wrap">
            <div class="layer-pop__box type-ultrasmall">
              <div class="layer-pop__title">
                <!-- 권한 정보	 -->
                <p>{{ $t('NLS0000119') }}</p>
                <button type="button" class="layer-close" @click="popupInit">
                  close {{ slotProps.trigger ? '' : popupInit() }}
                </button>
              </div>
              <div class="hms-grid borderno-table">
                <table>
                  <colgroup>
                    <col style="width:25%" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <!-- 권한 코드	 -->
                      <th scope="col">
                        {{ $t('NLS0000112') }}
                      </th>
                      <td>
                        <span class="grid-input-form type1 type-nobtn">
                          <input
                            type="text"
                            disabled="true"
                            v-model="getRoleInfo.roleId"
                          />
                        </span>
                      </td>
                    </tr>
                    <tr v-for="item in languageList" :key="item.cd">
                      <!-- 권한명 -->
                      <th scope="col">
                        {{ $t('NLS0000113') }}({{ item.cd }})<span
                          class="required-text"
                          >*</span
                        >
                      </th>
                      <td>
                        <span class="grid-input-form type1 type-nobtn">
                          <com-input-text
                            type="text"
                            v-model="getRoleInfo[`roleNm${item.cdL}`]"
                            rules="required"
                          />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <!-- 사용여부 -->
                      <th scope="col">
                        {{ $t('NLS0000058')
                        }}<span class="required-text">*</span>
                      </th>
                      <td>
                        <com-dropdowns
                          :data="G_01"
                          textfield="cdNm"
                          valuefield="cd"
                          class="hms-dropdown type7"
                          v-model="useYn"
                        ></com-dropdowns>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="layer__btn-box">
                <button type="button" class="blue-btn" @click="onAdd">
                  <!-- 저장 -->
                  <span v-if="isEdit">
                    {{ $t('NLS0000074') }}
                  </span>
                  <!-- 추가 -->
                  <span v-if="!isEdit">
                    {{ $t('NLS0000067') }}
                  </span>
                </button>
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
import ComValidateError from '@/components/common/global/ComValidateError';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import { roleManagementStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'RoleAddPopup',
  mixins: [roleManagementStore],
  components: {
    ComValidateError,
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
      languageList: [],
      useYn: {},
      invalid: '',
      errors: {},
      isEdit: false,
    };
  },
  computed: {
    getRoleInfo(state) {
      const obj = this[roleManagementTypes.getters.GET_ROLE_INFO];
      if (!common.isEmpty(obj.roleId)) {
        state.isEdit = true;
      } else {
        state.isEdit = false;
      }
      return obj;
    },
    G_01(state) {
      const items = common.getCodeList('G01');
      if (common.isEmpty(this.getRoleInfo.roleId)) {
        state.useYn = items[0];
      } else {
        const tmp = this.getRoleInfo.useYn;
        state.useYn = common.filterCode(common.getCodeList('G01'), tmp);
      }
      return items;
    },
  },
  created() {
    const list = common.getCodeList('G05');
    list.reduce((acc, cur) => {
      const cd = cur.cd;
      var sliceStr = cd.slice(0, -1);
      const toLower = sliceStr + cd.charAt(cd.length - 1).toLowerCase();
      cur.cdL = toLower;
      acc.push(cur);
      return acc;
    }, []);
    this.languageList = list;
  },
  watch: {
    useYn: function(val) {
      if (val !== undefined) {
        this.getRoleInfo.useYn = val.cd;
      }
    },
  },
  methods: {
    popupInit() {
      this.$emit('input', false);
    },
    onAdd() {
      this.$refs.obs.validate();
      if (this.invalid) {
        common.alert('warning', this.errors.msg);
      } else {
        let flag = 'create';
        if (this.isEdit === true) {
          flag = 'edit';
        }
        this[roleManagementTypes.actions.UPDATE_ROLE]({
          ...this.getRoleInfo,
          flag: flag,
        });
        this.$emit('input', false);
      }
    },
    onErrors(invalid, validate, errors) {
      this.invalid = invalid;
      this.errors = errors;
    },
  },
};
</script>
