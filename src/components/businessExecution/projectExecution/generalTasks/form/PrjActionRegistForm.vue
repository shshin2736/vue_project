<template>
  <dl class="task-accordion">
    <dt class="current">
      <button type="button" class="task-accordion-btn">
        <!-- 기본정보 -->
        <span>{{ $t('NLS0000196') }} <em class="required-text">*</em></span>
      </button>
    </dt>
    <dd>
      <div class="accordion-inner-btnbox">
        <button
          v-if="saveBtn"
          type="button"
          class="accordion-btn save"
          @click="savePrj"
        >
          <!-- 저장 -->
          <span>{{ $t('NLS0000074') }}</span>
        </button>
        <button
          v-if="endBtn"
          type="button"
          class="accordion-btn finish"
          @click="endPrjAction"
        >
          <!-- 완료 -->
          <span>{{ $t('NLS0000829') }}</span>
        </button>
        <!-- <button
          type="button"
          class="accordion-btn finish"
          v-if="deleteBtn"
          @click="deletePrjAction"
        >
        
          <span>{{ $t('NLS0000075') }}</span>
        </button> -->
        <!-- <p>즉실천 &gt; 기본정보</p>	 -->
        <button
          type="button"
          class="accordion-btn info"
          @click="openHelpPop('기본정보', 'NLS0000782')"
        >
          <!-- 도움말 -->
          <span>{{ $t('NLS0000823') }}</span>
        </button>
      </div>
      <div class="hmstask-table">
        <validation-observer
          tag="div"
          ref="obs"
          v-slot="{ invalid, validated, errors }"
        >
          <table>
            <colgroup>
              <col style="width:15%" />
              <col style="width:35%" />
              <col style="width:15%" />
              <col style="width:35%" />
            </colgroup>
            <tbody>
              <tr>
                <!-- 즉실천명 -->
                <th scope="row">
                  {{ $t('NLS0000203') }} <em class="required-text">*</em>
                </th>
                <td colspan="3">
                  <div class="task-inputform type3">
                    <com-input-text
                      :isReadOnly="prjNmDisabled"
                      v-model="prjNm"
                      rules="required"
                    >
                    </com-input-text>
                  </div>
                </td>
              </tr>
              <tr>
                <!-- 과제 전체 실행 기간	 -->
                <th scope="row">
                  {{ $t('NLS0000195') }} <em class="required-text">*</em>
                </th>
                <td>
                  <div class="flexable-datepicker">
                    <div class="hms-datepicker type1">
                      <com-date-picker
                        :min="min"
                        :max="max"
                        name="prjStartDate"
                        :current="prjStartDate"
                        :format="format"
                        :disabled="disabledYn"
                        @onChange="onChange"
                      ></com-date-picker>
                    </div>
                    <em class="date-divide">~</em>
                    <div class="hms-datepicker type1">
                      <com-date-picker
                        :min="min"
                        :max="max"
                        name="prjEndDateDate"
                        :current="prjEndDate"
                        :format="format"
                        :disabled="disabledYn"
                        calendarClass=""
                        @onChange="onChange"
                      ></com-date-picker>
                    </div>
                  </div>
                </td>
                <!-- 담당부서 / 담당자	 -->
                <th scope="row">
                  {{ $t('NLS0000062') }}<em class="required-text">*</em>
                </th>
                <td>
                  <div class="task-inputform type3">
                    <com-input-text
                      :isReadOnly="true"
                      v-model="prjUserInfo"
                      rules="required"
                    >
                    </com-input-text>
                  </div>
                </td>
              </tr>
              <tr>
                <!-- 즉실천 내용	 -->
                <th scope="row">
                  {{ $t('NLS0000853') }}
                </th>
                <td colspan="3">
                  <div class="hms-editorbox" style="color: black">
                    <com-ck-editor
                      v-model="actContent"
                      :disable="disabledYn"
                    ></com-ck-editor>
                    <!--rules="requiredCK-->
                  </div>
                </td>
              </tr>
              <tr>
                <!-- 첨부파일 -->
                <th scope="row">{{ $t('NLS0000247') }}</th>
                <td colspan="3">
                  <div class="hms-upload">
                    <div id="products1">
                      <com-upload-file
                        :multiple="true"
                        :read="isRead"
                        :fileList="attachFiles"
                        :downloadType="downloadType"
                        :ownerObjectId="actionId"
                        @files="getFiles"
                      ></com-upload-file>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <com-validate-error
            :invalid="invalid"
            :validated="validated"
            :errors="errors"
            @errors="onErrors"
          ></com-validate-error>
        </validation-observer>
      </div>
    </dd>
  </dl>
</template>

