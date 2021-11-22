<template>
  <div>
    <Grid
      :style="style"
      :data-items="items"
      :edit-field="editfield"
      :sortable="sortable"
      :sort="sortObj"
      :columns="getColumns"
      :pageable="pageable"
      :skip="skip"
      :take="take"
      :total="getTotal"
      :filterable="filterable"
      :filter="filter"
      :selected-field="selectedfield"
      :selectedtype="selectedtype"
      :selectedwidth="selectedwidth"
      :page-size="pageSize"
      :row-height="rowHeight"
      :scrollable="scrollable"
      :resizable="resizable"
      @sortchange="sortChangeHandler"
      @pagechange="pageChangeHandler"
      @filterchange="filterChangeHandler"
      @btnclick="btnClickHandler"
      @rowclick="onRowClickHandler"
      @selectionchange="onSelectionChangeHandler"
      @headerselectionchange="onHeaderSelectionChangeHandler"
      @hidden="hiddenCell"
      @itemchange="itemChange"
      @edit="onEdit"
      @cancel="onCancel"
      @save="onSave"
      @remove="onRemove"
      @onCheck="onCheck"
      @headerEvent="headerEvent"
      @headerSortEvent="headerSortEvent"
      @cellclick="cellClick"
      @columnsBtn="columnsBtn"
      @expanded="expanded"
      @popup="popup"
    >
      <grid-toolbar v-if="editfield === 'inEdit' && addBtnHide === false">
        <button
          title="Add new"
          ref="inEditAdd"
          class="k-button k-primary"
          @click="insert"
        >
          Add new
        </button>
        <button
          v-if="hasItemsInEdit"
          title="Cancel current changes"
          class="k-button"
          @click="cancelChanges"
        >
          Cancel current changes
        </button>
      </grid-toolbar>
    </Grid>
    <footer-cell v-if="footer" :columns="columns" :data="items"></footer-cell>
  </div>
</template>

<script>
import Vue from 'vue';
import { orderBy, filterBy } from '@progress/kendo-data-query';
import FooterCell from '@/components/common/business/FooterCell';
import { common } from '@/utils';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';

