<template>
  <div class="page__btn-tbox">
    <com-button
      :auth="$route.params.auth"
      type="button"
      class="blue-btn perm_save"
      @click="insertMbo"
      :disabled="!thisYearCheck"
    >
      <span>{{ $t('NLS0001295') }}</span
      ><!--MBO 적용-->
    </com-button>

    <com-button
      :auth="$route.params.auth"
      type="button"
      class="blue-btn perm_save"
      @click="copyLastYearKpiTree"
      :disabled="!thisYearCheck"
    >
      <span>{{ $t('NLS0001157') }}</span
      ><!--전년 체계도 복사-->
    </com-button>
    <com-button
      :auth="$route.params.auth"
      type="button"
      class="blue-btn perm_save"
      @click="openBscPoolPopup"
      :disabled="!thisYearCheck"
    >
      <span>{{ $t('NLS0000386') }}</span
      ><!--BSC관점 추가-->
    </com-button>
    <com-button
      :auth="$route.params.auth"
      type="button"
      class="blue-btn perm_save"
      @click="openKpiPoolPopups"
      :disabled="!thisYearCheck"
    >
      <span>{{ $t('NLS0000388') }}</span
      ><!--목표 KPI 추가-->
    </com-button>
    <com-button
      type="button"
      :auth="$route.params.auth"
      class="blue-btn perm_save"
      @click="goToRegistKpiPage"
    >
      <span>{{ $t('NLS0000389') }}</span
      ><!--KPI 신규 등록-->
    </com-button>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import { kpiTargetEstablishmentStore, commonStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import * as commonTypes from '@/store/modules/common/types';
import { timezone, common } from '@/utils';

export default {
  name: 'KpiTargetBtnForm',
  mixins: [kpiTargetEstablishmentStore, commonStore],
  components: {
    ComButton,
  },
  data() {
    return {
      thisYearCheck: true,
      yearData: timezone.getClientDate('YYYY'),
      mboYKpiList: [],
    };
  },
  computed: {
    getSelectedYear() {
      return this[commonTypes.getters.GET_SELECTED_YEAR_DATA];
    },
    getSelectedMonth() {
      return this[commonTypes.getters.GET_SELECTED_MONTH_DATA];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
  },
  watch: {
    getSelectedYear: function(year) {
      this.checkWriteData(year);
    },
  },
  methods: {
    checkWriteData(year) {
      // const date = new Date();
      // date.setFullYear(date.getFullYear() + 1);
      // const nextYear = date.getFullYear().toString();
      const future = Number(this.yearData) < Number(year);
      this.thisYearCheck =
        this.yearData === year || future || year === '2020' ? true : false;
    },
    goToRegistKpiPage() {
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*공동사용자 데이터 초기화
      this[kpiTargetEstablishmentTypes.actions.INIT_KPI_DEF_GROUP_DATA]({}); //*속성그룹데이터 초기화
      this[kpiTargetEstablishmentTypes.actions.INIT_SELECTED_UNIT_DATA](''); //*단위데이터 초기화
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_REGIST_POP](true);
    },
    openBscPoolPopup() {
      this[kpiTargetEstablishmentTypes.actions.FETCH_BSC_POOL_LIST]({
        baseYyyy: this.getSelectedYear,
      });
      this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_BSC_POOL_POP](true);
    },
    openKpiPoolPopups() {
      // this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_POOL_DATA_LIST]({
      //   limit: 13,
      //   offset: 0,
      //   searchUserId: this.getUserInfo.userId,
      //   searchUseYn: 'Y',
      // });
      // this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_POOL_LIST_POP](
      //   true,
      // );
      this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP]({
        value: true,
        flag: 'kpi',
      });
    },
    copyLastYearKpiTree() {
      common.confirm('NLS0001158', async () => {
        if (await this.checkMboAppYn()) return;
        this.copyLastYearKpiTreeFn();
      });
    },
    async checkMboAppYn() {
      let checkVal = false;
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
      };
      await this[
        kpiTargetEstablishmentTypes.actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST
      ](param);
      let resultList = this[
        kpiTargetEstablishmentTypes.getters.GET_KPI_TARGET_ESTABILSHMENT_LIST
      ];
      let filterData = resultList.filter(el => el.mboYn === 'Y');
      if (filterData.length > 0) {
        checkVal = true;
        common.alert('warning', 'NLS0001356'); //*현재 체계도에서 MBO선정된 KPI가 존재하면 체계도 복사를 할수 없습니다.
      }
      return checkVal;
    },
    async copyLastYearKpiTreeFn() {
      //*작년체계도복사
      await this[
        kpiTargetEstablishmentTypes.actions.UPDATE_COPY_LAST_YEAR_TREE_LIST
      ]({ baseYyyy: this.getSelectedYear });
      this.getBscKpiList();
    },
    getBscKpiList() {
      //* KPI목표수립 리스트 조회
      let param = {
        baseYyyy: this.getSelectedYear,
        baseYyyyMm: this.getSelectedYear + this.getSelectedMonth,
      };
      this[
        kpiTargetEstablishmentTypes.actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST
      ](param);
    },
    insertMbo() {
      const mboKpiList = this[
        kpiTargetEstablishmentTypes.getters.GET_APPLY_MBO_LIST
      ];

      this.mboYKpiList = [];
      this.setGroupMboKpiList(mboKpiList);

      if (common.isEmpty(this.mboYKpiList)) {
        common.alert('warning', 'NLS0001363');
        return false;
      }

      common.confirm('NLS0001299', () => {
        const param = {
          baseYYYY: this[commonTypes.getters.GET_SELECTED_YEAR_DATA],
          mboKpiList: this.mboYKpiList,
        };

        this[kpiTargetEstablishmentTypes.actions.UPDATE_APPLY_MBO_KPI](param);
      });
    },
    //* MBO 체크 기준으로 KPI 분류
    setGroupMboKpiList(rootObj) {
      if (rootObj instanceof Array) {
        rootObj.some(obj => {
          if (obj.mboYn == 'Y') this.mboYKpiList.push(obj);
          if (obj.children !== undefined && obj.children.length > 0) {
            this.setGroupMboKpiList(obj.children);
          }
        });
      }
    },
  },
};
</script>
