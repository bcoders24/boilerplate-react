import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  open: false,
  message: "",
  timeout: 2000,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addNotification: (_state, action) => ({
      ...notificationInitialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (_state) => ({
      ..._state,
      open: false,
    }),
  },
});

export const NotificationActions = notificationSlice.actions;
export const NotificationReducer = notificationSlice;
