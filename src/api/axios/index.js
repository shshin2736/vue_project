import axios from 'axios';
import { setInterceptors } from './common/interceptors';

//* Used Interceptors
function createInstanceWithAuth(types) {
  const instance = axios.create({
    // baseURL: `${process.env.VUE_APP_API_URL}${url}`,
    // timeout: 5000,
    // withCredentials: true,
    // crossDomain: true,
  });
  return setInterceptors(instance, types);
}

const axiosInstance = createInstanceWithAuth(true);
const axiosNoSpinner = createInstanceWithAuth(false);

export { axiosInstance, axiosNoSpinner };
