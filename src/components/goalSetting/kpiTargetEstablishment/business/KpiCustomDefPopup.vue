<template>
  <!-- kPI 맞춤속성찾기 팝업-->
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-flow">
            <div class="layer-pop__title">
              <p>{{ $t('NLS0000406') }}</p>
              <!--맞춤속성찾기-->
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <ul class="flow-arrow">
              <li
                v-for="(item, i) in tabName"
                :key="i"
                :class="{ current: item.current }"
                @click="onTab(i)"
              >
                <button type="button">
                  <span>step {{ i + 1 }}</span>
                  <em>{{ item.title }}</em>
                </button>
              </li>
            </ul>
            <div class="flow-btnbox">
              <button
                type="button"
                :value="item.value"
                v-for="(item, i) in getBoxItems"
                :key="i"
                @click="selectStep(item.step, item.value)"
              >
                <span>{{ item.title }}</span>
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
import { kpiTargetEstablishmentStore } from '@/mixins';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';

export default {
  name: 'KpiCustomDefPopup',
  components: { ComOverlay },
  mixins: [kpiTargetEstablishmentStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tabName: [
        { title: this.$t('NLS0000061'), current: true }, //*실적 달성 유형
        { title: this.$t('NLS0000059'), current: false }, //*실적 집계 방식
        { title: this.$t('NLS0000060'), current: false }, //*실적 누계 방식
        { title: this.$t('NLS0000057'), current: false }, //*측정 주기
      ],
      btnBoxItem: [
        { title: this.$t('NLS0000420'), value: '44', step: 1 }, //*증가형
        { title: this.$t('NLS0000421'), value: '45', step: 1 }, //*감소형
      ],
      btnBoxItem1: [
        { title: this.$t('NLS0000420'), value: '44', step: 1 }, //*증가형
        { title: this.$t('NLS0000421'), value: '45', step: 1 }, //*감소형
      ],
      btnBoxItem2: [
        { title: this.$t('NLS0000422'), value: '53', step: 2 }, //*수기
        { title: this.$t('NLS0000423'), value: '91', step: 2 }, //*자동 합산
      ],
      btnBoxItem3: [
        { title: this.$t('NLS0000426'), value: '31', step: 3 }, //*합계
        { title: this.$t('NLS0000427'), value: '32', step: 3 }, //*단순평균
        { title: this.$t('NLS0000428'), value: '33', step: 3 }, //*총평균
        { title: this.$t('NLS0000429'), value: '117', step: 3 }, //*기말
      ],
      btnBoxItem4: [
        { title: this.$t('NLS0000424'), value: '34', step: 4 }, //*월별
        { title: this.$t('NLS0000425'), value: '118', step: 4 }, //*주별
      ],
      selectedStepItem: {
        //* 맞춤속성데이터
        kpiAchType: '',
        kpiPerType: '',
        kpiAccType: '',
        kpiCycle: '',
      },
    };
  },
  computed: {
    getBoxItems() {
      return this.btnBoxItem;
    },
  },
  methods: {
    onTab(idx) {
      this.tabName.map(el => {
        el.current = false;
      });
      this.tabName[idx].current = true;
      if (idx == 0) {
        this.btnBoxItem = this.btnBoxItem1;
      } else if (idx == 1) {
        this.btnBoxItem = this.btnBoxItem2;
      } else if (idx == 2) {
        this.btnBoxItem = this.btnBoxItem3;
      } else if (idx == 3) {
        this.btnBoxItem = this.btnBoxItem4;
      }
    },
    selectStep(i, value) {
      if (i == 1) {
        //*step1 속성선택시 step2 open
        this.onTab(i);
        this.selectedStepItem.kpiAchType = value;
      } else if (i == 2) {
        //*step2 속성선택시 step3 open
        this.onTab(i);
        this.selectedStepItem.kpiPerType = value;
      } else if (i == 3) {
        //*step3 속성선택시 step4 open
        this.onTab(i);
        this.selectedStepItem.kpiAccType = value;
      } else if (i == 4) {
        //*step3 속성선택시 팝업닫기/속성선택 팝업오픈
        this.selectedStepItem.kpiCycle = value;
        this[kpiTargetEstablishmentTypes.actions.UPDATE_SEARCH_KPI_CUSTOM_DATA](
          this.selectedStepItem,
        );

        let param = this[
          kpiTargetEstablishmentTypes.getters.GET_SEARCH_KPI_CUSTOM_DATA
        ];
        this.$emit('input', false);
        //* 선택한 속성에 해당하는 속성선택팝업데이터가져오기
        this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_DEF_GROUP_LIST](
          param,
        );
        //* 속성선택팝업데이터 팝업 오픈
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_DEF_GROUP_POP](
          true,
        );
        this.selectedStepItem = {
          //* 맞춤속성데이터 초기화
          kpiAchType: '',
          kpiPerType: '',
          kpiAccType: '',
          kpiCycle: '',
        };
        this.onTab(0);
      }
    },
    closePopup() {
      this.$emit('input', false);
      this.onTab(0);
    },
  },
};
</script>
