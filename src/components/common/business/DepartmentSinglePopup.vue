<template>
  <com-overlay :index="110" v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle">
            <div class="layer-pop__title">
              <!-- 사용자 검색 -->
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
                    rules=""
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
            <div class="hms-grid type-nomargin type-pointer">
              <com-native-grid
                :data="items"
                :columns="columns"
                :sortable="true"
                :sort="sort"
                :skip="skip"
                :total="total"
                height="350"
                selectedfield="selected"
                scrollable="virtual"
                @selected="onSelected"
                @pageChange="onPageChange"
                @headerSortEvent="onHeaderSortEvent"
              >
              </com-native-grid>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import HeaderSortCell from '@/components/common/business/HeaderSortCell';
import ComOverlay from '@/components/common/global/ComOverlay';
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'DepartmentSinglePopup',
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
      skip: 0,
      total: 0,
      items: [],
      sortObj: {},
      comUserDeptList: [],
      searchDeptManager: '', //* 검색 문자열
      //* 컬럼 정보
      columns: [],
      inline: false,
      sort: [{ field: 'deptNm', dir: 'asc' }],
    };
  },
  computed: {
    getUserDeptList() {
      return this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
    },
    getEditorTrigger() {
      return this[commonTypes.getters.GET_DEPARTMENT_MANAGER_EDITOR_ID];
    },
    getSrchParams() {
      return this[commonTypes.getters.GET_DEPARTMENT_MANAGER_SRCH_PARAM];
    },
    getSrchNm() {
      return this[commonTypes.getters.GET_SEARCH_DEPT_USER_NAME];
    },
  },
  watch: {
    getSrchNm(value) {
      this.searchDeptManager = value;
      this.searchUserDeptList();
    },
    getUserDeptList: function(value) {
      this.comUserDeptList = value;
      this.total = this.comUserDeptList.length;
      this.items = this.comUserDeptList.slice(this.skip, this.skip + 15);
    },
    getEditorTrigger: function() {
      this.inline = true;
    },
    items: function(value) {
      if (this.value && value.length === 1) this.onSelected(value[0]);
    },
  },
  created() {
    // this.getUserDeptList;
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
          headerCell: HeaderSortCell,
        },
        {
          field: 'userName',
          title: this.$t('NLS0000342'), //이름
          className: 'center',
          headerCell: HeaderSortCell,
        },
        {
          field: 'dutyNm',
          title: this.$t('NLS0000124'), //직책
          className: 'center',
          headerCell: HeaderSortCell,
        },
      ];
    },
    searchUserDeptList() {
      // if (this.searchDeptManager === '') return;
      //* 검색
      let param = {
        searchDeptManager: this.searchDeptManager,
        ...this.getSrchParams,
      };
      this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST](param);
    },
    onSelected(row) {
      //* 트리리스트 인라인 에디트용
      if (this.inline) {
        row[this.getEditorTrigger] = `${row.deptNm} / ${row.userName}`;
        row['info'] = `${row.deptNm} / ${row.userName}`;
      }
      //*사용자추가
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({
        ...row,
      });
      this.closePopup();
    },
    onPageChange(skip) {
      this.skip = skip;
      this.items = this.comUserDeptList.slice(this.skip, this.skip + 15);
    },
    closePopup() {
      this.searchDeptManager = '';
      this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({});
      this.$emit('input', false);
    },

    //* 헤더 클릭 이벤트
    onHeaderSortEvent(sortObj, func) {
      if (this.sortObj.type && this.sortObj.field !== sortObj.field)
        this.sortObj.type = '';
      this.func = func;
      this.sortObj = sortObj;
      this.sortHandler();
    },
    //* 정렬 이벤트
    sortHandler() {
      let tempData = this.comUserDeptList.slice(0);
      if (this.sortObj.field)
        tempData = this.func(
          tempData.slice(0),
          this.sortObj.field,
          this.sortObj.type,
        );
      this.comUserDeptList = tempData;
      this.items = this.comUserDeptList.slice(this.skip, this.skip + 10);
    },
  },
};
</script>
