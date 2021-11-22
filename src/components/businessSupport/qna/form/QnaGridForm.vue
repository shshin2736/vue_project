<template>
  <div class="page-content-box">
    <div class="hms-grid perm_read">
      <com-native-grid
        :data="getQnaList"
        :columns="columns"
        :pageable="true"
        :skip="skip"
        :take="take"
        :total="total"
        :serverRander="true"
        height="400"
        @btnclick="onClick"
        @pageChange="onPageChange"
        :sortable="true"
        :sort="sort"
      ></com-native-grid>
    </div>
  </div>
</template>

<script>
import ComNativeGrid from '@/components/common/global/ComNativeGrid';
import FunctionCell from '@/components/common/business/FunctionCell';
import { qnaStore, commonStore } from '@/mixins';
import * as qnaTypes from '@/store/modules/businessSupport/qna/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'QnaGridForm',
  mixins: [qnaStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      columns: [],
      sort: [{ field: 'createDate', dir: 'desc' }],
      skip: 0,
      take: 10,
      total: 0,
    };
  },
  computed: {
    getQnaList(state) {
      const items = this[qnaTypes.getters.GET_QNA_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
    getUserInfo() {
      return this[commonTypes.getters.GET_COM_USER_INFO];
    },
    getSrchParam() {
      return this[qnaTypes.getters.GET_QNA_SRCH_PARAM];
    },
  },
  watch: {
    getQnaList: function(items) {
      items.forEach(item => {
        // const isNew = common.isNew(item);
        if (item.isNew === 'new')
          item.bdTitle = {
            title: item.bdTitle,
            icon: true,
          };
        else
          item.bdTitle = {
            title: item.bdTitle,
            icon: false,
          };
      });
    },
  },
  async created() {
    this.initColumns();

    await this.setDefault();
  },
  methods: {
    initColumns() {
      this.columns = [
        {
          field: 'bdNo',
          title: this.$t('NLS0000365'), //번호
          width: '70px',
          className: 'center',
        },
        {
          field: 'bdTitle',
          title: this.$t('NLS0000366'), //제목
          format: 'button',
          cell: FunctionCell,
          editor: 'new',
          width: '570px',
          className: 'left',
        },
        {
          field: 'faqType',
          title: this.$t('NLS0000183'), //유형
          width: '110px',
          className: 'center',
        },
        {
          field: 'status',
          title: this.$t('NLS0000149'), //상태
          width: '110px',
          className: 'center',
        },
        {
          field: 'createUserInfo',
          title: this.$t('NLS0000378'), //문의자
          width: '280px',
          className: 'center',
        },
        {
          field: 'createDate',
          title: this.$t('NLS0000380'), //문의일자
          width: '120px',
          className: 'center',
        },
        {
          field: 'updateDate',
          title: this.$t('NLS0000381'), //답변완료일
          width: '120px',
          className: 'center',
        },
        {
          field: 'shCount',
          title: this.$t('NLS0000374'), //조회수
          width: '70px',
          className: 'center',
        },
      ];
    },
    setDefault() {
      if (!common.isEmpty(this.getSrchParam)) {
        this.skip = this.getSrchParam.offset;
        this.take = this.getSrchParam.limit;
      }
    },
    async onClick(dataItem) {
      //* 게시글 클릭하는 경우 등록 화면이 아닌 조회화면으로 이동
      try {
        await this[qnaTypes.actions.UPDATE_SH_COUNT]({
          bdId: dataItem.bdId,
        });

        const userType = this.getUserInfo.userType;
        if (
          (userType === 'ADMIN' || userType === 'SUPER') &&
          dataItem.status === '문의요청'
        ) {
          this.changeStaus(dataItem.bdId);
        } else {
          this.getDetail(dataItem.bdId);
        }
      } catch (error) {
        common.alert(error);
      }
    },
    async changeStaus(rcvBdId) {
      const res = await this[qnaTypes.actions.UPDATE_QNA_STATUS_A]({
        bdId: rcvBdId,
        upStatus: 'A',
      });
      if (res.result === 'T') {
        this.getDetail(rcvBdId);
      } else {
        return;
      }
    },
    async getDetail(rcvBdId) {
      //* 선택한 게시글의 ID값으로 게시글 내용을 서버에서 받아 스토어에 저장.
      try {
        await this[qnaTypes.actions.FETCH_QNA_DETAIL]({
          bdId: rcvBdId,
        });
        this.getQnaReplyList(rcvBdId);
      } catch (error) {
        common.alert(error);
      }
    },
    async getQnaReplyList(rcvBdId) {
      try {
        await this[qnaTypes.actions.FETCH_QNA_REPLY_LIST]({
          bdId: rcvBdId,
        });
        this.getBoardFiles(rcvBdId);
      } catch (error) {
        common.alert(error);
      }
    },
    async getBoardFiles(rcvBdId) {
      try {
        await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
          ownerObjectId: rcvBdId,
          downloadType: 'qna',
        });
        this.$router.push({
          name: 'QnaDetailPage',
          params: { auth: this.$route.params.auth, bdId: rcvBdId },
        });
      } catch (error) {
        common.alert('warning', error);
      }
    },
    async onPageChange(skip, take) {
      const params = {
        srchCountry: this.getSrchParam.srchCountry,
        srchMenuId: this.getSrchParam.srchMenuId,
        srchTitle: this.getSrchParam.srchTitle,
        srchFaqType: this.getSrchParam.srchFaqType,
        srchStatus: this.getSrchParam.srchStatus,
        srchUserId: this.getSrchParam.srchUserId,
        srchUserNm: this.getSrchParam.srchUserNm,
        srchStartDate: this.getSrchParam.srchStartDate,
        srchEndDate: this.getSrchParam.srchEndDate,
        limit: take,
        offset: skip,
      };
      this[qnaTypes.actions.INIT_QNA_SRCH_PARAM](params);
      await this[qnaTypes.actions.FETCH_QNA_LIST](params);
      this.skip = skip;
      this.take = take;
    },
  },
};
</script>
