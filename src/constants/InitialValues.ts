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

export const userValues = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  date: null,
};

export default {
  loginValues,
  forgotPasswordValues,
  resetPasswordValues,
  userValues,
};
