<template>
  <div class="hms-grid">
    <com-native-grid
      :data="result"
      :columns="setColumns"
      :pageable="true"
      :skip="skip"
      :take="take"
      :total="total"
      :sortable="true"
      :sort="sort"
      :serverRander="true"
      height="400"
      @pageChange="pageChange"
      @btnclick="btnclick"
      @sortchange="sortchange"
    >
    </com-native-grid>
    <a ref="links" href="#"></a>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import { commonStore, dataSearchStore, kpiPerformanceStore } from '@/mixins';
import * as dataSearchTypes from '@/store/modules/businessSupport/dataSearch/types';
import * as kpiPerformanceTypes from '@/store/modules/businessExecution/kpiPerformance/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';
import FunctionCell from '@/components/common/business/FunctionCell';

export default {
  name: 'DataSearchListForm',
  mixins: [commonStore, dataSearchStore, kpiPerformanceStore],
  components: {
    ComNativeGrid,
  },
  props: {
    tab: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      sort: [{ field: '', dir: '' }],
      total: 0,
      take: 10,
      skip: 0,
      items: [],
    };
  },
  computed: {
    getPaging(state) {
      return state.tab
        ? this[dataSearchTypes.getters.GET_LIST_PAGING]
        : this[dataSearchTypes.getters.GET_REQ_PAGING];
    },
    getSearchData() {
      return this[dataSearchTypes.getters.GET_SEARCH_DATA];
    },
    getUserData() {
      return this[commonTypes.getters.GET_USER_DATA];
    },
    setColumns() {
      return this.tab
        ? [
            {
              field: 'dataName',
              title: this.$t('NLS0000357'),
              format: this.tab
                ? 'dataSearchDownload'
                : 'dataSearchConfirmDownload',
              cell: FunctionCell,
              width: '700px',
              className: 'under-line-btn',
            },
            {
              field: 'typeName',
              title: this.$t('NLS0000138'),
              className: 'center',
              width: '150px',
            },
            {
              field: 'reqNm',
              title: this.$t('NLS0001154'),
              width: '150px',
              format: 'dataSearchBtn',
              className: 'center',
              cell: FunctionCell,
            },
            {
              field: 'userNm',
              title: this.$t('NLS0001153'),
              className: 'center',
              width: '200px',
            },
            {
              field: 'deptNm',
              title: this.$t('NLS0001152'),
              className: 'center',
              width: '246px',
            },
          ]
        : [
            {
              field: 'dataName',
              title: this.$t('NLS0000357'),
              format: this.tab
                ? 'dataSearchDownload'
                : 'dataSearchConfirmDownload',
              cell: FunctionCell,
              className: 'under-line-btn',
              width: '750px',
            },
            {
              field: 'typeName',
              title: this.$t('NLS0000138'),
              className: 'center',
              width: '150px',
            },
            {
              field: 'deptNm',
              title: this.$t('NLS0000359'),
              className: 'center',
              width: '200px',
            },
            {
              field: 'userNm',
              title: this.$t('NLS0000360'),
              className: 'center',
              width: '150px',
            },
            {
              field: 'reqNm',
              title: this.$t('NLS0001155'),
              width: '200px',
              format: 'dataSearchConfirmBtn',
              className: 'center',
              cell: FunctionCell,
            },
          ];
    },
    result(state) {
      const { userType, deptId } = this[commonTypes.getters.GET_USER_DATA];
      const deptList = this[commonTypes.getters.GET_LOW_DEPT_INFO_LIST];
      const items = this.tab
        ? this[dataSearchTypes.getters.GET_DATA_SEARCH_LIST]
        : this[dataSearchTypes.getters.GET_DATA_SEARCH_REQ];
      if (items.length > 0) state.total = items[0].totcnt;
      const dataCode = common.getCodeList('G15');
      const locale = `${this.$i18n.locale
        .charAt(0)
        .toUpperCase()}${this.$i18n.locale.charAt(1).toLowerCase()}`;
      //console.log(items);
      return items.map(item => {
        const obj = { ...item };
        obj.srcId = item.srcId;
        obj.downloadType = item.downloadType;
        obj.dataName = item[`srcNm${locale}`];
        obj.searchType = item.searchType;
        dataCode.forEach(code => {
          if (code.cd === item.searchType) obj.typeName = code.cdNm;
        });
        if (state.tab) {
          obj.deptNm = item.deptNm;
          obj.deptId = item.deptId;
          obj.userNm = item.userNm ? item.userNm : 'Anonymous';
          obj.userId = item.userId;
          if (userType === 'ADMIN' || userType === 'SUPER') obj.reqStatus = '4';
          else if (userType === 'USER')
            obj.reqStatus = item.deptId === deptId ? '4' : item.reqStatus;
          else {
            obj.reqStatus = deptList.some(dept => dept.deptId === item.deptId)
              ? '4'
              : item.reqStatus;
          }
          obj.reqNm =
            obj.reqStatus === '1'
              ? this.$t('NLS0000358')
              : obj.reqStatus === '2'
              ? this.$t('NLS0000361')
              : obj.reqStatus === '3'
              ? this.$t('NLS0000363')
              : obj.reqStatus === '4'
              ? ''
              : this.$t('NLS0000358');
        } else {
          obj.deptNm = item.reqDeptNm;
          obj.deptId = item.reqDeptId;
          obj.userNm = item.reqUserNm;
          obj.userId = item.reqUserId;
          obj.reqStatus = item.reqStatus;
          obj.reqNm =
            obj.reqStatus === '1'
              ? this.$t('NLS0000358')
              : obj.reqStatus === '2'
              ? this.$t('NLS0000361')
              : obj.reqStatus === '3'
              ? this.$t('NLS0000362')
              : obj.reqStatus === '4'
              ? ''
              : this.$t('NLS0000358');
        }
        return obj;
      });
    },
  },
  watch: {
    getPaging: function(value) {
      this.skip = value.offset;
      this.take = value.limit;
    },
    result: function(value) {
      this.items = value;
    },
  },
  mounted() {
    const paging = this.getPaging;
    this.skip = paging.offset;
    this.take = paging.limit;
  },
  methods: {
    //* 정렬 이벤트
    sortchange(sort) {
      let field = '';
      switch (sort) {
        case 'dataName':
          field = `SRC_NM_${this.$i18n.locale.toUpperCase()}`;
          break;
        case 'typeName':
          field = `SEARCH_TYPE`;
          break;
        case 'reqNm':
          field = `REQ_STATUS`;
          break;
        case 'userNm':
          field = `USER_NAME`;
          break;
        case 'deptNm':
          field = `DEPT_NM`;
          break;
        default:
          field = '';
      }
      const params = {
        limit: this.take,
        offset: this.skip,
        field: field,
        sort: sort[0].dir,
      };
      if (this.tab) this[dataSearchTypes.actions.INIT_LIST_PAGING](params);
      else this[dataSearchTypes.actions.INIT_REQ_PAGING](params);
    },
    //* 페이징 이벤트
    async pageChange(skip, take) {
      if (this.tab) {
        await this[dataSearchTypes.actions.INIT_LIST_PAGING]({
          limit: take,
          offset: skip,
          field: this.getPaging.field,
          sort: this.getPaging.sort,
        });
        this.fetchedDadaSearchList();
      } else {
        await this[dataSearchTypes.actions.INIT_REQ_PAGING]({
          limit: take,
          offset: skip,
          field: this.getPaging.field,
          sort: this.getPaging.sort,
        });
        this.fetchedDateSearchReq();
      }
    },
    fetchedDadaSearchList() {
      this[dataSearchTypes.actions.FETCH_DATA_SEARCH_LIST]({
        ...this.getSearchData,
        ...this.getPaging,
      });
    },
    fetchedDateSearchReq() {
      this[dataSearchTypes.actions.FETCH_DATA_SEARCH_REQ]({
        ...this.getPaging,
      });
    },
    //* 클릭 이벤트
    async btnclick(items, value, field, flag) {
      if (field === 'reqNm') {
        if (this.tab) {
          if (items.reqStatus === '3') {
            //* 재열람요청
            items.reqStatus = '1';
            await this[dataSearchTypes.actions.UPDATE_DATA_SEARCH_REQ]({
              srcId: items.srcId,
              reqUserId: this.getUserData.userId,
              reqStatus: items.reqStatus,
              userId: items.userId,
            });
          } else {
            //* 열람요청
            items.reqStatus = '1';
            await this[dataSearchTypes.actions.INSERT_DATA_SEARCH_REQ]({
              searchType: items.searchType,
              srcId: items.srcId,
              reqDeptId: this.getUserData.deptId,
              reqStatus: items.reqStatus,
              userId: items.userId,
            });
          }
          await this.fetchedDadaSearchList();
        } else {
          if (flag) {
            //* 요청 승인
            items.reqStatus = '2';
            await this[dataSearchTypes.actions.UPDATE_DATA_SEARCH_REQ]({
              srcId: items.srcId,
              reqUserId: items.userId,
              reqStatus: items.reqStatus,
            });
          } else {
            //* 요청 반려
            items.reqStatus = '3';
            await this[dataSearchTypes.actions.UPDATE_DATA_SEARCH_REQ]({
              srcId: items.srcId,
              reqUserId: items.userId,
              reqStatus: items.reqStatus,
            });
          }
          await this.fetchedDateSearchReq();
        }
      } else {
        const links = this.$refs.links;
        links.setAttribute('target', '_blank');
        //* 자료명 이벤트
        if (items.searchType === '30') {
          //* 다운로드
          links.setAttribute(
            'href',
            `api/fileDownload.do?fileId=${items.srcId}&downloadType=${items.downloadType}`,
          );
          links.click();
        } else if (items.searchType === '20') {
          const userId = this.getUserData.userId;
          if (items.prjType === 'GL') {
            links.setAttribute(
              'href',
              `/redirectForm?path=GeneralTaskPage&prjId=${items.srcId}&auth=${
                userId === items.userId ? `RDSX` : `R`
              }`,
            );
            links.click();
            //* 일반과제
            // this.$router.push({
            //   name: `GeneralTaskPage`,
            //   params: {
            //     auth: userId === items.userId ? `RDSX` : `R`,
            //     prjId: items.srcId,
            //   },
            // });
          } else if (items.prjType === 'IN') {
            links.setAttribute(
              'href',
              `/redirectForm?path=PrjActionPage&prjId=${items.srcId}&auth=${
                userId === items.userId ? `RDSX` : `R`
              }`,
            );
            links.click();
            //* 즉실천
            // this.$router.push({
            //   name: `PrjActionPage`,
            //   params: {
            //     auth: userId === items.userId ? `RDSX` : `R`,
            //     prjId: items.srcId,
            //   },
            // });
          } else {
            links.setAttribute(
              'href',
              `/redirectForm?path=ProjectExecutionDetailPage&prjId=${
                items.srcId
              }&auth=${userId === items.userId ? `RDSX` : `R`}`,
            );
            links.click();
            //* 전문과제
            // this.$router.push({
            //   name: `ProjectExecutionDetailPage`,
            //   params: {
            //     auth: userId === items.userId ? `RDSX` : `R`,
            //     prjId: items.srcId,
            //   },
            // });
          }
        } else {
          //* KPI
          this[kpiPerformanceTypes.actions.INIT_DATA_SEARCH_KPI_DATA]({
            deptId: items.deptId,
            deptNm: items.deptNm,
            userNm: items.userNm,
            srcId: items.srcId,
            userId: items.userId,
          });
          this.$router.push({
            name: 'kpiPerformReport',
          });

          //! 이전 수정 팝업
          // this[kpiTargetEstablishmentTypes.actions.FETCH_KPI_INFO_DATA]({
          //   kpiId: items.srcId,
          // });
          // this[commonTypes.actions.INIT_SELECTED_DEPARTMENT_MANAGER_LIST]([]);
          // this[kpiTargetEstablishmentTypes.actions.INIT_VIEWS_KPI_UPDATE_POP](
          //   true,
          // );
        }
      }
    },
  },
};
</script>
