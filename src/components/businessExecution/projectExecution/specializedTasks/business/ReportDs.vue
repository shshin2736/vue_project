<template>
  <div class="report-result-box">
    <!-- 계획검토 -->
    <template>
      <input type="text" readonly style="opacity:0" width="0" />
      <p class="report-title" ref="reportStep1">
        {{ title[0].cdNm }}
      </p>
      <div
        v-if="reportCheck['DS02'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000503') }}
        <button
          v-if="dsoverViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS02')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DS02'] === true ? true : false"
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
        v-if="reportCheck['DS03'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000504') }}
        <button
          v-if="dsresourceViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS03')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DS03'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 	소요 자원 계획(비용/일정) -->
            <report-content :title="$t('NLS0000531')" :content="prjResource" />
          </tbody>
        </table>
      </div>
    </template>
    <!-- 대안선정->기획 -->
    <template>
      <p class="report-title" ref="reportStep2">
        {{ title[1].cdNm }}
      </p>
      <div
        v-if="reportCheck['DS05'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0001451') }}
        <button
          v-if="rdgraspFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS05')"
        >
          file
        </button>
      </div>
      <!-- 보고서->상황 분석 -->
      <div
        v-if="reportCheck['DS05'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 현상 파악 -->
            <report-content :title="$t('NLS0001451')" :content="graspContent" />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['DS06'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000899') }}
        <button
          v-if="dscFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS06')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DS06'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:45%;" />
            <col style="width:55%;" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ $t('NLS0000591') }}</th>
              <th scope="col">{{ $t('NLS0000590') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in dscList" :key="i">
              <td>{{ item.stdDecision }}</td>
              <td v-html="item.consDecision"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="reportCheck['DS07'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000592') }}
        <button
          v-if="altFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS07')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DS07'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:33%;" />
            <col style="width:33%;" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ $t('NLS0000593') }}</th>
              <th scope="col">{{ $t('NLS0000595') }}</th>
              <th scope="col">{{ $t('NLS0000594') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in altList" :key="i">
              <td>{{ item.altDecision }}</td>
              <td v-html="item.altResult"></td>
              <td v-html="item.optObj"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="reportCheck['DS08'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0001458') }}
        <button
          v-if="implFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS08')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DS08'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:50%;" />
            <col style="width:30%;" />
            <col style="width:20%;" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">{{ $t('NLS0000596') }}</th>
              <th scope="col">{{ $t('NLS0000597') }}</th>
              <th scope="col">{{ $t('NLS0000064') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in implList" :key="i">
              <td>{{ item.implPlan }}</td>
              <td>{{ item.implFromDate }} ~ {{ item.implToDate }}</td>
              <td>{{ item.implDeptNm }}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th rowspan="2" scope="col">
                {{ $t('NLS0000892') }}
              </th>
              <td>
                <div>
                  {{ $t('NLS0000893') }} :<span
                    style="display:inline-block;"
                    v-html="implBudget"
                  ></span>
                </div>
                <div>
                  {{ $t('NLS0000894') }} :<span
                    style="display:inline-block;"
                    v-html="implMan"
                  ></span>
                </div>
              </td>
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
        class="report-subtitle"
        v-if="reportCheck['DS09'] === true ? true : false"
      >
        {{ $t('NLS0000601') }}
        <button
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS09')"
          v-if="riskFileList.length > 0"
        >
          file
        </button>
      </div>
      <div
        class="report-table"
        v-if="reportCheck['DS09'] === true ? true : false"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col style="width:26%" />
            <col style="width:27%" />
            <col style="width:27%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th>{{ $t('NLS0000900') }}</th>
              <th>{{ $t('NLS0000601') }}</th>
              <th>{{ $t('NLS0000602') }}</th>
              <th>{{ $t('NLS0000603') }}</th>
            </tr>
            <tr v-for="(item, i) in implList" :key="i">
              <td>{{ item.implPlan }}</td>
              <td v-html="item.detailPlan"></td>
              <td v-html="item.expRisk"></td>
              <td v-html="item.expMeasure"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="report-subtitle"
        v-if="reportCheck['DS10'] === true ? true : false"
      >
        {{ $t('NLS0000551') }}
        <button
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DS10')"
          v-if="dsEffectFileList.length > 0"
        >
          file
        </button>
      </div>
      <div
        class="report-table"
        v-if="reportCheck['DS10'] === true ? true : false"
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
              :content="dsEffectInfo.qntEff"
            />
            <!-- 	정성적 효과 -->
            <report-content
              :title="$t('NLS0000553')"
              :content="dsEffectInfo.qltEff"
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
    graspContent: {
      type: String,
      required: false,
    },
    dscList: {
      type: Array,
      required: false,
    },
    altList: {
      type: Array,
      required: false,
    },
    implFileList: {
      type: Array,
      required: false,
    },
    implList: {
      type: Array,
      required: false,
    },
    riskFileList: {
      type: Array,
      required: false,
    },
    dsEffectFileList: {
      type: Array,
      required: false,
    },
    dsEffectInfo: {
      type: Object,
      required: false,
    },
    implBudget: {
      type: String,
      required: false,
    },
    implMan: {
      type: String,
      required: false,
    },
    rdgraspFileList: {
      type: Array,
      required: false,
    },
    dscFileList: {
      type: Array,
      required: false,
    },
    altFileList: {
      type: Array,
      required: false,
    },
    dsoverViewFileList: {
      type: Array,
      required: false,
    },
    dsresourceViewFileList: {
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
