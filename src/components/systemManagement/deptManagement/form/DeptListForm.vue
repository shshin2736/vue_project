<template>
  <div class="page-content-box">
    <div class="hms-grid-wrap">
      <div class="hms-treeview type1">
        <com-tree-view
          :name="name"
          :dataSource="treeListData"
          :dragDrop="dragDrop"
          :delHide="getDeptDelHide"
          @dragend="onDragEnd"
          @select="onSelect"
        ></com-tree-view>
      </div>
      <div class="hms-grid type6">
        <div class="page__btn-tbox">
          <div class="btn-box-title">
            {{ $t('NLS0000350') }}
          </div>
          <!--부서 추가 -->
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="onDeptAdd"
          >
            <span>{{ $t('NLS0000349') }}</span>
          </com-button>
          <!-- 저장 -->
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="saveDeptInfo"
          >
            <span>{{ $t('NLS0000074') }}</span>
          </com-button>
        </div>
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
                  <!-- 부서코드 -->
                  <th scope="row">
                    {{ $t('NLS0000345') }}<span class="required-text">*</span>
                  </th>
                  <td>
                    <p>
                      <span class="grid-input-form type-nobtn">
                        <com-input-text
                          v-model="deptInfo.deptCode"
                          rules="required|max:8"
                        />
                      </span>
                      <button
                        type="button"
                        class="white-btn"
                        @click="checkDeptCode"
                      >
                        <!-- 중복체크 -->
                        <span>{{ $t('NLS0000077') }}</span>
                      </button>
                      <br />
                      <!-- 등록 가능합니다.	 -->
                      <span class="grid-text-info" v-show="GV_CHECK === 0">
                        {{ $t('NLS0000798') }}
                      </span>
                      <span
                        class="grid-text-info alert"
                        v-show="GV_CHECK === 1"
                      >
                        <!-- 이미 등록된 이름입니다.	 -->
                        {{ $t('NLS0000799') }}
                      </span>
                    </p>
                  </td>
                  <!-- 부서명 -->
                  <th scope="row">
                    {{ $t('NLS0000348') }}<span class="required-text">*</span>
                  </th>
                  <td>
                    <span class="grid-input-form type-nobtn">
                      <com-input-text
                        type="text"
                        v-model="deptInfo.deptNm"
                        rules="required"
                      />
                    </span>
                  </td>
                </tr>
                <tr>
                  <!-- 부서유형 -->
                  <th scope="row">
                    {{ $t('NLS0000346') }}<span class="required-text">*</span>
                  </th>
                  <td>
                    <com-dropdowns
                      :data="deptTypeList"
                      v-model="deptType"
                      textfield="cdNm"
                      valuefield="cd"
                      rules="selected"
                      class="hms-dropdown type2"
                      @change="onChange"
                    ></com-dropdowns>
                  </td>
                  <!-- 사용여부 -->
                  <th scope="row">
                    {{ $t('NLS0000058') }}<span class="required-text">*</span>
                  </th>
                  <td>
                    <com-dropdowns
                      :data="useYnList"
                      v-model="useYn"
                      textfield="cdNm"
                      valuefield="cd"
                      rules="selected"
                      class="hms-dropdown type2"
                      @change="onChange"
                    ></com-dropdowns>
                  </td>
                </tr>
                <!-- <tr>
                  <th scope="row">순번<span class="required-text">*</span></th>
                  <td colspan="3">
                    <span class="grid-input-form type-nobtn">
                      <com-input-text
                        type="text"
                        v-model="deptInfo.sortNo"
                        rules="required|integer"
                      />
                    </span>
                  </td>
                </tr> -->
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
        <div class="page__btn-tbox type-mt10">
          <!-- 부서 직원 정보	 -->
          <div class="btn-box-title">{{ $t('NLS0000351') }}</div>
          <!--직원 추가 -->
          <com-button
            type="button"
            class="blue-btn perm_save left_btn"
            :auth="$route.params.auth"
            @click="openUserSearchPop"
          >
            <span>{{ $t('NLS0000352') }}</span>
          </com-button>
          <!--부서권한 추가 -->
          <com-button
            type="button"
            class="blue-btn perm_save"
            :auth="$route.params.auth"
            @click="deptAdd"
          >
            <span>{{ $t('NLS0001332') }}</span>
          </com-button>
          <!--권한 삭제 -->
          <com-button
            type="button"
            class="darkgray-btn perm_delete"
            :auth="$route.params.auth"
            @click="deptDel"
          >
            <span>{{ $t('NLS0001333') }}</span>
          </com-button>
        </div>
        <com-native-grid
          :data="getdetpUserList"
          :columns="columns"
          :sortable="true"
          :sort="sort"
          @btnclick="onClick"
          height="315"
          class="dept_left"
        ></com-native-grid>
        <com-native-grid
          :data="getDeptAssigned"
          :columns="columnsB"
          :sortable="true"
          :sort="sortB"
          selectedfield="selected"
          selectedtype="checked"
          @checked="onCheck"
          @allchecked="all"
          height="315"
          class="dept_right"
        ></com-native-grid>
      </div>
    </div>
    <a ref="links" />
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComTreeView from '@/components/common/global/ComTreeView';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { departmentManagementStore, commonStore } from '@/mixins';
import * as deptTypes from '@/store/modules/systemManagement/departmentManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
  name: 'DeptListForm',
  mixins: [departmentManagementStore, commonStore],
  components: {
    ComNativeGrid,
    ComTreeView,
    ComValidateError,
    ComButton,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      name: 'deptTree',
      treeListData: {},
      dragDrop: true,
      deptCodeInfo: '',
      deptNmInfo: '',
      deptInfo: {},
      deptTypeList: [],
      useYnList: [],
      deptType: {},
      useYn: {},
      GV_invalid: '',
      GV_validated: '',
      GV_errors: {},
      GV_DEPT_ID: '',
      GV_CHECK: '',
      indexSortNo: 1,
      getData: [],
      columns: [],
      columnsB: [],
      skip: 0,
      take: 20,
      total: 0,
      sort: [{ field: 'userName', dir: 'desc' }],
      sortB: [{ field: 'deptNm', dir: 'asc' }],
      selectedCountryCd: 'KR',
    };
  },
  computed: {
    getDeptList() {
      //* 부서 treeData.
      const list = this[deptTypes.getters.GET_DEPT_LIST].map(obj => {
        obj.id = obj.deptId;
        obj.parentId = obj.parentDeptId;
        obj.expanded = true;
        obj.text = obj.deptNm;
        if (obj.useYn === 'N') {
          obj.text = `<del>${obj.deptNm}</del>`;
          obj.encoded = false;
        }
        return obj;
      });
      return list;
    },
    getdetpUserList() {
      return this[deptTypes.getters.GET_DEPT_USER_LIST];
    },
    getSelectedUserList() {
      //*선택한 사용자 목록
      const param = {
        userList: this[
          commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_LIST
        ],
        deptId: this.GV_DEPT_ID,
      };
      return param;
    },
    getDeptInfo() {
      return this[deptTypes.getters.GET_DEPT_INFO];
    },
    getDeptAssigned() {
      return this[deptTypes.getters.GET_ASSIGNED_DEPT];
    },
    getDeptDelHide() {
      return this[deptTypes.getters.GET_DEL_DEPT_HIDE];
    },
    getSelectedCountryData() {
      return this[commonTypes.getters.GET_SELECTED_COUNTRY_CODE];
    },
  },
  watch: {
    getDeptList: function(list) {
      let returnList = [];
      list.forEach(obj => {
        let data = { ...obj };
        if (obj.deptLevel === 1) {
          returnList.push(data);
        }
        this.makeTreeChildrenData(returnList, obj);
      });
      this.treeListData = { data: returnList };
    },
    getSelectedUserList: function(value) {
      if (value.userList.length > 0) {
        value.country = this.selectedCountryCd;
        this[deptTypes.actions.UPDATE_DEPT_USER_LIST](value);
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
      }
    },
    getDeptInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.deptInfo = value;
        this.useYn = common.filterCode(this.useYnList, value.useYn);
        this.deptType = common.filterCode(this.deptTypeList, value.deptType);
      } else {
        this.useYn = {};
        this.deptType = {};
      }
    },
    getSelectedCountryData: function(value) {
      this.selectedCountryCd = value;
    },
  },
  created() {
    this.initColumns();
    this.GV_CHECK = 2; //* 중복체크 확인 값 초기화.
    this[deptTypes.actions.INIT_ASSIGNED_DEPT]([]);
    //* get dropdown data
    this.deptTypeList = common.getCodeList('G09');
    this.useYnList = common.getCodeList('G01');

    if (this.$route.params.flag == undefined) {
      this[deptTypes.actions.INIT_DEPT_INFO]({});
      this[deptTypes.actions.INIT_DEPT_USER_LIST]([]);
    } else {
      this.deptInfo = this.getDeptInfo;
    }
  },
  mounted() {
    this.$refs.obs.validate();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'userName',
          title: this.$t('NLS0000221'), //사용자명
          editable: false,
          format: 'button',
          cell: FunctionCell,
          className: 'left under-line-btn',
          width: 160,
        },
        {
          field: 'userId',
          editable: true,
          title: this.$t('NLS0000177'), //사번 -> 사용자ID
          className: 'center',
        },
        {
          field: 'rankCodeName',
          title: this.$t('NLS0000343'), //직위 -> 직급
          editable: true,
          className: 'center',
          width: 80,
        },
        {
          field: 'dutyNm',
          title: this.$t('NLS0000124'), //직책
          editable: true,
          className: 'center',
          width: 80,
        },
        {
          field: 'typeName',
          title: this.$t('NLS0000122'), //사용자 유형
          editable: true,
          className: 'center',
        },
        {
          field: 'activeFlagNm',
          title: this.$t('NLS0000226'), //Active 상태
          editable: true,
          className: 'center',
        },
        {
          field: 'retireYnNm',
          title: this.$t('NLS0000125'), //퇴사여부
          editable: true,
          className: 'center',
          width: 90,
        },
      ];
      this.columnsB = [
        {
          field: 'deptCode',
          // field: 'roDeptId',
          title: this.$t('NLS0000345'), //부서코드
          className: 'center',
          width: 90,
        },
        {
          field: 'deptNm',
          title: this.$t('NLS0000348'), //부서명
          className: 'left td-ellipsis',
        },
      ];
    },
    makeTreeChildrenData(rootObj, item) {
      //* treevue 구조에 맞게 데이터 구조 변경
      if (rootObj instanceof Array) {
        rootObj.forEach(obj => {
          if (obj.deptId === item.parentId) {
            obj.items = obj.items || [];
            obj.items.push(item);
          }
          return this.makeTreeChildrenData(obj.items, item);
        });
      }
    },
    onClick(rowData) {
      const links = this.$refs.links;
      links.setAttribute(
        'href',
        `/redirectForm?path=userDetailPage&auth=${this.$route.params.auth}&access=true&flag=dept&userId=${rowData.userId}`,
      );
      links.setAttribute('target', '_blank');
      links.click();
      //! 이전 경로
      // this[userTypes.actions.FETCH_USER_INFO]({ userId: rowData.userId });
      // this[userTypes.actions.FETCH_USER_ROLE_ASSIGN]({
      //   userId: rowData.userId,
      // });
      // this.$router.push({
      //   name: 'userDetailPage',
      //   params: { auth: this.$route.params.auth, access: true, flag: 'dept' },
      // });
    },
    //* tree data 선택시
    onSelect(e) {
      //* set deptInfo
      e.sender.dataItem(e.node).deptNm = e.sender
        .dataItem(e.node)
        .deptNm.trim();
      this.deptInfo = { ...e.sender.dataItem(e.node) };
      this[deptTypes.actions.INIT_DEPT_INFO](this.deptInfo);

      if (!common.isEmpty(this.deptInfo)) {
        this.deptType = common.filterCode(
          this.deptTypeList,
          this.deptInfo.deptType,
        );
        this.useYn = common.filterCode(this.useYnList, this.deptInfo.useYn);
        this.deptInfo.sortNo = this.deptInfo.sortNo.toString();
        //* set GV_DEPT_ID
        this.GV_DEPT_ID = this.deptInfo.id;
        //* set detpUserList
        const params = { srchDeptId: this.deptInfo.id, retireY: 'Y' };
        this[deptTypes.actions.FETCH_DEPT_USER_LIST](params);
        this[deptTypes.actions.FETCH_ASSIGNED_DEPT]({
          deptId: this.deptInfo.id,
        });
      }

      //* 부서 중복체크 vaildation초기화.
      this.GV_CHECK = 2;
    },
    //* 부서 TREE DATA
    putExpanded(items) {
      return items.reduce((acc, cur) => {
        const obj = { ...cur };
        obj.expanded = false;
        if (obj.items !== undefined) obj.items = this.putExpanded(obj.items);
        acc.push(obj);
        return acc;
      }, []);
    },
    //* 부서추가
    onDeptAdd() {
      // if (this.GV_DEPT_ID === '') {
      //   //부서 선택 후 부서추가가 가능합니다.
      //   common.alert('warning', 'NLS0001059');
      // } else {
      this.deptInfo.id = '';
      this.deptInfo.deptCode = '';
      this.deptInfo.deptNm = '';
      // this.deptInfo.sortNo = '';
      this.deptType = {};
      this.useYn = {};

      this[deptTypes.actions.INIT_DEPT_USER_LIST]([]);

      this.GV_CHECK = 2;
      // }
    },
    //* 직원추가 팝업 OPEN
    openUserSearchPop() {
      if (this.GV_DEPT_ID == '') {
        //부서 선택 후 직원추가가 가능합니다.
        common.alert('warning', 'NLS0001060');
      } else if (common.isEmpty(this.deptInfo.deptCode)) {
        //부서추가 후  직원추가가 가능합니다.
        common.alert('warning', 'NLS0001061');
      } else {
        //* 공동사용자 창 열기
        this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_LIST]([]); //*리스트초기화
        this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]); //*사용자/부서 선택값초기화
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_MULTI_POP](true); //*사용자/부서 팝업 띄우기
        this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({}); //*사용자/부서 팝업 데이터 불러오기
      }
    },
    //* 중복체크
    async checkDeptCode() {
      //* check deptCode
      if (this.deptInfo.deptCode !== undefined) {
        await this[deptTypes.actions.FETCH_DEPT_CODE]({
          deptCode: this.deptInfo.deptCode,
        });
        const data = this[deptTypes.getters.GET_DEPT_CODE];
        this.GV_CHECK = data.cnt;
      } else {
        //부서코드를 입력후 중복체크 해주세요
        common.alert('warning', 'NLS0001062');
      }
    },
    onErrors(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid = invalid;
      this.GV_validated = validate;
      this.GV_errors = errors;
    },
    //* 부서저장
    saveDeptInfo() {
      if (this.GV_DEPT_ID === '') {
        //부서 선택 후 부서추가가 가능합니다.
        //common.alert('warning', 'NLS0001059');

        // 최상위 부서에 추가하시겠습니까?
        common.confirm('NLS0001466', async () => {
          this.saveDeptInfoFn();
        });
      } else {
        this.saveDeptInfoFn();
      }
    },
    //* 부서저장
    saveDeptInfoFn() {
      var deptId = this.deptInfo.id;

      const param = {
        deptType: this.deptType.cd,
        useYn: this.useYn.cd,
        deptCode: this.deptInfo.deptCode,
        deptNm: this.deptInfo.deptNm,
        parentDeptId: this.GV_DEPT_ID === '' ? null : this.GV_DEPT_ID,
        deptId: deptId,
        country:
          this.GV_DEPT_ID === ''
            ? this.selectedCountryCd
            : this.deptInfo.country,
        sortNo: this.deptInfo.sortNo,
        deptLevel: this.GV_DEPT_ID === '' ? 1 : this.deptInfo.deptLevel + 1,
      };

      if (deptId == '') {
        //* 부서추가
        if (this.GV_CHECK === 1 || this.GV_CHECK === 2) {
          //부서코드 중복체크후 저장해주세요
          common.alert('warning', 'NLS0001063');
          return false;
        }
      } else {
        //* 부서 수정
        param.parentDeptId = this.deptInfo.parentid;
      }

      if (this.GV_invalid == true) {
        common.alert('warning', this.GV_errors.msg);
        return false;
      } else {
        this[deptTypes.actions.INSERT_DEPT_INFO](param);
      }
    },
    //* drag & drop menu 순서 변경
    onDragEnd(e, parent, treeData) {
      this.indexSortNo = 1;
      this.getData = [];
      treeData.map(item => {
        let obj = { ...item };
        this.getData.push({
          id: obj.id,
          sortNo: obj.sortNo,
          newSortNo: this.indexSortNo++,
          deptLevel: 1,
          parentId: null,
        });
        obj.deptLevel = 1;
        if (obj.items !== undefined && obj.items.length > 0) {
          this.searchTreeData(obj.items, obj);
        }
      });
      let params = {
        data: this.getData,
        country: this.selectedCountryCd,
      };
      this[deptTypes.actions.UPDATE_DEPT_TREE](params);
    },
    searchTreeData(rootObj, item) {
      if (rootObj instanceof Array) {
        rootObj.some(objVal => {
          let obj = { ...objVal };
          //*부모id 넣기
          this.getData.push({
            id: obj.id,
            sortNo: obj.sortNo,
            newSortNo: this.indexSortNo++,
            parentId: item.id,
            deptLevel: item.deptLevel + 1,
          });
          obj.deptLevel = item.deptLevel + 1;
          if (obj.items !== undefined && obj.items.length > 0) {
            this.searchTreeData(obj.items, obj);
          }
        });
      }
    },
    onCheck(row, chk) {
      const obj = this.getDeptAssigned;
      obj.reduce((acc, cur) => {
        if (cur.roDeptId === row.roDeptId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    all(rows, chk) {
      const allData = this[deptTypes.getters.GET_ASSIGNED_DEPT];
      allData.map(i => (i.selected = chk));
    },
    async deptAdd() {
      if (!common.isEmpty(this.GV_DEPT_ID)) {
        await this[commonTypes.actions.FETCH_COM_DEPT_LIST]({});
        this[deptTypes.actions.INIT_VIEWS_SRCH_DEPT_TREE]({
          flag: true,
          deptId: this.GV_DEPT_ID,
        });
      } else {
        //*부서 선택 후 부서 권한 추가가 가능합니다.
        common.alert('warning', 'NLS0001340');
      }
    },
    deptDel() {
      const deptIdList = this.getDeptAssigned.filter(
        item => item.selected === true,
      );
      if (this.GV_DEPT_ID === '') {
        //* 부서 선택 후 권한 삭제가 가능합니다.
        common.alert('warning', 'NLS0001341');
      } else {
        if (deptIdList.length > 0) {
          common.confirm('NLS0000004', async () => {
            this[deptTypes.actions.DELETE_ASSIGNED_DEPT]({
              deptIdList: deptIdList,
              deptId: this.GV_DEPT_ID,
            });
          });
        } else {
          //* 선택된 행이 없습니다.
          common.alert('warning', 'NLS0000963');
        }
      }
    },
    onChange(e) {
      const valueData = e.target.value;
      if (valueData.grpCd === 'G09') {
        this.deptType = valueData;
      } else {
        this.useYn = valueData;
      }
    },
  },
};
</script>
