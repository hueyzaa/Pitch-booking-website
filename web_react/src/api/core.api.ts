import { ARR_LOGOUT_MESSAGE } from '@app/constants/Message';
import { readDeviceId } from '@app/services/localStorage.service';
import { getToken, signOut } from '@app/utils/redux.utils';
import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor
apiInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `${getToken()}`;
    config.headers.device_id = readDeviceId();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiInstance.interceptors.response.use(
  function (response) {
    if (ARR_LOGOUT_MESSAGE.includes(response.data.message)) {
      signOut();
    } else if (
      response.data.code === 403 &&
      response.data.message === 'Không phải thời gian làm việc vui lòng thử lại sau'
    ) {
      signOut();
    }
    return response.data;
  },
  function (error) {
    console.log('error', error);
    if (error.message === 'Network Error') {
      return Promise.reject({ message: 'Lỗi mạng, vui lòng thử lại sau' });
    }
    return Promise.reject(error);
  }
);
