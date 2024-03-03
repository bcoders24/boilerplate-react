export interface IAdminData {
  _id: string;
  email: string;
  role: string;
  userName: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminProfileResponse {
  data: IAdminData;
  error: string;
  message: string;
  status: number;
}
