<template>
  <div>
    <business-take-over-kpi-popup v-model="kpi"></business-take-over-kpi-popup>
    <business-take-over-assignment-popup
      v-model="assignment"
    ></business-take-over-assignment-popup>
  </div>
</template>

<script>
import { businessTakeOverStore } from '@/mixins';
import * as businessTakeOverTypes from '@/store/modules/goalSetting/businessTakeOver/types';
import BusinessTakeOverAssignmentPopup from '@/components/goalSetting/businessTakeOver/business/BusinessTakeOverAssignmentPopup';
import BusinessTakeOverKpiPopup from '@/components/goalSetting/businessTakeOver/business/BusinessTakeOverKpiPopup';
export default {
  name: 'businessTakeOverPopupForm',
  components: {
    BusinessTakeOverAssignmentPopup,
    BusinessTakeOverKpiPopup,
  },
  mixins: [businessTakeOverStore],
  computed: {
    kpi: {
      set(value) {
        this[businessTakeOverTypes.actions.INIT_VIEWS_ADD_KPI_POPUP](value);
      },
      get() {
        return this[businessTakeOverTypes.getters.GET_VIEWS_ADD_KPI_POPUP];
      },
    },
    assignment: {
      set(value) {
        this[businessTakeOverTypes.actions.INIT_VIEWS_ADD_ASSIGNMENT_POPUP](
          value,
        );
      },
      get() {
        return this[
          businessTakeOverTypes.getters.GET_VIEWS_ADD_ASSIGNMENT_POPUP
        ];
      },
    },
  },
};
</script>

<style></style>
