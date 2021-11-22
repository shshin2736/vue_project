<template>
  <div class="search-box">
    <div class="search-box__row">
      <div class="search__form__box">
        <p class="search__form__title">
          <!-- 조회년도 -->
          {{ $t('NLS0000134') }}
        </p>
        <com-dropdowns
          :data="getYearList"
          rules="required"
          textfield="text"
          valuefield="value"
          class="hms-dropdown type2"
          v-model="baseYear"
        ></com-dropdowns>
      </div>
      <div class="search__form__box">
        <p class="search__form__title">
          <!-- 담당부서 -->
          {{ $t('NLS0000064') }}
        </p>
        <span class="input__box">
          <com-input-text
            type="text"
            v-model="srchDeptNm"
            @enter="enterDeptSearchPop"
            @keyup="resetDept"
          />
          <button
            type="button"
            class="magnifier-btn-black"
            @click="onDeptSearchPop"
            :disabled="srchDisabledDept"
          ></button>
        </span>
      </div>
      <div class="search__form__box">
        <p class="search__form__title">
          <!-- 담당자 -->
          {{ $t('NLS0000065') }}
        </p>
        <span class="input__box">
          <com-input-text
            type="text"
            v-model="srchUserNm"
            :disable="srchUserNmDisabled"
            @enter="enterUserSearchPop"
            @keyup="resetUser"
          />
          <button
            type="button"
            class="magnifier-btn-black"
            @click="enterUserSearchPop"
            :disabled="srchDisabledUser"
          ></button>
          <!-- <button
          type="button"
          class="magnifier-btn-black"
          @click="openUserSearchPop"
          :disabled="srchDisabledUser"
        ></button> -->
        </span>
      </div>
      <div class="search__form__box search__form__box--max-400">
        <p class="search__form__title">
          <!-- 과제명 -->
          {{ $t('NLS0000151') }}
        </p>
        <span class="input__box type-wide type-nobtn">
          <com-input-text
            type="text"
            v-model="srchPrjNm"
            @enter="onSrchClick"
          />
        </span>
      </div>
      <div class="search__btn__box">
        <button type="button" class="search__btn" @click="onSrchClick">
          <span>
            <!-- 조회 -->
            {{ $t('NLS0000066') }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import * as projectExecutionTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { specializedTasksStore, commonStore } from '@/mixins';
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectExecutionSearchForm',
  mixins: [specializedTasksStore, commonStore],
  components: { ComDropdowns, ComInputText },
  data() {
    return {
      baseYear: { text: '2020', value: '2020' },
      loginUserInfo: {},
      srchDeptId: '',
      srchDeptNm: '',
      srchUserId: '',
      srchUserNm: '',
      srchPrjNm: '',
      srchUserNmDisabled: false,
      srchDisabledDept: false,
      srchDisabledUser: false,
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
    getSelectedUserList() {
      //*선택한 사용자
      const param = {
        userList: this[
          commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA
        ],
      };
      return param;
    },
    getSelectedDept() {
      //* 선택한 부서
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
  },
  watch: {
    getYearList: function(data) {
      if (data.length > 0) {
        this.baseYear = {
          text: timezone.getClientDate('YYYY'),
          value: timezone.getClientDate('YYYY'),
        };
        this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
      }
    },
    getSelectedUserList: function(value) {
      if (!common.isEmpty(value.userList)) {
        this.srchUserId = value.userList.userId;
        this.srchUserNm = value.userList.userName;
        this.srchDeptId = value.userList.deptId;
        this.srchDeptNm = value.userList.deptNm;
      }
    },
    getSelectedDept: function(value) {
      if (!common.isEmpty(value)) {
        this.srchDeptId = value.deptId;
        this.srchDeptNm = value.deptNm;
      }
    },
  },
  async mounted() {
    //* 조회년도 값 세팅
    await this[commonTypes.actions.FETCH_YEAR_LIST]({});
    this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
    this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    this.init();
  },
  methods: {
    init() {
      //! 초기 부서 파라미터 제거 2021.01.29
      // this.srchDeptId = this.loginUserInfo.deptId;
      // this.srchDeptNm = this.loginUserInfo.deptNm;
      if (
        this.loginUserInfo.userType === 'ADMIN' ||
        this.loginUserInfo.userType === 'SUPER'
      ) {
        this.srchDeptNm = '';
      }

      // if (this.$route.params.dataName) {
      //   this.srchPrjNm = this.$route.params.dataName;
      //   this.srchDeptNm = this.$route.params.deptNm;
      //   this.srchDeptId = this.$route.params.deptId;
      //   this.srchUserNm = this.$route.params.userNm;
      // }

      this.getProjectList('init');
    },
    getProjectList(type) {
      if (this.srchUserNm == '') {
        this.srchUserId = '';
      }
      // if (this.srchDeptNm == '') {
      //   if (
      //     this.loginUserInfo.userType !== 'ADMIN' &&
      //     this.loginUserInfo.userType !== 'SUPER'
      //   ) {
      //     this.srchDeptId = this.loginUserInfo.deptId;
      //   } else {
      //     this.srchDeptId = '';
      //   }
      // }
      const param = {
        srchYYYY: this.baseYear.value,
        srchDeptId: this.srchDeptId,
        srchUserId: this.srchUserId,
        srchPrjNm: this.srchPrjNm,
      };
      this[commonTypes.actions.INIT_SELECTED_YEAR_DATA](this.baseYear.value);
      //* 과제 리스트에서 엑셀 다운로드 기능을 위해 저장
      this[projectExecutionTypes.actions.INIT_PRJ_SRCH_CONDITION]({
        srchYYYY: this.baseYear.value,
        srchDeptId: this.srchDeptId,
        srchUserId: this.srchUserId,
        srchPrjNm: this.srchPrjNm,
      });

      if (
        !common.isEmpty(type) ||
        (this.srchDeptId == '' && this.srchUserId == '' && this.srchPrjNm == '')
      ) {
        param.initPage = 'Y'; // 초기화면, 검색조건없을때
      }
      this[projectExecutionTypes.actions.FETCH_PROJECT_EXECUTION_LIST](param);
    },
    onSrchClick() {
      this.getProjectList();
    },
    async enterUserSearchPop() {
      //* 담당자 input 엔터시
      const userType = this.loginUserInfo.userType;
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchUserNm,
        srchInnerGrps: true,
        userType: userType,
      });
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({
        srchInnerGrps: true,
        userType: userType,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.srchUserId = value.userId;
        this.srchUserNm = value.userName;
        this.srchDeptId = value.deptId;
        this.srchDeptNm = value.deptNm;
        this.getProjectList();
      } else if (userList.length === 0) {
        this.srchUserNm = '';
        this.srchUserId = '';
        //검색 권한이 없는 사용자입니다.
        common.alert('warning', 'NLS0001242');
      } else {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      }
    },
    onDeptSearchPop() {
      this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    async enterDeptSearchPop() {
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      const userType = loginUserInfo.userType;

      const param = {
        srchDeptNm: this.srchDeptNm,
      };
      //* 부서 리스트 가져오기
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST](param);
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (!common.isEmpty(deptList)) {
        if (deptList.length === 1) {
          //* 관리자나 슈퍼관리자일 경우
          if (userType === 'ADMIN' || userType === 'SUPER') {
            this.srchDeptNm = deptList[0].deptNm;
            this.srchDeptId = deptList[0].deptId;
            this.getProjectList();
          } else {
            //* 하위 부서 가져오기
            await this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
            var lowDeptList = this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];

            //* 검색한 부서 정보 결과가 하위부서정보에 포함되는지 검색
            var flag = lowDeptList.some(item => {
              return item.deptId === deptList[0].deptId ? true : false;
            });
            if (flag) {
              this.srchDeptNm = deptList[0].deptNm;
              this.srchDeptId = deptList[0].deptId;
              this.getProjectList();
            } else {
              this.srchDeptNm = loginUserInfo.deptNm;
              this.srchDeptId = loginUserInfo.deptId;
              common.alert('warning', 'NLS0001342');
            }
          }
        } else {
          //* 검색한 부서 정보 결과가 2개 이상이면 부서 검색 공통 팝업 open
          this.onDeptSearchPop();
        }
      } else {
        this.srchDeptNm = loginUserInfo.deptNm;
        this.srchDeptId = loginUserInfo.deptId;
        common.alert('warning', 'NLS0001349');
      }
    },
    resetUser() {
      this.srchUserId = '';
    },
    resetDept() {
      // this.srchDeptNm = '';
      this.srchDeptId = '';
    },
  },
};
</script>

<style lang="scss"></style>
