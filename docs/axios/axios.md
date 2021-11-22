---
title: Axios 비동기 통신 라이브러리
---

# Axios 비동기 통신 라이브러리
자세한 내용은 [Axios](https://github.com/axios/axios)를 참조하시기 바랍니다.

## Axios 인스턴스 설정
Axios 인스턴스는 api/axios/index.js 파일에 설정되어 있습니다.
```js
import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// Used Interceptors
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
    timeout: 5000,
  });
  return setInterceptors(instance);
}

const axiosInstance = createInstanceWithAuth('');

export { axiosInstance };

```

## Axios 인터셉터 설정
Axios 인터셉터는 api/axios/common/interceptors.js 파일에 설정되어 있습니다.
```js
export const setInterceptors = instance => {
  const error = error => {
    // Do something with request error
    return Promise.reject(error);
  };
  // Add a request interceptor
  instance.interceptors.request.use(config => {
    // Do something before request is sent
    // console.log(config);
    return config;
  }, error);

  // Add a response interceptor
  instance.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, error);
  return instance;
};
```

## Axios 사용 예제
```vue
<template>
  <div>{{ list }}</div>
</template>

<script>
import { axiosInstance } from '@/api/axios';

export default {
  data() {
    return {
      list: []
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      cosnt { data } = await axiosInstance.get('/admin');
      this.list = data;
    }
  }
}
</script>
```