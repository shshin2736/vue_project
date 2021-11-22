<template>
  <div @mousemove="onHoverEventHandler">
    <kendo-gantt
      ref="gantt"
      :height="height"
      :editable="false"
      :row-height="30"
      :columns="columns"
      :data-source="datasource"
      :editable-create="false"
      listWidth="46%"
      :task-template="'<div></div>'"
      @databinding="onDataBinding"
      @databound="databound"
    >
      <!-- :transport-parameter-map="parameterMap"
      :toolbar="tools"
      :pdf="pdf" -->
      <!-- :schema-model-fields="fields" -->
      <!-- <kendo-gantt-view :type="'day'" :selected="true"></kendo-gantt-view> -->
      <kendo-gantt-view
        v-if="!range"
        :type="'week'"
        :slot-size="`75`"
        day-header-template="#=kendo.toString(start, 'MM.dd')#"
        week-header-template="#=kendo.toString(start, 'MM.dd')#"
        :selected="viewtype === 'week' ? true : false"
        :date="startDate"
      ></kendo-gantt-view>
      <kendo-gantt-view
        v-else
        :type="'week'"
        :slot-size="`75`"
        day-header-template="#=kendo.toString(start, 'MM.dd')#"
        week-header-template="#=kendo.toString(start, 'yyyy.MM.dd')#"
        :selected="viewtype === 'week' ? true : false"
        :range-start="start"
        :range-end="end"
        :date="startDate"
      ></kendo-gantt-view>
      <kendo-gantt-view
        v-if="!range"
        :type="'month'"
        :slot-size="`40`"
        week-header-template="#=kendo.toString(start, 'dd')#"
        :month-header-template="
          `#=kendo.toString(start, 'yyyy${$t('NLS0001436')}MM${$t(
            'NLS0001437',
          )}')#`
        "
        :selected="viewtype === 'month' ? true : false"
        :date="startDate"
      ></kendo-gantt-view>
      <kendo-gantt-view
        v-else
        :type="'month'"
        :slot-size="`40`"
        week-header-template="#=kendo.toString(start, 'dd')#"
        :month-header-template="
          `#=kendo.toString(start, 'yyyy${$t('NLS0001436')} MM${$t(
            'NLS0001437',
          )}')#`
        "
        :selected="viewtype === 'month' ? true : false"
        :range-start="start"
        :range-end="end"
        :date="startDate"
      ></kendo-gantt-view>
    </kendo-gantt>
  </div>
</template>

<script>
import Vue from 'vue';
import { GanttInstaller } from '@progress/kendo-gantt-vue-wrapper';
import { common } from '@/utils';
Vue.use(GanttInstaller);

