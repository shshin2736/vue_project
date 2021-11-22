li<template>
  <div id="file-drag-drop" class="hms-upload">
    <div class="k-widget k-upload" @click="fileUploadBtn">
      <div v-if="!read" class="k-dropzone" ref="fileform">
        <div class="k-button k-upload-button">
          <input
            type="file"
            :ref="name"
            :name="name"
            class="file-"
            :multiple="multiple"
            @change="fileChgEvent"
          />
          <span v-html="$t(localization)"></span>
        </div>
        <em class="k-dropzone-hint k-hidden">Drop files here to upload</em>
        <strong class="k-upload-status k-upload-status-total">
          <template v-if="fileChangeProgress === 'upload'">
            <span class="file-change-progress complate">
              <button type="button" class="red-btn" @click.stop="setFiles">
                Upload
              </button>
            </span>
          </template>
          <template v-if="fileChangeProgress === 'complate'">
            <span class="file-change-progress complate">
              <span class="k-icon k-i-check"></span>
              <span class="text">Done</span>
            </span>
          </template>
          <template v-else-if="fileChangeProgress === 'warning'">
            <span class="file-change-progress warning">
              <span class="k-icon k-i-warning"></span>
              <span class="text">Failure</span>
            </span>
          </template>
          <template v-else-if="fileChangeProgress === 'uploading'">
            <span class="file-change-progress uploading">
              <span class="k-icon k-i-upload"></span>
              <span class="text">Uploading...</span>
            </span>
          </template>
          <template v-else>
            <span class="file-change-progress uploading">
              <!-- <span class="k-icon k-i-upload"></span> -->
              <span class="text"></span>
            </span>
          </template>
        </strong>
      </div>
      <ul class="k-upload-files k-reset">
        <template v-if="xlsx && getFiles.length > 0">
          <li class="xlsx-upload-txt">
            {{ fileChangeProgress === 'complate' ? $t('NLS0000647') : '' }}
          </li>
        </template>
        <template v-if="!xlsx">
          <li
            v-for="(file, key) in getFiles"
            :key="key"
            class="k-file k-file-success"
            :draggable="!read && multiple"
            role="row"
            :aria-rowindex="key"
            @click="stopPropagation"
            @dragover="dragover"
            @dragstart.stop="dragstart"
            @drop.stop="drop"
          >
            <span class="k-file-group-wrapper" role="row" :aria-rowindex="key">
              <span
                class="k-file-group k-icon k-i-file-data"
                role="row"
                :aria-rowindex="key"
              >
              </span>
              <span class="k-file-state" role="row" :aria-rowindex="key"></span>
            </span>
            <span
              class="k-file-name-size-wrapper"
              role="row"
              :aria-rowindex="key"
            >
              <a
                v-if="$route.params.auth.includes('D')"
                :href="
                  downloadUrl
                    ? downloadUrl
                    : `api/fileDownload.do?fileId=${file.fileId}&downloadType=${downloadType}`
                "
              >
                <span
                  :class="{
                    'k-file-name': true,
                    fail: file.uploading && !file.success,
                  }"
                  role="row"
                  :aria-rowindex="key"
                >
                  {{ file.name }}
                </span>
              </a>
              <span
                v-else
                :class="{
                  'k-file-name': true,
                  fail: file.uploading && !file.success,
                }"
                role="row"
                :aria-rowindex="key"
              >
                {{ file.name }}
              </span>
              <span class="k-file-size" role="row" :aria-rowindex="key">{{
                (file.size / 1000) | fileSizeFilter
              }}</span>
            </span>
            <div role="row" :aria-rowindex="key">
              <span
                v-if="!read"
                :class="{ progress: true, on: file.uploading }"
                role="row"
                :aria-rowindex="key"
              >
                <span class="bar" role="row" :aria-rowindex="key">
                  <span
                    :class="{
                      guage: true,
                      fail: file.uploading && !file.success,
                    }"
                    :style="{
                      width: !file.uploading ? '100%' : file.percentCompleted,
                    }"
                    role="row"
                    :aria-rowindex="key"
                  >
                  </span>
                </span>
                <span
                  :class="{
                    percent: true,
                    fail: file.uploading && !file.success,
                  }"
                  role="row"
                  :aria-rowindex="key"
                >
                  {{ file.percentName }}
                </span>
              </span>
            </div>
            <strong class="k-upload-status">
              <button
                v-if="!read"
                type="button"
                class="k-button k-button-icon k-flat k-upload-action"
                aria-label="Remove"
                @click.stop="removeFile(key)"
              >
                <span class="k-icon k-i-close k-i-x" title="Remove"></span>
              </button>
            </strong>
          </li>
        </template>
      </ul>
    </div>
    <a class="downloadAnker" :href="hrefURL" :download="fileName"></a>
  </div>
