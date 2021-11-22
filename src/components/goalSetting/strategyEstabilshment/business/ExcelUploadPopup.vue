<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-ultrasmall">
            <div class="layer-pop__title">
              <!-- 엑셀 양식 -->
              <p>{{ $t('NLS0000256') }}</p>
              <button type="button" class="layer-close" @click="closePopup">
                close {{ slotProps.trigger ? '' : closePopup() }}
              </button>
            </div>
            <div class="hms-upload">
              <com-upload-file
                :rules="['.xlsx', '.xls']"
                :read="true"
                :fileList="getExcelUploadForm"
                :downloadType="downloadType"
                downloadUrl="api/getStrategeTemplate.do"
              ></com-upload-file>
              <div id="products">
                <com-upload-file
                  :rules="['.xlsx', '.xls']"
                  :multiple="false"
                  :xlsx="true"
                  xlsxKey="strategyXlsxKey"
                  @xlsx="onSuccess"
                  ref="files"
                ></com-upload-file>
              </div>
              <span class="grid-text-info">{{ $t('NLS0001453') }}</span>
              <div class="layer__btn-box">
                <!-- <button
                  type="button"
                  class="white-btn plus-btn"
                  @click="onClick"
                >
                  <span>파일추가</span>
                </button> -->
                <button type="button" class="darkblue-btn" @click="closePopup">
                  <!-- 확인 -->
                  <span>{{ $t('NLS0000959') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </com-overlay>
</template>

<script>
import ComOverlay from '@/components/common/global/ComOverlay';
import ComUploadFile from '@/components/common/global/ComUploadFile';
import * as strategyEstabilshmentTypes from '@/store/modules/goalSetting/strategyEstabilshment/types';
import { strategyEstabilshmentStore, commonStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';

export default {
  name: 'ExcelUploadPopup.vue',
  mixins: [strategyEstabilshmentStore, commonStore],
  components: { ComUploadFile, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      files: [],
      downloadType: 'strategeExcel',
      attachFiles: [],
    };
  },
  computed: {
    getExcelUploadForm() {
      return this[strategyEstabilshmentTypes.getters.GET_UPLOAD_EXCEL_FORM];
    },
  },
  methods: {
    onClick() {
      document.querySelector('[name="files"]').click();
    },
    closePopup() {
      this.$emit('input', false);
    },
    //* 파일 업로드 이벤트
    getFiles(files) {
      this.files = files;
      this[strategyEstabilshmentTypes.getters.GET_STRATEGY_ESTABILSHMENT_LIST]({
        baseYYYY: new Date().getFullYear(),
        deptNm: this[commonTypes.getters.GET_USER_DATA].deptNm,
      });
    },
    //* 엑셀 업로드 완료 이벤트
    onSuccess() {
      //* 업로드가 성공적으로 완료되면 해당 검색 조건으로
      const searchStgInfo = this[
        strategyEstabilshmentTypes.getters.GET_STG_SEARCH_INFO
      ];

      //* 전략과제 리스트 갱신
      this[
        strategyEstabilshmentTypes.actions.FETCH_STRATEGY_ESTABILSHMENT_LIST
      ](searchStgInfo);
    },
  },
};
</script>
