<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle">
            <div class="layer-pop__title">
              <!-- 권한 검색	 -->
              <p>{{ $t('NLS0000355') }}</p>
              <button type="button" class="layer-close" @click="onClose">
                close {{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <!-- 권한코드/권한명	 -->
                <p class="search__form__title">
                  {{ $t('NLS0000356') }}
                </p>
                <span class="input__box type-wide type-nobtn">
                  <input type="text" v-model="srchRole" />
                </span>
              </div>
              <div class="search__btn__box">
                <button type="button" class="search__btn" @click="onSrch">
                  <!-- 검색 -->
                  <span>{{ $t('NLS0000253') }}</span>
                </button>
              </div>
            </div>
            <div class="hms-grid type-nomargin">
              <com-native-grid
                :data="getRoleList"
                :columns="columns"
                height="230"
                :resizable="true"
                selectedfield="selected"
                selectedtype="checked"
                @checked="onCheck"
                @allchecked="all"
              >
              </com-native-grid>
            </div>
            <div class="layer__btn-box">
              <button type="button" class="black-btn" @click="onSelected">
                <!-- 선택	 -->
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
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import {
  userManagementStore,
  roleManagementStore,
  commonStore,
} from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as roleManagementTypes from '@/store/modules/systemManagement/roleManagement/types';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'UserRoleAssignPopup',
  mixins: [userManagementStore, roleManagementStore, commonStore],
  components: {
    ComNativeGrid,
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
      srchRole: '',
      columns: [],
    };
  },
  computed: {
    getRoleList() {
      return this[roleManagementTypes.getters.GET_USER_ROLE_LIST];
    },
    getUserRole() {
      return this[userManagementTypes.getters.GET_USER_ROLE];
    },
    getUserInfo() {
      return this[userManagementTypes.getters.GET_USER_INFO];
    },
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'roleId',
          width: '190px',
          title: this.$t('NLS0000112'), //권한 코드
          className: 'left',
        },
        {
          field: 'roleNm',
          width: '300px',
          title: this.$t('NLS0000113'), //권한명
          className: 'left',
        },
      ];
    },
    onClose() {
      this.$emit('input', false);
    },
    onCheck(row, chk) {
      const obj = this.getRoleList;
      obj.reduce((acc, cur) => {
        if (row.roleId === cur.roleId) {
          cur.selected = chk;
        }
        acc.push(cur);
        return acc;
      }, []);
    },
    all(rows, checked) {
      const obj = this.getRoleList;
      obj.map(i => (i.selected = checked));
    },
    onSrch() {
      this[roleManagementTypes.actions.FETCH_USER_ROLE_LIST]({
        srchRole: this.srchRole,
        exceptList: this.getUserRole,
      });
    },
    onSelected() {
      const userRoleList = this.getRoleList.filter(i => i.selected === true);
      this[userManagementTypes.actions.UPDATE_ROLE_ASSIGN]({
        list: userRoleList,
        userId: this.getUserInfo.userId,
      });
      this.$emit('input', false);
    },
  },
};
</script>
