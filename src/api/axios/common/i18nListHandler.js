import axios from 'axios';
import commonStore from '@/store/modules/common';
import VueI18n from 'vue-i18n';
import { vm } from '@/main';

export const getI18nList = async () => {
  try {
    const response = await axios.post(
      `api/system/getI18nInfo.do`,
      {},
      {
        headers: {
          ['Accept-Url']: '/login',
        },
      },
    );
    const data = response.data.data;
    const messages = {};
    if (response.status === 200) {
      const codeList = data.i18nCodeList.map(item => {
        messages[item.cd.toLowerCase()] = {};
        return item.cd.charAt(0) + item.cd.slice(1).toLowerCase();
      });
      for (const item of data.i18NList) {
        for (const code of codeList) {
          messages[code.toLowerCase()][item.compId] = item[`text${code}`];
        }
      }
      commonStore.state.langageCodeList = data.i18nCodeList;
      commonStore.state.i18nList = messages;
      vm._i18n = new VueI18n({
        locale: navigator.language.split('-')[0] || 'en',
        fallbackLocale: navigator.language.split('-')[0] || 'en',
        messages,
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
