import axios from 'axios';
import { setupInterceptorsTo } from './AxiosConfig';
import { Constants } from '@/constants';

const instance = axios.create({
  baseURL: Constants.HOST + Constants.API_VERSION,
  timeout: 20000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

export default setupInterceptorsTo(instance);
