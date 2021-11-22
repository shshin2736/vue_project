<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-ultrasmall">
            <div class="layer-pop__title">
              <!-- 조직 일괄 적용	 -->
              <p>{{ $t('NLS0000238') }}</p>
              <button type="button" class="layer-close" @click="onClose">
                close {{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="hms-upload">
              <com-upload-file
                :read="true"
                :fileList="getFile"
                :downlaodType="getFile.downlaodType"
                :objectOwnerId="getFile.objectOwnerId"
                downloadUrl="api/getUserTemplate.do"
              ></com-upload-file>
              <div id="products">
                <com-upload-file
                  :xlsx="true"
                  :rules="['xlsx']"
                  xlsxKey="empXlsxKey"
                  @xlsx="after"
                ></com-upload-file>
              </div>
              <span class="grid-text-info">{{ $t('NLS0001453') }}</span>
              <div class="layer__btn-box">
                <button type="button" class="blue-btn" @click="doUpsert">
                  <!-- 조직 변경 일괄적용	 -->
                  <span> {{ $t('NLS0000239') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComUploadFile from '@/components/common/global/ComUploadFile';
import { userManagementStore, commonStore } from '@/mixins';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'UserExcelUploadPopup',
  mixins: [userManagementStore, commonStore],
  components: { ComUploadFile, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      hasFile: false,
      FINAL_LIST: [],
      RANK_LIST: [],
      DUTY_LIST: [],
      PHONE_REGEX: /^\d{3}-\d{3,4}-\d{4}$/,
      EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      alertCode: {
        rankCode: 'NLS0001077', // 직급코드에 빈값이 있습니다.
        dutyCode: 'NLS0001078', // 직책코드에 빈값이 있습니다.
        userId: 'NLS0001079', //사용자ID에 빈값이 있습니다.
        userName: 'NLS0001080', // 성명에 빈값이 있습니다.
        emailAddress: 'NLS0001081', //이메일에 빈값이 있습니다.
        mobileTelNo: 'NLS0001082', //전화번호에 빈값이 있습니다.
        retireYn: 'NLS0001083', //재직상태에 빈값이 있습니다.
        deptCd: 'NLS0001084', //HMS부서코드에 빈값이 있습니다.
      },
    };
  },
  computed: {
    getFile() {
      const fileInfo = this[commonTypes.getters.GET_FILE_INFO_LIST];
      const file = [...fileInfo];
      return file;
    },
    getExcelUser() {
      return this[userManagementTypes.getters.GET_EXCEL_DATA];
    },
  },
  created() {
    const list1 = common.getCodeList('G07');
    const list2 = common.getCodeList('G08');
    this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
      fileId: 'employmentExcelform',
    });
    this.RANK_LIST = list1.map(i => i.cd.toString());
    this.DUTY_LIST = list2.map(i => i.cd.toString());
  },
  methods: {
    after(e) {
      if (e.length > 0) {
        this.hasFile = true;
      }
    },
    async doUpsert() {
      if (this.hasFile) {
        await this[userManagementTypes.actions.FETCH_EXCEL_DATA]({});
        this.doValidation();
      } else {
        //파일을 업로드해주세요.
        common.alert('warning', 'NLS0001067');
      }
    },
    async doValidation() {
      const list = this.getExcelUser;
      const keys = Object.keys(list[0]);
      for (const i of list) {
        for (const k of keys) {
          if (common.isEmpty(i[k]) && k !== 'mobileTelNo') {
            if (k === 'deptId') {
              // 는 존재하지 않는 부서코드입니다.
              common.alert(
                'warning',
                `${i['deptCode']}` + this.$t('NLS0001089'),
              );
            } else {
              common.alert('warning', this.alertCode[k]);
            }
            return false;
          }
        }
        const checkList = {
          rankCode: i['rankCode'],
          dutyCode: i['dutyCode'],
          deptId: i['deptId'],
        };
        const res = await this.isCodeExist(checkList);
        if (res) {
          const phone = this.PHONE_REGEX.test(i['mobileTelNo']);
          const email = this.EMAIL_REGEX.test(i['emailAddress']);
          if (!phone && i['mobileTelNo'] !== '') {
            //는 잘못된 휴대전화 형식입니다.
            common.alert('warning', `${i['mobileTelNo']}` + 'NLS0001075');
            return false;
          } else if (!email) {
            //는 잘못된 이메일 형식입니다.
            common.alert('warning', `${i['emailAddress']}` + 'NLS0001076');
            return false;
          } else {
            this.FINAL_LIST.push(i);
            this.init();
          }
        }
      }
      if (this.FINAL_LIST.length === list.length) {
        const res = await this[userManagementTypes.actions.UPDATE_EXCEL_USER](
          {},
        );
        if (res) {
          //추가되었습니다.
          common.alert('success', 'NLS0000013');
        }
      }
    },
    isCodeExist(value) {
      const rankCode = value.rankCode;
      const dutyCode = value.dutyCode;
      if (!this.RANK_LIST.includes(rankCode)) {
        // 	rankCode는 존재하지 않는 직위->직급코드입니다.
        common.alert('warning', rankCode + 'NLS0000343');
        return false;
      } else if (!this.DUTY_LIST.includes(dutyCode)) {
        // 	dutyCode 는 존재하지 않는 직책코드입니다.
        common.alert('warning', dutyCode + 'NLS0001074');
        return false;
      } else {
        return true;
      }
    },
    onClose() {
      this.init();
      this.FINAL_LIST = [];
      this.$emit('input', false);
    },
    init() {
      this.hasFile = false;
      this[userManagementTypes.actions.INIT_EXCEL_DATA]({});
    },
  },
};
</script>