export default {
  name: 'ComNativeGrid',
  components: {
    FooterCell,
    Grid,
    GridToolbar,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    editfield: {
      type: String,
      required: false,
    },
    sort: {
      type: Array,
      required: false,
    },
    sortable: {
      type: Boolean,
      required: false,
      default: false,
    },
    enableSort: {
      type: Array,
      required: false,
      default: () => [],
    },
    autosortable: {
      type: Boolean,
      required: false,
      default: true,
    },
    pageable: {
      type: Boolean,
      required: false,
      default: false,
    },
    serverRander: {
      type: Boolean,
      required: false,
      default: false,
    },
    skip: {
      type: Number,
      required: false,
      default: 0,
    },
    take: {
      type: Number,
      required: false,
      default: 10,
    },
    total: {
      type: Number,
      required: false,
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false,
    },
    filter: {
      type: Object,
      required: false,
    },
    selectedfield: {
      type: String,
      required: false,
      default: 'selected',
    },
    selectedHover: {
      type: Boolean,
      required: false,
      default: true,
    },
    selectedtype: {
      type: String,
      required: false,
      default: 'selected',
    },
    selectedAll: {
      type: Boolean,
      required: false,
      default: true,
    },
    selectedwidth: {
      type: String,
      required: false,
      default: '45',
    },
    height: {
      type: String,
      required: false,
      default: '250',
    },
    addBtnHide: {
      type: Boolean,
      required: false,
      default: true,
    },
    addRow: {
      value: [Object, String],
      required: false,
      default: '',
    },
    scrollable: {
      type: String,
      required: false,
    },
    pageSize: {
      type: Number,
      required: false,
      default: 20,
    },
    rowHeight: {
      type: Number,
      required: false,
      default: 31,
    },
    footer: {
      type: Boolean,
      required: false,
      default: false,
    },
    operator: {
      type: Array,
      required: false,
    },
    resizable: {
      type: Boolean,
      required: false,
      default: false,
    },
    tree: {
      type: Boolean,
      required: false,
      default: false,
    },
    inCellAutoSave: {
      type: Boolean,
      required: false,
      default: true,
    },
    isCellEnterNext: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      style: {
        height: `${this.height}px`,
      },
      items: [],
      sortObj: this.sort,
      filterObj: this.filter,
      selectedID: 1,
      skipNum: this.skip,
      takeNum: this.take,
      newRow: '',
      editFieldNm: undefined,
      inCell: {},
      footerSum: 0,
      test: [],
      rowEl: null,
      autoSaveTrigger: false,
      inCellField: '',
      inCellItems: [],
      inCellItem: {},
    };
  },
  computed: {
    //* 데이터 속성 적용
    getResult() {
      //* 데이터 초기화
      let items =
        this.selectedtype === 'checked'
          ? this.areAllSelected && this.items.length > 0
            ? this.items.slice(0)
            : this.items.findIndex(item => item.selected === false) > -1
            ? this.items
            : this.data.slice(0)
          : this.data.slice(0);
      //* 정렬 여부
      items =
        this.sortable && !this.scrollable && this.autosortable
          ? orderBy(items, this.sortObj)
          : items;
      //* 필터 여부
      items =
        this.filterable === true ? filterBy(items, this.filterObj) : items;
      //* 페이징 여부
      items =
        this.pageable === true && !this.serverRander
          ? items.slice(this.skipNum, this.takeNum + this.skipNum)
          : items;
      //* 셀렉트 여부
      items =
        this.selectedtype === 'checked'
          ? items.map(item => {
              return {
                ...item,
                selected: item.selected === undefined ? false : item.selected,
              };
            })
          : items;
      if (this.newRow) items.unshift(this.newRow);
      //* Tree Mode
      items = this.tree ? this.treeFunc(items) : items;
      return items;
    },
    //* 전체 갯 수 리턴
    getTotal() {
      return this.total === undefined ? this.data.length : this.total;
    },
    getColumns() {
      //* 숨김 체크
      const columns = this.columns.reduce((acc, cur) => {
        let obj = {};
        if (cur.children === undefined) {
          if (!cur.hidden) {
            obj = { ...cur };
          }
        } else {
          obj = { ...cur };
          obj.children = obj.children.reduce((acc2, cur2) => {
            if (!cur2.hidden) {
              acc2.push(cur2);
            }
            return acc2;
          }, []);
        }
        acc.push(obj);
        return acc;
      }, []);

      //* 셀렉트 종류 체크
      return this.selectedtype === 'checked'
        ? [
            {
              field: 'selected',
              width: `${this.selectedwidth}px`,
              headerSelectionValue: this.areAllSelected,
              className: 'center',
            },
            ...columns,
          ]
        : columns;
    },
    //* 전체 선택 체크
    areAllSelected() {
      return this.items.findIndex(item => item.selected === false) === -1;
    },
    hasItemsInEdit() {
      return this.items.filter(p => p.inEdit).length > 0;
    },
  },
  watch: {
    data: function(value) {
      this.items = this.selectedtype === 'checked' ? [] : value;
    },
    addRow: function(value) {
      if (Object.keys(value).length > 0) {
        this.newRow = value;
        this.items = [];
      } else {
        this.newRow = '';
        this.items = this.data;
      }
    },
  },
  created() {
    Vue.set(this, 'items', this.getResult);
    this.test = this.footer;
  },
  mounted() {
    if (this.footer) this.setFooter();
    if (!this.selectedAll) this.hideAllChecked();
    if (this.pageable) this.pageInfoHide();
    this.setHeaderLocked();
    this.setColumnHeight();
    this.norecordsHide();
  },
  beforeUpdate() {
    if (this.inCellItems.length > 0) {
      Vue.set(this, 'items', this.inCellItems);
      this.inCellItems = [];
    } else Vue.set(this, 'items', this.getResult);
  },
  updated() {
    if (this.footer) this.setFooter();
    if (!this.selectedAll) this.hideAllChecked();
    if (this.pageable) this.pageInfoHide();
    this.setHeaderLocked();
    this.setColumnHeight();
    this.norecordsHide();
    this.$emit('databound', this.items);
  },
  methods: {
    pageInfoHide() {
      const el = document.querySelector('.k-pager-info');
      const pageInfo = el.innerText.split(' ');
      pageInfo[3] = this.$t('NLS0001262');
      pageInfo[5] = this.$t('NLS0001263');
      // el.innerText = `${this.skip} - ${this.skip + this.take} ${this.$t(
      //   'NLS0001262',
      // )} ${this.total} ${this.$t('NLS0001263')}`;
      el.innerText = `${this.total}${this.$t('NLS0001263')}`;
    },
    //* 전체 체크 숨김
    hideAllChecked() {
      const checked = Array.from(
        document.querySelectorAll('.selectedAll .k-header .k-checkbox'),
      );
      checked.forEach(el => {
        el.style.display = 'none';
      });
    },
    //* Incell 입력 이벤트
    inCellInputEvent(dataItem) {
      if (this.editfield) {
        const box = document.querySelector('.k-textbox');
        const isInCell = columns => {
          let flag = false;
          columns.forEach(column => {
            if (column.className && column.className.includes('inCell'))
              flag = true;
            else if (column.children) {
              if (isInCell(column.children)) flag = true;
            }
          });
          return flag;
        };
        if (box && isInCell(this.columns)) {
          const app = document.querySelector('#app');
          app.addEventListener('mousedown', () => {
            this.cellClick();
          });
          box.focus();
          box.addEventListener('keyup', event => {
            const value = event.target.value.split(',').join('');
            if (event.keyCode === 13) {
              if (!this.inCellAutoSave) {
                if (
                  (this.inCellField === 'estScore1' ||
                    this.inCellField === 'estScore2') &&
                  dataItem.modPoint >= 0
                ) {
                  const estUp =
                    dataItem.selfEstScore +
                    dataItem.selfEstScore * (dataItem.modPoint / 100);
                  const estDown =
                    dataItem.selfEstScore -
                    dataItem.selfEstScore * (dataItem.modPoint / 100);
                  if (value > estUp || value < estDown) {
                    //조정범위를 벗어날 수 없습니다
                    common.alert('warning', 'NLS0000818');
                    dataItem[this.inCellField] = '';
                    return;
                  }
                } else {
                  let flag = false;
                  const score = dataItem.selfEstScore;
                  const wtRate = dataItem.wtRate;
                  const range = wtRate * 1.2;
                  // const msg = this.$t('NLS0001136').split('_');
                  if (score > range) {
                    flag = true;
                    dataItem.selfEstScore = '';
                  }
                  // `${msg[0]}${wtRate}${msg[1]}${range}${msg[2]}`,
                  if (flag) {
                    common.alert('warning', 'NLS0001136');
                    return;
                  }
                }
              }
              if (event.target.value !== '') {
                event.target.value = common.numberWithCommas(value);
                if (
                  value !== '' &&
                  ((this.inCellField === 'threshold' &&
                    !common.isEmpty(dataItem.maximum)) ||
                    (this.inCellField === 'maximum' &&
                      !common.isEmpty(dataItem.threshold)))
                ) {
                  const threshold = Number(
                    dataItem.threshold.split(',').join(''),
                  );
                  const maximum = Number(dataItem.maximum.split(',').join(''));
                  const targetTs = Number(
                    dataItem.targetTs.split(',').join(''),
                  );

                  //* 1. 증가형일 때
                  if (dataItem.kpiAchType === '44') {
                    //  목표대비 값 비교
                    const minValid = Number(
                      (targetTs - targetTs * 0.2).toFixed(3),
                    );
                    const maxValid = Number(
                      (targetTs + targetTs * 0.2).toFixed(3),
                    );
                    if (
                      threshold < minValid ||
                      threshold > targetTs ||
                      maximum > maxValid ||
                      maximum < targetTs
                    ) {
                      dataItem[this.inCellField] = '';
                      common.alert('warning', 'NLS0001429');
                      return;
                    }
                    //* 2. 감소형일 때
                  } else if (dataItem.kpiAchType === '45') {
                    // 목표대비 값 비교
                    const minValid = Number(
                      (targetTs + Math.abs(targetTs * 0.2)).toFixed(3),
                    );
                    const maxValid = Number(
                      (targetTs - Math.abs(targetTs * 0.2)).toFixed(3),
                    );
                    if (
                      threshold > minValid ||
                      threshold < targetTs ||
                      maximum < maxValid ||
                      maximum > targetTs
                    ) {
                      dataItem[this.inCellField] = '';
                      common.alert('warning', 'NLS0001429');
                      return;
                    }
                  }
                  //* 3. 퍼센테이지 비교
                  if (
                    Number((threshold - targetTs).toFixed(12)) !==
                    Number((targetTs - maximum).toFixed(12))
                  ) {
                    dataItem[this.inCellField] = '';
                    common.alert('warning', 'NLS0001429');
                    return;
                  }
                }
              }
              let flag = false;
              if (this.isCellEnterNext) {
                this.inCellItems = this.getResult.map(item => {
                  if (flag && item.inCell) {
                    item.inEdit = this.inCellField;
                    flag = false;
                  } else if (item.inEdit === this.inCellField) {
                    flag = true;
                    item.inEdit = false;
                  } else {
                    item.inEdit = false;
                  }
                  const obj = item;
                  return obj;
                });
              } else {
                this.items = this.getResult.map(item => {
                  item.inEdit = false;
                  const obj = { ...item };
                  return obj;
                });
              }
              this.items = [];
              this.inCell = {};
              this.$emit('inCell');
              if (this.isCellEnterNext)
                setTimeout(() => {
                  this.inCellInputEvent();
                }, 1);
            } else if (value !== '') {
              let dot = true;
              if (isNaN(Number(value))) {
                let items = common.numberWithCommas(
                  value
                    .split('')
                    .filter((str, i) => {
                      if (
                        (i === 0 && !isNaN(str) && Number(str) > 0) ||
                        str === '-'
                      )
                        return true;
                      else if (
                        (i > 0 && !isNaN(Number(str))) ||
                        (dot && str === '.')
                      ) {
                        dot = false;
                        return true;
                      } else return false;
                    })
                    .join(''),
                );
                event.target.value = items ? items : '';
                // this.inCellField[this.inCellField] = event.target.value;
              } else {
                event.target.value = common.numberWithCommas(value);
                // this.inCellField[this.inCellField] = event.target.value;
              }
            } else {
              event.target.value = '';
              // this.inCellField[this.inCellField] = event.target.value;
            }
          });
          box.addEventListener('focusout', event => {
            const value = event.target.value.split(',').join('');
            if (
              value !== '' &&
              ((this.inCellField === 'threshold' &&
                !common.isEmpty(dataItem.maximum)) ||
                (this.inCellField === 'maximum' &&
                  !common.isEmpty(dataItem.threshold)))
            ) {
              const threshold = Number(dataItem.threshold.split(',').join(''));
              const maximum = Number(dataItem.maximum.split(',').join(''));
              const targetTs = Number(dataItem.targetTs.split(',').join(''));
              //* 1. 증가형일 때
              if (dataItem.kpiAchType === '44') {
                //  목표대비 값 비교
                const minValid = Number((targetTs - targetTs * 0.2).toFixed(3));
                const maxValid = Number((targetTs + targetTs * 0.2).toFixed(3));
                if (
                  threshold < minValid ||
                  threshold > targetTs ||
                  maximum > maxValid ||
                  maximum < targetTs
                ) {
                  dataItem[this.inCellField] = '';
                  common.alert('warning', 'NLS0001429');
                  return;
                }
                //* 2. 감소형일 때
              } else if (dataItem.kpiAchType === '45') {
                // 목표대비 값 비교
                const minValid = Number(
                  (targetTs + Math.abs(targetTs * 0.2)).toFixed(3),
                );
                const maxValid = Number(
                  (targetTs - Math.abs(targetTs * 0.2)).toFixed(3),
                );
                if (
                  threshold > minValid ||
                  threshold < targetTs ||
                  maximum < maxValid ||
                  maximum > targetTs
                ) {
                  dataItem[this.inCellField] = '';
                  common.alert('warning', 'NLS0001429');
                  return;
                }
              }
              //* 3. 퍼센테이지 비교
              if (
                Number((threshold - targetTs).toFixed(12)) !==
                Number((targetTs - maximum).toFixed(12))
              ) {
                dataItem[this.inCellField] = '';
                common.alert('warning', 'NLS0001429');
                return;
              }
            }
          });
          box.select();
        }
      }
    },
    //* 정렬 이벤트
    sortChangeHandler(e) {
      const exist = this.enableSort?.find(field => field === e.sort[0]?.field);
      if (!exist && this.enableSort.length > 0) {
        return;
      }
      this.sortObj = e.sort;
      this.$emit('sortchange', e.sort);
    },
    //* 페이징 이벤트
    pageChangeHandler(e) {
      if (this.scrollable === 'virtual') {
        this.$emit('pageChange', e.page.skip, e.page.take);
      } else {
        this.skipNum = e.page.skip;
        this.takeNum = e.page.take;
        this.items = this.getResult;
        this.$emit('pageChange', e.page.skip, e.page.take);
      }
    },
    //* 필터 이벤트
    filterChangeHandler(e) {
      this.filterObj = e.filter;
    },
    //* 커스텀 버튼 클릭 이벤트
    btnClickHandler(rowData, value, field, flag) {
      this.$emit('btnclick', rowData, value, field, flag);
    },
    //* 전체 선택 이벤트
    onHeaderSelectionChangeHandler(e) {
      const checked = e.event.target.checked;
      Vue.set(
        this,
        'items',
        this.items.map(item => {
          return { ...item, selected: checked };
        }),
      );
      const items = this.items.filter(el => el.selected === true);
      this.$emit('allchecked', items, checked);
    },
    //* 선택 이벤트
    onSelectionChangeHandler(e) {
      const selected = e.dataItem.selected;
      Vue.set(e.dataItem, 'selected', !selected);
      this.$emit('checked', e.dataItem, !selected);
    },
    //* 로우 클릭 이벤트
    onRowClickHandler(e) {
      if (!this.selectedHover) {
        const tdEl = Array.from(e.event.srcElement.parentElement.children);
        if (this.rowEl)
          this.rowEl.forEach(el => {
            el.classList.remove('select-row');
          });
        this.rowEl = tdEl;
        this.rowEl.forEach(el => {
          el.classList.add('select-row');
        });
      }
      this.inCellInputEvent(e.dataItem);
      this.$emit('selected', e.dataItem, e);
    },
    //* 숨김 이벤트
    hiddenCell(field) {
      for (let column of this.getColumns) {
        if (column.children === undefined) {
          if (column.field === field) {
            Vue.set(column, 'hidden', true);
            break;
          }
        } else {
          for (let children of column.children) {
            if (children.field === field) {
              Vue.set(children, 'hidden', true);
              break;
            }
          }
          break;
        }
      }
    },
    //* 에디트 수정 버튼 이벤트
    onEdit(e) {
      Vue.set(e.dataItem, 'inEdit', true);
      this.$emit('edit', e);
    },
    //* 에디트 수정 취소 이벤트
    onCancel(e) {
      Vue.set(e.dataItem, 'inEdit', false);
      this.items = this.items.slice(1);
      this.newRow = '';
      this.$emit('cancel', this.newRow);
    },
    //* 에디트 수정 이벤트
    onSave(e) {
      Vue.set(e.dataItem, 'inEdit', false);
      this.newRow = '';
      this.$emit('save', e.dataItem);
    },
    //* 에디트 삭제 이벤트
    onRemove(e) {
      this.$emit('remove', e.dataItem);
      this.newRow = '';
    },
    //* 에디트 신규 등록 이벤트
    insert(e) {
      this.newRow = { inEdit: true };
      this.items = [];
      this.$emit('insert', e);
    },
    //* 에디트 등록 취소 이벤트
    cancelChanges() {
      this.items = this.data;
      this.newRow = '';
    },
    //* 인라인 에디터 정보 변경 이벤트
    itemChange(e) {
      Vue.set(e.dataItem, e.field, e.value);
      if (
        this.columns.some(column =>
          column.className === undefined
            ? false
            : column.className.includes('inCell'),
        )
      ) {
        this.$emit('save', e.dataItem, this.items);
      }
    },
    //* 헤더 락 메소드
    setHeaderLocked() {
      const grid = document.querySelectorAll(`.locked .k-header`);
      const td = document.querySelectorAll(`.locked .k-grid-content td`);
      const th = document.querySelectorAll(`.locked .k-header`);
      const elements = [...Array.from(td), ...Array.from(th)];
      if (grid.length === 0) return;
      let left = 0;
      let right = 0;
      for (let [i, obj] of Object.entries(this.getColumns)) {
        if (obj.children !== undefined)
          right = obj.children.reduce((acc, cur) => {
            let widthVal = '';
            if (cur.width !== undefined) {
              widthVal = Number(cur.width.split('px')[0]);
            }
            return acc + widthVal;
          }, 0);
        if (obj.locked) {
          grid[i].setAttribute(
            'style',
            `position: sticky; left: ${left}px; right: ${right}px; z-index: 1; background: #f0f1f2;`,
          );
          left += right;
        } else {
          //grid[i].removeAttribute('style'); //다른팝업으로  comnativegrid 실행시  lock풀려버리는문제 21.06.04
        }
      }
      elements.forEach(el => {
        if (el.getAttribute('style')) {
          const els = el
            .getAttribute('style')
            .split(';')
            .map(item => {
              if (item.includes('background'))
                return ` background: #f0f1f2; border-right-width: 0px !important;`;
              else return item;
            });
          el.setAttribute(
            'style',
            els.filter(el => el.trim() !== '').join(';'),
          );
        }
      });
    },
    //* 체크박스 이벤트
    onCheck(item, checked, value, e) {
      this.$emit('onCheck', item, checked, value, e);
    },
    //* 헤더 이벤트
    headerEvent(e) {
      this.$emit('headerEvent', e);
    },
    inCellCheck(columns, e) {
      return columns.some(column => {
        const parent =
          e.field === column.field && column.inCell && e.dataItem.inCell;
        const children =
          column.children === undefined
            ? false
            : this.inCellCheck(column.children, e);
        const flag = parent ? parent : children ? children : false;
        return flag;
      });
    },
    //* in-cell 이벤트
    cellClick(e) {
      if (e !== undefined) {
        this.$emit('cellClick', e.dataItem, '', e.field);
      }
      this.items = this.items.map(item => {
        item.inEdit = '';
        const obj = { ...item };
        return obj;
      });
      if (e && !this.inCellCheck(this.columns, e)) return;
      this.items = this.items.map(item => {
        const obj = { ...item };
        this.columns.map(column => {
          if (column.inCell === true) obj.inEdit = column.field;
        });
        return obj;
      });
      if (e) {
        this.inCellItem = e.dataItem;
        Vue.set(e.dataItem, 'inEdit', e.field);
        this.inCellField = e.field;

        if (!this.inCellAutoSave) {
          if (
            e.field &&
            (e.field === 'estScore1' || e.field === 'estScore2 ')
          ) {
            this.isEstScore(e ? e.dataItem.inEdit : '');
          } else this.isSelfEstScore(e ? e.dataItem.inEdit : '');
        }
      }
      const app = document.querySelector('#app');
      app.removeEventListener('mousedown', () => {
        this.cellClick();
      });
    },
    isSelfEstScore() {
      let flag = false;
      this.items = this.data.map(item => {
        const score = item.selfEstScore;
        const wtRate = item.wtRate;
        const range = wtRate * 1.2;
        // const msg = this.$t('NLS0001136').split('_');
        if (score > range) {
          flag = true;
          item.selfEstScore = '';
        }
        // `${msg[0]}${wtRate}${msg[1]}${range}${msg[2]}`,
        if (flag) common.alert('warning', 'NLS0001136');
        return item;
      });
    },
    //* in-cell Autosave false
    isEstScore(inEdit) {
      let flag = false;
      this.items = this.data.map(item => {
        if (inEdit === 'estScore1' && item.estScore1 === null)
          item.estScore1 = item.selfEstScore;
        if (inEdit === 'estScore2' && item.estScore2 === null)
          item.estScore2 = item.selfEstScore;

        if (item.modPoint > 0) {
          const value = item.selfEstScore ? Number(item.selfEstScore) : 0;
          const score1 = item.estScore1 ? Number(item.estScore1) : 0;
          const score2 = item.estScore2 ? Number(item.estScore2) : 0;
          const estUp = value + value * (item.modPoint / 100);
          const estDown = value - value * (item.modPoint / 100);
          if (score1 > 0 && (score1 > estUp || score1 < estDown)) {
            flag = true;
            item.estScore1 = item.selfEstScore;
          }
          if (score2 > 0 && (score2 > estUp || score2 < estDown)) {
            flag = true;
            item.estScore2 = item.selfEstScore;
          }
        }
        return item;
      });
      if (flag) {
        // 조정범위를 벗어날 수 없습니다
        common.alert('warning', 'NLS0000818');
      } else {
        this.$emit('scoreChange', this.items);
      }
    },
    //* 컬럼버튼 이벤트
    columnsBtn(dataItem, inx) {
      this.$emit('columnsBtn', dataItem, inx);
    },
    setColumnHeight() {
      const heightList = [];
      Array.from(document.querySelectorAll('.columns-list.btn')).forEach(el => {
        heightList.push(el.clientHeight);
      });
      Array.from(document.querySelectorAll('.columns-list.column')).forEach(
        (el, i) => {
          el.style.height = `${heightList[i]}px`;
        },
      );
    },
    //* 합계
    setFooter() {
      const footer = document.querySelector('.k-grid-footer');
      const footerTable = document.querySelector('.k-grid-footer-table');
      const container = document.querySelector('.k-grid-container');
      const contents = document.querySelector('.k-grid-content');
      if (footer !== null) {
        container.after(footer);
        const td = document.querySelector('.td-footer');
        if (td) {
          td.innerText = this.$t('NLS0000426');
          td.style.background = '#e0e0e0';
        }
      }
      this.operator.forEach(obj => {
        const result = this.items.reduce((acc, cur) => {
          return (acc += Number(cur[obj.field]));
        }, 0);
        const el = document.querySelector(`.${obj.field}.td-footer`);
        if (el !== null) {
          el.classList.add('right');
          el.innerHTML = `${
            obj.fixed === undefined ? result : Number(result.toFixed(obj.fixed))
          }${obj.unit}`;
          this.$emit('sum', result, obj.field);
        }
      });
      contents.addEventListener('scroll', e => {
        footerTable.style.position = 'relative';
        footerTable.style.left = `-${e.target.scrollLeft}px`;
      });
    },
    //* 내용 없음 숨김
    norecordsHide() {
      const element = document.querySelectorAll('.k-grid-norecords td');
      // if (element !== null) element.style.display = 'none';
      if (element !== null) {
        Array.from(element).forEach(
          el => (el.innerText = this.$t('NLS0000932')),
        );
      }
    },
    //* tree func
    treeFunc(items) {
      return items.reduce((acc, cur) => {
        // const obj = { ...cur };
        acc.push(cur);
        if (cur.children && cur.expanded)
          acc = [...acc, ...this.treeFunc(cur.children)];
        return acc;
      }, []);
    },
    //* tree evnt
    expanded() {
      this.items = this.treeFunc(this.items);
      // this.$emit('expanded', this.items);
    },
    headerSortEvent(sortObj, func) {
      // if (field === '') this.sortObj = [{ field, dir: '' }];
      // else this.sortObj = [{ field, dir: sortObj }];
      this.$emit('headerSortEvent', sortObj, func);
    },
    //* 팝업 버튼
    popup(items) {
      this.$emit('popup', items);
    },
  },
};
</script>
<style lang="scss">
/*.colflex-wrap {
  padding-top: 0;
  > span:not(.column-editor) {
    padding-top: 10px;
  }
}*/
.column-editor {
  padding: 0;
}

