import { route, common } from '@/utils';
export const businessExecution = [
  {
    path: '/KpiPerformanceListPage',
    name: 'KpiPerformanceListPage',
    component: () =>
      import(
        '@/views/businessExecution/kpiPerformance/KpiPerformanceListPage.vue'
      ),
  },
  {
    name: 'kpiPerformReport',
    path: '/kpiPerformReport',
    beforeEnter() {
      common.setLinear(false);
      route.setKpiPerformance();
    },
  },
  {
    name: 'ProjectExecutionListPage',
    path: '/ProjectExecutionListPage',
    component: () =>
      import(
        '@/views/businessExecution/projectExecution/ProjectExecutionListPage.vue'
      ),
  },
  {
    name: 'GeneralTaskPage',
    path: '/GeneralTaskPage',
    component: () =>
      import('@/views/businessExecution/projectExecution/GeneralTaskPage.vue'),
  },
  {
    name: 'ProjectExecutionDetailPage',
    path: '/ProjectExecutionDetailPage',
    component: () =>
      import(
        '@/views/businessExecution/projectExecution/ProjectExecutionDetailPage.vue'
      ),
  },
  {
    name: 'kpiGraphPage',
    path: '/kpiGraphPage',
    component: () =>
      import('@/views/businessExecution/kpiGraph/kpiGraphPage.vue'),
  },
  {
    name: 'PrjActionPage',
    path: '/PrjActionPage',
    component: () =>
      import('@/views/businessExecution/projectExecution/PrjActionPage.vue'),
  },
];
