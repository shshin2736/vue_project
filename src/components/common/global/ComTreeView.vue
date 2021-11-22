<template>
  <kendo-treeview
    :id="name"
    ref="treeview"
    :data-source="dataSource"
    :drag-and-drop="dragDrop"
    :checkboxes="checkbox"
    :checkboxes-check-children="false"
    :style="style"
    @dragend="dragend"
    @dragstart="dragstart"
    @drag="drag"
    @expand="expand"
    @collapse="collapse"
    @change="change"
    @select="select"
    @check="onCheck"
    @navigate="navigate"
    @databound="databound"
    @drop="drop"
  >
  </kendo-treeview>
</template>

<script>
import Vue from 'vue';
import { TreeViewInstaller } from '@progress/kendo-treeview-vue-wrapper';
Vue.use(TreeViewInstaller);

export default {
  name: 'ComTreeView',
  props: {
    name: {
      type: String,
      required: true,
      default: 'treeview',
    },
    checkbox: {
      type: Boolean,
      required: false,
      default: false,
    },
    dataSource: {
      type: Object,
      required: true,
    },
    dragDrop: {
      type: Boolean,
      required: false,
      default: false,
    },
    delHide: {
      type: Boolean,
      required: false,
      default: false,
    },
    disableDrop: {
      type: String,
      required: false,
      default: null,
    },
    height: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      style: {
        height: `${this.height}px`,
      },
      cnt: 1,
      submit: null,
      positions: [
        { name: 'rootfolder', position: '0 0;' },
        { name: 'folder', position: '0 -16px;' },
        { name: 'pdf', position: '0 -32px;' },
        { name: 'html', position: '0 -48px;' },
        { name: 'image', position: '0 -64px;' },
      ],
      parent: '',
    };
  },
  watch: {
    delHide: function(value) {
      this.delElementHiding(value);
    },
  },
  mounted() {
    this.elementHiding();
  },
  updated() {
    this.elementHiding();
  },
  methods: {
    dragend(e) {
      const uid = e.sourceNode.getAttribute('data-uid');
      // 드레그 종료 이벤트
      const dataSource = this.$refs.treeview.kendoWidget().dataSource.view();
      // this.submitEvent(this.dataSourceMerge(dataSource));
      this.setParent(dataSource, uid);
      this.$emit('dragend', e, this.parent, this.dataSourceMerge(dataSource));
    },
    checkTargetNode(nodes, item) {
      if (
        (nodes.classList.contains('k-treeview-lines') &&
          nodes.getAttribute('id') === this.disableDrop) ||
        (item && item.parentId === '' && item.bscKpi === 'B')
      ) {
        return true;
      }

      if (nodes.offsetParent) {
        return this.checkTargetNode(nodes.offsetParent);
      }
    },
    checkBody(nodes) {
      if (nodes.classList.contains('k-treeview-lines')) {
        return true;
      }
      //console.log(nodes);
      if (nodes.offsetParent) {
        return this.checkBody(nodes.offsetParent);
      }
    },
    drop(e) {
      const uid = e.sourceNode.getAttribute('data-uid');
      // 드레그 종료 이벤트
      const dataSource = this.$refs.treeview.kendoWidget().dataSource.view();
      const item = this.getItem(dataSource, uid);
      const checked = this.checkTargetNode(e.dropTarget.offsetParent, item);
      const body = this.checkBody(e.dropTarget.offsetParent);
      e.setValid(!checked && body);
      this.$emit('drop', item, dataSource);
    },
    getItem(dataSource, uid) {
      let item = null;
      for (const data of dataSource) {
        if (uid === data.uid) {
          item = data;
        } else if (data.items !== undefined) {
          item = this.getItem(data.items, uid);
        }
        if (item) return item;
      }
    },
    databound() {
      const dataSource = this.$refs.treeview.kendoWidget().dataSource.view();
      // this.submitEvent(this.dataSourceMerge(dataSource));
      this.submitEvent(dataSource);
      this.elementHiding();
      this.delElementHiding(this.delHide);
    },
    dragstart() {
      // 드레그 시작 이벤트
    },
    drag() {},
    expand() {
      // 트리 확장 이벤트
    },
    collapse() {
      // 트리 축소 이벤트
    },
    change() {
      // 변경 이벤트
    },
    select(e) {
      this.$emit('select', e);
    },
    onCheck(e) {
      const childs = e.node.childNodes;
      if (e.node.ariaChecked === 'true' && childs[1])
        this.childrenChecked(childs[1]);
      const checkedNodes = [];
      const treeView = this.$refs.treeview.kendoWidget();

      this.checkedNodeIds(treeView.dataSource.view(), checkedNodes);
      this.$emit('onCheck', e, checkedNodes);
    },
    childrenChecked(ul) {
      for (const li of ul.childNodes) {
        const child = li.childNodes;
        if (li.getAttribute('aria-checked') === 'false')
          this.childrenClick(child[0]);
      }
    },
    childrenClick(el) {
      for (const div of el.childNodes) {
        if (div.classList.contains('k-checkbox-wrapper'))
          div.childNodes[0].click();
      }
    },
    checkedNodeIds(nodes, checkedNodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
          checkedNodes.push(nodes[i].id);
        }

        if (nodes[i].hasChildren) {
          this.checkedNodeIds(nodes[i].children.view(), checkedNodes);
        }
      }
    },
    navigate() {
      // 포커스 이동 이벤트
    },
    setParent(dataSource, uid) {
      for (const item of dataSource) {
        if (uid === item.uid) {
          this.parent = dataSource.parent();
          break;
        }
        if (item.items !== undefined) {
          this.setParent(item.items, uid);
        }
      }
    },
    dataSourceMerge(dataSource) {
      // data merge
      let data = [];
      for (let item of dataSource) {
        let obj = {
          parentId: item.parentId,
          id: item.id,
          text: item.text,
          url: item.url,
          expanded: item.expanded,
        };
        if (item.items !== undefined) {
          obj.items = this.dataSourceMerge(item.items);
        }
        data.push(obj);
      }
      return data;
    },
    submitEvent(data) {
      // data event emit
      if (this.submit !== null) clearTimeout(this.submit);
      this.submit = setTimeout(() => {
        this.$emit('dataSource', { data });
        this.submit = null;
      }, 1);
    },
    delElementHiding(flag) {
      const del = document.querySelectorAll('del');
      if (del) {
        for (const el of del) {
          const li = el.parentNode.parentNode.parentNode;
          if (flag) li.style.display = 'none';
          else li.style.display = 'block';
        }
      }
    },
    elementHiding() {
      if (!this.checkbox) {
        const check = document.querySelectorAll('.k-checkbox-wrapper');
        const sprite = document.querySelectorAll('.k-sprite');
        for (const el of check) {
          el.style.display = 'none';
        }
        for (const el of sprite) {
          el.style.display = 'none';
        }
      } else {
        this.positions.map(obj => {
          const items = document.querySelectorAll(`.${obj.name}`);
          for (const el of items) {
            el.setAttribute(
              'style',
              `background: url("${require('@/assets/images/coloricons-sprite.png')}");
           background-position: ${obj.position}; 
          `,
            );
          }
        });
      }
    },
  },
};
</script>
