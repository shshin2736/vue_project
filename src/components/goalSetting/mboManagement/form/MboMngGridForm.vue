<template>
  <div class="hms-grid">
    <com-native-grid
      :data="getMboManageList"
      :columns="mboColumns"
      @btnclick="onClick"
      height="220"
    >
    </com-native-grid>
    <!-- <com-native-grid
      :data="getMboManageList"
      :sortable="true"
      :sort="sort"
      :columns="mboColumns"
      @btnclick="onClick"
      height="220"
    >
    </com-native-grid> -->
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { timezone } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';
import { mboManagementStore, commonStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'mboMngGridForm',
  mixins: [mboManagementStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      sort: [{ field: 'mboEvalNm', dir: 'asc' }], //* 정렬 정보
      mboColumns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getMboManageList() {
      const mboManageList = this[
        mboManagementTypes.getters.GET_MBO_MANAGEMENT_LIST
      ];
      //대상 건수 만들기
      mboManageList.map(item => {
        item.targetCnt = ''
          .concat(item.appCnt)
          .concat('/')
          .concat(item.userCnt);
        item.compRate = ''.concat(item.compRate).concat('%');
        item.levelT = ''.concat(item.levelT).concat('단계');
        item.levelE = ''.concat(item.levelE).concat('단계');
        item.mboFromDate = timezone.convertToClientTimeZone(
          item.mboFromDate, //20200101
          'YYYY-MM-DD', // 2020-01-01
        );
        item.mboToDate = timezone.convertToClientTimeZone(
          item.mboToDate,
          'YYYY-MM-DD',
        );
      });

      return mboManageList;
    },
  },
  watch: {
    getI18nLocale() {
      this.initColums();
    },
  },
  created() {
    this.initColums();

    const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
    //MBO 전체 리스트 가져오기

    this[mboManagementTypes.actions.FETCH_MBO_MANAGEMENT_LIST]({
      country: loginUserInfo.country,
    });
    //DROPDOWN 메뉴 가져오기
    this[mboManagementTypes.actions.FETCH_MBO_DROPDOWN_LIST]({});
    //[대상 인원 내역] 리스트 초기화
    this[mboManagementTypes.actions.INIT_MBO_TARGET_LIST]([]);
  },
  methods: {
    initColums() {
      this.mboColumns = [
        {
          title: this.$t('NLS0000257'), //MBO 관리현황
          width: '650px',
          locked: true,
          children: [
            {
              field: 'mboEvalNm',
              title: this.$t('NLS0000258'), //MBO 구분
              width: '450px',
              cell: FunctionCell,
              format: 'button',
              className: 'left under-line-btn',
            },
            {
              field: 'targetCnt',
              title: this.$t('NLS0000259'), //대상 건수
              width: '80px',
              cell: FunctionCell,
              format: 'button',
              className: 'center under-line-btn',
            },
            {
              field: 'compRate',
              title: this.$t('NLS0000260'), //평가율
              width: '100px',
              className: 'right',
              // format: 'progress',
              // className: 'hms-grid-per size',
              // cell: FunctionCell,
            },
            {
              field: 'baseYyyy',
              title: this.$t('NLS0000261'), //귀속년도
              width: '100px',
              className: 'center',
            },
            {
              field: 'country',
              title: this.$t('NLS0000262'), //귀속국가
              width: '100px',
              className: 'center',
            },
          ],
        },
        {
          title: this.$t('NLS0000263'), //기간
          locked: false,
          children: [
            {
              field: 'mboFromDate',
              title: this.$t('NLS0000158'), //시작일자
              width: '120px',
              className: 'center',
            },
            {
              field: 'mboToDate',
              title: this.$t('NLS0000159'), //종료일자
              width: '120px',
              className: 'center',
            },
          ],
        },
        {
          title: this.$t('NLS0000266'), //결재 단계
          locked: false,
          children: [
            {
              field: 'levelT',
              width: '200px',
              title: this.$t('NLS0000267'), //KPI선정 및 목표합의
              className: 'center',
            },
            {
              field: 'levelE',
              width: '200px',
              title: this.$t('NLS0000268'), //KPI평가
              className: 'center',
            },
            {
              field: 'evalStatusNm',
              width: '380px',
              title: this.$t('NLS0000269'), //진행상태
              className: 'center',
            },
          ],
        },
      ];
    },
    async onClick(item, value, field) {
      var param = {};
      switch (field) {
        //* 대상건수 클릭
        case 'targetCnt':
          param = {
            baseYYYY: item.baseYyyy, //기준년도
            mboEvalId: item.mboEvalId, //평가 id
            mboEvalNm: item.mboEvalNm, //평가명
            evalStatus: item.evalStatus, //평가상태
            evalStatusNm: item.evalStatusNm, //평가상태
            evalType: item.evalType, //평가타입
          };
          //선택한 MBO 대상 인원 내역 가져오기
          this[mboManagementTypes.actions.FETCH_MBO_TARGET_LIST](param);
          //선택한 MBO 정보
          this[mboManagementTypes.actions.INIT_SELECTED_MBO_INFO](param);

          // 평가대상 설정 초기화
          this[mboManagementTypes.actions.INIT_MBO_EVAL_TARGET_LIST]([]);

          //평가 대상 설정 버튼 SHOW
          this[mboManagementTypes.actions.INIT_BTN_MBO_TARGET_SETUP](true);
          break;

        //* MBO 평가명 클릭
        case 'mboEvalNm':
          param = {
            baseYYYY: item.baseYyyy,
            mboEvalId: item.mboEvalId,
          };
          await this[mboManagementTypes.actions.FETCH_MBO_EVAL_CONF](param);
          this[mboManagementTypes.actions.INIT_IS_NEW_SAVE_MBO](false);
          this[mboManagementTypes.actions.INIT_VIEWS_MBO_REGIST_POPUP](true);
          break;
      }
    },
    selectedRow() {
      //* selectedRow(row)  선택한 MBO의 대상인원 내역 가져오기
    },
  },
};
</script>

<style></style>
