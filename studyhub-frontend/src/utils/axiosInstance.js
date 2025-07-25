import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://studyhub-9yiy.onrender.com/api',
});

export default axiosInstance;
