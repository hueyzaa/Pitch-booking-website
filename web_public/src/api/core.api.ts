import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor (Foundation for Auth)
apiInstance.interceptors.request.use(
  function (config) {
    // Standard headers for all requests
    config.headers['Content-Type'] = 'application/json';
    
    // Future: Authorization from local storage/state
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor (Standardized Return)
apiInstance.interceptors.response.use(
  function (response) {
    // Match the format of web_react by returning response.data
    return response.data;
  },
  function (error) {
    console.error('API Error:', error);
    
    // Standardized error object
    const customError = {
      message: error.response?.data?.message || error.message || 'Lỗi mạng, vui lòng thử lại sau',
      status: error.response?.status,
      data: error.response?.data
    };
    
    return Promise.reject(customError);
  }
);

export default apiInstance;
