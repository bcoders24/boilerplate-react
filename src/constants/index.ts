import UploadIllustration from 'assets/upload.jpg';
import AuthBackground from 'assets/auth-background.gif';
import Menu from 'assets/menu.png';
import Arrow_down from 'assets/arrow-down.png';
import Plus from 'assets/plus.png';
import Edit from 'assets/edit.png';
import Pen from 'assets/pen.png';

export const Images = {
  UPLOAD: UploadIllustration,
  AUTH_BACKGROUND: AuthBackground,
  MENU: Menu,
  ARROW_DOWN: Arrow_down,
  PLUS: Plus,
  EDIT: Edit,
  PEN: Pen,
};

export const Constants = {
  HOST: process.env.VITE_API_URL,
  API_VERSION: 'api/',
};

export const Endpoints = {
  LOGIN: 'admins/signin',
  LOGOUT: 'admins/logout',
  REGISTER: 'auths/register',
  GOOGLE: 'auths/google',
  FORGOT: 'auths/forgotPassword',
  OTP: 'auths/verify',
  RESET: 'auths/resetPassword',
  CHANGE_PASSWORD: 'admins/updatePassword',
  USERS: 'admins',
  UPDATE_PROFILE: 'admins',
  UPLOAD_IMAGES: 'images/upload',
};

export const Paths = {
  LOGIN: '/',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/verify',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PRODUCT_DETAILS: '/product-details',
  PRODUCT_DASHBOARD: '/product-dashboard',
  CUSTOMER_DETAILS: '/customer-details',
  NOT_FOUND: '*',
};
