<template>
  <div class="box00">
    <div class="hms-grid type4 border-table w100p">
      <!-- 인계자 -->
      <p class="take-p">
        {{ $t('NLS0000137') }}
      </p>
      <table class="txt-center">
        <colgroup>
          <col width="25%" />
          <col width="35%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <tbody>
          <tr>
            <!-- 부서명 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0001322') }}
            </th>
            <!-- 이름 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0000342') }}
            </th>
            <!-- 상태 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0000149') }}
            </th>
            <!-- 직책 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0000124') }}
            </th>
          </tr>
          <tr>
            <td style="white-space: nowrap;">
              {{ takeUserInfo.deptNm }}
            </td>
            <td style="white-space: nowrap;">{{ takeUserInfo.userName }}</td>
            <td style="white-space: nowrap;">{{ status }}</td>
            <td style="white-space: nowrap;">{{ takeUserInfo.dutyNm }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="hms-grid type4 border-table w100p kpipop-search kpi-in"
      style="margin-top:25px;"
    >
      <p class="take-p">
        인수자
      </p>
      <table class="txt-center">
        <colgroup>
          <col width="25%" />
          <col width="33%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <tbody>
          <tr>
            <!-- 부서명 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0001322') }}
            </th>
            <!-- 이름 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0000342') }}
            </th>
            <!-- 상태 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0000149') }}
            </th>
            <!-- 직책 -->
            <th scope="col" style="white-space: nowrap;">
              {{ $t('NLS0000124') }}
            </th>
          </tr>
          <tr>
            <td style="white-space: nowrap;">
              {{ deptName }}
            </td>
            <td>
              <span class="input__box type-wide type-nobtn"
                ><span
                  ><com-input-text
                    type="text"
                    autocomplete="off"
                    v-model="userName"
                    :readonly="toReq"
                    @enter="srchUser"
                    @keyup="onKeyup"
                  /> </span
                ><button
                  type="button"
                  class="magnifier-btn-black perm_read"
                  @click="srchUser"
                  v-if="!toReq"
                >
                  <span></span></button
              ></span>
            </td>
            <td style="white-space: nowrap;">{{ status }}</td>
            <td style="white-space: nowrap;">
              {{ overUserInfo.dutyNm }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  businessTakeOverStore,
  commonStore,
  userManagementStore,
} from '@/mixins';
import ComInputText from '@/components/common/global/ComInputText';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils/index';
export default {
  name: 'KpiSystemChartUserForm',
  mixins: [businessTakeOverStore, commonStore, userManagementStore],
  components: { ComInputText },
  props: {
    reqStatus: {
      type: String,
      required: false,
    },
    getOverUserInfo: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      statusList: common.getCodeList('TOV001'),
      status: '',
      toReq: false,
      overUserInfo: {},
      takeUserInfo: {},
      userName: '',
      deptName: '',
    };
  },
  computed: {
    userInfo() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
    getTakeUserInfo() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
    getSelectedUser() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getParam() {
      return this[businessTakeOverTypes.getters.GET_PARAM];
    },
  },
  watch: {
    reqStatus: function(value) {
      this.status = value;
      if (value === '') {
        this.init();
        this.userName = '';
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      } else if (value === this.statusList[1].cdNm) this.toReq = true;
    },
    getSelectedUser: function(value) {
      if (!common.isEmpty(value)) {
        //* KPI 체계도 인수할 사용자 정보
        this.overUserInfo = value;
        this.userName = value.userName;
        this.deptName = value.deptNm;
        this.$emit('isUserSelected', true);
        this.status = this.statusList[0].cdNm;
      }
    },
    getParam: function(value) {
      if (common.isEmpty(value)) {
        this.init();
        this.userName = '';
        this.toReq = false;
      }
    },
  },
  async mounted() {
    if (!common.isEmpty(this.getTakeUserInfo)) {
      this.takeUserInfo = this.getTakeUserInfo;
    } else {
      this.takeUserInfo = this.userInfo;
    }
    if (!common.isEmpty(this.getOverUserInfo)) {
      await this[userManagementTypes.actions.FETCH_USER_INFO]({
        userId: this.getOverUserInfo.overUserId,
      });
      this.overUserInfo = this[userManagementTypes.getters.GET_USER_INFO];
      this.userName = this.overUserInfo.userName;
      this.deptName = this.overUserInfo.deptNm;
      this.status = this.getOverUserInfo.tkoStatus;
      this.toReq = true;
      this[userManagementTypes.actions.INIT_USER_INFO]({});
    }
  },
  methods: {
    async srchUser() {
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.userName,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA](value);
      } else {
        this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({});
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      }
    },
    onKeyup() {
      this.init();
      this.status = '';
    },
    init() {
      this.overUserInfo = {};
      this.$emit('isUserSelected', false);
      this.deptName = '';
      this.status = '';
    },
  },
};
</script>

<style></style>
