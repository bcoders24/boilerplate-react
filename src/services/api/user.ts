import { Endpoints } from '@/constants';
import instance from '@/services/axios/instance';
import { type AxiosError } from 'axios';

type EditProfilePayload = {
  id?: number;
  payload?: any;
};

export const editProfileFn = async (data: EditProfilePayload) => {
  try {
    const response = await instance.put<any>(`${Endpoints.UPDATE_PROFILE}/${data.id}`, data.payload);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message);
  }
};