export default {
  props: {
    datasource: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
      default: '480',
    },
    fields: {
      type: Object,
      required: false,
      default: () => {},
    },
    viewtype: {
      type: String,
      required: false,
      default: 'month',
    },
    start: {
      type: Date,
      required: false,
      default: () => new Date(`${new Date().getFullYear()}-01-01`),
    },
    end: {
      type: Date,
      required: false,
      default: () => new Date(`${new Date().getFullYear()}-12-31`),
    },
    date: {
      type: Date,
      required: false,
      default: () => new Date(),
    },
  },
  data() {
    return {
      dependencydatasource: [
        {
          predecessorId: 1,
          successorId: 2,
          type: 1,
        },
      ],
      pdf: {
        fileName: 'Project_List.pdf',
        allPages: true,
      },
      tools: ['append', 'pdf'],
      dependencyfields: {
        id: { from: 'ID', type: 'number' },
        predecessorId: { from: 'PredecessorID', type: 'number' },
        successorId: { from: 'SuccessorID', type: 'number' },
        type: { from: 'Type', type: 'number' },
      },
      cnt: 0,
      range: true,
      scrollEvnet: null,
      startDate: null,
    };
  },
  created() {
    this.setDate();
  },
  mounted() {
    this.viewTypeEvent();
    this.hideExport();
  },
  methods: {
    setDate() {
      for (const obj of this.datasource) {
        if (obj.end >= this.date) {
          this.startDate = new Date();
          break;
        }
      }
    },
    onHoverEventHandler(e) {
      const el1 = e.target.parentNode;
      const el2 = e.target.parentNode.parentNode;
      const el3 = e.target.parentNode.parentNode.parentNode;
      const el4 = e.target.parentNode.parentNode.parentNode.parentNode;
      const el5 =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
      const treeTrs = document.querySelectorAll(
        '.k-gantt-treelist .k-grid-content tr',
      );
      const ganttTrs = document.querySelectorAll(
        '.k-gantt-timeline .k-grid-content .k-gantt-tasks tr',
      );

      for (let i = 0; i < treeTrs.length; i++) {
        treeTrs[i].classList.remove('td-hover');
        ganttTrs[i].classList.remove('td-hover');
        if (
          treeTrs[i] === el1 ||
          ganttTrs[i] === el1 ||
          treeTrs[i] === el2 ||
          ganttTrs[i] === el2 ||
          treeTrs[i] === el3 ||
          ganttTrs[i] === el3 ||
          treeTrs[i] === el4 ||
          ganttTrs[i] === el4 ||
          treeTrs[i] === el5 ||
          ganttTrs[i] === el5
        ) {
          treeTrs[i].classList.add('td-hover');
          ganttTrs[i].classList.add('td-hover');
        }
      }
    },
    defaultSort() {
      const header = document.querySelector(`[data-field="orderId"]`);
      header.click();
    },
    //* PDF Export Btn hide
    hideExport() {
      // const btn = document.querySelector('.k-gantt-toolbar');
      const box = document.querySelector('.k-gantt-rowheight');
      // box.style = `height: ${box.offsetHeight - btn.offsetHeight}px`;
      box.style.overflow = 'hidden';
      // btn.style.display = 'none';
    },
    //* id column hide
    hideIdColumn() {
      const header1 = document.querySelector('[data-field="id"]');
      const header2 = document.querySelector('[data-field="prjStatus"]');
      const contentCol = document.querySelectorAll('.k-grid-content col');
      const headerCol = document.querySelectorAll('.k-grid-header-wrap col');
      const contentTr = Array.from(
        document.querySelectorAll('.k-gantt-treelist .k-grid-content tbody>tr'),
      );
      contentTr.forEach(el => {
        const td = Array.from(el.childNodes);
        td[0].style.display = 'none';
        td[1].style.display = 'none';
      });
      header1.style.display = 'none';
      header2.style.display = 'none';
      Array.from(headerCol).forEach((el, i) => {
        if (i < 2) el.style.display = 'none';
      });
      Array.from(contentCol).forEach((el, i) => {
        if (i < 2) el.style.display = 'none';
      });
    },
    //* 차트 헤더 다국어
    tilelineHeader() {
      const timelineHeader = document.querySelectorAll(
        '.k-gantt-timeline .k-header',
      );
      Array.from(timelineHeader).forEach(header => {
        const txt = header.innerText;
        //* month
        if (this.viewtype === 'month')
          if (txt.includes('Jan'))
            header.innerText = txt.replace('Jan', this.$t('NLS0000659'));
          else if (txt.includes('Feb'))
            header.innerText = txt.replace('Feb', this.$t('NLS0000660'));
          else if (txt.includes('Mar'))
            header.innerText = txt.replace('Mar', this.$t('NLS0000661'));
          else if (txt.includes('Apr'))
            header.innerText = txt.replace('Apr', this.$t('NLS0000662'));
          else if (txt.includes('May'))
            header.innerText = txt.replace('May', this.$t('NLS0000663'));
          else if (txt.includes('Jun'))
            header.innerText = txt.replace('Jun', this.$t('NLS0000664'));
          else if (txt.includes('Jul'))
            header.innerText = txt.replace('Jul', this.$t('NLS0000665'));
          else if (txt.includes('Aug'))
            header.innerText = txt.replace('Aug', this.$t('NLS0000666'));
          else if (txt.includes('Sep'))
            header.innerText = txt.replace('Sep', this.$t('NLS0000667'));
          else if (txt.includes('Oct'))
            header.innerText = txt.replace('Oct', this.$t('NLS0000668'));
          else if (txt.includes('Nov'))
            header.innerText = txt.replace('Nov', this.$t('NLS0000669'));
          else header.innerText = txt.replace('Dec', this.$t('NLS0000670'));
      });
    },
    //! SplitBar 제거
    removeSplitBar() {
      const el = document.querySelector('.k-splitbar');
      el.classList.remove('k-splitbar-horizontal');
      el.classList.remove('k-splitbar-draggable-horizontal');
    },
    //* Databound Event
    databound() {
      this.deleteEncoded();
      this.hideIdColumn();
      this.tilelineHeader();
      this.setEncoded();
      this.hideExport();
      common.setSpinner(false);
    },
    deleteEncoded() {
      // ..
      const icon = document.querySelectorAll('.besttask-icon-grid');
      const task = document.querySelectorAll('.hms-grid-task');
      if (icon)
        Array.from(icon).forEach(el => {
          el.remove();
        });
      if (task)
        Array.from(task).forEach(el => {
          el.innerText = '';
          el.classList.remove('hms-grid-task');
        });
    },
    //* Encoded Event
    setEncoded() {
      if (document.querySelector('.k-gantt-create'))
        document.querySelector('.k-gantt-create').remove();
      const tr = Array.from(
        document.querySelectorAll('.k-grid-content> table > tbody > tr'),
      );
      tr.forEach(el => {
        let id = '';
        const td = Array.from(el.childNodes);
        this.columns.forEach((column, i) => {
          const span = Array.from(td[i].childNodes)[0];
          const { encoded } = column;
          if (i === 0) id = span.innerText;
          // if (column.field === 'title') td[i].classList.add(`under-line-btn`);
          span.classList.add(`ellipsis-span`);
          if (column.icon) {
            const icon = document.createElement('span');
            icon.classList.add(`besttask-icon`);
            icon.classList.add(`besttask-icon-grid`);
            const data = this.datasource.filter(
              data =>
                data.id === id &&
                data.parentId === null &&
                data.prjBestYn === 'Y',
            );
            if (data.length > 0) {
              td[i].append(icon);
              td[i].classList.add('besttask-icon-align');
              span.style['text-overflow'] = 'ellipsis';
              span.style['overflow'] = 'hidden';
              this.iconCnt++;
            }
          } else {
            if (column.align === 'center') {
              td[i].style.textAlign = 'center';
            } else if (column.align === 'right') {
              td[i].style.textAlign = 'right';
            } else if (column.align === 'left') {
              td[i].style.textAlign = 'left';
            }
          }
          if (encoded !== undefined) {
            if (encoded === 'progress') {
              const rate = this.datasource.filter(data => {
                return data.id ? data.id.toString() === id : false;
              });
              if (rate) {
                const text = rate[0] ? rate[0].prjRate : '';
                span.innerText = text;
                if (text >= 0) {
                  const percent = text
                    .toString()
                    .split('%')[0]
                    .split('.')[0];
                  const unit = 10;
                  const size = span.getAttribute('class').split(' ')[1];
                  if (size) span.classList.remove(size);
                  setTimeout(() => {
                    span.classList.add(
                      `size${Math.round(percent / unit) * unit}`,
                    );
                  }, 100);
                  span.classList.add(`hms-grid-task`);
                  span.innerText =
                    text === '' || text === 'null'
                      ? ''
                      : text.toString().includes('%')
                      ? text
                      : `${text}%`;
                }
              }
            } else if (encoded === 'button') {
              const span = Array.from(td[i].childNodes)[0];
              if (span.innerText !== '') span.classList.add(`analysis-btn`);
              span.style.cursor = `pointer`;
              span.addEventListener('click', e => {
                e.stopPropagation();
                this.$emit(
                  'btnclick',
                  this.datasource.filter(
                    item => item.id.toString() === td[0].innerText,
                  ),
                  column.field,
                );
              });
            } else if (encoded === 'link') {
              const span = Array.from(td[i].childNodes);
              const func = e => {
                e.stopPropagation();
                if (!e.target.getAttribute('class')) {
                  this.$emit(
                    'btnclick',
                    this.datasource.filter(
                      item => item.id.toString() === td[0].innerText,
                    ),
                    column.field,
                  );
                }
              };
              span.forEach(el => {
                if (!el.getAttribute('class')) {
                  el.style.cursor = `pointer`;
                  el.addEventListener('mouseup', func);
                }
              });
            }
          }
          if (column.field === 'prjStatusNm') {
            td[i].style.color = '#555';
            if (
              td[1].innerText !== 'C' &&
              td[1].innerText !== 'B' &&
              td[1].innerText !== 'A' &&
              td[1].innerText !== '1' &&
              td[1].innerText !== '2' &&
              td[1].innerText !== '3' &&
              td[1].innerText !== '4' &&
              td[1].innerText !== '6'
            ) {
              td[i].style.color = '#da291c';
            }
          }
        });
      });
    },
    onDataBinding(e) {
      this.$emit('datasource', e.sender.dataSource.options.data);
    },
    parameterMap: function(options, operation) {
      if (operation !== 'read') {
        return { models: this.kendo.stringify(options.models || [options]) };
      }
    },
    viewTypeEvent() {
      const week = document.querySelector('.k-view-week .k-link');
      week.style.display = 'none';
    },
  },
};
</script>
<style>
.besttask-icon-align {
  /* display: flex;
  height: 100%; */
  align-items: center;
  justify-content: space-between;
}
.k-tooltip {
  display: none;
  opacity: 0;
}
</style>
