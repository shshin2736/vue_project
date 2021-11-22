<script>
import { common, timezone } from '@/utils';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import DepartmentSinglePopup from '@/components/common/business/DepartmentSinglePopup';
import ComDatePicker from '@/components/common/global/ComDatePicker';

export default {
  components: {
    DepartmentSinglePopup,
    ComDatePicker,
  },
  mixins: [commonStore],
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    drag: {
      type: Boolean,
      required: false,
    },
    resize: {
      type: Boolean,
      required: false,
      default: false,
    },
    inLineEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: Number,
      required: false,
      default: 300,
    },
  },
  data() {
    return {
      treeData: [],
      items: {},
      fromEl: null,
      fromId: 0,
      fromRowId: 0,
      fromItem: {},
      contentScrollLeft: 0,
      editItem: {},
      selected: {},
      testing: '',
    };
  },
  computed: {
    getManager() {
      return this[commonTypes.getters.GET_SELECTED_DEPARTMENT_MANAGER_DATA];
    },
    //* 공동사용자 추가 팝업(싱글)
    openDepartSinglePop: {
      set(value) {
        this[commonTypes.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](value);
      },
      get() {
        return this[commonTypes.getters.GET_VIEWS_DEPT_MANAGER_SINGLE_POP];
      },
    },
  },
  watch: {
    data: function(value) {
      if (value !== null && value !== undefined) this.treeData = value.slice(0);
    },
  },
  created() {
    this.treeData = this.data.slice(0);
  },
  beforeDestroy() {
    this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_DATA]({});
  },
  methods: {
    //* ID 추출 메소드
    getFieldId(el) {
      let id = null;
      el.classList.forEach(items => {
        const item = items.split('_');
        if (item[0] === 'id') id = item[1];
      });
      return id;
    },
    getRowId(el) {
      let rowId = [];
      el.classList.forEach(items => {
        const item = items.split('_');
        if (item[0] === 'row') {
          rowId[0] = item[1];
          rowId[1] = item[2];
        }
      });
      return rowId;
    },
    //* 데이터 삭제
    deleteTreeData(data, fromId) {
      return data.reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.id == fromId) {
          this.items = obj;
          return acc;
        } else if (obj.children !== undefined) {
          obj.children = this.deleteTreeData(obj.children, fromId);
        }
        acc.push(obj);
        return acc;
      }, []);
    },
    //* 데이터 체인지 리스트
    getTreeChangeList(data, items, fromId, toId, type) {
      const field = { ...items };
      return data.reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.children !== undefined) {
          const children = this.getTreeChangeList(
            obj.children,
            field,
            fromId,
            toId,
            type,
          );
          obj.children = children.length === 0 ? undefined : children;
        } else {
          obj.children = undefined;
          obj.expanded = undefined;
        }
        obj.children =
          obj.children !== undefined && obj.children.length === 0
            ? undefined
            : obj.children;
        if (obj.id.toString() === toId) {
          if (type === 'up') {
            acc.push(field);
            acc.push(obj);
          } else {
            acc.push(obj);
            acc.push(field);
          }
        } else {
          acc.push(obj);
        }
        return acc;
      }, []);
    },
    //* 데이터 하위 그룹 삽입
    getTreeInputList(data, items, fromId, toId) {
      return data.reduce((acc, cur) => {
        const obj = { ...cur };
        if (obj.id == fromId) return acc;
        if (obj.id == toId) {
          if (obj.children === undefined) {
            obj.children = [];
          }
          obj.expanded = true;
          obj.children.push(items);
        } else if (obj.children !== undefined) {
          const children = this.getTreeInputList(
            obj.children,
            items,
            fromId,
            toId,
          );
          obj.children = children.length === 0 ? undefined : children;
          // obj.expanded = true;
        } else {
          obj.children = undefined;
          obj.expanded = undefined;
        }
        acc.push(obj);
        return acc;
      }, []);
    },
    //* 펼침 및 뎁스용 SPAN Element 생성
    createExpandSpan(h, option, data) {
      const clickEvent = () => {
        this.$set(data, 'expanded', !data.expanded);
      };
      return h('div', {
        class: {
          'k-icon': true,
          [option]: true,
        },
        on: {
          click: clickEvent,
        },
      });
    },
    //* resize span 생성
    createResizeSpan(h, i) {
      const self = this;
      let startX = 0;
      // let beforeWidth = 0;
      return h('div', {
        attrs: {
          draggable:
            Object.keys(self.editItem).length > 0 ? false : self.resize,
        },
        class: {
          'resize-block': self.resize,
          'resize-cursor': self.resize,
        },
        on: {
          dragover: function(e) {
            e.preventDefault();
          },
          drag: function(e) {
            startX = startX === 0 ? e.pageX : startX;
            if (startX !== e.pageX && e.pageX > 0) {
              const moveWidth = e.pageX - startX > 0 ? 2 : -2;
              const widthNow = Number(self.columns[i].width);
              self.$set(self.columns[i], 'width', widthNow + moveWidth);
              startX = e.pageX;
            }
          },
        },
      });
    },
    //* TH Element 생성
    createTh(h, item, headerAlign, i) {
      return h(
        'th',
        {
          class: {
            'tree-view-vue-header': true,
            [headerAlign]: headerAlign === undefined ? false : true,
          },
          attrs: {
            scope: 'col',
          },
        },
        [item, this.createResizeSpan(h, i)],
      );
    },
    //* THEAD Element 생성
    createThead(h, flag) {
      return h(
        'thead',
        {
          style: {
            display: flag ? 'none' : '',
          },
        },
        [
          h('tr', {}, [
            this.columns.map((column, i) => {
              return this.createTh(
                h,
                column.title === undefined ? column.field : column.title,
                column.headerAlign,
                i,
              );
            }),
          ]),
        ],
      );
    },
    //* COL Element 생성
    createCol(h, column, i) {
      const width =
        column.width !== undefined ? { width: `${column.width}px` } : {};
      return h('col', {
        attrs: width,
        class: {
          [`col_${i}`]: true,
        },
      });
    },
    //* COLGROUP Element 생성
    createColgroup(h) {
      return h('colgroup', {}, [
        this.columns.map((column, i) => {
          return this.createCol(h, column, i);
        }),
      ]);
    },
    //* TD Element 생성
    createTd(h, data, column, i, depth, row, rowClass) {
      const self = this;
      const id = `id_${data.id}`;
      const option = data.expanded ? 'k-i-collapse' : 'k-i-expand';
      const child =
        data.children === undefined || data.children.langth === 0
          ? false
          : true;
      let classname = '';
      if (column.format === 'progress') {
        let progVal =
          data[column.field] != null ? data[column.field] : undefined;
        progVal = progVal !== undefined ? Math.round(progVal / 10) * 10 : '';
        if (progVal > 110) progVal = 110;
        if (progVal < 0) progVal = 0;
        const temp = progVal !== '' ? `${column.classname}${progVal}` : '';
        classname = column.classname === undefined ? false : temp;
      }
      const none = [];
      for (let j = 0; j < depth; j++) {
        none.push(this.createExpandSpan(h, false, 'k-i-none'));
      }
      if (child && i === 0) none.push(this.createExpandSpan(h, option, data));
      else none.push(this.createExpandSpan(h, false, 'k-i-none'));
      return h(
        'td',
        {
          attrs: {
            draggable:
              Object.keys(self.editItem).length > 0 || i > 0
                ? false
                : self.drag,
          },
          class: {
            field: true,
            [id]: true,
            [`td_${i}`]: true,
            [rowClass]: true,
            [column.align]: column.align === undefined ? false : true,
            cursor: column.format === 'button',
            ['select-row']: self.selected[id],
            ['under-line-btn']: column.underLine ? true : false,
            [column.classname]:
              column.classname === undefined ? false : column.classname,
            [classname]: classname !== '' ? true : false,
          },
          style: {
            position: 'relative',
            overflow: 'hidden',
            height: `28px`,
          },
          on: {
            dragover: function(e) {
              e.preventDefault();
            },
            dragstart: function(e) {
              if (!self.drag) {
                e.target.ondragstart = function() {
                  return false;
                };
                return;
              }
              if (Object.keys(self.editItem).length === 0) {
                self.fromEl = e.toElement.querySelector('.field');
                self.fromId = self.getFieldId(self.fromEl);
                self.fromItem = data;
                self.fromRowId = self.getRowId(self.fromEl);
              }
            },
            click: function(e) {
              self.$set(self.selected, id, true);
              for (const key in self.selected) {
                if (id !== key) self.$set(self.selected, key, false);
              }
              if (column.format !== 'checkbox')
                self.$emit('onClick', e, column.field, data);
            },
          },
        },
        i === 0
          ? [
              h(
                'div',
                {
                  style: {
                    position: 'absolute',
                    top: `3px`,
                    left: 0,
                    zIndex: 10,
                  },
                },

                [
                  i === 0 ? none : '',
                  this.createField(h, data, column, i, rowClass, none.length),
                ],
              ),
              this.createDropBoxWrap(h, data, column, i, rowClass),
            ]
          : [
              i === 0 ? none : '',
              this.createField(h, data, column, i, rowClass, none.length),
            ],
      );
    },
    createDropBox(h, data, column, i, type, rowClass) {
      const self = this;
      const id = `id_${data.id}`;
      return h('div', {
        class: {
          field: true,
          [id]: true,
          [`td_${i}`]: true,
          [`drop-box__${type}`]: true,
          [rowClass]: true,
        },
        on: {
          dragenter: function(e) {
            if (self.resizeChk) return;
            e.toElement.classList.add('field-background-line');
          },
          dragleave: function(e) {
            if (self.resizeChk) return;
            e.toElement.classList.remove('field-background-line');
          },
          drop: function(e) {
            e.toElement.classList.remove('field-background-line');
            e.toElement.classList.remove('field-background-add');
            e.stopPropagation();
            if (!self.drag) return;
            if (self.resizeChk) return;
            if (Object.keys(self.editItem).length === 0) {
              const toEl = e.toElement;
              const toId = self.getFieldId(toEl);
              const toRow = self.getRowId(toEl);
              const fromRow = self.fromRowId;
              if (toRow[0] === fromRow[0] && toRow[1] > fromRow[1]) return;
              if (toId !== null && toId !== self.fromId) {
                const treeData = self.getTreeChangeList(
                  self.deleteTreeData(self.treeData, self.fromId),
                  self.items,
                  self.fromId,
                  toId,
                  type,
                );
                self.treeData = treeData;
                self.$emit('change', e, treeData);
                self.$emit('parents', self.fromItem, data);
              }
            }
          },
        },
      });
    },
    createDropBoxWrap(h, data, column, i, rowClass) {
      return h(
        'div',
        {
          class: {
            ['drop-box']: true,
          },
        },
        [
          this.createDropBox(h, data, column, i, 'up', rowClass),
          this.createDropBox(h, data, column, i, 'down', rowClass),
        ],
      );
    },
    //* 체크박스 Element 생성
    createCheckbox(h, data, column, row) {
      const self = this;
      const title = column.title;
      const field = column.field;
      const value = data[field].value;
      const checked = data[field].checked;
      const render = data[field].render;
      const disable = data[field].disable;
      const items = data;
      return render === false
        ? ''
        : h(
            'span',
            {
              class: {
                'check-form': true,
                'text-in': true,
                [row]: true,
              },
            },
            [
              h('input', {
                attrs: {
                  type: 'checkbox',
                  value: value,
                  checked: checked,
                  id: `${data.id}_${column.title}`,
                  disabled: disable,
                },
                class: {
                  tree_checkbox: true,
                },
                on: {
                  click: function(e) {
                    items[field].checked = !items[field].checked;
                    items[field].checked &&
                    (items[field].value === 'Y' || items[field].value === 'N')
                      ? (items[field].value = 'Y')
                      : (items[field].value = 'N');
                    self.$emit(
                      'checked',
                      e,
                      self.treeData,
                      e.target.checked,
                      data,
                    );
                  },
                },
              }),
              h(
                'label',
                {
                  attrs: {
                    for: `${data.id}_${column.title}`,
                  },
                  class: {
                    disable: disable,
                  },
                },
                title,
              ),
            ],
          );
    },
    //* 삭제 버튼 Element 생성
    createDelete(h, data, row) {
      const self = this;
      return h(
        'button',
        {
          attrs: {
            type: 'button',
          },
          class: {
            'grid-delete-btn': true,
            [row]: true,
          },
          on: {
            click: function(e) {
              self.$emit('delete', e, self.treeData, data);
            },
          },
        },
        self.$t('NLS0000075'),
      );
    },
    createPopupBtn(h, data, column, i, row, depth) {
      const width = Number(this.columns[i].width) - (depth + 3) * 16;
      const self = this;
      const id = `id_${data.id}`;
      return [
        h(
          'div',
          {
            class: {
              field: true,
              [id]: true,
              [row]: true,
              [`text-filed-${i}`]: true,
              [`under-line-btn`]: column.underList ? true : false,
            },
            style: {
              width: `${width}px`,
              display: 'flex',
              justifyContent: 'flex-start',
            },
          },
          [
            h(
              'div',
              {
                class: {
                  field: true,
                  [id]: true,
                  [row]: true,
                  [`text-filed-${i}`]: true,
                  [`under-line-btn`]: column.underList ? true : false,
                },
              },
              data[column.field],
            ),
            h('button', {
              class: {
                'tablerowshow-btn':
                  data.popup !== undefined && data.popup ? true : false,
                'tablerowshow-gyay-btn':
                  data.popup !== undefined && !data.popup ? true : false,
              },
              style: {
                width: '30px',
              },
              on: {
                click: function(e) {
                  self.$emit('popup', e, data);
                },
              },
            }),
          ],
        ),
        // h('button', {
        //   class: {
        //     'tablerowshow-btn':
        //       data.popup !== undefined && data.popup ? true : false,
        //     'tablerowshow-gyay-btn':
        //       data.popup !== undefined && !data.popup ? true : false,
        //   },
        //   on: {
        //     click: function(e) {
        //       self.$emit('popup', e, data);
        //     },
        //   },
        // }),
      ];
    },
    //* Link span 태그 생성
    createLink(h, data, column, i, row) {
      const self = this;
      const id = `id_${data.id}`;
      return h(
        'div',
        {
          class: {
            'tree-list-vue-link': true,
            [id]: true,
            [row]: true,
            [`text-filed-${i}`]: true,
          },
          on: {
            click: function(e) {
              e.stopPropagation();
              self.$emit('textLink', column.field, data);
            },
          },
        },
        data[column.field],
      );
    },
    createCommand(h, data, column, row) {
      const self = this;
      const toId = `e${data.id}`;
      const deleteBtn = data.inEdit ? true : data.btnDelete ? true : false;
      const editBtn = data.inEdit ? true : data.btnEdit ? true : false;
      return h(
        'div',
        {
          class: {
            'command-btn-wrap': true,
            [row]: true,
          },
        },
        [
          editBtn
            ? h(
                'button',
                {
                  attrs: {
                    type: 'button',
                  },
                  class: {
                    'red-btn': data.inEdit,
                    'check-btn': data.inEdit,
                    'brightgray-btn': !data.inEdit,
                    'pencil-btn2': !data.inEdit,
                  },
                  on: {
                    click: function(e) {
                      e.stopPropagation();
                      if (data.inEdit) {
                        //* 공백 검사
                        if (
                          self.columns.some(column =>
                            column.inEdit
                              ? self.editItem[toId][column.field] ===
                                  undefined ||
                                self.editItem[toId][column.field] === ''
                              : false,
                          )
                        ) {
                          common.alert('warning', 'NLS0000003');
                          return;
                        }
                        //* 날짜 검사
                        if (
                          self.columns.some(column => {
                            if (column.validate) {
                              const items = column.validate.map(key => {
                                return column.format === 'datePicker'
                                  ? new Date(self.editItem[toId][key])
                                  : self.editItem[toId][key];
                              });
                              return column.func(...items);
                            } else false;
                          })
                        ) {
                          common.alert('warning', 'NLS0000634');
                        } else {
                          common.confirm('NLS0000005', () => {
                            self.columns.forEach(column => {
                              if (self.editItem[toId][column.field])
                                data[column.field] =
                                  self.editItem[toId][column.field];
                            });
                            if (
                              self.editItem[toId].taskDeptId &&
                              self.editItem[toId].taskUserId
                            ) {
                              data.taskDeptId = self.editItem[toId].taskDeptId;
                              data.taskUserId = self.editItem[toId].taskUserId;
                            }
                            self.$set(data, 'inEdit', false);
                            self.edit = false;
                            delete self.editItem[toId];
                            self.$emit('update', e, self.treeData, data);
                          });
                        }
                      } else {
                        self.columns.forEach(column => {
                          self.editItem[toId] = {
                            [column.field]: data[column.field],
                          };
                        });
                        self.$set(data, 'inEdit', true);
                        self.$emit('edit', e, self.treeData, data);
                      }
                    },
                  },
                },
                data.inEdit === undefined || data.inEdit === false
                  ? self.$t('NLS0001258') //* 편집
                  : data.inEdit === 'new'
                  ? self.$t('NLS0000074')
                  : self.$t('NLS0001085'), //* 수정
              )
            : h('div'),
          deleteBtn
            ? h(
                'button',
                {
                  attrs: {
                    type: 'button',
                  },
                  class: {
                    'deepdarkgray-btn': data.inEdit,
                    'cancel-btn': data.inEdit,
                    'brightgray-btn': !data.inEdit,
                    'grid-delete-btn': !data.inEdit,
                  },
                  on: {
                    click: function(e) {
                      e.stopPropagation();
                      if (!data.inEdit) {
                        common.confirm('NLS0000004', () => {
                          self.treeData = self.deleteTreeData(
                            self.treeData,
                            data.id,
                          );
                          self.$emit('delete', e, self.treeData, data);
                        });
                      } else {
                        if (data.inEdit === 'new')
                          self.treeData = self.deleteTreeData(
                            self.treeData,
                            data.id,
                          );
                        self.$set(data, 'inEdit', false);
                        self.edit = false;
                        delete self.editItem[toId];
                        self.$emit('cancel', e, self.treeData, data);
                      }
                    },
                  },
                },
                data.inEdit === undefined || data.inEdit === false
                  ? self.$t('NLS0000075') //* 삭제
                  : self.$t('NLS0001259'), //* 취소
              )
            : h('div'),
        ],
      );
    },
    //* 텍스트 Editor
    createInputText(h, data, column) {
      const self = this;
      const toId = `e${data.id}`;
      if (!self.editItem[toId][column.field])
        self.editItem[toId][column.field] = data[column.field];
      const value = self.editItem[toId][column.field];

      return h('input', {
        attrs: {
          type: 'text',
          name: toId,
        },
        domProps: {
          value:
            !self.editItem[toId][column.field] && data.inEdit === 'new'
              ? ''
              : value,
        },
        class: {
          ['k-textbox']: true,
        },
        on: {
          keyup: function(e) {
            self.editItem[toId][column.field] = e.target.value;
          },
        },
      });
    },
    //* Datepicker Editor
    createDatePicker(h, data, column) {
      const self = this;
      const time = timezone;
      const toId = `e${data.id}`;
      if (!data[column.field])
        data[column.field] = time.convertToDateFormat(
          time.convertToISO8601String(time.convertToString(new Date())),
          'YYYY-MM-DD',
        );
      if (!self.editItem[toId][column.field])
        self.editItem[toId][column.field] = data[column.field];
      const current =
        data[column.field] === undefined
          ? new Date()
          : new Date(self.editItem[toId][column.field]);
      return h('com-date-picker', {
        props: {
          current,
          direction: true,
          id: `e${data.id}-${column.field}`,
        },
        on: {
          onChange: function(date) {
            self.editItem[toId][column.field] = time.convertToDateFormat(
              time.convertToISO8601String(time.convertToString(date)),
              'YYYY-MM-DD',
            );
          },
        },
      });
    },
    //* 담당자 검색 Editor
    createManagerSearch(h, data, column) {
      const self = this;
      const toId = `e${data.id}`;
      const types = commonTypes;
      const managerInfo = { ...self.getManager };
      if (managerInfo[toId]) {
        // self.editItem[toId][column.field] = managerInfo[toId];
        this.$set(self.editItem[toId], column.field, managerInfo[toId]);
        self.editItem[toId].taskDeptId = managerInfo.deptId;
        self.editItem[toId].taskUserId = managerInfo.userId;
      }
      if (!self.editItem[toId][column.field]) {
        self.editItem[toId][column.field] = '';
      }
      if (!self.editItem[toId]['search']) {
        self.editItem[toId]['search'] = '';
      }
      if (data.inEdit === 'new' && !data.init) {
        self.editItem[toId].taskDeptId = data.taskDeptId;
        self.editItem[toId].taskUserId = data.taskUserId;
        self.editItem[toId][column.field] = data[column.field];
        data.init = true;
      }
      const manager =
        !self.editItem[toId][column.field] && data.inEdit === 'new'
          ? ''
          : self.editItem[toId][column.field];

      return h(
        'div',
        {
          class: {
            ['input__box']: true,
          },
        },
        [
          h('input', {
            attrs: {
              type: 'text',
            },
            class: {
              ['k-textbox']: true,
            },
            domProps: {
              value: manager,
            },
            on: {
              input: function() {
                self.$emit('input', manager);
              },
              keyup: function(e) {
                e.stopPropagation();
                if (event.keyCode === 13) {
                  self[types.actions.INIT_DEPARTMENT_MANAGER_EDITOR_ID](toId);
                  self[types.actions.INIT_SEARCH_DEPT_USER_NAME](
                    e.target.value,
                  );
                  self[types.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
                } else {
                  self.editItem[toId]['search'] = e.target.value;
                }
              },
            },
          }),
          h('button', {
            class: {
              ['magnifier-btn-black']: true,
            },
            style: {
              position: 'absolute',
            },
            on: {
              click: function(e) {
                e.stopPropagation();
                self[types.actions.INIT_DEPARTMENT_MANAGER_EDITOR_ID](toId);
                self[types.actions.INIT_SEARCH_DEPT_USER_NAME](
                  self.editItem[toId]['search'],
                );
                self[types.actions.INIT_VIEWS_DEPT_MANAGER_SINGLE_POP](true);
              },
            },
          }),
        ],
      );
    },
    //* Editor 생성
    createEditor(h, data, column) {
      const editItem = this.editItem[`e${data.id}`];
      if (!editItem) this.editItem[`e${data.id}`] = {};
      else {
        editItem.taskDeptId = editItem.taskDeptId
          ? editItem.taskDeptId
          : data.taskDeptId;
        editItem.taskUserId = editItem.taskUserId
          ? editItem.taskUserId
          : data.taskUserId;
        editItem.manager = editItem.manager ? editItem.manager : data.manager;
      }
      if (column.format === 'datePicker')
        return this.createDatePicker(h, data, column);
      else if (column.format === 'managerSearch')
        return this.createManagerSearch(h, data, column);
      else return this.createInputText(h, data, column);
    },
    //* Field Wrap 용 Span Element 생성
    createField(h, data, column, i, rowClass, depth) {
      const self = this;
      const id = `id_${data.id}`;
      const item =
        data.inEdit && column.inEdit
          ? this.createEditor(h, data, column)
          : column.format === undefined
          ? column['className'] === 'comma'
            ? common.numberWithCommas(data[column.field])
            : data[column.field]
          : column.format === 'editor'
          ? this.$route.params.auth.includes('X')
            ? this.createDelete(h, data, rowClass)
            : ''
          : column.format === 'command'
          ? this.createCommand(h, data, column, rowClass)
          : column.format === 'checkbox'
          ? this.createCheckbox(h, data, column, rowClass)
          : column.format === 'popup'
          ? this.createPopupBtn(h, data, column, i, rowClass, depth)
          : column.format === 'link'
          ? this.createLink(h, data, column, i, rowClass)
          : column['className'] === 'comma'
          ? common.numberWithCommas(data[column.field])
          : column.format === 'progress'
          ? this.makePercentage(data[column.field])
          : data[column.field];
      return h(
        'div',
        {
          attrs: {
            draggable: false,
          },
          class: {
            field: true,
            [id]: true,
            [rowClass]: true,
            [`text-filed-${i}`]: true,
            ['under-line-btn']: column.underLine ? true : false,
            cursor: column.format === 'popup',
            ellipsis: true,
          },
          style: {
            zIndex: 10,
          },
          on: {
            dragover: function(e) {
              e.preventDefault();
            },
            dragenter: function(e) {
              if (self.resizeChk) return;
              if (Object.keys(self.editItem).length === 0) {
                e.toElement.classList.add('field-background-add');
              }
            },
            dragleave: function(e) {
              if (self.resizeChk) return;
              e.toElement.classList.remove('field-background-add');
            },
            drop: function(e) {
              e.toElement.classList.remove('field-background-line');
              e.toElement.classList.remove('field-background-add');
              e.stopPropagation();
              if (!self.drag) return;
              if (self.resizeChk) return;
              if (Object.keys(self.editItem).length === 0) {
                const toEl = e.toElement;
                const toId = self.getFieldId(toEl);
                const toRow = self.getRowId(toEl);
                const fromRow = self.fromRowId;
                if (toRow[0] === fromRow[0] && toRow[1] > fromRow[1]) return;
                if (toId !== null && toId !== self.fromId) {
                  const treeData = self.getTreeInputList(
                    self.deleteTreeData(self.treeData, self.fromId),
                    self.items,
                    self.fromId,
                    toId,
                  );
                  self.treeData = treeData;
                  self.$emit('change', e, treeData);
                  self.$emit('children', self.fromItem, data);
                }
                toEl.classList.remove('field-background-add');
              }
            },
          },
        },
        [item],
      );
    },
    //* Contents tree element 생성
    createTree(h, item, row, depth, id, root) {
      const self = this;
      const data = item;
      const arr = [];
      const rowClass = `row_${id}_${depth}`;
      item.row = row;
      item.root = root;
      item.depth = depth;
      arr.push(
        h(
          'tr',
          {
            attrs: {
              scope: 'row',
            },
            class: {
              [rowClass]: true,
              'k-alt': row % 2 !== 0,
            },
            on: {
              click: function(e) {
                self.$emit('select', e, data);
              },
            },
          },
          [
            this.columns.map((column, i) => {
              return this.createTd(h, item, column, i, depth, row, rowClass);
            }),
          ],
        ),
      );
      if (item.children !== undefined && item.expanded) {
        depth++;
        item.children.map(obj => {
          arr.push(this.createTree(h, obj, ++row, depth, id, root));
        });
      }
      return arr;
    },
    //* TBODY Element 생성
    createTbody(h) {
      let row = 0;
      return h('tbody', {}, [
        this.treeData.map((item, i) => {
          const vNodeList = [this.createTree(h, item, ++row, 0, item.id, i)];
          return vNodeList;
        }),
      ]);
    },
    //* TABLE element 생성
    createTable(h, colgroup, thead, body, header = false) {
      return h(
        'table',
        {
          class: {
            'table-header': header,
          },
        },
        [colgroup, thead, body],
      );
    },
    //* HEADER Element 생성
    createHeader(h) {
      return h(
        'div',
        {
          class: {
            'k-grid-header': true,
          },
        },
        [
          h(
            'div',
            {
              class: {
                'k-grid-header-wrap': true,
              },
            },
            [
              this.createTable(
                h,
                this.createColgroup(h),
                this.createThead(h),
                true,
              ),
            ],
          ),
        ],
      );
    },
    //* 각 영역 Element 생성
    createContent(h) {
      const self = this;
      return h(
        'div',
        {
          class: {
            'k-grid-content': true,
            'k-auto-scrollable': true,
          },
          style: {
            height: `${self.height - 37}px`,
            overflow: 'scroll',
          },
          on: {
            scroll: function(e) {
              const table = document.querySelector('.k-grid-header-wrap>table');
              table.style.left = `-${e.target.scrollLeft}px`;
            },
          },
        },
        [this.createTable(h, this.createColgroup(h), this.createTbody(h))],
      );
    },
    //* 전체 Element 생성
    createEl(h) {
      // const self = this;
      return h(
        'div',
        {
          class: {
            'k-treelist': true,
            'k-grid': true,
            'k-widget': true,
            'k-grid-display-block': true,
          },
        },
        [this.createHeader(h), this.createContent(h)],
      );
    },
    makePercentage(data) {
      return data != null ? `${data}%` : null;
    },
  },
  render(h) {
    return this.createEl(h);
  },
};
</script>

