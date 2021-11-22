<template>
  <div :class="{ 'tab-main-box': true, current: getStatus }">
    <div class="hms-grid-wrap">
      <div class="hms-grid type4">
        <div class="page__btn-tbox bgbox">
          <!-- KPI 인수인계 -->
          <div class="btn-box-title">
            {{ $t('NLS0001314') }}
          </div>
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="addKpi"
          >
            <!-- 항목 설정	 -->
            <span>{{ $t('NLS0001420') }}</span>
          </com-button>
          <com-button
            type="button"
            class="deepdarkgray-btn perm_save"
            :auth="$route.params.auth"
            @click="onReqKpi"
          >
            <!-- 인수 요청	 -->
            <span>{{ $t('NLS0001421') }}</span>
          </com-button>
          <com-button
            type="button"
            class="red-btn perm_delete"
            :auth="$route.params.auth"
            @click="onReqCanKpi"
          >
            <!-- 요청 취소	 -->
            <span>{{ $t('NLS0001461') }}</span>
          </com-button>
          <com-button
            type="button"
            class="red-btn perm_delete"
            :auth="$route.params.auth"
            @click="cfmKpi"
          >
            <!-- 항목 삭제	 -->
            <span>{{ $t('NLS0001462') }}</span>
          </com-button>
        </div>
        <com-native-grid
          :data="getTakeKpiList"
          :columns="getColumns.kpi"
          height="550"
          :resizable="true"
          :sortable="true"
          :sort="kpiSort"
          selectedfield="selected"
          selectedtype="checked"
          @checked="onKpiSel"
          @allchecked="allKpi"
        >
        </com-native-grid>
      </div>
      <div class="hms-grid type4">
        <div class="page__btn-tbox bgbox">
          <!-- 과제 인수인계 -->
          <div class="btn-box-title">
            {{ $t('NLS0001315') }}
          </div>
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="addPrj"
          >
            <!-- 항목 설정	 -->
            <span>{{ $t('NLS0001420') }}</span>
          </com-button>
          <com-button
            type="button"
            class="deepdarkgray-btn perm_save"
            :auth="$route.params.auth"
            @click="onReqPrj"
          >
            <!-- 인수 요청	 -->
            <span>{{ $t('NLS0001421') }}</span>
          </com-button>
          <com-button
            type="button"
            class="red-btn perm_delete"
            :auth="$route.params.auth"
            @click="onReqCanPrj"
          >
            <!-- 요청 취소 -->
            <span>{{ $t('NLS0001461') }}</span>
          </com-button>
          <com-button
            type="button"
            class="red-btn perm_delete"
            :auth="$route.params.auth"
            @click="cfmPrj"
          >
            <!-- 항목 제거 -->
            <span>{{ $t('NLS0001462') }}</span>
          </com-button>
        </div>
        <com-native-grid
          :data="getTakePrjList"
          :columns="getColumns.prj"
          height="550"
          :resizable="true"
          :sortable="true"
          :sort="prjSort"
          selectedfield="selected"
          selectedtype="checked"
          @checked="onPrjSel"
          @allchecked="allPrj"
        >
        </com-native-grid>
        <div class="page__btn-bbox">
          <button type="button" class="deepdarkgray-btn" @click="goToList">
            <!-- 목록 -->
            <span>{{ $t('NLS0000372') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { businessTakeOverStore, commonStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'TakeOverTakeTabForm',
  mixins: [businessTakeOverStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
  },
  data() {
    return {
      selectedKpi: [],
      selectedPrj: [],
      getColumns: {},
      kpiSort: [{ field: 'info', dir: 'asc' }],
      prjSort: [{ field: 'info', dir: 'asc' }],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getStatus() {
      return this[businessTakeOverTypes.getters.GET_TAKE_TAB];
    },
    getTakeKpiList() {
      return this[businessTakeOverTypes.getters.GET_TAKE_KPI_LIST];
    },
    getTakePrjList() {
      return this[businessTakeOverTypes.getters.GET_TAKE_PRJ_LIST];
    },
    getParam() {
      return this[businessTakeOverTypes.getters.GET_PARAM];
    },
    getTotcnt() {
      return this[businessTakeOverTypes.getters.GET_TOTCNT];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
  },
  async created() {
    if (common.isEmpty(this.$route.params.access)) {
      this.goToList();
    }
    this.initColumns();
    this[businessTakeOverTypes.actions.INIT_TOTCNT]('');
  },
  methods: {
    initColumns() {
      this.getColumns = {
        kpi: [
          {
            field: 'kpiNm', //인계 KPI명
            title: this.$t('NLS0001297'),
            className: 'left td-ellipsis',
          },
          {
            field: 'info', //인수자
            title: this.$t('NLS0000141'),
            className: 'left',
            width: 200,
          },
          {
            field: 'statusName', //상태
            title: this.$t('NLS0000149'),
            className: 'center',
            width: 100,
          },
        ],
        prj: [
          {
            field: 'prjNm', // 인계 과제명
            title: this.$t('NLS0001298'),
            className: 'left td-ellipsis',
          },
          {
            field: 'info', //인수자
            title: this.$t('NLS0000141'),
            className: 'left',
            width: 200,
          },
          {
            field: 'statusName', //상태
            title: this.$t('NLS0000149'),
            className: 'center',
            width: 100,
          },
        ],
      };
    },
    onKpiSel(row, chk) {
      const obj = this.getTakeKpiList;
      obj.reduce((acc, cur) => {
        if (row.kpiId === cur.kpiId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    onPrjSel(row, chk) {
      const obj = this.getTakePrjList;
      obj.reduce((acc, cur) => {
        if (row.prjId === cur.prjId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    allKpi(rows, checked) {
      const obj = this.getTakeKpiList;
      obj.map(i => (i.selected = checked));
    },
    allPrj(rows, checked) {
      const obj = this.getTakePrjList;
      obj.map(i => (i.selected = checked));
    },
    addPrj() {
      this[businessTakeOverTypes.actions.FETCH_SRCH_PRJ_LIST]({});
      this[commonTypes.actions.FETCH_COM_USER_INFO]({});
      this[businessTakeOverTypes.actions.INIT_VIEWS_ADD_ASSIGNMENT_POPUP](true);
    },
    addKpi() {
      this[businessTakeOverTypes.actions.FETCH_SRCH_KPI_LIST]({});
      this[commonTypes.actions.FETCH_COM_USER_INFO]({});
      this[businessTakeOverTypes.actions.INIT_VIEWS_ADD_KPI_POPUP](true);
    },
    onReqKpi() {
      const data = this.getTakeKpiList.filter(i => i.selected === true);
      const cData = data.filter(
        i => i.tkoStatus === 'C' || i.tkoStatus === 'R',
      );
      const list = data.map(i => i.userId);
      const overUserList = [...new Set(list)];
      if (data.length === 0) {
        // 선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      } else if (cData.length > 0) {
        // 인수인계 완료된 항목은 재요청 할 수 없습니다.
        common.alert('warning', 'NLS0000964');
      } else {
        this[businessTakeOverTypes.actions.UPDATE_REQ_KPI]({
          kpiList: data,
          overUserList: overUserList,
          param: this.getParam,
        });
      }
    },
    onReqCanKpi() {
      const data = this.getTakeKpiList.filter(i => i.selected === true);
      const cData = data.filter(i => i.tkoStatus !== 'R');
      const list = data.map(i => i.userId);
      const overUserList = [...new Set(list)];
      if (data.length === 0) {
        // 선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      } else if (cData.length > 0) {
        //인수인계가 요청중인 항목만 취소할 수 있습니다.
        common.alert('warning', 'NLS0001465');
      } else if (cData.length === 0) {
        //	KPI 인수 요청을 취소하시겠습니까?
        common.confirm('NLS0001463', () => {
          this[businessTakeOverTypes.actions.UPDATE_REQ_KPI]({
            kpiList: data,
            overUserList: overUserList,
            param: this.getParam,
            statusType: 'can',
          });
        });
      }
    },
    onReqPrj() {
      const data = this.getTakePrjList.filter(i => i.selected === true);
      const cData = data.filter(
        i => i.tkoStatus === 'C' || i.tkoStatus === 'R',
      );
      const list = data.map(i => i.userId);
      const overUserList = [...new Set(list)];
      if (data.length === 0) {
        // 선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      } else if (cData.length > 0) {
        // 인수인계가 요청 중이거나 완료된 항목은 재요청 할 수 없습니다.
        common.alert('warning', 'NLS0000964');
      } else {
        this[businessTakeOverTypes.actions.UPDATE_REQ_PRJ]({
          prjList: data,
          param: this.getParam,
          overUserList: overUserList,
        });
      }
    },
    onReqCanPrj() {
      const data = this.getTakePrjList.filter(i => i.selected === true);
      const cData = data.filter(i => i.tkoStatus !== 'R');
      const list = data.map(i => i.userId);
      const overUserList = [...new Set(list)];
      if (data.length === 0) {
        // 선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      } else if (cData.length > 0) {
        //인수인계가 요청중인 항목만 취소할 수 있습니다.
        common.alert('warning', 'NLS0001465');
      } else if (cData.length === 0) {
        //	과제 인수 요청을 취소하시겠습니까?
        common.confirm('NLS0001464', () => {
          this[businessTakeOverTypes.actions.UPDATE_REQ_PRJ]({
            prjList: data,
            param: this.getParam,
            overUserList: overUserList,
            statusType: 'can',
          });
        });
      }
    },
    cfmKpi() {
      // 삭제하시겠습니까?
      common.confirm('NLS0000004', this.delKpi);
    },
    cfmPrj() {
      // 삭제하시겠습니까
      common.confirm('NLS0000004', this.delPrj);
    },
    async delKpi() {
      const data = this.getTakeKpiList.filter(i => i.selected === true);
      const cData = data.filter(i => i.tkoStatus === 'C');

      if (data.length === 0) {
        // 삭제할 행이 없습니다.
        common.alert('warning', 'NLS0000965');
      } else if (cData.length > 0) {
        // 인수 완료된 KPI는 삭제할 수 없습니다.
        common.alert('warning', 'NLS0000967');
      } else {
        const res = await this[
          businessTakeOverTypes.actions.DELETE_TAKEOVER_KPI
        ]({
          kpiList: data,
          param: this.getParam,
        });
        if (res === 'T') {
          common.alert('success', 'NLS0000002');
        }
      }
    },
    async delPrj() {
      const data = this.getTakePrjList.filter(i => i.selected === true);
      const cData = data.filter(i => i.tkoStatus === 'C');

      if (data.length === 0) {
        // 삭제할 행이 없습니다.
        common.alert('warning', 'NLS0000965');
      } else if (cData.length > 0) {
        // 인수 완료된 과제는 삭제할 수 없습니다.
        common.alert('warning', 'NLS0000966');
      } else {
        const res = await this[
          businessTakeOverTypes.actions.DELETE_TAKEOVER_PRJ
        ]({
          prjList: data,
          param: this.getParam,
        });
        if (res === 'T') {
          common.alert('success', 'NLS0000002');
        }
      }
    },
    goToList() {
      this.$router.push({
        name: 'businessTakeOverPage',
        param: { auth: this.$route.params.auth },
      });
    },
  },
};
</script>
