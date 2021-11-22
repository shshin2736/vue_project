<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal">
            <div class="layer-pop__title">
              <!-- KPI 목록 -->
              <p>{{ $t('NLS0000477') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box type-table line2">
                <!-- 담당부서 -->
                <p class="search__form__title">
                  {{ $t('NLS0000064') }}
                </p>
                <span class="input__box type-wide2">
                  <com-input-text
                    rules=""
                    :isReadOnly="true"
                    v-model="srhDeptNm"
                  ></com-input-text>
                  <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="onPopup()"
                  >
                    더찾기
                  </button>
                </span>
              </div>
              <div class="search__form__box type-table line2">
                <!-- KPI명 -->
                <p class="search__form__title">
                  {{ $t('NLS0000148') }}
                </p>
                <span class="input__box type-nobtn type-wide2">
                  <com-input-text
                    rules=""
                    v-model="srhKpiNm"
                    @enter="onSerach"
                  ></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <button type="button" class="search__btn" @click="onSerach">
                  <!-- 검색 -->
                  <span>{{ $t('NLS0000253') }}</span>
                </button>
              </div>
            </div>

            <div class="hms-grid kpi-pool-list">
              <com-native-grid
                :data="mboKpiList"
                :columns="columns"
                @onCheck="onChecked"
                height="400"
              ></com-native-grid>
            </div>
            <div class="layer__btn-box">
              <button type="button" class="blue-btn" @click="addKpiData">
                <!-- 추가 -->
                <span>{{ $t('NLS0000067') }}</span>
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
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import { mboOperationStore, commonStore } from '@/mixins';
import * as mboOperTypes from '@/store/modules/goalSetting/mboOperation/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'MboKpiPopup',
  mixins: [mboOperationStore, commonStore],
  components: {
    ComNativeGrid,
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
      srhDeptNm: '',
      srhKpiNm: '',
      srhDeptId: '',
      items: [],
      mboKpiList: [],
      skip: 0,
      totalCnt: 0,
      columns: [],
      temp: '',
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getMboKpiPoolData() {
      return this[mboOperTypes.getters.GET_MBO_KPI_POOL_LIST];
    },
    getSelectedDept() {
      //* 선택한 부서
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getMboKpiPoolData(value) {
      this.mboKpiList = value;
      this.srhKpiNm = '';
    },
    getSelectedDept(value) {
      const flag = this[mboOperTypes.getters.GET_VIEWS_MBO_KPI_POPUP];
      if (flag) {
        this.srhDeptNm = value.deptNm;
        this.srhDeptId = value.deptId;
      }
    },
  },
  mounted() {
    const loginUserData = this[commonTypes.getters.GET_USER_DATA];
    this.srhDeptNm = loginUserData.deptNm;
    this.srhDeptId = loginUserData.deptId;
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000148'), //KPI명
          width: '350px',
          className: 'left',
        },
        {
          title: '',
          field: 'mboYn',
          width: '80px',
          className: 'center',
          format: 'check',
          cell: FunctionCell,
        },
        {
          field: 'kpiUnitNm',
          title: this.$t('NLS0000063'), //단위
          width: '70px',
          className: 'center',
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000064'), //담당부서
          width: '150px',
          className: 'left',
        },
        {
          field: 'userNm',
          title: this.$t('NLS0000065'), //담당자
          width: '100px',
          className: 'left',
        },
        {
          field: 'kpiAchType',
          title: this.$t('NLS0000061'), //실적달성유형
          width: '110px',
          className: 'center',
        },
        {
          field: 'kpiPerType',
          title: this.$t('NLS0000059'), //실적집계방식
          width: '110px',
          className: 'center',
        },
        {
          field: 'kpiAccType',
          title: this.$t('NLS0000402'), //실적누계방식
          width: '110px',
          className: 'center',
        },
      ];
    },
    closePopup() {
      const loginUserData = this[commonTypes.getters.GET_USER_DATA];
      this.srhDeptNm = loginUserData.deptNm;
      this.srhDeptId = loginUserData.deptId;
      this.$emit('input', false);
    },
    //* MBO 후보 선택
    addKpiData() {
      const selectedKpiList = this.mboKpiList.filter(item => {
        if (item.mboYn === 'Y') {
          return item;
        }
      });
      if (selectedKpiList.length > 0) {
        // 선택한 KPI를 MBO후보로 지정하시겠습니까?
        common.confirm(this.$t('NLS0001022'), async () => {
          const mboCrrInfo = this[mboOperTypes.getters.GET_MBO_CURR_INFO]
            .mboCrrInfo;
          const param = {
            baseYYYY: mboCrrInfo.baseYyyy,
            mboEvalId: mboCrrInfo.mboEvalId,
            mboUserId: mboCrrInfo.mboUserId,
            mboUserDeptId: mboCrrInfo.mboUserDeptId,
            mboKpiList: selectedKpiList,
            mboYn: 'Y',
          };
          const data = await this[mboOperTypes.actions.INSERT_MBO_KPI_LIST](
            param,
          );

          if (data.result === 'T') {
            // 새로운 KPI가 MBO 항목에 추가되었습니다.
            this[mboOperTypes.actions.FETCH_MBO_CURR_INFO](param);
            common.alert('success', 'NLS0001020');
            this.closePopup();
          }
        });
      } else {
        // MBO 후보 KPI를 선택해야 합니다.
        common.alert('warning', 'NLS0001021');
      }
    },
    onPopup() {
      //* 공통 부서 리스트 가져오기
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      //* 팝업창 띄우기
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    //* KPI 검색
    onSerach() {
      const mboCrrInfo = this[mboOperTypes.getters.GET_MBO_CURR_INFO]
        .mboCrrInfo;
      const param = {
        baseYYYY: mboCrrInfo.baseYyyy,
        userId: mboCrrInfo.mboUserId,
        deptId: this.srhDeptId,
        kpiNm: this.srhKpiNm,
      };
      this[mboOperTypes.actions.FETCH_MBO_KPI_POOL_LIST](param);
    },
    onChecked(item, chk, field) {
      this.temp = field;
      this.mboKpiList.find((o, i) => {
        if (o.kpiId === item.kpiId) {
          this.mboKpiList[i].mboYn = chk ? 'Y' : 'N';
          return true; // stop searching
        }
      });
    },
  },
};
</script>
