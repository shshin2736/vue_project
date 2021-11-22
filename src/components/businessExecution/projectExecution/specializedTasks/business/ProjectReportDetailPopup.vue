<template>
  <com-overlay
    v-model="value"
    :draggable="true"
    :draggableHeight="20"
    customClass="max-full"
  >
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap type-report">
          <div class="layer-pop__box type-report">
            <div class="report-title-box">
              <!-- 보고서 -->
              {{ $t('NLS0000186') }}
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="layer-pop__title type5">
              <div class="report-nav-box">
                <button
                  type="button"
                  class="report-nav-btn"
                  :class="{ current: currentInfo.current0 }"
                  @click="onFocuseTitle('current0')"
                >
                  <!-- 표지 -->
                  <span>{{ $t('NLS0000559') }}</span>
                </button>
                <button
                  type="button"
                  class="report-nav-btn"
                  :class="{ current: currentInfo.current1 }"
                  @click="onFocuseStep1('current1')"
                >
                  <span>{{ GV_STEP_LIST[0].cdNm }}</span>
                </button>
                <button
                  type="button"
                  class="report-nav-btn"
                  :class="{ current: currentInfo.current2 }"
                  @click="onFocuseStep2('current2')"
                >
                  <span>{{ GV_STEP_LIST[1].cdNm }}</span>
                </button>
                <button
                  type="button"
                  class="report-nav-btn"
                  :class="{ current: currentInfo.current3 }"
                  @click="onFocuseStep3('current3')"
                >
                  <span>{{ GV_STEP_LIST[2].cdNm }}</span>
                </button>
                <button
                  v-if="prjInfo.prjType === 'DC'"
                  type="button"
                  class="report-nav-btn"
                  :class="{ current: currentInfo.current4 }"
                  @click="onFocuseEtc('current4')"
                >
                  <!-- 부록 -->
                  <span>{{ $t('NLS0000555') }}</span>
                </button>
              </div>
              <p class="report-title">
                <span class="besttask-icon" v-if="prjInfo.prjBestYn === 'Y'"
                  >best-task</span
                >
                <span class="task-title">
                  <strong @click="openKpiList">
                    {{ prjInfo != null ? prjInfo.prjNm : '' }}
                  </strong>
                </span>
              </p>
            </div>
            <div class="report-view-box">
              <report-cover
                ref="reportTitle"
                :prjBaseInfo="prjBaseInfo"
                :prjInfo="prjInfo"
                :prjSkin="prjSkin"
              >
              </report-cover>
              <report-dc
                v-if="prjInfo.prjType === 'DC'"
                ref="report"
                :prjType="prjInfo.prjType"
                :title="GV_STEP_LIST"
                :reportCheck="reportCheck"
                :overViewInfo="overViewInfo"
                :prjResource="prjResource"
                :graspFileList="graspFileList"
                :potenalFileList="potenalFileList"
                :prjCauseList="prjCauseList"
                :prjMeasureList="prjMeasureList"
                :prjPlanInfo="prjPlanInfo"
                :graspInfo="graspInfo"
                :measureFileList="measureFileList"
                :realizeFileList="realizeFileList"
                :effectFileList="effectFileList"
                :effectInfo="effectInfo"
                :planFileList="planFileList"
                :dcoverViewFileList="dcOViewFileList"
                :dcresourceViewFileList="dcRViewFileList"
                @openFile="openAtchFilePop"
              >
              </report-dc>
              <report-rd
                v-if="prjInfo.prjType === 'RD'"
                ref="report"
                :prjType="prjInfo.prjType"
                :title="GV_STEP_LIST"
                :reportCheck="reportCheck"
                :overViewInfo="overViewInfo"
                :bizAysFileList="bizAysFileList"
                :bizInfo="bizInfo"
                :prjResource="prjResource"
                :csfList="csfList"
                :dercFileList="dercFileList"
                :devContentList="devContentList"
                :rdEffectFileList="rdEffectFileList"
                :rdEffectInfo="rdEffectInfo"
                :pilotFileList="pilotFileList"
                :targetInfo="targetInfo"
                :devFileList="devFileList"
                :csfFileList="csfFileList"
                :rdoverViewFileList="rdOViewFileList"
                :rdresourceViewFileList="rdRViewFileList"
                @openFile="openAtchFilePop"
              >
              </report-rd>
              <report-ds
                v-if="prjInfo.prjType === 'DS'"
                ref="report"
                :prjType="prjInfo.prjType"
                :title="GV_STEP_LIST"
                :reportCheck="reportCheck"
                :overViewInfo="overViewInfo"
                :prjResource="prjResource"
                :graspContent="graspContent"
                :altList="altList"
                :dscList="dscList"
                :implFileList="implFileList"
                :implList="implList"
                :riskFileList="riskFileList"
                :dsEffectFileList="dsEffectFileList"
                :dsEffectInfo="dsEffectInfo"
                :implBudget="implBudget"
                :implMan="implMan"
                :rdgraspFileList="rdgraspFileList"
                :dscFileList="dscFileList"
                :altFileList="altFileList"
                :dsoverViewFileList="dsOViewFileList"
                :dsresourceViewFileList="dsRViewFileList"
                @openFile="openAtchFilePop"
              >
              </report-ds>
              <report-sa
                v-if="prjInfo.prjType === 'SA'"
                ref="report"
                :prjType="prjInfo.prjType"
                :title="GV_STEP_LIST"
                :reportCheck="reportCheck"
                :overViewInfo="overViewInfo"
                :prjResource="prjResource"
                :saCustInfo="saCustInfo"
                :saBizInfo="saBizInfo"
                :suggestFileList="suggestFileList"
                :custSugt="custSugt"
                :overFileList="overFileList"
                :overcome="overcome"
                :monFileList="monFileList"
                :monList="monList"
                :saEffectFileList="saEffectFileList"
                :saEffectInfo="saEffectInfo"
                :custFileList="custFileList"
                :bizFileList="bizFileList"
                :saoverViewFileList="saOViewFileList"
                :saresourceViewFileList="saRViewFileList"
                @openFile="openAtchFilePop"
              >
              </report-sa>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ReportCover from '@/components/businessExecution/projectExecution/specializedTasks/business/ReportCover';
