import { Endpoints } from '@/constants';
import instance from '@/services/api';
import { LoginInput } from '@/pages/auth/Login.page';
import { AxiosError } from 'axios';

export const signUpUserFn = async (user: any) => {
  try {
    const response = await instance.post<any>('auth/register', user);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message);
  }
};

export const loginUserFn = async (user: LoginInput) => {
  try {
    const response = await instance.post<any>(Endpoints.LOGIN, user);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Login request timed out. Please try again later.');
  }
};

export const verifyEmailFn = async (verificationCode: string) => {
  try {
    const response = await instance.get<any>(`auth/verifyemail/${verificationCode}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message);
  }
};

export const logoutUserFn = async () => {
  try {
    const response = await instance.get<any>('auth/logout');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message);
  }
};

export const getMeFn = async () => {
  try {
    const response = await instance.get<any>('users/me');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message);
  }
};
