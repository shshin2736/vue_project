<template>
  <div class="section">
    <div
      class="res-table"
      v-for="replyObj in getQnaReplyList"
      :key="replyObj.cmId"
    >
      <div class="res-table__body">
        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000377') }}
          </div>
          <div class="res-table__col">
            <div class="type-reply">
              <com-ck-editor
                rules="requiredCK"
                types="classic"
                v-model="replyObj.cmContent"
                :disable="chkComentDisable(replyObj)"
              ></com-ck-editor>
              <div class="page__btn-bbox">
                <div class="reply-user-info">
                  <!-- 등록자 -->
                  <strong>{{ $t('NLS0000080') }}</strong>
                  <span>{{ replyObj.createName }}</span>
                  <!-- 등록일 -->
                  <strong>{{ $t('NLS0000368') }}</strong>
                  <span>{{ replyObj.createDate }}</span>
                </div>
                <com-button
                  type="button"
                  class="darkgray-btn perm_delete"
                  :auth="$route.params.auth"
                  @click="delCheck(replyObj)"
                  v-if="replyObj.isAuthrized"
                >
                  <!-- 삭제 -->
                  <span>{{ $t('NLS0000075') }}</span>
                </com-button>
                <com-button
                  type="button"
                  class="blue-btn perm_save"
                  :auth="$route.params.auth"
                  @click="saveCheck(replyObj)"
                  v-if="chkSaveDisable(replyObj)"
                >
                  <!-- 저장 -->
                  <span>{{ $t('NLS0000074') }}</span>
                </com-button>
              </div>
            </div>
          </div>
        </div>

        <div class="res-table__row">
          <div class="res-table__col res-table__col--head">
            {{ $t('NLS0000905') }}
          </div>
          <div class="res-table__col">
            <!-- 파일 업로드 공통 컴포넌트 -->
            <com-upload-file
              :drag="true"
              :toolbar="true"
              :multiple="true"
              :ownerObjectId="replyObj.cmId"
              :downloadType="setType"
              :fileList="replyObj.fileList"
              :read="disabledYn(replyObj)"
              @files="getFiles"
            ></com-upload-file>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComButton from '@/components/common/global/ComButton';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { qnaStore, commonStore } from '@/mixins';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'qnaDetailReplyBtnForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComCkEditor,
    ComButton,
    ComUploadFile,
  },
  data() {
    return {
      delShowYn: false,
      saveNewShowYn: true,
      cmContent: '',
      replyFileList: [], //* FILE 리스트
      qnaReplyId: 'qnaReplyTemp',
      setType: 'qnaReply',
    };
  },
  computed: {
    getQnaDetail() {
      return this[qnaTypes.getters.GET_QNA_DETAIL];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getQnaReplyList() {
      const data = this[qnaTypes.getters.GET_QNA_REPLY_LIST];
      const userInfo = this.getUserInfo;
      data.map(item => {
        if (
          item.createUser === userInfo.userId ||
          userInfo.userType === 'ADMIN' ||
          userInfo.userType === 'SUPER'
        ) {
          item.isAuthrized = true;
        }
      });
      return data;
    },
  },
  watch: {
    cmContent: function(value) {
      this.cmContent = value;
    },
  },
  methods: {
    //* 파일 업로드 이후 이벤트
    getFiles(files) {
      this.replyFileList = files;
    },
    //* 삭제버튼 노출 여부
    chkDelDisable(replyObj) {
      let showYn = false;
      const loginUser = this.getUserInfo.userId;

      //* 댓글로 등록된 경우
      if (!common.isEmpty(replyObj.cmId)) {
        //* 작성자가 아닌경우
        if (loginUser !== replyObj.createUser) {
          showYn = false;
          return showYn;
        }

        //* 작성자인 경우.
        const firstObjCmId = replyObj.cmId;
        const firstListCmId = this.getQnaReplyList[0].cmId;

        if (
          this.getQnaReplyList.length === 1 ||
          firstObjCmId === firstListCmId
        ) {
          showYn = false;
          return showYn;
        } else {
          showYn = true;
          return showYn;
        }
      } else {
        //* 댓글로 등록되지 않은 경우
        showYn = false;
        return showYn;
      }
    },
    //* 저장버튼 노출 여부
    chkSaveDisable(replyObj) {
      let showYn = false;
      const loginUser = this.getUserInfo;

      //* 작성자 또는 관리자인 경우
      if (
        loginUser.userId === replyObj.createUser ||
        loginUser.userType === 'ADMIN' ||
        loginUser.userType === 'SUPER'
      ) {
        showYn = true;
      } else {
        //* 작성자 또는 관리자가 아닌 경우
        showYn = false;
      }
      return showYn;
    },
    //* 댓글 내용 수정 가능 여부
    chkComentDisable(replyObj) {
      let flagYn = true;
      const loginUser = this.getUserInfo.userId;

      //* 작성된 댓글이 없는 경우 (신규댓글)
      if (common.isEmpty(replyObj.cmId)) {
        flagYn = false;
      } else {
        //* 작성된 댓글이 있는 경우 (기존댓글)
        //* 작성자가 아닌경우
        if (loginUser !== replyObj.createUser) {
          flagYn = true;
        } else {
          //* 작성자인 경우.
          flagYn = false;
        }
      }

      return flagYn;
    },
    //* 삭제 버튼 - 확인 문구
    delCheck(replyObj) {
      common.confirm('NLS0000004', async () => {
        //* 삭제 기능 실행
        const res = await this[qnaTypes.actions.DELETE_QNA_REPLY]({
          cmId: replyObj.cmId,
          fileList: replyObj.fileList,
        });
        if (res.result === 'T') {
          common.alert('success', 'NLS0000002', async () => {
            try {
              await this[qnaTypes.actions.FETCH_QNA_REPLY_LIST]({
                bdId: this.getQnaDetail.bdId,
              });
            } catch (error) {
              common.alert('warning', error);
            }
          });
        }
      });
    },
    //* 저장 버튼 - 가능여부 확인
    saveCheck(replyObj) {
      let saveFlag = true;
      let altMsg = '';
      if (
        replyObj.cmContent === '' ||
        replyObj.cmContent === null ||
        replyObj.cmContent === undefined ||
        replyObj.cmContent === '<p></p>'
      ) {
        //* 내용이 공란인 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000003';
      }
      saveFlag === true
        ? this.upStatus(replyObj)
        : common.alert('warning', altMsg);
    },
    //* 운영자 답변 저장 시 답변 완료 상태 변경
    async upStatus(replyObj) {
      const userType = this.getUserInfo.userType;
      if (
        this.getQnaReplyList.length - 1 === 0 &&
        (userType === 'ADMIN' || userType === 'SUPER')
      ) {
        const res = await this[qnaTypes.actions.UPDATE_QNA_STATUS_C]({
          upStatus: 'C',
          bdId: this.getQnaDetail.bdId,
        });
        if (res.result === 'T') {
          this.saveCmContent(replyObj);
        }
      } else {
        this.saveCmContent(replyObj);
      }
    },
    //* 저장 및 수정
    async saveCmContent(replyObj) {
      //* cmId 값이 없으면 신규 댓글이므로 저장한다.
      if (common.isEmpty(replyObj.cmId)) {
        const res = await this[qnaTypes.actions.INSERT_QNA_REPLY]({
          cmContent: replyObj.cmContent,
          bdId: this.getQnaDetail.bdId,
          fileList: this.replyFileList,
        });
        //* 저장되었다는 안내 문구 띄우기.
        if (res.result === 'T') {
          common.alert('success', 'NLS0000807', async () => {
            await this[qnaTypes.actions.FETCH_QNA_REPLY_LIST]({
              bdId: this.getQnaDetail.bdId,
            });
          });
        }
      } else {
        //* cmId 값이 있으면 기존 댓글이므로 수정한다.
        const res = await this[qnaTypes.actions.UPDATE_QNA_REPLY]({
          cmContent: replyObj.cmContent,
          cmId: replyObj.cmId,
        });
        //* 저장되었다는 안내 문구 띄우기.
        if (res.result === 'T') {
          common.alert('success', 'NLS0000807', async () => {
            await this[qnaTypes.actions.FETCH_QNA_REPLY_LIST]({
              bdId: this.getQnaDetail.bdId,
            });
          });
        }
      }
    },
    //* 첨부파일 읽기 전용 여부
    disabledYn(replyObj) {
      let disableYn = true;
      const createUser = replyObj.createUser;
      const loginUser = this.getUserInfo.userId;
      const userType = this.getUserInfo.userType;

      if (createUser === loginUser) {
        disableYn = false;
      }

      if (userType === 'ADMIN' || userType === 'SUPER') {
        disableYn = false;
      }
      return disableYn;
    },
  },
};
</script>
<style>
.type-reply .ck-editor__editable_inline {
  height: 500px;
}
</style>
