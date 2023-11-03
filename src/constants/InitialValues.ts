import { ILogin, IForgotPassword, IResetPassword } from "src/models/data/auth";

export const loginValues: ILogin = {
  email: "",
  password: "",
};

export const forgotPasswordValues: IForgotPassword = {
  email: "",
};

export const resetPasswordValues: IResetPassword = {
  password: "",
  confirmPassword: "",
};

const InitailValues = {
  loginValues,
  forgotPasswordValues,
  resetPasswordValues,
};

export default InitailValues;
