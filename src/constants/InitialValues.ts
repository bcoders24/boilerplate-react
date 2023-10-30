import { IForgot } from "src/models/data/ForgotModel";
import { ILogin } from "src/models/data/LoginModel";

export const loginValues: ILogin = {
  email: "",
  password: "",
};

export const forgotPasswordValues: IForgot = {
  email: "",
};

const InitailValues = { loginValues, forgotPasswordValues };

export default InitailValues;
