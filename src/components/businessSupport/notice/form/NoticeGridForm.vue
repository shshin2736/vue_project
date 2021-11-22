<template>
  <div class="page-content-box">
    <div class="hms-grid perm_read">
      <com-native-grid
        :data="getNoticeList"
        :columns="columns"
        :pageable="true"
        :skip="skip"
        :take="take"
        :total="total"
        :serverRander="true"
        height="400"
        :resizable="true"
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
import { noticeStore, commonStore } from '@/mixins';
import * as noticeTypes from '@/store/modules/businessSupport/notice/types';
import * as commonTypes from '@/store/modules/common/types';
import { common } from '@/utils';

export default {
  name: 'NoticeGridForm',
  mixins: [noticeStore, commonStore],
  components: {
    ComNativeGrid,
  },
  data() {
    return {
      columns: [],
      sort: [{ field: 'bdNo', dir: 'asc' }],
      skip: 0,
      take: 10,
      total: 0,
    };
  },
  computed: {
    //* 스토어에 저장된 공지사항 리스트에 변동이 생긴경우 자동으로 갱신
    getNoticeList(state) {
      const items = this[noticeTypes.getters.GET_NOTICE_LIST];
      state.total = items.length === 0 ? 0 : items[0].totcnt;
      return items;
    },
    //* 공지사항 리스트 페이지 변경시 필요 함.
    getSrchParam() {
      return this[noticeTypes.getters.GET_NTC_SRCH_PARAM];
    },
  },
  watch: {
    getSrchParam: function() {
      this.setDefault();
    },
    getNoticeList: function(items) {
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
          width: '90px',
          className: 'center',
        },
        {
          field: 'bdTitle',
          title: this.$t('NLS0000366'), //제목
          format: 'button',
          cell: FunctionCell,
          editor: 'new',
          width: '750px',
          minResizableWidth: '300',
          className: 'left',
        },
        {
          field: 'createUserNm',
          title: this.$t('NLS0000080'), //등록자
          width: '170px',
          className: 'center',
        },
        {
          field: 'shCount',
          title: this.$t('NLS0000374'), //조회수
          width: '100px',
          className: 'center',
        },
        {
          field: 'popupYn',
          title: this.$t('NLS0001287'), //팝업 사용 여부
          className: 'center',
          width: '170px',
        },
        {
          field: 'updateDate',
          title: this.$t('NLS0000375'), //수정일
          className: 'center',
          width: '180px',
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
      //* 선택한 게시글의 ID값으로 게시글 내용을 서버에서 받아 스토어에 저장.
      try {
        await this[noticeTypes.actions.FETCH_NOTICE_DETAIL]({
          bdId: dataItem.bdId,
        });
        this.getFiles(dataItem.bdId);
      } catch (error) {
        common.alert(error);
      }
    },
    async getFiles(bdId) {
      try {
        await this[commonTypes.actions.FETCH_FILE_INFO_LIST]({
          ownerObjectId: bdId,
          downloadType: 'notice',
        });
        //* 수정 권한이 있으면 RegistrationPage로 이동할 것.
        this.$router.push({
          name: 'NoticeDetailPage',
          params: { auth: this.$route.params.auth, bdId: bdId },
        });
      } catch (error) {
        common.alert('warning', error);
      }
    },
    async onPageChange(skip, take) {
      const params = {
        srchStartDate: this.getSrchParam.srchStartDate,
        srchEndDate: this.getSrchParam.srchEndDate,
        srchTitle: this.getSrchParam.srchTitle,
        limit: take,
        offset: skip,
      };
      this[noticeTypes.actions.INIT_NTC_SRCH_PARAM](params);
      await this[noticeTypes.actions.FETCH_NOTICE_LIST](params);
      this.skip = skip;
      this.take = take;
    },
  },
};
</script>
