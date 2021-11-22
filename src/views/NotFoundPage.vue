<template>
  <div class="error-wrap">
    <div class="error-box">
      <!-- 페이지를 찾을 수 없습니다. -->
      <p class="error-title">{{ $t('NLS0001127') }}</p>
      <!-- 주소가 잘못 입력되었거나 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
        없습니다. 입력하신 페이지를 찾을 수 없습니다. -->
      <p class="error-info">
        {{ $t('NLS0001128') }}
      </p>
      <button type="button" class="deepdarkgray-btn" @click="toPush">
        <!-- 메인으로 이동(Back to Home) -->
        <span>
          {{ $t('NLS0001129') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { common } from '@/utils';

export default {
  name: 'NotFoundPage',
  data() {
    return {
      status: 0,
      message: 'testddd',
      response: '',
    };
  },
  methods: {
    toPush() {
      common.setLinear(true);
      setTimeout(() => {
        this.$router.push('/login');
      }, 1000);
    },
  },
};
</script>
