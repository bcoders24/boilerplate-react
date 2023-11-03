import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
// import LocalStorage from "utils/LocalStorage";
// import { setLogout, setToken } from "store/slices/authSlice";
import { Constants } from "constants/index";
import toast from "react-hot-toast";

// const baseQuery = fetchBaseQuery({
//   baseUrl: Constants.HOST + Constants.API_VERSION,
//   credentials: "include",
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     const token = getState().auth.token;
//     if (token && endpoint !== "getRefresh")
//       headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
//   timeout: 40000,
// });

type AuthState = {
  auth: {
    token: string;
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: Constants.HOST + Constants.API_VERSION,
  // credentials: "include",
  prepareHeaders: (
    headers: Headers,
    api: Pick<
      BaseQueryApi,
      "getState" | "endpoint" | "extra" | "type" | "forced"
    >
  ): Headers => {
    const token = (api.getState() as AuthState).auth.token;
    if (token && api.endpoint !== "getRefresh") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  timeout: 40000,
});

const baseQueryInterceptor = async (args, api, options) => {
  toast.dismiss();
  let result = await baseQuery(args, api, options);
  // if (result?.error?.status === 418 && !args?.url?.includes("logout")) {
  //   const refreshToken = LocalStorage.getFromLocalStorage("refreshToken");
  //   const refreshResult = await baseQuery(
  //     {
  //       url: Constants.HOST + "/auth/refresh",
  //       method: "POST",
  //       headers: { "refresh-token": refreshToken },
  //     },
  //     api,
  //     options
  //   );
  //   if (refreshResult?.data) {
  //     api.dispatch(setToken(refreshResult?.data?.accessToken));
  //     result = await baseQuery(args, api, options);
  //   } else {
  //     window.alert(
  //       "Session ended, Your session has ended. You must log in again."
  //     );
  //     LocalStorage.removeFromLocalStorage("refreshToken");
  //     api.dispatch(setLogout());
  //     return refreshResult;
  //   }
  // }

  // if (result?.error?.data) {
  //   result.error.message =
  //     result.error.data.error?.message ??
  //     "An unexpected error has occurred. Please try again later or contact support.";
  // }

  // if (
  //   result?.error &&
  //   !result?.meta?.request.url.includes("logout") &&
  //   !result?.meta?.request?.url.includes("refresh")
  // ) {
  //   toast.error(result?.error?.message);
  // }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryInterceptor,
  tagTypes: [
    "Session",
    // 'Profiles',
  ],
  endpoints: () => ({}),
});
