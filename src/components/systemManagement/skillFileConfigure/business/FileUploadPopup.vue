<template>
  <com-overlay v-model="value" :draggable="true">
    <template v-slot:default="slotProps">
      <div class="page__layer-pop">
        <div class="layer-pop-wrap">
          <div class="layer-pop__box type-ultrasmall">
            <div class="layer-pop__title">
              <!-- 양식 추가	 -->
              <p>{{ $t('NLS0000207') }}</p>
              <button type="button" class="layer-close" @click="onClose">
                close {{ slotProps.trigger ? '' : onClose() }}
              </button>
            </div>
            <div class="search-box">
              <div class="search__form__box__block">
                <div class="search__form__box type-table line2">
                  <!-- 과제유형 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000187') }}
                    <span class="required-text">*</span>
                  </p>
                  <com-dropdowns
                    :data="prjTypeList"
                    textfield="cdNm"
                    valuefield="cd"
                    v-model="prjType"
                    class="hms-dropdown type2"
                    @change="onChange"
                  ></com-dropdowns>
                </div>
              </div>
              <div class="search__form__box__block">
                <div class="search__form__box type-table line2">
                  <!-- 국가별 언어	 -->
                  <p class="search__form__title">
                    {{ $t('NLS0000792') }}
                    <span class="required-text">*</span>
                  </p>
                  <com-dropdowns
                    :data="languageList"
                    textfield="cdNm"
                    valuefield="cd"
                    v-model="languageCode"
                    class="hms-dropdown type2"
                    @change="onLangChange"
                  ></com-dropdowns>
                </div>
              </div>
            </div>
            <div class="hms-upload">
              <com-upload-file
                :multiple="false"
                :ownerObjectId="ownerObjectId"
                :downloadType="downloadType"
                @files="uploadFile"
              ></com-upload-file>
              <div class="layer__btn-box">
                <button type="button" class="blue-btn" @click="saveFile">
                  <!-- 업로드 -->
                  <span>{{ $t('NLS0000209') }} </span>
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
import ComDropdowns from '@/components/common/global/ComDropdowns';
import { skillFileStore } from '@/mixins';
import * as skillFileTypes from '@/store/modules/systemManagement/skillFile/types';
import { common } from '@/utils';

export default {
  name: 'skillFileFormUploadPopup',
  mixins: [skillFileStore],
  components: { ComDropdowns, ComUploadFile, ComOverlay },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      prjType: {},
      languageCode: {},
      fileId: '',
      downloadType: 'peSkill',
      ownerObjectId: 'prjSkillFile',
    };
  },
  created() {
    this.prjType = this.prjTypeList[0];
    this.languageCode = this.languageList[0];
  },
  computed: {
    prjTypeList() {
      const cdList = common.getCodeList('PRJ005');
      const res = cdList.filter(i => i.opt1 === '1');
      return res;
    },
    languageList() {
      return common.getCodeList('G05');
    },
    getSrchParam() {
      return this[skillFileTypes.getters.GET_SRCH_PARAM];
    },
  },
  methods: {
    uploadFile(files) {
      if (files.length > 0) {
        this.fileId = files[0].fileId;
      } else {
        this.fileId = '';
      }
    },
    async saveFile() {
      if (this.fileId !== '') {
        const allCd = common.getCodeList('PRJ006');
        const filterCd = allCd.filter(
          i => i.cd.includes(this.prjType.cd) && i.opt2 === '1',
        );
        const prjStepCd = filterCd.map(i => i.cd);
        const res = [];
        for (const i of prjStepCd) {
          const obj = {};
          obj.fileId = this.fileId;
          obj.prjStepCd = i;
          obj.prjType = this.prjType.cd;
          obj.languageCode = this.languageCode.cd;
          obj.applyYn = 'N';
          obj.update = 'Y';
          res.push(obj);
        }
        const result = await this[skillFileTypes.actions.UPDATE_SKILL_FILE]({
          prjSkillList: res,
          prjType: this.getSrchParam.prjType,
          languageCode: this.getSrchParam.languageCode,
        });
        if (result) {
          //저장되었습니다.
          common.alert('success', 'NLS0000012', this.onClose);
        }
      } else {
        //파일을 업로드해주세요.
        common.alert('warning', 'NLS0001067');
      }
    },
    onChange(e) {
      this.prjType = e.target.value;
    },
    onLangChange(e) {
      this.languageCode = e.target.value;
    },
    onClose() {
      this.init();
      this.$emit('input', false);
    },
    init() {
      this.fileId = '';
      this.prjType = this.prjTypeList[0];
      this.languageCode = this.languageList[0];
    },
  },
};
</script>
