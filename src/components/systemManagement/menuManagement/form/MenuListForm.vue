<template>
  <div class="hms-grid-wrap">
    <div class="hms-treeview type2">
      <div class="page__btn-tbox type-nobtn">
        <!-- 메뉴 Tree	 -->
        <div class="btn-box-title">
          {{ $t('NLS0000802') }}
        </div>
      </div>
      <com-tree-view
        :name="name"
        :dragDrop="dragDrop"
        @dragend="onDragEnd"
        :dataSource="getMenuListParse"
        @select="onSelect"
      ></com-tree-view>
    </div>
    <div class="hms-grid type6">
      <div class="page__btn-tbox">
        <!-- 메뉴 정보	 -->
        <div class="btn-box-title">
          {{ $t('NLS0000100') }}
        </div>
        <!-- 메뉴 추가 -->
        <com-button
          type="button"
          class="blue-btn perm_save"
          :auth="$route.params.auth"
          @click="onMenuAdd"
        >
          <span>{{ $t('NLS0000110') }}</span>
        </com-button>
        <!-- 저장 -->
        <com-button
          type="button"
          class="blue-btn perm_save"
          :auth="$route.params.auth"
          @click="onMenuSave"
        >
          <span>{{ $t('NLS0000074') }}</span>
        </com-button>
      </div>
      <validation-observer ref="obs" v-slot="{ invalid, validated, errors }">
        <div class="hms-grid basic-table type-normal type-nomargin">
          <table>
            <colgroup>
              <col style="width:20%" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <!-- 메뉴 ID	 -->
                <th scope="row">
                  {{ $t('NLS0000101') }}<span class="required-text">*</span>
                </th>
                <td>
                  <span class="grid-input-form type-nobtn">
                    <com-input-text
                      type="text"
                      v-model="menuInfo.id"
                      :disable="true"
                    />
                  </span>
                </td>
              </tr>
              <tr v-for="item in languageList" :key="item.cdNm">
                <!-- 메뉴명 -->
                <th scope="col">
                  {{ $t('NLS0000803') }}({{ item.cd }})<span
                    class="required-text"
                    >*</span
                  >
                </th>
                <td colspan="3">
                  <span class="grid-input-form type1 type-nobtn">
                    <com-input-text
                      type="text"
                      v-model="menuInfo[`menuNm${item.cd}`]"
                      rules="required|max:80"
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <!-- 메뉴 URL	 -->
                <th scope="row">
                  {{ $t('NLS0000804') }}<span class="required-text">*</span>
                </th>
                <td>
                  <span class="grid-input-form type1 type-nobtn">
                    <com-input-text
                      type="text"
                      v-model="menuInfo.pageUrl"
                      rules="required|max:150"
                    />
                  </span>
                </td>
              </tr>
              <tr>
                <!-- 사용여부 -->
                <th scope="row">
                  {{ $t('NLS0000058') }}<span class="required-text">*</span>
                </th>
                <td>
                  <com-dropdowns
                    :data="dropdownList"
                    v-model="menuInfo.useYn"
                    class="hms-dropdown type2"
                    rules="selected"
                    textfield="cdNm"
                    valuefield="cd"
                  ></com-dropdowns>
                </td>
              </tr>
              <!-- <tr>
                <th scope="row">순번<span class="required-text">*</span></th>
                <td>
                  <span class="grid-input-form type type-nobtn">
                    <com-input-text
                      type="text"
                      v-model="menuInfo.sortNo"
                      rules="required"
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
      <!-- <div class="page__btn-tbox">
        <div class="btn-box-title">
          Page 정보
        </div>
        <button type="button" class="white-btn" @click="addPage">
          <span>Page 추가</span>
        </button>
      </div>
      <com-native-grid
        :data="functionList"
        :columns="columns"
        height="321"
        editfield="inEdit"
        :addBtnHide="true"
        :addRow="add"
        @save="onPageSave"
        @remove="onPageRemove"
        @cancel="onCancel"
      ></com-native-grid> -->
    </div>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import ComButton from '@/components/common/global/ComButton';
