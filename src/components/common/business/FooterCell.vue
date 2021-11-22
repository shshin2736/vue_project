<script>
export default {
  props: {
    columns: {
      type: Array,
      required: false,
    },
    data: {
      type: Array,
      required: false,
    },
  },
  methods: {
    //* Create td element
    createTd(h, columns) {
      return columns.reduce((acc, cur) => {
        if (cur.field !== undefined)
          acc.push(
            h(
              'td',
              {
                attrs: {
                  field: cur.field,
                },
                class: {
                  [cur.field]: true,
                  'td-footer': true,
                },
                style: {
                  'text-align': cur.className,
                  background: '#fff',
                },
              },
              '',
            ),
          );
        if (cur.children !== undefined)
          acc = acc.concat(this.createTd(h, cur.children));
        return acc;
      }, []);
    },
    //* Create tr element
    createTr(h) {
      return h('tr', {}, this.createTd(h, this.columns));
    },
    //* Create tfoot element
    createTfoot(h) {
      return h(
        'tfoot',
        {},
        [this.createTr(h)],
        // this.data.map(item => {
        //   const obj = { ...item };
        //   return this.createTr(h, obj);
        // }),
      );
    },
    //* Create Col element
    createCol(h, columns) {
      return columns.reduce((acc, cur) => {
        if (cur.field !== undefined)
          acc.push(h('col', { attrs: { width: cur.width } }));
        if (cur.children !== undefined)
          acc = acc.concat(this.createCol(h, cur.children));
        return acc;
      }, []);
    },
    //* Create Colgroup element
    createColgroup(h) {
      return h('colgroup', {}, this.createCol(h, this.columns));
    },
    //* Create Table element
    createTable(h) {
      return h(
        'table',
        {
          class: {
            'k-grid-footer-table': true,
          },
        },
        [this.createColgroup(h), this.createTfoot(h)],
      );
    },
    //* Create footer wrap div element
    createFooterWrap(h) {
      return h(
        'div',
        {
          class: {
            'k-grid-footer-wrap': true,
          },
        },
        [this.createTable(h)],
      );
    },
    //* Create footer div element
    createFooter(h) {
      return h(
        'div',
        {
          class: {
            'k-grid-footer': true,
          },
        },
        [this.createFooterWrap(h)],
      );
    },
  },
  render(h) {
    return this.createFooter(h);
  },
};
</script>
