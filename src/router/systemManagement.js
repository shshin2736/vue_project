export const systemManagement = [
  {
    name: 'kpiAttrListPage',
    path: '/kpiAttrListPage',
    component: () =>
      import('@/views/systemManagement/kpiManagement/KpiAttrListPage.vue'),
  },
  {
    name: 'kpiAttrDetailPage',
    path: '/kpiAttrDetailPage',
    component: () =>
      import('@/views/systemManagement/kpiManagement/KpiAttrDetailPage.vue'),
  },
  {
    name: 'menuListPage',
    path: '/menuListPage',
    component: () =>
      import('@/views/systemManagement/menuManagement/MenuListPage.vue'),
  },
  {
    name: 'rolePage',
    path: '/rolePage',
    component: () =>
      import('@/views/systemManagement/roleManagement/RolePage.vue'),
  },
  {
    path: '/userAssignPage',
    name: 'userAssignPage',
    component: () =>
      import('@/views/systemManagement/roleManagement/UserAssignPage.vue'),
  },
  {
    path: '/menuAssignPage',
    name: 'menuAssignPage',
    component: () =>
      import('@/views/systemManagement/roleManagement/MenuAssignPage.vue'),
  },
  {
    name: 'userPage',
    path: '/userPage',
    component: () =>
      import('@/views/systemManagement/userManagement/UserPage.vue'),
  },
  {
    path: '/userDetailPage',
    name: 'userDetailPage',
    component: () =>
      import('@/views/systemManagement/userManagement/UserDetailPage.vue'),
  },
  {
    name: 'codeListPage',
    path: '/codeListPage',
    component: () =>
      import('@/views/systemManagement/codeManagement/CommonCodePage.vue'),
  },
  {
    name: 'codeListrDetailPage',
    path: '/codeListrDetailPage',
    component: () =>
      import('@/views/systemManagement/codeManagement/CodeListrDetailPage.vue'),
  },
  {
    path: '/logListPage',
    component: () =>
      import('@/views/systemManagement/logManagement/LogListPage.vue'),
  },
  {
    name: 'deptListPage',
    path: '/deptListPage',
    component: () =>
      import('@/views/systemManagement/deptManagement/DeptListPage.vue'),
  },
  {
    name: 'i18nPage',
    path: '/i18nPage',
    component: () =>
      import('@/views/systemManagement/i18nManagement/I18nPage.vue'),
  },
  {
    name: 'skillFileConfigure',
    path: '/skillFileConfigure',
    component: () =>
      import(
        '@/views/systemManagement/projectExecution/SkillFileConfigure.vue'
      ),
  },
  {
    name: 'systemStatusPage',
    path: '/systemStatusPage',
    component: () =>
      import('@/views/systemManagement/systemStatus/SystemStatusPage.vue'),
  },
  // {
  //   path: '/systemManagement/logPage',
  //   component: () => import('@/views/systemManagement/LogPage.vue'),
  // },
];
