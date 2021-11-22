<template>
  <div class="report-result-box">
    <!-- 계획검토 -->
    <template>
      <input type="text" style="opacity:0" width="0" />
      <p class="report-title" ref="reportStep1">
        {{ title[0].cdNm }}
      </p>
      <div
        v-if="reportCheck['SA02'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000503') }}
        <button
          v-if="saoverViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA02')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA02'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 추진 목표 및 기대효과 -->
            <report-content
              :title="$t('NLS0000529')"
              :content="overViewInfo != null ? overViewInfo.prjResume : ''"
            />
            <!-- 추진 배경 및 참고 웹사이트 -->
            <report-content
              :title="$t('NLS0000530')"
              :content="overViewInfo != null ? overViewInfo.prjBg : ''"
            />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['SA03'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000504') }}
        <button
          v-if="saresourceViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA03')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA03'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 소요 자원 계획(비용/일정) -->
            <report-content :title="$t('NLS0000531')" :content="prjResource" />
          </tbody>
        </table>
      </div>
    </template>
    <!-- 영업제안 -->
    <template>
      <p class="report-title" ref="reportStep2">
        {{ title[1].cdNm }}
      </p>
      <div
        v-if="reportCheck['SA05'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000613') }}
        <button
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA05')"
          v-if="custFileList.length > 0"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA05'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 고객 기본 정보 -->
            <report-content
              :title="$t('NLS0000901')"
              :content="saCustInfo.custInfo"
            />
            <!-- 기존 거래 내역 -->
            <report-content
              :title="$t('NLS0000606')"
              :content="saCustInfo.tranHis"
            />
            <!-- 	방문 시 조사 항목 -->
            <report-content
              :title="$t('NLS0000607')"
              :content="saCustInfo.visitItem"
            />
            <!-- 	방문 결과 -->
            <report-content
              :title="$t('NLS0000608')"
              :content="saCustInfo.visitResult"
            />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['SA06'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000614') }}
        <button
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA06')"
          v-if="bizFileList.length > 0"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA06'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 고객 니즈 -->
            <report-content
              :title="$t('NLS0000609')"
              :content="saBizInfo.custNeed"
            />
            <!-- 현장조사 및 검증 -->
            <report-content
              :title="$t('NLS0000610')"
              :content="saBizInfo.fieldVerifi"
            />
          </tbody>
        </table>
      </div>

      <div
        v-if="reportCheck['SA07'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 제시 -->
        {{ $t('NLS0000612') }}
        <button
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA07')"
          v-if="suggestFileList.length > 0"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA07'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 고객 제안 내용 -->
            <report-content :title="$t('NLS0000611')" :content="custSugt" />
          </tbody>
        </table>
      </div>

      <div
        v-if="reportCheck['SA08'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 입증 -->
        {{ $t('NLS0000615') }}
        <button
          v-if="overFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA08')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA08'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 반론 극복 / 결정유도 활동 -->
            <report-content :title="$t('NLS0000616')" :content="overcome" />
          </tbody>
        </table>
      </div>
    </template>
    <!-- 적용완료 -->
    <template>
      <p class="report-title" ref="reportStep3">
        {{ title[2].cdNm }}
      </p>
      <div
        class="report-subtitle"
        v-if="reportCheck['SA09'] === true ? true : false"
      >
        <!-- 결정 -->
        {{ $t('NLS0000618') }}
        <button
          v-if="monFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA09')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA09'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>Date</th>
              <!-- 모니터링 결과 -->
              <th>{{ $t('NLS0000621') }}</th>
            </tr>
            <report-content
              v-for="(item, i) in monList"
              :key="i"
              :title="item.monDate"
              :content="item.monResult != null ? item.monResult : ''"
            />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['SA09'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000620') }}
      </div>
      <div
        v-if="reportCheck['SA09'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 거래 개설 내역 -->
            <report-content
              :title="$t('NLS0000620')"
              v-if="monList.length > 0"
              :content="monList[0].transContent"
            />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['SA10'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 효과파악 -->
        {{ $t('NLS0000551') }}
        <button
          v-if="saEffectFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('SA10')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['SA10'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 정량적 효과 -->
            <report-content
              :title="$t('NLS0000552')"
              :content="saEffectInfo.qntEff"
            />
            <report-content
              :title="$t('NLS0000553')"
              :content="saEffectInfo.qltEff"
            />
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import ReportContent from '@/components/businessExecution/projectExecution/specializedTasks/business/ReportContent.vue';

export default {
  components: {
    ReportContent,
  },
  props: {
    prjType: {
      type: String,
      required: false,
    },
    title: {
      type: Array,
      required: false,
    },
    reportCheck: {
      type: Object,
      required: false,
    },
    overViewInfo: {
      type: Object,
      required: false,
    },
    prjResource: {
      type: String,
      required: false,
    },
    saCustInfo: {
      type: Object,
      required: false,
    },
    saBizInfo: {
      type: Object,
      required: false,
    },
    suggestFileList: {
      type: Array,
      required: false,
    },
    custSugt: {
      type: String,
      required: false,
    },
    overFileList: {
      type: Array,
      required: false,
    },
    overcome: {
      type: String,
      required: false,
    },
    monFileList: {
      type: Array,
      required: false,
    },
    monList: {
      type: Array,
      required: false,
    },
    saEffectFileList: {
      type: Array,
      required: false,
    },
    saEffectInfo: {
      type: Object,
      required: false,
    },
    custFileList: {
      type: Array,
      required: false,
    },
    bizFileList: {
      type: Array,
      required: false,
    },
    saoverViewFileList: {
      type: Array,
      required: false,
    },
    saresourceViewFileList: {
      type: Array,
      required: false,
    },
  },
  methods: {
    openAtchFilePop(type) {
      this.$emit('openFile', type);
    },
  },
};
</script>
