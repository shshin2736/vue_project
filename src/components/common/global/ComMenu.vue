<script>
import Vue from 'vue';
import { LayoutInstaller } from '@progress/kendo-layout-vue-wrapper';
Vue.use(LayoutInstaller);

export default {
  name: 'ComMenu',
  props: {
    value: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
      required: false,
      default: 'bottom',
    },
  },
  methods: {
    onLink(items) {
      this.$emit('link', items);
    },
    createMenu(h) {
      return h(
        'kendo-menu',
        {
          attrs: {
            direction: this.direction,
          },
        },
        [
          this.value.map(item => {
            if (item.children !== undefined)
              return h('li', [
                item.title,
                this.createSubMenu(h, item.children),
              ]);
            else return h('li', item.title);
          }),
        ],
      );
    },
    createSubMenu(h, children) {
      const self = this;
      return h(
        'ul',
        children.map(item => {
          if (item.children !== undefined)
            return h('li', [item.title, this.createSubMenu(h, item.children)]);
          else
            return h(
              'li',
              {
                on: {
                  click: function() {
                    self.onLink(item);
                  },
                },
              },
              item.title,
            );
        }),
      );
    },
  },
  render(h) {
    return this.createMenu(h);
  },
};
</script>

<style></style>
