<template>
  <com-overlay :index="100" v-model="value" :draggable="true">
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
            <com-tree-view-search></com-tree-view-search>
            <div class="hms-grid type-nomargin">
              <com-tree-view
                :columns="columns"
                :name="name"
                :dataSource="treeListData"
                height="450"
                @select="onSelected"
              ></com-tree-view>
            </div>
            <div class="layer__btn-box">
              <button type="button" class="black-btn" @click="onAdd">
                <!-- 선택 -->
                <span>
                  {{ $t('NLS0000237') }}
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
import ComTreeViewSearch from '@/components/common/global/ComTreeViewSearch';
import ComTreeView from '@/components/common/global/ComTreeView';
import { commonStore, departmentManagementStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'ComDeptSrchPopup',
  mixins: [commonStore, departmentManagementStore],
  components: {
    ComTreeView,
    ComTreeViewSearch,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    isBuRange: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      name: 'deptTree',
      srchDeptNm: '',
      selectedDept: {},
      treeListData: {},
      columns: [],
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
    isInnerGrp() {
      return this[commonTypes.getters.GET_IS_COM_DEPT_LIST_INNER_GRPS];
    },
    getMyLowDeptInfo() {
      return this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
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
  },
  mounted() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        { field: 'deptNm', editable: true, title: 'Dept Name', width: '300' },
        { field: 'deptType', editable: true, title: 'Dept Type' },
        { field: 'useYn', editable: true, title: 'Used' },
        { field: 'updateUser', editable: true, title: 'Update User' },
        { field: 'updateDate', editable: true, title: 'Update Date' },
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
    onSelected(e) {
      // const deptInfo = { ...e.sender.dataItem(e.node) };
      this.selectedDept = { ...e.sender.dataItem(e.node) };
    },
    async onAdd() {
      if (!common.isEmpty(this.selectedDept)) {
        const { userType, parentDeptId } = this[
          commonTypes.getters.GET_USER_DATA
        ];
        const isAdmin =
          userType === 'ADMIN' || userType === 'SUPER' ? true : false;
        if (this.isBuRange) {
          await this[commonTypes.actions.FETCH_BU_INFO]({
            deptId: this.selectedDept.deptId,
          });
          const buInfo = this[commonTypes.getters.GET_BU_INFO];
          if (isAdmin) {
            this.selectedDept.parentDeptId = buInfo.deptId;
            this.selectedDept.parentDeptNm = buInfo.deptNm;
            this.setSelectedDept();
          } else {
            //* 선택한 deptId가 하위에 존재하는지 검증 후 true면 소속 BU의 deptId를 넘겨준다.
            if (this.isLowDept() || parentDeptId === this.selectedDept.deptId) {
              this.selectedDept.parentDeptId = buInfo.deptId;
              this.selectedDept.parentDeptNm = buInfo.deptNm;
              this.setSelectedDept();
            } else {
              this.notAuth();
            }
          }
        } else if (!this.isBuRange && !isAdmin) {
          this.isInnerGrp
            ? this.isLowDept()
              ? this.setSelectedDept()
              : this.notAuth()
            : this.setSelectedDept();
        } else if (!this.isBuRange && isAdmin) {
          this.setSelectedDept();
        }
      } else {
        common.alert('warning', 'NLS0001364');
      }
    },
    onClose() {
      this.srchDeptNm = '';
      this.selectedDept = {};
      this[commonTypes.actions.INIT_IS_COM_DEPT_LIST_INNER_GRPS](false);
      this.$emit('input', false);
    },
    isLowDept() {
      return this.getMyLowDeptInfo.some(
        el => el.deptId === this.selectedDept.deptId,
      );
    },
    notAuth() {
      // 선택하신 부서는 하위부서가 아닙니다.
      common.alert('warning', 'NLS0000955');
    },
    setSelectedDept() {
      this[commonTypes.actions.INIT_SELECTED_DEPT](this.selectedDept);
      this.onClose();
    },
  },
};
</script>
