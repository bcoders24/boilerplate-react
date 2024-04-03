import { Endpoints } from '@/constants';
import instance from '@/services/axios/instance';
import { type AxiosError } from 'axios';

export const uploadImageFn = async (data: any, setUploadProgress: any) => {
  try {
    const response = await instance.post<any>(Endpoints.UPLOAD_IMAGES, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (upload) => {
        const uploadloadProgress = Math.round((upload.loaded * 100) / (upload.total ?? 1));
        setUploadProgress(uploadloadProgress);
      },
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data.message ?? 'Upload request timed out. Please try again later.');
  }
};
