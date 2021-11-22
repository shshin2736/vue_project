<template>
  <td :class="getTdClass">
    <template v-if="editor === 'tree'">
      <template v-if="dataItem.dept > 0">
        <span
          v-for="(n, i) in dataItem.dept"
          :key="i"
          class="k-icon false"
        ></span>
      </template>
      <span v-if="dataItem.expanded === undefined" class="k-icon false"></span>
      <!-- <span
        v-else-if="dataItem.expanded === undefined && dataItem.dept > 0"
        class="k-icon false"
      ></span> -->
      <span
        v-else-if="dataItem.expanded"
        class="k-icon k-i-collapse"
        @click="setExpanded"
      ></span>
      <span
        v-else-if="!dataItem.expanded"
        class="k-icon k-i-expand"
        @click="setExpanded"
      ></span>
      <template v-if="getFormat === 'download'">
        <a
          :href="
            `api/fileDownload.do?fileId=${getValue.fileId}&downloadType=${getValue.downloadType}`
          "
        >
          {{ getValue.fileName }}
        </a>
      </template>
      <template v-else-if="getFormat === 'delete'">
        <button
          v-if="$route.params.auth.includes('X')"
          type="button"
          class="gird-delete-btn"
          :class="getClass"
          @click="onClick"
        >
          {{ $t('NLS0000075') }}
        </button>
        <span v-else>{{ '' }}</span>
      </template>
      <template v-else-if="getFormat === 'encode'">
        <span v-html="getValue"></span>
      </template>
      <template v-else-if="getFormat === 'columns'">
        <ul class="columns">
          <li
            v-for="(item, i) in getValue"
            :key="i"
            :class="
              `columns-list ${
                editor === 'btn' ? editor : 'column'
              } ${getTdClass}`
            "
          >
            <span
              v-if="editor === 'encode'"
              class="column-editor"
              v-html="item"
            >
            </span>
            <span v-if="editor === 'btn'" class="column-editor" v-html="item">
            </span>
            <span
              v-if="editor !== 'btn' && editor !== 'encode'"
              class="column-item"
              >{{ item }}</span
            >
            <!-- <span v-if="editor === 'btn'" class="column-btn">
              <button
                type="button"
                class="pencil-btn"
                @click="columnsBtn(i)"
              ></button>
            </span> -->
          </li>
        </ul>
      </template>
      <template v-else-if="getFormat === 'link'">
        <a href="#" @click="onClick">{{ getValue }}</a>
      </template>
      <template v-else-if="getFormat === 'check' && getValue !== undefined">
        <input
          type="checkbox"
          class="k-checkbox"
          :value="getValue"
          :checked="getChecked"
          @change="onCheck"
        />
      </template>
      <span v-else-if="getFormat === 'dropdown'" :class="getClass">
        <slot>
          <com-dropdowns
            :data="setDropdownList"
            v-model="selected"
            textfield="cdNm"
            valuefield="cd"
            v-if="dataItem.inEdit"
            @change="onChange"
          >
          </com-dropdowns>
          <template v-else>
            {{ getValue | numberWithCommas }}
          </template>
        </slot>
      </span>
      <template v-else-if="getFormat === 'button' && getValue !== undefined">
        <span
          :style="{
            width: `${480 - 16 * (dataItem.dept + 3)}px`,
            display: `inline-block`,
            position: 'relative',
          }"
        >
          <span
            :style="{
              display: `flex`,
              overflow: `hidden`,
            }"
          >
            <button
              :class="getClass"
              :style="{
                position: `relative`,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                whiteOpace: `nowrap`,
                cursor: dataItem.popup !== undefined ? 'default' : 'pointer',
              }"
              @click="onClick"
            >
              <template
                v-if="getValue !== null && typeof getValue === 'number'"
              >
                {{ getValue | numberWithCommas }}
              </template>
              <template v-else-if="getValue !== null">
                {{ getValue }}
              </template>
              <span v-else :style="hiddenBtn">btn</span>
            </button>
            <button
              v-if="dataItem.popup !== undefined && dataItem.popup"
              class="tablerowshow-btn"
              @click="popup"
            ></button>
            <button
              v-if="dataItem.popup !== undefined && !dataItem.popup"
              class="tablerowshow-gyay-btn"
              :style="{
                flex: `0 0 auto`,
              }"
              @click="popup"
            ></button>
          </span>
        </span>
      </template>
      <button
        v-else-if="getFormat === 'pupupButton' && getValue !== null"
        :class="getClass"
        @click="onClick"
      ></button>
      <span v-else :class="getClass">
        <slot>{{ getValue | numberWithCommas }}</slot>
      </span>
    </template>
    <template v-else>
      <template v-if="getFormat === 'dataSearchDownload'">
        <button
          v-if="dataItem.reqStatus === '4' || dataItem.reqStatus === '2'"
          :class="getClass"
          @click="onClick"
        >
          {{ getValue }}
        </button>
        <span v-else>{{ getValue }}</span>
      </template>
      <template v-else-if="getFormat === 'dataSearchConfirmDownload'">
        <button :class="getClass" @click="onClick">
          {{ getValue }}
        </button>
      </template>
      <template v-else-if="getFormat === 'dataSearchBtn'">
        <button
          v-if="
            (dataItem.reqStatus === '' || dataItem.reqStatus === '3') &&
              $route.params.auth.includes('S')
          "
          :class="{
            ['blue-btn']:
              dataItem.reqStatus === '' || dataItem.reqStatus === '3',
          }"
          @click="onClick"
        >
          {{ getValue }}
        </button>
        <span
          v-else-if="
            (dataItem.reqStatus === '' || dataItem.reqStatus === '3') &&
              !$route.params.auth.includes('S')
          "
        >
          {{ $t('NLS0001239') }}
        </span>
        <span v-else>{{ getValue }}</span>
      </template>
      <template v-else-if="getFormat === 'dataSearchConfirmBtn'">
        <template v-if="dataItem.reqStatus === '1'">
          <button
            :class="{
              ['deepdarkgray-btn']: true,
            }"
            @click="onClick($event, true)"
          >
            {{ $t('NLS0000361') }}</button
          ><button
            :class="{
              ['gray-btn']: true,
              ['ml-10']: true,
            }"
            @click="onClick($event, false)"
          >
            {{ $t('NLS0000362') }}
          </button>
        </template>
        <span v-else>
          {{ dataItem.reqStatus === '2' ? $t('NLS0000361') : $t('NLS0000362') }}
        </span>
      </template>
      <template v-else-if="getFormat === 'download'">
        <a
          :href="
            `api/fileDownload.do?fileId=${getValue.fileId}&downloadType=${getValue.downloadType}`
          "
        >
          {{ getValue.fileName }}
        </a>
      </template>
      <template v-else-if="getFormat === 'delete'">
        <button
          v-if="$route.params.auth.includes('X')"
          type="button"
          class="grid-delete-btn"
          :class="getClass"
          @click="onClick"
        >
          {{ $t('NLS0000075') }}
        </button>
        <span v-else>{{ '' }}</span>
      </template>
      <template v-else-if="getFormat === 'encode'">
        <div class="colflex-wrap">
          <span v-html="getValue.contents"></span>
          <div
            class="filelist"
            v-if="
              getValue.fileList !== undefined && getValue.fileList.length > 0
            "
          >
            <p
              class="task-filedown"
              v-for="(item, i) in getValue.fileList"
              :key="item.fileId"
            >
              <a
                :href="
                  `api/fileDownload.do?fileId=${item.fileId}&downloadType=${item.downloadType}`
                "
                :title="i"
                >{{ item.fileName }}
              </a>
              <span>({{ item.fileSize / 1000 }} KB)</span>
            </p>
          </div>
        </div>
      </template>
      <template v-else-if="getFormat === 'ckeditor'">
        <div class="colflex-wrap">
          <span
            class="column-editor"
            style="padding: 5px;"
            v-html="getValue.contents"
          >
          </span>
          <!-- <span class="column-editor">
            <ComCkEditor
              v-model="getValue.contents"
              :disable="true"
            ></ComCkEditor>
          </span> -->
          <div
            class="filelist"
            v-if="
              getValue.fileList !== undefined && getValue.fileList.length > 0
            "
          >
            <p
              class="task-filedown"
              v-for="(item, i) in getValue.fileList"
              :key="item.fileId"
            >
              <a
                :href="
                  `api/fileDownload.do?fileId=${item.fileId}&downloadType=${item.downloadType}`
                "
                :title="i"
                >{{ item.fileName }}
              </a>
              <span>({{ item.fileSize / 1000 }} KB)</span>
            </p>
          </div>
        </div>
      </template>

      <template v-else-if="getFormat === 'columns'">
        <ul class="columns">
          <li
            v-for="(item, i) in getValue"
            :key="i"
            :class="
              `columns-list ${
                editor === 'btn' ? editor : 'column'
              } ${getTdClass}`
            "
          >
            <span
              v-if="editor === 'encode'"
              class="column-editor"
              v-html="item"
            >
            </span>
            <template v-if="editor === 'btn'">
              <div class="colflex-wrap">
                <span
                  class="column-editor"
                  style="padding: 5px;"
                  v-html="item.contents"
                >
                </span>
                <!-- <span class="column-editor">
                  <ComCkEditor
                    v-model="item.contents"
                    :disable="true"
                  ></ComCkEditor>
                </span> -->
                <!-- <span class="column-editor" v-html="item.contents"> </span> -->
                <div
                  class="filelist"
                  v-if="item.fileList !== undefined && item.fileList.length > 0"
                >
                  <p
                    class="task-filedown"
                    v-for="(itm, i) in item.fileList"
                    :key="itm.fileId"
                  >
                    <a
                      :href="
                        `api/fileDownload.do?fileId=${itm.fileId}&downloadType=${itm.downloadType}`
                      "
                      :title="i"
                      >{{ itm.fileName }}
                    </a>
                    <span>({{ itm.fileSize / 1000 }} KB)</span>
                  </p>
                </div>
              </div>
            </template>
            <span
              v-if="editor !== 'btn' && editor !== 'encode'"
              class="column-item"
              >{{ item }}</span
            >
          </li>
        </ul>
      </template>
      <template v-else-if="getFormat === 'link'">
        <a href="#" @click="onClick">{{ getValue }}</a>
      </template>
      <template v-else-if="getFormat === 'check' && getValue !== undefined">
        <input
          type="checkbox"
          class="k-checkbox"
          :value="getValue"
          :checked="getChecked"
          @change="onCheck"
        />
      </template>
      <span v-else-if="getFormat === 'dropdown'" :class="getClass">
        <slot>
          <com-dropdowns
            :data="setDropdownList"
            v-model="selected"
            textfield="cdNm"
            valuefield="cd"
            v-if="dataItem.inEdit"
            @change="onChange"
          >
          </com-dropdowns>
          <template v-else>
            {{ getValue | numberWithCommas }}
          </template>
        </slot>
      </span>
      <template v-else-if="getFormat === 'button' && getValue !== undefined">
        <button
          v-if="!editor"
          :class="getClass"
          @click="onClick"
          style="width:100%"
          :title="getClass.includes('pop-tooltip') ? getValue : ''"
        >
          <template v-if="getValue !== null && typeof getValue === 'number'">
            {{ getValue | numberWithCommas }}
          </template>
          <template
            v-else-if="getValue !== null && getClass.includes('htmlForm')"
          >
            <span v-html="getValue">{{ getValue }}</span>
          </template>
          <template v-else-if="getValue !== null">
            {{ getValue }}
          </template>
          <span v-else :style="hiddenBtn" style="padding:0 20px"> </span>
        </button>
        <button
          v-else-if="editor === 'match' && getUserData.userName === getValue"
          :class="getClass"
          @click="onClick"
        >
          {{ getValue }}
        </button>
        <button v-else-if="editor === 'new'" :class="getClass" @click="onClick">
          {{ getValue.title }}
          <span v-if="getValue.files" class="file on"></span>
          <span v-if="getValue.icon" class="icon-new"></span>
        </button>
        <span v-else>
          <template v-if="getValue !== null && typeof getValue === 'number'">
            {{ getValue | numberWithCommas }}
          </template>
          <template v-else-if="getValue !== null">
            {{ getValue }}
          </template>
          <span v-else :style="hiddenBtn">btn</span>
        </span>
      </template>
      <button
        v-else-if="getFormat === 'pupupButton' && getValue !== null"
        :class="getClass"
        @click="onClick"
      ></button>
      <template v-else-if="getFormat === 'barProgress'">
        <template v-if="Array.isArray(getValue)">
          <span
            :class="`project-kpibox-graph size` + getValue[0].per"
            :title="getValue[0].val"
            >{{ getValue[0].per }}%</span
          >
          <span
            :class="`project-managebox-graph size` + getValue[1].per"
            :title="getValue[1].val"
            >{{ getValue[1].per }}%</span
          >
        </template>
        <template v-if="typeof getValue === 'string'">
          <span :class="getClass">{{ getValue.split(' ')[0] }}%</span>
        </template>
      </template>
      <template v-else-if="getFormat === 'deleteBtn'">
        <button
          v-if="$route.params.auth.includes('X')"
          type="button"
          class="grid-delete-btn"
          @click="onClick"
        >
          {{ $t('NLS0000075') }}
        </button>
        <span v-else>{{ '' }}</span>
      </template>
      <template v-else-if="getFormat === 'ellipsis'">
        <span class="title-ellipsis-wrap">
          <p class="title-ellipsis" :title="getValue">{{ getValue }}</p>
        </span>
      </template>
      <span v-else :class="getClass">
        <slot>{{ getValue | numberWithCommas }}</slot>
      </span>
    </template>
  </td>