// import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComTreeView from '@/components/common/global/ComTreeView';
import CommandCell from '@/components/common/business/CommandCell';
import FunctionCell from '@/components/common/business/FunctionCell';
import { menuManagementStore, commonStore } from '@/mixins';
import * as menuTypes from '@/store/modules/systemManagement/menuManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'menuListPage',
  mixins: [menuManagementStore, commonStore],
  components: {
    // ComNativeGrid,
    ComTreeView,
    ComValidateError,
    ComButton,
    ComDropdowns,
    ComInputText,
  },
  data() {
    return {
      name: 'menuTree',
      useYn: {},
      indexSortNo: 1,
      getData: [],
      dragDrop: true,
      add: '',
      menuInfo: { cdNm: '', cd: '' },
      functionList: [],
      dropdownList: [],
      languageList: [],
      GV_MENU_IDS: {},
      GV_invalid: '',
      GV_validated: '',
      GV_errors: {},
      columns: [],
    };
  },
  created() {
    this.initColumns();
    this.dropdownList = common.getCodeList('G01');
    this.languageList = common.getCodeList('G05');
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getMenuList() {
      return this[menuTypes.getters.GET_MENU_LIST];
    },
    getMenuListParse() {
      const menuList = this.getMenuList;
      let temp = [];
      let treeList = [];

      // menuList[0].click();
      for (let item of menuList) {
        if (item.menuLevel == 1) {
          item.text = item.menuName;
          item.items = [];
          item.expanded = true;
          treeList.push(item);
        } else if (item.menuLevel == 2) {
          item.text = item.menuName;
          temp.push(item);
        }
      }

      for (let item1 of treeList) {
        for (let item2 of temp) {
          if (item1.id == item2.parentId) {
            item2.text = item2.menuName;
            item2.expanded = true;
            item1.items.push(item2);
          }
        }
      }
      return { data: treeList };
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
  },
  async mounted() {
    //* validation
    this.$refs.obs.validate();
    this[menuTypes.actions.FETCH_MENU_LIST]({});
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'id',
          editable: false,
          width: '110',
          title: 'Page ID',
          className: 'left',
        },
        {
          field: 'menuNmKo',
          title: this.$t('NLS0000108'), //Page 명
          editable: true,
          width: '200',
          className: 'left',
        },
        {
          field: 'pageUrl',
          editable: true,
          width: '300',
          title: 'Page Url',
          className: 'left',
        },
        {
          cell: FunctionCell,
          field: 'useYn',
          title: this.$t('NLS0000058'), //사용여부
          editable: true,
          width: '140',
          format: 'dropdown',
          editor: 'G01',
          className: 'center',
        },
        { cell: CommandCell, width: '155' },
      ];
    },
    onErrors(invalid, validate, errors) {
      //* validation check 결과값
      this.GV_invalid = invalid;
      this.GV_validated = validate;
      this.GV_errors = errors;
    },
    onSelect(e) {
      //* set menuInfo
      this.menuInfo = e.sender.dataItem(e.node);
      this.setMenuNm('D');

      this.GV_MENU_IDS = {
        id: this.menuInfo.id,
        parentId: this.menuInfo.parentId,
      };

      this.menuInfo.useYn = common.filterCode(
        common.getCodeList('G01'),
        this.menuInfo.useYn,
      );
      this.menuInfo.sortNo = this.menuInfo.sortNo.toString();

      //* set pageList
      this.setPageList(e.sender.dataItem(e.node).id);
    },
    setPageList(menuId) {
      //* set pageList
      const functionList = [];
      for (let item of this.getMenuList) {
        if (item.menuLevel == 3 && item.parentId == menuId) {
          functionList.push(item);
        }
      }
      this.functionList = functionList;
    },
    async onMenuSave() {
      if (common.isEmpty(this.menuInfo.id)) {
        this.menuInfo.parentId = this.GV_MENU_IDS.id;
      }
      if (common.isEmpty(this.menuInfo.menuLevel)) {
        this.menuInfo.menuLevel = 2;
      }

      if (this.GV_invalid) {
        common.alert('warning', this.GV_errors.msg);
        return false;
      } else {
        this.setMenuNm('P');
        let params = { ...this.menuInfo };
        params.useYn = this.menuInfo.useYn.cd;
        const data = await this[menuTypes.actions.UPDATE_MENU_LIST]({
          data: params,
        });
        this.$set(this.menuInfo, 'id', data.menuId);
        this.GV_MENU_IDS = {};
      }
    },
    onMenuAdd() {
      if (this.menuInfo.menuLevel == 1) {
        this.menuInfo = {};
        if (!this.GV_MENU_IDS.parentId) {
          this.menuInfo.parentId = this.GV_MENU_IDS.id;
        }
        this.menuInfo.useYn = this.dropdownList[0];
      } else {
        //1레벨을 선택 후, 메뉴추가해주세요.
        common.alert('warning', 'NLS0001066');
      }
    },
    onMenuRemove() {
      const param = { menuId: this.GV_MENU_IDS.id };
      this[menuTypes.actions.DELETE_MENU_LIST](param);
      this.GV_MENU_IDS = {};
      this.menuInfo = {};
    },
    async onPageSave(row) {
      row.parentId = this.GV_MENU_IDS.id;

      this.functionList.push(row);
      for (let item of this.functionList) {
        item.menuLevel = 3;
      }
      const data = await this[menuTypes.actions.UPDATE_PAGE_LIST]({
        data: this.functionList,
      });

      //* set pageList
      if (common.isEmpty(row.id)) {
        this.functionList = data.data;
      } else {
        this.setPageList(this.GV_MENU_IDS.id);
      }
      this.add = '';
    },
    async onPageRemove(row) {
      for (let item of this.functionList) {
        if (item.id == row.id) {
          this.functionList.pop();
        }
      }

      const param = { menuId: row.id };
      await this[menuTypes.actions.DELETE_MENU_LIST](param);
      this.GV_MENU_IDS = {};
    },
    //* Page추가 btn event 변경하여 사용.
    addPage() {
      if (this.add == '') {
        this.add = { inEdit: true };
      } else {
        this.add = '';
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
          menuLevel: 1,
          parentId: '',
        });
        obj.menuLevel = 1;
        if (obj.items !== undefined && obj.items.length > 0) {
          this.searchTreeData(obj.items, obj);
        }
      });
      let params = {
        data: this.getData,
      };
      this[menuTypes.actions.UPDATE_MENU_TREE](params);
    },
    searchTreeData(rootObj, item) {
      if (rootObj instanceof Array) {
        rootObj.some(objVal => {
          let obj = { ...objVal };
          //* 2레벨 메뉴의 하위로 추가되는 것 막기
          // 해당 메뉴의 하위 항목으로 넣을 수 없습니다.
          if (item.menuLevel === 2) {
            common.alert('warning', this.$t('NLS0001088'));
            return false;
          }
          //*부모id 넣기
          this.getData.push({
            id: obj.id,
            sortNo: obj.sortNo,
            newSortNo: this.indexSortNo++,
            parentId: item.id,
            menuLevel: item.menuLevel + 1,
          });
          obj.menuLevel = item.menuLevel + 1;
          if (obj.items !== undefined && obj.items.length > 0) {
            this.searchTreeData(obj.items, obj);
          }
        });
      }
    },
    setMenuNm(flag) {
      //* P : PARAM, D : DATA
      if (flag === 'P') {
        this.menuInfo.menuNmKo = this.menuInfo.menuNmKO;
        this.menuInfo.menuNmEn = this.menuInfo.menuNmEN;
        this.menuInfo.menuNmZh = this.menuInfo.menuNmZH;
        this.menuInfo.menuNmVn = this.menuInfo.menuNmVN;
        this.menuInfo.menuNmId = this.menuInfo.menuNmID;
        this.menuInfo.menuNmPh = this.menuInfo.menuNmPH;
      } else if (flag === 'D') {
        this.menuInfo.menuNmKO = this.menuInfo.menuNmKo;
        this.menuInfo.menuNmEN = this.menuInfo.menuNmEn;
        this.menuInfo.menuNmZH = this.menuInfo.menuNmZh;
        this.menuInfo.menuNmVN = this.menuInfo.menuNmVn;
        this.menuInfo.menuNmID = this.menuInfo.menuNmId;
        this.menuInfo.menuNmPH = this.menuInfo.menuNmPh;
      }
    },
    onCancel() {
      this.add = '';
    },
  },
};
</script>
