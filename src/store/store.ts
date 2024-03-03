import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/api";
import authSlice from "store/slices/authSlice";
import { notificationSlice } from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export type StoreModel = ReturnType<typeof store.getState>;

export default store;