<script>
import ComUploadFile from '@/components/common/global/ComUploadFile';
import ComInputText from '@/components/common/global/ComInputText';
import ComDatePicker from '@/components/common/global/ComDatePicker';
import ComValidateError from '@/components/common/global/ComValidateError';
import ComCkEditor from '@/components/common/global/ComCKEditor';
import * as commonTypes from '@/store/modules/common/types';
import { timezone, common } from '@/utils';
import {
  commonStore,
  generalTasksStore,
  specializedTasksStore,
} from '@/mixins';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as generalTasksType from '@/store/modules/businessExecution/projectExecution/generalTasks/types';

export default {
  name: 'PrjActionRegistForm',
  mixins: [commonStore, generalTasksStore, specializedTasksStore],
  components: {
    ComCkEditor,
    ComValidateError,
    ComDatePicker,
    ComInputText,
    ComUploadFile,
  },
  data() {
    return {
      prjNmDisabled: true, //* 즉실천명 Disabled 여부
      isRead: false, //* 파일업로드 ON/OFF
      isNewAction: true, //* 신규 등록 체크
      prjNm: '', //*과제명
      prjId: '', //* 과제ID
      prjStatus: '', //* 과제 상태
      actionId: '', //* 즉실천 ID
      prjStartDate: new Date(), //* 시작일자
      prjEndDate: new Date(), //* 종료일자
      prjUserId: '', //* 담당자 ID
      prjUserInfo: '',
      prjDeptId: '', //* 담당자 부서 ID
      saveBtn: true, //* 저장버튼
      deleteBtn: false, //* 삭제버튼 Show ON/OFF
      endBtn: false, //* 완료버튼 ON/OFF
      formInvalid: false, //* 입력형식 폼 invalid
      formError: {},
      disabledYn: false,
      actContent: '', //* 즉실천 내용
      attachFiles: [], //* 첨부파일
      uploadFiles: [], //* 업로드할 파일
      ownerObjectId: '', //*
      downloadType: 'prjAction', //* 첨부파일 타입
      // * DatePicker
      min: new Date(2010, 1, 1),
      max: new Date(2040, 12, 31),
      current: new Date(),
      format: 'yyyy-MM-dd',
    };
  },
  mounted() {
    this.init();
    this.$refs.obs.validate();
  },
  methods: {
    async init() {
      this.isNewAction = this[generalTasksType.getters.GET_IS_NEW_ACTION];
      this.loginUserInfo = this[commonTypes.getters.GET_COM_USER_INFO];

      if (this.$route.params.prjId) {
        this[generalTasksType.actions.INIT_IS_NEW_ACTION](false);
        await this[generalTasksType.actions.FETHC_PRJ_ACTION]({
          prjId: this.$route.params.prjId,
        });

        const prjActionInfo = this[generalTasksType.getters.GET_PRJ_ACTION];
        this.prjId = prjActionInfo.prjId; //과제 ID
        this.prjNm = prjActionInfo.prjNm; //즉실천명
        this.prjNmDisabled = false; //* 즉실천명 수정여부
        this.prjStatus = prjActionInfo.prjStatus; //* 과제 상태
        this.actionId = prjActionInfo.actionId; //* 즉실천 id,
        this.prjUserId = prjActionInfo.userId; //* 담당자 id,
        this.prjDeptId = prjActionInfo.userDeptId; //* 담당부서 id
        this.prjStartDate = new Date( //시작일짜
          timezone.convertToClientTimeZone(
            prjActionInfo.startDate,
            'YYYY-MM-DD',
          ),
        );
        this.prjEndDate = new Date( //종료일짜
          timezone.convertToClientTimeZone(prjActionInfo.endDate, 'YYYY-MM-DD'),
        );
        this.prjUserInfo = prjActionInfo.deptNm.concat(
          ' / ',
          prjActionInfo.userName,
        ); //담당부서명 / 담당자명
        this.actContent = prjActionInfo.actContent; //* 즉실천 내용
        this.attachFiles = prjActionInfo.attachfiles; //* 첨부파일

        //* 삭제버튼(과제가 완료상태가 아닐떄 , 담당자나 관리자일경우 ON)

        //*과제가 완료 상태면
        if (this.prjStatus === 'C') {
          this.prjNmDisabled = false; //* 즉실천명 수정여부
          this.isRead = true; //* 파일업로드 여부
          this.endBtn = false; //* 완료버튼 ON
          this.saveBtn = false;
          this.deleteBtn = false;
        }
        //* 과제가 완료상태가 아니면
        else {
          this.deleteBtn =
            this.prjUserId === this.loginUserInfo.userId ||
            this.loginUserInfo.userType === 'ADMIN' ||
            this.loginUserInfo.userType === 'SUPER';
          this.endBtn =
            this.prjUserId === this.loginUserInfo.userId ||
            this.loginUserInfo.userType === 'ADMIN' ||
            this.loginUserInfo.userType === 'SUPER';
        }
        if (
          !this.$route.params.auth.includes('S') &&
          !this.$route.params.auth.includes('X') &&
          !this.$route.params.auth.includes('D')
        ) {
          this.disabledYn = true;
          this.prjNmDisabled = true;
          this.endBtn = false; //* 완료버튼 ON
          this.saveBtn = false;
        }
      }
      //* 신규
      else {
        this[generalTasksType.actions.INIT_IS_NEW_ACTION](true);
        //* 즉실천 과제명
        this.prjNm = this[
          specializedTasksTypes.getters.GET_PROJECT_POPUP_INFO
        ].prjNm;

        //* 담당자 정보 가져오기(로그인한 사용자)
        const userData = this[commonTypes.getters.GET_USER_DATA];
        this.prjUserId = userData.userId;
        this.prjDeptId = userData.deptId;
        this.prjUserInfo = userData.deptNm.concat(' / ', userData.userName);
      }
    },

    //* 과제 정보 저장
    async savePrj() {
      //* 입력 유효성 체크
      if (this.formInvalid) {
        // 형식에 맞는 데이터를 입력해 주십시오.
        common.alert('warning', 'NLS0000018');
      } else {
        this.isNewAction = this[generalTasksType.getters.GET_IS_NEW_ACTION];

        //* 날짜 유효성 체크
        if (this.prjStartDate > this.prjEndDate) {
          // 종료날짜가 시작날짜보다 작을 수 없습니다.
          common.alert('warning', 'NLS0000854');
        } else {
          //* [신규/수정] 공통
          const param = {
            prjStartDate: timezone.convertToServerTimeZone(
              this.prjStartDate,
              'YYYYMMDD',
            ), //* 과제 시작일
            prjEndDate: timezone.convertToServerTimeZone(
              this.prjEndDate,
              'YYYYMMDD',
            ), //* 과제 종료일
            prjDeptId: this.prjDeptId, //* 담당부서 ID
            prjUserId: this.prjUserId, //* 담당자 ID,
          };
          //* 신규저장
          if (this.isNewAction) {
            // 저장하시겠습니까?
            common.confirm('NLS0000005', async () => {
              //* 과제명
              param.prjNm = this.prjNm;
              param.prjType = 'IN'; // * 과제 유형
              param.prjStatus = common.isEmpty(this.actContent) ? 'D' : 'A'; //* 과제 상태
              param.prjRate = 0; //* 과제 진행률
              //* 먼제 과제 테이블에 저장(tb_prj_main).
              const data = await this[
                generalTasksType.actions.INSERT_NEW_PRJ_MAIN
              ](param);
              if (data.result === 'T') {
                //* 저장 후 prjId 리턴
                this.prjId = data.data.prjId;
                //* 즉실천 테이블(tb_prj_action) insert
                param.prjId = data.data.prjId;
                param.startDate = param.prjStartDate; //* 과제 시작일
                param.endDate = param.prjEndDate; //* 과제 시작일
                param.userDeptId = this.prjDeptId; //* 담당부서 ID
                param.userId = this.prjUserId; //* 담당자 ID
                param.actStatus = param.prjStatus; //* 즉실천 진행 상태
                param.uploadFiles = this.uploadFiles; //*업로드한 파일
                param.downloadType = this.downloadType;
                param.actContent = this.actContent; //* 내용
                // const param = {
                //   prjId: this.prjId,
                //   prjNm: this.prjNm,
                //   startDate: timezone.convertToServerTimeZone(
                //     this.prjStartDate,
                //     'YYYYMMDD',
                //   ), //* 과제 시작일
                //   endDate: timezone.convertToServerTimeZone(
                //     this.prjEndDate,
                //     'YYYYMMDD',
                //   ), //* 과제 종료일
                //   userDeptId: this.prjDeptId, //* 담당부서 ID
                //   userId: this.prjUserId, //* 담당자 ID
                //   actContent: this.actContent, //* 내용
                //   actStatus: param.prjStatus, //* 즉실천 진행 상태
                //   uploadFiles: this.uploadFiles, //*업로드한 파일
                //   downloadType: this.downloadType,
                // };

                //* 즉실천 저장(tb_prj_action)
                const resultData = await this[
                  generalTasksType.actions.INSERT_NEW_PRJ_ACTION
                ](param);
                if (resultData.result === 'T') {
                  this.actionId = resultData.data.actionId;
                  this.endBtn = true; //* 완료버튼 ON
                  this.deleteBtn = true; //* 삭제버튼 ON
                  this[generalTasksType.actions.INIT_IS_NEW_ACTION](false);
                  // 저장되었습니다
                  common.alert('success', 'NLS0000012');
                  //* 목록으로 이동
                  this.goToTaskList();
                }
              }
            });
          }
          //* 즉실천 수정
          else {
            // 수정하시겠습니까?
            common.confirm('NLS0000006', async () => {
              param.prjId = this.prjId;
              param.prjNm = this.prjNm;
              if (this.prjStatus == 'D' && !common.isEmpty(this.actContent))
                param.prjStatus = 'A';
              //* 일반과제(tb_prj_main) update
              const data = await this[generalTasksType.actions.UPDATE_PRJ_MAIN](
                param,
              );
              if (data.result === 'T') {
                param.actionId = this.actionId;
                if (this.prjStatus == 'D' && !common.isEmpty(this.actContent))
                  param.actStatus = param.prjStatus;
                param.startDate = param.prjStartDate; //* 과제 시작일
                param.endDate = param.prjEndDate; //* 과제 종료
                param.actContent = this.actContent;
                //* 즉실천(tb_prj_action) update
                const data = await this[
                  generalTasksType.actions.UPDATE_PRJ_ACTION
                ](param);
                if (data.result === 'T') {
                  // 수정되었습니다
                  common.alert('success', 'NLS0000015');
                  //* 목록으로 이동
                  this.goToTaskList();
                }
              }
            });
          }
        }
      }

      //* 유효성 검증 필요
    },

    //*  date-picker 변경
    onChange(date, name) {
      name === 'prjStartDate'
        ? (this.prjStartDate = date)
        : (this.prjEndDate = date);
    },
    onErrors(invalid, validate, errors) {
      this.formError = errors;
      this.formInvalid = invalid;
    },
    //* 즉실천 삭제
    deletePrjAction() {
      // 삭제하시겠습니까?
      common.confirm('NLS0000004', async () => {
        const data = await this[generalTasksType.actions.UPDATE_PRJ_ACTION]({
          actionId: this.actionId,
          deleteYn: 'Y',
        });
        if (data.result === 'T') {
          const param = {
            prjId: this.prjId,
          };
          this[generalTasksType.actions.DELETE_PRJ_MAIN](param);
          this[generalTasksType.actions.INIT_PRJ_ID]('');
          //* Task 리스트 초기화
          this[generalTasksType.actions.INIT_GNL_TASK_LIST]([]);
          this.$router.push({
            path: '/ProjectExecutionListPage',
          });
        }
      });
    },
    //* 즉실천 완료
    endPrjAction() {
      const param = {
        actionId: this.actionId,
        actStatus: 'C', //* 즉실천 완료상태로 변경
        compDate: timezone.convertToServerTimeZone(new Date(), 'YYYYMMDD'), //* 과제 완료일
        //[알림 서비스를 위한 파라미터]
        prjUserId: this.prjUserId,
        prjId: this.prjId, //* 과제 ID
        prjNm: this.prjNm, //* 즉실천명
        prjStatus: 'C', //* 과제 상태
        deptId: this.prjDeptId, //* 담당자 ID
      };
      // 완료처리 하시겠습니까?
      common.confirm(this.$t('NLS0000857'), async () => {
        const data = await this[generalTasksType.actions.UPDATE_PRJ_ACTION](
          param,
        );
        if (data.result === 'T') {
          this.isRead = true;
          this.saveBtn = false;
          this.endBtn = false;
          this.deleteBtn = false;
          this.prjNmDisabled = true;
          // 완료되었습니다.
          common.alert('success', 'NLS0000856');
          this.goToTaskList();
        }
      });
    },
    //* 첨부파일 업로드 이벤트
    getFiles(files) {
      this.uploadFiles = files;
    },
    //* 과제도움말 팝업
    async openHelpPop(prjStepNm, helpMsg) {
      await this[commonTypes.actions.INIT_PROJECT_HELP_INFO]({
        prjStepNm: prjStepNm,
        helpMsg: helpMsg,
      });
      await this[commonTypes.actions.INIT_VIEWS_PRJ_HELP_POP](true);
    },
    goToTaskList() {
      this.$router.push({
        path: '/ProjectExecutionListPage',
      });
    },
  },
};
</script>

<style lang="scss">
.flexable-datepicker {
  display: flex;
  align-items: center;
  .hms-datepicker.type1 {
    width: auto;
    flex-basis: 150px;
    .k-datepicker {
      @include breakpoint(desktop-s) {
        height: 40px;
      }
      .k-picker-wrap {
        input {
          height: 30px;
          @include breakpoint(desktop-s) {
            height: 40px;
          }
        }
        a {
          @include breakpoint(desktop-s) {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
