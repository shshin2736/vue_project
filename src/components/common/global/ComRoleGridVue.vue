<template>
  <div
    class="k-widget k-grid"
    selectedtype="selected"
    selectedwidth="80"
    :style="`height: ${height}px;`"
  >
    <!-- Header -->
    <div class="k-grid-header" style="padding: 0px 16px 0px 0px;">
      <div class="k-grid-header-wrap">
        <table>
          <colgroup>
            <col
              v-for="(column, i) in columns"
              :key="i"
              :width="`${column.width}px`"
            />
          </colgroup>
          <thead>
            <tr>
              <th v-for="(column, i) in columns" :key="i" class="k-header">
                {{ column.title }}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!-- contents -->
    <div class="k-grid-container">
      <div class="k-grid-content k-virtual-content">
        <!-- 메인 테이블 -->
        <div style="position: relative;">
          <table>
            <colgroup>
              <col
                v-for="(column, i) in columns"
                :key="i"
                :width="`${column.width}px`"
              />
            </colgroup>
            <tbody>
              <tr
                v-for="(items, i) in getResult"
                :key="i"
                class="k-master-row"
                @click="onSelected(items)"
              >
                <td v-for="(column, j) in columns" :key="j">
                  <template v-if="items.inEdit">
                    <template v-if="column.selected && column.editable">
                      <span class="selected">
                        <select
                          :ref="`select${i}`"
                          @change="onChange(`select${i}`, items[column.field])"
                        >
                          <option
                            v-for="(option, i) in items[column.field]"
                            :key="i"
                            :value="option.cd"
                            :selected="option.selected"
                          >
                            {{ option.cdNm }}
                          </option>
                        </select>
                      </span>
                    </template>
                    <template v-else-if="column.editable">
                      <input
                        type="text"
                        v-model="items[column.field]"
                        @keyup="onKeyup"
                      />
                    </template>
                    <template v-else-if="column.button">
                      <button
                        type="button"
                        @click.stop="onClick(column.field, items)"
                      >
                        <span class="k-icon k-i-plus"></span>
                        {{ items[column.field] }}
                      </button>
                    </template>
                    <template v-else>
                      {{ items[column.field] }}
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="column.selected">
                      <template v-for="option in items[column.field]">
                        <template v-if="option.selected">
                          {{ option.cdNm }}
                        </template>
                      </template>
                    </template>
                    <template v-else-if="column.button">
                      <button
                        type="button"
                        @click.stop="onClick(column.field, items)"
                      >
                        <span class="k-icon k-i-plus"></span>
                        {{ items[column.field] }}
                      </button>
                    </template>
                    <template v-else>
                      {{ items[column.field] }}
                    </template>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 높이 조절 컨테이너 -->
        <div class="k-height-container"><div></div></div>
      </div>
    </div>
    <!-- Paging -->
    <!-- <div class="k-pager-wrap k-grid-pager k-widget">
      <a
        href="#"
        title="Go to the first page"
        class="k-link k-pager-nav k-pager-first k-state-disabled"
        ><span
          aria-label="Go to the first page"
          class="k-icon k-i-seek-w"
        ></span></a
      ><a
        href="#"
        title="Go to the previous page"
        class="k-link k-pager-nav k-state-disabled"
        ><span
          aria-label="Go to the previous page"
          class="k-icon k-i-arrow-w"
        ></span
      ></a>
      <ul class="k-pager-numbers k-reset">
        <li><a href="#" class="k-link k-state-selected">1</a></li>
        <li><a href="#" class="k-link">2</a></li>
      </ul>
      <a href="#" title="Go to the next page" class="k-link k-pager-nav"
        ><span
          aria-label="Go to the next page"
          class="k-icon k-i-arrow-e"
        ></span></a
      ><a
        href="#"
        title="Go to the last page"
        class="k-link k-pager-nav k-pager-last"
        ><span aria-label="Go to the last page" class="k-icon k-i-seek-e"></span
      ></a>
      <div class="k-pager-info k-label">1 - 10 of 20 items</div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ComRoleGrid',
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      required: false,
      default: '300',
    },
  },
  data() {
    return {
      result: [],
    };
  },
  computed: {
    getResult(state) {
      state.result = state.data.splice(0);
      return state.result;
    },
  },
  methods: {
    onSelected(items) {
      items.inEdit = true;
    },
    onChange(select, items) {
      const value = this.$refs[select][0].value;
      items.map(item => {
        if (item.cd === value) item.selected = true;
        else item.selected = false;
      });
      this.onData();
    },
    onClick(field, items) {
      this.$emit('onClick', field, items);
    },
    onKeyup() {
      this.onData();
    },
    onData() {
      this.$emit('onData', this.data);
    },
  },
};
</script>

<style scoped>
select {
  width: 100px;
  padding: 3px 10px;
  font-family: inherit;
  border: 1px solid #bbb;
  background: #fff;
  background: url('../../../assets/images/btn-hide-arrow.png') no-repeat 95% 50%
    #fff;
  background-size: 10%;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transform: rotate(0deg);
}
select::-ms-expand {
  display: none;
}
input {
  width: 150px;
  padding: 2px 10px;
}
button {
  text-align: center;
  background: #454851;
  color: #fff;
  padding: 5px 10px;
  font-size: 0.55rem;
}
.selected {
  position: relative;
}
</style>
