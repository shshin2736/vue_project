<template>
  <!--업무 관리-->
  <dashboard-box
    :title="$t('NLS0000465')"
    mainClass="dashboard__schedule"
    :contentsClassList="contentsClassList"
    :headerFix="true"
    :checkBtn="true"
    :checkLabel="[$t('NLS0000627'), $t('NLS0000628')]"
    :progress="progress"
    progressHeight="240px"
    @checkbox="checkbox"
  >
    <template v-slot:slot0>
      <table>
        <colgroup>
          <col style="width:35%" />
          <col style="width:30%" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="row">{{ $t('NLS0001271') }}</th>
            <!--일자-->
            <th scope="row">KPI</th>
            <!--성공/부진사유-->
            <th scope="row">{{ $t('NLS0000456') }}</th>
          </tr>
        </thead>
        <tbody v-if="showWeek">
          <tr
            v-for="(item, i) in weekMeasureData"
            :key="i"
            :class="{ 'schedule-on': item.kpiNm, ' select-row': item.today }"
          >
            <th scope="row">
              <span class="schedule-date"
                >{{ item.weekFromDateForm }} ~ {{ item.weekToDateForm }} ({{
                  item.weekYNum
                }}{{ $t('NLS0000813') }})</span
              >
            </th>
            <td
              :class="{ 'under-line-btn cursor-pointer': item.kpiNm }"
              @click="onClickRow(item)"
            >
              {{ item.kpiNm }}
            </td>
            <td>{{ item.contents }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(item, i) in yearMeasureData"
            :key="i"
            :class="{ 'schedule-on': item.kpiNm, ' select-row': item.today }"
          >
            <th scope="row">
              <span class="schedule-date"
                >{{ item.yearDateForm }} ({{ item.day }})</span
              >
            </th>
            <td
              :class="{ 'under-line-btn cursor-pointer': item.kpiNm }"
              @click="onClickRow(item)"
            >
              {{ item.kpiNm }}
            </td>
            <td>{{ item.contents }}</td>
          </tr>
        </tbody>
      </table>
      <a ref="links"></a>
    </template>
  </dashboard-box>
</template>

<script>
import DashboardBox from '@/components/dashboard/business/DashboardBox';
import { common, timezone } from '@/utils';
import { dashboardStore } from '@/mixins';
import * as dashboardTypes from '@/store/modules/dashboard/types';
export default {
  name: 'BusinessManagementForm',
  mixins: [dashboardStore],
  components: {
    DashboardBox,
  },
  data() {
    return {
      contentsClassList: ['hms-scheduletable'],
      progress: false,
      showWeek: true,
      yearMeasureData: [],
      weekMeasureData: [],
      today: timezone.getClientDate('YYYYMMDD'),
    };
  },
  computed: {
    getYearReasonList() {
      return this[dashboardTypes.getters.GET_DASHBOARD_REASON_MANAGE_YEAR_LIST];
    },
    getWeekReasonList() {
      return this[dashboardTypes.getters.GET_DASHBOARD_REASON_MANAGE_WEEK_LIST];
    },
  },
  watch: {
    getYearReasonList: function(list) {
      let resultList = list.map(el => {
        let obj = { ...el };
        obj.day = timezone.convertToClientTimeZone(obj.yearDate, 'ddd');
        obj.contents = this.getTextContents(obj.contents);
        let yeardate = timezone.convertToDateFormat(obj.yearDate, 'YYYYMMDD');
        obj.today = this.today === yeardate ? true : false;
        obj.baseYyyyMm = timezone.convertToDateFormat(obj.baseYyyymm, 'YYYYMM');
        return obj;
      });
      this.yearMeasureData = [...resultList];
      this.getScrollLocation();
    },
    getWeekReasonList: function(list) {
      let resultList = list.map(el => {
        let obj = { ...el };
        obj.contents = this.getTextContents(obj.contents);
        let weekFromDate = timezone.convertToDateFormat(
          obj.weekFromDate,
          'YYYYMMDD',
        );
        let weekToDate = timezone.convertToDateFormat(
          obj.weekToDate,
          'YYYYMMDD',
        );
        obj.today =
          this.today >= weekFromDate && this.today <= weekToDate ? true : false;
        obj.baseYyyyMm = timezone.convertToDateFormat(obj.baseYyyymm, 'YYYYMM');
        return obj;
      });
      this.weekMeasureData = [...resultList];
    },
  },
  mounted() {
    this[dashboardTypes.actions.FETCH_DASHBOARD_REASON_MANAGE_LIST]({
      baseYyyy: timezone.getClientDate('YYYY'),
    });
  },
  methods: {
    checkbox(e) {
      this.showWeek = e.target.checked ? true : false;
      this.getScrollLocation();
    },
    getTextContents(tmp) {
      if (common.isEmpty(tmp)) return '';
      tmp = tmp.replace(/(<([^>]+)>)/gi, ''); //태그제거
      tmp = tmp.replace(/&nbsp;/gi, ''); //공백제거
      tmp = tmp.replace(/&#?[a-z0-9]+;/gi, '');
      return tmp;
    },
    getScrollLocation() {
      setTimeout(async () => {
        var el = document.querySelector('.hms-scheduletable');
        var location = document.querySelector('.hms-scheduletable .select-row');
        if (el !== undefined)
          el.scrollTo({ top: location.offsetTop || 0, behavior: 'auto' });
      }, 1);
    },
    async onClickRow({
      kpiNm,
      baseYyyyMm,
      kpiId,
      cnt,
      weekFromDate,
      weekToDate,
      reasonDate,
      weekFromDateForm,
      weekToDateForm,
      yearDateForm,
    }) {
      if (common.isEmpty(kpiNm)) return;
      const searchType = this.showWeek ? 'week' : 'day';
      if (cnt > 1) {
        const param = {
          searchType: searchType,
          weekFromDate: weekFromDate,
          weekToDate: weekToDate,
          reasonDate: reasonDate,
        };
        await this[dashboardTypes.actions.FETCH_DSBD_KPI_REASON_LIST](param);
        this[dashboardTypes.actions.INIT_DSBD_DATE_PARAM]({
          weekFromDateForm,
          weekToDateForm,
          reasonDate: this.showWeek ? undefined : yearDateForm,
        });
        this[dashboardTypes.actions.INIT_VIEWS_DSBD_KPI_REASON_POPOUP](true);
      } else {
        const links = this.$refs.links;
        links.setAttribute(
          'href',
          `/redirectForm?auth=${this.$route.params.auth}&path=KpiPerformanceListPage&baseYyyyMm=${baseYyyyMm}&kpiId=${kpiId}`,
        );
        links.setAttribute('target', '_blank');
        links.click();
      }
    },
  },
};
</script>
