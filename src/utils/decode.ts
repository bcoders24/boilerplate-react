import { jwtDecode } from 'jwt-decode';

export const DecodeToken = (token: string | undefined) => {
  if (!token) return null;
  return jwtDecode(token) as any;
};
