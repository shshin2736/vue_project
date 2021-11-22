<template>
  <div class="tab-main-box current">
    <div class="search-box">
      <div class="search__form__box">
        <!-- 부서 -->
        <p class="search__form__title">
          {{ $t('NLS0000121') }}
        </p>
        <!-- 부서 입력폼-->
        <span class="input__box">
          <com-input-text type="text" v-model="selectedDeptNm" />
          <button type="button" class="magnifier-btn-black" @click="searchDept">
            더찾기
          </button>
        </span>
      </div>
      <div class="search__form__box">
        <!-- 담당자->성명 -->
        <p class="search__form__title">
          {{ $t('NLS0000176') }}
        </p>
        <!-- 담당자 입력폼-->
        <span class="input__box">
          <com-input-text
            type="text"
            v-model="selectedManagerNm"
            @enter="enterUserSearchPop"
            @keyup="onKeyUp"
          />
          <button
            type="button"
            class="magnifier-btn-black"
            @click="enterUserSearchPop"
          >
            더찾기
          </button>
          <!-- <button
            type="button"
            class="magnifier-btn-black"
            @click="searchManager"
          >
            더찾기
          </button> -->
        </span>
      </div>
      <div class="search__btn__box">
        <button type="button" class="search__btn" @click="searchMboTarget">
          <!-- 조회 -->
          <span>{{ $t('NLS0000066') }}</span>
        </button>
      </div>
    </div>
    <!-- <div class="page__btn-tbox">
      <button type="button" class="white-btn excel-btn">
        <span>EXCEL로 저장</span>
      </button>
    </div> -->
    <div class="hms-grid">
      <com-native-grid
        :data="items"
        :columns="mboTargetColumns"
        :total="totalSize"
        :skip="skip"
        :sortable="true"
        scrollable="virtual"
        selectedfield="selected"
        selectedtype="checked"
        height="250"
        @pageChange="onPageChage"
        @checked="clickCheckBox"
        @allchecked="clickAllCheckBox"
        @headerSortEvent="onHeaderSortEvent"
      >
      </com-native-grid>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import HeaderSortCell from '@/components/common/business/HeaderSortCell';
