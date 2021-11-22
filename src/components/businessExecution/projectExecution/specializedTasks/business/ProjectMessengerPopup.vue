<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop nodim-layer">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-mesenger">
            <div class="layer-pop__title type1">
              <p v-if="msgInfo.prjStepId != ''">
                {{ $t('NLS0001281') }} [{{ msgInfo.prjStepNm }}]
              </p>
              <p v-else>{{ $t('NLS0001281') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="mesenger-box" style="height:500px;">
              <template v-for="(item, i) in msgList">
                <div
                  class="receive-box"
                  v-if="item.flag === 'R'"
                  :key="item.msgSeq"
                  :ref="`recive_${i}`"
                >
                  <p class="mesenger-title">
                    <span class="user-name">{{ item.fromUserNm }}</span>
                    <span
                      class="step-name"
                      @click="goPrjDetail(item.prjStepId)"
                      >{{
                        item.prjStepNm != null ? `[${item.prjStepNm}]` : ''
                      }}</span
                    >
                  </p>
                  <p class="receive-message">
                    {{ item.msgContent }}
                  </p>
                  <span class="message-date">{{ item.createDate }}</span>
                </div>

                <div
                  class="send-box"
                  v-if="item.flag === 'S'"
                  :key="item.msgSeq"
                  :ref="`send_${i}`"
                >
                  <p class="mesenger-title">
                    <span class="user-name">{{ loginUserInfo.userName }}</span>
                    <span
                      class="step-name"
                      @click="goPrjDetail(item.prjStepId)"
                      >{{
                        item.prjStepNm != null ? `[${item.prjStepNm}]` : ''
                      }}</span
                    >
                  </p>
                  <span class="message-date">{{ item.createDate }}</span>
                  <p class="send-message">
                    {{ item.msgContent }}
                  </p>
                </div>
              </template>
            </div>
            <div class="messenger-input-box">
              <textarea
                ref="msgContent"
                id="msgContent"
                v-model="msgContent"
              ></textarea>
              <button type="button" class="messenger-btn" @click="onSendMsg">
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import { specializedTasksStore, commonStore } from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'ProjectMessengerPopup',
  mixins: [specializedTasksStore, commonStore],
  components: { ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      prjId: '',
      prjStep: '',
      prjStepNm: '',
      loginUserInfo: {},
      msgList: [],
      msgInfo: { prjId: '', prjStepId: '', prjStepNm: '', prjStatus: '' },
      fromList: [],
      msgContent: '',
      getMSG: '',
    };
  },
  computed: {
    getMessageInfo() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_MESSENGER_INFO
      ];
      return item;
    },
    getMessageList() {
      const item = this[
        specializedTasksTypes.getters.GET_PROJECT_MESSENGER_LIST
      ];
      return item;
    },
    getPrjStatusList() {
      const item = this[specializedTasksTypes.getters.GET_PROJECT_STATUS_LIST];
      return item;
    },
  },
  watch: {
    getMessageInfo: function(value) {
      if (!common.isEmpty(value)) {
        this.msgInfo = value;
        this.fromList = [];

        if (!common.isEmpty(value.prjBaseInfo.prjUserId)) {
          this.fromList.push(value.prjBaseInfo.prjUserId);
        }
        if (!common.isEmpty(value.prjBaseInfo.prjManagerId)) {
          this.fromList.push(value.prjBaseInfo.prjManagerId);
        }
        if (!common.isEmpty(value.prjBaseInfo.corUserId)) {
          this.fromList.push(value.prjBaseInfo.corUserId);
        }
        if (!common.isEmpty(value.prjBaseInfo.reqUserId)) {
          this.fromList.push(value.prjBaseInfo.reqUserId);
        }
      }
    },
    getMessageList: function(value) {
      this.msgList = value;
    },
  },
  created() {
    this.loginUserInfo = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
    if (!common.isEmpty(this.msgInfo.prjId)) {
      this.getMSG = setInterval(() => {
        this.getMsgList();
      }, 180000);
    }
    // }, 3000);
  },
  updated() {
    const len = this.msgList.length - 1;
    if (len > 0) {
      if (this.msgList[len].flag === 'R') {
        this.$refs[`recive_${len}`][0].scrollIntoView(false);
      } else {
        this.$refs[`send_${len}`][0].scrollIntoView(false);
      }
    }
    if (this.$refs.msgContent) this.$refs.msgContent.focus();
  },
  destroyed() {
    clearInterval(this.getMSG);
  },
  methods: {
    getMsgList() {
      this[specializedTasksTypes.actions.FETCH_PROJECT_MESSENGER_LIST]({
        prjId: this.msgInfo.prjId,
        prjStepId: this.msgInfo.prjStepId,
      });
    },
    goPrjDetail(msgStepCd) {
      let tmStatusList = JSON.parse(JSON.stringify(this.getPrjStatusList));
      let idx = 0;
      for (let i = 0; i < tmStatusList.length; i++) {
        if (tmStatusList[i].stepCd === msgStepCd) idx = i;
      }
      tmStatusList = tmStatusList.reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.stepCd === msgStepCd) {
          obj.now = true;
          obj.current = true;
        } else {
          obj.now = false;
        }
        obj.selectedIdx = idx;
        acc.push(obj);
        return acc;
      }, []);

      this[specializedTasksTypes.actions.INIT_PROJECT_STATUS_LIST](
        tmStatusList,
      );
      this.closePopup();
    },

    async onSendMsg() {
      if (this.msgInfo.prjStatus === 'C') {
        // 과제 완료 후 메세지를 발송할수 없습니다.
        common.alert('warning', 'NLS0001047');
        return false;
      }
      if (!common.isEmpty(this.msgContent)) {
        if (!common.isEmpty(this.msgInfo.prjId)) {
          const param = {
            prjId: this.msgInfo.prjId,
            prjStepId: this.msgInfo.prjStepId,
            msgContent: this.msgContent,
            toUserList: this.fromList,
          };
          await this[specializedTasksTypes.actions.INSERT_PROJECT_MESSAGES](
            param,
          );
          this.msgContent = '';
        } else {
          // 기본정보 완료후, 메시지 발송이 가능합니다.
          common.alert('warning', 'NLS0000869');
        }
      } else {
        // 메시지를 입력 후 전송해주세요.
        common.alert('warning', 'NLS0000870');
      }
    },
    closePopup() {
      this.msgList = [];
      this.msgContent = '';
      clearInterval(this.getMSG);
      this.$emit('input', false);
    },
  },
};
</script>
