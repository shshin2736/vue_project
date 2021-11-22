<template>
  <dl class="task-accordion">
    <dt v-bind:class="dtClassNm" @click="changeDtClass" calss="current">
      <button type="button" class="task-accordion-btn">
        <!-- 기본정보 -->
        <span> {{ $t('NLS0000196') }} <em class="required-text">*</em></span>
      </button>
    </dt>
    <dd v-show="dtContent">
      <div class="accordion-inner-btnbox">
        <com-button
          type="button"
          class="accordion-btn save perm_save"
          v-if="isShowSaveBtn"
          :auth="$route.params.auth"
          @click="savePrj"
        >
          <!-- 저장 -->
          <span>{{ $t('NLS0000074') }}</span>
        </com-button>

        <!-- <com-button
          type="button"
          class="accordion-btn delete perm_delete"
          v-if="deleteBtnFlag"
          :auth="$route.params.auth"
          @click="deletePrjMain"
        >
        
          <span>{{ $t('NLS0000075') }}</span>
        </com-button> -->

        <!-- <p>일반과제 &gt; 기본정보</p> -->
        <button
          type="button"
          class="accordion-btn info"
          @click="openHelpPop('기본정보', 'NLS0000783')"
        >
          <!-- 도움말 -->
          <span>{{ $t('NLS0000823') }}</span>
        </button>
      </div>
      <div class="hmstask-table">
        <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
          <table>
            <colgroup>
              <col style="width:15%" />
              <col style="width:35%" />
              <col style="width:15%" />
              <col style="width:35%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" class="required-field">
                  <!-- 과제 명 -->
                  {{ $t('NLS0000151') }} <em class="required-text">*</em>
                </th>
                <td colspan="3">
                  <span class="input__box type-nobtn">
                    <com-input-text
                      type="text"
                      v-model="prjNm"
                      :disable="isDisabled"
                      rules="required"
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required-field">
                  <!-- 과제 전체 실행 기간 -->
                  {{ $t('NLS0000195') }}<em class="required-text">*</em>
                </th>
                <td colspan="3">
                  <span class="hms-datepicker">
                    <com-date-picker
                      :min="min"
                      :max="max"
                      name="prjStartDate"
                      :current="prjStartDate"
                      :format="format"
                      :disabled="isDisabled"
                      @onChange="onChange"
                    ></com-date-picker>
                  </span>
                  <em class="date-divide">~</em>
                  <span class="hms-datepicker">
                    <com-date-picker
                      :min="min"
                      :max="max"
                      name="prjEndDateDate"
                      :current="prjEndDate"
                      :format="format"
                      :disabled="isDisabled"
                      @onChange="onChange"
                    ></com-date-picker>
                  </span>
                </td>
              </tr>
              <tr>
                <!-- 담당부서장 -->
                <th scope="row" class="required-field">
                  {{ $t('NLS0000197') }} <em class="required-text">*</em>
                </th>
                <td>
                  <div class="task-inputform type2">
                    <!-- <com-input-text
                      :isReadOnly="true"
                      v-model="prjManagerInfo"
                      rules="required"
                    >
                    </com-input-text> -->
                    <com-input-text
                      v-model="prjManagerInfo"
                      rules="required"
                      :disable="isDisabled"
                      @keyup="onKeyUp('MANAGER')"
                      @enter="enterUserSearchPop('prjManager')"
                    >
                    </com-input-text>
                    <button
                      type="button"
                      class="magnifier-btn-black"
                      @click="enterUserSearchPop('prjManager')"
                    >
                      더찾기
                    </button>
                    <!-- <button
                      type="button"
                      class="magnifier-btn-black"
                      @click="onPopup('prjManager')"
                    >
                      더찾기
                    </button> -->
                  </div>
                </td>
                <!-- 담당자 -->
                <th scope="row" class="required-field">
                  {{ $t('NLS0000065') }} <em class="required-text">*</em>
                </th>
                <td>
                  <div class="task-inputform type2">
                    <!-- <com-input-text
                      :isReadOnly="true"
                      v-model="prjUserInfo"
                      rules="required"
                    >
                    </com-input-text> -->
                    <com-input-text
                      v-model="prjUserInfo"
                      rules="required"
                      :disable="isDisabled"
                      @keyup="onKeyUp('USER')"
                      @enter="enterUserSearchPop('prjUser')"
                    >
                    </com-input-text>
                    <button
                      type="button"
                      class="magnifier-btn-black"
                      @click="enterUserSearchPop('prjUser')"
                    >
                      더찾기
                    </button>
                    <!-- <input type="text" title="입력폼" :isReadOnly="true" /> -->
                    <!-- <button
                      type="button"
                      class="magnifier-btn-black"
                      @click="onPopup('prjUser')"
                    >
                      더찾기
                    </button> -->
                  </div>
                </td>
              </tr>
              <tr>
                <!-- 연결 전략과제 -->
                <th scope="row">
                  {{ $t('NLS0000939') }}
                </th>
                <td>
                  <div class="task-inputform type2">
                    <com-input-text :isReadOnly="true"></com-input-text>
                    <button
                      type="button"
                      class="magnifier-btn-black"
                      @click="onPopup('strategy')"
                    >
                      더찾기
                    </button>

                    <div class="joint-user-box">
                      <span
                        class="joint-user"
                        v-for="(item, index) in connectStgList"
                        :key="index"
                      >
                        {{ item.stgDeptNm }}/{{ item.stgNm }}
                        <button
                          type="button"
                          class="del2-btn"
                          @click="deleteConnectStg(item.stgId, item.baseYYYY)"
                        >
                          <!-- 삭제 -->
                          {{ $t('NLS0000075') }}
                        </button>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <!-- 과제 개요 -->
                <th scope="row">
                  {{ $t('NLS0000199') }}
                </th>
                <td colspan="3">
                  <div class="task-textform type2">
                    <textarea
                      v-model="gnlSummary"
                      :disabled="isDisabled"
                    ></textarea>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <com-validate-error
            :invalid="invalid"
            :validated="validated"
            :errors="errors"
            @errors="onErrors"
          ></com-validate-error>
        </validation-observer>
      </div>
    </dd>
  </dl>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComButton from '@/components/common/global/ComButton';
