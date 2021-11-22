import Vue from 'vue';
import VueRouter from 'vue-router';
import { route, common } from '@/utils';
import { businessExecution } from '@/router/businessExecution';
import { goalSetting } from '@/router/goalSetting';
import { businessSupport } from '@/router/businessSupport';
import { systemManagement } from '@/router/systemManagement';
import ErrorPage from '@/views/ErrorPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import { vm } from '@/main';

Vue.use(VueRouter);
//* 라우터 설정
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    beforeEnter(to, from, next) {
      route.setAppBar(false);
      next();
    },
  },
  {
    name: 'findAccount',
    path: '/findAccount',
    component: () => import('@/views/FindAccountPage.vue'),
  },
  {
    name: 'dashboardAfter',
    path: '/dashboardAfter',
    component: () => import('@/views/dashboard/DashboardPage.vue'),
  },
  {
    name: 'redirectForm',
    path: '/redirectForm',
    component: () => import('@/components/common/business/RedirectForm'),
  },
  ...businessExecution,
  ...goalSetting,
  ...businessSupport,
  ...systemManagement,
  {
    path: '/error',
    component: ErrorPage,
    beforeEnter(to, from, next) {
      route.setAppBar(false);
      next();
    },
  },
  {
    path: '/notFound',
    component: NotFoundPage,
    beforeEnter(to, from, next) {
      route.setAppBar(false);
      next();
    },
  },
  {
    path: '*',
    component: NotFoundPage,
    beforeEnter(to, from, next) {
      route.setAppBar(false);
      next();
    },
  },
];
//* 라우터 객체 생성
const router = new VueRouter({
  // mode: 'abstract',
  // mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// * 바이패스 설정
const bypass = path => {
  const items = ['/error', '/notFound', '/redirectForm'];
  const equal = item => path.includes(item);
  return items.some(equal);
};
//* 권한 파라메터 설정
const auth = path => {
  let auth = '';
  if (localStorage.getItem('accessInfo')) {
    const menuList = JSON.parse(localStorage.getItem('accessInfo')).menuList;
    menuList.forEach(menu => {
      if (menu.pageUrl === path) auth = menu.auth;
    });
  }
  return auth;
};
//* 전역 네비게이션 가드
router.beforeEach(async (to, from, next) => {
  if (route.getNoPush()) {
    route.setRoutePath(to.path);
    common.setLinear(false);
    common.confirm(
      'NLS0001343',
      () => {
        route.setNoPush();
        vm.$router.push(to.path);
      },
      null,
    );
    return;
  }
  //* 바이패스
  if (bypass(to.path)) {
    next();
    return;
  }

  //* 메뉴 이동시 권한 확인
  if (
    to.path !== '/login' &&
    to.path !== '/dashboardAfter' &&
    to.path !== '/findAccount' &&
    !to.params.auth
  )
    if (auth(to.path)) to.params.auth = auth(to.path);
    else if (to.path !== '/dashboardAfter' && !auth(to.path)) {
      location.replace('/dashboardAfter');
      return;
    }

  if (to.path === '/dashboardAfter') to.params.auth = 'RXSD';

  if (localStorage.getItem('accessInfo')) route.setLogin(true);

  //* 공통 코드 가져오기
  await route.fetchedCodeList();
  //* 다국어 가져오기
  await route.fechedI18nList();

  if (route.isLogin() && localStorage.getItem('accessInfo')) {
    const accessInfo = JSON.parse(localStorage.getItem('accessInfo'));
    accessInfo.path = to.path;
    localStorage.setItem('accessInfo', JSON.stringify(accessInfo));
    //* 사용자 정보 가져오기
    route.fetchUserInfo();
    route.setAppBar(true);
  } else if (localStorage.getItem('accessInfo')) {
    route.setLogin(true);
  } else if (to.path !== '/login') {
    route.setAppBar(false);
    route.setLogin(false);
    // next('/login');
    // return;
  }
  next();
});

export default router;
