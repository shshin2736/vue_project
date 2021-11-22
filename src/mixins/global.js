import { common } from '@/utils';

export default {
  // beforeCreate() {
  //   if (localStorage.getItem('locale') && this.$i18n)
  //     this.$i18n.locale = localStorage.getItem('locale');
  // },
  mounted() {
    setTimeout(common.setLinear, 500, false);
  },
};
