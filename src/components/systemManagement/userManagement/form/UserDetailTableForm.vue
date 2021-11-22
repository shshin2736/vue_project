<template>
  <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
    <div class="hms-grid basic-table type-nomargin">
      <table>
        <colgroup>
          <col style="width:15%" />
          <col />
          <col style="width:15%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <!-- 사용자ID	 -->
            <th scope="row">
              {{ $t('NLS0000120') }} <span class="required-text">*</span>
            </th>
            <td>
              <span class="grid-input-form type-nobtn">
                <com-input-text
                  rules="required"
                  v-model="getUserInfo.userId"
                  :disable="!isNew"
                ></com-input-text>
              </span>
            </td>
            <!-- Active 상태	 -->
            <th scope="row">
              {{ $t('NLS0000226') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_02"
                v-model="activeFlag"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
              ></com-dropdowns>
            </td>
          </tr>
          <tr>
            <!-- 사용자명 -->
            <th scope="row">
              {{ $t('NLS0000221') }}<span class="required-text">*</span>
            </th>
            <td>
              <span class="grid-input-form type-nobtn">
                <com-input-text
                  v-model="getUserInfo.userName"
                  rules="required"
                ></com-input-text>
              </span>
            </td>
            <!-- 사용자 국가	 -->
            <th scope="row">
              {{ $t('NLS0000227') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_10"
                v-model="country"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
              ></com-dropdowns>
            </td>
          </tr>
          <tr>
            <!-- 이메일주소 -->
            <th scope="row">
              {{ $t('NLS0000228') }}<span class="required-text">*</span>
            </th>
            <td>
              <span class="grid-input-form type-nobtn">
                <com-input-text
                  v-model="getUserInfo.emailAddress"
                  rules="required|email"
                ></com-input-text>
              </span>
            </td>
            <!-- MBO 선정 여부 -->
            <th scope="row">
              {{ $t('NLS0001292') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_01"
                v-model="mboYn"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                rules="selected"
              ></com-dropdowns>
            </td>
          </tr>
          <tr>
            <!-- 사용자 유형	 -->
            <th scope="row">
              {{ $t('NLS0000122') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_03"
                v-model="userType"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                rules="selected"
              ></com-dropdowns>
            </td>
            <!-- 사용자 언어	 -->
            <th scope="row">
              {{ $t('NLS0000230') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_05"
                v-model="languageCode"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
              ></com-dropdowns>
            </td>
          </tr>
          <tr>
            <!-- 사용자 부서	 -->
            <th scope="row">
              {{ $t('NLS0000213') }}<span class="required-text">*</span>
            </th>
            <td>
              <span class="grid-input-form">
                <com-input-text
                  v-model="getUserInfo.deptNm"
                  rules="required"
                  :isReadOnly="false"
                  :autocomplete="'new-password'"
                  @enter="enterDeptSrch"
                  @keyup="onDeptKeyUp"
                ></com-input-text>
                <button
                  type="button"
                  class="magnifier-btn-black"
                  @click="searchDept"
                >
                  더찾기
                </button>
              </span>
            </td>
            <!-- 비밀번호 -->
            <th scope="row">
              {{ $t('NLS0000231') }}<span class="required-text">*</span>
            </th>
            <td>
              <span class="grid-input-form type-nobtn">
                <com-input-text
                  v-model="getUserInfo.password"
                  type="password"
                  v-if="isNew"
                  rules="required"
                  :autocomplete="'new-password'"
                ></com-input-text>
              </span>
              <com-button
                type="button"
                :auth="$route.params.auth"
                class="gray-btn perm_save"
                @click="resetPass"
                v-if="!isNew"
              >
                <!-- 비밀번호 초기화	 -->
                <span> {{ $t('NLS0000232') }}</span>
              </com-button>
            </td>
          </tr>
          <tr>
            <!-- 직급	 -->
            <th scope="row">
              {{ $t('NLS0000343') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_07"
                v-model="rankCode"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                rules="selected"
              ></com-dropdowns>
            </td>
            <!-- 직책 -->
            <th scope="row">
              {{ $t('NLS0000124') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_08"
                textfield="cdNm"
                valuefield="cd"
                v-model="dutyCode"
                class="hms-dropdown type2"
                rules="selected"
              ></com-dropdowns>
            </td>
          </tr>
          <tr>
            <!-- 전화번호 -->
            <th scope="row">{{ $t('NLS0000233') }}</th>
            <td>
              <span class="grid-input-form type-nobtn">
                <com-input-text v-model="getUserInfo.telNo"></com-input-text>
              </span>
            </td>
            <!-- 휴대폰 번호	 -->
            <th scope="row">{{ $t('NLS0000234') }}</th>
            <td>
              <span class="grid-input-form type-nobtn">
                <com-input-text
                  v-model="getUserInfo.mobileTelNo"
                ></com-input-text>
              </span>
            </td>
          </tr>
          <tr>
            <!-- 재직여부 -->
            <th scope="row">
              {{ $t('NLS0000235') }}<span class="required-text">*</span>
            </th>
            <td>
              <com-dropdowns
                :data="G_14"
                v-model="retireYn"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                rules="selected"
              ></com-dropdowns>
            </td>
            <!-- 비밀번호 만료일	 -->
            <th scope="row">
              {{ $t('NLS0000178') }}<span class="required-text">*</span>
            </th>
            <td>
              <span class="hms-datepicker">
                <com-date-picker
                  :current="currentDate"
                  :min="min"
                  :max="max"
                  @onChange="datePick"
                ></com-date-picker>
              </span>
            </td>
          </tr>
          <tr>
            <!-- 1차 결재자	 -->
            <th scope="row">{{ $t('NLS0000171') }}</th>
            <td>
              <span class="grid-input-form">
                <com-input-text
                  v-model="getUserInfo.app1UserName"
                  @enter="enterUserSearchPop('app1')"
                />
                <button
                  type="button"
                  class="magnifier-btn-black"
                  @click="enterUserSearchPop('app1')"
                >
                  더찾기
                </button>
              </span>
            </td>
            <!-- 2차 결재자	 -->
            <th scope="row">{{ $t('NLS0000172') }}</th>
            <td>
              <span class="grid-input-form">
                <com-input-text
                  v-model="getUserInfo.app2UserName"
                  @enter="enterUserSearchPop('app2')"
                />
                <button
                  type="button"
                  class="magnifier-btn-black"
                  @click="enterUserSearchPop('app2')"
                >
                  더찾기
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <com-validate-error
      :invalid="invalid"
      :validated="validated"
      :errors="errors"
      @errors="onErrors"
    ></com-validate-error>
  </validation-observer>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComValidateError from '@/components/common/global/ComValidateError';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';

export default {
  name: 'UserDetailTableForm',
  mixins: [userManagementStore, commonStore],
  components: {
    ComValidateError,
    ComButton,
    ComDropdowns,
    ComDatePicker,
    ComInputText,
  },
  data() {
    return {
      errorMsg: '',
      min: new Date(),
      max: new Date(),
      currentDate: new Date(),
      retireYn: {},
      activeFlag: {},
      userType: {},
      languageCode: {},
      rankCode: {},
      dutyCode: {},
      country: {},
      mboYn: {},
      frst: false,
      snd: false,
      disable: true,
      isNew: false,
    };
  },
  computed: {
    getUserInfo() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
    getSelectedData() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getSelectedDept() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    G_01(state) {
      const items = common.getCodeList('G01');
      const tmp = this.getUserInfo.mboYn;
      if (tmp !== undefined) {
        state.mboYn = common.filterCode(common.getCodeList('G01'), tmp);
      }
      return items;
    },
    G_14(state) {
      const items = common.getCodeList('G14');
      const tmp = this.getUserInfo.retireYn;
      if (tmp !== undefined) {
        state.retireYn = common.filterCode(common.getCodeList('G14'), tmp);
      }
      return items;
    },
    G_02(state) {
      const items = common.getCodeList('G02');
      const tmp = this.getUserInfo.activeFlag;
      if (tmp !== undefined) {
        state.activeFlag = common.filterCode(common.getCodeList('G02'), tmp);
      }
      return items;
    },
    G_03(state) {
      const items = common.getCodeList('G03');
      const tmp = this.getUserInfo.userType;
      if (tmp !== undefined) {
        state.userType = common.filterCode(common.getCodeList('G03'), tmp);
      }
      return items;
    },
    G_05(state) {
      const items = common.getCodeList('G05');
      const tmp = this.getUserInfo.languageCode;
      if (tmp !== undefined) {
        state.languageCode = common.filterCode(common.getCodeList('G05'), tmp);
      }
      return items;
    },
    G_07(state) {
      const items = common.getCodeList('G07');
      const tmp = this.getUserInfo.rankCode;
      if (tmp !== undefined) {
        state.rankCode = common.filterCode(common.getCodeList('G07'), tmp);
      }
      return items;
    },
    G_08(state) {
      const items = common.getCodeList('G08');
      const tmp = this.getUserInfo.dutyCode;
      if (tmp !== undefined) {
        state.dutyCode = common.filterCode(common.getCodeList('G08'), tmp);
      }
      return items;
    },
    G_10(state) {
      const items = common.getCodeList('G10');
      const tmp = this.getUserInfo.country;
      if (tmp !== undefined) {
        state.country = common.filterCode(common.getCodeList('G10'), tmp);
      }
      return items;
    },
  },
  watch: {
    activeFlag: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.activeFlag = val.cd;
      }
    },
    retireYn: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.retireYn = val.cd;
      }
    },
    mboYn: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.mboYn = val.cd;
      }
    },
    userType: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.userType = val.cd;
      }
    },
    languageCode: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.languageCode = val.cd;
      }
    },
    rankCode: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.rankCode = val.cd;
      }
    },
    dutyCode: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.dutyCode = val.cd;
      }
    },
    country: function(val) {
      if (val !== undefined) {
        const items = this.getUserInfo;
        items.country = val.cd;
      }
    },
    getSelectedData: function(val) {
      if (this.frst === true) {
        this.frst = false;
        this.$set(this.getUserInfo, 'app1UserId', val.userId);
        this.$set(
          this.getUserInfo,
          'app1UserName',
          `${val.deptNm}/${val.userName}`,
        );
      } else if (this.snd === true) {
        this.snd = false;
        this.$set(this.getUserInfo, 'app2UserId', val.userId);
        this.$set(
          this.getUserInfo,
          'app2UserName',
          `${val.deptNm}/${val.userName}`,
        );
      }
    },
    getSelectedDept: function(val) {
      this.$set(this.getUserInfo, 'deptNm', val.deptNm);
      this.$set(this.getUserInfo, 'deptId', val.deptId);
    },
  },
  async created() {
    if (common.isEmpty(this.$route.params.access)) {
      this.$router.push({
        name: 'userPage',
        params: { auth: this.$route.params.auth },
      });
    } else if (this.$route.params.isNew) {
      this.isNew = true;
      await this.setDefault();
    }
    if (this.$route.params.userId) {
      this[userManagementTypes.actions.FETCH_USER_INFO]({
        userId: this.$route.params.userId,
      });
      this[userManagementTypes.actions.FETCH_USER_ROLE_ASSIGN]({
        userId: this.$route.params.userId,
      });
    }
    await this.setPwExp();
    const date = new Date();
    let year = new String(date.getFullYear());
    let month = new String(date.getMonth());
    let day = new String(date.getDate());

    // 한자리수일 경우 0을 채워준다.
    if (month.length == 1) {
      month = '0' + month;
    }
    if (day.length == 1) {
      day = '0' + day;
    }
    this.min = new Date(year, month, day);
    this.max = new Date(year, month, day);
    this.max.setMonth(this.max.getMonth() + 6);
  },
  mounted() {
    this.$refs.obs.validate();
  },
  methods: {
    setPwExp() {
      const expDate = this.getUserInfo.pwExpDate;
      if (expDate != undefined) {
        const convert = timezone.convertToClientTimeZone(expDate, 'YYYY-MM-DD');
        this.currentDate = new Date(convert);
        this[userManagementTypes.actions.INIT_PW_EXP_DATE](this.currentDate);
      } else {
        const date = new Date();
        date.setMonth(date.getMonth() + 6);
        this.currentDate = date;
        this[userManagementTypes.actions.INIT_PW_EXP_DATE](date);
      }
    },
    setDefault() {
      this.activeFlag = common.filterCode(common.getCodeList('G02'), 'A');
      this.country = common.filterCode(common.getCodeList('G10'), 'KR');
      this.languageCode = common.filterCode(common.getCodeList('G05'), 'KO');
    },
    resetPass() {
      //* 비밀번호를 초기화 하시겠습니까?
      common.confirm(this.$t('NLS0000796'), () => {
        this[userManagementTypes.actions.UPDATE_PASSWORD]({
          userId: this.getUserInfo.userId,
          flag: 'RESET',
        });
      });
      const date = new Date();
      date.setMonth(date.getMonth() + 3);
      this.currentDate = date;
      const convert = timezone.convertToString(date);
      this[userManagementTypes.actions.UPDATE_PW_EXP_DATE]({
        pwdExpDate: convert,
      });
    },
    onErrors(invalid, validate, errors) {
      if (validate) {
        if (invalid) {
          this[userManagementTypes.actions.INIT_USER_ERROR]({
            error: true,
            msg: errors.msg,
          });
        } else {
          this[userManagementTypes.actions.INIT_USER_ERROR]({ error: false });
        }
      }
    },
    async enterUserSearchPop(type) {
      let srchNm = '';
      if (type === 'app1') {
        this.frst = true;
        srchNm = this.getUserInfo.app1UserName;
      } else {
        this.snd = true;
        srchNm = this.getUserInfo.app2UserName;
      }
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: srchNm,
      });
      const userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        if (type === 'app1') {
          this.frst = false;
          this.$set(this.getUserInfo, 'app1UserId', value.userId);
          this.$set(
            this.getUserInfo,
            'app1UserName',
            `${value.deptNm}/${value.userName}`,
          );
        } else if (type === 'app2') {
          this.snd = false;
          this.$set(this.getUserInfo, 'app2UserId', value.userId);
          this.$set(
            this.getUserInfo,
            'app2UserName',
            `${value.deptNm}/${value.userName}`,
          );
        }
      } else {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      }
    },
    onDeptKeyUp() {
      this.searchDeptId = '';
    },
    async enterDeptSrch() {
      await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchDeptNm: this.getUserInfo.deptNm,
      });
      const deptList = this[commonTypes.getters.GET_COM_DEPT_LIST];
      if (deptList.length === 1) {
        this.$set(this.getUserInfo, 'deptNm', deptList[0].deptNm);
        this.$set(this.getUserInfo, 'deptId', deptList[0].deptId);
      } else {
        this.searchDept();
      }
    },
    searchDept() {
      this[commonTypes.actions.INIT_SELECTED_DEPT]({}); //*부서 선택값초기화
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
      this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);
    },
    datePick(e) {
      this.currentDate = e;
      this[userManagementTypes.actions.INIT_PW_EXP_DATE](e);
    },
  },
};
</script>
