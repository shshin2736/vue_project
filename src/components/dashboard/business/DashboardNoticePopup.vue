<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-middle notice-pop">
            <div class="notice-top">
              <div class="layer-pop__title">
                <p>{{ $t('NLS0001103') }}</p>
                <button type="button" class="layer-close" @click="closePopup">
                  close {{ slotProps.trigger ? '' : closePopup() }}
                </button>
              </div>
              <div class="layer_scroll width_full">
                <!-- notice set -->
                <span v-for="notice in noticeList" :key="notice.bdId">
                  <div class="notice-bottom">
                    <span data-v-6addbfef="" class="check-form text-in">
                      <input
                        data-v-6addbfef=""
                        type="checkbox"
                        :id="notice.bdId"
                        :value="notice.bdId"
                        @change="onChange"
                      />
                      <label data-v-6addbfef="" :for="notice.bdId">
                        <span data-v-6addbfef="">{{ $t('NLS0001250') }}</span>
                      </label>
                    </span>
                  </div>
                  <p class="notice-title">
                    {{ notice.bdTitle }}
                  </p>
                  <div class="notice-con" v-html="notice.bdContent"></div>
                  <template v-if="notice.files">
                    <div
                      v-for="file in notice.files"
                      :key="file.fileId"
                      class="file-wrap"
                    >
                      <a
                        :href="
                          `api/fileDownload.do?fileId=${file.fileId}&downloadType=${downloadType}`
                        "
                      >
                        <span class="file-name">{{ file.fileName }}</span>
                      </a>
                      <span class="file-size"
                        >({{ (file.fileSize / 1000).toFixed(1) }}KB)</span
                      >
                    </div>
                  </template>
                </span>
                <!-- //notice set -->
              </div>
              <div class="layer-btn-tbox type-center">
                <button
                  type="button"
                  class="deepdarkgray-btn"
                  @click="closePopup"
                >
                  <span>{{ $t('NLS0001249') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a ref="links"></a>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import * as commonTypes from '@/store/modules/common/types';
import { commonStore } from '@/mixins';
export default {
  name: 'DashboardNoticePopup',
  mixins: [commonStore],
  components: { ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      noticeList: [],
      fileList: [],
      downloadType: 'notice',
      noShow: [],
      setDay: 7,
    };
  },
  computed: {
    getNoticeList() {
      return this[commonTypes.getters.GET_DSB_NOTICE_LIST];
    },
  },
  watch: {
    getNoticeList: function(value) {
      this.setNotice(value);
    },
  },
  mounted() {
    this.setNotice(this.getNoticeList);
  },
  methods: {
    closePopup() {
      if (this.noShow.length > 0)
        if (localStorage.getItem('notice')) {
          const noShow = [
            ...this.noShow,
            ...JSON.parse(localStorage.getItem('notice')),
          ];
          localStorage.setItem('notice', JSON.stringify(noShow));
        } else {
          localStorage.setItem('notice', JSON.stringify(this.noShow));
        }
      this.$emit('input', false);
    },
    onChange(e) {
      const tDate = new Date();
      tDate.setDate(tDate.getDate() + this.setDay);
      if (e.target.checked)
        this.noShow.push({ bdId: e.target.value, time: tDate.getTime() });
      else
        this.noShow = this.noShow.filter(item => item.bdId !== e.target.value);
    },
    setNotice(value) {
      this.noticeList = value;
      if (this.noticeList.length > 0) {
        if (localStorage.getItem('notice')) {
          const noShowNotice = JSON.parse(
            localStorage.getItem('notice'),
          ).filter(item => item.time > new Date().getTime());
          localStorage.setItem('notice', JSON.stringify(noShowNotice));
          const noticeList = this.noticeList.filter(
            notice => !noShowNotice.some(item => item.bdId === notice.bdId),
          );
          this.noticeList = noticeList;
        }
        this.noticeList.forEach(async notice => {
          const item = await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
            downloadType: 'notice',
            ownerObjectId: notice.bdId,
          });
          this.$set(notice, 'files', item);
          // notice.files = item;
        });
        if (this.noticeList.length > 0)
          setTimeout(() => {
            this[commonTypes.actions.INIT_VIEWS_NOTICE_POPUP](true);
          }, 1000);
      }
    },
    onClickBoardRow(bdId) {
      const links = this.$refs.links;
      links.setAttribute(
        'href',
        `/redirectForm?auth=${this.$route.params.auth}&path=NoticeDetailPage&bdId=${bdId}`,
      );
      links.setAttribute('target', '_blank');
      links.click();
    },
  },
};
</script>
