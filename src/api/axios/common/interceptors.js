import commonStore from '@/store/modules/common';
import { common } from '@/utils';

export const setInterceptors = (instance, types) => {
  // * Error 처리
  const error = async error => {
    commonStore.state.views.spinner = false;
    return Promise.reject(error);
  };
  // Add a request interceptor
  instance.interceptors.request.use(async config => {
    // Do something before request is sent
    //* SPINNER ON
    if (types) commonStore.state.views.spinner = true;
    //* 접근 URL 헤더 설정
    if (localStorage.getItem('accessInfo')) {
      const accessInfo = JSON.parse(localStorage.getItem('accessInfo'));
      config.headers['Accept-Url'] = accessInfo.path;
    } else {
      config.headers['Accept-Url'] = '/login';
    }
    config.headers['Accept-I18n'] = commonStore.state.i18nLocale.toUpperCase();
    return config;
  }, error);

  // Add a response interceptor
  instance.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (
      localStorage.getItem('accessInfo') &&
      commonStore.state.userData.hasOwnProperty('userId')
    ) {
      // ..
      if (commonStore.state.userData.userId !== response.data.sessionUserId)
        common.alert('error', 'NLS0001419', () => location.replace('/'));
    }
    if (types) commonStore.state.views.spinner = false;
    return response;
  }, error);
  return instance;
};
