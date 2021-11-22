<template>
  <div class="hms-grid">
    <com-native-grid
      :data="getPrjSkillFile"
      :columns="columns"
      height="380"
      :resizable="true"
      @btnclick="onClick"
      @onCheck="checked"
      :sortable="true"
      :sort="sort"
    >
    </com-native-grid>
  </div>
</template>
<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { skillFileStore, commonStore } from '@/mixins';
import * as skillFileTypes from '@/store/modules/systemManagement/skillFile/types';
import * as commonTypes from '@/store/modules/common/types';
import FunctionCell from '@/components/common/business/FunctionCell';
import { common } from '@/utils';
export default {
  name: 'skillFileGridForm',
  mixins: [skillFileStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      columns: [{}],
      defaultHead: [],
      defaultFoot: {},
      sort: [{ field: 'cdNm', dir: 'asc' }],
      cdList: [],
    };
  },
  computed: {
    getPrjSkillFile(state) {
      const data = this[skillFileTypes.getters.GET_PRJ_SKILL_FILE];
      const res = [];
      if (data.length !== 0) {
        const stepNm = data[0].cdNm;
        const prjStepCd = data[0].prjStepCd;
        // //* 동적으로 컬럼 생성
        state.columns = [];
        state.columns.push(...state.defaultHead);
        stepNm.reduce((acc, cur, idx) => {
          const item = {
            title: cur,
            field: prjStepCd[idx],
            editable: false,
            format: 'check',
            cell: FunctionCell,
            className: 'center',
            width: 115,
          };
          state.columns.push(item);
        }, []);
        state.columns.push(state.defaultFoot);

        //* 데이터 가공
        for (const item of data) {
          if (item.fileId !== null) {
            const obj = {};
            const applyYn = item.applyYn;
            prjStepCd.forEach((key, i) => {
              obj[key] = applyYn[i];
            });
            obj.prjTypeNm = item.prjTypeNm;
            obj.prjType = item.prjType;
            obj.languageCode = item.languageCode;
            obj.fileId = item.fileId;
            const fileInfo = {
              fileName: item.fileName,
              fileId: item.fileId,
              downloadType: 'peSkill',
            };
            obj.fileInfo = fileInfo;
            res.push(obj);
          }
        }
      }
      return res;
    },
    getI18nLocale() {
      return this[commonTypes.getters.GET_I18N_LOCALE];
    },
  },
  watch: {
    getI18nLocale() {
      this.initColumns();
    },
    getPrjSkillFile: function(value) {
      this[skillFileTypes.actions.INIT_SKILL_FILE_DATA](value);
    },
  },
  created() {
    this.initColumns();
  },
  methods: {
    initColumns() {
      this.defaultFoot = {
        title: this.$t('NLS0000075'), //삭제
        cell: FunctionCell,
        format: 'delete',
        className: 'center perm_delete',
        width: 105,
      };
      this.defaultHead = [
        {
          field: 'prjTypeNm',
          title: this.$t('NLS0000187'), //과제유형
          className: 'center',
          width: 100,
        },
        {
          field: 'fileInfo',
          title: this.$t('NLS0001159'), //파일명
          className: 'left td-ellipsis',
          cell: FunctionCell,
          format: 'download',
        },
      ];
    },
    checked(item, chk, field) {
      const data = this.getPrjSkillFile;
      data.reduce((acc, cur) => {
        if (cur.fileId === item.fileId) {
          if (chk) {
            cur[field] = 'Y';
          } else {
            cur[field] = 'N';
          }
        }
        acc.push(cur);
        return acc;
      }, []);
      this[skillFileTypes.actions.INIT_SKILL_FILE_DATA](data);
    },
    onClick(item) {
      common.confirm('NLS0000004', async () => {
        const prjType = item.prjType;
        const languageCode = item.languageCode;
        const keys = Object.keys(item);
        const res = [];
        for (const i of keys) {
          if (i.includes(prjType)) {
            const obj = {};
            obj.prjStepCd = i;
            obj.applyYn = item[i];
            obj.fileId = item.fileId;
            obj.prjType = item.prjType;
            obj.delete = 'Y';
            res.push(obj);
          }
        }
        const result = await this[skillFileTypes.actions.UPDATE_SKILL_FILE]({
          prjSkillList: res,
          delete: 'Y',
          fileId: item.fileId,
          prjType: prjType,
          languageCode: languageCode,
        });
        if (result) {
          //삭제되었습니다.
          common.alert('success', 'NLS0000002');
        }
      });
    },
  },
};
</script>