import { mboManagementStore, commonStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'MboMngTargetForm.vue',
  mixins: [mboManagementStore, commonStore],
  components: {
    ComNativeGrid,
    ComInputText,
  },
  data() {
    return {
      selectedDeptNm: '',
      selectedDeptId: '',
      selectedManagerNm: '',
      selectedManagerId: '',
      skip: 0,
      func: null,
      sortObj: {},
      mboTargetList: [],
      items: [],
      totalSize: 0,
      mboTargetColumns: [],
      //* 엑셀컬럼
      excelColumns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    //* 대상인원 내역
    getMboTargetList() {
      return this[mboManagementTypes.getters.GET_MBO_TARGET_LIST];
    },
    //* 선택한 부서 정보
    getSelectedDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    //* 선택한 부서/담당자 정보
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    //* 대상인원 내역 변경시 실행
    getMboTargetList(value) {
      this.mboTargetList = value;
      this.skip = 0;
      this.totalSize = this.mboTargetList.length;
      this.items = this.mboTargetList.slice(this.skip, this.skip + 10);
      this.selectedDeptNm = '';
      this.selectedManagerNm = '';
      this.selectedDeptId = '';
      this.selectedManagerId = '';
    },

    getSelectedManager(value) {
      //* 팝업창 close 버튼을 눌렀을떄 value안에 빈 객체가 들어오기 떄문에 조건 첨부
      if (Object.keys(value).length > 0) {
        this.selectedDeptNm = value.deptNm;
        this.selectedDeptId = value.deptId;
        this.selectedManagerId = value.userId;
        this.selectedManagerNm = value.userName;
      }
    },
    getSelectedDept(value) {
      //* 팝업창 close 버튼을 눌렀을떄 value안에 빈 객체가 들어오기 떄문에 조건 첨부
      if (Object.keys(value).length > 0) {
        this.selectedDeptNm = value.deptNm;
        this.selectedDeptId = value.deptId;
        this.selectedManagerNm = '';
        this.selectedManagerId = '';
      }
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.mboTargetColumns = [
        {
          title: this.$t('NLS0000270'), //사원기본정보
          locked: true,
          children: [
            {
              field: 'deptNm',
              title: this.$t('NLS0000348'), //부서명
              className: 'left',
              headerCell: HeaderSortCell,
            },
            // {
            //   field: 'empNo',
            //   title: this.$t('NLS0000229'), //사번
            //   className: 'left',
            //   headerCell: HeaderSortCell,
            // },
            {
              field: 'userNm',
              title: this.$t('NLS0000342'), //이름
              className: 'left',
              headerCell: HeaderSortCell,
            },
            {
              field: 'rankCode',
              title: this.$t('NLS0000343'), //직위->직급
              className: 'center',
              headerCell: HeaderSortCell,
            },
            {
              field: 'dutyCode',
              title: this.$t('NLS0000124'), //직책
              className: 'center',
              headerCell: HeaderSortCell,
            },
          ],
        },
        {
          title: this.$t('NLS0000273'), //MBO KPI 선정 및 가중치 승인 현황
          locked: false,
          children: [
            {
              title: this.$t('NLS0000982'), //1차 결재(본인)
              children: [
                {
                  title: this.$t('NLS0001359'), //결재여부
                  field: 'apvStatusT',
                  className: 'center',
                  headerCell: HeaderSortCell,
                },
              ],
            },
            {
              title: this.$t('NLS0000983'), //2차 결재
              children: [
                {
                  field: 'appUserNmT1',
                  title: this.$t('NLS0001360'), //결재자
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'apvStatusT1',
                  title: this.$t('NLS0001359'), //결재여부
                  className: 'center',
                  headerCell: HeaderSortCell,
                },
              ],
            },
            {
              title: this.$t('NLS0001280'), //3차 결재자
              children: [
                {
                  title: this.$t('NLS0001360'), //결재자
                  field: 'appUserNmT2',
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'apvStatusT2',
                  title: this.$t('NLS0001359'), //결재여부
                  className: 'center',
                  headerCell: HeaderSortCell,
                },
              ],
            },
          ],
        },
        {
          title: this.$t('NLS0000277'), //MBO KPI 평가 현황
          locked: false,
          children: [
            {
              title: this.$t('NLS0000982'), //1차 결재(본인)
              children: [
                {
                  field: 'apvStatusE',
                  title: this.$t('NLS0001359'), //결재여부
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'estScore',
                  title: this.$t('NLS0000282'), //점수
                  className: 'right',
                  headerCell: HeaderSortCell,
                },
              ],
            },
            {
              title: this.$t('NLS0000983'), //2차 결재
              children: [
                {
                  field: 'appUserNmE1',
                  title: this.$t('NLS0001360'), //결재자
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'apvStatusE1',
                  title: this.$t('NLS0001359'), //결재여부
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'estScore1',
                  title: this.$t('NLS0000282'), //점수
                  className: 'right',
                  headerCell: HeaderSortCell,
                },
              ],
            },
            {
              title: this.$t('NLS0001280'), //3차 결재자
              children: [
                {
                  field: 'appUserNmE2',
                  title: this.$t('NLS0001360'), //결재자
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'apvStatusE2',
                  title: this.$t('NLS0001359'), //결재여부
                  className: 'left',
                  headerCell: HeaderSortCell,
                },
                {
                  field: 'estScore2',
                  title: this.$t('NLS0000282'), //점수
                  className: 'right',
                  headerCell: HeaderSortCell,
                },
              ],
            },
          ],
        },
        {
          field: 'annDate',
          title: this.$t('NLS0000287'), //인사발령일
          className: 'center',
          headerCell: HeaderSortCell,
        },
      ];
    },
    onPageChage(skip) {
      this.skip = skip;
      this.items = this.mboTargetList.slice(this.skip, this.skip + 10);
    },
    clickCheckBox(item, checked) {
      //* 체크박스 속성 추가
      this.mboTargetList.find((o, i) => {
        if (o.userId === item.userId) {
          this.mboTargetList[i].selected = checked;
          return true; // stop searching
        }
      });
    },
    clickAllCheckBox(_, checked) {
      this.mboTargetList.forEach(element => {
        element.selected = checked;
      });
    },

    //* 부서 검색(공통 component 사용)
    searchDept() {
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    async enterUserSearchPop() {
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.selectedManagerNm,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.selectedDeptNm = value.deptNm;
        this.selectedDeptId = value.deptId;
        this.selectedManagerId = value.userId;
        this.selectedManagerNm = value.userName;
      } else {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
        this.selectedManagerNm = '';
      }
    },
    onKeyUp() {
      // this.selectedDeptNm = '';
      // this.selectedDeptId = '';
      this.selectedManagerId = '';
    },
    //* MBO 대상인원 검색
    searchMboTarget() {
      //선택한 MBO 정보
      const selectedMboInfo = this[
        mboManagementTypes.getters.GET_SELECTED_MBO_INFO
      ];
      selectedMboInfo.srchDeptNm = this.selectedDeptNm;
      selectedMboInfo.srchUserNm = this.selectedManagerNm;
      this[mboManagementTypes.actions.FETCH_MBO_TARGET_LIST]({
        baseYYYY: selectedMboInfo.baseYYYY,
        mboEvalId: selectedMboInfo.mboEvalId,
        srchDeptNm: this.selectedDeptNm,
        srchUserNm: this.selectedManagerNm,
      });
    },
    //* 헤더 클릭 이벤트
    onHeaderSortEvent(sortObj, func) {
      if (this.sortObj.type && this.sortObj.field !== sortObj.field)
        this.sortObj.type = '';
      this.func = func;
      this.sortObj = sortObj;
      this.sortHandler();
    },
    //* 정렬 이벤트
    sortHandler() {
      let tempData = this.mboTargetList.slice(0);
      if (this.sortObj.field)
        tempData = this.func(
          tempData.slice(0),
          this.sortObj.field,
          this.sortObj.type,
        );
      this.mboTargetList = tempData;
      this.items = this.mboTargetList.slice(this.skip, this.skip + 10);
      // const mergeData = tempData.slice(this.skip, this.skip + 10);
      // this.items = mergeData;
    },
  },
};
</script>

<style></style>
