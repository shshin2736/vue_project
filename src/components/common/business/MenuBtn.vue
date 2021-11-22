<script>
import { common } from '@/utils';
export default {
  render(h) {
    return this.typeSelector(h);
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    types: {
      type: String,
      required: false,
      default: 'dropdowns',
    },
    mobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      current: [],
      selectAlarm: {},
    };
  },
  methods: {
    //* DROPDOWS LI ELEMENT 생성
    createLi(h, item) {
      const self = this;
      return h('li', [
        h(
          'button',
          {
            on: {
              click() {
                self.open = false;
                self.$emit('onClick', {
                  id: item.id,
                  title: item.title,
                });
              },
              mouseenter: function(e) {
                e.preventDefault();
                e.stopPropagation();
                self.open = true;
              },
            },
          },
          item.title,
        ),
      ]);
    },
    //* DROPDOWS UL ELEMENT 생성
    createUl(h, data) {
      const self = this;
      return h(
        'ul',
        {
          on: {
            mouseenter: function(e) {
              e.preventDefault();
              e.stopPropagation();
              self.open = true;
            },
            mouseleave: function(e) {
              e.preventDefault();
              e.stopPropagation();
              self.open = false;
            },
          },
        },
        [data.children.map(item => this.createLi(h, item))],
      );
    },
    //* DROPDOWS ELEMENT 생성
    createDropdowns(h) {
      const self = this;
      const data = { ...this.value };
      return h(
        'div',
        {
          class: { [data.mainClass]: true, ['open']: self.open },
        },
        [
          h(
            'button',
            {
              class: { [data.subClass]: true },
              on: {
                click: function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  self.open = !self.open;
                  self.$emit('main');
                },
                mouseleave: function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  self.open = false;
                },
              },
            },
            [h('span', data.title)],
          ),
          this.createUl(h, data),
        ],
      );
    },
    //* ALARMS A ELEMENT 생성
    createAnker(h, data, field) {
      const self = this;
      return h(
        'a',
        {
          class: 'alarm-list',
          on: {
            click: function() {
              self.open = !self.open;
              self.$emit('notice', data, field);
            },
          },
        },
        [
          h(
            'p',
            { class: 'alarm-title' },
            data.title.replace('<p>', '').replace('</p>', ''),
          ),
          h('span', { class: 'alarm-name' }, data.name),
          h('em', { class: 'alarm-date' }, data.date),
        ],
      );
    },
    //* 체크박스 생성
    createCheckBox(h, data, field) {
      const self = this;
      return h(
        'span',
        {
          class: {
            ['check-form']: true,
          },
        },
        [
          h(
            'input',
            {
              attrs: {
                type: 'checkbox',
                id: `id_${data.alarmId}${self.mobile ? '_m' : ''}`,
              },
              class: {
                [`${field}_selected`]: true,
              },
              domProps: {
                ref: 'checkbox',
              },
              on: {
                change: function(e) {
                  // e.target.setAttribute('checked', e.target.checked);
                  if (e.target.checked)
                    self.selectAlarm[field].push({ ...data });
                  else
                    self.selectAlarm[field] = self.selectAlarm[field].filter(
                      item => item.alarmId !== data.alarmId,
                    );
                },
              },
            },
            '',
          ),
          h(
            'label',
            {
              attrs: {
                for: `id_${data.alarmId}${self.mobile ? '_m' : ''}`,
              },
            },
            [h('span', {}, 'check')],
          ),
        ],
      );
    },
    //* 리스트 박스 생성
    createListBox(h, data, field) {
      return h('ul', {}, [
        h('li', {}, [
          this.createCheckBox(h, data, field),
          this.createAnker(h, data, field),
        ]),
      ]);
    },
    //* ALARMS DD ELEMENT 생성
    cretaeDd(h, data) {
      if (!this.selectAlarm[data.field]) this.selectAlarm[data.field] = [];
      return h(
        'dd',
        {},
        data.children.map(item => this.createListBox(h, item, data.field)),
      );
    },
    //* ALARMS DT ELEMENT 생성
    createDt(h, data, inx) {
      const classNm = 'alram-menu-btn';
      const title = `${data.btnTitle}<span>(${data.children.length})</span>`;
      const fn = () => {
        // this.current[inx] = !this.current[inx];
        this.$set(this.current, inx, !this.current[inx]);
      };
      return h('dt', { class: { current: this.current[inx] } }, [
        this.createAlarmBtn(h, title, classNm, fn),
        this.createDeleteBtn(h, data),
      ]);
    },
    //* ALARMS DL ELEMENT 생성
    createDl(h, data) {
      return h(
        'dl',
        {},
        data.alarmList.reduce((acc, cur, inx) => {
          acc.push(this.createDt(h, cur, inx));
          acc.push(this.cretaeDd(h, cur, inx));
          return acc;
        }, []),
      );
    },
    //* ALARMS BUTTON 생성
    createAlarmBtn(h, title, classNm, fn) {
      return h(
        'button',
        {
          attrs: {
            type: 'button',
          },
          class: classNm,
          on: {
            click: function(e) {
              e.stopPropagation();
              fn();
            },
          },
          domProps: {
            innerHTML: title,
          },
        },
        // title,
      );
    },
    //* ALARMS DELETE BTN 생성
    createDeleteBtn(h, data) {
      const self = this;
      return h(
        'span',
        {
          class: {
            ['alarm__delete']: true,
          },
        },
        [
          h(
            'a',
            {
              attrs: {
                href: '#',
              },
              on: {
                click: function() {
                  const checkEl = Array.from(
                    document.querySelectorAll(
                      `${self.mobile ? '.mobile-header ' : '.header '}.${
                        data.field
                      }_selected`,
                    ),
                  );
                  checkEl.forEach(check => {
                    check.checked = true;
                  });
                  self.selectAlarm[data.field] = [...data.children];
                },
              },
            },
            self.$t('NLS0001241'),
          ),
          h(
            'a',
            {
              attrs: {
                href: '#',
              },
              on: {
                click: function() {
                  const items = self.selectAlarm[data.field];
                  const field = data.field;
                  if (items && items.length > 0)
                    //삭제하시겠습니까?
                    common.confirm('NLS0000004', () => {
                      self.$emit('deleteAlarm', {
                        items,
                        field,
                      });
                      self.value.alarmList.forEach(obj => {
                        if (obj.field === field) {
                          obj.children = obj.children.filter(child => {
                            const flag = !items.some(
                              item => item.alarmId === child.alarmId,
                            );
                            if (!flag)
                              document
                                .querySelector(`#id_${child.alarmId}`)
                                .click();
                            return flag;
                          });
                        }
                        return obj;
                      });
                      self.selectAlarm[field] = [];
                    });
                },
              },
            },
            self.$t('NLS0000075'),
          ),
        ],
      );
    },
    //* ALARMS TITLE ELEMENT 생성
    createAlarmTitle(h, data) {
      const classNm = 'layer-close';
      const title = 'Close';
      const fn = () => (this.open = false);
      return h(
        'div',
        {
          class: 'alarm__title',
          on: {
            click: function(e) {
              e.preventDefault();
            },
          },
        },
        [
          data.title,
          // this.createDeleteBtn(h),
          this.createAlarmBtn(h, title, classNm, fn),
        ],
      );
    },
    createAlarmNoData(h, data) {
      return h(
        'dl',
        {
          class: {
            ['no-data']: true,
          },
        },
        [h('dt', {}, data.noData)],
      );
    },
    //* Mobile 용 ALARM BOX ELEMENT 생성
    createMobileAlarmBox(h, data) {
      const self = this;
      return h(
        'div',
        {
          class: {
            overlay: self.open,
          },
          on: {
            click: function() {
              // e.preventDefault();
              // e.stopPropagation();
              // self.open = false;
            },
          },
        },
        [this.createAlarmBox(h, data)],
      );
    },
    //* ALARMS BOX ELEMENT 생성
    createAlarmBox(h, data) {
      const self = this;
      return h(
        'div',
        {
          class: 'header__alarm__box',
          style: {
            display: self.open ? 'block' : 'none',
          },
        },
        [
          this.createAlarmTitle(h, data),
          data.alarmList && data.alarmList.length === 0
            ? this.createAlarmNoData(h, data)
            : this.createDl(h, data),
        ],
      );
    },
    //* ALARMS ELEMENT 생성
    createAlarms(h) {
      const self = this;
      const data = this.value;
      return h(
        'div',
        {
          class: 'header__alarm',
        },
        [
          h(
            'button',
            {
              class: {
                ['header__alarm__button']: true,
                ['header__alarm__button--new']: data.new,
              },
              attrs: { title: this.$t('NLS0001443') },
              on: {
                click: function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  self.open = !self.open;
                  // data.new = false;
                },
                mouseleave: function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  // self.open = false;
                },
              },
            },
            [h('span', {}, 'alarm')],
          ),
          self.mobile
            ? this.createMobileAlarmBox(h, data)
            : this.createAlarmBox(h, data),
        ],
      );
    },
    typeSelector(h) {
      return this.types === 'dropdowns'
        ? this.createDropdowns(h)
        : this.types === 'alarm'
        ? this.createAlarms(h)
        : 'header__alarm__button--new';
    },
  },
};
</script>
<style scoped>
.overlay {
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Black background with opacity */
  /*cursor: pointer; !* Add a pointer on hover *!*/
}
</style>