.hms-grid .k-grid .k-virtual-content .k-grid-table tr td {
  min-height: 30px;
  height: auto !important;
  vertical-align: middle;
  .tablerowshow-gyay-btn {
    vertical-align: middle;
  }
  &.cell-top {
    vertical-align: top;
  }
}
</style>

<style>
.k-header.center {
  text-align: center;
}
.k-header.left {
  text-align: left;
}
.k-header.right {
  text-align: right;
}
.center {
  text-align: center !important;
}
.left {
  text-align: left !important;
}
.right {
  text-align: right !important;
}
.k-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #afafaf;
  background: #f9f9f9;
  border-radius: 1px;
  box-shadow: none;
}
.k-checkbox:focus {
  border-color: #afafaf;
  box-shadow: none;
}
.k-checkbox:hover {
  border-color: #a9a9a9;
}
.k-checkbox:checked {
  border-color: #434159;
  color: #fff;
  background: #fff;
}
.k-checkbox:checked:focus {
  border-color: #434159;
  box-shadow: none;
}
.k-checkbox:checked::after {
  content: '\e118';
  display: block;
  position: absolute;
  left: 1px;
  top: 1px;
  font-size: 16px;
  color: #434159;
  font-family: 'WebComponentsIcons';
}
.k-grid tr.k-state-selected > td {
  background: #ddd;
}
.inCell {
  cursor: pointer;
}
</style>
