import axios from 'axios';
import commonstore from '@/store/modules/common';

//* 데이터 코드별 정리
function mergedCodeList(data) {
  const obj = {};
  for (const item of data) {
    if (!obj.hasOwnProperty(item.grpCd)) {
      obj[item.grpCd] = [];
    }
    obj[item.grpCd].push(item);
  }
  return obj;
}
//* 코드 데이터 요청
export const getCodeList = async () => {
  try {
    const response = await axios.post(
      `api/system/getComCodeList.do`,
      {},
      {
        headers: {
          ['Accept-Url']: '/login',
        },
      },
    );
    const data = response.data.data;

    if (response.status === 200) {
      commonstore.state.comCodeList = mergedCodeList(data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
