<template>
  <div class="report-result-box">
    <!-- 계획검토 -->
    <template>
      <input type="text" readonly style="opacity:0" width="0" />
      <p class="report-title" ref="reportStep1">
        {{ title[0].cdNm }}
      </p>
      <div
        class="report-subtitle"
        v-if="reportCheck['RD02'] === true ? true : false"
      >
        {{ $t('NLS0000503') }}
        <button
          v-if="rdoverViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD02')"
        >
          file
        </button>
      </div>
      <div
        class="report-table"
        v-if="reportCheck['RD02'] === true ? true : false"
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
        v-if="reportCheck['RD03'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000504') }}
        <button
          v-if="rdresourceViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD03')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD03'] === true ? true : false"
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
    <!-- 연구개발 -->
    <template>
      <p class="report-title" ref="reportStep2">
        {{ title[1].cdNm }}
      </p>
      <div
        v-if="reportCheck['RD05'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000896') }}
        <button
          v-if="bizAysFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD05')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD05'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 	사업 환경 분석 -->
            <report-content
              :title="$t('NLS0000563')"
              :content="bizInfo.bizAny"
            />
            <!-- 	고객 니즈 조사 -->
            <report-content
              :title="$t('NLS0000564')"
              :content="bizInfo.custNeed"
            />
          </tbody>
        </table>
      </div>

      <div
        v-if="reportCheck['RD06'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000565') }}
        <button
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD06')"
          v-if="csfFileList.length > 0"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD06'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:25%;" />
            <col style="width:25%;" />
            <col style="width:25%;" />
            <col style="width:25%;" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ $t('NLS0000568') }}</th>
              <th scope="col">{{ $t('NLS0000567') }}</th>
              <th scope="col">{{ $t('NLS0000569') }}</th>
              <th scope="col">GAP</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in csfList" :key="i">
              <td>{{ item.targetItem }}</td>
              <td>{{ item.targetNum }}</td>
              <td>{{ item.targetNow }}</td>
              <td>{{ item.targetGap }}</td>
            </tr>
          </tbody>
        </table>

        <!-- <div
          v-if="reportCheck['RD06'] === true ? true : false"
          class="report-subtitle"
        >
          {{ $t('NLS0000566') }}
        </div> -->
        <div
          v-if="reportCheck['RD06'] === true ? true : false"
          class="report-table"
        >
          <table>
            <colgroup>
              <col style="width:20%" />
              <col />
            </colgroup>
            <tbody>
              <!-- 핵심기능 정의 -->
              <report-content
                :title="$t('NLS0000566')"
                :content="targetInfo.funcContent"
              />
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-if="reportCheck['RD07'] === true ? true : false"
        class="report-subtitle"
      >
        <!--컨셉 수립-->
        {{ $t('NLS0000571') }}
        <button
          v-if="dercFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD07')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD07'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 개발방향 결정 -->
            <report-content
              :title="$t('NLS0000572')"
              :content="targetInfo.devDirection"
            />
          </tbody>
        </table>
      </div>

      <div
        v-if="reportCheck['RD08'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0001459') }}
        <button
          v-if="devFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD08')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD08'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:45%;" />
            <col style="width:55%;" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" style="width:80px">{{ $t('NLS0000898') }}</th>
              <th scope="col">{{ $t('NLS0000930') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in devContentList" :key="i">
              <td v-html="item.directionItem"></td>
              <td v-html="item.devResult"></td>
            </tr>
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
        v-if="reportCheck['RD09'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0001460') }}
        <button
          v-if="pilotFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD09')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD09'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:33%;" />
            <col style="width:33%;" />
            <col style="width:25%;" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ $t('NLS0000898') }}</th>
              <th scope="col">{{ $t('NLS0000578') }}</th>
              <th scope="col">{{ $t('NLS0000580') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in devContentList" :key="i">
              <td>{{ item.directionItem }}</td>
              <td v-html="item.pilotResult"></td>
              <td v-html="item.pilotMeasure"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['RD10'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000551') }}
        <button
          v-if="rdEffectFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('RD10')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['RD10'] === true ? true : false"
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
              :content="rdEffectInfo.qntEff"
            />
            <!-- 정성적 효과 -->
            <report-content
              :title="$t('NLS0000553')"
              :content="rdEffectInfo.qltEff"
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
    bizAysFileList: {
      type: Array,
      required: false,
    },
    bizInfo: {
      type: Object,
      required: false,
    },
    prjResource: {
      type: String,
      required: false,
    },
    csfList: {
      type: Array,
      required: false,
    },
    dercFileList: {
      type: Array,
      required: false,
    },
    devContentList: {
      type: Array,
      required: false,
    },
    rdEffectFileList: {
      type: Array,
      required: false,
    },
    rdEffectInfo: {
      type: Object,
      required: false,
    },
    pilotFileList: {
      type: Array,
      required: false,
    },
    targetInfo: {
      type: Object,
      required: false,
    },
    devFileList: {
      type: Array,
      required: false,
    },
    csfFileList: {
      type: Array,
      required: false,
    },
    rdoverViewFileList: {
      type: Array,
      required: false,
    },
    rdresourceViewFileList: {
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
