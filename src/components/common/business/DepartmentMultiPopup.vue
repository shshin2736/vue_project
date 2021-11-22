<template>
  <com-overlay :index="110" v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle">
            <!-- 사용자 검색 -->
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000127') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="search-box type-layer">
              <div class="search__form__box">
                <!-- 부서/사용자명 -->
                <p class="search__form__title">
                  {{ $t('NLS0000126') }}
                </p>
                <span class="input__box type-wide type-nobtn">
                  <com-input-text
                    v-model="searchDeptManager"
                    @enter="searchUserDeptList"
                  ></com-input-text>
                </span>
              </div>
              <div class="search__btn__box">
                <com-button
                  type="button"
                  class="search__btn perm_read"
                  :auth="$route.params.auth"
                  @click="searchUserDeptList"
                >
                  <!-- 검색 -->
                  <span>{{ $t('NLS0000253') }}</span>
                </com-button>
              </div>
            </div>
            <div class="hms-grid type-nomargin">
              <com-native-grid
                :data="getUserDeptList"
                :columns="columns"
                :sortable="true"
                :sort="sort"
                :skip="skip"
                :total="total"
                height="350"
                selectedfield="selected"
                selectedtype="checked"
                @checked="clickCheckBox"
                @allchecked="clickAllCheckBox"
              >
              </com-native-grid>
            </div>
            <div class="layer__btn-box">
              <com-button
                type="button"
                class="black-btn perm_save"
                :auth="$route.params.auth"
                @click="addDeptManager"
              >
                <!-- 선택 -->
                <span>{{ $t('NLS0000237') }}</span>
              </com-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { common } from '@/utils';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'DepartmentMultiPopup',
  mixins: [commonStore],
  components: {
    ComNativeGrid,
    ComButton,
    ComInputText,
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
      views: {
        spinner: true,
      },
      skip: 0,
      total: 0,
      searchDeptManager: '', //* 검색 문자열
      selectedRow: [],
      //* 컬럼 정보
      columns: [],
      sort: [{ field: 'deptNm', dir: 'asc' }],
    };
  },
  computed: {
    getUserDeptList() {
      return this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
    },
    getSrchParams() {
      return this[commonTypes.getters.GET_DEPARTMENT_MANAGER_SRCH_PARAM];
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'deptNm',
          title: this.$t('NLS0000121'), //부서
          width: '180px',
          className: 'center',
        },
        {
          field: 'userName',
          title: this.$t('NLS0000342'), //이름
          className: 'center',
        },
        {
          field: 'dutyNm',
          title: this.$t('NLS0000124'), //직책
          className: 'center',
        },
        {
          field: 'deptId',
          title: '',
          width: '0px',
        },
        {
          field: 'userId',
          title: '',
          width: '0px',
        },
      ];
    },
    searchUserDeptList() {
      //* 검색
      let param = {
        searchDeptManager: this.searchDeptManager,
        ...this.getSrchParams,
      };
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
    },
    addDeptManager() {
      const selectedRow = this.getUserDeptList.filter(i => i.selected === true);
      if (selectedRow.length === 0) {
        //선택해 주십시오.
        common.alert('warning', 'NLS0000935');
        return false;
      }
      //*사용자추가
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST](
        selectedRow,
      );
      this.searchDeptManager = '';
      this.closePopup();
    },
    clickCheckBox(item, checked) {
      //* 체크박스클릭시 데이터 처리
      this.getUserDeptList.map(i => {
        if (i.userId === item.userId) i.selected = checked;
      });
    },
    clickAllCheckBox(row, chk) {
      this.getUserDeptList.map(i => (i.selected = chk));
    },
    getUserDeptFunc() {
      this.searchDeptManager = '';
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({});
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({});
    },
    closePopup() {
      this.searchDeptManager = '';
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({});
      this.$emit('input', false);
    },
  },
};
</script>
