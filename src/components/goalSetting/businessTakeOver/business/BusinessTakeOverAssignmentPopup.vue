<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop szsdx">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-normal">
            <div class="layer-pop__title">
              <!--  과제 인수인계 설정 -->
              <p>{{ $t('NLS0001424') }}</p>
              <button type="button" class="layer-close" @click="onClose">
                close {{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="search__form__box kpipop-search">
              <p class="search__form__title">
                <!-- 인수자 선택 -->
                {{ $t('NLS0001425') }}
                <span class="required-text">*</span>
              </p>
              <span class="input__box type-wide type-nobtn">
                <com-input-text
                  type="text"
                  autocomplete="off"
                  v-model="srchUserName"
                  @enter="enterUserSearchPop"
                  @keyup="onKeyup"
                />
                <com-button
                  type="button"
                  class="magnifier-btn-black perm_read"
                  :auth="$route.params.auth"
                  @click="enterUserSearchPop"
                >
                </com-button>
              </span>
            </div>
            <div class="hms-grid type-nomargin">
              <div class="search__form__box kpipop-search no-margin">
                <p class="search__form__title">
                  <!-- 인계 과제 선택 -->
                  {{ $t('NLS0000156') }}
                  <span class="required-text">*</span>
                </p>
              </div>
              <com-native-grid
                :data="getSrchPrjList"
                :columns="getColumns"
                height="450"
                :resizable="true"
                selectedfield="selected"
                selectedtype="checked"
                @checked="onCheck"
                @allchecked="all"
              >
              </com-native-grid>
            </div>
            <div class="page__btn-bbox">
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="onAdd"
              >
                <!-- 추가 -->
                <span>{{ $t('NLS0000067') }}</span>
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
import { businessTakeOverStore, commonStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';

export default {
  name: 'BusinessTakeOverAssignmentPopup',
  mixins: [businessTakeOverStore, commonStore],
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
      selectedUser: {},
      srchUserName: '',
    };
  },
  computed: {
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
    getColumns() {
      return this[businessTakeOverTypes.getters.GET_SRCH_PRJ_COLUMNS];
    },
    getSrchPrjList() {
      return this[businessTakeOverTypes.getters.GET_SRCH_PRJ_LIST];
    },
    userInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getSelectedData() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getParam() {
      return this[businessTakeOverTypes.getters.GET_PARAM];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getSelectedData: function(value) {
      if (Object.keys(value).length > 0) {
        this.selectedUser = value;
        this.srchUserName = `${value.deptNm}/${value.userName}`;
      } else {
        this.srchUserName = '';
        this.selectedUser = {};
      }
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this[businessTakeOverTypes.actions.INIT_SRCH_PRJ_COLUMNS]([
        {
          field: 'prjNm',
          title: this.$t('NLS0000147'), //과제명
          width: '300px',
          className: 'left',
        },
        {
          field: 'prjGrade',
          title: this.$t('NLS0000157'), //과제등급
          width: '120px',
          className: 'left',
        },
        {
          field: 'prjStartDate', //시작일
          title: this.$t('NLS0000158'),
          width: '160px',
          className: 'center',
        },
        {
          field: 'prjEndDate', //종료일
          title: this.$t('NLS0000159'),
          width: '160px',
          className: 'center',
        },
      ]);
    },
    onCheck(row, chk) {
      this.getSrchPrjList.map(item => {
        if (row.prjId === item.prjId) {
          item.selected = chk;
        }
      });
    },
    all(rows, checked) {
      this.getSrchPrjList.map(i => (i.selected = checked));
    },
    async enterUserSearchPop() {
      //* 담당자 input 엔터시
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        srchUserNm: this.srchUserName,
      });
      let userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        this.srchUserName = `${value.deptNm}/${value.userName}`;
        this.selectedUser = value;
      } else {
        this[commonTypes.actions.INIT_DEPARTMENT_MANAGER_SRCH_PARAM]({});
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      }
    },
    onAdd() {
      const data = this.getSrchPrjList.filter(i => i.selected === true);
      const baseYy = timezone.getServerDate('YYYY');
      if (common.isEmpty(this.selectedUser) || data.length < 1) {
        // 필수입력 항목이 비었습니다.
        common.alert('warning', 'NLS0000024');
      } else {
        this[businessTakeOverTypes.actions.UPDATE_TAKEOVER_PRJ]({
          baseYyyy: baseYy,
          tkoId: this.getParam.tkoId,
          prjList: data,
          overUserId: this.selectedUser.userId,
        });
        this.onClose();
      }
    },
    onKeyup() {
      this.selectedUser = {};
    },
    onClose() {
      this.srchUserName = '';
      this.selectedUser = {};
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      this.$emit('input', false);
    },
  },
};
</script>

<style></style>