<style scoped>
.field.center,
.tree-view-vue-header.center {
  text-align: center;
}
.field.left,
.tree-view-vue-header.left {
  text-align: left;
}
.field.right,
.tree-view-vue-header.right {
  text-align: right;
}
.table-header {
  height: 100%;
  position: absolute;
}
.field-background {
  background-color: #bbbbbb;
}
.field-background-line {
  background-color: #81d5fc;
}
.field-background-add {
  background-color: #fa9891;
}
.field {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tree-list-vue-link:hover {
  text-decoration: underline;
  cursor: pointer;
}
.disable::before {
  background: #bbbbbb;
}
label:hover {
  cursor: pointer;
}
.k-grid-header-wrap {
  height: 36px;
}
.tree-view-vue-header {
  position: relative;
  text-overflow: ellipsis;
  height: 36px;
  box-sizing: border-box;
  border-bottom: none;
  vertical-align: middle;
  /* overflow: visible; */
}
.resize-block {
  display: inline-block;
  position: absolute;
  top: 0;
  right: -2px;
  width: 4px;
  z-index: 100;
  border-radius: 3px;
  height: 100%;
  background: transparent;
}
.resize-cursor {
  cursor: col-resize;
  display: block;
  height: 1000%;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 0.5em;
}
.k-button {
  margin: 0 5px;
}
.cursor {
  cursor: pointer;
}
</style>
<style scoped lang="scss">
.k-grid-header-wrap {
  table {
    position: relative;
  }
}
.k-grid-content {
  table {
    .white-btn,
    .darkgray-btn,
    .red-btn,
    .blue-btn,
    .black-btn,
    .darkblue-btn,
    .gray-btn,
    .deepdarkgray-btn {
      height: 30px;
      min-width: 80px;
    }
  }
  &::v-deep .k-datepicker {
    width: 100%;
  }

  .k-picker-wrap.k-state-default,
  .input__box {
    display: flex;
    width: 100%;
    input {
      flex: 1;
      display: inline-block;
      width: 100%;
      min-width: auto;
    }
    .k-select,
    button {
      flex: none;
      width: 30px;
      height: 30px;
      position: relative !important;
    }
  }
}
.cell-fixed {
  width: 100%;
  max-width: none;
  overflow: initial;
  & .field {
    width: 100%;
    min-width: auto;
    max-width: none;
  }
}
.drop-box {
  position: absolute;
  width: 100%;
  height: 30px;
  top: 0;
  left: 0;
  opacity: 0.5;
}
.drop-box__up {
  width: 100%;
  height: 50%;
  /* background-color: #99a6f5; */
}
.drop-box__down {
  width: 100%;
  height: 50%;
  /* background-color: #1ed2ff; */
}
</style>
