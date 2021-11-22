<template>
  <!-- 전체 BSC 목록 팝업 영역 -->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-small">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000931') }}</p>
              <!--BSC 관점-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="hms-grid check-table">
              <table>
                <colgroup>
                  <col style="width:8%" />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">{{ $t('NLS0000931') }}</th>
                    <!--BSC 관점-->
                  </tr>
                </thead>
                <tbody>
                  <template v-if="getBscPoolData.length == 0">
                    <tr>
                      <td colspan="2">{{ $t('NLS0000932') }}</td>
                      <!--데이터가 존재하지 않습니다.-->
                    </tr>
                  </template>
                  <tr v-for="(item, i) in getBscPoolData" :key="i">
                    <td>
                      <span class="check-form bsc_checkbox">
                        <input type="checkbox" :id="item.cd" :value="item.cd" />
                        <label :for="item.cd">
                          <span>check</span>
                        </label>
                      </span>
                    </td>
                    <td>{{ item.cdNm }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="layer__btn-box">
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                v-if="getBscPoolData.length > 0"
                @click="clickAddBscData"
              >
                <span>{{ $t('NLS0000067') }}</span
                ><!--추가-->
              </com-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComButton from '@/components/common/global/ComButton';
import { common } from '@/utils';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

export default {
  name: 'BscPoolListPopup',
  components: {
    ComButton,
    ComOverlay,
  },
  mixins: [kpiTargetEstablishmentStore, commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedRow: [],
    };
  },
  computed: {
    getBscPoolData() {
      return this[kpiTargetEstablishmentTypes.getters.GET_BSC_POOL_LIST];
    },
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
  },
  watch: {
    getSelectedYear() {
      this[kpiTargetEstablishmentTypes.actions.FETCH_BSC_POOL_LIST]({
        baseYyyy: this.getSelectedYear,
      });
    },
  },
  methods: {
    clickAddBscData() {
      common.confirm('NLS0000934', this.addBscData); //*추가하시겠습니까?
    },
    addBscData() {
      let checkedData = document.querySelectorAll(
        '.bsc_checkbox [type=checkbox]:checked',
      );
      if (checkedData.length === 0) {
        common.alert('warning', 'NLS0000935'); //*선택해 주십시오.
        return false;
      }
      let bscIdList = [];
      checkedData.forEach(function(item) {
        bscIdList.push({ kpiId: item.value }); //*bsc cd => kpiId (db column명 맞춤)
      });

      let param = {
        baseYyyy: this.getSelectedYear,
        bscKpi: 'B',
        list: bscIdList,
      };
      this[kpiTargetEstablishmentTypes.actions.UPDATE_BSC_POOL_LIST](param);
      this.closePopup();
    },
    closePopup() {
      document.querySelectorAll('.bsc_checkbox [type=checkbox]').forEach(el => {
        el.checked = false;
      });
      this.$emit('input', false);
    },
  },
};
</script>
