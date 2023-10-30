import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { UserModel } from "src/models/general/User";

export const RE_DIGIT = new RegExp(/^\d+$/);

export function formatDate(inputDate: string, format: string) {
  const date = dayjs(inputDate);
  const formattedDate = date.format(format);
  return formattedDate;
}

export const DecodeToken = (token: string) => jwtDecode(token) as UserModel;
