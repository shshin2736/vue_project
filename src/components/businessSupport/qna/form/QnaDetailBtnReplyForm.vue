<template>
  <!-- <div class="page__btn-bbox"> -->
  <com-button
    type="button"
    class="deepdarkgray-btn perm_save"
    :auth="$route.params.auth"
    @click="addNew"
    v-if="chkShowYn()"
  >
    <!-- 댓글추가 -->
    <span>{{ $t('NLS0000385') }} </span>
  </com-button>
  <!-- </div> -->
</template>

<script>
import ComButton from '@/components/common/global/ComButton';
import { qnaStore, commonStore } from '@/mixins';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';
import { common, timezone } from '@/utils';

export default {
  name: 'qnaDetailBtnReplyForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComButton,
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
      return this[qnaTypes.getters.GET_QNA_REPLY_LIST];
    },
  },
  async created() {
    let chkNew = this.chkAddYn();
    if (common.isEmpty(this.getQnaReplyList) && chkNew === true) {
      await this.addNew();
    } else {
      return;
    }
  },
  methods: {
    //* 답글 추가 버튼 기능. 댓글 리스트에
    //* 내용(공백), 등록자, 등록일이 입력된 객체를 추가한다.
    addNew() {
      const qnaReplyList = this.getQnaReplyList;
      const userType = this.getUserInfo.userType;
      const nowDate = this.getDate();
      const createDate = timezone.convertToClientTimeZone(
        nowDate,
        'YYYY-MM-DD',
      );
      const newObj = {
        createUser: this.getUserInfo.userId,
        createName: this.getUserInfo.userName,
        createDate: createDate,
        cmContent: '',
        ownerObjectId: 'qnaReplyTemp',
        downloadType: 'qnaReply',
      };
      const lastReply = qnaReplyList[qnaReplyList.length - 1];

      if (common.isEmpty(qnaReplyList)) {
        if (userType === 'ADMIN' || userType === 'SUPER') {
          this.getQnaReplyList.push(newObj);
        } else {
          return;
        }
      } else if (!common.isEmpty(lastReply.cmContent)) {
        if (lastReply.cmId !== undefined && lastReply.cmId !== null) {
          this.getQnaReplyList.push(newObj);
        }
      }
    },
    //* 답글 추가 버튼 노출 여부
    chkShowYn() {
      const createUser = this.getQnaDetail.createUser;
      const loginUser = this.getUserInfo.userId;
      const userType = this.getUserInfo.userType;
      let showYn = false;

      if (createUser === loginUser) {
        showYn = true;
      }

      if (userType === 'ADMIN' || userType === 'SUPER') {
        showYn = true;
      }
      return showYn;
    },
    //* 화면 진입시 빈 내용 답글 실행 여부
    chkAddYn() {
      const userType = this.getUserInfo.userType;
      let addYn = false;

      if (
        common.isEmpty(this.getQnaReplyList) &&
        (userType === 'ADMIN' || userType === 'SUPER')
      ) {
        addYn = true;
      }
      return addYn;
    },
    //* 초기 검색일 설정 관련
    getDate(option) {
      if (common.isEmpty(option)) {
        return new Date();
      } else {
        let cDate = common.isEmpty(option.date) ? new Date() : option.date;
        if (!common.isEmpty(option.mode) && !common.isEmpty(option.value)) {
          let mode = option.mode;
          let value = option.value;
          if (mode === 'year') {
            cDate.setFullYear(cDate.getFullYear() + value);
          } else if (mode === 'month') {
            cDate.setMonth(cDate.getMonth() + value);
          } else if (mode === 'day') {
            cDate.setDate(cDate.getDate() + value);
          }
        }
        return cDate;
      }
    },
  },
};
</script>
