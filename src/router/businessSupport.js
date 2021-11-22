export const businessSupport = [
  {
    name: 'DataSearchPage',
    path: '/DataSearchPage',
    component: () =>
      import('@/views/businessSupport/dataSearch/DataSearchPage.vue'),
  },
  {
    name: 'NoticePage',
    path: '/NoticePage',
    component: () => import('@/views/businessSupport/notice/NoticePage.vue'),
  },
  {
    name: 'NoticeDetailPage',
    path: '/NoticeDetailPage',
    component: () =>
      import('@/views/businessSupport/notice/NoticeDetailPage.vue'),
  },
  {
    name: 'NoticeRegistrationPage',
    path: '/NoticeRegistrationPage',
    component: () =>
      import('@/views/businessSupport/notice/NoticeRegistrationPage.vue'),
  },
  {
    name: 'QnaPage',
    path: '/QnaPage',
    component: () => import('@/views/businessSupport/qna/QnaPage.vue'),
  },
  {
    name: 'QnaDetailPage',
    path: '/QnaDetailPage',
    component: () => import('@/views/businessSupport/qna/QnaDetailPage.vue'),
  },
  {
    name: 'QnaRegistrationPage',
    path: '/QnaRegistrationPage',
    component: () =>
      import('@/views/businessSupport/qna/QnaRegistrationPage.vue'),
  },
  {
    name: 'TeamBoardPage',
    path: '/TeamBoardPage',
    component: () =>
      import('@/views/businessSupport/teamBoard/TeamBoardPage.vue'),
  },
  {
    name: 'TeamSchedulePage',
    path: '/TeamSchedulePage',
    component: () =>
      import('@/views/businessSupport/teamSchedule/TeamSchedulePage.vue'),
  },
  {
    name: 'TeamBoardRegistrationPage',
    path: '/TeamBoardRegistrationPage',
    component: () =>
      import('@/views/businessSupport/teamBoard/TeamBoardRegistrationPage.vue'),
  },
  {
    name: 'TeamBoardDetailPage',
    path: '/TeamBoardDetailPage',
    component: () =>
      import('@/views/businessSupport/teamBoard/TeamBoardDetailPage.vue'),
  },
  {
    name: 'TeamScheduleDetail',
    path: '/TeamScheduleDetail',
    component: () =>
      import('@/views/businessSupport/teamSchedule/TeamScheduleDetail.vue'),
  },
];
