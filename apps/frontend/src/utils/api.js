import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    return request;
  },
  (error) => {
    console.log('REQUEST ERROR', error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    error = error.response.data;
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

export default api;