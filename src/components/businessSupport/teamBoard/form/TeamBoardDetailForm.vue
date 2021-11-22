<template>
  <div class="hms-grid basic-table">
    <table>
      <colgroup>
        <col style="width:13%" />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <!-- 제목 -->
          <th scope="row">
            {{ $t('NLS0000366') }}
          </th>
          <td>
            {{ detailObj.bdTitle }}
            <span class="check-form text-in type-grid">
              <input type="checkbox" v-model="detailObj.buOpenYn" disabled />
              <label for="test8">
                <!-- BU 공개 -->
                <span>{{ $t('NLS0000953') }}</span></label
              >
            </span>
          </td>
        </tr>
        <tr>
          <!-- 등록부서/등록자 -->
          <th scope="row">
            {{ $t('NLS0000376') }}
          </th>
          <td colspan="3">
            <span class="grid-input-form type-nobtn">
              {{ detailObj.createUserInfo }}
            </span>
          </td>
        </tr>
        <tr>
          <!-- 내용 -->
          <th scope="row">
            {{ $t('NLS0000371') }}
          </th>
          <td colspan="3" class="team-board">
            <com-ck-editor
              v-if="access"
              v-model="bdContent"
              :disable="true"
            ></com-ck-editor>
          </td>
        </tr>
        <tr>
          <!-- 파일첨부 -->
          <th scope="row">{{ $t('NLS0000905') }}</th>
          <td colspan="3">
            <com-upload-file
              :read="true"
              :fileList="teamBoardFileList"
              :downlaodType="downlaodType"
              :objectOwnerId="objectOwnerId"
            ></com-upload-file>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import { teamBoardStore, commonStore } from '@/mixins';
import * as teamBoardTypes from '@/store/modules/businessSupport/teamBoard/types';
// import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';
export default {
  name: 'TeamBoardDetailForm',
  mixins: [teamBoardStore, commonStore],
  components: {
    ComCkEditor,
    ComUploadFile,
  },
  data() {
    return {
      disabledYn: false,
      bdContent: '',
      buOpenYn: false,
      teamBoardFileList: [], //* FILE 리스트
      objectOwnerId: '',
      downlaodType: 'teamBoard',
      access: false,
      detailObj: {},
    };
  },
  computed: {
    getBoardDetail() {
      //* 스토어에 저장된 팀 게시글 객체를 가져온다.
      const obj = this[teamBoardTypes.getters.GET_TEAM_BOARD_DETAIL];
      return obj;
    },
  },
  watch: {
    getBoardDetail: function(value) {
      const obj = { ...value };
      if (!common.isEmpty(obj)) {
        this.detailObj = obj;
        this.bdContent = obj.bdContent;
        this.objectOwnerId = obj.bdId;
        if (obj.buOpenYn === 'Y') {
          this.detailObj.buOpenYn = true;
        } else {
          this.detailObj.buOpenYn = false;
        }
        if (obj.fileId[0] != null) {
          const nameList = obj.fileName;
          const idList = obj.fileId;
          const sizeList = obj.fileSize;
          idList.forEach((obj, idx) => {
            const file = {
              fileId: obj,
              fileName: nameList[idx],
              fileSize: sizeList[idx],
            };
            this.teamBoardFileList.push(file);
          });
        } else {
          this.teamBoardFileList = [];
        }
      }
    },
  },
  created() {
    this[teamBoardTypes.actions.UPDATE_SH_COUNT]({
      bdId: this.$route.params.bdId,
    });
    this[teamBoardTypes.actions.FETCH_TEAM_BOARD_DETAIL]({
      bdId: this.$route.params.bdId,
    });
    // this[teamBoardTypes.actions.FETCH_REPLY_LIST]({
    //   bdId: this.$route.params.bdId,
    // });
    if (common.isEmpty(this.$route.params.bdId)) {
      this.$router.push({
        name: 'TeamBoardPage',
        params: { auth: this.$route.params.auth },
      });
      return false;
    } else {
      this.access = true;
    }
  },
  methods: {},
};
</script>
<style>
.team-board .ck-editor__editable_inline {
  height: 500px;
}
</style>
