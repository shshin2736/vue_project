<template>
  <div>
    <div class="header" v-if="show">
      <div class="header__top">
        <!-- <menu-btn
          types="dropdowns"
          v-model="getLanguageList"
          @onClick="setlanguage"
        ></menu-btn> -->
        <com-dropdowns
          valuefield="id"
          textfield="title"
          class="hms-dropdown typeheader"
          :data="getLanguageList.children"
          v-model="languageInfo"
          @change="setlanguage"
        ></com-dropdowns>
        <menu-btn
          types="alarm"
          v-model="alarmList"
          @notice="onAlarmClick"
          @deleteAlarm="onAlarmDelete"
        ></menu-btn>
        <menu-btn v-model="getManual" @main="manualDownload"></menu-btn>
        <!-- <menu-btn v-model="getInternetList"></menu-btn> -->
        <button type="button" class="header__mypage__button" @click="myPage">
          <span>
            <em>{{ getUserInfo.userName }}</em>
            <!-- 님 -->
            {{ $t('NLS0000961') }}
          </span>
        </button>
        <button type="button" class="header__logout__button" @click="logout">
          <!-- 로그아웃 -->
          <span>{{ $t('NLS0000474') }}</span>
        </button>
      </div>
      <menu-bar :data="getMenuList"></menu-bar>
    </div>
    <!-- 모바일 용!! -->
    <div class="mobile-header" v-show="show">
      <div class="mheader__box">
        <div class="mheader__left-box">
          <a href="#" class="mheader__logo">
            <img
              src="@/assets/images/m-logo@2x.png"
              alt="sunjin hms"
              @click="toDashboard"
            />
          </a>
          <button class="mheader__mypage__button" @click="myPage">
            <span>
              <em>{{ getUserInfo.userName }}</em>
              <!-- 님 -->
              {{ $t('NLS0000961') }}
            </span>
          </button>
        </div>
        <button type="button" class="mheader__logout__button">
          <!-- 로그아웃 -->
          <span @click="logout">{{ $t('NLS0000474') }}</span>
        </button>
        <menu-btn
          types="alarm"
          :mobile="true"
          v-model="alarmList"
          @notice="onAlarmClick"
          @deleteAlarm="onAlarmDelete"
        ></menu-btn>
        <button
          type="button"
          class="mheader__menu-btn mheader__menu-btn--open"
          @click="isMenu = !isMenu"
        >
          menu
        </button>
      </div>
    </div>
    <!-- 모바일 하위 메뉴바 -->
    <menu-bar-mobile :data="getMenuList" v-model="isMenu"></menu-bar-mobile>
    <slot name="common"></slot>
    <a ref="links" />
  </div>
</template>

<script>
import ComDropdowns from '@/components/common/global/ComDropdowns';
import MenuBar from '@/components/common/business/MenuBar';
import MenuBtn from '@/components/common/business/MenuBtn';
import MenuBarMobile from '@/components/common/business/MenuBarMobile';
import * as commonType from '@/store/modules/common/types';
import * as userManagementTypes from '@/store/modules/systemManagement/userManagement/types';
import * as authType from '@/store/modules/auth/types';
import { commonStore, authStore, userManagementStore } from '@/mixins';
import { common, timezone } from '@/utils';