import ReportDc from '@/components/businessExecution/projectExecution/specializedTasks/business/ReportDc';
import ReportRd from '@/components/businessExecution/projectExecution/specializedTasks/business/ReportRd';
import ReportDs from '@/components/businessExecution/projectExecution/specializedTasks/business/ReportDs';
import ReportSa from '@/components/businessExecution/projectExecution/specializedTasks/business/ReportSa';
import * as specializedTasksTypes from '@/store/modules/businessExecution/projectExecution/specializedTasks/types';
import * as commonTypes from '@/store/modules/common/types';
import { specializedTasksStore, commonStore } from '@/mixins';
import { common, timezone } from '@/utils';

export default {
  name: 'ProjectReportDetailPopup',
  components: {
    ComOverlay,
    ReportCover,
    ReportDc,
    ReportRd,
    ReportDs,
    ReportSa,
  },
  mixins: [specializedTasksStore, commonStore],
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      GV_STEP_LIST: common.getCodeList('PRJ007'),
      prjInfo: { prjNm: '' },
      prjSkin: require(`@/assets/images/cover-1.png`),
      prjStartDate: '',
      prjEndDate: '',
      prjBaseInfo: {
        prjManager: '',
        prjUser: '',
        prjCor: '',
        prjReq: '',
        keyWorldList: [
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
          { itemSeq: '', keywd: '' },
        ],
      },
      graspInfo: {
        fieldResult: '',
        fieldIssue: '',
      },
      overViewInfo: {
        rltPrjNm: '',
        rltPrjId: '',
        prjResume: '',
        prjBg: '',
      },
      prjResource: '',
      prjCauseList: [],
      prjMeasureList: [],
      prjPlanInfo: { prjBudget: '', prjMan: '' },
      effectInfo: { qntEff: '', qltEff: '' },
      graspFileList: [],
      potenalFileList: [],
      measureFileList: [],
      realizeFileList: [],
      effectFileList: [],
      bizAysFileList: [],
      dercFileList: [],
      devFileList: [],
      pilotFileList: [],
      rdEffectFileList: [],
      bizInfo: {
        bizAny: '',
        custNeed: '',
      },
      csfList: [],
      targetInfo: { funcContent: '', devDirection: '' },
      devContentList: [],
      pilotList: [],
      rdEffectInfo: { qntEff: '', qltEff: '' },
      graspContent: '',
      dscList: [],
      altList: [],
      implList: [],
      implMan: '',
      implBudget: '',
      dsEffectInfo: { qntEff: '', qltEff: '' },
      implFileList: [],
      riskFileList: [],
      dsEffectFileList: [],
      saCustInfo: {
        custInfo: '',
        tranHis: '',
        visitItem: '',
        visitResult: '',
      },
      saBizInfo: {
        custNeed: '',
        fieldVerifi: '',
      },
      custSugt: '',
      suggestFileList: [],
      overcome: '',
      overFileList: [],
      monList: [],
      transContent: '',
      monFileList: [],
      saEffectInfo: { qntEff: '', qltEff: '' },
      saEffectFileList: [],
      currentInfo: {
        current0: true,
        current1: false,
        current2: false,
        current3: false,
        current4: false,
      },
      reportList: [],
      reportCheck: {},
      allFileList: [],

      custFileList: [],
      bizFileList: [],
      csfFileList: [],
      rdgraspFileList: [],
      dscFileList: [],
      altFileList: [],
      planFileList: [],
      dcOViewFileList: [],
      dsOViewFileList: [],
      rdOViewFileList: [],
      saOViewFileList: [],
      dcRViewFileList: [],
      dsRViewFileList: [],
      rdRViewFileList: [],
      saRViewFileList: [],
    };
  },
  computed: {
    getReportInfo() {
      return this[specializedTasksTypes.getters.GET_PROJECT_REPORT_INFO];
    },
    getPrjUseInfo() {
      return this[specializedTasksTypes.getters.GET_PROJECT_REPORT_USE_INFO];
    },
    getPrjCauseList() {
      return this[specializedTasksTypes.getters.GET_PROJECT_CAUSE_LIST];
    },
    getAllFileList() {
      return this[commonTypes.getters.GET_FILE_INFO_LIST];
    },
  },
  watch: {
    getReportInfo: function(value) {
      this.prjInfo = value.prjInfo;
      this.reportList = value.reportList;
      this.prjStartDate = timezone.convertToClientTimeZone(
        this.prjInfo.prjStartDate,
        'YYYY-MM-DD',
      );
      this.prjEndDate = timezone.convertToClientTimeZone(
        this.prjInfo.prjEndDate,
        'YYYY-MM-DD',
      );

      if (!common.isEmpty(this.prjInfo.reportSkin)) {
        const opt2 = common.filterCode(
          common.getCodeList('PRJ014'),
          this.prjInfo.reportSkin,
        ).opt2;
        this.prjSkin = require(`@/assets${opt2}`);
      }
      if (!common.isEmpty(this.prjInfo.reportskin)) {
        const opt2 = common.filterCode(
          common.getCodeList('PRJ014'),
          this.prjInfo.reportskin,
        ).opt2;
        this.prjSkin = require(`@/assets${opt2}`);
      }

      this.prjBaseInfo = value.prjBaseUserInfo;
      this.overViewInfo = value.prjOverviewInfo;
      this.prjStatusList = value.prjStatusList;
      if (!common.isEmpty(value.prjResourceInfo)) {
        this.prjResource = value.prjResourceInfo.prjResource;
      } else {
        this.prjResource = '';
      }

      this.setTabNames(this.prjInfo.prjType);
      this.setReportContent(this.prjInfo.prjType, value);

      this[specializedTasksTypes.actions.FETCH_PROJECT_CAUSE_LIST]({
        prjId: value.prjInfo.prjId,
      });
      this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
        ownerObjectId: value.prjInfo.prjId,
      });
    },
    getPrjUseInfo: function(value) {
      if (!common.isEmpty(value.type)) {
        this.reportCheck = value.reportCheck;
      }
    },
    getPrjCauseList: function(value) {
      this.prjCauseList = value;
      const prjMeasureList = value.reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.causeDetermin == '10') {
          if (obj.measureTitle == null) {
            obj.measureTitle = '';
          }
          if (!obj.measureContent) {
            obj.measureContent = '';
          }
          obj.views = false;
          acc.push(obj);
        }
        return acc;
      }, []);
      this.$set(this, 'prjMeasureList', prjMeasureList);
    },
    getAllFileList: function(value) {
      this.allFileList = [];
      this.allFileList = value;
      this.getFileList();
    },
  },
  created() {
    this.resetReportCheck(false);
  },
  methods: {
    resetReportCheck(reset) {
      reset = reset || false;
      const obj = {};
      for (let i = 0; i < 11; i++) {
        obj[`DC${String(i).padStart(2, '0')}`] = reset;
        obj[`RD${String(i).padStart(2, '0')}`] = reset;
        obj[`DS${String(i).padStart(2, '0')}`] = reset;
        obj[`SA${String(i).padStart(2, '0')}`] = reset;
      }
      this.reportCheck = obj;
    },
    openKpiList() {
      this[specializedTasksTypes.actions.FETCH_PROJECT_KPI_LIST]({
        prjId: this.getReportInfo.prjInfo.prjId,
      });
      this[specializedTasksTypes.actions.INIT_VIEWS_KPI_LIST_POP](true);
    },
    setTabNames(prjType) {
      if (prjType === 'DC') this.GV_STEP_LIST = common.getCodeList('PRJ007');
      else if (prjType === 'RD')
        this.GV_STEP_LIST = common.getCodeList('PRJ008');
      else if (prjType === 'DS')
        this.GV_STEP_LIST = common.getCodeList('PRJ009');
      else if (prjType === 'SA')
        this.GV_STEP_LIST = common.getCodeList('PRJ010');
      else this.GV_STEP_LIST = common.getCodeList('PRJ007');
    },
    setReportChecked(prjType, reportInfo) {
      let prjReportList = reportInfo.prjReportList;
      let reportType = reportInfo.reportType;

      if (reportType === 'review') {
        //완료보고
        this.resetReportCheck(true);

        if (prjType === 'DC') {
          prjReportList.forEach(value => {
            this.reportCheck[value.prjStepCd] =
              value.reportYn == 'Y' ? true : false;
            if (value.prjStepCd === 'DC06' && value.reportYn === 'T') {
              this.reportCheck[value.prjStepCd] = true;
              this.reportCheck['DC00'] = true;
            } else if (value.prjStepCd === 'DC06' && value.reportYn !== 'T') {
              this.reportCheck['DC00'] = false;
            }
            if (value.prjStepCd === 'DC00') {
              this.reportCheck['DC00'] = true;
            }
          });
        } else {
          prjReportList.forEach(value => {
            this.reportCheck[value.prjStepCd] =
              value.reportYn == 'Y' ? true : false;
          });
        }
      } else if (reportType === 'preview') {
        //종료보고
        this.resetReportCheck(false);
        //this.reportCheck['DC00'] = true;
        this.reportList.map(val => {
          this.reportCheck[val] = true;
        });
      } else {
        // 대시보드, 과제리스트, 과제팝업리스트
        this.resetReportCheck(true);
      }
    },
    resetReportContent() {
      this.prjPlanInfo = { prjBudget: '', prjMan: '' };
      this.graspInfo = {
        fieldResult: '',
        fieldIssue: '',
      };
      this.effectInfo = { qntEff: '', qltEff: '' };
      this.bizInfo = {
        bizAny: '',
        custNeed: '',
      };
      this.csfList = [];
      this.targetInfo = { funcContent: '', devDirection: '' };
      this.devContentList = [];
      this.rdEffectInfo = { qntEff: '', qltEff: '' };
      this.graspContent = '';
      this.dscList = [];
      this.altList = [];
      this.implList = [];
      this.implBudget = '';
      this.implMan = '';
      this.dsEffectInfo = { qntEff: '', qltEff: '' };
      this.saCustInfo = {
        custInfo: '',
        tranHis: '',
        visitItem: '',
        visitResult: '',
      };
      this.saBizInfo = {
        custNeed: '',
        fieldVerifi: '',
      };
      this.custSugt = '';
      this.overcome = '';
      this.monList = [];
      this.transContent = '';
      this.saEffectInfo = { qntEff: '', qltEff: '' };
    },
    setReportContent(prjType, reportInfo) {
      this.resetReportContent();
      switch (prjType) {
        case 'DC':
          if (!common.isEmpty(reportInfo.prjPlanInfo))
            this.prjPlanInfo = reportInfo.prjPlanInfo;
          if (!common.isEmpty(reportInfo.prjGraspInfo))
            this.graspInfo = reportInfo.prjGraspInfo;
          if (!common.isEmpty(reportInfo.prjEffectInfo))
            this.effectInfo = reportInfo.prjEffectInfo;
          break;
        case 'RD':
          //* 시장분석(사업환경)
          if (!common.isEmpty(reportInfo.bizInfo))
            this.bizInfo = reportInfo.bizInfo;
          //* CSF 도출(목표수립)
          if (!common.isEmpty(reportInfo.csfList))
            this.csfList = reportInfo.csfList;
          //* CSF 도출 컵셉수립(핵심기능정의)
          if (!common.isEmpty(reportInfo.targetInfo))
            this.targetInfo = reportInfo.targetInfo;
          if (!common.isEmpty(reportInfo.devList))
            this.devContentList = reportInfo.devList;
          //* 효과파악
          if (!common.isEmpty(reportInfo.rdEffectInfo))
            this.rdEffectInfo = reportInfo.rdEffectInfo;
          break;
        case 'DS':
          if (!common.isEmpty(reportInfo.graspContent))
            this.graspContent = reportInfo.graspContent;
          if (!common.isEmpty(reportInfo.dscList))
            this.dscList = reportInfo.dscList;
          if (!common.isEmpty(reportInfo.altList))
            this.altList = reportInfo.altList;
          if (!common.isEmpty(reportInfo.implList))
            this.implList = reportInfo.implList.reduce((acc, cur) => {
              const obj = { ...cur };
              obj.implFromDate = timezone.convertToClientTimeZone(
                obj.implFromDate,
                'YYYY-MM-DD',
              );
              obj.implToDate = timezone.convertToClientTimeZone(
                obj.implToDate,
                'YYYY-MM-DD',
              );
              acc.push(obj);
              return acc;
            }, []);
          this.implBudget = reportInfo.implList[0].implBudget;
          this.implMan = reportInfo.implList[0].implMan;
          if (!common.isEmpty(reportInfo.dsEffectInfo))
            this.dsEffectInfo = reportInfo.dsEffectInfo;
          break;
        case 'SA':
          if (!common.isEmpty(reportInfo.saCustInfo))
            this.saCustInfo = reportInfo.saCustInfo;
          if (!common.isEmpty(reportInfo.saBizInfo))
            this.saBizInfo = reportInfo.saBizInfo;
          if (!common.isEmpty(reportInfo.custSugt))
            this.custSugt = reportInfo.custSugt;
          if (!common.isEmpty(reportInfo.overcome))
            this.overcome = reportInfo.overcome;
          if (!common.isEmpty(reportInfo.monList)) {
            this.monList = reportInfo.monList.reduce((acc, cur) => {
              const obj = { ...cur };
              (obj.monDate = timezone.convertToClientTimeZone(
                obj.monDate,
                'YYYY-MM-DD',
              )),
                acc.push(obj);
              return acc;
            }, []);
            this.transContent = this.monList[0].transContent;
          }
          if (!common.isEmpty(reportInfo.saEffectInfo))
            this.saEffectInfo = reportInfo.saEffectInfo;
          break;
      }

      this.setReportChecked(this.prjInfo.prjType, reportInfo);
    },
    onFocuseTitle(currentKey) {
      const title = this.$refs.reportTitle.$refs.reportTitle;
      if (!common.isEmpty(title)) this.onScroll(title);
      this.onTab(currentKey);
    },
    onFocuseStep1(currentKey) {
      const step1 = this.$refs.report.$refs.reportStep1;
      if (!common.isEmpty(step1)) this.onScroll(step1);
      this.onTab(currentKey);
    },
    onFocuseStep2(currentKey) {
      const step2 = this.$refs.report.$refs.reportStep2;
      if (!common.isEmpty(step2)) this.onScroll(step2);
      this.onTab(currentKey);
    },
    onFocuseStep3(currentKey) {
      const step3 = this.$refs.report.$refs.reportStep3;
      if (!common.isEmpty(step3)) this.onScroll(step3);
      this.onTab(currentKey);
    },
    onFocuseEtc(currentKey) {
      const etc = this.$refs.report.$refs.reportEtc;
      if (!common.isEmpty(etc)) this.onScroll(etc);
      this.onTab(currentKey);
    },
    onScroll(el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    },
    onTab(currentKey) {
      Object.entries(this.currentInfo).forEach(([key, value]) => {
        this.currentInfo[key] = currentKey === key ? !value : false;
      });
    },
    closePopup() {
      Object.entries(this.currentInfo).forEach(([key]) => {
        if (key === 'current0') this.currentInfo[key] = true;
        else this.currentInfo[key] = false;
      });
      this.$emit('input', false);
    },
    async openAtchFilePop(stepCd) {
      const param = { prjStep: stepCd, fileList: [] };
      if (stepCd === 'DC05') param.fileList = this.graspFileList;
      else if (stepCd === 'DC06') param.fileList = this.potenalFileList;
      else if (stepCd === 'DC07') param.fileList = this.measureFileList;
      else if (stepCd === 'DC08') param.fileList = this.planFileList;
      else if (stepCd === 'DC09') param.fileList = this.realizeFileList;
      else if (stepCd === 'DC10') param.fileList = this.effectFileList;
      else if (stepCd === 'RD05') param.fileList = this.bizAysFileList;
      else if (stepCd === 'RD06') param.fileList = this.csfFileList;
      else if (stepCd === 'RD07') param.fileList = this.dercFileList;
      else if (stepCd === 'RD08') param.fileList = this.devFileList;
      else if (stepCd === 'RD09') param.fileList = this.pilotFileList;
      else if (stepCd === 'RD10') param.fileList = this.rdEffectFileList;
      else if (stepCd === 'DS05') param.fileList = this.rdgraspFileList;
      else if (stepCd === 'DS06') param.fileList = this.dscFileList;
      else if (stepCd === 'DS07') param.fileList = this.altFileList;
      else if (stepCd === 'DS08') param.fileList = this.implFileList;
      else if (stepCd === 'DS09') param.fileList = this.riskFileList;
      else if (stepCd === 'DS10') param.fileList = this.dsEffectFileList;
      else if (stepCd === 'SA05') param.fileList = this.custFileList;
      else if (stepCd === 'SA06') param.fileList = this.bizFileList;
      else if (stepCd === 'SA07') param.fileList = this.suggestFileList;
      else if (stepCd === 'SA08') param.fileList = this.overFileList;
      else if (stepCd === 'SA09') param.fileList = this.monFileList;
      else if (stepCd === 'SA10') param.fileList = this.saEffectFileList;
      else if (stepCd === 'DC02') param.fileList = this.dcOViewFileList;
      else if (stepCd === 'DS02') param.fileList = this.dsOViewFileList;
      else if (stepCd === 'RD02') param.fileList = this.rdOViewFileList;
      else if (stepCd === 'SA02') param.fileList = this.saOViewFileList;
      else if (stepCd === 'DC03') param.fileList = this.dcRViewFileList;
      else if (stepCd === 'DS03') param.fileList = this.dsRViewFileList;
      else if (stepCd === 'RD03') param.fileList = this.rdRViewFileList;
      else if (stepCd === 'SA03') param.fileList = this.saRViewFileList;

      await this[specializedTasksTypes.actions.INIT_PROJECT_ATTACH_FILE_INFO](
        param,
      );
      await this[specializedTasksTypes.actions.INIT_VIEWS_ATTACH_FILE_POP](
        true,
      );
    },
    async getFileList() {
      this.graspFileList = [];
      this.potenalFileList = [];
      this.measureFileList = [];
      this.realizeFileList = [];
      this.effectFileList = [];

      this.bizAysFileList = [];
      this.dercFileList = [];
      this.devFileList = [];
      this.pilotFileList = [];
      this.rdEffectFileList = [];

      this.implFileList = [];
      this.riskFileList = [];
      this.dsEffectFileList = [];

      this.suggestFileList = [];
      this.overFileList = [];
      this.monFileList = [];
      this.saEffectFileList = [];

      //추가
      this.custFileList = [];
      this.bizFileList = [];
      this.csfFileList = [];
      this.rdgraspFileList = [];
      this.dscFileList = [];
      this.altFileList = [];
      this.planFileList = [];

      this.dcOViewFileList = [];
      this.dsOViewFileList = [];
      this.rdOViewFileList = [];
      this.saOViewFileList = [];
      this.dcRViewFileList = [];
      this.dsRViewFileList = [];
      this.rdRViewFileList = [];
      this.saRViewFileList = [];

      for (let item of this.allFileList) {
        if (item.downloadType === 'DC05') this.graspFileList.push(item);
        else if (item.downloadType === 'DC06') this.potenalFileList.push(item);
        else if (item.downloadType === 'DC07') this.measureFileList.push(item);
        else if (item.downloadType === 'DC08') this.planFileList.push(item);
        else if (item.downloadType === 'DC09') this.realizeFileList.push(item);
        else if (item.downloadType === 'DC10') this.effectFileList.push(item);
        else if (item.downloadType === 'RD05') this.bizAysFileList.push(item);
        else if (item.downloadType === 'RD06') this.csfFileList.push(item);
        else if (item.downloadType === 'RD07') this.dercFileList.push(item);
        else if (item.downloadType === 'RD08') this.devFileList.push(item);
        else if (item.downloadType === 'RD09') this.pilotFileList.push(item);
        else if (item.downloadType === 'RD10') this.rdEffectFileList.push(item);
        else if (item.downloadType === 'DS05') this.dscFileList.push(item);
        else if (item.downloadType === 'DS06') this.altFileList.push(item);
        else if (item.downloadType === 'DS07') this.dsEffectFileList.push(item);
        else if (item.downloadType === 'DS08') this.implFileList.push(item);
        else if (item.downloadType === 'DS09') this.riskFileList.push(item);
        else if (item.downloadType === 'DS10') this.dsEffectFileList.push(item);
        else if (item.downloadType === 'SA05') this.custFileList.push(item);
        else if (item.downloadType === 'SA06') this.bizFileList.push(item);
        else if (item.downloadType === 'SA07') this.suggestFileList.push(item);
        else if (item.downloadType === 'SA08') this.overFileList.push(item);
        else if (item.downloadType === 'SA09') this.monFileList.push(item);
        else if (item.downloadType === 'SA10') this.saEffectFileList.push(item);
        else if (item.downloadType === 'DC02') this.dcOViewFileList.push(item);
        else if (item.downloadType === 'DS02') this.dsOViewFileList.push(item);
        else if (item.downloadType === 'RD02') this.rdOViewFileList.push(item);
        else if (item.downloadType === 'SA02') this.saOViewFileList.push(item);
        else if (item.downloadType === 'DC03') this.dcRViewFileList.push(item);
        else if (item.downloadType === 'DS03') this.dsRViewFileList.push(item);
        else if (item.downloadType === 'RD03') this.rdRViewFileList.push(item);
        else if (item.downloadType === 'SA03') this.saRViewFileList.push(item);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.type-report {
  width: 100vw;
}
.layer-pop-wrap {
  max-width: 100%;
}
.page__layer-pop .layer-pop__box.type-report {
  width: 100%;
  // max-width: 1417px;
}

.page__layer-pop .layer-pop__box .layer-pop__title.type5 {
  height: auto;
  white-space: normal;
}
.page__layer-pop .layer-pop__box .layer-pop__title p {
  @include breakpoint(desktop-s) {
    width: 100%;
    display: block;
  }
}
</style>
