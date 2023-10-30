export interface IError {
  response: {
    data: {
      data: string;
      error: string;
      message: string;
      status: number;
    };
  };
}
