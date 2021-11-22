<template>
  <div class="page__btn-bbox">
    <qna-detail-btn-reply-form></qna-detail-btn-reply-form>
    <com-button
      type="button"
      class="darkgray-btn perm_delete"
      :auth="$route.params.auth"
      @click="onDelQna"
      v-if="
        loginUserInfo.userType == 'ADMIN' ||
          loginUserInfo.userType == 'SUPER' ||
          getQnaDetail.createUser == loginUserInfo.userId
      "
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
import QnaDetailBtnReplyForm from '@/components/businessSupport/qna/form/QnaDetailBtnReplyForm';
import ComButton from '@/components/common/global/ComButton';
import { qnaStore, commonStore } from '@/mixins';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'qnaDetailBtnListForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComButton,
    QnaDetailBtnReplyForm,
  },
  data() {
    return {
      saveShowYn: false,
      loginUserInfo: {},
    };
  },
  computed: {
    //* 스토어에 저장된 공지사항 리스트에 변동이 생긴경우 자동으로 갱신
    getQnaDetail() {
      return this[qnaTypes.getters.GET_QNA_DETAIL];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getQnaReplyList() {
      const data = this[qnaTypes.getters.GET_QNA_REPLY_LIST];
      return data;
    },
    getQnaErrors() {
      return this[qnaTypes.getters.GET_QNA_ERRORS];
    },
  },
  async created() {
    this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    await this.checkShowYn();
  },
  methods: {
    checkShowYn() {
      const createUser = this.getQnaDetail.createUser;
      const loginUser = this.getUserInfo.userId;

      if (createUser === loginUser) {
        this.saveShowYn = true;
      }
    },
    //* 저장 버튼 기능
    saveCheck() {
      if (this.getQnaErrors.error) {
        common.alert('warning', this.getQnaErrors.msg);
      } else {
        this.saveQna();
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
      const res = await this[qnaTypes.actions.UPDATE_QNA_DETAIL](
        this.getQnaDetail,
      );
      //* 저장되었다는 안내 문구 띄우기.
      //* 현재글을 등록 화면 주소가 아닌 조회 주소에서 조회하도록 이동.
      if (res.result === 'T') {
        common.alert('success', 'NLS0000012', this.goToList);
      }
    },
    async onDelQna() {
      common.confirm('NLS0000004', async () => {
        const res = await this[qnaTypes.actions.DELETE_QNA_DETAIL]({
          bdId: this.getQnaDetail.bdId,
        });
        //* 삭제되었습니다.
        if (res.result === 'T') {
          common.alert('success', 'NLS0000002', this.goToList);
        }
      });
    },
    //* 목록 버튼 기능
    goToList() {
      this.$router.push({
        name: 'QnaPage',
        params: { auth: this.$route.params.auth, detail: true },
      });
    },
  },
};
</script>
