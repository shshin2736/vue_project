<template>
  <!-- 컨텐츠 영역 -->
  <div class="page-content-box">
    <div class="hms-grid basic-table table02">
      <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
        <table>
          <colgroup>
            <col width="13%" />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 전략과제명 -->
                {{ $t('NLS0000240') }}
                <span class="required-text">*</span>
              </th>
              <td>
                <span class="grid-input-form type1">
                  <com-input-text rules="required" v-model="strategyName">
                  </com-input-text>
                </span>
              </td>
              <!-- 대상 부서 -->
              <th scope="row">
                {{ $t('NLS0001411') }}<span class="required-text">*</span>
              </th>
              <td>
                <span class="grid-input-form">
                  <com-input-text
                    rules="required"
                    :isReadOnly="true"
                    v-model="parentDepartmentName"
                  >
                  </com-input-text>
                </span>
              </td>
              <!-- 담당부서 -->
              <th scope="row">
                {{ $t('NLS0000064') }}<span class="required-text">*</span>
              </th>
              <td>
                <span class="grid-input-form">
                  <com-input-text
                    rules="required"
                    :isReadOnly="true"
                    v-model="departmentName"
                  >
                  </com-input-text>
                  <button
                    type="button"
                    class="magnifier-btn-black"
                    @click="onPopup('department')"
                  >
                    더찾기
                  </button>
                </span>
              </td>
            </tr>
            <!-- <tr>

            </tr> -->
            <tr>
              <!-- 전략과제 내용 -->
              <th scope="row">
                {{ $t('NLS0000248') }}<span class="required-text">*</span>
              </th>
              <td colspan="5">
                <span class="grid-input-form type1 stg">
                  <textarea v-model="strategyContent" rows="4" />
                </span>
              </td>
            </tr>
            <tr>
              <!-- 파일첨부 -->
              <th scope="row">{{ $t('NLS0000905') }}</th>
              <td colspan="5">
                <div class="hms-upload">
                  <!-- 파일 업로드 공통 컴포넌트 -->
                  <com-upload-file
                    :multiple="true"
                    :fileList="attachFiles"
                    :downloadType="downloadType"
                    :ownerObjectId="ownerObjectId"
                    @files="getFiles"
                  ></com-upload-file>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- ValidateError 컴포넌트 영역 -->
        <com-validate-error
          :invalid="invalid"
          :validated="validated"
          :errors="errors"
          @errors="onErrors"
        ></com-validate-error>
      </validation-observer>
    </div>
    <div class="hms-grid basic-table">
      <table>
        <colgroup>
          <col width="13%" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              KPI
              <button
                type="button"
                class="magnifier-btn-black"
                @click="onPopup('kpi')"
              >
                더찾기
              </button>
            </th>
            <td>
              <div class="hms-grid grid-grid over-hidden table01">
                <table>
                  <colgroup>
                    <col width="490px" />
                    <col width="100px" />
                    <col width="70px" />
                    <col width="70px" />
                    <col width="60px" />
                    <col width="95px" />
                    <col width="95px" />
                    <col width="100px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <!-- KPI명 -> KPI -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000160') }}
                      </th>
                      <!-- 가중치 -> 중요도 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0001445') }}
                      </th>
                      <!-- 목표 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000310') }}
                      </th>
                      <!-- 실적 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000313') }}
                      </th>
                      <!-- 달성률 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000244') }}
                      </th>
                      <!-- 담당부서 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000064') }}
                      </th>
                      <!-- 담당자 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000065') }}
                      </th>
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000075') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in kpiList" :key="i">
                      <td alian="left">{{ item.kpiNm }}</td>
                      <!-- <td
                        role="weight"
                        class="t_center"
                        style="cursor:pointer"
                        @click="initEdit(item.kpiId, 'stgKpiList', true)"
                      >
                        <span v-if="!item.edit" role="weight">{{
                          item.wtRate
                        }}</span>
                        <input
                          v-else
                          ref="stgKpiWeight"
                          role="weight"
                          type="text"
                          style="text-align:right"
                          v-model="item.wtRate"
                          @keyup.enter="
                            initEdit(item.kpiId, 'stgKpiList', false)
                          "
                        />
                      </td> -->
                      <td class="t_center">
                        <com-dropdowns
                          :data="wtRateList"
                          :id="item.kpiId"
                          textfield="text"
                          valuefield="value"
                          class="hms-dropdown w100p"
                          v-model="item.wt"
                          @change="selecKpi"
                        ></com-dropdowns>
                      </td>
                      <td class="t_center">{{ item.targetYy }}</td>
                      <td class="t_center">{{ item.resultYy }}</td>
                      <td class="t_center">
                        {{ item.kpiRate ? `${item.kpiRate}%` : item.kpiRate }}
                      </td>
                      <td class="t_center">{{ item.deptNm }}</td>
                      <td class="t_center">{{ item.userNm }}</td>
                      <td class="t_center">
                        <button
                          type="button"
                          class="grid-delete-btn perm_delete"
                          style="width:65px"
                          :auth="$route.params.auth"
                          @click="removeStgKpi(item.kpiId)"
                        >
                          <span>{{ $t('NLS0000075') }}</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <!-- 과제 -->
            <th scope="row">
              {{ $t('NLS0000147') }}
              <button
                type="button"
                class="magnifier-btn-black"
                @click="onPopup('assignment')"
              >
                더찾기
              </button>
            </th>
            <td>
              <div class="hms-grid grid-grid over-hidden table01">
                <table class="table-fixed">
                  <colgroup>
                    <col width="430px" />
                    <col width="60px" />
                    <col width="100px" />
                    <col width="60px" />
                    <col width="90px" />
                    <col width="120px" />
                    <col width="120px" />
                    <col width="100px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <!-- 과제명-> 과제-->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000147') }}
                      </th>
                      <!-- 등급 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000252') }}
                      </th>
                      <!-- 가중치->중요도 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0001445') }}
                      </th>
                      <!-- 진척률 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000184') }}
                      </th>
                      <!-- 담당자 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000065') }}
                      </th>
                      <!-- 시작일 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000158') }}
                      </th>
                      <!-- 종료일 -->
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000159') }}
                      </th>
                      <th
                        scope="row"
                        style="text-align:center"
                        class="norm-ellipsis"
                      >
                        {{ $t('NLS0000075') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in prjList" :key="i">
                      <td text-alian="left">{{ item.prjNm }}</td>
                      <td class="t_center">{{ item.prjGrade }}</td>
                      <!-- <td
                        role="weight"
                        class="t_center"
                        style="cursor:pointer"
                        @click="initEdit(item.prjId, 'stgPrjList', true)"
                      >
                        <span v-if="!item.edit" role="weight">{{
                          item.wtRate
                        }}</span>
                        <input
                          v-else
                          ref="stgPrjWeight"
                          role="weight"
                          type="text"
                          style="text-align:right"
                          v-model="item.wtRate"
                          @keyup="checkWeghtValue"
                          @keyup.enter="
                            initEdit(item.prjId, 'stgPrjList', false)
                          "
                        />
                      </td> -->
                      <td class="t_center">
                        <com-dropdowns
                          :data="wtRateList"
                          :id="item.prjId"
                          textfield="text"
                          valuefield="value"
                          class="hms-dropdown w100p"
                          v-model="item.wt"
                          @change="selecPrj"
                        ></com-dropdowns>
                      </td>
                      <!-- 진척률 -->
                      <td class="t_center">{{ item.prjRate }}</td>
                      <td class="t_center">{{ item.managerName }}</td>
                      <td class="t_center">{{ item.startDate }}</td>
                      <td class="t_center">{{ item.endDate }}</td>
                      <td class="t_center">
                        <com-button
                          type="button"
                          class="grid-delete-btn perm_delete"
                          style="width:65px"
                          :auth="$route.params.auth"
                          @click="removeStgPrj(item.prjId)"
                        >
                          <span>{{ $t('NLS0000075') }}</span>
                        </com-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComValidateError from '@/components/common/global/ComValidateError';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { strategyEstabilshmentStore } from '@/mixins';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'StrategyEstablishmentInputForm',
  components: {
    ComValidateError,
    ComButton,
    ComInputText,
    ComUploadFile,
    ComDropdowns,
  },
  mixins: [strategyEstabilshmentStore, commonStore],
  data() {
    return {
      popupFlag: '',
      dataObj: {},
      stgId: '',
      deptId: '',
      downloadType: 'strategyUpload',
      files: [],
      prjList: [],
      kpiList: [],
      wtRate: 0,
      originKpi: [],
      originPrj: [],
      removeKpi: new Set([]),
      removePrj: new Set([]),
      HAS_CHILDREN: 'N',
      wtRateList: [],
    };
  },
  computed: {
    ownerObjectId: {
      get() {
        this.updateStrategyItem(this.getStrategyeItem.stgId, 'stgId');
        return this.checkUndefined(this.getStrategyeItem.stgId);
      },
    },

    //* 전략과제명
    strategyName: {
      set(value) {
        this.updateStrategyItem(value, 'stgNm');
      },
      get() {
        return this.checkUndefined(this.getStrategyeItem.stgNm);
      },
    },
    //* 부서명
    departmentName: {
      get() {
        return this.checkUndefined(this.getStrategyeItem.stgDeptNm);
      },
    },
    //* 부서명
    parentDepartmentName: {
      get() {
        return this.checkUndefined(this.getStrategyeItem.parentDeptNm);
      },
    },
    strategyContent: {
      set(value) {
        this.updateStrategyItem(value, 'stgContent');
      },
      get() {
        return this.checkUndefined(this.getStrategyeItem.stgContent);
      },
    },
    //* 첨부파일 가져오기
    attachFiles: {
      get() {
        return this.getStrategyeItem.attachFiles;
      },
    },
    getDataObj() {
      return this.dataObj;
    },
    //*수정 전략과제 가져오기
    getStrategyeItem() {
      return this[
        strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
      ];
    },
    //* 검색된 부서명 가져오기
    getDepartmentInfo() {
      return this[commonTypes.getters.GET_SELECTED_DEPT];
    },
    //* 검색된 과제 정보 가져오기
    getAssignmentInfo() {
      return this[commonTypes.getters.GET_ASSIGNMENT_INFO];
    },
    getAddKpiInfo() {
      return this[commonTypes.getters.GET_SELECTED_COM_KPI_POOL_LIST];
    },
  },
  watch: {
    getAddKpiInfo: function(value) {
      if (value.length > 0) {
        value.map(el => {
          el.wtRate = null;
          return el;
        });
        const preExistKpi = this.getStrategyeItem.stgKpiList; //기존에 있는 KPI
        if (preExistKpi) {
          preExistKpi.push(...value);
          this.kpiList = this.filterList(preExistKpi, 'kpi');
        } else {
          this.kpiList = this.filterList(value, 'kpi');
        }
        this[commonTypes.actions.INIT_SELECTED_COM_KPI_POOL_LIST]([]);
        this.updateStrategyItem(this.kpiList, 'stgKpiList');
      }
    },
    getAssignmentInfo: function(value) {
      if (value.length > 0) {
        value.map(el => {
          el.wtRate = null;
          return el;
        });
        const preExistPrj = this.getStrategyeItem.stgPrjList;
        if (preExistPrj) {
          preExistPrj.push(...value);
          this.prjList = this.filterList(preExistPrj, 'prj');
        } else {
          this.prjList = this.filterList(value, 'prj');
        }
        this[commonTypes.actions.INIT_ASSIGNMENT_INFO]([]);
        this.updateStrategyItem(this.prjList, 'stgPrjList');
      }
    },
    getDepartmentInfo: function(value) {
      if (!common.isEmpty(value) && this.popupFlag === 'department') {
        this.updateStrategyItem(value.id, 'stgDeptId');
        this.updateStrategyItem(value.deptNm.trim(), 'stgDeptNm');
        this.updateStrategyItem(value.parentDeptId, 'parentDeptId');
        this.updateStrategyItem(value.parentDeptNm.trim(), 'parentDeptNm');
        this[commonTypes.actions.INIT_SELECTED_DEPT]({});
      }
    },
  },
  async created() {
    this[strategyEstabilshmentTypes.actions.INIT_KPI_INFO]([]);
    this[commonTypes.actions.INIT_ASSIGNMENT_INFO]([]);
    if (this.$route.params.stgId) {
      const param = {
        stg_id: this.$route.params.stgId,
        baseYyyy: this.$route.params.baseYyyy,
        downloadType: 'strategyUpload',
        ownerObjectId: this.$route.params.stgId,
      };
      await this[
        strategyEstabilshmentTypes.actions.FETCH_STRATEGY_ESTABILSHMENT_ITEM
      ](param);
      this.originKpi = this.getStrategyeItem.stgKpiList;
      this.originPrj = this.getStrategyeItem.stgPrjList;
      this.prjList = this.filterList(this.getStrategyeItem.stgPrjList, 'prj');
      this.kpiList = this.filterList(this.getStrategyeItem.stgKpiList, 'kpi');
    } else {
      const param = {
        baseYyyy: this.$route.params.baseYyyy,
        stgDeptNm: this[commonTypes.getters.GET_USER_DATA].deptNm,
        stgDeptId: this[commonTypes.getters.GET_USER_DATA].deptId,
        parentDeptId: this[commonTypes.getters.GET_USER_DATA].parentDeptId,
        parentDeptNm: this[commonTypes.getters.GET_USER_DATA].parentDeptNm,
      };
      this[strategyEstabilshmentTypes.actions.INIT_STRATEGY_ESTABILSHMENT_ITEM](
        param,
      );
    }
  },
  mounted() {
    this.$refs.obs.validate();
    // const app = document.querySelector('#app');
    // app.addEventListener('mousedown', e => {
    //   if (e.target.getAttribute('role') !== 'weight') {
    //     this.initEdit(null, 'stgPrjList', false);
    //     this.initEdit(null, 'stgKpiList', false);
    //   }
    // });
    this.wtRateList = common.getCodeList('PRJ016').map((el, idx) => {
      return { id: idx, value: el.cd, text: el.cdNm };
    });
    this.wtRateList.unshift({ value: null, text: this.$t('NLS0000237') });
  },
  // beforeDestroy() {
  //   const app = document.querySelector('#app');
  //   app.removeEventListener('click', null);
  // },
  methods: {
    checkWeghtValue(e) {
      let dot = true;
      const value = e.target.value;
      if (isNaN(Number(value))) {
        let items = value
          .split('')
          .filter((str, i) => {
            if (i === 0 && !isNaN(str) && Number(str) > 0) return true;
            else if ((i > 0 && !isNaN(Number(str))) || (dot && str === '.')) {
              dot = false;
              return true;
            } else return false;
          })
          .join('');
        e.target.value = items && !isNaN(items) ? items : 0;
      }
    },
    initEdit(id, type, flag) {
      if (type === 'stgPrjList') {
        this.wtRate = 0;
        this.prjList = this.prjList.map(item => {
          const obj = { ...item };
          this.sumWtRate(id, type, flag, obj);
          return obj;
        });
        this.$set(this.getStrategyeItem, type, this.prjList);
        setTimeout(() => {
          if (flag) this.$refs.stgPrjWeight[0].focus();
        }, 1);
      } else {
        this.wtRate = 0;
        this.kpiList = this.kpiList.map(item => {
          const obj = { ...item };
          this.sumWtRate(id, type, flag, obj);
          return obj;
        });
        this.$set(this.getStrategyeItem, type, this.kpiList);
        setTimeout(() => {
          if (flag) this.$refs.stgKpiWeight[0].focus();
        }, 1);
      }
    },
    sumWtRate(id, type, flag, obj) {
      obj.wtRate = isNaN(Number(obj.wtRate)) ? 0 : Number(obj.wtRate);
      this.wtRate += obj.wtRate;
      obj.edit = obj?.prjId
        ? obj.prjId === id
          ? flag
          : false
        : obj.kpiId === id
        ? flag
        : false;
      if (this.wtRate > 100) {
        obj.wtRate = 0;
        obj.edit = false;
        common.alert('warning', 'NLS0001257');
      }
    },
    filterList(items, type) {
      return items.reduce((prev, now) => {
        if (type === 'kpi') {
          if (!prev.some(obj => obj.kpiId == now.kpiId)) {
            now.wt = now.wtRate
              ? { value: now.wtRate, text: now.wtRate }
              : { ...this.wtRateList[0] };
            now.wtRate = now.wtRate ? now.wtRate : null;
            now.kpiRate = now.kpiRate != undefined ? `${now.kpiRate}` : null;
            if (now.targetYy != undefined) {
              if (typeof now.targetYy === 'number')
                now.targetYy = common.getDemicalComma(
                  now.targetYy,
                  now.pointCnt || 0,
                );
            } else {
              now.targetYy = null;
            }
            if (now.resultYy != undefined) {
              if (typeof now.resultYy === 'number')
                now.resultYy = common.getDemicalComma(
                  now.resultYy,
                  now.pointCnt || 0,
                );
            } else {
              now.resultYy = null;
            }
            prev.push(now);
          }
        } else {
          if (!prev.some(obj => obj.prjId == now.prjId)) {
            now.wt = now.wtRate
              ? { value: now.wtRate, text: now.wtRate }
              : { ...this.wtRateList[0] };
            now.wtRate = now.wtRate ? now.wtRate : null;
            now.prjRate = now.prjRate.toString().includes('.')
              ? Number(now.prjRate).toFixed(1)
              : now.prjRate;
            prev.push(now);
          }
        }
        return prev;
      }, []);
    },
    //* 팝업 오픈 이벤트
    onPopup(types) {
      switch (types) {
        case 'department':
          this.popupFlag = 'department';
          //* 전략과제에서 호출한 공통 부서 검색
          this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](true);
          //* 하위부서 체크를 위해 자신의 하위부서 가져오기
          this[commonTypes.actions.FETCH_LOW_DEPT_INFO_LIST]({});
          //* 자신의 부서 정보 가져오기
          this[commonTypes.actions.FETCH_COM_USER_INFO]({});
          //* 공통 부서 리스트 가져오기
          this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
          //* 팝업창 띄우기
          this[commonTypes.actions.INIT_VIEWS_COM_SRCH_DEPT_POPUP](true);

          break;
        case 'assignment':
          this.popupFlag = 'assignment';
          this[commonTypes.actions.FETCH_SEARCH_ASSIGNMENT_LIST]({
            selectedYear: this.$route.params.baseYyyy,
            // deptId: this.getStrategyeItem.stgDeptId,
          });
          this[commonTypes.actions.FETCH_YEAR_LIST]({});
          // this[commonTypes.actions.INIT_SELECTED_DEPT]({
          //   deptId: this.getStrategyeItem.stgDeptId,
          //   deptNm: this.getStrategyeItem.stgDeptNm,
          // });
          this[commonTypes.actions.INIT_VIEWS_ASSIGNMENT_SEARCH_POPUP](true);
          break;
        case 'kpi':
          this[commonTypes.actions.INIT_VIEWS_KPI_POOL_POP]({
            value: true,
            flag: 'other',
            baseYyyy: this.$route.params.baseYyyy,
          });
          break;
      }
    },
    //* 파일 업로드 이벤트
    getFiles(files) {
      this.updateStrategyItem(files, 'uploadFiles');
    },
    removeStgKpi(stgKpiId) {
      common.confirm('NLS0000004', async () => {
        if (this.originKpi.length > 0) {
          const removeItem = this.originKpi
            .filter(i => i.kpiId === stgKpiId)
            .map(i => i.kpiId);
          if (removeItem.length > 0) this.removeKpi.add(...removeItem);
          this.$set(
            this[
              strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
            ],
            'removeKpi',
            [...this.removeKpi],
          );
          this.kpiList = this.kpiList.filter(i => i.kpiId !== stgKpiId);
          this.updateStrategyItem(this.kpiList, 'stgKpiList');
        } else {
          this.kpiList = this.kpiList.filter(i => i.kpiId !== stgKpiId);
          this.updateStrategyItem(this.kpiList, 'stgKpiList');
        }
        common.alert('success', 'NLS0000002');
      });
    },
    removeStgPrj(stgPrjId) {
      common.confirm('NLS0000004', async () => {
        if (this.originPrj.length > 0) {
          const removeItem = this.originPrj
            .filter(i => i.prjId === stgPrjId)
            .map(i => i.prjId);
          if (removeItem.length > 0) this.removePrj.add(...removeItem);
          this.$set(
            this[
              strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
            ],
            'removePrj',
            [...this.removePrj],
          );
          this.prjList = this.prjList.filter(i => i.prjId !== stgPrjId);
          this.updateStrategyItem(this.prjList, 'stgPrjList');
        } else {
          this.prjList = this.prjList.filter(i => i.prjId !== stgPrjId);
          this.updateStrategyItem(this.prjList, 'stgPrjList');
        }
        common.alert('success', 'NLS0000002');
      });
    },
    checkUndefined(value) {
      const result = value === 'undefined' ? '' : value;
      return result;
    },
    updateStrategyItem(value, name) {
      this.$set(
        this[
          strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
        ],
        name,
        value,
      );
    },
    onErrors(invalid, validate) {
      if (validate) {
        //유효성 체크
        if (invalid) {
          //유효성 결과
          this[strategyEstabilshmentTypes.actions.INIT_INPUT_STRATEGY_INVALID](
            true,
          );
        } else {
          this[strategyEstabilshmentTypes.actions.INIT_INPUT_STRATEGY_INVALID](
            false,
          );
        }
      }
    },
    selecPrj(
      {
        target: {
          value: { value },
        },
      },
      key,
    ) {
      this.prjList = this.prjList.map(el => {
        if (el.prjId === key) {
          el.wt = { value, text: value };
          el.wtRate = value === '0' ? null : Number(value);
        }
        return el;
      });
      this.updateStrategyItem(this.prjList, 'stgPrjList');
    },
    selecKpi(
      {
        target: {
          value: { value },
        },
      },
      key,
    ) {
      this.kpiList = this.kpiList.map(el => {
        if (el.kpiId === key) {
          el.wt = { value, text: value };
          el.wtRate = value === '0' ? null : Number(value);
        }
        return el;
      });
      this.updateStrategyItem(this.kpiList, 'stgKpiList');
    },
  },
};
</script>
