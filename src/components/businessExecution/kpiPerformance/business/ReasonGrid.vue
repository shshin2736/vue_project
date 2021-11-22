<template>
  <div class="grid-container" :style="cssProp">
    <div class="grid-wrap" :style="cssColumns">
      <div
        v-for="(column, i) in columns"
        :key="`header_${column.field}`"
        class="grid-wrap__header"
        :style="{
          minWidth: column.width ? column.width : '',
          maxWidth: column.width ? column.width : '',
        }"
        @click="sortEventHandler"
      >
        {{ column.title }}
        <span
          v-if="sort && i === 0"
          :class="sortIcon"
          style="color:red;"
        ></span>
      </div>
      <template v-for="(items, idx) of getData">
        <div
          v-for="(column, i) in columns"
          :key="`content_${idx}_${i}`"
          class="grid-wrap__content"
          :ref="`contents_${idx}`"
          :style="{
            minWidth: column.width ? column.width : '',
            maxWidth: column.width ? column.width : '',
            justifyContent: column.halign ? column.halign : 'flex-start',
            alignItems: column.valign ? column.valign : 'center',
          }"
          @mouseenter="hoverEventHandler(idx)"
          @mouseleave="hoverEventHandler(idx)"
        >
          <template v-if="column.cell">
            <component
              :is="column.cell"
              :ref="`editor_${idx}`"
              v-bind="column"
              :dataItem="items"
              style="width:100%"
              @btnclick="btnClickHandler"
            />
          </template>
          <template v-else>
            {{ items[column.field] }}
          </template>
        </div>
      </template>
    </div>
    <div class="grid-contents" :style="cssColumns"></div>
  </div>
</template>

<script>
export default {
  name: 'ReaseonGrid',
  props: {
    data: {
      type: Array,
      required: false,
    },
    columns: {
      type: Array,
      required: false,
    },
    height: {
      type: Number,
      required: false,
      default: 500,
    },
    sort: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      order: '',
      sortIcon: {
        [`k-icon`]: false,
        [`k-i-sort-asc-sm`]: false,
        [`k-i-sort-desc-sm`]: false,
      },
      List: [],
    };
  },
  computed: {
    cssProp() {
      return {
        '--grid-height': `${this.height}px`,
      };
    },
    cssColumns(state) {
      const styles = { gridTemplateColumns: '' };
      for (const item of state.columns) {
        styles.gridTemplateColumns += styles.gridTemplateColumns
          ? ` ${item.width ? item.width : '1fr'}`
          : item.width
          ? item.width
          : 'auto';
      }
      return styles;
    },
    getData(state) {
      const data = [...state.data];
      if (this.order === 'asc') data.sort(state.sortFn);
      return data;
    },
  },
  methods: {
    sortEventHandler() {
      if (this.order === 'desc') {
        this.order = '';
      } else if (this.order === 'asc') {
        this.order = 'desc';
      } else {
        this.order = 'asc';
      }
      this.sortIcon = {
        [`k-icon`]: this.order ? true : false,
        [`k-i-sort-asc-sm`]: this.order === 'asc',
        [`k-i-sort-desc-sm`]: this.order === 'desc',
      };
    },
    sortFn(a, b) {
      var dateA = a.reasonDateForm.toUpperCase(); // ignore upper and lowercase
      var dateB = b.reasonDateForm.toUpperCase();
      // ignore upper and lowercase
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }

      // 이름이 같을 경우
      return 0;
    },
    //* 커스텀 버튼 클릭 이벤트
    btnClickHandler(rowData, value, field, flag) {
      this.$emit('btnclick', rowData, value, field, flag);
    },
    hoverEventHandler(idx) {
      const contents = this.$refs[`contents_${idx}`];
      const editor = this.$refs[`editor_${idx}`];
      if (contents) {
        for (const el of contents) {
          el.classList.toggle('grid-wrap__content__hover');
        }
      }
      if (editor) {
        for (const el of editor) {
          if (el.$el.classList) {
            el.$el.classList.toggle('grid-wrap__content__hover');
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.grid-container {
  width: 100%;
  height: var(--grid-height);
  background-color: #ffffff;
}
.grid-wrap {
  position: relative;
  display: grid;
  background-color: #cccccc;
  gap: 1px;
  padding-bottom: 1px;
}
.grid-wrap__header,
.grid-wrap__content {
  background-color: #ffffff;
  display: flex;
  min-height: 26px;
  font-size: 12px;
  font-weight: 500;
}
.grid-wrap__header {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #f9f9f9;
  border-top: 1px solid #cccccc;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.grid-wrap__content {
  padding: 5px 0;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  word-break: break-all;
}
.grid-wrap__content__hover {
  background-color: #e9eef5;
}
.grid-wrap__content:hover > *.ck.ck-content {
  background-color: #e9eef5;
}
</style>
