<template>
  <div class="page__btn-bbox">
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="saveCheck"
    >
      <!-- 저장 -->
      <span>{{ $t('NLS0000074') }} </span>
    </com-button>
    <com-button
      type="button"
      class="deepdarkgray-btn perm_read"
      :auth="$route.params.auth"
      @click="goToList"
    >
      <!-- 목록 -->
      <span>{{ $t('NLS0000372') }}</span>
    </com-button>
  </div>
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { noticeStore, commonStore } from '@/mixins';
import * as noticeTypes from '@/store/modules/businessSupport/notice/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'noticeRegistrationBtnForm',
  mixins: [noticeStore, commonStore],
  components: {
    ComButton,
  },
  data() {
    return {};
  },
  computed: {
    //* 스토어에 저장된 공지사항 내용에 변동이 생긴 경우 자동으로 갱신.
    getNoticeDetail() {
      return this[noticeTypes.getters.GET_NOTICE_DETAIL];
    },
  },
  methods: {
    //* 저장 버튼 기능
    saveCheck() {
      //* 저장가능여부를 먼저 확인한다.
      let saveFlag = true;
      let altMsg = '';
      const sDate = this.getNoticeDetail.popUpStartDate;
      const eDate = this.getNoticeDetail.popUpEndDate;

      if (eDate < sDate && saveFlag === true) {
        //* 팝업사용기간의 종료일이 시작일보다 빠른 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000636';
      }

      if (
        (this.getNoticeDetail.bdTitle === '' ||
          this.getNoticeDetail.bdTitle === undefined) &&
        saveFlag === true
      ) {
        //* 제목이 공란인 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000014';
      }
      if (
        (this.getNoticeDetail.editorContent === '' ||
          this.getNoticeDetail.editorContent === undefined) &&
        saveFlag === true
      ) {
        //* 내용이 공란인 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000003';
      }
      //* 모든 양식이 제대로 작성된 경우인지 확인 후 각 상황에 맞게 처리.
      saveFlag === true ? this.saveNotice() : common.alert('warning', altMsg);
    },
    async saveNotice() {
      common.confirm('NLS0000005', async () => {
        const res = await this[noticeTypes.actions.INSERT_NOTICE_DETAIL](
          this.getNoticeDetail,
        );
        //* 저장되었다는 안내 문구 띄우기.
        //* 현재글을 등록 화면 주소가 아닌 조회 주소에서 조회하도록 이동.
        if (res.result === 'T') {
          // this.goToDetail(res.data.bdId);
          common.alert('success', 'NLS0000012', this.goToList);
        }
      });
    },
    //* 저장 후 상세 페이지로 이동.
    async goToDetail(rcvBdId) {
      try {
        await this[noticeTypes.actions.FETCH_NOTICE_DETAIL]({
          bdId: rcvBdId,
        });
        this.getFiles(rcvBdId);
      } catch (error) {
        common.alert('warning', error);
      }
    },
    async getFiles(rcvBdId) {
      await this[commonTypes.actions.INIT_FILE_INFO_LIST]([]);
      await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        ownerObjectId: rcvBdId,
        downloadType: 'notice',
      });
      common.alert('success', 'NLS0000012', () => {
        this.goToList();
      });
    },
    //* 목록 버튼 기능 - 게시판 목록으로 이동한다.
    goToList() {
      this.$router.push({
        name: 'NoticePage',
        params: { auth: this.$route.params.auth },
      });
    },
  },
};
</script>
