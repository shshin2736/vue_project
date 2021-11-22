<template>
  <div class="tab-main-box current">
    <!-- <div class="search-box">
      <div class="search__form__box">
        <p class="search__form__title">
          부서
        </p>
        <span class="input__box">
          <input type="text" title="부서 입력폼" />
          <button type="button" class="magnifier-btn-black">
            더찾기
          </button>
        </span>
      </div>
      <div class="search__form__box">
        <p class="search__form__title">
          담당자
        </p>
        <span class="input__box">
          <input type="text" title="담당자 입력폼" />
          <button type="button" class="magnifier-btn-black">
            더찾기
          </button>
        </span>
      </div>
      <div class="search__btn__box">
        <button type="button" class="search__btn">
          <span>조회</span>
        </button>
      </div>
    </div> -->
    <div class="page__btn-tbox">
      <div class="btn-box-title">
        <span v-text="getMboEvalNm()"></span>
      </div>
      <com-button
        type="button"
        :auth="$route.params.auth"
        class="white-btn perm_save"
        @click="getEvalTargetList"
      >
        <!-- 평가대상자 가져오기 -->
        <span>{{ $t('NLS0000288') }} </span>
      </com-button>
      <button type="button" class="blue-btn" @click="addEvalTarget">
        <!-- 추가 -->
        <span>{{ $t('NLS0000067') }}</span>
      </button>
      <button type="button" class="darkgray-btn" @click="revmoeMboEvalTarget">
        <!-- 삭제 -->
        <span>{{ $t('NLS0000075') }}</span>
      </button>
      <button type="button" class="red-btn" @click="saveEvalTargetList">
        <!-- 저장 -->
        <span>{{ $t('NLS0000074') }}</span>
      </button>
    </div>
    <div class="hms-grid">
      <com-native-grid
        :data="items"
        :sortable="true"
        :columns="columns"
        :total="totalSize"
        :skip="skip"
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
import ComButton from '@/components/common/global/ComButton';
import HeaderSortCell from '@/components/common/business/HeaderSortCell';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import { mboManagementStore, commonStore } from '@/mixins';
import * as mboManagementTypes from '@/store/modules/goalSetting/mboManagement/types';
import * as commonTypes from '@/store/modules/common/types';
export default {
  name: 'MboMngTargetSetupForm',
  mixins: [mboManagementStore, commonStore],
  components: {
    ComNativeGrid,
    ComButton,
  },
  data() {
    return {
      mboEvalTargetList: [],
      items: [],
      skip: 0,
      sortObj: {},
      totalSize: 0,
      // mboName: this.getSelectedMboInfo.getMboEvalNm,
      addEvalTargetList: this.getSelectedDeptUser,
      columns: [],
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    //* 선택한 MBO 정보
    getSelectedMboInfo() {
      return this[mboManagementTypes.getters.GET_SELECTED_MBO_INFO];
    },
    //* 평가대상자 정보
    getMboEvalTargetList() {
      return this[mboManagementTypes.getters.GET_MBO_EVAL_TARGET_LIST];
    },
    //* 부서 / 사용자 팝업에서 추가한 정보
    getSelectedDeptUser() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_LIST];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getSelectedDeptUser(value) {
      if (value.length > 0) {
        value.map(item => {
          item.selected = false;
        });
      }
      this.mboEvalTargetList.unshift(...value);
      this[mboManagementTypes.actions.INIT_MBO_EVAL_TARGET_LIST](
        this.mboEvalTargetList,
      );
    },
    getMboEvalTargetList(value) {
      this.mboEvalTargetList = value;
      this.skip = 0;
      this.totalSize = this.mboEvalTargetList.length;
      this.items = this.mboEvalTargetList.slice(this.skip, this.skip + 8);
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'deptNm',
          title: this.$t('NLS0000348'), //부서명
          width: '500',
          className: 'left',
          headerCell: HeaderSortCell,
        },
        {
          field: 'userId',
          title: this.$t('NLS0000177'), //아이디
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'userName',
          title: this.$t('NLS0000342'), //이름
          className: 'left',
          headerCell: HeaderSortCell,
        },
        {
          field: 'rankCodeName',
          title: this.$t('NLS0000343'), //직위->직급
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'dutyCodeName',
          title: this.$t('NLS0000124'), //직책
          className: 'center',
          headerCell: HeaderSortCell,
        },
      ];
    },
    getMboEvalNm() {
      const mboEvalNm = this.getSelectedMboInfo.mboEvalNm;
      return mboEvalNm === undefined ? '' : mboEvalNm;
    },
    getEvalTargetList() {
      const evalType = this.getSelectedMboInfo.evalType;

      //* 평가타입으로 userType 결정
      var userType = this.getUserTypeByEvalType(evalType);

      const param = {
        //* 대상자 유형(팀원:0, 팀장 :1, 임원:2)
        userType: userType,
        //* 기존에 추가되어있는 평가대상자
        mboTargetList: this[mboManagementTypes.getters.GET_MBO_TARGET_LIST],
      };

      this[mboManagementTypes.actions.FETCH_MBO_EVAL_TARGET_LIST](param);
    },
    //* 평가대상자 삭제
    revmoeMboEvalTarget() {
      const mboEvalTargetList = this.mboEvalTargetList;

      //* 삭제해야할 평가대상자
      const deleteMboEvalTargetList = this.mboEvalTargetList.filter(item => {
        if (item.selected === true) {
          return item;
        }
      });

      //* 삭제해야할 평가대상자가 존재한다면
      if (deleteMboEvalTargetList.length > 0) {
        var newMboEvalTargetList = mboEvalTargetList.filter(item => {
          if (item.selected === undefined || !item.selected) {
            return item;
          }
        });
        this[mboManagementTypes.actions.INIT_MBO_EVAL_TARGET_LIST](
          newMboEvalTargetList,
        );
      } else {
        // 삭제할 평가대상자를 지정해야합니다. =>선택된 행이 없습니다.
        common.alert('warning', 'NLS0000963');
      }
    },
    clickCheckBox(item, checked) {
      this.items.find((o, i) => {
        if (o.userId === item.userId) {
          this.items[i].selected = checked;
          return true; // stop searching
        }
      });
    },
    clickAllCheckBox(_, checked) {
      this.mboEvalTargetList.forEach(element => {
        element.selected = checked;
      });
    },

    //[공통] 부서/사용자 팝업 가져오기
    addEvalTarget() {
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](true); //* 부서/사용자 검색 팝업 ON

      //* 기존에 [대상 인원 내역] 에 포함되어 있는 인원
      const param = {
        exceptUserList: this[mboManagementTypes.getters.GET_MBO_TARGET_LIST],
      };
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
    },

    // 평가 대상자 저장
    saveEvalTargetList() {
      //* 선택한 MBO 정보
      const selectMboInfo = this[
        mboManagementTypes.getters.GET_SELECTED_MBO_INFO
      ];
      // const evalStatus = selectMboInfo.evalStatus;

      //* 체크박스가 on인 평가대상자
      const onCheckEvalTargetList = this.mboEvalTargetList.filter(item => {
        if (item.selected === true) {
          return item;
        }
      });
      if (onCheckEvalTargetList.length > 0) {
        //* MBO 평가 진행상태가 [평가기간등록] , [평가대상설정] 인 경우
        // if (evalStatus === '129' || evalStatus === '130') {
        //* 평가 대상자 가져오기

        //* 가져올 평가대상자 유형
        var userType = this.getUserTypeByEvalType(selectMboInfo.evalType);

        const param = {
          mboEvalTargetList: onCheckEvalTargetList,
          mboEvalId: selectMboInfo.mboEvalId,
          country: selectMboInfo.country,
          baseYYYY: selectMboInfo.baseYYYY,
          userType: userType,
        };

        common.confirm('NLS0000005', async () => {
          //* 선택한 평가 대상자 저장
          const data = await this[
            mboManagementTypes.actions.INSERT_MBO_EVAL_TARGET_LIST
          ](param);
          //* 저장을 성공정으로 완료했으면
          if (data.result === 'T') {
            common.alert('success', 'NLS0000012');
            //* 저장한 평가대상자들을 제외하고 화면에 보여줌
            onCheckEvalTargetList.forEach(element => {
              const idx = this.mboEvalTargetList.findIndex(
                x => x.userId === element.userId,
              );
              this.mboEvalTargetList.splice(idx, 1);
            });
          }
        });
        // }
        // else {
        //   common.alert(
        //     // 평가 기간 중에는 대상 인원을 변경 할 수 없습니다.
        //     'warning',
        //     'NLS0001015',
        //   );
        // }
      } else {
        // 저장할 평가대상자를 지정해야합니다.
        common.alert('warning', 'NLS0001016');
      }
    },
    getUserTypeByEvalType(evalType) {
      var userType = '';
      if (evalType === '0') userType = 'USER';
      if (evalType === '1') userType = 'MANAGER';
      if (evalType === '2') userType = 'DIRECTOR';
      return userType;
    },
    onPageChage(skip) {
      this.skip = skip;
      this.items = this.mboEvalTargetList.slice(this.skip, this.skip + 8);
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
      let tempData = this.mboEvalTargetList.slice(0);
      if (this.sortObj.field)
        tempData = this.func(
          tempData.slice(0),
          this.sortObj.field,
          this.sortObj.type,
        );
      const mergeData = tempData.slice(this.skip, this.skip + 10);
      this.items = mergeData;
    },
  },
};
</script>

<style></style>
