<template>
  <div>
    <div class="footer__dashboard">
      <strong>{{ $t('NLS0000695') }} :</strong>
      <div class="footer_logo">
        <img src="@/assets/images/logo_footer.png" alt="sunjin hms--" />
      </div>
      <a href="#" @click="toAsIs">{{ $t('NLS0001138') }}</a>
      <a href="https://www.sj.co.kr/" target="_blank">{{ $t('NLS0000692') }}</a>
      <a href="http://intra.sj.co.kr/" target="_blank">{{
        $t('NLS0000693')
      }}</a>
      <a href="http://hello.sj.co.kr/" target="_blank">{{
        $t('NLS0000694')
      }}</a>
      <a href="https://www.pig-on.com" target="_blank">{{
        $t('NLS0000696')
      }}</a>
      <a href="https://www.remotemeeting.com/" target="_blank">{{
        $t('NLS0000697')
      }}</a>
    </div>
    <div class="mobile-footer__dashboard">
      <div class="family_box">
        <strong>{{ $t('NLS0000695') }} :</strong>
        <!-- <com-dropdowns
          :data="links"
          class="hms-dropdown type6"
          textfield="text"
          valuefield="func"
          v-model="selected"
          @change="onchange"
        ></com-dropdowns> -->
        <com-menu direction="top left" v-model="linksMenu" @link="link">
        </com-menu>
      </div>
    </div>
    <a ref="links" target="_blank"></a>
  </div>
</template>

<script>
import ComMenu from '@/components/common/global/ComMenu';
import * as authTypes from '@/store/modules/auth/types';
import { authStore } from '@/mixins';

export default {
  name: 'DashboardFooterForm',
  mixins: [authStore],
  components: {
    ComMenu,
  },
  data() {
    return {
      selected: { text: this.$t('NLS0000237'), func: 'toLink', link: '#' },
      linksMenu: [
        {
          title: this.$t('NLS0000237'),
          children: [
            {
              title: this.$t('NLS0000696'),
              func: 'toLink',
              link: 'https://www.pig-on.com',
            },
            { title: this.$t('NLS0001138'), func: 'toAsIs', link: '#' },
            { title: this.$t('NLS0001141'), func: 'toLink', link: '#' },
            {
              title: this.$t('NLS0000693'),
              func: 'toLink',
              link: 'http://intra.sj.co.kr/',
            },
          ],
        },
      ],
    };
  },
  methods: {
    link(items) {
      this[items.func](items.link);
    },
    onchange(e) {
      this[e.target.value.func](e.target.value);
    },
    toLink(items) {
      const links = this.$refs.links;
      links.setAttribute('href', items.link);
      links.click();
    },
    async toAsIs() {
      const { data } = await this[authTypes.actions.FETCH_SSO_LOGIN]();
      const links = this.$refs.links;
      const userId = encodeURIComponent(data.userId);
      const token = encodeURIComponent(data.token);
      links.setAttribute(
        'href',
        `${data.ssoUrl}?pMode=doSSOLogin&emp_id=${userId}&token=${token}`,
      );
      links.click();
    },
  },
};
</script>
