import axios from 'axios';
import commonStore from '@/store/modules/common';

//* 코드 데이터 요청
export const getUserInfo = async () => {
  try {
    const response = await axios.post(
      `api/getComUserInfo.do`,
      {},
      {
        headers: {
          ['Accept-Url']: '/login',
        },
      },
    );

    const data = response.data.data;

    if (response.status === 200) {
      commonStore.state.userData = data;
      commonStore.state.i18nLocale = data.languageCode.toLowerCase();
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