</template>

<script>
import { axiosNoSpinner } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';
import XLSX from 'xlsx';

export default {
  name: 'ComUploadFile',
  props: {
    ownerObjectId: {
      type: String,
      required: false,
      default: '',
    },
    downloadType: {
      type: String,
      required: false,
      default: '',
    },
    fileList: {
      type: Array,
      required: false,
      default: () => [],
    },
    size: {
      type: Number,
      required: false,
      default: 5000000000000000, //? default 5GB
    },
    read: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: false,
      default: 'files',
    },
    xlsx: {
      type: Boolean,
      required: false,
      default: false,
    },
    xlsxKey: {
      type: String,
      required: false,
      default: 'strategyXlsxKey',
    },
    // rules: {
    //   type: Array,
    //   required: false,
    //   default: () => [
    //     '.jpg',
    //     '.xlsx',
    //     '.pptx',
    //     '.txt',
    //     '.xls',
    //     '.png',
    //     '.jpg',
    //     '.jpeg',
    //     '.gif',
    //     '.bmp',
    //     '.zip',
    //   ],
    // },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: String,
      required: false,
      default: '',
    },
    width: {
      type: String,
      required: false,
      default: '',
    },
    color: {
      type: String,
      required: false,
    },
    localization: {
      type: String,
      required: false,
      default: 'NLS0000646',
    },
    test: {
      type: String,
      required: false,
      default: 'none',
    },
    downloadUrl: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      hrefURL: '',
      fileName: '',
      dragAndDropCapable: false,
      fileChangeProgress: '',
      files: [],
      fileUploadURL: 'api/fileupload.do',
      fileRemoveURL: 'api/fileRemove.do',
      fileDownloadURL: 'api/fileDownload.do',
      fileSortURL: 'api/filesortupdate.do',
      fromInx: 0,
      strategyXlsxKey: [
        'baseYyyy',
        'parentDeptName',
        'parentDeptCode',
        'stgDeptName',
        'stgDeptCode',
        'stgNm',
        'stgContent',
      ],
      empXlsxKey: [
        'userId',
        'country',
        'languageCode',
        'userName',
        'deptCode',
        'rankCode',
        'dutyCode',
        'email',
        'mobile',
        'retireYn',
        'userType',
        'mboYn',
      ],
      counting: 0,
      rules: [
        '.jpg',
        '.jpeg',
        '.png',
        '.bmp',
        '.gif',
        '.pdf',
        '.doc',
        '.docx',
        '.xls',
        '.xlsx',
        '.ppt',
        '.pptx',
        '.hwp',
        '.xlsm',
        '.csv',
        '.txt',
        '.xml',
        '.xps',
        '.ods',
        '.html',
        '.htm',
        '.rtf',
        '.zip',
        '.7z',
        '.alz',
        '.gz',
        '.tar',
        '.mpg',
        '.mpeg',
        '.wmv',
        '.asf',
        '.flv',
        '.mov',
        '.mp4',
        '.mkv',
        '.swf',
      ],
    };
  },
  computed: {
    getFiles() {
      return this.files;
    },
  },
  watch: {
    fileList: function(value) {
      if (value) {
        this.files = value.map(file => {
          const obj = {};
          obj.fileId = file.fileId;
          obj.name = file.fileName;
          obj.size = file.fileSize;
          obj.extension = file.fileExtension;
          obj.uploading = true;
          obj.success = true;
          obj.sort = file.fileSort;
          return obj;
        });
      }
    },
    counting: function(value) {
      const flag = this.files.some(file => !file.success);
      if (!flag && value > 0) {
        this.$emit('files', this.files);
        this.counting = 0;
      }
    },
    read: function(value) {
      setTimeout(() => {
        if (!value) this.fileControlEventHandler();
        else
          this.$refs.fileform.removeEventListener(
            'drop',
            this.dropEvent.bind(this),
          );
      }, 1);
    },
  },
  created() {
    if (this.fileList) {
      this.files = this.fileList.map(file => {
        const obj = {};
        obj.fileId = file.fileId;
        obj.name = file.fileName;
        obj.size = file.fileSize;
        obj.extension = file.fileExtension;
        obj.uploading = true;
        obj.success = true;
        obj.sort = file.fileSort;
        return obj;
      });
    }
  },
  mounted() {
    if (!this.read) this.fileControlEventHandler();
  },
  filters: {
    fileSizeFilter(value) {
      const size =
        value > 1000
          ? value > 1000000
            ? `${(value / 1000000).toFixed(1)}GB`
            : `${(value / 1000).toFixed(1)}MB`
          : `${value}KB`;
      return size;
    },
  },
  methods: {
    dragover(e) {
      e.preventDefault();
    },
    dragstart(e) {
      this.fromInx = e.target.ariaRowIndex;
    },
    drop(e) {
      const files = this.files.splice(0);
      const fromInx = Number(this.fromInx);
      const toInx = Number(e.target.ariaRowIndex);
      this.files = files.map((file, i) => {
        let obj = {};
        if (i === toInx) obj = files[fromInx];
        else if (i === fromInx) obj = files[toInx];
        else obj = files[i];
        if (obj.fileId) this.fileSort({ fileId: obj.fileId, sort: i });
        return obj;
      });
      setTimeout(() => {
        this.$emit('files', this.files);
      }, 1);
    },
    determineDragAndDropCapable() {
      let div = document.createElement('div');
      return (
        ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window
      );
    },
    async removeFile(key) {
      try {
        if (this.files[key].fileId)
          await axiosNoSpinner.post(this.fileRemoveURL, {
            fileId: this.files[key].fileId,
          });
        this.files.splice(key, 1);
        if (!this.files.some(file => file.uploading === false))
          this.fileChangeProgress = '';
        this.$emit('files', this.files);
      } catch (error) {
        errorEventHandler(error);
      }
    },
    //* 파일 설정
    setFiles() {
      /* Initialize the form data */
      /* Iteate over any file sent over appending the files to the form data. */
      //? 일반 업로드
      if (!this.xlsx)
        this.files.forEach(async (file, i) => {
          if (!file.uploading) {
            file.uploading = true;
            const formData = new FormData();
            formData.append('ownerObjectId', this.ownerObjectId);
            formData.append('downloadType', this.downloadType);
            formData.append('sort', i);
            formData.append('fileData', file);
            await this.fileUpload(formData, i);
          }
        });
      //? 엑셀 업로드
      else
        this.files.forEach((file, i) => {
          const reader = new FileReader();
          reader.onload = e => {
            const excel = XLSX.read(e.target.result, {
              type: 'binary',
            });
            excel.SheetNames.forEach(async (name, inx) => {
              if (inx === 0) {
                const sheets = excel.Sheets[name];
                const keyChar = sheets['!ref'].split(':')[1].substring(0, 1);
                const len = sheets['!ref'].split(':')[1].substring(1);
                const keyList = [
                  'A',
                  'B',
                  'C',
                  'D',
                  'E',
                  'F',
                  'G',
                  'H',
                  'I',
                  'J',
                  'K',
                  'L',
                  'M',
                  'N',
                  'O',
                  'P',
                  'Q',
                  'R',
                  'S',
                  'T',
                  'U',
                  'V',
                  'W',
                  'X',
                  'Y',
                  'Z',
                ];
                for (const key of keyList) {
                  if (key === keyChar) break;
                  for (let i = 1; i <= Number(len); i++) {
                    if (!sheets[`${key}${i}`])
                      sheets[`${key}${i}`] = {
                        h: '',
                        r: '',
                        t: 's',
                        v: '',
                        w: '',
                      };
                  }
                }
                const items = XLSX.utils.sheet_to_json(sheets);
                await this.excelUpload(this.excelPaser(items), i);
                this.$emit('xlsx', items);
              }
            });
          };
          reader.readAsBinaryString(file);
        });
    },
    //* 엑셀 파일 업로드
    async excelUpload(item, i) {
      const self = this;
      const URL =
        this.xlsxKey === 'strategyXlsxKey'
          ? 'api/strategy/strategyExcelUpload.do'
          : 'api/system/empExcelUpload.do';
      this.fileChangeProgress = 'uploading';
      this.$set(this.files[i], 'success', true);
      try {
        await axiosNoSpinner.post(
          URL,
          { xlsx: item },
          {
            onUploadProgress: function(progressEvent) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              self.files = self.files.map((file, idx) => {
                if (i === idx) {
                  file.percentName = `${percentCompleted - 1}%`;
                  file.percentCompleted = `${percentCompleted - 1}%`;
                }
                return file;
              });
            },
          },
        );
        self.files = self.files.map((file, idx) => {
          if (i === idx) {
            file.percentName = `100%`;
            file.percentCompleted = `100%`;
          }
          return file;
        });
        this.fileChangeProgress = 'complate';
      } catch (error) {
        this.fileChangeProgress = 'warning';
        this.$set(this.files[i], 'success', false);
        this.$set(this.files[i], 'percentName', `Failure`);
        this.$set(this.files[i], 'percentCompleted', `100%`);
        errorEventHandler(error);
      }
    },
    //* 엑셀 파일 파서
    excelPaser(items) {
      return items
        .map(item => {
          const obj = {};
          Object.entries(item).forEach((entity, i) => {
            if (this[this.xlsxKey].length > i)
              obj[this[this.xlsxKey][i]] = entity[1];
          });
          return obj;
        })
        .filter(item => item[this[this.xlsxKey][0]] !== '');
    },
    //* 파일 정렬
    async fileSort(params) {
      try {
        await axiosNoSpinner.post(this.fileSortURL, params);
      } catch (error) {
        errorEventHandler(error);
      }
    },
    //! 파일 다운로드 (현재 사용 안함)
    //! async fileDownload(fileId) {
    //!   if (this.read)
    //!     try {
    //!       await axiosNoSpinner
    //!         .get(
    //!           `${this.fileDownloadURL}?fileId=${fileId}&downloadType=${this.downloadType}`,
    //!           { responseType: 'blob' },
    //!         )
    //!         .then(response => {
    //!           const url = window.URL.createObjectURL(
    //!             new Blob([response.data], {
    //!               type: response.headers['content-type'],
    //!             }),
    //!           );
    //!           this.hrefURL = url;
    //!           this.fileName = this.getFileName(
    //!             response.headers['content-disposition'],
    //!           ); //!or any other extension
    //!           document.querySelector('.downloadAnker').click();
    //!         });
    //!     } catch (error) {
    //!       errorEventHandler(error);
    //!     }
    //! },
    getFileName(contentDisposition) {
      let fileName = contentDisposition
        .split(';')
        .filter(ele => {
          return ele.indexOf('fileName') > -1;
        })
        .map(ele => {
          return ele.replace(/"/g, '').split('=')[1];
        });
      return fileName[0] ? fileName[0] : null;
    },
    //* 파일 삭제
    async fileRemove(params) {
      try {
        await axiosNoSpinner.post(this.fileRemoveURL, params);
      } catch (error) {
        errorEventHandler(error);
      }
    },
    //* 파일 업로드
    async fileUpload(formData, i) {
      const self = this;
      this.fileChangeProgress = 'uploading';
      this.$set(this.files[i], 'success', true);
      try {
        const { data } = await axiosNoSpinner.post(
          this.fileUploadURL,
          formData,
          {
            headers: {
              'Content-type': 'multipart/form-data',
            },
            onUploadProgress: function(progressEvent) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              self.files = self.files.map((file, idx) => {
                if (i === idx) {
                  file.percentName = `${percentCompleted - 1}%`;
                  file.percentCompleted = `${percentCompleted - 1}%`;
                }
                return file;
              });
            },
          },
        );
        this.$set(this.files[i], 'fileId', data.data.fileId);
        this.fileChangeProgress = 'complate';
        self.files = self.files.map((file, idx) => {
          if (i === idx) {
            file.percentName = `100%`;
            file.percentCompleted = `100%`;
          }
          return file;
        });
        this.counting++;
      } catch (error) {
        this.fileChangeProgress = 'warning';
        this.$set(this.files[i], 'success', false);
        this.$set(this.files[i], 'percentName', `Failure`);
        this.$set(this.files[i], 'percentCompleted', `100%`);
        errorEventHandler(error);
      }
    },
    fileUploadBtn() {
      if (this.$route.params.auth.includes('S')) this.$refs.files.click();
    },
    //* 파일 변경 이벤트
    fileChgEvent() {
      const items = this.$refs.files.files;
      const files = this.files.splice(0);
      let flag = true;
      for (let item of items) {
        const extensionArr = item.name.split('.');
        const extension = extensionArr[extensionArr.length - 1].toLowerCase();
        if (
          this.rules.length > 0 &&
          !this.rules.some(rule => rule.includes(extension))
        ) {
          common.alert('warning', 'NLS0000641');
          flag = false;
          break;
        }
        if (item.size > this.size) {
          common.alert('warning', 'NLS0000642');
          flag = false;
          break;
        }
        if (item.uploading === undefined) item.uploading = false;
        if (item.success === undefined) item.success = false;
        if (!this.multiple) {
          files[0] = item;
          break;
        } else {
          files.push(item);
        }
      }
      this.files = files;
      this.$refs.files.value = '';
      // this.setFiles();
      if (flag) this.fileChangeProgress = 'upload';
    },
    stopPropagation(e) {
      e.stopPropagation();
    },
    fileControlEventHandler() {
      /* Determine if drag and drop functionality is capable in the browser */
      this.dragAndDropCapable = this.determineDragAndDropCapable();

      /* If drag and drop capable, then we continue to bind events to our elements. */
      if (this.dragAndDropCapable) {
        /* Listen to all of the drag events and bind an event listener to each for the fileform. */
        [
          'drag',
          'dragstart',
          'dragend',
          'dragover',
          'dragenter',
          'dragleave',
          'drop',
        ].forEach(
          function(evt) {
            /* For each event add an event listener that prevents the default action
              (opening the file in the browser) and stop the propagation of the event (so
              no other elements open the file in the browser)*/
            this.$refs.fileform.addEventListener(
              evt,
              function(e) {
                e.preventDefault();
                e.stopPropagation();
              }.bind(this),
              false,
            );
          }.bind(this),
        );
        //* 드래그 앤 드롭 이벤트
        /* Add an event listener for drop to the form */
        this.$refs.fileform.addEventListener('drop', this.dropEvent.bind(this));
      }
    },
    dropEvent(e) {
      if (!this.$route.params.auth.includes('S')) return;
      /* Capture the files from the drop event and add them to our local files array. */
      const items = e.dataTransfer.files;
      const files = this.files.splice(0);
      let flag = true;
      for (let item of items) {
        const extensionArr = item.name.split('.');
        const extension = extensionArr[extensionArr.length - 1].toLowerCase();
        if (
          this.rules.length > 0 &&
          !this.rules.some(rule => rule.includes(extension))
        ) {
          common.alert('warning', 'NLS0000641');
          flag = false;
          break;
        }
        if (item.size > this.size) {
          common.alert('warning', 'NLS0000642');
          flag = false;
          break;
        }
        if (item.uploading === undefined) item.uploading = false;
        if (item.success === undefined) item.success = false;
        if (!this.multiple) {
          files[0] = item;
          break;
        } else files.push(item);
      }
      this.$refs.files.value = '';
      this.files = files;
      if (flag) this.fileChangeProgress = 'upload';
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  outline: none;
}
input[type='file'] {
  display: none;
}
.file-change-progress {
  display: flex;
  justify-content: center;
  align-items: center;
}
.file-change-progress > .text {
  padding: 0 10px;
}
.progress {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 28px;
  left: 100px;
  opacity: 0;
}
.progress.on {
  opacity: 1;
}
.progress .bar {
  background: #0d2c00;
  display: block;
  width: 100px;
  height: 2px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  /* box-shadow: 0 0 3px #417af5; */
}
.progress .bar .guage {
  width: 80%;
  height: 2px;
  float: left;
  background: #37b400;
  /* transition: 2s linear; */
}
.progress .percent {
  padding: 0 4px;
  font-size: 0.45rem;
  color: #37b400;
}
.progress .bar .guage.fail {
  background: #c62828;
}
.k-file-name.fail {
  color: #c62828;
}
.progress .percent.fail {
  padding: 0 4px;
  font-size: 0.45rem;
  color: #c62828;
}
.k-file-name {
  cursor: pointer;
}
.xlsx-upload-txt {
  margin: 10px 20px;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.6;
}
</style>