export default {
  name: 'AppBar',
  components: {
    MenuBar,
    MenuBtn,
    MenuBarMobile,
    ComDropdowns,
  },
  mixins: [commonStore, authStore, userManagementStore],
  data() {
    return {
      languageInfo: { key: '', title: '' },
      development: process.env.NODE_ENV !== 'production',
      alarmList: {
        title: this.$t('NLS0000478'), //? 신규알림
        noData: this.$t('NLS0001143'),
        new: false,
        alarmList: [],
      },
      isMenu: false,
      locale: 'ko',
      alarmInterval: null,
      userInfoFlag: false,
    };
  },
  computed: {
    getManual() {
      return {
        title: this.$t('NLS0000954'),
        mainClass: 'header__qna',
        subClass: 'header__qna__button',
        children: [],
      };
    },
    getInternetList() {
      return {
        title: 'INTERNET',
        mainClass: 'header__language',
        subClass: 'header__language__button',
        children: [
          { id: 1, title: 'Pig-on' },
          { id: 2, title: 'BAMS' },
        ],
      };
    },
    getAlarmList() {
      return this[commonType.getters.GET_ALARM_LIST];
    },
    getLanguageList(state) {
      // const locale = localStorage.getItem('locale')
      //   ? localStorage.getItem('locale')
      //   : this.$i18n.locale;
      const locale = this[commonType.getters.GET_I18N_LOCALE];
      const code = `${locale.charAt(0).toUpperCase()}${locale.charAt(1)}`;
      const languageNm = `cdNm${code}`;
      const languageCode = common.getCodeList('G05');
      state.locale = locale;
      return languageCode
        ? Array.from(languageCode).reduce(
            (acc, cur) => {
              const obj = { key: cur.cd, title: cur[languageNm] };
              acc.title =
                locale === cur.cd.toLowerCase() ? cur[languageNm] : acc.title;
              acc.children.push(obj);
              return acc;
            },
            {
              title: 'Korean',
              mainClass: 'header__language',
              subClass: 'header__language__button',
              children: [],
            },
          )
        : {
            title: 'Korean',
            mainClass: 'header__language',
            subClass: 'header__language__button',
            children: [],
          };
    },
    getMenuList(state) {
      let items = [];
      const str = state[commonType.getters.GET_I18N_LOCALE];
      const locale = `${str.charAt(0).toUpperCase()}${str.charAt(1)}`;
      if (this[authType.getters.GET_VIEWS_IS_LOGIN]) {
        const menuList = JSON.parse(localStorage.getItem('accessInfo'))
          .menuList;
        items = menuList.reduce((acc, cur) => {
          const obj = {};
          obj.title = cur[`menuNm${locale}`];
          obj.to = '#';
          obj.menuId = cur.menuId;
          obj.auth = cur.auth;
          if (cur.depth === 1) {
            obj.children = [];
            acc.push(obj);
          }
          return acc;
        }, []);
        items = items.sort((acc, cur) => {
          return Number(acc.menuId.slice(2)) < Number(cur.menuId.slice(2))
            ? -1
            : 1;
        });
        items.forEach(item => {
          menuList.forEach(menu => {
            const obj = {};
            obj.menuId = menu.menuId;
            obj.title = menu[`menuNm${locale}`];
            obj.to = menu.pageUrl === '' ? '#' : menu.pageUrl;
            obj.auth = menu.auth;
            if (item.menuId === menu.parentMenuId) item.children.push(obj);
          });
        });
      }
      return items;
    },
    show() {
      return this[commonType.getters.GET_APP_BAR];
    },
    getUserInfo() {
      return this[commonType.getters.GET_COM_USER_INFO];
    },
    menuOpen(state) {
      return state.mobileMenuClass;
    },
    getI18nLocale() {
      return this[commonType.getters.GET_I18N_LOCALE];
    },
  },
  watch: {
    getAlarmList: function(value) {
      this.setAlarmList(value);
    },
    getLanguageList: function(value) {
      this.languageInfo = value;
    },
  },
  created() {
    this.getMenuList;
    this.getNoticePopupList();
    this.getAlarmInterval();
    timezone.setLanguage(this.getI18nLocale);
    this.$i18n.locale = this.getI18nLocale;
    const locale = this.$i18n.locale;
    this.languageInfo.id = locale;
    this.languageInfo.title = common.filterCode(
      common.getCodeList('G05'),
      locale.toUpperCase(),
    ).cdNm;
  },
  beforeDestroy() {
    clearInterval(this.alarmInterval);
  },
  methods: {
    //* 메뉴얼 다운로드
    manualDownload() {
      const links = this.$refs.links;
      links.setAttribute('href', '/api/getManual.do');
      links.click();
    },
    //* 공지사항 데이터 가져오기
    getNoticePopupList() {
      this[commonType.actions.FETCH_DSB_NOTICE_LIST]({});
    },
    //* 알람 삭제
    onAlarmDelete({ items }) {
      this[commonType.actions.DELETE_ALARM]({ list: items });
    },
    // }
    //* 알람 데이터 설정
    setAlarmList(value) {
      //* 알림 데이터가 있을 때,
      if (value.length > 0) {
        const accList = value.filter(i => i.alarmConfirmDate === null);
        const disting = value.reduce((acc, cur) => {
          const arr = [];
          const obj = { ...cur };

          obj.opt1 = obj.alarmType.charAt(0);
          let flag = true;
          if (acc.length > 0)
            acc.forEach(item => {
              if (item[0].opt1 === obj.opt1) {
                item.push(obj);
                flag = false;
              }
            });
          if (flag) {
            arr.push(obj);
            acc.push(arr);
          }
          return acc;
        }, []);
        const alarmList = disting.reduce((acc, cur) => {
          cur.forEach(i => {
            i.title = i.alarmMsg;
            i.name = i.fromUser;
            i.date = timezone.convertToClientTimeZone(
              i.createDate,
              'YYYY-MM-DD',
            );
          });
          if (cur[0].opt1 === 'K') {
            const el = {
              field: 'kpi',
              btnTitle: this.$t('NLS0000160'),
              children: cur,
            };
            acc.push(el);
          }
          if (cur[0].opt1 === 'P') {
            const el = {
              field: 'prj',
              btnTitle: this.$t('NLS0000147'),
              children: cur,
            };
            acc.push(el);
          }
          if (cur[0].opt1 === 'T') {
            const el = {
              field: 'tov',
              btnTitle: this.$t('NLS0000481'),
              children: cur,
            };
            acc.push(el);
          }
          if (cur[0].opt1 === 'M') {
            const el = {
              field: 'mbo',
              btnTitle: this.$t('NLS0000479'),
              children: cur,
            };
            acc.push(el);
          }
          if (cur[0].opt1 === 'D') {
            const el = {
              field: 'data',
              btnTitle: this.$t('NLS0000482'),
              children: cur,
            };
            acc.push(el);
          }
          return acc;
        }, []);
        const obj = {
          title: this.$t('NLS0000478'), //? 신규알림
          noData: this.$t('NLS0001143'),
          alarmList: alarmList,
        };
        //* newAlarm or not
        obj.new = accList.length > 0 ? true : false;
        this.alarmList = { ...obj };
      } else {
        //* 새로운 알림이 없을 경우, 알람 초기화
        this.alarmList = {
          title: this.$t('NLS0000478'), //? 신규알림
          noData: this.$t('NLS0001143'),
          new: false,
          alarmList: [],
        };
      }
    },
    //* 알람 데이터
    async getAlarmInterval() {
      if (this.show) {
        //* 초기 요청
        await this[commonType.actions.FETCH_ALARM_LIST]({});
        this.getAlarmList;
        this.alarmInterval = setInterval(() => {
          //* 3분마다 데이터 요청
          this[commonType.actions.FETCH_ALARM_LIST]({});
        }, 60000 * 3);
      } else {
        clearInterval(this.alarmInterval);
      }
    },
    //* 로그아웃 이벤트
    async logout() {
      common.setLinear(true);
      clearInterval(this.alarmInterval);
      await this[authType.actions.INIT_LOGIN]();
      if (!localStorage.getItem('accessInfo')) location.replace('/login');
    },
    toDashboard() {
      this.isMenu = false;
      if (this.$route.path !== '/dashboardAfter')
        this.$router.push('/dashboardAfter');
    },
    myPage() {
      this[userManagementTypes.actions.FETCH_MY_INFO]({});
      this[userManagementTypes.actions.INIT_VIEWS_MY_PAGE_POPUP](true);
    },
    //* 언어셋 설정
    setlanguage(item) {
      timezone.setLanguage(item.target.value.key.toLowerCase());
      this.$i18n.locale = item.target.value.key.toLowerCase();
      localStorage.setItem('locale', item.target.value.key.toLowerCase());
      this.locale = item.target.value.key.toLowerCase();
      this[commonType.actions.INIT_I18N_LOCALE](
        item.target.value.key.toLowerCase(),
      );
      //* 알람은 사용자의 언어에 따라 다국어 처리 후 저장되므로 호출 시에는 언어셋 볼 필요 없음.
      // this.setAlarmList(this.getAlarmList);
      this.$router.push({
        name: 'redirectForm',
        params: { path: this.$route.name },
      });
    },
    //* 알람 클릭 이벤트
    onAlarmClick(items, field) {
      //* 클릭 시, 상태 읽음으로 Update
      this[commonType.actions.UPDATE_ALARM_READ]({ alarmId: items.alarmId });
      const path = 'redirectForm';
      switch (field) {
        case 'kpi':
          this.$router.push({
            name: path,
            params: {
              openPopup: true,
              auth: this.$route.params.auth,
              key: items.sourceId,
              path: 'KpiPerformanceListPage',
            },
          });
          break;
        case 'prj':
          if (items.prjType === 'G') {
            this.$router.push({
              name: path,
              params: {
                auth: this.$route.params.auth,
                key: items.sourceId,
                prjId: items.sourceId,
                path: 'GeneralTaskPage',
              },
            });
          } else if (items.prjType === 'S') {
            this.$router.push({
              name: path,
              params: {
                auth: this.$route.params.auth,
                key: items.sourceId,
                prjId: items.sourceId,
                path: 'ProjectExecutionDetailPage',
              },
            });
          }
          break;
        case 'tov':
          this.$router.push({
            name: path,
            params: {
              auth: this.$route.params.auth,
              key: items.sourceId,
              path: 'businessTakeOverPage',
            },
          });
          break;
        case 'mbo':
          this.$router.push({
            name: path,
            params: {
              onListTab: true,
              auth: this.$route.params.auth,
              key: items.sourceId,
              path: 'mboOperation',
            },
          });
          break;
        case 'data':
          if (items.alarmType === 'D01') {
            this.$router.push({
              name: path,
              params: {
                onConfirmTab: true,
                auth: this.$route.params.auth,
                key: items.sourceId,
                path: 'DataSearchPage',
              },
            });
          } else {
            this.$router.push({
              name: path,
              params: {
                // onSrchTab: true,
                auth: this.$route.params.auth,
                key: items.sourceId,
                path: 'DataSearchPage',
              },
            });
          }
          break;
      }
    },
  },
};
</script>
