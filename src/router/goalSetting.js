export const goalSetting = [
  {
    name: 'strategyEstablishment',
    path: '/strategyEstablishment',
    component: () =>
      import(
        '@/views/goalSetting/strategyEstablishment/StrategyEstablishmentPage.vue'
      ),
  },
  {
    path: '/strategyEstablishmentInput',
    name: 'strategyEstablishmentInput',
    component: () =>
      import(
        '@/views/goalSetting/strategyEstablishment/StrategyEstablishmentInputPage.vue'
      ),
  },
  {
    name: 'kpiTargetEstablishment',
    path: '/kpiTargetEstablishment',
    component: () =>
      import(
        '@/views/goalSetting/kpiTargetEstablishment/KpiTargetEstablishmentPage.vue'
      ),
  },
  {
    name: 'kpiRegistFormPage',
    path: '/kpiRegistFormPage',
    component: () =>
      import(
        '@/views/goalSetting/kpiTargetEstablishment/KpiRegistFormPage.vue'
      ),
  },
  {
    name: 'mboManagement',
    path: '/mboManagement',
    component: () =>
      import('@/views/goalSetting/mboManagement/MboManagementPage.vue'),
  },
  {
    name: 'mboOperation',
    path: '/mboOperation',
    component: () =>
      import('@/views/goalSetting/mboOperation/MboOperationPage.vue'),
  },
  {
    name: 'testPage',
    path: '/testPage',
    component: () => import('@/views/goalSetting/test/testPage.vue'),
  },
  {
    name: 'businessTakeOverPage',
    path: '/businessTakeOverPage',
    component: () =>
      import('@/views/goalSetting/businessTakeOver/BusinessTakeOverPage.vue'),
  },
  {
    name: 'businessTakeOverTabPage',
    path: '/businessTakeOverTabPage',
    component: () =>
      import(
        '@/views/goalSetting/businessTakeOver/BusinessTakeOverTabPage.vue'
      ),
  },
  {
    name: 'kpiSystemChartTakeOverPage',
    path: '/kpiSystemChartTakeOverPage',
    component: () =>
      import(
        '@/views/goalSetting/businessTakeOver/KpiSystemChartTakeOverPage.vue'
      ),
  },
  {
    name: 'kpiSystemChartOverPage',
    path: '/kpiSystemChartOverPage',
    component: () =>
      import('@/views/goalSetting/businessTakeOver/KpiSystemChartOverPage.vue'),
  },
  // {
  //   name: 'businessTakeOverTabPage',
  //   path: '/businessTakeOverTabPage/:tkoId',
  //   component: () =>
  //     import(
  //       '@/views/goalSetting/businessTakeOver/BusinessTakeOverTabPage.vue'
  //     ),
  // },
];
