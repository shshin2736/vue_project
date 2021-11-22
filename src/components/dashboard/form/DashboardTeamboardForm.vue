<template>
  <!--팀 게시판-->
  <dashboard-box
    :title="$t('NLS0000469')"
    mainClass="dashboard__teamboard"
    :contentsClassList="contentsClassList"
    :searchBox="true"
    :sliderAll="sliderAll"
    :totalPage="totalPageCnt - 1"
    :progress="progress"
    progressHeight="206px"
    :sliderOption="sliderOption"
    @search="searchBoardList"
  >
    <template v-slot:slot0>
      <div>
        <ul v-if="boardList.length === 0">
          <li v-for="n in 7" :key="n"></li>
        </ul>
        <ul v-for="(items, i) in boardList" :key="i">
          <li v-for="(item, j) in items" :key="j">
            <a>
              <span :class="item.class" @click="onClickBoardRow(item)">{{
                item.bdTitle
              }}</span>
              <span class="name">{{ item.userName }}</span>
              <!-- <span :class="item.file">{{" item.file }}</span> -->
              <span
                :class="item.file"
                @click="onClickBoardFile(item.fileId)"
              ></span>
              <span class="date">{{ item.createDate }}</span>
            </a>
          </li>
          <li v-for="k in 7 - items.length" :key="k + '_'"></li>
        </ul>
        <a ref="links"></a>
      </div>
    </template>
  </dashboard-box>
</template>

<script>
import { common } from '@/utils';
import DashboardBox from '@/components/dashboard/business/DashboardBox';
import { commonStore, dashboardStore } from '@/mixins';
import * as commonTypes from '@/store/modules/common/types';
import * as dashboardTypes from '@/store/modules/dashboard/types';
export default {
  name: 'TeamboardForm',
  mixins: [commonStore, dashboardStore],
  components: {
    DashboardBox,
  },
  data() {
    return {
      sliderAll: false,
      contentsClassList: ['teamboard__list'],
      sliderOption: [
        {
          arrows: false,
          edgeFriction: 0.35,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      ],
      take: 7,
      totalCnt: 0,
      totalPageCnt: 1,
      progress: false,
      boardList: [],
      currentPageNo: 0,
    };
  },
  computed: {
    getBoardList() {
      return this[dashboardTypes.getters.GET_DASHBOARD_BOARD_LIST];
    },
    getCurrentSlideNo() {
      return this[dashboardTypes.getters.GET_CURRENT_SLIDE_NO_BOARD];
    },
  },
  watch: {
    getBoardList: function(data) {
      if (common.isEmpty(data)) return;
      this.boardList = [];
      let resultList = data.map(el => {
        let obj = { ...el };
        obj.file = !common.isEmpty(obj.fileId)
          ? 'file on cursor-pointer'
          : 'file';
        obj.class = 'title cursor-pointer '; // under-line-btn
        obj.class += obj.isNew === 'new' ? 'icon-new' : '';
        return obj;
      });
      if (resultList.length > 0) {
        this.totalCnt = resultList[0].totcnt;
      }
      //*총 페이지 개수
      this.totalPageCnt = Math.ceil(this.totalCnt / this.take) || 0;
      this.sliderAll = this.totalPageCnt > 1 ? true : false;
      this.boardList.push(resultList);
    },
    getCurrentSlideNo: function(data) {
      this.currentPageNo = data;
      const loginUser = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      const param = {
        deptId: loginUser.deptId,
        offset: this.take * this.currentPageNo,
        limit: this.take,
      };
      this[dashboardTypes.actions.FETCH_DASHBOARD_BOARD_LIST](param);
    },
  },
  mounted() {
    this.currentPageNo = this[
      dashboardTypes.getters.GET_CURRENT_SLIDE_NO_BOARD
    ];
    //*팀게시판 리스트
    this.getBoardListFn();
  },
  methods: {
    getBoardListFn(text) {
      const loginUser = { ...this[commonTypes.getters.GET_COM_USER_INFO] };
      const param = {
        deptId: loginUser.deptId,
        offset: this.take * this.getCurrentSlideNo,
        limit: this.take,
        srchTitleNm: text || '',
      };
      this[dashboardTypes.actions.FETCH_DASHBOARD_BOARD_LIST](param);
    },
    searchBoardList(text) {
      this.getBoardListFn(text);
    },
    onClickBoardRow({ bdId }) {
      const links = this.$refs.links;
      links.setAttribute(
        'href',
        `/redirectForm?auth=${this.$route.params.auth}&path=TeamBoardDetailPage&bdId=${bdId}`,
      );
      links.setAttribute('target', '_blank');
      links.click();
    },
    onClickBoardFile(fileId) {
      const links = this.$refs.links;
      links.setAttribute(
        'href',
        `api/fileDownload.do?fileId=${fileId}&downloadType=teamBoard`,
      );
      links.click();
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard__teamboard {
  width: 100%;
  max-width: 500px;
  flex: none;

  @include breakpoint(desktop-s) {
    max-width: 100%;
    width: 100%;
  }

  .teamboard__list li {
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .name {
      min-width: 80px;
    }
    .date {
      flex: none;
      width: 70px;
      text-align: right;
    }
  }
}
</style>
