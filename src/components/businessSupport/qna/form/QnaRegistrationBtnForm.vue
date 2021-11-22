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
import { qnaStore, commonStore } from '@/mixins';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'qnaRegistartionBtnForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComButton,
  },
  computed: {
    //* 스토어에 저장된 공지사항 리스트에 변동이 생긴경우 자동으로 갱신
    getQnaDetail() {
      return this[qnaTypes.getters.GET_QNA_DETAIL];
    },
    getQnaErrors() {
      return this[qnaTypes.getters.GET_QNA_ERRORS];
    },
  },
  methods: {
    //* 저장 버튼 기능
    saveCheck() {
      if (this.getQnaErrors.error) {
        common.alert('warning', this.getQnaErrors.msg);
      } else {
        common.confirm('NLS0000005', async () => {
          this.saveQna();
        });
      }

      // //* 저장가능여부를 먼저 확인한다.
      // let saveFlag = true;
      // let altMsg = '';

      // if (
      //   this.getQnaDetail.bdTitle === '' ||
      //   this.getQnaDetail.bdTitle === null
      // ) {
      //   //* 제목이 공란인 경우 알림 띄우기.
      //   saveFlag = false;
      //   altMsg = 'NLS0000014';
      // }

      // if (
      //   (this.getQnaDetail.bdContent === '' ||
      //     this.getQnaDetail.bdContent === null) &&
      //   saveFlag === true
      // ) {
      //   //* 내용이 공란인 경우 알림 띄우기.
      //   saveFlag = false;
      //   altMsg = 'NLS0000003';
      // }

      // //* 모든 양식이 제대로 작성된 경우인지 확인 후 각 상황에 맞게 처리.
      // saveFlag === true ? this.saveQna() : common.alert('warning', altMsg);
    },
    async saveQna() {
      const res = await this[qnaTypes.actions.INSERT_QNA_DETAIL](
        this.getQnaDetail,
      );
      //* 저장되었다는 안내 문구 띄우기.
      //* 현재글을 등록 화면 주소가 아닌 조회 주소에서 조회하도록 이동.
      if (res.result === 'T') {
        common.alert('success', 'NLS0000012', this.goToList);
      }
    },
    //* 저장 후 상세 페이지로 이동.
    async goToDetail(rcvBdId) {
      const res = await this[qnaTypes.actions.FETCH_QNA_DETAIL]({
        bdId: rcvBdId,
      });
      if (res.result === 'T') {
        this.initReply(rcvBdId);
      }
    },
    async initReply(rcvBdId) {
      await this[qnaTypes.actions.INIT_QNA_REPLY_LIST]([]);
      this.getFiles(rcvBdId);
    },
    async getFiles(rcvBdId) {
      await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        ownerObjectId: rcvBdId,
        downloadType: 'qna',
      });
      common.alert('success', 'NLS0000012', () => {
        this.$router.push({
          name: 'QnaDetailPage',
          params: { auth: this.$route.params.auth, bdId: rcvBdId },
        });
      });
    },
    //* 목록 버튼 기능
    goToList() {
      this.$router.push({
        name: 'QnaPage',
        params: { auth: this.$route.params.auth },
      });
    },
  },
};
</script>
