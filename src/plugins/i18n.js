import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
  locale: navigator.language.split('-')[0] || 'ko',
  fallbackLocale: navigator.language.split('-')[0] || 'ko',
  messages: {},
});
