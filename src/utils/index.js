import moment from 'moment-timezone';
import commonStore from '@/store/modules/common';
import authStore from '@/store/modules/auth';
import { getCodeList } from '@/api/axios/common/codeListHandler';
import { getI18nList } from '@/api/axios/common/i18nListHandler';
import { getUserInfo } from '@/api/axios/common/userInfoHandler';
import { errorEventHandler } from '@/errors';
import { vm } from '@/main';

//* timezone setting utils
export const timezone = {
  //* 타임존 언어셋 변경
  setLanguage(lang) {
    const i18nList = commonStore.state.i18nList[lang];
    const setting = {
      weekdays: [
        i18nList['NLS0000676'],
        i18nList['NLS0000677'],
        i18nList['NLS0000678'],
        i18nList['NLS0000679'],
        i18nList['NLS0000680'],
        i18nList['NLS0000681'],
        i18nList['NLS0000682'],
      ],
      weekdaysShort: [
        i18nList['NLS0000683'],
        i18nList['NLS0000684'],
        i18nList['NLS0000685'],
        i18nList['NLS0000686'],
        i18nList['NLS0000687'],
        i18nList['NLS0000688'],
        i18nList['NLS0000689'],
      ],
    };
    moment.locale(lang, setting);
  },
  //* 문자열 날짜 또는 날자 객체를 ISO08601 문자열로 변환
  convertToISO8601String(date) {
    if (date != null) {
      if (typeof date === 'string') {
        const year = date.substr(0, 4);
        const month = date.substr(4, 2) ? date.substr(4, 2) : '01';
        const day = date.substr(6, 2) ? date.substr(6, 2) : '01';
        const hour = date.substr(8, 2) ? date.substr(8, 2) : '00';
        const minutes = date.substr(10, 2) ? date.substr(10, 2) : '00';
        const second = date.substr(12, 2) ? date.substr(10, 2) : '00';
        return `${year}${month}${day}T${hour}${minutes}${second}`;
      } else {
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minutes = `${date.getMinutes()}`.padStart(2, '0');
        const second = `${date.getSeconds()}`.padStart(2, '0');
        return `${year}${month}${day}T${hour}${minutes}${second}`;
      }
    }
  },
  //* ISO8601를 타임스템프로 전환
  convertToTimestamp(ISO08601) {
    return moment(ISO08601).format('x');
  },
  //* ISO8601를 원하는 포멧 형식으로 전환
  convertToDateFormat(ISO08601, format) {
    return moment(ISO08601).format(format);
  },
  //* 기본 타임존 변경
  setTimezoneDefault(timezone) {
    moment.tz.setDefault(timezone);
  },
  //* 기본 타임존 브라우저 기준 초기화
  setTimezoneInit() {
    moment.tz.setDefault();
  },
  //* 사용자 타임존 영역 반환
  getTimezone() {
    return moment.tz.guess();
  },
  //* 지정된 타임존의 오프셋 얻기
  getTimezoneOffset(timezone, timestamp) {
    return moment.tz.zone(timezone).utcOffset(timestamp);
  },
  //* 사용가능한 모든 타임존 이름 목록 반환
  getTimezoneNames() {
    return moment.tz.names();
  },
  //* 타임존 존재 확인 zone or null 반환
  getIsTimezone(timezone) {
    return moment.tz.zone(timezone);
  },
  //* 모는 국가 코드 얻기
  getTimezoneCountries() {
    return moment.tz.countries();
  },
  //* 국가 코드로 관련 지역 타임존 이름과 오프셋 얻기
  getTimezonesForCountries(code) {
    return moment.tz.zonesForCountry(code, { offset: true });
  },
  //* 현재 클라이언트 시간을 원하는 포멧으로 반환
  getClientDate(format) {
    return moment().format(format);
  },
  //* 현재 클라이언트 시간을 서버 타임존으로 원하는 포멧으로 반환
  getServerDate(format) {
    return moment
      .tz(Number(moment().format('x')), localStorage.getItem('serverTz'))
      .format(format);
  },
  //* 문자열 날짜를 클라이언트 타임존으로 변환
  convertToClientTimeZone(
    dateStr,
    format = process.env.VUE_APP_CLIENT_TIME_FORMAT,
  ) {
    const iso = this.convertToISO8601String(dateStr);
    const serverTz = process.env.VUE_APP_SERVER_TIMEZONE;
    const serverTime = moment.tz(iso, serverTz).format('x');
    const clientTz = this.getTimezone();
    return moment.tz(Number(serverTime), clientTz).format(format);
  },
  //* 문자열 날짜를 서버 타임존으로 변환
  convertToServerTimeZone(
    dateStr,
    format = process.env.VUE_APP_SERVER_TIME_FORMAT,
  ) {
    const iso = this.convertToISO8601String(dateStr);
    const serverTz = process.env.VUE_APP_SERVER_TIMEZONE;
    return moment
      .tz(Number(this.convertToTimestamp(iso)), serverTz)
      .format(format);
  },
  //* 날짜 객체를 문자열 포멧으로 변환
  convertToString(date) {
    const newDate = new Date(date.toString());
    const year = newDate.getFullYear();
    const month = `${newDate.getMonth() + 1}`.padStart(2, '0');
    const day = `${newDate.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`;
  },
};
//* Formatting utils
export const format = {
  //* 객체 데이터를 FORMDATA형식으로 변환
  convertFormData(obj) {
    let formData = new FormData();
    for (let [key, value] of obj) {
      formData.append(key, value);
    }
    return formData;
  },
};
//* Cookies setting utils
export const cookies = {
  //* 쿠키 생성 함수
  setCookies(item) {
    const cookieData = `${item.name}=${item.value};expires=${item.expires}`;
    document.cookie = cookieData;
  },
  //* 모든 쿠키 가져오기
  getAllCookies() {
    const obj = {};
    const items = document.cookie.split(';');
    for (let item of items) {
      const arrStr = item.trim().split('=');
      const key = arrStr[0];
      const value = arrStr[1];
      obj[key] = value;
    }
    return obj;
  },
  //* 쿠키 가져오기
  getCookies(key) {
    const cookies = this.getAllCookies();
    return cookies[key] === undefined ? '' : cookies[key];
  },
  //* 쿠키 삭제
  deleteCookies(name) {
    // const date = new Date();
    // date.setDate(date.getDate() - 1);
    // document.cookie = `${name}='';expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    const date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = `${name}=;Expires=${date.toUTCString()}`;
  },
};
//* Common utils
export const common = {
  //* 천단위 콤마
  numberWithCommas(x) {
    if (x === null || x === undefined || x === '') return;
    else {
      const strList = x.toString().split('.');
      const number = strList[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const decimal = strList[1];
      return `${number}${decimal === undefined ? '' : `.${decimal}`}`;
    }
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  //* 전체 공통 코드 리스트 가져오기
  getCodeListAll() {
    return commonStore.state.comCodeList;
  },
  //* 선택한 코드 리스트 가져오기
  getCodeList(code) {
    const items = commonStore.state.comCodeList[code];
    const locale = vm.$i18n.locale;
    const localeCode = `${locale.charAt(0).toUpperCase()}${locale.charAt(1)}`;
    const languageNm = `cdNm${localeCode}`;
    return items.map(item => {
      const obj = { ...item };
      obj.cdNm = obj[languageNm];
      return obj;
    });
  },
  //* 코드 필터
  filterCode(codeList, cd) {
    return codeList.filter(item => {
      return item.cd === cd;
    })[0];
  },
  //* 알림창 호출
  alert(type, code, confirmCallback, timer = 1) {
    let msg = '';
    if (typeof code === 'string') {
      if (code.startsWith('NLS')) msg = vm.$t(code);
      else {
        const tmp = code.split('NLS');
        msg = `${tmp[0]}${vm.$t(`NLS${tmp[1]}`)}`;
      }
    } else {
      msg = vm.$t(code);
    }

    commonStore.state.alertData = {
      type,
      msg: msg,
      confirmCallback,
      timer,
    };
    commonStore.state.views.comAlert = true;
  },
  //* 다이아로그 호출
  confirm(code, confirmCallback, cancelCallback, confirmTxt, cancelTxt) {
    commonStore.state.confirmData = {
      msg: code.includes('NLS') ? vm.$t(code) : code,
      confirmCallback,
      cancelCallback,
      confirmTxt,
      cancelTxt,
    };
    commonStore.state.views.comConfirm = true;
  },
  //* LINEAR ON/OFF
  setLinear(item) {
    commonStore.state.views.linear = item;
  },
  //* LINEAR ON/OFF
  setSpinner(item) {
    commonStore.state.views.spinner = item;
  },
  //* 슬립 함수
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  //* 목표값 계산 함수
  getAchRate(targetO, targetM, result, achType) {
    var achRate = 1;
    var target = 0;
    /**
     * 목표값 : targetO
     * 수정목표값: targetM
     * 실적값 : result
     * 달성유형 : achType
     * 달성률 : achRate
     */
    //* 수정 목표가 존재하면 목표값 = 수정목표
    if (!common.isEmpty(targetM)) target = targetM;
    else target = targetO;
    // target = targetM === null || targetM === '' ? targetO : targetM;
    //* 증가형
    if (achType === '44') {
      //step1. 목표값이 0보다 클 경우
      // if (target > 0) {
      //   //실적이 0이면, 달성률 = 0
      //   if (result === 0) {
      //     achRate = 0;
      //   }
      //   //step1-2. 실적값이 0 이 아니면 , 달성률 = ROUND((실적값/목표값),3)
      //   else {
      //     achRate = result / target;
      //   }
      // }
      // //step2. 목표값이 0보다 작을 경우
      // else if (target < 0) {
      //   //step2-1. 실적값이 0보다 크면 , 달성률 = (2-Round((실적값/목표),3))
      //   if (result > 0) {
      //     achRate = 2 - result / target;
      //   }
      //   //step2-2. 실적이0이면 ,실적값 0
      //   else if (result === 0) {
      //     achRate = 0;
      //   }
      //   //step2-3. 실적값이 0보다 작고 목표값 보다 크거나 같으면, 달성률 = (2-Round((실적값/목표),3))
      //   else if (result < 0 && result >= target) {
      //     achRate = 2 - result / target;
      //   }
      //   //step2-4. 실적값이 0보다 작고 목표값 보다 작으면, 달성률 = ROUND((목표값/실적값),3)
      //   else if (result < 0 && result < target) {
      //     achRate = target / result;
      //   }
      // }
      // //step3.목표값이 0이면 항상 달성율은 0
      // else if (target === 0) {
      //   //step3-1. 실적값이 0이거나 음수면 , 달성률 0
      //   if (result <= 0) {
      //     achRate = 0;
      //   }
      //   //step3-2. 실적값이 0보다 크면, 달성률 0
      //   else {
      //     achRate = 0;
      //   }
      // }

      //* 12.24 변경 내용.
      // 1-1. 목표 양수, 실적 양수
      // 1-2. 목표 양수, 실적 음수
      // 1-3. 목표 음수, 실적 양수
      // 1-4. 목표 음수, 실적 음수
      // 모두 산식 = (1-(목표-실적)/ABS(목표))*100
      if (result === 0 || target === 0) achRate = 0;
      else achRate = 1 - (target - result) / Math.abs(target);
    }
    //*감소형
    else if (achType === '45') {
      // //step1. 목표값이 0보다 크면
      // if (target > 0) {
      //   //step1-1. 실적이 0보다 크고 목표값보다 크면, 달성률 = ROUND((목표값/실적값),3)
      //   if (result > 0 && result > target) {
      //     achRate = target / result;
      //   }
      //   //step1-2. 실적이 0보다 작거나 목표값 이하면, 달성률 = (2-ROUND((실적/목표),3))
      //   if (result < 0 || result <= target) {
      //     achRate = 2 - result / target;
      //   }
      //   //step1-3. 실적이 0이고 목표값 보다 이하면 , 달성률 = 0
      //   if (result === 0 && result <= target) {
      //     achRate = 0;
      //   }
      // }
      // //step2. 목표값이 0보다 작으면 , 달성률 = ROUND((실적값/목표값),3)
      // else if (target < 0) {
      //   achRate = result / target;
      // }
      // //step3. 목표값이 0 이면
      // else if (target === 0) {
      //   //step3-1. 실적이 0이면
      //   if (result === 0) {
      //     achRate = 0;
      //   } else {
      //     achRate = 0;
      //   }
      // }
      //* 12.24 변경 내용.
      // 1-1. 목표 양수, 실적 양수
      // 1-2. 목표 양수, 실적 음수
      // 1-3. 목표 음수, 실적 양수
      // 1-4. 목표 음수, 실적 음수
      // 모두 산식 = (1-(실적-목표)/ABS(목표))*100
      if (result === 0 || target === 0) achRate = 0;
      else achRate = 1 - (result - target) / Math.abs(target);
    }
    //백분율로 환산해서

    achRate = parseFloat((achRate * 100).toFixed(3));
    // achRate = parseFloat(achRate.toFixed(3));
    achRate = achRate < 0 ? 0 : achRate; //*음수일때 0%로
    return achRate;
  },
  //* RANGE척도일때 달성률 계산
  getAchRateRange(achRate, min, max) {
    achRate = this.isEmpty(achRate) ? 0 : parseFloat(achRate);
    min = this.isEmpty(min) ? 0 : parseFloat(min);
    max = this.isEmpty(max) ? 0 : parseFloat(max);

    return this.getDemicalPointNum(((achRate - min) / (max - min)) * 100, 1);
  },
  //* 합계구하기
  getSum(array) {
    let result;
    for (let item of array) {
      if (!common.isEmpty(item)) {
        if (typeof item === 'string') {
          item = item.replace(/,/g, '');
        }
        if (item !== '' && item != null && item != undefined) {
          if (result === undefined) {
            result = 0;
          }
          result += parseFloat(item);
        }
      }
    }
    return isNaN(parseFloat(result)) ? null : parseFloat(result);
  },
  //* 평균구하기
  getAverage(array) {
    let result = 0;
    const exceptNull = array.filter(
      item => item !== '' && item != null && item != undefined,
    );
    result = common.getSum(exceptNull);
    result = result / exceptNull.length;
    // result = common.getSum(array);
    // result = result / array.length;
    return isNaN(parseFloat(result.toFixed(2)))
      ? null
      : parseFloat(result.toFixed(2));
    //return result.toFixed(2);
  },
  //* null 체크
  isEmpty(val) {
    if (
      val === '' ||
      val === null ||
      val === undefined ||
      (val !== null && typeof val === 'object' && !Object.keys(val).length) ||
      val == '<p></p>'
    ) {
      return true;
    }
    return false;
  },
  //* YYYYMM(string) -> MM(string)
  getMonth(dateStr) {
    const month = dateStr.substr(4, 2) ? dateStr.substr(4, 2) : '01';
    return month;
  },
  //* YYYYMM(string) -> YY(string)
  getYear(dateStr) {
    const year = dateStr.substr(0, 4) ? dateStr.substr(0, 4) : '2020';
    return year;
  },
  //*소수점처리 (num -> String)
  getDemicalPoint(num, digit) {
    if (this.isEmpty(num) || !this.isNumber(num)) {
      return num;
    } else if (digit === 0) {
      return num.toFixed(0);
    } else if (digit === 1) {
      return num.toFixed(1);
    } else if (digit === 2) {
      return num.toFixed(2);
    }
    return num;
  },
  //*소수점처리 (num -> num)
  getDemicalPointNum(num, digit) {
    if (this.isEmpty(num) || !this.isNumber(num)) {
      return num;
    } else if (digit === 0) {
      return parseFloat(num);
    } else if (digit === 1) {
      return Math.round(parseFloat(num) * 10) / 10;
    } else if (digit === 2) {
      return Math.round(parseFloat(num) * 100) / 100;
    }
    return num;
  },
  //*소수점,콤마처리
  getDemicalComma(num, digit) {
    return this.numberWithCommas(this.getDemicalPoint(num, digit));
  },
  isNumber(data) {
    return !isNaN(data);
  },
  enterToBr(text) {
    return this.isEmpty(text) ? text : text.replace(/(\n|\r\n)/g, '<br>');
  },
  isNew(item) {
    const today = new Date(timezone.getClientDate());
    const beforeAWeek = new Date(
      timezone.convertToDateFormat(
        today.setDate(today.getDate() - 7),
        'YYYY-MM-DD',
      ),
    );
    let isNew = false;
    if (!this.isEmpty(item.isNewTitle)) {
      const newTitle = new Date(
        timezone.convertToClientTimeZone(item.isNewTitle, 'YYYY-MM-DD'),
      );
      if (beforeAWeek <= newTitle) {
        isNew = true;
      }
    }
    if (!this.isEmpty(item.isNewComment)) {
      const newComment = new Date(
        timezone.convertToClientTimeZone(item.newComment, 'YYYY-MM-DD'),
      );
      if (beforeAWeek <= newComment) {
        isNew = true;
      }
    }
    return isNew;
  },
  delay(func, time) {
    setTimeout(func, time);
  },
  chkPrjAuth(loginUserInfo, prjBaseInfo) {
    const { userId } = loginUserInfo;
    const { prjUserId, prjManagerId, reqUserId, corUserId } = prjBaseInfo;
    const isPrjUser = userId === prjUserId;
    const isManager = userId === prjManagerId;
    const isCoUser = userId === corUserId;
    const isReqUser = userId === reqUserId;
    const pass = isPrjUser || isManager || isCoUser || isReqUser;
    return { pass, isPrjUser, isManager, isCoUser, isReqUser };
  },
};
//* Route utils
export const route = {
  //* 공통 코드 가져오기
  async fetchedCodeList() {
    try {
      if (commonStore.state.comCodeList.length === 0) await getCodeList();
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 사용자 정보 가져오기
  async fetchUserInfo() {
    try {
      if (Object.keys(commonStore.state.userData).length === 0)
        await getUserInfo();
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 다국어 가져오기
  async fechedI18nList() {
    try {
      if (commonStore.state.i18nList.length === 0) await getI18nList();
    } catch (error) {
      errorEventHandler(error);
    }
  },
  setKpiPerformance() {
    commonStore.state.views.kpiPerformance = true;
  },
  getKpiPerformance() {
    return commonStore.state.views.kpiPerformance;
  },
  //* APPBAR 설정
  setAppBar(item) {
    commonStore.state.views.appBar = item;
  },
  //* 로그인 설정
  setLogin(item) {
    authStore.state.views.isLogin = item;
  },
  //* 로그인 여부
  isLogin() {
    return authStore.state.views.isLogin;
  },
  //* 라우터 SET LOCKED
  setNoPush(flag) {
    commonStore.state.views.isNoPush = flag;
  },
  //* 라우터 GET LOCKED STATE
  getNoPush() {
    return commonStore.state.views.isNoPush;
  },
  //* 라우터 Path 설정
  setRoutePath(path) {
    commonStore.state.routePath = path;
  },
  //* 라우터 Path 가져오기
  getRoutePath() {
    return commonStore.state.routePath;
  },
};

export const debounce = (fn, wait) => {
  let lastTimeoutId = null;
  return (...args) => {
    if (lastTimeoutId) {
      clearTimeout(lastTimeoutId);
      lastTimeoutId = null;
    }
    lastTimeoutId = setTimeout(() => {
      // wait 시간 동안 함수 호출이 일어나지 않았을 경우에 호출
      fn(...args);
      lastTimeoutId = null;
    }, wait);
  };
};
