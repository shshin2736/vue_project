<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle">
            <div class="layer-pop__title">
              <!-- 결재라인 변경	 -->
              <p>{{ $t('NLS0000169') }}</p>
              <button type="button" class="layer-close" @click="onClose">
                close{{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="search__form__box type-block">
              <!-- 1차 결재자	 -->
              <p class="search__form__title">{{ $t('NLS0000171') }}</p>
              <span class="grid-input-form">
                <com-input-text
                  v-model="app1.app1UserName"
                  @enter="enterUserSearchPop('frst')"
                ></com-input-text>
                <button
                  type="button"
                  class="magnifier-btn-black"
                  @click="enterUserSearchPop('frst')"
                >
                  더찾기
                </button>
              </span>
            </div>
            <div class="search__form__box type-block">
              <!-- 2차 결재자	 -->
              <p class="search__form__title">{{ $t('NLS0000172') }}</p>
              <span class="grid-input-form">
                <com-input-text
                  v-model="app2.app2UserName"
                  @enter="enterUserSearchPop('snd')"
                ></com-input-text>
                <button
                  type="button"
                  class="magnifier-btn-black"
                  @click="enterUserSearchPop('snd')"
                >
                  더찾기
                </button>
              </span>
            </div>
            <div class="layer__btn-box no-border">
              <button type="button" class="blue-btn" @click="onClick">
                <!-- 저장 -->
                <span>
                  {{ $t('NLS0000074') }}
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
import ComInputText from '@/components/common/global/ComInputText';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'UpdateApprovalPopup',
  mixins: [userManagementStore, commonStore],
  components: { ComInputText, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      frst: false,
      snd: false,
      app1: {},
      app2: {},
    };
  },
  computed: {
    getSelectedData() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    getMyInfo() {
      return this[userManagementTypes.getters.GET_MY_INFO];
    },
    getApvlData() {
      return this[userManagementTypes.getters.GET_APVL_DATA];
    },
  },
  watch: {
    getSelectedData: function(val) {
      if (this.frst === true) {
        this.frst = false;
        const data = {
          app1UserId: val.userId,
          app1UserName: `${val.deptNm}/${val.userName}`,
        };
        this.app1 = data;
      } else if (this.snd === true) {
        this.snd = false;
        const data = {
          app2UserId: val.userId,
          app2UserName: `${val.deptNm}/${val.userName}`,
        };
        this.app2 = data;
      }
    },
    getApvlData(val) {
      if (val.app1UserId !== null) {
        this.app1 = {
          app1UserId: val.app1UserId,
          app1UserName: val.app1UserName,
        };
      }
      if (val.app2UserId !== null) {
        this.app2 = {
          app2UserId: val.app2UserId,
          app2UserName: val.app2UserName,
        };
      }
    },
  },
  methods: {
    async onClick() {
      if (
        Object.keys(this.app1).length !== 0 ||
        Object.keys(this.app2).length !== 0
      ) {
        const myInfo = this.getMyInfo;
        if (myInfo.pwExpDate !== null) {
          const rep = myInfo.pwExpDate.replace(/-/g, '');
          myInfo.pwExpDate = rep;
        }
        myInfo.app1UserId = this.app1.app1UserId;
        myInfo.app2UserId = this.app2.app2UserId;
        const res = await this[userManagementTypes.actions.UPDATE_APV_LINE](
          this.getMyInfo,
        );
        if (res) {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012', this.onClose);
        }
      } else {
        // 내용을 입력해 주십시오.
        common.alert('warning', 'NLS0000003');
      }
    },
    async enterUserSearchPop(type) {
      let srchNm = '';
      if (type === 'frst') {
        this.frst = true;
        srchNm = this.app1.app1UserName;
      } else {
        this.snd = true;
        srchNm = this.app2.app2UserName;
      }
      await this[commonTypes.actions.FETCH_DEPARTMENT_MANAGER_LIST]({
        exceptList: [{ userId: this.getMyInfo.userId }],
        srchUserNm: srchNm,
      });
      const userList = this[commonTypes.getters.GET_DEPARTMENT_MANAGER_LIST];
      if (userList.length === 1) {
        const value = userList[0];
        if (type === 'frst') {
          this.frst = false;
          this.app1 = {
            app1UserId: value.userId,
            app1UserName: `${value.deptNm}/${value.userName}`,
          };
        } else if (type === 'snd') {
          this.snd = false;
          this.app2 = {
            app2UserId: value.userId,
            app2UserName: `${value.deptNm}/${value.userName}`,
          };
        }
      } else {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
      }
    },
    onClose() {
      this.app1 = {
        app1UserId: this.getApvlData.app1UserId,
        app1UserName: this.getApvlData.app1UserName,
      };
      this.app2 = {
        app2UserId: this.getApvlData.app2UserId,
        app2UserName: this.getApvlData.app2UserName,
      };
      this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
      this.$emit('input', false);
    },
  },
};
</script>
