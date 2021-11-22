<template>
  <div class="page__btn-bbox" style="margin-bottom:75px;">
    <com-button
      v-show="isNew"
      type="button"
      :auth="$route.params.auth"
      class="blue-btn perm_save"
      @click="onSave"
    >
      <!-- 저장 -->
      <span>{{ $t('NLS0000074') }}</span>
    </com-button>

    <com-button
      v-if="isModify"
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onModify"
    >
      <!-- 수정 -->
      <span>{{ $t('NLS0000074') }}</span>
    </com-button>

    <com-button
      v-if="isDelete"
      type="button"
      :auth="$route.params.auth"
      class="darkgray-btn perm_delete"
      @click="onDelete"
    >
      <!-- 삭제 -->
      <span>{{ $t('NLS0000075') }}</span>
    </com-button>
    <button type="button" class="deepdarkgray-btn" @click="goToList">
      <!-- 목록 -->
      <span>{{ $t('NLS0000372') }}</span>
    </button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import * as commonTypes from '@/store/modules/common/types';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';
import { common } from '@/utils';

export default {
  name: 'StrategyEstablishmentInputBtnForm',
  mixins: [strategyEstabilshmentStore, commonStore],
  components: {
    ComButton,
  },
  data() {
    return {
      isNew: true,
      isModify: false,
      isDelete: false,
    };
  },
  created() {
    // const id = this.$route.params.id;
    this.HAS_CHILDREN = this.$route.params.hasChildren;
    if (this.$route.params.stgId) {
      this.isNew = false;
      this.isModify = true;
      this.isDelete = true;
    }
  },
  computed: {
    getInputStgInvalid() {
      return this[
        strategyEstabilshmentTypes.getters.GET_INPUT_STRATEGY_INVALID
      ];
    },
  },
  methods: {
    //* 전략과제 신규 등록
    // else if (!this.isValidWtRate()) {
    //     common.alert('warning', 'NLS0001257');
    //     return false;
    //   }
    onSave() {
      //* 유효성 체크
      if (this.getInputStgInvalid) {
        //필수사항 및 형식을 확인하세요.
        common.alert('warning', 'NLS0001069');
      } else {
        const param = this[
          strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
        ];
        //* 파일 다운로드 타입 지정
        param.downloadType = 'strategyUpload';
        common.confirm('NLS0000005', async () => {
          const data = await this[
            strategyEstabilshmentTypes.actions
              .INSERT_STRATEGY_ESTABILSHMENT_ITEM
          ](param);
          if (data.result === 'T') {
            this.goToList();
          }
        });
      }
    },
    //* 전략과제 수정
    onModify() {
      //  else if (!this.isValidWtRate()) {
      //   common.alert('warning', 'NLS0001257');
      //   return false;
      // }
      //* 유효성 체크
      if (this.getInputStgInvalid) {
        //This field is required
        common.alert('warning', 'NLS0001054');
        return false;
      } else {
        const param = this[
          strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
        ];
        common.confirm('NLS0000006', async () => {
          const data = await this[
            strategyEstabilshmentTypes.actions
              .UPDATE_STRATEGY_ESTABILSHMENT_ITEM
          ](param);
          if (data.result === 'T') {
            common.alert('success', 'NLS0000015');
            //* 목록으로 이동
            this.goToList();
          }
        });
      }
    },
    //* 전략과제 삭제
    onDelete() {
      if (this.HAS_CHILDREN === 'Y') {
        //하위에 다른 전략과제가 구성되어 있어, 삭제가 불가능합니다.
        common.alert('warning', 'NLS0001416');
      } else {
        common.confirm('NLS0000004', async () => {
          const param = {
            ...this[
              strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
            ],
          };
          const data = await this[
            strategyEstabilshmentTypes.actions
              .DELETE_STRATEGY_ESTABILSHMENT_ITEM
          ](param);
          if (data.result === 'T') {
            //삭제되었습니다.
            common.alert('success', 'NLS0000002');
            this.goToList();
          }
        });
      }
    },
    goToList() {
      //초기화
      this[strategyEstabilshmentTypes.actions.INIT_STRATEGY_ESTABILSHMENT_ITEM](
        {},
      );
      this[strategyEstabilshmentTypes.actions.INIT_KPI_INFO]([]);
      this[commonTypes.actions.INIT_ASSIGNMENT_INFO]([]);
      this.$router.push({
        name: `strategyEstablishment`,
        params: {
          auth: this.$route.params.auth,
          baseYyyy: this.$route.params.baseYyyy,
        },
      });
    },
    isValidWtRate() {
      //* 가중치 합계 검증
      const { stgKpiList, stgPrjList } = this[
        strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_ITEM
      ];

      if (stgKpiList.length === 0 && stgPrjList.length === 0) {
        return true;
      } else {
        let kpiWtRate = 0;
        let prjWtRate = 0;
        stgKpiList.forEach(i => (kpiWtRate += i.wtRate));
        stgPrjList.forEach(i => (prjWtRate += i.wtRate));
        if (
          (stgKpiList.length > 0 && kpiWtRate < 100) ||
          (stgPrjList.length > 0 && prjWtRate < 100)
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
  },
};
</script>

<style></style>