</template>

<script>
// import ComCkEditor from '@/components/common/global/ComCKEditor';
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'FunctionCell',
  mixins: [commonStore],
  components: {
    ComDropdowns,
    // ComCkEditor,
  },
  props: {
    field: {
      type: String,
      required: false,
    },
    dataItem: {
      type: Object,
      required: false,
    },
    className: {
      type: String,
      required: false,
    },
    format: {
      type: String,
      required: false,
      default: 'circle',
    },
    columnIndex: {
      type: Number,
      required: false,
    },
    columnsCount: {
      type: Number,
      required: false,
    },
    rowType: {
      type: String,
      required: false,
    },
    editor: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      formatList: [
        'circle',
        'progress',
        'button',
        'check',
        'dropdown',
        'progress',
        'pupupButton',
        'link',
        'columns',
        'encode',
        'delete',
        'download',
        'tree',
        'dataSearchDownload',
        'dataSearchBtn',
        'dataSearchConfirmBtn',
        'dataSearchConfirmDownload',
        'barProgress',
        'deleteBtn',
        'ellipsis',
        'ckeditor',
      ],
      selected: {},
      hiddenBtn: {
        opacity: 0,
      },
    };
  },
  computed: {
    getRoleList() {
      return this[commonTypes.getters.GET_ROLE_LIST];
    },
    getUserData() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
    setDropdownList() {
      let dropdownList = [];
      if (this.editor) {
        const editorValue = this.editor.substr(0, 1);
        if (editorValue === 'G') {
          dropdownList = common.getCodeList(this.editor);
        } else if (this.editor === 'role') {
          for (let item of this.getRoleList) {
            item.cd = item.roleId;
            item.cdNm = item.roleNm;
            dropdownList.push(item);
          }
        }
      }
      return dropdownList;
    },
    getFormat() {
      const flag = this.formatList.some(el => el === this.format);
      return flag ? this.format : 'circle';
    },
    getClass() {
      let classNm = this.className;
      let progVal = this.getNestedValue(this.field, this.dataItem);
      if (this.format === 'progress') {
        if (Array.isArray(progVal)) {
          //*Range계산
          progVal = progVal[1];
        }

        progVal = progVal !== undefined ? Math.floor(progVal / 10) * 10 : '';
        if (progVal > 110) progVal = 110;
        if (progVal < 0) progVal = 0;
        classNm = progVal !== 'disabled' ? classNm + progVal : '';
      }
      if (this.format === 'button' && progVal === undefined) {
        if (classNm === 'counterplan-btn' || classNm === 'analysis-btn') {
          classNm = '';
        }
      }
      if (this.format === 'button' && Array.isArray(progVal)) {
        if (progVal[1] === 'bold') {
          classNm += classNm + ' font-bold';
        }
      }
      if (this.format === 'barProgress' && !Array.isArray(progVal)) {
        let val = progVal.split(' ')[0];
        let rateVal = !common.isEmpty(val) ? Math.round(val / 10) * 10 : '0';
        if (val > 100) rateVal = 100;
        if (val < 0) rateVal = 0;
        classNm = classNm + rateVal + ' ' + progVal.split(' ')[1];
      }
      return classNm;
    },
    getTdClass() {
      let classNm = '';
      if (this.className !== undefined) {
        if (this.className.includes('center')) classNm = 'center';
        else if (this.className.includes('left')) classNm = 'left';
        else if (this.className.includes('right')) classNm = 'right';
        if (this.className.includes('cell-top')) classNm += ' cell-top';
        if (this.className.includes('autoheight')) classNm += ' autoheight';
        if (this.format === 'columns') classNm = `${classNm} no-padding`;
        if (this.format === 'button' && this.className === 'counterplan-btn') {
          let progVal = this.getNestedValue(this.field, this.dataItem);
          classNm = progVal === 'bg_on' ? classNm + ' ' + progVal : '';
        }
        return classNm;
      } else return classNm;
    },
    getValue() {
      let value = this.getNestedValue(this.field, this.dataItem);
      if (this.format === 'progress') {
        if (Array.isArray(value)) {
          //*Range계산
          value = value[0];
        }
        value = value === undefined || value === 'disabled' ? '' : value + '%';
      } else if (this.format === 'button' && Array.isArray(value)) {
        if (value[0] !== undefined) {
          value = value[0];
        }
      }
      return value;
    },
    getChecked() {
      const value = this.getNestedValue(this.field, this.dataItem);
      let check = false;
      if (value === 'Y') {
        check = true;
      }
      return check;
    },
  },
  created() {
    if (this.editor) {
      const editorValue = this.editor.substr(0, 1);

      if (this.format === 'dropdown' && editorValue === 'G') {
        // this[commonTypes.actions.FETCH_COM_CODE_LIST]();
        this.selected = { cdNm: this.getValue, cd: this.getValue };
      } else if (this.format === 'dropdown' && this.editor === 'role') {
        this.selected = { cdNm: this.getValue, cd: this.getValue };
        this[commonTypes.actions.FETCH_ROLE_LIST]();
      }
    }
  },
  mounted() {
    // this.addImgElmementStyle();
    if (this.getFormat === 'encode') {
      const items = document.querySelectorAll('.ck-editor__nested-editable');
      Array.from(items).forEach(el => {
        el.setAttribute('contenteditable', false);
      });
    }
  },
  updated() {
    // this.addImgElmementStyle();
  },
  filters: {
    numberWithCommas: function(value) {
      if (typeof Number(value) === 'number')
        return common.numberWithCommas(value);
      else return value;
    },
  },
  methods: {
    getNestedValue(fieldName, dataItem) {
      const path = fieldName.split('.');
      let data = dataItem;
      path.forEach(p => {
        data = data ? data[p] : undefined;
      });
      return data;
    },
    onClick(e, flag) {
      this.$emit('btnclick', this.dataItem, this.getValue, this.field, flag);
    },
    onChange(e) {
      this.$emit('change', e, e.target.value.cd);
    },
    onCheck(e) {
      // this.$emit('onCheck', e, e.target.checked, e.target.value);
      this.$emit('onCheck', this.dataItem, e.target.checked, this.field, e);
    },
    columnsBtn(inx) {
      this.$emit('columnsBtn', this.dataItem, inx);
    },
    setExpanded() {
      this.$set(this.dataItem, 'expanded', !this.dataItem.expanded);
      this.$emit('expanded');
    },
    addImgElmementStyle() {
      const imgs = Array.from(document.querySelectorAll('img'));
      const figures = Array.from(document.querySelectorAll('figure'));
      imgs.forEach(img => {
        img.style.width = 'inherit';
      });
      figures.forEach(figure => {
        figure.style.width = figure.style.width ? figure.style.width : '100%';
      });
    },
    popup() {
      this.$emit('popup', this.dataItem);
    },
  },
};
</script>
<style scoped>
.no-padding {
  position: relative;
  padding: 0;
}
.center {
  text-align: center;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.columns {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.columns > .columns-list.btn {
  display: flex;
  width: 100%;
  align-items: center;
  margin: 0 5px;
}
.columns > .columns-list.column {
  display: flex;
  align-items: center;
  width: 100%;
}
.columns > .columns-list.column.center {
  justify-content: center;
}
.columns > .columns-list.column.left {
  justify-content: flex-start;
}
.columns > .columns-list.column.right {
  justify-content: flex-end;
}
.columns > .columns-list:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}
.columns-list > .column-editor {
  display: block;
  width: 100%;
  text-align: left;
  margin: 10px;
  padding: 15px 10px;
  /* background: #fff; */
}
.columns-list > .column-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}
.columns-list > .column-btn {
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
  text-overflow: ellipsis;
}
.cursor-pointer {
  cursor: pointer;
}
.title-ellipsis-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 85%;
  cursor: pointer;
}
.title-ellipsis {
  display: block;
  width: inherit;
  height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
