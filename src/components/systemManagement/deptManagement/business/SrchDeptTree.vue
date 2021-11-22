<template>
  <com-overlay :index="100" v-model="flag" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-ultrasmall">
            <div class="layer-pop__title">
              <!-- 조회 부서 선택 -->
              <p>
                {{ $t('NLS0000236') }}
              </p>
              <button type="button" class="layer-close" @click="onClose">
                close {{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="search__form__box">
              <!-- 국가	 -->
              <p class="search__form__title">
                {{ $t('NLS0000214') }}
              </p>
              <com-dropdowns
                :data="srchCountryList"
                v-model="srchCountry"
                textfield="cdNm"
                valuefield="cd"
                class="hms-dropdown type2"
                @change="onChange"
              >
              </com-dropdowns>
            </div>
            <div class="hms-grid type-nomargin">
              <com-tree-view
                :columns="columns"
                :name="name"
                :dataSource="treeListData"
                :checkbox="true"
                height="450"
                @onCheck="onCheck"
              ></com-tree-view>
            </div>
            <div class="layer__btn-box">
              <button type="button" class="blue-btn" @click="onAdd">
                <!-- 추가 -->
                <span>
                  {{ $t('NLS0000067') }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>
<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComTreeView from '@/components/common/global/ComTreeView';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { commonStore, departmentManagementStore } from '@/mixins';
import * as deptTypes from '@/store/modules/systemManagement/departmentManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'SrchDeptTree',
  mixins: [commonStore, departmentManagementStore],
  components: {
    ComTreeView,
    ComOverlay,
    ComDropdowns,
  },
  props: {
    flag: {
      type: Boolean,
      required: true,
    },
    deptId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: 'deptTree',
      srchDeptNm: '',
      selectedDept: {},
      treeListData: {},
      srchCountryList: [],
      srchCountry: {},
      columns: [],
      checkedList: [],
    };
  },
  computed: {
    getDeptList() {
      //* 부서 treeData.
      const list = this[commonTypes.getters.GET_COM_DEPT_LIST].map(obj => {
        obj.id = obj.deptId;
        obj.parentId = obj.parentDeptId;
        obj.expanded = true;
        obj.text = obj.deptNm;
        obj.url = '#';
        return obj;
      });
      return list;
    },
    getAssignedDept() {
      return this[deptTypes.getters.GET_ASSIGNED_DEPT];
    },
  },
  watch: {
    getDeptList: function(list) {
      const assignedList = this.getAssignedDept;
      assignedList.forEach(item => {
        list.map(obj => {
          if (item.roDeptId === obj.deptId) {
            obj.checked = true;
          }
          return obj;
        });
      });
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
  },
  created() {
    this.setSrchCodeList();
  },
  methods: {
    setSrchCodeList() {
      this.srchCountryList = common.getCodeList('G10');
      this.srchCountry = this.srchCountryList[0];
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
    onCheck(e, data) {
      this.checkedList = data;
    },
    onChange(e) {
      this[commonTypes.actions.FETCH_COM_DEPT_LIST]({
        srchCountryCd: e.target.value.cd,
      });
    },
    onAdd() {
      this[deptTypes.actions.UPDATE_ASSIGNED_DEPT]({
        deptId: this.deptId,
        deptIdList: this.checkedList,
      });
      this.onClose();
    },
    onClose() {
      this[deptTypes.actions.INIT_VIEWS_SRCH_DEPT_TREE]({
        flag: false,
        deptId: '',
      });
    },
  },
};
</script>