import * as commonTypes from '@/store/modules/common/types';
import { timezone, common } from '@/utils';
import {
  commonStore,
  generalTasksStore,
  specializedTasksStore,
} from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';

export default {
  name: 'GeneralTaskBasicInfoForm',
  mixins: [commonStore, generalTasksStore, specializedTasksStore],
  components: {
    ComValidateError,
    ComDatePicker,
    ComInputText,
    ComButton,
  },
  data() {
    return {
      disableSave: false,
      prjNm: '', //*과제명
      prjStartDate: new Date(), //* 시작일자
      prjEndDate: new Date(), //* 종료일자
      prjManagerId: '', //* 담당부서장 ID
      prjManagerNm: '', //* 담당부서장 이름
      prjManagerInfo: '',
      prjUserId: '', //* 담당자 ID,
      prjUserNm: '', //* 담당자 이름
      prjUserInfo: '',
      prjDeptId: '', //* 담당자 부서 ID
      prjStatus: '', //* 과제 상태
      gnlSummary: '', //* 과제 개요,
      departmentFlag: '', //* 부서 팝업을 사용 구분 flag(담당부서장, 담당자)
      connectStgList: [], //* 연결전략과제 리스트
      isShowSaveBtn: true, //* 저장버튼 SHOW ON/OFF
      isDisabled: false,
      deleteBtnFlag: false, //* 삭제버튼 Show ON/OFF
      formInvalid: false, //* 입력형식 폼 invalid
      formError: {},

      // * DatePicker
      min: new Date(2010, 1, 1),
      max: new Date(2040, 12, 31),
      current: new Date(),
      format: 'yyyy-MM-dd',

      //* dt class
      dtClassNm: 'current',
      dtContent: true,
    };
  },
  computed: {
    //* 공통 사용자 검색 팝업에서 선택한 정보
    getSelectedManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    //* 공통 전략과제 검색 팝업에서 선택한 정보
    getSelectedStg() {
      return 'asdasd';
    },
    //* 신규인지 수정 화면인지
    getIsNewGnlTask() {
      return this[generalTasksType.getters.GET_IS_NEW_GNL_TASK];
    },
    isShowDeleteBtn() {
      const isNewGnlTask = this[generalTasksType.getters.GET_IS_NEW_GNL_TASK];
      const flag = isNewGnlTask ? false : true;
      return flag;
    },
    //* 수정화면일 경우 일반과제 정보 불러오기
    getPrjMainInfo() {
      return this[generalTasksType.getters.GET_GNL_PRJ_MAIN];
    },
    getSelectedStrategy() {
      return this[commonTypes.getters.GET_SELECTED_STRATEGY_LIST];
    },
  },
  watch: {
    //* 선택한 담당부서장 / 담당자  정보
    getSelectedManager(value) {
      if (Object.keys(value).length > 0) {
        //* 담당부서장
        if (this.departmentFlag === 'prjManager') {
          this.prjManagerId = value.userId;
          this.prjManagerInfo = value.deptNm.concat(' / ', value.userName);
        } else if (this.departmentFlag === 'prjUser') {
          //* 담당자(prjUser)
          this.prjDeptId = value.deptId;
          this.prjUserId = value.userId;
          this.prjUserInfo = value.deptNm.concat(' / ', value.userName);
        }
        this.departmentFlag = '';
      }
    },
    //* 선택한 전략과제 정보
    getSelectedStrategy(value) {
      //* 중복제거
      value.forEach(element => {
        if (!this.connectStgList) this.connectStgList = [];
        const index = this.connectStgList.findIndex(
          el => el.stgId === element.stgId,
        );
        if (index === -1) {
          this.connectStgList.push(element);
        }
      });
    },
    getPrjMainInfo(value) {
      const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
      const prjMainInfo = value;
      //* 일반과제 ID값 저장
      this[generalTasksType.actions.INIT_PRJ_ID](prjMainInfo.prjId);
      //* 과제명
      this.prjNm = prjMainInfo.prjNm;
      //* 수정버튼 보여주기
      this.deleteBtnFlag = true;
      //* 담당부서장 ID
      this.prjManagerId = prjMainInfo.prjManagerId;
      //* 담당부서장 정보(담당부서명/담당자명)
      this.prjManagerInfo = prjMainInfo.prjManagerInfo;
      if (this.prjManagerInfo == ' / ') this.prjManagerInfo = '';
      //*담당자 ID
      this.prjUserId = prjMainInfo.prjUserId;
      //* 담당자 부서 ID
      this.prjDeptId = prjMainInfo.prjDeptId;
      //* 담당자 정보(부서명/이름)
      this.prjUserInfo = prjMainInfo.prjUserInfo;
      //* 연결 전략과제 리스트
      this.connectStgList = prjMainInfo.connectstglist;
      //* 과제 개요
      this.gnlSummary = prjMainInfo.gnlSummary;
      //* 과제 상태
      this.prjStatus = prjMainInfo.prjStatus;

      //* 저장버튼 SHOW ON/OFF
      this.isShowSaveBtn =
        (this.prjStatus === 'C' ? false : true) &&
        (value.prjUserId === loginUserInfo.userId ||
          value.prjManagerId === loginUserInfo.userId ||
          loginUserInfo.userType === 'ADMIN' ||
          loginUserInfo.userType === 'SUPER');

      //* 시작날짜
      this.prjStartDate = new Date(
        timezone.convertToClientTimeZone(
          prjMainInfo.prjStartDate,
          'YYYY-MM-DD',
        ),
      );
      //* 종료 날짜
      this.prjEndDate = new Date(
        timezone.convertToClientTimeZone(prjMainInfo.prjEndDate, 'YYYY-MM-DD'),
      );
    },
  },
  mounted() {
    const loginUserInfo = this[commonTypes.getters.GET_USER_DATA];
    if (this.$route.params.prjId) {
      this[generalTasksType.actions.INIT_IS_NEW_GNL_TASK](false);
      //* 일반 과제 정보 가져오기
      this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN]({
        prjId: this.$route.params.prjId,
        baseYyyy: this.$route.params.baseYyyy,
      });
    } else {
      this.prjNm = this[
        specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO
      ].prjNm;
      this[generalTasksType.actions.INIT_PRJ_ID](undefined);
      this[generalTasksType.actions.INIT_IS_NEW_GNL_TASK](true);
      //* 담당부서장 ID
      if (loginUserInfo.app1UserId) {
        this.prjManagerId = loginUserInfo.app1UserId;
        //* 담당부서장 정보(담당부서명/담당자명)
        this.prjManagerInfo =
          loginUserInfo.app1DeptNm + ' / ' + loginUserInfo.app1UserName;
      }
      //*담당자 ID
      this.prjUserId = loginUserInfo.userId;
      //* 담당자 부서 ID
      this.prjDeptId = loginUserInfo.deptId;
      //* 담당자 정보(부서명/이름)
      this.prjUserInfo = loginUserInfo.deptNm + ' / ' + loginUserInfo.userName;
    }
    this.$refs.obs.validate();
    if (
      !this.$route.params.auth.includes('S') &&
      !this.$route.params.auth.includes('X') &&
      !this.$route.params.auth.includes('D')
    ) {
      this.isDisabled = true;
    }
  },
  methods: {
    //* 과제 정보 저장
    savePrj() {
      //* 입력 유효성 체크
      if (this.formInvalid) {
        // 형식에 맞는 데이터를 입력해 주십시오.
        common.alert('warning', 'NLS0000018');
      } else {
        //* 날짜 유효성 체크
        if (this.prjStartDate > this.prjEndDate) {
          // 종료날짜가 시작날짜보다 작을수 없습니다.
          common.alert('warning', 'NLS0000854');
        } else if (this.prjManagerId === '' || this.prjUserId === '') {
          common.alert('warning', 'NLS0001054');
        } else {
          const param = {
            prjNm: this.prjNm, //* 과제명
            prjStartDate: timezone.convertToServerTimeZone(
              this.prjStartDate,
              'YYYYMMDD',
            ), //* 과제 시작일
            prjEndDate: timezone.convertToServerTimeZone(
              this.prjEndDate,
              'YYYYMMDD',
            ), //* 과제 종료일
            prjDeptId: this.prjDeptId, //* 담당부서 ID
            prjManagerId: this.prjManagerId, //* 담당부서장 ID
            prjUserId: this.prjUserId, //* 담당자 ID,
            connectStgList: this.connectStgList, //* 연결전략과제 리스트
            gnlSummary: this.gnlSummary, //* 일반과제 내용
            baseYyyy: this.$route.params.baseYyyy,
          };

          //* 신규 저장 인지 확인하는 boolean
          const isNewGnlTask = this[
            generalTasksType.getters.GET_IS_NEW_GNL_TASK
          ];

          //* 신규저장
          if (isNewGnlTask) {
            // 저장하시겠습니까?
            common.confirm('NLS0000005', async () => {
              //* 과제명
              param.prjType = 'GL'; // * 과제 유형
              param.prjStatus = 'D'; //* 과제 상태
              param.prjRate = 0; //* 과제 진척률
              const data = await this[
                generalTasksType.actions.INSERT_NEW_PRJ_MAIN
              ](param);
              if (data.result === 'T') {
                //* 일반과제 저장 후 과제 ID를 저장한다.
                this[generalTasksType.actions.INIT_PRJ_ID](data.data.prjId);
                param.prjId = data.data.prjId;
                //* 저장버튼 기능이 수정 기능으로 변경
                this[generalTasksType.actions.INIT_IS_NEW_GNL_TASK](false);
                //* 일반과제 정보를 set(알람서비스 목적)
                this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN](param);
                //this[generalTasksType.actions.INIT_GNL_PRJ_MAIN](param);
                // 저장되었습니다
                common.alert('success', 'NLS0000012');
              }
            });
          } else {
            // 수정하시겠습니까?
            common.confirm('NLS0000006', async () => {
              param.prjId = this[generalTasksType.getters.GET_PRJ_ID];
              const data = await this[generalTasksType.actions.UPDATE_PRJ_MAIN](
                param,
              );
              if (data.result === 'T') {
                //* 일반과제 정보를 set(알람서비스 목적)
                this[generalTasksType.actions.FETCH_GNL_PRJ_MAIN](param);
                // 수정되었습니다.
                common.alert('success', 'NLS0000015');
              }
            });
          }
        }
      }

      //* 유효성 검증 필요
    },

    //*  date-picker 변경
    onChange(date, name) {
      name === 'prjStartDate'
        ? (this.prjStartDate = date)
        : (this.prjEndDate = date);
    },
    onPopup(type) {
      if (this.isDisabled) return;
      //let srchNm = '';
      switch (type) {
        // case 'department':
        //   this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
        //   break;
        case 'strategy':
          this[commonTypes.actions.FETCH_SEARCH_STRATEGY_LIST]({});
          this[commonTypes.actions.INIT_STRATEGY_SEARCH_POPUP](true);
          break;
        default:
          //* prjManager , prjUser
          this.departmentFlag = type;
          // if (type === 'prjManager') {
          //   srchNm = this.prjManagerInfo;
          // } else {
          //   srchNm = this.prjUserInfo;
          // }
          this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
          this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
          this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
            //srchUserNm: srchNm,
          });
          break;
      }
    },
    async enterUserSearchPop(type) {
      if (this.isDisabled) return;
      this.departmentFlag = type;
      let srchNm = '';
      if (type === 'prjManager') {
        srchNm = this.prjManagerInfo;
      } else {
        srchNm = this.prjUserInfo;
      }
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: srchNm,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        //* 담당부서장
        if (type === 'prjManager') {
          this.prjManagerId = value.userId;
          this.prjManagerInfo = value.deptNm.concat(' / ', value.userName);
        } else if (type === 'prjUser') {
          //* 담당자(prjUser)
          this.prjDeptId = value.deptId;
          this.prjUserId = value.userId;
          this.prjUserInfo = value.deptNm.concat(' / ', value.userName);
        }
        this.departmentFlag = '';
      } else {
        this.onPopup(type);
        // if (type === 'prjManager') {
        //   this.prjManagerInfo = '';
        // } else {
        //   this.prjUserInfo = '';
        // }
      }
    },
    onKeyUp(flag) {
      if (flag === 'USER') {
        this.prjDeptId = '';
        this.prjUserId = '';
      } else {
        this.prjManagerId = '';
      }
    },
    onErrors(invalid, validate, errors) {
      this.formError = errors;
      this.formInvalid = invalid;
    },
    //* 일반과제 삭제
    deletePrjMain() {
      const param = {
        prjId: this.$route.params.prjId,
      };
      common.confirm('NLS0000004', async () => {
        const response = await this[generalTasksType.actions.DELETE_PRJ_MAIN](
          param,
        );
        if (response.result === 'T') {
          common.alert('success', 'NLS0000002');
          this[generalTasksType.actions.INIT_PRJ_ID]('');
          //* Task 리스트 초기화
          this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
          this.$router.push({
            path: '/ProjectExecutionListPage',
          });
        }
      });
    },
    //* 공통 연결과제 검색 팝업창에서 가져온 연결과제 삭제
    deleteConnectStg(stgId, baseYYYY) {
      //*공동 사용자 추가 리스트에서 삭제
      const index = this.connectStgList.findIndex(
        el => el.stgId === stgId && el.baseYYYY === baseYYYY,
      );
      this.connectStgList.splice(index, 1);
    },
    //* 기본정보 SHOW/HIDE
    changeDtClass() {
      if (this.dtClassNm === 'current') {
        this.dtClassNm = '';
        this.dtContent = false;
      } else {
        this.dtClassNm = 'current';
        this.dtContent = true;
      }
    },
    //* 과제도움말 팝업
    openHelpPop(prjStepNm, helpMsg) {
      this[commonTypes.actions.INIT_PROJECT_HELP_INFO]({
        prjStepNm: prjStepNm,
        helpMsg: helpMsg,
      });
      this[commonTypes.actions.INIT_VIEWS_PRJ_HELP_POP](true);
    },
  },
};
</script>

<style></style>
