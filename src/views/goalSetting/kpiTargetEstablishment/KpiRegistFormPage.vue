<template>
  <div class="page-wrap">
    <div class="page-box">
      <!-- 페이지 타이틀 영역 -->
      <!-- 신규 KPI 등록 -->
      <com-page-title :data="pageTitleList" title="NLS0000418"></com-page-title>
      <!-- 맞춤 속성 찾기 팝업 영역 -->
      <kpi-custom-def-popup v-model="openCustomDefPop"></kpi-custom-def-popup>
      <!-- 기존 KPI로 찾기 팝업 영역 -->
      <kpi-existing-def-popup
        v-model="openExistingDefPop"
      ></kpi-existing-def-popup>
      <!-- KPI 속성그룹 찾기 팝업 영역 -->
      <kpi-search-def-group-popup
        v-model="openDefGroupPop"
      ></kpi-search-def-group-popup>
      <!-- 사용자추가/공동사용자추가 팝업 영역 -->
      <manager-search-popup></manager-search-popup>
    </div>
  </div>
</template>

<script>
import ComPageTitle from '@/components/common/global/ComPageTitle';
import * as kpiTargetEstablishmentStore from '@/store/modules/goalSetting/kpiTargetEstablishment';
import * as kpiTargetEstablishmentTypes from '@/store/modules/goalSetting/kpiTargetEstablishment/types';
import KpiCustomDefPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiCustomDefPopup';
import KpiExistingDefPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiExistingDefPopup';
import KpiSearchDefGroupPopup from '@/components/goalSetting/kpiTargetEstablishment/business/KpiSearchDefGroupPopup';
import ManagerSearchPopup from '@/components/goalSetting/strategyEstabilshment/business/ManagerSearchPopup';

export default {
  name: 'KpiRegistFormPage',
  components: {
    KpiCustomDefPopup,
    KpiExistingDefPopup,
    KpiSearchDefGroupPopup,
    ManagerSearchPopup,
    ComPageTitle,
  },
  data() {
    return {
      pageTitleList: [
        { title: 'NLS0000438', link: '' }, //목표 수립
        {
          title: 'NLS0001111',
          link: 'kpiTargetEstablishment',
          params: this.$route.params,
        }, //KPI 목표 수립
        {
          title: 'NLS0000418',
          link: 'kpiRegistFormPage',
          params: this.$route.params,
        }, // 신규 KPI 등록
      ],
    };
  },
  computed: {
    //* Getters methods 가져오기
    ...kpiTargetEstablishmentStore.mapGetters({
      customDefPop:
        kpiTargetEstablishmentTypes.getters.GET_VIEWS_CUSTOM_DEF_POP,
      existingDefPop:
        kpiTargetEstablishmentTypes.getters.GET_VIEWS_EXIST_DEF_POP,
      defGroupPop: kpiTargetEstablishmentTypes.getters.GET_VIEWS_DEF_GROUP_POP,
    }),

    //* 맞춤속성찾기 팝업 ON/OFF
    openCustomDefPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CUSTOM_DEF_POP](
          value,
        );
      },
      get() {
        return this.customDefPop;
      },
    },

    //* 기존 KPI로 찾기 팝업 ON/OFF
    openExistingDefPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_EXIST_DEF_POP](
          value,
        );
      },
      get() {
        return this.existingDefPop;
      },
    },

    //* KPI속성그룹 팝업 ON/OFF
    openDefGroupPop: {
      set(value) {
        this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_DEF_GROUP_POP](
          value,
        );
      },
      get() {
        return this.defGroupPop;
      },
    },
  },
  methods: {
    //* Actions methods 가져오기
    ...kpiTargetEstablishmentStore.mapActions([
      kpiTargetEstablishmentTypes.actions.INIT_VIEWS_CUSTOM_DEF_POP,
      kpiTargetEstablishmentTypes.actions.INIT_VIEWS_EXIST_DEF_POP,
      kpiTargetEstablishmentTypes.actions.INIT_VIEWS_DEF_GROUP_POP,
    ]),
  },
};
</script>
