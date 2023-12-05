import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
// import { UserModel } from "src/models/general/User";

// For OTP component
export const RE_DIGIT = new RegExp(/^\d+$/);

export const DecodeToken = (token: string) => jwtDecode(token) as any;

export const formatDate = (inputDate: string, format: string) => {
  const date = dayjs(inputDate);
  const formattedDate = date.format(format);
  return formattedDate;
};
