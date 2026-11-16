import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem('token');
  if (data) {
    const dataParsed = JSON.parse(data);
    const token = dataParsed?.data?.token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
