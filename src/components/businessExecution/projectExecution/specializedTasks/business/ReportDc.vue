<template>
  <div class="report-result-box">
    <!-- 계획검토 -->
    <template>
      <p class="report-title" ref="reportStep1">
        {{ title[0].cdNm }}
      </p>
      <div
        v-if="reportCheck['DC02'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 추진개요 -->
        {{ $t('NLS0000503') }}
        <button
          v-if="dcoverViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC02')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC02'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 추진 목표 및 기대효과	 -->
            <report-content
              :title="$t('NLS0000529')"
              :content="overViewInfo != null ? overViewInfo.prjResume : ''"
            />
            <!-- 추진 배경 및 참고 웹사이트	 -->
            <report-content
              :title="$t('NLS0000530')"
              :content="overViewInfo != null ? overViewInfo.prjBg : ''"
            />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['DC03'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 소요자원 -->
        {{ $t('NLS0000504') }}
        <button
          v-if="dcresourceViewFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC03')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC03'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 소요 자원 계획(비용/일정)	 -->
            <report-content :title="$t('NLS0000531')" :content="prjResource" />
          </tbody>
        </table>
      </div>
    </template>
    <!-- 대책수립 -->
    <template>
      <p class="report-title" ref="reportStep2">
        {{ title[1].cdNm }}
      </p>
      <div
        v-if="reportCheck['DC05'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 현상 파악	 -->
        {{ $t('NLS0000890') }}
        <button
          v-if="graspFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC05')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC05'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 현장 조사 결과	 -->
            <report-content
              :title="$t('NLS0000535')"
              :content="graspInfo.fieldResult"
            />
            <!-- 중요 문제점 	 -->
            <report-content
              :title="$t('NLS0000536')"
              :content="graspInfo.fieldIssue"
            />
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['DC06'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 원인 도출	 -->
        {{ $t('NLS0000891') }}
        <button
          v-if="potenalFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC06')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC06'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <!-- 잠재원인 -->
              <th scope="col">{{ $t('NLS0001449') }}</th>
              <td>
                <span v-for="item in prjCauseList" :key="item.prjSeq">
                  {{ item.causeItem
                  }}{{
                    item.causeDetermin != '30'
                      ? `(${item.causeDeterminNm})`
                      : ''
                  }}
                  <br />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="report-table type-horizontal"
        v-if="reportCheck['DC06'] === true ? true : false"
      >
        <table>
          <colgroup>
            <col style="width:30%" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <!-- 중요원인 -->
              <th scope="row">{{ $t('NLS0000560') }}</th>
              <!-- 검증 -->
              <th scope="row">{{ $t('NLS0000561') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in prjMeasureList" :key="item.prjSeq">
              <td>
                <strong>{{ item.causeItem }}</strong>
              </td>
              <td v-html="item.causeVerifi"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="report-subtitle"
        v-if="reportCheck['DC07'] === true ? true : false"
      >
        <!-- 대책수립 -->
        {{ $t('NLS0000527') }}
        <button
          v-if="measureFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC07')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC07'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 개선대책->대책 -->
            <tr v-for="(item, i) in prjMeasureList" :key="item.prjSeq">
              <th
                v-if="i === 0"
                :rowspan="prjMeasureList.length + 2"
                scope="col"
              >
                {{ $t('NLS0000457') }}
              </th>
              <td class="cause">
                <div
                  class="cause-header"
                  v-html="$t('NLS0001467') + ' : ' + item.causeItem"
                ></div>
                <div class="cause-content" v-html="item.measureTitle"></div>
                <div class="cause-content" v-html="item.measureContent"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['DC08'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 상세계획 -->
        {{ $t('NLS0000573') }}
        <button
          v-if="planFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC08')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC08'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <!-- 소요자원 계획	 -->
              <th rowspan="2" scope="col">
                {{ $t('NLS0000892') }}
              </th>
              <th style="width:75px;border-left: 1px solid #ddd;">
                <!-- 소요 예산	 -->
                {{ $t('NLS0000893') }}
              </th>
              <td>
                <span v-html="prjPlanInfo.prjBudget"></span>
              </td>
            </tr>
            <tr>
              <th style="width:75px;border-left: 1px solid #ddd;">
                <!-- 소요 인력	 -->
                {{ $t('NLS0000894') }}
              </th>
              <td>
                <span v-html="prjPlanInfo.prjMan"></span>
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
        v-if="reportCheck['DC09'] === true ? true : false"
        class="report-subtitle"
      >
        <!-- 현장적용 -->
        {{ $t('NLS0000550') }}
        <button
          v-if="realizeFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC09')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC09'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:33%" />
            <col style="width:33%" />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <!-- 잠재원인 -->
              <th>{{ $t('NLS0000539') }}</th>
              <!-- 개선대책 -->
              <th>{{ $t('NLS0000545') }}</th>
              <!-- 실행결과 및 보완	 -->
              <th>{{ $t('NLS0000895') }}</th>
            </tr>
            <tr v-for="item in prjMeasureList" :key="item.prjSeq">
              <td>{{ item.causeItem }}</td>
              <td v-html="item.measureTitle"></td>
              <td v-html="item.measureResult"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="reportCheck['DC10'] === true ? true : false"
        class="report-subtitle"
      >
        {{ $t('NLS0000551') }}
        <button
          v-if="effectFileList.length > 0"
          type="button"
          class="file-btn"
          @click="openAtchFilePop('DC10')"
        >
          file
        </button>
      </div>
      <div
        v-if="reportCheck['DC10'] === true ? true : false"
        class="report-table"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <!-- 정량적 효과	 -->
            <report-content
              :title="$t('NLS0000552')"
              :content="effectInfo.qntEff"
            />
            <!-- 정성적 효과	 -->
            <report-content
              :title="$t('NLS0000553')"
              :content="effectInfo.qltEff"
            />
          </tbody>
        </table>
      </div>
    </template>
    <!-- 부록 -->
    <template>
      <p class="report-title" ref="reportEtc">
        {{ $t('NLS0000555') }}
      </p>
      <div
        class="report-subtitle"
        v-if="reportCheck['DC00'] === true ? true : false"
      >
        <!-- 잠재원인 -->
        {{ $t('NLS0000539') }}
      </div>
      <div
        class="report-table"
        v-if="reportCheck['DC00'] === true ? true : false"
      >
        <table>
          <colgroup>
            <col style="width:20%" />
            <col />
          </colgroup>
          <tbody>
            <tr v-if="prjCauseList.length > 0">
              <!-- 즉실천 -->
              <th rowspan="4" scope="col">
                {{ $t('NLS0000193') }}
              </th>
              <th v-html="prjCauseList[0].causeItem"></th>
            </tr>
            <tr v-for="(item, i) in prjCauseList" :key="item.prjSeq">
              <td
                v-if="i % 2 === 0 && item.causeDetermin === '30'"
                v-html="item.causeVerifi"
              ></td>
              <td
                v-if="i % 2 === 1 && item.causeDetermin === '30'"
                v-html="item.causeItem"
              ></td>
            </tr>
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
    graspFileList: {
      type: Array,
      required: false,
    },
    potenalFileList: {
      type: Array,
      required: false,
    },
    prjCauseList: {
      type: Array,
      required: false,
    },
    prjMeasureList: {
      type: Array,
      required: false,
    },
    prjPlanInfo: {
      type: Object,
      required: false,
    },
    graspInfo: {
      type: Object,
      required: false,
    },
    measureFileList: {
      type: Array,
      required: false,
    },
    realizeFileList: {
      type: Array,
      required: false,
    },
    effectFileList: {
      type: Array,
      required: false,
    },
    effectInfo: {
      type: Object,
      required: false,
    },
    planFileList: {
      type: Array,
      required: false,
    },
    dcoverViewFileList: {
      type: Array,
      required: false,
    },
    dcresourceViewFileList: {
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
