import commonStore from '@/store/modules/common';
import authStore from '@/store/modules/auth';
import { common } from '@/utils';
import { vm } from '@/main';

//* 다국어 코드 타입
//   '000': 'NLS0000001', //? Please contact administrator
//   '300': 'NLS0000001', //? Please contact administrator
//   '302': 'NLS0000038', //? Bad credentials account
//   '303': 'NLS0000038', //? Bad credentials password
//   '702': 'NLS0000035', //? Token key is Expired
//   '999': 'NLS0000036', //? Please log in again

const criticalStatus = [401];

const isCritical = requestStatus => {
  return criticalStatus.some(status => status === requestStatus);
};

const setTimeStatus = ['ERR-1011', 'ERR-1001'];

const isSetTimeStatus = requestStatus => {
  return setTimeStatus.some(status => status === requestStatus);
};

//* 에러 핸들러
export const errorEventHandler = error => {
  let status = '';
  let messageId = '';
  if (error.response) {
    status = error.response.status ? error.response.status : 401;

    //* 내용 저장
    commonStore.state.error = error;
    //* ERROR MASSAGEID
    messageId =
      status === 401
        ? 'NLS0000036'
        : error.response.data.messageId
        ? error.response.data.messageId
        : '';
  }
  //* 스피너 정지
  commonStore.state.views.spinner = false;
  //* 코드 체크
  if (status === 404) {
    vm.$router.push('/notFound');
    return;
  }
  if (isSetTimeStatus(error.response.data.errorCode)) {
    common.alert('error', messageId ? messageId : error, null, 10); //* 경고 창
  } else {
    common.alert('error', messageId ? messageId : error); //* 경고 창
  }
  //* Critical
  if (isCritical(status)) {
    //* 스피너 정지
    commonStore.state.views.spinner = false;
    //* 로그인 여부 false
    authStore.state.views.isLogin = false;
    //* 세션 삭제
    localStorage.removeItem('accessInfo');
    //* 라우터 설정
    const from = vm.$route.path;
    //* 로그인 화면 이동
    if (from !== '/login' && from !== '/') vm.$router.push('/login');
  }
};
