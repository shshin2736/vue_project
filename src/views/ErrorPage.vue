<template>
  <div class="container">
    <div class="hms-treeview">
      <com-tree-view
        :name="name1"
        :dragDrop="dragDrop"
        :dataSource="dataSource1"
        :disableDrop="name1"
        @dataSource="eventChk1"
        @change="change"
        @drop="drop"
      ></com-tree-view>
    </div>
    <div class="hms-treeview">
      <com-tree-view
        :name="name2"
        :dragDrop="dragDrop"
        :dataSource="dataSource2"
        :disableDrop="name1"
        @dataSource="eventChk2"
        @change="change"
        @drop="drop"
      ></com-tree-view>
    </div>
  </div>
</template>

<script>
import ComTreeView from '@/components/common/global/ComTreeView';

export default {
  name: 'ErrorPage',
  components: {
    ComTreeView,
  },
  data() {
    return {
      name1: 'treeView1',
      name2: 'treeView2',
      dragDrop: true,
      source: [],
      dataSource1: {
        data: [
          {
            id: 1,
            text: '<del>Brazil</del>',
            url: '#',
            encoded: false,
            expanded: true,
            items: [
              {
                id: 2,
                text: 'Tables & Chairs',
                url: '#',
                expanded: true,
              },
              {
                id: 3,
                text: 'Sofas',
                url: '#',
                expanded: true,
              },
              {
                id: 4,
                text: 'ESLint',
                url: '#',
                expanded: true,
              },
              {
                id: 5,
                text: 'Vetur',
                component: 'view1',
                url: '#',
                expanded: true,
              },
            ],
          },
        ],
      },
      dataSource2: {
        data: [
          {
            id: 6,
            text: `<kendo-tooltip 
                    title="Tooltip content"
                    :position="'right'">
                      Brazil1
                   </kendo-tooltip>
                   <span>+</span>`,
            encoded: false,
            url: '#',
            expanded: true,
            items: [
              {
                id: 7,
                text: 'Tables & Chairs1',
                url: '#',
                expanded: true,
              },
              {
                id: 8,
                text: 'Sofas1',
                url: '#',
                expanded: true,
              },
              {
                id: 9,
                text: 'ESLint1',
                url: '#',
                expanded: true,
              },
              {
                id: 10,
                text: 'Vetur1',
                url: '#',
                expanded: true,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    test() {
      // console.log('test');
    },
    eventChk1() {
      // console.log(1, data);
    },
    eventChk2() {
      // console.log(2, data);
    },
    change() {
      // 변경 이벤트
      // console.log('change', e);
    },
    drop() {
      // console.log('dragEnd', data);
    },
  },
};
</script>

<style scoped></style>
