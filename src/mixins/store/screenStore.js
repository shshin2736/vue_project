import * as screenStore from '@/store/modules/screen';
import * as screenStoreTypes from '@/store/modules/screen/types';

const func = (acc, cur) => {
  acc.push(cur[0]);
  return acc;
};

const getters = Object.entries(screenStoreTypes.getters).reduce(func, []);

const actions = Object.entries(screenStoreTypes.actions).reduce(func, []);

export default {
  computed: {
    ...screenStore.mapGetters([...getters]),
  },
  methods: {
    ...screenStore.mapActions([...actions]),
    viewport() {
      this[screenStoreTypes.actions.FETCH_WIDTH](
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      );
      this[screenStoreTypes.actions.FETCH_HEIGHT](
        Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        ),
      );
    },
    checkdevice() {
      const self = this;
      const maxMobile = 768;
      const maxTablet = 1024;
      const getWidth = this[screenStoreTypes.getters.GET_WIDTH];
      const getDevice = this[screenStoreTypes.getters.GET_HANDDIVCE];
      const mobileInfo = [
        'Android',
        'iPhone',
        'iPod',
        'iPad',
        'BlackBerry',
        'Windows CE',
        'SAMSUNG',
        'LG',
        'MOT',
        'SonyEricsson',
      ];
      mobileInfo.forEach(function(device) {
        if (navigator.userAgent.match(device) !== null) {
          self[screenStoreTypes.actions.FETCH_HANDDIVCE](true);
        }
      });
      if (getDevice === null) {
        self[screenStoreTypes.actions.FETCH_HANDDIVCE](false);
      }
      if (getWidth < maxMobile && getDevice) {
        this[screenStoreTypes.actions.FETCH_VIEWTYPE]('mobile');
      } else if (getWidth < maxTablet && getDevice) {
        this[screenStoreTypes.actions.FETCH_VIEWTYPE]('tablet');
      } else {
        if (getWidth < maxMobile) {
          this[screenStoreTypes.actions.FETCH_VIEWTYPE]('mobile');
        } else if (getWidth < maxTablet) {
          this[screenStoreTypes.actions.FETCH_VIEWTYPE]('tablet');
        } else {
          this[screenStoreTypes.actions.FETCH_VIEWTYPE]('web');
        }
      }
    },
    screenCheck() {
      this.viewport();
      this.checkdevice();
    },
  },
  created() {
    this.screenCheck();
    window.addEventListener('resize', this.screenCheck);
  },
  destroyed() {
    window.removeEventListener('resize', this.screenCheck);
  },
};
