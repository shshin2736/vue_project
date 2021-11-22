<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-small">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000447') }}</p>
              <!--차트 그룹 선택-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <p class="search__form__title">
                  {{ $t('NLS0000462') }}
                </p>
                <!--차트그룹명-->
                <span class="input__box type-wide type-nobtn">
                  <com-input-text
                    v-model="srchParam"
                    @enter="onSrch"
                  ></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="onSrch"
                >
                  <span>{{ $t('NLS0000253') }}</span
                  ><!--검색-->
                </com-button>
              </div>
            </div>
            <div class="hms-grid selectedAll chart_multi">
              <com-native-grid
                :data="getChartGroupData"
                :columns="columns"
                height="330"
                :resizable="true"
                @onCheck="onChange"
              ></com-native-grid>
            </div>
            <div class="layer__btn-box">
              <com-button
                type="button"
                class="black-btn perm_save"
                :auth="$route.params.auth"
                @click="addGrp"
              >
                <span>{{ $t('NLS0000074') }}</span
                ><!--저장-->
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
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { commonStore, dashboardStore } from '@/mixins';
import { common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import * as commonTypes from '@/store/modules/common/types';
import * as dashboardTypes from '@/store/modules/dashboard/types';

export default {
  name: 'ComKpiChartGroupMultiPopup',
  components: {
    ComNativeGrid,
    ComButton,
    ComInputText,
    ComOverlay,
  },
  mixins: [commonStore, dashboardStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      columns: [],
      srchParam: '',
      selectedRow: [],
    };
  },
  computed: {
    getChartGroupData() {
      return this[commonTypes.getters.GET_COM_KPI_CHART_GRP_LIST];
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'dsbYn',
          title: ' ',
          width: '50px',
          className: 'center',
          format: 'check',
          cell: FunctionCell,
        },
        {
          field: 'groupNm',
          title: this.$t('NLS0000462'), //*차트그룹명
          className: 'left',
          format: 'button',
          cell: FunctionCell,
        },
      ];
    },
    onSrch() {
      const userType = this[commonTypes.getters.GET_COM_USER_INFO].userType;
      this[commonTypes.actions.FETCH_COM_KPI_CHART_GRP_LIST]({
        userType: userType,
        srchParam: this.srchParam,
      });
    },
    onChange(item, chk, field, e) {
      const checkedData = document.querySelectorAll(
        '.chart_multi [type=checkbox]:checked',
      );
      if (checkedData.length > 3) {
        //3개까지 선택 가능
        common.alert('warning', 'NLS0000910');
        e.target.checked = false;
      } else {
        this.getChartGroupData.map(i => {
          if (i.groupId === item.groupId) {
            i.checked = chk;
          }
        });
      }

      // const index = this.selectedRow.findIndex(
      //   el => el.groupId === row.groupId,
      // );
      // if (index.len) row.selected = chk;
      // if (index === -1) {
      //   this.selectedRow.push(row);
      // } else {
      //   this.selectedRow[index] = row;
      // }
    },
    addGrp() {
      // let checkedData = document.querySelectorAll(
      //   '.chart_multi [type=checkbox]:checked',
      // );
      // if (checkedData.length > 3) {
      //   common.alert('warning', 'NLS0000910');
      //   return false;
      // }
      const data = [...this.getChartGroupData];
      const items = data.reduce((acc, cur) => {
        if (cur.checked || (cur.dsbYn === 'Y' && cur.checked === undefined)) {
          cur.dsbYn = 'Y';
          acc.push(cur);
        } else if (cur.dsbYn === 'Y' && cur.checked === false) {
          cur.dsbYn = 'N';
          acc.push(cur);
        }
        return acc;
      }, []);
      this[dashboardTypes.actions.UPDATE_DSB_CHART_GRP_LIST]({
        list: items,
      });

      // this[commonTypes.actions.INIT_SELECTED_CHART_GRP_LIST](items);
      this.closePopup();
    },
    init() {
      this.srchParam = '';
      this.selectedRow = [];
      this[commonTypes.actions.INIT_COM_KPI_CHART_GRP_LIST]([]);
    },
    closePopup() {
      this.init();
      this.$emit('input', false);
    },
  },
};
</script>
