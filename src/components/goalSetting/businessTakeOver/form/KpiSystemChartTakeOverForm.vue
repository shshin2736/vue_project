<template>
  <div class="hms-grid-wrap">
    <div class="hms-grid type4 w65-full">
      <div class="page__btn-tbox t_left">
        <div class="search__form__box" style="margin-bottom: 0;">
          <!-- 사업계획시기 -->
          <p class="search__form__title t_left">{{ $t('NLS0000387') }}</p>
          <com-dropdowns
            :data="getYearList"
            rules="required"
            textfield="text"
            valuefield="value"
            class="hms-dropdown type1"
            v-model="baseYear"
            :disabled="takeUser"
          ></com-dropdowns>
        </div>
        <div class="search__btn__box">
          <button
            v-if="!takeUser"
            type="button"
            auth="RDSX"
            class="search__btn perm_read"
            @click="onSrch"
          >
            <!-- 조회 -->
            <span
              ><span>{{ $t('NLS0000066') }}</span></span
            >
          </button>
        </div>
      </div>
      <com-tree-list-vue
        :columns="columns"
        :data="kpiTreeList"
        :drag="false"
        :height="450"
      >
      </com-tree-list-vue>
    </div>
    <div class="hms-grid type4 w33-full">
      <div class="page__btn-tbox t_right">
        <com-button
          v-if="!takeUser"
          type="button"
          class="deepdarkgray-btn perm_save"
          :auth="$route.params.auth"
          @click="onReq"
        >
          <!-- 체계도 인수 요청 -->
          <span>{{ $t('NLS0001390') }}</span>
        </com-button>
        <com-button
          type="button"
          class="red-btn perm_delete"
          :auth="$route.params.auth"
          @click="onCancel"
        >
          <!-- 체계도 인수 요청 취소 -->
          <span>{{ $t('NLS0001391') }}</span>
        </com-button>
      </div>
      <!-- 인계/인수자 정보 테이블 -->
      <kpi-system-chart-user-form
        :reqStatus="reqStatus"
        :getOverUserInfo="tkoInfo"
        @isUserSelected="isUserSelected"
      ></kpi-system-chart-user-form>
      <div class="page__btn-bbox">
        <button type="button" class="deepdarkgray-btn" @click="goToList">
          <!-- 목록 -->
          <span>{{ $t('NLS0000372') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComTreeListVue from '@/components/common/global/ComTreeListVue';
import { businessTakeOverStore, commonStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import KpiSystemChartUserForm from '@/components/goalSetting/businessTakeOver/form/KpiSystemChartUserForm';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';
export default {
  name: 'KpiSystemChartTakeOverForm',
  mixins: [businessTakeOverStore, commonStore],
  components: {
    ComButton,
    ComDropdowns,
    ComTreeListVue,
    KpiSystemChartUserForm,
  },
  data() {
    return {
      baseYear: {
        text: timezone.getClientDate('YYYY'),
        value: timezone.getClientDate('YYYY'),
      },
      name: 'kpiSystemChart',
      columns: [],
      kpiTreeList: [],
      tempTreeList: {},
      reqStatus: '',
      statusList: common.getCodeList('TOV001'),
      userSelected: false,
      tkoId: '',
      overUserInfo: {},
      takeUser: false,
    };
  },
  computed: {
    getYearList() {
      let list = [];
      this[commonTypes.getters.GET_YEAR_LIST].map(obj => {
        list.push({ text: obj.year, value: obj.year });
      });
      return list;
    },
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getKpiSystemChart() {
      return this[businessTakeOverTypes.getters.GET_KPI_SYSTEM_CHART].map(
        item => {
          const obj = { ...item };
          obj.kpiNm = obj.bscKpi === 'B' ? obj.cdNm : obj.kpiNm;
          obj.id = obj.tid;
          obj.parentId = common.isEmpty(obj.parentTid) ? '' : obj.parentTid;
          obj.expanded = true;
          return obj;
        },
      );
    },
    getTempTree() {
      return this[businessTakeOverTypes.getters.GET_TEMP_TREE].map(item => {
        const obj = { ...item };
        obj.kpiNm = obj.bscKpi === 'B' ? obj.cdNm : obj.kpiNm;
        obj.id = obj.tid;
        obj.parentId = common.isEmpty(obj.parentTid) ? '' : obj.parentTid;
        obj.expanded = true;
        return obj;
      });
    },
    getTotcnt() {
      return this[businessTakeOverTypes.getters.GET_TOTCNT];
    },
    userInfo() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
    tkoInfo() {
      return this[businessTakeOverTypes.getters.GET_PARAM];
    },
    getSelectedUser() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getKpiSystemChart: function(value) {
      const rootList = value.filter(i => i.kpiLevel === 1);
      value.forEach(item => {
        this.makeTreeChildrenData(rootList, item);
      });
      this.kpiTreeList = rootList;
    },
    getTempTree: function(value) {
      if (!common.isEmpty(value)) {
        this.baseYear = { text: value[0].baseYyyy, value: value[0].baseYyyy };
        this.takeUser = true;
      }
      const rootList = value.filter(i => i.kpiLevel === 1);
      value.forEach(item => {
        this.makeTreeChildrenData(rootList, item);
      });
      this.kpiTreeList = rootList;
    },
  },
  created() {
    if (common.isEmpty(this.$route.params.access)) {
      this.goToList();
    }
    this.initColumns();
    if (this.$route.params?.fetch) {
      this.onSrch();
    } else {
      this[businessTakeOverTypes.actions.FETCH_TEMP_TREE]({
        tkoId: this.$route.params.param.tkoId,
      });
    }
  },
  methods: {
    onSrch() {
      this[businessTakeOverTypes.actions.FETCH_KPI_SYSTEM_CHART]({
        baseYyyy: this.baseYear.value,
      });
    },
    initColumns() {
      this.columns = [
        {
          field: 'kpiNm',
          title: this.$t('NLS0000161'), //*BSC관점/KPI
          width: '450',
          align: 'left',
        },
        {
          field: 'kpiUnitNm',
          width: '72',
          title: this.$t('NLS0000063'), //*단위
          align: 'center',
        },
        {
          field: 'deptNm',
          width: '125',
          title: this.$t('NLS0000064'), //*담당부서
          align: 'left',
        },
        {
          field: 'userName',
          width: '115',
          title: this.$t('NLS0000065'), //*담당자
          align: 'left ',
        },
      ];
    },
    makeTreeChildrenData(rootList, obj) {
      if (rootList instanceof Array) {
        rootList.forEach(item => {
          if (item.tid === obj.parentTid) {
            item.children = item.children || [];
            item.children.push(obj);
          }
          return this.makeTreeChildrenData(item.children, obj);
        });
      }
    },
    goToList() {
      this[businessTakeOverTypes.actions.INIT_PARAM]({});
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      this.takeUser = false;
      this.$router.push({
        name: 'businessTakeOverPage',
        param: { auth: this.$route.params.auth },
      });
    },
    isUserSelected(data) {
      this.userSelected = data;
    },
    onReq() {
      if (this.userSelected && common.isEmpty(this.tkoInfo)) {
        // KPI 체계도 인수 요청하시겠습니까?
        common.confirm('NLS0001397', async () => {
          this.reqStatus = this.statusList[1].cdNm;
          this.takeUser = true;
          await this[businessTakeOverTypes.actions.UPDATE_REQ_KPI_SYSTEM_CHART](
            {
              overUserId: this.getSelectedUser.userId,
              baseYyyy: new Date().getFullYear(),
              treeBaseYyyy: this.baseYear.value,
              flag: 'REQ',
            },
          );
        });
      } else if (!common.isEmpty(this.tkoInfo)) {
        // 이미 요청하였습니다.
        common.alert('warning', 'NLS0001398');
      } else {
        // 인수자를 선택해주세요
        common.alert('warning', 'NLS0001399');
      }
    },
    onCancel() {
      if (!common.isEmpty(this.tkoInfo)) {
        if (
          this.tkoInfo.statusCd === 'R' ||
          this.tkoInfo.statusCd === undefined
        ) {
          // KPI 체계도 인수 요청을 취소하시겠습니까?
          common.confirm('NLS0001400', async () => {
            await this[
              businessTakeOverTypes.actions.UPDATE_REQ_KPI_SYSTEM_CHART
            ]({
              tkoId: this.tkoInfo.tkoId,
              flag: 'DEL',
            });
            this.reqStatus = '';
            this.userSelected = false;
            this.takeUser = false;
            this[businessTakeOverTypes.actions.INIT_PARAM]({});
          });
        } else if (
          this.tkoInfo.statusCd === 'I' ||
          this.tkoInfo.statusCd === 'C'
        ) {
          // 진행 중 또는 완료된 인수인계 항목은 삭제할 수 없습니다.
          common.alert('warning', 'NLS0001401');
        }
      } else if (common.isEmpty(this.tkoInfo)) {
        // 취소할 요청이 없습니다.
        common.alert('warning', 'NLS0001402');
      }
    },
  },
};
</script>
