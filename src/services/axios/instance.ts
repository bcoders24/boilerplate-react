import { setupInterceptorsTo } from './config';
import { Constants } from '@/constants';
import axios from 'axios';

const instance = axios.create({
  baseURL: Constants.HOST + Constants.API_VERSION,
  timeout: 20000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default setupInterceptorsTo(instance);
