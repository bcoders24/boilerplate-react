export interface ILoginResponse {
  data: {
    token: string;
  };
  isSuccess: string;
  message: string;
  status: number;
}
