import { Endpoints } from '@/constants';
import { LoginInput } from '@/features/auth/login.page';
import { ChangePasswordInput } from '@/features/profile/change-password';
import instance from '@/services/axios/instance';
import { type AxiosError } from 'axios';

export const signUpUserFn = async (user: any) => {
  try {
    const response = await instance.post<any>('auth/register', user);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message);
  }
};

export const loginUserFn = async (user: LoginInput) => {
  try {
    const response = await instance.post<any>(Endpoints.LOGIN, user);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message ?? 'Login request timed out. Please try again later.');
  }
};

export const verifyEmailFn = async (verificationCode: string) => {
  try {
    const response = await instance.get<any>(`auth/verifyemail/${verificationCode}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message);
  }
};

type ChangePasswordPayload = {
  id?: number;
  payload?: ChangePasswordInput;
};

export const changePasswordFn = async (data: ChangePasswordPayload) => {
  try {
    const response = await instance.put<any>(`${Endpoints.CHANGE_PASSWORD}/${data.id}`, data.payload);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message);
  }
};

export const getMeFn = async (id: string) => {
  try {
    const response = await instance.get<any>(`${Endpoints.USERS}/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message ?? 'Authentication request timed out. Please try again later.');
  }
};
