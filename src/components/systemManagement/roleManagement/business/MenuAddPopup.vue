<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle">
            <div class="layer-pop__title">
              <p>Menu Tree</p>
              <button type="button" class="layer-close" @click="popupInit">
                close {{ slotProps.trigger ? '' : popupInit() }}
              </button>
            </div>
            <div class="hms-grid type-nomargin">
              <com-tree-view
                :name="name"
                :checkbox="true"
                :dataSource="{ data: getMenuListParse }"
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
import { menuManagementStore, roleManagementStore } from '@/mixins';
import * as menuTypes from '@/store/modules/systemManagement/menuManagement/types';
import * as rolemanagementTypes from '@/store/modules/systemManagement/roleManagement/types';

export default {
  name: 'MenuAddPopup',
  mixins: [menuManagementStore, roleManagementStore],
  components: {
    ComTreeView,
    ComOverlay,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: 'menuTree',
      dragDrop: true,
      checkedData: [],
    };
  },
  computed: {
    getAssignedMenuList() {
      return this[rolemanagementTypes.getters.GET_ROLE_MEMU_LIST];
    },
    getMenuList() {
      return this[menuTypes.getters.GET_MENU_LIST];
    },
    getMenuListParse() {
      const menuList = this.getMenuList;
      const assignedMenu = [];
      for (const i of this.getAssignedMenuList) {
        assignedMenu.push(i.menuId);
      }
      let temp = [];
      let treeList = [];
      for (let item of menuList) {
        if (assignedMenu.includes(item.id)) {
          item.checked = true;
          item.isAssigned = true;
        } else {
          item.checked = false;
          item.isAssigned = false;
        }
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
      return treeList;
    },
  },
  created() {
    this[menuTypes.actions.FETCH_MENU_LIST]({});
  },
  methods: {
    popupInit() {
      this.$emit('input', false);
    },
    onCheck(e, dataSource) {
      this.checkedData = dataSource.map(id => {
        return { menuId: id };
      });
    },
    onAdd() {
      this[rolemanagementTypes.actions.UPDATE_ROLE_MEMU_LIST]({
        roleId: this.$route.params.roleId,
        roleMenuData: this.checkedData,
      });
      this[menuTypes.actions.FETCH_MENU_LIST]({});
      this.$emit('input', false);
    },
  },
};
</script>
