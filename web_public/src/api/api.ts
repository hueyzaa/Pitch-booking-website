import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getPageConfig = async () => {
  const response = await instance.get('/cau-hinh-trang/public');
  return response.data.data;
};

export default instance;

