<template>
  <div class="page__btn-bbox">
    <com-button
      type="button"
      class="deepdarkgray-btn perm_delete"
      :auth="$route.params.auth"
      @click="onDel"
      v-if="authorized"
    >
      <!-- 삭제 -->
      <span>{{ $t('NLS0000075') }}</span>
    </com-button>
    <com-button
      type="button"
      class="blue-btn perm_save"
      :auth="$route.params.auth"
      @click="onSave"
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
import { teamBoardStore, commonStore } from '@/mixins';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'TeamBoardRegistrationBtnForm',
  mixins: [teamBoardStore, commonStore],
  components: { ComButton },
  data() {
    return {
      authorized: false,
    };
  },
  computed: {
    getTeamBoardDetail() {
      return this[teamBoardTypes.getters.GET_TEAM_BOARD_DETAIL];
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    isError() {
      return this[teamBoardTypes.getters.GET_TBD_ERRORS];
    },
    getUploadFiles() {
      return this[teamBoardTypes.getters.GET_TBD_UPLOAD_FILE];
    },
  },
  watch: {
    getTeamBoardDetail: function(value) {
      if (value.createUser === this.getUserInfo.userId) {
        this.authorized = true;
      }
    },
  },
  methods: {
    onDel() {
      // 삭제하시겠습니까?
      common.confirm('NLS0000004', async () => {
        const obj = this.getTeamBoardDetail;
        const fileList = [];
        if (!common.isEmpty(obj.fileId[0])) {
          const nameList = obj.fileName;
          const idList = obj.fileId;
          const sizeList = obj.fileSize;
          idList.forEach((obj, idx) => {
            const file = {
              fileId: obj,
              fileName: nameList[idx],
              fileSize: sizeList[idx],
            };
            fileList.push(file);
          });
          obj.fileList = fileList;
        }
        const res = await this[teamBoardTypes.actions.DELETE_TEAM_BOARD_DETAIL](
          obj,
        );
        if (res.result === 'T') {
          //삭제되었습니다
          common.alert('success', 'NLS0000002', this.goToList);
        }
      });
    },
    async onSave() {
      if (this.isError) {
        // 필수사항 및 형식을 확인하세요.
        common.alert('warning', 'NLS0001069');
      } else {
        common.confirm('NLS0000005', async () => {
          if (this.getUploadFiles.length > 0) {
            this.getTeamBoardDetail.fileList = this.getUploadFiles;
          }
          const res = await this[
            teamBoardTypes.actions.UPDATE_TEAM_BOARD_DETAIL
          ](this.getTeamBoardDetail);
          if (res.result === 'T') {
            //저장되었습니다.
            this[teamBoardTypes.actions.INIT_TBD_UPLOAD_FILE]([]);
            common.alert('success', 'NLS0000012', this.goToList);
          }
        });
      }
    },
    //* 목록 버튼 기능
    goToList() {
      this.$router.push({
        name: 'TeamBoardPage',
        params: { auth: this.$route.params.auth, detail: true },
      });
    },
  },
};
</script>
