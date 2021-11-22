<template>
  <div>
    <div class="page__tab-box type-equal">
      <button
        :class="{ tab__main: true, ['perm_read']: true, current: dataSearch }"
        :auth="$route.params"
        @click="onTab('search')"
      >
        <span>{{ $t('NLS0000651') }}</span>
      </button>
      <button
        :class="{ tab__main: true, ['perm_read']: true, current: !dataSearch }"
        :auth="$route.params"
        @click="onTab('confirm')"
      >
        <!-- 수신열람요청 -->
        <span>{{ $t('NLS0001134') }}</span>
      </button>
    </div>
    <div :class="{ 'tab-main-box': true, current: dataSearch }">
      <data-search-list-form
        v-if="dataSearch"
        :tab="dataSearch"
      ></data-search-list-form>
    </div>
    <div :class="{ 'tab-main-box': true, current: !dataSearch }">
      <data-search-list-form
        v-if="!dataSearch"
        :tab="dataSearch"
      ></data-search-list-form>
    </div>
  </div>
</template>

<script>
import DataSearchListForm from '@/components/businessSupport/dataSearch/form/DataSearchListForm';
export default {
  name: 'DataSearchTabForm',
  components: {
    DataSearchListForm,
  },
  data() {
    return {
      dataSearch: true,
    };
  },
  mounted() {
    //* 알림을 클릭하여 들어온 경우
    if (this.$route.params.onConfirmTab) {
      this.dataSearch = false;
    }
  },
  methods: {
    onTab(flag) {
      if (flag === 'search') {
        this.dataSearch = true;
      } else {
        this.dataSearch = false;
      }
    },
  },
};
</script>

<style scoped>
.page__tab-box {
  margin-bottom: 0;
  border: 0;
}
</style>
