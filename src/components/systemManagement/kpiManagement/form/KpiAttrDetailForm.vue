<template>
  <div>
    <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
      <div class="hms-grid basic-table">
        <table>
          <colgroup>
            <col style="width:15%" />
            <col />
            <col style="width:15%" />
            <col />
            <col style="width:15%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <!-- KPI 속성정의서 ID	 -->
              <th scope="row">
                {{ $t('NLS0000068') }} <span class="required-text">*</span>
              </th>
              <td colspan="5">{{ defInfo.kpiDefId }}</td>
            </tr>
            <tr>
              <!-- KPI 속성명	 -->
              <th scope="row">
                {{ $t('NLS0000069') }}<span class="required-text">*</span>
              </th>
              <td colspan="5">
                <p
                  class="grid-line"
                  v-for="item in languageList"
                  :key="item.cdNm"
                >
                  <span class="title-lang">{{ item.cdNm }}</span>
                  <span class="grid-input-form type-nobtn">
                    <com-input-text
                      type="text"
                      :class="'kpiDefNm_' + item.cd"
                      v-model="defInfo[`kpiDefNm${item.cd}`]"
                      rules="required"
                    />
                  </span>
                  <button
                    type="button"
                    class="white-btn"
                    v-if="$route.params.kpiDefId === undefined"
                    @click="
                      checkKpiDefNm(defInfo[`kpiDefNm${item.cd}`], `${item.cd}`)
                    "
                  >
                    <!-- 중복체크 -->
                    <span>{{ $t('NLS0000077') }}</span>
                  </button>
                  <span
                    class="grid-text-info alert"
                    v-if="
                      $route.params.kpiDefId === undefined &&
                        GV_CHECK[item.cd] == 1
                    "
                  >
                    <!-- 이미 등록된 이름입니다.	 -->
                    {{ $t('NLS0000799') }}</span
                  >
                  <span
                    class="grid-text-info"
                    v-if="
                      $route.params.kpiDefId === undefined &&
                        GV_CHECK[item.cd] == 0
                    "
                  >
                    <!-- 등록 가능합니다.	 -->
                    {{ $t('NLS0000798') }}</span
                  >
                </p>
              </td>
            </tr>
            <tr>
              <!-- 실적 달성 유형	 -->
              <th scope="row">
                {{ $t('NLS0000061') }}<span class="required-text">*</span>
              </th>
              <td>
                <com-dropdowns
                  :data="getAchTypeList"
                  v-model="defInfo.kpiAchType"
                  textfield="cdNm"
                  valuefield="cd"
                  rules="selected"
                ></com-dropdowns>
              </td>
              <!-- 실적 집계 방식	 -->
              <th scope="row">
                {{ $t('NLS0000059') }}<span class="required-text">*</span>
              </th>
              <td>
                <com-dropdowns
                  :data="getPerTypeList"
                  v-model="defInfo.kpiPerType"
                  textfield="cdNm"
                  valuefield="cd"
                  rules="selected"
                ></com-dropdowns>
              </td>
              <!-- 실적 누계 방식	 -->
              <th scope="row">
                {{ $t('NLS0000060') }}<span class="required-text">*</span>
              </th>
              <td>
                <com-dropdowns
                  :data="getAccTypeList"
                  v-model="defInfo.kpiAccType"
                  textfield="cdNm"
                  valuefield="cd"
                  rules="selected"
                ></com-dropdowns>
              </td>
            </tr>
            <tr>
              <!-- 측정 주기 -->
              <th scope="row">
                {{ $t('NLS0000057') }}<span class="required-text">*</span>
              </th>
              <td>
                <com-dropdowns
                  :data="getCycleList"
                  v-model="defInfo.kpiCycle"
                  textfield="cdNm"
                  valuefield="cd"
                  rules="selected"
                ></com-dropdowns>
              </td>
              <!-- 사용여부*	 -->
              <th scope="row">
                {{ $t('NLS0000058') }}<span class="required-text">*</span>
              </th>
              <td>
                <com-dropdowns
                  :data="getUseYnList"
                  v-model="defInfo.useYn"
                  textfield="cdNm"
                  valuefield="cd"
                  rules="selected"
                ></com-dropdowns>
              </td>
              <!-- 담당부서 / 담당자*	 -->
              <th scope="row">
                {{ $t('NLS0000062') }}<span class="required-text">*</span>
              </th>
              <td>
                <span class="grid-input-form">
                  <com-input-text
                    type="text"
                    v-model="defInfo.deptUser"
                    @enter="searchDeptMangSinglePopup"
                    rules="required"
                  />
                  <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="searchDeptMangSinglePopup"
                  >
                    더찾기
                  </button>
                  <!-- <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="openUserSearchPop"
                  >
                    더찾기
                  </button> -->
                </span>
              </td>
            </tr>
            <tr>
              <!-- KPI 속성 정의	 -->
              <th scope="row">{{ $t('NLS0000073') }}</th>
              <td colspan="5">
                <span class="hms-textarea">
                  <textarea
                    class="grid-textarea"
                    v-model="defInfo.kpiDefDesc"
                    rules="required"
                  ></textarea>
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
    <div class="page__btn-bbox">
      <!-- 삭제 -->
      <com-button
        type="button"
        class="darkgray-btn perm_delete"
        :auth="$route.params.auth"
        v-if="$route.params.kpiDefId !== undefined"
        @click="deleteKpiAttr"
      >
        <span>{{ $t('NLS0000075') }}</span>
      </com-button>
      <!-- 저장 -->
      <com-button
        type="button"
        class="blue-btn perm_save"
        :auth="$route.params.auth"
        @click="saveKpiAttr"
      >
        <span>{{ $t('NLS0000074') }}</span>
      </com-button>
      <!-- 목록 -->
      <com-button
        type="button"
        class="deepdarkgray-btn perm_read"
        :auth="$route.params.auth"
        @click="goKpiAttrList"
      >
        <span>{{ $t('NLS0000372') }}</span>
      </com-button>
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComValidateError from '@/components/common/global/ComValidateError';
import * as kpiAttrTypes from '@/store/modules/systemManagement/kpiAttribute/types';
import * as commonTypes from '@/store/modules/common/types';
import { kpiAttributeStore, commonStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'kpiAttrDetailForm',
  mixins: [kpiAttributeStore, commonStore],
  components: {
    ComValidateError,
    ComButton,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      defInfo: {},
      languageList: [],
      getCycleList: [],
      getUseYnList: [],
      getPerTypeList: [],
      getAccTypeList: [],
      getAchTypeList: [],
      GV_CHECK: common.getCodeList('G05').reduce((acc, cur) => {
        const obj = { ...cur };
        acc[obj.cd] = 2;
        return acc;
      }, {}),
      chkInfo: {},
      GV_invalid: '',
      GV_validated: '',
      GV_errors: {},
    };
  },
  async created() {
    this.languageList = common.getCodeList('G05');

    this.setCodeList();
    if (this.$route.params.kpiDefId != undefined) {
      //* 수정
      this.setKpiAttrInfo(this.$route.params.kpiDefId);
    } else {
      //* 등록 dropdown 초기화
      this.defInfo.kpiCycle = this.getCycleList[0];
      this.defInfo.useYn = this.getUseYnList[0];
      this.defInfo.kpiPerType = this.getPerTypeList[0];
      this.defInfo.kpiAchType = this.getAccTypeList[0];
      this.defInfo.kpiAccType = this.getAchTypeList[0];
      //* 사용자 정보 초기화.
      const userInfo = this[commonTypes.getters.GET_COM_USER_INFO];
      this.$set(this.defInfo, 'defDeptId', userInfo.deptId);
      this.$set(this.defInfo, 'defUserId', userInfo.userId);
      this.$set(
        this.defInfo,
        'deptUser',
        userInfo.deptNm + '/' + userInfo.userName,
      );
    }
  },
  mounted() {
    this.$refs.obs.validate();
  },
  computed: {
    getSelectedUserList() {
      //*선택한 사용자
      const param = {
        userList: this[
          commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA
        ],
      };
      return param;
    },
  },
  watch: {
    getSelectedUserList: function(value) {
      if (value.userList) {
        this.$set(this.defInfo, 'defDeptId', value.userList.deptId);
        this.$set(this.defInfo, 'defUserId', value.userList.userId);
        this.$set(
          this.defInfo,
          'deptUser',
          value.userList.deptNm + '/' + value.userList.userName,
        );
      }
    },
  },
  methods: {
    setCodeList() {
      //* 측정주기
      this.getCycleList = common.getCodeList('KPI002');
      if (this.getCycleList[0].cd != '') {
        //선택
        this.getCycleList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      //* 사용여부
      this.getUseYnList = common.getCodeList('G01');

      //* 실적집계방식
      this.getPerTypeList = common.getCodeList('KPI007');
      if (this.getPerTypeList[0].cd != '') {
        this.getPerTypeList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      //* 실적누계방식
      this.getAccTypeList = common.getCodeList('KPI001');
      if (this.getAccTypeList[0].cd != '') {
        this.getAccTypeList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
      //* 실적달성유형
      this.getAchTypeList = common.getCodeList('KPI004');
      if (this.getAchTypeList[0].cd != '') {
        this.getAchTypeList.unshift({ cd: '', cdNm: this.$t('NLS0000237') });
      }
    },
    async setKpiAttrInfo(kpiDefId) {
      const params = { kpiDefId: kpiDefId };
      await this[kpiAttrTypes.actions.FETCH_KPI_ATTRIBUTE_INFO](params);
      this.defInfo = this[kpiAttrTypes.getters.GET_KPI_ATTRIBUTE_INFO];

      this.defInfo.kpiAchType = common.filterCode(
        common.getCodeList('KPI004'),
        this.defInfo.kpiAchType,
      );
      this.defInfo.kpiPerType = common.filterCode(
        common.getCodeList('KPI007'),
        this.defInfo.kpiPerType,
      );
      this.defInfo.kpiAccType = common.filterCode(
        common.getCodeList('KPI001'),
        this.defInfo.kpiAccType,
      );
      this.defInfo.kpiCycle = common.filterCode(
        common.getCodeList('KPI002'),
        this.defInfo.kpiCycle,
      );
      this.defInfo.useYn = common.filterCode(
        common.getCodeList('G01'),
        this.defInfo.useYn,
      );
      this.$set(
        this.defInfo,
        'deptUser',
        this.defInfo.deptNm + '/' + this.defInfo.userName,
      );
      this.defInfo.kpiDefNmKO = this.defInfo.kpiDefNmKo;
      this.defInfo.kpiDefNmEN = this.defInfo.kpiDefNmEn;
      this.defInfo.kpiDefNmZH = this.defInfo.kpiDefNmZh;
      this.defInfo.kpiDefNmVN = this.defInfo.kpiDefNmVn;
      this.defInfo.kpiDefNmID = this.defInfo.kpiDefNmId;
      this.defInfo.kpiDefNmPH = this.defInfo.kpiDefNmPh;
    },
    async checkKpiDefNm(kpiNm, lang) {
      if (kpiNm != undefined) {
        //* 초기화.
        this.chkInfo = {};

        const param = { kpiDefNm: kpiNm, lang: lang };
        await this[kpiAttrTypes.actions.FETCH_KPI_ATTRIBUTE_CHECK](param);
        this.chkInfo = this[kpiAttrTypes.getters.GET_KPI_ATTRIBUTE_CHECK];
        if (this.chkInfo === null) {
          this.$set(this.GV_CHECK, `${lang}`, 0);
        } else {
          this.$set(this.GV_CHECK, `${lang}`, 1);
        }
      } else {
        //KPI명을 입력후 중복체크해주세요.
        common.alert('warning', 'NLS0001064');
      }
    },
    async searchDeptMangSinglePopup() {
      //*담당부서/담당 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.defInfo.deptUser,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        this.$set(this.defInfo, 'defDeptId', userList[0].deptId);
        this.$set(this.defInfo, 'defUserId', userList[0].userId);
        this.$set(
          this.defInfo,
          'deptUser',
          userList[0].deptNm + '/' + userList[0].userName,
        );
      } else {
        this.openUserSearchPop();
        this.defInfo.deptUser = '';
      }
    },
    //* 직원추가 팝업 OPEN
    openUserSearchPop() {
      //* 공동사용자 창 열기
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
      this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true); //*사용자/부서 팝업 띄우기
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.defInfo.deptUser,
      }); //*사용자/부서 팝업 데이터 불러오기
    },
    saveKpiAttr() {
      const param = {
        kpiDefNmKO: this.defInfo.kpiDefNmKO,
        kpiDefNmEN: this.defInfo.kpiDefNmEN,
        kpiDefNmZH: this.defInfo.kpiDefNmZH,
        kpiDefNmVN: this.defInfo.kpiDefNmVN,
        kpiDefNmID: this.defInfo.kpiDefNmID,
        kpiDefNmPH: this.defInfo.kpiDefNmPH,
        kpiAchType: this.defInfo.kpiAchType.cd,
        kpiPerType: this.defInfo.kpiPerType.cd,
        kpiAccType: this.defInfo.kpiAccType.cd,
        kpiCycle: this.defInfo.kpiCycle.cd,
        useYn: this.defInfo.useYn.cd,
        kpiDefDesc: this.defInfo.kpiDefDesc,
        defDeptId: this.defInfo.defDeptId,
        defUserId: this.defInfo.defUserId,
      };
      if (this.$route.params.kpiDefId === undefined) {
        //* 등록
        Object.entries(this.GV_CHECK).forEach(([key]) => {
          if (parseInt(this.GV_CHECK[key]) > 0) {
            //KPI명을 중복체크해주세요
            common.alert('warning', 'NLS0001065');
          }
        });
      } else {
        param.kpiDefId = this.defInfo.kpiDefId;
      }

      if (this.GV_invalid == true) {
        common.alert('warning', this.GV_errors.msg);
        return false;
      } else {
        this[kpiAttrTypes.actions.UPDATE_KPI_ATTRIBUTE_INFO](param);
      }
    },
    async deleteKpiAttr() {
      const param = {
        kpiDefId: this.defInfo.kpiDefId,
      };
      await this[kpiAttrTypes.actions.DELETE_KPI_ATTRIBUTE_INFO](param);
      this.goKpiAttrList();
    },
    goKpiAttrList() {
      this.$router.push({
        path: `/kpiAttrListPage`,
      });
    },
    onErrors(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid = invalid;
      this.GV_validated = validate;
      this.GV_errors = errors;
    },
  },
};
</script>
