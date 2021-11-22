<template>
  <div class="page__btn-bbox">
    <com-button
      type="button"
      class="darkgray-btn perm_delete"
      :auth="$route.params.auth"
      v-if="delShowYn"
      @click="delPost"
    >
      <!-- 삭제 -->
      <span>{{ $t('NLS0000075') }}</span>
    </com-button>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      v-if="saveShowYn"
      @click="saveCheck"
    >
      <!-- 저장 -->
      <span>{{ $t('NLS0000074') }}</span>
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
    return {
      delShowYn: false,
      saveShowYn: false,
    };
  },
  computed: {
    getSrchParam() {
      return this[noticeTypes.getters.GET_NTC_SRCH_PARAM];
    },
    //* 스토어에 저장된 공지사항 내용에 변동이 생긴 경우 자동으로 갱신.
    getNoticeDetail() {
      return this[noticeTypes.getters.GET_NOTICE_DETAIL];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
  },
  created() {
    //* 폼 생성시 삭제 버튼 활성 비활성화 여부를 정하는 함수 실행.
    this.showYn();
  },
  methods: {
    //* 버튼 활성화 여부 기능
    showYn() {
      const userType = this.getUserInfo.userType;
      const userId = this.getUserInfo.userId;
      //* 운영자 이거나, 작성자와 동일한 사용자인 경우.
      if (
        userType === 'ADMIN' ||
        userType === 'SUPER' ||
        userId === this.getNoticeDetail.createUser
      ) {
        this.delShowYn = true;
        this.saveShowYn = true;
      } else {
        this.delShowYn = false;
        this.saveShowYn = false;
      }
    },
    //* 저장 버튼 기능
    saveCheck() {
      //* 저장가능여부를 먼저 확인한다.
      let saveFlag = true;
      let altMsg = '';
      const sDate = this.getNoticeDetail.popUpStartDate;
      const eDate = this.getNoticeDetail.popUpEndDate;

      if (
        this.getNoticeDetail.bdTitle === '' ||
        this.getNoticeDetail.bdTitle === null
      ) {
        //* 제목이 공란인 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000014';
      }
      if (eDate < sDate && saveFlag === true) {
        //* 팝업사용기간의 종료일이 시작일보다 빠른 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000636';
      }

      if (
        (this.getNoticeDetail.editorContent === '' ||
          this.getNoticeDetail.editorContent === '<p></p>' ||
          this.getNoticeDetail.editorContent === null) &&
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
      const res = await this[noticeTypes.actions.UPDATE_NOTICE_DETAIL](
        this.getNoticeDetail,
      );
      //* 저장되었다는 안내 문구 띄우기.
      if (res.result === 'T') {
        common.alert('success', 'NLS0000012', this.goToList);
      }
    },
    //* 삭제 버튼 기능
    delPost() {
      common.confirm('NLS0000004', this.delNotice);
    },
    async delNotice() {
      this.getNoticeDetail.fileList = this.getFileInfo;
      try {
        await this[noticeTypes.actions.DELETE_NOTICE_DETAIL]({
          bdId: this.getNoticeDetail.bdId,
          fileList: this.getNoticeDetail.fileList,
        });
        common.alert('success', 'NLS0000002', this.goToList);
        //* 게시판 목록으로 이동한다.
        // this.goToList();
      } catch (error) {
        common.alert('warning', error);
      }
    },
    //* 목록 버튼 기능 - 게시판 목록으로 이동한다.
    goToList() {
      this.$router.push({
        name: 'NoticePage',
        params: { auth: this.$route.params.auth, detail: true },
      });
    },
  },
};
</script>
