<template>
  <div>
    <div v-if="format === 'reason'">
      <div class="ck-editor__main" style="border:0" role="presentation">
        <div
          class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only"
          lang="en"
          dir="ltr"
          role="textbox"
          aria-label="Rich Text Editor, main"
          contenteditable="false"
          v-html="getValue.contents"
        ></div>
      </div>
      <div
        class="filelist"
        v-if="getValue.fileList !== undefined && getValue.fileList.length > 0"
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
      <!-- <ComCkEditor v-model="getValue.contents" :disable="true"></ComCkEditor> -->
    </div>
    <div v-else>
      <ul class="columns">
        <li v-for="(item, i) in getValue" :key="i">
          <!-- <span
              class="column-editor"
              style="padding: 5px;"
              v-html="item.contents"
            >
            </span> -->
          <template v-if="item.contents">
            <div class="ck-editor__main" style="border:0" role="presentation">
              <div
                class="ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only"
                lang="en"
                dir="ltr"
                role="textbox"
                aria-label="Rich Text Editor, main"
                contenteditable="false"
                v-html="item.contents"
              ></div>
            </div>
            <!-- <ComCkEditor v-model="tiem.contents" :disable="true"></ComCkEditor> -->
          </template>
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import ComCkEditor from '@/components/common/global/ComCKEditor';

export default {
  components: {
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
  computed: {
    getValue() {
      let value = this.getNestedValue(this.field, this.dataItem);
      return value;
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
  },
};
</script>

<style scoped>
.column-wrap {
  width: 1000px;
}
.ck-editor__editable {
  max-height: none;
  min-height: auto;
}
</style>
