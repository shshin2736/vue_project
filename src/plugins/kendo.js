import kendo from '@progress/kendo-ui';
import { Tooltip } from '@progress/kendo-popups-vue-wrapper';

//* 켄도 그리드 설정
export default {
  install(Vue) {
    Vue.prototype.kendo = kendo;
    Vue.component('kendo-tooltip', Tooltip);
  },
};
