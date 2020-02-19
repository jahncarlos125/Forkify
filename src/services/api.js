import axios from 'axios';

const api = axios.create({
  baseURL: 'https://forkify-api.herokuapp.com/api',
});

export default api;
