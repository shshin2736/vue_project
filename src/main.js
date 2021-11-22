import Vue from 'vue'; //? Vue instance
import App from '@/App.vue'; //? App.vue
import '@/registerServiceWorker'; //? Service Worker register
import router from '@/router'; //? Router 설정
import store from '@/store'; //? Vuex 설정
import i18n from '@/plugins/i18n'; //? 다국어 설정
import kendo from '@/plugins/kendo'; //? 켄도 UI
import CKEditor from '@ckeditor/ckeditor5-vue'; //? 에디터툴
import veeValidate from '@/plugins/veeValidate'; //? 유효성 검사 설정
import globalMixins from '@/mixins/global'; //? 전역 믹스인
import vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vueMoment from 'vue-moment';
import vuex from 'vuex';

Vue.use(vuex);
Vue.use(vueMoment);
Vue.use(vuetify);
Vue.use(kendo);
Vue.use(CKEditor);
Vue.use(veeValidate);
Vue.mixin(globalMixins);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  i18n,
  vuex,
  vueMoment,
  vuetify: new vuetify(),
  render: h => h(App),
}).$mount('#app');

export { vm };
