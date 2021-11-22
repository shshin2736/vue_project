<template>
  <div class="hms-grid basic-table">
    <table>
      <colgroup>
        <col style="width:13%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <!-- 댓글 (개)-->
          <th scope="row">
            {{ $t('NLS0000377') }} {{ total }}({{ $t('NLS0000866') }})
          </th>
          <td>
            <ul class="hms-reply">
              <li v-for="replyObj in getReplyList" :key="replyObj.cmId">
                <p>{{ replyObj.cmContent }}</p>
                {{ replyObj.createUserInfo }}
                <span>{{ replyObj.createDate }}</span>
                <com-button
                  type="button"
                  class="del-btn perm_delete"
                  :auth="$route.params.auth"
                  @click="delCheck(replyObj.cmId)"
                  v-if="showReplyYn(replyObj.createUser)"
                >
                  close
                </com-button>
              </li>
            </ul>
            <p class="grid-line">
              <span class="grid-input-form type2 type-nobtn">
                <com-input-text v-model="newCmContent"></com-input-text>
              </span>
              <com-button
                type="button"
                class="blue-btn perm_save"
                :auth="$route.params.auth"
                @click="saveCheck"
              >
                <!-- 등록 -->
                <span>{{ $t('NLS0000367') }}</span>
              </com-button>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ComInputText from '@/components/common/global/ComInputText';
import ComButton from '@/components/common/global/ComButton';
import { teamBoardStore, commonStore } from '@/mixins';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'TeamBoardDetailReplyForm',
  mixins: [teamBoardStore, commonStore],
  components: {
    ComButton,
    ComInputText,
  },
  data() {
    return {
      newCmContent: '',
      total: 0,
    };
  },
  computed: {
    getTeamBoardDetail() {
      return this[teamBoardTypes.getters.GET_TEAM_BOARD_DETAIL];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getReplyList(state) {
      //* 스토어에 저장된 댓글 리스트를 가져온다.
      const items = this[teamBoardTypes.getters.GET_REPLY_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
  },
  created() {
    this[teamBoardTypes.actions.FETCH_REPLY_LIST]({
      bdId: this.$route.params.bdId,
    });
  },
  methods: {
    showReplyYn(createUser) {
      const loginUser = this.getUserInfo.userId;
      const userType = this.getUserInfo.userType;

      let showYnFlag = false;
      //* 운영자 이거나, 작성자와 동일한 사용자인 경우.
      if (
        createUser === loginUser ||
        userType === 'ADMIN' ||
        userType === 'SUPER'
      ) {
        showYnFlag = true;
      } else {
        //* 그 외의 경우
        showYnFlag = false;
      }
      return showYnFlag;
    },
    delCheck(cmId) {
      common.confirm('NLS0000004', () => {
        this.delReply(cmId);
      });
    },
    async delReply(cmId) {
      try {
        await this[teamBoardTypes.actions.DELETE_REPLY]({
          cmId: cmId,
          bdId: this.$route.params.bdId,
        });
        common.alert('success', 'NLS0000002');
      } catch (error) {
        common.alert('warning', error);
      }
    },
    //* 저장 버튼 기능
    saveCheck() {
      //* 저장가능여부를 먼저 확인한다.
      let saveFlag = true;
      let altMsg = '';
      if (this.newCmContent === '' || this.newCmContent === null) {
        //* 내용이 공란인 경우 알림 띄우기.
        saveFlag = false;
        altMsg = 'NLS0000003';
      }
      saveFlag === true
        ? this.saveCmContent()
        : common.alert('warning', altMsg);
    },
    async saveCmContent() {
      const res = await this[teamBoardTypes.actions.INSERT_REPLY]({
        cmContent: this.newCmContent,
        bdId: this.$route.params.bdId,
      });
      //* 저장되었다는 안내 문구 띄우기.
      if (res.result === 'T') {
        this.newCmContent = '';
        common.alert('success', 'NLS0000013');
      }
    },
  },
};
</script>
